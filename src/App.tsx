import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Star, 
  Flame, 
  Calendar, 
  Users, 
  Wifi, 
  Wind, 
  Tv, 
  Briefcase, 
  CheckSquare, 
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  TrendingDown,
  Trash2,
  CalendarCheck,
  Globe,
  Compass,
  FileText,
  BadgeAlert,
  Loader2,
  RefreshCw,
  Star as StarIcon,
  Crown,
  Train,
  Car,
  Plane,
  Copy,
  ExternalLink,
  Navigation,
  Map,
  Home,
  Bed,
  Settings,
  Key,
  MessageSquare,
  Search,
  Umbrella,
  Mountain,
  Anchor,
  Trees,
  Plus,
  Coffee,
  User
} from 'lucide-react';
import { ROOMS, REVIEWS, NEARBY_SIGHTS } from './data';
import { Room, Review, Booking, AnnouncementConfig, CustomPage } from './types';
import AIConcierge from './components/AIConcierge';
import RoomCard from './components/RoomCard';
import AdminPanel from './components/AdminPanel';
import ClientDashboard from './components/ClientDashboard';
import PremiumWelcomeUpgrade from './components/PremiumWelcomeUpgrade';
import OfficialPhotoGallery from './components/OfficialPhotoGallery';
import FaqSection from './components/FaqSection';
import BookingEmailTemplate from './components/BookingEmailTemplate';
import { LegalAvisoContent, LegalPrivacidadContent, LegalCookiesContent, LegalReservasContent } from './components/LegalContent';

interface HeroSlide {
  image: string;
  taglineEs: string;
  taglineEn: string;
  taglineFr?: string;
  taglineAr?: string;
  titleEs: string;
  titleEn: string;
  titleFr?: string;
  titleAr?: string;
  descEs: string;
  descEn: string;
  descFr?: string;
  descAr?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145477620.jpg?k=480dc02a27c144529eb1a60903829c4c43afc94c29f1d53044bf063fa6e0f1f3&o=',
    taglineEs: 'El encanto familiar de siempre',
    taglineEn: 'Traditional family guest experience',
    taglineFr: 'Le charme familial de toujours',
    taglineAr: 'سحر الضيافة العائلية الأصيلة',
    titleEs: 'Vive la Costa del Sol como en tu propio hogar',
    titleEn: 'Experience the Costa del Sol with local Andalusian warmth',
    titleFr: 'Découvrez la Costa del Sol comme chez vous',
    titleAr: 'عِش تجربة كوستا ديل سول وكأنك في بيتك',
    descEs: 'Habitaciones impecables a solo 3 minutos de la estación de tren y con atención familiar inigualable en Arroyo de la Miel.',
    descEn: 'Pristine and cozy rooms just a 3-minute walk from the railway station. Ideal base for discovering Malaga.',
    descFr: 'Des chambres impeccables à seulement 3 minutes de la gare, avec un accueil chaleureux et unique à Arroyo de la Miel.',
    descAr: 'غرف نوم نظيفة ومريحة على بُعد 3 دقائق فقط من محطة القطار مع ترحيب عائلي لا مثيل له في أرّويو دي لا مييل.'
  },
  {
    image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_avif,h_827,q_65,w_1919/v1/clients/benalmadena/ChatGPT_Image_7_abr_2026_23_45_03_484e1544-f6b8-465b-b0e4-398abda27ce4.png',
    taglineEs: 'Playas de ensueño y Puerto Marina',
    taglineEn: 'Scenic harbor and beaches',
    taglineFr: 'Plages de rêve et Puerto Marina',
    taglineAr: 'شواطئ ساحرة وميناء بورتو مارينا',
    titleEs: 'La brisa del Mediterráneo y el Puerto de Benalmádena',
    titleEn: 'Sun-drenched beaches and famed Mediterranean Marinas',
    titleFr: 'La brise de la Méditerranée et le port de Benalmádena',
    titleAr: 'نسيم البحر الأبيض المتوسط وميناء بينالمادينا',
    descEs: 'Un tranquilo paseo te separa de las playas de fina arena de Benalmádena, sus paseos marítimos y la arquitectura única de Puerto Marina.',
    descEn: 'Enjoy a short trip straight to the golden beachfront. Explore the famous Puerto Marina harbor, sun-beds, and local tapas bars.',
    descFr: 'Une agréable promenade vous sépare des plages de sable fin de Benalmádena, de leurs digues et de l\'architecture unique de Puerto Marina.',
    descAr: 'نزهة قصيرة مشياً على الأقدام تفصلك عن شواطئ بينالمادينا الذهبية، وممراتها البحرية، ومعمار ميناء بورتو مارينا الفريد.'
  },
  {
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=',
    taglineEs: 'Confort y espacios compartidos reales',
    taglineEn: 'Our authentic guest lounge & kitchen',
    taglineFr: 'Confort & espaces partagés réels',
    taglineAr: 'راحة تامة ومساحات مشتركة حقيقية',
    titleEs: 'Cocina compartida equipada y café gratuito',
    titleEn: 'Free hot morning coffee & fully stocked guest kitchen',
    titleFr: 'Cuisine partagée équipée & café gratuit',
    titleAr: 'مطبخ مشترك مجهز بالكامل وقهوة مجانية',
    descEs: 'Zona común real equipada con cafetera, microondas, tostadora y mesas para que desayunes a tu ritmo o planifiques tus excursiones.',
    descEn: 'Our authentic local shared dining lounge and fully equipped kitchen area has microwaves, toasters, and complimentary hot coffee.',
    descFr: 'Salon commun équipé d\'une cafetière, d\'un micro-ondes, d\'un grille-pain et de tables pour prendre votre petit-déjeuner ou planifier vos excursions.',
    descAr: 'منطقة مشتركة مجهزة بالكامل بآلة صنع القهوة، ميكروويف، محمصة خبز، وطاولات لتناول الإفطار براحتك أو للتخطيط لرحلاتك.'
  }
];

const LANGUAGES = [
  { id: 'es', flag: '🇪🇸', label: 'Español' },
  { id: 'en', flag: '🇬🇧', label: 'English' },
  { id: 'fr', flag: '🇫🇷', label: 'Français' },
  { id: 'ar', flag: '🇲🇦', label: 'العربية' }
] as const;

export default function App() {
  // Toast state for replacing alerts
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const showToast = (text: string, type: 'success' | 'error' = 'error') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Locale state
  const [lang, setLang] = useState<'es' | 'en' | 'fr' | 'ar'>('es');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Review Booking Code and validation states
  const [newReviewBookingCode, setNewReviewBookingCode] = useState('');
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewsFilter, setReviewsFilter] = useState<'all' | 'verified' | '5star' | '4star'>('all');
  
  // Translation helper function
  const t = (es: string, en: string, fr?: string, ar?: string): string => {
    if (lang === 'ar') return ar || en || es;
    if (lang === 'fr') return fr || en || es;
    if (lang === 'en') return en || es;
    return es;
  };

  const getRoomName = (r: Room | null): string => {
    if (!r) return '';
    return t(r.name, r.nameEn, r.nameFr, r.nameAr);
  };

  const getRoomDescription = (r: Room | null): string => {
    if (!r) return '';
    return t(r.description, r.descriptionEn, r.descriptionFr, r.descriptionAr);
  };

  const getRoomAmenities = (r: Room | null): string[] => {
    if (!r) return [];
    if (lang === 'ar') return r.amenitiesAr || r.amenitiesEn || r.amenities;
    if (lang === 'fr') return r.amenitiesFr || r.amenitiesEn || r.amenities;
    if (lang === 'en') return r.amenitiesEn || r.amenities;
    return r.amenities;
  };
  
  // Media Management states
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [welcomeImage, setWelcomeImage] = useState<string>('');
  const [upgradeImages, setUpgradeImages] = useState<string[]>([]);

  // Hero slider active slide index
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const slidesToUse = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_SLIDES;

  // Auto-play timer for Hero banner slides
  useEffect(() => {
    if (slidesToUse.length === 0) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev >= slidesToUse.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slidesToUse.length]);
  
  // Active navigation section
  const [activeTab, setActiveTab] = useState<'inicio' | 'habitaciones' | 'servicios' | 'situacion' | 'ofertas' | 'opiniones' | 'reservas' | 'panel-admin' | 'panel-cliente' | 'contacto'>('inicio');

  // Legal modal state
  const [legalModal, setLegalModal] = useState<'aviso' | 'privacidad' | 'cookies' | 'reservas' | null>(null);

  // Mobile menu open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Rooms filter state
  const [bathroomFilter, setBathroomFilter] = useState<'all' | 'private' | 'shared'>('all');
  const [capacityFilter, setCapacityFilter] = useState<number>(0);

  // Local storage lists for Bookings, Reviews & Rooms
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [roomsList, setRoomsList] = useState<Room[]>([]);

  // Testimonial slider active slide index
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);

  // Auto-play timer for reviews
  useEffect(() => {
    if (reviewsList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentReviewSlide((prev) => (prev >= reviewsList.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  // Dynamic top active banner announcement configs
  const [announcement, setAnnouncement] = useState<AnnouncementConfig>({
    enabled: true,
    textEs: '🍀 ¡DESCUENTO WEB DIRECTO! Introduce el código \'DIRECTO\' al contactar y disfruta de un 10% de descuento directo.',
    textEn: '🍀 DIRECT WEB DISCOUNT! Mention \'DIRECT\' and instantly receive a 10% rate reduction during check-out.',
    style: 'alert-yellow'
  });

  // Dynamic CMS custom pages list
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);

  // Booking Modal management
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [breakfastOption, setBreakfastOption] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [quickPromoCode, setQuickPromoCode] = useState('');
  const [useSmartRedaction, setUseSmartRedaction] = useState(true);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState<string | null>(null);
  const [successViewMode, setSuccessViewMode] = useState<'voucher' | 'email'>('voucher');
  const [cloudbedsSyncStatus, setCloudbedsSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRoomType, setNewReviewRoomType] = useState('Doble con Baño Privado');
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string | null>(null);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactText, setContactText] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccessMessage, setContactSuccessMessage] = useState<string | null>(null);

  // Fast direct instant search parameters
  const [quickCheckIn, setQuickCheckIn] = useState('');
  const [quickCheckOut, setQuickCheckOut] = useState('');
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickRoomType, setQuickRoomType] = useState<string>('');
  const [quickSearchRun, setQuickSearchRun] = useState(false);
  const [searchTab, setSearchTab] = useState<'pension' | 'habitaciones' | 'larga' | 'grupos'>('pension');

  // Dynamic instantaneous Booking.com comparison rates
  const [priceMode, setPriceMode] = useState<'direct' | 'booking'>('direct');

  // Premium location tab active guides
  const [locationSubTab, setLocationSubTab] = useState<'map' | 'transit' | 'car'>('map');
  const [addressCopied, setAddressCopied] = useState(false);

  // Initial load from localStorage
  useEffect(() => {
    const handleUrlPath = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (
        path.toLowerCase() === '/admin' ||
        path.toLowerCase() === '/administration' || 
        path.toLowerCase().endsWith('/administration') ||
        hash.toLowerCase() === '#/administration' ||
        hash.toLowerCase() === '#administration' ||
        hash.toLowerCase() === '#admin'
      ) {
        setActiveTab('panel-admin');
      }
    };

    handleUrlPath();
    window.addEventListener('hashchange', handleUrlPath);
    window.addEventListener('popstate', handleUrlPath);

    const savedBookings = localStorage.getItem('serramar_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    const savedReviews = localStorage.getItem('serramar_reviews');
    if (savedReviews) {
      setReviewsList(JSON.parse(savedReviews));
    } else {
      setReviewsList(REVIEWS);
    }

    const savedRooms = localStorage.getItem('serramar_rooms');
    if (savedRooms) {
      setRoomsList(JSON.parse(savedRooms));
    } else {
      setRoomsList(ROOMS);
    }

    const savedAnnouncement = localStorage.getItem('serramar_announcement');
    if (savedAnnouncement) {
      setAnnouncement(JSON.parse(savedAnnouncement));
    }

    const savedPages = localStorage.getItem('serramar_pages');
    if (savedPages) {
      const parsed = JSON.parse(savedPages) as CustomPage[];
      const cleaned = parsed.filter(p => p.id !== 'normas' && p.id !== 'guia');
      setCustomPages(cleaned);
      localStorage.setItem('serramar_pages', JSON.stringify(cleaned));
    }

    const savedHeroSlides = localStorage.getItem('serramar_hero_slides');
    if (savedHeroSlides) {
      setHeroSlides(JSON.parse(savedHeroSlides));
    } else {
      setHeroSlides(HERO_SLIDES);
    }

    const savedWelcomeImage = localStorage.getItem('serramar_welcome_image');
    if (savedWelcomeImage) {
      setWelcomeImage(savedWelcomeImage);
    } else {
      setWelcomeImage('https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=');
    }

    const savedUpgradeImages = localStorage.getItem('serramar_upgrade_images');
    if (savedUpgradeImages) {
      setUpgradeImages(JSON.parse(savedUpgradeImages));
    } else {
      setUpgradeImages([
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733636585.jpg?k=a788657d55cfe2d19d472e884d45d61349c6bd1e7b0727de61c724228ecf0f62&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733636614.jpg?k=03bad47c293ab9059fe10296d2aeaacc6e113c36d213a662881ef11ed2086a2e&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145311438.jpg?k=3d59d88d097928e198f11275595b26b076c8af604997dfb2046ffac39e9d6ab3&o='
      ]);
    }

    return () => {
      window.removeEventListener('hashchange', handleUrlPath);
      window.removeEventListener('popstate', handleUrlPath);
    };
  }, []);

  // Sync bookings
  const saveBookingsToStorage = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings);
    localStorage.setItem('serramar_bookings', JSON.stringify(updatedBookings));
  };

  // Sync reviews
  const saveReviewsToStorage = (updatedReviews: Review[]) => {
    setReviewsList(updatedReviews);
    localStorage.setItem('serramar_reviews', JSON.stringify(updatedReviews));
  };

  // Sync rooms
  const saveRoomsToStorage = (updatedRooms: Room[]) => {
    setRoomsList(updatedRooms);
    localStorage.setItem('serramar_rooms', JSON.stringify(updatedRooms));
  };

  // Synchronize dynamic prices & availability in real-time with Cloudbeds PMS for eh45iO
  const syncCloudbedsRates = async (inDate?: string, outDate?: string, gst?: number, prm?: string) => {
    setCloudbedsSyncStatus('syncing');
    try {
      const checkinVal = inDate || '';
      const checkoutVal = outDate || '';
      const guestsVal = gst || 2;
      const promoVal = prm !== undefined ? prm : '';

      const url = `/api/cloudbeds/rates?checkin=${encodeURIComponent(checkinVal)}&checkout=${encodeURIComponent(checkoutVal)}&guests=${guestsVal}&promo=${encodeURIComponent(promoVal)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Cloudbeds API responded with an error status');
      
      const data = await res.json();
      if (data.success && data.rates) {
        // We read from the local original list to not lose description or assets
        const savedRooms = localStorage.getItem('serramar_rooms');
        const sourceRooms = savedRooms ? JSON.parse(savedRooms) : ROOMS;

        // Update with the synchronized dynamic prices and availability
        const updatedRooms = (sourceRooms as Room[]).map(room => {
          const synced = data.rates[room.id];
          if (synced) {
            return {
              ...room,
              price: synced.pricePerNight,
              available: synced.available,
              isLowInventory: synced.isLowInventory,
              availableCount: synced.availableCount
            };
          }
          return room;
        });
        
        setRoomsList(updatedRooms);
        setCloudbedsSyncStatus('success');
        setLastSyncTime(new Date().toLocaleTimeString());
        console.log(`[CLOUDBEDS LIVE SYNC] Successfully loaded rates from property eh45iO:`, data.rates);
      } else {
        throw new Error('Invalid Cloudbeds sync data format');
      }
    } catch (err) {
      console.error('[CLOUDBEDS SYNC ERROR] Failed fetching rates, retaining default database rates:', err);
      setCloudbedsSyncStatus('error');
    }
  };

  // Auto-sync rates with Cloudbeds PMS instantly on load, date search, or booking modal parameter changes
  useEffect(() => {
    const effectiveIn = checkIn || quickCheckIn || '';
    const effectiveOut = checkOut || quickCheckOut || '';
    const effectiveGuests = checkIn ? guestsCount : (quickGuests || 2);
    const effectivePromo = checkIn ? promoCode : (quickPromoCode || '');

    syncCloudbedsRates(effectiveIn, effectiveOut, effectiveGuests, effectivePromo);
  }, [checkIn, checkOut, guestsCount, promoCode, quickCheckIn, quickCheckOut, quickGuests, quickPromoCode]);

  // Sync announcements
  const saveAnnouncementToStorage = (updatedAnnouncement: AnnouncementConfig) => {
    setAnnouncement(updatedAnnouncement);
    localStorage.setItem('serramar_announcement', JSON.stringify(updatedAnnouncement));
  };

  // Sync pages
  const savePagesToStorage = (updatedPages: CustomPage[]) => {
    setCustomPages(updatedPages);
    localStorage.setItem('serramar_pages', JSON.stringify(updatedPages));
  };

  // Sync dynamic media
  const saveHeroSlidesToStorage = (updatedSlides: any[]) => {
    setHeroSlides(updatedSlides);
    localStorage.setItem('serramar_hero_slides', JSON.stringify(updatedSlides));
  };

  const saveWelcomeImageToStorage = (url: string) => {
    setWelcomeImage(url);
    localStorage.setItem('serramar_welcome_image', url);
  };

  const saveUpgradeImagesToStorage = (updatedImages: string[]) => {
    setUpgradeImages(updatedImages);
    localStorage.setItem('serramar_upgrade_images', JSON.stringify(updatedImages));
  };

  // Handle direct contact post
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactText) return;

    setContactSubmitting(true);
    setContactSuccessMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          subject: contactSubject || 'Client Inquiry',
          message: contactText
        })
      });

      const data = await res.json();
      if (res.ok) {
        setContactSuccessMessage(
          lang === 'es' 
            ? '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en las próximas horas.' 
            : 'Message sent successfully! We will get in touch in the next few hours.'
        );
        // Clear form
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactSubject('');
        setContactText('');
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      showToast('Error sending contact message. Please try again.', 'error');
    } finally {
      setContactSubmitting(false);
    }
  };

  // Run Room Check
  const filteredRooms = roomsList.filter(room => {
    if (bathroomFilter !== 'all') {
      if (bathroomFilter === 'private' && room.bathroom !== 'private') return false;
      if (bathroomFilter === 'shared' && room.bathroom !== 'shared') return false;
    }
    if (capacityFilter > 0 && room.maxGuests < capacityFilter) {
      return false;
    }
    return true;
  });

  // Handle room booking calculation
  const getCalculatedPrice = (pricePerNight: number) => {
    const activeRatePerNight = priceMode === 'direct' ? pricePerNight : Math.round(pricePerNight * 1.15);
    
    if (!checkIn || !checkOut) {
      return { 
        nights: 1, 
        base: activeRatePerNight, 
        discount: 0, 
        breakfast: 0, 
        total: activeRatePerNight,
        promoDiscount: 0,
        promoCodeApplied: ''
      };
    }
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime()) || date1 >= date2) {
      return { 
        nights: 1, 
        base: activeRatePerNight, 
        discount: 0, 
        breakfast: 0, 
        total: activeRatePerNight,
        promoDiscount: 0,
        promoCodeApplied: ''
      };
    }
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let basePrice = activeRatePerNight * nights;
    
    // By user request, we import the exact price from Cloudbeds without automatic direct discount
    let dealDiscount = 0;
    
    // Custom Promo Code overrides or replaces standard direct booking discount
    let promoDiscount = 0;
    let promoApplied = '';
    const cleanPromo = promoCode.trim().toUpperCase();
    if (cleanPromo === 'WELCOME18') {
      promoDiscount = basePrice * 0.18;
      promoApplied = 'WELCOME18';
    } else if (cleanPromo === 'POLMARNOR') {
      promoDiscount = basePrice * 0.10;
      promoApplied = 'POLMARNOR';
    }
    
    // If a valid promo discount is active, use it instead of standard deal discount to avoid double couponing
    let activeDiscount = dealDiscount;
    if (promoDiscount > 0) {
      activeDiscount = promoDiscount;
    }
    
    // Breakfast discount ticket is free
    let breakfastCost = 0;
    
    let finalTotal = basePrice - activeDiscount + breakfastCost;

    return {
      nights,
      base: basePrice,
      discount: activeDiscount,
      breakfast: breakfastCost,
      total: Math.round(finalTotal),
      promoDiscount,
      promoCodeApplied: promoApplied
    };
  };

  // Smart GDPR Redaction helper functions
  const redactName = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    return parts.map((part, index) => {
      if (index === 0) {
        if (part.length <= 2) return part;
        return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
      }
      return part[0] + '.';
    }).join(' ');
  };

  const redactEmail = (email: string): string => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!domain) return '***';
    if (local.length <= 2) {
      return local[0] + '***@' + domain;
    }
    return local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] + '@' + domain;
  };

  const redactPhone = (phone: string): string => {
    if (!phone) return '';
    const p = phone.trim();
    if (p.length <= 6) return '***';
    return p.slice(0, 3) + '*'.repeat(p.length - 6) + p.slice(-3);
  };

  // Trigger Booking Submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomForBooking || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      showToast(lang === 'es' ? 'Por favor rellenar todos los datos obligatorios.' : 'Please fill all mandatory fields.', 'error');
      return;
    }

    setIsBookingSubmitting(true);
    setBookingSuccessMessage(null);

    try {
      // Call server validation simulation just to verify dates
      const valRes = await fetch('/api/bookings/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkIn, checkOut, type: selectedRoomForBooking.id, guests: guestsCount })
      });
      const valData = await valRes.json();
      if (!valRes.ok) {
        showToast(valData.error || 'Invalid booking dates', 'error');
        setIsBookingSubmitting(false);
        return;
      }

      // Calculation
      const priceDetails = getCalculatedPrice(selectedRoomForBooking.price);
      const bookingId = 'BKR-' + Math.floor(100000 + Math.random() * 900000);

      // Determine status & special requests
      let statusVal: 'confirmed' | 'pending' | 'cancelled' = 'confirmed';

      let specialReqText = specialRequests;
      if (breakfastOption) {
        specialReqText += ' (Solicita Ticket Descuento Cafetería)';
      }
      if (promoCode.trim()) {
        specialReqText += ` [Código Promo: ${promoCode.trim().toUpperCase()}]`;
      }
      specialReqText += ` [Pago: Cloudbeds PMS Direct Redirect]`;

      // 1. Unredacted Booking for Local Storage (so guest sees full details in dashboard)
      const localBooking: Booking = {
        id: bookingId,
        roomName: getRoomName(selectedRoomForBooking),
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        guests: guestsCount,
        totalPrice: priceDetails.total,
        status: statusVal,
        specialRequests: specialReqText
      };

      // 2. Redacted Booking for local server / Database if smart redaction is active
      const finalGuestName = useSmartRedaction ? redactName(guestName) : guestName;
      const finalGuestEmail = useSmartRedaction ? redactEmail(guestEmail) : guestEmail;
      const finalGuestPhone = useSmartRedaction ? redactPhone(guestPhone) : guestPhone;

      const databaseBooking: Booking = {
        id: bookingId,
        roomName: getRoomName(selectedRoomForBooking),
        guestName: finalGuestName,
        guestEmail: finalGuestEmail,
        guestPhone: finalGuestPhone,
        checkIn,
        checkOut,
        guests: guestsCount,
        totalPrice: priceDetails.total,
        status: statusVal,
        specialRequests: specialReqText + (useSmartRedaction ? ' [GDPR Enmascarado Inteligente Activo]' : '')
      };

      // Handle Cloudbeds Flow (Only supported payment method)
      // Save to backend database + trigger mail routing simultaneously with databaseBooking
      await fetch('/api/bookings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking: databaseBooking })
      });

      // Save locally first so they record it in 'My Bookings'
      const updated = [localBooking, ...bookings];
      saveBookingsToStorage(updated);

      const cloudbedsUrl = `https://us2.cloudbeds.com/en/reservation/eh45iO/?currency=eur&checkin=${checkIn}&checkout=${checkOut}&guests=${guestsCount}&promo=${encodeURIComponent(promoCode.trim())}&adults=${guestsCount}`;

      setBookingSuccessMessage(
        lang === 'es'
          ? `¡Registro local de reserva completado con éxito! Redirigiendo a nuestro motor oficial seguro de Cloudbeds...`
          : `Local booking registry completed successfully! Redirecting to our secure, official Cloudbeds engine...`
      );

      // Clean up fields
      setGuestName('');
      setGuestEmail('');
      setGuestPhone('');
      setSpecialRequests('');
      setPromoCode('');
      setBreakfastOption(false);

      setTimeout(() => {
        window.location.href = cloudbedsUrl;
      }, 1500);
      return;
    } catch (err: any) {
      console.error(err);
      showToast(lang === 'es' ? 'Error al procesar la reserva. Compruebe su conexión.' : `Error processing booking: ${err.message || 'Check server status'}`, 'error');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // Handle Review Submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);

    const code = newReviewBookingCode.trim().toUpperCase();
    if (!code) {
      setReviewError(
        lang === 'es'
          ? 'Por favor, introduce tu código de reserva (ej. BKR-XXXXXX).'
          : 'Please enter your booking reference code (e.g., BKR-XXXXXX).'
      );
      return;
    }

    const matchedBooking = bookings.find(b => b.id.toUpperCase().trim() === code);
    if (!matchedBooking) {
      setReviewError(
        lang === 'es'
          ? 'Código de reserva no válido. Para escribir una opinión, debes tener una estancia real confirmada.'
          : 'Invalid booking code. Stays must be verified with an authenticated booking reference.'
      );
      return;
    }

    if (matchedBooking.status === 'cancelled') {
      setReviewError(
        lang === 'es'
          ? 'Esta reserva ha sido cancelada. No es posible valorar estancias canceladas.'
          : 'This booking has been cancelled. Cancelled stays are ineligible to write reviews.'
      );
      return;
    }

    const authorToUse = newReviewAuthor.trim() || matchedBooking.guestName;
    if (!authorToUse || !newReviewComment.trim()) {
      setReviewError(
        lang === 'es'
          ? 'Por favor, introduce tu nombre o firma, y comparte tu comentario.'
          : 'Please enter your reviewer name and write your comment.'
      );
      return;
    }

    const newRev: Review = {
      id: 'REV-' + Date.now().toString(),
      author: authorToUse,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
      commentEn: newReviewComment,
      roomType: matchedBooking.roomName || newReviewRoomType,
      origin: 'Spain',
      verified: true
    };

    const updated = [newRev, ...reviewsList];
    saveReviewsToStorage(updated);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewBookingCode('');
    setReviewSuccessMessage(
      lang === 'es' 
        ? '¡Gracias! Tu opinión certificada de huésped ha sido publicada correctamente.' 
        : 'Thank you! Your certified guest review has been successfully published.'
    );
    setTimeout(() => setReviewSuccessMessage(null), 4000);
  };

  // Cancel Booking
  const handleCancelBooking = (bookingId: string) => {
    if (confirm(lang === 'es' ? '¿Seguro que deseas cancelar esta reserva?' : 'Are you sure you want to cancel this booking?')) {
      const updated = bookings.filter(b => b.id !== bookingId);
      saveBookingsToStorage(updated);
    }
  };

  // Get Average Reviews score
  const avgRating = (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length).toFixed(1);

  // Handle premium upgrade processed directly from Airbnb widget
  const handlePremiumUpgradeBooked = (bookingData: {
    roomName: string;
    pricePerNight: number;
    nights: number;
    totalPrice: number;
    guestName: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => {
    // Open the standard booking form so they can select Cloudbeds or Pay on Arrival
    const upgradeRoom: Room = {
      id: 'ROOM_PREMIUM_UPGRADE',
      name: bookingData.roomName,
      nameEn: bookingData.roomName,
      nameFr: bookingData.roomName,
      nameAr: bookingData.roomName,
      description: 'Deluxe Suite Upgrade',
      descriptionEn: 'Deluxe Suite Upgrade',
      descriptionFr: 'Deluxe Suite Upgrade',
      descriptionAr: 'Deluxe Suite Upgrade',
      price: bookingData.pricePerNight,
      type: 'doble',
      bathroom: 'private',
      maxGuests: 4,
      image: upgradeImages[0] || 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg',
      amenities: ['Wifi', 'TV', 'Air Conditioning', 'Kitchen'],
      amenitiesEn: ['Wifi', 'TV', 'Air Conditioning', 'Kitchen'],
      images: upgradeImages
    };

    setActiveTab('habitaciones');
    triggerQuickBooking(upgradeRoom, bookingData.checkIn, bookingData.checkOut, bookingData.guests);
    setTimeout(() => {
      document.getElementById('modulo-reservas')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Trigger easy flow to reserve
  const triggerQuickBooking = (room: Room, defaultCheckIn?: string, defaultCheckOut?: string, defaultGuests?: number) => {
    setCheckIn(defaultCheckIn || quickCheckIn || new Date().toISOString().split('T')[0]);
    // Next day checkout
    if (defaultCheckOut || quickCheckOut) {
      setCheckOut(defaultCheckOut || quickCheckOut);
    } else {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
    setGuestsCount(defaultGuests || Math.min(quickGuests, room.maxGuests));
    setSelectedRoomForBooking(room);
  };

  const getBannerStyle = () => {
    switch (announcement.style) {
      case 'alert-yellow':
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950';
      case 'alert-blue':
        return 'bg-gradient-to-r from-sky-500 to-sky-600 text-white';
      case 'alert-green':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
      case 'alert-red':
        return 'bg-gradient-to-r from-rose-500 to-rose-600 text-white';
      case 'dark':
        return 'bg-slate-900 text-white border-b border-slate-800';
      default:
        return 'bg-amber-400 text-slate-950';
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-sky-500 selection:text-white text-slate-800 pb-16 lg:pb-0 relative"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`px-4 py-2.5 rounded-full shadow-lg border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {toastMessage.type === 'success' ? '✓' : '⚠'}
            {toastMessage.text}
          </div>
        </div>
      )}
      
      {announcement.enabled && (
        <div className={`py-2 px-4 text-center text-[11px] font-bold leading-normal relative select-none md:tracking-wide w-full flex items-center justify-center gap-1.5 shadow-sm transition ${getBannerStyle()}`} id="system-promo-announcement">
          <BadgeAlert className="h-4 w-4 shrink-0 animate-bounce" />
          <span>
            {lang === 'es' 
              ? announcement.textEs 
              : lang === 'fr'
                ? '🍀 REMISE DIRECTE SUR LE WEB ! Mentionnez \'DIRECT\' lors de votre réservation et profitez de 10% de réduction immédiate.'
                : lang === 'ar'
                  ? '🍀 خصم مباشر من الموقع! اذكر الكود \'DIRECTO\' واستمتع بخصم فوري بنسبة 10٪.'
                  : announcement.textEn}
          </span>
        </div>
      )}

      {/* Upper Direct Info & Language Flag Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-300 text-xs py-2.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <a href="tel:+34952442604" className="flex items-center gap-1.5 hover:text-white transition">
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            +34 952 44 26 04
          </a>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            C. las Flores, 5, 29631 Benalmádena, Málaga
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <a 
            href={`https://wa.me/34683571614?text=${encodeURIComponent(
              t(
                '¡Hola! Me gustaría reservar con vosotros. ¿Tenéis ofertas especiales hoy?',
                'Hello! I would like to book a stay with you. Do you have any special deals?',
                'Bonjour! Je souhaite réserver un séjour chez vous. Avez-vous des offres spéciales aujourd\'hui?',
                'مرحباً! أود حجز إقامة معكم. هل لديكم أي عروض خاصة اليوم؟'
              )
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-bold"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>💬 {t('WhatsApp Directo: +34 683 571 614', 'Book on WhatsApp: +34 683 571 614', 'WhatsApp Direct: +34 683 571 614', 'واتساب المباشر: +34 683 571 614')}</span>
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 bg-slate-900 rounded-lg px-2.5 py-1 border border-slate-800">
            <Globe className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
              {t('Mejor precio garantizado', 'Best Price Guaranteed', 'Meilleur prix garanti', 'أفضل سعر مضمون')}
            </span>
          </div>
          
          {/* Smart Floating Dropdown Language Switcher with Flags & Smooth Slide */}
          <div className="relative" id="btn-language-toggle">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow"
              title={t('Cambiar idioma', 'Change language', 'Changer la langue', 'تغيير اللغة')}
            >
              <span>{lang === 'es' ? '🇪🇸' : lang === 'en' ? '🇬🇧' : lang === 'fr' ? '🇫🇷' : '🇲🇦'}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">{lang === 'es' ? 'ES' : lang === 'en' ? 'EN' : lang === 'fr' ? 'FR' : 'AR'}</span>
              <ChevronDown className={`h-3 w-3 text-slate-500 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180 text-sky-400' : ''}`} />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  {/* Invisible background click handler to close menu */}
                  <div className="fixed inset-0 z-45 bg-transparent" onClick={() => setLangDropdownOpen(false)} />
                  
                  {/* Elegant sliding dropdown container */}
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ type: 'spring', duration: 0.3, bounce: 0.1 }}
                    className="absolute right-0 mt-2.5 w-36 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-md"
                  >
                    <div className="p-1.5 space-y-0.5">
                      {LANGUAGES.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setLang(item.id);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                            lang === item.id 
                              ? 'bg-sky-600 font-bold text-white shadow-md' 
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{item.flag}</span>
                            <span className="text-[11px]">{item.label}</span>
                          </div>
                          {lang === item.id && <Check className="h-3 w-3 text-white" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Luxury Header / Nav */}
      <header className="bg-white/95 backdrop-blur shadow-sm sticky top-0 z-40 transition-all duration-200 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
          
          {/* Brand Logo - Compact, Ultra-Modern "Sun Serramar" Brand Styling */}
          <div 
            onClick={() => { setActiveTab('inicio'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="flex flex-col cursor-pointer group select-none"
            title={t('Ir al Inicio • Sun Serramar', 'Go to Home • Sun Serramar')}
          >
            <div className="flex items-center animate-fade-in">
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-800 group-hover:text-sky-600 transition-colors duration-300 font-display leading-none flex items-center">
                SUN&nbsp;<span className="text-sky-500 font-black tracking-[0.25em]">SERRAMAR</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 bg-sky-500 rounded-none shrink-0" />
              <span className="text-[7px] sm:text-[7.5px] text-slate-500 uppercase tracking-[0.16em] font-extrabold font-sans leading-none">
                Benalmádena • Málaga
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Ultra Clean, Symmetrical & Modern UI */}
          <nav className="hidden lg:flex items-center gap-1.55 lg:gap-1.5">
            <button
              onClick={() => setActiveTab('inicio')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'inicio' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {t('Inicio', 'Home', 'Accueil', 'الرئيسية')}
            </button>
            <button
              onClick={() => setActiveTab('habitaciones')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'habitaciones' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {t('Habitaciones', 'Rooms', 'Chambres', 'الغرف')}
            </button>
            <button
              onClick={() => setActiveTab('servicios')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'servicios' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {t('Servicios', 'Services', 'Services', 'الخدمات')}
            </button>
            <button
              onClick={() => setActiveTab('situacion')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'situacion' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {t('Situación', 'Location', 'Localisation', 'الموقع')}
            </button>
            <button
              onClick={() => setActiveTab('opiniones')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'opiniones' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {t('Opiniones', 'Reviews', 'Avis', 'الآراء')}
            </button>
            <button
              onClick={() => setActiveTab('contacto')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                activeTab === 'contacto' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              {t('Contacto', 'Contact Us', 'Contact', 'اتصل بنا')}
            </button>

            {customPages.filter(p => p.isActive && p.showInNav).map(page => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id as any)}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer ${
                  activeTab === page.id 
                    ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {lang === 'es' ? page.titleEs : page.titleEn}
              </button>
            ))}

            <button
              onClick={() => setActiveTab('panel-cliente')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative cursor-pointer flex items-center gap-1 ${
                activeTab === 'panel-cliente' 
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              <span>🔑</span>
              <span>{t('Zona Cliente', 'Guest Area', 'Espace Client', 'منطقة العميل')}</span>
            </button>

            {bookings.length > 0 && (
              <button
                onClick={() => setActiveTab('reservas')}
                className={`ml-1 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                  activeTab === 'reservas' ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t('Mis Reservas', 'My Bookings', 'Mes Réservations', 'حجوزاتي')}
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white font-extrabold rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center shadow">
                  {bookings.length}
                </span>
              </button>
            )}
          </nav>

          {/* Quick Book Button Trigger */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('habitaciones');
                document.getElementById('habitaciones-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-[11px] uppercase tracking-widest py-2.5 px-5 rounded-xl shadow hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
              id="header-btn-reserve"
            >
              {t('RESERVAR DIRECTO', 'BOOK ONLINE DIRECT', 'RÉSERVER DIRECT', 'احجز مباشرة')}
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-700 transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Links Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 py-3 px-4 shadow-xl space-y-1 animate-in slide-in-from-top duration-200">
          
          {/* Mobile Segments Selector inside menu for smarter phone experience */}
          <div className="p-2 border-b border-slate-100 flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('Idioma', 'Language', 'Langue', 'اللغة')}</span>
            <div className="flex bg-slate-105 bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
              <button
                onClick={() => setLang('es')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition ${lang === 'es' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇪🇸 <span className="text-[10px]">ES</span>
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition ${lang === 'en' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇬🇧 <span className="text-[10px]">EN</span>
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition ${lang === 'fr' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇫🇷 <span className="text-[10px]">FR</span>
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition ${lang === 'ar' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                🇲🇦 <span className="text-[10px]">AR</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => { setActiveTab('inicio'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'inicio' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t('Inicio', 'Home', 'Accueil', 'الرئيسية')}
          </button>
          <button
            onClick={() => { setActiveTab('habitaciones'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'habitaciones' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t('Habitaciones', 'Rooms', 'Chambres', 'الغرف')}
          </button>
          <button
            onClick={() => { setActiveTab('servicios'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'servicios' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t('Servicios', 'Services', 'Services', 'الخدمات')}
          </button>
          <button
            onClick={() => { setActiveTab('situacion'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'situacion' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t('Situación', 'Location', 'Localisation', 'الموقع')}
          </button>
          <button
            onClick={() => { setActiveTab('opiniones'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'opiniones' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t('Opiniones', 'Reviews', 'Avis', 'الآراء')}
          </button>
          <button
            onClick={() => { setActiveTab('contacto'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'contacto' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t('Contacto', 'Contact Us', 'Contact', 'اتصل بنا')}
          </button>

          {customPages.filter(p => p.isActive && p.showInNav).map(page => (
            <button
              key={page.id}
              onClick={() => { setActiveTab(page.id as any); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === page.id ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {lang === 'es' ? page.titleEs : page.titleEn}
            </button>
          ))}

          <button
            onClick={() => { setActiveTab('panel-cliente'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'panel-cliente' ? 'bg-sky-50 text-sky-700 pl-4 font-bold border-l-4 border-sky-500' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            🔑 {t('Zona Cliente', 'Guest Area', 'Espace Client', 'منطقة العميل')}
          </button>

          {bookings.length > 0 && (
            <button
              onClick={() => { setActiveTab('reservas'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'reservas' ? 'bg-emerald-50 text-emerald-700 pl-3 font-bold border-l-4 border-emerald-500' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{t('Mis Reservas', 'My Bookings', 'Mes Réservations', 'حجوزاتي')}</span>
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            </button>
          )}

          <div className="pt-2.5 border-t border-slate-100">
            <button
              onClick={() => {
                setActiveTab('habitaciones');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-widest transition duration-300 active:scale-95 cursor-pointer shadow"
            >
              {t('RESERVAR DIRECTO', 'BOOK ONLINE DIRECT', 'RÉSERVER DIRECT', 'احجز مباشرة')}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">

        {/* 1. START / HOME SECTION */}
        {activeTab === 'inicio' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10 pb-6"
          >
            
            {/* B Travel Styled Rounded Card Hero Banner with Overlapping Tabbed Booking Search Desk */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-5 relative mb-12 md:mb-16">
              
              <div className="relative h-[410px] sm:h-[460px] md:h-[500px] lg:h-[530px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-950 shadow-2xl border border-slate-100/10">
                
                {/* Background Cover Overlay Slides */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence mode="popLayout">
                    {slidesToUse.map((slide, index) => index === currentHeroSlide && (
                      <motion.div
                         key={index}
                         initial={{ opacity: 0, scale: 1.04 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 1.2, ease: "easeOut" }}
                         className="absolute inset-0"
                      >
                        <img
                          src={slide.image}
                          alt={t(slide.titleEs, slide.titleEn, slide.titleFr || slide.titleEn, slide.titleAr || slide.titleEn)}
                          className="w-full h-full object-cover brightness-[0.52] md:brightness-[0.62]"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Left-to-right gradient overlay for optimal left-aligned text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent backdrop-blur-[0.3px]"></div>
                </div>
   
                {/* Manual Slideshow Overrides (Chevron Left/Right) */}
                <button
                  type="button"
                  onClick={() => setCurrentHeroSlide(prev => prev === 0 ? slidesToUse.length - 1 : prev - 1)}
                  className="absolute left-4 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur border border-white/10 transition-all cursor-pointer z-20 group hover:scale-105 active:scale-95 hidden md:block"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-4.5 w-4.5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentHeroSlide(prev => (prev + 1) % slidesToUse.length)}
                  className="absolute right-4 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur border border-white/10 transition-all cursor-pointer z-20 group hover:scale-105 active:scale-95 hidden md:block"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
  
                {/* Central left-aligned Content with staggering entries - Spacious & highly stylized */}
                {(() => {
                  const s = slidesToUse[currentHeroSlide] || slidesToUse[0] || HERO_SLIDES[0];
                  return (
                    <div className="relative z-10 max-w-xl h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 text-left text-white space-y-4 pb-20 pt-8">
                      
                      {/* Tag / Badge */}
                      <div className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-sky-400/20 shadow-sm w-fit">
                        <Star className="h-3 w-3 fill-current text-sky-400 animate-pulse" />
                        <span className="font-mono">
                          {t(
                            s.taglineEs,
                            s.taglineEn,
                            s.taglineFr,
                            s.taglineAr
                          )}
                        </span>
                      </div>
       
                      {/* Elegant Mixed Case left-aligned Headline */}
                      <h1 className="text-2xl sm:text-3xl md:text-4.5xl font-light tracking-tight leading-[1.1] text-white drop-shadow">
                        {lang === 'es' ? 'Con ' : 'With '}
                        <span className="text-[#0fl] text-sky-300 font-extrabold font-display">Sun Serramar</span>
                        {lang === 'es' ? ', siempre vuelves con más' : ', you always return with more'}
                        <span className="block mt-1 font-bold text-lg sm:text-2xl md:text-3xl text-slate-100 font-serif italic capitalize normal-case tracking-normal">
                          {t(
                            s.titleEs,
                            s.titleEn,
                            s.titleFr,
                            s.titleAr
                          )}
                        </span>
                      </h1>
       
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-200/95 max-w-sm leading-relaxed font-light">
                        {t(
                          s.descEs,
                          s.descEn,
                          s.descFr,
                          s.descAr
                        )}
                      </p>
       
                      {/* B Travel Styled Blue play button pill */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('habitaciones');
                          }}
                          className="w-auto bg-sky-500 hover:bg-sky-600 text-white font-extrabold uppercase py-2.5 px-6 rounded-full text-[11px] tracking-wider transition-all duration-300 cursor-pointer shadow-md hover:shadow-sky-500/20 flex items-center justify-center gap-2 active:scale-95"
                          id="hero-btn-book"
                        >
                          <span>{t('VER HABITACIONES Y TARIFAS', 'EXPLORE ROOMS & RATES', 'CHAMBRES ET TARIFS', 'عرض الغرف والأسعار')}</span>
                          <span className="text-sm">▶</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
   
                {/* Vertical Slider Dots Indicator on Right Edge */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                  {slidesToUse.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`rounded-full transition-all duration-500 cursor-pointer ${
                        idx === currentHeroSlide ? 'h-6 w-1.5 bg-sky-400' : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
  
              </div>
  
              {/* Desktop overlapping integrated search bar - B Travel Exact Paradigm */}
              <div className="absolute -bottom-12 left-6 right-6 lg:left-12 lg:right-12 z-30 bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-100 p-1 md:block hidden transition-all duration-300">
                
                {/* Booking Inputs exactly like btravel.com */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!quickRoomType) {
                      showToast(lang === 'es' ? 'Por favor, selecciona un tipo de habitación primero.' : 'Please select a room type first.', 'error');
                      return;
                    }
                    const selected = roomsList.find(r => r.id === quickRoomType);
                    if (selected) {
                      setActiveTab('habitaciones');
                      triggerQuickBooking(selected, quickCheckIn, quickCheckOut, quickGuests);
                      setTimeout(() => {
                        document.getElementById('modulo-reservas')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }} 
                  className="p-4 grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-3 border-r border-slate-100/80 pr-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Bed className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span>{t('Tipo de Habitación', 'Room Type', 'Type de Chambre', 'نوع الغرفة')}</span>
                    </label>
                    <select
                      value={quickRoomType}
                      onChange={(e) => setQuickRoomType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                      required
                    >
                      <option value="">{t('Selecciona', 'Select', 'Sélectionner', 'اختر')}</option>
                      {roomsList.map(room => (
                        <option key={room.id} value={room.id}>
                          {getRoomName(room)}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div className="col-span-3 border-r border-slate-100/80 px-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span>{t('Fecha Entrada', 'Check-In Date', 'Date d\'Arrivée', 'تاريخ الوصول')}</span>
                    </label>
                    <input
                      type="date"
                      value={quickCheckIn}
                      onChange={(e) => setQuickCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                      required
                    />
                  </div>
  
                  <div className="col-span-3 border-r border-slate-100/80 px-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span>{t('Fecha Salida', 'Check-Out Date', 'Date de Départ', 'تاريخ المغادرة')}</span>
                    </label>
                    <input
                      type="date"
                      value={quickCheckOut}
                      onChange={(e) => setQuickCheckOut(e.target.value)}
                      min={quickCheckIn || new Date().toISOString().split('T')[0]}
                      className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                      required
                    />
                  </div>
  
                  <div className="col-span-2 px-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span>{t('Huéspedes', 'Guests', 'Voyageurs', 'النزلاء')}</span>
                    </label>
                    <select
                      value={quickGuests}
                      onChange={(e) => setQuickGuests(Number(e.target.value))}
                      className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                    >
                      <option value={1}>1 {t('Adulto', 'Adult', 'Adulte', 'بالغ واحد')}</option>
                      <option value={2}>2 {t('Adultos', 'Adults', 'Adultes', 'بالغان')}</option>
                      <option value={3}>3 {t('Adultos', 'Adults', 'Adultes', '3 بالغين')}</option>
                      <option value={4}>4 {t('Adultos', 'Adults', 'Adultes', '4 بالغين')}</option>
                    </select>
                  </div>
  
                  {/* B Travel's Iconic Orange round action button */}
                  <div className="col-span-1 flex justify-center items-center">
                    <button
                      type="submit"
                      className="h-12 w-12 rounded-full bg-[#ff9f00] hover:bg-[#e68f00] text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg active:scale-90 cursor-pointer hover:rotate-12"
                      title={t('BUSCAR MEJOR PRECIO', 'SEARCH BEST RATES', 'CHERCHER LES TARIFS', 'البحث عن عروض')}
                    >
                      <Search className="h-5 w-5 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              </div>
   
            </div>
  
            {/* Mobile instant search card (Visible only on mobile/phone for smarter experience with matching btravel colors) */}
            <div className="block md:hidden mx-4 -mt-10 relative z-20 bg-white border border-slate-150 rounded-2xl p-4 shadow-xl">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!quickRoomType) {
                    showToast(lang === 'es' ? 'Por favor, selecciona un tipo de habitación primero.' : 'Please select a room type first.', 'error');
                    return;
                  }
                  const selected = roomsList.find(r => r.id === quickRoomType);
                  if (selected) {
                    setActiveTab('habitaciones');
                    triggerQuickBooking(selected, quickCheckIn, quickCheckOut, quickGuests);
                    setTimeout(() => {
                      document.getElementById('modulo-reservas')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }} 
                className="space-y-4 text-slate-800"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="text-[#ff9f00]">🛎️</span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                    {t('Encuentra tu Mejor Tarifa', 'Find Your Best Rate', 'Trouvez Votre Tarif', 'البحث عن أفضل سعر')}
                  </h4>
                </div>

                <div>
                  <label className="block text-[9.5px] font-extrabold text-slate-500 tracking-wider uppercase font-mono mb-1.5 flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5 text-sky-500" />
                    {t('Tipo de Habitación', 'Room Type', 'Type de Chambre', 'نوع الغرفة')}
                  </label>
                  <select
                    value={quickRoomType}
                    onChange={(e) => setQuickRoomType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 text-left"
                    required
                  >
                    <option value="">{t('Selecciona Habitación', 'Select Room', 'Sélectionner Chambre', 'اختر الغرفة')}</option>
                    {roomsList.map(room => (
                      <option key={room.id} value={room.id}>
                        {getRoomName(room)}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="grid grid-cols-2 gap-3 text-[9.5px] font-extrabold text-slate-500 tracking-wider uppercase font-mono">
                  <div>
                    <label className="block mb-1.5 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-sky-500" />
                      {t('Entrada', 'Check-In', 'Arrivée', 'الوصول')}
                    </label>
                    <input
                      type="date"
                      value={quickCheckIn}
                      onChange={(e) => setQuickCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-sky-500" />
                      {t('Salida', 'Check-Out', 'Départ', 'المغادرة')}
                    </label>
                    <input
                      type="date"
                      value={quickCheckOut}
                      onChange={(e) => setQuickCheckOut(e.target.value)}
                      min={quickCheckIn || new Date().toISOString().split('T')[0]}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>
  
                <div>
                  <label className="block text-[9.5px] font-extrabold text-slate-500 tracking-wider uppercase font-mono mb-1.5 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-sky-500 animate-pulse" />
                    {t('Huéspedes', 'Guests', 'Voyageurs', 'النزلاء')}
                  </label>
                  <select
                    value={quickGuests}
                    onChange={(e) => setQuickGuests(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 text-left"
                  >
                    <option value={1}>1 {t('Adulto', 'Adult', 'Adulte', 'بالغ واحد')}</option>
                    <option value={2}>2 {t('Adultos', 'Adults', 'Adultes', 'بالغان')}</option>
                    <option value={3}>3 {t('Adultos', 'Adults', 'Adultes', '3 بالغين')}</option>
                    <option value={4}>4 {t('Adultos', 'Adults', 'Adultes', '4 بالغين')}</option>
                  </select>
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-[#ff9f00] hover:bg-[#e68f00] text-white font-black uppercase py-3 rounded-xl transition shadow active:scale-95 cursor-pointer text-xs tracking-widest flex items-center justify-center gap-2 font-mono h-[42px]"
                >
                  <Search className="h-4 w-4 stroke-[2.5]" />
                  <span>{t('BUSCAR DISPONIBILIDAD', 'SEARCH BEST RATES', 'CHERCHER LES TARIFS', 'البحث عن عروض')}</span>
                </button>
              </form>
            </div>
 
            {/* Premium Personalized Welcome Letter & Deluxe Apartment Upgrade */}
            <PremiumWelcomeUpgrade lang={lang} onBookUpgrade={handlePremiumUpgradeBooked} customImages={upgradeImages} />

            {/* General Description Intro Card */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Intro text */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-sky-200"></div>
                    <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                      {lang === 'es' ? 'Quiénes Somos' : 'About Us'}
                    </span>
                    <div className="h-[1px] w-12 bg-sky-200"></div>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 leading-tight font-serif">
                    {lang === 'es'
                      ? 'Mucho más que un Hostal. Tu hogar lejos de casa.'
                      : 'Much more than a Hostel. Your home away from home.'}
                  </h2>
                  <p className="text-slate-500 font-light leading-relaxed text-sm sm:text-base">
                    {lang === 'es'
                      ? 'En Hostal Serramar llevamos años acogiendo con una sonrisa a viajeros de todo el mundo. Nos distinguimos por una pulcritud obsesiva, instalaciones modernas y cuidadas, y la calidez de un trato familiar inigualable en Arroyo de la Miel.'
                      : 'At Hostal Serramar we have spent years welcoming guests from all over the world with a ready smile. We highlight stellar cleanliness, modern facilities, and a warm family touch that is hard to find on the Costa del Sol.'}
                  </p>
                  <p className="text-slate-500 font-light leading-relaxed text-sm">
                    {lang === 'es'
                      ? 'Nuestra joya es la ubicación: dejas el coche a un lado y disfrutas. El tren de cercanías te deja a 3 minutos del establecimiento de forma directa desde el Aeropuerto de Málaga. Podrás moverte cómodamente por toda la costa.'
                      : 'Our absolute highlight is our location: forget about your car. The local passenger train station is just 3 minutes away from our doors, linking directly to Malaga Airport. You can explore the entire coast easily.'}
                  </p>
                  
                  {/* Local points checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-slate-750 font-medium font-sans">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-full shrink-0"><Check className="h-4 w-4" /></div>
                      <span className="text-xs sm:text-sm">{lang === 'es' ? 'Limpieza impecable y diaria' : 'Impeccable & daily cleaning'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-full shrink-0"><Check className="h-4 w-4" /></div>
                      <span className="text-xs sm:text-sm">{lang === 'es' ? 'Baño privado o económico compartido' : 'Private or budget shared bathrooms'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-full shrink-0"><Check className="h-4 w-4" /></div>
                      <span className="text-xs sm:text-sm">{lang === 'es' ? 'Wi-Fi rápido y gratis' : 'Free High-speed Wi-Fi'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-full shrink-0"><Check className="h-4 w-4" /></div>
                      <span className="text-xs sm:text-sm">{lang === 'es' ? 'Aire acondicionado / calefacción' : 'Air Conditioning / Warm heating'}</span>
                    </div>
                  </div>
                </div>
 
                {/* Beautiful picture presentation with floating tags */}
                <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                  <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-102 transition duration-500">
                    <img 
                      src={welcomeImage || "https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o="} 
                      alt="Cozy sun-drenched private double bedroom setup"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 hidden sm:block animate-pulse-soft">
                    <p className="text-2xl font-black text-amber-400 font-mono">9.4</p>
                    <p className="text-[9px] text-slate-350 uppercase tracking-widest font-mono font-bold">{lang === 'es' ? 'Nota en Limpieza' : 'Cleanliness Score'}</p>
                  </div>
                </div>
 
              </div>
            </section>
 

 
            {/* Featured Rooms Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
              <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto text-center">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-sky-200"></div>
                  <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                    {lang === 'es' ? 'Alojamientos Destacados' : 'Featured Accommodations'}
                  </span>
                  <div className="h-[1px] w-12 bg-sky-200"></div>
                </div>
                <h3 className="text-4xl sm:text-5xl font-light text-slate-900 font-serif tracking-tight">
                  {lang === 'es' ? 'Nuestras Habitaciones Favoritas' : 'Our Highlighted Rooms'}
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light mx-auto">
                  {lang === 'es'
                    ? 'Habitaciones impecables equipadas pensando en tu confort, con opción de confort privado o presupuesto súper económico.'
                    : 'Pristine rooms optimized for comfort, with choices of private en-suite amenities or maximum value shared options.'}
                </p>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {roomsList.filter(r => r.featured).map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    lang={lang}
                    onBookDirect={(rm) => {
                      setActiveTab('habitaciones');
                      triggerQuickBooking(rm);
                    }}
                  />
                ))}
              </div>
            </section>
 
            {/* Testimonial elegant quote review block - Redesigned to be modern, compact, and space-saving with automatic carousel */}
            {(() => {
              const activeReviewIdx = reviewsList.length > 0 ? (currentReviewSlide % reviewsList.length) : 0;
              const activeReview = reviewsList[activeReviewIdx];
              const authorInitials = activeReview?.author 
                ? activeReview.author.split(' ').map((n: string) => n[0]).slice(0, 2).join('')
                : 'MC';
              return (
                <section className="py-10 px-4 sm:px-8 max-w-4xl mx-auto" id="compact-testimonial-carousel">
                  <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[220px] sm:min-h-[190px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Left side: rating stars, quote text and avatar badge */}
                    <div className="flex-1 space-y-3.5 text-center md:text-left min-w-0 w-full relative z-10 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex justify-center md:justify-start gap-1 text-amber-405 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-4 w-4 ${i < (activeReview?.rating || 5) ? 'fill-current text-amber-405 text-amber-400' : 'text-slate-600'}`} 
                              />
                            ))}
                          </div>

                          {/* Mini manual chevrons for the feedback slider */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                if (reviewsList.length > 0) {
                                  setCurrentReviewSlide(p => (p === 0 ? reviewsList.length - 1 : p - 1));
                                }
                              }}
                              className="p-1 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition cursor-pointer"
                              aria-label="Previous Review"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (reviewsList.length > 0) {
                                  setCurrentReviewSlide(p => (p >= reviewsList.length - 1 ? 0 : p + 1));
                                }
                              }}
                              className="p-1 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition cursor-pointer"
                              aria-label="Next Review"
                            >
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          <motion.blockquote 
                            key={activeReviewIdx}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed max-w-2xl min-h-[52px] flex items-center justify-center md:justify-start"
                          >
                            "{lang === 'es' 
                              ? (activeReview?.comment || '')
                              : (activeReview?.commentEn || activeReview?.comment || '')}"
                          </motion.blockquote>
                        </AnimatePresence>
                        
                        <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-305 text-sky-300 border border-sky-500/30 flex items-center justify-center font-extrabold text-xs select-none">
                            {authorInitials}
                          </div>
                          <div className="text-left">
                            <p className="font-extrabold text-sky-420 text-sky-400 text-xs sm:text-sm font-sans leading-none">{activeReview?.author}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">
                              {lang === 'es' 
                                ? `${activeReview?.roomType || 'Habitación'} • ${activeReview?.origin || 'España'}` 
                                : `${activeReview?.roomType || 'Room'} • From ${activeReview?.origin || 'Guest'}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dot Page indicators */}
                      <div className="flex gap-1.5 pt-4 justify-center md:justify-start">
                        {reviewsList.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentReviewSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === activeReviewIdx ? 'w-4.5 bg-sky-405 bg-sky-400' : 'w-1.5 bg-slate-700/80 hover:bg-slate-600'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right side: Call to action button */}
                    <div className="shrink-0 pt-3 md:pt-0 border-t border-slate-800/80 md:border-t-0 md:pl-4 w-full md:w-auto relative z-10">
                      <button
                        onClick={() => setActiveTab('opiniones')}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-white/5 hover:bg-slate-850 hover:bg-slate-800 border border-white/10 hover:border-sky-500/40 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 text-sky-100 hover:text-white"
                      >
                        <span>{lang === 'es' ? 'Ver todas las opiniones' : 'Read all reviews'}</span>
                        <ChevronRight className="h-4 w-4 text-sky-400" />
                      </button>
                    </div>
                  </div>
                </section>
              );
            })()}
 
            {/* FAQ Accordion Section */}
            <FaqSection lang={lang} />
 
          </motion.div>
        )}

        {/* 2. ROOMS SECTION */}
        {activeTab === 'habitaciones' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-16 animate-in fade-in duration-500">
            
            <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-10">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-sky-200"></div>
                  <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                    {lang === 'es' ? 'Descansa con Nosotros' : 'Enjoy Comfort'}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight font-serif">
                  {lang === 'es' ? 'Nuestras Habitaciones' : 'Our Rooms & Bedding'}
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light max-w-xl">
                  {lang === 'es' 
                    ? 'Disponemos de opciones adaptadas a cada bolsillo y necesidad, siempre bajo los máximos criterios de higiene.' 
                    : 'We offer solutions suited for every budget and group size, always backed by our legendary sanitization processes.'}
                </p>
              </div>

              {/* Filtering Actions bar */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{lang === 'es' ? 'Filtrar por' : 'Filter by'}:</span>
                
                {/* Bathroom filter toggle dropdown */}
                <select
                  value={bathroomFilter}
                  onChange={(e) => setBathroomFilter(e.target.value as any)}
                  className="bg-white border border-slate-200 text-slate-700 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="all">{lang === 'es' ? 'Todos los Baños' : 'All Bathrooms'}</option>
                  <option value="private">{lang === 'es' ? 'Baño Privado' : 'Private En-Suite'}</option>
                  <option value="shared">{lang === 'es' ? 'Baño Compartido' : 'Shared Bathroom'}</option>
                </select>

                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(Number(e.target.value))}
                  className="bg-white border border-slate-200 text-slate-700 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value={0}>{lang === 'es' ? 'Cualquier Capacidad' : 'Any Capacity'}</option>
                  <option value={1}>1 {lang === 'es' ? 'Persona' : 'Guest'}</option>
                  <option value={2}>2 {lang === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={3}>3 {lang === 'es' ? 'Personas' : 'Guests'}</option>
                  <option value={4}>4 {lang === 'es' ? 'Personas' : 'Guests'}</option>
                </select>
              </div>
            </div>

            {/* Live Instant Rate Matcher & Dynamic Pricing Switcher */}
            <div className="bg-gradient-to-r from-slate-900 to-sky-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 md:space-y-0 md:flex md:items-center md:justify-between transition-all duration-300">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-305 border border-sky-500/30 px-2 py-0.5 rounded-md font-mono font-bold tracking-widest uppercase text-sky-300">
                    {lang === 'es' ? 'CONEXIÓN BOOKING.COM EN VIVO' : 'LIVE BOOKING.COM CONNECTIVITY'}
                  </span>
                </div>
                <h3 className="text-xl font-light text-white font-serif tracking-tight mt-1">
                  {lang === 'es' ? 'Comparador y Actualizador de Tarifas al Instante' : 'Instant Pricing Engine & Rate Switcher'}
                </h3>
                <p className="text-xs text-slate-350 leading-relaxed max-w-xl">
                  {lang === 'es'
                    ? '¿Sabías que reservar directamente con nosotros te ahorra un 15% inmediato frente a Booking.com? Cambia de tarifa abajo y comprueba la diferencia de precio en tiempo real.'
                    : 'Did you know reserving direct saves you 15% over Booking.com instantly? Toggle dynamic mode below and see prices update live.'}
                </p>
              </div>

              {/* Toggle controls with premium style */}
              <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center shrink-0 shadow-inner">
                <button
                  onClick={() => setPriceMode('direct')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                    priceMode === 'direct'
                      ? 'bg-sky-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🔥</span>
                  <span>{lang === 'es' ? 'Web Directa (-15%)' : 'Direct Web Rate (-15%)'}</span>
                </button>
                <button
                  onClick={() => setPriceMode('booking')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                    priceMode === 'booking'
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🏨</span>
                  <span>{lang === 'es' ? 'Booking.com (Normal)' : 'Booking.com (No Disc.)'}</span>
                </button>
              </div>
            </div>

            {/* Quick date picker alerts if active search */}
            {quickSearchRun && (
              <div className="bg-amber-50/70 text-slate-900 border border-amber-500/20 p-4 rounded-xl flex items-center justify-between gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <BadgeAlert className="h-5 w-5 text-amber-605 shrink-0" />
                  <span>
                    {lang === 'es'
                      ? `Mostrando precios para la estancia del ${quickCheckIn} al ${quickCheckOut} (${quickGuests} personas).`
                      : `Displaying rates for dates ${quickCheckIn} to ${quickCheckOut} (${quickGuests} guests).`}
                  </span>
                </div>
                <button 
                  onClick={() => { setQuickSearchRun(false); setQuickCheckIn(''); setQuickCheckOut(''); }}
                  className="text-xs hover:underline font-bold text-amber-700"
                >
                  {lang === 'es' ? 'Limpiar Búsqueda' : 'Clear Dates'}
                </button>
              </div>
            )}

            {/* Cloudbeds Live PMS Synchronizer Status Banner */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      cloudbedsSyncStatus === 'syncing' ? 'bg-amber-400' : cloudbedsSyncStatus === 'success' ? 'bg-emerald-400' : 'bg-red-400'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${
                      cloudbedsSyncStatus === 'syncing' ? 'bg-amber-500' : cloudbedsSyncStatus === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}></span>
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-slate-100 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <span>{lang === 'es' ? 'CONECTADO A CLOUDBEDS PMS' : 'CONNECTED TO CLOUDBEDS PMS'}</span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-sans tracking-normal">ID: eh45iO</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {cloudbedsSyncStatus === 'syncing' 
                      ? (lang === 'es' ? 'Consultando disponibilidad y precios de hoy...' : 'Fetching live availability and guest rates...')
                      : cloudbedsSyncStatus === 'success'
                      ? (lang === 'es' ? `Precios actualizados al instante para tus fechas (Último sync: ${lastSyncTime})` : `Instant dynamic rates verified for your dates (Last sync: ${lastSyncTime})`)
                      : (lang === 'es' ? 'Error al conectar con el servidor Cloudbeds. Usando tarifas locales garantizadas.' : 'Could not connect to Cloudbeds server. Displaying guaranteed direct rates.')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => syncCloudbedsRates(checkIn || quickCheckIn, checkOut || quickCheckOut, checkIn ? guestsCount : quickGuests, checkIn ? promoCode : quickPromoCode)}
                  disabled={cloudbedsSyncStatus === 'syncing'}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 hover:border-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono transition active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${cloudbedsSyncStatus === 'syncing' ? 'animate-spin text-amber-400' : ''}`} />
                  {lang === 'es' ? 'Sincronizar Ahora' : 'Sync Now'}
                </button>
              </div>
            </div>

            {/* Main grid of rooms list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-stretch" id="habitaciones-grid">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  lang={lang}
                  priceMode={priceMode}
                  onBookDirect={(rm) => {
                    triggerQuickBooking(rm);
                    setTimeout(() => {
                      document.getElementById('modulo-reservas')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                />
              ))}
            </div>

            {/* In case no room matches filters */}
            {filteredRooms.length === 0 && (
              <div className="text-center bg-white border border-slate-150 p-12 rounded-2xl max-w-md mx-auto space-y-4">
                <p className="text-slate-400 text-lg font-bold">{lang === 'es' ? 'Sin resultados' : 'No results matching'}</p>
                <p className="text-xs text-slate-500">
                  {lang === 'es' 
                    ? 'No se encontraron habitaciones con los criterios seleccionados. Prueba a cambiar los filtros.' 
                    : 'No rooms match your chosen parameters. Try modifying the filters.'}
                </p>
                <button 
                  onClick={() => { setBathroomFilter('all'); setCapacityFilter(0); }}
                  className="bg-slate-900 text-white font-semibold py-2 px-6 rounded-lg text-xs"
                >
                  {lang === 'es' ? 'Restablecer Filtros' : 'Reset Filters'}
                </button>
              </div>
            )}

            {/* Interactive Photo Gallery aligned with Booking.com categories */}
            <OfficialPhotoGallery lang={lang} />

            {/* Direct Booking Drawer Reservation Form */}
            {selectedRoomForBooking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden" 
                id="modulo-reservas"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <button 
                  onClick={() => setSelectedRoomForBooking(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white p-2.5 hover:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left explanation form panel */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-sky-500"></div>
                      <span className="text-[10px] font-medium text-sky-400 uppercase tracking-[0.2em] font-sans">
                        {lang === 'es' ? 'Reserva Directa Online' : 'Direct Secure Booking'}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-light tracking-tight font-serif text-slate-100">
                      {lang === 'es' ? 'Estás reservando' : 'You are booking'}: <span className="text-sky-400 font-medium">{getRoomName(selectedRoomForBooking)}</span>
                    </h3>

                    {bookingSuccessMessage ? (
                      <div className="space-y-6 animate-in zoom-in-95 duration-300">
                        
                        {/* Tab Switcher */}
                        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl max-w-sm">
                          <button
                            type="button"
                            onClick={() => setSuccessViewMode('voucher')}
                            className={`flex-1 py-2.5 rounded-xl font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                              successViewMode === 'voucher'
                                ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850/50'
                            }`}
                          >
                            🎟️ {lang === 'es' ? 'Bono Móvil' : 'Mobile Pass'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSuccessViewMode('email')}
                            className={`flex-1 py-2.5 rounded-xl font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                              successViewMode === 'email'
                                ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850/50'
                            }`}
                          >
                            📧 {lang === 'es' ? 'Simular Email' : 'Email Receipt'}
                          </button>
                        </div>

                        {successViewMode === 'voucher' ? (
                          /* Designer Passbook/Boarding pass Ticket */
                          <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative">
                            
                            {/* Inner dotted separation line with left & right circular ticket notches */}
                            <div className="absolute left-0 right-0 top-[28%] h-0 border-t-2 border-dashed border-slate-200 z-10">
                              <span className="absolute -left-3.5 -top-3.5 w-7 h-7 bg-slate-900 rounded-full border border-slate-800" />
                              <span className="absolute -right-3.5 -top-3.5 w-7 h-7 bg-slate-900 rounded-full border border-slate-800" />
                            </div>

                            {/* Top Part of the Ticket: Receipt header */}
                            <div className="bg-slate-950 text-white p-6 sm:p-8 space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] bg-sky-500/25 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                                  {lang === 'es' ? 'Bono de Estancia' : 'Stay Voucher Pass'}
                                </span>
                                <span className="text-amber-400 font-bold text-xs uppercase tracking-widest font-mono">
                                  ★ HOSTAL SERRAMAR
                                </span>
                              </div>
                              
                              <div className="flex justify-between items-end gap-3 pt-2">
                                <div>
                                  <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase font-mono">{lang === 'es' ? 'CÓDIGO CONFIRMACIÓN' : 'CONFIRMATION ID'}</p>
                                  <p className="text-xl font-black text-slate-100 uppercase tracking-widest font-mono">
                                    {bookings[bookings.length - 1]?.id || 'SRRMR-9426'}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase font-mono">{lang === 'es' ? 'ALBARRÁN DE PAGO' : 'PAYMENT TYPE'}</p>
                                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{lang === 'es' ? 'PAGO EN RECEPCIÓN' : 'PAY ON ARRIVAL'}</p>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Part of the Ticket: Guest info, check-in, checkout, barcode */}
                            <div className="p-6 sm:p-8 pt-8 space-y-5 bg-gradient-to-b from-slate-50 to-white">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'HUÉSPED' : 'GUEST'}</span>
                                  <span className="font-extrabold text-slate-900 text-sm truncate block">{guestName || 'Valued Guest'}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'HABITACIÓN' : 'BED/ROOM'}</span>
                                  <span className="font-extrabold text-slate-900 text-sm truncate block">{getRoomName(selectedRoomForBooking)}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 border-t border-slate-150 pt-4">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'LLEGADA (CHECK-IN)' : 'CHECK-IN DATE'}</span>
                                  <span className="font-black text-slate-800 text-xs flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                                    {checkIn || '2026-06-15'}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-medium block">14:00 - 22:00</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'SALIDA (CHECK-OUT)' : 'CHECK-OUT DATE'}</span>
                                  <span className="font-black text-slate-800 text-xs flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                                    {checkOut || '2026-06-20'}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-medium block">08:00 - 11:30</span>
                                </div>
                              </div>

                              <div className="border-t border-slate-150 pt-4 flex justify-between items-center">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'PRECIO TOTAL NETO' : 'TOTAL PRICE'}</span>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-black text-slate-900">€{bookings[bookings.length - 1]?.totalPrice || '180'}</span>
                                    <span className="text-[9px] text-emerald-600 font-bold">({lang === 'es' ? 'IVA Inc.' : 'VAT Inc.'})</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'TICKET DESAYUNO' : 'BREAKFAST TICKET'}</span>
                                  <span className="text-xs font-bold text-slate-800 uppercase">
                                    {breakfastOption ? (lang === 'es' ? '☕ SOLICITADO' : '☕ REQUESTED') : (lang === 'es' ? '❌ NO' : '❌ NO')}
                                  </span>
                                </div>
                              </div>

                              {/* Retro style Ticket barcode with confirmation code printed */}
                              <div className="border-t border-slate-150 pt-5 text-center space-y-1">
                                <div className="text-slate-900 font-mono text-2xl tracking-[0.25em] leading-none select-none opacity-85">
                                  |||| || | |||| || ||| | ||| |||| | |||| ||| | |||
                                </div>
                                <p className="text-[9px] text-slate-405 font-bold uppercase font-mono tracking-widest">
                                  {lang === 'es' ? '* PRESENTAR EN TU MÓVIL AL LLEGAR *' : '* DISPLAY ON YOUR MOBILE AT RECEPTION *'}
                                </p>
                              </div>

                            </div>
                          </div>
                        ) : (
                          <div className="animate-in fade-in duration-300">
                            <BookingEmailTemplate 
                              lang={lang} 
                              booking={bookings[bookings.length - 1] || {
                                id: 'SRRMR-9426',
                                guestName: guestName || 'Valued Guest',
                                guestEmail: guestEmail || 'mail@example.com',
                                guestPhone: guestPhone || '+34 600 000 000',
                                roomName: getRoomName(selectedRoomForBooking),
                                checkIn: checkIn,
                                checkOut: checkOut,
                                totalPrice: bookings[bookings.length - 1]?.totalPrice || 180,
                                breakfastOption: breakfastOption,
                                guestsCount: guestsCount,
                                roomId: selectedRoomForBooking?.id || '1'
                              }}
                            />
                          </div>
                        )}

                        {/* Booking success notification text and action controls */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs leading-relaxed">
                          <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                          <span>
                            {lang === 'es'
                              ? '¡Felicidades! Su reserva se ha sincronizado correctamente en el almacenamiento del navegador. No se ha realizado ningún cobro por adelantado.'
                              : 'Wonderful news! Your booking has synchronized safely into your local memory. Simply pay during stay registration.'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <button 
                            onClick={() => {
                              setActiveTab('reservas');
                              setSelectedRoomForBooking(null);
                              setBookingSuccessMessage(null);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 px-6 rounded-xl text-xs tracking-wider uppercase font-mono cursor-pointer active:scale-95 transition shadow-lg"
                          >
                            {lang === 'es' ? 'Ver mis reservas' : 'Manage synced bookings'}
                          </button>
                          <button 
                            onClick={() => { setSelectedRoomForBooking(null); setBookingSuccessMessage(null); }}
                            className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl text-xs tracking-widest uppercase font-mono border border-white/20 hover:border-white/40 cursor-pointer active:scale-95 transition"
                          >
                            {lang === 'es' ? 'CERRAR VENTANA' : 'CLOSE DRAWER'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4 text-slate-200 text-xs sm:text-xs">
                        
                        {/* Progress Stepper representation */}
                        <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4 text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                          <div className="text-sky-400 border-l-2 border-sky-500 pl-2">
                            01. {lang === 'es' ? 'FECHAS' : 'STAY'}
                          </div>
                          <div className="border-l-2 border-slate-700 pl-2 text-slate-300">
                            02. {lang === 'es' ? 'DATOS' : 'PROFILE'}
                          </div>
                          <div className="border-l-2 border-slate-700 pl-2 text-slate-300">
                            03. {lang === 'es' ? 'OPCIONES' : 'BENEFITS'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 font-mono">
                              <Calendar className="h-3.5 w-3.5 text-sky-450" />
                              {lang === 'es' ? 'Fecha de Entrada *' : 'Check-In Date *'}
                            </label>
                            <input
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium transition-colors cursor-pointer"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 font-mono">
                              <Calendar className="h-3.5 w-3.5 text-sky-450" />
                              {lang === 'es' ? 'Fecha de Salida *' : 'Check-Out Date *'}
                            </label>
                            <input
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              min={checkIn || new Date().toISOString().split('T')[0]}
                              className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium transition-colors cursor-pointer"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                              {lang === 'es' ? 'Nombre del Huésped Principal *' : 'Lead Guest Name *'}
                            </label>
                            <input
                              type="text"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="e.g. Juan Pérez"
                              className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-705 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white font-medium"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                              {lang === 'es' ? 'Número de Huéspedes *' : 'Number of Guests *'}
                            </label>
                            <select
                              value={guestsCount}
                              onChange={(e) => setGuestsCount(Number(e.target.value))}
                              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium cursor-pointer"
                            >
                              {Array.from({ length: selectedRoomForBooking.maxGuests }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? (lang === 'es' ? 'Persona' : 'Guest') : (lang === 'es' ? 'Personas' : 'Guests')}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                              {lang === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
                            </label>
                            <input
                              type="email"
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="e.g. example@hostal.com"
                              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white font-medium shadow-inner"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                              {lang === 'es' ? 'Teléfono Móvil (WhatsApp) *' : 'Phone Number (WhatsApp) *'}
                            </label>
                            <input
                              type="tel"
                              value={guestPhone}
                              onChange={(e) => setGuestPhone(e.target.value)}
                              placeholder="e.g. +34 600 000 000"
                              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white font-medium shadow-inner"
                              required
                            />
                          </div>
                        </div>

                        {/* Promo Code & Smart GDPR Redaction Toggle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                              {lang === 'es' ? 'Código Promocional' : 'Promo Code / Coupon'}
                            </label>
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="e.g. Welcome18, POLMARNOR"
                              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white font-medium placeholder-slate-500 uppercase tracking-wider text-xs"
                            />
                            <div className="flex gap-2 mt-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => setPromoCode(promoCode.trim().toUpperCase() === 'WELCOME18' ? '' : 'WELCOME18')}
                                className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition duration-200 cursor-pointer ${
                                  promoCode.trim().toUpperCase() === 'WELCOME18'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                                }`}
                              >
                                {lang === 'es' ? 'Aplicar -18% (WELCOME18)' : 'Apply -18% (WELCOME18)'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setPromoCode(promoCode.trim().toUpperCase() === 'POLMARNOR' ? '' : 'POLMARNOR')}
                                className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition duration-200 cursor-pointer ${
                                  promoCode.trim().toUpperCase() === 'POLMARNOR'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                                }`}
                              >
                                {lang === 'es' ? 'Aplicar -10% (POLMARNOR)' : 'Apply -10% (POLMARNOR)'}
                              </button>
                            </div>
                            {promoCode && (
                              <p className={`text-[9.5px] mt-1 font-extrabold font-mono tracking-wider ${
                                ['WELCOME18', 'POLMARNOR'].includes(promoCode.trim().toUpperCase())
                                  ? 'text-emerald-400'
                                  : 'text-red-400'
                              }`}>
                                {promoCode.trim().toUpperCase() === 'WELCOME18'
                                  ? (lang === 'es' ? '✓ CÓDIGO APLICADO: 18% DESCUENTO' : '✓ CODE APPLIED: 18% DISCOUNT')
                                  : promoCode.trim().toUpperCase() === 'POLMARNOR'
                                  ? (lang === 'es' ? '✓ CÓDIGO APLICADO: 10% DESCUENTO' : '✓ CODE APPLIED: 10% DISCOUNT')
                                  : (lang === 'es' ? '✗ CÓDIGO INVÁLIDO' : '✗ INVALID COUPON')}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col justify-end">
                            <label className="flex items-center gap-2.5 cursor-pointer font-bold text-xs text-slate-200 mt-2 sm:mt-0 mb-3.5">
                              <input
                                type="checkbox"
                                checked={useSmartRedaction}
                                onChange={(e) => setUseSmartRedaction(e.target.checked)}
                                className="h-4 w-4 bg-slate-900 border-slate-700 accent-sky-500 text-sky-500 rounded cursor-pointer shrink-0"
                              />
                              <div className="leading-snug">
                                <span className="block text-xs font-bold text-slate-200">
                                  {lang === 'es' ? 'Redacción de Datos RGPD' : 'GDPR Smart Redaction'}
                                </span>
                                <span className="block text-[9.5px] font-normal text-slate-400 leading-tight">
                                  {lang === 'es' ? 'Enmascara datos de contacto en base de datos' : 'Masks contact identifiers in database'}
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                          <label className="flex items-center gap-2.5 cursor-pointer font-bold text-xs text-slate-200">
                            <input
                              type="checkbox"
                              checked={breakfastOption}
                              onChange={(e) => setBreakfastOption(e.target.checked)}
                              className="h-4 w-4 bg-slate-900 border-slate-700 accent-amber-500 text-amber-500 rounded cursor-pointer"
                            />
                            <span>{lang === 'es' ? 'Ticket Descuento para Desayuno en Cafetería Cercana (Gratis)' : 'Breakfast Discount Ticket for Nearby Cafe (Free)'}</span>
                          </label>
                          <p className="text-[10.5px] text-slate-400 pl-6 leading-relaxed">
                            {lang === 'es'
                              ? 'Al marcar esta opción, recibirás un ticket virtual para obtener precios especiales en una cafetería colaboradora cercana al hostal.'
                              : 'Check this to receive a virtual discount ticket for special prices at a partnering cafe near the hostal.'}
                          </p>
                        </div>

                        {/* Payment Selection Box */}
                        <div className="space-y-2 pt-2 text-left">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                            {lang === 'es' ? 'Método de Pago Seguro *' : 'Secured Checkout Option *'}
                          </label>
                          <div className="grid grid-cols-1 gap-3 text-left">
                            
                            {/* Option C: Cloudbeds */}
                            <label className={`block p-4 rounded-2xl border text-left cursor-pointer transition relative bg-slate-800 border-amber-500 text-white shadow-md ring-2 ring-amber-500/20`}>
                              <span className="absolute top-1.5 right-2 px-1.5 py-0.5 rounded text-[7px] font-mono tracking-widest font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase animate-pulse">
                                CLOUDBEDS
                              </span>
                              <div className="flex items-start gap-2.5">
                                <input 
                                  type="radio" 
                                  name="payment_choice"
                                  checked={true}
                                  readOnly
                                  className="mt-1 h-3.5 w-3.5 accent-amber-500 rounded-full cursor-pointer shrink-0"
                                />
                                <div className="leading-normal">
                                  <strong className="text-xs font-black block text-slate-100">{lang === 'es' ? 'Reserva en Cloudbeds' : 'Direct Cloudbeds'}</strong>
                                  <span className="text-[10px] leading-snug block text-slate-450 mt-0.5">
                                    {lang === 'es' ? 'Completa tu pago con tarifas reducidas en Cloudbeds.' : 'Pre-fill and pay securely on Cloudbeds booking engine.'}
                                  </span>
                                </div>
                              </div>
                            </label>

                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                            {lang === 'es' ? 'Peticiones Especiales (Opcional)' : 'Special Requests (Optional)'}
                          </label>
                          <textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder={lang === 'es' ? 'Cunas, cama doble separada, check-in tardío...' : 'Late checkout, extra baby crib...'}
                            rows={2}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white font-medium"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={isBookingSubmitting}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition text-xs tracking-widest uppercase font-mono cursor-pointer shadow-lg active:scale-95"
                          id="btn-complete-booking"
                        >
                          {isBookingSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                              <span>{lang === 'es' ? 'PROCESANDO...' : 'PROCESSING...'}</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-4 w-4" />
                              <span>
                                {lang === 'es' ? 'RESERVAR EN CLOUDBEDS (100% SEGURO)' : 'PROCEED TO CLOUDBEDS BOOKING'}
                              </span>
                            </>
                          )}
                        </button>

                      </form>
                    )}
                  </div>

                  {/* Right summary box panel */}
                  <div className="lg:col-span-5 bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
                    <h4 className="font-extrabold text-sm uppercase tracking-widest border-b border-slate-800 pb-3 text-sky-450 font-mono">
                      {lang === 'es' ? 'Resumen del Precio' : 'Fare Breakdown'}
                    </h4>

                    {(() => {
                      const calc = getCalculatedPrice(selectedRoomForBooking.price);
                      return (
                        <div className="space-y-4 text-xs font-medium">
                          <div className="flex justify-between text-slate-350">
                            <span>
                              {lang === 'es' ? 'Habitación' : 'Room type'}
                            </span>
                            <span className="font-bold text-white text-right">
                              {getRoomName(selectedRoomForBooking)}
                            </span>
                          </div>

                          <div className="flex justify-between text-slate-350">
                            <span>
                              {lang === 'es' ? 'Tarifa Base' : 'Base Rate'}
                            </span>
                            <span className="font-bold text-white">
                              €{selectedRoomForBooking.price} / {lang === 'es' ? 'noche' : 'night'}
                            </span>
                          </div>

                          <div className="flex justify-between text-slate-350">
                            <span>
                              {lang === 'es' ? 'Número de noches' : 'Number of nights'}
                            </span>
                            <span className="font-black text-white bg-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono border border-slate-700">
                              {calc.nights} {calc.nights === 1 ? (lang === 'es' ? 'noche' : 'night') : (lang === 'es' ? 'noches' : 'nights')}
                            </span>
                          </div>

                          {breakfastOption && (
                            <div className="flex justify-between text-slate-350">
                              <span>
                                {lang === 'es' ? 'Ticket Descuento Desayuno' : 'Breakfast Discount Ticket'}
                              </span>
                              <span className="font-bold text-sky-400">
                                {lang === 'es' ? 'GRATIS' : 'FREE'}
                              </span>
                            </div>
                          )}

                          {calc.discount > 0 && (
                            <div className="border-t border-slate-800 pt-3 flex justify-between text-emerald-400 font-bold text-[11px] font-mono uppercase tracking-wider">
                              <span className="flex items-center gap-1.5">
                                <TrendingDown className="h-3.5 w-3.5" />
                                {calc.promoCodeApplied === 'WELCOME18'
                                  ? (lang === 'es' ? 'PROMO WELCOME18 -18%' : 'PROMO WELCOME18 -18%')
                                  : calc.promoCodeApplied === 'POLMARNOR'
                                  ? (lang === 'es' ? 'PROMO POLMARNOR -10%' : 'PROMO POLMARNOR -10%')
                                  : (lang === 'es' ? 'Descuento Web' : 'Direct Discount')}
                              </span>
                              <span>
                                -€{calc.discount}
                              </span>
                            </div>
                          )}

                          <div className="border-t border-slate-800 pt-4 flex justify-between items-baseline">
                            <span className="font-extrabold text-white text-sm uppercase tracking-wide">
                              {lang === 'es' ? 'Total (IVA Incluido)' : 'Total (VAT Included)'}
                            </span>
                            <span className="text-3xl font-black text-amber-400 font-mono">
                              €{calc.total}
                            </span>
                          </div>

                          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 space-y-2 text-slate-400 text-[10px]">
                            <p className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider font-mono">
                              <ShieldCheck className="h-4 w-4 text-emerald-400" />
                              {lang === 'es' ? 'Política de Cancelación Gratis' : 'Cancellation Policy'}
                            </p>
                            <p className="leading-relaxed">
                              {lang === 'es'
                                ? 'Puedes cancelar esta reserva sin cargo alguno hasta 24 horas antes de la llegada en el apartado "Mis Reservas".'
                                : 'Cancel for free up to 24 hours prior to arrival via "My Bookings" menu. No credit charges.'}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* 3. SERVICES SECTION - MODERN PREMIUM HOTEL DESIGN */}
        {activeTab === 'servicios' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-16"
          >
            {/* Elegant Header */}
            <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sky-200"></div>
                <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                  {lang === 'es' ? 'Comodidades Exclusivas' : 'Premium Amenities'}
                </span>
                <div className="h-[1px] w-12 bg-sky-200"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 font-serif tracking-tight">
                {lang === 'es' ? 'Servicios del Serramar' : 'Hostel Services & Amenities'}
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light">
                {lang === 'es'
                  ? 'Garantizamos una estancia sumamente cómoda combinando el encanto tradicional andaluz con prestaciones modernas.'
                  : 'We guarantee a convenient, satisfying lodging experience blending traditional Andalusian charm with modern systems.'}
              </p>
            </div>

            {/* Premium Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              
              {/* Service Item: WiFi */}
              <div className="group flex flex-col space-y-5">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-500">
                  <Wifi className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight">
                    {lang === 'es' ? 'Wi-Fi de Fibra Óptica' : 'High-Speed Fiber WiFi'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {lang === 'es'
                      ? 'Conectividad simétrica de fibra óptica gratis en todas las habitaciones y zonas comunes. Ideal para nómadas digitales.'
                      : 'High-speed symmetric internet coverage synced across all bedrooms and common areas. Perfect for remote tech workers.'}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block text-[9px] font-sans font-medium text-slate-400 uppercase tracking-widest border border-slate-200 px-2 py-1 rounded">1 GBPS Ilimitado</span>
                  </div>
                </div>
              </div>

              {/* Service Item: Climatización */}
              <div className="group flex flex-col space-y-5">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-500">
                  <Wind className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight">
                    {lang === 'es' ? 'Climatización Individual' : 'Climate Control'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {lang === 'es'
                      ? 'Aire acondicionado frío/calor regulable en tus dependencias privadas para un confort absoluto en el verano andaluz.'
                      : 'Individually adjustable AC/Heating units inside your private quarters to stay comfortable all year round.'}
                  </p>
                </div>
              </div>

              {/* Service Item: Consigna Equipaje */}
              <div className="group flex flex-col space-y-5">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-500">
                  <Briefcase className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight">
                    {lang === 'es' ? 'Consigna de Equipaje' : 'Luggage Storage'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {lang === 'es'
                      ? '¿Tu vuelo sale tarde? Deja tus maletas gratis bajo llave en recepción y exprime al máximo tus últimas horas en la ciudad.'
                      : 'Flight scheduled late? Leave your luggage with us unlocked and secure for free and enjoy your last hours in the city.'}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block text-[9px] font-sans font-medium text-slate-400 uppercase tracking-widest border border-slate-200 px-2 py-1 rounded">{lang === 'es' ? '100% Gratuito' : '100% Free'}</span>
                  </div>
                </div>
              </div>

              {/* Service Item: Desayuno Descuento */}
              <div className="group flex flex-col space-y-5">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors duration-500">
                  <Coffee className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight">
                    {lang === 'es' ? 'Descuento Cafetería' : 'Breakfast Discounts'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {lang === 'es'
                      ? 'Nuestros huéspedes disfrutan de precios especiales y descuentos exclusivos en cafeterías colaboradoras justo al lado del hostal.'
                      : 'Our guests enjoy special pricing and exclusive discounts at partnering local cafes right next to the hostal.'}
                  </p>
                  <div className="pt-2">
                    <button 
                      onClick={() => setActiveTab('habitaciones')}
                      className="text-[10px] font-sans font-medium text-amber-600 uppercase tracking-widest hover:text-amber-700 transition flex items-center gap-1"
                    >
                      {lang === 'es' ? 'AÑADIR TICKET AL RESERVAR' : 'ADD TICKET AT CHECKOUT'} <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Item: Limpieza Diaria */}
              <div className="group flex flex-col space-y-5">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-500">
                  <CheckSquare className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight">
                    {lang === 'es' ? 'Servicio de Limpieza Diario' : 'Daily Cleaning'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {lang === 'es'
                      ? 'Garantizamos una higiene impecable. Limpieza diaria de habitaciones y desinfección regulada de toda nuestra galería de baños.'
                      : 'Impeccable hygiene is our signature. Daily thorough cleaning of accommodations and hourly disinfection protocols.'}
                  </p>
                </div>
              </div>

              {/* Service Item: Atención Turística */}
              <div className="group flex flex-col space-y-5">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-500">
                  <ShieldCheck className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-slate-900 font-sans tracking-tight">
                    {t('Atención Turística', 'Destination Tips', 'Assistance Touristique', 'إرشاد سياحي')}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {t(
                      'Proveemos mapas, recomendaciones de restaurantes locales de tapas y reservas directas a atracciones de la Costa del Sol.',
                      'We provide customized maps, hidden tapas spot recommendations, or reserve tickets for local attractions.',
                      'Nous fournissons des cartes, des recommandations de tapas et des réservations de billets.',
                      'نحن نوفر خرائط مخصصة وتوصيات بأفضل مطاعم المقبلات وحجز التذاكر.'
                    )}
                  </p>
                </div>
              </div>

            </div>

            {/* Premium Divider Feature */}
            <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 space-y-5">
                <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight">
                  {lang === 'es' ? 'El arte de la hospitalidad' : 'The art of hospitality'}
                </h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  {lang === 'es' 
                    ? 'En Sun Serramar Boutique Hostal creemos que los detalles marcan la diferencia. Nuestra atención personalizada y el cuidado de cada elemento de su estancia están diseñados para brindarle una experiencia memorable en el corazón de Benalmádena.'
                    : 'At Sun Serramar Boutique Hostal we believe details make the difference. Our personalized attention and care for every element of your stay are designed to provide you with a memorable experience in the heart of Benalmádena.'}
                </p>
              </div>
              <div className="md:w-1/2 flex justify-end">
                <img 
                  src="https://www.serramarbenalmadena.com/wp-content/uploads/salon-cucina-serramar-benalmadena-3.jpg" 
                  alt="Hostal Serramar Interior" 
                  className="rounded-xl object-cover h-64 w-full md:w-4/5 shadow-sm sepia-[0.15]" 
                />
              </div>
            </div>
          </motion.div>
        )}
        {/* 4. LOCATION / SITUACION SECTION */}
        {activeTab === 'situacion' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-16"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            
            {/* Header section with sophisticated design */}
            <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sky-200"></div>
                <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                  {t('ALREDEDOR DEL HOSTAL', 'SURROUNDINGS & ACCESSIBILITY', 'ENVIRONS & ACCESSIBILITÉ', 'المحيط والوصول')}
                </span>
                <div className="h-[1px] w-12 bg-sky-200"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight font-serif">
                {t('Localización Privilegiada', 'A Privileged Coastal Location', 'Situation Privilégiée', 'موقع متميز ومثالي')}
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base mx-auto">
                {t(
                  'Ubicados en el emblemático centro de Arroyo de la Miel, Benalmádena. Gozará de la máxima tranquilidad residencial con todas las conexiones de transporte a pasos de su habitación.',
                  'Located in the historic center of Arroyo de la Miel, Benalmádena. Enjoy premium residential tranquility alongside fast airport train transit and sandy Mediterranean beaches.',
                  'Situé dans le centre historique de Arroyo de la Miel, Benalmádena. Profitez du calme résidentiel tout en étant à quelques pas de la gare de l\'aéroport et des plages.',
                  'يقع في المركز التاريخي لأرويو دي لا مييل، بينالمادينا. استمتع بالهدوء السكني وفي نفس الوقت على بعد خطوات قليلة من محطة قطار المطار والشواطئ.'
                )}
              </p>
            </div>

            {/* Quick Proximity Stats Badges - 4 Column Bento Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Stat 1: Train */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-sky-600">3 min</span>
                  <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
                    <Train className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-extrabold text-sm text-slate-800 leading-tight">
                    {t('Estación de Tren', 'Train Terminal', 'Gare Ferroviaire', 'محطة القطار')}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t('RENFE Cercanías a 200m del hostal', 'C-1 line directly connecting to Airport', 'Ligne C-1 directe vers l\'Aéroport', 'خط رينفي المباشر إلى المطار')}
                  </p>
                </div>
              </div>

              {/* Stat 2: Beach */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-amber-600">15 min</span>
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
                    <Compass className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-extrabold text-sm text-slate-800 leading-tight">
                    {t('Playas de Benalmádena', 'Sandy Beaches', 'Plages de Benalmádena', 'شواطئ بينالمادينا')}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t('Paseo marítimo y chiringuitos de espetos', 'Golden sands and traditional gastronomy', 'Sables d\'or et cuisine côtière', 'الرمال الذهبية والمطاعم الشاطئية')}
                  </p>
                </div>
              </div>

              {/* Stat 3: Airport */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-600">18 min</span>
                  <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
                    <Plane className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-extrabold text-sm text-slate-800 leading-tight">
                    {t('Aeropuerto de Málaga', 'Malaga Airport', 'Aéroport de Málaga', 'مطار مالاغا')}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t('Trayecto directo en tren o autovía', 'Direct connection via suburban rail link', 'Liaison ferroviaire directe rapide', 'اتصال مباشر وسريع بالقطار')}
                  </p>
                </div>
              </div>

              {/* Stat 4: Restaurants */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
                    {t('Pasos', 'Steps', 'Quelques pas', 'خطوات')}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-extrabold text-sm text-slate-800 leading-tight">
                    {t('Bares y Tapas', 'Bustling Cafés', 'Plazas & Restaurants', 'المقاهي والمطاعم والمتاجر')}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {t('Comercios, heladerías y plazas locales', 'Supermarkets, shops and plazas nearby', 'Commerces, glaciers et places animées', 'الأسواق والصيدليات والميادين المجاورة')}
                  </p>
                </div>
              </div>
            </div>

            {/* Split layout: Interactive Guides Desk (Left) + Curated Address Directory (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Interactive Tabbed Panel (Google Map Iframe / Public Transit Guide / Parking Guide) */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                
                {/* Visual Premium Tab bar switch */}
                <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full max-w-lg shadow-sm">
                  <button
                    type="button"
                    onClick={() => setLocationSubTab('map')}
                    className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      locationSubTab === 'map' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Map className="h-3.5 w-3.5 text-sky-500" />
                    <span>{t('Mapa Interactivo', 'Interactive Map', 'Carte Interactive', 'خريطة تفاعلية')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationSubTab('transit')}
                    className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      locationSubTab === 'transit' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Train className="h-3.5 w-3.5 text-sky-500" />
                    <span>{t('Sin Coche (C-1)', 'Without Car', 'Sans Voiture', 'بدون سيارة')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationSubTab('car')}
                    className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      locationSubTab === 'car' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Car className="h-3.5 w-3.5 text-sky-500" />
                    <span>{t('En Coche / Parking', 'By Car & Parking', 'En Voiture / Parking', 'بالسيارة والمواقف')}</span>
                  </button>
                </div>

                {/* Sub-tab viewport */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex-1 flex flex-col justify-between min-h-[460px]">
                  
                  {/* TAB 1: REAL GOOGLE MAPS IFRAME INTER-ACTIVE */}
                  {locationSubTab === 'map' && (
                    <div className="space-y-5 flex flex-col h-full flex-1 animate-fade-in" id="location-view-google-map">
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex-1 min-h-[340px]">
                        <iframe 
                          src="https://maps.google.com/maps?q=Hostal%20Serramar,%20Calle%20las%20Flores%205,%2029631%20Benalm%C3%A1dena,%20M%C3%A5laga&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Sun Serramar Google Maps Location"
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3.5 items-center">
                        <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                          <Compass className="h-5 w-5 animate-pulse text-sky-600" />
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600">
                          <strong>{t('Ubicación Estratégica Real:', 'Real Strategic Location:', 'Emplacement Stratégique Réel :', 'موقع استراتيجي حقيقي:')}</strong>{' '}
                          {t(
                            'Navegue de forma táctil en el mapa superior. Arroyo de la Miel cuenta con calles peatonales tradicionales repletas de plazas gastronómicas y comercios locales.', 
                            'Interact directly with our official Google Maps pin above. Standard residential sidewalks are flat, illuminated, and packed with traditional tapas spots.',
                            'Interagissez directement avec la carte ci-dessus. Arroyo de la Miel regorge de zones piétonnes avec des plazas espagnoles traditionnelles et tapas.',
                            'تفاعل مباشرة مع الخريطة في الأعلى. يتمتع حي أرويو دي لا مييل بمناطق مشاة مريحة تحتوي على ساحات أندلسية تقليدية لتناول المقبلات والتسوق.'
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: STEP-BY-STEP TRAIN ARRIVAL TIMELINE */}
                  {locationSubTab === 'transit' && (
                    <div className="space-y-6 animate-fade-in" id="location-view-transit">
                      <div className="space-y-2">
                        <h4 className="font-medium text-lg text-slate-900 font-serif">
                          {t('Cómo llegar sin coche desde el Aeropuerto (AGP)', 'Arriving smoothly by train from Malaga Airport (AGP)', 'Comment arriver par train de l\'Aéroport de Málaga', 'كيفية الوصول بالقطار من مطار مالاغا')}
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          {t(
                            'Benalmádena-Arroyo de la Miel cuenta con una de las mejores conexiones ferroviarias de la Costa del Sol. No necesitará alquilar un coche para disfrutar al máximo.',
                            'Malaga Airport is linked directly through the regional commuter train network. Fast, sustainable, and hassle-free transit directly to our doorstep.',
                            'L\'aéroport de Málaga est relié par le train régional. Rapide, écologique et sans tracas directement chez nous.',
                            'يرتبط مطار مالاغا بقطار الضواحي الإقليمي C-1. خدمة سريعة وصديقة للبيئة وقريبة جداً من باب الفندق بدون الحاجة لسيارة.'
                          )}
                        </p>
                      </div>

                      {/* Timeline flow */}
                      <div className="relative border-l border-slate-200 pl-6 sm:pl-8 space-y-6 pt-1">
                        
                        {/* Step 1 */}
                        <div className="relative font-sans">
                          <span className="absolute -left-[32px] sm:-left-[40px] top-0.5 bg-sky-100 text-sky-700 w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs border border-white shadow-sm">
                            1
                          </span>
                          <div className="space-y-1">
                            <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                              <Plane className="h-4 w-4 text-sky-600" />
                              {t('RENFE Estación Aeropuerto', 'RENFE Airport Station', 'Gare RENFE de l\'Aéroport', 'محطة قطار المطار')}
                            </h5>
                            <p className="text-slate-550 text-xs leading-relaxed">
                              {t(
                                'Al salir de la Terminal de Llegadas T3 del Aeropuerto de Málaga, camine en línea recta durante 150 metros siguiendo las indicaciones de tren.',
                                'Upon exiting Malaga T3 Terminal arrivals, walk 150 meters straight ahead toward the overland rail platform.',
                                'En sortant du Terminal d\'Arrivées T3 de l\'Aéroport, marchez 150 mètres tout droit vers le quai du train.',
                                'عند خروجك من مبنى الوصول T3 بالمطار، سر بشكل مستقيم لمسافة ١٥٠ متراً باتجاه رصيف القطار.'
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative font-sans">
                          <span className="absolute -left-[32px] sm:-left-[40px] top-0.5 bg-sky-100 text-sky-700 w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs border border-white shadow-sm">
                            2
                          </span>
                          <div className="space-y-1">
                            <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                              <Train className="h-4 w-4 text-sky-600" />
                              {t('Tren Cercanías C-1 (Dirección Fuengirola)', 'C-1 Suburban Train (Bound for Fuengirola)', 'Train C-1 (Direction Fuengirola)', 'قطار الضواحي C-1 (اتجاه فوينخيرولا)')}
                            </h5>
                            <p className="text-slate-550 text-xs leading-relaxed">
                              {t(
                                'Tome la Línea C-1 directa. Los trenes operan con una frecuencia de 20 minutos desde temprano. El trayecto dura exactamente 18 minutos y el billete sencillo cuesta aprox. 1.80€ a 2.05€ (se puede pagar directamente con tarjeta contactless en el torno).',
                                'Board the C-1 route. Trains depart every 20 minutes. It takes exactly 18 minutes to arrive and the single ticket is only 2.05€ (contactless credit cards work directly on the station gates).',
                                'Prenez la ligne C-1 directe. Trains toutes les 20 minutes. Le trajet dure exactement 18 minutes et coûte environ 2,05 € (paiement par carte bancaire sans contact directement aux portillons).',
                                'استقل الخط المباشر C-1. تغادر القطارات كل ٢٠ دقيقة. تستغرق الرحلة ١٨ دقيقة فقط والتذكرة حوالي ٢.٠٥ يورو، ويمكن الدفع مباشرة ببطاقتك الائتمانية اللامتلامسية.'
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative font-sans">
                          <span className="absolute -left-[32px] sm:-left-[40px] top-0.5 bg-amber-550 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs border border-white shadow-md">
                            3
                          </span>
                          <div className="space-y-1">
                            <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-amber-600 animate-pulse" />
                              {t('Estación Arroyo de la Miel ➔ Hostal Serramar', 'Arroyo de Miel Station ➔ Hostal Serramar', 'Gare d\'Arroyo de la Miel ➔ Hostal Serramar', 'محطة أرويو دي لا مييل ➔ هوستال سيرامار')}
                            </h5>
                            <p className="text-slate-550 text-xs leading-relaxed">
                              {t(
                                'Descienda en la parada "Benalmádena-Arroyo de la Miel". Al salir, camine de frente unos 200 metros por la Calle las Flores. Encontrará nuestro hostal a mano derecha en escasos 3 minutos de trayecto plano.',
                                'Exit the station at Arroyo de la Miel stop. Walk 200m down C. las Flores. Our hotel is on the right hand side within 3 minutes of flat walk.',
                                'Descendez à l\'arrêt "Benalmádena-Arroyo de la Miel". Marchez 200m le long de la rue Las Flores. Le hostal est sur votre droite à 3 minutes.',
                                'انزل في محطة "بينالمادينا - أرويو دي لا مييل". عند خروجك، سر للأمام لمسافة ٢٠٠ متر بشارع لاس فلوريس. ستجد فندقنا على اليمين خلال ٣ دقائق فقط.'
                              )}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 3: CAR DRIVING DIRECTIONS & NEAREST PARKING SPOTS */}
                  {locationSubTab === 'car' && (
                    <div className="space-y-6 animate-fade-in" id="location-view-car">
                      <div className="space-y-2">
                        <h4 className="font-medium text-lg text-slate-900 font-serif">
                          {t('Cómo llegar en coche y Directorio de Aparcamiento', 'Driving instructions & Parking Hub info', 'Instructions en voiture et Hub de parking', 'الوصول بالسيارة ومواقف السيارات')}
                        </h4>
                        <p className="text-slate-505 text-slate-500 text-xs leading-relaxed">
                          {t(
                            'Arroyo de la Miel goza de un acceso directo y rápido desde la Autovía del Mediterráneo AP-7. Al estar ubicados en pleno centro peatonal, le recomendamos los siguientes puntos estratégicos para estacionar.',
                            'Arroyo de la Miel has excellent direct links from the main AP-7 coastal motorway. Located right in the vibrant core, here is our custom selection of parking lots nearby.',
                            'Accès simple depuis l\'autoroute AP-7. Situé au centre piéton, nous vous recommandons les espaces stratégiques suivants pour vous garer.',
                            'تتمتع أرويو دي لا مييل بمدخل مباشر وسريع من الطريق السريع AP-7. نظراً لوقوعنا في قلب وسط المدينة المخصص للمشاة، نوصيك بالمواقف التالية.'
                          )}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[9px] bg-slate-200 text-slate-700 uppercase font-black tracking-wider px-2 py-0.5 rounded font-mono">
                              {t('RECOMENDADO SIN COSTE', 'TOP FREE PICK', 'MEILLEUR CHOIX GRATUIT', 'موقف مجاني ممتاز')}
                            </span>
                            <h5 className="font-extrabold text-xs text-slate-850">
                              {t('Aparcamiento Gratuito Parque de la Paloma', 'Paloma Park Free Open Parking', 'Parking Gratuit Parc de la Paloma', 'موقف باركي ديل بالوما المجاني')}
                            </h5>
                            <p className="text-slate-505 text-slate-500 text-[11px] leading-normal mt-1">
                              {t(
                                'Espacio al aire libre gratuito junto al Parque de la Paloma. A unos 9 minutos agradables de paseo plano directo al hostal.',
                                'Large outdoor municipal parking around Paloma Park. Completely free and located an easy 9 min walk.',
                                'Grand parking municipal ouvert près du parc Paloma. Entièrement gratuit, à 9 min à pied.',
                                'موقف سيارات بلدي خارجي كبير بالقرب من حديقة بالوما. مجاني تماماً ويبعد حوالي ٩ دقائق فقط سيرًا على الأقدام.'
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[9px] bg-amber-105 bg-amber-100 text-amber-800 uppercase font-black tracking-wider px-2 py-0.5 rounded font-mono">
                              {t('SUBTERRÁNEO PAGO', 'SECURE PAID PARKING', 'PARKING SOUTERRAIN PAYANT', 'موقف مغطى مدفوع')}
                            </span>
                            <h5 className="font-extrabold text-xs text-slate-850">
                              {t('Parking Público Balmoral (Arroyo Centro)', 'Balmoral Underground Public Parking', 'Parking Public Souterrain Balmoral', 'موقف بالمورال العمومي المغطى')}
                            </h5>
                            <p className="text-slate-550 text-[11px] leading-normal mt-1">
                              {t(
                                'Aparcamiento subterráneo vigilado las 24 horas a escasos 150 metros del hostal. Ideal para dejar el coche cerrado bajo resguardo.',
                                'Vigilant safe 24/7 underground parking lot located just 150 meters away. Optimal for total peace of mind.',
                                'Parking souterrain surveillé 24h/24 à seulement 150m. Idéal pour garer la voiture en toute sécurité.',
                                'موقف سيارات مغطى ومحمي ومراقب على مدار ٢٤ ساعة على بعد ١٥٠ متراً فقط من الفندق. مثالي لسلامة سيارتك.'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-3.5 text-[11px] text-amber-800 leading-normal flex gap-2 items-start">
                        <span className="text-sm">⚠️</span>
                        <p>
                          <strong>{t('Consejo del Anfitrión:', 'Host Hint:', 'Conseil de l\'Hôte :', 'نصيحة المضيف:')}</strong>{' '}
                          {t(
                            'Nuestra calle (Calle las Flores) permite la parada de coches unos minutos en el vado para descargar equipaje cómodamente antes de estacionar.', 
                            'Our Calle las Flores street permits temporary stopping directly outside our entrance for baggage drop-off prior to parking.',
                            'Notre rue Calle las Flores permet l\'arrêt temporaire de quelques minutes pour décharger vos bagages facilement avant de vous garer.',
                            'يسمح شارعنا (شارع لاس فلوريس) بالتوقف المؤقت لبضع دقائق أمام مدخل الفندق لتفريغ الأمتعة والحقائب بسهولة قبل الذهاب للموقف.'
                          )}
                        </p>
                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Address Copy hub & Curated Neighbor directory */}
              <div className="lg:col-span-4 flex flex-col space-y-6">
                
                {/* Visual Address card block */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 space-y-4 shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 bg-sky-500/5 h-24 w-24 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="space-y-1.5 pointer-events-none">
                    <span className="text-[9px] font-black text-sky-450 font-mono uppercase tracking-[0.15em] block">
                      {t('DIRECCIÓN OFICIAL', 'OFFICIAL LOCATION', 'ADRESSE OFFICIELLE', 'العنوان الرسمي')}
                    </span>
                    <h4 className="font-bold text-base text-slate-100 font-serif">
                      Calle las Flores, 5
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      29631 Benalmádena, Málaga, España
                    </p>
                  </div>

                  {/* Copy Address interactive block */}
                  <div className="space-y-2 font-sans">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("Calle las Flores, 5, 29631 Benalmádena, Málaga");
                        setAddressCopied(true);
                        setTimeout(() => setAddressCopied(false), 2000);
                      }}
                      className="w-full bg-white/5 hover:bg-white/10 active:scale-98 border border-white/10 rounded-xl py-2.5 px-3 flex items-center justify-between text-xs transition-all text-slate-300 hover:text-white cursor-pointer group font-sans"
                    >
                      <span className="flex items-center gap-2 font-mono">
                        <Copy className="h-3.5 w-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                        <span>
                          {addressCopied 
                            ? t('¡DIRECCIÓN COPIADA!', 'COPIED TO CLIPBOARD!', 'COPIÉ DANS LE PRESSE-PAPIERS !', 'تم النسخ بنجاح!') 
                            : t('Copiar Dirección', 'Copy Address', 'Copier l\'Adresse', 'نسخ العنوان')}
                        </span>
                      </span>
                      {addressCopied ? (
                        <Check className="h-4 w-4 text-emerald-400 animate-pulse" />
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{t('Clic', 'Click', 'Clic', 'اضغط')}</span>
                      )}
                    </button>

                    <a 
                      href="https://maps.google.com/?q=Hostal+Serramar+Benalmádena+Calle+las+Flores+5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-center bg-sky-600 hover:bg-sky-505 hover:bg-sky-500 text-white font-extrabold py-3.5 rounded-xl text-xs tracking-widest font-mono transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Navigation className="h-4 w-4 animate-pulse" />
                      <span>{t('ABRIR EN GOOGLE MAPS', 'OPEN GOOGLE MAPS', 'OUVRIR GOOGLE MAPS', 'فتح في خرائط جوجل')}</span>
                      <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
                    </a>
                  </div>
                </div>

                {/* Sights and proximity directory */}
                <div className="bg-white rounded-3xl p-5 border border-slate-150 shadow-sm space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs uppercase text-slate-400 tracking-wider font-mono flex items-center gap-1.5">
                      <Compass className="h-4 w-4 text-amber-550 animate-spin-slow" />
                      <span>{t('Puntos de Interés Cercanos', 'Local Sights & Walking', 'Points d\'Intérêt à Prox.', 'المعالم القريبة والجولات')}</span>
                    </h4>
                    <p className="text-[10.5px] text-slate-400">
                      {t('Descubre todo lo que podrás visitar paseando:', 'Curated points of interest within easy walking range:', 'Points d’intérêt que vous pourrez visiter en marchant :', 'اكتشف أفضل الأماكن القريبة التي يمكنك زيارتها سيراً:')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {NEARBY_SIGHTS.map((sight, idx) => {
                      // Get a nice indicator icon matching the theme
                      let sightIcon = <MapPin className="h-5 w-5 text-sky-500" />;
                      if (sight.nameEn?.toLowerCase().includes("train")) sightIcon = <Train className="h-5 w-5 text-sky-500" />;
                      else if (sight.nameEn?.toLowerCase().includes("cable")) sightIcon = <Mountain className="h-5 w-5 text-sky-500" />;
                      else if (sight.nameEn?.toLowerCase().includes("beach")) sightIcon = <Umbrella className="h-5 w-5 text-sky-500" />;
                      else if (sight.nameEn?.toLowerCase().includes("paloma")) sightIcon = <Trees className="h-5 w-5 text-sky-500" />;
                      else if (sight.nameEn?.toLowerCase().includes("marina") || sight.nameEn?.toLowerCase().includes("port")) sightIcon = <Anchor className="h-5 w-5 text-sky-500" />;

                      const getTranslatedSight = (sightIndex: number) => {
                        if (sightIndex === 0) {
                          return {
                            name: t('Estación de Tren Arroyo de la Miel', 'Arroyo de la Miel Train Station', 'Gare Ferroviaire de Arroyo de la Miel', 'محطة قطار أرويو دي لا مييل'),
                            dist: t('200 metros (3 min andando)', '200 meters (3 min walk)', '200 mètres (3 min à pied)', '٢٠٠ متر (٣ دقائق سيراً)'),
                            desc: t('Conecta directo con el Aeropuerto de Málaga (15 min) y el centro de Málaga (25 min) mediante la línea C-1.', 'Connects directly with Malaga Airport (15 min) and Malaga Center (25 min) via the C-1 train line.', 'Relie directement l’Aéroport de Málaga (15 min) et le centre de Málaga (25 min) via la ligne C-1.', 'يربط مباشرة بمطار مالاغا (١٥ دقيقة) ووسط مالاغا (٢٥ دقيقة) عبر خط القطار C-1.')
                          };
                        }
                        if (sightIndex === 1) {
                          return {
                            name: t('Teleférico de Benalmádena', 'Benalmadena Cable Car', 'Téléphérique de Benalmádena', 'تلفريك بينالمادينا'),
                            dist: t('600 metros (8 min andando)', '600 meters (8 min walk)', '600 mètres (8 min à pied)', '٦٠٠ متر (٨ دقائق سيراً)'),
                            desc: t('Sube a la cima del Monte Calamorro para ver unas vistas espectaculares de toda la costa de Málaga y espectáculos de aves.', 'Ride to the top of Mount Calamorro for spectacular bird-eye views of the Malaga coast and falconry shows.', 'Montez au sommet du mont Calamorro pour profiter de vues spectaculaires sur la côte de Málaga et de spectacles d’oiseaux.', 'اصعد إلى قمة جبل كالامورو لمشاهدة مناظر رائعة لساحل مالاغا وعروض الطيور الجارحة.')
                          };
                        }
                        if (sightIndex === 2) {
                          return {
                            name: t('Playas de Benalmádena', 'Benalmadena Beaches', 'Plages de Benalmádena', 'شواطئ بينالمادينا'),
                            dist: t('1.5 km (15-20 min andando)', '1.5 km (15-20 min walk)', '1.5 km (15-20 min à pied)', '١.٥ كم (١٥-٢٠ دقيقة سيراً)'),
                            desc: t('Playas de arena fina como la de Malapesquera y Santa Ana, repletas de chiringuitos de pescaíto frito y ambiente veraniego.', 'Fine sand beaches like Malapesquera and Santa Ana, packed with seafood restaurants (chiringuitos) and summer vibe.', 'De belles plages de sable fin comme Malapesquera et Santa Ana, avec de nombreux restaurants typiques de plage et ambiance estivale.', 'شواطئ رملية ناعمة مثل مالابيسكيرا وسانتا أنا، مليئة بالمطاعم الشاطئية والأجواء الصيفية الرائعة.')
                          };
                        }
                        if (sightIndex === 3) {
                          return {
                            name: t('Puerto Marina Benalmádena', 'Puerto Marina (Marina)', 'Puerto Marina (Port de Plaisance)', 'ميناء مارينا بينالمادينا'),
                            dist: t('2.2 km (5 min en coche / tren)', '2.2 km (5 min by car / train)', '2.2 km (5 min en voiture / train)', '٢.٢ كم (٥ دقائق بالسيارة / القطار)'),
                            desc: t('Uno de los puertos deportivos más bellos y premiados del mundo, con una arquitectura única, tiendas, restaurantes y acuario.', 'One of the most magnificent marina islands in the world, with unique architecture, shops, dining, and Sea Life aquarium.', 'L’un des plus beaux ports de plaisance et les plus primés au monde, avec une architecture unique, des boutiques, des restaurants et un aquarium.', 'أحد أجمل الموانئ الترفيهية في العالم وأكثرها تميزاً، يتميز بتصميم معماري فريد ومتاجر ومطاعم وحوض أسماك.')
                          };
                        }
                        if (sightIndex === 4) {
                          return {
                            name: t('Parque de la Paloma', 'Parque de la Paloma', 'Parc de la Paloma', 'حديقة ديل بالوما'),
                            dist: t('1.1 km (12 min andando)', '1.1 km (12 min walk)', '1.1 km (12 min à pied)', '١.١ كم (١٢ دقيقة سيراً)'),
                            desc: t('Precioso parque repleto de animales sueltos (conejos, pavos reales, patos), jardines de cactus y lagos artificiales.', 'Beautiful park with rabbits, peacocks, hens, and ducks wandering freely, plus large cactus gardens and lakes.', 'Un superbe parc habité par des animaux en liberté (lapins, paons, canards), des jardins de cactus et des lacs artificiels.', 'حديقة جميلة مليئة بالحيوانات الطليقة (الأرانب، الطواويس، البط)، بالإضافة إلى حدائق الصبار والبحيرات الاصطناعية.')
                          };
                        }
                        return { name: lang === 'es' ? sight.name : sight.nameEn, dist: lang === 'es' ? sight.distance : sight.distanceEn, desc: lang === 'es' ? sight.description : sight.descriptionEn };
                      };

                      const localizedSight = getTranslatedSight(idx);

                      return (
                        <div 
                          key={idx} 
                          className="group p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-2.5 transition-all duration-300 font-sans"
                        >
                          <span className="shrink-0 bg-sky-50 p-2 rounded-xl border border-sky-100 shadow-sm flex items-center justify-center">{sightIcon}</span>
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex justify-between items-baseline gap-1">
                              <h5 className="font-extrabold text-[12px] text-slate-800 truncate leading-tight group-hover:text-sky-600 transition-colors">
                                {localizedSight.name}
                              </h5>
                              <span className="text-[9.5px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded shrink-0">
                                {localizedSight.dist}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-550 text-slate-500 leading-normal line-clamp-2">
                              {localizedSight.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* 5. OFERTAS / OFFERS SECTION */}
        {activeTab === 'ofertas' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-16 animate-in fade-in duration-500">
            
            <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sky-200"></div>
                <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                  {lang === 'es' ? 'Ahorra Con Nosotros' : 'Budget Perks'}
                </span>
                <div className="h-[1px] w-12 bg-sky-200"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight font-serif">
                {lang === 'es' ? 'Ofertas y Promociones Exclusivas' : 'Exclusive Direct Web Offers'}
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base mx-auto">
                {lang === 'es'
                  ? 'Benefíciate de los mejores precios solamente reservando a través de este portal oficial.'
                  : 'Get specialized promotions and pricing when finalizing reservations directly over our official platform.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col justify-between relative group">
                <div className="bg-amber-500 text-slate-950 text-center font-bold text-[10px] uppercase py-1 shadow">
                  {lang === 'es' ? 'Recomendado' : 'Top Choice'}
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl text-slate-900 leading-tight">
                      {lang === 'es' ? 'Descuento Web Direct' : 'Direct Booking Deal'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {lang === 'es'
                        ? 'Aplica un -10% de descuento directo en cualquier habitación. Configurado por defecto.'
                        : 'Get a flat 10% direct deduction on any room choice, automatically configured into our billing engine.'}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === 'es' ? 'Código Promocional' : 'Slashed Price'}</p>
                    <p className="text-3xl font-black text-emerald-600 font-mono">DIRECT-10</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveTab('habitaciones')}
                    className="w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-lg text-xs"
                  >
                    {lang === 'es' ? 'RESERVAR CON OFERTA' : 'BOOK WITH DEAL'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col justify-between relative">
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl text-slate-900 leading-tight">
                      {lang === 'es' ? 'Estancia Larga (7+ noches)' : 'Long Stay (7+ nights)'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {lang === 'es'
                        ? '¿Planeas pasar una semana de desconexión bajo el sol? Te descontamos un -15% automático.'
                        : 'Planning on spending a blissful week on Costa del Sol? Enjoy an automated 15% rate discount.'}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === 'es' ? 'Código Promocional' : 'Promo Code'}</p>
                    <p className="text-3xl font-black text-emerald-700 font-mono">WEEK-15</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveTab('habitaciones')}
                    className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs"
                  >
                    {lang === 'es' ? 'APLICAR OFERTA' : 'APPLY LONG STAY'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col justify-between relative">
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl text-slate-900 leading-tight">
                      {lang === 'es' ? 'Pack Desayuno Libre' : 'Free Coffee Perk'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {lang === 'es'
                        ? 'Reserva 4 noches o más en cualquiera de nuestras habitaciones dobles y disfruta de café gratis toda tu estancia.'
                        : 'Book 4 consecutive nights or more in any room and get unlimited hot morning coffee.'}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === 'es' ? 'Beneficio' : 'Bonus Benefit'}</p>
                    <p className="text-xl font-bold text-amber-500 uppercase tracking-widest">{lang === 'es' ? 'Café Ilimitado' : 'Unlimited Coffee'}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveTab('habitaciones')}
                    className="w-full text-center bg-slate-950 text-white font-bold py-2.5 rounded-lg text-xs"
                  >
                    {lang === 'es' ? 'VER REQUISITOS' : 'VIEW REQUIREMENTS'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 6. REVIEWS / OPINIONES SECTION */}
        {activeTab === 'opiniones' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-16 animate-in fade-in duration-500">
            
            {/* Top Interactive Filter Rail & Header Info */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight font-serif">
                    {lang === 'es' ? 'Experiencias de Huéspedes' : 'Verified Guest Feedbacks'}
                  </h2>
                  <p className="text-sm font-light text-slate-500 mt-2">
                    {lang === 'es' 
                      ? 'Opiniones de viajeros reales recolectadas y certificadas de forma segura.' 
                      : 'Real traveler opinions securely collected and certified for authentic peace of mind.'}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 self-start md:self-auto">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    {lang === 'es' ? 'Canal 100% Auténtico' : '100% Authentic Reviews'}
                  </span>
                </div>
              </div>

              {/* Dynamic Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between border-t border-slate-100 pt-5 gap-3">
                <div className="flex flex-wrap gap-1.5 font-sans">
                  <button
                    onClick={() => setReviewsFilter('all')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      reviewsFilter === 'all' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {t('Todas', 'All stays', 'Toutes', 'الكل')} ({reviewsList.length})
                  </button>
                  <button
                    onClick={() => setReviewsFilter('verified')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      reviewsFilter === 'verified' 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {t('Estancias Web', 'Verified Stays', 'Vérifiées', 'مؤكدة')} ({reviewsList.filter(r => r.verified || r.id.startsWith('REV-') || r.origin).length})
                  </button>
                  <button
                    onClick={() => setReviewsFilter('5star')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                      reviewsFilter === '5star' 
                        ? 'bg-amber-500 text-slate-950 shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <StarIcon className="h-3 w-3 fill-current" />
                    5 {t('Estrellas', 'Stars', 'Étoiles', 'نجوم')} ({reviewsList.filter(r => r.rating === 5).length})
                  </button>
                  <button
                    onClick={() => setReviewsFilter('4star')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                      reviewsFilter === '4star' 
                        ? 'bg-amber-500 text-slate-950 shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <StarIcon className="h-3 w-3 fill-current" />
                    4 {t('Estrellas', 'Stars', 'Étoiles', 'نجوم')} ({reviewsList.filter(r => r.rating === 4).length})
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  {t('Sincronizado', 'Live Feed', 'Synchronisé', 'مباشر')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Aggregated score breakdown & submission form */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Verified Booking.com Live Trust Badge */}
                <div className="bg-[#003580] text-white p-6 rounded-3xl border border-blue-900/40 space-y-4 shadow-lg relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute top-2 right-4 text-[9px] font-mono uppercase font-extrabold text-blue-300 tracking-widest bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-800/30">
                    {lang === 'es' ? 'Certificado' : 'Certified'}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="bg-white text-[#003580] px-2 py-0.5 rounded font-black text-xs tracking-tight font-sans">
                      B.
                    </div>
                    <span className="text-xs font-black tracking-wider uppercase font-sans">Booking.com</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500 text-white font-extrabold text-2xl px-3 py-1.5 rounded-xl font-mono shadow-sm flex items-center justify-center shrink-0">
                        8.4
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold tracking-tight font-sans text-white">
                          {lang === 'es' ? 'Fabuloso • Excelente' : 'Fabulous • Very Good'}
                        </h4>
                        <p className="text-[10px] text-blue-200">
                          {lang === 'es' ? 'Basado en +1.200 opiniones reales escritas por huéspedes' : 'Based on over 1,200 verified guest reviews'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-900/50 text-center font-sans">
                      <div className="bg-blue-950/40 p-2 rounded-xl border border-blue-900/30">
                        <span className="block text-xs font-black text-blue-200 font-mono">8.9</span>
                        <span className="text-[9px] text-blue-300 font-bold block">{lang === 'es' ? 'Personal' : 'Staff'}</span>
                      </div>
                      <div className="bg-blue-950/40 p-2 rounded-xl border border-blue-900/30">
                        <span className="block text-xs font-black text-blue-200 font-mono">8.8</span>
                        <span className="text-[9px] text-blue-300 font-bold block">{lang === 'es' ? 'Limpieza' : 'Cleanliness'}</span>
                      </div>
                      <div className="bg-blue-950/40 p-2 rounded-xl border border-blue-900/30">
                        <span className="block text-xs font-black text-blue-200 font-mono">9.0</span>
                        <span className="text-[9px] text-blue-300 font-bold block">{lang === 'es' ? 'Ubicación' : 'Location'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-blue-100/90 leading-relaxed font-sans font-medium">
                    {lang === 'es' 
                      ? 'Nuestra impecable puntuación oficial nos consolida como una de las mejores opciones calidad-precio de toda Benalmádena. Puedes comprobar en directo por qué nuestros clientes nos recomiendan continuamente.'
                      : 'Our high official guest rating crowns us as one of the best valued options in Arroyo de la Miel & Benalmádena. See why guests love us and book direct for guaranteed discounts.'}
                  </p>

                  <a 
                    href="https://www.booking.com/hotel/es/hostal-serramar.es.html?aid=311984&label=hotel-19342-es-HAONoW1Cnb9bSazr3tVDDAS267087003827%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-2431237389770%3Alp9195364%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YTQUGSsRwx9_3qo3uPTHyoo&sid=093a62aae45ed4b603dc23c1f955350a&dest_id=-373144&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1782661800&srpvid=a0716f4946c900f0&type=total&ucfs=1&"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-[#003580] py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider shadow hover:shadow-md transition active:scale-95 cursor-pointer text-center"
                  >
                    <span>{lang === 'es' ? 'Comprobar en Booking.com' : 'Verify on Booking.com'}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#003580]" />
                  </a>
                </div>
                
                {/* Visual score card - Booking style */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-sky-500/10 rounded-full blur-2xl" />
                  
                  <div className="text-center space-y-2 relative z-10 animate-in fade-in">
                    <span className="text-[9px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      {lang === 'es' ? '⭐ CALIFICACIÓN SOBRESALIENTE' : '⭐ OUTSTANDING PERFORMANCE'}
                    </span>
                    <div className="text-6xl font-black text-amber-400 font-mono tracking-tighter">
                      {avgRating} <span className="text-sm text-slate-500 uppercase font-bold tracking-widest ml-1">/ 5</span>
                    </div>
                    <div className="flex justify-center gap-1 text-amber-400 py-1">
                      <StarIcon className="h-4.5 w-4.5 fill-current" />
                      <StarIcon className="h-4.5 w-4.5 fill-current" />
                      <StarIcon className="h-4.5 w-4.5 fill-current" />
                      <StarIcon className="h-4.5 w-4.5 fill-current" />
                      <StarIcon className="h-4.5 w-4.5 fill-current" />
                    </div>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                      {lang === 'es'
                        ? `Consolidado de ${reviewsList.length} opiniones de huéspedes reales.`
                        : `Consolidated from ${reviewsList.length} certified reviews written by actual guests.`}
                    </p>
                  </div>

                  {/* Criteria Rating sliders */}
                  <div className="border-t border-slate-800/80 pt-5 space-y-3.5 relative z-10 font-sans">
                    <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest">
                      {lang === 'es' ? 'Puntuación por categorías' : 'Rating breakdown'}
                    </p>
                    
                    <div className="space-y-3 text-xs">
                      {/* Limpieza */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300 font-medium">
                          <span>✨ {lang === 'es' ? 'Limpieza impecable' : 'Immaculate Cleanliness'}</span>
                          <span className="font-bold text-sky-400 font-mono">4.9 / 5</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: '98%' }} />
                        </div>
                      </div>

                      {/* Ubicación */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300 font-medium">
                          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {lang === 'es' ? 'Ubicación Estratégica' : 'Strategic Location'}</span>
                          <span className="font-bold text-emerald-400 font-mono">4.8 / 5</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '96%' }} />
                        </div>
                      </div>

                      {/* Atención */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300 font-medium">
                          <span>🤝 {lang === 'es' ? 'Hospitalidad y Trato' : 'Hospitality & Services'}</span>
                          <span className="font-bold text-amber-400 font-mono">4.9 / 5</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: '98%' }} />
                        </div>
                      </div>

                      {/* Calidad/Precio */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-slate-300 font-medium">
                          <span>💰 {lang === 'es' ? 'Valor Calidad/Precio' : 'Value for money'}</span>
                          <span className="font-bold text-indigo-400 font-mono">5.0 / 5</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form to post reviews - ONLY users with valid bookings */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between font-sans">
                    <div>
                      <h3 className="font-black text-base text-slate-900">
                        {lang === 'es' ? 'Escribe tu Opinión' : 'Share your stay'}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {lang === 'es' ? 'Requiere reserva directa registrada' : 'Requires direct booking verification'}
                      </p>
                    </div>
                    <Key className="h-4.5 w-4.5 text-slate-400" />
                  </div>

                  {reviewSuccessMessage && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-150 p-3 rounded-xl text-xs font-bold text-center flex items-center gap-2 justify-center"
                    >
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      {reviewSuccessMessage}
                    </motion.div>
                  )}

                  {reviewError && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-rose-50 text-rose-800 border border-rose-150 p-3 rounded-xl text-xs font-bold text-center"
                    >
                      ⚠️ {reviewError}
                    </motion.div>
                  )}

                  <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs text-slate-705 text-slate-700 font-sans">
                    
                    {/* Booking Verification input code */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block font-semibold text-slate-700">
                          {lang === 'es' ? 'Código de Reserva (Requerido) *' : 'Booking Reference Code *'}
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={newReviewBookingCode}
                          onChange={(e) => {
                            setNewReviewBookingCode(e.target.value);
                            setReviewError(null);
                          }}
                          placeholder="ej. BKR-123456"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-sky-500 uppercase transition shadow-inner pr-10"
                          required
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                          {bookings.some(b => b.id.toUpperCase().trim() === newReviewBookingCode.toUpperCase().trim()) ? (
                            <ShieldCheck className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Key className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Live Auto-fill status message when booking code matches in real time */}
                      {(() => {
                        const matched = bookings.find(b => b.id.toUpperCase().trim() === newReviewBookingCode.toUpperCase().trim());
                        if (matched) {
                          return (
                            <motion.div 
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 bg-emerald-50/70 border border-emerald-100 text-emerald-800 p-2.5 rounded-xl text-[10px] flex items-start gap-2 animate-in slide-in-from-top-1"
                            >
                              <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                              <div>
                                <span className="font-extrabold block">
                                  {lang === 'es' ? 'Asociado con éxito ✔' : 'Booking reference matched ✔'}
                                </span>
                                <span className="text-slate-550 block text-[9px] mt-0.5">
                                  {lang === 'es' 
                                    ? `Estancia: ${matched.roomName} • Huésped: ${matched.guestName}`
                                    : `Stay: ${matched.roomName} • Guest: ${matched.guestName}`}
                                </span>
                              </div>
                            </motion.div>
                          );
                        }
                        return null;
                      })()}

                      {/* Display test helpers for clicking active/created reservation codes */}
                      {bookings.length > 0 && !bookings.some(b => b.id.toUpperCase().trim() === newReviewBookingCode.toUpperCase().trim()) && (
                        <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <p className="text-[10px] text-slate-500 font-medium">
                            💡 {t('Haz clic en uno de tus códigos de prueba:', 'Click on one of your active booking codes:')}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {bookings.filter(b => b.status !== 'cancelled').slice(0, 3).map((b) => (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => {
                                  setNewReviewBookingCode(b.id);
                                  setNewReviewAuthor(b.guestName);
                                }}
                                className="px-2.5 py-1 bg-white hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 border border-slate-200 rounded-lg text-[9px] text-slate-600 font-bold transition cursor-pointer"
                              >
                                {b.id}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {bookings.length === 0 && (
                        <div className="mt-2 p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-[10px] text-amber-850 flex items-start gap-1.5 leading-relaxed">
                          <span>🛎️</span>
                          <span>
                            {t(
                              'Por favor, haz una reserva rápida en "RESERVAR DIRECTO" arriba para generar un código activo con el que poder publicar.',
                              'To generate a valid reference code, please make a test reservation on "Rooms" tab first.'
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Star Rating Selector */}
                    <div>
                      <label className="block font-semibold mb-1.5 text-slate-700">
                        {lang === 'es' ? 'Puntuación General *' : 'General Score *'}
                      </label>
                      <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl p-3 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="p-0.5 text-amber-405 hover:scale-125 transition-transform duration-100 cursor-pointer focus:outline-none"
                            title={`${star} / 5`}
                          >
                            <StarIcon 
                              className={`h-7 w-7 transition-colors duration-150 ${
                                star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-300'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="text-xs font-mono font-extrabold text-slate-500 ml-1.5">
                          ({newReviewRating} / 5)
                        </span>
                      </div>
                    </div>

                    {/* Author Input - Auto-populated if they have booking */}
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">
                        {lang === 'es' ? 'Firma o Iniciales (Opcional)' : 'Reviewer Name / Alias (Optional)'}
                      </label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder={(() => {
                          const matched = bookings.find(b => b.id.toUpperCase().trim() === newReviewBookingCode.toUpperCase().trim());
                          return matched ? matched.guestName : "Carlos S.";
                        })()}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        {lang === 'es' ? 'Dejar vacío para usar el nombre registrado.' : 'Leave empty to use name stored in the booking reference.'}
                      </p>
                    </div>

                    {/* Review Comment detail area */}
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700">{lang === 'es' ? 'Comentario sincero *' : 'Detailed Comment *'}</label>
                      <textarea
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder={lang === 'es' ? 'Escribe aquí tu opinión sobre la estancia, limpieza y comodidad...' : 'Describe your stay, service, cleanliness...'}
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl text-[11px] tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      {lang === 'es' ? 'PUBLICAR OPINIÓN CERTIFICADA' : 'POST CERTIFIED REVIEW'}
                    </button>
                  </form>
                </div>

              </div>

              {/* Right Column: Reviews feed list loaded dynamically with tabs */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual statistics stats for elegance */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">{lang === 'es' ? 'Porcentaje de 5⭐' : 'Percentage of 5⭐'}</span>
                    <span className="text-xl font-black text-slate-855 text-slate-800 font-mono block mt-1">
                      {Math.round((reviewsList.filter(r => r.rating === 5).length / reviewsList.length) * 100) || 100}%
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">{lang === 'es' ? 'Tasa Recomendación' : 'Recommend Ratio'}</span>
                    <span className="text-xl font-black text-emerald-600 font-mono block mt-1">
                      {Math.round((reviewsList.filter(r => r.rating >= 4).length / reviewsList.length) * 100) || 100}%
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs col-span-2 sm:col-span-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">{lang === 'es' ? 'Estancia Media' : 'Average Stay'}</span>
                    <span className="text-xl font-black text-sky-600 font-mono block mt-1">9.8 / 10</span>
                  </div>
                </div>

                {/* Animated Feed Feedbacks */}
                <div className="space-y-4">
                  {(() => {
                    const filteredReviews = reviewsList.filter((rev) => {
                      if (reviewsFilter === 'verified') return rev.verified || rev.id.startsWith('REV-') || rev.origin;
                      if (reviewsFilter === '5star') return rev.rating === 5;
                      if (reviewsFilter === '4star') return rev.rating === 4;
                      return true;
                    });

                    if (filteredReviews.length === 0) {
                      return (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
                          <StarIcon className="h-8 w-8 mx-auto text-slate-200 mb-2 animate-bounce animate-pulse" />
                          <p className="text-xs font-semibold">
                            {lang === 'es' 
                              ? 'No se encontraron opiniones para el filtro seleccionado.' 
                              : 'No reviews match your selected filter criteria.'}
                          </p>
                        </div>
                      );
                    }

                    return filteredReviews.map((rev) => {
                      const isVerified = rev.verified || rev.id.startsWith('REV-') || rev.origin;
                      const initials = rev.author ? rev.author.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : 'G';
                      
                      return (
                        <motion.div 
                          key={rev.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 space-y-4 border-l-4 border-l-sky-500 relative"
                        >
                          <div className="flex justify-between items-start gap-3 flex-wrap sm:flex-nowrap font-sans">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 font-extrabold text-xs border border-slate-200">
                                {initials}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-extrabold text-slate-900 text-xs sm:text-sm">{rev.author}</p>
                                  {isVerified && (
                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-150 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <Check className="h-2.5 w-2.5 text-emerald-600" />
                                      {lang === 'es' ? 'Reserva Real' : 'Verified Booking'}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[9px] text-slate-400 font-mono font-bold tracking-tight">
                                    {rev.date}
                                  </span>
                                  {rev.roomType && (
                                    <span className="text-[9px] text-slate-500 bg-slate-50 border border-slate-150 border-slate-200 px-1.5 py-0.5 rounded font-medium">
                                      🏨 {rev.roomType}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Stars block */}
                            <div className="flex gap-0.5 text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2 py-1 rounded-xl items-center self-start sm:self-auto">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-amber-450 fill-amber-400 text-amber-405 text-amber-400' : 'text-slate-150'}`} />
                              ))}
                              <span className="text-[10px] font-bold text-amber-600 ml-1.5 font-mono">{rev.rating}.0</span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-serif italic pl-2 border-l-2 border-slate-100 italic font-medium">
                            "{lang === 'es' && rev.comment ? rev.comment : (rev.commentEn || rev.comment)}"
                          </p>
                        </motion.div>
                      );
                    });
                  })()}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* DYNAMIC STATIC PAGES DESIGN */}
        {customPages.some(p => p.id === activeTab && p.isActive) && (() => {
          const currentPage = customPages.find(p => p.id === activeTab);
          if (!currentPage) return null;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-8 animate-in fade-in"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="bg-sky-55 text-sky-700 p-3 rounded-xl border border-sky-100">
                    <FileText className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 font-serif">
                      {lang === 'es' ? currentPage.titleEs : currentPage.titleEn}
                    </h2>
                    <p className="text-slate-400 text-[10px] font-sans uppercase font-medium mt-1 tracking-[0.2em]">
                      HOSTAL SERRAMAR • BENALMÁDENA
                    </p>
                  </div>
                </div>

                <div className="text-slate-650 leading-relaxed space-y-4 text-xs sm:text-sm font-sans whitespace-pre-wrap">
                  {lang === 'es' ? currentPage.contentEs : currentPage.contentEn}
                </div>

                <div className="pt-6 border-t border-slate-150 flex flex-wrap gap-4 items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold tracking-wider font-mono uppercase text-sky-650">Ahorra un 10% adicional reservando directo</span>
                  <button
                    onClick={() => setActiveTab('inicio')}
                    className="text-sky-600 hover:text-sky-700 font-bold hover:underline py-1 px-3 bg-slate-50 border rounded-lg transition"
                  >
                    {lang === 'es' ? '← Volver al inicio' : '← Back to Home'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* New Dedicated High-Quality Contact & Support Page */}
        {activeTab === 'contacto' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-16 animate-in fade-in duration-500">
            
            {/* Header intro card */}
            <div className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sky-200"></div>
                <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                  {lang === 'es' ? 'Atención al Huésped' : 'Guest Relations'}
                </span>
                <div className="h-[1px] w-12 bg-sky-200"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight font-serif">
                {lang === 'es' ? 'Canal de Contacto Oficial' : 'Official Assistance Center'}
              </h2>
              <p className="text-slate-500 font-light text-sm md:text-base max-w-2xl leading-relaxed mx-auto">
                {lang === 'es' 
                  ? 'Gestionamos cada solicitud de forma personalizada. Selecciona tu caso de consulta para agilizar la respuesta o utiliza los teléfonos de asistencia directa durante tu estancia.' 
                  : 'Every request is attended personally. Select your main query department to expedite response or dial our immediate guest assist hotline.'}
              </p>
            </div>

            {/* Premium Bento Grid - Contact Cases / Casos de Contacto */}
            <div className="space-y-4">
              <h3 className="text-slate-500 uppercase tracking-widest font-mono text-[11px] font-bold">
                {lang === 'es' ? '📌 CASOS DE CONSULTA Y DEPARTAMENTOS' : '📌 TYPICAL ASSISTANCE & USE CASES'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
                
                {/* Case 1: Group / Extended stay */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="bg-sky-55 text-sky-750 bg-sky-50 p-2.5 rounded-xl w-fit border border-sky-100">
                      <Users className="h-5 w-5 text-sky-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {lang === 'es' ? 'Reservas de Grupo y Larga Estancia' : 'Group Stays & Corporate'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'es' 
                        ? 'Descuentos directos del 10% al 20% para grupos de más de 4 personas o estancias extendidas (más de 14 noches).' 
                        : 'Get 10% to 20% specialized direct discount rates for groups of 4+ guests or stays longer than 14 nights.'}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-sky-650 font-extrabold bg-sky-50 px-2.5 py-1 rounded w-fit uppercase">
                    {lang === 'es' ? 'Soporte Comercial' : 'Sales Support'}
                  </div>
                </div>

                {/* Case 2: Luggage & Late sign-in */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="bg-emerald-55 text-emerald-750 bg-emerald-50 p-2.5 rounded-xl w-fit border border-emerald-100">
                      <Briefcase className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {lang === 'es' ? 'Check-In Flexible y Equipaje' : 'Luggage & Early Access'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'es'
                        ? 'Consúltanos para solicitar acceso antes de hora (sujeto a disponibilidad) o coordinar el resguardo de maletas gratuito.'
                        : 'Query early check-ins (based on vacancy) or coordinate fully complimentary locked luggage storage on check-out.'}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-650 font-extrabold bg-emerald-50 px-2.5 py-1 rounded w-fit uppercase">
                    {lang === 'es' ? 'Servicio 24 Horas' : '24-hour service'}
                  </div>
                </div>

                {/* Case 3: Official Invoices */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="bg-amber-55 text-amber-750 bg-amber-50 p-2.5 rounded-xl w-fit border border-amber-100">
                      <FileText className="h-5 w-5 text-amber-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {lang === 'es' ? 'Facturación, Pagos y Empresas' : 'Invoices, Receipts & VAT'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'es'
                        ? 'Emisión de facturas corporativas con IVA español detallado, coordinación de transferencias bancarias o cobros directos.'
                        : 'Official detailed corporate invoice processing with Spanish VAT, bank-wire coordination, and clear expense support.'}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-amber-650 font-extrabold bg-amber-50 px-2.5 py-1 rounded w-fit uppercase">
                    {lang === 'es' ? 'Facturación Directa' : 'Billing desk'}
                  </div>
                </div>

                {/* Case 4: Emergencies */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="bg-rose-55 text-rose-750 bg-rose-50 p-2.5 rounded-xl w-fit border border-rose-100">
                      <ShieldCheck className="h-5 w-5 text-rose-600" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {lang === 'es' ? 'Objetos Perdidos e Incidencias' : 'Lost Items & Help on Stay'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'es'
                        ? 'Reporte de llaves olvidadas, solicitudes de reposición en baños u objetos perdidos durante tus vacaciones.'
                        : 'Retrieve forgotten items easily, report lock issues, or request extra bath essentials during your holidays.'}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-rose-650 font-extrabold bg-rose-50 px-2.5 py-1 rounded w-fit uppercase">
                    {lang === 'es' ? 'Urgencias 24/7' : 'Urgent Support'}
                  </div>
                </div>

              </div>
            </div>

            {/* Split Contact Info & Multi-Channel Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Block: Full Contact Information */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-2 relative z-10">
                    <span className="text-[9px] font-bold text-sky-450 text-sky-400 bg-sky-500/15 border border-sky-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono flex items-center gap-1.5 w-max">
                      <MapPin className="h-3 w-3" />
                      {lang === 'es' ? 'PORTAL DE RESERVAS OFICIAL' : 'OFFICIAL BOOKING WEB'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light font-serif text-sky-300">
                      Hostal Serramar
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-sans relative z-10 pt-2 border-t border-slate-800">
                    
                    {/* Phone block */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">{lang === 'es' ? 'Número Directo (Fijo / Whatsapp):' : 'Hotline (Phone / WhatsApp):'}</p>
                      <a 
                        href="tel:+34952442604" 
                        className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-750 hover:bg-slate-800 hover:border-slate-700 transition"
                      >
                        <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                        <div>
                          <strong className="block text-white text-sm font-extrabold">+34 952 44 26 04</strong>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {lang === 'es' ? 'Atención telefónica de 09:00 a 22:30' : 'Phone operations daily 09:00 to 22:30'}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Official WhatsApp block */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">
                        {lang === 'es' ? 'Canal de WhatsApp Oficial (Chat Directo):' : 'Official WhatsApp Channel (Direct Chat):'}
                      </p>
                      <a 
                        href="https://wa.me/34683571614?text=Hola%20Hostal%20Serramar" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-900/60 p-3 rounded-xl hover:bg-emerald-950/60 hover:border-emerald-850 transition"
                      >
                        <MessageSquare className="h-5 w-5 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="block text-emerald-300 text-sm font-black">
                            {lang === 'es' ? 'Abrir Chat de WhatsApp' : 'Open WhatsApp Chat'}
                          </strong>
                          <span className="text-[10px] text-emerald-400/80 font-medium block mt-0.5">
                            +34 683 57 16 14 • {lang === 'es' ? 'Respuesta inmediata' : 'Instant responses'}
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Email block */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">{lang === 'es' ? 'Email Oficial de Reservas:' : 'Email Desk:'}</p>
                      <div 
                        className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-750 hover:bg-slate-800 hover:border-slate-700 transition cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText('contact@sunserramar.com');
                          showToast(lang === 'es' ? '¡Email copiado al portapapeles!' : 'Email copied to clipboard!', 'success');
                        }}
                      >
                        <Mail className="h-5 w-5 text-sky-400 shrink-0" />
                        <div>
                          <strong className="block text-white text-sm font-extrabold">contact@sunserramar.com</strong>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {lang === 'es' ? 'Haz clic para copiar • Respuestas en <2 horas' : 'Click to copy • Response usually <2 hours'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address block */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold">{lang === 'es' ? 'Dirección Física:' : 'Street Address:'}</p>
                      <a 
                        href="https://maps.google.com/?q=Hostal+Serramar+Benalmádena+Calle+las+Flores+5" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-750 hover:bg-slate-800 hover:border-slate-700 transition"
                      >
                        <MapPin className="h-5 w-5 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="block text-white text-sm font-extrabold">Calle las Flores, 5</strong>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            29631 Benalmádena, Málaga, España
                          </span>
                        </div>
                      </a>
                    </div>

                  </div>

                  <div className="border-t border-slate-800 pt-4 relative z-10">
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                      {lang === 'es' 
                        ? '🛎️ Los huéspedes alojados disponen de llave electrónica inteligente y número de asistencia móvil 24 horas proporcionado en el check-in.' 
                        : '🛎️ In-house guests are provided with smart keyless key codes and an emergency 24h hotline phone connection at register.'}
                    </p>
                  </div>
                </div>

                {/* Helpful Tip Box */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 items-start">
                  <span className="text-emerald-605 text-emerald-600 text-lg shrink-0">💡</span>
                  <div className="font-sans text-xs">
                    <strong className="text-emerald-900 block font-bold">
                      {lang === 'es' ? '¿Quieres un 10% de Descuento Directo?' : 'Want 10% Off Direct Stay?'}
                    </strong>
                    <span className="text-slate-600 block mt-1 leading-relaxed">
                      {lang === 'es' 
                        ? 'Usa el código "DIRECTO" al completar tu reserva directa en la pestaña "Habitaciones" o menciónalo al escribirnos para disfrutar de tarifa reducida garantizada.' 
                        : 'Simply write the code "DIRECTO" during reservations on the "Rooms" tab, or write it below to guarantee the best direct deal.'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Block: Redesigned High-Quality Contact Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight font-sans">
                    {lang === 'es' ? 'Formulario de Solicitud Directo' : 'Drop us a detailed inquiry'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    {lang === 'es' ? 'Completa los detalles a continuación y te responderemos antes de 2 horas.' : 'Input your requests below to process your dispatch securely.'}
                  </p>
                </div>

                {contactSuccessMessage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 text-emerald-800 border border-emerald-150 p-4 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2 font-sans"
                  >
                    <span className="text-lg">✔</span>
                    <span>{contactSuccessMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">{lang === 'es' ? 'Nombre completo *' : 'Full Name *'}</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Elena Gómez"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">{lang === 'es' ? 'Correo electrónico *' : 'Email Address *'}</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="elena@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">{lang === 'es' ? 'Teléfono de contacto' : 'Phone Number'}</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+34"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-slate-600 font-bold">{lang === 'es' ? 'Caso / Asunto de Consulta *' : 'Inquiry Case / Subject *'}</label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-extrabold focus:ring-1 focus:ring-sky-500 focus:outline-none transition cursor-pointer"
                        required
                      >
                        <option value="">-- {lang === 'es' ? 'Selecciona una categoría' : 'Select category'} --</option>
                        <option value="Reservas y Tarifas">{lang === 'es' ? 'Reservas y Tarifas Especiales' : 'Reservations & Rates'}</option>
                        <option value="Check-in Flexible">{lang === 'es' ? 'Check-in y Depósito de Equipaje' : 'Check-in & Luggage'}</option>
                        <option value="Facturación y Pagos">{lang === 'es' ? 'Facturación Directa o Empresas' : 'Billing & Accounting'}</option>
                        <option value="Objetos Perdidos">{lang === 'es' ? 'Incidencia, Dudas u Objetos Perdidos' : 'Incidents & General Questions'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-slate-600 font-bold">{lang === 'es' ? 'Mensaje o Comentario de Consulta *' : 'Detailed Inquiry Details *'}</label>
                    <textarea
                      value={contactText}
                      onChange={(e) => setContactText(e.target.value)}
                      placeholder={lang === 'es' ? 'Describe aquí con el mayor detalle posible tu solicitud, indicando fechas o referencias de reserva si las tienes...' : 'Provide as much details as possible, noting booking references, travel dates...'}
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-8 rounded-xl tracking-widest uppercase text-xs shadow-md transition-all duration-300 cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
                    >
                      {contactSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>{lang === 'es' ? 'ENVIANDO SOLICITUD...' : 'SENDING REQUEST...'}</span>
                        </>
                      ) : (
                        <span>{lang === 'es' ? 'ENVIAR SOLICITUD DE CONTACTO' : 'SUBMIT DIRECT ENQUIRY'}</span>
                      )}
                    </button>
                  </div>
                </form>

              </div>

            </div>

            {/* Interactive Quick FAQ Section inside Contact page to enrich */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 space-y-6 animate-in fade-in">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-slate-300"></div>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] font-sans">
                    {lang === 'es' ? 'Preguntas Frecuentes' : 'Help Desk FAQ'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight font-serif">
                  {lang === 'es' ? 'Resolución Rápida de Dudas' : 'Quick Assist FAQ'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-150/70 shadow-sm space-y-1.5 hover:shadow-md transition">
                  <strong className="text-slate-900 font-extrabold text-sm block">
                    {lang === 'es' ? '¿Cómo solicito el servicio de check-In flexible fuera de horario?' : 'How do I request self-receptions or late check-ins?'}
                  </strong>
                  <span className="text-slate-500 block leading-relaxed font-semibold font-sans text-[11px]">
                    {lang === 'es' 
                      ? 'Nuestras puertas cuentan con sistemas inteligentes. Si prevés llegar tarde, escríbenos mediante este canal indicando tu código de reserva. Te suministraremos los códigos de entrada digital antes de tu llegada para que entres sin llaves ni esperas.' 
                      : 'All facilities sport state-of-the-art keylocks. If traveling off hours, drop us a query using this center. We issue keyless entrance passcodes right before arrival to enable instant smart check-in.'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-150/70 shadow-sm space-y-1.5 hover:shadow-md transition">
                  <strong className="text-slate-900 font-extrabold text-sm block">
                    {lang === 'es' ? '¿Dónde puedo estacionar mi vehículo?' : 'Where can I securely park my car?'}
                  </strong>
                  <span className="text-slate-500 block leading-relaxed font-semibold font-sans text-[11px]">
                    {lang === 'es' 
                      ? 'Aunque estamos en pleno centro de Arroyo de la Miel con calles peatonales pintorescas, disponemos de convenios con estacionamientos públicos cubiertos de pago a unos 150 metros del hostal. Escríbenos para recibir la localización exacta y tarifas concertadas.' 
                      : 'We maintain corporate rate agreements with premium covered garage services 150m away from our doorstep. Select the "Check-in Flexible" category below, and we will email complete coordinates and discount slips.'}
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 7. MY BOOKINGS SECTION */}
        {activeTab === 'reservas' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-12"
          >
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-sky-200"></div>
                <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
                  {lang === 'es' ? 'Tus Reservaciones' : 'Active stays'}
                </span>
                <div className="h-[1px] w-12 bg-sky-200"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight font-serif flex items-center justify-center gap-3">
                <FileText className="h-8 w-8 text-sky-600 shrink-0 opacity-80" />
                {lang === 'es' ? 'Tus Reservas Realizadas' : 'My Synced Bookings'}
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base max-w-xl mx-auto">
                {lang === 'es' 
                  ? 'Gestiona tus reservas locales, cancela o revisa pormenores de confirmación.' 
                  : 'Examine synced bookings, examine voucher vouchers, or request early cancellations.'}
              </p>
            </div>

            <div className="space-y-8">
              {bookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative group animate-in slide-in-from-bottom duration-300"
                >
                  
                  {/* Decorative Circular ticket notches in background */}
                  <div className="absolute left-0 right-0 top-[28%] h-0 border-t-2 border-dashed border-slate-200 z-10">
                    <span className="absolute -left-3.5 -top-3.5 w-7 h-7 bg-slate-50 rounded-full border border-slate-200" />
                    <span className="absolute -right-3.5 -top-3.5 w-7 h-7 bg-slate-50 rounded-full border border-slate-200" />
                  </div>

                  {/* Top segment: header */}
                  <div className="bg-slate-950 text-white p-6 sm:p-8 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                        {lang === 'es' ? '✓ Reserva Confirmada' : '✓ Booking Confirmed'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">HOSTAL SERRAMAR</span>
                    </div>

                    <div className="flex justify-between items-end gap-3 pt-1">
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">{lang === 'es' ? 'CÓDIGO DE RESERVA' : 'BOOKING CODE'}</p>
                        <p className="text-lg sm:text-xl font-black text-amber-400 font-mono tracking-widest">{b.id}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'PRECIO TOTAL NETO' : 'TOTAL PRICE'}</span>
                        <span className="text-xl sm:text-2xl font-black text-white font-mono">€{b.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom segment: flight pass details */}
                  <div className="p-6 sm:p-8 pt-8 space-y-5 bg-gradient-to-b from-slate-50 to-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-slate-405 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'TITULAR DE LA RESERVA' : 'PASS RECIPIENT'}</span>
                        <span className="font-extrabold text-slate-900 text-sm">{b.guestName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-405 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'SITUACIÓN EN FLOTA' : 'ROOM TYPE'}</span>
                        <span className="font-extrabold text-slate-900 text-sm">{b.roomName}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-150 pt-4">
                      <div>
                        <p className="text-[9px] text-slate-405 font-bold uppercase tracking-wider font-mono mb-1">{lang === 'es' ? 'Llegada / Check-In' : 'Arrival Date'}</p>
                        <p className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-sky-600" />
                          {b.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-405 font-bold uppercase tracking-wider font-mono mb-1">{lang === 'es' ? 'Salida / Check-Out' : 'Departure Date'}</p>
                        <p className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-sky-600" />
                          {b.checkOut}
                        </p>
                      </div>
                    </div>

                    {/* CORRECT EVALUATION OF SPECIAL REQUESTS COMPARED TO THE PREVIOUS LITERAL WRITING */}
                    {b.specialRequests && (
                      <div className="text-xs space-y-1 bg-sky-50/50 p-3 rounded-xl border border-sky-100">
                        <span className="text-[9px] text-sky-700 font-bold uppercase tracking-wider font-mono">{lang === 'es' ? 'Indicaciones Especiales' : 'Special Instructions'}:</span>
                        <p className="text-slate-600 italic font-medium">{b.specialRequests}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-[9px] text-slate-400 leading-normal text-center sm:text-left">
                        <p>✨ {lang === 'es' ? 'Presenta este bono digital impreso o en tu pantalla al llegar.' : 'Present this digital voucher coupon at check-in.'}</p>
                        <p>{lang === 'es' ? 'Teléfono Recepción: +34 951 20 70 72' : 'Reception Helplines: +34 951 20 70 72'}</p>
                      </div>

                      <button 
                        onClick={() => handleCancelBooking(b.id)}
                        className="inline-flex gap-1.5 items-center text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-lg transition shrink-0 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>{lang === 'es' ? 'Cancelar Estancia' : 'Cancel stay'}</span>
                      </button>
                    </div>

                    {/* Barcode */}
                    <div className="text-center pt-2 select-none opacity-80">
                      <p className="text-slate-900 font-mono text-2xl tracking-[0.25em] leading-none">
                        |||| || | |||| || ||| | ||| |||| | |||| |||
                      </p>
                    </div>

                  </div>

                </div>
              ))}

              {bookings.length === 0 && (
                <div className="text-center bg-white p-12 border border-slate-150 rounded-2xl max-w-sm mx-auto space-y-4">
                  <p className="text-slate-400 text-lg font-bold">{lang === 'es' ? 'Sin reservas activas' : 'No bookings listed'}</p>
                  <p className="text-xs text-slate-500">
                    {lang === 'es' 
                      ? 'No hemos detectado reservas guardadas localmente en este navegador.' 
                      : 'We cannot locate booking records saved locally on this browser.'}
                  </p>
                  <button 
                    onClick={() => setActiveTab('habitaciones')}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold uppercase py-3 px-6 rounded-xl text-xs tracking-wider font-mono cursor-pointer transition shadow-md"
                  >
                    {lang === 'es' ? 'Reservar Habitación Ahora' : 'Reserve Room Now'}
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        )}

        {/* 8. ADMIN CONTROL BOARD SECTION */}
        {activeTab === 'panel-admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <AdminPanel
              lang={lang}
              rooms={roomsList}
              bookings={bookings}
              reviews={reviewsList}
              announcement={announcement}
              customPages={customPages}
              heroSlides={slidesToUse}
              welcomeImage={welcomeImage}
              upgradeImages={upgradeImages}
              onUpdateRooms={saveRoomsToStorage}
              onUpdateBookings={saveBookingsToStorage}
              onUpdateReviews={saveReviewsToStorage}
              onUpdateAnnouncement={saveAnnouncementToStorage}
              onUpdatePages={savePagesToStorage}
              onUpdateHeroSlides={saveHeroSlidesToStorage}
              onUpdateWelcomeImage={saveWelcomeImageToStorage}
              onUpdateUpgradeImages={saveUpgradeImagesToStorage}
              onClose={() => setActiveTab('inicio')}
              showToast={showToast}
            />
          </div>
        )}

        {/* 9. CLIENT PORTAL PANEL SECTION */}
        {activeTab === 'panel-cliente' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <ClientDashboard
              lang={lang}
              bookings={bookings}
              onUpdateBooking={(updated) => {
                const refreshed = bookings.map(b => b.id === updated.id ? updated : b);
                saveBookingsToStorage(refreshed);
              }}
              onCancelBooking={(bookingId) => {
                const refreshed = bookings.filter(b => b.id !== bookingId);
                saveBookingsToStorage(refreshed);
              }}
              onClose={() => setActiveTab('inicio')}
              showToast={showToast}
            />
          </div>
        )}

        {/* Dynamic Static Footer Contact Form available for all subsections with minimized space and polished design */}
        {!['panel-admin', 'panel-cliente', 'contacto'].includes(activeTab) && (
          <section className="bg-slate-900 text-slate-300 border-t border-slate-800 py-10 px-4 sm:px-8 mt-12 shadow-inner tracking-tight animate-in fade-in" id="contacto">
            <div className="max-w-4xl mx-auto bg-slate-950/40 border border-slate-800/80 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Left block Info */}
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-1">
                    <h3 className="text-white text-xl sm:text-2xl font-black tracking-tight font-sans">
                      Sun Serramar Boutique Hostal
                    </h3>
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold leading-none">
                      {lang === 'es' ? 'Portal de Reservas y Web Oficial' : 'Official Web & Booking Portal'}
                    </p>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {lang === 'es'
                      ? '¿Tienes alguna duda de última hora o necesitas organizar una estancia de grupo/empresa prolongada? Escríbenos directamente o llámanos a nuestro número directo. Te responderemos en muy poco tiempo.'
                      : 'Have some last-minute doubts or planning prolonged group business travels? Message us directly or call. Our family support replies rapidly.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-300 font-sans">
                    <a href="tel:+34952442604" className="flex items-center gap-2 hover:text-white transition group">
                      <Phone className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform duration-200" />
                      <span>+34 952 44 26 04</span>
                    </a>
                    <a 
                      href="https://wa.me/34683571614?text=Hola%20Sun%20Serramar%20Boutique%20Hostal" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition group"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-extrabold">{lang === 'es' ? 'WhatsApp Oficial' : 'Official WhatsApp'}</span>
                    </a>
                    <a href="mailto:contact@sunserramar.com" className="flex items-center gap-2 hover:text-white transition group">
                      <Mail className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform duration-200" />
                      <span>contact@sunserramar.com</span>
                    </a>
                  </div>
                </div>

                {/* Right button block - aligned with design */}
                <div className="flex items-center justify-start md:justify-end md:self-center shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => {
                      setActiveTab('contacto');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-amber-500/10 transition-all text-xs uppercase text-center cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4 text-slate-950" />
                    <span>
                      {lang === 'es' ? 'Abrir Centro de Contacto' : 'Go to Contact Center'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer Legal & copyright info */}
      <footer className="bg-slate-950 text-slate-500 py-6 text-center border-t border-slate-900 text-[10px] space-y-2">
        <div className="flex justify-center gap-6 text-slate-400 flex-wrap">
          <button onClick={() => setLegalModal('aviso')} className="hover:text-white transition cursor-pointer">{lang === 'es' ? 'Aviso Legal' : 'Legal Notice'}</button>
          <button onClick={() => setLegalModal('privacidad')} className="hover:text-white transition cursor-pointer">{lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</button>
          <button onClick={() => setLegalModal('cookies')} className="hover:text-white transition cursor-pointer">{lang === 'es' ? 'Política de Cookies' : 'Cookie Policy'}</button>
          <button onClick={() => setLegalModal('reservas')} className="hover:text-white transition cursor-pointer">{lang === 'es' ? 'Condiciones de Reserva' : 'Booking Conditions'}</button>
        </div>
        <p>© {new Date().getFullYear()} Sun Serramar Boutique Hostal · C. las Flores, 5 · 29631 Benalmádena, Málaga · CIF/NIF: en proceso de registro. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
      </footer>

      {/* Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4" onClick={() => setLegalModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-bold text-slate-900 text-lg">
                {legalModal === 'aviso' && (lang === 'es' ? 'Aviso Legal' : 'Legal Notice')}
                {legalModal === 'privacidad' && (lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy')}
                {legalModal === 'cookies' && (lang === 'es' ? 'Política de Cookies' : 'Cookie Policy')}
                {legalModal === 'reservas' && (lang === 'es' ? 'Condiciones de Reserva' : 'Booking Conditions')}
              </h2>
              <button onClick={() => setLegalModal(null)} className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500 hover:text-slate-900"><X className="h-5 w-5" /></button>
            </div>
            <div className="px-6 py-6 prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
              {legalModal === 'aviso' && <LegalAvisoContent lang={lang} />}
              {legalModal === 'privacidad' && <LegalPrivacidadContent lang={lang} />}
              {legalModal === 'cookies' && <LegalCookiesContent lang={lang} />}
              {legalModal === 'reservas' && <LegalReservasContent lang={lang} />}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Floating Action Button (FAB) */}
      <div className="fixed bottom-[80px] right-4 lg:bottom-8 lg:right-8 z-50 flex flex-col items-end">
        <AnimatePresence>
          {fabOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3 mb-4 items-end"
            >
              <button
                onClick={() => {
                  setFabOpen(false);
                  window.open('https://wa.me/34600000000', '_blank');
                }}
                className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                <span className="text-sm font-bold">{lang === 'es' ? 'Soporte WhatsApp' : 'WhatsApp Support'}</span>
                <MessageSquare className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => {
                  setFabOpen(false);
                  setActiveTab('habitaciones');
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
                className="flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                <span className="text-sm font-bold">{lang === 'es' ? 'Reserva Directa' : 'Direct Booking'}</span>
                <Calendar className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => {
                  setFabOpen(false);
                  setActiveTab('panel-cliente');
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                <span className="text-sm font-bold">{lang === 'es' ? 'Mis Reservas' : 'My Reservations'}</span>
                <User className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={`h-14 w-14 flex items-center justify-center rounded-full shadow-xl transition-all duration-300 transform ${
            fabOpen ? 'bg-rose-500 hover:bg-rose-600 rotate-45' : 'bg-sky-600 hover:bg-sky-700'
          }`}
          aria-label="Quick Actions"
        >
          <Plus className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Smart Mobile Sticky Bottom Navigation Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex justify-around items-center py-2 px-1 lg:hidden text-center"
        id="mobile-bottom-nav-bar"
      >
        <button
          onClick={() => { setActiveTab('inicio'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition ${
            activeTab === 'inicio' ? 'text-sky-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="h-5 w-5 mx-auto" />
          <span className="text-[10px] block mt-0.5">{t('Inicio', 'Home', 'Accueil', 'الرئيسية')}</span>
        </button>

        <button
          onClick={() => { setActiveTab('habitaciones'); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition ${
            activeTab === 'habitaciones' ? 'text-sky-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bed className="h-5 w-5 mx-auto" />
          <span className="text-[10px] block mt-0.5">{t('Habitaciones', 'Rooms', 'Chambres', 'الغرف')}</span>
        </button>

        <button
          onClick={() => { setActiveTab('situacion'); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition ${
            activeTab === 'situacion' ? 'text-sky-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="h-5 w-5 mx-auto" />
          <span className="text-[10px] block mt-0.5">{t('Situación', 'Location', 'Localisation', 'الموقع')}</span>
        </button>

        <button
          onClick={() => { setActiveTab('panel-cliente'); }}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer transition ${
            activeTab === 'panel-cliente' ? 'text-sky-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Key className="h-5 w-5 mx-auto" />
          <span className="text-[10px] block mt-0.5">{t('Mi Cuenta', 'Guest', 'Client', 'حسابي')}</span>
        </button>
      </div>

    </div>
  );
}
