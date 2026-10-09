import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingPanelProps {
  /** Element the panel is positioned against (usually the field wrapper) */
  anchorRef: React.RefObject<HTMLElement | null>;
  /** Ref to the panel itself, so outside-click handlers can ignore clicks inside it */
  panelRef: React.RefObject<HTMLDivElement | null>;
  /** Minimum panel width in px; the panel is never narrower than the anchor */
  minWidth?: number;
  /** Align the panel to the anchor's left or right edge */
  align?: 'left' | 'right';
  /** Optional cap on the panel height in px */
  maxHeight?: number;
  className?: string;
  children: React.ReactNode;
}

const GUTTER = 8;
const OFFSET = 6;

/**
 * Dropdown panel rendered into <body> with fixed positioning, so it can never be
 * clipped by an `overflow: hidden` section or covered by the next section.
 * Opens below the anchor, or above it when there isn't enough room below.
 */
export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  anchorRef,
  panelRef,
  minWidth = 0,
  align = 'left',
  maxHeight: maxHeightCap,
  className = '',
  children,
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({ position: 'fixed', top: 0, left: 0, visibility: 'hidden' });

  useLayoutEffect(() => {
    const update = () => {
      const anchor = anchorRef.current;
      const panel = panelRef.current;
      if (!anchor || !panel) return;

      const r = anchor.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = Math.min(Math.max(r.width, minWidth), vw - GUTTER * 2);

      let left = align === 'right' ? r.right - width : r.left;
      left = Math.max(GUTTER, Math.min(left, vw - width - GUTTER));

      const height = panel.offsetHeight;
      const below = vh - r.bottom - OFFSET - GUTTER;
      const above = r.top - OFFSET - GUTTER;
      const openUp = height > below && above > below;
      const fit = Math.max(160, openUp ? above : below);
      const maxHeight = maxHeightCap ? Math.min(maxHeightCap, fit) : fit;

      setStyle({
        position: 'fixed',
        left,
        width,
        maxHeight,
        zIndex: 1000,
        ...(openUp ? { bottom: vh - r.top + OFFSET } : { top: r.bottom + OFFSET }),
      });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    const ro = new ResizeObserver(update);
    if (panelRef.current) ro.observe(panelRef.current);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      ro.disconnect();
    };
  }, [anchorRef, panelRef, minWidth, align, maxHeightCap]);

  return createPortal(
    <div ref={panelRef} style={style} data-lenis-prevent className={className}>
      {children}
    </div>,
    document.body
  );
};
