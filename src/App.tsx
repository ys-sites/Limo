import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FleetSection } from './components/FleetSection';
import { TopCitiesSection } from './components/TopCitiesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BookingState, Vehicle, ServiceItem, CityDestination } from './types/limo';
import { CLIENT_INFO } from './data/limoData';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Initial booking state tailored for Montreal & Limo Raf
  const [bookingState, setBookingState] = useState<BookingState>({
    serviceType: 'distance',
    pickupAddress: 'Aéroport Montréal-Trudeau (YUL)',
    dropoffAddress: 'Centre-Ville Montréal (Vieux-Port)',
    hours: 3,
    tripType: 'one_way',
    date: '06/04/2026',
    timeHour: '01',
    timeMinute: '00',
    timePeriod: 'PM',
    selectedVehicleId: 'cadillac-escalade',
    passengers: 2,
    luggage: 2,
    promoApplied: false
  });

  const handleHeroReserve = (incomingBooking: BookingState) => {
    setBookingState(incomingBooking);
    setIsBookingOpen(true);
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setBookingState((prev) => ({
      ...prev,
      selectedVehicleId: vehicle.id
    }));
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    const isAirport = service.id === 'airport-transfers';
    setBookingState((prev) => ({
      ...prev,
      serviceType: isAirport ? 'flat_rate' : 'hourly',
      dropoffAddress: isAirport
        ? 'Aéroport International Montréal-Trudeau (YUL)'
        : 'Mont-Tremblant Station VIP'
    }));
    setIsBookingOpen(true);
  };

  const handleSelectCity = (city: CityDestination) => {
    setBookingState((prev) => ({
      ...prev,
      pickupAddress: 'Aéroport Montréal-Trudeau (YUL)',
      dropoffAddress: `${city.name} (${city.region})`
    }));
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#E4A836] selection:text-neutral-950 relative">
      {/* Subtle tactile noise texture overlay as mandated by 001 Main / taste-skill */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-[0.035]" />

      {/* Top Bar Navigation floating over hero */}
      <Navbar
        language={language}
        onToggleLanguage={setLanguage}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Single-Page Content matching screenshot structure */}
      <main className="flex-1">
        {/* Hero Section with Cadillac Escalade background & floating reservation card */}
        <Hero
          language={language}
          onReserve={handleHeroReserve}
        />

        {/* Section 01: Nos services / Our services (warm sandy beige background) */}
        <ServicesSection
          language={language}
          onSelectService={handleSelectService}
        />

        {/* Section 02: Notre flotte / Our fleet (with large transparent PNG vehicles) */}
        <FleetSection
          language={language}
          onSelectVehicle={handleSelectVehicle}
        />

        {/* Section 03: Destinations phares / Top destinations (Montreal, Laval, Tremblant, Quebec, Ottawa) */}
        <TopCitiesSection
          language={language}
          onSelectCity={handleSelectCity}
        />
      </main>

      {/* Pure Black Luxury Footer */}
      <Footer language={language} />

      {/* Floating Instant WhatsApp Button */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <a
          href={CLIENT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Contact Limo Raf on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
            {language === 'FR' ? 'WhatsApp Direct' : 'WhatsApp Us'}
          </span>
        </a>
      </aside>

      {/* Interactive Reservation Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialBooking={bookingState}
        language={language}
      />
    </div>
  );
}
