import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plane, Navigation, Clock, Heart, Compass, GlassWater, Check, Sparkles, MessageSquare } from 'lucide-react';
import { SERVICES, CLIENT_INFO } from '../data/limoData';
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
    <section id="services" className="py-24 lg:py-32 bg-[#0A0C10] text-white relative overflow-hidden border-t border-neutral-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#D7B65D]/6 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-[#D7B65D]/4 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with 04 and Luxury Branding */}
        <div className="relative mb-14 sm:mb-18 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <span className="text-4xl sm:text-6xl font-light text-neutral-800 font-sans select-none tracking-tight">
              04
            </span>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D7B65D]/10 border border-[#D7B65D]/30 mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D577]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5D577]">
                {isFr ? '04 · EXCELLENCE DU SERVICE' : '04 · SERVICE EXCELLENCE'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-serif">
              <ShinyText
                text={isFr ? 'Nos Services de Prestige' : 'Our Prestige Services'}
                color="#D7B65D"
                shineColor="#FFF6D6"
                speed={3.5}
              />
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light italic">
              {isFr ? 'Une expérience inoubliable et sur mesure pour chaque client' : 'An unforgettable bespoke journey for every client'}
            </p>
          </div>
        </div>

        {/* Liquid Glass Interactive Service Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.id] || Sparkles;
            const title = isFr ? service.titleFr : service.titleEn;
            const isActive = service.id === activeServiceId;

            return (
              <button
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 shadow-lg shadow-[#D7B65D]/25 font-extrabold scale-105'
                    : 'liquid-glass-pill text-neutral-300 hover:text-white hover:border-[#D7B65D]/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : 'text-[#F5D577]'}`} />
                <span>{title}</span>
              </button>
            );
          })}
        </div>

        {/* Focal Showcase (Split-Screen 50/50) with Liquid Glass Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-panel fine-gold-border rounded-3xl p-6 sm:p-10 mb-14 overflow-hidden relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Panoramic Imagery with Glass Badge */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] sm:h-96 shadow-2xl group">
                <img
                  src={activeService.image}
                  alt={isFr ? activeService.titleFr : activeService.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-75" />

                {/* Floating Glass Pill on photo */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="liquid-glass-pill px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-[#F5D577] tracking-wider uppercase flex items-center gap-1.5">
                    <ActiveIcon className="w-3.5 h-3.5" />
                    <span>{isFr ? activeService.subtitleFr : activeService.subtitleEn}</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Detailed Executive Presentation */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D7B65D] to-[#997322] flex items-center justify-center text-neutral-950 font-bold shrink-0 shadow-md">
                      <ActiveIcon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5D577] block">
                        {isFr ? 'Prestation Signature' : 'Signature Service'}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
                        {isFr ? activeService.titleFr : activeService.titleEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mt-4">
                    {isFr ? activeService.descriptionFr : activeService.descriptionEn}
                  </p>
                </div>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-800/80">
                  {(isFr ? activeService.featuresFr : activeService.featuresEn).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="w-5 h-5 rounded-md bg-[#D7B65D]/20 text-[#F5D577] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs text-neutral-200 font-medium leading-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(activeService)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#D7B65D]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{isFr ? 'Réserver ce service' : 'Reserve this service'}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <a
                    href={CLIENT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full liquid-glass-pill hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-bold transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp VIP</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 6 Quick-Access Liquid Glass Cards Grid below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = serviceIcons[service.id] || Sparkles;
            const isSelected = service.id === activeServiceId;
            const title = isFr ? service.titleFr : service.titleEn;
            const subtitle = isFr ? service.subtitleFr : service.subtitleEn;

            return (
              <div
                key={service.id}
                onClick={() => {
                  setActiveServiceId(service.id);
                  onSelectService(service);
                }}
                className={`liquid-glass-card fine-gold-border p-5 rounded-2xl flex items-center justify-between gap-4 cursor-pointer group transition-all duration-300 ${
                  isSelected ? 'border-[#D7B65D] shadow-lg shadow-[#D7B65D]/10' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-neutral-900/90 border border-neutral-700/60 group-hover:border-[#D7B65D] flex items-center justify-center shrink-0 text-[#F5D577] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#F5D577] transition-colors truncate">
                      {title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate">
                      {subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-neutral-900 group-hover:bg-[#D7B65D] text-neutral-400 group-hover:text-neutral-950 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
