import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { BookingWidget } from './BookingWidget';
import { HERO_IMAGE, CLIENT_INFO } from '../data/limoData';
import { Phone, ArrowRight } from 'lucide-react';
import { LUXURY_EASE, scrollToAnchor } from '../lib/motion';
import { srcSetFor } from '../lib/images';

// Portrait-friendly photo for phones/tablets: the landscape car shot crops to an unreadable
// sliver on a tall screen, while this cabin scene keeps its subject in frame.
const MOBILE_HERO_IMAGE = '/images/about_discretion_vip.webp';
const MOBILE_HERO_IMAGE_SM = '/images/about_discretion_vip-768.webp';

interface HeroProps {
  language: 'FR' | 'EN';
  onReserveClick?: () => void;
  onViewAllDestinations?: () => void;
  onCallback: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  language, 
  onReserveClick, 
  onViewAllDestinations, 
  onCallback 
}) => {
  const isFr = language === 'FR';
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle scroll parallax: 0 -> 80px as user scrolls through the hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0px', shouldReduceMotion ? '0px' : '80px']);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#07080A]"
    >
      {/* Background Cinematic Image with Entrance Zoom & Scroll Parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-x-0 top-0 h-[78svh] lg:h-auto lg:inset-0 z-0 will-change-transform"
      >
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet={`${MOBILE_HERO_IMAGE_SM} 768w, ${MOBILE_HERO_IMAGE} 1200w`}
            sizes="100vw"
          />
          <motion.img
            initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: LUXURY_EASE }}
            src={HERO_IMAGE}
            srcSet={srcSetFor(HERO_IMAGE)}
            sizes="100vw"
            alt="Limo Raf Chauffeur Privé Montréal Cadillac Escalade"
            className="w-full h-full object-cover object-[10%_15%] lg:object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Desktop: much more visible background with soft side gradient behind left text */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#07080A]/80 via-[#07080A]/35 to-transparent" />
        <div className="hidden lg:block absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080A] via-[#07080A]/60 to-transparent pointer-events-none" />
        {/* Mobile: keep the photo bright, shade only under the nav and fade into the form */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#07080A]/70 via-[#07080A]/20 via-35% to-[#07080A]" />
      </motion.div>

      {/* Main Content Grid: Left Editorial Statement, Right Booking Widget */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[33svh] sm:pt-[36svh] pb-12 lg:pt-36 lg:pb-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 lg:space-y-7 text-white max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Location Line: Plain small caps, no pill background */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="hidden lg:block w-6 h-[1px] bg-[#D7B65D] shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D7B65D] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
                {isFr
                  ? 'Montréal · YUL · Laval · Mont-Tremblant — 24/7'
                  : 'Montréal · YUL · Laval · Mont-Tremblant — 24/7'}
              </span>
            </motion.div>

            {/* Display Serif Headline with Masked Line Rise */}
            <h1 className="font-display text-[44px] sm:text-6xl lg:text-[72px] font-medium text-white tracking-tight leading-[1.05] [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: LUXURY_EASE }}
                  className="block"
                >
                  {isFr ? 'Votre chauffeur' : 'Your chauffeur'}
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: LUXURY_EASE }}
                  className="block text-[#D7B65D]"
                >
                  {isFr ? 'vous attend.' : 'is waiting.'}
                </motion.span>
              </span>
            </h1>

            {/* Human Tone Subtext: 15–16px standard fade */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: LUXURY_EASE }}
              className="hidden lg:block text-base sm:text-[17px] text-neutral-200 font-light leading-relaxed max-w-lg [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]"
            >
              {isFr
                ? "Transferts aéroport, déplacements d'affaires et longues distances en VUS noir, avec un chauffeur qui connaît la route."
                : "Airport runs, business days and long drives in a black SUV, with a chauffeur who knows the road."}
            </motion.p>

            {/* Action Buttons: Solid primary CTA + Liquid Glass View All Destinations + Direct Phone */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: LUXURY_EASE }}
              className="hidden lg:flex pt-2 flex-wrap items-center gap-4 sm:gap-5"
            >
              <button
                type="button"
                onClick={onReserveClick || (() => {
                  const card = document.getElementById('booking-card');
                  if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const input = card.querySelector('input') as HTMLInputElement | null;
                    if (input) setTimeout(() => input.focus(), 350);
                  }
                })}
                className="group inline-flex items-center gap-3 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_24px_rgba(215,182,93,0.35)] active:scale-[0.98]"
              >
                <span>{isFr ? 'Réserver un trajet' : 'Book a ride'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {onViewAllDestinations && (
                <button
                  type="button"
                  onClick={onViewAllDestinations}
                  className="group inline-flex items-center gap-2.5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white liquid-glass-pill hover:border-[#D7B65D]/60 hover:text-white transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_30px_rgba(0,0,0,0.5)] active:scale-[0.98]"
                >
                  <span>{isFr ? 'Toutes les destinations' : 'All destinations'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D7B65D] transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              )}

              <a
                href={`tel:${CLIENT_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white tabular-nums tracking-tight transition-all py-2 px-3 rounded-lg hover:bg-white/[0.05] cursor-pointer"
                aria-label="Appeler Limo Raf"
              >
                <Phone className="w-4 h-4 text-[#D7B65D]" />
                <span>{CLIENT_INFO.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Booking Card Slide-in */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: LUXURY_EASE }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <BookingWidget language={language} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Down Line Indicator */}
      <div className="hidden lg:block relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToAnchor('#about', -80);
          }}
          className="inline-flex items-center gap-3 text-xs text-neutral-400 hover:text-[#D7B65D] transition-colors group"
        >
          <div className="w-[1px] h-8 bg-neutral-700 relative overflow-hidden">
            <motion.div
              animate={shouldReduceMotion ? {} : { y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-full h-1/2 bg-[#D7B65D]"
            />
          </div>
          <span className="text-[11px] uppercase tracking-[0.18em]">
            {isFr ? 'Défiler' : 'Scroll'}
          </span>
        </a>
      </div>
    </section>
  );
};
