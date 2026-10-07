// Converts heavy JPG/PNG images referenced by the site into WebP siblings.
// Usage: node scripts/optimize_images.cjs <file> [<file> ...]
// Output: same path with a .webp extension (alpha preserved, max 1920px wide),
// plus a `-768.webp` mobile variant for images wider than 900px (used by srcset).
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 1920;
const MOBILE_WIDTH = 768;

const toWebp = (file, out, width, hasAlpha) =>
  sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: hasAlpha ? 82 : 78, alphaQuality: 90, effort: 6 })
    .toFile(out);

(async () => {
  const files = process.argv.slice(2);
  let before = 0;
  let after = 0;

  for (const file of files) {
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const meta = await sharp(file).metadata();
    await toWebp(file, out, Math.min(meta.width, MAX_WIDTH), meta.hasAlpha);

    const a = fs.statSync(file).size;
    const b = fs.statSync(out).size;
    before += a;
    after += b;
    let line = `${Math.round(a / 1024)}KB -> ${Math.round(b / 1024)}KB  ${path.basename(out)}`;

    if (meta.width > 900) {
      const mobileOut = out.replace(/\.webp$/, `-${MOBILE_WIDTH}.webp`);
      await toWebp(file, mobileOut, MOBILE_WIDTH, meta.hasAlpha);
      line += `  (mobile ${Math.round(fs.statSync(mobileOut).size / 1024)}KB)`;
    }
    console.log(line);
  }

  console.log(`Total: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
})();
