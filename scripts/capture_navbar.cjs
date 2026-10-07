const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  await page.waitForSelector('header');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'current_navbar.png', clip: { x: 0, y: 0, width: 1440, height: 120 } });
  console.log('Saved current_navbar.png');
  await browser.close();
})();
