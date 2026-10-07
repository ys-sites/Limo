import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, Variants, Transition } from 'motion/react';
import type Lenis from 'lenis';

// Single source of truth for easing across the site
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transitionReveal = (duration = 0.85, delay = 0): Transition => ({
  duration,
  delay,
  ease: LUXURY_EASE,
});

export const transitionHover: Transition = {
  duration: 0.25,
  ease: LUXURY_EASE,
};

// Global Lenis ref for coordinated anchor scrolling
let globalLenis: Lenis | null = null;

export const setGlobalLenis = (lenis: Lenis | null) => {
  globalLenis = lenis;
};

export const scrollToAnchor = (target: string, offset = -70) => {
  if (globalLenis) {
    globalLenis.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};

/**
 * Headline Reveal:
 * Splits text into lines; each line slides up from y: 110% inside an overflow-hidden mask.
 * 0.08s stagger, triggers once at 20% in view.
 */
interface HeadlineRevealProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  highlightLastItalic?: boolean;
}

export const HeadlineReveal: React.FC<HeadlineRevealProps> = ({
  lines,
  as: Component = 'h2',
  className = '',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 0.85,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="block"
      >
        {lines.map((line, idx) => (
          <span key={idx} className="block overflow-hidden py-0.5">
            <motion.span
              variants={lineVariants}
              className="block"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          </span>
        ))}
      </motion.span>
    </Component>
  );
};

/**
 * Editorial Eyebrow:
 * Small caps label (11px, tracking-[0.18em]) + 24px gold hairline, no pill background.
 */
interface SectionEyebrowProps {
  text: string;
  className?: string;
  color?: string;
  hairlineColor?: string;
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  text,
  className = '',
  color = 'text-[#D7B65D]',
  hairlineColor = 'bg-[#D7B65D]',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 mb-4 ${className}`}>
      <span className={`w-6 h-[1px] ${hairlineColor} shrink-0`} />
      <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${color}`}>
        {text}
      </span>
    </div>
  );
};

/**
 * Editorial Section Numeral:
 * Thin, large serif numeral (02, 04, 05, etc.) in the margin, consistent across all sections.
 */
interface SectionNumeralProps {
  numeral: string;
  className?: string;
  light?: boolean;
}

export const SectionNumeral: React.FC<SectionNumeralProps> = ({
  numeral,
  className = '',
  light = false,
}) => {
  return (
    <span
      className={`font-display text-4xl sm:text-5xl lg:text-6xl font-normal select-none pointer-events-none ${
        light ? 'text-neutral-300' : 'text-neutral-800'
      } ${className}`}
      aria-hidden="true"
    >
      {numeral}
    </span>
  );
};

/**
 * Magnetic Button:
 * Desktop-only subtle cursor magnetic pull (max 6px).
 * Arrow nudges 3px on hover.
 */
interface MagneticButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  children: React.ReactNode;
  variant?: 'primary' | 'dark' | 'outline';
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || window.innerWidth < 1024 || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = ((clientX - (left + width / 2)) / (width / 2)) * 5;
    const y = ((clientY - (top + height / 2)) / (height / 2)) * 5;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary: 'bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-semibold',
    dark: 'bg-[#0E1015] hover:bg-black text-[#ECE7DE] border border-neutral-800 font-semibold',
    outline: 'bg-transparent border border-neutral-700 hover:border-[#D7B65D] text-white',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.14em] transition-colors rounded-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
