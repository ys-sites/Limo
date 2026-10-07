import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Users, Luggage, MessageSquare, Info } from 'lucide-react';
import { FLEET, CLIENT_INFO } from '../data/limoData';
import { Vehicle } from '../types/limo';

interface FleetSectionProps {
  language: 'FR' | 'EN';
  onSelectVehicle: (vehicle: Vehicle) => void;
  onViewVehicleDetails: (slug: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ 
  language, 
  onSelectVehicle,
  onViewVehicleDetails 
}) => {
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
        {/* Section Header: 03 on left, Our fleet in center */}
        <div className="relative mb-12 sm:mb-14 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
            <span className="text-4xl sm:text-5xl font-light text-neutral-300 font-sans select-none">
              03
            </span>
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
              {language === 'FR' ? 'Notre flotte' : 'Our fleet'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1">
              {language === 'FR'
                ? 'Cliquez sur un véhicule pour découvrir sa fiche complète et ses photos exclusives.'
                : 'Click on any vehicle to view its complete photo gallery and specifications.'}
            </p>
          </div>
        </div>

        {/* Filters matching screenshot: TOUS (active black pill), VUS VIP, etc. */}
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

        {/* 2 Wide Vehicle Cards directly matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(displayedVehicles.length > 0 ? displayedVehicles : filteredFleet.slice(0, 2)).map((vehicle) => {
            const categoryLabel = language === 'FR' ? vehicle.categoryLabelFr : vehicle.categoryLabelEn;

            return (
              <div
                key={vehicle.id}
                className="bg-[#F6F6F6] hover:bg-[#F3F3F3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[460px] border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Top-left: Title & Category (No Prices Shown) */}
                <div className="flex items-start justify-between gap-4 z-10">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-[#C4963A] uppercase block mb-1">
                      {categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => onViewVehicleDetails(vehicle.slug)}
                      className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight font-sans text-left hover:text-[#C4963A] transition-colors cursor-pointer"
                    >
                      {vehicle.name}
                    </button>
                    <p className="text-xs text-neutral-500 font-normal mt-0.5">
                      {language === 'FR' ? 'Tarif tout compris · Devis sur mesure' : 'All-inclusive rate · Custom quote'}
                    </p>
                  </div>

                  {/* Passenger & Luggage quick badge */}
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-neutral-200/80 text-[11px] text-neutral-600 font-medium shrink-0">
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

                {/* Grand Transparent PNG Car View with clean cutout */}
                <div 
                  onClick={() => onViewVehicleDetails(vehicle.slug)}
                  className="py-6 sm:py-8 flex-1 flex flex-col items-center justify-center relative my-2 cursor-pointer group-hover:scale-[1.02] transition-transform"
                >
                  <div className="w-full flex items-center justify-center relative">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} - Limo Raf Chauffeur Privé Montréal`}
                      className="max-h-56 sm:max-h-64 lg:max-h-72 w-full object-contain filter drop-shadow-xl group-hover:-translate-y-1 transition-all duration-500 z-10"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Soft realistic ground shadow under wheels */}
                  <div className="w-4/5 h-4 bg-black/20 blur-md rounded-full mt-1 mx-auto transition-transform duration-500 group-hover:scale-95 group-hover:opacity-60" />
                  
                  {/* Click to view subpage hint */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-[11px] font-semibold text-neutral-500 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#C4963A]" />
                    <span>{language === 'FR' ? 'Cliquer pour voir la fiche détaillée & photos' : 'Click to view subpage & photos'}</span>
                  </div>
                </div>

                {/* Vehicle Tagline & Bottom CTA Controls */}
                <div className="z-10 pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onViewVehicleDetails(vehicle.slug)}
                    className="text-[11px] text-neutral-600 hover:text-black font-semibold text-left underline underline-offset-4 cursor-pointer"
                  >
                    {language === 'FR' ? 'Détails & photos →' : 'Details & photos →'}
                  </button>

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

                    {/* Book now with gold circle arrow button */}
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-medium cursor-pointer shadow-sm transition-transform active:scale-95"
                    >
                      <span>{language === 'FR' ? 'Book Now' : 'Book Now'}</span>
                      <div className="w-4 h-4 rounded-full bg-[#D7B65D] flex items-center justify-center text-neutral-950">
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom controls: ← → 5 vehicles (left), View fleet button (right) */}
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
              {filteredFleet.length} {language === 'FR' ? 'véhicules de luxe disponibles' : 'luxury vehicles available'}
            </span>
          </div>

          <button
            onClick={() => onSelectVehicle(FLEET[0])}
            className="px-7 py-3 text-xs font-semibold text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
          >
            {language === 'FR' ? 'Book Now · Réserver' : 'Book Now · Reserve'}
          </button>
        </div>
      </div>
    </section>
  );
};
