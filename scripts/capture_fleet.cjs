const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // 1440px desktop
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForSelector('#fleet');
  let el = await page.$('#fleet');
  await el.screenshot({ path: 'baseline_fleet_1440_element.png' });
  console.log('Saved baseline_fleet_1440_element.png');

  // 390px mobile
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForSelector('#fleet');
  el = await page.$('#fleet');
  await el.screenshot({ path: 'baseline_fleet_390_element.png' });
  console.log('Saved baseline_fleet_390_element.png');

  await browser.close();
  console.log('Done capturing fleet element screenshots!');
})();
