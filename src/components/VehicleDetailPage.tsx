import React, { useState } from 'react';
import { 
  ArrowLeft, Check, Users, Luggage, ShieldCheck, 
  MessageSquare, User, Mail, Phone, Wifi, ChevronRight,
  ExternalLink, Loader2, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { Vehicle } from '../types/limo';
import { CLIENT_INFO, FLEET } from '../data/limoData';
import { FORMSUBMIT_EMAIL, ONLINE_PAYMENT_URL } from '../config/formConfig';
import { ShinyText } from './ui/ShinyText';

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
  // Only use real client photography from limoraf.com
  const allImages = (vehicle.galleryImages && vehicle.galleryImages.length > 0)
    ? vehicle.galleryImages
    : [vehicle.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Streamlined form states (Name, Email, Phone, Notes)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
          _subject: `Nouvelle Réservation Limo Raf : ${vehicle.name}`,
          _template: 'table',
          véhicule: vehicle.name,
          nom: name,
          courriel: email,
          téléphone: phone,
          notes_trajet: specialNotes || 'Aucune note spécifique'
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSpecialNotes('');
    } catch {
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
Courriel: ${email || 'À confirmer'}${specialNotes ? `\nNotes: ${specialNotes}` : ''}`;
    return `https://api.whatsapp.com/send/?phone=15142438141&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#ECE7DE] text-neutral-900 pt-24 pb-20">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300/80 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{language === 'FR' ? 'Retour à la flotte' : 'Back to Fleet'}</span>
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-600">
            <span>{language === 'FR' ? 'Accueil' : 'Home'}</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <button onClick={onBack} className="hover:text-black cursor-pointer">
              {language === 'FR' ? 'Flotte' : 'Fleet'}
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-[#C4963A] font-bold">{vehicle.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Visuals & Vehicle Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Left: Real Client Photography Showcase */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Featured Real Photo Display */}
            <div className="relative bg-white rounded-3xl overflow-hidden border border-neutral-300/80 shadow-xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group">
              <img
                src={allImages[activeImageIndex]}
                alt={`${vehicle.name} Limo Raf Montréal`}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              />

              {/* Tag pill */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3.5 py-1 rounded-full bg-[#D7B65D] text-neutral-950 text-[10px] font-bold tracking-wider uppercase shadow-md">
                  {language === 'FR' ? vehicle.categoryLabelFr : vehicle.categoryLabelEn}
                </span>
              </div>
            </div>

            {/* Thumbnails Row of Real Photography */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden aspect-video bg-white border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#D7B65D] scale-98 shadow-md ring-2 ring-[#D7B65D]/40'
                        : 'border-transparent opacity-75 hover:opacity-100'
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

          {/* Right: Vehicle Identity & Booking Action */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4963A]">
                {language === 'FR' ? 'Véhicule de Prestige' : 'Flagship Vehicle'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1 font-sans">
                <ShinyText
                  text={vehicle.name}
                  color="#171717"
                  shineColor="#D7B65D"
                  speed={3}
                />
              </h1>
              <p className="text-sm text-neutral-700 mt-2 font-normal leading-relaxed">
                {language === 'FR' ? vehicle.taglineFr : vehicle.taglineEn}
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-neutral-300/80 text-center shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-neutral-900">
                  <Users className="w-4 h-4 text-[#C4963A]" />
                  <span className="font-bold text-sm">{vehicle.passengers}</span>
                </div>
                <span className="text-[11px] text-neutral-600 block">
                  {language === 'FR' ? 'Passagers max' : 'Max passengers'}
                </span>
              </div>

              <div className="space-y-1 border-x border-neutral-200">
                <div className="flex items-center justify-center gap-1 text-neutral-900">
                  <Luggage className="w-4 h-4 text-[#C4963A]" />
                  <span className="font-bold text-sm">{vehicle.luggage}</span>
                </div>
                <span className="text-[11px] text-neutral-600 block">
                  {language === 'FR' ? 'Grands bagages' : 'Luggage pieces'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-neutral-900">
                  <Wifi className="w-4 h-4 text-[#C4963A]" />
                  <span className="font-bold text-sm">4G/5G</span>
                </div>
                <span className="text-[11px] text-neutral-600 block">
                  {language === 'FR' ? 'Wi-Fi inclus' : 'Wi-Fi included'}
                </span>
              </div>
            </div>

            {/* Booking / Payment Action Card */}
            <div className="p-6 bg-white text-neutral-900 rounded-3xl space-y-4 shadow-lg border border-neutral-300/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C4963A]">
                    {language === 'FR' ? 'Tarif tout compris sur devis' : 'All-Inclusive Quote'}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {language === 'FR' ? 'Réserver ce véhicule' : 'Book this vehicle'}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'FR' ? 'Disponible 24/7' : 'Available 24/7'}</span>
                </div>
              </div>

              {/* Ready "Book Now" Button */}
              {ONLINE_PAYMENT_URL ? (
                <a
                  href={ONLINE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
                >
                  <span>{language === 'FR' ? 'Book Now · Paiement en ligne' : 'Book Now · Online Payment'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <a
                  href="#vehicle-reservation"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
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
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'FR' ? 'Réserver via WhatsApp Direct' : 'Direct WhatsApp Reservation'}</span>
              </a>

              <p className="text-[11px] text-neutral-500 text-center font-normal pt-1">
                {language === 'FR'
                  ? 'Tarifs fixes · 60 min attente gratuite aéroport YUL · Chauffeur certifié'
                  : 'Fixed rates · 60 min complimentary YUL wait time · Licensed chauffeur'}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Vehicle Features & Editorial Sections */}
        <div className="mb-20 space-y-12">
          {/* Section Heading */}
          <div className="border-b border-neutral-300 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C4963A]">
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
                className="p-8 rounded-3xl bg-white border border-neutral-300/80 hover:border-[#D7B65D] shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#D7B65D]/20 text-[#C4963A] flex items-center justify-center font-bold text-xs">
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
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-300/80 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-6 font-sans">
              {language === 'FR' ? 'Équipements & Commodités de série' : 'Standard In-Cabin Amenities'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(language === 'FR' ? vehicle.featuresFr : vehicle.featuresEn).map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D7B65D]/20 text-[#C4963A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-700 font-normal">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services Offered In This Vehicle */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-300/80 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-[#C4963A] mb-6 uppercase tracking-wider text-xs font-sans">
              {language === 'FR' ? 'SERVICES OFFERTS AVEC CE VÉHICULE' : 'SERVICES OFFERED IN THIS VEHICLE'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(language === 'FR' ? vehicle.servicesOfferedFr : vehicle.servicesOfferedEn).map((srv, i) => (
                <div key={i} className="bg-[#F8F6F0] p-5 rounded-2xl border border-neutral-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D7B65D]/20 text-[#C4963A] flex items-center justify-center">
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

        {/* Streamlined Booking / Quote Form Section for this vehicle */}
        <div id="vehicle-reservation" className="max-w-2xl mx-auto scroll-mt-24 mb-20">
          <div className="bg-white rounded-3xl border border-neutral-300/80 shadow-xl p-6 sm:p-10">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C4963A] bg-[#D7B65D]/15 px-3 py-1 rounded-full">
                {language === 'FR' ? 'Formulaire de réservation' : 'Reservation Form'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-sans">
                {language === 'FR' ? `Réserver le ${vehicle.name}` : `Book the ${vehicle.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light">
                {language === 'FR'
                  ? 'Transmettez vos coordonnées pour recevoir votre confirmation et prise en charge rapide.'
                  : 'Submit your contact details to receive prompt dispatch confirmation.'}
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
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
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'FR' ? 'Confirmer sur WhatsApp' : 'Confirm on WhatsApp'}</span>
                  </a>
                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-300 text-neutral-700 hover:text-black text-xs font-semibold cursor-pointer bg-white"
                  >
                    {language === 'FR' ? 'Nouvelle soumission' : 'New Quote'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    {language === 'FR' ? 'Nom complet *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Tremblay"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 text-xs focus:outline-hidden focus:border-[#C4963A] transition-colors"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      {language === 'FR' ? 'Courriel *' : 'Email Address *'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jean@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 text-xs focus:outline-hidden focus:border-[#C4963A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      {language === 'FR' ? 'Numéro de téléphone *' : 'Phone Number *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (514) 000-0000"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 text-xs focus:outline-hidden focus:border-[#C4963A] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Itinerary / Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    {language === 'FR' ? 'Détails du trajet / Date / Heure' : 'Trip Details / Date / Time'}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={3}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder={language === 'FR' ? "Départ YUL, destination Mont-Tremblant, vol AC882..." : "Pickup YUL, destination Mont-Tremblant, flight AC882..."}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 text-xs focus:outline-hidden focus:border-[#C4963A] transition-colors"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D7B65D] via-[#F5D577] to-[#D7B65D] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'FR' ? 'Envoi en cours...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <span>{language === 'FR' ? 'Envoyer la demande de réservation' : 'Submit Reservation Request'}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Other Fleet Vehicles Selector */}
        <div className="border-t border-neutral-300 pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4963A]">
              {language === 'FR' ? 'Autres Véhicules Disponibles' : 'Explore Other Vehicles'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1 font-sans">
              {language === 'FR' ? 'Complétez votre sélection' : 'Our Full Fleet'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET.filter((f) => f.id !== vehicle.id).map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectOtherVehicle(other.slug)}
                className="bg-white rounded-3xl p-5 border border-neutral-300/80 hover:border-[#D7B65D] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[16/10] bg-[#F8F6F0] rounded-2xl flex items-center justify-center p-3 mb-4 overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C4963A] block mb-1">
                    {language === 'FR' ? other.categoryLabelFr : other.categoryLabelEn}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#C4963A] transition-colors">
                    {other.name}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                  <span className="text-[11px] font-medium">{other.passengers} passagers</span>
                  <span className="text-[11px] font-bold text-[#C4963A] group-hover:translate-x-0.5 transition-transform">
                    {language === 'FR' ? 'Voir fiche →' : 'Details →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
