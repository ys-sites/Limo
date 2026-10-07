import React, { useState } from 'react';
import { ArrowLeft, MapPin, Plane, Navigation, Globe, Shield, Clock, Check, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { CLIENT_INFO } from '../data/limoData';
import { ShinyText } from './ui/ShinyText';

interface DestinationsPageProps {
  language: 'FR' | 'EN';
  onBack: () => void;
  onInquiry: (destination?: string) => void;
  onCallback: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  language,
  onBack,
  onInquiry,
  onCallback,
}) => {
  const isFr = language === 'FR';
  const [activeTab, setActiveTab] = useState<'quebec' | 'ontario' | 'usa'>('quebec');

  const quebecDestinations = [
    { name: 'Mont-Tremblant', type: 'Station de Ski & Villégiature', time: '1h 45m', distance: '130 km', note: 'Châssis 4x4 / AWD préparé hiver' },
    { name: 'Québec (Ville)', type: 'Capitale Nationale & Parlement', time: '2h 45m', distance: '255 km', note: 'Navette d’affaires porte-à-porte' },
    { name: 'Laval & Rive-Nord', type: 'Pôle Corporatif & Résidentiel', time: '25m', distance: '20 km', note: 'Trajet express fluide sans attente' },
    { name: 'Laurentides', type: 'Domaines Privés & Lacs', time: '1h 15m', distance: '90 km', note: 'Véhicules spacieux avec grands coffres' },
    { name: 'Trois-Rivières', type: 'Mauricie & Événements', time: '1h 30m', distance: '140 km', note: 'Liaison directe autoroute 40' },
    { name: 'Bromont & Cantons-de-l’Est', type: 'Tech & Ski Resort', time: '1h 10m', distance: '85 km', note: 'Confort absolu et wifi embarqué' },
    { name: 'Sherbrooke', type: 'Estrie Universitaire & Affaires', time: '1h 45m', distance: '155 km', note: 'Fauteuils capitaines inclinables' },
    { name: 'Charlevoix', type: 'Manoir Richelieu & Casino', time: '4h 00m', distance: '395 km', note: 'Service VIP longue distance sur mesure' },
  ];

  const ontarioDestinations = [
    { name: 'Ottawa', type: 'Capitale Fédérale & Ambassades', time: '2h 00m', distance: '200 km', note: 'Escortes protocolaires et diplomatiques' },
    { name: 'Toronto', type: 'Financial District & Bay Street', time: '5h 30m', distance: '540 km', note: 'Alternative privée au vol commercial' },
    { name: 'Kingston', type: 'Mille-Îles & Université Queen’s', time: '2h 50m', distance: '290 km', note: 'Arrêt repas gastronomique sur demande' },
    { name: 'Niagara Falls', type: 'Tourisme de Prestige & Vignobles', time: '6h 30m', distance: '660 km', note: 'Itinéraire panoramique personnalisé' },
    { name: 'Hamilton', type: 'Pôle Industriel & Médical', time: '6h 00m', distance: '590 km', note: 'Voyage d’affaires direct sans escale' },
    { name: 'Waterloo', type: 'Tech Corridor & Universités', time: '6h 15m', distance: '610 km', note: 'Cabine silencieuse avec prises 110V' },
  ];

  const usaDestinations = [
    { name: 'Burlington Airport (BTV)', state: 'Vermont', tag: 'Airport VIP', note: 'Passage frontière rapide & assistance douanière' },
    { name: 'Plattsburgh Airport (PBG)', state: 'New York', tag: 'Airport VIP', note: 'Vols directs Floride & liaisons privées' },
    { name: 'Boston (BOS)', state: 'Massachusetts', tag: 'Intercity Executive', note: 'Desserte Logan International & universités' },
    { name: 'New York City (JFK/LGA/EWR)', state: 'New York', tag: 'Manhattan VIP', note: 'Arrivée directe à Manhattan sans correspondance' },
    { name: 'Albany', state: 'New York', tag: 'Capitale d’État', note: 'Rencontres d’affaires et délégations' },
  ];

  return (
    <div className="min-h-screen bg-[#ECE7DE] text-neutral-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="liquid-glass-light-pill inline-flex items-center gap-2 px-4 py-2 rounded-lg border-white/90 hover:border-black text-xs font-semibold text-neutral-800 hover:text-black transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isFr ? 'Retour à l’accueil' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onCallback}
              className="liquid-glass-light-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-white/90 text-xs font-medium text-neutral-700 hover:text-black cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#C4963A]" />
              <span className="tabular-nums">{CLIENT_INFO.phone}</span>
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-light-pill border-[#D7B65D]/40 mb-3.5">
            <Globe className="w-3.5 h-3.5 text-[#C4963A]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C4963A]">
              {isFr ? 'RAYONNEMENT GÉOGRAPHIQUE ÉTENDU' : 'EXTENDED REGIONAL COVERAGE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-sans">
            <ShinyText
              text={isFr ? 'Nos Destinations Canada & États-Unis' : 'Our Canada & USA Destinations'}
              color="#171717"
              shineColor="#D7B65D"
              speed={3}
            />
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            {isFr
              ? 'Voyagez en toute quiétude avec chauffeur privé certifié. Prise en charge à votre porte à Montréal pour toutes vos liaisons interurbaines et transfrontalières.'
              : 'Travel with absolute peace of mind with our certified private chauffeurs. Doorstep pickup across Greater Montreal for all regional and cross-border corridors.'}
          </p>
        </div>

        {/* 3 Regional Tabs: equal columns, aligned, all visible */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-10 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('quebec')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-6 py-3 rounded-xl text-center transition-all cursor-pointer min-h-[88px] sm:min-h-0 ${
              activeTab === 'quebec'
                ? 'bg-neutral-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.15)] border border-neutral-800'
                : 'liquid-glass-light-pill text-neutral-700 hover:bg-white/95 border-white/90'
            }`}
          >
            <span className="text-lg sm:text-base leading-none">🍁</span>
            <span className="text-[10px] sm:text-sm font-bold tracking-wider uppercase leading-tight">
              {isFr ? 'Québec & Régions' : 'Quebec & Regions'}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('ontario')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-6 py-3 rounded-xl text-center transition-all cursor-pointer min-h-[88px] sm:min-h-0 ${
              activeTab === 'ontario'
                ? 'bg-neutral-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.15)] border border-neutral-800'
                : 'liquid-glass-light-pill text-neutral-700 hover:bg-white/95 border-white/90'
            }`}
          >
            <span className="text-lg sm:text-base leading-none">🏛️</span>
            <span className="text-[10px] sm:text-sm font-bold tracking-wider uppercase leading-tight">
              {isFr ? 'Corridor Ontario' : 'Ontario Corridor'}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('usa')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-6 py-3 rounded-xl text-center transition-all cursor-pointer min-h-[88px] sm:min-h-0 ${
              activeTab === 'usa'
                ? 'bg-neutral-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.15)] border border-neutral-800'
                : 'liquid-glass-light-pill text-neutral-700 hover:bg-white/95 border-white/90'
            }`}
          >
            <span className="text-lg sm:text-base leading-none">🇺🇸</span>
            <span className="text-[10px] sm:text-sm font-bold tracking-wider uppercase leading-tight">
              {isFr ? 'États-Unis (Transfrontalier)' : 'United States (Cross-Border)'}
            </span>
          </button>
        </div>

        {/* Tab 1: Québec */}
        {activeTab === 'quebec' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {quebecDestinations.map((dest, i) => (
              <div
                key={i}
                onClick={() => onInquiry(dest.name)}
                className="liquid-glass-light-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer active:scale-[0.99] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C4963A]">
                      {dest.distance}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {dest.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#C4963A] transition-colors mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-3 font-medium">
                    {dest.type}
                  </p>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {dest.note}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-medium">Porte-à-porte</span>
                  <div className="w-7 h-7 rounded-full liquid-glass-light-pill group-hover:bg-[#D7B65D] text-neutral-700 group-hover:text-neutral-950 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Ontario */}
        {activeTab === 'ontario' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ontarioDestinations.map((dest, i) => (
              <div
                key={i}
                onClick={() => onInquiry(dest.name)}
                className="liquid-glass-light-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer active:scale-[0.99] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C4963A]">
                      {dest.distance}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {dest.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#C4963A] transition-colors mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-3 font-medium">
                    {dest.type}
                  </p>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {dest.note}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-medium">Liaison d’affaires</span>
                  <div className="w-7 h-7 rounded-full liquid-glass-light-pill group-hover:bg-[#D7B65D] text-neutral-700 group-hover:text-neutral-950 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: USA */}
        {activeTab === 'usa' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl liquid-glass-light-card mb-6 flex items-start gap-3.5 border-[#D7B65D]/40">
              <Shield className="w-5 h-5 text-[#C4963A] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-light">
                <span className="font-bold text-neutral-900">Expertise Douanière & Chauffeurs Accrédités : </span>
                {isFr
                  ? 'Nos chauffeurs possèdent l’expérience complète des postes frontaliers Québec-USA (Saint-Bernard-de-Lacolle, Highgate Springs) pour un passage fluide sans encombre.'
                  : 'Our chauffeurs are fully accredited for cross-border transit between Quebec and the United States for seamless border clearance.'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {usaDestinations.map((dest, i) => (
                <div
                  key={i}
                  onClick={() => onInquiry(dest.name)}
                  className="liquid-glass-light-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer active:scale-[0.99] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-neutral-500 uppercase">
                        {dest.state}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#D7B65D]/20 text-[#8C6B1F]">
                        {dest.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#C4963A] transition-colors mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {dest.note}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-medium">Transfrontalier VIP</span>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-[#D7B65D] text-neutral-700 group-hover:text-neutral-950 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Booking CTA Banner */}
        <div className="mt-16 text-center bg-white/70 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2 font-sans">
            {isFr ? 'Vous avez un itinéraire sur mesure en tête ?' : 'Have a custom route in mind?'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6 max-w-lg mx-auto">
            {isFr
              ? 'Contactez notre conciergerie ou réservez directement en ligne pour un devis instantané et un tarif garanti sans surprise.'
              : 'Contact our concierge team or reserve online for an instant guaranteed rate with zero surprises.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onInquiry()}
              className="px-7 py-3 rounded-md bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isFr ? 'Calculer Votre Trajet Longue Distance' : 'Calculate Long Distance Journey'}
            </button>
            <a
              href={CLIENT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
