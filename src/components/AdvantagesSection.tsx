import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Car, Clock, Sparkles, Headphones, Award, ArrowUpRight } from 'lucide-react';

interface AdvantagesSectionProps {
  language: 'FR' | 'EN';
  onBookNow?: () => void;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ language, onBookNow }) => {
  const isFr = language === 'FR';

  const advantages = [
    {
      icon: UserCheck,
      number: '01',
      titleFr: 'Professionnalisme et expertise',
      titleEn: 'Professionalism and expertise',
      descFr: 'Nos chauffeurs d’expérience sont hautement qualifiés, courtois, discrets et impeccablement vêtus pour toutes occasions.',
      descEn: 'Our experienced chauffeurs are highly qualified, courteous, discreet, and impeccably attired for every occasion.'
    },
    {
      icon: Car,
      number: '02',
      titleFr: 'Flotte luxueuse et confortable',
      titleEn: 'Luxurious and comfortable fleet',
      descFr: 'Des SUV noirs récents haut de gamme (Cadillac Escalade ESV, GMC Yukon Denali XL, Cadillac Lyriq), méticuleusement entretenus.',
      descEn: 'Late-model luxury black SUVs (Cadillac Escalade ESV, GMC Yukon Denali XL, Cadillac Lyriq), meticulously detailed and maintained.'
    },
    {
      icon: Clock,
      number: '03',
      titleFr: 'Ponctualité et fiabilité',
      titleEn: 'Punctuality and reliability',
      descFr: 'Nous respectons scrupuleusement vos horaires avec un suivi en temps réel de votre vol et des conditions routières.',
      descEn: 'We strictly respect your schedule with real-time flight tracking and dynamic routing for zero delays.'
    },
    {
      icon: Sparkles,
      number: '04',
      titleFr: 'Services personnalisés sur-mesure',
      titleEn: 'Customized bespoke services',
      descFr: 'Chaque trajet est adapté à vos exigences : température préférée, chargeurs universels, rafraîchissements et discrétion.',
      descEn: 'Every ride is tailored to your preferences: personalized temperature, universal chargers, refreshments, and absolute discretion.'
    },
    {
      icon: ShieldCheck,
      number: '05',
      titleFr: 'Sécurité maximale',
      titleEn: 'Safety and security',
      descFr: 'Véhicules à traction intégrale (AWD/4x4) préparés pour toutes conditions climatiques et chauffeurs certifiés.',
      descEn: 'All-wheel drive (AWD/4x4) luxury vehicles prepared for Canadian weather conditions with certified professional chauffeurs.'
    },
    {
      icon: Headphones,
      number: '06',
      titleFr: 'Service client d’excellence 24/7',
      titleEn: 'Customer service excellence 24/7',
      descFr: 'Une conciergerie dévouée et réactive 24 heures sur 24 pour répondre instantanément à toutes vos demandes.',
      descEn: 'Dedicated round-the-clock concierge support ready to immediately answer inquiries and accommodate itinerary changes.'
    }
  ];

  return (
    <section id="advantages" className="py-24 lg:py-32 bg-[#F6F6F6] text-neutral-900 relative overflow-hidden border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with 05 and laptop rise-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-14 sm:mb-18 flex items-center justify-center"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <span className="text-4xl sm:text-5xl font-light text-neutral-300 font-sans select-none">
              05
            </span>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D7B65D]/15 border border-[#D7B65D]/40 mb-3.5">
              <Award className="w-3.5 h-3.5 text-[#C4963A]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#C4963A]">
                {isFr ? '05 · POURQUOI NOUS CHOISIR ?' : '05 · WHY CHOOSE US ?'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-4 font-sans">
              {isFr ? 'Nos Avantages Exclusifs' : 'Our Exclusive Advantages'}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-xl mx-auto">
              {isFr
                ? 'Chez Limo Raf, notre priorité absolue est de vous offrir un service d’exception. Découvrez les engagements qui font notre réputation.'
                : 'At Limo Raf, our top priority is delivering exceptional service. Discover the commitments that define our reputation.'}
            </p>
          </div>
        </motion.div>

        {/* 6 Elegant Cards with laptop rise-up staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            const title = isFr ? adv.titleFr : adv.titleEn;
            const desc = isFr ? adv.descFr : adv.descEn;

            return (
              <motion.div
                key={adv.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 sm:p-8 rounded-3xl bg-white hover:bg-[#FAFAFA] border border-neutral-200/80 hover:border-[#D7B65D]/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#D7B65D]/15 border border-[#D7B65D]/30 flex items-center justify-center text-[#C4963A] group-hover:bg-[#D7B65D] group-hover:text-neutral-950 transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-2xl font-bold text-neutral-300 group-hover:text-[#C4963A] transition-colors font-sans">
                      {adv.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#C4963A] transition-colors mb-2.5">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    {desc}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-[#C4963A] font-semibold uppercase tracking-wider">
                  <span>{isFr ? 'Standard Prestige' : 'Prestige Standard'}</span>
                  <div className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-[#D7B65D] group-hover:text-neutral-950 flex items-center justify-center text-neutral-500 transition-colors">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        {onBookNow && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 sm:mt-16 text-center"
          >
            <button
              type="button"
              onClick={onBookNow}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-md bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isFr ? 'Expérimenter l’Excellence Limo Raf' : 'Experience Limo Raf Excellence'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
