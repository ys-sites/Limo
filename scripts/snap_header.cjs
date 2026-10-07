const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  for (const width of [1920, 1536, 1440, 1280]) {
    const context = await browser.newContext({
      viewport: { width, height: 800 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const header = await page.$('header');
    if (header) {
      await header.screenshot({ path: path.join(__dirname, `../dist/header_${width}.png`) });
      console.log(`Saved header_${width}.png`);
    }
    await context.close();
  }
  await browser.close();
}

main().catch(console.error);
