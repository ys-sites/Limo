import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Clock, ChevronDown, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { BookingState } from '../types/limo';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { FORMSUBMIT_EMAIL } from '../config/formConfig';

interface BookingWidgetProps {
  language: 'FR' | 'EN';
  onReserve?: (booking: BookingState) => void;
  className?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  language,
  onReserve,
  className = ''
}) => {
  // Client contact input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Trip details (clean, open text inputs without restrictive preset dropdowns)
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip'>('One Way');

  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('PM');
  const [selectedVehicle, setSelectedVehicle] = useState('Cadillac Escalade ESV');

  // Form submission state
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formattedTime = `${hour}:${minute} ${period}`;

    // Payload for FormSubmit
    const formData = {
      name,
      email,
      phone,
      pickup_location: pickupAddress,
      destination: dropoffAddress,
      trip_type: tripType,
      date,
      time: formattedTime,
      preferred_vehicle: selectedVehicle,
      _subject: `Nouvelle réservation Limo Raf - ${name} (${date} à ${formattedTime})`,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      // Post to FormSubmit via AJAX endpoint
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
        if (onReserve) {
          onReserve({
            serviceType: 'distance',
            pickupAddress,
            dropoffAddress,
            tripType: tripType === 'One Way' ? 'one_way' : 'round_trip',
            date,
            timeHour: hour,
            timeMinute: minute,
            timePeriod: period,
            selectedVehicleId: 'cadillac-escalade',
            passengers: 2,
            luggage: 2
          });
        }
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erreur lors de la transmission');
      }
    } catch (err: any) {
      console.error('FormSubmit Error:', err);
      // If network fails, still give the user a graceful path
      setStatus('error');
      setErrorMessage(
        language === 'FR'
          ? "Impossible d'envoyer la demande pour le moment. Veuillez réessayer ou utiliser WhatsApp direct."
          : "Unable to submit reservation. Please retry or contact us directly on WhatsApp."
      );
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPickupAddress('');
    setDropoffAddress('');
    setStatus('idle');
  };

  const generateWhatsAppConfirmationUrl = () => {
    const text = `Bonjour Limo Raf, je viens de soumettre une réservation :
Nom: ${name}
Téléphone: ${phone}
Courriel: ${email}
Départ: ${pickupAddress}
Destination: ${dropoffAddress}
Type: ${tripType}
Date: ${date} à ${hour}:${minute} ${period}
Véhicule: ${selectedVehicle}`;
    return `https://api.whatsapp.com/send/?phone=15142438141&text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[380px] sm:max-w-[410px] text-neutral-800 border border-neutral-100 ${className}`}
    >
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            {language === 'FR' ? 'Réservation Directe' : 'Direct Reservation'}
          </span>
          <span className="text-[11px] text-neutral-400 font-medium">
            24/7 Montréal
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight mt-1 font-sans">
          {language === 'FR' ? 'Réserver votre chauffeur' : 'Book Your Chauffeur'}
        </h3>
        <p className="text-[11px] text-neutral-500 font-light">
          {language === 'FR'
            ? 'Tarifs fixes tout compris · Confirmation rapide'
            : 'All-inclusive fixed rates · Quick confirmation'}
        </p>
      </div>

      {status === 'success' ? (
        /* Success Confirmation View */
        <div className="space-y-4 py-2 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-base font-bold text-neutral-900">
              {language === 'FR' ? 'Demande reçue avec succès !' : 'Request Received Successfully!'}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {language === 'FR' ? (
                <>
                  Merci <strong className="text-neutral-900">{name}</strong>. Votre demande de chauffeur a bien été transmise à notre équipe. Nous vous contacterons à <span className="font-semibold">{phone}</span> pour confirmer votre prise en charge.
                </>
              ) : (
                <>
                  Thank you <strong className="text-neutral-900">{name}</strong>. Your chauffeur request has been sent to our dispatch. We will contact you at <span className="font-semibold">{phone}</span> to confirm your pickup.
                </>
              )}
            </p>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-[11px] space-y-1 text-neutral-600">
            <div><strong className="text-neutral-800">{language === 'FR' ? 'Trajet :' : 'Route:'}</strong> {pickupAddress} → {dropoffAddress}</div>
            <div><strong className="text-neutral-800">{language === 'FR' ? 'Date :' : 'Date:'}</strong> {date} à {hour}:{minute} {period}</div>
            <div><strong className="text-neutral-800">{language === 'FR' ? 'Véhicule :' : 'Vehicle:'}</strong> {selectedVehicle}</div>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={generateWhatsAppConfirmationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'FR' ? 'Confirmer sur WhatsApp Direct' : 'Confirm on WhatsApp Direct'}</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 px-3 text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'FR' ? 'Nouvelle réservation' : 'New Reservation'}
            </button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {status === 'error' && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-[11px] text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="relative">
            <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'FR' ? 'Votre nom complet *' : 'Full Name *'}
              className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
            />
          </div>

          {/* Email & Phone side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'FR' ? 'Courriel *' : 'Email Address *'}
                className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
              />
            </div>

            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={language === 'FR' ? 'Téléphone *' : 'Phone Number *'}
                className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
              />
            </div>
          </div>

          {/* Pickup Address - Free text input without presets */}
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              name="pickup_location"
              required
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder={
                language === 'FR'
                  ? 'Lieu de départ (ex. YUL Aéroport, hôtel, adresse) *'
                  : 'Pick-up location (e.g. YUL Airport, hotel, address) *'
              }
              className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
            />
          </div>

          {/* Destination Address - Free text input without presets */}
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-amber-600 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              name="destination"
              required
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              placeholder={
                language === 'FR'
                  ? 'Destination (ex. Centre-Ville, Laval, Tremblant) *'
                  : 'Drop-off destination (e.g. Downtown, Laval, Tremblant) *'
              }
              className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
            />
          </div>

          {/* Trip Type & Date in 2 columns */}
          <div className="grid grid-cols-2 gap-2">
            {/* One Way / Round Trip */}
            <div className="relative">
              <select
                name="trip_type"
                value={tripType}
                onChange={(e) => setTripType(e.target.value as 'One Way' | 'Round Trip')}
                className="w-full px-3 py-2 text-xs text-neutral-800 bg-neutral-50/90 border border-neutral-200 rounded-lg appearance-none focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="One Way">{language === 'FR' ? 'Aller Simple' : 'One Way'}</option>
                <option value="Round Trip">{language === 'FR' ? 'Aller-Retour' : 'Round Trip'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Date Picker */}
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="date"
                name="date"
                required
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-xs text-neutral-800 bg-neutral-50/90 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          {/* Departure Time & Vehicle Choice */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            {/* Pick Up Time */}
            <div className="flex items-center gap-1 bg-neutral-50/90 border border-neutral-200 rounded-lg px-2 py-1.5">
              <Clock className="w-3 h-3 text-neutral-400 shrink-0" />
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="text-xs bg-transparent focus:outline-none font-mono cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <span className="text-neutral-400 text-xs">:</span>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="text-xs bg-transparent focus:outline-none font-mono cursor-pointer"
              >
                {['00', '15', '30', '45'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')}
                className="text-[11px] font-semibold bg-transparent focus:outline-none cursor-pointer text-amber-700 ml-auto"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* Preferred Fleet Choice */}
            <div className="relative">
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full px-2.5 py-2 text-[11px] text-neutral-800 bg-neutral-50/90 border border-neutral-200 rounded-lg appearance-none focus:outline-none focus:border-amber-500 cursor-pointer truncate"
              >
                {FLEET.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* FormSubmit Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full mt-2 py-3 px-4 text-xs font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.99] rounded-lg transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{language === 'FR' ? 'Envoi en cours...' : 'Submitting...'}</span>
              </>
            ) : (
              <span>{language === 'FR' ? 'Confirmer la réservation' : 'Confirm Reservation'}</span>
            )}
          </button>

          {/* Direct WhatsApp Callout */}
          <a
            href={CLIENT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-emerald-600" />
            <span>{language === 'FR' ? 'Réserver via WhatsApp Direct' : 'Instant WhatsApp Booking'}</span>
          </a>
        </form>
      )}
    </div>
  );
};
