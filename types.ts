/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type Language = 'ar' | 'fr' | 'en';
export type Theme = 'dark' | 'light';
export type CarLocation = 'algeria' | 'rental';
export type FuelType = 'Essence' | 'Hybride' | 'Électrique' | 'Diesel';
export type Transmission = 'Automatic' | 'Manual';

export type DriverOption = 'without_driver' | 'with_driver_only' | 'both';

export interface Car {
  id: string;
  brand: string;            // e.g. 'Geely', 'Chery', 'BYD', 'Changan', 'Jetour', 'DFSK', 'Great Wall Motors'
  model: string;            // e.g. 'Coolray GF 2024'
  year: number;             // e.g. 2024
  priceDzd: number;         // e.g. 3850000 (0 means On Request / حسب الطلب)
  priceFormatted?: string;  // Custom display string if needed
  location: CarLocation;    // 'algeria' (للبيع) or 'rental' (للكراء)
  shippingTime?: string;    // e.g. '30 - 45 يوم' or '30-45 Jours'
  mainImage: string;        // Primary image URL or base64
  images: string[];         // Multiple images gallery
  phone: string;            // Dedicated phone for this car or showroom phone
  whatsapp: string;         // Dedicated WhatsApp number (international format e.g. +213550123456)
  mileage: string;          // e.g. '0 كم (جديدة)'
  transmission: Transmission;
  fuelType: FuelType;
  color?: string;           // e.g. 'أسود ميتاليك'
  exteriorColor?: string;   // e.g. 'أبيض لؤلؤي / Blanc Nacré'
  interiorColor?: string;   // e.g. 'جلد بني فخم / Cuir Marron'
  ficheTechnique?: string;     // PDF, Image, or Document Data URL
  ficheTechniqueName?: string; // e.g. 'Fiche_Technique_Tiggo8.pdf'
  dailyRateDzd?: number;       // Rental daily rate in DZD (if rental car)
  securityDepositDzd?: number; // Security deposit in DZD
  minRentalDays?: number;      // Minimum rental duration in days
  driverOption?: DriverOption;         // 'without_driver' | 'with_driver_only' | 'both'
  dailyRateWithDriverDzd?: number;     // Price per day with driver (in DZD)
  specs: string[];          // e.g. ['فتحة سقف بانورامية', 'شاشة 12.3 بوصة', 'كاميرا 360°']
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  featured?: boolean;
  createdAt?: string;
}

export interface FilterState {
  location: 'all' | 'algeria' | 'rental';
  brand: string;
  fuelType: string;
  transmission: string;
  search: string;
  minPrice: number;
  maxPrice: number;
}

export type ViewState =
  | { type: 'home' }
  | { type: 'car-detail'; car: Car }
  | { type: 'admin' };

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface ShowroomInfo {
  name: string;
  logoUrl?: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  addressAr: string;
  addressFr: string;
  addressEn: string;
  workingHoursAr: string;
  workingHoursFr: string;
  workingHoursEn: string;
  googleMapsUrl: string;
  mapEmbedUrl?: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  heroBgType: 'gradient' | 'image' | 'video';
  heroBgUrl: string;
  heroOverlayOpacity?: number;
}
