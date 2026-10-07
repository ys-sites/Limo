const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173');
  await page.waitForSelector('header');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_navbar.png', clip: { x: 0, y: 0, width: 390, height: 100 } });
  console.log('Saved mobile_navbar.png');

  // Click hamburger
  const hamburger = await page.$('button[aria-label="Ouvrir le menu"]');
  if (hamburger) {
    await hamburger.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'mobile_drawer.png', clip: { x: 0, y: 0, width: 390, height: 260 } });
    console.log('Saved mobile_drawer.png');
  }

  await browser.close();
})();
