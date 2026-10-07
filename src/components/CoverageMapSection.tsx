import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Plane, Navigation, Globe, ArrowUpRight, Sparkles, Shield, Clock, Coffee, ShieldCheck } from 'lucide-react';
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

  const quebecDestinations = [
    { name: 'Mont-Tremblant', time: '1h 45m', dist: '130 km', tag: 'Ski & Chalet' },
    { name: 'Québec (Capitale)', time: '2h 45m', dist: '255 km', tag: 'Affaires & VIP' },
    { name: 'Charlevoix', time: '4h 00m', dist: '395 km', tag: 'Manoir Richelieu' },
    { name: 'Bromont', time: '1h 10m', dist: '85 km', tag: 'Spa & Montagne' },
    { name: 'Trois-Rivières', time: '1h 30m', dist: '140 km', tag: 'Mauricie' },
    { name: 'Sherbrooke', time: '1h 45m', dist: '150 km', tag: 'Cantons-de-l’Est' },
    { name: 'Laval & Rive-Nord', time: '25m', dist: '25 km', tag: 'Local VIP' },
    { name: 'Longueuil & Rive-Sud', time: '20m', dist: '15 km', tag: 'Local VIP' }
  ];

  const ontarioDestinations = [
    { name: 'Ottawa (Parlement)', time: '2h 00m', dist: '198 km', tag: 'Délégations' },
    { name: 'Toronto Downtown', time: '5h 15m', dist: '540 km', tag: 'Bay Street' },
    { name: 'Kingston & 1000 Îles', time: '2h 45m', dist: '285 km', tag: 'Est Ontario' },
    { name: 'Niagara Falls VIP', time: '6h 30m', dist: '670 km', tag: 'Tourisme VIP' },
    { name: 'Hamilton', time: '5h 45m', dist: '590 km', tag: 'Golden Horseshoe' },
    { name: 'Waterloo / Kitchener', time: '5h 50m', dist: '610 km', tag: 'Tech Hub' },
    { name: 'Brampton', time: '5h 25m', dist: '555 km', tag: 'Grand Toronto' }
  ];

  const usaDestinations = [
    { name: 'Burlington Airport (BTV)', time: '1h 45m', dist: '155 km', tag: 'Airport VIP', note: 'Douanes rapides Highgate Springs' },
    { name: 'Plattsburgh Airport (PBG)', time: '1h 05m', dist: '105 km', tag: 'Airport VIP', note: 'Vols directs Floride & liaisons privées' },
    { name: 'Boston / Logan (BOS)', time: '4h 45m', dist: '500 km', tag: 'Intercity VIP', note: 'Universités & sièges corporatifs' },
    { name: 'New York City (JFK/Manhattan)', time: '5h 45m', dist: '600 km', tag: 'Manhattan Direct', note: 'Arrivée porte-à-porte sans escale aérienne' },
    { name: 'Albany International (ALB)', time: '3h 15m', dist: '350 km', tag: 'Capitale État', note: 'Délégations d’affaires New York State' }
  ];

  return (
    <section id="coverage" className="py-24 lg:py-32 bg-[#090A0D] text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#D7B65D]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D7B65D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with ShinyText and FoldText */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
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
              speed={3.5}
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

        {/* Executive Escalade Flagship Showcase Card (Replacing pixelated map asset) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 rounded-3xl overflow-hidden border border-[#D7B65D]/30 bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-black shadow-2xl relative group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Visual: Pristine High-Definition Studio Photograph of Escalade Flagship */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-neutral-950 flex items-center justify-center">
              <img
                src="/images/fleet_cadillac_escalade_1791294159140.jpg"
                alt="Cadillac Escalade ESV Flagship Longue Distance Limo Raf Montréal"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20 lg:bg-gradient-to-r lg:from-transparent lg:via-neutral-950/40 lg:to-neutral-950" />
              
              {/* Badge on Image */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#D7B65D]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#F5D577]" />
                <span className="text-[11px] font-bold text-white tracking-wider uppercase">
                  {isFr ? 'Vaisseau Amiral Longue Distance' : 'Long-Distance Flagship'}
                </span>
              </div>
            </div>

            {/* Information & Highlights Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D7B65D]">
                  {isFr ? 'Liaisons Interurbaines & Transfrontalières' : 'Intercity & Cross-Border Corridors'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1.5 font-sans">
                  {isFr ? 'Voyagez Sans Les Tracas Des Aéroports' : 'Travel Without Airport Hassles'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 leading-relaxed">
                  {isFr
                    ? 'Départ de votre résidence ou hôtel à l’heure exacte voulue. Chauffeurs accrédités aux douanes canadiennes et américaines avec passage rapide.'
                    : 'Depart from your doorstep or hotel exactly on your schedule. Fully certified chauffeurs for expedited Canada-USA border customs clearance.'}
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs">
                  <span className="text-[#F5D577] font-semibold block mb-0.5">🛡️ {isFr ? 'Douanes USA' : 'USA Customs'}</span>
                  <span className="text-neutral-400 text-[11px]">{isFr ? 'Passage fluide Lacolle/Highgate' : 'Expedited border crossing'}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs">
                  <span className="text-[#F5D577] font-semibold block mb-0.5">⚡ {isFr ? 'Bureau Roulant' : 'Mobile Office'}</span>
                  <span className="text-neutral-400 text-[11px]">{isFr ? 'Wi-Fi 5G & prises 110V/USB' : '5G Wi-Fi & device charging'}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs">
                  <span className="text-[#F5D577] font-semibold block mb-0.5">❄️ {isFr ? 'AWD 4 Saisons' : 'All-Weather AWD'}</span>
                  <span className="text-neutral-400 text-[11px]">{isFr ? 'Conduite sûre été comme hiver' : 'Certified winter safety'}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs">
                  <span className="text-[#F5D577] font-semibold block mb-0.5">☕ {isFr ? 'À Votre Rythme' : 'On Your Pace'}</span>
                  <span className="text-neutral-400 text-[11px]">{isFr ? 'Arrêts café et pauses libres' : 'Bespoke pauses on demand'}</span>
                </div>
              </div>

              {/* Action Button */}
              {onOpenBooking && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D7B65D]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{isFr ? 'Réserver une liaison longue distance' : 'Book Long-Distance Transfer'}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Clean, Organized 3-Column Regional Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Column 1: Québec & Régions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm flex flex-col justify-between h-full hover:border-[#D7B65D]/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-800">
                <span className="text-2xl">🍁</span>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {isFr ? 'QUÉBEC & RÉGIONS' : 'QUEBEC & RESORTS'}
                  </h3>
                  <p className="text-[11px] text-[#D7B65D] font-medium">
                    {isFr ? 'Liaisons régulières & centres de villégiature' : 'Regular corridors & luxury resorts'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {quebecDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCity?.(dest.name)}
                    className="w-full text-left flex items-center justify-between p-2.5 rounded-xl bg-neutral-800/40 hover:bg-[#D7B65D] hover:text-neutral-950 text-neutral-200 border border-neutral-700/40 transition-all cursor-pointer group/pill"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#F5D577] group-hover/pill:text-neutral-950 shrink-0" />
                      <span className="text-xs font-semibold truncate">{dest.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[10px] text-neutral-400 group-hover/pill:text-neutral-900 font-mono">
                        {dest.time}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-neutral-900/60 group-hover/pill:bg-neutral-950 group-hover/pill:text-white text-neutral-400">
                        {dest.dist}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/60">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#F5D577]" />
                {isFr ? 'Disponibilité 24/7 sur réservation' : 'Available 24/7 by reservation'}
              </span>
            </div>
          </motion.div>

          {/* Column 2: Corridor Ontario */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm flex flex-col justify-between h-full hover:border-[#D7B65D]/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-800">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {isFr ? 'CORRIDOR ONTARIO' : 'ONTARIO CORRIDOR'}
                  </h3>
                  <p className="text-[11px] text-[#D7B65D] font-medium">
                    {isFr ? 'Liaisons corporatives interurbaines' : 'Intercity executive travel'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {ontarioDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCity?.(dest.name)}
                    className="w-full text-left flex items-center justify-between p-2.5 rounded-xl bg-neutral-800/40 hover:bg-[#D7B65D] hover:text-neutral-950 text-neutral-200 border border-neutral-700/40 transition-all cursor-pointer group/pill"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Navigation className="w-3.5 h-3.5 text-[#F5D577] group-hover/pill:text-neutral-950 shrink-0" />
                      <span className="text-xs font-semibold truncate">{dest.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[10px] text-neutral-400 group-hover/pill:text-neutral-900 font-mono">
                        {dest.time}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-neutral-900/60 group-hover/pill:bg-neutral-950 group-hover/pill:text-white text-neutral-400">
                        {dest.dist}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/60">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#F5D577]" />
                {isFr ? 'Arrêts personnalisés le long de la 401' : 'Flexible stops along Highway 401'}
              </span>
            </div>
          </motion.div>

          {/* Column 3: États-Unis Transfrontalier */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="p-6 rounded-3xl bg-neutral-900/60 border border-[#D7B65D]/30 backdrop-blur-sm flex flex-col justify-between h-full hover:border-[#D7B65D] transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-800">
                <span className="text-2xl">🇺🇸</span>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {isFr ? 'TRANSFRONTALIER USA' : 'CROSS-BORDER USA'}
                  </h3>
                  <p className="text-[11px] text-[#D7B65D] font-medium">
                    {isFr ? 'Aéroports & hubs de la côte Est' : 'Airports & East Coast Metros'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                {usaDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCity?.(dest.name)}
                    className="w-full text-left p-2.5 rounded-xl bg-neutral-800/40 hover:bg-[#D7B65D] hover:text-neutral-950 text-neutral-200 border border-neutral-700/40 transition-all cursor-pointer group/pill block"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 truncate">
                        <Plane className="w-3.5 h-3.5 text-[#F5D577] group-hover/pill:text-neutral-950 shrink-0" />
                        <span className="text-xs font-semibold truncate">{dest.name}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#D7B65D]/20 text-[#F5D577] group-hover/pill:bg-neutral-950 group-hover/pill:text-white shrink-0 ml-1">
                        {dest.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 group-hover/pill:text-neutral-800 line-clamp-1 pl-5.5">
                      {dest.note}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/60">
              <span className="text-[11px] text-[#F5D577] flex items-center gap-1.5 font-medium">
                <Shield className="w-3 h-3 text-[#F5D577]" />
                {isFr ? 'Assistance complète au poste frontière' : 'Full border assistance & documentation'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
