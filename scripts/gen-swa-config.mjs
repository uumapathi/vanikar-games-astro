/**
 * Emit dist/staticwebapp.config.json for Azure Static Web Apps.
 *
 * Takes the hand-maintained base config (swa.base.json) and adds two things
 * that should not be edited by hand:
 *
 *   1. 301s from the pre-/cardgames/ URL shape. SWA has no capture groups in
 *      redirects, so every old path needs its own entry; they are derived from
 *      the game and hub lists rather than typed out.
 *   2. On the dev stack, an X-Robots-Tag: noindex header. dev.vanikar.games
 *      serves the same 350+ pages as production, and without this it would
 *      compete with the real site for those rankings. robots.txt is left
 *      permissive on purpose — a disallow would stop crawlers ever reading
 *      the noindex.
 *
 * Runs automatically after `npm run build` (see package.json postbuild).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = process.env.SITE_URL || 'https://vanikar.games';
const IS_DEV = /\/\/dev\./.test(SITE);

const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'swa.base.json'), 'utf8'));

// --- derive the old -> new redirect table -----------------------------------
const gamesTs = fs.readFileSync(path.join(ROOT, 'src/data/games.ts'), 'utf8');
const GAME_SLUGS = [...gamesTs.matchAll(/\n    slug:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);
const hubsTs = fs.readFileSync(path.join(ROOT, 'src/data/hubs/index.ts'), 'utf8');
const HUB_SLUGS = [...new Set([...hubsTs.matchAll(/'([a-z][a-z-]*card-games[a-z-]*)'/g)].map(m => m[1]))];
const LOCALES = ['', 'es', 'pt', 'fr', 'de', 'hi', 'it', 'ja'];

// SWA caps this file at 20 KB and has no capture groups in redirects, so one
// entry per old path adds up fast. Rather than emit all 8 locales x 41 paths
// (~39 KB, which the deploy rejects), cover:
//   - every English path, where the direct and external-link traffic is, and
//   - the localized paths Google actually has indexed, snapshotted in
//     scripts/legacy-urls.txt at migration time.
// Anything else 404s, which is correct: it was never a published URL.
const legacy = new Set(
  fs.readFileSync(path.join(ROOT, 'scripts/legacy-urls.txt'), 'utf8')
    .split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))
);

const redirects = [];
const seenRoute = new Set(base.routes.map(r => r.route));
const add = (from, to) => {
  if (seenRoute.has(from)) return;
  seenRoute.add(from);
  redirects.push({ route: from, redirect: to, statusCode: 301 });
};
// English always; a locale path only if it was indexed
const want = (p) => !/^\/(es|pt|fr|de|hi|it|ja)\//.test(p) || legacy.has(p);

for (const l of LOCALES) {
  const p = l ? `/${l}` : '';
  for (const [from, to] of [
    [`${p}/games/`, `${p}/cardgames/availablegames/`],
    [`${p}/pricing/`, `${p}/cardgames/pricing/`],
    ...GAME_SLUGS.map(s => [`${p}/games/${s}/`, `${p}/cardgames/${s}/`]),
    ...HUB_SLUGS.map(h => [`${p}/${h}/`, `${p}/cardgames/${h}/`]),
  ]) if (want(from)) add(from, to);
}
// the pre-rename game slug
add('/games/seep/', '/cardgames/sleep/');
add('/cardgames/seep/', '/cardgames/sleep/');

base.routes = [...base.routes, ...redirects];

if (IS_DEV) {
  base.globalHeaders = { ...base.globalHeaders, 'X-Robots-Tag': 'noindex, nofollow' };
}

const out = path.join(ROOT, 'dist/staticwebapp.config.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
// minified: Azure rejects the deployment outright above 20 KB
fs.writeFileSync(out, JSON.stringify(base));

const bytes = fs.statSync(out).size;
const LIMIT = 20 * 1024;
console.log(`staticwebapp.config.json  site=${SITE}${IS_DEV ? '  [noindex]' : ''}`);
console.log(`  routes: ${base.routes.length} (${redirects.length} generated 301s) · ${(bytes / 1024).toFixed(1)} KB of 20 KB`);
if (bytes > LIMIT) {
  console.error(`\nERROR: staticwebapp.config.json is ${(bytes / 1024).toFixed(1)} KB, over Azure's 20 KB limit.`);
  console.error('Azure rejects the deploy at this size. Trim the redirect table in scripts/gen-swa-config.mjs.');
  process.exit(1);
}
