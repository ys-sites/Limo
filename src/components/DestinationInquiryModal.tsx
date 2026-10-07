import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, User, Phone, Mail, MapPin, CalendarDays, Users, FileText, Plane } from 'lucide-react';
import { submitInquiry } from '../lib/contact';

interface DestinationInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'FR' | 'EN';
  destination?: string;
}

const ALL_DESTINATIONS = [
  'Mont-Tremblant', 'Québec (Ville)', 'Laval & Rive-Nord', 'Laurentides',
  'Trois-Rivières', 'Bromont & Cantons-de-l’Est', 'Sherbrooke', 'Charlevoix',
  'Ottawa', 'Toronto', 'Kingston', 'Niagara Falls', 'Hamilton', 'Waterloo',
  'Burlington Airport (BTV)', 'Plattsburgh Airport (PBG)', 'Boston (BOS)',
  'New York City (JFK/LGA/EWR)', 'Albany',
];

const inputCls =
  'w-full pl-9 pr-3 py-2.5 text-sm text-white liquid-glass-input rounded-lg placeholder:text-neutral-500 transition-all';
const labelCls = 'block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1.5';

export const DestinationInquiryModal: React.FC<DestinationInquiryModalProps> = ({
  isOpen, onClose, language, destination,
}) => {
  const isFr = language === 'FR';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dest, setDest] = useState('');
  const [departure, setDeparture] = useState('');
  const [date, setDate] = useState('');
  const [isReturn, setIsReturn] = useState(false);
  const [passengers, setPassengers] = useState('2');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setDest(destination || '');
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, destination]);

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
          destination: dest || '—',
          depart: departure || 'Montréal',
          date: date || '—',
          aller_retour: isReturn ? (isFr ? 'Oui' : 'Yes') : (isFr ? 'Non' : 'No'),
          passagers: passengers,
          notes: notes || '—',
        },
        `Demande liaison longue distance — ${dest || 'destination'} (${name})`
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto liquid-glass-panel sm:rounded-2xl rounded-t-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full liquid-glass-pill flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer">
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
                ? <>Merci <strong className="text-white">{name}</strong>. On vous rappelle au <span className="text-white tabular-nums">{phone}</span> avec votre devis pour <strong className="text-[#D7B65D]">{dest}</strong>.</>
                : <>Thank you <strong className="text-white">{name}</strong>. We'll call you back at <span className="text-white tabular-nums">{phone}</span> with your quote for <strong className="text-[#D7B65D]">{dest}</strong>.</>}
            </p>
            <button onClick={onClose} className="mt-2 px-8 py-3 text-xs font-bold uppercase tracking-widest bg-gradient-to-b from-[#E5C778] via-[#D7B65D] to-[#B89235] hover:brightness-110 text-neutral-950 rounded-lg shadow-md transition-all cursor-pointer">
              {isFr ? 'Fermer' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D7B65D] mb-3">
              {isFr ? 'Liaison longue distance' : 'Long-distance transfer'}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">
              {isFr ? 'Votre trajet sur mesure' : 'Your custom trip'}
            </h3>
            <p className="text-xs text-neutral-400 mb-5">
              {isFr ? 'Dites-nous où aller, on s’occupe du reste.' : 'Tell us where to go, we handle the rest.'}
            </p>

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

              <div>
                <label className={labelCls}>{isFr ? 'Destination *' : 'Destination *'}</label>
                <div className="relative">
                  <Plane className="w-4 h-4 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
                  <select required value={dest} onChange={(e) => setDest(e.target.value)} className={`${inputCls} appearance-none cursor-pointer pr-8`}>
                    <option value="" className="bg-neutral-950">{isFr ? 'Choisir une destination…' : 'Choose a destination…'}</option>
                    {ALL_DESTINATIONS.map((d) => (
                      <option key={d} value={d} className="bg-neutral-950">{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{isFr ? 'Ville de départ' : 'Departure city'}</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="Montréal" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{isFr ? 'Date du trajet' : 'Trip date'}</label>
                  <div className="relative">
                    <CalendarDays className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${inputCls} [color-scheme:dark]`} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
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
                <label className="flex items-center gap-2.5 pb-2.5 cursor-pointer select-none">
                  <input type="checkbox" checked={isReturn} onChange={(e) => setIsReturn(e.target.checked)}
                    className="w-4 h-4 accent-[#D7B65D] cursor-pointer" />
                  <span className="text-sm text-neutral-300">{isFr ? 'Aller-retour' : 'Round trip'}</span>
                </label>
              </div>

              <div>
                <label className={labelCls}>{isFr ? 'Détails (optionnel)' : 'Details (optional)'}</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                    placeholder={isFr ? 'Adresses exactes, arrêts en route, demandes spéciales…' : 'Exact addresses, stops along the way, special requests…'}
                    className={`${inputCls} resize-none`} />
                </div>
              </div>

              <button type="submit" disabled={status === 'submitting'}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-950 bg-gradient-to-b from-[#E5C778] via-[#D7B65D] to-[#B89235] hover:brightness-110 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(215,182,93,0.25)] rounded-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
                {status === 'submitting' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{isFr ? 'Envoi…' : 'Sending…'}</>
                ) : (
                  isFr ? 'Demander mon devis' : 'Request my quote'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
