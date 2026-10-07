import React from 'react';
import { motion } from 'motion/react';
import { TOP_CITIES } from '../data/limoData';
import { CityDestination } from '../types/limo';
import { AccordionGallery, AccordionGalleryItem } from './ui/AccordionGallery';
import { ShinyText } from './ui/ShinyText';
import { FoldText } from './ui/FoldText';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface TopCitiesSectionProps {
  language: 'FR' | 'EN';
  onSelectCity: (city: CityDestination) => void;
  onViewAllDestinations?: () => void;
}

export const TopCitiesSection: React.FC<TopCitiesSectionProps> = ({
  language,
  onSelectCity,
  onViewAllDestinations
}) => {
  const isFr = language === 'FR';

  const galleryItems: AccordionGalleryItem[] = TOP_CITIES.slice(0, 5).map((city) => ({
    image: city.image,
    cityName: city.name,
    label: `${city.name}`,
    region: city.region,
    airportCode: city.airportCode,
    alt: `${city.name} - Chauffeur Privé Limo Raf`,
  }));

  const handleItemClick = (_item: AccordionGalleryItem, index: number) => {
    if (TOP_CITIES[index]) {
      onSelectCity(TOP_CITIES[index]);
    }
  };

  return (
    <section id="cities" className="py-24 lg:py-32 bg-[#08090C] text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-[#D7B65D]/5 rounded-full blur-[160px] pointer-events-none" />

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
            <Sparkles className="w-3.5 h-3.5 text-[#F5D577]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5D577]">
              {isFr ? 'DESTINATIONS DE LUXE' : 'PRESTIGE DESTINATIONS'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-serif">
            <ShinyText
              text={isFr ? 'Destinations Phares' : 'Top Destinations'}
              className="text-[#D7B65D]"
              speed={4}
            />
          </h2>

          <div className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto">
            <FoldText
              text={
                isFr
                  ? "Survolez chaque destination pour explorer nos liaisons régulières d'exception avec chauffeur dédié."
                  : "Hover over each destination to explore our signature chauffeured corridors with dedicated service."
              }
              trigger="scroll"
              duration={0.65}
              stagger={0.03}
              color="#D1D5DB"
            />
          </div>
        </motion.div>

        {/* AccordionGallery Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <AccordionGallery
            items={galleryItems}
            defaultIndex={0}
            expandRatio={0.46}
            trigger="hover"
            accentColor="#D7B65D"
            overlayColor="#07080A"
            textColor="#ffffff"
            height={440}
            gap={14}
            radius={22}
            tilt={6}
            parallax={0.35}
            grayscale={false}
            onItemClick={handleItemClick}
          />
        </motion.div>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-sm">
          <div className="text-xs sm:text-sm text-neutral-300">
            <span className="font-bold text-[#F5D577]">
              {isFr ? 'Trajets longue distance sur mesure :' : 'Bespoke long distance transit :'}
            </span>{' '}
            {isFr
              ? "Prise en charge à votre porte, tarif fixe tout compris et confort première classe."
              : "Doorstep pickup, guaranteed fixed flat-rate pricing, and first-class cabin comfort."}
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {onViewAllDestinations && (
              <button
                type="button"
                onClick={onViewAllDestinations}
                className="px-5 py-2.5 rounded-full border border-neutral-700 hover:border-[#D7B65D] text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#D7B65D] transition-all cursor-pointer"
              >
                {isFr ? 'Toutes les destinations →' : 'All destinations →'}
              </button>
            )}
            <button
              type="button"
              onClick={() => onSelectCity(TOP_CITIES[0])}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#D7B65D]/20 cursor-pointer"
            >
              <span>{isFr ? 'Réserver un trajet' : 'Book a route'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
