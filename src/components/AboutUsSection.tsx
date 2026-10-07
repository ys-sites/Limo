import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowUpRight, X, Shield, Sparkles } from 'lucide-react';

interface AboutUsSectionProps {
  language: 'FR' | 'EN';
  onBookNow?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ language, onBookNow }) => {
  const isFr = language === 'FR';
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const valuesList = isFr
    ? [
        { label: 'Élégance Inégalée', desc: 'Prestige et finitions haut de gamme' },
        { label: 'Dévouement 24/7', desc: 'Disponibilité continue jour et nuit' },
        { label: 'Excellence Continue', desc: 'Zéro compromis sur la qualité' },
        { label: 'Le Luxe Redéfini', desc: 'Confort absolu et discrétion totale' },
        { label: 'Expérience Amplifiée', desc: 'Attention portée aux moindres détails' },
      ]
    : [
        { label: 'Unmatched Elegance', desc: 'Prestige and high-end VIP finishes' },
        { label: '24/7 Dedication', desc: 'Round-the-clock availability for you' },
        { label: 'Seamless Excellence', desc: 'Zero compromise on quality and service' },
        { label: 'Luxury Redefined', desc: 'Absolute comfort and discretion' },
        { label: 'Experience, Amplified', desc: 'Exquisite attention to every single detail' },
      ];

  return (
    <section id="about" className="py-24 lg:py-28 bg-[#ECE7DE] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 02 on left, Our values in center matching exact layout */}
        <div className="relative mb-14 sm:mb-16 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
            <span className="text-4xl sm:text-5xl font-light text-neutral-400/80 font-sans select-none">
              02
            </span>
          </div>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
              {isFr ? 'Nos valeurs' : 'Our values'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-1.5">
              {isFr
                ? 'Limo Raf est la référence en transport privé haut de gamme à Montréal.'
                : 'Limo Raf is the benchmark for premier luxury chauffeured transportation in Montreal.'}
            </p>
          </div>
        </div>

        {/* 3 Cards matching exact screenshot layout with all extra info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Excellence & Discrétion */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:h-76 lg:h-84 w-full shadow-md group cursor-pointer transition-transform duration-300 hover:-translate-y-1 bg-neutral-900"
            onClick={() => setActiveModal('excellence')}
          >
            <img
              src="/images/about_discretion_vip.jpg"
              alt="Excellence et discrétion Limo Raf"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

            {/* Top-left label on image matching screenshot */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-lg shadow-sm border border-black/5">
                <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                  {isFr ? 'Excellence & Discrétion' : 'Excellence & Privacy'}
                </span>
              </div>
            </div>

            {/* Middle summary */}
            <div className="absolute bottom-16 left-4 right-4 z-10">
              <p className="text-xs text-white/95 line-clamp-2 drop-shadow-sm font-light">
                {isFr
                  ? "Chaque minute compte et chaque confort est primordial pour vos déplacements d'affaires."
                  : "Every minute counts and every comfort is paramount for your executive journeys."}
              </p>
            </div>

            {/* Bottom-right button on image matching screenshot */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="flex items-center gap-1.5 bg-black/85 hover:bg-black text-white pl-3.5 pr-1.5 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-xs transition-all shadow-md">
                <span>{isFr ? 'En savoir plus' : 'Explore more'}</span>
                <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Chauffeurs Professionnels (Round button like Card 2 in screenshot) */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:h-76 lg:h-84 w-full shadow-md group cursor-pointer transition-transform duration-300 hover:-translate-y-1 bg-neutral-900"
            onClick={() => setActiveModal('chauffeurs')}
          >
            <img
              src="/images/about_chauffeur_vip.jpg"
              alt="Chauffeurs VIP Limo Raf"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />

            {/* Top-left label */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-lg shadow-sm border border-black/5">
                <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                  {isFr ? 'Chauffeurs Professionnels' : 'Professional Chauffeurs'}
                </span>
              </div>
            </div>

            {/* Middle summary */}
            <div className="absolute bottom-16 left-4 right-4 z-10">
              <p className="text-xs text-white/95 line-clamp-2 drop-shadow-sm font-light">
                {isFr
                  ? "Courtoisie, discrétion et maîtrise absolue des itinéraires du Grand Montréal."
                  : "Courtesy, discretion, and flawless knowledge of all Greater Montreal routes."}
              </p>
            </div>

            {/* Bottom-right round button on image matching Card 2 in screenshot */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: 5 Engagements / Checkmarks */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:h-76 lg:h-84 w-full shadow-md group cursor-pointer transition-transform duration-300 hover:-translate-y-1 bg-white p-5 flex flex-col justify-between border border-black/5"
            onClick={() => setActiveModal('engagements')}
          >
            {/* Top label */}
            <div className="flex items-center justify-between">
              <div className="bg-neutral-100 px-3.5 py-1.5 rounded-lg">
                <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                  {isFr ? 'Nos 5 Engagements' : 'Our 5 Commitments'}
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-[#C4963A]" />
            </div>

            {/* Checkmark list items */}
            <div className="my-2 space-y-2">
              {valuesList.slice(0, 4).map((val, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D7B65D] flex items-center justify-center text-neutral-950 shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-neutral-800 truncate">
                    {val.label}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#D7B65D] flex items-center justify-center text-neutral-950 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-xs font-medium text-neutral-800 truncate">
                  {valuesList[4]?.label}
                </span>
              </div>
            </div>

            {/* Bottom-right button */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-1.5 bg-black/85 hover:bg-black text-white pl-3.5 pr-1.5 py-1.5 rounded-full text-[11px] font-medium transition-all shadow-md">
                <span>{isFr ? 'En savoir plus' : 'Explore more'}</span>
                <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Text Statement & Button matching screenshot */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto text-center space-y-6">
          <p className="text-lg sm:text-xl text-neutral-800 leading-relaxed font-normal">
            {isFr
              ? "Que ce soit pour un voyage d'affaires, une escapade de loisir ou une occasion spéciale, nos limousines avec chauffeur privé vous garantissent d'arriver avec style, confort et ponctualité."
              : "Whether you're traveling for business, leisure, or a special occasion, our chauffeur-driven limousines ensure you arrive in style, comfort, and on time."}
          </p>

          <div>
            <button
              type="button"
              onClick={onBookNow}
              className="inline-block px-7 py-3 text-xs font-semibold text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
            >
              {isFr ? 'Réserver Votre Chauffeur VIP' : 'Reserve Your VIP Chauffeur'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 text-neutral-900 relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7B65D]/20 text-[#C4963A] flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {isFr ? 'Nos Engagements d’Excellence' : 'Our Commitment to Excellence'}
                  </h3>
                  <p className="text-xs text-neutral-500">Limo Raf Montréal</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">
                <p>
                  {isFr
                    ? "Fondée sur une exigence d'excellence intransigeante, Limo Raf accompagne une clientèle d'affaires, des voyageurs internationaux et des particuliers pour qui chaque minute compte et chaque confort est primordial."
                    : "Built on an uncompromising standard of excellence, Limo Raf serves executives, international travelers, and clients for whom every minute counts."}
                </p>
                <p>
                  {isFr
                    ? "Nos chauffeurs professionnels, rigoureusement sélectionnés et formés aux plus hautes exigences protocolaires, incarnent la courtoisie, la discrétion et la maîtrise absolue des itinéraires."
                    : "Our professional chauffeurs, meticulously selected and trained in protocol etiquette, embody courtesy, discretion, and route mastery."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    onBookNow?.();
                  }}
                  className="px-6 py-2.5 rounded-md bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-semibold text-xs shadow-sm"
                >
                  {isFr ? 'Fermer & Réserver' : 'Close & Book'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
