const { chromium } = require('playwright');
const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const imgPath = path.resolve('public/logo.png');
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  
  // Extract pure binarized mask from alpha channel
  const maskBase64 = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const alpha = d[i + 3];
          // If pixel has opacity, make it black (foreground), else white (background)
          if (alpha > 40) {
            d[i] = 0;
            d[i + 1] = 0;
            d[i + 2] = 0;
            d[i + 3] = 255;
          } else {
            d[i] = 255;
            d[i + 1] = 255;
            d[i + 2] = 255;
            d[i + 3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png').split(',')[1]);
      };
      img.src = 'data:image/png;base64,' + b64;
    });
  }, imgBase64);

  fs.writeFileSync('public/logo_mask.png', Buffer.from(maskBase64, 'base64'));
  console.log('Saved public/logo_mask.png');

  // Now trace the mask with potrace
  potrace.trace('public/logo_mask.png', {
    optCurve: true,
    alphaMax: 1.0,
    threshold: 128,
    optTolerance: 0.2,
    turdSize: 2,
    turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY
  }, (err, svg) => {
    if (err) throw err;
    fs.writeFileSync('public/logo_traced_alpha.svg', svg);
    console.log('Saved public/logo_traced_alpha.svg');
  });

  await browser.close();
})();
