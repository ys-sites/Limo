import React, { useState, useEffect, useRef } from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { FloatingPanel } from './FloatingPanel';

interface TimePickerDropdownProps {
  label: string;
  value: string; // e.g. "09:30" or "21:30"
  onChange: (timeStr: string) => void;
  isFr: boolean;
}

export const TimePickerDropdown: React.FC<TimePickerDropdownProps> = ({
  label,
  value,
  onChange,
  isFr,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (containerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate 24-hour intervals every 15 minutes
  const timeSlots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      timeSlots.push(`${hh}:${mm}`);
    }
  }

  // Format 24-hour time to friendly display (e.g. 09:30 -> 9:30 AM or 09 h 30)
  const formatDisplayTime = (time: string) => {
    if (!time) return isFr ? 'Sélectionnez une heure' : 'Select a time';
    const [hStr, mStr] = time.split(':');
    const h = parseInt(hStr, 10);
    const m = mStr || '00';

    if (isFr) {
      return `${h} h ${m}`;
    }

    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${m} ${period}`;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-neutral-400 mb-1 font-medium">
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-6 pr-6 py-2 text-left text-[13px] sm:text-sm text-white bg-transparent border-b border-white/15 hover:border-white/30 focus:border-[#D7B65D] rounded-none focus:outline-none flex items-center justify-between cursor-pointer transition-colors group"
      >
        <Clock className="w-3.5 h-3.5 text-[#D7B65D] absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        <span className={value ? 'text-white font-medium tabular-nums' : 'text-neutral-500'}>
          {formatDisplayTime(value)}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D7B65D]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <FloatingPanel
          anchorRef={buttonRef}
          panelRef={panelRef}
          minWidth={220}
          align="right"
          maxHeight={240}
          className="bg-[#0C0E14]/97 backdrop-blur-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] rounded-2xl p-2 overflow-y-auto font-sans animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="grid grid-cols-2 gap-1">
            {timeSlots.map((slot) => {
              const isSelected = value === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    onChange(slot);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg tabular-nums text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#D7B65D] text-neutral-950 font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {formatDisplayTime(slot)}
                </button>
              );
            })}
          </div>
        </FloatingPanel>
      )}
    </div>
  );
};
