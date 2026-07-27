/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { 
  MapPin, Phone, MessageCircle, Clock, 
  ExternalLink, Compass, Video
} from 'lucide-react';
import { Language, ShowroomInfo } from '../types';
import { getTranslation } from '../translations';
import { SHOWROOM_INFO } from '../constants';

interface AboutContactProps {
  lang: Language;
  settings?: ShowroomInfo;
}

// Smart helper to convert any Google Maps link, short link, or embed code to a working iframe embed URL
export function getEmbedMapUrl(googleMapsUrl?: string, mapEmbedUrl?: string, fallbackAddress?: string): string {
  let rawUrl = (mapEmbedUrl || googleMapsUrl || '').trim();
  
  if (!rawUrl) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackAddress || "Cheraga, Algiers, Algeria")}&output=embed`;
  }

  // If the user pasted an entire <iframe> code, extract the src attribute
  if (rawUrl.includes('<iframe')) {
    const srcMatch = rawUrl.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      rawUrl = srcMatch[1];
    }
  }

  // If it's already an official Google Maps embed URL
  if (rawUrl.includes('maps/embed')) {
    return rawUrl;
  }

  // Extract query parameter or place name if it's a standard Google Maps link
  let query = '';
  try {
    if (rawUrl.includes('/place/')) {
      const match = rawUrl.match(/\/place\/([^/]+)/);
      if (match && match[1]) {
        query = decodeURIComponent(match[1]).replace(/\+/g, ' ');
      }
    } else if (rawUrl.includes('q=')) {
      const match = rawUrl.match(/[?&]q=([^&]+)/);
      if (match && match[1]) {
        query = decodeURIComponent(match[1]);
      }
    } else if (rawUrl.includes('/@')) {
      const match = rawUrl.match(/@(-?\d+\.\d+,-?\d+\.\d+)/);
      if (match && match[1]) {
        query = match[1];
      }
    }
  } catch (e) {
    query = '';
  }

  // Short links like https://maps.app.goo.gl/... or http URLs with no place query
  // cannot be resolved directly inside an iframe query.
  // Fall back to the physical address so the iframe displays a valid, pin-pointed map of the showroom!
  if (!query || query.startsWith('http')) {
    query = fallbackAddress || "Cité Les Vergers, Chéraga, Alger, Algeria";
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

const AboutContact: React.FC<AboutContactProps> = ({ lang, settings }) => {
  const t = getTranslation(lang);
  const info = settings || SHOWROOM_INFO;

  const defaultAddress = info.addressFr || info.addressEn || info.addressAr || "Cité Les Vergers, Chéraga, Alger, Algeria";
  const embedMapUrl = getEmbedMapUrl(info.googleMapsUrl, info.mapEmbedUrl, defaultAddress);

  return (
    <section id="about-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3 shadow-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>{t.aboutSectionTitle}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 font-cairo">
          {t.aboutSectionSub}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
          نحن في <span className="text-amber-600 dark:text-amber-400 font-bold">{info.name || 'Auto Elite'}</span> نسعى لتقديم أفضل خدمات كراء السيارات وبيعها في الجزائر، مع التزام تام بالجودة والاحترافية.
        </p>
      </div>

      {/* 4-Step Import Process Infographic */}
      <div className="mb-16 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-2xl">
        <h3 className="text-xl font-black text-slate-900 dark:text-white text-center mb-8 font-cairo">
          {t.processTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-50 dark:bg-gray-950 p-5 rounded-xl border border-slate-200 dark:border-gray-800 relative group hover:border-amber-500/40 transition-colors">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-sm mb-3">
              1
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.step1Title}</h4>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="bg-slate-50 dark:bg-gray-950 p-5 rounded-xl border border-slate-200 dark:border-gray-800 relative group hover:border-amber-500/40 transition-colors">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-sm mb-3">
              2
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.step2Title}</h4>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="bg-slate-50 dark:bg-gray-950 p-5 rounded-xl border border-slate-200 dark:border-gray-800 relative group hover:border-amber-500/40 transition-colors">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-sm mb-3">
              3
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.step3Title}</h4>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">{t.step3Desc}</p>
          </div>

          <div className="bg-slate-50 dark:bg-gray-950 p-5 rounded-xl border border-slate-200 dark:border-gray-800 relative group hover:border-amber-500/40 transition-colors">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-sm mb-3">
              4
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.step4Title}</h4>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">{t.step4Desc}</p>
          </div>

        </div>
      </div>

      {/* Main Grid: Contact Cards & Interactive Google Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Side (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-gray-800 pb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span>{t.contactInfoTitle}</span>
            </h3>

            <div className="space-y-5 text-sm">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-0.5">{t.addressLabel}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {lang === 'fr' ? info.addressFr : lang === 'en' ? info.addressEn : info.addressAr}
                  </span>
                </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-0.5">{t.phoneNumbersLabel}</span>
                  <div className="flex flex-col gap-1 mt-1">
                    {info.phone1 && (
                      <a 
                        href={`tel:${info.phone1}`}
                        className="text-amber-600 dark:text-amber-400 font-black text-base hover:underline"
                        dir="ltr"
                      >
                        {info.phone1}
                      </a>
                    )}
                    {info.phone2 && (
                      <a 
                        href={`tel:${info.phone2}`}
                        className="text-amber-600 dark:text-amber-400 font-black text-base hover:underline"
                        dir="ltr"
                      >
                        {info.phone2}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              {info.whatsapp && (
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 fill-emerald-500/20" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-0.5">{t.whatsappLabel}</span>
                    <a 
                      href={`https://wa.me/${info.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs mt-1 transition-colors"
                    >
                      <span>تواصل عبر الواتساب الرسمي</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-gray-400 block mb-0.5">{t.workingHoursLabel}</span>
                  <span className="text-slate-800 dark:text-gray-200">
                    {lang === 'fr' ? info.workingHoursFr : lang === 'en' ? info.workingHoursEn : info.workingHoursAr}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Social Media Links Card */}
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm dark:shadow-xl">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">{t.socialMediaTitle}</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {info.facebook && (
                <a
                  href={info.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 hover:border-blue-500 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold"
                >
                  <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span>فيسبوك {info.name}</span>
                </a>
              )}

              {info.instagram && (
                <a
                  href={info.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 hover:border-pink-500 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold"
                >
                  <svg className="w-4 h-4 text-pink-500 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span>انستغرام {info.name}</span>
                </a>
              )}

              {info.tiktok && (
                <a
                  href={info.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 hover:border-cyan-400 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold"
                >
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>تيك توك {info.name}</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Interactive Google Map Embed Side (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl">
          <div className="p-5 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{t.locationMapTitle}</h3>
            </div>
            
            <a
              href={info.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>فتح في Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[450px] bg-slate-100 dark:bg-gray-950">
            {/* Embedded Responsive Google Map Iframe */}
            <iframe
              title="Showroom Location Map"
              src={embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Floating Location Overlay Card */}
            <div className="absolute bottom-4 right-4 left-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border border-slate-200 dark:border-gray-800 p-4 rounded-xl shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">معرض {info.name} للسيارات</h4>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400">{info.addressAr}</p>
                </div>
              </div>

              <a
                href={info.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-amber-500 text-gray-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition-colors whitespace-nowrap"
              >
                الاتجاهات
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default AboutContact;
