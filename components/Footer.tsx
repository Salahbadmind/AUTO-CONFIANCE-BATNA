/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Car, Phone, MessageCircle, MapPin, Lock, Video } from 'lucide-react';
import { Language, ShowroomInfo } from '../types';
import { getTranslation } from '../translations';
import { SHOWROOM_INFO } from '../constants';

interface FooterProps {
  lang: Language;
  onNavClick: (sectionId: string) => void;
  onOpenAdmin: () => void;
  settings?: ShowroomInfo;
}

const Footer: React.FC<FooterProps> = ({ lang, onNavClick, onOpenAdmin, settings }) => {
  const t = getTranslation(lang);

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.name || 'Logo'} className="h-12 sm:h-14 max-w-[220px] w-auto object-contain drop-shadow-md" />
              ) : (
                <div className="flex items-center gap-3.5">
                  <div className="text-amber-400 p-0.5 shrink-0">
                    <Car className="w-8 h-8" />
                  </div>
                  <span className="font-extrabold text-2xl text-white tracking-wider uppercase">
                    {settings?.name && !settings.name.toUpperCase().includes('CONFIANCE') ? settings.name : <>AUTO <span className="text-amber-400">ELITE</span></>}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              المعرض الموثوق لكراء وبيع أحدث السيارات في الجزائر. تسليم فوري للبيع أو كراء مباشر بخدمات احترافية.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <span>🇩🇿 الجزائر العاصمة - الشراقة</span>
            </div>
          </div>

          {/* Col 2: Quick Nav Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-gray-800 pb-2">روابط المعرض</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('algeria-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🇩🇿 {t.navCarsAlgeria}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('rental-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🔑 {t.navCarsChina}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about-section')}
                  className="hover:text-amber-400 transition-colors"
                >
                  📍 {t.navAboutContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Phone & WhatsApp */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-gray-800 pb-2">التواصل المباشر</h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${SHOWROOM_INFO.phone1}`}
                className="flex items-center gap-2 text-amber-400 hover:underline font-bold"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{SHOWROOM_INFO.phone1}</span>
              </a>

              <a
                href={`tel:${SHOWROOM_INFO.phone2}`}
                className="flex items-center gap-2 text-amber-400 hover:underline font-bold"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{SHOWROOM_INFO.phone2}</span>
              </a>

              <a
                href={`https://wa.me/${SHOWROOM_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
                <span>واتساب كونفيانس الرسمية</span>
              </a>
            </div>
          </div>

          {/* Col 4: Social & Admin */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-b border-gray-800 pb-2">مواقع التواصل وإدارة الموقع</h4>
            <div className="flex items-center gap-3 mb-6">
              <a href={SHOWROOM_INFO.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-blue-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={SHOWROOM_INFO.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-pink-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={SHOWROOM_INFO.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-cyan-400">
                <Video className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 text-xs font-bold transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navAdmin}</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>{t.footerRights}</p>
          <div className="flex items-center gap-2">
            <span>كراء وبيع السيارات في الجزائر 🇩🇿 🚗</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
