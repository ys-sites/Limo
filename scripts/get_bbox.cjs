const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const crestD = fs.readFileSync('public/crest_paths.txt', 'utf8');
  
  await page.setContent(`
    <svg xmlns="http://www.w3.org/2000/svg">
      <path id="p" d="${crestD}" />
    </svg>
  `);
  
  const bbox = await page.evaluate(() => {
    const p = document.getElementById('p');
    const b = p.getBBox();
    return { x: b.x, y: b.y, width: b.width, height: b.height };
  });
  
  console.log('Crest BBox:', bbox);
  await browser.close();
})();
