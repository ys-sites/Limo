import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('ENG');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages = ['ENG', 'ESP', 'FRA', 'DEU'];

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full transition-all bg-gradient-to-b from-black/60 via-black/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand name from screenshot */}
        <a href="#" className="flex items-center">
          <span className="text-xl sm:text-2xl font-bold tracking-[0.16em] text-white uppercase font-sans">
            PREMIER LIMO
          </span>
        </a>

        {/* Right Group: Links & Language & Hamburger */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Navigation links matching screenshot: About, Services, News, Jobs */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-white/90 tracking-wide">
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
            <a href="#fleet" className="hover:text-amber-400 transition-colors">Fleet</a>
            <a href="#news" className="hover:text-amber-400 transition-colors">News</a>
            <a href="#jobs" className="hover:text-amber-400 transition-colors">Jobs</a>
          </nav>

          {/* Language Selector matching screenshot: Flag + ENG ▾ */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all cursor-pointer"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <span className="text-sm">🇬🇧</span>
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-white/80" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl py-1 z-50 text-white animate-in fade-in zoom-in-95 duration-150">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors ${
                      selectedLang === lang ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {lang === 'ENG' && '🇬🇧 English'}
                    {lang === 'ESP' && '🇪🇸 Español'}
                    {lang === 'FRA' && '🇫🇷 Français'}
                    {lang === 'DEU' && '🇩🇪 Deutsch'}
                  </button>
                ))}
              </div>
            )}
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
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 text-white space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">Services</a>
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">Fleet</a>
            <a href="#cities" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">Top Cities</a>
            <a href="#news" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">News</a>
            <a href="#jobs" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">Jobs</a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider bg-amber-400 text-neutral-950 rounded-lg"
            >
              Reserve Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
