import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowUpRight, X, Shield, Sparkles } from 'lucide-react';
import { ShinyText } from './ui/ShinyText';

interface AboutUsSectionProps {
  language: 'FR' | 'EN';
  onQuote?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ language, onQuote }) => {
  const isFr = language === 'FR';
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const valuesList = isFr
    ? [
        { label: 'Ponctualité rigoureuse', desc: 'Suivi des vols en direct et chauffeur sur place à l’avance' },
        { label: 'Discrétion absolue', desc: 'Confidentialité totale pour vos réunions et trajets privés' },
        { label: 'Chauffeurs accrédités', desc: 'Chauffeurs professionnels courtois, formés et bilingues' },
        { label: 'Flotte VUS impeccable', desc: 'Véhicules récents nettoyés et vérifiés avant chaque départ' },
        { label: 'Service sur mesure 24/7', desc: 'Itinéraires personnalisés, transferts aéroport et longue distance' },
      ]
    : [
        { label: 'Rigorous Punctuality', desc: 'Live flight tracking, chauffeur on-site ahead of schedule' },
        { label: 'Absolute Discretion', desc: 'Complete privacy for your business meetings and personal travel' },
        { label: 'Accredited Chauffeurs', desc: 'Professional, courteous, licensed and bilingual drivers' },
        { label: 'Immaculate SUV Fleet', desc: 'Late-model luxury vehicles detailed before every departure' },
        { label: '24/7 Bespoke Service', desc: 'Custom itineraries, airport transfers, and long-distance travel' },
      ];

  return (
    <section id="about" className="py-24 lg:py-28 bg-[#ECE7DE] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 02 on left, Our values in center matching exact previous layout */}
        <div className="relative mb-14 sm:mb-16 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
            <span className="text-4xl sm:text-5xl font-light text-neutral-400/80 font-sans select-none">
              02
            </span>
          </div>

          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-neutral-900 mb-2">
              <ShinyText
                text={isFr ? 'Nos valeurs' : 'Our values'}
                color="#171717"
                shineColor="#D7B65D"
                speed={3}
              />
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-1.5">
              {isFr
                ? 'Limo Raf est la référence en transport privé haut de gamme à Montréal.'
                : 'Limo Raf is the benchmark for premier luxury chauffeured transportation in Montreal.'}
            </p>
          </div>
        </div>

        {/* 3 Cards matching exact previous UI layout with updated info */}
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

            {/* Top-left label on image */}
            <div className="absolute top-4 left-4 z-10">
              <div className="liquid-glass-light-pill px-4 py-1.5 rounded-lg border border-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.15)]">
                <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                  {isFr ? 'Excellence & Discrétion' : 'Excellence & Privacy'}
                </span>
              </div>
            </div>

            {/* Middle summary */}
            <div className="absolute bottom-16 left-4 right-4 z-10">
              <p className="text-xs text-white/95 line-clamp-2 drop-shadow-sm font-light">
                {isFr
                  ? "Prise en charge ponctuelle et discrétion totale pour vos transferts aéroport et rendez-vous d'affaires."
                  : "Punctual dispatch and complete privacy for your airport transfers and corporate schedules."}
              </p>
            </div>

            {/* Bottom-right button on image */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="flex items-center gap-1.5 bg-neutral-950/85 hover:bg-neutral-950 text-white pl-3.5 pr-1.5 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.3)] transition-all">
                <span>{isFr ? 'En savoir plus' : 'Explore more'}</span>
                <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Chauffeurs Professionnels (Round button like Card 2 in previous UI) */}
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
              <div className="liquid-glass-light-pill px-4 py-1.5 rounded-lg border border-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.15)]">
                <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                  {isFr ? 'Chauffeurs Professionnels' : 'Professional Chauffeurs'}
                </span>
              </div>
            </div>

            {/* Middle summary */}
            <div className="absolute bottom-16 left-4 right-4 z-10">
              <p className="text-xs text-white/95 line-clamp-2 drop-shadow-sm font-light">
                {isFr
                  ? "Courtoisie, tenue irréprochable et maîtrise parfaite des itinéraires de Montréal et des environs."
                  : "Courtesy, immaculate presentation, and flawless route mastery throughout Greater Montreal."}
              </p>
            </div>

            {/* Bottom-right round button on image */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="w-8 h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-md border border-white group-hover:scale-110 group-hover:bg-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: 5 Engagements / Checkmarks */}
          <div
            className="liquid-glass-light-card relative rounded-2xl overflow-hidden aspect-[4/3] sm:h-76 lg:h-84 w-full p-5 sm:p-6 flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            onClick={() => setActiveModal('engagements')}
          >
            {/* Top label */}
            <div className="flex items-center justify-between">
              <div className="liquid-glass-light-pill px-3.5 py-1.5 rounded-lg border border-white/90">
                <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                  {isFr ? 'Nos 5 Engagements' : 'Our 5 Commitments'}
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-[#C4963A]" />
            </div>

            {/* Checkmark list items */}
            <div className="my-2 space-y-2">
              {valuesList.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#D7B65D] flex items-center justify-center text-neutral-950 shrink-0 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-medium text-neutral-800 truncate">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom-right button */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-1.5 bg-neutral-950/85 hover:bg-neutral-950 text-white pl-3.5 pr-1.5 py-1.5 rounded-full text-[11px] font-medium transition-all shadow-md">
                <span>{isFr ? 'En savoir plus' : 'Explore more'}</span>
                <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Text Statement */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto text-center space-y-6">
          <p className="text-lg sm:text-xl text-neutral-800 leading-relaxed font-normal">
            {isFr
              ? "Que ce soit pour un voyage d'affaires, une escapade de loisir ou une occasion spéciale, nos limousines avec chauffeur privé vous garantissent d'arriver avec style, confort et ponctualité."
              : "Whether you're traveling for business, leisure, or a special occasion, our chauffeur-driven limousines ensure you arrive in style, comfort, and on time."}
          </p>
        </div>
      </div>

      {/* Modal Detail for Each Card */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 text-neutral-900 relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D7B65D]/20 text-[#C4963A] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {activeModal === 'excellence' && (isFr ? 'Excellence & Discrétion' : 'Excellence & Discretion')}
                    {activeModal === 'chauffeurs' && (isFr ? 'Chauffeurs Professionnels' : 'Professional Chauffeurs')}
                    {activeModal === 'engagements' && (isFr ? 'Nos 5 Engagements' : 'Our 5 Commitments')}
                  </h3>
                  <p className="text-xs text-neutral-500">Limo Raf Montréal</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">
                {activeModal === 'excellence' && (
                  <>
                    <p>
                      {isFr
                        ? "Fondée sur une exigence de discrétion absolue, Limo Raf accompagne une clientèle d'affaires, des voyageurs internationaux et des particuliers pour qui chaque minute compte."
                        : "Built on absolute confidentiality and discretion, Limo Raf serves executives, international travelers, and clients for whom every minute counts."}
                    </p>
                    <p>
                      {isFr
                        ? "Nous surveillons l'état de vos vols en direct pour ajuster votre heure de prise en charge en cas d'avance ou de retard, garantissant un accueil sans aucune attente."
                        : "We monitor your flights in real-time to adjust pickup times automatically, ensuring zero waiting upon landing."}
                    </p>
                  </>
                )}

                {activeModal === 'chauffeurs' && (
                  <>
                    <p>
                      {isFr
                        ? "Nos chauffeurs professionnels, rigoureusement sélectionnés et formés aux plus hautes exigences, incarnent la courtoisie, la discrétion et la maîtrise absolue des itinéraires."
                        : "Our professional chauffeurs, meticulously selected and trained to executive standards, embody courtesy, discretion, and route mastery."}
                    </p>
                    <p>
                      {isFr
                        ? "Bilingues (français et anglais), ils veillent au bon déroulement de vos trajets à travers le Grand Montréal, Laval, la Rive-Sud, l'Aéroport YUL et les corridors régionaux."
                        : "Bilingual (French and English), they ensure seamless transportation across Greater Montreal, Laval, the South Shore, YUL Airport, and regional corridors."}
                    </p>
                  </>
                )}

                {activeModal === 'engagements' && (
                  <div className="space-y-2.5 pt-1">
                    {valuesList.map((val, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#D7B65D] flex items-center justify-center text-neutral-950 shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-neutral-900 block">{val.label}</span>
                          <span className="text-xs text-neutral-500">{val.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    onQuote?.();
                  }}
                  className="px-6 py-2.5 rounded-md bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-semibold text-xs shadow-sm cursor-pointer transition-colors"
                >
                  {isFr ? 'Réserver maintenant' : 'Book Now'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
