import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ArrowUpRight, MessageSquare } from 'lucide-react';
import { CLIENT_INFO } from '../data/limoData';
import { scrollToAnchor } from '../lib/motion';
import { LimoLogo } from './ui/LimoLogo';

interface NavbarProps {
  language: 'FR' | 'EN';
  onToggleLanguage: (lang: 'FR' | 'EN') => void;
  onOpenBooking: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  onToggleLanguage, 
  onOpenBooking,
  onNavigateHome 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Sticky nav: transparent -> solid after hero; hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = 320;

      setIsScrolled(currentScrollY > heroThreshold);

      if (currentScrollY > heroThreshold && currentScrollY > lastScrollY.current + 8) {
        // Scrolling down past threshold -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8 || currentScrollY <= heroThreshold) {
        // Scrolling up -> show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
    window.history.pushState(null, '', '#');
    scrollToAnchor('#hero', 0);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
    setMobileMenuOpen(false);

    setTimeout(() => {
      scrollToAnchor(`#${targetId}`, -80);
    }, 60);
  };

  const navLinks = [
    { id: 'about', num: '02', labelFr: 'À propos', labelEn: 'About' },
    { id: 'fleet', num: '03', labelFr: 'Notre flotte', labelEn: 'Our fleet' },
    { id: 'services', num: '04', labelFr: 'Services', labelEn: 'Services' },
    { id: 'advantages', num: '05', labelFr: 'Pourquoi Limo Raf', labelEn: 'Why Limo Raf' },
    { id: 'cities', num: '06', labelFr: 'Destinations', labelEn: 'Destinations' },
    { id: 'coverage', num: '07', labelFr: 'Liaisons', labelEn: 'Corridors' },
    { id: 'reviews', num: '08', labelFr: 'Avis', labelEn: 'Reviews' },
    { id: 'contact', num: '', labelFr: 'Contact', labelEn: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#07080A]/92 backdrop-blur-md border-b border-neutral-800/80 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand: SVG Vector Tag Logo (Ultra-clear, visible, non-pixelated) */}
          <a
            href="#"
            onClick={handleBrandClick}
            className="flex items-center group cursor-pointer shrink-0 mr-4 lg:mr-8"
            aria-label="Limo Raf - Accueil"
          >
            <LimoLogo
              variant="horizontal"
              className="h-10 sm:h-11 w-auto shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
              subline={language === 'FR' ? 'Montréal · depuis 2021' : 'Montreal · since 2021'}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4.5 2xl:gap-6 text-[13.5px] 2xl:text-[14px] text-neutral-300 font-normal">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="group relative py-1 hover:text-white transition-colors whitespace-nowrap"
              >
                <span>{language === 'FR' ? link.labelFr : link.labelEn}</span>
                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-[#D7B65D] transition-all duration-200 ease-out" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Direct Phone Number */}
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-2 text-[13px] text-neutral-300 hover:text-white font-mono tracking-tight transition-colors"
              aria-label="Appeler Limo Raf"
            >
              <Phone className="w-3.5 h-3.5 text-[#D7B65D]" />
              <span>{CLIENT_INFO.phone}</span>
            </a>

            {/* Language Switcher (FR / EN) */}
            <div className="flex items-center text-xs font-semibold tracking-wider text-neutral-400 border border-neutral-800 rounded-sm overflow-hidden bg-neutral-900/60">
              <button
                type="button"
                onClick={() => onToggleLanguage('FR')}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  language === 'FR'
                    ? 'bg-[#D7B65D] text-neutral-950 font-bold'
                    : 'hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onToggleLanguage('EN')}
                className={`px-2.5 py-1 transition-colors cursor-pointer ${
                  language === 'EN'
                    ? 'bg-[#D7B65D] text-neutral-950 font-bold'
                    : 'hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Solid Primary CTA Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-semibold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              {language === 'FR' ? 'Réserver' : 'Book'}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#07080A] flex flex-col justify-between p-6 sm:p-10 text-white overflow-y-auto animate-in fade-in duration-200">
          {/* Mobile Header Top */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
            <div className="flex items-center">
              <LimoLogo
                variant="horizontal"
                className="h-9 w-auto shrink-0"
                subline={language === 'FR' ? 'Montréal · depuis 2021' : 'Montreal · since 2021'}
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Serif Links */}
          <nav className="my-8 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="group flex items-baseline justify-between border-b border-neutral-900 pb-3"
              >
                <span className="font-display text-2xl sm:text-3xl text-neutral-200 group-hover:text-[#D7B65D] transition-colors">
                  {language === 'FR' ? link.labelFr : link.labelEn}
                </span>
                {link.num && (
                  <span className="font-display text-sm text-neutral-600 group-hover:text-[#D7B65D] transition-colors">
                    {link.num}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Bottom Info: Phone, WhatsApp, and Booking CTA */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 bg-[#D7B65D] text-neutral-950 font-semibold text-xs uppercase tracking-[0.16em] transition-colors"
            >
              {language === 'FR' ? 'Réserver un trajet' : 'Book a ride'}
            </button>

            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
              <a
                href={`tel:${CLIENT_INFO.phoneRaw}`}
                className="flex items-center gap-2 hover:text-white font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#D7B65D]" />
                <span>{CLIENT_INFO.phone}</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send/?phone=${CLIENT_INFO.phoneRaw}&text=Bonjour%20Limo%20Raf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-400 hover:text-[#25D366]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
