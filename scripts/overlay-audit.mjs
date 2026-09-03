/**
 * Locale overlay audit.
 *
 *   npm run overlay-audit
 *
 * Every locale overlay in src/data/games.<locale>.ts must carry all nine
 * content fields for every game in src/data/games.ts. A missing field does
 * not error - localizeGame() spreads the overlay over the English game, so
 * the page quietly renders that one field in English under a translated
 * heading. That is exactly what happened to the taglines: a regeneration
 * script dropped 160 of them and nothing noticed until a manual sweep.
 *
 * This runs against the source files, not the build, so it needs no
 * `astro build` first and can run as a pre-commit or pre-push check.
 * Exit 1 on any gap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIELDS = ['name', 'tagline', 'players', 'description', 'objective', 'setup', 'gameplay', 'scoring', 'tips'];

const en = fs.readFileSync(path.join(ROOT, 'src/data/games.ts'), 'utf8');
const slugs = [...en.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);

// every games.<xx>.ts is a locale overlay
const overlays = fs.readdirSync(path.join(ROOT, 'src/data'))
  .map(f => f.match(/^games\.([a-z]{2})\.ts$/)).filter(Boolean).map(m => m[1]).sort();

let failures = 0;
console.log(`overlay audit — ${slugs.length} games × ${overlays.length} locales (${overlays.join(', ')})`);

for (const l of overlays) {
  const s = fs.readFileSync(path.join(ROOT, `src/data/games.${l}.ts`), 'utf8').replace(/\r/g, '');
  const missing = Object.fromEntries(FIELDS.map(f => [f, []]));
  const absent = [];
  for (const slug of slugs) {
    const i = s.indexOf(`  '${slug}': {`);
    if (i < 0) { absent.push(slug); continue; }
    const rest = s.slice(i + 1);
    const end = rest.search(/\n  '[a-z0-9-]+': \{|\n\};/);
    const block = rest.slice(0, end < 0 ? undefined : end);
    for (const f of FIELDS) if (!new RegExp(`\\n    ${f}:`).test(block)) missing[f].push(slug);
  }
  const gaps = FIELDS.filter(f => missing[f].length);
  if (!absent.length && !gaps.length) { console.log(`  ${l}: complete`); continue; }
  failures++;
  console.log(`\n  ${l}:`);
  if (absent.length) console.log(`    no entry at all for ${absent.length}: ${absent.join(', ')}`);
  for (const f of gaps) console.log(`    ${f.padEnd(12)} missing on ${missing[f].length}: ${missing[f].join(', ')}`);
}

console.log(failures ? `\n${failures} locale(s) have gaps` : '\nall overlays complete');
process.exit(failures ? 1 : 0);
