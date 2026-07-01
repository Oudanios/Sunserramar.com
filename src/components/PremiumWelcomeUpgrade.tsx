import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Wifi, 
  Coffee, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Award,
  Users
} from 'lucide-react';

interface PremiumWelcomeUpgradeProps {
  lang: 'es' | 'en' | 'fr' | 'ar';
  onBookUpgrade: (bookingData: {
    roomName: string;
    pricePerNight: number;
    nights: number;
    totalPrice: number;
    guestName: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }) => void;
  customImages?: string[];
}

// Curated high-luxury photography for the "Sun Kissed Apartment"
const UPGRADE_IMAGES = [
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=',
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733636585.jpg?k=a788657d55cfe2d19d472e884d45d61349c6bd1e7b0727de61c724228ecf0f62&o=',
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733636614.jpg?k=03bad47c293ab9059fe10296d2aeaacc6e113c36d213a662881ef11ed2086a2e&o=',
  'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145311438.jpg?k=3d59d88d097928e198f11275595b26b076c8af604997dfb2046ffac39e9d6ab3&o='
];

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12.004 0C5.378 0 .004 5.385.004 12c0 2.112.55 4.17 1.59 6.012L0 24l6.135-1.594c1.801.979 3.824 1.497 5.869 1.498 6.626 0 12-5.385 12-12 0-3.204-1.25-6.216-3.518-8.484A11.944 11.944 0 0 0 12.004 0zM12 21.993c-1.895 0-3.753-.512-5.38-1.479l-.385-.23-3.64.948.971-3.51-.256-.4C2.33 15.69 1.8 13.882 1.8 12c0-5.624 4.576-10.2 10.2-10.2 2.723 0 5.285 1.06 7.213 2.988A10.134 10.134 0 0 1 22.2 12c0 5.624-4.576 10.2-10.2 10.2zm5.518-7.535c-.3-.15-1.78-.88-2.057-.982-.278-.102-.482-.15-.683.15-.2.302-.78.981-.956 1.182-.178.2-.355.226-.656.075-1.3-.65-2.222-1.15-3.048-2.564-.176-.301-.01-.462.14-.613.136-.134.3-.351.451-.527.15-.177.2-.302.3-.503.102-.2.05-.377-.025-.527-.075-.15-.683-1.66-.935-2.264-.247-.594-.497-.514-.683-.524-.178-.01-.383-.01-.588-.01-.205 0-.539.076-.822.378-.282.302-1.077 1.056-1.077 2.576 0 1.52 1.107 2.99 1.258 3.193.15.202 2.178 3.328 5.28 4.665.736.317 1.312.507 1.764.65.736.233 1.408.2 1.938.121.59-.088 1.782-.729 2.03-1.433.25-.704.25-1.307.175-1.433-.075-.126-.27-.202-.572-.352z" />
  </svg>
);

export default function PremiumWelcomeUpgrade({ lang, onBookUpgrade, customImages }: PremiumWelcomeUpgradeProps) {
  const finalImages = (customImages && customImages.length > 0) ? customImages : UPGRADE_IMAGES;
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const basePricePerNight = 125; 
  const discountedPricePerNight = 110; 

  // Translation helper function
  const t = (es: string, en: string, fr?: string, ar?: string): string => {
    if (lang === 'ar') return ar || en || es;
    if (lang === 'fr') return fr || en || es;
    if (lang === 'en') return en || es;
    return es;
  };

  const calculateStayNights = () => {
    if (!checkIn || !checkOut) return 3; // Default preview nights
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || d1 >= d2) return 1;
    return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  };

  const stayNights = calculateStayNights();
  const rawTotalPrice = stayNights * basePricePerNight;
  const discountedTotalPrice = stayNights * discountedPricePerNight;

  // Handle traditional online booking simulation
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookUpgrade({
      roomName: 'Habitación Confort Hostal Serramar',
      pricePerNight: discountedPricePerNight,
      nights: stayNights,
      totalPrice: discountedTotalPrice,
      guestName: t('Invitado Preferente', 'Preferred Guest', 'Invité Privilégié', 'ضيف مميز'),
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: guests
    });
  };

  // WhatsApp link generator with customized details
  const getWhatsAppLink = () => {
    const phoneNumber = "34683571614"; // Spanish format without leading 00
    const spanishMessage = `¡Hola, Hostal Serramar! Me gustaría reservar de forma directa vuestras habitaciones en la pensión. ¿Tienen disponibilidad para las fechas del ${checkIn || '__'} al ${checkOut || '__'} para ${guests} ${guests === 1 ? 'persona' : 'personas'}? Muchas gracias.`;
    const englishMessage = `Hello, Hostal Serramar! I would like to directly book a room at your guest house. Do you have availability from ${checkIn || '__'} to ${checkOut || '__'} for ${guests} ${guests === 1 ? 'guest' : 'guests'}? Thank you.`;
    const frenchMessage = `Bonjour, Hostal Serramar! Je souhaite réserver en direct une chambre dans votre pension. Avez-vous des disponibilités du ${checkIn || '__'} au ${checkOut || '__'} pour ${guests} ${guests === 1 ? 'personne' : 'personnes'}? Merci beaucoup.`;
    const arabicMessage = `مرحباً هوستال سيرامار! أود حجز غرفة مباشرة في البنسيون. هل لديكم توفر للفترة من ${checkIn || '__'} إلى ${checkOut || '__'} لعدد ${guests} ${guests === 1 ? 'شخص' : 'أشخاص'}؟ شكراً لكم.`;
    
    const message = t(spanishMessage, englishMessage, frenchMessage, arabicMessage);
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section 
      className="relative overflow-hidden py-10 px-4 sm:px-8 bg-gradient-to-b from-slate-50/70 to-white text-slate-800 rounded-3xl border border-slate-100 shadow-xl" 
      id="premium-welcome-upgrade"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Visual Ambient Gold & Soft Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(197,160,89,0.08)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgba(197,160,89,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Compact Elegant Luxury Header */}
        <div className="flex flex-col items-center justify-center space-y-5 max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-amber-200"></div>
            <span className="text-xs font-medium text-amber-700 uppercase tracking-[0.3em] font-sans">
              {t('PENSIÓN FAMILIAR', 'OFFICIAL GUEST HOUSE', 'PENSION FAMILIALE', 'بنسيون عائلي موثوق')}
            </span>
            <div className="h-[1px] w-12 bg-amber-200"></div>
          </div>
          <h2 className="text-3xl sm:text-4.5xl font-light tracking-tight text-slate-900 font-serif">
            {t('La mejor pensión de Benalmádena', 'The Best Guest House in Benalmádena', 'La meilleure pension de Benalmádena', 'أفضل بنسيون في بينالمادينا')}
          </h2>
          <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base mx-auto">
            {t(
              'Te ofrecemos el confort sincero, la limpieza impecable y la atención personalizada de toda la vida. Disponemos de habitaciones individuales, dobles con camas de matrimonio o individuales, triples y cuádruples. Disfruta de Benalmádena con la tranquilidad y los mejores precios directamente en nuestra web.',
              'Offering sincere comfort, immaculate cleanliness, and our traditional personalized care. We feature individual rooms, double rooms with double or twin beds, triples, and quadruples. Enjoy Benalmádena with absolute peace of mind and the best rates directly on our website.',
              'Nous offrons un confort sincère, une propreté impeccable et un accueil familial chaleureux. Nous disposons de chambres individuelles, doubles (avec un grand lit ou des lits jumeaux), triples et quadruples. Profitez de Benalmádena en toute sérénité au meilleur prix direct.',
              'نقدم الراحة الحقيقية، النظافة المثالية والخدمة الشخصية المميزة. تتوفر لدينا غرف فردية، ثنائية (بأسرة مزدوجة أو منفصلة)، ثلاثية ورباعية للإيجار بأفضل الأسعار المباشرة.'
            )}
          </p>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          
          {/* Left Side: Sleek Image Gallery Block (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5 animate-fade-in">
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden border border-slate-100 shadow-md group flex-1">
              <img 
                src={finalImages[activeImageIdx]} 
                alt="Sun Kissed Apartment Spec" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              
              {/* Image dark edge vignette */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />

              {/* Floating Labels over Image */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                <div className="bg-white/95 backdrop-blur border border-slate-100 rounded-xl px-3 py-2 text-[11px] max-w-[70%] shadow-sm">
                  <p className="font-extrabold text-amber-800">
                    {activeImageIdx === 0 && t('🛌 Habitaciones Dobles de Matrimonio', '🛌 Double Rooms and Suites', '🛌 Chambres Doubles Confort', '🛌 غرف زوجية مريحة')}
                    {activeImageIdx === 1 && t('🛌 Habitaciones Individuales Confort', '🛌 Single Cozy Rooms', '🛌 Chambres Individuelles', '🛌 غرف فردية مستقرة')}
                    {activeImageIdx === 2 && t('🛌 Habitaciones Triples y Familiares', '🛌 Triple & Family Layouts', '🛌 Chambres Triples & Quintuples', '🛌 غرف ثلاثية وعائلية واسعة')}
                    {activeImageIdx === 3 && t('🧴 Baño Privado e Higiene Diaria', '🧴 Private Bathroom & Amenities', '🧴 Salles de Bain Privées Propres', '🧴 حمامات خاصة نظيفة ومجهزة')}
                  </p>
                  <p className="text-[9.5px] text-slate-500 mt-0.5">
                    {t('Hostal Serramar • Habitaciones Cómodas', 'Hostal Serramar • Cozy Guest Rooms', 'Hostal Serramar • Chambres Douillettes', 'هوستال سيرامار • غرف نوم مريحة')}
                  </p>
                </div>

                <div className="flex gap-1.5">
                  <span className="bg-amber-500 text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                    {t('RECOMENDADO', 'CROWN SELECTED', 'RECOMMANDÉ', 'موصى به وعالي التصنيف')}
                  </span>
                </div>
              </div>

              {/* Interactive Left/Right chevron handles */}
              <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2 pointer-events-none">
                <button 
                  type="button"
                  onClick={() => setActiveImageIdx((p) => (p === 0 ? finalImages.length - 1 : p - 1))}
                  className="p-1.5 rounded-full bg-white/95 text-amber-600 border border-slate-100 hover:bg-white hover:scale-105 pointer-events-auto transition cursor-pointer shadow-md"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveImageIdx((p) => (p === finalImages.length - 1 ? 0 : p + 1))}
                  className="p-1.5 rounded-full bg-white/95 text-amber-600 border border-slate-100 hover:bg-white hover:scale-105 pointer-events-auto transition cursor-pointer shadow-md"
                  aria-label="Next Image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 gap-3">
              {finalImages.map((imgUrl, idx) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[16/10] rounded-xl overflow-hidden border transition-all ${
                    activeImageIdx === idx ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-sm' : 'border-slate-200/70 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Included Luxury High-end Benefits mini-row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-2.5 items-center shadow-xs">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Coffee className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-bold text-slate-800">
                    {t('Desayuno Real Incluido', 'Complimentary Royal Breakfast', 'Petit-Déjeuner Royal Inclus', 'إفطار ملكي متكامل مشمول')}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {t('🥐 Café selecto, zumo natural y repostería', '🥐 Artisan morning coffee, pastries and juice', '🥐 Café de sélection, jus d\'orange pressé et viennoiseries', '🥐 قهوة منتقاة، عصير فواكه طازج ومخبوزات')}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-3 flex gap-2.5 items-center shadow-xs">
                <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Wifi className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-bold text-slate-800">
                    {t('Ancho de Banda Simétrico 1 Gbps', '1 Gbps Ultra Dedicated Fiber', 'Fibre Symétrique Dédiée 1 Gbps', 'إنترنت ألياف ضوئية فائق السرعة 1 جيجابت')}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {t('💻 Router exclusivo de alta potencia', '💻 Private high-speed router connection', '💻 Routeur haute puissance exclusif', '💻 شبكة واي فاي وجهاز توجيه خاص فائق القوة')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Ultra Elegant WhatsApp & Online Checkout Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* FIRST ACTION: HIGHLY VISUAL WHATSAPP DIRECT BOOKING */}
            <div className="bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-500/15 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/12 bg-emerald-500/5 text-emerald-500 text-xs font-black uppercase tracking-widest px-4 py-8 rounded-full pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-500">
                <WhatsAppIcon className="h-16 w-16 text-emerald-500" />
              </div>
              
              <div className="space-y-1.5 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest font-mono">
                    {t('RESERVA INSTANTÁNEA WHATSAPP', 'FAST WHATSAPP BOOKING', 'RÉSERVATION EXPRESS WHATSAPP', 'حجز فوري عبر واتساب')}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-1.5">
                  {t('Reserva Directa por WhatsApp', 'Direct WhatsApp Concierge', 'Réservation Directe par WhatsApp', 'حجز مباشر وسهل على واتساب')}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {t(
                    '¿Prefiere una atención humana, directa y sin comisiones? Chatee en vivo con nuestro equipo de reservas para asegurar su fecha ahora.',
                    'Do you prefer chatting with a real human agent with no third-party markups? Drop us a line directly on WhatsApp now.',
                    'Vous préférez un service humain, direct et sans frais de dossier ? Discutez en direct avec notre équipe pour bloquer vos dates.',
                    'هل تفضل خدمة تواصل بشرية مباشرة ومجانية بالكامل؟ تحدث معنا مباشرة على واتساب لتأكيد مواعيد إقامتك الآن.'
                  )}
                </p>
              </div>

              <div className="space-y-2.5 relative z-10 pt-1">
                {/* Visual number tag */}
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-800 px-3 py-1.5 bg-emerald-50/40 rounded-xl border border-emerald-100/50">
                  <span className="text-slate-500">{t('Recepción de Guardia', 'Duty Reception', 'Service Réception', 'استقبال يعمل على مدار الساعة')}:</span>
                  <span className="font-bold text-emerald-700">+34 683 571 614</span>
                </div>

                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-xs tracking-widest font-mono border border-emerald-400/25 active:scale-98"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5 animate-pulse" />
                  <span>{t('CHAT & RESERVAR YA', 'CHAT & BOOK NOW', 'DISCUTER & RÉSERVER', 'تواصل واحجز الآن')}</span>
                </a>
              </div>
            </div>

            {/* SECOND ACTION: THE SLEEK AIRBNB EST TIMELINES GENERATOR */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex justify-between items-baseline border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xl font-bold font-mono text-amber-600">€{discountedPricePerNight}</span>
                  <span className="text-[10px] text-slate-500">/{t('noche', 'night', 'nuit', 'ليلة')}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through">€{basePricePerNight}</span>
                  <span className="text-[10.5px] text-emerald-600 font-bold block">
                    -{t('12% Extra Web', '12% Web Rate', '12% Remise Web', 'خصم الموقع الإلكتروني %12')}
                  </span>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-2 text-[9.5px] font-extrabold text-slate-500 tracking-wider uppercase font-mono">
                  <div>
                    <label className="block mb-1">{t('ENTRADA', 'CHECK-IN', 'ARRIVÉE', 'وصول')}</label>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-slate-50 border border-slate-200/90 rounded-lg p-2 text-slate-800 text-xs w-full focus:outline-none focus:ring-1 focus:ring-amber-500 text-center"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">{t('SALIDA', 'CHECK-OUT', 'DÉPART', 'مغادرة')}</label>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="bg-slate-50 border border-slate-200/90 rounded-lg p-2 text-slate-800 text-xs w-full focus:outline-none focus:ring-1 focus:ring-amber-500 text-center"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-7">
                    <label className="block text-[9px] font-extrabold text-slate-500 tracking-wider uppercase font-mono mb-1">
                      {t('OCUPACIÓN', 'GUESTS', 'VOYAGEURS', 'النزلاء')}
                    </label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="bg-slate-50 border border-slate-200/90 rounded-lg p-2 text-slate-800 text-xs w-full focus:outline-none text-left"
                    >
                      <option value={1}>1 {t('Persona', 'Guest', 'Personne', 'شخص واحد')}</option>
                      <option value={2}>2 {t('Personas', 'Guests', 'Personnes', 'شخصان')}</option>
                      <option value={3}>3 {t('Personas', 'Guests', 'Personnes', '3 أشخاص')}</option>
                      <option value={4}>4 {t('Grupo Máx (4)', 'Max Guests (4)', 'Groupe Max (4)', 'مجموعة بحد أقصى 4')}</option>
                    </select>
                  </div>
                  <div className="col-span-5 text-right font-mono text-[11px] text-slate-500">
                    <p className="text-[9.5px] uppercase text-slate-400">{t('Estancia', 'Nights', 'Séjour', 'الإقامة')}:</p>
                    <p className="font-extrabold text-slate-705 text-slate-700 text-xs mt-0.5">{stayNights} {t('noches', 'nights', 'nuits', 'ليالي')}</p>
                  </div>
                </div>

                {/* Simulated Rate Quote Breakdown */}
                <div className="pt-2 border-t border-slate-100 text-[11px] font-mono space-y-1.5 text-slate-500">
                  <div className="flex justify-between">
                    <span>€{discountedPricePerNight} x {stayNights} {t('noches', 'nights', 'nuits', 'ليالي')}</span>
                    <span className="font-bold text-slate-700">€{discountedTotalPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1.5 border-t border-dashed border-slate-200">
                    <span className="text-xs font-bold text-slate-500 font-sans">{t('Total', 'Total Quote', 'Total approximatif', 'الإجمالي التقديري')}</span>
                    <span className="text-base font-black text-amber-600 font-mono">€{discountedTotalPrice}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-900 text-amber-400 font-extrabold uppercase py-3 rounded-xl transition duration-200 text-[10.5px] tracking-widest font-mono cursor-pointer active:scale-98"
                >
                  🛎️ {t('CONTINUAR RESERVA', 'CONTINUE BOOKING', 'CONTINUER LA RÉSERVATION', 'متابعة الحجز')}
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
