const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  
  const crestD = fs.readFileSync('public/clean_crest_d.txt', 'utf8');
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            background: #07080A;
            margin: 0;
            padding: 40px;
            display: flex;
            flex-direction: column;
            gap: 36px;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <!-- Option 1: Horizontal with Cormorant Garamond Serif -->
        <svg viewBox="0 0 340 68" style="width: 340px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <g transform="translate(42, 34)">
            <g transform="scale(0.52) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#g1)" fill-rule="evenodd" />
            </g>
          </g>
          <text x="96" y="36" font-family="'Cormorant Garamond', Georgia, serif" font-size="27" font-weight="600" letter-spacing="4.5" fill="#FFFFFF">
            LIMO <tspan fill="url(#g1)">RAF</tspan>
          </text>
          <text x="97" y="52" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="12" font-weight="500" letter-spacing="1.5" fill="#D7B65D">
            Montréal · depuis 2021
          </text>
        </svg>

        <!-- Option 2: Horizontal with Modern Editorial Sans (Plus Jakarta Sans) -->
        <svg viewBox="0 0 340 68" style="width: 340px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <g transform="translate(42, 34)">
            <g transform="scale(0.52) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#g2)" fill-rule="evenodd" />
            </g>
          </g>
          <text x="96" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" letter-spacing="3.5" fill="#FFFFFF">
            LIMO <tspan fill="url(#g2)">RAF</tspan>
          </text>
          <text x="97" y="50" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="12.5" font-weight="500" letter-spacing="1.2" fill="#D7B65D">
            Montréal · depuis 2021
          </text>
        </svg>

        <!-- Option 3: All-Gold Serif -->
        <svg viewBox="0 0 340 68" style="width: 340px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <g transform="translate(42, 34)">
            <g transform="scale(0.52) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#g3)" fill-rule="evenodd" />
            </g>
          </g>
          <text x="96" y="36" font-family="'Cormorant Garamond', Georgia, serif" font-size="27" font-weight="600" letter-spacing="4.5" fill="url(#g3)">
            LIMO RAF
          </text>
          <text x="97" y="52" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="12" font-weight="500" letter-spacing="1.5" fill="url(#g3)">
            Montréal · depuis 2021
          </text>
        </svg>

        <!-- Option 4: Full Stacked Emblem -->
        <svg viewBox="0 0 260 170" style="width: 260px; height: auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFF8D6" />
              <stop offset="25%" stop-color="#F2CF66" />
              <stop offset="65%" stop-color="#D7B65D" />
              <stop offset="100%" stop-color="#A87A22" />
            </linearGradient>
          </defs>
          <g transform="translate(130, 42)">
            <g transform="scale(0.72) translate(-142.5, -48)">
              <path d="${crestD}" fill="url(#g4)" fill-rule="evenodd" />
            </g>
          </g>
          <text x="130" y="112" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="30" font-weight="600" letter-spacing="5" fill="url(#g4)">
            LIMO RAF
          </text>
          <text x="130" y="136" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-size="13" font-weight="500" letter-spacing="2.8" fill="url(#g4)">
            ★ ★ ★   ride with elegance   ★ ★ ★
          </text>
        </svg>
      </body>
    </html>
  `;
  
  await page.setContent(html);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test_font_options.png' });
  console.log('Saved test_font_options.png');
  await browser.close();
})();
