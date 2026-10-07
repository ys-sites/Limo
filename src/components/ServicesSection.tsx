import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plane, Navigation, Clock, Heart, Compass, GlassWater, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/limoData';
import { ServiceItem } from '../types/limo';
import { ShinyText } from './ui/ShinyText';

interface ServicesSectionProps {
  language: 'FR' | 'EN';
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, onSelectService }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0]?.id || 'airport-service');
  const isFr = language === 'FR';

  const serviceIcons: Record<string, React.ElementType> = {
    'airport-service': Plane,
    'long-distance': Navigation,
    'hourly-limo': Clock,
    'wedding': Heart,
    'city-tour-limo': Compass,
    'party': GlassWater,
  };

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];
  const ActiveIcon = serviceIcons[activeService.id] || Sparkles;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0A0C10] text-white relative overflow-hidden border-t border-neutral-900">
      {/* Subtle ambient glow (reduced on mobile for GPU performance) */}
      <div className="absolute top-1/4 -right-40 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-[#D7B65D]/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-[#D7B65D]/3 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with 04 */}
        <div className="relative mb-12 sm:mb-16 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <span className="text-4xl sm:text-6xl font-light text-neutral-800 font-sans select-none tracking-tight">
              04
            </span>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D7B65D]/10 border border-[#D7B65D]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D7B65D]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7B65D]">
                {isFr ? '04 · SERVICES DE CHAUFFEUR' : '04 · CHAUFFEUR SERVICES'}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-white mb-2">
              <ShinyText
                text={isFr ? 'Nos Prestations Privées' : 'Our Private Services'}
                color="#FFFFFF"
                shineColor="#D7B65D"
                speed={3.5}
              />
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg mx-auto">
              {isFr
                ? 'Ponctualité rigoureuse, confort exécutif et discrétion absolue pour tous vos déplacements.'
                : 'Punctual, executive comfort and complete discretion tailored to your journey.'}
            </p>
          </div>
        </div>

        {/* Service selector: all options visible at once (wraps on mobile, no swipe) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 mb-8 sm:mb-10">
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.id] || Sparkles;
            const title = isFr ? service.titleFr : service.titleEn;
            const isActive = service.id === activeServiceId;

            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#D7B65D] text-neutral-950 shadow-md font-bold'
                    : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-[#D7B65D]'}`} />
                <span>{title}</span>
              </button>
            );
          })}
        </div>

        {/* Focused Showcase Card with Rock-solid Mobile Aspect Ratio */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-neutral-900/60 border border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 relative overflow-hidden backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Image with dedicated aspect ratio for both mobile and desktop */}
              <div className="lg:col-span-6 relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full bg-neutral-950 group">
                <img
                  src={activeService.image}
                  alt={isFr ? activeService.titleFr : activeService.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

                {/* Quiet Subtitle Badge */}
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-10">
                  <span className="px-3 py-1.5 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-semibold text-[#D7B65D] tracking-wide flex items-center gap-1.5">
                    <ActiveIcon className="w-3.5 h-3.5" />
                    <span>{isFr ? activeService.subtitleFr : activeService.subtitleEn}</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Short, Sweet & Condensed Details */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D7B65D] block mb-1">
                    {isFr ? 'Prestation sur mesure' : 'Bespoke Chauffeur Service'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight">
                    {isFr ? activeService.titleFr : activeService.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mt-3">
                    {isFr ? activeService.descriptionFr : activeService.descriptionEn}
                  </p>
                </div>

                {/* 4 Clean En-Dash Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-neutral-800/80">
                  {(isFr ? activeService.featuresFr : activeService.featuresEn).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-normal leading-snug">
                      <span className="text-[#D7B65D] font-bold select-none">—</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Bar: single booking CTA */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(activeService)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    <span>{isFr ? 'Réserver ce service' : 'Reserve this service'}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
