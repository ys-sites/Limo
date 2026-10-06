import React, { useState } from 'react';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { SERVICES } from '../data/limoData';
import { ServiceItem } from '../types/limo';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 lg:py-28 bg-[#ECE7DE] text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 01 on left, Our services in center */}
        <div className="relative mb-14 sm:mb-16 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <span className="text-4xl sm:text-5xl font-light text-neutral-400/80 font-sans select-none">
              01
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
            Our services
          </h2>
        </div>

        {/* 3 Cards matching screenshot exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:h-72 lg:h-80 w-full shadow-md group cursor-pointer"
              onClick={() => setActiveModalService(service)}
            >
              {/* Photo */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

              {/* Top-left label on image matching screenshot */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/95 px-4 py-1.5 rounded-lg shadow-sm">
                  <span className="text-xs font-semibold text-neutral-900 tracking-tight">
                    {service.title}
                  </span>
                </div>
              </div>

              {/* Bottom-right button on image matching screenshot */}
              <div className="absolute bottom-4 right-4">
                {index === 1 ? (
                  /* Airport transfers in screenshot has round white button with arrow */
                  <div className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                ) : (
                  /* Cards 1 & 3 have dark pill "Explore More ↗" */
                  <div className="flex items-center gap-1.5 bg-black/80 hover:bg-black text-white pl-3.5 pr-1.5 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-xs transition-all shadow-md">
                    <span>Explore More</span>
                    <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Text Statement & Explore More Button matching screenshot */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto text-center space-y-6">
          <p className="text-lg sm:text-xl text-neutral-800 leading-relaxed font-normal">
            Whether you&apos;re traveling for business, leisure, or a special occasion, our chauffeur-driven limousines ensure you arrive in style, comfort, and on time.
          </p>

          <div>
            <button
              onClick={() => onSelectService(SERVICES[0])}
              className="px-7 py-2.5 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
            >
              Explore more
            </button>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-56 w-full">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-medium text-amber-300">
                  {activeModalService.subtitle}
                </span>
                <h3 className="text-2xl font-bold">{activeModalService.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-neutral-700 text-sm leading-relaxed">
                {activeModalService.description}
              </p>

              <div className="space-y-2">
                {activeModalService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const svc = activeModalService;
                    setActiveModalService(null);
                    onSelectService(svc);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] rounded-md transition-colors cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
