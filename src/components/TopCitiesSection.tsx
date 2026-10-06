import React from 'react';
import { TOP_CITIES } from '../data/limoData';
import { CityDestination } from '../types/limo';

interface TopCitiesSectionProps {
  onSelectCity: (city: CityDestination) => void;
}

export const TopCitiesSection: React.FC<TopCitiesSectionProps> = ({ onSelectCity }) => {
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
            Top cities
          </h2>
        </div>

        {/* Content: Left text & Open page, Right 5 vertical cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text paragraph & Open page button */}
          <div className="lg:col-span-4 space-y-6 max-w-sm">
            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light">
              Experience the height of luxury and convenience with LuxeRide&apos;s limousine service in top cities around the world. Contact us today to book your ride and discover the ultimate in luxury transportation with Luxe Ride.
            </p>

            <div>
              <button
                onClick={() => onSelectCity(TOP_CITIES[0])}
                className="px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
              >
                Open page
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
                  className="group relative h-72 sm:h-80 md:h-[350px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* Skyline photo */}
                  <img
                    src={city.image}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

                  {/* Top pill with city name matching screenshot */}
                  <div className="relative z-10 p-2.5 flex justify-center">
                    <span className="px-3 py-1 text-[11px] font-medium text-neutral-800 bg-white/90 backdrop-blur-xs rounded-md shadow-xs">
                      {city.name}
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
