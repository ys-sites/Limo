import React from 'react';
import { TOP_CITIES } from '../data/limoData';
import { CityDestination } from '../types/limo';

interface TopCitiesSectionProps {
  language: 'FR' | 'EN';
  onSelectCity: (city: CityDestination) => void;
}

export const TopCitiesSection: React.FC<TopCitiesSectionProps> = ({ language, onSelectCity }) => {
  return (
    <section id="cities" className="py-24 lg:py-28 bg-white text-neutral-900 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 03 on left, Top cities in center */}
        <div className="relative mb-14 sm:mb-16 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <span className="text-4xl sm:text-5xl font-light text-neutral-300 font-sans select-none">
              03
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
            {language === 'FR' ? 'Destinations phares' : 'Top destinations'}
          </h2>
        </div>

        {/* Content: Left text & Open page, Right 5 vertical cards matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text paragraph & Open page button */}
          <div className="lg:col-span-4 space-y-6 max-w-sm">
            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light">
              {language === 'FR'
                ? "Découvrez le summum du confort avec Limo Raf à Montréal et ses environs. Que ce soit pour un transfert vers l'aéroport YUL, une escapade vers les pentes de Mont-Tremblant, ou un déplacement d'affaires à Laval, Québec ou Ottawa, nos chauffeurs privés garantissent une ponctualité exemplaire et une discrétion absolue."
                : "Experience the height of luxury and convenience with Limo Raf across Montreal and premier regional destinations. From YUL airport transfers to Mont-Tremblant ski retreats and executive corporate travel to Laval, Quebec City, and Ottawa, ride with unmatched peace of mind."}
            </p>

            <div>
              <button
                onClick={() => onSelectCity(TOP_CITIES[0])}
                className="px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
              >
                {language === 'FR' ? 'Explorer les trajets' : 'Open page'}
              </button>
            </div>
          </div>

          {/* Right Column: 5 Vertical City Cards directly matching screenshot */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
              {TOP_CITIES.slice(0, 5).map((city) => (
                <div
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                  className="group relative h-72 sm:h-80 md:h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-100"
                >
                  {/* Skyline photo */}
                  <img
                    src={city.image}
                    alt={`${city.name} - Limo Raf Destination`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />

                  {/* Top pill with city name matching screenshot */}
                  <div className="relative z-10 p-2.5 flex justify-center">
                    <span className="px-3 py-1 text-[11px] font-medium text-neutral-900 bg-white/95 backdrop-blur-xs rounded-md shadow-xs border border-white/50">
                      {city.name}
                    </span>
                  </div>

                  {/* Bottom region & info badge on hover */}
                  <div className="absolute bottom-3 left-2.5 right-2.5 z-10 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-amber-300 tracking-wider uppercase font-semibold block">
                      {city.region}
                    </span>
                    <span className="text-[11px] font-light text-neutral-200 line-clamp-1">
                      {city.airportCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
