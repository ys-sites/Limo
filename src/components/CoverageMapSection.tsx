import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ShieldCheck,
  Wifi,
  Snowflake,
  Coffee
} from 'lucide-react';

interface CoverageMapSectionProps {
  language: 'FR' | 'EN';
  onOpenBooking?: () => void;
}

export const CoverageMapSection: React.FC<CoverageMapSectionProps> = ({
  language,
  onOpenBooking
}) => {
  const isFr = language === 'FR';

  return (
    <section id="coverage" className="py-24 lg:py-32 bg-[#090A0D] text-white relative overflow-hidden border-t border-neutral-900">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-56 h-56 sm:w-96 sm:h-96 bg-[#D7B65D]/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#D7B65D]/5 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Clean Editorial Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 sm:mb-16"
        >
          <div className="flex items-center gap-2.5 text-[#D7B65D] font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7B65D]" />
            <span>{isFr ? '07 · Liaisons & corridors' : '07 · Corridors & coverage'}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.15] mb-4">
            {isFr ? 'Québec, Ontario ' : 'Quebec, Ontario '}
            <span className="font-normal text-[#D7B65D]">
              {isFr ? 'et États-Unis.' : 'and the United States.'}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl">
            {isFr
              ? 'Prise en charge à votre porte à l’heure exacte convenue. Flotte de VUS exécutifs préparée pour les trajets interurbains et les liaisons transfrontalières.'
              : 'Direct door-to-door departure at your preferred hour. Executive SUV fleet fully equipped for intercity corridors and cross-border departures.'}
          </p>
        </motion.div>

        {/* Executive Escalade Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] relative group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Visual: Pristine Cadillac Escalade */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[380px] overflow-hidden bg-neutral-950">
              <img
                src="/images/fleet_cadillac_escalade_1791294159140.jpg"
                alt="Cadillac Escalade ESV Limo Raf Longue Distance"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D11] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0C0D11]/40 lg:to-[#0C0D11]" />

              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-sm bg-black/80 backdrop-blur-md border border-[#D7B65D]/30 text-[11px] font-semibold text-neutral-200 tracking-wider uppercase">
                {isFr ? 'VUS exécutif longue distance' : 'Executive Long-Distance SUV'}
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D7B65D]">
                  {isFr ? 'Confort & sérénité' : 'Comfort & discretion'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-light text-white tracking-tight mt-1">
                  {isFr ? 'Voyagez sans les tracas des aéroports.' : 'Travel without airport delays.'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light mt-2 leading-relaxed">
                  {isFr
                    ? 'Départ de votre résidence ou bureau à Montréal. Chauffeurs accrédités pour les postes frontaliers avec passage fluide.'
                    : 'Depart directly from your residence or office. Certified chauffeurs equipped for smooth border customs clearance.'}
                </p>
              </div>

              {/* 4 Quiet Feature Cards */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-medium mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                    <span>{isFr ? 'Douanes USA' : 'US Customs'}</span>
                  </div>
                  <span className="text-neutral-500 text-[11px] block">
                    {isFr ? 'Passage fluide Lacolle' : 'Expedited border transit'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-medium mb-0.5">
                    <Wifi className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                    <span>{isFr ? 'Bureau roulant' : 'Mobile office'}</span>
                  </div>
                  <span className="text-neutral-500 text-[11px] block">
                    {isFr ? 'Wi-Fi 5G & prises USB' : '5G Wi-Fi & USB power'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-medium mb-0.5">
                    <Snowflake className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                    <span>{isFr ? 'Traction intégrale' : 'All-Weather AWD'}</span>
                  </div>
                  <span className="text-neutral-500 text-[11px] block">
                    {isFr ? 'Sécurité 4 saisons' : 'Year-round winter tires'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-medium mb-0.5">
                    <Coffee className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                    <span>{isFr ? 'À votre rythme' : 'Your schedule'}</span>
                  </div>
                  <span className="text-neutral-500 text-[11px] block">
                    {isFr ? 'Pauses libres sur l’itinéraire' : 'Flexible bespoke stops'}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {onOpenBooking && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>{isFr ? 'Réserver une liaison longue distance' : 'Book a long-distance transfer'}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
