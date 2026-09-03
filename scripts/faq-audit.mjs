/**
 * FAQ cross-locale audit.
 *
 *   npm run build && npm run faq-audit
 *
 * Reads the FAQPage JSON-LD out of every built page, groups pages by their
 * unlocalized path, and compares each locale against English. It works on
 * dist/ rather than the .astro sources so it checks what actually ships, and
 * covers every FAQ on the site at once — pricing, home, hubs, game pages.
 *
 * It exists to catch the class of bug that spell-checks and reading miss: an
 * answer that is perfectly good prose but sits under the wrong question. That
 * happened once already — the French "what happens after the trial?" was
 * answered with the pricing text (fixed in 548a630) — and it survived review
 * because nothing about it looks wrong unless you read it against its question.
 *
 * Checks
 *   duplicate  the same answer appears under two questions in one locale
 *   numbers    the answer at position i carries different figures than English
 *              does at position i. Prices and counts survive translation
 *              ($14.99 -> 14,99 $), so this is the strong signal — it is what
 *              would have caught the French bug.
 *   brands     same idea for product names (App Store, Discord, iOS…)
 *   count      locale has a different number of Q&As than English
 *
 * Exit code is 1 for anything actionable, 0 otherwise, so it can gate a push.
 *
 * Note on "count": English game pages legitimately carry extra FAQs — see
 * `extraFaqs` in src/data/games.ts, appended only when lang === 'en' in
 * GameDetailPage.astro. A locale having FEWER than English is therefore
 * reported as information, not failure. A locale having MORE is a failure,
 * since nothing in the codebase should produce that.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.argv[2]
  ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const LOCALES = ['es', 'pt', 'fr', 'de', 'hi'];

if (!fs.existsSync(ROOT)) {
  console.error(`no build found at ${ROOT}\nrun \`npm run build\` first`);
  process.exit(2);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

/* Facts that survive translation: digit runs (1,99 and 1.99 both -> 199) and
   latin-script product names. */
/* Case-insensitive: locales differ on capitalisation ("Premium" vs "premium")
   and that is style, not a factual difference. */
const BRANDS = /(\b(App Store|Google Play|Discord|iOS|Android|Vanikar|CPU|AI|IA|KI|Premium|Founder|Fundador|Fondateur)\b|Computer\w*|Ordinateur\w*|Computadora\w*|Ordenador\w*|प्रीमियम|फ़ाउंडर|कंप्यूटर|एआई)/gi;
/* The same fact wearing another language: AI/IA/KI, CPU/कंप्यूटर,
   Founder/Fundador/Fondateur, Premium/प्रीमियम. Fold them, or every
   translated answer reads as a mismatch. Extend this when a locale
   transliterates a term rather than keeping the latin spelling. */
const CANON = { ia: 'ai', ki: 'ai', ai: 'ai', cpu: 'ai',
                fundador: 'founder', fondateur: 'founder',
                'प्रीमियम': 'premium', 'फ़ाउंडर': 'founder',
                'कंप्यूटर': 'ai', 'एआई': 'ai' };
/* Anything starting with computer/ordinateur/computadora, in any case and
   including German compounds like Computergegner, is the same concept. */
const canon = b => /^(computer|ordinateur|computadora|ordenador)/.test(b) ? 'ai' : (CANON[b] ?? b);

function signature(text) {
  const t = text.replace(/&[a-z]+;/g, ' ');
  const nums = (t.match(/\d[\d.,]*/g) || [])
    .map(n => n.replace(/[.,](?=\d)/g, '').replace(/[.,]$/, ''))
    .filter(Boolean);
  const brands = (t.match(BRANDS) || [])
    .map(b => b.toLowerCase())
    .map(canon);
  return { nums: nums.sort(), brands: [...new Set(brands)].sort() };
}
const eq = (a, b) => a.join('|') === b.join('|');

const strip = s => s.replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();

/** Visible FAQ markup: .faq-item wrapping a heading and a paragraph, or a
 *  <details><summary>. Used when a page carries no FAQPage schema. */
function fromMarkup(html) {
  const out = [];
  for (const m of html.matchAll(/<div class="faq-item"[^>]*>([\s\S]*?)<\/div>/g)) {
    const q = m[1].match(/<(h\d)[^>]*>([\s\S]*?)<\/\1>/);
    const a = m[1].match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (q && a) out.push({ q: strip(q[2]), a: strip(a[1]) });
  }
  for (const m of html.matchAll(/<details class="faq-item"[^>]*>([\s\S]*?)<\/details>/g)) {
    const q = m[1].match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
    const a = m[1].match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (q && a) out.push({ q: strip(q[1]), a: strip(a[1]) });
  }
  return out.length ? out : null;
}

/* ---- collect ---- */
const pages = new Map();                 // basePath -> { locale -> faqs }
for (const file of walk(ROOT)) {
  const html = fs.readFileSync(file, 'utf8');
  const url = '/' + path.relative(ROOT, path.dirname(file)).split(path.sep).join('/') + '/';
  let faqs = null;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j;
    try { j = JSON.parse(m[1]); } catch { continue; }
    if (j['@type'] === 'FAQPage' && Array.isArray(j.mainEntity)) {
      faqs = j.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer?.text ?? '' }));
    }
  }
  /* Not every FAQ ships as schema — the pricing page renders .faq-item divs
     and emits no JSON-LD at all. Fall back to the markup, or this audit would
     silently skip the page the French bug was actually on. */
  if (!faqs) faqs = fromMarkup(html);
  if (!faqs) continue;
  const m = url.match(/^\/(es|pt|fr|de|hi)(\/.*)$/);
  const locale = m ? m[1] : 'en';
  const base = m ? m[2] : url;
  if (!pages.has(base)) pages.set(base, {});
  pages.get(base)[locale] = faqs;
}

/* ---- compare ---- */
const issues = [];
let groups = 0, comparisons = 0;

for (const [base, byLocale] of [...pages].sort()) {
  const en = byLocale.en;
  if (!en) continue;
  groups++;

  for (const loc of LOCALES) {
    const list = byLocale[loc];
    if (!list) continue;
    comparisons++;

    if (list.length > en.length) {
      issues.push({ kind: 'count-extra', base, loc,
        detail: `${loc} has ${list.length} Q&As, en has ${en.length}` });
    } else if (list.length < en.length) {
      issues.push({ kind: 'count', base, loc,
        detail: `${loc} has ${list.length}, en has ${en.length} (expected where en adds extraFaqs)` });
    }

    const seen = new Map();
    list.forEach((f, i) => {
      const key = f.a.trim();
      if (!key) return;
      if (seen.has(key)) {
        issues.push({ kind: 'duplicate', base, loc,
          detail: `answer repeated at #${seen.get(key) + 1} and #${i + 1}`,
          q1: list[seen.get(key)].q, q2: f.q, a: key });
      } else seen.set(key, i);
    });

    for (let i = 0; i < Math.min(list.length, en.length); i++) {
      const s = signature(list[i].a), e = signature(en[i].a);
      if (!eq(s.nums, e.nums)) {
        issues.push({ kind: 'numbers', base, loc,
          detail: `#${i + 1}  en[${e.nums.join(' ') || '-'}] vs ${loc}[${s.nums.join(' ') || '-'}]`,
          q: list[i].q, enq: en[i].q });
      } else if (!eq(s.brands, e.brands)) {
        issues.push({ kind: 'brands', base, loc,
          detail: `#${i + 1}  en[${e.brands.join(' ') || '-'}] vs ${loc}[${s.brands.join(' ') || '-'}]`,
          q: list[i].q, enq: en[i].q });
      }
    }
  }
}

/* ---- report ---- */
console.log(`FAQ audit — ${groups} page groups, ${comparisons} locale comparisons`);

/* `brands` is informational. Matching product nouns across six languages runs
   into transliteration (कंप्यूटर) and compounds (Computergegner), so it throws
   false positives that would train you to ignore the whole report. Numbers do
   not have that problem: prices and counts survive translation intact. */
const FAIL = ['duplicate', 'numbers', 'count-extra'];
const KINDS = ['duplicate', 'numbers', 'brands', 'count-extra', 'count'];

for (const kind of KINDS) {
  const group = issues.filter(i => i.kind === kind);
  if (!group.length) continue;
  const label = FAIL.includes(kind) ? kind.toUpperCase() : `${kind} (informational)`;
  console.log(`\n=== ${label} — ${group.length} ===`);
  for (const it of group.slice(0, 40)) {
    console.log(`\n${it.base}  [${it.loc}]  ${it.detail}`);
    if (kind === 'duplicate') {
      console.log(`   Q1: ${it.q1}`);
      console.log(`   Q2: ${it.q2}`);
      console.log(`   A : ${it.a.slice(0, 130)}`);
    } else if (kind === 'numbers' || kind === 'brands') {
      console.log(`   en Q: ${it.enq}`);
      console.log(`   ${it.loc} Q: ${it.q}`);
    }
  }
  if (group.length > 40) console.log(`\n… and ${group.length - 40} more`);
}

const failures = issues.filter(i => FAIL.includes(i.kind));
console.log(failures.length
  ? `\n${failures.length} issue(s) need attention`
  : '\nno issues');
process.exit(failures.length ? 1 : 0);
