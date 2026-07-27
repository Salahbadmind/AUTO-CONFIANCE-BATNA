/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ShieldCheck, Truck, Car } from 'lucide-react';
import { Language, ShowroomInfo } from '../types';
import { getTranslation } from '../translations';

interface HeroProps {
  lang: Language;
  settings?: ShowroomInfo;
  onExploreClick?: (location: 'algeria' | 'rental') => void;
}

const Hero: React.FC<HeroProps> = ({ lang, settings, onExploreClick }) => {
  const t = getTranslation(lang);

  const bgType = settings?.heroBgType || 'gradient';
  const bgUrl = settings?.heroBgUrl;
  const overlayOpacity = (settings?.heroOverlayOpacity ?? 70) / 100;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 text-slate-900 dark:text-white pt-8 pb-16 border-b border-slate-200 dark:border-gray-800 transition-colors duration-200">
      
      {/* CMS Media Background: Photo or Video */}
      {bgType === 'image' && bgUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgUrl}
            alt="Showroom Hero Background"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-black/70 dark:bg-gray-950/80 backdrop-blur-[2px]"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {bgType === 'video' && bgUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#07090e]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={bgUrl}
          >
            <source src={bgUrl} type="video/mp4" />
          </video>
          {/* Lighter, clear overlay with no blur so that the video and its corner logo remain perfectly sharp and visible */}
          <div 
            className="absolute inset-0 bg-black/25 dark:bg-[#07090e]/30"
            style={{ opacity: Math.min(overlayOpacity, 0.35) }}
          />
        </div>
      )}

      {/* Decorative background grid and lighting for default gradient view */}
      {bgType === 'gradient' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Tagline */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm sm:text-base lg:text-lg font-extrabold tracking-wide shadow-md transition-all ${
            bgType !== 'gradient'
              ? 'bg-amber-500/20 border-amber-400/40 text-amber-300 backdrop-blur-md'
              : 'bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400'
          }`}>
            <span className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400 animate-ping shrink-0" />
            <span>{t.heroBadge}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 font-cairo ${
            bgType !== 'gradient' ? 'text-white drop-shadow-md' : 'text-slate-900 dark:text-white'
          }`}>
            {t.heroTitle}
          </h1>
          <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${
            bgType !== 'gradient' ? 'text-gray-200 drop-shadow' : 'text-slate-600 dark:text-gray-300'
          }`}>
            {t.showroomSubTitle}
          </p>
        </div>

        {/* Feature Cards Grid Banner */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          
          <div className={`border p-3.5 sm:p-4 rounded-xl transition-all shadow-sm group ${
            bgType !== 'gradient'
              ? 'bg-transparent border-white/10 backdrop-blur-[4px] hover:border-amber-500/60'
              : 'bg-transparent border-slate-200/50 dark:border-gray-800/40 backdrop-blur-[4px] hover:border-amber-500/50'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-2.5 group-hover:scale-105 transition-transform">
              <Car className="w-4 h-4" />
            </div>
            <h3 className={`text-sm sm:text-base font-bold mb-1 ${bgType !== 'gradient' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              {t.statInAlgeria}
            </h3>
            <p className={`text-[11px] sm:text-xs leading-relaxed ${bgType !== 'gradient' ? 'text-gray-300' : 'text-slate-600 dark:text-gray-400'}`}>
              تشكيلة متنوعة من سيارات Geely, Chery, Jetour متوفرة فورياً بالمعرض لمعاينتها وتجربتها.
            </p>
          </div>

          <div className={`border p-3.5 sm:p-4 rounded-xl transition-all shadow-sm group ${
            bgType !== 'gradient'
              ? 'bg-transparent border-white/10 backdrop-blur-[4px] hover:border-amber-500/60'
              : 'bg-transparent border-slate-200/50 dark:border-gray-800/40 backdrop-blur-[4px] hover:border-amber-500/50'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-2.5 group-hover:scale-105 transition-transform">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className={`text-sm sm:text-base font-bold mb-1 ${bgType !== 'gradient' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              {t.statInChina}
            </h3>
            <p className={`text-[11px] sm:text-xs leading-relaxed ${bgType !== 'gradient' ? 'text-gray-300' : 'text-slate-600 dark:text-gray-400'}`}>
              خدمات كراء السيارات بأفضل الموديلات وأحدث الأسعار اليومية والأسبوعية مع إجراءات ميسرة.
            </p>
          </div>

          <div className={`border p-3.5 sm:p-4 rounded-xl transition-all shadow-sm group ${
            bgType !== 'gradient'
              ? 'bg-transparent border-white/10 backdrop-blur-[4px] hover:border-amber-500/60'
              : 'bg-transparent border-slate-200/50 dark:border-gray-800/40 backdrop-blur-[4px] hover:border-amber-500/50'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-2.5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className={`text-sm sm:text-base font-bold mb-1 ${bgType !== 'gradient' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              ضمان قانوني وتخليص شامل
            </h3>
            <p className={`text-[11px] sm:text-xs leading-relaxed ${bgType !== 'gradient' ? 'text-gray-300' : 'text-slate-600 dark:text-gray-400'}`}>
              نضمن سلامة جميع الوثائق والجمركة القانونية وتسليم الملفات الإدارية جاهزة للبطاقة الرمادية.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
