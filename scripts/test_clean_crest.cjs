const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 600, height: 400 } });
  
  const crestD = fs.readFileSync('public/clean_crest_d.txt', 'utf8');
  
  const html = `
    <html>
      <body style="background: #07080A; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
        <svg viewBox="60 10 165 80" style="width: 380px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF6C5" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <path d="${crestD}" fill="url(#crestGold)" fill-rule="evenodd" />
        </svg>
      </body>
    </html>
  `;
  
  await page.setContent(html);
  await page.screenshot({ path: 'test_clean_crest.png' });
  console.log('Saved test_clean_crest.png');
  await browser.close();
})();
