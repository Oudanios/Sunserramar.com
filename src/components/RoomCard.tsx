import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Wind, 
  Tv, 
  Users, 
  Flame, 
  CalendarCheck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  lang: 'es' | 'en' | 'fr' | 'ar';
  ratesVerified?: boolean;
  onBookDirect: (room: Room) => void;
  key?: string | number;
}

export default function RoomCard({ room, lang, ratesVerified = false, onBookDirect }: RoomCardProps) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const imagesList = room.images && room.images.length > 0 ? room.images : [room.image];

  const t = (es: string, en: string, fr: string, ar: string) => {
    if (lang === 'es') return es;
    if (lang === 'fr') return fr;
    if (lang === 'ar') return ar;
    return en;
  };

  const getTranslatedRoomNameAndDesc = () => {
    if (room.id === 'doble-privado') {
      return {
        name: t(
          'Habitación Doble con Baño Privado',
          'Double Room with Private Bathroom',
          'Chambre Double avec Salle de Bain Privée',
          'غرفة مزدوجة مع حمام خاص'
        ),
        desc: t(
          'Nuestra habitación más solicitada para parejas. Presenta una decoración sencilla y acogedora con muebles de madera de pino, equipada con una cómoda cama doble, baño completo privado dentro de la habitación, climatización y suelo de baldosa tradicional.',
          'Our most popular room for couples. Features simple, welcoming decor with classic solid pine wood furniture, a comfortable double bed, a full en-suite private bathroom, climate control/fan, and traditional tiled flooring.',
          'Notre chambre la plus demandée pour les couples. Dispose d’un décor simple et accueillant avec des meubles classiques en pin massif, un lit double confortable, une salle de bain privée, de la climatisation et un sol carrelé traditionnel.',
          'غرفتنا الأكثر طلبًا للأزواج. تتميز بديكور بسيط وترحيبي مع أثاث كلاسيكي من خشب الصنوبر الصلب، وسرير مزدوج مريح، وحمام خاص كامل داخل الغرفة، وتكييف هواء أرضية بلاط تقليدية.'
        )
      };
    }
    if (room.id === 'triple-privado') {
      return {
        name: t(
          'Habitación Triple con Baño Privado',
          'Triple Room with Private Bathroom',
          'Chambre Triple avec Salle de Bain Privée',
          'غرفة ثلاثية مع حمام خاص'
        ),
        desc: t(
          'Perfecta para pequeñas familias o grupo de tres amigos. Cuenta con tres cómodas camas individuales o una cama doble y una individual de pino español, abundante luz natural, decoración sencilla, baño privado completo y ventilador de techo o aire acondicionado.',
          'Perfect for small families or groups of three friends. Features three cozy single beds (or one double and one single) made of Spanish pine wood, abundant natural light, simple decor, a full private bathroom, and a ceiling fan or A/C.',
          'Parfaite pour les petites familles ou les groupes de trois amis. Dispose de trois lits simples confortables (ou un double et un simple) en pin d’Espagne, de beaucoup de lumière naturelle, d’un décor simple, d’une salle de bain privée complète et d’un ventilateur ou de la climatisation.',
          'مثالية للعائلات الصغيرة أو المجموعات المكونة من ثلاثة أصدقاء. تحتوي على ثلاثة أسرة فردية مريحة أو سرير مزدوج وسرير فردي مصنع من خشب الصنوبر الإسباني، وإضاءة طبيعية وفيرة، وديكور بسيط، وحمام خاص كامل ومروحة سقف أو تكييف هواء.'
        )
      };
    }
    if (room.id === 'cuadruple-privado') {
      return {
        name: t(
          'Habitación Familiar Cuádruple (Baño Privado)',
          'Quadruple Family Room (Private Bathroom)',
          'Chambre Familiale Quadruple (Salle de Bain Privée)',
          'غرفة عائلية رباعية (حمام خاص)'
        ),
        desc: t(
          'Nuestra habitación más grande y espaciosa, ideal para familias. Dispone de camas individuales en madera de pino o distribuciones mixtas, ventilador de techo o climatización, gran armario rústico, suelo de baldosa y baño privado completo.',
          'Our largest and most spacious room, ideal for families. Features solid pine wood single beds or custom mixed bedding, ceiling fan or A/C, a large rustic pine wardrobe, classic tiles, and full private bathroom.',
          'Notre chambre la plus grande et la plus spacieuse, idéale pour les familles. Dispose de lits simples en pin massif ou de lits mixtes, d’un ventilateur ou de la climatisation, d’une grande armoire rustique, de carrelage classique et d’une salle de bain privée complète.',
          'غرفتنا الأكبر والأكثر اتساعًا، مثالية للعائلات. تتميز بأسرة فردية مصنوعة من خشب الصنوبر الصلب، ومروحة سقف أو تكييف هواء، وخزانة ملابس ريفية كبيرة من خشب الصنوبر البسيط، وتصميم كلاسيكي، وحمام خاص كامل.'
        )
      };
    }
    if (room.id === 'doble-compartido') {
      return {
        name: t(
          'Habitación Doble Económica (Baño Compartido)',
          'Budget Double Room (Shared Bathroom)',
          'Chambre Double Économique (Salle de Bain Commune)',
          'غرفة مزدوجة اقتصادية (حمام مشترك)'
        ),
        desc: t(
          'La opción con mejor relación calidad-precio. Disfruta de una acogedora cama doble con decoración sencilla, muebles tradicionales de pino, ventilador silencioso en el techo y acceso directo a baños compartidos impecables en el pasillo (con desinfección constante).',
          'Our best-value cozy option. Enjoy a comfortable double bed featuring simple decor, traditional pine wood furniture, a quiet ceiling fan, and direct access to pristine shared hallway bathrooms (cleaned and disinfected multiple times daily).',
          'L’option au meilleur rapport qualité-prix. Profitez d’un lit double douillet avec un décor simple, de meubles en pin traditionnels, d’un ventilateur de plafond silencieux et d’un accès direct à de superbes salles de bain communes impeccables dans le couloir (nettoyées et désinfectées plusieurs fois par jour).',
          'الخيار الأفضل من حيث القيمة والتكلفة. استمتع بسرير مزدوج مريح يتميز بديكور بسيط وأثاث تقليدي من خشب الصنوبر، ومروحة سقف هادئة، ووصول مباشر إلى حمامات مشتركة نظيفة للغاية في الممر (يتم تنظيفها وتطهيرها باستمرار).'
        )
      };
    }
    if (room.id === 'individual-compartido') {
      return {
        name: t(
          'Habitación Individual Económica (Baño Compartido)',
          'Budget Single Room (Shared Bathroom)',
          'Chambre Individuelle Économique (Salle de Bain Commune)',
          'غرفة فردية اقتصادية (حمام مشترك)'
        ),
        desc: t(
          'Perfecta para aventureros solitarios y profesionales. Habitación acogedora con cama individual, decoración sencilla, mesa auxiliar y armario de pino, ventilador silencioso de techo, Wi-Fi rápido y acceso a excelentes baños comunes siempre limpios.',
          'Perfect for solo travelers and business individuals. A cozy room featuring a single bed, simple decor, pine wood side table and wardrobe, a quiet ceiling fan, high-speed Wi-Fi, and access to immaculate shared bathrooms.',
          'Parfaite pour les voyageurs en solo et les professionnels. Une chambre douillette avec un lit simple, un décor simple, une table d’appoint et une armoire en pin, un ventilateur de plafond silencieux, une connexion Wi-Fi rapide et un accès à de superbes salles de bain communes toujours propres.',
          'مثالية للمسافرين المنفردين ورجال الأعمال. غرفة دافئة ومريحة تحتوي على سرير فردي، وديكور بسيط، وطاولة جانبية وخزانة من خشب الصنوبر، ومروحة سقف هادئة، وإنترنت لاسلكي سريع، ووصول دائم إلى حمامات مشتركة نظيفة.'
        )
      };
    }
    return { 
      name: t(room.name, room.nameEn, room.nameFr || '', room.nameAr || ''), 
      desc: t(room.description, room.descriptionEn, room.descriptionFr || '', room.descriptionAr || '') 
    };
  };

  const getTranslatedAmenity = (am: string) => {
    const amLower = am.toLowerCase();
    if (amLower.includes('baño privado') || amLower.includes('private bathroom')) {
      return t('Baño Privado', 'Private Bathroom', 'Salle de Bain Privée', 'حمام خاص');
    }
    if (amLower.includes('baño compartido') || amLower.includes('shared bathroom')) {
      return t('Baño Compartido', 'Shared Bathroom', 'Salle de Bain Commune', 'حمام مشترك');
    }
    if (amLower.includes('aire acondicionado') || amLower.includes('air conditioning')) {
      return t('Aire Acondicionado', 'Air Conditioning', 'Climatisation', 'تكييف هواء');
    }
    if (amLower.includes('ventilador') || amLower.includes('ceiling fan') || amLower.includes('fan')) {
      return t('Ventilador de Techo', 'Ceiling Fan', 'Ventilateur de Plafond', 'مروحة سقف');
    }
    if (amLower.includes('smart tv') || amLower.includes('television') || amLower.includes('tv')) {
      return t('Smart TV', 'Smart TV', 'Télévision Connectée', 'تلفزيون ذكي');
    }
    if (amLower.includes('wi-fi gratis') || amLower.includes('free wi-fi') || amLower.includes('wi-fi')) {
      return t('Wi-Fi Gratis', 'Free High-speed Wi-Fi', 'Wi-Fi Gratuit Rapide', 'إنترنت لاسلكي مجاني');
    }
    if (amLower.includes('muebles de pino') || amLower.includes('pine wood') || amLower.includes('furniture')) {
      return t('Muebles de Pino', 'Solid Pine Furniture', 'Meubles en Pin', 'أثاث خشب الصنوبر');
    }
    if (amLower.includes('suelo de baldosa') || amLower.includes('tiled floor')) {
      return t('Suelo de Baldosa', 'Tiled Flooring', 'Sol Carrelé', 'أرضية بلاط');
    }
    if (amLower.includes('ropa de cama') || amLower.includes('bed linens') || amLower.includes('towels')) {
      return t('Ropa de Cama & Toallas', 'Linens & Clean Towels', 'Draps & Serviettes Propres', 'بياضات ومناشف');
    }
    if (amLower.includes('armario') || amLower.includes('wardrobe')) {
      return t('Armario', 'Rustic Wardrobe', 'Armoire Rustique', 'خزانة ملابس');
    }
    if (amLower.includes('escritorio') || amLower.includes('desk')) {
      return t('Escritorio', 'Work Desk', 'Bureau de Travail', 'مكتب عمل');
    }
    if (amLower.includes('espejo') || amLower.includes('mirror')) {
      return t('Espejo de Cuerpo', 'Full-Length Mirror', 'Grand Miroir', 'مرآة');
    }
    return am;
  };

  const translatedInfo = getTranslatedRoomNameAndDesc();

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition duration-500 flex flex-col group overflow-hidden h-full"
      id={`room-${room.id}`}
    >
      {/* Photo Area with Multi-Image Slider */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImgIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={imagesList[currentImgIdx]} 
            alt={`${room.name} ${currentImgIdx + 1}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Soft overlay gradient for typography readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

        {/* Bathroom Sticker with warm design */}
        <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur border border-slate-700/85 text-white font-semibold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md z-10">
          {room.bathroom === 'private' 
            ? (lang === 'es' ? '🔑 Baño Privado' : '🔑 Private Bathroom') 
            : (lang === 'es' ? '🚿 Baño Compartido' : '🚿 Shared Bathroom')}
        </span>

        {/* Maximum Occupancy guests label */}
        <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur text-slate-800 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
          <Users className="h-3.5 w-3.5 text-amber-550" />
          <span>Max: {room.maxGuests} {room.maxGuests === 1 ? (lang === 'es' ? 'persona' : 'guest') : (lang === 'es' ? 'personas' : 'guests')}</span>
        </span>

        {/* Image Slider Controls - Show arrows if more than 1 image exists */}
        {imagesList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-auto hover:scale-105 active:scale-95 z-20 cursor-pointer"
              aria-label="Previous Image"
              id={`prev-btn-${room.id}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-auto hover:scale-105 active:scale-95 z-20 cursor-pointer"
              aria-label="Next Image"
              id={`next-btn-${room.id}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Slider Dots indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {imagesList.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentImgIdx(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImgIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${i+1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-sans">
        <div className="space-y-2.5">
          <h3 className="font-medium text-xl text-slate-900 group-hover:text-amber-600 transition duration-300 tracking-tight leading-snug font-serif">
            {translatedInfo.name}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed text-justify line-clamp-3 font-light">
            {translatedInfo.desc}
          </p>
        </div>

        {/* Custom Visual Tag Checklist for Amenities */}
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {(lang === 'es' ? room.amenities : room.amenitiesEn).map((am, i) => {
            const translatedAmenity = getTranslatedAmenity(am);
            return (
              <span 
                key={i} 
                className="bg-slate-50 border border-slate-100 text-slate-605 text-[10.5px] font-medium py-1 px-2.5 rounded-md flex items-center gap-1.5 transition hover:bg-white duration-200"
              >
                {am.includes('Wi-Fi') && <Wifi className="h-3 w-3 text-amber-500 shrink-0" />}
                {am.includes('Aire') && <Wind className="h-3 w-3 text-amber-400 shrink-0" />}
                {am.includes('TV') && <Tv className="h-3 w-3 text-amber-500 shrink-0" />}
                <span>{translatedAmenity}</span>
              </span>
            );
          })}
        </div>

        {/* Pricing tag & Direct Button action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-sky-700 font-extrabold uppercase tracking-wide leading-none mb-1 flex items-center gap-1">
              <span>🏨</span>
              <span>{t('Tarifa Cloudbeds', 'Cloudbeds Rate', 'Tarif Cloudbeds', 'سعر كلاودبدز')}</span>
            </span>
            <div className="flex items-baseline gap-1.5">
              {ratesVerified ? (
                <>
                  <span className="text-2xl font-black text-slate-900 transition-all duration-300">€{room.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/{t('noche', 'night', 'nuit', 'ليلة')}</span>
                </>
              ) : (
                <span className="text-xs font-semibold text-amber-700">
                  {t('Sincronizando tarifa oficial...', 'Syncing official rate...', 'Synchronisation du tarif officiel...', 'جارِ مزامنة السعر الرسمي...')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => onBookDirect(room)}
            disabled={!ratesVerified}
            className="bg-white/90 hover:bg-sky-50 backdrop-blur text-sky-600 hover:text-sky-700 border border-sky-150 font-extrabold py-3 px-5 sm:px-6 rounded-xl text-xs tracking-wide transition-all duration-350 cursor-pointer shadow-sm hover:shadow-md hover:shadow-sky-100/40 active:scale-95 flex items-center gap-1.5 uppercase font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            id={`book-btn-${room.id}`}
          >
            <CalendarCheck className="h-4 w-4 text-sky-500" />
            <span>{ratesVerified ? t('RESERVAR', 'BOOK NOW', 'RÉSERVER', 'احجز الآن') : t('SINCRONIZANDO', 'SYNCING', 'SYNCHRO', 'جارِ المزامنة')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
