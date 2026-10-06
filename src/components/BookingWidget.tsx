import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { BookingState, ServiceType } from '../types/limo';
import { POPULAR_LOCATIONS } from '../data/limoData';

interface BookingWidgetProps {
  onReserve: (booking: BookingState) => void;
  className?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ onReserve, className = '' }) => {
  const [serviceType, setServiceType] = useState<ServiceType>('distance');
  const [pickupAddress, setPickupAddress] = useState('Pick Up Address');
  const [dropoffAddress, setDropoffAddress] = useState('Drop off Address');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip'>('One Way');
  const [date, setDate] = useState('06/04/2023');
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');
  const [showPickupList, setShowPickupList] = useState(false);
  const [showDropoffList, setShowDropoffList] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReserve({
      serviceType,
      pickupAddress: pickupAddress === 'Pick Up Address' ? 'JFK International Airport' : pickupAddress,
      dropoffAddress: dropoffAddress === 'Drop off Address' ? 'The Plaza Hotel, New York' : dropoffAddress,
      hours: 4,
      tripType: tripType === 'One Way' ? 'one_way' : 'round_trip',
      date,
      timeHour: hour,
      timeMinute: minute,
      timePeriod: 'PM',
      selectedVehicleId: null,
      passengers: 2,
      luggage: 2
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-5 sm:p-6 w-full max-w-[340px] sm:max-w-[360px] text-neutral-800 ${className}`}>
      {/* 3 Tabs directly from screenshot */}
      <div className="grid grid-cols-3 border-b border-neutral-200/80 mb-4 pb-2 text-center text-xs font-medium">
        <button
          type="button"
          onClick={() => setServiceType('distance')}
          className={`py-1.5 px-2 rounded-md transition-all cursor-pointer ${
            serviceType === 'distance'
              ? 'bg-[#E4A836] text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Distance
        </button>
        <button
          type="button"
          onClick={() => setServiceType('hourly')}
          className={`py-1.5 px-2 rounded-md transition-all cursor-pointer ${
            serviceType === 'hourly'
              ? 'bg-[#E4A836] text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Hourly
        </button>
        <button
          type="button"
          onClick={() => setServiceType('flat_rate')}
          className={`py-1.5 px-2 rounded-md transition-all cursor-pointer ${
            serviceType === 'flat_rate'
              ? 'bg-[#E4A836] text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Flat Rate
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Pick Up Address */}
        <div className="relative">
          <input
            type="text"
            value={pickupAddress}
            onFocus={() => {
              if (pickupAddress === 'Pick Up Address') setPickupAddress('');
              setShowPickupList(true);
            }}
            onChange={(e) => setPickupAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs text-neutral-700 bg-neutral-50/80 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder:text-neutral-400"
            placeholder="Pick Up Address"
          />
          {showPickupList && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl py-1 z-30 max-h-40 overflow-y-auto text-xs">
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => {
                    setPickupAddress(loc);
                    setShowPickupList(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-50 truncate text-neutral-700"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Drop Off Address */}
        <div className="relative">
          <input
            type="text"
            value={dropoffAddress}
            onFocus={() => {
              if (dropoffAddress === 'Drop off Address') setDropoffAddress('');
              setShowDropoffList(true);
            }}
            onChange={(e) => setDropoffAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs text-neutral-700 bg-neutral-50/80 hover:bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder:text-neutral-400"
            placeholder="Drop off Address"
          />
          {showDropoffList && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl py-1 z-30 max-h-40 overflow-y-auto text-xs">
              {POPULAR_LOCATIONS.slice(2).map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => {
                    setDropoffAddress(loc);
                    setShowDropoffList(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-amber-50 truncate text-neutral-700"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* One Way / Round Trip dropdown */}
        <div className="relative">
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value as 'One Way' | 'Round Trip')}
            className="w-full px-3.5 py-2.5 text-xs text-neutral-700 bg-neutral-50/80 border border-neutral-200 rounded-lg appearance-none focus:outline-none focus:border-neutral-400 cursor-pointer"
          >
            <option value="One Way">One Way</option>
            <option value="Round Trip">Round Trip</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
        </div>

        {/* Date: 06/04/2023 */}
        <div className="relative">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs text-neutral-700 bg-neutral-50/80 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 font-mono"
            placeholder="06/04/2023"
          />
          <Calendar className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
        </div>

        {/* Pick Up Time: 01 ˅ | 00 ˅ */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-neutral-600 font-medium">Pick Up Time</span>
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="pl-2 pr-6 py-1.5 text-xs bg-neutral-50/80 border border-neutral-200 rounded-md appearance-none focus:outline-none font-mono cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="pl-2 pr-6 py-1.5 text-xs bg-neutral-50/80 border border-neutral-200 rounded-md appearance-none focus:outline-none font-mono cursor-pointer"
              >
                {['00', '15', '30', '45'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Black button: Reserve Now */}
        <button
          type="submit"
          className="w-full mt-3 py-3 px-4 text-xs font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.99] rounded-lg transition-colors cursor-pointer"
        >
          Reserve Now
        </button>
      </form>
    </div>
  );
};
