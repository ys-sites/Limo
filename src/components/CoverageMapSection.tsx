import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Plane, Navigation, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { ShinyText } from './ui/ShinyText';
import { FoldText } from './ui/FoldText';

interface CoverageMapSectionProps {
  language: 'FR' | 'EN';
  onSelectCity?: (city: string) => void;
  onOpenBooking?: () => void;
}

export const CoverageMapSection: React.FC<CoverageMapSectionProps> = ({
  language,
  onSelectCity,
  onOpenBooking
}) => {
  const isFr = language === 'FR';

  const quebecCities = [
    'Mont-Tremblant',
    'Trois-Rivières',
    'Bromont',
    'Sherbrooke',
    'Charlevoix',
    'Montréal',
    'Laval',
    'Laurentides'
  ];

  const ontarioCities = [
    'Toronto',
    'Ottawa',
    'Hamilton',
    'Kingston',
    'Brampton',
    'Waterloo',
    'Niagara Falls'
  ];

  const usaDestinations = [
    { name: 'Burlington Airport (BTV)', tag: 'Airport VIP' },
    { name: 'Plattsburgh Airport (PBG)', tag: 'Airport VIP' },
    { name: 'Boston (BOS)', tag: 'Intercity' },
    { name: 'New York City (JFK/LGA/EWR)', tag: 'Manhattan VIP' },
    { name: 'Albany', tag: 'State Capital' }
  ];

  return (
    <section id="coverage" className="py-24 lg:py-32 bg-[#090A0D] text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#D7B65D]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D7B65D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with ShinyText title and FoldText subtext */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D7B65D]/10 border border-[#D7B65D]/30 mb-4 backdrop-blur-sm">
            <Globe className="w-3.5 h-3.5 text-[#F5D577]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5D577]">
              {isFr ? '06 · RAYONNEMENT GÉOGRAPHIQUE' : '06 · REGIONAL COVERAGE'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-serif">
            <ShinyText
              text={isFr ? 'Destinations Phares Canada & USA' : 'Key Destinations Across Canada & USA'}
              className="text-[#D7B65D]"
              speed={4}
            />
          </h2>

          <div className="text-base sm:text-lg text-neutral-300 font-light">
            <FoldText
              text={
                isFr
                  ? 'Service de chauffeur VIP porte-à-porte au Québec, en Ontario et vers les États-Unis.'
                  : 'Door-to-door VIP private chauffeur service throughout Quebec, Ontario, and the United States.'
              }
              trigger="scroll"
              duration={0.7}
              stagger={0.03}
              color="#D1D5DB"
            />
          </div>
        </motion.div>

        {/* 2-Column Layout matching Screenshot 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Canada & USA destination lists */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Canada Section */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-neutral-800">
                <span className="text-2xl">🍁</span>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    CANADA
                  </h3>
                  <p className="text-xs text-[#D7B65D] font-medium">
                    {isFr ? 'Québec & Ontario · Liaisons VIP Directes' : 'Quebec & Ontario · Direct VIP Corridors'}
                  </p>
                </div>
              </div>

              {/* Quebec Cities */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F5D577]" />
                  <span>Québec</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {quebecCities.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectCity?.(city)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-[#D7B65D] hover:text-neutral-950 text-neutral-300 text-xs font-medium transition-all cursor-pointer border border-neutral-700/50"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ontario Cities */}
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#F5D577]" />
                  <span>Ontario</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ontarioCities.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectCity?.(city)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-[#D7B65D] hover:text-neutral-950 text-neutral-300 text-xs font-medium transition-all cursor-pointer border border-neutral-700/50"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* USA Section */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-[#D7B65D]/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-neutral-800">
                <span className="text-2xl">🇺🇸</span>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    UNITED STATES
                  </h3>
                  <p className="text-xs text-[#D7B65D] font-medium">
                    {isFr ? 'Aéroports Frontaliers & Grandes Métropoles' : 'Cross-Border Hubs & Major Metros'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {usaDestinations.map((dest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Plane className="w-4 h-4 text-[#F5D577]" />
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {dest.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#D7B65D]/15 text-[#F5D577] border border-[#D7B65D]/30">
                      {dest.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            {onOpenBooking && (
              <div>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-[#D7B65D]/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>{isFr ? 'Calculer Votre Trajet Longue Distance' : 'Calculate Long Distance Journey'}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Right Column: High-Res Map Asset with Escalade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#D7B65D]/40 shadow-2xl shadow-black/90 group">
              <img
                src="/client_assets/wordwide-768x576-1.jpg"
                alt="Carte des destinations Limo Raf Canada USA"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-75" />

              {/* Floating VIP Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-[#D7B65D]/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D7B65D] to-[#997322] flex items-center justify-center text-neutral-950 font-bold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isFr ? 'Transport Transfrontalier Tout Confort' : 'Effortless Cross-Border Chauffeur'}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {isFr
                        ? 'Chauffeurs accrédités pour le passage de douanes Canada-USA'
                        : 'Accredited chauffeurs for seamless Canada-USA border crossing'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient backlight glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#D7B65D]/20 to-[#F5D577]/10 -z-10 blur-2xl opacity-50 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
