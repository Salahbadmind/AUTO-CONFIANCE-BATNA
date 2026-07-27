/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Language } from './types';

export const translations = {
  ar: {
    // Showroom Identity
    brandName: 'Auto Elite',
    showroomTagline: '🚗 وجهتك الأولى لبيع وكراء السيارات',
    showroomSubTitle: 'نوفر لك مجموعة مختارة من أحدث السيارات الفاخرة، العائلية والاقتصادية، مع أسعار مدروسة، شفافية كاملة، وخدمة عملاء ترتقي إلى أعلى المعايير.',
    
    // Navigation
    navCarsAlgeria: 'بيع السيارات',
    navCarsChina: 'كراء السيارات',
    navAboutContact: 'عن المعرض والتواصل',
    navAdmin: 'لوحة التحكم',
    
    // Hero & Stats
    heroTitle: 'أفضل سيارات الكراء والبيع بين يديك',
    heroBadge: '🚗 وجهتك الأولى لبيع وكراء السيارات',
    statInAlgeria: 'سيارات للبيع الفوري',
    statInChina: 'سيارات للكراء المباشر',
    statShippingDays: 'خدمة سريعة وموثوقة',
    
    // Search & Filters
    searchPlaceholder: 'ابحث عن الماركة أو الموديل (مثل: Geely, Chery, BYD)...',
    filterAll: 'جميع السيارات',
    filterInAlgeria: 'بيع السيارات (تسليم فوري)',
    filterInChina: 'كراء السيارات (إيجار)',
    filterBrand: 'الماركة',
    filterFuel: 'نوع الوقود',
    filterTransmission: 'علبة السرعة',
    filterAllBrands: 'جميع الماركات',
    filterAllFuels: 'جميع أنواع الوقود',
    filterAllTransmissions: 'جميع العلب',
    clearFilters: 'إعادة ضبط الفلاتر',
    noCarsFound: 'لم يتم العثور على سيارات تطابق خيارات البحث.',
    
    // Car Status Badges
    badgeInAlgeria: 'للبيع 🇩🇿',
    badgeInChina: 'كراء السيارات 🔑',
    shippingTimePrefix: 'مدة الكراء:',
    immediateDelivery: 'تسليم فوري',
    priceOnRequest: 'السعر حسب الطلب',
    
    // Car Details
    yearLabel: 'سنة الصنع',
    mileageLabel: 'المسافة المقطوعة',
    fuelLabel: 'نوع الوقود',
    transmissionLabel: 'علبة السرعة',
    colorLabel: 'اللون',
    locationLabel: 'نوع الخدمة',
    specsTitle: 'المواصفات والتجهيزات',
    descriptionTitle: 'تفاصيل السيارة',
    galleryTitle: 'معرض الصور (انقر التكبير)',
    backToCars: 'العودة لجميع السيارات',
    similarCarsTitle: 'سيارات أخرى قد تهمك',
    
    // Contact & Actions
    btnCallNow: 'اتصل الآن بالهاتف',
    btnWhatsApp: 'تواصل عبر واتساب',
    btnDirectContact: 'تواصل مباشر مع المعرض',
    whatsappMessagePrefix: 'مرحباً معرض أوتو إيليت Auto Elite، أود الاستفسار عن سيارة:',
    
    // About & Contact Section
    aboutSectionTitle: 'عن معرض أوتو إيليت Auto Elite',
    aboutSectionSub: 'شريكك الموثوق لكراء وبيع أحدث السيارات الفاخرة والاقتصادية في الجزائر',
    contactInfoTitle: 'أرقام التواصل والعنوان',
    locationMapTitle: 'موقع المعرض على الخريطة (الجزائر العاصمة)',
    addressLabel: 'العنوان',
    phoneNumbersLabel: 'أرقام الهاتف',
    whatsappLabel: 'الواتساب الرسمي',
    workingHoursLabel: 'ساعات العمل',
    socialMediaTitle: 'تابعنا على مواقع التواصل الاجتماعي',
    
    // Process Steps
    processTitle: 'خدمات كراء وبيع السيارات مع كونفيانس أوتو',
    step1Title: '1. اختيار السيارة',
    step1Desc: 'اختر السيارة المناسبة للبيع الفوري أو للكراء المباشر عبر المعرض.',
    step2Title: '2. الاتصال والحجز',
    step2Desc: 'تواصل معنا مباشرة عبر الهاتف أو الواتساب لمعرفة كافة التفاصيل وعقود الكراء أو البيع.',
    step3Title: '3. التوثيق والعقود',
    step3Desc: 'إجراءات سريعة وسهلة وموثوقة لعقود الكراء أو شراء السيارات مع الضمان التام.',
    step4Title: '4. التسليم والاستلام',
    step4Desc: 'استلم سيارتك بحالة ممتازة وجاهزة للاستخدام الفوري.',
    
    // Admin Panel
    adminTitle: 'لوحة تحكم المشرف (إدارة المعرض)',
    adminLoginTitle: 'تسجيل دخول المشرف',
    adminPasswordPlaceholder: 'أدخل رمز الدخول (الافتراضي: 1234)',
    adminLoginBtn: 'دخول',
    adminLogoutBtn: 'خروج من المشرف',
    adminAddCarBtn: '+ إضافة سيارة جديدة',
    adminEditCarTitle: 'تعديل بيانات السيارة',
    adminAddCarTitle: 'إضافة سيارة جديدة للمخزون',
    adminCarListTitle: 'إدارة السيارات الحالية',
    
    // Admin Form Fields
    fieldBrand: 'الماركة (Brand)',
    fieldModel: 'الموديل (Model)',
    fieldYear: 'السنة (Year)',
    fieldPriceDzd: 'السعر بالدينار الجزائري (DZD)',
    fieldPriceNote: 'ضع 0 إذا كان السعر "حسب الطلب"',
    fieldLocation: 'نوع الخدمة (بيع أو كراء)',
    fieldLocAlgeria: 'بيع السيارات (تسليم فوري)',
    fieldLocChina: 'كراء السيارات (خدمة الإيجار)',
    fieldShippingTime: 'مدة الكراء / الشحن',
    fieldPhone: 'رقم الهاتف للتواصل لهذه السيارة',
    fieldWhatsApp: 'رقم الواتساب (صيغة دولية مثل: +213550123456)',
    fieldMileage: 'المسافة المقطوعة',
    fieldFuel: 'نوع الوقود',
    fieldTransmission: 'علبة السرعة',
    fieldColor: 'اللون الخارجي',
    fieldSpecs: 'المواصفات الرئيسية (افصل بينها بفارزة ",")',
    fieldDescAr: 'الوصف باللغة العربية',
    fieldDescFr: 'الوصف باللغة الفرنسية',
    fieldDescEn: 'الوصف باللغة الإنجليزية',
    fieldMainImage: 'رابط الصورة الرئيسية',
    fieldGalleryImages: 'روابط الصور الإضافية (رابط في كل سطر)',
    fieldUploadLocalPhoto: 'أو قم بتحميل صور من جهازك:',
    
    // Admin Actions
    btnSaveCar: 'حفظ السيارة',
    btnCancel: 'إلغاء',
    btnEdit: 'تعديل',
    btnDelete: 'حذف',
    btnConvertToAlgeria: 'تعيين للبيع 🚗',
    confirmDelete: 'هل أنت متأكد من حذف هذه السيارة؟',
    carSavedSuccess: 'تم حفظ السيارة بنجاح!',
    carDeletedSuccess: 'تم حذف السيارة بنجاح.',
    carConvertedSuccess: 'تم تحديث حالة السيارة بنجاح!',
    resetDefaultData: 'استعادة المخزون الافتراضي',
    
    // AI Assistant
    assistantName: 'مساعد أوتو إيليت الذكي 🤖',
    assistantSubtitle: 'اسألني عن خدمات كراء السيارات، البيع، والموديلات المتوفرة',
    assistantPlaceholder: 'اكتب سؤالك هنا...',
    assistantSend: 'إرسال',
    
    // Footer
    footerRights: 'جميع الحقوق محفوظة © Auto Elite - كراء وبيع السيارات في الجزائر',
  },

  fr: {
    // Showroom Identity
    brandName: 'Auto Elite',
    showroomTagline: 'Auto Elite - Location et Vente de Véhicules en Algérie',
    showroomSubTitle: 'Services professionnels de location et de vente de voitures avec les meilleurs tarifs en Algérie.',
    
    // Navigation
    navCarsAlgeria: 'Vente de Voitures',
    navCarsChina: 'Location de Voitures',
    navAboutContact: 'À Propos & Contact',
    navAdmin: 'Panneau Admin',
    
    // Hero & Stats
    heroTitle: 'Location et Vente de Voitures en Algérie',
    heroBadge: 'Services de Location et Vente de Voitures 🚗',
    statInAlgeria: 'Disponibles à la Vente',
    statInChina: 'Disponibles à la Location',
    statShippingDays: 'Service Rapide et Fiable',
    
    // Search & Filters
    searchPlaceholder: 'Rechercher marque ou modèle (ex: Geely, Chery, BYD)...',
    filterAll: 'Tous les Véhicules',
    filterInAlgeria: 'Vente de Voitures (Immédiat)',
    filterInChina: 'Location de Voitures',
    filterBrand: 'Marque',
    filterFuel: 'Carburant',
    filterTransmission: 'Boîte de Vitesse',
    filterAllBrands: 'Toutes les Marques',
    filterAllFuels: 'Tous Carburants',
    filterAllTransmissions: 'Toutes Boîtes',
    clearFilters: 'Réinitialiser',
    noCarsFound: 'Aucun véhicule ne correspond à vos critères de recherche.',
    
    // Car Status Badges
    badgeInAlgeria: 'À Vendre 🇩🇿',
    badgeInChina: 'À Louer 🔑',
    shippingTimePrefix: 'Durée de location:',
    immediateDelivery: 'Livraison Immédiate',
    priceOnRequest: 'Prix sur Demande',
    
    // Car Details
    yearLabel: 'Année',
    mileageLabel: 'Kilométrage',
    fuelLabel: 'Carburant',
    transmissionLabel: 'Boîte de Vitesse',
    colorLabel: 'Couleur',
    locationLabel: 'Localisation',
    specsTitle: 'Équipements & Options',
    descriptionTitle: 'Détails du Véhicule',
    galleryTitle: 'Galerie Photos (Cliquez pour agrandir)',
    backToCars: 'Retour au catalogue',
    similarCarsTitle: 'Autres véhicules similaires',
    
    // Contact & Actions
    btnCallNow: 'Appeler Directement',
    btnWhatsApp: 'Discuter sur WhatsApp',
    btnDirectContact: 'Contact Direct Showroom',
    whatsappMessagePrefix: 'Bonjour Auto Elite, je souhaite me renseigner sur le véhicule:',
    
    // About & Contact Section
    aboutSectionTitle: 'À Propos de Auto Elite Showroom',
    aboutSectionSub: 'Votre partenaire de confiance pour la location et la vente de véhicules en Algérie.',
    contactInfoTitle: 'Coordonnées & Adresse',
    locationMapTitle: 'Localisation du Showroom (Alger, Algérie)',
    addressLabel: 'Adresse',
    phoneNumbersLabel: 'Téléphones',
    whatsappLabel: 'WhatsApp Officiel',
    workingHoursLabel: 'Heures d\'ouverture',
    socialMediaTitle: 'Suivez-nous sur les Réseaux Sociaux',
    
    // Process Steps
    processTitle: 'Services avec Auto Elite Showroom',
    step1Title: '1. Choix du Véhicule',
    step1Desc: 'Sélectionnez votre voiture en stock en Algérie ou disponible au départ de Chine.',
    step2Title: '2. Contact & Réservation',
    step2Desc: 'Appelez-nous ou envoyez un message WhatsApp pour obtenir la fiche technique et les modalités.',
    step3Title: '3. Expédition & Dédouanement',
    step3Desc: 'Nous gérons le transport maritime depuis les ports chinois et le dédouanement en Algérie.',
    step4Title: '4. Livraison & Carte Jaune',
    step4Desc: 'Réceptionnez votre véhicule dédouané prêt pour l\'immatriculation.',
    
    // Admin Panel
    adminTitle: 'Administration du Showroom Confiance Auto',
    adminLoginTitle: 'Connexion Administrateur',
    adminPasswordPlaceholder: 'Code PIN (Défaut: 1234)',
    adminLoginBtn: 'Se Connecter',
    adminLogoutBtn: 'Déconnexion Admin',
    adminAddCarBtn: '+ Ajouter un Véhicule',
    adminEditCarTitle: 'Modifier le Véhicule',
    adminAddCarTitle: 'Ajouter un Nouveau Véhicule',
    adminCarListTitle: 'Gestion du Stock',
    
    // Admin Form Fields
    fieldBrand: 'Marque',
    fieldModel: 'Modèle',
    fieldYear: 'Année',
    fieldPriceDzd: 'Prix en DZD (Dinars)',
    fieldPriceNote: 'Mettre 0 pour "Prix sur demande"',
    fieldLocation: 'Type de Service',
    fieldLocAlgeria: 'Vente de Voitures (Immédiat)',
    fieldLocChina: 'Location de Voitures (Service de Location)',
    fieldShippingTime: 'Durée ou Conditions de Location',
    fieldPhone: 'Téléphone de Contact',
    fieldWhatsApp: 'Numéro WhatsApp (+213...)',
    fieldMileage: 'Kilométrage',
    fieldFuel: 'Carburant',
    fieldTransmission: 'Boîte de vitesse',
    fieldColor: 'Couleur extérieure',
    fieldSpecs: 'Options & Équipements (séparés par des virgules)',
    fieldDescAr: 'Description en Arabe',
    fieldDescFr: 'Description en Français',
    fieldDescEn: 'Description en Anglais',
    fieldMainImage: 'URL Image Principale',
    fieldGalleryImages: 'URL Images Galerie (une par ligne)',
    fieldUploadLocalPhoto: 'Ou importer depuis l\'appareil:',
    
    // Admin Actions
    btnSaveCar: 'Enregistrer',
    btnCancel: 'Annuler',
    btnEdit: 'Modifier',
    btnDelete: 'Supprimer',
    btnConvertToAlgeria: 'Passer en Vente 🇩🇿',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce véhicule ?',
    carSavedSuccess: 'Véhicule enregistré avec succès !',
    carDeletedSuccess: 'Véhicule supprimé.',
    carConvertedSuccess: 'Statut changé : Véhicule disponible à la vente !',
    resetDefaultData: 'Réinitialiser Catalogue Défaut',
    
    // AI Assistant
    assistantName: 'Assistant IA Confiance 🤖',
    assistantSubtitle: 'Posez vos questions sur les tarifs de location, conditions et véhicules',
    assistantPlaceholder: 'Écrivez votre question ici...',
    assistantSend: 'Envoyer',
    
    // Footer
    footerRights: 'Tous droits réservés © Auto Elite - Location et Vente de Voitures en Algérie',
  },

  en: {
    // Showroom Identity
    brandName: 'Auto Elite',
    showroomTagline: 'Auto Elite - Car Rental and Sales in Algeria',
    showroomSubTitle: 'Professional car rental and sales services with the latest models and best rates in Algeria.',
    
    // Navigation
    navCarsAlgeria: 'Car Sales',
    navCarsChina: 'Car Rental',
    navAboutContact: 'About & Contact',
    navAdmin: 'Admin Portal',
    
    // Hero & Stats
    heroTitle: 'Car Rental and Sales in Algeria',
    heroBadge: 'Professional Rental & Sales 🚗',
    statInAlgeria: 'Available for Sale',
    statInChina: 'Available for Rent',
    statShippingDays: 'Fast & Reliable Service',
    
    // Search & Filters
    searchPlaceholder: 'Search brand or model (e.g. Geely, Chery, BYD)...',
    filterAll: 'All Vehicles',
    filterInAlgeria: 'Car Sales (Immediate)',
    filterInChina: 'Car Rental',
    filterBrand: 'Brand',
    filterFuel: 'Fuel Type',
    filterTransmission: 'Transmission',
    filterAllBrands: 'All Brands',
    filterAllFuels: 'All Fuels',
    filterAllTransmissions: 'All Transmissions',
    clearFilters: 'Clear Filters',
    noCarsFound: 'No vehicles match your search criteria.',
    
    // Car Status Badges
    badgeInAlgeria: 'For Sale 🇩🇿',
    badgeInChina: 'For Rent 🔑',
    shippingTimePrefix: 'Rental duration:',
    immediateDelivery: 'Immediate Availability',
    priceOnRequest: 'Price on Request',
    
    // Car Details
    yearLabel: 'Year',
    mileageLabel: 'Mileage',
    fuelLabel: 'Fuel',
    transmissionLabel: 'Transmission',
    colorLabel: 'Exterior Color',
    locationLabel: 'Service Type',
    specsTitle: 'Features & Equipment',
    descriptionTitle: 'Vehicle Description',
    galleryTitle: 'Photo Gallery (Click to enlarge)',
    backToCars: 'Back to all cars',
    similarCarsTitle: 'Other vehicles you might like',
    
    // Contact & Actions
    btnCallNow: 'Call Phone Now',
    btnWhatsApp: 'Chat on WhatsApp',
    btnDirectContact: 'Direct Showroom Contact',
    whatsappMessagePrefix: 'Hello Auto Elite, I would like to inquire about the car:',
    
    // About & Contact Section
    aboutSectionTitle: 'About Auto Elite Showroom',
    aboutSectionSub: 'Your trusted partner for car rental and sales services in Algeria.',
    contactInfoTitle: 'Contact Information & Address',
    locationMapTitle: 'Showroom Location Map (Algiers, Algeria)',
    addressLabel: 'Address',
    phoneNumbersLabel: 'Phone Numbers',
    whatsappLabel: 'Official WhatsApp',
    workingHoursLabel: 'Working Hours',
    socialMediaTitle: 'Follow Us on Social Media',
    
    // Process Steps
    processTitle: 'Car Rental and Sales Services with Auto Elite',
    step1Title: '1. Select Your Vehicle',
    step1Desc: 'Choose your vehicle for immediate purchase or direct rental.',
    step2Title: '2. Contact & Booking',
    step2Desc: 'Call or WhatsApp us to arrange the contract and details.',
    step3Title: '3. Documentation & Contracts',
    step3Desc: 'Quick, secure and transparent procedures for rental or purchase.',
    step4Title: '4. Handover & Delivery',
    step4Desc: 'Receive your vehicle in pristine condition, ready for use.',
    
    // Admin Panel
    adminTitle: 'Auto Elite Admin Portal',
    adminLoginTitle: 'Admin Login',
    adminPasswordPlaceholder: 'Enter PIN Code (Default: 1234)',
    adminLoginBtn: 'Login',
    adminLogoutBtn: 'Logout Admin',
    adminAddCarBtn: '+ Add New Vehicle',
    adminEditCarTitle: 'Edit Vehicle Details',
    adminAddCarTitle: 'Add New Vehicle to Inventory',
    adminCarListTitle: 'Inventory Management',
    
    // Admin Form Fields
    fieldBrand: 'Brand Name',
    fieldModel: 'Model Name',
    fieldYear: 'Year',
    fieldPriceDzd: 'Price in DZD',
    fieldPriceNote: 'Set 0 for "Price on Request"',
    fieldLocation: 'Service Type (Sale / Rental)',
    fieldLocAlgeria: 'Car Sales (Immediate)',
    fieldLocChina: 'Car Rental Service',
    fieldShippingTime: 'Rental Duration / Notes',
    fieldPhone: 'Contact Phone Number',
    fieldWhatsApp: 'WhatsApp Number (+213...)',
    fieldMileage: 'Mileage',
    fieldFuel: 'Fuel Type',
    fieldTransmission: 'Transmission',
    fieldColor: 'Exterior Color',
    fieldSpecs: 'Key Features (separated by commas)',
    fieldDescAr: 'Arabic Description',
    fieldDescFr: 'French Description',
    fieldDescEn: 'English Description',
    fieldMainImage: 'Main Image URL',
    fieldGalleryImages: 'Additional Gallery Image URLs (one per line)',
    fieldUploadLocalPhoto: 'Or upload photos from device:',
    
    // Admin Actions
    btnSaveCar: 'Save Vehicle',
    btnCancel: 'Cancel',
    btnEdit: 'Edit',
    btnDelete: 'Delete',
    btnConvertToAlgeria: 'Set for Sale 🚗',
    confirmDelete: 'Are you sure you want to delete this vehicle?',
    carSavedSuccess: 'Vehicle saved successfully!',
    carDeletedSuccess: 'Vehicle deleted.',
    carConvertedSuccess: 'Vehicle status updated successfully!',
    resetDefaultData: 'Restore Default Catalog',
    
    // AI Assistant
    assistantName: 'Auto Elite AI Assistant 🤖',
    assistantSubtitle: 'Ask me about car rental, sales, and available models',
    assistantPlaceholder: 'Type your question here...',
    assistantSend: 'Send',
    
    // Footer
    footerRights: 'All rights reserved © Auto Elite - Car Rental and Sales in Algeria',
  }
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.ar;
}
