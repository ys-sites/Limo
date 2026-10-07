const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Hero heading
  const heroEl = await page.$('#hero, section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(__dirname, '../dist/snap_hero.png') });
    console.log('Saved snap_hero.png');
  }

  // 2. Services section
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.screenshot({ path: path.join(__dirname, '../dist/snap_services.png') });
    console.log('Saved snap_services.png');
  }

  // 3. Advantages section (with stacking cards & title 'g')
  const advEl = await page.$('#advantages');
  if (advEl) {
    await advEl.screenshot({ path: path.join(__dirname, '../dist/snap_advantages.png') });
    console.log('Saved snap_advantages.png');
  }

  // 4. Cities section
  const citiesEl = await page.$('#cities');
  if (citiesEl) {
    await citiesEl.screenshot({ path: path.join(__dirname, '../dist/snap_cities.png') });
    console.log('Saved snap_cities.png');
  }

  // 5. Reviews section
  const revEl = await page.$('#reviews, section:has-text("Google Reviews")');
  if (revEl) {
    await revEl.screenshot({ path: path.join(__dirname, '../dist/snap_reviews.png') });
    console.log('Saved snap_reviews.png');
  }

  // 6. Footer section
  const footerEl = await page.$('footer#contact');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(__dirname, '../dist/snap_footer.png') });
    console.log('Saved snap_footer.png');
  }

  await browser.close();
  console.log('All verification snapshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
