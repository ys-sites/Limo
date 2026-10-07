import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Users, Luggage, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { FLEET, CLIENT_INFO } from '../data/limoData';
import { Vehicle, VehicleCategory } from '../types/limo';

interface FleetSectionProps {
  language: 'FR' | 'EN';
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ language, onSelectVehicle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [pageIndex, setPageIndex] = useState(0);

  const categories = [
    { id: 'ALL', labelEn: 'ALL', labelFr: 'TOUS' },
    { id: 'SUV_VIP', labelEn: 'VIP SUV', labelFr: 'VUS VIP' },
    { id: 'EXECUTIVE', labelEn: 'EXECUTIVE', labelFr: 'EXÉCUTIF' },
    { id: 'ELECTRIC', labelEn: 'ELECTRIC', labelFr: 'ÉLECTRIQUE' }
  ];

  const filteredFleet = FLEET.filter((vehicle) => {
    if (selectedCategory === 'ALL') return true;
    return vehicle.category === selectedCategory;
  });

  // Display 2 items at a time matching screenshot layout
  const totalPages = Math.max(1, Math.ceil(filteredFleet.length / 2));
  const currentPage = Math.min(pageIndex, totalPages - 1);
  const displayedVehicles = filteredFleet.slice(currentPage * 2, currentPage * 2 + 2);

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="fleet" className="py-24 lg:py-28 bg-white text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 02 on left, Our fleet in center */}
        <div className="relative mb-12 sm:mb-14 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <span className="text-4xl sm:text-5xl font-light text-neutral-300 font-sans select-none">
              02
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
            {language === 'FR' ? 'Notre flotte' : 'Our fleet'}
          </h2>
        </div>

        {/* Filters matching screenshot: ALL (active black pill), SEDAN, LUXURY, etc. */}
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 overflow-x-auto pb-4 mb-10 text-xs font-semibold uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setPageIndex(0);
              }}
              className={`px-6 py-2.5 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {language === 'FR' ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* 2 Wide Vehicle Cards directly from screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(displayedVehicles.length > 0 ? displayedVehicles : filteredFleet.slice(0, 2)).map((vehicle) => {
            const categoryLabel = language === 'FR' ? vehicle.categoryLabelFr : vehicle.categoryLabelEn;
            const tagline = language === 'FR' ? vehicle.taglineFr : vehicle.taglineEn;

            return (
              <div
                key={vehicle.id}
                className="bg-[#F6F6F6] hover:bg-[#F3F3F3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[460px] border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Top-left: Title, Category & Price */}
                <div className="flex items-start justify-between gap-4 z-10">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-amber-600 uppercase block mb-1">
                      {categoryLabel}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight font-sans">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-normal mt-0.5">
                      ${vehicle.hourlyRate} / {language === 'FR' ? 'heure' : 'hour'} · {language === 'FR' ? 'Forfait YUL' : 'Airport Flat'}: ${vehicle.flatAirportRate}
                    </p>
                  </div>

                  {/* Passenger & Luggage quick badge */}
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-neutral-200/80 text-[11px] text-neutral-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{vehicle.passengers}</span>
                    </span>
                    <span className="text-neutral-300">|</span>
                    <span className="flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{vehicle.luggage}</span>
                    </span>
                  </div>
                </div>

                {/* Grand Transparent PNG Car View with ambient ground shadow */}
                <div className="py-6 sm:py-8 flex-1 flex flex-col items-center justify-center relative my-2">
                  <div className="w-full flex items-center justify-center relative">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} - Limo Raf Chauffeur Privé Montréal`}
                      className="max-h-56 sm:max-h-64 lg:max-h-72 w-full object-contain filter drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 z-10"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Soft realistic ground shadow under wheels */}
                  <div className="w-4/5 h-4 bg-black/20 blur-md rounded-full mt-1 mx-auto transition-transform duration-500 group-hover:scale-95 group-hover:opacity-60" />
                </div>

                {/* Vehicle Tagline & Bottom CTA Controls */}
                <div className="z-10 pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                  <p className="text-[11px] text-neutral-500 line-clamp-1 max-w-[210px] sm:max-w-xs font-light">
                    {tagline}
                  </p>

                  <div className="flex items-center gap-2">
                    <a
                      href={CLIENT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors"
                      title="WhatsApp Quote"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>

                    {/* Book now with yellow circle arrow button matching screenshot */}
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-medium cursor-pointer shadow-sm transition-transform active:scale-95"
                    >
                      <span>{language === 'FR' ? 'Réserver' : 'Book now'}</span>
                      <div className="w-4 h-4 rounded-full bg-[#E4A836] flex items-center justify-center text-neutral-950">
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom controls: ← → 5 vehicles (left), Open page (right) matching screenshot */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Previous fleet page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Next fleet page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-600 font-medium ml-2">
              {filteredFleet.length} {language === 'FR' ? 'véhicules disponibles' : 'vehicles available'}
            </span>
          </div>

          <button
            onClick={() => onSelectVehicle(FLEET[0])}
            className="px-7 py-3 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
          >
            {language === 'FR' ? 'Réserver la flotte' : 'Open page'}
          </button>
        </div>
      </div>
    </section>
  );
};
