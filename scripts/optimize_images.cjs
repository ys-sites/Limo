// Converts heavy JPG/PNG images referenced by the site into WebP siblings.
// Usage: node scripts/optimize_images.cjs <file> [<file> ...]
// Output: same path with a .webp extension (alpha preserved, max 1920px wide).
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 1920;

(async () => {
  const files = process.argv.slice(2);
  let before = 0;
  let after = 0;

  for (const file of files) {
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const meta = await sharp(file).metadata();
    await sharp(file)
      .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
      .webp({ quality: meta.hasAlpha ? 82 : 78, alphaQuality: 90, effort: 6 })
      .toFile(out);

    const a = fs.statSync(file).size;
    const b = fs.statSync(out).size;
    before += a;
    after += b;
    console.log(`${Math.round(a / 1024)}KB -> ${Math.round(b / 1024)}KB  ${path.basename(out)}`);
  }

  console.log(`Total: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
})();
