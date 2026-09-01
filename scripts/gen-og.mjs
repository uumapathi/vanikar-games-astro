/**
 * Generate 1200×630 Open Graph / Twitter cards into public/og/:
 *   public/og/default.png       — site-wide card
 *   public/og/<slug>.png        — one per game (icon + name)
 *
 * Run locally and commit the output:  node scripts/gen-og.mjs
 * (Kept out of the build so the hosted build never depends on system fonts.)
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT  = path.join(ROOT, 'public', 'og');
const ICONS = path.join(ROOT, 'src', 'assets', 'game-icons');
const APP_ICON = path.join(ROOT, 'src', 'assets', 'appicon.png');

const W = 1200, H = 630;
const BG = '#0d1a0d', BG2 = '#162a16', GOLD = '#c9a227', TEXT = '#ffffff', MUTED = '#b9c6b9';

fs.mkdirSync(OUT, { recursive: true });

/* ── Read slug + English name for every game straight from games.ts ───── */
function readGames() {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'games.ts'), 'utf8');
  const games = [];
  const slugRe = /slug:\s*'([a-z0-9-]+)'/g;
  let m;
  while ((m = slugRe.exec(src))) {
    // name: may sit before or after slug: inside the same object literal
    const window = src.slice(Math.max(0, m.index - 300), m.index + 600);
    const nameRe = /name:\s*(['"])(.+?)\1/g;
    let best = null, n;
    while ((n = nameRe.exec(window))) {
      const dist = Math.abs(n.index - (m.index - Math.max(0, m.index - 300)));
      if (!best || dist < best.dist) best = { name: n[2], dist };
    }
    if (best && !games.some(g => g.slug === m[1])) games.push({ slug: m[1], name: best.name });
  }
  return games;
}

const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="25%" cy="40%" r="90%">
      <stop offset="0" stop-color="${BG2}"/>
      <stop offset="1" stop-color="${BG}"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${GOLD}"/>
  <text x="${W - 60}" y="${H - 40}" text-anchor="end" font-family="Georgia, serif" font-size="30" fill="${MUTED}">vanikar.games</text>
  <text x="${W - 60}" y="80" text-anchor="end" font-family="Georgia, serif" font-size="30" fill="${GOLD}">♠ ♥ ♦ ♣</text>
</svg>`);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function text(markup, font, width) {
  return sharp({ text: { text: markup, font, width, rgba: true } }).png().toBuffer();
}

async function iconLayer(file, size) {
  const buf = await sharp(file, { density: 300 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toBuffer();
  return buf;
}

async function card(out, { iconFile, title, subtitle, footer }) {
  const icon = await iconLayer(iconFile, 320);
  const layers = [
    { input: icon, left: 100, top: Math.round((H - 320) / 2) },
  ];
  const t = await text(`<span foreground="${TEXT}" weight="bold">${esc(title)}</span>`, 'Georgia Bold 76', 700);
  const s = await text(`<span foreground="${GOLD}">${esc(subtitle)}</span>`, 'Georgia 36', 700);
  const f = await text(`<span foreground="${MUTED}">${esc(footer)}</span>`, 'Georgia 30', 700);
  const tm = await sharp(t).metadata(), sm = await sharp(s).metadata(), fm = await sharp(f).metadata();
  const block = tm.height + 18 + sm.height + 26 + fm.height;
  let y = Math.round((H - block) / 2);
  layers.push({ input: t, left: 470, top: y }); y += tm.height + 18;
  layers.push({ input: s, left: 470, top: y }); y += sm.height + 26;
  layers.push({ input: f, left: 470, top: y });
  await sharp(background).composite(layers).png({ compressionLevel: 9, palette: true }).toFile(out);
}

const games = readGames();
console.log(`games found: ${games.length}`);

await card(path.join(OUT, 'default.png'), {
  iconFile: APP_ICON,
  title: 'Card Games by Vanikar',
  subtitle: `${games.length} classic card games · online & offline`,
  footer: 'Smart AI · private tables · no ads, ever',
});

for (const g of games) {
  const png = path.join(ICONS, `${g.slug}.png`);
  const svg = path.join(ICONS, `${g.slug}.svg`);
  const iconFile = fs.existsSync(png) ? png : fs.existsSync(svg) ? svg : APP_ICON;
  await card(path.join(OUT, `${g.slug}.png`), {
    iconFile,
    title: g.name,
    subtitle: 'Rules · How to Play · Strategy',
    footer: 'Card Games by Vanikar · no ads, ever',
  });
}
const sizes = fs.readdirSync(OUT).map(f => fs.statSync(path.join(OUT, f)).size);
console.log(`wrote ${sizes.length} cards, avg ${Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024)} KB`);
