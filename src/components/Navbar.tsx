import React, { useState } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { CLIENT_INFO } from '../data/limoData';

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

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
    window.history.pushState(null, '', '#');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
    setMobileMenuOpen(false);

    // Timeout ensures subpages smoothly route back to main before scrolling
    setTimeout(() => {
      if (targetId === 'contact') {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full transition-all bg-gradient-to-b from-black/95 via-black/60 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Left: Logo & High-contrast Brand name */}
        <a href="#" onClick={handleBrandClick} className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer shrink-0">
          <img
            src="/logo.png"
            alt="Limo Raf Chauffeur VIP Montréal"
            className="h-9 sm:h-12 w-auto object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold tracking-[0.14em] text-white uppercase font-sans group-hover:text-[#F5D577] transition-colors leading-tight">
              {CLIENT_INFO.brandName}
            </span>
            <span className="text-[9px] sm:text-[11px] tracking-[0.22em] text-[#F5D577] font-bold uppercase leading-tight drop-shadow-md">
              MONTRÉAL · CHAUFFEUR VIP
            </span>
          </div>
        </a>

        {/* Right Group: Links, Phone, Language & Hamburger */}
        <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6">
          {/* Navigation links with working smooth scroll */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold text-white/95 tracking-wide">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-[#F5D577] transition-colors py-1 cursor-pointer"
            >
              {language === 'FR' ? 'À Propos' : 'About'}
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#F5D577] transition-colors py-1 cursor-pointer"
            >
              Services
            </a>
            <a
              href="#fleet"
              onClick={(e) => handleNavClick(e, 'fleet')}
              className="hover:text-[#F5D577] transition-colors py-1 cursor-pointer"
            >
              {language === 'FR' ? 'Notre Flotte' : 'Our Fleet'}
            </a>
            <a
              href="#advantages"
              onClick={(e) => handleNavClick(e, 'advantages')}
              className="hover:text-[#F5D577] transition-colors py-1 cursor-pointer"
            >
              {language === 'FR' ? 'Avantages' : 'Advantages'}
            </a>
            <a
              href="#cities"
              onClick={(e) => handleNavClick(e, 'cities')}
              className="hover:text-[#F5D577] transition-colors py-1 cursor-pointer"
            >
              Destinations
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-[#F5D577] transition-colors px-2.5 py-1 rounded-md border border-white/30 hover:border-[#D7B65D] cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* Quick Call pill for Montreal */}
          <a
            href={`tel:${CLIENT_INFO.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#D7B65D] transition-all"
            aria-label="Call Limo Raf"
          >
            <Phone className="w-3 h-3 text-[#F5D577]" />
            <span className="font-mono tracking-tight hidden md:inline">{CLIENT_INFO.phone}</span>
          </a>

          {/* Language Selector: French / English */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/20">
            <button
              onClick={() => onToggleLanguage('FR')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'FR'
                  ? 'bg-[#D7B65D] text-neutral-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => onToggleLanguage('EN')}
              className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'EN'
                  ? 'bg-[#D7B65D] text-neutral-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-out Menu Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 backdrop-blur-2xl border-b border-neutral-800 px-6 py-6 text-white space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Limo Raf" className="h-8 w-auto object-contain" />
              <span className="text-sm font-bold tracking-wider text-[#F5D577]">{CLIENT_INFO.brandName}</span>
            </div>
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="text-xs text-neutral-300 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5D577]" />
              <span className="font-mono">{CLIENT_INFO.phone}</span>
            </a>
          </div>

          <nav className="flex flex-col space-y-3.5 text-base font-semibold">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-[#F5D577] py-1 border-b border-white/5 flex items-center justify-between"
            >
              <span>{language === 'FR' ? 'À Propos' : 'About'}</span>
              <span className="text-xs text-neutral-500">02</span>
            </a>
            <a
              href="#fleet"
              onClick={(e) => handleNavClick(e, 'fleet')}
              className="hover:text-[#F5D577] py-1 border-b border-white/5 flex items-center justify-between"
            >
              <span>{language === 'FR' ? 'Notre Flotte' : 'Our Fleet'}</span>
              <span className="text-xs text-neutral-500">03</span>
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#F5D577] py-1 border-b border-white/5 flex items-center justify-between"
            >
              <span>Services</span>
              <span className="text-xs text-neutral-500">04</span>
            </a>
            <a
              href="#advantages"
              onClick={(e) => handleNavClick(e, 'advantages')}
              className="hover:text-[#F5D577] py-1 border-b border-white/5 flex items-center justify-between"
            >
              <span>{language === 'FR' ? 'Avantages' : 'Advantages'}</span>
              <span className="text-xs text-neutral-500">05</span>
            </a>
            <a
              href="#cities"
              onClick={(e) => handleNavClick(e, 'cities')}
              className="hover:text-[#F5D577] py-1 border-b border-white/5 flex items-center justify-between"
            >
              <span>Destinations</span>
              <span className="text-xs text-neutral-500">06</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-[#F5D577] py-1 flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4 text-[#F5D577]" />
            </a>
          </nav>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] rounded-xl shadow-lg"
            >
              {language === 'FR' ? 'Réserver un chauffeur' : 'Reserve a Chauffeur'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
