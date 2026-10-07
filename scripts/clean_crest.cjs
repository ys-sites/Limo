const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const svg = fs.readFileSync('public/logo_traced_alpha.svg', 'utf8');
  const dMatch = svg.match(/d="([^"]+)"/);
  const fullD = dMatch[1];
  const subpaths = fullD.split(/(?=M\s)/).filter(Boolean);
  
  const trueCrest = [];
  const trueLetters = [];
  const trueTagline = [];
  
  for (const sp of subpaths) {
    await page.setContent(`<svg xmlns="http://www.w3.org/2000/svg"><path id="p" d="${sp}" /></svg>`);
    const b = await page.evaluate(() => {
      const p = document.getElementById('p');
      const box = p.getBBox();
      return { x: box.x, y: box.y, w: box.width, h: box.height, maxY: box.y + box.height };
    });
    
    if (b.maxY <= 89) {
      trueCrest.push({ sp, b });
    } else if (b.y >= 88 && b.maxY <= 140) {
      trueLetters.push({ sp, b });
    } else {
      trueTagline.push({ sp, b });
    }
  }
  
  console.log('True Crest count:', trueCrest.length);
  console.log('True Letters count:', trueLetters.length);
  console.log('True Tagline count:', trueTagline.length);
  
  const crestD = trueCrest.map(c => c.sp).join(' ');
  fs.writeFileSync('public/clean_crest_d.txt', crestD);
  
  await page.setContent(`
    <svg xmlns="http://www.w3.org/2000/svg">
      <path id="p" d="${crestD}" />
    </svg>
  `);
  const crestBBox = await page.evaluate(() => {
    const p = document.getElementById('p');
    const b = p.getBBox();
    return { x: b.x, y: b.y, width: b.width, height: b.height };
  });
  console.log('Clean Crest BBox:', crestBBox);
  
  await browser.close();
})();
