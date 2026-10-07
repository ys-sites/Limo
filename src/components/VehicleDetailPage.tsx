import React, { useState } from 'react';
import { 
  ArrowLeft, Check, Users, Luggage, ShieldCheck, 
  Sparkles, Calendar, Clock, MapPin, MessageSquare, 
  Phone, User, Mail, Wifi, VolumeX, Car, ChevronRight,
  ExternalLink, Loader2, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Vehicle } from '../types/limo';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { FORMSUBMIT_EMAIL, ONLINE_PAYMENT_URL } from '../config/formConfig';

interface VehicleDetailPageProps {
  vehicle: Vehicle;
  language: 'FR' | 'EN';
  onBack: () => void;
  onSelectOtherVehicle: (slug: string) => void;
}

export const VehicleDetailPage: React.FC<VehicleDetailPageProps> = ({
  vehicle,
  language,
  onBack,
  onSelectOtherVehicle
}) => {
  // Gallery active photo
  const allImages = [
    vehicle.image,
    ...(vehicle.galleryImages || [])
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form states for booking quote on this specific vehicle
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip'>('One Way');
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('12:00 PM');
  const [specialNotes, setSpecialNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          vehicle: vehicle.name,
          name,
          email,
          phone,
          pickup_location: pickupAddress,
          destination: dropoffAddress,
          trip_type: tripType,
          date,
          time,
          special_notes: specialNotes,
          _subject: `Demande de réservation ${vehicle.name} - ${name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Erreur de transmission');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        language === 'FR'
          ? "Impossible d'envoyer la demande. Veuillez nous joindre directement via WhatsApp."
          : "Unable to send quote request. Please reach out to us via WhatsApp."
      );
    }
  };

  const generateWhatsAppUrl = () => {
    const text = `Bonjour Limo Raf, je souhaite réserver le ${vehicle.name} :
Nom: ${name || 'Client VIP'}
Téléphone: ${phone || 'À confirmer'}
Départ: ${pickupAddress || 'Montréal / YUL'}
Destination: ${dropoffAddress || 'À confirmer'}
Date: ${date} (${time})`;
    return `https://api.whatsapp.com/send/?phone=15142438141&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-24 pb-20">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{language === 'FR' ? 'Retour à la flotte' : 'Back to Fleet'}</span>
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{language === 'FR' ? 'Accueil' : 'Home'}</span>
            <ChevronRight className="w-3 h-3" />
            <button onClick={onBack} className="hover:text-neutral-700 cursor-pointer">
              {language === 'FR' ? 'Flotte' : 'Fleet'}
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-900 font-medium">{vehicle.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Visuals & Vehicle Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left: Images Showcase */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Featured Image Display */}
            <div className="relative bg-neutral-900 rounded-3xl p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden border border-neutral-800 shadow-xl group">
              {/* Subtle ambient luxury backdrop */}
              <div className="absolute inset-0 bg-radial from-neutral-800/60 to-black/90 pointer-events-none" />

              <img
                src={allImages[activeImageIndex] || vehicle.image}
                alt={`${vehicle.name} Limo Raf Montréal`}
                className="relative z-10 max-h-[360px] w-auto max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transition-all duration-500"
              />

              {/* Tag pill */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-bold tracking-wider uppercase">
                  {language === 'FR' ? vehicle.categoryLabelFr : vehicle.categoryLabelEn}
                </span>
              </div>
            </div>

            {/* Thumbnails Row */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-video bg-neutral-100 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-amber-500 scale-98 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${vehicle.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Vehicle Overview & Quick Booking Form */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {language === 'FR' ? 'Véhicule de Prestige' : 'Flagship Vehicle'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-1 font-sans">
                {vehicle.name}
              </h1>
              <p className="text-sm text-neutral-600 mt-2 font-light leading-relaxed">
                {language === 'FR' ? vehicle.taglineFr : vehicle.taglineEn}
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-neutral-700">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm">{vehicle.passengers}</span>
                </div>
                <span className="text-[11px] text-neutral-500 block">
                  {language === 'FR' ? 'Passagers max' : 'Max passengers'}
                </span>
              </div>

              <div className="space-y-1 border-x border-neutral-200">
                <div className="flex items-center justify-center gap-1 text-neutral-700">
                  <Luggage className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm">{vehicle.luggage}</span>
                </div>
                <span className="text-[11px] text-neutral-500 block">
                  {language === 'FR' ? 'Grands bagages' : 'Luggage pieces'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-neutral-700">
                  <Wifi className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm">4G/5G</span>
                </div>
                <span className="text-[11px] text-neutral-500 block">
                  {language === 'FR' ? 'Wi-Fi inclus' : 'Wi-Fi included'}
                </span>
              </div>
            </div>

            {/* Booking / Payment Action Card */}
            <div className="p-6 bg-neutral-900 text-white rounded-3xl space-y-4 shadow-xl border border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {language === 'FR' ? 'Tarif tout compris' : 'All-Inclusive Rates'}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'FR' ? 'Réserver ce véhicule' : 'Book this vehicle'}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'FR' ? 'Disponible 24/7' : 'Available 24/7'}</span>
                </div>
              </div>

              {/* Ready "Book Now" Button (Links to ONLINE_PAYMENT_URL if set, or scrolls to booking form) */}
              {ONLINE_PAYMENT_URL ? (
                <a
                  href={ONLINE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
                >
                  <span>{language === 'FR' ? 'Book Now · Paiement en ligne' : 'Book Now · Online Payment'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="#vehicle-reservation"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#E4A836] hover:bg-[#d59929] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
                >
                  <span>{language === 'FR' ? 'Book Now · Demander une soumission' : 'Book Now · Request a Quote'}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              )}

              {/* Direct WhatsApp Quote Button */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>{language === 'FR' ? 'Réserver via WhatsApp Direct' : 'Direct WhatsApp Reservation'}</span>
              </a>

              <p className="text-[11px] text-neutral-400 text-center font-light pt-1">
                {language === 'FR'
                  ? 'Tarifs fixes · 60 min attente gratuite aéroport YUL · Chauffeur certifié'
                  : 'Fixed rates · 60 min complimentary YUL wait time · Licensed chauffeur'}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Vehicle Features & Editorial Sections extracted from limoraf.com */}
        <div className="mb-20 space-y-12">
          {/* Section Heading */}
          <div className="border-b border-neutral-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              {language === 'FR' ? 'Description détaillée' : 'Detailed Specifications'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1 font-sans">
              {language === 'FR' ? `L'expérience à bord du ${vehicle.name}` : `The ${vehicle.name} Experience`}
            </h2>
          </div>

          {/* Editorial Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicle.detailSections.map((sec, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {language === 'FR' ? sec.titleFr : sec.titleEn}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  {language === 'FR' ? sec.contentFr : sec.contentEn}
                </p>
              </div>
            ))}
          </div>

          {/* Key Features Checklist */}
          <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
              {language === 'FR' ? 'Équipements & Commodités de série' : 'Standard In-Cabin Amenities'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(language === 'FR' ? vehicle.featuresFr : vehicle.featuresEn).map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-300 font-light">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services Offered In This Vehicle (Directly from limoraf.com) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F8F8] border border-neutral-200">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-6 uppercase tracking-wider text-xs font-sans">
              {language === 'FR' ? 'SERVICES OFFERTS AVEC CE VÉHICULE' : 'SERVICES OFFERED IN THIS VEHICLE'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(language === 'FR' ? vehicle.servicesOfferedFr : vehicle.servicesOfferedEn).map((srv, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-800 leading-snug">
                    {srv}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Booking / Quote Form Section for this vehicle */}
        <div id="vehicle-reservation" className="max-w-3xl mx-auto scroll-mt-24 mb-20">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-10">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                {language === 'FR' ? 'Formulaire de réservation' : 'Reservation Form'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                {language === 'FR' ? `Réserver le ${vehicle.name}` : `Book the ${vehicle.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 font-light">
                {language === 'FR'
                  ? 'Transmettez votre itinéraire pour recevoir votre confirmation et prise en charge immédiate.'
                  : 'Submit your itinerary to receive immediate dispatch confirmation.'}
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {language === 'FR' ? 'Demande envoyée avec succès !' : 'Quote Request Sent!'}
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  {language === 'FR'
                    ? `Merci ${name}. Votre demande pour le ${vehicle.name} a été transmise à notre répartiteur. Nous vous contacterons à ${phone} sous peu.`
                    : `Thank you ${name}. Your reservation request for ${vehicle.name} has been received. We will contact you at ${phone} shortly.`}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'FR' ? 'Confirmer sur WhatsApp' : 'Confirm on WhatsApp'}</span>
                  </a>
                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-300 text-neutral-700 hover:text-black text-xs font-semibold"
                  >
                    {language === 'FR' ? 'Nouvelle soumission' : 'New Quote'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'FR' ? 'Nom complet *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'FR' ? 'ex. Alexandre Tremblay' : 'e.g. John Smith'}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Courriel *' : 'Email Address *'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@exemple.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Téléphone mobile *' : 'Phone Number *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (514) 000-0000"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Lieu de prise en charge *' : 'Pick-up Location *'}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="text"
                        name="pickup"
                        required
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder={language === 'FR' ? 'Adresse ou Aéroport YUL' : 'Address or YUL Airport'}
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Destination *' : 'Drop-off Destination *'}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-amber-600 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="text"
                        name="dropoff"
                        required
                        value={dropoffAddress}
                        onChange={(e) => setDropoffAddress(e.target.value)}
                        placeholder={language === 'FR' ? 'Adresse, Ville, Hôtel' : 'Address, City, Hotel'}
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Trip Type & Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Type de trajet' : 'Trip Type'}
                    </label>
                    <select
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none"
                    >
                      <option value="One Way">{language === 'FR' ? 'Aller Simple' : 'One Way'}</option>
                      <option value="Round Trip">{language === 'FR' ? 'Aller-Retour' : 'Round Trip'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Date de départ *' : 'Departure Date *'}
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'FR' ? 'Heure souhaitée' : 'Pickup Time'}
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="12:00 PM"
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'FR' ? 'Demandes particulières (optionnel)' : 'Special Requests (optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder={
                      language === 'FR'
                        ? 'Numéro de vol, siège bébé, bouteilles fraîches...'
                        : 'Flight number, child seat, special refreshments...'
                    }
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Submit button: Book Now */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'FR' ? 'Envoi en cours...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <span>{language === 'FR' ? `Book Now · Réserver le ${vehicle.name}` : `Book Now · Reserve ${vehicle.name}`}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Other Fleet Options Bar */}
        <div className="border-t border-neutral-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-neutral-900">
              {language === 'FR' ? 'Découvrir nos autres véhicules' : 'Explore Other Vehicles'}
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 cursor-pointer"
            >
              {language === 'FR' ? 'Voir toute la flotte →' : 'View all fleet →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET.filter((v) => v.id !== vehicle.id).map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  onSelectOtherVehicle(other.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-neutral-50 hover:bg-neutral-100/90 rounded-2xl p-5 border border-neutral-200/80 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="h-32 flex items-center justify-center mb-3">
                  <img
                    src={other.image}
                    alt={other.name}
                    className="max-h-28 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-bold text-neutral-900">{other.name}</h4>
                <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
                  {language === 'FR' ? other.categoryLabelFr : other.categoryLabelEn} · {other.passengers} {language === 'FR' ? 'passagers' : 'passengers'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
