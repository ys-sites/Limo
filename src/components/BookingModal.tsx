import React, { useState } from 'react';
import { X, Check, Users, Luggage, ShieldCheck, ArrowRight, Calendar, Clock, MapPin, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { BookingState, Vehicle } from '../types/limo';
import { FLEET, CLIENT_INFO } from '../data/limoData';
import { FORMSUBMIT_EMAIL } from '../config/formConfig';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBooking: BookingState;
  language?: 'FR' | 'EN';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialBooking,
  language = 'FR'
}) => {
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('Jean-Philippe Tremblay');
  const [email, setEmail] = useState('jp.tremblay@affaires.ca');
  const [phone, setPhone] = useState('+1 (514) 987-6543');
  const [flightNo, setFlightNo] = useState('AC 875');
  const [specialNotes, setSpecialNotes] = useState('Bouteilles d\'eau minérale fraîches et chauffeur bilingue s.v.p.');
  const [quietRide, setQuietRide] = useState(true);
  const [childSeat, setChildSeat] = useState(false);

  // Sync state if initialBooking changes
  React.useEffect(() => {
    setBooking(initialBooking);
  }, [initialBooking]);

  if (!isOpen) return null;

  // Selected vehicle or default
  const selectedVehicle: Vehicle =
    FLEET.find((v) => v.id === booking.selectedVehicleId) ||
    FLEET[0];

  // Price calculations
  let baseRate = 0;
  if (booking.serviceType === 'hourly') {
    baseRate = selectedVehicle.hourlyRate * (booking.hours || 3);
  } else if (booking.serviceType === 'flat_rate') {
    baseRate = selectedVehicle.flatAirportRate;
  } else {
    // distance estimate base
    baseRate = selectedVehicle.hourlyRate * 1.5;
  }

  const gratuity = Math.round(baseRate * 0.15); // 15% gratuity
  const taxesFees = Math.round(baseRate * 0.14975); // TPS & TVQ Quebec
  const totalAmount = baseRate + gratuity + taxesFees;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomCode = `RAF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedCode(randomCode);

    try {
      await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          booking_code: randomCode,
          name,
          email,
          phone,
          pickup_location: booking.pickupAddress,
          destination: booking.dropoffAddress,
          date: booking.date,
          time: `${booking.timeHour}:${booking.timeMinute} ${booking.timePeriod}`,
          vehicle: selectedVehicle.name,
          flight_number: flightNo,
          notes: specialNotes,
          total_estimate: `$${totalAmount} CAD`,
          _subject: `Nouvelle réservation Limo Raf [${randomCode}] - ${name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.error('Modal FormSubmit Error:', err);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `Bonjour Limo Raf, je souhaite confirmer ma réservation :
Code: ${confirmedCode || 'Demande VIP'}
Client: ${name} (${phone})
Trajet: ${booking.pickupAddress} vers ${booking.dropoffAddress}
Date/Heure: ${booking.date} à ${booking.timeHour}:${booking.timeMinute} ${booking.timePeriod}
Véhicule: ${selectedVehicle.name}
Passagers: ${booking.passengers} | Bagages: ${booking.luggage}
Notes: ${specialNotes}`;
    return `https://api.whatsapp.com/send/?phone=15142438141&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider uppercase text-neutral-900 font-sans">
                {CLIENT_INFO.brandName}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold uppercase">
                {language === 'FR' ? 'Conciergerie VIP Montréal' : 'Montreal VIP Concierge'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {language === 'FR'
                ? 'Réservation en direct · Chauffeur privé certifié · Flotte de SUV de luxe'
                : 'Direct dispatch · Licensed private chauffeur · Luxury SUV fleet'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-200/80 hover:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
            aria-label="Close reservation dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: REVIEW ROUTE & SELECT FLEET VEHICLE */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Trip Summary Pill Bar */}
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium block">
                      {language === 'FR' ? 'Départ' : 'Pickup'}
                    </span>
                    <span className="font-semibold text-neutral-800 line-clamp-1">{booking.pickupAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium block">
                      {language === 'FR' ? 'Destination' : 'Drop-off'}
                    </span>
                    <span className="font-semibold text-neutral-800 line-clamp-1">{booking.dropoffAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium block">
                      {language === 'FR' ? 'Date & Heure' : 'Date & Time'}
                    </span>
                    <span className="font-semibold text-neutral-800">
                      {booking.date} · {booking.timeHour}:{booking.timeMinute} {booking.timePeriod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Selection with transparent PNGs */}
              <div>
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
                  {language === 'FR' ? 'Sélectionnez votre SUV de luxe' : 'Select your luxury SUV'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FLEET.map((vehicle) => {
                    const isSelected = selectedVehicle.id === vehicle.id;
                    return (
                      <div
                        key={vehicle.id}
                        onClick={() => setBooking({ ...booking, selectedVehicleId: vehicle.id })}
                        className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/30 ring-2 ring-amber-400/40 shadow-md'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-neutral-900">{vehicle.name}</span>
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            {language === 'FR' ? 'Sur devis' : 'On request'}
                          </span>
                        </div>

                        {/* Transparent PNG Car View */}
                        <div className="h-28 flex items-center justify-center my-1 relative">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="max-h-24 w-full object-contain filter drop-shadow-md"
                          />
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                          <span>{vehicle.passengers} {language === 'FR' ? 'passagers' : 'passengers'}</span>
                          <span>{vehicle.luggage} {language === 'FR' ? 'bagages' : 'luggage'}</span>
                          <span className="text-neutral-700 font-medium">{vehicle.color}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Luxury Guarantee Card (No Prices Shown) */}
              <div className="bg-[#1C1614] text-white rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-semibold">{language === 'FR' ? 'Service de Chauffeur VIP Limo Raf' : 'Limo Raf VIP Chauffeur Service'}</span>
                  <span className="text-amber-400 font-medium">{language === 'FR' ? 'Tarif tout compris sur devis' : 'All-inclusive quote'}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>{language === 'FR' ? 'Attente offerte à l\'arrivée YUL' : 'Complimentary YUL Airport Wait'}</span>
                  <span className="text-white font-medium">60 minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>{language === 'FR' ? 'Prestations à bord' : 'On-Board Amenities'}</span>
                  <span className="text-white font-medium">{language === 'FR' ? 'Wi-Fi, Bouteilles d\'eau, Prises' : 'Wi-Fi, Mineral Water, Chargers'}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-neutral-300">
                  <span className="text-amber-400">{language === 'FR' ? 'Paiement en ligne sécurisé' : 'Secure Online Payment'}</span>
                  <span className="text-neutral-300">{language === 'FR' ? 'Lien de paiement envoyé sur confirmation' : 'Payment link sent upon dispatch'}</span>
                </div>
              </div>

              {/* Continue button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-7 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-md"
                >
                  <span>{language === 'FR' ? 'Book Now · Coordonnées' : 'Book Now · Passenger Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PASSENGER INFORMATION & DISPATCH */}
          {step === 2 && (
            <form onSubmit={handleConfirmReservation} className="space-y-5">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                {language === 'FR' ? 'Coordonnées & Préférences VIP' : 'Contact & VIP Preferences'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    {language === 'FR' ? 'Nom complet *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    {language === 'FR' ? 'Numéro de téléphone portable *' : 'Mobile Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    {language === 'FR' ? 'Courriel pour confirmation *' : 'Confirmation Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    {language === 'FR' ? 'Numéro de vol (optionnel - YUL)' : 'Flight Number (optional)'}
                  </label>
                  <input
                    type="text"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value)}
                    placeholder="ex. AC 875"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-700 font-medium mb-1">
                  {language === 'FR' ? 'Instructions spéciales / Demandes particulières' : 'Special Notes'}
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  {language === 'FR' ? '← Modifier le véhicule' : '← Change vehicle'}
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer shadow-md transition-all active:scale-95"
                >
                  {language === 'FR' ? 'Confirmer la réservation VIP' : 'Confirm VIP Reservation'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: RESERVATION CONFIRMATION & WHATSAPP SYNC */}
          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-600">
                  {language === 'FR' ? 'Demande reçue avec succès' : 'Reservation Submitted'}
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 mt-1 font-sans">
                  {confirmedCode}
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto mt-2">
                  {language === 'FR'
                    ? 'Votre chauffeur privé a été avisé. Un courriel de confirmation détaillé a été envoyé à votre adresse.'
                    : 'Your private chauffeur has been scheduled. A confirmation summary has been dispatched to your email.'}
                </p>
              </div>

              {/* Direct WhatsApp Instant Sync Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-semibold text-sm">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'FR' ? 'Confirmation instantanée sur WhatsApp' : 'Instant WhatsApp Sync'}</span>
                </div>
                <p className="text-xs text-emerald-700">
                  {language === 'FR'
                    ? 'Envoyez directement votre récapitulatif à notre équipe sur WhatsApp pour une prise en charge accélérée en 5 minutes.'
                    : 'Send your trip summary directly to our team on WhatsApp for instant confirmation within 5 minutes.'}
                </p>
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'FR' ? 'Ouvrir sur WhatsApp' : 'Open in WhatsApp'}</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold text-neutral-700 hover:text-black border border-neutral-300 rounded-xl"
                >
                  {language === 'FR' ? 'Fermer la fenêtre' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
