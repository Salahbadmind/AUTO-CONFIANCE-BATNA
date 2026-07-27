/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, Plus, Edit2, Trash2, CheckCircle, ArrowRight, X, Image as ImageIcon, 
  Upload, Phone, MessageCircle, MapPin, RefreshCw, AlertTriangle, Shield, Eye,
  LayoutDashboard, Car as CarIcon, Settings, Search, LogOut, Download, Mail, Check,
  Gauge, Palette, ArrowUpRight, DollarSign, Globe, Layers, ChevronRight, Video,
  FileText, Star, Paperclip, Tag, UserCheck, Crown
} from 'lucide-react';
import { Car, Language, CarLocation, FuelType, Transmission, ShowroomInfo, DriverOption } from '../types';
import { getTranslation } from '../translations';
import { SHOWROOM_INFO } from '../constants';
import { uploadLogo, uploadHeroBg, uploadCarPhoto, uploadFicheTechnique } from '../lib/dbService';

interface AdminPanelProps {
  cars: Car[];
  lang: Language;
  settings?: ShowroomInfo;
  isAdmin: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  onSaveCar: (car: Car) => void;
  onDeleteCar: (carId: string) => void;
  onConvertLocation: (carId: string) => void;
  onResetCatalog: () => void;
  onSaveSettings?: (newSettings: ShowroomInfo) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  cars,
  lang,
  settings,
  isAdmin,
  onLogin,
  onLogout,
  onSaveCar,
  onDeleteCar,
  onConvertLocation,
  onResetCatalog,
  onSaveSettings,
  onClose
}) => {
  const t = getTranslation(lang);

  // Email & Password Auth State
  const [emailInput, setEmailInput] = useState('admin@thika.dz');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Active Tab: 'overview' | 'inventory' | 'add' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'add' | 'settings'>('overview');

  // CMS Settings Local Form State
  const initialSettings = settings || SHOWROOM_INFO;
  const [cmsName, setCmsName] = useState(initialSettings.name || 'Auto Elite');
  const [cmsLogoUrl, setCmsLogoUrl] = useState(initialSettings.logoUrl || '');
  const [cmsPhone1, setCmsPhone1] = useState(initialSettings.phone1 || '+213 550 12 34 56');
  const [cmsPhone2, setCmsPhone2] = useState(initialSettings.phone2 || '+213 661 98 76 54');
  const [cmsWhatsapp, setCmsWhatsapp] = useState(initialSettings.whatsapp || '+213550123456');
  const [cmsEmail, setCmsEmail] = useState(initialSettings.email || 'contact@thika.dz');
  const [cmsAddressAr, setCmsAddressAr] = useState(initialSettings.addressAr || 'حي البساتين، الشراقة، الجزائر العاصمة');
  const [cmsAddressFr, setCmsAddressFr] = useState(initialSettings.addressFr || 'Cité Les Vergers, Chéraga, Alger');
  const [cmsAddressEn, setCmsAddressEn] = useState(initialSettings.addressEn || 'Les Vergers, Cheraga, Algiers');
  const [cmsWorkingHoursAr, setCmsWorkingHoursAr] = useState(initialSettings.workingHoursAr || 'السبت - الخميس: 08:30 صباحاً - 06:30 مساءً');
  const [cmsGoogleMapsUrl, setCmsGoogleMapsUrl] = useState(initialSettings.googleMapsUrl || 'https://maps.google.com/?q=Cheraga+Algiers');
  const [cmsMapEmbedUrl, setCmsMapEmbedUrl] = useState(initialSettings.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.830607928237!2d2.9482110764126746!3d36.76672327003784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faf838423f001%3A0x6b8014522810a955!2sCheraga%2C%20Algiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1710000000000!5m2!1sen!2sdz');
  const [cmsHeroBgType, setCmsHeroBgType] = useState<'gradient' | 'image' | 'video'>(initialSettings.heroBgType || 'gradient');
  const [cmsHeroBgUrl, setCmsHeroBgUrl] = useState(initialSettings.heroBgUrl || '');
  const [cmsHeroOverlayOpacity, setCmsHeroOverlayOpacity] = useState<number>(initialSettings.heroOverlayOpacity ?? 75);
  const [cmsFacebook, setCmsFacebook] = useState(initialSettings.facebook || 'https://facebook.com');
  const [cmsInstagram, setCmsInstagram] = useState(initialSettings.instagram || 'https://instagram.com');
  const [cmsTiktok, setCmsTiktok] = useState(initialSettings.tiktok || 'https://tiktok.com');
  const [cmsSaveSuccess, setCmsSaveSuccess] = useState(false);
  const [cmsSaving, setCmsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      if (settings.name) setCmsName(settings.name);
      if (settings.logoUrl !== undefined) setCmsLogoUrl(settings.logoUrl);
      if (settings.phone1) setCmsPhone1(settings.phone1);
      if (settings.phone2) setCmsPhone2(settings.phone2);
      if (settings.whatsapp) setCmsWhatsapp(settings.whatsapp);
      if (settings.email) setCmsEmail(settings.email);
      if (settings.addressAr) setCmsAddressAr(settings.addressAr);
      if (settings.addressFr) setCmsAddressFr(settings.addressFr);
      if (settings.addressEn) setCmsAddressEn(settings.addressEn);
      if (settings.workingHoursAr) setCmsWorkingHoursAr(settings.workingHoursAr);
      if (settings.googleMapsUrl) setCmsGoogleMapsUrl(settings.googleMapsUrl);
      if (settings.mapEmbedUrl) setCmsMapEmbedUrl(settings.mapEmbedUrl);
      if (settings.heroBgType) setCmsHeroBgType(settings.heroBgType);
      if (settings.heroBgUrl !== undefined) setCmsHeroBgUrl(settings.heroBgUrl);
      if (settings.heroOverlayOpacity !== undefined) setCmsHeroOverlayOpacity(settings.heroOverlayOpacity);
      if (settings.facebook) setCmsFacebook(settings.facebook);
      if (settings.instagram) setCmsInstagram(settings.instagram);
      if (settings.tiktok) setCmsTiktok(settings.tiktok);
    }
  }, [settings]);

  // Form Modal / Edit / Delete state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deletingCar, setDeletingCar] = useState<Car | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Car Form Fields
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [priceDzd, setPriceDzd] = useState<number>(0);
  const [location, setLocation] = useState<CarLocation>('algeria');
  const [shippingTime, setShippingTime] = useState('30 - 45 يوم');
  const [dailyRateDzd, setDailyRateDzd] = useState<number>(15000);
  const [dailyRateWithDriverDzd, setDailyRateWithDriverDzd] = useState<number>(20000);
  const [driverOption, setDriverOption] = useState<DriverOption>('without_driver');
  const [securityDepositDzd, setSecurityDepositDzd] = useState<number>(40000);
  const [minRentalDays, setMinRentalDays] = useState<number>(3);
  const [phone, setPhone] = useState('+213 550 12 34 56');
  const [whatsapp, setWhatsapp] = useState('+213550123456');
  const [mileage, setMileage] = useState('0 كم (جديدة 2024)');
  const [exteriorColor, setExteriorColor] = useState('أبيض لؤلؤي / Blanc Nacré');
  const [interiorColor, setInteriorColor] = useState('جلد بني فاخر / Cuir Marron');
  const [fuelType, setFuelType] = useState<FuelType>('Essence');
  const [transmission, setTransmission] = useState<Transmission>('Automatic');
  const [specsInput, setSpecsInput] = useState('شاشة 12.3 بوصة, كاميرا 360°, مقاعد جلدية, فتحة سقف بانوراما');
  const [descAr, setDescAr] = useState('');
  const [descFr, setDescFr] = useState('');
  const [descEn, setDescEn] = useState('');
  
  // Fiche Technique & Colors
  const [ficheTechnique, setFicheTechnique] = useState('');
  const [ficheTechniqueName, setFicheTechniqueName] = useState('');

  // Preset Color Options
  const EXTERIOR_COLOR_OPTIONS = [
    'أبيض لؤلؤي / Blanc Nacré',
    'أسود ميتاليك / Noir Métallisé',
    'رمادي ناردو / Gris Nardo',
    'رمادي فضي / Gris Argent',
    'أزرق ملكي / Bleu Nuit',
    'أحمر بوردو / Rouge Bordeau',
    'بني برونزي / Marron Bronze',
    'أخضر زيتي / Vert Olive',
    'ذهبي شامبانيا / Or Champagne'
  ];

  const INTERIOR_COLOR_OPTIONS = [
    'جلد بني فاخر / Cuir Marron',
    'جلد كونياك أنيق / Cuir Cognac',
    'جلد أسود مطرز / Cuir Noir',
    'جلد بيج ملكي / Cuir Beige',
    'جلد أحمر وأسود / Rouge & Noir',
    'قماش رمادي فخم / Tissu Gris',
    'جلد أبيض وأزرق / Cuir Blanc & Bleu'
  ];

  // Image URLs & File Upload
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200');
  const [galleryInput, setGalleryInput] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [carSaving, setCarSaving] = useState(false);

  // Search & Filter in Admin Table
  const [adminSearch, setAdminSearch] = useState('');
  const [adminLocationFilter, setAdminLocationFilter] = useState<'all' | 'algeria' | 'rental'>('all');

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالحة للشعار (PNG, JPG, WEBP, SVG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        try {
          const isTransparentType = file.type.includes('png') || file.type.includes('webp') || file.type.includes('svg');
          const outputMime = isTransparentType ? 'image/png' : 'image/jpeg';
          const compressed = await compressImage(dataUrl, 500, 500, 0.9, outputMime);
          setCmsLogoUrl(compressed);
        } catch (err) {
          setCmsLogoUrl(dataUrl);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCmsSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create immediate local update for real-time smoothness
    const immediateSettings: ShowroomInfo = {
      name: cmsName,
      logoUrl: cmsLogoUrl,
      phone1: cmsPhone1,
      phone2: cmsPhone2,
      whatsapp: cmsWhatsapp,
      email: cmsEmail,
      addressAr: cmsAddressAr,
      addressFr: cmsAddressFr,
      addressEn: cmsAddressEn,
      workingHoursAr: cmsWorkingHoursAr,
      workingHoursFr: initialSettings.workingHoursFr || 'Samedi - Jeudi: 08:30 - 18:30',
      workingHoursEn: initialSettings.workingHoursEn || 'Saturday - Thursday: 08:30 AM - 06:30 PM',
      googleMapsUrl: cmsGoogleMapsUrl,
      mapEmbedUrl: cmsMapEmbedUrl,
      heroBgType: cmsHeroBgType,
      heroBgUrl: cmsHeroBgUrl,
      heroOverlayOpacity: cmsHeroOverlayOpacity,
      facebook: cmsFacebook,
      instagram: cmsInstagram,
      tiktok: cmsTiktok,
    };

    // Apply settings immediately to local UI and LocalStorage
    if (onSaveSettings) {
      onSaveSettings(immediateSettings);
    }
    
    // Instantly show success indicator
    setCmsSaveSuccess(true);
    setTimeout(() => setCmsSaveSuccess(false), 3500);

    // Perform uploads and database synchronization in the background non-blockingly
    (async () => {
      try {
        // 1. Upload logo if it's base64 dataUrl
        let finalLogoUrl = cmsLogoUrl;
        if (cmsLogoUrl && cmsLogoUrl.startsWith('data:')) {
          finalLogoUrl = await uploadLogo(cmsLogoUrl);
          setCmsLogoUrl(finalLogoUrl);
        }

        // 2. Upload hero background if it's base64 dataUrl
        let finalHeroBgUrl = cmsHeroBgUrl;
        if (cmsHeroBgUrl && cmsHeroBgUrl.startsWith('data:')) {
          finalHeroBgUrl = await uploadHeroBg(cmsHeroBgUrl);
          setCmsHeroBgUrl(finalHeroBgUrl);
        }

        const finalSettings: ShowroomInfo = {
          ...immediateSettings,
          logoUrl: finalLogoUrl,
          heroBgUrl: finalHeroBgUrl,
        };

        // Persist final settings with actual public URLs to DB and state
        if (onSaveSettings) {
          onSaveSettings(finalSettings);
        }
      } catch (err) {
        console.warn("Background CMS database sync warning:", err);
      }
    })();
  };

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setAuthError('يرجى كتابة البريد الإلكتروني للدخول');
      return;
    }
    if (emailInput.trim() !== 'admin@thika.dz') {
      setAuthError('البريد الإلكتروني غير صحيح! يرجى استخدام admin@thika.dz');
      return;
    }
    if (!passwordInput) {
      setAuthError('يرجى كتابة كلمة المرور للدخول');
      return;
    }
    const success = onLogin(passwordInput);
    if (!success) {
      setAuthError('بيانات الدخول غير صحيحة! يرجى التأكد من كلمة المرور');
    } else {
      setAuthError('');
      setPasswordInput('');
    }
  };

  const fillDemoCredentials = () => {
    setEmailInput('admin@thika.dz');
    setPasswordInput('thika#2026!Pass');
    setAuthError('');
  };

  // Compress image helper (preserves transparency for PNG/WEBP/SVG)
  const compressImage = (
    dataUrl: string, 
    maxWidth = 900, 
    maxHeight = 900, 
    quality = 0.7, 
    mimeType?: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      if (dataUrl.startsWith('data:image/svg+xml')) {
        resolve(dataUrl);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = dataUrl;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const targetMime = mimeType || (dataUrl.startsWith('data:image/png') ? 'image/png' : dataUrl.startsWith('data:image/webp') ? 'image/webp' : 'image/jpeg');
          resolve(canvas.toDataURL(targetMime, quality));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
    });
  };

  // File Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const rawBase64 = event.target.result as string;
          const compressed = await compressImage(rawBase64);
          setUploadedPhotos(prev => [...prev, compressed]);
          if (!mainImage || mainImage.includes('unsplash')) {
            setMainImage(compressed);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Fiche Technique File Upload Handler
  const handleFicheTechniqueUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFicheTechnique(event.target.result as string);
        setFicheTechniqueName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  // Hero Background File Upload Handler (Select photo/video from files)
  const handleHeroBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const rawBase64 = event.target.result as string;
        if (file.type.startsWith('image/')) {
          const compressed = await compressImage(rawBase64, 1920, 1080, 0.8);
          setCmsHeroBgUrl(compressed);
          setCmsHeroBgType('image');
        } else if (file.type.startsWith('video/')) {
          setCmsHeroBgUrl(rawBase64);
          setCmsHeroBgType('video');
        } else {
          setCmsHeroBgUrl(rawBase64);
          setCmsHeroBgType('image');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingCar(null);
    setBrand('Chery');
    setModel('Tiggo 8 Pro 2024');
    setYear(2024);
    setPriceDzd(4500000);
    setLocation('algeria');
    setShippingTime('30 - 45 يوم');
    setDailyRateDzd(15000);
    setDailyRateWithDriverDzd(20000);
    setDriverOption('without_driver');
    setSecurityDepositDzd(40000);
    setMinRentalDays(3);
    setPhone('+213 550 12 34 56');
    setWhatsapp('+213550123456');
    setMileage('0 كم (جديدة)');
    setExteriorColor('أبيض لؤلؤي / Blanc Nacré');
    setInteriorColor('جلد بني فاخر / Cuir Marron');
    setFuelType('Essence');
    setTransmission('Automatic');
    setSpecsInput('شاشة 12.3 بوصة, كاميرا 360°, مقاعد جلدية, فتحة سقف بانوراما');
    setDescAr('سيارة عائلية فاخرة مجهزة بجميع مواصفات الراحة والأمان متوفرة بلمح البصر في المعرض.');
    setDescFr('SUV neuf haut de gamme avec garantie et livraison immédiate.');
    setDescEn('Brand new luxury SUV with full options and immediate availability.');
    setMainImage('');
    setGalleryInput('');
    setUploadedPhotos([]);
    setFicheTechnique('');
    setFicheTechniqueName('');
    setIsFormOpen(true);
  };

  const openEditModal = (car: Car) => {
    setEditingCar(car);
    setBrand(car.brand);
    setModel(car.model);
    setYear(car.year);
    setPriceDzd(car.priceDzd || 0);
    setLocation(car.location);
    setShippingTime(car.shippingTime || '30 - 45 يوم');
    setDailyRateDzd(car.dailyRateDzd || 15000);
    setDailyRateWithDriverDzd(car.dailyRateWithDriverDzd || 20000);
    setDriverOption(car.driverOption || 'without_driver');
    setSecurityDepositDzd(car.securityDepositDzd || 40000);
    setMinRentalDays(car.minRentalDays || 3);
    setPhone(car.phone);
    setWhatsapp(car.whatsapp);
    setMileage(car.mileage || '0 كم');
    setExteriorColor(car.exteriorColor || car.color || 'أبيض لؤلؤي / Blanc Nacré');
    setInteriorColor(car.interiorColor || 'جلد بني فاخر / Cuir Marron');
    setFuelType(car.fuelType);
    setTransmission(car.transmission);
    setSpecsInput(car.specs ? car.specs.join(', ') : '');
    setDescAr(car.description?.ar || '');
    setDescFr(car.description?.fr || '');
    setDescEn(car.description?.en || '');
    setMainImage(car.mainImage || '');
    setGalleryInput('');
    
    // Combine mainImage and images array safely for uploadedPhotos preview
    const existingImgs = [car.mainImage, ...(car.images || [])].filter((img, idx, self) => img && self.indexOf(img) === idx);
    setUploadedPhotos(existingImgs);
    setFicheTechnique(car.ficheTechnique || '');
    setFicheTechniqueName(car.ficheTechniqueName || '');
    setIsFormOpen(true);
  };

  const handleFormSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const allImages = uploadedPhotos.filter(Boolean);
    const fallbackImage = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200';
    const chosenMainImageImmediate = mainImage || allImages[0] || fallbackImage;

    const parsedSpecs = specsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // 1. Create the optimistic car object immediately using the current state values (including any base64 images)
    const optimisticCar: Car = {
      id: editingCar ? editingCar.id : `car-${Date.now()}`,
      brand: brand || 'Geely',
      model: model || 'Coolray GF',
      year: Number(year) || 2024,
      priceDzd: location === 'algeria' ? (Number(priceDzd) || 0) : 0,
      priceFormatted: location === 'algeria' ? (priceDzd > 0 ? `${new Intl.NumberFormat('fr-DZ').format(priceDzd)} د.ج` : 'حسب الطلب') : undefined,
      location,
      shippingTime: location === 'rental' ? shippingTime : undefined,
      dailyRateDzd: location === 'rental' && (driverOption === 'without_driver' || driverOption === 'both') ? (Number(dailyRateDzd) || 15000) : undefined,
      dailyRateWithDriverDzd: location === 'rental' && (driverOption === 'with_driver_only' || driverOption === 'both') ? (Number(dailyRateWithDriverDzd) || 20000) : undefined,
      driverOption: location === 'rental' ? driverOption : undefined,
      securityDepositDzd: location === 'rental' ? Number(securityDepositDzd) || 40000 : undefined,
      minRentalDays: location === 'rental' ? Number(minRentalDays) || 3 : undefined,
      phone: phone || '+213 550 12 34 56',
      whatsapp: whatsapp || '+213550123456',
      mileage: mileage || '0 كم',
      exteriorColor: exteriorColor || 'أبيض لؤلؤي',
      interiorColor: interiorColor || 'جلد بني فاخر',
      color: exteriorColor || 'أسود ميتاليك',
      fuelType,
      transmission,
      mainImage: chosenMainImageImmediate,
      images: allImages.length > 0 ? allImages : [chosenMainImageImmediate],
      ficheTechnique: ficheTechnique || undefined,
      ficheTechniqueName: ficheTechniqueName || undefined,
      specs: parsedSpecs.length > 0 ? parsedSpecs : ['شاشة لمس عالية الدقة', 'كاميرا 360°'],
      description: {
        ar: descAr || `${brand} ${model} ${year} متوفرة الآن في معرض كادكس الجزائر.`,
        fr: descFr || `${brand} ${model} ${year} disponible dans notre showroom.`,
        en: descEn || `${brand} ${model} ${year} available now in showroom.`
      },
      featured: true,
      createdAt: editingCar?.createdAt || new Date().toISOString().split('T')[0]
    };

    // 2. Save to local state and close the modal instantly
    onSaveCar(optimisticCar);
    setIsFormOpen(false);

    // 3. Upload images and persist to Supabase in the background non-blockingly
    (async () => {
      try {
        const finalImages: string[] = [];
        for (let i = 0; i < allImages.length; i++) {
          const img = allImages[i];
          if (img.startsWith('data:')) {
            try {
              const uploadedUrl = await uploadCarPhoto(img, i);
              finalImages.push(uploadedUrl);
            } catch (uploadErr) {
              console.warn(`Background upload failed for image index ${i}:`, uploadErr);
              finalImages.push(img);
            }
          } else {
            finalImages.push(img);
          }
        }

        let chosenMainImage = mainImage;
        if (mainImage && mainImage.startsWith('data:')) {
          const originalIndex = allImages.indexOf(mainImage);
          if (originalIndex >= 0 && finalImages[originalIndex]) {
            chosenMainImage = finalImages[originalIndex];
          } else {
            try {
              chosenMainImage = await uploadCarPhoto(mainImage, 99);
            } catch (uploadErr) {
              console.warn("Background upload failed for main image:", uploadErr);
            }
          }
        } else if (!mainImage || !finalImages.includes(mainImage)) {
          chosenMainImage = finalImages[0] || fallbackImage;
        }

        let finalFicheTechnique = ficheTechnique;
        if (ficheTechnique && ficheTechnique.startsWith('data:')) {
          try {
            finalFicheTechnique = await uploadFicheTechnique(ficheTechnique, ficheTechniqueName || 'fiche.pdf');
          } catch (uploadErr) {
            console.warn("Background upload failed for Fiche Technique:", uploadErr);
          }
        }

        const finalCar: Car = {
          ...optimisticCar,
          mainImage: chosenMainImage,
          images: finalImages.length > 0 ? finalImages : [chosenMainImage],
          ficheTechnique: finalFicheTechnique || undefined,
        };

        // Quietly update the state with the real URLs and persist to DB
        onSaveCar(finalCar);
      } catch (backgroundErr) {
        console.warn("Background upload/save task failed:", backgroundErr);
      }
    })();
  };

  // Calculations for dashboard analytics
  const safeCars = Array.isArray(cars) ? cars : [];
  const totalCars = safeCars.length;
  const algeriaCount = safeCars.filter(c => c && c.location === 'algeria').length;
  const rentalCount = safeCars.filter(c => c && c.location === 'rental').length;
  const totalValuation = safeCars.reduce((acc, c) => acc + (c?.priceDzd || 0), 0);

  const filteredCars = safeCars.filter(car => {
    if (!car) return false;
    const matchesLoc = adminLocationFilter === 'all' ? true : car.location === adminLocationFilter;
    const query = (adminSearch || '').toLowerCase().trim();
    const brandStr = String(car.brand || '').toLowerCase();
    const modelStr = String(car.model || '').toLowerCase();
    const extColorStr = String(car.exteriorColor || car.color || '').toLowerCase();
    const intColorStr = String(car.interiorColor || '').toLowerCase();

    const matchesSearch = !query || 
      brandStr.includes(query) || 
      modelStr.includes(query) || 
      extColorStr.includes(query) ||
      intColorStr.includes(query);
    return matchesLoc && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      
      {/* Outer Container Modal */}
      <div className="bg-[#0D1117] border border-gray-800 rounded-2xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-gray-100">
        
        {/* Admin Header Bar */}
        <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gray-950 fill-gray-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg sm:text-xl text-white font-cairo">
                  Confiance Auto <span className="text-amber-400">Executive Dashboard</span>
                </h2>
                <span className="bg-amber-500/10 text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-xs text-gray-400">
                لوحة التحكم الإدارية لإدارة الأسطول والمخزون وحجز السيارات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل الخروج</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ==================== LOGIN SCREEN ==================== */}
        {!isAdmin ? (
          <div className="p-6 sm:p-12 flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-gray-900/90 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white font-cairo">
                  تسجيل الدخول للوحة التحكم
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  أدخل البريد الإلكتروني وكلمة المرور الخاصة بالإدارة
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    البريد الإلكتروني (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="write ur email here"
                      className="w-full bg-gray-950 border border-gray-800 focus:border-amber-500 rounded-xl py-3 px-4 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">
                    كلمة المرور (Strong Password)
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="write your password here"
                      className="w-full bg-gray-950 border border-gray-800 focus:border-amber-500 rounded-xl py-3 px-4 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-400 hover:underline"
                    >
                      {showPassword ? "إخفاء" : "إظهار"}
                    </button>
                  </div>
                </div>

                {/* Auth Error Banner */}
                {authError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all duration-200 mt-2"
                >
                  تسجيل الدخول إلى لوحة التحكم
                </button>

              </form>

            </div>
          </div>
        ) : (
          /* ==================== LOGGED IN DASHBOARD VIEW ==================== */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Bar / Tabs */}
            <div className="px-6 py-3 bg-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>نظرة عامة (Overview)</span>
                </button>

                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'inventory'
                      ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <CarIcon className="w-4 h-4" />
                  <span>إدارة الأسطول ({safeCars.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'settings'
                      ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>إعدادات CMS والمعرض</span>
                </button>

                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ إضافة سيارة جديدة</span>
                </button>
              </div>
            </div>

            {/* Dashboard Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* ==================== CMS SETTINGS TAB ==================== */}
              {activeTab === 'settings' ? (
                <form onSubmit={handleSaveCmsSettings} className="space-y-6 max-w-4xl mx-auto pb-8">
                  
                  {/* Header Banner */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                        <Settings className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white font-cairo">إعدادات النظام وإدارة المحتوى (CMS)</h3>
                        <p className="text-xs text-gray-400 mt-1">تخصيص خلفية الواجهة الرئيسية، بيانات المعرض ورابط Google Maps مباشرة</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-gray-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-amber-500/20"
                    >
                      <Check className="w-4 h-4" />
                      <span>حفظ إعدادات CMS</span>
                    </button>
                  </div>

                  {/* Save Success Banner */}
                  {cmsSaveSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-lg animate-fade-in">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span>تم حفظ وتحديث كافة إعدادات المعرض والشعار بنجاح!</span>
                    </div>
                  )}

                  {/* CMS SECTION 0: SHOWROOM LOGO & BRAND IDENTITY */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider pb-2 border-b border-gray-800 flex items-center gap-2 font-cairo">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>1. شعار المعرض واللوجو الرسمي (Showroom Official Logo)</span>
                    </h4>

                    <p className="text-xs text-gray-400">
                      يمكنك رفع شعار المعرض الخاص بك ليظهر تلقائياً في شريط الهيدر العلوي وفي تذييل الموقع (Footer).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-950 p-5 rounded-xl border border-gray-800">
                      
                      {/* Left: Upload controls & URL */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-2">
                            رفع شعار جديد من جهازك (Select Logo File)
                          </label>

                          <input
                            type="file"
                            id="cms-logo-file-input"
                            accept="image/*"
                            onChange={handleLogoFileUpload}
                            className="hidden"
                          />

                          <label
                            htmlFor="cms-logo-file-input"
                            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-amber-500/40 hover:border-amber-500 bg-gray-900 hover:bg-gray-850 rounded-xl transition-all text-xs font-bold text-amber-400 hover:text-amber-300 shadow-sm"
                          >
                            <Upload className="w-4 h-4" />
                            <span>اختر ملف الشعار من الكمبيوتر أو الهاتف</span>
                          </label>
                        </div>

                        {cmsLogoUrl && (
                          <button
                            type="button"
                            onClick={() => setCmsLogoUrl('')}
                            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold transition-colors pt-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف الشعار والعودة للأيقونة الافتراضية</span>
                          </button>
                        )}
                      </div>

                      {/* Right: Live Preview Box */}
                      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center justify-center text-center space-y-3">
                        
                        <div className="flex items-center justify-center gap-4 py-3 px-5 bg-gray-950 rounded-xl border border-amber-500/30">
                          <div className="flex items-center justify-center shrink-0">
                            {cmsLogoUrl ? (
                              <img src={cmsLogoUrl} alt="Logo Preview" className="h-12 max-w-[150px] w-auto object-contain drop-shadow-md" />
                            ) : (
                              <CarIcon className="w-9 h-9 text-amber-400" />
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="font-extrabold text-sm text-white tracking-wider uppercase">
                              {(cmsName && !cmsName.toUpperCase().includes('CONFIANCE')) ? cmsName : 'AUTO ELITE'}
                            </div>
                            <span className="text-[10px] text-amber-400 font-bold">
                              {cmsLogoUrl ? '✓ شعار مخصص بدون إطار' : 'أيقونة افتراضية'}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-400">
                          هكذا سيظهر الشعار المباشر بدون أي إطار أو خلفية في أعلى وأسفل الموقع.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* CMS SECTION 1: HERO BACKGROUND SETTINGS */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider pb-2 border-b border-gray-800 flex items-center gap-2 font-cairo">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>2. خلفية الجزء الأول من الموقع (Hero Section Background)</span>
                    </h4>

                    {/* Background Type Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">نوع خلفية الواجهة الرئيسية</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setCmsHeroBgType('gradient')}
                          className={`p-3 rounded-xl border text-xs font-bold text-right flex items-center gap-2 transition-all ${
                            cmsHeroBgType === 'gradient'
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                              : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          <Palette className="w-4 h-4" />
                          <div>
                            <div className="font-bold">تدرج ألوان فاخر</div>
                            <div className="text-[10px] text-gray-400 font-normal">النمط الافتراضي الأنيق</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCmsHeroBgType('image')}
                          className={`p-3 rounded-xl border text-xs font-bold text-right flex items-center gap-2 transition-all ${
                            cmsHeroBgType === 'image'
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                              : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          <ImageIcon className="w-4 h-4" />
                          <div>
                            <div className="font-bold">صورة خلفية عالية الجودة</div>
                            <div className="text-[10px] text-gray-400 font-normal">رابط صورة HD للمعرض</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCmsHeroBgType('video')}
                          className={`p-3 rounded-xl border text-xs font-bold text-right flex items-center gap-2 transition-all ${
                            cmsHeroBgType === 'video'
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                              : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                          }`}
                        >
                          <Video className="w-4 h-4" />
                          <div>
                            <div className="font-bold">فيديو متحرك (Video MP4)</div>
                            <div className="text-[10px] text-gray-400 font-normal">رابط فيديو سينمائي</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Media File Upload & URL Selection */}
                    {cmsHeroBgType !== 'gradient' && (
                      <div className="space-y-4 pt-2">
                        
                        {/* 1. File Upload Dropzone */}
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-2">
                            اختر ملف صورة أو فيديو من جهازك (Select file from computer)
                          </label>
                          
                          <input
                            type="file"
                            id="hero-bg-file-input"
                            accept={cmsHeroBgType === 'image' ? 'image/*' : 'video/*,image/*'}
                            onChange={handleHeroBgFileUpload}
                            className="hidden"
                          />

                          <label
                            htmlFor="hero-bg-file-input"
                            className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-amber-500/40 hover:border-amber-500 bg-gray-950/80 hover:bg-gray-950 rounded-2xl transition-all group shadow-inner"
                          >
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                              <Upload className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                              {cmsHeroBgType === 'image' ? 'اضغط هنا لاختيار صورة خلفية من جهازك' : 'اضغط هنا لاختيار فيديو خلفية من جهازك'}
                            </span>
                            <span className="text-[11px] text-gray-400 mt-1">
                              يدعم ملفات JPG, PNG, WEBP للصور ومقاطع MP4 للفيديوهات
                            </span>
                          </label>
                        </div>

                        {/* Live Preview Box */}
                        {cmsHeroBgUrl && cmsHeroBgUrl.trim() !== '' && (
                          <div className="bg-gray-950 border border-gray-800 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-32 h-20 rounded-lg overflow-hidden border border-amber-500/30 relative bg-black shrink-0">
                              {cmsHeroBgType === 'image' ? (
                                <img
                                  src={cmsHeroBgUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  src={cmsHeroBgUrl}
                                  className="w-full h-full object-cover"
                                  autoPlay
                                  muted
                                  loop
                                />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-amber-400 block mb-0.5">
                                تم اختيار الخلفية بنجاح ✓
                              </span>
                              <p className="text-[11px] text-gray-400 truncate dir-ltr font-mono">
                                {cmsHeroBgUrl.startsWith('data:') ? 'ملف محلي من الجهاز (Data URL Base64)' : cmsHeroBgUrl}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setCmsHeroBgUrl('')}
                              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors shrink-0"
                            >
                              إزالة الخلفية
                            </button>
                          </div>
                        )}

                      </div>
                    )}

                    {/* Overlay Opacity Slider */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-300 mb-1.5">
                        <span>مستوى التعتيم الداكن فوق الخلفية (Overlay Opacity)</span>
                        <span className="text-amber-400 font-mono">{cmsHeroOverlayOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="95"
                        value={cmsHeroOverlayOpacity}
                        onChange={(e) => setCmsHeroOverlayOpacity(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-gray-950 cursor-pointer"
                      />
                      <span className="text-[10px] text-gray-500">يضمن التعتيم وضوح وقراءة العناوين والأزرار فوق الفيديو أو الصورة</span>
                    </div>

                  </div>

                  {/* CMS SECTION 2: SHOWROOM CONTACT & INFO */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider pb-2 border-b border-gray-800 flex items-center gap-2 font-cairo">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>2. معلومات وتفاصيل المعرض (Showroom Info)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">اسم المعرض الرسمي</label>
                        <input
                          type="text"
                          value={cmsName}
                          onChange={(e) => setCmsName(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">البريد الإلكتروني</label>
                        <input
                          type="email"
                          value={cmsEmail}
                          onChange={(e) => setCmsEmail(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>

                      {/* Phone 1 */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">رقم الهاتف الأول</label>
                        <input
                          type="text"
                          value={cmsPhone1}
                          onChange={(e) => setCmsPhone1(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>

                      {/* Phone 2 */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">رقم الهاتف الثاني</label>
                        <input
                          type="text"
                          value={cmsPhone2}
                          onChange={(e) => setCmsPhone2(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">رقم الواتساب الرسمي</label>
                        <input
                          type="text"
                          value={cmsWhatsapp}
                          onChange={(e) => setCmsWhatsapp(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>

                      {/* Working Hours */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">أوقات العمل بالعربية</label>
                        <input
                          type="text"
                          value={cmsWorkingHoursAr}
                          onChange={(e) => setCmsWorkingHoursAr(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                        />
                      </div>

                    </div>

                    {/* Address Fields */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">العنوان الكامل بالعربية</label>
                        <input
                          type="text"
                          value={cmsAddressAr}
                          onChange={(e) => setCmsAddressAr(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 mb-1">العنوان بالفرنسية</label>
                          <input
                            type="text"
                            value={cmsAddressFr}
                            onChange={(e) => setCmsAddressFr(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 mb-1">العنوان بالإنجليزية</label>
                          <input
                            type="text"
                            value={cmsAddressEn}
                            onChange={(e) => setCmsAddressEn(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* CMS SECTION 3: LOCATION URL & GOOGLE MAPS */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider pb-2 border-b border-gray-800 flex items-center gap-2 font-cairo">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>3. إعدادات خريطة وموقع المعرض (Google Maps Settings)</span>
                    </h4>

                    <div className="space-y-4">
                      
                      {/* Direct Google Maps Link / Search Query */}
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          رابط Google Maps للموقع (ضع أي رابط من قوقل ماب، وستعمل الخريطة التفاعلية وتوجيهات الاتجاهات تلقائياً) *
                        </label>
                        <input
                          type="text"
                          required
                          value={cmsGoogleMapsUrl}
                          onChange={(e) => {
                            setCmsGoogleMapsUrl(e.target.value);
                            setCmsMapEmbedUrl(e.target.value);
                          }}
                          placeholder="مثال: https://maps.google.com/?q=Cheraga+Algiers أو أي رابط ماب من هاتفك"
                          className="w-full bg-gray-950 border border-gray-800 focus:border-amber-500 rounded-xl py-2.5 px-3 text-xs text-white dir-ltr font-mono"
                        />
                        <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>الأنظمة تحول أي رابط قوقل ماب تجلبه إلى خريطة تفاعلية بدون أخطاء!</span>
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* CMS SECTION 4: SOCIAL MEDIA LINKS */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider pb-2 border-b border-gray-800 flex items-center gap-2 font-cairo">
                      <Globe className="w-4 h-4 text-amber-400" />
                      <span>4. حسابات وسائط التواصل الاجتماعي (Social Media)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">رابط الفيسبوك (Facebook)</label>
                        <input
                          type="url"
                          value={cmsFacebook}
                          onChange={(e) => setCmsFacebook(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">رابط انستغرام (Instagram)</label>
                        <input
                          type="url"
                          value={cmsInstagram}
                          onChange={(e) => setCmsInstagram(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">رابط تيك توك (TikTok)</label>
                        <input
                          type="url"
                          value={cmsTiktok}
                          onChange={(e) => setCmsTiktok(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      <span>حفظ وتطبيق إعدادات CMS</span>
                    </button>
                  </div>

                </form>
              ) : (
                /* ==================== OVERVIEW & FLEET INVENTORY VIEW ==================== */
                <>
                  {/* STAT CARDS (Rendered on Overview and Inventory) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Stat 1: Total Fleet */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-400">إجمالي أسطول الكتالوج</span>
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <CarIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-white font-cairo">
                        {totalCars} <span className="text-sm font-normal text-gray-400">مركبة</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>متاحة في المعرض والاستيراد</span>
                      </p>
                    </div>

                    {/* Stat 2: Algeria Stock */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-400">متوفرة بالجزائر 🇩🇿</span>
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-emerald-400 font-cairo">
                        {algeriaCount} <span className="text-sm font-normal text-gray-400">تسليم فوري</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2">
                        متواجدة بمعرض الشراقة والمعاينة حينية
                      </p>
                    </div>

                    {/* Stat 3: Rental Cars */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-400">سيارات الكراء 🔑</span>
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <CarIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-3xl font-black text-amber-400 font-cairo">
                        {rentalCount} <span className="text-sm font-normal text-gray-400">سيارة متاحة</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2">
                        كراء يومي وشهري بشروط ميسرة
                      </p>
                    </div>

                  </div>

                  {/* SEARCH & FILTERS TOOLBAR */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                    
                    {/* Search Box */}
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        placeholder="بحث بالعلامة، الموديل، الألوان..."
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Location Filter Pills */}
                    <div className="flex items-center gap-1.5 bg-gray-950 p-1 rounded-xl border border-gray-800 w-full sm:w-auto">
                      <button
                        onClick={() => setAdminLocationFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          adminLocationFilter === 'all'
                            ? 'bg-amber-500 text-gray-950'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        الكل ({safeCars.length})
                      </button>
                      <button
                        onClick={() => setAdminLocationFilter('algeria')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          adminLocationFilter === 'algeria'
                            ? 'bg-emerald-500 text-gray-950'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        🚗 للبيع ({algeriaCount})
                      </button>
                      <button
                        onClick={() => setAdminLocationFilter('rental')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          adminLocationFilter === 'rental'
                            ? 'bg-amber-500 text-gray-950 font-black'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        🔑 للكراء ({rentalCount})
                      </button>
                    </div>

                  </div>

                  {/* FLEET DATA TABLE */}
                  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs text-gray-300">
                        <thead className="bg-gray-950 text-gray-400 font-bold uppercase border-b border-gray-800">
                          <tr>
                            <th className="p-4">السيارة</th>
                            <th className="p-4">العلامة والموديل</th>
                            <th className="p-4">السنة</th>
                            <th className="p-4">اللون الخارجي (Outside)</th>
                            <th className="p-4">لون المقصورة (Inside)</th>
                            <th className="p-4">الكيلومترات (KM)</th>
                            <th className="p-4">السعر (DZD)</th>
                            <th className="p-4">الموقع والحالة</th>
                            <th className="p-4 text-center">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60">
                          {filteredCars.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="p-8 text-center text-gray-500">
                                لا توجد سيارات مطابقة لشروط البحث
                              </td>
                            </tr>
                          ) : (
                            filteredCars.map((car) => (
                              <tr key={car.id} className="hover:bg-gray-800/40 transition-colors">
                                
                                {/* Photo Thumbnail */}
                                <td className="p-3">
                                  <div className="w-16 h-12 rounded-lg bg-gray-950 overflow-hidden border border-gray-800">
                                    <img
                                      src={car.mainImage}
                                      alt={car.model}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </td>

                                {/* Brand & Model */}
                                <td className="p-4 font-bold text-white">
                                  <div className="text-amber-400 text-[10px] uppercase font-black">{car.brand}</div>
                                  <div className="text-sm font-bold">{car.model}</div>
                                </td>

                                {/* Year */}
                                <td className="p-4 font-bold text-gray-300">{car.year}</td>

                                {/* Exterior Color */}
                                <td className="p-4">
                                  <span className="px-2.5 py-1 rounded-md bg-gray-950 border border-gray-800 text-amber-300 font-bold">
                                    {car.exteriorColor || car.color || 'أبيض لؤلؤي'}
                                  </span>
                                </td>

                                {/* Interior Color */}
                                <td className="p-4">
                                  <span className="px-2.5 py-1 rounded-md bg-gray-950 border border-gray-800 text-orange-300 font-bold">
                                    {car.interiorColor || 'جلد بني فاخر'}
                                  </span>
                                </td>

                                {/* KM / Mileage */}
                                <td className="p-4 font-mono font-bold text-gray-200">
                                  {car.mileage || '0 كم'}
                                </td>

                                {/* Price DZD */}
                                <td className="p-4 font-bold text-amber-400">
                                  {car.priceDzd > 0 ? `${new Intl.NumberFormat('fr-DZ').format(car.priceDzd)} د.ج` : 'حسب الطلب'}
                                </td>

                                {/* Location & Status Badge */}
                                <td className="p-4">
                                  {car.location === 'algeria' ? (
                                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                      <span>متوفرة بالجزائر</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold">
                                      <span>للكراء ({car.shippingTime || 'يومي'})</span>
                                    </span>
                                  )}
                                </td>

                                {/* Actions */}
                                <td className="p-4">
                                  <div className="flex items-center justify-center gap-2">
                                    
                                    {/* Convert Location button if in Rental */}
                                    {car.location === 'rental' && (
                                      <button
                                        onClick={() => onConvertLocation(car.id)}
                                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                                        title="تحويل إلى: للبيع (تسليم فوري)"
                                      >
                                        <MapPin className="w-4 h-4" />
                                      </button>
                                    )}

                                    {/* Edit Button */}
                                    <button
                                      onClick={() => openEditModal(car)}
                                      className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
                                      title="تعديل السيارة"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => setDeletingCar(car)}
                                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                                      title="حذف من المعرض"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>

                                  </div>
                                </td>

                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        )}

      </div>

      {/* ==================== ADD / EDIT VEHICLE MODAL FORM ==================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0D1117] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-gray-100">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <CarIcon className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg text-white font-cairo">
                  {editingCar ? `تعديل سيارة: ${editingCar.brand} ${editingCar.model}` : 'إضافة سيارة جديدة لكتالوج Confiance Auto'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* SECTION 1: BASIC INFO */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-orange-400 mb-3 pb-1 border-b border-gray-800 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>المعلومات الأساسية والسعر</span>
                </h4>
                
                {/* FIRST CHOICE: Choose Sale or Rental */}
                <div className="mb-4 bg-orange-500/10 border border-orange-500/30 p-3.5 rounded-xl">
                  <label className="block text-xs font-bold text-orange-300 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-orange-400" />
                    <span>حدد نوع المعاملة أولاً (للبيع أم للكراء) *</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value as CarLocation)}
                    className="w-full bg-gray-950 border border-orange-500/50 focus:border-orange-400 rounded-xl py-2.5 px-3.5 text-sm text-white font-bold"
                  >
                    <option value="algeria">🚗 للبيع (سيارة مخصصة للبيع)</option>
                    <option value="rental">🔑 للكراء (سيارة مخصصة للإيجار)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  
                  {/* Brand */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      العلامة التجارية (Brand) *
                    </label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="مثال: Chery, Geely, BYD, Jetour..."
                      className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 rounded-xl py-2 px-3 text-xs text-white"
                    />
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      الموديل (Model) *
                    </label>
                    <input
                      type="text"
                      required
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="مثال: Coolray GF Flagship"
                      className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 rounded-xl py-2 px-3 text-xs text-white"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      سنة الصنع (Year)
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 rounded-xl py-2 px-3 text-xs text-white"
                    />
                  </div>

                  {/* Price DZD - ONLY FOR SALE CARS */}
                  {location === 'algeria' && (
                    <div className="sm:col-span-3 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl">
                      <label className="block text-xs font-bold text-emerald-400 mb-1">
                        سعر البيع النهائي بالدينار الجزائري (DZD) *
                      </label>
                      <input
                        type="number"
                        value={priceDzd}
                        onChange={(e) => setPriceDzd(Number(e.target.value))}
                        placeholder="ضع 0 لظهور عبارة 'حسب الطلب'"
                        className="w-full bg-gray-950 border border-emerald-500/40 focus:border-emerald-400 rounded-xl py-2 px-3 text-sm text-emerald-400 font-black"
                      />
                    </div>
                  )}
                </div>

                {/* Rental Driver Options & Rental Pricing */}
                {location === 'rental' && (
                  <div className="bg-gray-950 border border-orange-500/30 p-4 rounded-xl space-y-4">
                    
                    {/* Driver Option Choice */}
                    <div>
                      <label className="block text-xs font-bold text-orange-400 mb-2 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-orange-400" />
                        <span>خيارات السائق لسيارة الكراء *</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        
                        <button
                          type="button"
                          onClick={() => setDriverOption('without_driver')}
                          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                            driverOption === 'without_driver'
                              ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                              : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          <span className="text-xs font-extrabold text-orange-300 block mb-1">🚗 بدون سائق فقط</span>
                          <span className="text-[10px] text-gray-400">الزبون يتكفل بقيادة السيارة بنفسه</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDriverOption('with_driver_only')}
                          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                            driverOption === 'with_driver_only'
                              ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                              : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1 mb-1">
                            <Crown className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
                            <span>إجباري مع سائق</span>
                          </span>
                          <span className="text-[10px] text-gray-400">سائق محترف من المعرض (للسيارات الفاخرة)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDriverOption('both')}
                          className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                            driverOption === 'both'
                              ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                              : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                          }`}
                        >
                          <span className="text-xs font-extrabold text-emerald-300 block mb-1">🚘 متاحة بالخيارين</span>
                          <span className="text-[10px] text-gray-400">يمكن الكراء بدون سائق أو مع سائق خاص</span>
                        </button>

                      </div>
                    </div>

                    {/* Rental Rates Based on Driver Option */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-800">
                      
                      {(driverOption === 'without_driver' || driverOption === 'both') && (
                        <div>
                          <label className="block text-xs font-bold text-orange-300 mb-1">
                            سعر الكراء اليومي بدون سائق (د.ج / يوم) *
                          </label>
                          <input
                            type="number"
                            required
                            value={dailyRateDzd}
                            onChange={(e) => setDailyRateDzd(Number(e.target.value))}
                            placeholder="مثال: 15000"
                            className="w-full bg-gray-900 border border-orange-500/40 focus:border-orange-400 rounded-xl py-2 px-3 text-xs text-orange-400 font-black"
                          />
                        </div>
                      )}

                      {(driverOption === 'with_driver_only' || driverOption === 'both') && (
                        <div>
                          <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-amber-400" />
                            <span>سعر الكراء اليومي مع سائق خاص (د.ج / يوم) *</span>
                          </label>
                          <input
                            type="number"
                            required
                            value={dailyRateWithDriverDzd}
                            onChange={(e) => setDailyRateWithDriverDzd(Number(e.target.value))}
                            placeholder="مثال: 22000"
                            className="w-full bg-gray-900 border border-amber-500/40 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-amber-300 font-black"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          مبلغ التأمين / الكفالة (د.ج)
                        </label>
                        <input
                          type="number"
                          value={securityDepositDzd}
                          onChange={(e) => setSecurityDepositDzd(Number(e.target.value))}
                          placeholder="مثال: 40000"
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500 rounded-xl py-2 px-3 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-1">
                          أقل مدة كراء (أيام)
                        </label>
                        <input
                          type="number"
                          value={minRentalDays}
                          onChange={(e) => setMinRentalDays(Number(e.target.value))}
                          placeholder="3"
                          className="w-full bg-gray-900 border border-gray-800 focus:border-orange-500 rounded-xl py-2 px-3 text-xs text-white"
                        />
                      </div>

                    </div>

                  </div>
                )}
              </div>

              {/* SECTION 2: COLORS & KM (EXPLICIT USER REQUIREMENT - INSIDE / OUTSIDE COLORS OPTIONS) */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 pb-1 border-b border-gray-800 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>الألوان والمسافة المقطوعة (Inside / Outside Colors & KM)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-950 p-4 rounded-xl border border-gray-800">
                  
                  {/* Outside Color */}
                  <div>
                    <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span>اللون الخارجي (Outside Color) *</span>
                    </label>

                    {/* Preset Dropdown Options */}
                    <select
                      value={EXTERIOR_COLOR_OPTIONS.includes(exteriorColor) ? exteriorColor : 'custom'}
                      onChange={(e) => {
                        if (e.target.value !== 'custom') {
                          setExteriorColor(e.target.value);
                        }
                      }}
                      className="w-full bg-gray-900 border border-gray-700 focus:border-amber-500 rounded-xl py-2 px-2.5 text-xs text-white font-semibold mb-2"
                    >
                      <option value="custom">-- اختر خيار اللون الخارجي --</option>
                      {EXTERIOR_COLOR_OPTIONS.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      required
                      value={exteriorColor}
                      onChange={(e) => setExteriorColor(e.target.value)}
                      placeholder="أو اكتب اللون الخارجي هنا..."
                      className="w-full bg-gray-900 border border-gray-700 focus:border-amber-500 rounded-xl py-2 px-3 text-xs text-amber-300 font-semibold"
                    />

                    {/* Quick Color Chips */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {EXTERIOR_COLOR_OPTIONS.slice(0, 4).map((colorOpt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setExteriorColor(colorOpt)}
                          className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                            exteriorColor === colorOpt
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                              : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          {colorOpt.split('/')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inside Color */}
                  <div>
                    <label className="block text-xs font-bold text-orange-300 mb-1 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      <span>لون المقصورة الداخلية (Inside Color) *</span>
                    </label>

                    {/* Preset Dropdown Options */}
                    <select
                      value={INTERIOR_COLOR_OPTIONS.includes(interiorColor) ? interiorColor : 'custom'}
                      onChange={(e) => {
                        if (e.target.value !== 'custom') {
                          setInteriorColor(e.target.value);
                        }
                      }}
                      className="w-full bg-gray-900 border border-gray-700 focus:border-amber-500 rounded-xl py-2 px-2.5 text-xs text-white font-semibold mb-2"
                    >
                      <option value="custom">-- اختر خيار لون المقصورة --</option>
                      {INTERIOR_COLOR_OPTIONS.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      required
                      value={interiorColor}
                      onChange={(e) => setInteriorColor(e.target.value)}
                      placeholder="أو اكتب لون المقصورة هنا..."
                      className="w-full bg-gray-900 border border-gray-700 focus:border-amber-500 rounded-xl py-2 px-3 text-xs text-orange-300 font-semibold"
                    />

                    {/* Quick Color Chips */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {INTERIOR_COLOR_OPTIONS.slice(0, 4).map((colorOpt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setInteriorColor(colorOpt)}
                          className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                            interiorColor === colorOpt
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500'
                              : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          {colorOpt.split('/')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* KM / Mileage */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      <span>عداد الكيلومترات (KM / Mileage) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="مثال: 0 كم (جديدة 2024) أو 15,000 كم"
                      className="w-full bg-gray-900 border border-gray-700 focus:border-amber-500 rounded-xl py-2.5 px-3 text-xs text-white font-semibold dir-ltr"
                    />
                  </div>

                </div>
              </div>

              {/* SECTION 3: TECHNICAL SPECS & CONTACT */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 pb-1 border-b border-gray-800 flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  <span>المواصفات الفنية ورقم الاتصال</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  
                  {/* Transmission */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">علبة السرعة</label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value as Transmission)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                    >
                      <option value="Automatic">أوتوماتيك (Automatic)</option>
                      <option value="Manual">يدوي (Manual)</option>
                    </select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">نوع الوقود</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value as FuelType)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                    >
                      <option value="Essence">بنزين (Essence)</option>
                      <option value="Hybride">هجين (Hybride)</option>
                      <option value="Électrique">كهربائي (Électrique)</option>
                      <option value="Diesel">ديزل (Diesel)</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">هاتف المبيعات</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">واتساب المبيعات</label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white dir-ltr"
                    />
                  </div>

                </div>
              </div>

              {/* SECTION 4: PHOTOS & FICHE TECHNIQUE FILE UPLOADS */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 pb-1 border-b border-gray-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>صور السيارة والبطاقة الفنية (Photos & Technical Sheet File)</span>
                </h4>

                <div className="space-y-5">
                  
                  {/* Photos Upload Box */}
                  <div className="border-2 border-dashed border-gray-800 hover:border-amber-500/50 rounded-2xl p-5 text-center bg-gray-950/60 transition-colors">
                    <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-gray-200 mb-1">
                      رفع صور المركبة من جهازك (اختر صورة أو أكثر)
                    </p>
                    <p className="text-[11px] text-gray-400 mb-3">
                      يمكنك اختيار صور مباشرة من الهاتف أو الكمبيوتر. سيتم تحديد الصورة الأولى كصورة رئيسية تلقائياً.
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="car-photos-upload"
                    />
                    <label
                      htmlFor="car-photos-upload"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-950 font-black text-xs shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      <span>اختيار صور من الجهاز</span>
                    </label>
                  </div>

                  {/* Uploaded Photos Thumbnails & Main Image Selection */}
                  {uploadedPhotos.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>معاينة الصور المرفوعة ({uploadedPhotos.length} صور) - اضغط على ⭐ لتعيين الصورة الرئيسية:</span>
                      </p>
                      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1">
                        {uploadedPhotos.map((photo, idx) => {
                          const isMain = photo === mainImage || (idx === 0 && !mainImage);
                          return (
                            <div 
                              key={idx} 
                              className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                                isMain ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg' : 'border-gray-800 opacity-80 hover:opacity-100'
                              }`}
                            >
                              <img src={photo} alt="Upload Preview" className="w-full h-full object-cover" />
                              
                              {/* Set as Main Image Toggle */}
                              <button
                                type="button"
                                onClick={() => setMainImage(photo)}
                                title={isMain ? "هذه هي الصورة الرئيسية" : "تعيين كصورة رئيسية"}
                                className={`absolute top-1 left-1 p-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md transition-all ${
                                  isMain 
                                    ? 'bg-amber-500 text-gray-950 font-black' 
                                    : 'bg-black/70 text-gray-300 hover:bg-amber-500 hover:text-gray-950'
                                }`}
                              >
                                <Star className={`w-3 h-3 ${isMain ? 'fill-gray-950' : ''}`} />
                              </button>

                              {/* Delete Image Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = uploadedPhotos.filter((_, i) => i !== idx);
                                  setUploadedPhotos(updated);
                                  if (isMain) {
                                    setMainImage(updated[0] || '');
                                  }
                                }}
                                title="حذف الصورة"
                                className="absolute top-1 right-1 bg-red-600/90 hover:bg-red-600 text-white rounded-md p-1 shadow-md transition-all"
                              >
                                <X className="w-3 h-3" />
                              </button>

                              {isMain && (
                                <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-gray-950 text-[9px] font-black text-center py-0.5">
                                  رئيسية ⭐
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* FICHE TECHNIQUE FILE ATTACHMENT SECTION */}
                  <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-amber-400 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span>البطاقة الفنية للمركبة (Fiche Technique / Specs Sheet)</span>
                      </label>
                      <span className="text-[10px] text-gray-400">PDF, Photo, Word</span>
                    </div>

                    <p className="text-[11px] text-gray-400">
                      يمكن للزبون الاطلاع وتحميل البطاقة الفنية التفصيلية مباشرة من صفحة السيارة.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <input
                        type="file"
                        accept=".pdf,image/*,.doc,.docx"
                        onChange={handleFicheTechniqueUpload}
                        className="hidden"
                        id="fiche-technique-input"
                      />
                      <label
                        htmlFor="fiche-technique-input"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-gray-950 font-bold text-xs border border-amber-500/30 cursor-pointer transition-all"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>{ficheTechnique ? 'تغيير البطاقة الفنية' : 'إرفاق بطاقة فنية (Select File)'}</span>
                      </label>

                      {ficheTechnique && (
                        <div className="flex items-center gap-2 bg-gray-900 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs text-amber-300">
                          <FileText className="w-4 h-4 shrink-0 text-amber-400" />
                          <span className="font-semibold truncate max-w-[180px] sm:max-w-xs">{ficheTechniqueName || 'Fiche_Technique.pdf'}</span>
                          
                          <a
                            href={ficheTechnique}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-amber-500/20 text-amber-400 rounded transition-colors mr-1"
                            title="معاينة الملف"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              setFicheTechnique('');
                              setFicheTechniqueName('');
                            }}
                            className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                            title="حذف الملف"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 5: SPECS & DESCRIPTIONS */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-3 pb-1 border-b border-gray-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>المواصفات والوصف</span>
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      المواصفات الرئيسية (تفصل بينها بفواصل ,)
                    </label>
                    <input
                      type="text"
                      value={specsInput}
                      onChange={(e) => setSpecsInput(e.target.value)}
                      placeholder="فتحة سقف بانورامية, شاشة 12.3 بوصة, كاميرا 360°, مقاعد جلدية"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 px-3 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 mb-1">الوصف بالعربية</label>
                      <textarea
                        rows={3}
                        value={descAr}
                        onChange={(e) => setDescAr(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 mb-1">الوصف بالفرنسية</label>
                      <textarea
                        rows={3}
                        value={descFr}
                        onChange={(e) => setDescFr(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white dir-ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 mb-1">الوصف بالإنجليزية</label>
                      <textarea
                        rows={3}
                        value={descEn}
                        onChange={(e) => setDescEn(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white dir-ltr"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Submit Buttons Bar */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={carSaving}
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 text-xs font-bold transition-colors disabled:opacity-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={carSaving}
                  className={`px-6 py-2.5 rounded-xl text-gray-950 text-xs font-black shadow-lg transition-all flex items-center gap-2 ${
                    carSaving 
                      ? 'bg-gray-600 text-gray-300 shadow-none cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-amber-500/20'
                  }`}
                >
                  {carSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري الرفع والحفظ...</span>
                    </>
                  ) : (
                    <span>{editingCar ? 'حفظ التعديلات' : '+ إدراج السيارة بالكتالوج'}</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {deletingCar && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white font-cairo">
                تأكيد حذف السيارة
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                هل أنت متأكد من رغبتك في حذف مركبة <span className="text-amber-400 font-bold">{deletingCar.brand} {deletingCar.model} ({deletingCar.year})</span> نهائياً من الكتالوج؟
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingCar(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-colors disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  if (!deletingCar) return;
                  setIsDeleting(true);
                  try {
                    await onDeleteCar(deletingCar.id);
                  } catch (e) {
                    console.warn("Error deleting car:", e);
                  } finally {
                    setIsDeleting(false);
                    setDeletingCar(null);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>جاري الحذف من قاعدة البيانات...</span>
                  </>
                ) : (
                  <span>تأكيد الحذف النهائي</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
