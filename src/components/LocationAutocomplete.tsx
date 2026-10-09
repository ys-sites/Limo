import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Plane, Building2, Train, Navigation, X, Loader2 } from 'lucide-react';
import {
  searchLocations,
  resolveLocation,
  LocationSuggestion,
  isAirportLocation,
  MIN_QUERY_LENGTH,
} from '../lib/locationSearch';
import { FloatingPanel } from './FloatingPanel';

interface LocationAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string, isAirport?: boolean) => void;
  placeholder: string;
  isFr: boolean;
  iconType?: 'pickup' | 'dropoff';
  required?: boolean;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isFr,
  iconType = 'pickup',
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  // Sync external value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch live suggestions (debounced) only while the user is typing
  useEffect(() => {
    if (!isOpen) return;
    if (inputValue.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const id = ++requestId.current;
    setLoading(true);

    const timer = setTimeout(async () => {
      const results = await searchLocations(inputValue, isFr).catch(() => []);
      if (id !== requestId.current) return;
      setSuggestions(results);
      setLoading(false);
      setHighlightIndex(-1);
    }, 250);

    return () => clearTimeout(timer);
  }, [inputValue, isOpen, isFr]);

  const handleSelect = async (suggestion: LocationSuggestion) => {
    requestId.current++;
    setIsOpen(false);
    setSuggestions([]);
    setInputValue(suggestion.fullAddress);
    onChange(suggestion.fullAddress, suggestion.isAirport || isAirportLocation(suggestion.fullAddress));

    // Replace with the official address (incl. postal code) from Place Details
    const resolved = await resolveLocation(suggestion);
    if (resolved.fullAddress !== suggestion.fullAddress || resolved.isAirport !== suggestion.isAirport) {
      setInputValue(resolved.fullAddress);
      onChange(resolved.fullAddress, resolved.isAirport || isAirportLocation(resolved.fullAddress));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setInputValue(nextVal);
    onChange(nextVal, isAirportLocation(nextVal));
    setIsOpen(nextVal.trim().length >= MIN_QUERY_LENGTH);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    requestId.current++;
    setInputValue('');
    setSuggestions([]);
    setLoading(false);
    onChange('', false);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && highlightIndex >= 0 && suggestions[highlightIndex]) {
      e.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const renderIcon = (cat?: LocationSuggestion['category']) => {
    switch (cat) {
      case 'airport':
        return <Plane className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />;
      case 'hotel':
        return <Building2 className="w-3.5 h-3.5 text-neutral-300 shrink-0" />;
      case 'train':
        return <Train className="w-3.5 h-3.5 text-neutral-300 shrink-0" />;
      default:
        return iconType === 'pickup' ? (
          <MapPin className="w-3.5 h-3.5 text-[#D7B65D] shrink-0" />
        ) : (
          <Navigation className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        );
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Label */}
      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
        {label}
      </label>

      {/* Input container with luxury liquid glass bottom border */}
      <div ref={fieldRef} className="relative group">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
          {renderIcon(isAirportLocation(inputValue) ? 'airport' : undefined)}
        </div>

        <input
          ref={inputRef}
          type="text"
          required={required}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          className="w-full pl-6 pr-7 py-2 text-[13px] sm:text-sm text-white bg-transparent border-b border-white/15 focus:border-[#D7B65D] rounded-none focus:outline-none placeholder:text-neutral-500 font-normal transition-colors"
        />

        {/* Clear (x) button or Loading spinner */}
        {loading ? (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
            <Loader2 className="w-3.5 h-3.5 text-[#D7B65D] animate-spin" />
          </div>
        ) : inputValue ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Effacer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Autocomplete Dropdown with prominent city and postal code */}
      {isOpen && (suggestions.length > 0 || !loading) && (
        <FloatingPanel
          anchorRef={fieldRef}
          panelRef={panelRef}
          minWidth={300}
          className="bg-[#0C0E14]/98 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] rounded-xl py-1.5 overflow-y-auto font-sans animate-in fade-in zoom-in-95 duration-150"
        >
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => {
              const isSelected = index === highlightIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                  onMouseEnter={() => setHighlightIndex(index)}
                  className={`w-full px-3.5 py-2.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="mt-0.5 p-1 rounded-md bg-white/[0.04] border border-white/10 shrink-0">
                    {renderIcon(item.category)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-[13px] text-white font-medium truncate tracking-tight">
                        {item.title}
                      </p>
                      {item.city && (
                        <span className="shrink-0 text-[10px] text-[#D7B65D] font-medium px-1.5 py-0.2 rounded bg-[#D7B65D]/10 border border-[#D7B65D]/25">
                          {item.city}
                        </span>
                      )}
                      {item.postcode && (
                        <span className="shrink-0 text-[10px] text-neutral-300 font-mono px-1.5 py-0.2 rounded bg-white/[0.05] border border-white/10">
                          {item.postcode}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-xs text-neutral-400 text-center">
              {isFr ? 'Aucun résultat trouvé' : 'No places found'}
            </div>
          )}
          {suggestions[0]?.source === 'google' && (
            <div className="px-3.5 pt-1.5 pb-0.5 text-right text-[10px] text-neutral-500">
              powered by <span className="font-medium text-neutral-400">Google</span>
            </div>
          )}
        </FloatingPanel>
      )}
    </div>
  );
};
