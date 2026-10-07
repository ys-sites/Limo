import React, { useState } from 'react';
import { User, Mail, Phone, Car, ChevronDown, CheckCircle2, AlertCircle, Loader2, FileText } from 'lucide-react';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { FORMSUBMIT_EMAIL } from '../config/formConfig';

interface BookingWidgetProps {
  language: 'FR' | 'EN';
  className?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  language,
  className = ''
}) => {
  const isFr = language === 'FR';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('Cadillac Escalade ESV');
  const [notes, setNotes] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = {
      name,
      email,
      phone,
      preferred_vehicle: selectedVehicle,
      message_or_notes: notes || 'Aucune note particulière',
      _subject: `Demande de réservation Limo Raf - ${name} (${selectedVehicle})`,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erreur lors de la transmission');
      }
    } catch (err: any) {
      console.error('FormSubmit Error:', err);
      setStatus('error');
      setErrorMessage(
        isFr
          ? "Impossible d'envoyer la demande pour le moment. Vous pouvez nous joindre directement au 514-243-8141."
          : "Unable to submit request at this time. Please call us directly at 514-243-8141."
      );
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setStatus('idle');
  };

  return (
    <div
      className={`bg-[#0C0E12]/70 backdrop-blur-2xl rounded-none border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_80px_-20px_rgba(0,0,0,0.8)] p-6 sm:p-7 w-full max-w-[390px] sm:max-w-[410px] text-neutral-200 ${className}`}
    >
      {/* Header */}
      <div className="mb-5 pb-4 border-b border-neutral-800/80">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D7B65D]">
            {isFr ? 'Réservation directe' : 'Direct booking'}
          </span>
          <span className="text-[11px] text-neutral-500 tabular-nums">
            24/7
          </span>
        </div>
        <h3 className="font-display text-2xl font-medium text-white tracking-tight">
          {isFr ? 'Réserver un chauffeur' : 'Book your chauffeur'}
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          {isFr
            ? 'Prise en charge ponctuelle · Aucun frais caché'
            : 'Punctual dispatch · No hidden fees'}
        </p>
      </div>

      {status === 'success' ? (
        <div className="space-y-4 py-2 animate-in fade-in duration-300">
          <div className="w-10 h-10 rounded-full bg-[#D7B65D]/15 text-[#D7B65D] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div className="text-center space-y-1.5">
            <h4 className="font-display text-xl text-white font-medium">
              {isFr ? 'Demande reçue' : 'Request received'}
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {isFr ? (
                <>
                  Merci <strong className="text-white">{name}</strong>. Votre demande pour le{' '}
                  <strong className="text-[#D7B65D]">{selectedVehicle}</strong> a bien été enregistrée.
                  On vous rappelle rapidement au <span className="tabular-nums text-white font-medium">{phone}</span> pour confirmer.
                </>
              ) : (
                <>
                  Thank you <strong className="text-white">{name}</strong>. Your request for the{' '}
                  <strong className="text-[#D7B65D]">{selectedVehicle}</strong> has been received.
                  We will call you shortly at <span className="tabular-nums text-white font-medium">{phone}</span> to confirm.
                </>
              )}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="w-full py-2.5 px-3 text-xs text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 flex items-center justify-center gap-2 transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#D7B65D]" />
              <span>{isFr ? `Une question ? ${CLIENT_INFO.phone}` : `Questions? Call ${CLIENT_INFO.phone}`}</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
            >
              {isFr ? 'Nouvelle demande' : 'New request'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {status === 'error' && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-none flex items-start gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
              {isFr ? 'Nom complet *' : 'Full name *'}
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isFr ? 'Alexandre Tremblay' : 'John Smith'}
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-neutral-900/80 border border-neutral-800 focus:outline-none focus:border-[#D7B65D] placeholder:text-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
              {isFr ? 'Courriel *' : 'Email *'}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@entreprise.com"
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-neutral-900/80 border border-neutral-800 focus:outline-none focus:border-[#D7B65D] placeholder:text-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
              {isFr ? 'Téléphone *' : 'Phone *'}
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 514 000-0000"
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-neutral-900/80 border border-neutral-800 focus:outline-none focus:border-[#D7B65D] placeholder:text-neutral-600 transition-colors tabular-nums"
              />
            </div>
          </div>

          {/* Preferred Vehicle */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
              {isFr ? 'Véhicule souhaité *' : 'Preferred vehicle *'}
            </label>
            <div className="relative">
              <Car className="w-3.5 h-3.5 text-[#D7B65D] absolute left-3 top-3 pointer-events-none" />
              <select
                name="vehicle"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs text-white bg-neutral-900/80 border border-neutral-800 appearance-none focus:outline-none focus:border-[#D7B65D] cursor-pointer"
              >
                {FLEET.map((v) => (
                  <option key={v.id} value={v.name} className="bg-neutral-950 text-white">
                    {v.name} ({isFr ? v.categoryLabelFr : v.categoryLabelEn})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Trip Details / Notes */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1">
              {isFr ? 'Détails du trajet (optionnel)' : 'Trip details (optional)'}
            </label>
            <div className="relative">
              <FileText className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isFr ? 'ex. YUL Trudeau, vol AC872, 14 h' : 'e.g. YUL airport, flight AC872, 2 PM'}
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-neutral-900/80 border border-neutral-800 focus:outline-none focus:border-[#D7B65D] placeholder:text-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Solid Primary Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full mt-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
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
      )}
    </div>
  );
};
