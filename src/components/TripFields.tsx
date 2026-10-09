import React, { useState } from 'react';
import { MapPin, Flag, Clock, ChevronDown } from 'lucide-react';

/**
 * Trip details shared by every booking form:
 * - Transfer: pickup address -> drop-off address
 * - As directed: pickup address + chauffeur at disposal for a set duration (1h, 2h, ...)
 */
export type TripMode = 'transfer' | 'hourly';

export interface TripDetails {
  mode: TripMode;
  pickup: string;
  dropoff: string;
  hours: number;
}

const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 12];

export const emptyTrip = (mode: TripMode = 'transfer'): TripDetails => ({
  mode,
  pickup: '',
  dropoff: '',
  hours: 2,
});

export const useTripDetails = (initialMode: TripMode = 'transfer') => {
  const [trip, setTrip] = useState<TripDetails>(() => emptyTrip(initialMode));
  return { trip, setTrip, resetTrip: (mode: TripMode = 'transfer') => setTrip(emptyTrip(mode)) };
};

/** Fields added to the FormSubmit email (the business reads them in French). */
export const tripEmailFields = (trip: TripDetails): Record<string, string> =>
  trip.mode === 'hourly'
    ? {
        type_de_service: 'À disposition (drive as directed)',
        adresse_prise_en_charge: trip.pickup,
        duree: `${trip.hours} heure${trip.hours > 1 ? 's' : ''}`,
      }
    : {
        type_de_service: 'Transfert (aller simple)',
        adresse_prise_en_charge: trip.pickup,
        adresse_destination: trip.dropoff,
      };

/** Short summary for email subjects, e.g. "À disposition 3 h" or "Transfert". */
export const tripSummaryFr = (trip: TripDetails) =>
  trip.mode === 'hourly' ? `À disposition ${trip.hours} h` : 'Transfert';

const THEMES = {
  dark: {
    label: 'block text-[11px] uppercase tracking-[0.12em] text-neutral-400 mb-1',
    input:
      'w-full pl-9 pr-3 py-2 text-xs text-white liquid-glass-input rounded-none focus:outline-none placeholder:text-neutral-500',
    icon: 'w-3.5 h-3.5 absolute left-3 top-3 pointer-events-none',
    chevron: 'w-3.5 h-3.5 text-neutral-400 absolute right-3 top-3 pointer-events-none',
    option: 'bg-[#0C0E14] text-white',
    toggle: 'grid grid-cols-2 p-0.5 border border-white/10 bg-white/[0.03]',
    tabOn: 'bg-[#D7B65D] text-neutral-950',
    tabOff: 'text-neutral-400 hover:text-white',
    tab: 'py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer',
  },
  light: {
    label: 'block text-xs font-semibold text-neutral-800 mb-1',
    input:
      'w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 text-xs focus:outline-hidden focus:border-[#C4963A] transition-colors',
    icon: 'w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none',
    chevron: 'w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none',
    option: '',
    toggle: 'grid grid-cols-2 p-1 rounded-xl bg-[#F8F6F0] border border-neutral-300',
    tabOn: 'bg-neutral-900 text-white shadow-sm',
    tabOff: 'text-neutral-600 hover:text-neutral-900',
    tab: 'py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
  },
};

interface TripFieldsProps {
  trip: TripDetails;
  onChange: (trip: TripDetails) => void;
  isFr: boolean;
  variant?: keyof typeof THEMES;
}

export const TripFields: React.FC<TripFieldsProps> = ({ trip, onChange, isFr, variant = 'dark' }) => {
  const t = THEMES[variant];
  const set = (patch: Partial<TripDetails>) => onChange({ ...trip, ...patch });

  return (
    <div className="space-y-3.5">
      {/* Transfer vs. drive as directed */}
      <div className={t.toggle} role="radiogroup" aria-label={isFr ? 'Type de service' : 'Service type'}>
        {(['transfer', 'hourly'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={trip.mode === mode}
            onClick={() => set({ mode })}
            className={`${t.tab} ${trip.mode === mode ? t.tabOn : t.tabOff}`}
          >
            {mode === 'transfer'
              ? isFr ? 'Transfert' : 'Transfer'
              : isFr ? 'À disposition' : 'As directed'}
          </button>
        ))}
      </div>

      <div>
        <label className={t.label}>{isFr ? 'Adresse de prise en charge *' : 'Pickup address *'}</label>
        <div className="relative">
          <MapPin className={`${t.icon} text-[#D7B65D]`} />
          <input
            type="text"
            name="pickup"
            required
            autoComplete="street-address"
            value={trip.pickup}
            onChange={(e) => set({ pickup: e.target.value })}
            placeholder={isFr ? 'ex. 1000 rue De La Gauchetière, Montréal' : 'e.g. 1000 De La Gauchetière St, Montreal'}
            className={t.input}
          />
        </div>
      </div>

      {trip.mode === 'transfer' ? (
        <div>
          <label className={t.label}>{isFr ? 'Adresse de destination *' : 'Drop-off address *'}</label>
          <div className="relative">
            <Flag className={`${t.icon} text-[#D7B65D]`} />
            <input
              type="text"
              name="dropoff"
              required
              value={trip.dropoff}
              onChange={(e) => set({ dropoff: e.target.value })}
              placeholder={isFr ? 'ex. Aéroport YUL Montréal-Trudeau' : 'e.g. YUL Montreal-Trudeau Airport'}
              className={t.input}
            />
          </div>
        </div>
      ) : (
        <div>
          <label className={t.label}>{isFr ? 'Durée de la mise à disposition *' : 'Duration *'}</label>
          <div className="relative">
            <Clock className={`${t.icon} text-[#D7B65D]`} />
            <select
              name="hours"
              value={trip.hours}
              onChange={(e) => set({ hours: Number(e.target.value) })}
              className={`${t.input} pr-8 appearance-none cursor-pointer`}
            >
              {HOUR_OPTIONS.map((h) => (
                <option key={h} value={h} className={t.option}>
                  {isFr ? `${h} heure${h > 1 ? 's' : ''}` : `${h} hour${h > 1 ? 's' : ''}`}
                </option>
              ))}
            </select>
            <ChevronDown className={t.chevron} />
          </div>
        </div>
      )}
    </div>
  );
};
