import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Car, Clock, Sparkles, Headphones, Award, CheckCircle2 } from 'lucide-react';
import { ShinyText } from './ui/ShinyText';

interface AdvantagesSectionProps {
  language: 'FR' | 'EN';
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ language }) => {
  const isFr = language === 'FR';

  const advantages = [
    {
      icon: UserCheck,
      number: '01',
      titleFr: 'Professionnalisme et expertise',
      titleEn: 'Professionalism and expertise',
      descFr: 'Nos chauffeurs d’expérience sont hautement qualifiés, courtois, discrets et impeccablement vêtus pour toutes occasions d’affaires ou de gala.',
      descEn: 'Our experienced chauffeurs are highly qualified, courteous, discreet, and impeccably attired for all executive or private occasions.',
      highlightsFr: ['Tenue d’affaires irréprochable', 'Chauffeurs bilingues (FR / EN)', 'Discrétion diplomatique'],
      highlightsEn: ['Impeccable executive attire', 'Bilingual chauffeurs (FR / EN)', 'Diplomatic discretion']
    },
    {
      icon: Car,
      number: '02',
      titleFr: 'Flotte luxueuse et confortable',
      titleEn: 'Luxurious and comfortable fleet',
      descFr: 'Des SUV noirs récents haut de gamme (Cadillac Escalade ESV, GMC Yukon Denali XL, Cadillac Lyriq), méticuleusement inspectés et nettoyés avant chaque prise en charge.',
      descEn: 'Late-model luxury black SUVs (Cadillac Escalade ESV, GMC Yukon Denali XL, Cadillac Lyriq), meticulously inspected and detailed before every pickup.',
      highlightsFr: ['Modèles récents haut de gamme', 'Habitacle cuir désinfecté', 'Suspension pneumatique grand confort'],
      highlightsEn: ['Late-model prestige vehicles', 'Sanitized leather interior', 'Pneumatic luxury suspension']
    },
    {
      icon: Clock,
      number: '03',
      titleFr: 'Ponctualité et fiabilité rigoureuse',
      titleEn: 'Rigorous punctuality and reliability',
      descFr: 'Nous respectons scrupuleusement vos horaires avec un chauffeur sur place 15 minutes en avance et un suivi en direct des vols d’arrivée à YUL.',
      descEn: 'We strictly respect your schedule with an on-site chauffeur 15 minutes in advance and real-time flight tracking for all YUL arrivals.',
      highlightsFr: ['Chauffeur sur place 15 min avant', 'Suivi direct des vols en temps réel', 'Zéro attente à l’atterrissage'],
      highlightsEn: ['Chauffeur 15 mins early', 'Live flight status tracking', 'Zero waiting upon arrival']
    },
    {
      icon: Sparkles,
      number: '04',
      titleFr: 'Services personnalisés sur-mesure',
      titleEn: 'Tailored bespoke services',
      descFr: 'Chaque trajet est adapté à vos exigences : température préférée dans l’habitacle, chargeurs universels, eau minérale et ambiance feutrée.',
      descEn: 'Every journey is tailored to your preferences: climate control of your choice, universal device chargers, bottled water, and quiet ambiance.',
      highlightsFr: ['Eau minérale & rafraîchissements', 'Chargeurs haute vitesse à bord', 'Climatisation personnalisée'],
      highlightsEn: ['Bottled water & refreshments', 'High-speed chargers onboard', 'Custom climate settings']
    },
    {
      icon: ShieldCheck,
      number: '05',
      titleFr: 'Sécurité maximale en toutes saisons',
      titleEn: 'Maximum safety in all seasons',
      descFr: 'Véhicules équipés de la traction intégrale (AWD/4x4) et préparés pour affronter les hivers québécois avec une conduite défensive et sereine.',
      descEn: 'All-wheel drive (AWD/4x4) vehicles fully equipped to master Canadian winter roads with calm and certified defensive driving.',
      highlightsFr: ['Traction intégrale AWD / 4x4', 'Pneus hiver de première qualité', 'Conduite préventive certifiée'],
      highlightsEn: ['All-wheel drive AWD / 4x4', 'Premium winter-rated tires', 'Certified defensive driving']
    },
    {
      icon: Headphones,
      number: '06',
      titleFr: 'Service client d’excellence 24/7',
      titleEn: 'Round-the-clock 24/7 concierge',
      descFr: 'Une conciergerie privée dévouée et joignable 24 heures sur 24 pour coordonner vos réservations, ajuster vos trajets et répondre à vos requêtes.',
      descEn: 'A dedicated private concierge reachable 24/7 to coordinate your bookings, accommodate schedule changes, and fulfill any request.',
      highlightsFr: ['Assistance immédiate 24/7', 'Tarification claire sans surprise', 'Réservation rapide via WhatsApp'],
      highlightsEn: ['24/7 immediate assistance', 'Clear transparent pricing', 'Quick booking via WhatsApp']
    }
  ];

  return (
    <section id="advantages" className="py-14 sm:py-18 lg:py-20 bg-[#F6F6F6] text-neutral-900 relative overflow-hidden border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with 05 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 sm:mb-10 flex items-center justify-center"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <span className="text-4xl font-light text-neutral-300 font-sans select-none">
              05
            </span>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-light-pill border-[#D7B65D]/40 mb-3">
              <Award className="w-3.5 h-3.5 text-[#C4963A]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#C4963A]">
                {isFr ? '05 · POURQUOI NOUS CHOISIR ?' : '05 · WHY CHOOSE US ?'}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-2 text-neutral-900 overflow-visible pb-1">
              <ShinyText
                text={isFr ? 'Nos Avantages Exclusifs' : 'Our Exclusive Advantages'}
                color="#171717"
                shineColor="#C4963A"
                speed={3}
                className="overflow-visible pb-1"
              />
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-lg mx-auto">
              {isFr
                ? 'Chez Limo Raf, notre priorité absolue est de vous offrir un service d’exception à chaque kilomètre.'
                : 'At Limo Raf, our highest priority is delivering exceptional chauffeured service on every mile.'}
            </p>
          </div>
        </motion.div>

        {/* 3 Little Boxes Per Line Grid (2 rows of 3 on desktop, 2 cols on tablet, compact on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {advantages.map((adv) => {
            const Icon = adv.icon;
            const title = isFr ? adv.titleFr : adv.titleEn;
            const desc = isFr ? adv.descFr : adv.descEn;
            const highlights = isFr ? adv.highlightsFr : adv.highlightsEn;

            return (
              <div
                key={adv.number}
                className="liquid-glass-light-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group cursor-default transition-all duration-300"
              >
                <div>
                  {/* Card Header: Icon + Numeral Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-lg liquid-glass-light-pill border-[#D7B65D]/30 text-[#C4963A] flex items-center justify-center shrink-0 group-hover:bg-[#D7B65D] group-hover:text-neutral-950 transition-colors shadow-xs">
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold tabular-nums text-neutral-400 group-hover:text-[#C4963A] transition-colors">
                      #{adv.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-[19px] font-semibold text-neutral-900 tracking-tight mb-2 leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal mb-4">
                    {desc}
                  </p>
                </div>

                {/* Takeaway Bullets */}
                <div className="space-y-1.5 pt-3 border-t border-neutral-200/60">
                  {highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C4963A] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
