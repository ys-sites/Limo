import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { FloatingPanel } from './FloatingPanel';

interface DatePickerDropdownProps {
  label: string;
  value: string; // ISO format "YYYY-MM-DD"
  onChange: (dateIso: string) => void;
  isFr: boolean;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({
  label,
  value,
  onChange,
  isFr,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize view month based on selected date or current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialDate = value ? new Date(value + 'T00:00:00') : today;
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-indexed

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthNamesFr = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const dayHeadersFr = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
  const dayHeadersEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Calendar days calculation
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleSelectDay = (day: number) => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mStr}-${dStr}`;
    onChange(iso);
    setIsOpen(false);
  };

  // Format display text
  const formatDisplay = () => {
    if (!value) return isFr ? 'Sélectionnez une date' : 'Select a date';
    const [y, m, d] = value.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString(isFr ? 'fr-CA' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      ...(y !== today.getFullYear() ? { year: 'numeric' as const } : {}),
    });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
        {label}
      </label>

      {/* Button field looking like a luxury underlined input */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full pl-6 pr-0 py-2 text-left text-[13px] sm:text-sm text-white bg-transparent border-b border-white/15 hover:border-white/30 focus:border-[#D7B65D] rounded-none focus:outline-none flex items-center justify-between cursor-pointer transition-colors group"
      >
        <CalendarIcon className="w-3.5 h-3.5 text-[#D7B65D] absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        <span className={`whitespace-nowrap truncate ${value ? 'text-white font-medium' : 'text-neutral-500'}`}>
          {formatDisplay()}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D7B65D]' : ''
          }`}
        />
      </button>

      {/* Luxury Calendar Dropdown matching Blacklane Screenshot 3 */}
      {isOpen && (
        <FloatingPanel
          anchorRef={buttonRef}
          panelRef={panelRef}
          minWidth={296}
          className="bg-[#0C0E14]/97 backdrop-blur-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] rounded-2xl p-4 overflow-y-auto font-sans animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={prevMonth}
              className="w-7 h-7 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Mois précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif text-xl font-semibold text-white whitespace-nowrap leading-none">
              {isFr ? monthNamesFr[viewMonth] : monthNamesEn[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-7 h-7 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Mois suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500 font-semibold">
            {(isFr ? dayHeadersFr : dayHeadersEn).map((d, i) => (
              <div key={i} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}

            {/* Actual days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(viewYear, viewMonth, day);
              const isPast = dateObj < today;
              const mStr = String(viewMonth + 1).padStart(2, '0');
              const dStr = String(day).padStart(2, '0');
              const iso = `${viewYear}-${mStr}-${dStr}`;
              const isSelected = value === iso;
              const isCurrentDay =
                dateObj.getDate() === today.getDate() &&
                dateObj.getMonth() === today.getMonth() &&
                dateObj.getFullYear() === today.getFullYear();

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={`h-8 w-8 mx-auto rounded-full text-[13px] font-medium tabular-nums flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D7B65D] text-neutral-950 font-bold shadow-[0_2px_10px_rgba(215,182,93,0.4)] scale-105'
                      : isPast
                      ? 'text-neutral-600 line-through cursor-not-allowed opacity-40'
                      : isCurrentDay
                      ? 'border border-[#D7B65D] text-white hover:bg-white/10'
                      : 'text-neutral-200 hover:bg-white/10'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </FloatingPanel>
      )}
    </div>
  );
};
