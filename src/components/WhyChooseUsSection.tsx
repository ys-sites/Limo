import React from 'react';
import { Smartphone, UserCheck, Car, CreditCard } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const pillars = [
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-800" />,
      bg: 'bg-emerald-100/90',
      title: 'Easy Online Booking',
      description: 'Seamless 60-second reservation with instant transparent pricing, route estimation, and immediate confirmation.'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-neutral-900" />,
      bg: 'bg-neutral-200/90',
      title: 'Professional Drivers',
      description: 'Vetted, background-checked chauffeurs impeccably groomed in black-tie attire with flight-tracking diligence.'
    },
    {
      icon: <Car className="w-6 h-6 text-amber-800" />,
      bg: 'bg-amber-100/90',
      title: 'Variety of Cars Brands',
      description: 'Flagship late-model vehicles from Cadillac, Mercedes-Benz, Audi, and Rolls-Royce sanitized before every trip.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-neutral-900" />,
      bg: 'bg-neutral-900 text-white',
      title: 'Online Payment',
      description: 'Encrypted corporate billing and card processing with all-inclusive fixed rates covering tolls and gratuities.'
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-serif-luxury mb-3">
            Why Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            At Premier Limo we pride ourselves in delivering extensive services to fulfill all of your needs with first rate customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-50/60 border border-neutral-200/80 hover:bg-neutral-50 hover:shadow-lg transition-all"
            >
              {/* Icon Container matching image 2 */}
              <div className={`w-16 h-16 rounded-2xl ${pillar.bg} flex items-center justify-center mb-5 shadow-xs`}>
                {pillar.icon}
              </div>

              <h3 className="text-base font-bold text-neutral-900 font-serif-luxury mb-2">
                {pillar.title}
              </h3>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
