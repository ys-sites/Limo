import React, { useState } from 'react';
import { ArrowRight, Check, Phone, MessageSquare } from 'lucide-react';
import { CLIENT_INFO } from '../data/limoData';

interface FooterProps {
  language: 'FR' | 'EN';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="w-full bg-black text-neutral-300 pt-16 pb-12 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid matching screenshot exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16 border-b border-neutral-800/80">
          {/* Column 1: Brand & Address & Newsletter (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-bold tracking-[0.18em] text-white uppercase font-sans block">
              {CLIENT_INFO.brandName}
            </span>
            <div className="text-xs text-neutral-400 space-y-1 font-light">
              <p>{CLIENT_INFO.address}</p>
              <p>
                <a href={`tel:${CLIENT_INFO.phoneRaw}`} className="hover:text-amber-400 transition-colors">
                  {CLIENT_INFO.phone}
                </a> ·{' '}
                <a href={`mailto:${CLIENT_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {CLIENT_INFO.email}
                </a>
              </p>
              <p className="text-amber-400/90 font-medium">
                {language === 'FR' ? CLIENT_INFO.availabilityFr : CLIENT_INFO.availabilityEn}
              </p>
            </div>

            {/* Newsletter Subscription Box directly from screenshot */}
            <div className="pt-3 max-w-xs">
              <span className="text-xs text-neutral-300 block mb-2 font-light">
                {language === 'FR' ? 'Abonnez-vous à l\'infolettre VIP' : 'Subscribe to the newsletter'}
              </span>
              
              {subscribed ? (
                <div className="flex items-center gap-2 p-2 bg-neutral-900/60 border border-emerald-500/40 rounded text-emerald-400 text-xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'FR' ? 'Inscription confirmée' : 'Subscribed successfully'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'FR' ? 'Votre courriel...' : 'Email...'}
                    required
                    className="flex-1 px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-l text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter"
                    className="px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-r transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Top cities (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">
              {language === 'FR' ? 'Destinations phares' : 'Top cities'}
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#cities" className="hover:text-white transition-colors">Montréal (YUL)</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Laval (Centropolis)</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Mont-Tremblant</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Québec (Vieux-Québec)</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Ottawa (Gatineau)</a></li>
            </ul>
          </div>

          {/* Column 3: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">
              {language === 'FR' ? 'Services de prestige' : 'Explore'}
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#services" className="hover:text-white transition-colors">{language === 'FR' ? 'Transferts aéroport YUL' : 'Airport transfers'}</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">{language === 'FR' ? 'Flotte de SUV VIP' : 'VIP SUV Fleet'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{language === 'FR' ? 'Service corporatif' : 'Corporate travel'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{language === 'FR' ? 'Mariage & Galas' : 'Weddings & Galas'}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{language === 'FR' ? 'Longue distance' : 'Long distance'}</a></li>
            </ul>
          </div>

          {/* Column 4: Intercity rides (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">
              {language === 'FR' ? 'Liaisons populaires' : 'Intercity rides'}
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><span>Montréal ↔ Aéroport YUL</span></li>
              <li><span>Montréal ↔ Mont-Tremblant</span></li>
              <li><span>Montréal ↔ Québec (Château Frontenac)</span></li>
              <li><span>Montréal ↔ Ottawa / Gatineau</span></li>
              <li><span>Montréal ↔ Toronto / Boston / New York</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching screenshot exactly */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-light">
          <div>
            <span>© {new Date().getFullYear()} {CLIENT_INFO.brandName} · {language === 'FR' ? 'Tous droits réservés' : 'All rights reserved'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">{language === 'FR' ? 'Conditions d\'utilisation' : 'Terms'}</a>
            <a href="#" className="hover:text-white transition-colors">{language === 'FR' ? 'Politique de confidentialité' : 'Privacy policy'}</a>
            <a href="#" className="hover:text-white transition-colors">{language === 'FR' ? 'Mentions légales' : 'Legal notice'}</a>
            <a href="#" className="hover:text-white transition-colors">{language === 'FR' ? 'Accessibilité' : 'Accessibility'}</a>
          </div>

          {/* Social Icons matching screenshot */}
          <div className="flex items-center gap-3.5 text-neutral-300">
            {/* Direct WhatsApp */}
            <a
              href={CLIENT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="hover:text-amber-400 transition-colors"
              aria-label="Call"
              title="Call (+1) 514-243-8141"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* Facebook */}
            <a
              href={CLIENT_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={CLIENT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
