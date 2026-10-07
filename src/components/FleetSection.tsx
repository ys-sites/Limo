import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Luggage, Info, Sparkles } from 'lucide-react';
import { FLEET } from '../data/limoData';
import { Vehicle } from '../types/limo';
import { QuotePrefill } from '../lib/contact';
import { ShinyText } from './ui/ShinyText';

interface FleetSectionProps {
  language: 'FR' | 'EN';
  onQuote: (prefill: QuotePrefill) => void;
  onViewVehicleDetails: (slug: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ 
  language, 
  onQuote, 
  onViewVehicleDetails 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

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

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
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
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
              <ShinyText
                text={language === 'FR' ? 'Notre flotte' : 'Our fleet'}
                color="#171717"
                shineColor="#D7B65D"
                speed={3}
              />
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1">
              {language === 'FR'
                ? 'Tous nos véhicules de prestige sont disponibles 24/7 avec chauffeur privé dédié.'
                : 'All our prestige vehicles are available 24/7 with a dedicated private chauffeur.'}
            </p>
          </div>
        </div>

        {/* Filters: exactly 1 row on mobile (4 equal columns), wrap on desktop */}
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-2 sm:gap-4 pb-4 mb-10 text-xs font-semibold uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full sm:w-auto px-1 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-center text-[10px] sm:text-xs backdrop-blur-md ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-md scale-[1.02]'
                  : 'bg-white/60 hover:bg-white/85 text-neutral-700 border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
              }`}
            >
              {language === 'FR' ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Show all 5 cars at once in an executive responsive layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8"
          >
            {filteredFleet.map((vehicle, idx) => {
              const categoryLabel = language === 'FR' ? vehicle.categoryLabelFr : vehicle.categoryLabelEn;
              const isAllView = filteredFleet.length === 5;
              const isFlagship = isAllView && (idx === 0 || idx === 1);

              // Grid column distribution:
              // In ALL view: 2 flagships on top row (6 cols each = 12), 3 vehicles on bottom row (4 cols each = 12)
              // In filtered view: 3 items => 4 cols each, 1-2 items => 6 cols each
              let colSpanClass = 'lg:col-span-4';
              if (isAllView) {
                colSpanClass = isFlagship ? 'lg:col-span-6' : 'lg:col-span-4';
              } else if (filteredFleet.length <= 2) {
                colSpanClass = 'lg:col-span-6';
              } else if (filteredFleet.length === 3) {
                colSpanClass = 'lg:col-span-4';
              }

              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.45, 
                    delay: idx * 0.06, 
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
                  }}
                  className={`${colSpanClass} bg-white/55 backdrop-blur-xl hover:bg-white/70 rounded-3xl p-6 sm:p-7 flex flex-col justify-between ${
                    isFlagship ? 'min-h-[460px]' : 'min-h-[430px]'
                  } border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_-20px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_28px_60px_-20px_rgba(0,0,0,0.22)] transition-all duration-300 group relative overflow-hidden`}
                >
                  {/* Top: Title, Category & Capacity Badge */}
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

                  {/* Grand Transparent PNG Car View with clean cutout and subtle hover effect */}
                  <div 
                    onClick={() => onViewVehicleDetails(vehicle.slug)}
                    className="py-5 sm:py-7 flex-1 flex flex-col items-center justify-center relative my-2 cursor-pointer group-hover:scale-[1.02] transition-transform"
                  >
                    <div className="w-full flex items-center justify-center relative">
                      <motion.img
                        src={vehicle.image}
                        alt={`${vehicle.name} - Limo Raf Chauffeur Privé Montréal`}
                        loading="lazy"
                        decoding="async"
                        initial={{ scale: 0.95, opacity: 0.9 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.05 + idx * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className={`${
                          isFlagship 
                            ? 'max-h-56 sm:max-h-64 lg:max-h-68' 
                            : 'max-h-44 sm:max-h-48 lg:max-h-52'
                        } w-full object-contain filter drop-shadow-xl group-hover:-translate-y-1 transition-all duration-500 z-10`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Soft realistic ground shadow under wheels */}
                    <div className="w-4/5 h-3.5 bg-black/20 blur-md rounded-full mt-1 mx-auto transition-transform duration-500 group-hover:scale-95 group-hover:opacity-60" />
                    
                    {/* Click to view subpage hint */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-[11px] font-semibold text-neutral-500 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#C4963A]" />
                      <span>{language === 'FR' ? 'Cliquer pour voir la fiche détaillée & photos' : 'Click to view subpage & photos'}</span>
                    </div>
                  </div>

                  {/* Vehicle Tagline & Details Link */}
                  <div className="z-10 pt-2 border-t border-neutral-200/60 flex items-center justify-start">
                    <button
                      type="button"
                      onClick={() => onViewVehicleDetails(vehicle.slug)}
                      className="text-[11px] text-neutral-600 hover:text-black font-semibold text-left underline underline-offset-4 cursor-pointer"
                    >
                      {language === 'FR' ? 'Détails & photos →' : 'Details & photos →'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom banner: Full fleet summary & global reservation CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#F6F6F6] border border-neutral-200/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D7B65D]/15 border border-[#D7B65D]/30 flex items-center justify-center text-[#C4963A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-neutral-900">
                {language === 'FR' 
                  ? '5 Véhicules de Luxe Disponibles 24/7' 
                  : '5 Luxury Vehicles Available 24/7'}
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-500 font-light">
                {language === 'FR' 
                  ? 'Berlines & VUS exécutifs impeccables · Chauffeur en tenue d\'apparat · Wifi haut débit' 
                  : 'Pristine executive SUVs · Uniformed certified chauffeur · High-speed Wi-Fi'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onQuote({ vehicle: FLEET[0].name })}
            className="w-full sm:w-auto px-7 py-3 text-xs font-bold text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] active:scale-[0.98] rounded-full transition-all shadow-md shadow-[#D7B65D]/20 cursor-pointer uppercase tracking-wider"
          >
            {language === 'FR' ? 'Book Now · Réserver' : 'Book Now · Reserve'}
          </button>
        </div>
      </div>
    </section>
  );
};
