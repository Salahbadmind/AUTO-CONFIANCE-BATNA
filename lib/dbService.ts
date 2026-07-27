import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Car, ShowroomInfo } from '../types';
import { INITIAL_CARS, SHOWROOM_INFO } from '../constants';

const LOCAL_CARS_KEY = 'kadex_cars';
const LOCAL_INFO_KEY = 'kadex_showroom_info';
const LOCAL_SEEDED_KEY = 'kadex_has_seeded_v1';

// In-memory listeners for instantaneous UI sync
type CarsListener = (cars: Car[]) => void;
const carsListeners: Set<CarsListener> = new Set();

function notifyCarsListeners(cars: Car[]) {
  carsListeners.forEach(cb => cb(cars));
}

type InfoListener = (info: ShowroomInfo) => void;
const infoListeners: Set<InfoListener> = new Set();

function notifyInfoListeners(info: ShowroomInfo) {
  infoListeners.forEach(cb => cb(info));
}

// Helper to remove undefined fields before writing
function cleanObject<T extends object>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Fallback image if Base64 string is corrupt or oversized
const FALLBACK_CAR_IMAGE = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200';

export function safeSetLocalStorage(key: string, data: any): void {
  try {
    const val = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, val);
  } catch (e) {
    try {
      if (typeof data === 'object' && data !== null) {
        const copy = JSON.parse(JSON.stringify(data));
        if (copy.heroBgUrl && typeof copy.heroBgUrl === 'string' && copy.heroBgUrl.startsWith('data:') && copy.heroBgUrl.length > 500000) {
          delete copy.heroBgUrl;
        }
        if (Array.isArray(copy)) {
          copy.forEach((car: any) => {
            if (car.mainImage && typeof car.mainImage === 'string' && car.mainImage.startsWith('data:') && car.mainImage.length > 300000) {
              car.mainImage = FALLBACK_CAR_IMAGE;
            }
            if (Array.isArray(car.images)) {
              car.images = car.images.map((img: any) => 
                typeof img === 'string' && img.startsWith('data:') && img.length > 300000 ? FALLBACK_CAR_IMAGE : img
              );
            }
          });
        }
        localStorage.setItem(key, JSON.stringify(copy));
        return;
      }
    } catch (innerErr) {
      console.warn(`localStorage quota exceeded for key "${key}". Skipping local storage cache.`);
    }
  }
}

export function sanitizeCarData(car: Car): Car {
  const cleaned = cleanObject(car);

  if (cleaned.mainImage && cleaned.mainImage.startsWith('data:') && cleaned.mainImage.length > 350000) {
    console.warn(`Car ${car.id} mainImage is oversized (${cleaned.mainImage.length} bytes). Truncating to fallback image.`);
    cleaned.mainImage = FALLBACK_CAR_IMAGE;
  }

  if (cleaned.images && Array.isArray(cleaned.images)) {
    cleaned.images = cleaned.images.map(img => {
      if (img && img.startsWith('data:') && img.length > 350000) {
        return FALLBACK_CAR_IMAGE;
      }
      return img;
    });
  }

  return cleaned;
}

// Helper to parse car data supporting both camelCase and lowercase PostgreSQL column names
function parseCarData(data: Record<string, any>): Car {
  return {
    id: data.id,
    brand: data.brand || '',
    model: data.model || '',
    year: Number(data.year || 2024),
    priceDzd: Number(data.priceDzd ?? data.pricedzd ?? 0),
    priceFormatted: data.priceFormatted ?? data.priceformatted ?? '',
    location: data.location || 'algeria',
    shippingTime: data.shippingTime ?? data.shippingtime,
    phone: data.phone || '',
    whatsapp: data.whatsapp || '',
    mileage: data.mileage || '',
    color: data.color || '',
    exteriorColor: data.exteriorColor ?? data.exteriorcolor ?? data.color,
    interiorColor: data.interiorColor ?? data.interiorcolor,
    fuelType: data.fuelType ?? data.fueltype ?? 'essence',
    transmission: data.transmission ?? 'automatic',
    mainImage: data.mainImage ?? data.mainimage ?? FALLBACK_CAR_IMAGE,
    images: data.images || [],
    ficheTechnique: data.ficheTechnique ?? data.fichetechnique,
    ficheTechniqueName: data.ficheTechniqueName ?? data.fichetechniquename,
    specs: data.specs || [],
    description: data.description || { ar: '', fr: '', en: '' },
    featured: data.featured ?? true,
    createdAt: data.createdAt ?? data.createdat ?? new Date().toISOString()
  };
}

// Merge Supabase fetched data with LocalStorage to preserve client-side files if remote DB schema lacks certain columns
function mergeWithLocalStorageCars(remoteCars: Car[]): Car[] {
  const localMap = new Map<string, Car>();
  try {
    const saved = localStorage.getItem(LOCAL_CARS_KEY);
    if (saved) {
      const parsed: Car[] = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        parsed.forEach(c => localMap.set(c.id, c));
      }
    }
  } catch (e) {}

  return remoteCars.map(raw => {
    const parsed = parseCarData(raw);
    const local = localMap.get(parsed.id);
    if (local) {
      return {
        ...parsed,
        ficheTechnique: parsed.ficheTechnique || local.ficheTechnique,
        ficheTechniqueName: parsed.ficheTechniqueName || local.ficheTechniqueName,
        exteriorColor: parsed.exteriorColor || local.exteriorColor,
        interiorColor: parsed.interiorColor || local.interiorColor,
      };
    }
    return parsed;
  });
}

// Helper to upsert a car to Supabase with fallback for lowercased keys or missing schema columns
async function upsertCarToSupabase(car: Car): Promise<void> {
  if (!supabase) return;
  const sanitized = sanitizeCarData(car);

  // Strip massive base64 strings from the payload to prevent database latency/timeout,
  // but allow compressed/small base64 strings (under 250KB) to remain as a fallback
  // if storage upload fails so they always display!
  const cleanPayload = { ...sanitized };
  if (cleanPayload.mainImage && cleanPayload.mainImage.startsWith('data:') && cleanPayload.mainImage.length > 300000) {
    delete cleanPayload.mainImage;
  }
  if (cleanPayload.images && Array.isArray(cleanPayload.images)) {
    const hasHugeBase64 = cleanPayload.images.some(img => img && img.startsWith('data:') && img.length > 300000);
    if (hasHugeBase64) {
      delete cleanPayload.images;
    }
  }
  if (cleanPayload.ficheTechnique && cleanPayload.ficheTechnique.startsWith('data:') && cleanPayload.ficheTechnique.length > 1500000) {
    delete cleanPayload.ficheTechnique;
  }

  try {
    // 1. Try standard camelCase payload
    const { error } = await supabase.from('cars').upsert(cleanPayload);
    if (!error) {
      console.log(`Successfully saved car ${car.id} to Supabase!`);
      return;
    }

    console.warn('First upsert attempt to cars table failed:', error.message || error);

    // 2. Try lowercased keys payload
    const lowercasePayload: Record<string, any> = {};
    Object.keys(cleanPayload).forEach(key => {
      lowercasePayload[key.toLowerCase()] = (cleanPayload as any)[key];
    });

    const { error: err2 } = await supabase.from('cars').upsert(lowercasePayload);
    if (!err2) {
      console.log(`Successfully saved car ${car.id} to Supabase using lowercase columns!`);
      return;
    }

    console.warn('Lowercase upsert attempt failed:', err2.message || err2);

    // 3. Fallback: Strip unmapped columns (like ficheTechnique, ficheTechniqueName) if Supabase schema cache rejects them
    const safePayload = { ...cleanPayload };
    delete (safePayload as any).ficheTechnique;
    delete (safePayload as any).ficheTechniqueName;

    const { error: err3 } = await supabase.from('cars').upsert(safePayload);
    if (!err3) {
      console.log(`Successfully saved car ${car.id} to Supabase using safe payload (excluding unmapped file columns)!`);
      return;
    }

    // 4. Try safe payload with lowercase keys
    const safeLowercasePayload: Record<string, any> = {};
    Object.keys(safePayload).forEach(key => {
      safeLowercasePayload[key.toLowerCase()] = (safePayload as any)[key];
    });

    const { error: err4 } = await supabase.from('cars').upsert(safeLowercasePayload);
    if (err4) {
      console.info('Supabase notice for cars persistence:', err4.message || err4);
    } else {
      console.log(`Successfully saved car ${car.id} to Supabase using safe lowercase payload!`);
    }
  } catch (err: any) {
    console.info('Supabase cars network or connection issue, saved locally:', err?.message || err);
  }
}

/**
 * Subscribe to cars with automatic real-time updates via Supabase or LocalStorage fallback.
 */
export function subscribeCars(
  onCarsUpdated: (cars: Car[]) => void,
  onError?: (error: Error) => void
): () => void {
  carsListeners.add(onCarsUpdated);

  if (!supabase || !isSupabaseConfigured) {
    // Local storage fallback
    try {
      const saved = localStorage.getItem(LOCAL_CARS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          onCarsUpdated(parsed);
          return () => {
            carsListeners.delete(onCarsUpdated);
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse local cars storage:', e);
    }
    onCarsUpdated(INITIAL_CARS);
    return () => {
      carsListeners.delete(onCarsUpdated);
    };
  }

  // Fetch initial cars from Supabase
  const fetchCars = async () => {
    try {
      const { data, error } = await supabase.from('cars').select('*');
      if (error) throw error;

      if (data && data.length > 0) {
        safeSetLocalStorage(LOCAL_SEEDED_KEY, 'true');
        const merged = mergeWithLocalStorageCars(data);
        onCarsUpdated(merged);
      } else {
        const hasSeeded = localStorage.getItem(LOCAL_SEEDED_KEY);
        if (!hasSeeded) {
          console.log('Seeding initial cars to Supabase...');
          safeSetLocalStorage(LOCAL_SEEDED_KEY, 'true');
          for (const car of INITIAL_CARS) {
            await upsertCarToSupabase(car);
          }
          onCarsUpdated(INITIAL_CARS);
        } else {
          // User intentionally deleted all cars
          onCarsUpdated([]);
        }
      }
    } catch (err) {
      console.warn('Error connecting to Supabase cars table, falling back to local state:', err);
      if (onError) onError(err as Error);
      try {
        const saved = localStorage.getItem(LOCAL_CARS_KEY);
        if (saved) onCarsUpdated(JSON.parse(saved));
        else onCarsUpdated(INITIAL_CARS);
      } catch (e) {
        onCarsUpdated(INITIAL_CARS);
      }
    }
  };

  fetchCars();

  // Set up real-time channel
  try {
    const channel = supabase
      .channel('public_cars')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, async () => {
        const { data } = await supabase.from('cars').select('*');
        if (data) {
          const merged = mergeWithLocalStorageCars(data);
          onCarsUpdated(merged);
          safeSetLocalStorage(LOCAL_CARS_KEY, merged);
        }
      })
      .subscribe();

    return () => {
      carsListeners.delete(onCarsUpdated);
      supabase.removeChannel(channel);
    };
  } catch (e) {
    return () => {
      carsListeners.delete(onCarsUpdated);
    };
  }
}

// Helper to parse showroom data supporting both camelCase and lowercase PostgreSQL column names
function parseShowroomData(data: Record<string, any>): ShowroomInfo {
  const getStr = (...keys: string[]) => {
    for (const k of keys) {
      if (data[k] !== undefined && data[k] !== null && data[k] !== '') {
        return String(data[k]);
      }
    }
    return '';
  };

  return {
    name: getStr('name') || SHOWROOM_INFO.name,
    logoUrl: getStr('logoUrl', 'logourl', 'logo_url', 'logo') || SHOWROOM_INFO.logoUrl || '',
    phone1: getStr('phone1', 'phone_1') || SHOWROOM_INFO.phone1,
    phone2: getStr('phone2', 'phone_2') || SHOWROOM_INFO.phone2,
    whatsapp: getStr('whatsapp') || SHOWROOM_INFO.whatsapp,
    email: getStr('email') || SHOWROOM_INFO.email,
    addressAr: getStr('addressAr', 'addressar', 'address_ar') || SHOWROOM_INFO.addressAr,
    addressFr: getStr('addressFr', 'addressfr', 'address_fr') || SHOWROOM_INFO.addressFr,
    addressEn: getStr('addressEn', 'addressen', 'address_en') || SHOWROOM_INFO.addressEn,
    workingHoursAr: getStr('workingHoursAr', 'workinghoursar', 'working_hours_ar') || SHOWROOM_INFO.workingHoursAr,
    workingHoursFr: getStr('workingHoursFr', 'workinghoursfr', 'working_hours_fr') || SHOWROOM_INFO.workingHoursFr,
    workingHoursEn: getStr('workingHoursEn', 'workinghoursen', 'working_hours_en') || SHOWROOM_INFO.workingHoursEn,
    googleMapsUrl: getStr('googleMapsUrl', 'googlemapsurl', 'google_maps_url') || SHOWROOM_INFO.googleMapsUrl,
    mapEmbedUrl: getStr('mapEmbedUrl', 'mapembedurl', 'map_embed_url') || SHOWROOM_INFO.mapEmbedUrl,
    facebook: getStr('facebook') || SHOWROOM_INFO.facebook,
    instagram: getStr('instagram') || SHOWROOM_INFO.instagram,
    tiktok: getStr('tiktok') || SHOWROOM_INFO.tiktok,
    heroBgType: (data.heroBgType ?? data.herobgtype ?? data.hero_bg_type ?? SHOWROOM_INFO.heroBgType) as any,
    heroBgUrl: getStr('heroBgUrl', 'herobgurl', 'hero_bg_url') || SHOWROOM_INFO.heroBgUrl,
    heroOverlayOpacity: typeof data.heroOverlayOpacity === 'number' ? data.heroOverlayOpacity 
      : (typeof data.herooverlayopacity === 'number' ? data.herooverlayopacity : (typeof data.hero_overlay_opacity === 'number' ? data.hero_overlay_opacity : SHOWROOM_INFO.heroOverlayOpacity))
  };
}

// Merge remote showroom info with LocalStorage so user settings are never lost on refresh
function mergeWithLocalStorageShowroomInfo(remoteInfo: ShowroomInfo): ShowroomInfo {
  try {
    const saved = localStorage.getItem(LOCAL_INFO_KEY);
    if (saved) {
      const local: ShowroomInfo = JSON.parse(saved);
      if (local && typeof local === 'object') {
        return {
          ...SHOWROOM_INFO,
          ...local,
          ...remoteInfo,
          logoUrl: remoteInfo.logoUrl || local.logoUrl || '',
          heroBgUrl: remoteInfo.heroBgUrl || local.heroBgUrl || '',
          name: remoteInfo.name || local.name || SHOWROOM_INFO.name,
          phone1: remoteInfo.phone1 || local.phone1 || SHOWROOM_INFO.phone1,
          phone2: remoteInfo.phone2 || local.phone2 || SHOWROOM_INFO.phone2,
          whatsapp: remoteInfo.whatsapp || local.whatsapp || SHOWROOM_INFO.whatsapp,
          email: remoteInfo.email || local.email || SHOWROOM_INFO.email,
          addressAr: remoteInfo.addressAr || local.addressAr || SHOWROOM_INFO.addressAr,
          addressFr: remoteInfo.addressFr || local.addressFr || SHOWROOM_INFO.addressFr,
          addressEn: remoteInfo.addressEn || local.addressEn || SHOWROOM_INFO.addressEn,
        };
      }
    }
  } catch (e) {}
  return remoteInfo;
}

// Resilient upsert helper that automatically prunes columns that do not exist in the Supabase schema and retries
async function resilientUpsert(tableName: string, payload: Record<string, any>): Promise<{ success: boolean; error?: any }> {
  if (!supabase) return { success: false, error: new Error('Supabase client not initialized') };
  const currentPayload = { ...payload };
  const maxAttempts = 15;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const { error } = await supabase.from(tableName).upsert(currentPayload);
      if (!error) {
        return { success: true };
      }

      const errMsg = error.message || '';
      // Parse PostgreSQL column not found errors:
      // "column \"logoUrl\" of relation \"showroom_info\" does not exist"
      // "has no column named \"logoUrl\""
      const columnMatch = errMsg.match(/column "([^"]+)" of relation "[^"]+" does not exist/)
        || errMsg.match(/column "([^"]+)" does not exist/)
        || errMsg.match(/has no column named "([^"]+)"/);

      if (columnMatch && columnMatch[1]) {
        const missingColumn = columnMatch[1];
        console.log(`Notice: Table "${tableName}" is missing column "${missingColumn}". Pruning and retrying...`);
        delete currentPayload[missingColumn];
        continue;
      }

      return { success: false, error };
    } catch (err: any) {
      return { success: false, error: err };
    }
  }
  return { success: false, error: new Error('Too many column pruning attempts') };
}

// Helper to upsert showroom info with fallbacks for lowercased keys or minimal payloads
async function upsertShowroomInfoToSupabase(info: ShowroomInfo): Promise<void> {
  if (!supabase) return;
  const cleaned = cleanObject(info);

  // Construct a standard payload matching the mix of lowercase and camelCase columns in the database schema
  const primaryPayload: Record<string, any> = {
    id: 'main',
    name: cleaned.name,
    phone1: cleaned.phone1,
    phone_1: cleaned.phone1,
    phone2: cleaned.phone2,
    phone_2: cleaned.phone2,
    whatsapp: cleaned.whatsapp,
    email: cleaned.email,
    addressAr: cleaned.addressAr,
    address_ar: cleaned.addressAr,
    addressar: cleaned.addressAr,
    addressFr: cleaned.addressFr,
    address_fr: cleaned.addressFr,
    addressfr: cleaned.addressFr,
    addressEn: cleaned.addressEn,
    address_en: cleaned.addressEn,
    addressen: cleaned.addressEn,
    workingHoursAr: cleaned.workingHoursAr,
    working_hours_ar: cleaned.workingHoursAr,
    workinghoursar: cleaned.workingHoursAr,
    workingHoursFr: cleaned.workingHoursFr,
    working_hours_fr: cleaned.workingHoursFr,
    workinghoursfr: cleaned.workingHoursFr,
    workingHoursEn: cleaned.workingHoursEn,
    working_hours_en: cleaned.workingHoursEn,
    workinghoursen: cleaned.workingHoursEn,
    googleMapsUrl: cleaned.googleMapsUrl,
    google_maps_url: cleaned.googleMapsUrl,
    googlemapsurl: cleaned.googleMapsUrl,
    mapEmbedUrl: cleaned.mapEmbedUrl,
    map_embed_url: cleaned.mapEmbedUrl,
    mapembedurl: cleaned.mapEmbedUrl,
    facebook: cleaned.facebook,
    instagram: cleaned.instagram,
    tiktok: cleaned.tiktok,
    heroBgType: cleaned.heroBgType,
    hero_bg_type: cleaned.heroBgType,
    herobgtype: cleaned.heroBgType,
    heroOverlayOpacity: cleaned.heroOverlayOpacity,
    hero_overlay_opacity: cleaned.heroOverlayOpacity,
    herooverlayopacity: cleaned.heroOverlayOpacity
  };

  // Only include heroBgUrl if it is not a base64 string
  if (cleaned.heroBgUrl && !cleaned.heroBgUrl.startsWith('data:')) {
    primaryPayload.heroBgUrl = cleaned.heroBgUrl;
    primaryPayload.hero_bg_url = cleaned.heroBgUrl;
    primaryPayload.herobgurl = cleaned.heroBgUrl;
  }

  // Only include logoUrl if it is not a base64 string
  if (cleaned.logoUrl && !cleaned.logoUrl.startsWith('data:')) {
    primaryPayload.logoUrl = cleaned.logoUrl;
    primaryPayload.logo_url = cleaned.logoUrl;
    primaryPayload.logourl = cleaned.logoUrl;
    primaryPayload.logo = cleaned.logoUrl;
  }

  try {
    const result = await resilientUpsert('showroom_info', primaryPayload);
    if (result.success) {
      console.log('Successfully saved showroom_info to Supabase with resilient pruning!');
    } else {
      console.warn('Resilient upsert to showroom_info failed:', result.error?.message || result.error);
    }
  } catch (err: any) {
    console.info('Supabase showroom info network issue, saved locally:', err?.message || err);
  }
}

/**
 * Subscribe to showroom info via Supabase or LocalStorage fallback.
 */
export function subscribeShowroomInfo(
  onInfoUpdated: (info: ShowroomInfo) => void,
  onError?: (error: Error) => void
): () => void {
  infoListeners.add(onInfoUpdated);

  if (!supabase || !isSupabaseConfigured) {
    try {
      const saved = localStorage.getItem(LOCAL_INFO_KEY);
      if (saved) {
        onInfoUpdated(JSON.parse(saved));
        return () => { infoListeners.delete(onInfoUpdated); };
      }
    } catch (e) {}
    onInfoUpdated(SHOWROOM_INFO);
    return () => { infoListeners.delete(onInfoUpdated); };
  }

  const fetchInfo = async () => {
    try {
      const { data, error } = await supabase.from('showroom_info').select('*').eq('id', 'main').maybeSingle();
      if (error || !data) {
        console.log('Showroom info missing in Supabase, seeding default...');
        await upsertShowroomInfoToSupabase(SHOWROOM_INFO);
        const merged = mergeWithLocalStorageShowroomInfo(SHOWROOM_INFO);
        onInfoUpdated(merged);
      } else {
        const parsed = parseShowroomData(data);
        const merged = mergeWithLocalStorageShowroomInfo(parsed);
        onInfoUpdated(merged);
      }
    } catch (err) {
      console.warn('Error fetching showroom info from Supabase:', err);
      if (onError) onError(err as Error);
      try {
        const saved = localStorage.getItem(LOCAL_INFO_KEY);
        if (saved) onInfoUpdated(JSON.parse(saved));
        else onInfoUpdated(SHOWROOM_INFO);
      } catch (e) {
        onInfoUpdated(SHOWROOM_INFO);
      }
    }
  };

  fetchInfo();

  try {
    const channel = supabase
      .channel('public_showroom_info')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'showroom_info' }, async () => {
        const { data } = await supabase.from('showroom_info').select('*').eq('id', 'main').maybeSingle();
        if (data) {
          const parsed = parseShowroomData(data);
          const merged = mergeWithLocalStorageShowroomInfo(parsed);
          onInfoUpdated(merged);
        }
      })
      .subscribe();

    return () => {
      infoListeners.delete(onInfoUpdated);
      supabase?.removeChannel(channel);
    };
  } catch (e) {
    return () => {
      infoListeners.delete(onInfoUpdated);
    };
  }
}

/**
 * Save or update a car document in Supabase & LocalStorage.
 */
export async function saveCarToDb(car: Car): Promise<void> {
  const sanitized = sanitizeCarData(car);

  // Always update local storage for immediate feedback
  let updatedCars: Car[] = [];
  try {
    const saved = localStorage.getItem(LOCAL_CARS_KEY);
    const cars: Car[] = saved ? JSON.parse(saved) : INITIAL_CARS;
    const index = cars.findIndex(c => c.id === car.id);
    if (index >= 0) cars[index] = sanitized;
    else cars.unshift(sanitized);
    updatedCars = cars;
    safeSetLocalStorage(LOCAL_CARS_KEY, cars);
    notifyCarsListeners(updatedCars);
  } catch (e) {
    console.warn('Quota error saving cars locally:', e);
  }

  if (supabase && isSupabaseConfigured) {
    try {
      await upsertCarToSupabase(sanitized);
    } catch (err: any) {
      console.warn('Error saving car to Supabase:', err?.message || err);
    }
  }
}

/**
 * Delete a car from Supabase & LocalStorage.
 */
export async function deleteCarFromDb(carId: string): Promise<void> {
  // Always update local storage and notify listeners
  try {
    const saved = localStorage.getItem(LOCAL_CARS_KEY);
    if (saved) {
      const cars: Car[] = JSON.parse(saved);
      const filtered = cars.filter(c => c.id !== carId);
      safeSetLocalStorage(LOCAL_CARS_KEY, filtered);
      notifyCarsListeners(filtered);
    } else {
      notifyCarsListeners([]);
    }
  } catch (e) {}

  if (supabase && isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('cars').delete().eq('id', carId);
      if (error) {
        console.warn('Failed to delete car from Supabase:', error.message || JSON.stringify(error));
      }
    } catch (err: any) {
      console.warn('Error deleting car from Supabase:', err?.message || err);
    }
  }
}

/**
 * Save showroom settings to Supabase & LocalStorage.
 */
export async function saveShowroomInfoToDb(info: ShowroomInfo): Promise<void> {
  safeSetLocalStorage(LOCAL_INFO_KEY, info);
  notifyInfoListeners(info);

  if (supabase && isSupabaseConfigured) {
    try {
      await upsertShowroomInfoToSupabase(info);
    } catch (e: any) {
      console.warn("Error upserting showroom info to Supabase:", e?.message || e);
    }
  }
}

/**
 * Convert a base64 Data URL to a binary Blob
 */
export function dataURLtoBlob(dataurl: string): Blob {
  try {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.warn('Error converting dataURL to Blob:', e);
    return new Blob([], { type: 'image/png' });
  }
}

/**
 * Compresses a base64 Data URL using a canvas to reduce file size.
 * Returns the compressed base64 Data URL.
 */
export async function compressImage(dataUrl: string, maxWidth = 1000, maxHeight = 1000, quality = 0.65): Promise<string> {
  if (!dataUrl.startsWith('data:image/')) return dataUrl;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
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
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Detect original MIME type to preserve transparency for PNG, WebP, GIF
        const mimeMatch = dataUrl.match(/^data:([^;]+);/);
        const originalMime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const isTransparentFormat = originalMime === 'image/png' || originalMime === 'image/webp' || originalMime === 'image/gif';
        const exportMime = isTransparentFormat ? originalMime : 'image/jpeg';

        const compressed = canvas.toDataURL(exportMime, isTransparentFormat ? undefined : quality);
        resolve(compressed);
      } catch (err) {
        console.warn('Failed to compress image:', err);
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}

/**
 * Upload a binary File or Blob to a public Supabase Storage bucket
 */
export async function uploadFileToSupabaseStorage(
  file: File | Blob, 
  bucketName: string, 
  customName?: string
): Promise<string> {
  if (!supabase || !isSupabaseConfigured) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const fileExt = customName ? customName.split('.').pop() : 'png';
  const fileName = customName || `${Date.now()}_uploaded_file.${fileExt}`;
  
  try {
    // 1. Try uploading to storage bucket
    let { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

    if (error && (error.message?.toLowerCase().includes('not found') || error.message?.toLowerCase().includes('bucket'))) {
      console.log(`Bucket "${bucketName}" not found or unauthorized. Trying to create bucket...`);
      try {
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
        if (!createError) {
          // Retry uploading
          const retryResult = await supabase.storage.from(bucketName).upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });
          data = retryResult.data;
          error = retryResult.error;
        } else {
          console.log('Notice: Bucket creation not allowed by RLS policy, using base64 dataUrl fallback instead');
        }
      } catch (errBucket) {
        console.log('Notice: Failed to create bucket, using base64 dataUrl fallback instead');
      }
    }

    if (error) {
      console.log('Notice: Failed to upload to Supabase storage, using base64 dataUrl fallback instead');
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (errUpload) {
    console.log('Notice: Catch block in uploadFileToSupabaseStorage, using base64 dataUrl fallback instead');
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}

/**
 * Upload the showroom logo to Supabase Storage and return the public URL
 */
export async function uploadLogo(fileOrDataUrl: File | string): Promise<string> {
  let blob: Blob;
  let name = 'logo.png';
  if (typeof fileOrDataUrl === 'string') {
    if (fileOrDataUrl.startsWith('data:')) {
      const compressedDataUrl = await compressImage(fileOrDataUrl, 500, 500, 0.7);
      blob = dataURLtoBlob(compressedDataUrl);
      const mime = blob.type;
      const ext = mime.split('/')[1] || 'png';
      name = `logo_${Date.now()}.${ext}`;
    } else {
      return fileOrDataUrl; // Already a public URL
    }
  } else {
    blob = fileOrDataUrl;
    name = fileOrDataUrl.name;
  }
  return await uploadFileToSupabaseStorage(blob, 'showroom', name);
}

/**
 * Upload hero background (image or video) to Supabase Storage and return the public URL
 */
export async function uploadHeroBg(fileOrDataUrl: File | string): Promise<string> {
  let blob: Blob;
  let name = 'hero_bg.jpg';
  if (typeof fileOrDataUrl === 'string') {
    if (fileOrDataUrl.startsWith('data:')) {
      // Only compress if it is an image; videos will pass through original
      let processedDataUrl = fileOrDataUrl;
      if (fileOrDataUrl.startsWith('data:image/')) {
        processedDataUrl = await compressImage(fileOrDataUrl, 1200, 1200, 0.7);
      }
      blob = dataURLtoBlob(processedDataUrl);
      const mime = blob.type;
      const ext = mime.split('/')[1] || 'jpg';
      name = `hero_bg_${Date.now()}.${ext}`;
    } else {
      return fileOrDataUrl;
    }
  } else {
    blob = fileOrDataUrl;
    name = fileOrDataUrl.name;
  }
  return await uploadFileToSupabaseStorage(blob, 'showroom', name);
}

/**
 * Upload car photo to Supabase Storage and return the public URL
 */
export async function uploadCarPhoto(fileOrDataUrl: File | string, index: number = 0): Promise<string> {
  let blob: Blob;
  let name = `car_photo_${Date.now()}_${index}.jpg`;
  if (typeof fileOrDataUrl === 'string') {
    if (fileOrDataUrl.startsWith('data:')) {
      const compressedDataUrl = await compressImage(fileOrDataUrl, 1000, 1000, 0.65);
      blob = dataURLtoBlob(compressedDataUrl);
      const mime = blob.type;
      const ext = mime.split('/')[1] || 'jpg';
      name = `car_photo_${Date.now()}_${index}.${ext}`;
    } else {
      return fileOrDataUrl;
    }
  } else {
    blob = fileOrDataUrl;
    name = fileOrDataUrl.name;
  }
  return await uploadFileToSupabaseStorage(blob, 'cars', name);
}

/**
 * Upload car Fiche Technique to Supabase Storage and return the public URL
 */
export async function uploadFicheTechnique(fileOrDataUrl: File | string, originalName: string = 'specs.pdf'): Promise<string> {
  let blob: Blob;
  let name = originalName;
  if (typeof fileOrDataUrl === 'string') {
    if (fileOrDataUrl.startsWith('data:')) {
      blob = dataURLtoBlob(fileOrDataUrl);
      const mime = blob.type;
      const ext = mime.split('/')[1] || 'pdf';
      name = `fiche_${Date.now()}.${ext}`;
    } else {
      return fileOrDataUrl;
    }
  } else {
    blob = fileOrDataUrl;
    name = fileOrDataUrl.name;
  }
  return await uploadFileToSupabaseStorage(blob, 'cars', name);
}
