const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imgPath = path.resolve('public/logo.png');
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  
  const info = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = 'data:image/png;base64,' + b64;
    });
  }, imgBase64);
  
  console.log('Image dimensions:', info);
  await browser.close();
})();
