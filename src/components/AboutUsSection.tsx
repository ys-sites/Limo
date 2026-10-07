import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LUXURY_EASE, SectionEyebrow, SectionNumeral, HeadlineReveal } from '../lib/motion';

interface AboutUsSectionProps {
  language: 'FR' | 'EN';
  onBookNow?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ language }) => {
  const isFr = language === 'FR';
  const shouldReduceMotion = useReducedMotion();

  const values = isFr
    ? [
        {
          num: '01',
          title: 'Ponctualité rigoureuse',
          desc: 'Suivi des vols en direct, chauffeur sur place avant l’heure convenue.',
        },
        {
          num: '02',
          title: 'Discrétion absolue',
          desc: 'Vos conversations et vos itinéraires restent strictement confidentiels.',
        },
        {
          num: '03',
          title: 'Véhicules impeccables',
          desc: 'Nettoyage méticuleux avant chaque mission, intérieur sans compromis.',
        },
        {
          num: '04',
          title: 'Connaissance du terrain',
          desc: 'Maîtrise des axes routiers du Grand Montréal, de YUL et des corridors régionaux.',
        },
        {
          num: '05',
          title: 'Disponibilité 24/7',
          desc: 'Prise en charge à toute heure, jour et nuit, sur réservation.',
        },
      ]
    : [
        {
          num: '01',
          title: 'Rigorous punctuality',
          desc: 'Live flight monitoring, your chauffeur is always on site ahead of schedule.',
        },
        {
          num: '02',
          title: 'Absolute discretion',
          desc: 'Complete privacy and confidentiality for every trip and executive conversation.',
        },
        {
          num: '03',
          title: 'Impeccable fleet',
          desc: 'Detailed before every single ride for immaculate presentation and comfort.',
        },
        {
          num: '04',
          title: 'Route mastery',
          desc: 'Experienced navigation across Greater Montreal, YUL, and regional corridors.',
        },
        {
          num: '05',
          title: '24/7 Availability',
          desc: 'Chauffeur service ready around the clock by advance reservation.',
        },
      ];

  const imageRevealVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { clipPath: 'inset(100% 0 0 0)' },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      transition: { duration: 1.1, ease: LUXURY_EASE },
    },
  };

  const imageScaleVariants = {
    hidden: shouldReduceMotion ? { scale: 1 } : { scale: 1.15 },
    visible: {
      scale: 1,
      transition: { duration: 1.2, ease: LUXURY_EASE },
    },
  };

  return (
    <section id="about" className="py-28 lg:py-36 bg-[#ECE7DE] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Numeral 02 + Eyebrow */}
        <div className="flex items-baseline justify-between mb-16 pb-6 border-b border-neutral-300/80">
          <div>
            <SectionEyebrow
              text={isFr ? 'À propos de nous' : 'About us'}
              color="text-neutral-700"
              hairlineColor="bg-[#C4963A]"
            />
            <HeadlineReveal
              lines={
                isFr
                  ? ['Ponctuel. Discret.', 'Sans détour.']
                  : ['Punctual. Discreet.', 'Direct.']
              }
              as="h2"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-neutral-900 tracking-tight leading-[1.08]"
            />
          </div>

          <SectionNumeral numeral="02" light={true} className="hidden sm:block" />
        </div>

        {/* Editorial Split: Text & Values on Left, Asymmetric Photography on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Statement & 5 Values List */}
          <div className="lg:col-span-6 space-y-10">
            <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              {isFr
                ? "Basée à Montréal, Limo Raf offre un transport privé soigné pour vos transferts vers l'aéroport YUL, vos journées d'affaires et vos trajets régionaux. Pas de complications, pas d'attente : un véhicule préparé et un chauffeur courtois qui veille au bon déroulement de votre itinéraire."
                : 'Based in Montreal, Limo Raf provides private chauffeured transportation for YUL airport transfers, corporate schedules, and regional journeys. No complications, no waiting: a fully prepared vehicle and a professional chauffeur dedicated to your schedule.'}
            </p>

            {/* Values: Numbered list with thin dividers (no checkmark circles) */}
            <div className="space-y-0 border-t border-neutral-300/80">
              {values.map((val) => (
                <div
                  key={val.num}
                  className="py-5 border-b border-neutral-300/80 grid grid-cols-12 gap-4 items-baseline"
                >
                  <span className="col-span-2 font-display text-sm text-[#C4963A] tracking-wider font-semibold">
                    {val.num}
                  </span>
                  <div className="col-span-10 space-y-1">
                    <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 font-light leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Asymmetric Photography with Clip-Path Reveal */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pt-2">
            {/* Image 1: Tall offset */}
            <div className="sm:col-span-7 space-y-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={imageRevealVariants}
                className="overflow-hidden bg-neutral-900 aspect-[3/4]"
              >
                <motion.img
                  variants={imageScaleVariants}
                  src="/images/about_discretion_vip.jpg"
                  alt="Chauffeur privé Limo Raf en costume"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </motion.div>
              <p className="text-[11px] text-neutral-500 font-light uppercase tracking-[0.14em]">
                {isFr ? 'Discrétion et tenue irréprochable' : 'Discretion and immaculate presentation'}
              </p>
            </div>

            {/* Image 2: Offset lower */}
            <div className="sm:col-span-5 space-y-3 sm:pt-14">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={imageRevealVariants}
                className="overflow-hidden bg-neutral-900 aspect-[4/5]"
              >
                <motion.img
                  variants={imageScaleVariants}
                  src="/images/about_chauffeur_vip.jpg"
                  alt="Accueil client Limo Raf Montréal"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </motion.div>
              <p className="text-[11px] text-neutral-500 font-light uppercase tracking-[0.14em]">
                {isFr ? 'Accueil personnalisé à YUL' : 'Personal meet & greet at YUL'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
