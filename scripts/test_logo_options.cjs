const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  
  const crestD = fs.readFileSync('public/clean_crest_d.txt', 'utf8');
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@500;700;800&family=Cinzel:wght@600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            background: #07080A;
            margin: 0;
            padding: 40px;
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <!-- Option A: Full Stacked Emblem -->
        <svg viewBox="0 0 240 180" style="width: 280px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <!-- Crest placed at center x=120, top y=10 (width 120, height 58) -->
          <g transform="translate(120, 42)">
            <g transform="scale(0.72) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#goldGrad)" fill-rule="evenodd" />
            </g>
          </g>
          <!-- Bold Serif LIMO RAF -->
          <text x="120" y="118" text-anchor="middle" font-family="'Cinzel', 'Cormorant Garamond', serif" font-size="28" font-weight="700" letter-spacing="4" fill="url(#goldGrad)">
            LIMO RAF
          </text>
          <!-- Subline: ride with elegance flanked by stars -->
          <text x="120" y="142" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="13" font-weight="500" letter-spacing="2.5" fill="url(#goldGrad)">
            ★ ★ ★   ride with elegance   ★ ★ ★
          </text>
        </svg>

        <!-- Option B: Horizontal Layout (for Navbar) -->
        <svg viewBox="0 0 320 64" style="width: 320px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <!-- Crest on left (width ~76px, height ~37px) -->
          <g transform="translate(42, 32)">
            <g transform="scale(0.48) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#goldGrad2)" fill-rule="evenodd" />
            </g>
          </g>
          <!-- Wordmark on right -->
          <text x="96" y="34" font-family="'Cinzel', 'Cormorant Garamond', serif" font-size="22" font-weight="700" letter-spacing="3.5" fill="#FFFFFF">
            LIMO <tspan fill="url(#goldGrad2)">RAF</tspan>
          </text>
          <text x="97" y="49" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="11.5" font-weight="500" letter-spacing="1.5" fill="#D7B65D">
            Montréal · depuis 2021
          </text>
        </svg>

        <!-- Option C: Pure All-Gold Horizontal -->
        <svg viewBox="0 0 320 64" style="width: 320px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <g transform="translate(42, 32)">
            <g transform="scale(0.48) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#goldGrad3)" fill-rule="evenodd" />
            </g>
          </g>
          <text x="96" y="33" font-family="'Cinzel', 'Cormorant Garamond', serif" font-size="22" font-weight="700" letter-spacing="3.5" fill="url(#goldGrad3)">
            LIMO RAF
          </text>
          <text x="97" y="49" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="11.5" font-weight="500" letter-spacing="1.8" fill="url(#goldGrad3)">
            ride with elegance
          </text>
        </svg>
      </body>
    </html>
  `;
  
  await page.setContent(html);
  await page.waitForTimeout(1000); // Wait for Google fonts
  await page.screenshot({ path: 'test_logo_options.png' });
  console.log('Saved test_logo_options.png');
  await browser.close();
})();
