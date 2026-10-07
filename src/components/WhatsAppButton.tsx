/**
 * WhatsAppButton — Compositor-only animation, zero layout/paint triggers.
 * Sourced directly from YS-MARKETING-SOLUTION.
 *
 * Architecture: two absolutely-positioned <a> elements rendered at all times.
 * – State A (circle):  opacity/scale → collapsed look (52×52px)
 * – State B (pill):    opacity/scale → expanded look (anchored right)
 * Crossfade is 100% transform + opacity — no width, no box-shadow, no filter animation.
 *
 * Glow: a static radial-gradient div whose ONLY animating property is opacity.
 * Pulse: border-only keyframe using transform:scale + opacity — compositor-safe.
 */

import React, { useEffect, useRef, useState } from 'react';
import { CLIENT_INFO } from '../data/limoData';

interface WhatsAppButtonProps {
  language?: 'FR' | 'EN';
  whatsappUrl?: string;
}

// ─── Official WhatsApp SVG Icon (zero external dependency) ───────────────────
function WhatsAppIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4C13.0 4 4 13.0 4 24c0 3.6 1.0 7.0 2.7 9.9L4 44l10.4-2.7C17.1 42.9 20.5 44 24 44c11.0 0 20-9.0 20-20S35.0 4 24 4Zm0 36.4c-3.2 0-6.2-.9-8.8-2.4l-.6-.4-7.0 1.6 1.6-6.8-.4-.6C7.1 29.6 6.2 26.9 6.2 24c0-9.8 8-17.8 17.8-17.8S41.8 14.2 41.8 24 33.8 40.4 24 40.4Zm9.8-13.3c-.5-.3-3.1-1.5-3.6-1.7-.5-.2-.8-.3-1.2.3-.4.5-1.4 1.7-1.7 2.1-.3.4-.6.4-1.1.1-3-1.5-5-2.7-7-6.1-.5-.9.5-.8 1.5-2.8.2-.4.1-.7-.1-1l-1.7-4.1c-.4-1.1-.9-.9-1.2-.9h-1c-.4 0-1 .1-1.5.7-.5.6-2 1.9-2 4.7 0 2.7 2 5.4 2.3 5.7.3.4 3.9 6 9.5 8.4 3.5 1.5 4.9 1.6 6.6 1.4 1.1-.1 3.3-1.3 3.8-2.6.5-1.3.5-2.4.3-2.6-.2-.3-.5-.4-1-.7Z"
        fill="white"
      />
    </svg>
  );
}

// ─── Shared Constants ─────────────────────────────────────────────────────────
const SIZE    = 52;   // height and diameter (px)
const BG      = 'linear-gradient(135deg, #25D366 0%, #1ebe5e 100%)';
// Static shadow — never animated; paint cost is zero at steady state
const SHADOW  = '0 4px 20px rgba(37,211,102,0.42), 0 2px 6px rgba(0,0,0,0.10)';

// Transition strings — only compositor properties
const T_SPRING = 'transform 0.26s cubic-bezier(0.34, 1.56, 0.64, 1)';
const T_FADE   = 'opacity 0.18s ease';
const T_ENTER  = `${T_SPRING}, ${T_FADE}`;

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  language = 'FR',
  whatsappUrl = CLIENT_INFO.whatsappUrl,
}) => {
  const isFr = language === 'FR';
  const label = isFr ? 'Discuter avec nous' : 'Chat with us';

  const [entered,  setEntered]  = useState(false);  // entrance slide-up
  const [expanded, setExpanded] = useState(false);  // desktop hover

  // Guard against hover state sticking on touch devices
  const supportsHoverRef = useRef<boolean | null>(null);
  const getSupportsHover = () => {
    if (supportsHoverRef.current === null) {
      supportsHoverRef.current =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return supportsHoverRef.current;
  };

  useEffect(() => {
    // Entrance: slight delay so the page content loads first
    const t = setTimeout(() => setEntered(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Auto-expand removed: the pill kept covering page content on mobile and
  // felt intrusive. The compact circle remains the single WhatsApp CTA;
  // the pill still expands on hover for desktop pointers.
  const isExpanded = expanded;

  const handleMouseEnter = () => { if (getSupportsHover()) setExpanded(true); };
  const handleMouseLeave = () => setExpanded(false);

  // ── Common link props (both states share same destination) ──────────────────
  const linkProps = {
    href:   whatsappUrl,
    target: '_blank' as const,
    rel:    'noopener noreferrer',
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <>
      {/* Keyframes + responsive position injected once — no JS layout thrashing */}
      <style>{`
        #wa-root {
          position: fixed;
          bottom: 20px;
          right:  20px;
          z-index: 60;
          width: ${SIZE}px;
          height: ${SIZE}px;
          will-change: transform;
        }
        @media (min-width: 768px) {
          #wa-root { bottom: 32px; right: 32px; }
        }
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1.65); opacity: 0; }
        }
      `}</style>

      {/*
        Wrapper: position:fixed via injected CSS (#wa-root), 52×52 (circle size).
        The expanded pill overflows leftward — overflow:visible.
        will-change:transform is set in the injected CSS.
        No ancestor has transform/filter, so fixed positioning is never broken.
      */}
      <div
        id="wa-root"
        style={{
          // Entrance animation — transform+opacity only
          opacity:   entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(28px)',
          transition: T_ENTER,
        }}
      >
        {/* ── Pre-rendered glow — static radial gradient, ONLY opacity animates ── */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            top:          '50%',
            left:         '50%',
            width:         96,
            height:        96,
            borderRadius:  '50%',
            // Static gradient — no animation, no repaint
            background:   'radial-gradient(circle, rgba(37,211,102,0.55) 0%, transparent 68%)',
            // translateZ(0) ensures it's on the GPU layer
            transform:    'translate(-50%,-50%) translateZ(0)',
            // Only opacity transitions — not the gradient, not box-shadow
            opacity:       isExpanded ? 1 : 0.5,
            transition:   T_FADE,
            pointerEvents: 'none',
          }}
        />

        {/* ── Pulse ring — compositor-only keyframe (scale+opacity) ── */}
        {!isExpanded && (
          <div
            aria-hidden="true"
            style={{
              position:     'absolute',
              inset:         0,
              borderRadius:  '50%',
              border:        '2px solid rgba(37,211,102,0.65)',
              animation:     'wa-pulse 2.6s cubic-bezier(0,0,0.2,1) infinite',
              pointerEvents: 'none',
              // Isolate repaint from the rest of the page
              willChange:   'transform, opacity',
            }}
          />
        )}

        {/* ══ STATE A — CIRCLE (collapsed) ══════════════════════════════════
            Hidden when expanded: opacity→0, scale→0.82
            Active (pointerEvents:auto) only when collapsed.                  */}
        <a
          {...linkProps}
          aria-label={isFr ? 'Discuter avec nous sur WhatsApp' : 'Chat with us on WhatsApp'}
          style={{
            position:       'absolute',
            inset:           0,
            borderRadius:   '50%',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            background:      BG,
            boxShadow:       SHADOW,  // static — never animated
            cursor:         'pointer',
            textDecoration: 'none',
            willChange:     'transform, opacity',
            // Compositor-only transitions
            opacity:         isExpanded ? 0 : 1,
            transform:       isExpanded ? 'scale(0.82)' : 'scale(1)',
            transition:      T_ENTER,
            pointerEvents:   isExpanded ? 'none' : 'auto',
          }}
        >
          <WhatsAppIcon />
        </a>

        {/* ══ STATE B — PILL (expanded) ══════════════════════════════════════
            Anchored right-edge to wrapper's right edge (right:0, absolute).
            Grows leftward — no layout disruption to the page.
            Hidden when collapsed: opacity→0, scale→0.88 from right origin.  */}
        <a
          {...linkProps}
          aria-label={isFr ? 'Discuter avec nous sur WhatsApp — Écrivez-nous' : 'Chat with us on WhatsApp — Message us'}
          style={{
            position:       'absolute',
            top:             0,
            right:           0,
            height:          SIZE,
            paddingRight:   20,
            display:        'flex',
            alignItems:     'center',
            borderRadius:   9999,
            background:      BG,
            boxShadow:       SHADOW,  // static — never animated
            cursor:         'pointer',
            textDecoration: 'none',
            whiteSpace:     'nowrap',
            willChange:     'transform, opacity',
            transformOrigin:'right center',
            // Compositor-only transitions
            opacity:         isExpanded ? 1 : 0,
            transform:       isExpanded
              ? 'scale(1) translateX(0)'
              : 'scale(0.88) translateX(6px)',
            transition:      T_ENTER,
            pointerEvents:   isExpanded ? 'auto' : 'none',
          }}
        >
          {/* Icon slot — same size as circle state for visual continuity */}
          <span
            style={{
              width:           SIZE,
              height:          SIZE,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:      0,
            }}
          >
            <WhatsAppIcon />
          </span>

          {/* Text — always rendered in the DOM, zero layout animation */}
          <span
            style={{
              color:         'white',
              fontWeight:     700,
              fontSize:       14,
              letterSpacing: '0.01em',
              lineHeight:     1,
              fontFamily:    'inherit',
            }}
          >
            {label}
          </span>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
