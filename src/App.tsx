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
import { FLEET } from './data/limoData';
import { QuoteModal } from './components/QuoteModal';
import { DestinationInquiryModal } from './components/DestinationInquiryModal';
import { CallbackModal } from './components/CallbackModal';
import { QuotePrefill } from './lib/contact';

// Code-split below-the-fold / on-demand views so the initial bundle stays lean.
// Features are unchanged — these load on first interaction.
const VehicleDetailPage = React.lazy(() =>
  import('./components/VehicleDetailPage').then((m) => ({ default: m.VehicleDetailPage }))
);
const DestinationsPage = React.lazy(() =>
  import('./components/DestinationsPage').then((m) => ({ default: m.DestinationsPage }))
);

export default function App() {
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [activeVehicleSlug, setActiveVehicleSlug] = useState<string | null>(null);
  const [isDestinationsPage, setIsDestinationsPage] = useState(false);

  // Contact popups: general quote (Form A), destinations inquiry (Form B), callback request
  const [quoteModal, setQuoteModal] = useState<{ open: boolean; prefill?: QuotePrefill }>({ open: false });
  const [destModal, setDestModal] = useState<{ open: boolean; destination?: string }>({ open: false });
  const [callbackOpen, setCallbackOpen] = useState(false);

  const openQuote = (prefill?: QuotePrefill) => setQuoteModal({ open: true, prefill });
  const openDestInquiry = (destination?: string) => setDestModal({ open: true, destination });

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

  // SEO: keep document title in sync with the current view
  useEffect(() => {
    if (activeVehicle) {
      document.title = `${activeVehicle.name} | Limo Raf Chauffeur Privé Montréal`;
    } else if (isDestinationsPage) {
      document.title = 'Destinations Canada & États-Unis | Limo Raf Chauffeur Privé';
    } else {
      document.title = 'Limo Raf - Chauffeur Privé à Montréal | Limousine de Luxe YUL';
    }
  }, [activeVehicle, isDestinationsPage]);

  const handleViewVehicleDetails = (slug: string) => {
    setActiveVehicleSlug(slug);
    window.history.pushState(null, '', `#/vehicles/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        onQuote={() => openQuote()}
        onCallback={() => setCallbackOpen(true)}
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
            onInquiry={(destination?: string) => openDestInquiry(destination)}
            onCallback={() => setCallbackOpen(true)}
          />
        ) : (
          /* Luxury Single-Page Experience in exact required sequence */
          <>
            {/* 1. Hero Section with Cadillac Escalade background & floating reservation card */}
            <Hero
              language={language}
              onCallback={() => setCallbackOpen(true)}
            />

            {/* 2. Section 02: À Propos / Our Values with night fleet */}
            <AboutUsSection
              language={language}
              onQuote={() => openQuote()}
            />

            {/* 3. Section 03: Notre flotte / Our fleet (Car Section strictly 3rd section) */}
            <FleetSection
              language={language}
              onQuote={(prefill) => openQuote(prefill)}
              onViewVehicleDetails={handleViewVehicleDetails}
            />

            {/* 4. Section 04: Nos services / Our services (6 services grid matching screenshot) */}
            <ServicesSection
              language={language}
              onQuote={(prefill) => openQuote(prefill)}
            />

            {/* 5. Section 05: Pourquoi nous choisir / Why Choose Us (6 dashed gold cards) */}
            <AdvantagesSection
              language={language}
            />

            {/* Section: Destinations Phares avec AccordionGallery */}
            <TopCitiesSection
              language={language}
              onQuote={(prefill) => openQuote(prefill)}
              onViewAllDestinations={() => {
                setIsDestinationsPage(true);
                window.history.pushState(null, '', '#/destinations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Section 06: Destinations Phares Canada & USA (Coverage Map) */}
            <CoverageMapSection
              language={language}
              onQuote={() => openQuote()}
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
        onCallback={() => setCallbackOpen(true)}
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

      {/* Contact popups: general quote / destinations inquiry / callback request */}
      <QuoteModal
        isOpen={quoteModal.open}
        onClose={() => setQuoteModal({ open: false })}
        language={language}
        prefill={quoteModal.prefill}
      />
      <DestinationInquiryModal
        isOpen={destModal.open}
        onClose={() => setDestModal({ open: false })}
        language={language}
        destination={destModal.destination}
      />
      <CallbackModal
        isOpen={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        language={language}
      />
    </div>
  );
}
