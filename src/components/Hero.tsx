import React from 'react';
import { BookingWidget } from './BookingWidget';
import { BookingState } from '../types/limo';
import { HERO_IMAGE, CLIENT_INFO } from '../data/limoData';
import { MessageSquare, PhoneCall } from 'lucide-react';

interface HeroProps {
  language: 'FR' | 'EN';
  onReserve: (booking: BookingState) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onReserve }) => {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Cinematic Image matching screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Limo Raf Chauffeur Privé Montréal Cadillac Escalade"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Soft linear gradient overlays for luxury contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
      </div>

      {/* Main Content: Headline on Left, Booking Card on Right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16 lg:pt-36 lg:pb-20 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Headline & Explore More */}
          <div className="lg:col-span-7 space-y-6 text-white max-w-xl">
            {/* VIP Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] text-amber-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'FR' ? 'Service 24/7 Grand Montréal · YUL · Laval · Tremblant' : '24/7 Greater Montreal · YUL Airport · Laval · Tremblant'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.08] font-sans">
              {language === 'FR' ? (
                <>
                  Votre chauffeur <br />
                  vous attend.
                </>
              ) : (
                <>
                  Your chauffeur <br />
                  awaits.
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-200/90 leading-relaxed max-w-md font-light">
              {language === 'FR'
                ? "Chez Limo Raf, nous transformons chacun de vos déplacements en une expérience haut de gamme. Que ce soit pour un transfert YUL, un événement corporatif ou une escapade longue distance, voyagez avec élégance."
                : "At Limo Raf, we transform every journey into an elite first-class experience. Whether for YUL airport transfers, corporate roadshows, or intercity travel, ride with elegance."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#fleet"
                className="inline-block px-7 py-3 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
              >
                {language === 'FR' ? 'Explorer la flotte' : 'Explore now'}
              </a>

              <a
                href={CLIENT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-white bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/30 backdrop-blur-xs rounded-md transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>WhatsApp Instant</span>
              </a>
            </div>
          </div>

          {/* Right: Floating Booking Widget directly matching screenshot */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <BookingWidget language={language} onReserve={onReserve} />
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
          <span className="text-[11px] font-light tracking-wider">
            {language === 'FR' ? 'Défiler vers le bas' : 'Scroll down'}
          </span>
        </a>
      </div>
    </section>
  );
};
