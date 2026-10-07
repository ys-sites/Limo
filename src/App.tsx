import React, { useState, useEffect, Suspense } from 'react';
import { motion, useScroll } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUsSection } from './components/AboutUsSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { FleetSection } from './components/FleetSection';
import { ServicesSection } from './components/ServicesSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { CoverageMapSection } from './components/CoverageMapSection';
import { TopCitiesSection } from './components/TopCitiesSection';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { Footer } from './components/Footer';
import { BookingState, Vehicle, ServiceItem, CityDestination } from './types/limo';
import { FLEET } from './data/limoData';

// Code-split below-the-fold / on-demand views so the initial bundle stays lean.
// Features are unchanged — these load on first interaction.
const BookingModal = React.lazy(() =>
  import('./components/BookingModal').then((m) => ({ default: m.BookingModal }))
);
const VehicleDetailPage = React.lazy(() =>
  import('./components/VehicleDetailPage').then((m) => ({ default: m.VehicleDetailPage }))
);
const DestinationsPage = React.lazy(() =>
  import('./components/DestinationsPage').then((m) => ({ default: m.DestinationsPage }))
);

export default function App() {
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeVehicleSlug, setActiveVehicleSlug] = useState<string | null>(null);
  const [isDestinationsPage, setIsDestinationsPage] = useState(false);

  // Blacklane-style smooth scroll progress indicator
  const { scrollYProgress } = useScroll();

  // Sync hash routing for vehicle and destinations subpages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/vehicles/')) {
        const slug = hash.replace('#/vehicles/', '');
        setActiveVehicleSlug(slug);
        setIsDestinationsPage(false);
      } else if (hash === '#/destinations') {
        setIsDestinationsPage(true);
        setActiveVehicleSlug(null);
      } else {
        setActiveVehicleSlug(null);
        setIsDestinationsPage(false);
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
    const isAirport = service.id === 'airport-service';
    setBookingState((prev) => ({
      ...prev,
      serviceType: isAirport ? 'flat_rate' : 'hourly',
      dropoffAddress: isAirport
        ? 'Aéroport International Montréal-Trudeau (YUL)'
        : 'Mont-Tremblant Station VIP'
    }));
    setIsBookingOpen(true);
  };

  const handleSelectCity = (city: CityDestination | string) => {
    const dest = typeof city === 'string' ? city : `${city.name} (${city.region})`;
    setBookingState((prev) => ({
      ...prev,
      pickupAddress: 'Aéroport Montréal-Trudeau (YUL)',
      dropoffAddress: dest
    }));
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col font-sans selection:bg-[#D7B65D] selection:text-neutral-950 relative">
      {/* Blacklane-style Top Scroll Progress Gold Line */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] z-50 pointer-events-none shadow-sm shadow-[#D7B65D]/50"
      />

      {/* Subtle tactile noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-[0.025]" />

      {/* Top Bar Navigation floating over hero */}
      <Navbar
        language={language}
        onToggleLanguage={setLanguage}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateHome={() => {
          setActiveVehicleSlug(null);
          setIsDestinationsPage(false);
          window.history.pushState(null, '', '#');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content: Dedicated Vehicle Subpage OR Destinations Subpage OR Homepage */}
      <main className="flex-1">
        <Suspense fallback={null}>
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
        ) : isDestinationsPage ? (
          /* Subpage Detail: All Destinations Canada & USA */
          <DestinationsPage
            language={language}
            onBack={() => {
              setIsDestinationsPage(false);
              window.history.pushState(null, '', '#cities');
            }}
            onOpenBooking={() => setIsBookingOpen(true)}
            onBookDestination={(destination: string) => {
              handleSelectCity(destination);
            }}
          />
        ) : (
          /* Luxury Single-Page Experience in exact required sequence */
          <>
            {/* 1. Hero Section with Cadillac Escalade background & floating reservation card */}
            <Hero
              language={language}
              onReserve={handleHeroReserve}
            />

            {/* 2. Section 02: À Propos / Our Values with night fleet */}
            <AboutUsSection
              language={language}
              onBookNow={() => setIsBookingOpen(true)}
            />

            {/* 3. Section 03: Notre flotte / Our fleet (Car Section strictly 3rd section) */}
            <FleetSection
              language={language}
              onSelectVehicle={handleSelectVehicle}
              onViewVehicleDetails={handleViewVehicleDetails}
            />

            {/* 4. Section 04: Nos services / Our services (6 services grid matching screenshot) */}
            <ServicesSection
              language={language}
              onSelectService={handleSelectService}
            />

            {/* 5. Section 05: Pourquoi nous choisir / Why Choose Us (6 dashed gold cards) */}
            <AdvantagesSection
              language={language}
            />

            {/* Section: Destinations Phares avec AccordionGallery */}
            <TopCitiesSection
              language={language}
              onSelectCity={handleSelectCity}
              onViewAllDestinations={() => {
                setIsDestinationsPage(true);
                window.history.pushState(null, '', '#/destinations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Section 06: Destinations Phares Canada & USA (Coverage Map) */}
            <CoverageMapSection
              language={language}
              onSelectCity={(cityName) => handleSelectCity(cityName)}
              onOpenBooking={() => setIsBookingOpen(true)}
            />

            {/* Section: Google Reviews Marquee (Infinite scroll left-to-right) */}
            <ReviewsMarquee language={language} />
          </>
        )}
        </Suspense>
      </main>

      {/* Pure Black Luxury Footer (matching screenshot, newsletter removed) */}
      <Footer
        language={language}
        onNavigateHome={() => {
          setActiveVehicleSlug(null);
          setIsDestinationsPage(false);
          window.history.pushState(null, '', '#');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectVehicle={(slug) => handleViewVehicleDetails(slug)}
      />

      {/* Floating Instant WhatsApp Button matching YS-MARKETING-SOLUTION */}
      <WhatsAppButton language={language} />

      {/* Interactive Reservation Concierge Modal */}
      <Suspense fallback={null}>
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialBooking={bookingState}
          language={language}
        />
      </Suspense>
    </div>
  );
}
