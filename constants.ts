/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Car, ShowroomInfo } from './types';

export const SHOWROOM_INFO: ShowroomInfo = {
  name: 'Auto Elite',
  logoUrl: '',
  phone1: '+213 550 12 34 56',
  phone2: '+213 770 98 76 54',
  whatsapp: '+213550123456',
  email: 'contact@confiance-auto.dz',
  addressAr: 'حي البساتين، الشراقة (مقابل المركز التجاري)، الجزائر العاصمة',
  addressFr: 'Cité Les Bosquets, Chéraga, Alger, Algérie',
  addressEn: 'Les Bosquets, Cheraga, Algiers, Algeria',
  workingHoursAr: 'من السبت إلى الخميس: 09:00 صباحاً - 07:00 مساءً',
  workingHoursFr: 'Samedi au Jeudi: 09h00 - 19h00',
  workingHoursEn: 'Saturday to Thursday: 09:00 AM - 07:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=36.7667,2.9500',
  mapEmbedUrl: '',
  facebook: 'https://facebook.com/confianceauto.dz',
  instagram: 'https://instagram.com/confianceauto.dz',
  tiktok: 'https://tiktok.com/@confiance_auto',
  heroBgType: 'gradient',
  heroBgUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1920',
  heroOverlayOpacity: 70
};

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-1',
    brand: 'Chery',
    model: 'Tiggo 7 Pro Max',
    year: 2024,
    priceDzd: 4250000,
    priceFormatted: '4,250,000 د.ج',
    location: 'algeria',
    mainImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 550 12 34 56',
    whatsapp: '+213550123456',
    mileage: '0 كم (جديدة 2024)',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'أسود ميتاليك / Noir Métallisé',
    specs: [
      'شاشة مزدوجة HD مقاس 12.3 بوصة',
      'فتحة سقف بانورامية كهربائية',
      'رؤية شاملة كاميرات 360°',
      'مقاعد جلد فاخرة مع تبريد وتدفئة',
      'نظام صوتي سوني Sony مكون من 8 مكبرات',
      'عجلات ألومنيوم 18 بوصة رياضية'
    ],
    description: {
      ar: 'شيري تيجو 7 برو ماكس 2024 متوفرة الآن في معرض كونفيانس أوتو بتسليم فوري. سيارة SUV عائلية فخمة ومريحة ومجهزة بأحدث تقنيات الأمان والسلامة الذكية.',
      fr: 'Chery Tiggo 7 Pro Max 2024 disponible immédiatement dans notre showroom Confiance Auto à Alger. Un SUV familial puissant, élégant et suréquipé avec garantie.',
      en: 'Chery Tiggo 7 Pro Max 2024 available for immediate delivery at Confiance Auto showroom in Algiers. A stylish family SUV packed with smart technology.'
    },
    featured: true,
    createdAt: '2026-07-20'
  },
  {
    id: 'car-2',
    brand: 'Geely',
    model: 'Coolray GF Flagship',
    year: 2024,
    priceDzd: 3980000,
    priceFormatted: '3,980,000 د.ج',
    location: 'algeria',
    mainImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 550 12 34 56',
    whatsapp: '+213550123456',
    mileage: '0 كم',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'فضايي / Gris Métallisé',
    specs: [
      'محرك 1.5 터보 بقوة 177 حصان',
      'علبة سرعة أوتوماتيكية دبل كلتش 7 سرعات',
      'نظام قيادة ذاتية L2 فرامل طوارئ تلقائية',
      'شاشة عدادات رقمية وشاشة ترفيه 12.3 بوصة',
      'جناح خلفي رياضي وفتحة سقف بانوراما'
    ],
    description: {
      ar: 'جيلي كولراي فل جينيريشن 2024 متوفرة باللون الفضي الرياضي بطلب فوري. محرك قوي جداً وتصميم رياضي هجومي مع مقاعد جلد مطعمة بالكاربون فايبر.',
      fr: 'Geely Coolray GF 2024 disponible en stock à Alger. Design agressif et sportif, moteur 1.5 Turbo 177 ch et intérieur cuir sport.',
      en: 'Geely Coolray GF 2024 in stock at Algiers showroom. Sporty design, 1.5 Turbo engine with 177 HP and futuristic interior.'
    },
    featured: true,
    createdAt: '2026-07-21'
  },
  {
    id: 'car-3',
    brand: 'Jetour',
    model: 'Dashing Luxury',
    year: 2024,
    priceDzd: 4850000,
    priceFormatted: '4,850,000 د.ج',
    location: 'algeria',
    mainImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 770 98 76 54',
    whatsapp: '+213770987654',
    mileage: '0 كم (جديدة)',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'رمادي غامق / Gris Anthracite',
    specs: [
      'محرك 1.6 Turbo بقوة 197 حصان',
      'شاشة تحكم مركزية عملاقة 15.6 بوصة',
      'مقابض أبواب مخفية كهربائية',
      'مقاعد ذكية بتدفئة وتبريد ومساج',
      'إضاءة محيطية ambient light 64 لون'
    ],
    description: {
      ar: 'جيتور داشينج لوكس 2024 الفاخرة متوفرة في الجزائر العاصمة تسليم حيني. تصميم مستقبلي مستوحى من الطائرات مع مقصورة فائقة الفخامة.',
      fr: 'Jetour Dashing Luxury 2024 disponible immédiatement en Algérie. SUV futuriste d\'exception avec moteur 1.6T 197ch.',
      en: 'Jetour Dashing Luxury 2024 available in Algiers showroom. Futuristic SUV with 1.6T 197 HP engine and ultra-luxurious cabin.'
    },
    featured: true,
    createdAt: '2026-07-22'
  },
  {
    id: 'car-4',
    brand: 'DFSK',
    model: 'Fengon 500 CVT',
    year: 2024,
    priceDzd: 2980000,
    priceFormatted: '2,980,000 د.ج',
    location: 'algeria',
    mainImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 550 12 34 56',
    whatsapp: '+213550123456',
    mileage: '0 كم',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'أبيض ناصع / Blanc Pur',
    specs: [
      'سعر اقتصادي منافس جداً في السوق الجزائري',
      'فتحة سقف مجهزة',
      'شاشة لمس متعددة الوظائف',
      'كاميرا وحساسات ركن خلفية',
      'نظام توفير الوقود'
    ],
    description: {
      ar: 'دي أف اس كي فينجون 500 خيار ممتاز واقتصادي للجمهور الجزائري بجميع الضمانات. متوفرة تسليم فوري.',
      fr: 'DFSK Fengon 500 automatique, le choix économique idéal avec toutes les options et livraison immédiate.',
      en: 'DFSK Fengon 500 automatic, great affordable SUV for Algerian market with immediate delivery.'
    },
    featured: false,
    createdAt: '2026-07-23'
  },

  // Rental Vehicles
  {
    id: 'car-5',
    brand: 'BYD',
    model: 'Song Plus EV / DM-i 2024',
    year: 2024,
    priceDzd: 5600000,
    priceFormatted: '5,600,000 د.ج',
    location: 'rental',
    dailyRateDzd: 18000,
    dailyRateWithDriverDzd: 25000,
    driverOption: 'both',
    securityDepositDzd: 50000,
    minRentalDays: 3,
    mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 550 12 34 56',
    whatsapp: '+213550123456',
    mileage: '0 كم (جديدة)',
    transmission: 'Automatic',
    fuelType: 'Électrique',
    color: 'كحلي ميتاليك / Bleu Nuit',
    specs: [
      'بطارية بليد بلاس Blade Battery الأكثر أماناً في العالم',
      'مدى سير كهربائي يصل إلى 605 كم للشحنة الواحدة',
      'شاشة تحكم قابلة للدوران كهربائياً مقاس 15.6 بوصة',
      'نظام قيادة ذكي DiPilot أمان كامل',
      'شحن سريع 30 دقيقة من 30% إلى 80%'
    ],
    description: {
      ar: 'بي واي دي سونغ بلاس الكهربائية المتاحة للكراء اليومي والشهري. سيارة عائلية فخمة ومريحة جداً للتنقلات الطويلة والرحلات.',
      fr: 'BYD Song Plus EV / DM-i disponible pour la location journalière et mensuelle. Confort et autonomie supérieure.',
      en: 'BYD Song Plus EV / DM-i available for daily and monthly rental. Ultra comfortable and spacious.'
    },
    featured: true,
    createdAt: '2026-07-18'
  },
  {
    id: 'car-6',
    brand: 'Changan',
    model: 'CS55 Plus Tech',
    year: 2024,
    priceDzd: 4100000,
    priceFormatted: '4,100,000 د.ج',
    location: 'rental',
    dailyRateDzd: 14000,
    driverOption: 'without_driver',
    securityDepositDzd: 40000,
    minRentalDays: 2,
    mainImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 770 98 76 54',
    whatsapp: '+213770987654',
    mileage: '0 كم',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'رمادي مات / Gris Mat',
    specs: [
      'محرك Blue Core 1.5 Turbo بقوة 188 حصان',
      'علبة سرعة 7 DCT مائية',
      'نظام صوتي بيونير Pioneer عالمي',
      'كاميرا تسجل الطريق dashcam مدمجة',
      'مقصورة حمراء رياضية فريدة'
    ],
    description: {
      ar: 'شانجان سي اس 55 بلاس تك متاحة للكراء بأسعار تنافسية. تصميم رياضي جريء وأداء قوي ومجهز بأحدث أنظمة الأمان.',
      fr: 'Changan CS55 Plus Tech disponible à la location avec des tarifs compétitifs et un design sportif.',
      en: 'Changan CS55 Plus Tech available for rental with competitive rates and sporty design.'
    },
    featured: false,
    createdAt: '2026-07-19'
  },
  {
    id: 'car-7',
    brand: 'Great Wall Motors',
    model: 'Tank 300 4x4 Off-Road',
    year: 2024,
    priceDzd: 7200000,
    priceFormatted: '7,200,000 د.ج',
    location: 'rental',
    dailyRateDzd: 25000,
    dailyRateWithDriverDzd: 35000,
    driverOption: 'with_driver_only',
    securityDepositDzd: 70000,
    minRentalDays: 3,
    mainImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 550 12 34 56',
    whatsapp: '+213550123456',
    mileage: '0 كم',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'أسود مات صحراوي / Noir Mat',
    specs: [
      'دفع رباعي حقيقي 4x4 مع قفل دفرنس أمامي وخلفي',
      'محرك 2.0T بقوة 227 حصان وعزم 387 نيوتن',
      'ناقل حركة ZF الألماني 8 سرعات أوتوماتيك',
      'نظام قيادة الالتفاف حول النقطة Tank Turn',
      'مقاعد جلد طبيعي مع تبريد ونظام صوتي عالي الجودة'
    ],
    description: {
      ar: 'تانك 300 الجبارة للطرق الوعرة والصحراء الجزائرية متاحة للكراء. مثالية للرحلات والمغامرات والاستكشاف.',
      fr: 'Great Wall Tank 300 4x4 puissant tout-terrain disponible à la location. Idéal pour les aventures.',
      en: 'Great Wall Tank 300 4x4 Off-Road beast available for rental. Perfect for rugged terrain and adventures.'
    },
    featured: true,
    createdAt: '2026-07-15'
  },
  {
    id: 'car-8',
    brand: 'Exeed',
    model: 'RX 2.0T Flagship',
    year: 2024,
    priceDzd: 6400000,
    priceFormatted: '6,400,000 د.ج',
    location: 'rental',
    dailyRateDzd: 22000,
    securityDepositDzd: 60000,
    minRentalDays: 3,
    mainImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200'
    ],
    phone: '+213 770 98 76 54',
    whatsapp: '+213770987654',
    mileage: '0 كم',
    transmission: 'Automatic',
    fuelType: 'Essence',
    color: 'أبيض لؤلؤي / Blanc Nacré',
    specs: [
      'نظام تعليقCDC هيدروليكي ذكي لفخامة مطلق',
      'محرك 2.0T بقوة 261 حصان وعزم 400 نيوتن',
      'نظام صوتي سوني Sony مكون من 14 مكبر صوت في المساند',
      'عرض المعلومات على الزجاج الأمامي HUD مع الواقع المعزز',
      'عطور فاخرة مدمجة في نظام التكييف'
    ],
    description: {
      ar: 'إكسيد أر اكس الفاخرة جداً تضاهي السيارات الألمانية ومتاحة للكراء للمناسبات ورجال الأعمال.',
      fr: 'Exeed RX 2.0T Flagship d\'un luxe absolu disponible à la location pour vos événements et déplacements VIP.',
      en: 'Exeed RX 2.0T Flagship ultra luxury SUV available for rental for VIP trips and events.'
    },
    featured: false,
    createdAt: '2026-07-17'
  }
];
