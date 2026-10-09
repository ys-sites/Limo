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
import { QuotePrefill } from './lib/contact';

// Code-split below-the-fold / on-demand views so the initial bundle stays lean.
// Features are unchanged — these load on first interaction.
const loadVehicleDetailPage = () => import('./components/VehicleDetailPage');
const loadDestinationsPage = () => import('./components/DestinationsPage');
const loadQuoteModal = () => import('./components/QuoteModal');
const loadDestinationInquiryModal = () => import('./components/DestinationInquiryModal');
const loadCallbackModal = () => import('./components/CallbackModal');

const VehicleDetailPage = React.lazy(() => loadVehicleDetailPage().then((m) => ({ default: m.VehicleDetailPage })));
const DestinationsPage = React.lazy(() => loadDestinationsPage().then((m) => ({ default: m.DestinationsPage })));
const QuoteModal = React.lazy(() => loadQuoteModal().then((m) => ({ default: m.QuoteModal })));
const DestinationInquiryModal = React.lazy(() =>
  loadDestinationInquiryModal().then((m) => ({ default: m.DestinationInquiryModal }))
);
const CallbackModal = React.lazy(() => loadCallbackModal().then((m) => ({ default: m.CallbackModal })));

export default function App() {
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [activeVehicleSlug, setActiveVehicleSlug] = useState<string | null>(null);
  const [isDestinationsPage, setIsDestinationsPage] = useState(false);

  // Contact popups: general quote (Form A), destinations inquiry (Form B), callback request
  const [quoteModal, setQuoteModal] = useState<{ open: boolean; prefill?: QuotePrefill }>({ open: false });
  const [destModal, setDestModal] = useState<{ open: boolean; destination?: string }>({ open: false });
  const [callbackOpen, setCallbackOpen] = useState(false);

  // Popups load on first open, then stay mounted so their close animations still play
  const [modalsLoaded, setModalsLoaded] = useState({ quote: false, dest: false, callback: false });
  useEffect(() => {
    setModalsLoaded((m) => ({
      quote: m.quote || quoteModal.open,
      dest: m.dest || destModal.open,
      callback: m.callback || callbackOpen,
    }));
  }, [quoteModal.open, destModal.open, callbackOpen]);

  const openQuote = (prefill?: QuotePrefill) => setQuoteModal({ open: true, prefill });
  const openDestInquiry = (destination?: string) => setDestModal({ open: true, destination });

  // Once the home page is idle, fetch subpage and popup code in the background
  // so opening them is instant instead of waiting on a network request
  useEffect(() => {
    const prefetch = () => {
      loadVehicleDetailPage();
      loadDestinationsPage();
      loadQuoteModal();
      loadDestinationInquiryModal();
      loadCallbackModal();
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(prefetch, 2500);
    return () => clearTimeout(t);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Open dedicated all-destinations subpage
  const handleOpenDestinations = () => {
    setActiveVehicleSlug(null);
    setIsDestinationsPage(true);
    window.history.pushState(null, '', '#/destinations');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Reserve button clicked from Navbar or Hero -> smooth glide to Hero reservation card & focus name field
  const handleReserveClick = () => {
    if (activeVehicleSlug || isDestinationsPage) {
      setActiveVehicleSlug(null);
      setIsDestinationsPage(false);
      window.history.pushState(null, '', '#');
    }

    setTimeout(() => {
      const widget = document.getElementById('booking-card') || document.getElementById('hero');
      if (widget) {
        widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nameInput = widget.querySelector('input[name="name"]') as HTMLInputElement | null;
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 350);
        }
      }
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col font-sans selection:bg-[#D7B65D] selection:text-neutral-950 relative">
      {/* Blacklane-style Top Scroll Progress Gold Line */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] z-50 pointer-events-none shadow-sm shadow-[#D7B65D]/50"
      />

      {/* Top Bar Navigation floating over hero */}
      <Navbar
        language={language}
        onToggleLanguage={setLanguage}
        onReserveClick={handleReserveClick}
        onOpenDestinations={handleOpenDestinations}
        onQuote={() => openQuote()}
        onCallback={() => setCallbackOpen(true)}
        forceSolid={!!activeVehicle || isDestinationsPage}
        onNavigateHome={() => {
          setActiveVehicleSlug(null);
          setIsDestinationsPage(false);
          window.history.pushState(null, '', '#');
          window.scrollTo({ top: 0, behavior: 'instant' });
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
              onReserveClick={handleReserveClick}
              onViewAllDestinations={handleOpenDestinations}
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
                window.scrollTo({ top: 0, behavior: 'instant' });
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
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onSelectVehicle={(slug) => handleViewVehicleDetails(slug)}
      />

      {/* Floating Instant WhatsApp Button matching YS-MARKETING-SOLUTION */}
      <WhatsAppButton language={language} />

      {/* Contact popups: general quote / destinations inquiry */}
      <Suspense fallback={null}>
        {(modalsLoaded.quote || quoteModal.open) && (
          <QuoteModal
            isOpen={quoteModal.open}
            onClose={() => setQuoteModal({ open: false })}
            language={language}
            prefill={quoteModal.prefill}
          />
        )}
        {(modalsLoaded.dest || destModal.open) && (
          <DestinationInquiryModal
            isOpen={destModal.open}
            onClose={() => setDestModal({ open: false })}
            language={language}
            destination={destModal.destination}
          />
        )}
      </Suspense>
    </div>
  );
}
