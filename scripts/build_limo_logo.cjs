const fs = require('fs');

const crestD = fs.readFileSync('public/clean_crest_d.txt', 'utf8').trim();

const fileContent = `import React, { useId } from 'react';

// Exact authentic vector crest path of Limo Raf (crown, French shield, script 'R', baroque acanthus scrolls)
const CREST_PATH = "${crestD}";

export interface LimoLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark';
  subline?: string;
  title?: string;
}

export const LimoLogo: React.FC<LimoLogoProps> = ({
  className = 'h-11 w-auto',
  variant = 'horizontal',
  subline = 'Montréal · depuis 2021',
  title = 'Limo Raf — Chauffeur Privé',
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const goldGradId = "limoGoldGrad-" + id;

  // 1. Standalone Crest Emblem (Ultra-clear, bold, razor-sharp on any screen)
  if (variant === 'mark') {
    return (
      <svg
        viewBox="60 10 165 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label={title}
        role="img"
      >
        <title>{title}</title>
        <defs>
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DA" />
            <stop offset="25%" stopColor="#F5D67A" />
            <stop offset="60%" stopColor="#D7B65D" />
            <stop offset="100%" stopColor="#A87A22" />
          </linearGradient>
        </defs>
        <path d={CREST_PATH} fill={"url(#" + goldGradId + ")"} fillRule="evenodd" />
      </svg>
    );
  }

  // 2. Full Majestic Stacked Emblem (Crest on top, bold serif LIMO RAF, tagline with stars)
  if (variant === 'full') {
    return (
      <svg
        viewBox="0 0 260 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label={title}
        role="img"
      >
        <title>{title}</title>
        <defs>
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DA" />
            <stop offset="25%" stopColor="#F5D67A" />
            <stop offset="60%" stopColor="#D7B65D" />
            <stop offset="100%" stopColor="#A87A22" />
          </linearGradient>
        </defs>

        {/* Central Crest */}
        <g transform="translate(130, 42)">
          <g transform="scale(0.72) translate(-142.5, -48)">
            <path d={CREST_PATH} fill={"url(#" + goldGradId + ")"} fillRule="evenodd" />
          </g>
        </g>

        {/* Wordmark: LIMO RAF */}
        <text
          x="130"
          y="112"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="30"
          fontWeight="600"
          letterSpacing="5"
          fill={"url(#" + goldGradId + ")"}
        >
          LIMO RAF
        </text>

        {/* Tagline */}
        <text
          x="130"
          y="136"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="13"
          fontWeight="500"
          letterSpacing="2.8"
          fill={"url(#" + goldGradId + ")"}
        >
          ★ ★ ★   ride with elegance   ★ ★ ★
        </text>
      </svg>
    );
  }

  // 3. Default: Horizontal Layout for Navbar & Footers (Crisp Crest + Two-Tone Wordmark + Subline)
  return (
    <svg
      viewBox="0 0 340 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
      role="img"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9DA" />
          <stop offset="25%" stopColor="#F5D67A" />
          <stop offset="60%" stopColor="#D7B65D" />
          <stop offset="100%" stopColor="#A87A22" />
        </linearGradient>
      </defs>

      {/* Crest on Left */}
      <g transform="translate(42, 34)">
        <g transform="scale(0.52) translate(-142.5, -48)">
          <path d={CREST_PATH} fill={"url(#" + goldGradId + ")"} fillRule="evenodd" />
        </g>
      </g>

      {/* Luxury Serif Wordmark: LIMO in white, RAF in signature radiant gold */}
      <text
        x="96"
        y="36"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="27"
        fontWeight="600"
        letterSpacing="4.5"
        fill="#FFFFFF"
      >
        LIMO <tspan fill={"url(#" + goldGradId + ")"}>RAF</tspan>
      </text>

      {/* Editorial Subline */}
      <text
        x="97"
        y="52"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontSize="12"
        fontWeight="500"
        letterSpacing="1.5"
        fill="#D7B65D"
      >
        {subline}
      </text>
    </svg>
  );
};
`;

fs.writeFileSync('src/components/ui/LimoLogo.tsx', fileContent);
console.log('Saved src/components/ui/LimoLogo.tsx');

const standaloneSvg = '<svg viewBox="0 0 260 170" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
'  <defs>\n' +
'    <linearGradient id="limoGold" x1="0%" y1="0%" x2="100%" y2="100%">\n' +
'      <stop offset="0%" stop-color="#FFF9DA" />\n' +
'      <stop offset="25%" stop-color="#F5D67A" />\n' +
'      <stop offset="60%" stop-color="#D7B65D" />\n' +
'      <stop offset="100%" stop-color="#A87A22" />\n' +
'    </linearGradient>\n' +
'  </defs>\n' +
'  <g transform="translate(130, 42)">\n' +
'    <g transform="scale(0.72) translate(-142.5, -48)">\n' +
'      <path d="' + crestD + '" fill="url(#limoGold)" fill-rule="evenodd" />\n' +
'    </g>\n' +
'  </g>\n' +
'  <text x="130" y="112" text-anchor="middle" font-family="\'Cormorant Garamond\', Georgia, serif" font-size="30" font-weight="600" letter-spacing="5" fill="url(#limoGold)">\n' +
'    LIMO RAF\n' +
'  </text>\n' +
'  <text x="130" y="136" text-anchor="middle" font-family="\'Cormorant Garamond\', Georgia, serif" font-style="italic" font-size="13" font-weight="500" letter-spacing="2.8" fill="url(#limoGold)">\n' +
'    ★ ★ ★   ride with elegance   ★ ★ ★\n' +
'  </text>\n' +
'</svg>\n';

fs.writeFileSync('public/limo-logo.svg', standaloneSvg);
console.log('Saved public/limo-logo.svg');
