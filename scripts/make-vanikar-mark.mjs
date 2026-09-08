/**
 * The Vanikar logo ships on an opaque white background with a soft drop
 * shadow, which would render as a white box on the site's dark green.
 *
 * Straight colour-keying would also punch holes in the globe, which has its
 * own white highlights. So the background is removed by flood-filling inward
 * from the border instead: only the light region actually connected to the
 * edge is cleared, and enclosed highlights are left alone. Edge pixels get
 * partial alpha so the curve stays anti-aliased rather than jagged.
 */
import sharp from 'sharp';
import path from 'node:path';

const SRC = process.env.LOGO_SRC || 'C:/Users/uumap/OneDrive/Work/Vanikar/Marketing Assets/add metallic finishe.png';
const OUT = process.argv[2] || 'src/assets/vanikar-mark.png';

const FULL = 214;  // min-channel at/above this is background (catches the grey shadow)
const SOFT = 150;  // below this is definitely artwork; between the two, feather

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const idx = (x, y) => (y * W + x) * 4;
const minCh = i => Math.min(data[i], data[i + 1], data[i + 2]);

const seen = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) { stack.push([x, 0], [x, H - 1]); }
for (let y = 0; y < H; y++) { stack.push([0, y], [W - 1, y]); }

let cleared = 0, feathered = 0;
while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H) continue;
  const p = y * W + x;
  if (seen[p]) continue;
  const i = idx(x, y);
  const m = minCh(i);
  if (m < SOFT) continue;            // artwork: stop the fill here
  seen[p] = 1;
  if (m >= FULL) { data[i + 3] = 0; cleared++; }
  else {
    // feather: the closer to background, the more transparent
    data[i + 3] = Math.round(255 * (1 - (m - SOFT) / (FULL - SOFT)));
    feathered++;
  }
  // keep spreading through soft pixels too, otherwise the fill stalls at the
  // rim of the drop shadow and leaves its opaque centre behind
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

const total = W * H;
console.log(`  cleared ${(100 * cleared / total).toFixed(1)}%  feathered ${(100 * feathered / total).toFixed(1)}%`);

// The drop shadow is neutral grey while the mark is saturated teal, so crop to
// the coloured artwork. That drops the shadow, which only reads correctly on
// the white background the logo was drawn for.
let x0 = W, y0 = H, x1 = -1, y1 = -1;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = idx(x, y);
  if (data[i + 3] < 40) continue;
  const mx = Math.max(data[i], data[i + 1], data[i + 2]);
  const mn = Math.min(data[i], data[i + 1], data[i + 2]);
  if (mx - mn < 28) continue;        // neutral grey: shadow, not artwork
  if (x < x0) x0 = x; if (x > x1) x1 = x;
  if (y < y0) y0 = y; if (y > y1) y1 = y;
}
const pad = 3;
const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad);
const cw = Math.min(W - left, x1 - x0 + 1 + pad * 2);
const ch = Math.min(H - top, y1 - y0 + 1 + pad * 2);
console.log(`  colour bbox ${cw}x${ch} at ${left},${top} (source ${W}x${H})`);

await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } })
  .extract({ left, top, width: cw, height: ch })
  .png()
  .toFile(OUT);

// Square icons for the hub's browser tab. The full mark is a wide sweep that
// becomes an illegible smear at 16px, so the icons crop to the hook and globe
// — the half that still reads at tab size.
const ICONS = [16, 32, 180, 192];
const square = await sharp(OUT)
  .extract({ left: 0, top: 0, width: Math.round(cw * 0.52), height: ch })
  .resize({ width: ch, height: ch, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

for (const size of ICONS) {
  const file = `public/vanikar-icon-${size}.png`;
  await sharp(square).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
}
console.log(`  icons: ${ICONS.map(s => `${s}px`).join(', ')} -> public/vanikar-icon-*.png`);

// Wide mark for the hub's nav brand, which sizes by height
await sharp(OUT).resize({ height: 64 }).png({ compressionLevel: 9 }).toFile('public/vanikar-mark.png');
console.log('  nav mark: public/vanikar-mark.png');

const m = await sharp(OUT).metadata();
console.log(`  wrote ${path.basename(OUT)}  ${m.width}x${m.height}`);
