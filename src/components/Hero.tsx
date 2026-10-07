import React from 'react';
import { motion } from 'motion/react';
import { BookingWidget } from './BookingWidget';
import { BookingState } from '../types/limo';
import { HERO_IMAGE, CLIENT_INFO } from '../data/limoData';
import { MessageSquare } from 'lucide-react';
import { ShinyText } from './ui/ShinyText';
import { FoldText } from './ui/FoldText';

interface HeroProps {
  language: 'FR' | 'EN';
  onReserve: (booking: BookingState) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onReserve }) => {
  const isFr = language === 'FR';

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-neutral-950">
      {/* Background Cinematic Image matching screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Limo Raf Chauffeur Privé Montréal Cadillac Escalade"
          className="w-full h-full object-cover object-center filter brightness-[0.82]"
          referrerPolicy="no-referrer"
        />
        {/* Soft linear gradient overlays for luxury contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/45" />
      </div>

      {/* Main Content: Headline on Left, Booking Card on Right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16 lg:pt-36 lg:pb-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Headline & Explore More with Blacklane-style smooth entrance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-white max-w-xl"
          >
            {/* VIP Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-[#D7B65D]/40 rounded-full text-[11px] text-[#F5D577] font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isFr ? 'Service 24/7 Grand Montréal · YUL · Laval · Tremblant' : '24/7 Greater Montreal · YUL Airport · Laval · Tremblant'}
              </span>
            </div>

            {/* Title with ShinyText effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-white tracking-tight leading-[1.08] font-serif">
              {isFr ? (
                <>
                  <span className="block text-white">Votre chauffeur</span>
                  <ShinyText
                    text="vous attend."
                    color="#D7B65D"
                    shineColor="#FFF6D6"
                    speed={3}
                    className="block"
                  />
                </>
              ) : (
                <>
                  <span className="block text-white">Your chauffeur</span>
                  <ShinyText
                    text="awaits."
                    color="#D7B65D"
                    shineColor="#FFF6D6"
                    speed={3}
                    className="block"
                  />
                </>
              )}
            </h1>

            {/* Subtext with FoldText component */}
            <div className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-md font-light">
              <FoldText
                text={
                  isFr
                    ? "Chez Limo Raf, nous transformons chacun de vos déplacements en une expérience haut de gamme. Voyagez avec élégance."
                    : "At Limo Raf, we transform every journey into an elite first-class experience. Ride with elegance."
                }
                trigger="mount"
                duration={0.65}
                stagger={0.03}
                color="#E5E7EB"
              />
            </div>

            {/* Action buttons with brand gold accent */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#fleet"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] hover:scale-105 active:scale-95 rounded-full transition-all shadow-lg shadow-[#D7B65D]/30 cursor-pointer"
              >
                <span>{isFr ? 'Explorer la flotte' : 'Explore fleet'}</span>
                <span>→</span>
              </a>

              <a
                href={CLIENT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/40 backdrop-blur-md rounded-full transition-all shadow-md active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp VIP</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Floating Booking Widget directly matching screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <BookingWidget language={language} onReserve={onReserve} />
          </motion.div>
        </div>
      </div>

      {/* Bottom: Mouse Scroll Down indicator matching screenshot */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <a
          href="#about"
          className="inline-flex items-center gap-2.5 text-xs text-white/80 hover:text-[#F5D577] transition-colors group"
        >
          {/* Mouse capsule outline with wheel dot */}
          <div className="w-4 h-7 rounded-full border border-white/70 group-hover:border-[#F5D577] flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-1.5 bg-[#F5D577] rounded-full animate-bounce" />
          </div>
          <span className="text-[11px] font-medium tracking-wider">
            {isFr ? 'Défiler vers le bas' : 'Scroll down'}
          </span>
        </a>
      </div>
    </section>
  );
};
