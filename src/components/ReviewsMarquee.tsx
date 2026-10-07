import React from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';

interface ReviewsMarqueeProps {
  language?: 'FR' | 'EN';
}

interface ReviewItem {
  author: string;
  badge?: string;
  timeFr: string;
  timeEn: string;
  rating: number;
  textFr: string;
  textEn: string;
}

const REVIEWS: ReviewItem[] = [
  {
    author: 'Aymen Bahloul',
    badge: 'Local Guide · 16 avis · 66 photos',
    timeFr: 'Il y a 2 ans',
    timeEn: '2 years ago',
    rating: 5,
    textFr: 'Service professionnel avec LimoRaf. Ponctualité exemplaire et grand confort. Merci beaucoup 👏👍.',
    textEn: 'Professional service with LimoRaf. Exemplary punctuality and great comfort. Thank you 👏👍.'
  },
  {
    author: 'René M',
    badge: 'Local Guide · 147 avis · 457 photos',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Service très classe et professionnel. Rafi est vraiment très sympathique et le véhicule était immaculé.',
    textEn: 'Very classy and professional service. Rafi is really very friendly, and the vehicle was immaculate.'
  },
  {
    author: 'Ziad Chikhaoui',
    badge: 'Local Guide · 22 avis · 2 photos',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Je recommande vivement ce service pour son fonctionnement fluide et son grand professionnalisme.',
    textEn: 'I highly recommend this service for its smooth operation and professionalism.'
  },
  {
    author: 'Boudreau Vicky',
    badge: '4 avis vérifiés',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Service toujours impeccable et discret ! Que ce soit pour être à l’aéroport à l’heure, rentrer chez soi rapidement ou pour des sorties, je les recommande chaudement. 👌🏻',
    textEn: 'Always impeccable and discreet service! Getting to the airport on time or heading home after business trips, I highly recommend them. 👌🏻'
  },
  {
    author: 'Chetouane Meriam',
    badge: '6 avis · 1 photo',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Une très belle expérience, un service très ponctuel. Je le recommande vivement.',
    textEn: 'A very pleasant experience, very punctual service. I highly recommend it.'
  },
  {
    author: 'Rayen Bekri',
    badge: 'Avis vérifié',
    timeFr: 'Il y a 3 mois',
    timeEn: '3 months ago',
    rating: 5,
    textFr: 'Service haut de gamme et ponctualité irréprochable. Chauffeur très courtois et véhicule d’une propreté exemplaire.',
    textEn: 'Top-tier service and flawless punctuality. Very courteous chauffeur and spotless vehicle.'
  },
  {
    author: 'Rostom Sallemi',
    badge: 'Local Guide · 7 avis · 2 photos',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Expérience 5 étoiles avec Limo Raf. Chauffeur ponctuel, conduite très douce et sécurisante. À recommander sans hésiter.',
    textEn: '5-star experience with Limo Raf. Punctual chauffeur, ultra-smooth and safe driving. Highly recommended.'
  },
  {
    author: 'Mayssa Heddi',
    badge: 'Avis vérifié',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Meilleur service de limousine à Montréal ! Ponctualité, discrétion et professionnalisme remarquables pour tous nos déplacements.',
    textEn: 'Best limousine service in Montreal! Outstanding punctuality, discretion, and professionalism.'
  },
  {
    author: 'Mariam Haribi',
    badge: 'Avis vérifié',
    timeFr: 'Il y a 3 ans',
    timeEn: '3 years ago',
    rating: 5,
    textFr: 'Service irréprochable du début à la fin. Chauffeur très élégant, discret et attentionné. Véhicule spacieux et grand confort.',
    textEn: 'Flawless service from start to finish. Elegant, discreet, and attentive chauffeur. Luxurious and spacious vehicle.'
  }
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export const ReviewsMarquee: React.FC<ReviewsMarqueeProps> = ({ language = 'FR' }) => {
  const isFr = language === 'FR';

  // Duplicate reviews array to create an infinite, seamless ribbon
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-20 sm:py-24 bg-[#ECE7DE] text-neutral-900 relative overflow-hidden border-t border-neutral-300/80">
      {/* Keyframe animation for infinite scrolling from left to right */}
      <style>{`
        @keyframes scroll-left-to-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-reviews-ltr {
          display: flex;
          width: max-content;
          animation: scroll-left-to-right 48s linear infinite;
          will-change: transform;
        }
        .animate-reviews-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-14">
        {/* Header with Google 5.0 Rating Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-300 shadow-xs mb-3">
              <GoogleIcon />
              <span className="text-[11px] font-bold text-neutral-800 tracking-wide">
                Google Reviews · 5.0 ★★★★★
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
              {isFr ? 'Ce que nos clients disent de nous' : 'What Our Clients Say About Us'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-1">
              {isFr
                ? 'Avis authentiques de passagers d’affaires, voyageurs et personnalités à Montréal.'
                : 'Verified reviews from executives, international travelers, and clients in Montreal.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-neutral-300/80 shadow-xs">
            <div className="flex items-center text-[#D7B65D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="border-l border-neutral-200 pl-3">
              <span className="text-sm font-bold text-neutral-900 block leading-tight">5.0 / 5.0</span>
              <span className="text-[10px] text-neutral-500 font-medium">100% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Endless Scroll Ribbon from Left to Right */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Left & Right Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#ECE7DE] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#ECE7DE] to-transparent z-10 pointer-events-none" />

        <div className="animate-reviews-ltr flex gap-5 sm:gap-6 py-2">
          {duplicatedReviews.map((rev, idx) => (
            <div
              key={`${rev.author}-${idx}`}
              className="w-[320px] sm:w-[380px] bg-white rounded-3xl p-6 sm:p-7 border border-neutral-300/80 hover:border-[#D7B65D] shadow-xs hover:shadow-xl transition-all duration-300 shrink-0 flex flex-col justify-between group cursor-grab select-none"
            >
              <div>
                {/* Top: Google Icon + Rating + Time */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1.5 text-[#D7B65D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                    <GoogleIcon />
                    <span>{isFr ? rev.timeFr : rev.timeEn}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed mb-4">
                  "{isFr ? rev.textFr : rev.textEn}"
                </p>
              </div>

              {/* Author & Badge */}
              <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight group-hover:text-[#C4963A] transition-colors">
                    {rev.author}
                  </h4>
                  {rev.badge && (
                    <span className="text-[10px] text-neutral-500 font-medium block">
                      {rev.badge}
                    </span>
                  )}
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0" title="Avis vérifié Google">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
