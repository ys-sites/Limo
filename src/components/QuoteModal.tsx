import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, User, Phone, Mail, Car, ClipboardList, MapPin, CalendarDays, Users, FileText } from 'lucide-react';
import { submitInquiry, QuotePrefill } from '../lib/contact';
import { SERVICES, FLEET } from '../data/limoData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'FR' | 'EN';
  prefill?: QuotePrefill;
}

const inputCls =
  'w-full pl-9 pr-3 py-2.5 text-sm text-white bg-neutral-900/80 border border-neutral-800 focus:outline-none focus:border-[#D7B65D] placeholder:text-neutral-600 transition-colors';
const labelCls = 'block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1.5';

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, language, prefill }) => {
  const isFr = language === 'FR';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Prefill when opened from a service / vehicle / city CTA
  useEffect(() => {
    if (isOpen) {
      setService(prefill?.service || '');
      setVehicle(prefill?.vehicle || '');
      if (prefill?.destination) setDropoff(prefill.destination);
      if (prefill?.details) setNotes(prefill.details);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitInquiry(
        {
          nom: name,
          telephone: phone,
          courriel: email,
          service: service || '—',
          vehicule: vehicle || '—',
          depart: pickup || '—',
          destination: dropoff || '—',
          date: date || '—',
          passagers: passengers,
          notes: notes || '—',
        },
        `Demande de devis Limo Raf — ${name}${service ? ` (${service})` : ''}`
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const contextLabel = prefill?.vehicle || prefill?.service || prefill?.destination;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-[#0C0E12]/90 backdrop-blur-2xl border border-white/10 sm:rounded-2xl rounded-t-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D7B65D]/15 text-[#D7B65D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl text-white">{isFr ? 'Demande envoyée' : 'Request sent'}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {isFr
                ? <>Merci <strong className="text-white">{name}</strong>. Notre équipe vous contactera très rapidement au <span className="text-white tabular-nums">{phone}</span>.</>
                : <>Thank you <strong className="text-white">{name}</strong>. Our team will contact you very shortly at <span className="text-white tabular-nums">{phone}</span>.</>}
            </p>
            <button onClick={onClose} className="mt-2 px-8 py-3 text-xs font-bold uppercase tracking-widest bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 rounded-lg transition-colors cursor-pointer">
              {isFr ? 'Fermer' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D7B65D] mb-1">
              {isFr ? 'Devis gratuit' : 'Free quote'}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">
              {isFr ? 'Demander un devis' : 'Request a quote'}
            </h3>
            <p className="text-xs text-neutral-400 mb-5">
              {isFr ? 'Remplissez vos informations, on s’occupe du reste.' : 'Fill in your details, we handle the rest.'}
            </p>
            {contextLabel && (
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D7B65D]/10 border border-[#D7B65D]/30 text-xs text-[#D7B65D] font-medium">
                <Car className="w-3.5 h-3.5" />
                {contextLabel}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-800/80 rounded-lg flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{isFr ? "L'envoi a échoué. Réessayez ou appelez-nous au 514-243-8141." : 'Submission failed. Please retry or call us at 514-243-8141.'}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{isFr ? 'Nom complet *' : 'Full name *'}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Alexandre Tremblay" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{isFr ? 'Téléphone *' : 'Phone *'}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 514 000-0000" className={`${inputCls} tabular-nums`} />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>{isFr ? 'Courriel *' : 'Email *'}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@exemple.com" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{isFr ? 'Service' : 'Service'}</label>
                  <div className="relative">
                    <ClipboardList className="w-4 h-4 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
                    <select value={service} onChange={(e) => setService(e.target.value)} className={`${inputCls} appearance-none cursor-pointer pr-8`}>
                      <option value="" className="bg-neutral-950">{isFr ? 'Choisir…' : 'Select…'}</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={isFr ? s.titleFr : s.titleEn} className="bg-neutral-950">
                          {isFr ? s.titleFr : s.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{isFr ? 'Véhicule' : 'Vehicle'}</label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
                    <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={`${inputCls} appearance-none cursor-pointer pr-8`}>
                      <option value="" className="bg-neutral-950">{isFr ? 'Sans préférence' : 'No preference'}</option>
                      {FLEET.map((v) => (
                        <option key={v.id} value={v.name} className="bg-neutral-950">{v.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{isFr ? 'Lieu de départ' : 'Pickup location'}</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder={isFr ? 'ex. Aéroport YUL' : 'e.g. YUL Airport'} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{isFr ? 'Destination' : 'Destination'}</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder={isFr ? 'ex. Mont-Tremblant' : 'e.g. Mont-Tremblant'} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{isFr ? 'Date' : 'Date'}</label>
                  <div className="relative">
                    <CalendarDays className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${inputCls} [color-scheme:dark]`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{isFr ? 'Passagers' : 'Passengers'}</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={n} className="bg-neutral-950">{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>{isFr ? 'Détails (optionnel)' : 'Details (optional)'}</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                    placeholder={isFr ? 'Numéro de vol, adresse exacte, demandes spéciales…' : 'Flight number, exact address, special requests…'}
                    className={`${inputCls} resize-none`} />
                </div>
              </div>

              <button type="submit" disabled={status === 'submitting'}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
                {status === 'submitting' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{isFr ? 'Envoi…' : 'Sending…'}</>
                ) : (
                  isFr ? 'Envoyer ma demande' : 'Send my request'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
