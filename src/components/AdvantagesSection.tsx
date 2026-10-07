import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Car, Clock, Sparkles, Headphones, Award } from 'lucide-react';
import { ShinyText } from './ui/ShinyText';

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
    <section id="advantages" className="py-24 lg:py-32 bg-[#090A0D] text-white relative overflow-hidden border-t border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#D7B65D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#D7B65D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Blacklane-style smooth reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D7B65D]/10 border border-[#D7B65D]/30 mb-4 backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-[#F5D577]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5D577]">
              {isFr ? '05 · POURQUOI NOUS CHOISIR ?' : '05 · WHY CHOOSE US ?'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 font-serif">
            <ShinyText
              text={isFr ? 'Nos Avantages Exclusifs' : 'Our Exclusive Advantages'}
              className="text-[#D7B65D]"
              speed={4}
            />
          </h2>

          {/* Banner Quote from Screenshot */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-[#D7B65D]/20 backdrop-blur-md">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {isFr
                ? 'Chez Limo Raf, notre priorité absolue est de vous offrir un service d’exception. Voici les avantages dont vous bénéficiez avec nous :'
                : 'At Limo Raf, our top priority is providing you with exceptional service. Here are some of the advantages you will enjoy with us:'}
            </p>
          </div>
        </motion.div>

        {/* 6 Dashed Border Cards Grid matching Screenshots 3 & 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            const title = isFr ? adv.titleFr : adv.titleEn;
            const desc = isFr ? adv.descFr : adv.descEn;

            return (
              <motion.div
                key={adv.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 sm:p-8 rounded-3xl bg-neutral-900/40 hover:bg-neutral-900/80 border-2 border-dashed border-[#D7B65D]/30 hover:border-[#F5D577] transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D7B65D]/20 to-[#D7B65D]/5 border border-[#D7B65D]/40 flex items-center justify-center text-[#F5D577] group-hover:scale-110 group-hover:bg-[#D7B65D]/30 transition-all duration-300 shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-neutral-700 group-hover:text-[#D7B65D]/60 transition-colors font-serif">
                      {adv.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#F5D577] transition-colors mb-3">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {desc}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-[#D7B65D] font-semibold uppercase tracking-wider">
                  <span>{isFr ? 'Standard Prestige' : 'Prestige Standard'}</span>
                  <span className="w-2 h-2 rounded-full bg-[#D7B65D] group-hover:scale-150 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        {onBookNow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <button
              type="button"
              onClick={onBookNow}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 font-bold text-sm tracking-wide shadow-xl shadow-[#D7B65D]/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>{isFr ? 'Expérimenter l’Excellence Limo Raf' : 'Experience Limo Raf Excellence'}</span>
              <span>→</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
