const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:5173');
  await page.waitForSelector('#coverage');
  await page.waitForTimeout(1000);
  const el = await page.$('#coverage');
  await el.screenshot({ path: 'updated_coverage_section.png' });
  console.log('Saved updated_coverage_section.png');
  await browser.close();
})();
