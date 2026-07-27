/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarGrid from './components/CarGrid';
import CarDetail from './components/CarDetail';
import AboutContact from './components/AboutContact';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { Car, Language, Theme, ViewState, ShowroomInfo } from './types';
import { INITIAL_CARS, SHOWROOM_INFO } from './constants';
import { 
  subscribeCars, 
  subscribeShowroomInfo, 
  saveCarToDb, 
  deleteCarFromDb, 
  saveShowroomInfoToDb,
  safeSetLocalStorage
} from './lib/dbService';

function App() {
  // Load cars state (initialized from localStorage or INITIAL_CARS while Firestore connects)
  const [cars, setCars] = useState<Car[]>(() => {
    try {
      const saved = localStorage.getItem('kadex_cars');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load cars from localStorage:", e);
    }
    return INITIAL_CARS;
  });

  // Load showroom settings (initialized from localStorage or SHOWROOM_INFO while Firestore connects)
  const [showroomSettings, setShowroomSettings] = useState<ShowroomInfo>(() => {
    try {
      const saved = localStorage.getItem('kadex_showroom_info');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load showroom info from localStorage:", e);
    }
    return SHOWROOM_INFO;
  });

  // Real-time Firestore synchronization for Cars & Showroom Settings
  useEffect(() => {
    const unsubCars = subscribeCars((updatedCars) => {
      setCars(updatedCars);
      safeSetLocalStorage('kadex_cars', updatedCars);
    });

    const unsubInfo = subscribeShowroomInfo((updatedInfo) => {
      setShowroomSettings(updatedInfo);
      safeSetLocalStorage('kadex_showroom_info', updatedInfo);
    });

    return () => {
      unsubCars();
      unsubInfo();
    };
  }, []);

  // Language state (default Arabic)
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('kadex_lang') as Language) || 'ar';
  });

  // Theme state (default dark)
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('kadex_theme') as Theme) || 'dark';
  });

  // View state
  const [view, setView] = useState<ViewState>({ type: 'home' });

  // Selected Location Filter
  const [locationFilter, setLocationFilter] = useState<'algeria' | 'rental'>('algeria');

  // Admin state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Active section for header nav highlight
  const [activeNavSection, setActiveNavSection] = useState('all');

  // Sync theme with HTML root class
  useEffect(() => {
    safeSetLocalStorage('kadex_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Sync language with HTML dir attribute
  useEffect(() => {
    safeSetLocalStorage('kadex_lang', lang);
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  // Persist cars changes to localStorage
  const saveCarsToStorage = (updatedCars: Car[]) => {
    setCars(updatedCars);
    safeSetLocalStorage('kadex_cars', updatedCars);
  };

  // Nav scroll or jump handler
  const handleNavClick = (sectionId: string) => {
    if (view.type !== 'home') {
      setView({ type: 'home' });
    }

    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'algeria-section') {
      setLocationFilter('algeria');
      setActiveNavSection('algeria-section');
    } else if (sectionId === 'rental-section') {
      setLocationFilter('rental');
      setActiveNavSection('rental-section');
    } else if (sectionId === 'about-section') {
      setActiveNavSection('about-section');
    }

    setTimeout(() => {
      const el = document.getElementById(sectionId) || document.getElementById('cars-grid');
      if (el) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Admin Car Handlers - Directly update DB & local state
  const handleSaveCar = async (carToSave: Car) => {
    try {
      setCars(prev => {
        const idx = prev.findIndex(c => c.id === carToSave.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = carToSave;
          return next;
        }
        return [carToSave, ...prev];
      });
      await saveCarToDb(carToSave);
    } catch (e: any) {
      console.error("Failed to save car to DB:", e);
      alert(`⚠️ تعذر حفظ السيارة في قاعدة البيانات: ${e?.message || 'خطأ في الاتصال'}`);
      throw e;
    }
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      setCars(prev => prev.filter(c => c.id !== carId));
      await deleteCarFromDb(carId);
    } catch (e: any) {
      console.error("Failed to delete car from DB:", e);
      alert(`⚠️ تعذر حذف السيارة من قاعدة البيانات: ${e?.message || 'خطأ في الاتصال'}`);
      throw e;
    }
  };

  const handleConvertLocation = async (carId: string) => {
    const targetCar = cars.find(c => c.id === carId);
    if (!targetCar) return;

    const updatedCar: Car = {
      ...targetCar,
      location: 'algeria' as const,
      shippingTime: undefined
    };

    try {
      setCars(prev => prev.map(c => c.id === carId ? updatedCar : c));
      await saveCarToDb(updatedCar);
    } catch (e: any) {
      console.error("Failed to convert car location in DB:", e);
      alert(`⚠️ تعذر تغيير موقع السيارة في قاعدة البيانات: ${e?.message || 'خطأ في الاتصال'}`);
    }
  };

  const handleResetCatalog = async () => {
    try {
      setCars(INITIAL_CARS);
      // Delete existing cars in DB first
      for (const car of cars) {
        await deleteCarFromDb(car.id);
      }
      // Re-seed initial cars
      for (const car of INITIAL_CARS) {
        await saveCarToDb(car);
      }
    } catch (e: any) {
      console.error("Failed to reset catalog in DB:", e);
      alert(`⚠️ تعذر استعادة الكتالوج في قاعدة البيانات: ${e?.message || 'خطأ في الاتصال'}`);
    }
  };

  const handleSaveSettings = async (newSettings: ShowroomInfo) => {
    setShowroomSettings(newSettings);
    safeSetLocalStorage('kadex_showroom_info', newSettings);
    try {
      await saveShowroomInfoToDb(newSettings);
    } catch (e: any) {
      console.error("Failed to save settings to Firestore DB:", e);
      alert(`⚠️ تعذر حفظ إعدادات المعرض في قاعدة البيانات: ${e?.message || 'خطأ في الاتصال'}`);
    }
  };

  const handleAdminLogin = (pin: string) => {
    const clean = pin.trim();
    if (clean === 'thika#2026!Pass') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0B0E14] text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Header Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        theme={theme}
        onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        activeSection={activeNavSection}
        onNavClick={handleNavClick}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdmin={isAdminLoggedIn}
        settings={showroomSettings}
      />

      <main>
        {view.type === 'home' && (
          <>
            {/* Hero Showcase */}
            <Hero
              lang={lang}
              settings={showroomSettings}
              onExploreClick={(loc) => {
                setLocationFilter(loc);
                handleNavClick(loc === 'algeria' ? 'algeria-section' : 'rental-section');
              }}
            />

            {/* Cars Showcase Grid (3 Main Views: All, Algeria, Rental) */}
            <CarGrid
              cars={cars}
              lang={lang}
              selectedLocationFilter={locationFilter}
              onLocationTabChange={(loc) => setLocationFilter(loc)}
              onSelectCar={(car) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'car-detail', car });
              }}
            />

            {/* About & Interactive Map & General Contact Section */}
            <AboutContact lang={lang} settings={showroomSettings} />
          </>
        )}

        {/* Car Detailed View */}
        {view.type === 'car-detail' && (
          <CarDetail
            car={view.car}
            allCars={cars}
            lang={lang}
            onBack={() => setView({ type: 'home' })}
            onSelectCar={(selectedCar) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'car-detail', car: selectedCar });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavClick={handleNavClick}
        onOpenAdmin={() => setIsAdminOpen(true)}
        settings={showroomSettings}
      />

      {/* Owner / Admin Management Modal */}
      {isAdminOpen && (
        <ErrorBoundary fallbackTitle="خطأ في تحميل لوحة التحكم">
          <AdminPanel
            cars={cars || []}
            lang={lang}
            settings={showroomSettings}
            isAdmin={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={() => setIsAdminLoggedIn(false)}
            onSaveCar={handleSaveCar}
            onDeleteCar={handleDeleteCar}
            onConvertLocation={handleConvertLocation}
            onResetCatalog={handleResetCatalog}
            onSaveSettings={handleSaveSettings}
            onClose={() => setIsAdminOpen(false)}
          />
        </ErrorBoundary>
      )}

    </div>
  );
}

export default App;
