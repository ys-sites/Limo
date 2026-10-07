import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
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
    <footer className="w-full bg-[#2E211E] text-neutral-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid matching screenshot exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Address & Newsletter (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-bold tracking-[0.16em] text-white uppercase font-sans block">
              PREMIER LIMO
            </span>
            <div className="text-xs text-neutral-400 space-y-0.5 font-light">
              <p>121 Tanglewood Street Bronx, NY 10472</p>
              <p>info@premierlimo.com</p>
            </div>

            {/* Newsletter Subscription Box directly from screenshot */}
            <div className="pt-3 max-w-xs">
              <span className="text-xs text-neutral-300 block mb-2 font-light">
                Subscribe to the newsletter
              </span>
              
              {subscribed ? (
                <div className="flex items-center gap-2 p-2 bg-neutral-900/60 border border-emerald-500/40 rounded text-emerald-400 text-xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed successfully</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    required
                    className="flex-1 px-3 py-2 text-xs bg-[#3E302D] border border-transparent rounded-l text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter"
                    className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-r transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Top cities (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white">
              Top cities
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#cities" className="hover:text-white transition-colors">New York</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">London</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Berlin</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Los Angeles</a></li>
              <li><a href="#cities" className="hover:text-white transition-colors">Paris</a></li>
            </ul>
          </div>

          {/* Column 3: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white">
              Explore
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#services" className="hover:text-white transition-colors">Intercity rides</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Limousine service</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Chauffeur service</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Private car service</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Airport transfer</a></li>
            </ul>
          </div>

          {/* Column 4: Intercity rides (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white">
              Intercity rides
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><span>East Hampton - New York</span></li>
              <li><span>New York - Washington</span></li>
              <li><span>New York - Philadelphia</span></li>
              <li><span>Abu Dhabi - Dubai</span></li>
              <li><span>London - Birmingham</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching screenshot exactly */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-light">
          <div>
            <span>© 2024 PREMIER LIMO</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-white transition-colors">Legal notice</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>

          {/* Social Icons matching screenshot */}
          <div className="flex items-center gap-3.5 text-neutral-300">
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
