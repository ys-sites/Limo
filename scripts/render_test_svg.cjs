const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  
  let svgContent = fs.readFileSync('public/logo_traced_alpha.svg', 'utf8');
  // Inject gradient definition and replace fill="black" with url(#gold)
  const defs = `
    <defs>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF6C5" />
        <stop offset="30%" stop-color="#F2CF66" />
        <stop offset="65%" stop-color="#D7B65D" />
        <stop offset="100%" stop-color="#A87A22" />
      </linearGradient>
    </defs>
  `;
  svgContent = svgContent.replace('<svg ', '<svg style="width: 500px; height: auto;" ');
  svgContent = svgContent.replace('fill="black"', 'fill="url(#gold)"');
  svgContent = svgContent.replace('>', '>' + defs);
  
  const html = `
    <html>
      <body style="background: #07080A; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
        ${svgContent}
      </body>
    </html>
  `;
  
  await page.setContent(html);
  await page.screenshot({ path: 'test_traced_gold.png' });
  console.log('Saved test_traced_gold.png');
  await browser.close();
})();
