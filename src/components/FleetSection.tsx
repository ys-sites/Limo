import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FLEET } from '../data/limoData';
import { Vehicle, VehicleCategory } from '../types/limo';

interface FleetSectionProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('ALL');
  const [pageIndex, setPageIndex] = useState(0);

  const categories: VehicleCategory[] = ['ALL', 'SEDAN', 'LUXURY', 'LIMOUSINE', 'SUV'];

  const filteredFleet = FLEET.filter((vehicle) => {
    if (selectedCategory === 'ALL') return true;
    return vehicle.category === selectedCategory;
  });

  // Display 2 items at a time matching screenshot
  const displayedVehicles = filteredFleet.slice(pageIndex * 2, pageIndex * 2 + 2);
  const totalPages = Math.ceil(filteredFleet.length / 2);

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="fleet" className="py-24 lg:py-28 bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 02 on left, Our fleet in center */}
        <div className="relative mb-12 sm:mb-14 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <span className="text-4xl sm:text-5xl font-light text-neutral-300 font-sans select-none">
              02
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
            Our fleet
          </h2>
        </div>

        {/* Filters matching screenshot: ALL (active black pill), SEDAN, LUXURY, LIMOUSINE, SUV */}
        <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-8 overflow-x-auto pb-4 mb-10 text-xs font-semibold uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPageIndex(0);
              }}
              className={`px-6 py-2 rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2 Wide Vehicle Cards directly from screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(displayedVehicles.length > 0 ? displayedVehicles : filteredFleet.slice(0, 2)).map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#F6F6F6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[340px] hover:shadow-md transition-shadow group"
            >
              {/* Top-left: Title & Price */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                  {vehicle.name === 'Mercedes-Benz S-Class' ? 'Mersedes Benz S-class' : vehicle.name}
                </h3>
                <span className="text-xs text-neutral-500 font-normal">
                  ${vehicle.hourlyRate} / hour
                </span>
              </div>

              {/* Studio Car Photo */}
              <div className="py-6 flex items-center justify-center">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom-right: Book now ↗ */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => onSelectVehicle(vehicle)}
                  className="inline-flex items-center gap-1 text-xs text-neutral-700 hover:text-neutral-950 font-medium cursor-pointer group/btn"
                >
                  <span>Book now</span>
                  <div className="w-4 h-4 rounded-full bg-[#E4A836] flex items-center justify-center text-neutral-950 ml-0.5">
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom controls: ← → 48 vehicles (left), Open page (right) */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Previous fleet page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Next fleet page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-500 font-normal ml-2">
              48 vehicles
            </span>
          </div>

          <button
            onClick={() => onSelectVehicle(FLEET[0])}
            className="px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-[#E4A836] hover:bg-[#d59929] active:scale-[0.98] rounded-md transition-all shadow-sm cursor-pointer"
          >
            Open page
          </button>
        </div>
      </div>
    </section>
  );
};
