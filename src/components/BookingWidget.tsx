import React, { useState } from 'react';
import {
  Car,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plane,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { FORMSUBMIT_EMAIL } from '../config/formConfig';
import { LocationAutocomplete } from './LocationAutocomplete';
import { DatePickerDropdown } from './DatePickerDropdown';
import { TimePickerDropdown } from './TimePickerDropdown';

interface BookingWidgetProps {
  language: 'FR' | 'EN';
  className?: string;
}

export type TripMode = 'transfer' | 'hourly';

const HOUR_OPTIONS = [2, 3, 4, 5, 6, 8, 10, 12];

const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
};

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  language,
  className = '',
}) => {
  const isFr = language === 'FR';

  // Step 1: Trip parameters
  const [mode, setMode] = useState<TripMode>('transfer');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [isPickupAirport, setIsPickupAirport] = useState(false);
  const [flightNumber, setFlightNumber] = useState('');
  const [hours, setHours] = useState(3);
  const [date, setDate] = useState(getTomorrowDate());
  const [time, setTime] = useState('09:30');

  // Step 2: Passenger & vehicle selection
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedVehicle, setSelectedVehicle] = useState('Cadillac Escalade ESV');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Status & feedback
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle step 1 submission ("Afficher les options")
  const handleProceedToOptions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup) {
      setErrorMessage(
        isFr
          ? 'Veuillez renseigner le lieu de prise en charge.'
          : 'Please enter a pickup location.'
      );
      return;
    }
    if (mode === 'transfer' && !dropoff) {
      setErrorMessage(
        isFr
          ? 'Veuillez renseigner le lieu de destination.'
          : 'Please enter a drop-off location.'
      );
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  // Handle final reservation submission
  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const tripSummary =
      mode === 'hourly'
        ? `À disposition ${hours}h (${date} à ${time})`
        : `${pickup} → ${dropoff} (${date} à ${time})`;

    const formData = {
      name,
      email,
      phone,
      type_de_service:
        mode === 'hourly' ? 'Mise à disposition (À l\'heure)' : 'Transfert (Sens unique)',
      lieu_prise_en_charge: pickup,
      ...(mode === 'transfer' ? { lieu_destination: dropoff } : { duree: `${hours} heures` }),
      date_prise_en_charge: date,
      heure_prise_en_charge: time,
      ...(flightNumber ? { numero_vol: flightNumber } : {}),
      vehicule_choisi: selectedVehicle,
      remarques_ou_details: notes || 'Aucune note particulière',
      _subject: `Réservation Limo Raf - ${name} - ${selectedVehicle} (${date})`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erreur lors de la transmission');
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setStatus('error');
      setErrorMessage(
        isFr
          ? 'Impossible d\'envoyer la demande. Vous pouvez nous joindre directement au 514-243-8141.'
          : 'Unable to submit request. Please call us directly at 514-243-8141.'
      );
    }
  };

  const handleReset = () => {
    setStep(1);
    setPickup('');
    setDropoff('');
    setFlightNumber('');
    setIsPickupAirport(false);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setStatus('idle');
  };

  // WhatsApp prefilled message
  const whatsappHref = `https://api.whatsapp.com/send/?phone=${
    CLIENT_INFO.phoneRaw
  }&text=${encodeURIComponent(
    `Bonjour Limo Raf, je souhaite réserver un trajet:\n- Type: ${
      mode === 'transfer' ? 'Transfert' : `À l'heure (${hours}h)`
    }\n- Prise en charge: ${pickup}\n${
      mode === 'transfer' ? `- Destination: ${dropoff}\n` : ''
    }- Date & Heure: ${date} à ${time}\n- Véhicule: ${selectedVehicle}`
  )}`;

  return (
    <div
      id="booking-card"
      className={`relative w-full max-w-[420px] rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-neutral-200 transition-all duration-300
        bg-gradient-to-b from-[#12141A]/90 via-[#0B0D12]/85 to-[#07080A]/95
        backdrop-blur-2xl border border-white/[0.14]
        shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),inset_0_0_24px_rgba(215,182,93,0.04),0_30px_90px_-20px_rgba(0,0,0,0.85)]
        ${className}`}
    >
      {/* Blacklane Concept: Pill Toggles on top */}
      {status !== 'success' && (
        <div className="flex items-center justify-center gap-2 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('transfer');
              if (step === 2) setStep(1);
            }}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              mode === 'transfer'
                ? 'bg-[#D7B65D] text-neutral-950 font-bold shadow-[0_2px_14px_rgba(215,182,93,0.35)] scale-[1.02]'
                : 'bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {isFr ? 'Sens Unique' : 'One Way'}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('hourly');
              if (step === 2) setStep(1);
            }}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              mode === 'hourly'
                ? 'bg-[#D7B65D] text-neutral-950 font-bold shadow-[0_2px_14px_rgba(215,182,93,0.35)] scale-[1.02]'
                : 'bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {isFr ? 'À l\'heure' : 'By the hour'}
          </button>
        </div>
      )}

      {/* SUCCESS CONFIRMATION */}
      {status === 'success' ? (
        <div className="space-y-4 py-3 animate-in fade-in duration-300 text-center">
          <div className="w-14 h-14 rounded-full bg-[#D7B65D]/15 border border-[#D7B65D]/40 text-[#D7B65D] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(215,182,93,0.2)]">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h4 className="font-display text-2xl text-white font-medium">
              {isFr ? 'Demande de réservation confirmée' : 'Booking Request Confirmed'}
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
              {isFr ? (
                <>
                  Merci <strong className="text-white">{name}</strong>. Votre chauffeur pour le{' '}
                  <strong className="text-[#D7B65D]">{selectedVehicle}</strong> est préparé.
                  Confirmation immédiate au{' '}
                  <span className="tabular-nums text-white font-medium">{phone}</span>.
                </>
              ) : (
                <>
                  Thank you <strong className="text-white">{name}</strong>. Your reservation for the{' '}
                  <strong className="text-[#D7B65D]">{selectedVehicle}</strong> has been received.
                  We will confirm shortly at{' '}
                  <span className="tabular-nums text-white font-medium">{phone}</span>.
                </>
              )}
            </p>
          </div>

          {/* Trip summary badge */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-1 my-3">
            <div className="text-[10px] uppercase tracking-wider text-[#D7B65D] font-semibold">
              {isFr ? 'Détails du trajet' : 'Trip Summary'}
            </div>
            <div className="text-white font-medium truncate">📍 {pickup}</div>
            {mode === 'transfer' ? (
              <div className="text-neutral-300 truncate">🏁 {dropoff}</div>
            ) : (
              <div className="text-neutral-300">⏱️ {hours} {isFr ? 'heures' : 'hours'}</div>
            )}
            <div className="text-neutral-400 text-[11px] pt-1">
              🗓️ {date} · ⏰ {time}
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-xl border border-white/15 flex items-center justify-center gap-2 transition-all tabular-nums cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#D7B65D]" />
              <span>{isFr ? `Appeler le chauffeur: ${CLIENT_INFO.phone}` : `Call chauffeur: ${CLIENT_INFO.phone}`}</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {isFr ? 'Nouvelle réservation' : 'Book another ride'}
            </button>
          </div>
        </div>
      ) : step === 1 ? (
        /* STEP 1: BLACKLANE-STYLE SEARCH (Pickup, Dropoff, Date, Time) */
        <form onSubmit={handleProceedToOptions} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl flex items-start gap-2 text-xs text-red-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Pickup Location with Google-style Autocomplete */}
          <LocationAutocomplete
            label={isFr ? 'Lieu de ramassage' : 'Pickup location'}
            value={pickup}
            onChange={(val, isAirport) => {
              setPickup(val);
              setIsPickupAirport(!!isAirport);
            }}
            placeholder={isFr ? 'Adresse, aéroport, hôtel, ...' : 'Address, airport, hotel, ...'}
            isFr={isFr}
            iconType="pickup"
            required
          />

          {/* Flight Number field (Auto-appears when airport is picked) */}
          {isPickupAirport && (
            <div className="animate-in fade-in duration-200">
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#D7B65D] mb-1 font-medium flex items-center gap-1.5">
                <Plane className="w-3 h-3 text-[#D7B65D]" />
                <span>{isFr ? 'N° de vol (optionnel)' : 'Flight number (optional)'}</span>
              </label>
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder={isFr ? 'ex. AC872, AF342, TS501' : 'e.g. AC872, AF342, TS501'}
                className="w-full pl-6 pr-3 py-2 text-[13px] sm:text-sm text-white bg-transparent border-b border-white/15 focus:border-[#D7B65D] rounded-none focus:outline-none placeholder:text-neutral-500 font-normal transition-colors"
              />
            </div>
          )}

          {/* 2. Drop-off Location or Duration */}
          {mode === 'transfer' ? (
            <LocationAutocomplete
              label={isFr ? 'Lieu de dépôt' : 'Drop-off location'}
              value={dropoff}
              onChange={(val) => setDropoff(val)}
              placeholder={isFr ? 'Adresse, aéroport, hôtel, ...' : 'Address, airport, hotel, ...'}
              isFr={isFr}
              iconType="dropoff"
              required
            />
          ) : (
            <div>
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
                {isFr ? 'Durée de la mise à disposition' : 'Duration'}
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-[#D7B65D] absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full pl-6 pr-8 py-2 text-[13px] sm:text-sm text-white bg-transparent border-b border-white/15 focus:border-[#D7B65D] rounded-none appearance-none focus:outline-none cursor-pointer"
                >
                  {HOUR_OPTIONS.map((h) => (
                    <option key={h} value={h} className="bg-[#0C0E14] text-white">
                      {isFr ? `${h} heures de service` : `${h} hours of service`}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {/* 3. Date & Time Row */}
          <div className="grid grid-cols-2 gap-4 pt-1 items-end">
            <DatePickerDropdown
              label={isFr ? 'Date' : 'Date'}
              value={date}
              onChange={setDate}
              isFr={isFr}
            />
            <TimePickerDropdown
              label={isFr ? 'Heure de prise en charge' : 'Pickup time'}
              value={time}
              onChange={setTime}
              isFr={isFr}
            />
          </div>

          {/* Primary CTA: "Afficher les options" matching Screenshot 1 */}
          <button
            type="submit"
            className="w-full mt-3 py-3.5 px-5 text-xs font-bold uppercase tracking-[0.16em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_24px_rgba(215,182,93,0.35)] active:scale-[0.98]"
          >
            <span>{isFr ? 'Afficher les options' : 'View options'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-950" />
          </button>
        </form>
      ) : (
        /* STEP 2: AVAILABLE FLEET VEHICLES & DIRECT CONFIRMATION */
        <form onSubmit={handleSubmitFinal} className="space-y-4 animate-in fade-in duration-200">
          {/* Back button to edit search */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#D7B65D] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isFr ? 'Modifier le trajet' : 'Edit ride'}</span>
            </button>
            <span className="text-[10px] uppercase tracking-wider text-[#D7B65D] font-semibold">
              {isFr ? 'Étape 2 / 2' : 'Step 2 / 2'}
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl flex items-start gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Vehicle Selection Cards */}
          <div>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-2 font-medium">
              {isFr ? 'Véhicule de luxe disponible' : 'Available luxury vehicle'}
            </label>
            <div className="space-y-2">
              {FLEET.map((v) => {
                const isSelected = selectedVehicle === v.name;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVehicle(v.name)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D7B65D]/15 border-[#D7B65D] shadow-[0_0_20px_rgba(215,182,93,0.15)]'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded bg-black/40 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-contain scale-110"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                          <span>{v.name}</span>
                          {v.id === 'cadillac-escalade' && (
                            <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-[#D7B65D]/20 text-[#D7B65D] font-bold">
                              {isFr ? 'Star' : 'Flagship'}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {v.passengers} {isFr ? 'passagers' : 'passengers'} · {v.luggage}{' '}
                          {isFr ? 'bagages' : 'luggage'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#D7B65D] bg-[#D7B65D]'
                          : 'border-white/30'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passenger Information */}
          <div className="space-y-2.5 pt-1">
            {/* Full Name */}
            <div className="relative">
              <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isFr ? 'Nom complet *' : 'Full name *'}
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-white/[0.04] border border-white/12 focus:border-[#D7B65D] rounded-xl focus:outline-none placeholder:text-neutral-500"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={isFr ? 'Téléphone *' : 'Phone *'}
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-white/[0.04] border border-white/12 focus:border-[#D7B65D] rounded-xl focus:outline-none placeholder:text-neutral-500 tabular-nums"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isFr ? 'Courriel *' : 'Email *'}
                className="w-full pl-9 pr-3 py-2 text-xs text-white bg-white/[0.04] border border-white/12 focus:border-[#D7B65D] rounded-xl focus:outline-none placeholder:text-neutral-500"
              />
            </div>
          </div>

          {/* Final Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3.5 px-5 text-xs font-bold uppercase tracking-[0.16em] text-neutral-950 bg-[#D7B65D] hover:bg-[#C4963A] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_24px_rgba(215,182,93,0.35)] active:scale-[0.98] disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isFr ? 'Réservation en cours...' : 'Confirming...'}</span>
              </>
            ) : (
              <span>{isFr ? 'Confirmer la réservation' : 'Confirm reservation'}</span>
            )}
          </button>

          {/* Or instant WhatsApp option */}
          <div className="pt-1 text-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#D7B65D] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>{isFr ? 'Ou réserver directement via WhatsApp' : 'Or book instantly via WhatsApp'}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </form>
      )}
    </div>
  );
};
