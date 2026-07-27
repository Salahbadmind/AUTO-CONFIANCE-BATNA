/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Moon, Sun, Globe, ShieldCheck, Lock, Car as CarIcon, Sparkles, Award } from 'lucide-react';
import { Language, Theme, ShowroomInfo } from '../types';
import { getTranslation } from '../translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
  settings?: ShowroomInfo;
}

const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  activeSection,
  onNavClick,
  onOpenAdmin,
  isAdmin,
  settings
}) => {
  const t = getTranslation(lang);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 sm:h-28 flex items-center justify-between transition-all duration-200">
        
        {/* Brand Logo & Marketing Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div 
            onClick={() => onNavClick('top')}
            className="flex items-center cursor-pointer group shrink-0"
          >
            {/* Frameless, Bigger Logo Container */}
            <div className="flex items-center justify-center shrink-0">
              {settings?.logoUrl ? (
                <img 
                  src={settings.logoUrl} 
                  alt={settings.name || 'Logo'} 
                  className="h-18 sm:h-24 max-h-24 max-w-[280px] sm:max-w-[420px] w-auto object-contain drop-shadow-[0_4px_12px_rgba(249,115,22,0.2)] dark:drop-shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:brightness-110" 
                />
              ) : (
                <div className="flex items-center gap-3.5 text-orange-500 dark:text-orange-400 drop-shadow-md p-1">
                  <CarIcon className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
                  {(!settings?.name || !settings.name.toUpperCase().includes('CONFIANCE')) && (
                    <span className="font-extrabold text-xl sm:text-2xl tracking-wider text-slate-900 dark:text-white uppercase">
                      {settings?.name || 'AUTO ELITE'}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Marketing Highlight Badge near Logo */}
          <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/35 backdrop-blur-sm transition-all hover:border-orange-500/60 hover:bg-orange-500/20 shadow-sm">
            <div className="relative flex items-center justify-center shrink-0">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 animate-pulse" />
                <span className="text-xs font-black text-orange-600 dark:text-orange-400 tracking-wide">
                  {lang === 'ar' ? 'معرض بيع وكراء السيارات 🇩🇿' : lang === 'fr' ? 'Vente & Location de Voitures 🇩🇿' : 'Car Sales & Rental Showroom 🇩🇿'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                {lang === 'ar' ? '⚡ أفضل الأسعار للبيع والكراء اليومي' : lang === 'fr' ? '⚡ Offres Vente & Location Disponibles' : '⚡ Best Rates for Sale & Rental'}
              </span>
            </div>
          </div>

          {/* Compact Mobile/Tablet Marketing Badge */}
          <div className="flex lg:hidden items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 shrink-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-extrabold text-orange-600 dark:text-orange-400 whitespace-nowrap">
              {lang === 'ar' ? '⚡ بيع وكراء السيارات 🇩🇿' : lang === 'fr' ? '⚡ Vente & Location 🇩🇿' : '⚡ Sale & Rental 🇩🇿'}
            </span>
          </div>
        </div>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors">
              <Globe className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className="uppercase font-bold">{lang}</span>
            </button>
            <div className="absolute left-0 lg:right-0 lg:left-auto top-full mt-1 hidden group-hover:block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-1 min-w-[120px] z-50">
              <button
                onClick={() => onLanguageChange('ar')}
                className={`w-full text-right px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${
                  lang === 'ar' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>العربية</span>
                <span>🇩🇿</span>
              </button>
              <button
                onClick={() => onLanguageChange('fr')}
                className={`w-full text-right px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${
                  lang === 'fr' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>Français</span>
                <span>🇫🇷</span>
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`w-full text-right px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${
                  lang === 'en' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>English</span>
                <span>🇬🇧</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700" />
            )}
          </button>

          {/* Admin Lock Button */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isAdmin
                ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40 shadow-sm'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
            }`}
            title={t.navAdmin}
          >
            <Lock className={`w-3.5 h-3.5 ${isAdmin ? 'text-red-500 dark:text-red-400' : 'text-amber-500 dark:text-amber-400'}`} />
            <span className="hidden sm:inline">{isAdmin ? 'المشرف (نشط)' : t.navAdmin}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-gray-200 dark:border-gray-800 bg-gray-50/95 dark:bg-gray-950/95 py-2 px-1 text-xs">
        <button
          onClick={() => onNavClick('algeria-section')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeSection === 'algeria-section' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          🇩🇿 في الجزائر
        </button>
        <button
          onClick={() => onNavClick('rental-section')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeSection === 'rental-section' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          🔑 كراء السيارات
        </button>
        <button
          onClick={() => onNavClick('about-section')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeSection === 'about-section' ? 'bg-amber-500 text-gray-950 font-bold' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          📍 التواصل والموقع
        </button>
      </div>
    </header>
  );
};

export default Navbar;
