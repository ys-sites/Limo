import React from 'react';
import { motion } from 'motion/react';
import { Users, Luggage, Palette, Wifi, Car, Mail, MessageCircle, Plus } from 'lucide-react';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { QuotePrefill } from '../lib/contact';
import { ShinyText } from './ui/ShinyText';
import { LUXURY_EASE } from '../lib/motion';
import { preloadImages, srcSetFor } from '../lib/images';

interface FleetSectionProps {
  language: 'FR' | 'EN';
  onQuote: (prefill: QuotePrefill) => void;
  onViewVehicleDetails: (slug: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  language,
  onQuote,
  onViewVehicleDetails
}) => {
  const isFr = language === 'FR';

  const whatsappFor = (vehicleName: string) => {
    const text = isFr
      ? `Bonjour, je souhaite réserver le ${vehicleName} avec Limo Raf.`
      : `Hello, I would like to book the ${vehicleName} with Limo Raf.`;
    return `https://api.whatsapp.com/send/?phone=${CLIENT_INFO.phoneRaw.replace('+', '')}&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="fleet" className="py-24 lg:py-28 bg-white text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 03 on left, Our fleet in center */}
        <div className="relative mb-14 sm:mb-16 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
            <span className="text-4xl sm:text-5xl font-light text-neutral-300 font-sans select-none">
              03
            </span>
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans">
              <ShinyText
                text={isFr ? 'Notre flotte' : 'Our fleet'}
                color="#171717"
                shineColor="#D7B65D"
                speed={3}
              />
            </h2>
            {/* Divider with car glyph */}
            <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
              <span className="h-px w-16 bg-neutral-200" />
              <Car className="w-4 h-4 text-[#C4963A]" />
              <span className="h-px w-16 bg-neutral-200" />
            </div>
          </div>
        </div>

        {/* 3 vehicles, one column each */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {FLEET.map((vehicle, idx) => {
            const specs = [
              { Icon: Users, label: isFr ? `${vehicle.passengers} passagers` : `${vehicle.passengers} passengers` },
              { Icon: Luggage, label: isFr ? `${vehicle.luggage} bagages` : `${vehicle.luggage} pieces of luggage` },
              { Icon: Palette, label: isFr ? 'Intérieur / extérieur noir' : 'Black interior / exterior' },
              { Icon: Wifi, label: isFr ? 'Wi-Fi à bord' : 'On-board Wi-Fi' },
            ];

            return (
              <motion.article
                key={vehicle.id}
                // Start fetching the detail page photos as soon as the card is hovered / touched
                onPointerEnter={() => preloadImages(vehicle.galleryImages)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: LUXURY_EASE }}
                className="group flex flex-col"
              >
                {/* Car image: click (or the gold +) opens the vehicle page */}
                <button
                  type="button"
                  onClick={() => onViewVehicleDetails(vehicle.slug)}
                  aria-label={isFr ? `Voir la fiche du ${vehicle.name}` : `View ${vehicle.name} details`}
                  className="relative h-52 sm:h-56 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={vehicle.image}
                    srcSet={srcSetFor(vehicle.image)}
                    sizes="(max-width: 767px) 60vw, 34vw"
                    alt={`${vehicle.name} - Limo Raf Chauffeur Privé Montréal`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full w-full object-contain drop-shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#D7B65D] text-neutral-950 flex items-center justify-center shadow-[0_8px_24px_rgba(196,150,58,0.4)] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-[opacity,transform] duration-300">
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                  </span>
                </button>

                {/* Name */}
                <button
                  type="button"
                  onClick={() => onViewVehicleDetails(vehicle.slug)}
                  className="mt-6 text-left text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-800 hover:text-[#C4963A] transition-colors cursor-pointer"
                >
                  {vehicle.name}
                </button>

                {/* Specs */}
                <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
                  {specs.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onQuote({ vehicle: vehicle.name })}
                    className="inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 text-xs sm:text-sm font-semibold transition-colors active:scale-[0.98] cursor-pointer"
                  >
                    <span>{isFr ? 'Nous joindre' : 'Contact us'}</span>
                    <Mail className="w-4 h-4" />
                  </button>
                  <a
                    href={whatsappFor(vehicle.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors active:scale-[0.98]"
                  >
                    <span>{isFr ? 'Appel ou texto' : 'Call or text'}</span>
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onViewVehicleDetails(vehicle.slug)}
                  className="mt-4 self-start text-xs font-semibold text-neutral-500 hover:text-neutral-900 underline underline-offset-4 cursor-pointer"
                >
                  {isFr ? 'Détails & photos →' : 'Details & photos →'}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
