import React from 'react';
import { motion } from 'motion/react';
import { MaskedHeading } from './ui/MaskedHeading';
import { FoldText } from './ui/FoldText';
import { Sparkles, Shield, Star } from 'lucide-react';

interface PrestigeBannerSectionProps {
  language: 'FR' | 'EN';
}

export const PrestigeBannerSection: React.FC<PrestigeBannerSectionProps> = ({ language }) => {
  const isFr = language === 'FR';

  return (
    <section className="relative py-20 sm:py-28 bg-[#07080A] text-white overflow-hidden border-y border-neutral-900">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#D7B65D]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top VIP Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D7B65D]/10 border border-[#D7B65D]/30 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5D577]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5D577]">
            {isFr ? 'LIMO RAF · SIGNATURE MONTRÉAL' : 'LIMO RAF · MONTREAL SIGNATURE'}
          </span>
        </motion.div>

        {/* MaskedHeading Component from React Bits */}
        <div className="my-6 max-w-5xl mx-auto overflow-hidden">
          <MaskedHeading
            text={isFr ? "VOYAGEZ AVEC ÉLÉGANCE" : "RIDE WITH ELEGANCE"}
            src="/client_assets/personne-7.png"
            fillScale={1.3}
            parallax={34}
            drift={16}
            reveal="rise"
            trigger="view"
            duration={1.2}
            textScale={0.105}
            weight={900}
            tracking={-0.02}
            className="font-serif select-none"
          />
        </div>

        {/* Subtext using FoldText from React Bits */}
        <div className="max-w-2xl mx-auto mt-6 text-sm sm:text-lg text-neutral-300 font-light">
          <FoldText
            text={
              isFr
                ? "L'art du transport exécutif redéfini pour vos exigences les plus élevées."
                : "The art of executive travel redefined for your most discerning standards."
            }
            trigger="scroll"
            duration={0.65}
            stagger={0.035}
            color="#E5E7EB"
            className="font-sans leading-relaxed"
          />
        </div>

        {/* 3 Luxury trust markers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-semibold uppercase tracking-wider text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#F5D577] fill-current" />
            <span>{isFr ? 'Véhicules Noirs Récent Modèle' : 'Late-Model Black SUVs'}</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-700">·</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#F5D577]" />
            <span>{isFr ? 'Chauffeurs Certifiés & Discrets' : 'Certified Discreet Chauffeurs'}</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-700">·</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5D577]" />
            <span>{isFr ? 'Tarification Forfaitaire Claire' : 'Transparent All-Inclusive Rates'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
