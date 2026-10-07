import React from 'react';
import { Plane, ShieldCheck, Clock, Sparkles, Wifi, Coffee, VolumeX } from 'lucide-react';
import { CLIENT_INFO } from '../data/limoData';

interface WhyChooseUsProps {
  language: 'FR' | 'EN';
}

export const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({ language }) => {
  const experiences = [
    {
      icon: <Plane className="w-5 h-5 text-amber-500" />,
      titleFr: 'Un accueil digne des grands aéroports',
      titleEn: 'A welcome like no other',
      descFr: 'Prise en charge à l\'intérieur du terminal YUL avec tablette nominative, assistance complète pour vos bagages et véhicule chauffé/climatisé à quai.',
      descEn: 'Terminal meet-and-greet at YUL with personalized tablet signage, luggage handling, and curbside priority departure.'
    },
    {
      icon: <VolumeX className="w-5 h-5 text-amber-500" />,
      titleFr: 'Vous donnez le ton à chaque trajet',
      titleEn: 'You set the tone',
      descFr: 'Détendez-vous ou travaillez en toute sérénité. La température, la musique et le niveau de silence sont réglés selon vos préférences absolues.',
      descEn: 'Sit back and relax. Temperature, acoustic quietness, and climate controls are adjusted to your exact preferences.'
    },
    {
      icon: <Wifi className="w-5 h-5 text-amber-500" />,
      titleFr: 'Rechargez vos batteries en route',
      titleEn: 'Recharge on the go',
      descFr: 'Restez productif avec nos prises de recharge rapide, Wi-Fi embarqué haute vitesse et bouteilles d\'eau minérale fraîches.',
      descEn: 'Stay connected with universal multi-device fast chargers, quiet acoustic cabins, and complimentary chilled mineral water.'
    }
  ];

  const guarantees = [
    {
      icon: <Clock className="w-4 h-4 text-emerald-400" />,
      badgeFr: '60 minutes d\'attente offerte',
      badgeEn: '60 min complimentary wait time',
      subFr: 'Suivi des vols YUL en temps réel',
      subEn: 'Real-time flight arrival tracking'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      badgeFr: 'Tarifs fixes tout compris',
      badgeEn: 'All-inclusive fixed rates',
      subFr: 'Taxes, pourboires et péages inclus',
      subEn: 'Taxes, tips, and tolls included'
    },
    {
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      badgeFr: 'Annulation sans frais',
      badgeEn: 'Free cancellation',
      subFr: 'Jusqu\'à 2h avant le départ',
      subEn: 'Up to 2 hours before pickup'
    }
  ];

  return (
    <section className="py-24 bg-[#0F1319] text-white relative overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Blacklane-inspired Editorial Headline */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase font-sans">
            {language === 'FR' ? 'L\'expérience Limo Raf' : 'The Limo Raf Experience'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            {language === 'FR' ? 'Montez à bord. Respirez.' : 'Step in. Breathe out.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {language === 'FR'
              ? 'Une attention méticuleuse portée à chaque détail transforme votre déplacement à Montréal en un véritable sanctuaire de tranquillité.'
              : 'Thoughtful details and discreet chauffeur service transform every journey across Montreal into your personal sanctuary.'}
          </p>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                {exp.icon}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {language === 'FR' ? exp.titleFr : exp.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {language === 'FR' ? exp.descFr : exp.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Blacklane-inspired Guarantees Pill Bar */}
        <div className="border border-neutral-800 bg-neutral-950/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {guarantees.map((g, i) => (
            <div key={i} className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                {g.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  {language === 'FR' ? g.badgeFr : g.badgeEn}
                </span>
                <span className="text-[11px] text-neutral-400 font-light">
                  {language === 'FR' ? g.subFr : g.subEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
