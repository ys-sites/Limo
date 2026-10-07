import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\Sharafath\\.gemini\\antigravity-ide\\brain\\c560266e-faca-44f1-8087-219dfcc9f1ed';
const srcImagesDir = 'c:\\Users\\Sharafath\\Desktop\\Website\\limo\\Limo\\src\\assets\\images';
const pubImagesDir = 'c:\\Users\\Sharafath\\Desktop\\Website\\limo\\Limo\\public\\images';

const cityCopies = [
  ['city_montreal_skyline_1791337339255.jpg', 'city_montreal.jpg'],
  ['city_laval_hub_1791337360070.jpg', 'city_laval.jpg'],
  ['city_tremblant_resort_1791337379404.jpg', 'city_tremblant.jpg'],
  ['city_quebec_chateau_1791337399183.jpg', 'city_quebec.jpg'],
  ['city_ottawa_parliament_1791337418425.jpg', 'city_ottawa.jpg'],
];

for (const [srcName, destName] of cityCopies) {
  const src = path.join(brainDir, srcName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(srcImagesDir, destName));
    fs.copyFileSync(src, path.join(pubImagesDir, destName));
    console.log(`Copied ${destName}`);
  } else {
    console.warn(`Not found: ${src}`);
  }
}
