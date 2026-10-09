import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, User, Phone, Mail, Car, ChevronDown, FileText, Sparkles, CalendarDays } from 'lucide-react';
import { submitInquiry, QuotePrefill } from '../lib/contact';
import { FLEET, CLIENT_INFO, SERVICES } from '../data/limoData';
import { TripFields, useTripDetails, tripEmailFields, tripSummaryFr } from './TripFields';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'FR' | 'EN';
  prefill?: QuotePrefill;
}

const inputCls =
  'w-full pl-9 pr-3 py-2 text-xs text-white liquid-glass-input rounded-none focus:outline-none placeholder:text-neutral-500';
const labelCls = 'block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1';

// Service titles are stored in caps ("SERVICE À L'HEURE") -> "Service à l'heure"
const sentenceCase = (title: string) => title.charAt(0) + title.slice(1).toLowerCase();

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// "2026-10-24" -> "samedi 24 octobre 2026" (parsed as a local date, no timezone shift)
const formatEventDate = (iso: string, locale: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
};

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, language, prefill }) => {
  const isFr = language === 'FR';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('Cadillac Escalade ESV');
  const [notes, setNotes] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [eventDate, setEventDate] = useState('');
  const { trip, setTrip, resetTrip } = useTripDetails();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Prefill when opened with a vehicle, service, or destination
  useEffect(() => {
    if (isOpen) {
      if (prefill?.vehicle) {
        setVehicle(prefill.vehicle);
      } else {
        setVehicle('Cadillac Escalade ESV');
      }
      setServiceId(prefill?.serviceId ?? '');
      setEventDate('');
      // "Service à l'heure" is a drive-as-directed booking
      resetTrip(prefill?.serviceId === 'hourly-limo' ? 'hourly' : 'transfer');
      setNotes(
        [prefill?.service, prefill?.destination, prefill?.details].filter(Boolean).join(' · ')
      );
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, prefill]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Opened from "Réserver ce service": the booking is for a specific occasion on a specific day
  const occasion = SERVICES.find((s) => s.id === serviceId);
  const occasionLabel = occasion ? sentenceCase(isFr ? occasion.titleFr : occasion.titleEn) : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // The business reads the inquiry emails in French
      const occasionFr = occasion ? sentenceCase(occasion.titleFr) : '';
      const dateFr = eventDate ? formatEventDate(eventDate, 'fr-CA') : '';
      await submitInquiry(
        {
          name,
          email,
          phone,
          ...(occasion && { occasion: occasionFr, event_date: `${dateFr} (${eventDate})` }),
          ...tripEmailFields(trip),
          preferred_vehicle: vehicle,
          message_or_notes: notes || 'Aucune note particulière',
        },
        occasion
          ? `${occasionFr} le ${dateFr} - ${tripSummaryFr(trip)} - ${name} (${vehicle}) | Limo Raf`
          : `Demande de réservation Limo Raf - ${tripSummaryFr(trip)} - ${name} (${vehicle})`
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full sm:max-w-[420px] max-h-[92vh] overflow-y-auto liquid-glass-panel sm:rounded-2xl rounded-t-2xl p-6 sm:p-7 text-neutral-200 animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full liquid-glass-pill flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="space-y-4 py-3 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full liquid-glass-pill text-[#D7B65D] flex items-center justify-center mx-auto border-[#D7B65D]/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h4 className="font-display text-xl text-white font-medium">
                {isFr ? 'Demande reçue' : 'Request received'}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {isFr ? (
                  <>
                    Merci <strong className="text-white">{name}</strong>. Votre demande pour le{' '}
                    <strong className="text-[#D7B65D]">{vehicle}</strong>
                    {occasion && eventDate && (
                      <> ({occasionLabel.toLowerCase()}, le <strong className="text-white">{formatEventDate(eventDate, 'fr-CA')}</strong>)</>
                    )}{' '}
                    a bien été enregistrée.
                    On vous rappelle rapidement au <span className="tabular-nums text-white font-medium">{phone}</span> pour confirmer.
                  </>
                ) : (
                  <>
                    Thank you <strong className="text-white">{name}</strong>. Your request for the{' '}
                    <strong className="text-[#D7B65D]">{vehicle}</strong>
                    {occasion && eventDate && (
                      <> ({occasionLabel.toLowerCase()}, on <strong className="text-white">{formatEventDate(eventDate, 'en-CA')}</strong>)</>
                    )}{' '}
                    has been received.
                    We will call you shortly at <span className="tabular-nums text-white font-medium">{phone}</span> to confirm.
                  </>
                )}
              </p>
            </div>

            <div className="space-y-2.5 pt-3">
              <a
                href={`tel:${CLIENT_INFO.phoneRaw}`}
                className="w-full py-2.5 px-3 text-xs text-neutral-300 hover:text-white liquid-glass-pill hover:border-[#D7B65D]/50 flex items-center justify-center gap-2 transition-all tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#D7B65D]" />
                <span>{isFr ? `Une question ? ${CLIENT_INFO.phone}` : `Questions? Call ${CLIENT_INFO.phone}`}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                {isFr ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header: Exact copy of Hero BookingWidget */}
            <div className="mb-5 pb-4 border-b border-white/10 pr-8">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D7B65D]">
                  {isFr ? 'Réservation directe' : 'Direct booking'}
                </span>
                <span className="px-2 py-0.5 rounded-full liquid-glass-pill text-[10px] font-bold text-[#D7B65D] tabular-nums">
                  24/7
                </span>
              </div>
              <h3 className="font-display text-2xl font-medium text-white tracking-tight">
                {isFr ? 'Réserver un chauffeur' : 'Book your chauffeur'}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {occasion
                  ? isFr
                    ? 'Indiquez la date de votre événement, on s\'occupe du reste.'
                    : 'Tell us the date of your event, we handle the rest.'
                  : isFr
                    ? 'Prise en charge ponctuelle · Aucun frais caché'
                    : 'Punctual dispatch · No hidden fees'}
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-800/80 rounded-none flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>
                  {isFr
                    ? "Impossible d'envoyer la demande pour le moment. Vous pouvez nous joindre directement au 514-243-8141."
                    : "Unable to submit request at this time. Please call us directly at 514-243-8141."}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {occasion && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3 -mx-1 border border-[#D7B65D]/25 bg-[#D7B65D]/[0.04]">
                  {/* Occasion: preselected from the service the visitor chose */}
                  <div>
                    <label className={labelCls}>Occasion *</label>
                    <div className="relative">
                      <Sparkles className="w-3.5 h-3.5 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className={`${inputCls} pr-8 appearance-none cursor-pointer`}
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#0C0E14] text-white">
                            {sentenceCase(isFr ? s.titleFr : s.titleEn)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Event day only; the exact time is settled when we call back */}
                  <div>
                    <label className={labelCls}>
                      {isFr ? 'Date de l\'événement *' : 'Event date *'}
                    </label>
                    <div className="relative">
                      <CalendarDays className="w-3.5 h-3.5 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="date"
                        required
                        min={todayIso()}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className={`${inputCls} [color-scheme:dark] cursor-pointer`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Transfer (pickup -> drop-off) or drive as directed (pickup + duration) */}
              <TripFields trip={trip} onChange={setTrip} isFr={isFr} />

              {/* Full Name */}
              <div>
                <label className={labelCls}>
                  {isFr ? 'Nom complet *' : 'Full name *'}
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isFr ? 'Alexandre Tremblay' : 'John Smith'}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelCls}>
                  {isFr ? 'Courriel *' : 'Email *'}
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@entreprise.com"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelCls}>
                  {isFr ? 'Téléphone *' : 'Phone *'}
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 514 000-0000"
                    className={`${inputCls} tabular-nums`}
                  />
                </div>
              </div>

              {/* Preferred Vehicle */}
              <div>
                <label className={labelCls}>
                  {isFr ? 'Véhicule souhaité *' : 'Preferred vehicle *'}
                </label>
                <div className="relative">
                  <Car className="w-3.5 h-3.5 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className={`${inputCls} pr-8 appearance-none cursor-pointer`}
                  >
                    {FLEET.map((v) => (
                      <option key={v.id} value={v.name} className="bg-[#0C0E14] text-white">
                        {v.name} ({isFr ? v.categoryLabelFr : v.categoryLabelEn})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Trip Details / Notes */}
              <div>
                <label className={labelCls}>
                  {isFr ? 'Détails du trajet (optionnel)' : 'Trip details (optional)'}
                </label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      occasion
                        ? isFr ? 'ex. Lieu de prise en charge, nb de passagers' : 'e.g. Pickup location, number of guests'
                        : isFr ? 'ex. Vol AC872, prise en charge à 14 h' : 'e.g. Flight AC872, pickup at 2 PM'
                    }
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Solid Primary Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(215,182,93,0.35)] active:scale-[0.98]"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{isFr ? 'Envoi en cours...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <span>{isFr ? 'Demander une réservation' : 'Request reservation'}</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
