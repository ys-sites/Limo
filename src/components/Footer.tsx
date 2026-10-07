import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { LimoLogo } from './ui/LimoLogo';

interface FooterProps {
  language: 'FR' | 'EN';
  onNavigateHome?: () => void;
  onSelectVehicle?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateHome, onSelectVehicle }) => {
  const isFr = language === 'FR';

  return (
    <footer id="contact" className="w-full bg-[#07080A] text-neutral-300 pt-20 pb-12 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Tidy Columns (Normal case headings, no ► glyphs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-neutral-800/80">
          {/* Column 1: Brand Logo & Quiet Statement (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#"
              onClick={(e) => {
                // Placeholder link: do nothing until a real destination is provided
                e.preventDefault();
                onNavigateHome?.();
              }}
              className="inline-block group"
              aria-label="Limo Raf - Accueil"
            >
              <LimoLogo
                variant="horizontal"
                className="h-11 sm:h-12 w-auto"
                subline={isFr ? 'Montréal · depuis 2021' : 'Montreal · since 2021'}
              />
            </a>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                {CLIENT_INFO.brandName}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
                {isFr
                  ? 'Service de chauffeur privé et VUS de prestige basé à Montréal. Prise en charge 24/7 vers YUL Trudeau, réunions corporatives et liaisons interurbaines.'
                  : 'Private chauffeur service and luxury SUVs based in Montreal. 24/7 dispatch to YUL airport, corporate schedules, and intercity corridors.'}
              </p>
            </div>
          </div>

          {/* Column 2: Coordonnées (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              {isFr ? 'Coordonnées' : 'Contact'}
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-light">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                <a href={`tel:${CLIENT_INFO.phoneRaw}`} className="hover:text-white transition-colors tabular-nums">
                  {CLIENT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                <a href={`mailto:${CLIENT_INFO.email}`} className="hover:text-white transition-colors">
                  {CLIENT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D7B65D] shrink-0 mt-0.5" />
                <span>
                  {/* Real address labeled as Bureau Terrebonne */}
                  Bureau — Terrebonne, QC
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
                <span className="text-neutral-300">
                  {isFr ? '24/7 sur réservation' : '24/7 by reservation'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Plan du site (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              {isFr ? 'Navigation' : 'Sitemap'}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400 font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    // Placeholder link: do nothing until a real destination is provided
                    e.preventDefault();
                    onNavigateHome?.();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isFr ? 'Accueil' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {isFr ? 'À propos' : 'About us'}
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  {isFr ? 'Notre flotte' : 'Our fleet'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {isFr ? 'Services' : 'Services'}
                </a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-white transition-colors">
                  {isFr ? 'Pourquoi Limo Raf' : 'Why Limo Raf'}
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-white transition-colors">
                  {isFr ? 'Destinations' : 'Destinations'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Flotte (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              {isFr ? 'Flotte disponible' : 'Available fleet'}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400 font-light">
              {FLEET.map((v) => (
                <li key={v.id}>
                  <a
                    href={`#/vehicles/${v.slug}`}
                    onClick={(e) => {
                      // Always handle via the app router so the hash never
                      // changes without the page state updating
                      e.preventDefault();
                      onSelectVehicle?.(v.slug);
                    }}
                    className="hover:text-white transition-colors block"
                  >
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {CLIENT_INFO.brandName}. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>

          <div className="flex items-center gap-5">
            <a
              href={CLIENT_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href={CLIENT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.008-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href={CLIENT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
