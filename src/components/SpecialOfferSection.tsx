import React from 'react';
import { Check, Flame, ArrowRight } from 'lucide-react';
import { FLEET, SPECIAL_OFFER_FEATURES } from '../data/limoData';
import { Vehicle } from '../types/limo';

interface SpecialOfferSectionProps {
  onReservePromo: (vehicle: Vehicle) => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ onReservePromo }) => {
  const escalade = FLEET.find((v) => v.id === 'cadillac-escalade') || FLEET[0];

  return (
    <section id="promo" className="py-20 lg:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header from Image 2 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-3">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Limited Time Exclusive Deal</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight font-serif-luxury mb-4">
            Only today $75/day
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Take advantage of our hot offers, saving a significant amount when renting a limousine for airport arrivals, VIP transport, or city charters.
          </p>
        </div>

        {/* Feature Box Card from Image 2 */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Checklist & Reserve CTA */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider rounded-md mb-2">
                  Special Fleet Spotlight
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-serif-luxury">
                  Cadillac Escalade ESV
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Full-size presidential black edition with privacy partition and captain seating.
                </p>
              </div>

              {/* 2-column bullet checklist from screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                {SPECIAL_OFFER_FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-800">
                    <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => onReservePromo(escalade)}
                  className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                >
                  <span>Reserve Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-900 font-mono tabular-nums">$75 / day</span> intro special applied at checkout.
                </div>
              </div>
            </div>

            {/* Right Column: Studio Vehicle Image */}
            <div className="lg:col-span-6 flex items-center justify-center relative">
              <div className="w-full max-w-lg relative">
                {/* Subtle soft studio reflection badge */}
                <div className="absolute -inset-4 bg-radial from-amber-100/40 via-transparent to-transparent -z-10 rounded-full blur-2xl" />
                <img
                  src={escalade.image}
                  alt="Cadillac Escalade Special Offer"
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
