import React, { useEffect, useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, User, Phone, Mail, Clock, PhoneCall } from 'lucide-react';
import { submitInquiry } from '../lib/contact';
import { CLIENT_INFO } from '../data/limoData';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'FR' | 'EN';
}

const inputCls =
  'w-full pl-9 pr-3 py-2.5 text-sm text-white liquid-glass-input rounded-lg placeholder:text-neutral-500 transition-all';
const labelCls = 'block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1.5';

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose, language }) => {
  const isFr = language === 'FR';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [moment, setMoment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
        { nom: name, telephone: phone, courriel: email, moment_souhaite: moment || '—' },
        `Demande de rappel — ${name} (${phone})`
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md liquid-glass-panel sm:rounded-2xl rounded-t-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full liquid-glass-pill flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D7B65D]/15 text-[#D7B65D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl text-white">{isFr ? 'On vous rappelle' : "We'll call you"}</h3>
            <p className="text-sm text-neutral-400">
              {isFr
                ? <>Merci <strong className="text-white">{name}</strong>, on vous rappelle au <span className="text-white tabular-nums">{phone}</span> très bientôt.</>
                : <>Thank you <strong className="text-white">{name}</strong>, we'll call you back at <span className="text-white tabular-nums">{phone}</span> very soon.</>}
            </p>
            <button onClick={onClose} className="px-8 py-3 text-xs font-bold uppercase tracking-widest bg-gradient-to-b from-[#E5C778] via-[#D7B65D] to-[#B89235] hover:brightness-110 text-neutral-950 rounded-lg shadow-md transition-all cursor-pointer">
              {isFr ? 'Fermer' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full liquid-glass-pill text-[#D7B65D] flex items-center justify-center mb-4">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl text-white mb-1">
              {isFr ? 'Demander un rappel' : 'Request a callback'}
            </h3>
            <p className="text-xs text-neutral-400 mb-5">
              {isFr ? 'Laissez vos coordonnées, on vous rappelle rapidement.' : 'Leave your details, we’ll call you right back.'}
            </p>

            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-800/80 rounded-lg flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{isFr ? "L'envoi a échoué. Réessayez." : 'Submission failed. Please retry.'}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div>
                <label className={labelCls}>{isFr ? 'Courriel *' : 'Email *'}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nom@exemple.com" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>{isFr ? 'Moment souhaité' : 'Preferred time'}</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                  <select value={moment} onChange={(e) => setMoment(e.target.value)} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="" className="bg-neutral-950">{isFr ? 'Dès que possible' : 'As soon as possible'}</option>
                    <option value="morning" className="bg-neutral-950">{isFr ? 'Matin' : 'Morning'}</option>
                    <option value="afternoon" className="bg-neutral-950">{isFr ? 'Après-midi' : 'Afternoon'}</option>
                    <option value="evening" className="bg-neutral-950">{isFr ? 'Soir' : 'Evening'}</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={status === 'submitting'}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-950 bg-gradient-to-b from-[#E5C778] via-[#D7B65D] to-[#B89235] hover:brightness-110 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(215,182,93,0.25)] rounded-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
                {status === 'submitting' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{isFr ? 'Envoi…' : 'Sending…'}</>
                ) : (
                  isFr ? 'Me rappeler' : 'Call me back'
                )}
              </button>

              <div className="text-center pt-1">
                <a href={`tel:${CLIENT_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs text-neutral-300 hover:text-white transition-all">
                  <Phone className="w-3.5 h-3.5 text-[#D7B65D]" />
                  <span className="tabular-nums">{isFr ? 'Ou appelez maintenant : ' : 'Or call now: '}{CLIENT_INFO.phone}</span>
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
