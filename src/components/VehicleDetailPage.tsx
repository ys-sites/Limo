import React, { useState } from 'react';
import { 
  ArrowLeft, Check, Users, Luggage, ShieldCheck, 
  MessageSquare, User, Mail, Phone, Wifi, ChevronRight,
  ExternalLink, Loader2, CheckCircle2, AlertCircle, FileText
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
  // Only use real client photography from limoraf.com (do NOT show the homepage cutout)
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
          vehicle: vehicle.name,
          name,
          email,
          phone,
          special_notes: specialNotes || 'Aucune note',
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
Courriel: ${email || 'À confirmer'}${specialNotes ? `\nNotes: ${specialNotes}` : ''}`;
    return `https://api.whatsapp.com/send/?phone=15142438141&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-[#F5D577] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{language === 'FR' ? 'Retour à la flotte' : 'Back to Fleet'}</span>
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500">
            <span>{language === 'FR' ? 'Accueil' : 'Home'}</span>
            <ChevronRight className="w-3 h-3" />
            <button onClick={onBack} className="hover:text-neutral-300 cursor-pointer">
              {language === 'FR' ? 'Flotte' : 'Fleet'}
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F5D577] font-medium">{vehicle.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Visuals & Vehicle Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Left: Real Client Photography Showcase */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Featured Real Photo Display */}
            <div className="relative bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group">
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
                    className={`relative rounded-2xl overflow-hidden aspect-video bg-neutral-900 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#D7B65D] scale-98 shadow-md ring-2 ring-[#D7B65D]/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5D577]">
                {language === 'FR' ? 'Véhicule de Prestige' : 'Flagship Vehicle'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1 font-sans">
                {vehicle.name}
              </h1>
              <p className="text-sm text-neutral-400 mt-2 font-light leading-relaxed">
                {language === 'FR' ? vehicle.taglineFr : vehicle.taglineEn}
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-white">
                  <Users className="w-4 h-4 text-[#D7B65D]" />
                  <span className="font-bold text-sm">{vehicle.passengers}</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  {language === 'FR' ? 'Passagers max' : 'Max passengers'}
                </span>
              </div>

              <div className="space-y-1 border-x border-neutral-800">
                <div className="flex items-center justify-center gap-1 text-white">
                  <Luggage className="w-4 h-4 text-[#D7B65D]" />
                  <span className="font-bold text-sm">{vehicle.luggage}</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  {language === 'FR' ? 'Grands bagages' : 'Luggage pieces'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-white">
                  <Wifi className="w-4 h-4 text-[#D7B65D]" />
                  <span className="font-bold text-sm">4G/5G</span>
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  {language === 'FR' ? 'Wi-Fi inclus' : 'Wi-Fi included'}
                </span>
              </div>
            </div>

            {/* Booking / Payment Action Card */}
            <div className="p-6 bg-neutral-900/90 text-white rounded-3xl space-y-4 shadow-xl border border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#F5D577]">
                    {language === 'FR' ? 'Tarif tout compris sur devis' : 'All-Inclusive Quote'}
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

        {/* Detailed Vehicle Features & Editorial Sections */}
        <div className="mb-20 space-y-12">
          {/* Section Heading */}
          <div className="border-b border-neutral-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5D577]">
              {language === 'FR' ? 'Description détaillée' : 'Detailed Specifications'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-sans">
              {language === 'FR' ? `L'expérience à bord du ${vehicle.name}` : `The ${vehicle.name} Experience`}
            </h2>
          </div>

          {/* Editorial Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicle.detailSections.map((sec, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-[#D7B65D]/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#D7B65D]/15 text-[#F5D577] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'FR' ? sec.titleFr : sec.titleEn}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  {language === 'FR' ? sec.contentFr : sec.contentEn}
                </p>
              </div>
            ))}
          </div>

          {/* Key Features Checklist */}
          <div className="bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-800">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
              {language === 'FR' ? 'Équipements & Commodités de série' : 'Standard In-Cabin Amenities'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(language === 'FR' ? vehicle.featuresFr : vehicle.featuresEn).map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D7B65D]/20 text-[#F5D577] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-300 font-light">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services Offered In This Vehicle */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800">
            <h3 className="text-lg sm:text-xl font-bold text-[#F5D577] mb-6 uppercase tracking-wider text-xs font-sans">
              {language === 'FR' ? 'SERVICES OFFERTS AVEC CE VÉHICULE' : 'SERVICES OFFERED IN THIS VEHICLE'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(language === 'FR' ? vehicle.servicesOfferedFr : vehicle.servicesOfferedEn).map((srv, i) => (
                <div key={i} className="bg-black/60 p-5 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D7B65D]/15 text-[#F5D577] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-200 leading-snug">
                    {srv}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Streamlined Booking / Quote Form Section for this vehicle */}
        <div id="vehicle-reservation" className="max-w-2xl mx-auto scroll-mt-24 mb-20">
          <div className="bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl p-6 sm:p-10">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5D577] bg-[#D7B65D]/10 px-3 py-1 rounded-full">
                {language === 'FR' ? 'Formulaire de réservation' : 'Reservation Form'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {language === 'FR' ? `Réserver le ${vehicle.name}` : `Book the ${vehicle.name}`}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                {language === 'FR'
                  ? 'Transmettez vos coordonnées pour recevoir votre confirmation et prise en charge rapide.'
                  : 'Submit your contact details to receive prompt dispatch confirmation.'}
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'FR' ? 'Demande envoyée avec succès !' : 'Quote Request Sent!'}
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
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
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    {language === 'FR' ? 'Nouvelle soumission' : 'New Quote'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    {language === 'FR' ? 'Nom complet *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'FR' ? 'ex. Alexandre Tremblay' : 'e.g. John Smith'}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-neutral-800 rounded-xl focus:border-[#D7B65D] focus:bg-black focus:outline-none text-white transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {language === 'FR' ? 'Courriel *' : 'Email Address *'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@courriel.com"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-neutral-800 rounded-xl focus:border-[#D7B65D] focus:bg-black focus:outline-none text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      {language === 'FR' ? 'Téléphone mobile *' : 'Phone Number *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (514) 000-0000"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-neutral-800 rounded-xl focus:border-[#D7B65D] focus:bg-black focus:outline-none text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    {language === 'FR' ? 'Détails du trajet ou message (optionnel)' : 'Trip details or notes (optional)'}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder={
                        language === 'FR'
                          ? 'ex. Départ YUL vers Centre-Ville, 2 passagers...'
                          : 'e.g. YUL airport to Downtown, 2 passengers...'
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-black/50 border border-neutral-800 rounded-xl focus:border-[#D7B65D] focus:outline-none text-white"
                    />
                  </div>
                </div>

                {/* Submit button: Book Now */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#D7B65D] hover:bg-[#C4963A] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
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
        <div className="border-t border-neutral-800 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">
              {language === 'FR' ? 'Découvrir nos autres véhicules' : 'Explore Other Vehicles'}
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#F5D577] hover:underline cursor-pointer"
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
                className="bg-neutral-900 hover:bg-neutral-800/90 rounded-2xl p-5 border border-neutral-800 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="h-32 flex items-center justify-center mb-3">
                  <img
                    src={other.image}
                    alt={other.name}
                    className="max-h-28 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-bold text-white">{other.name}</h4>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
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
