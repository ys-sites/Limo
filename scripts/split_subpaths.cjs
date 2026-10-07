const fs = require('fs');

const svg = fs.readFileSync('public/logo_traced_alpha.svg', 'utf8');
const dMatch = svg.match(/d="([^"]+)"/);
if (!dMatch) {
  console.log('No d attribute found');
  process.exit(1);
}

const fullD = dMatch[1];
// Split by 'M '
const subpaths = fullD.split(/(?=M\s)/).filter(Boolean);
console.log('Total subpaths:', subpaths.length);

const crestSubpaths = [];
const textSubpaths = [];
const taglineSubpaths = [];

for (const sp of subpaths) {
  // Find min/max Y coordinates in this subpath
  // Extract all numbers after commands or coordinates
  const coords = sp.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (!coords) continue;
  // In SVG path data, coordinates are pairs (x, y) or similar. Let's find maxY and minY.
  let maxY = -Infinity;
  let minY = Infinity;
  // Starting coordinate after M is x y
  const mMatch = sp.match(/M\s+([0-9.]+)\s+([0-9.]+)/);
  if (mMatch) {
    const startY = parseFloat(mMatch[2]);
    if (startY < 89) {
      crestSubpaths.push(sp);
    } else if (startY < 140) {
      textSubpaths.push(sp);
    } else {
      taglineSubpaths.push(sp);
    }
  }
}

console.log('Crest subpaths:', crestSubpaths.length);
console.log('Text subpaths:', textSubpaths.length);
console.log('Tagline subpaths:', taglineSubpaths.length);

fs.writeFileSync('public/crest_paths.txt', crestSubpaths.join(' '));
fs.writeFileSync('public/text_paths.txt', textSubpaths.join(' '));
fs.writeFileSync('public/tagline_paths.txt', taglineSubpaths.join(' '));
