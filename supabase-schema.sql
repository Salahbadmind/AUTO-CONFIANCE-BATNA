-- Run this script in your Supabase SQL Editor to create the required tables

-- 1. Clean up existing tables completely
DROP TABLE IF EXISTS public.cars CASCADE;
DROP TABLE IF EXISTS public.showroom_info CASCADE;

-- 2. Create the cars table with all required and optional columns
CREATE TABLE public.cars (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year NUMERIC,
    "priceDzd" NUMERIC,
    "priceFormatted" TEXT,
    location TEXT,
    "shippingTime" TEXT,
    "dailyRateDzd" NUMERIC,
    "dailyRateWithDriverDzd" NUMERIC,
    "driverOption" TEXT,
    "securityDepositDzd" NUMERIC,
    "minRentalDays" NUMERIC,
    "mainImage" TEXT,
    images TEXT[],
    phone TEXT,
    whatsapp TEXT,
    mileage TEXT,
    transmission TEXT,
    "fuelType" TEXT,
    color TEXT,
    "exteriorColor" TEXT,
    "interiorColor" TEXT,
    specs TEXT[],
    description JSONB,
    featured BOOLEAN DEFAULT false,
    "ficheTechnique" TEXT,
    "ficheTechniqueName" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the showroom_info table with camelCase columns and alternative mappings
CREATE TABLE public.showroom_info (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT,
    "logoUrl" TEXT,
    "logo_url" TEXT,
    logourl TEXT,
    logo TEXT,
    phone1 TEXT,
    "phone_1" TEXT,
    phone2 TEXT,
    "phone_2" TEXT,
    whatsapp TEXT,
    email TEXT,
    "addressAr" TEXT,
    "address_ar" TEXT,
    addressar TEXT,
    "addressFr" TEXT,
    "address_fr" TEXT,
    addressfr TEXT,
    "addressEn" TEXT,
    "address_en" TEXT,
    addressen TEXT,
    "workingHoursAr" TEXT,
    "working_hours_ar" TEXT,
    workinghoursar TEXT,
    "workingHoursFr" TEXT,
    "working_hours_fr" TEXT,
    workinghoursfr TEXT,
    "workingHoursEn" TEXT,
    "working_hours_en" TEXT,
    workinghoursen TEXT,
    "googleMapsUrl" TEXT,
    "google_maps_url" TEXT,
    googlemapsurl TEXT,
    "mapEmbedUrl" TEXT,
    "map_embed_url" TEXT,
    mapembedurl TEXT,
    facebook TEXT,
    instagram TEXT,
    tiktok TEXT,
    "heroBgType" TEXT,
    "hero_bg_type" TEXT,
    herobgtype TEXT,
    "heroBgUrl" TEXT,
    "hero_bg_url" TEXT,
    herobgurl TEXT,
    "heroOverlayOpacity" NUMERIC,
    "hero_overlay_opacity" NUMERIC,
    herooverlayopacity NUMERIC
);

-- Seed initial default showroom_info row
INSERT INTO public.showroom_info (id, name, phone1, whatsapp)
VALUES ('main', 'CADEX AUTO', '+213 550 12 34 56', '+213550123456')
ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showroom_info ENABLE ROW LEVEL SECURITY;

-- 5. Create unrestricted policies for read and write in development
CREATE POLICY "Allow public select on cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Allow public insert on cars" ON public.cars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on cars" ON public.cars FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on cars" ON public.cars FOR DELETE USING (true);

CREATE POLICY "Allow public select on showroom_info" ON public.showroom_info FOR SELECT USING (true);
CREATE POLICY "Allow public insert on showroom_info" ON public.showroom_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on showroom_info" ON public.showroom_info FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on showroom_info" ON public.showroom_info FOR DELETE USING (true);


-- ==========================================
-- 6. Storage Buckets & Policies Setup
-- ==========================================

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('cars', 'cars', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']),
  ('showroom', 'showroom', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm'])
ON CONFLICT (id) DO NOTHING;

-- Unrestricted select for 'cars' and 'showroom' buckets
DROP POLICY IF EXISTS "Public Select Cars Bucket" ON storage.objects;
CREATE POLICY "Public Select Cars Bucket" ON storage.objects FOR SELECT USING (bucket_id = 'cars');

DROP POLICY IF EXISTS "Public Select Showroom Bucket" ON storage.objects;
CREATE POLICY "Public Select Showroom Bucket" ON storage.objects FOR SELECT USING (bucket_id = 'showroom');

-- Unrestricted insert for public uploads
DROP POLICY IF EXISTS "Public Insert Cars Bucket" ON storage.objects;
CREATE POLICY "Public Insert Cars Bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cars');

DROP POLICY IF EXISTS "Public Insert Showroom Bucket" ON storage.objects;
CREATE POLICY "Public Insert Showroom Bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'showroom');

-- Unrestricted update/delete for full CMS control
DROP POLICY IF EXISTS "Public Update Cars Bucket" ON storage.objects;
CREATE POLICY "Public Update Cars Bucket" ON storage.objects FOR UPDATE USING (bucket_id = 'cars') WITH CHECK (bucket_id = 'cars');

DROP POLICY IF EXISTS "Public Update Showroom Bucket" ON storage.objects;
CREATE POLICY "Public Update Showroom Bucket" ON storage.objects FOR UPDATE USING (bucket_id = 'showroom') WITH CHECK (bucket_id = 'showroom');

DROP POLICY IF EXISTS "Public Delete Cars Bucket" ON storage.objects;
CREATE POLICY "Public Delete Cars Bucket" ON storage.objects FOR DELETE USING (bucket_id = 'cars');

DROP POLICY IF EXISTS "Public Delete Showroom Bucket" ON storage.objects;
CREATE POLICY "Public Delete Showroom Bucket" ON storage.objects FOR DELETE USING (bucket_id = 'showroom');
