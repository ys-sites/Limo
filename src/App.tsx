import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FleetSection } from './components/FleetSection';
import { TopCitiesSection } from './components/TopCitiesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BookingState, Vehicle, ServiceItem, CityDestination } from './types/limo';
import { FLEET } from './data/limoData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Default initial booking state matching screenshot
  const [bookingState, setBookingState] = useState<BookingState>({
    serviceType: 'distance',
    pickupAddress: 'Pick Up Address',
    dropoffAddress: 'Drop off Address',
    hours: 4,
    tripType: 'one_way',
    date: '06/04/2023',
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
      dropoffAddress: isAirport ? 'JFK International Airport (Terminal 4)' : 'Manhattan Midtown Executive Suite'
    }));
    setIsBookingOpen(true);
  };

  const handleSelectCity = (city: CityDestination) => {
    setBookingState((prev) => ({
      ...prev,
      pickupAddress: `${city.name} International Airport VIP Lounge`,
      dropoffAddress: `Downtown Financial District, ${city.name}`
    }));
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-[#E4A836] selection:text-neutral-950">
      {/* Top Bar Navigation floating over hero */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Single-Page Content matching screenshot structure */}
      <main className="flex-1">
        {/* Hero Section with mountain highway Cadillac Escalade & floating reservation card */}
        <Hero onReserve={handleHeroReserve} />

        {/* Section 01: Our services (warm sandy beige background) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Section 02: Our fleet (white background with ALL/SEDAN/LUXURY/LIMOUSINE/SUV) */}
        <FleetSection onSelectVehicle={handleSelectVehicle} />

        {/* Section 03: Top cities (white background with 5 vertical city skyline cards) */}
        <TopCitiesSection onSelectCity={handleSelectCity} />
      </main>

      {/* Dark Espresso Footer */}
      <Footer />

      {/* Interactive Reservation Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialBooking={bookingState}
      />
    </div>
  );
}
