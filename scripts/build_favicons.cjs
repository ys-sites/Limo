const fs = require('fs');

const crestD = fs.readFileSync('public/clean_crest_d.txt', 'utf8').trim();

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#07080A"/>
  <rect x="1" y="1" width="62" height="62" rx="13" stroke="url(#goldGradient)" stroke-width="1.2" stroke-opacity="0.5"/>
  <g transform="translate(32, 32)">
    <g transform="scale(0.31) translate(-142.5, -48)">
      <path d="${crestD}" fill="url(#goldGradient)" fill-rule="evenodd" />
    </g>
  </g>
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9DA"/>
      <stop offset="25%" stop-color="#F5D67A"/>
      <stop offset="60%" stop-color="#D7B65D"/>
      <stop offset="100%" stop-color="#A87A22"/>
    </linearGradient>
  </defs>
</svg>
`;

fs.writeFileSync('public/limo-logo-tab.svg', faviconSvg);
fs.writeFileSync('public/favicon.svg', faviconSvg);
console.log('Saved public/limo-logo-tab.svg and public/favicon.svg');
