import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { FleetSection } from './components/FleetSection';
import { TopCitiesSection } from './components/TopCitiesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { BookingState, Vehicle, ServiceItem, CityDestination } from './types/limo';
import { CLIENT_INFO, FLEET } from './data/limoData';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeVehicleSlug, setActiveVehicleSlug] = useState<string | null>(null);

  // Sync hash routing for vehicle subpages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/vehicles/')) {
        const slug = hash.replace('#/vehicles/', '');
        setActiveVehicleSlug(slug);
      } else {
        setActiveVehicleSlug(null);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  // Active vehicle subpage lookup
  const activeVehicle = activeVehicleSlug
    ? FLEET.find((v) => v.slug === activeVehicleSlug || v.id === activeVehicleSlug)
    : null;

  // Initial booking state tailored for Montreal & Limo Raf
  const [bookingState, setBookingState] = useState<BookingState>({
    serviceType: 'distance',
    pickupAddress: 'Aéroport Montréal-Trudeau (YUL)',
    dropoffAddress: 'Centre-Ville Montréal (Vieux-Port)',
    hours: 3,
    tripType: 'one_way',
    date: new Date().toISOString().split('T')[0],
    timeHour: '01',
    timeMinute: '00',
    timePeriod: 'PM',
    selectedVehicleId: 'gmc-yukon-denali',
    passengers: 2,
    luggage: 2
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

  const handleViewVehicleDetails = (slug: string) => {
    setActiveVehicleSlug(slug);
    window.history.pushState(null, '', `#/vehicles/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Subtle tactile noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-[0.035]" />

      {/* Top Bar Navigation floating over hero */}
      <Navbar
        language={language}
        onToggleLanguage={setLanguage}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateHome={() => setActiveVehicleSlug(null)}
      />

      {/* Main Content: Either Dedicated Vehicle Subpage OR Full Homepage */}
      <main className="flex-1">
        {activeVehicle ? (
          /* Subpage Detail of Selected Vehicle */
          <VehicleDetailPage
            vehicle={activeVehicle}
            language={language}
            onBack={() => {
              setActiveVehicleSlug(null);
              window.history.pushState(null, '', '#fleet');
            }}
            onSelectOtherVehicle={(slug) => {
              setActiveVehicleSlug(slug);
              window.history.pushState(null, '', `#/vehicles/${slug}`);
            }}
          />
        ) : (
          /* Luxury Single-Page Experience */
          <>
            {/* Hero Section with Cadillac Escalade background & floating reservation card */}
            <Hero
              language={language}
              onReserve={handleHeroReserve}
            />

            {/* Section 01: Nos services / Our services */}
            <ServicesSection
              language={language}
              onSelectService={handleSelectService}
            />

            {/* Blacklane-inspired Experience Sanctuary Section */}
            <WhyChooseUsSection language={language} />

            {/* Section 02: Notre flotte / Our fleet (with large transparent PNGs & subpage links) */}
            <FleetSection
              language={language}
              onSelectVehicle={handleSelectVehicle}
              onViewVehicleDetails={handleViewVehicleDetails}
            />

            {/* Section 03: Destinations phares / Top destinations */}
            <TopCitiesSection
              language={language}
              onSelectCity={handleSelectCity}
            />
          </>
        )}
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
