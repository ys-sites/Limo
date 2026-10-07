import React, { useState } from 'react';
import { ChevronDown, Menu, X, Phone, MessageSquare } from 'lucide-react';
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
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
      window.history.pushState(null, '', '#');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full transition-all bg-gradient-to-b from-black/80 via-black/35 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Left: Brand name matching client's identity */}
        <a href="#" onClick={handleBrandClick} className="flex items-center gap-2 group cursor-pointer">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-[0.18em] text-white uppercase font-sans group-hover:text-amber-400 transition-colors">
              {CLIENT_INFO.brandName}
            </span>
            <span className="text-[10px] tracking-[0.28em] text-amber-400/90 uppercase font-light -mt-0.5">
              Montréal · Chauffeur VIP
            </span>
          </div>
        </a>

        {/* Right Group: Links, Phone, Language & Hamburger */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-white/90 tracking-wide">
            <a href="#about" className="hover:text-amber-400 transition-colors">
              {language === 'FR' ? 'À Propos' : 'About'}
            </a>
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Services
            </a>
            <a href="#fleet" className="hover:text-amber-400 transition-colors">
              {language === 'FR' ? 'Notre Flotte' : 'Our Fleet'}
            </a>
            <a href="#cities" className="hover:text-amber-400 transition-colors">
              Destinations
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Quick Call pill for Montreal */}
          <a
            href={`tel:${CLIENT_INFO.phoneRaw}`}
            className="hidden lg:inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all"
            aria-label="Call Limo Raf"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span className="font-mono tracking-tight">{CLIENT_INFO.phone}</span>
          </a>

          {/* Language Selector: only French and English, French first */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/20">
            <button
              onClick={() => onToggleLanguage('FR')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'FR'
                  ? 'bg-amber-400 text-neutral-950 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => onToggleLanguage('EN')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'EN'
                  ? 'bg-amber-400 text-neutral-950 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Menu button matching screenshot: dark square button with hamburger bars */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-out Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 text-white space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="pb-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm font-bold tracking-wider text-amber-400">{CLIENT_INFO.brandName}</span>
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="text-xs text-neutral-300 flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{CLIENT_INFO.phone}</span>
            </a>
          </div>
          <nav className="flex flex-col space-y-3 text-sm">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">
              {language === 'FR' ? 'À Propos' : 'About'}
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">
              Services
            </a>
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">
              {language === 'FR' ? 'Notre Flotte' : 'Our Fleet'}
            </a>
            <a href="#cities" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">
              Destinations
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">
              Contact
            </a>
          </nav>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider bg-amber-400 text-neutral-950 rounded-lg cursor-pointer"
            >
              {language === 'FR' ? 'Réserver maintenant' : 'Reserve Now'}
            </button>
            <a
              href={CLIENT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
