import React, { useState } from 'react';
import { X, Check, Users, Luggage, ShieldCheck, ArrowRight, Calendar, Clock, MapPin, Sparkles, Download, Phone } from 'lucide-react';
import { BookingState, Vehicle } from '../types/limo';
import { FLEET } from '../data/limoData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBooking: BookingState;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialBooking
}) => {
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('Alexander Vance');
  const [email, setEmail] = useState('alex.vance@executive-group.com');
  const [phone, setPhone] = useState('+1 (212) 555-0199');
  const [flightNo, setFlightNo] = useState('AA 104');
  const [specialNotes, setSpecialNotes] = useState('Please ensure sparkling mineral water is chilled in cabin.');
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
    FLEET.find((v) => v.id === 'cadillac-escalade') ||
    FLEET[0];

  // Price calculations
  let baseRate = 0;
  if (booking.promoApplied) {
    baseRate = 75; // $75 promo
  } else if (booking.serviceType === 'hourly') {
    baseRate = selectedVehicle.hourlyRate * booking.hours;
  } else if (booking.serviceType === 'flat_rate') {
    baseRate = selectedVehicle.flatAirportRate;
  } else {
    // distance estimate base
    baseRate = selectedVehicle.hourlyRate * 1.5;
  }

  const gratuity = Math.round(baseRate * 0.2); // 20% standard chauffeur gratuity
  const taxesFees = Math.round(baseRate * 0.08875); // standard NY tax/airport regulatory fee
  const totalAmount = baseRate + gratuity + taxesFees;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `PL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedCode(randomCode);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xl font-bold tracking-wider uppercase text-neutral-900">
                PREMIER LIMO
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold uppercase">
                Reservation Concierge
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Secure executive vehicle dispatch & confirmed chauffeur assignment
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
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Pick Up</span>
                    <span className="font-medium text-neutral-800 line-clamp-2">{booking.pickupAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      {booking.serviceType === 'hourly' ? 'Charter Type' : 'Destination'}
                    </span>
                    <span className="font-medium text-neutral-800 line-clamp-2">{booking.dropoffAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Date & Time</span>
                    <span className="font-medium text-neutral-800 font-mono">
                      {booking.date} · {booking.timeHour}:{booking.timeMinute} {booking.timePeriod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Selection Carousel */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    1. Select Vehicle From Fleet
                  </h3>
                  <span className="text-xs text-neutral-500">
                    All vehicles include professional chauffeur
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {FLEET.map((veh) => {
                    const isSelected = selectedVehicle.id === veh.id;
                    return (
                      <div
                        key={veh.id}
                        onClick={() => setBooking({ ...booking, selectedVehicleId: veh.id })}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-neutral-900 ring-2 ring-neutral-900 bg-amber-50/20 shadow-md'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-bold text-sm text-neutral-900 font-serif-luxury">
                              {veh.name}
                            </span>
                            <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-0.5 font-mono">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> {veh.passengers}
                              </span>
                              <span className="flex items-center gap-1">
                                <Luggage className="w-3 h-3" /> {veh.luggage}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-sm text-neutral-900 font-mono tabular-nums">
                              ${booking.promoApplied && veh.id === 'cadillac-escalade' ? 75 : veh.hourlyRate}
                            </span>
                            <span className="text-[10px] text-neutral-500 block">
                              {booking.promoApplied && veh.id === 'cadillac-escalade' ? '/ day deal' : '/ hour'}
                            </span>
                          </div>
                        </div>

                        <div className="h-20 flex items-center justify-center my-1">
                          <img
                            src={veh.image}
                            alt={veh.name}
                            className="max-h-16 w-auto object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                          <span className="text-neutral-500 truncate max-w-[170px]">{veh.tagline}</span>
                          <span className={`font-semibold ${isSelected ? 'text-amber-700' : 'text-neutral-400'}`}>
                            {isSelected ? '✓ Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Base Rate ({booking.serviceType.replace('_', ' ')})</span>
                  <span className="font-mono tabular-nums">${baseRate.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Chauffeur Gratuity (20%)</span>
                  <span className="font-mono tabular-nums">${gratuity.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>Tolls, Taxes & Airport Access</span>
                  <span className="font-mono tabular-nums">${taxesFees.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
                      Total Guaranteed Rate
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      Fixed quote · Zero surge pricing
                    </span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-7 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Passenger Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PASSENGER DETAILS & CUSTOM PREFERENCES */}
          {step === 2 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                  2. Passenger & Flight Details
                </h3>
                <p className="text-xs text-neutral-500">
                  Your chauffeur will meet you with an executive greeting board displaying your name.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Lead Passenger Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Contact Phone Number (SMS alerts)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Confirmation Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Flight Number (Airport tracking)
                  </label>
                  <input
                    type="text"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value)}
                    placeholder="e.g. AA 104 or BA 178"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono uppercase"
                  />
                </div>
              </div>

              {/* Chauffeur Experience Add-ons */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Cabin Preferences
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quietRide}
                      onChange={(e) => setQuietRide(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-neutral-900 block">Quiet Chauffeur Ride</span>
                      <span className="text-neutral-500">Zero non-essential conversation for calls or rest</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={childSeat}
                      onChange={(e) => setChildSeat(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-neutral-900 block">Child Safety Booster / Seat</span>
                      <span className="text-neutral-500">Installed by chauffeur prior to arrival</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Special Instructions or Concierge Notes
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Chilled sparkling water, meet at curbside level 3, garment rack..."
                  className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  ← Back to Vehicle
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Confirm & Dispatch Chauffeur</span>
                  <Check className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: RESERVATION CONFIRMED BOARDING PASS */}
          {step === 3 && confirmedCode && (
            <div className="space-y-6 py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">
                  Reservation Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-neutral-900">
                  Your chauffeur is reserved
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Confirmation sent to {email}. Driver credentials will arrive via SMS 2 hours prior to pickup.
                </p>
              </div>

              {/* Digital Boarding Pass */}
              <div className="max-w-md mx-auto bg-neutral-900 text-white rounded-2xl p-6 text-left shadow-2xl space-y-4 border border-neutral-800">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">Booking Reference</span>
                    <div className="text-xl font-bold font-mono tracking-wider">{confirmedCode}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Total Paid</span>
                    <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">${totalAmount.toFixed(2)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Vehicle</span>
                    <span className="font-semibold text-white">{selectedVehicle.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block">Passenger</span>
                    <span className="font-semibold text-white">{name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-neutral-400 uppercase block">Pick Up</span>
                    <span className="text-neutral-200">{booking.pickupAddress}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-neutral-400 uppercase block">Destination</span>
                    <span className="text-neutral-200">{booking.dropoffAddress}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>$10M Commercial Liability Insured</span>
                  </div>
                  <span className="font-mono">{booking.date}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setConfirmedCode(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
