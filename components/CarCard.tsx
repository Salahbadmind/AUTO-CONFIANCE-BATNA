/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Phone, MessageCircle, Clock, Check, Eye, Fuel, Gauge, Calendar, ShieldCheck, FileText, Crown, UserCheck } from 'lucide-react';
import { Car, Language } from '../types';
import { getTranslation } from '../translations';

interface CarCardProps {
  car: Car;
  lang: Language;
  onSelectCar: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, lang, onSelectCar }) => {
  const t = getTranslation(lang);

  const formatDzd = (price: number) => {
    if (!price || price === 0) return t.priceOnRequest;
    return new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(price) + ' د.ج';
  };

  const whatsappLink = `https://wa.me/${car.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `${t.whatsappMessagePrefix} ${car.brand} ${car.model} (${car.year}) - ${car.location === 'algeria' ? t.badgeInAlgeria : t.badgeInChina}`
  )}`;

  return (
    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col group shadow-sm">
      
      {/* Top Image Container */}
      <div 
        onClick={() => onSelectCar(car)}
        className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 dark:bg-gray-950 cursor-pointer"
      >
        <img
          src={car.mainImage}
          alt={`${car.brand} ${car.model}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Location & Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {car.location === 'algeria' ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-gray-950 text-xs font-black px-3 py-1.5 rounded-full shadow-lg border border-emerald-400">
              <span className="w-2 h-2 rounded-full bg-gray-950 animate-pulse" />
              <span>{t.badgeInAlgeria}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{t.badgeInChina}</span>
            </span>
          )}
        </div>

        {/* Fiche Technique Badge on Top Left */}
        {car.ficheTechnique && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-gray-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg border border-amber-400">
              <FileText className="w-3 h-3" />
              <span>Fiche Technique</span>
            </span>
          </div>
        )}

        {/* Rental Info Pill if rental */}
        {car.location === 'rental' && (
          <div className="absolute bottom-3 right-3 left-3 bg-gray-950/90 backdrop-blur-md border border-orange-500/40 text-orange-300 text-[11px] font-bold px-2.5 py-1.5 rounded-xl flex items-center justify-between gap-1 shadow-lg">
            <span className="flex items-center gap-1">
              {car.driverOption === 'with_driver_only' ? (
                <span className="text-amber-400 font-extrabold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>إجباري مع سائق</span>
                </span>
              ) : car.driverOption === 'both' ? (
                <span className="text-emerald-400 font-extrabold">🚘 مع أو بدون سائق</span>
              ) : (
                <span className="text-gray-300 font-extrabold">🚗 بدون سائق</span>
              )}
            </span>
            {car.minRentalDays && (
              <span className="text-[10px] text-gray-400 font-normal">
                أدنى مدة: <strong className="text-white">{car.minRentalDays} أيام</strong>
              </span>
            )}
          </div>
        )}

        {/* Hover View Detail Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-amber-500 text-gray-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-4 h-4" />
            <span>عرض الصور والتفاصيل</span>
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Model Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {car.brand}
              </span>
              <h3 
                onClick={() => onSelectCar(car)}
                className="text-lg font-black text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
              >
                {car.model} <span className="text-slate-500 dark:text-gray-400 font-normal">({car.year})</span>
              </h3>
            </div>

            {/* Price Tag */}
            <div className="text-right">
              {car.location === 'rental' ? (
                <div>
                  {car.driverOption === 'with_driver_only' ? (
                    <div className="text-sm font-extrabold text-amber-500 dark:text-amber-400 whitespace-nowrap">
                      {formatDzd(car.dailyRateWithDriverDzd || car.dailyRateDzd || 0)} <span className="text-[10px] text-slate-500 font-normal">/ يوم (مع سائق)</span>
                    </div>
                  ) : car.driverOption === 'both' ? (
                    <div>
                      <div className="text-sm font-extrabold text-orange-600 dark:text-orange-400 whitespace-nowrap">
                        {formatDzd(car.dailyRateDzd || 0)} <span className="text-[10px] text-slate-500 font-normal">/ يوم</span>
                      </div>
                      {car.dailyRateWithDriverDzd && (
                        <div className="text-[10px] text-amber-500 font-bold">
                          أو مع سائق: {formatDzd(car.dailyRateWithDriverDzd)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm font-extrabold text-orange-600 dark:text-orange-400 whitespace-nowrap">
                      {formatDzd(car.dailyRateDzd || car.priceDzd || 0)} <span className="text-[10px] text-slate-500 font-normal">/ يوم</span>
                    </div>
                  )}
                  {car.securityDepositDzd && (
                    <div className="text-[10px] text-slate-400">كفالة: {formatDzd(car.securityDepositDzd)}</div>
                  )}
                </div>
              ) : (
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                  {formatDzd(car.priceDzd)}
                </div>
              )}
            </div>
          </div>

          {/* Quick Technical Specs Row */}
          <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-slate-50 dark:bg-gray-950/80 border border-slate-200 dark:border-gray-800/80 text-xs text-slate-700 dark:text-gray-300">
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="truncate">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="truncate">{car.transmission === 'Automatic' ? 'أوتوماتيك' : 'يدوي'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="truncate">{car.mileage}</span>
            </div>
          </div>

          {/* Top 3 Specs Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {car.specs.slice(0, 3).map((spec, idx) => (
              <span 
                key={idx}
                className="bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200 dark:border-gray-700/60"
              >
                • {spec}
              </span>
            ))}
            {car.specs.length > 3 && (
              <span className="text-slate-500 dark:text-gray-500 text-[11px] self-center">
                +{car.specs.length - 3} المزيد
              </span>
            )}
          </div>
        </div>

        {/* Direct Call & WhatsApp Action Buttons (REPLACES CART) */}
        <div className="pt-3 border-t border-slate-200 dark:border-gray-800/80 grid grid-cols-2 gap-2 mt-auto">
          
          {/* Phone Call Button */}
          <a
            href={`tel:${car.phone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-gray-950 font-bold text-xs border border-amber-500/30 transition-all duration-200"
            title={t.btnCallNow}
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>{t.btnCallNow}</span>
          </a>

          {/* WhatsApp Chat Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs border border-emerald-500/30 transition-all duration-200"
            title={t.btnWhatsApp}
          >
            <MessageCircle className="w-4 h-4 shrink-0 fill-emerald-400/20 hover:fill-white" />
            <span>{t.btnWhatsApp}</span>
          </a>

        </div>

      </div>

    </div>
  );
};

export default CarCard;
