import React, { useState } from 'react';
import { User, Mail, Phone, Car, ChevronDown, CheckCircle2, MessageSquare, AlertCircle, Loader2, FileText } from 'lucide-react';
import { BookingState } from '../types/limo';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { FORMSUBMIT_EMAIL, ONLINE_PAYMENT_URL } from '../config/formConfig';

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
  const [selectedVehicle, setSelectedVehicle] = useState('Cadillac Escalade ESV');
  const [notes, setNotes] = useState('');

  // Form submission state
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Payload for FormSubmit
    const formData = {
      name,
      email,
      phone,
      preferred_vehicle: selectedVehicle,
      message_or_notes: notes || 'Aucune note particulière',
      _subject: `Nouvelle réservation Limo Raf - ${name} (${selectedVehicle})`,
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
            pickupAddress: 'Montréal / YUL',
            dropoffAddress: 'Destination demandée',
            tripType: 'one_way',
            date: new Date().toISOString().split('T')[0],
            timeHour: '12',
            timeMinute: '00',
            timePeriod: 'PM',
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
      setStatus('error');
      setErrorMessage(
        language === 'FR'
          ? "Impossible d'envoyer la demande pour le moment. Veuillez nous contacter via WhatsApp."
          : "Unable to submit reservation. Please reach out to us via WhatsApp."
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

  const generateWhatsAppConfirmationUrl = () => {
    const text = `Bonjour Limo Raf, je souhaite réserver un véhicule :
Nom: ${name}
Téléphone: ${phone}
Courriel: ${email}
Véhicule: ${selectedVehicle}${notes ? `\nNotes: ${notes}` : ''}`;
    return `https://api.whatsapp.com/send/?phone=15142438141&text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[380px] sm:max-w-[400px] text-neutral-800 border border-neutral-100 ${className}`}
    >
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
            {language === 'FR' ? 'Réservation Directe' : 'Direct Booking'}
          </span>
          <span className="text-[11px] text-neutral-400 font-medium">
            24/7 Grand Montréal
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight mt-1.5 font-sans">
          {language === 'FR' ? 'Réserver votre chauffeur' : 'Book Your Chauffeur'}
        </h3>
        <p className="text-[11px] text-neutral-500 font-light mt-0.5">
          {language === 'FR'
            ? 'Tarifs fixes tout compris · Prise en charge VIP rapide'
            : 'All-inclusive fixed rates · Rapid VIP dispatch'}
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
                  Merci <strong className="text-neutral-900">{name}</strong>. Votre réservation pour le <strong className="text-amber-700">{selectedVehicle}</strong> a été transmise à notre répartiteur. Nous vous contacterons à <span className="font-semibold text-neutral-900">{phone}</span> pour confirmer votre prise en charge.
                </>
              ) : (
                <>
                  Thank you <strong className="text-neutral-900">{name}</strong>. Your chauffeur request for the <strong className="text-amber-700">{selectedVehicle}</strong> has been dispatched. We will contact you at <span className="font-semibold text-neutral-900">{phone}</span> to confirm your booking.
                </>
              )}
            </p>
          </div>

          <div className="space-y-2 pt-2">
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
        /* Streamlined Reservation Form */
        <form onSubmit={handleSubmit} className="space-y-3">
          {status === 'error' && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-[11px] text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              {language === 'FR' ? 'Nom complet *' : 'Full Name *'}
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'FR' ? 'ex. Alexandre Tremblay' : 'e.g. John Smith'}
                className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              {language === 'FR' ? 'Courriel *' : 'Email Address *'}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@courriel.com"
                className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              {language === 'FR' ? 'Numéro de téléphone *' : 'Phone Number *'}
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (514) 000-0000"
                className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
              />
            </div>
          </div>

          {/* Type of Car (Kept as requested) */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              {language === 'FR' ? 'Type de véhicule souhaité *' : 'Preferred Vehicle *'}
            </label>
            <div className="relative">
              <Car className="w-3.5 h-3.5 text-amber-600 absolute left-3 top-3 pointer-events-none" />
              <select
                name="vehicle"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs text-neutral-900 bg-neutral-50/90 border border-neutral-200 rounded-lg appearance-none focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
              >
                {FLEET.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name} ({language === 'FR' ? v.categoryLabelFr : v.categoryLabelEn})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Optional Message or Details */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
              {language === 'FR' ? 'Détails du trajet ou message (optionnel)' : 'Trip details or notes (optional)'}
            </label>
            <div className="relative">
              <FileText className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'FR' ? 'ex. YUL Aéroport, départ 14h, 3 passagers' : 'e.g. YUL airport, 2 PM, 3 passengers'}
                className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 bg-neutral-50/90 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-neutral-400 transition-colors"
              />
            </div>
          </div>

          {/* Book Now Button */}
          {ONLINE_PAYMENT_URL ? (
            <a
              href={ONLINE_PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 py-3 px-4 text-xs font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.99] rounded-lg transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>{language === 'FR' ? 'Book Now · Paiement en ligne' : 'Book Now · Online Checkout'}</span>
            </a>
          ) : (
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
                <span>{language === 'FR' ? 'Book Now · Réserver' : 'Book Now · Reserve'}</span>
              )}
            </button>
          )}

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
