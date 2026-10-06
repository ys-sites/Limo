import React, { useState } from 'react';
import { ArrowRight, Check, Youtube, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
