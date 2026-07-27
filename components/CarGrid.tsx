/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Car as CarIcon, MapPin, Truck } from 'lucide-react';
import { Car, Language, FilterState } from '../types';
import { getTranslation } from '../translations';
import CarCard from './CarCard';

interface CarGridProps {
  cars: Car[];
  lang: Language;
  onSelectCar: (car: Car) => void;
  selectedLocationFilter?: 'all' | 'algeria' | 'rental';
  onLocationTabChange?: (location: 'all' | 'algeria' | 'rental') => void;
}

const CarGrid: React.FC<CarGridProps> = ({
  cars,
  lang,
  onSelectCar,
  selectedLocationFilter = 'all',
  onLocationTabChange
}) => {
  const t = getTranslation(lang);

  const [filters, setFilters] = useState<FilterState>({
    location: selectedLocationFilter && selectedLocationFilter !== 'all' ? selectedLocationFilter : 'algeria',
    brand: 'all',
    fuelType: 'all',
    transmission: 'all',
    search: '',
    minPrice: 0,
    maxPrice: 20000000
  });

  // Extract unique brands from cars
  const brands = useMemo(() => {
    const set = new Set<string>();
    cars.forEach(c => set.add(c.brand));
    return Array.from(set).sort();
  }, [cars]);

  // Update internal filters if parent changes selectedLocationFilter
  React.useEffect(() => {
    if (selectedLocationFilter && selectedLocationFilter !== 'all') {
      setFilters(prev => ({ ...prev, location: selectedLocationFilter }));
    }
  }, [selectedLocationFilter]);

  // Filter cars logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Location filter
      if (car.location !== filters.location) {
        return false;
      }
      // Brand filter
      if (filters.brand !== 'all' && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      // Fuel filter
      if (filters.fuelType !== 'all' && car.fuelType !== filters.fuelType) {
        return false;
      }
      // Transmission filter
      if (filters.transmission !== 'all' && car.transmission !== filters.transmission) {
        return false;
      }
      // Search query
      if (filters.search.trim() !== '') {
        const query = filters.search.toLowerCase();
        const matchTitle = `${car.brand} ${car.model} ${car.year}`.toLowerCase().includes(query);
        const matchSpecs = car.specs.some(s => s.toLowerCase().includes(query));
        if (!matchTitle && !matchSpecs) return false;
      }

      return true;
    });
  }, [cars, filters]);

  const handleLocationTab = (loc: 'algeria' | 'rental') => {
    setFilters(prev => ({ ...prev, location: loc }));
    if (onLocationTabChange) onLocationTabChange(loc);
  };

  const resetFilters = () => {
    setFilters({
      location: 'algeria',
      brand: 'all',
      fuelType: 'all',
      transmission: 'all',
      search: '',
      minPrice: 0,
      maxPrice: 20000000
    });
    if (onLocationTabChange) onLocationTabChange('algeria');
  };

  return (
    <section id="cars-grid" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 2 Main View Tabs: Sale & Rental */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-200 dark:border-gray-800 pb-6">
        
        <div className="flex items-center gap-2 bg-slate-200 dark:bg-gray-900 p-1.5 rounded-2xl border border-slate-300 dark:border-gray-800 w-full sm:w-auto">
          <button
            id="algeria-section"
            onClick={() => handleLocationTab('algeria')}
            className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              filters.location === 'algeria'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-gray-800/60'
            }`}
          >
            <span>🚗</span>
            <span>{t.filterInAlgeria}</span>
            <span className="text-[10px] bg-black/20 dark:bg-black/30 px-1.5 py-0.5 rounded">
              {cars.filter(c => c.location === 'algeria').length}
            </span>
          </button>

          <button
            id="rental-section"
            onClick={() => handleLocationTab('rental')}
            className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              filters.location === 'rental'
                ? 'bg-amber-600 text-gray-950 shadow-lg shadow-amber-600/20 font-black'
                : 'text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-gray-800/60'
            }`}
          >
            <span>🔑</span>
            <span>{t.filterInChina}</span>
            <span className="text-[10px] bg-black/20 dark:bg-black/30 px-1.5 py-0.5 rounded">
              {cars.filter(c => c.location === 'rental').length}
            </span>
          </button>
        </div>

        {/* Section Heading Indicator */}
        <div className="text-right sm:text-left">
          <span className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
            Auto Elite Showroom
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {filters.location === 'algeria' && 'قسم بيع السيارات (تسليم فوري)'}
            {filters.location === 'rental' && 'قسم كراء السيارات (خدمة الكراء)'}
          </h2>
        </div>

      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm dark:shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder={t.searchPlaceholder}
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Brand Filter */}
          <div>
            <select
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 rounded-xl text-sm text-slate-900 dark:text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="all">{t.filterAllBrands}</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Fuel Filter */}
          <div>
            <select
              value={filters.fuelType}
              onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 rounded-xl text-sm text-slate-900 dark:text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="all">{t.filterAllFuels}</option>
              <option value="Essence">بنزين (Essence)</option>
              <option value="Électrique">كهربائية (Électrique)</option>
              <option value="Hybride">هجينة (Hybride)</option>
              <option value="Diesel">مازوت (Diesel)</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={resetFilters}
              className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-bold border border-gray-700 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.clearFilters}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Car Cards Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              lang={lang}
              onSelectCar={onSelectCar}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-xl mx-auto">
          <CarIcon className="w-12 h-12 text-amber-400/50 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">{t.noCarsFound}</h3>
          <p className="text-sm text-gray-400 mb-6">
            جرب إعادة ضبط الفلاتر أو البحث باسم ماركة أخرى أو التواصل معنا عبر الهاتف للاستفسار عن السيارات القادمة.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-amber-500 text-gray-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            {t.clearFilters}
          </button>
        </div>
      )}

    </section>
  );
};

export default CarGrid;
