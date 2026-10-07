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
    <section id="advantages" className="py-20 lg:py-28 bg-[#F6F6F6] text-neutral-900 relative overflow-hidden border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with 05 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-14 sm:mb-20 flex items-center justify-center"
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

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-neutral-900 overflow-visible pb-1">
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

        {/* Sticky Stacking Cards Container */}
        <div className="relative space-y-6 sm:space-y-8 pb-10">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            const title = isFr ? adv.titleFr : adv.titleEn;
            const desc = isFr ? adv.descFr : adv.descEn;
            const highlights = isFr ? adv.highlightsFr : adv.highlightsEn;

            return (
              <div
                key={adv.number}
                className="sticky rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_-20px_rgba(0,0,0,0.18)] hover:border-[#D7B65D]/50 transition-all duration-300"
                style={{
                  top: `calc(4.5rem + ${idx * 1.25}rem)`,
                  zIndex: idx + 10,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#D7B65D]/10 border border-[#D7B65D]/30 text-[#C4963A] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C4963A] block">
                        {isFr ? `Engagement ${adv.number}` : `Commitment ${adv.number}`}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl lg:text-[26px] font-medium text-neutral-900 tracking-tight">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <span className="font-display text-3xl sm:text-4xl text-neutral-200 font-light select-none self-end sm:self-auto">
                    {adv.number}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-5">
                  {desc}
                </p>

                {/* 3 Key Takeaway Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-700 text-xs font-medium"
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
