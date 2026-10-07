import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Building2, 
  Plane, 
  Wifi, 
  Snowflake, 
  Coffee 
} from 'lucide-react';

interface CoverageMapSectionProps {
  language: 'FR' | 'EN';
  onSelectCity?: (city: string) => void;
  onOpenBooking?: () => void;
}

interface DestinationItem {
  name: string;
  descFr: string;
  descEn: string;
  tagFr: string;
  tagEn: string;
}

export const CoverageMapSection: React.FC<CoverageMapSectionProps> = ({
  language,
  onSelectCity,
  onOpenBooking
}) => {
  const isFr = language === 'FR';

  const quebecDestinations: DestinationItem[] = [
    {
      name: 'Mont-Tremblant',
      descFr: 'Station de ski, golfs & chalets de villégiature',
      descEn: 'Ski resort, golf & private mountain chalets',
      tagFr: 'Villégiature',
      tagEn: 'Resort',
    },
    {
      name: 'Québec (Capitale)',
      descFr: 'Colline Parlementaire, Vieux-Québec & rendez-vous d’affaires',
      descEn: 'Parliament Hill, Old Quebec & corporate schedules',
      tagFr: 'Capitale',
      tagEn: 'Capital',
    },
    {
      name: 'Charlevoix',
      descFr: 'Manoir Richelieu, casino & panoramas du fleuve',
      descEn: 'Manoir Richelieu, casino & coastal retreats',
      tagFr: 'Évasion',
      tagEn: 'Retreat',
    },
    {
      name: 'Bromont & Cantons-de-l’Est',
      descFr: 'Spas nordiques, domaines viticoles & villégiature privée',
      descEn: 'Nordic spas, private vineyards & country estates',
      tagFr: 'Estrie',
      tagEn: 'Townships',
    },
    {
      name: 'Trois-Rivières',
      descFr: 'Pôle corporatif de la Mauricie & liaisons régulières',
      descEn: 'Mauricie regional hub & executive travel',
      tagFr: 'Mauricie',
      tagEn: 'Mauricie',
    },
    {
      name: 'Sherbrooke',
      descFr: 'Pôle universitaire, centres médicaux & Estrie',
      descEn: 'University campus, medical center & Eastern Townships',
      tagFr: 'Estrie',
      tagEn: 'Townships',
    },
    {
      name: 'Laval & Rive-Nord',
      descFr: 'Parcs d’affaires, banlieue nord & corridor Laurentides',
      descEn: 'Corporate parks & North Shore Laurentian corridor',
      tagFr: 'Local VIP',
      tagEn: 'Local VIP',
    },
    {
      name: 'Longueuil & Rive-Sud',
      descFr: 'Quartier DIX30, zones d’activités & corridor Montérégie',
      descEn: 'Quartier DIX30, corporate districts & South Shore',
      tagFr: 'Local VIP',
      tagEn: 'Local VIP',
    },
  ];

  const ontarioDestinations: DestinationItem[] = [
    {
      name: 'Ottawa (Parlement)',
      descFr: 'Colline du Parlement, ambassades, ministères & délégations',
      descEn: 'Parliament Hill, embassies & government delegations',
      tagFr: 'Capitale',
      tagEn: 'Capital',
    },
    {
      name: 'Toronto Downtown',
      descFr: 'Bay Street, Financial District & hôtels de premier ordre',
      descEn: 'Bay Street, Financial District & luxury hotels',
      tagFr: 'Affaires',
      tagEn: 'Financial',
    },
    {
      name: 'Kingston & Mille-Îles',
      descFr: 'Université Queen’s, base militaire & relais du Saint-Laurent',
      descEn: 'Queen’s University, base & Thousand Islands corridor',
      tagFr: 'Relais',
      tagEn: 'Corridor',
    },
    {
      name: 'Chutes du Niagara',
      descFr: 'Vignobles de Niagara-on-the-Lake, casinos & tourisme VIP',
      descEn: 'Niagara wine country, VIP leisure & private tours',
      tagFr: 'Tourisme VIP',
      tagEn: 'VIP Leisure',
    },
    {
      name: 'Hamilton',
      descFr: 'Pôle industriel du Golden Horseshoe & complexes médicaux',
      descEn: 'Golden Horseshoe industrial & health science hub',
      tagFr: 'Industriel',
      tagEn: 'Industrial',
    },
    {
      name: 'Waterloo & Kitchener',
      descFr: 'Pôle technologique majeur & entreprises innovantes',
      descEn: 'Canada’s tech triangle & innovation campus',
      tagFr: 'Tech Hub',
      tagEn: 'Tech Hub',
    },
    {
      name: 'Brampton & Mississauga',
      descFr: 'Centres corporatifs majeurs du Grand Toronto',
      descEn: 'Greater Toronto corporate & logistics centers',
      tagFr: 'Grand Toronto',
      tagEn: 'GTA',
    },
  ];

  const usaDestinations: DestinationItem[] = [
    {
      name: 'Burlington Airport (BTV)',
      descFr: 'Alternative fluide vers les USA avec passage rapide Highgate',
      descEn: 'Seamless US flight access with expedited border transit',
      tagFr: 'Aéroport US',
      tagEn: 'US Airport',
    },
    {
      name: 'Plattsburgh Airport (PBG)',
      descFr: 'Vols directs vers la Floride & liaisons régionales privées',
      descEn: 'Direct Florida departures & regional private connections',
      tagFr: 'Aéroport US',
      tagEn: 'US Airport',
    },
    {
      name: 'Boston / Logan (BOS)',
      descFr: 'Campus de l’Ivy League, hôpitaux & sièges financiers',
      descEn: 'Ivy League campuses, hospitals & financial headquarters',
      tagFr: 'Côte Est',
      tagEn: 'East Coast',
    },
    {
      name: 'New York City (Manhattan / JFK)',
      descFr: 'Prise en charge porte-à-porte sans correspondance aérienne',
      descEn: 'Door-to-door direct travel without airport connection delays',
      tagFr: 'Manhattan',
      tagEn: 'Manhattan',
    },
    {
      name: 'Albany International (ALB)',
      descFr: 'Capitale de l’État de New York & délégations institutionnelles',
      descEn: 'New York State Capitol & institutional delegations',
      tagFr: 'Capitale État',
      tagEn: 'State Capital',
    },
  ];

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
          className="mb-14 rounded-2xl overflow-hidden border border-neutral-800 bg-[#0C0D11] relative group"
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

        {/* 3 Regional Destination Columns (Clean, Beautiful, No Times/Distances) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Column 1: Québec & Régions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0C0D11] border border-neutral-800/90 flex flex-col justify-between h-full hover:border-[#D7B65D]/40 transition-colors relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7B65D]/30 to-transparent group-hover:via-[#D7B65D]/70 transition-all duration-500" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-800/80">
                <div>
                  <span className="text-[11px] font-sans font-semibold tracking-[0.16em] text-[#D7B65D] uppercase">
                    01 · {isFr ? 'Régional' : 'Regional'}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-white mt-0.5">
                    {isFr ? 'Québec & Villégiature' : 'Quebec & Resorts'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {isFr ? 'Laurentides, Capitale-Nationale & grands espaces' : 'Laurentians, Capital region & resorts'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D7B65D] shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              {/* Destination Items */}
              <div className="space-y-2 mb-5">
                {quebecDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCity?.(dest.name)}
                    className="w-full text-left group/item p-3 rounded-xl bg-neutral-900/40 hover:bg-[#D7B65D]/10 border border-neutral-800/50 hover:border-[#D7B65D]/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[13.5px] text-neutral-100 group-hover/item:text-white transition-colors truncate">
                          {dest.name}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-800/80 group-hover/item:bg-[#D7B65D]/20 text-neutral-400 group-hover/item:text-[#D7B65D] font-sans font-medium shrink-0 transition-colors">
                          {isFr ? dest.tagFr : dest.tagEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 group-hover/item:text-neutral-300 font-light mt-0.5 leading-snug line-clamp-1 transition-colors">
                        {isFr ? dest.descFr : dest.descEn}
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-neutral-800/40 group-hover/item:bg-[#D7B65D] text-neutral-400 group-hover/item:text-neutral-950 flex items-center justify-center shrink-0 transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/60 flex items-center gap-2 text-[11px] text-neutral-400 font-light">
              <Clock className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
              <span>{isFr ? 'Disponibilité 24/7 sur réservation préalable' : 'Available 24/7 with advance booking'}</span>
            </div>
          </motion.div>

          {/* Column 2: Corridor Ontario */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0C0D11] border border-neutral-800/90 flex flex-col justify-between h-full hover:border-[#D7B65D]/40 transition-colors relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7B65D]/30 to-transparent group-hover:via-[#D7B65D]/70 transition-all duration-500" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-800/80">
                <div>
                  <span className="text-[11px] font-sans font-semibold tracking-[0.16em] text-[#D7B65D] uppercase">
                    02 · {isFr ? 'Interurbain' : 'Intercity'}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-white mt-0.5">
                    {isFr ? 'Corridor Ontario' : 'Ontario Corridor'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {isFr ? 'Liaisons corporatives & capitales d’affaires' : 'Executive corridors & business capitals'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D7B65D] shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              {/* Destination Items */}
              <div className="space-y-2 mb-5">
                {ontarioDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCity?.(dest.name)}
                    className="w-full text-left group/item p-3 rounded-xl bg-neutral-900/40 hover:bg-[#D7B65D]/10 border border-neutral-800/50 hover:border-[#D7B65D]/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[13.5px] text-neutral-100 group-hover/item:text-white transition-colors truncate">
                          {dest.name}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-800/80 group-hover/item:bg-[#D7B65D]/20 text-neutral-400 group-hover/item:text-[#D7B65D] font-sans font-medium shrink-0 transition-colors">
                          {isFr ? dest.tagFr : dest.tagEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 group-hover/item:text-neutral-300 font-light mt-0.5 leading-snug line-clamp-1 transition-colors">
                        {isFr ? dest.descFr : dest.descEn}
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-neutral-800/40 group-hover/item:bg-[#D7B65D] text-neutral-400 group-hover/item:text-neutral-950 flex items-center justify-center shrink-0 transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/60 flex items-center gap-2 text-[11px] text-neutral-400 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
              <span>{isFr ? 'Arrêts personnalisés le long de la 401 sur demande' : 'Custom stops along the 401 on demand'}</span>
            </div>
          </motion.div>

          {/* Column 3: États-Unis Transfrontalier */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0C0D11] border border-neutral-800/90 flex flex-col justify-between h-full hover:border-[#D7B65D]/40 transition-colors relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7B65D]/30 to-transparent group-hover:via-[#D7B65D]/70 transition-all duration-500" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-800/80">
                <div>
                  <span className="text-[11px] font-sans font-semibold tracking-[0.16em] text-[#D7B65D] uppercase">
                    03 · {isFr ? 'Transfrontalier' : 'Cross-Border'}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-white mt-0.5">
                    {isFr ? 'États-Unis' : 'United States'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">
                    {isFr ? 'Aéroports régionaux & métropoles de la côte Est' : 'Regional hubs & East Coast metropolitan areas'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D7B65D] shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
              </div>

              {/* Destination Items */}
              <div className="space-y-2 mb-5">
                {usaDestinations.map((dest, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectCity?.(dest.name)}
                    className="w-full text-left group/item p-3 rounded-xl bg-neutral-900/40 hover:bg-[#D7B65D]/10 border border-neutral-800/50 hover:border-[#D7B65D]/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[13.5px] text-neutral-100 group-hover/item:text-white transition-colors truncate">
                          {dest.name}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-800/80 group-hover/item:bg-[#D7B65D]/20 text-neutral-400 group-hover/item:text-[#D7B65D] font-sans font-medium shrink-0 transition-colors">
                          {isFr ? dest.tagFr : dest.tagEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 group-hover/item:text-neutral-300 font-light mt-0.5 leading-snug line-clamp-1 transition-colors">
                        {isFr ? dest.descFr : dest.descEn}
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-neutral-800/40 group-hover/item:bg-[#D7B65D] text-neutral-400 group-hover/item:text-neutral-950 flex items-center justify-center shrink-0 transition-all duration-200">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/60 flex items-center gap-2 text-[11px] text-neutral-400 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
              <span>{isFr ? 'Chauffeurs accrédités pour le passage frontalier' : 'Accredited chauffeurs for cross-border transit'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
