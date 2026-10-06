import React from 'react';
import { BookingWidget } from './BookingWidget';
import { BookingState } from '../types/limo';
import { HERO_IMAGE } from '../data/limoData';

interface HeroProps {
  onReserve: (booking: BookingState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserve }) => {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Cinematic Image matching screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Premier Limo chauffeur service Cadillac Escalade"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Soft linear gradient overlays for readability while preserving vehicle reflections */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Main Content: Headline on Left, Booking Card on Right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16 lg:pt-36 lg:pb-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Headline & Explore More */}
          <div className="lg:col-span-7 space-y-6 text-white max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-white tracking-tight leading-[1.08] font-sans">
              Your Premier Limo <br />
              chauffeur service
            </h1>

            <p className="text-xs sm:text-sm text-neutral-200/90 leading-relaxed max-w-md font-light">
              At Premier Limo, we believe in delivering unparalleled luxury and professionalism to every journey.
            </p>

            <div className="pt-2">
              <a
                href="#services"
                className="inline-block px-7 py-3 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm"
              >
                Explore more
              </a>
            </div>
          </div>

          {/* Right: Floating Booking Widget directly matching screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <BookingWidget onReserve={onReserve} />
          </div>
        </div>
      </div>

      {/* Bottom: Mouse Scroll Down indicator matching screenshot */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <a
          href="#services"
          className="inline-flex items-center gap-2.5 text-xs text-white/80 hover:text-white transition-colors group"
        >
          {/* Mouse capsule outline with wheel dot */}
          <div className="w-4 h-7 rounded-full border border-white/70 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
          <span className="text-[11px] font-light tracking-wider">Scroll down</span>
        </a>
      </div>
    </section>
  );
};
