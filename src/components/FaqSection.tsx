import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Clock, 
  ShieldCheck, 
  VolumeX, 
  Ban, 
  Car, 
  Navigation, 
  Wifi, 
  Briefcase, 
  Coffee, 
  Thermometer, 
  Search, 
  Tag,
  Users
} from 'lucide-react';

interface FaqSectionProps {
  lang: 'es' | 'en' | 'fr' | 'ar';
}

interface FAQItem {
  id: string;
  category: 'policies' | 'parking' | 'services';
  icon: any;
  qEs: string;
  qEn: string;
  qFr: string;
  qAr: string;
  aEs: string;
  aEn: string;
  aFr: string;
  aAr: string;
}

export default function FaqSection({ lang }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'policies' | 'parking' | 'services'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Helper translation function
  const t = (es: string, en: string, fr?: string, ar?: string): string => {
    if (lang === 'ar') return ar || en || es;
    if (lang === 'fr') return fr || en || es;
    if (lang === 'en') return en || es;
    return es;
  };

  const faqItems = useMemo<FAQItem[]>(() => [
    {
      id: 'checking-hours',
      category: 'policies',
      icon: Clock,
      qEs: '¿Cuáles son las horas de Entrada (Check-In) y Salida (Check-Out) oficiales?',
      qEn: 'What are the official Check-In and Check-Out hours?',
      qFr: 'Quels sont les horaires d\'arrivée (Check-In) et de départ (Check-Out) officiels ?',
      qAr: 'ما هي مواعيد تسجيل الوصول والمغادرة الرسمية؟',
      aEs: 'El horario de entrada (Check-In) oficial es de las 13:00h a las 22:30h. Si planeas llegar más tarde, avísanos con antelación y te facilitaremos un código de acceso para un registro de entrada autónomo rápido y seguro. El horario de salida (Check-Out) establecido es de las 07:00h a las 11:30h.',
      aEn: 'Official check-in hours are from 1:00 PM to 10:30 PM. If you plan to arrive later, please let us know in advance and we will provide you with a secure access code for a fast, contactless self-check-in. Check-out must be completed between 7:00 AM and 11:30 AM.',
      aFr: 'L\'enregistrement officiel s\'effectue de 13h00 à 22h30. Si vous prévoyez d\'arriver plus tard, veuillez nous en informer à l\'avance afin que nous vous fournissions un code d\'accès pour un enregistrement autonome simple et sécurisé. La chambre doit être libérée entre 07h00 et 11h30.',
      aAr: 'مواعيد تسجيل الوصول الرسمية هي من الساعة 1:00 ظهراً حتى 10:30 مساءً. إذا كنت تخطط للوصول بعد ذلك، يرجى إبلاغنا مسبقاً وسنزودك برمز مرور آمن لتسجيل الوصول الذاتي السريع. يجب مغادرة الغرفة بين الساعة 7:00 صباحاً و 11:30 صباحاً.'
    },
    {
      id: 'smoking-policy',
      category: 'policies',
      icon: Ban,
      qEs: '¿Se permite fumar en las habitaciones o áreas comunes?',
      qEn: 'Is smoking allowed in private rooms or common areas?',
      qFr: 'Est-il permis de fumer dans les chambres ou les espaces communs ?',
      qAr: 'هل يُسمح بالتدخين داخل الغرف أو في المساحات المشتركة؟',
      aEs: 'No, el Hostal Serramar es un establecimiento 100% libre de humo. Está terminantemente prohibido fumar tanto dentro de las habitaciones como en todas las zonas comunes interiores para mantener el aire limpio y la seguridad de todos.',
      aEn: 'No, Hostal Serramar is a 100% smoke-free property. Smoking is strictly prohibited inside all guest bedrooms as well as in all indoor common spaces to ensure a healthy and safe environment for everyone.',
      aFr: 'Non, l\'Hostal Serramar est un établissement 100% non-fumeur. Il est strictement interdit de fumer à l\'intérieur des chambres ainsi que dans toutes les parties communes intérieures pour assurer la sécurité et le confort de tous.',
      aAr: 'لا، بيت الضيافة سيرامار هو منشأة خالية تماماً من التدخين بنسبة 100%. يُمنع منعاً باتاً التدخين داخل جميع غرف الضيوف وفي جميع الممرات والمساحات المشتركة المغلقة لضمان سلامة وصحة الجميع.'
    },
    {
      id: 'children-beds',
      category: 'policies',
      icon: Users,
      qEs: '¿Se admiten niños y disponen de cunas o camas supletorias?',
      qEn: 'Are children welcome, and do you provide extra beds or baby cots?',
      qFr: 'Les enfants sont-ils admis et proposez-vous des lits bébés ou d\'appoint ?',
      qAr: 'هل ترحبون بالأطفال وهل تتوفر لديكم أسرة إضافية للأطفال الرضع؟',
      aEs: 'Sí, se pueden alojar niños de cualquier edad. Sin embargo, tenga en cuenta que el establecimiento no dispone de cunas ni de camas supletorias disponibles.',
      aEn: 'Yes, children of all ages are welcome at Hostal Serramar. However, please note that no baby cots or extra beds are available at the property.',
      aFr: 'Oui, les enfants de tous âges sont les bienvenus à l\'Hostal Serramar. Veuillez toutefois noter qu\'aucun lit bébé ni lit d\'appoint n\'est disponible dans l\'établissement.',
      aAr: 'نعم، نرحب بالأطفال من جميع الأعمار في بيت ضيافة سيرامار. مع ذلك، يرجى العلم بأنه لا تتوفر أي أسرة إضافية أو أسرة للأطفال الرضع داخل المنشأة.'
    },
    {
      id: 'cancellation-policy',
      category: 'policies',
      icon: ShieldCheck,
      qEs: '¿Cuál es la política de cancelación de reservas directas?',
      qEn: 'What is the refund and cancellation policy for direct bookings?',
      qFr: 'Quelle est la politique d\'annulation pour les réservations directes ?',
      qAr: 'ما هي سياسة إلغاء الحجز والاسترداد للحجوزات المباشرة؟',
      aEs: '¡Reservar en nuestra Web oficial tiene premio! Todas las reservas directas disfrutan de una política de cancelación premium sin coste hasta 48 horas antes del día de tu llegada. Si cancelas fuera de este plazo o no te presentas (no-show), se aplicará el cargo de la primera noche de estancia.',
      aEn: 'Booking directly on our official website features special benefits! All direct reservations enjoy a premium, flexible cancellation policy with zero penalty up to 48 hours prior to your scheduled arrival. Late cancellations or no-shows will incur a charge equal to the first night.',
      aFr: 'Réserver directement sur notre site officiel offre des avantages ! Toutes nos réservations directes bénéficient d\'une politique d\'annulation premiums sans frais jusqu\'à 48 heures avant votre arrivée. En cas d\'annulation tardive ou de non-présentation, la première nuit sera facturée.',
      aAr: 'الحجز المباشر عبر موقعنا الرسمي يمنحك مزايا خاصة! تتمتع جميع الحجوزات المباشرة بسياسة إلغاء مرنة ومجانية بالكامل حتى 48 ساعة قبل موعد الوصول المحدد. في حالة الإلغاء المتأخر أو عدم الحضور, سيتم فرض رسوم الليلة الأولى فقط.'
    },
    {
      id: 'quiet-hours',
      category: 'policies',
      icon: VolumeX,
      qEs: '¿Existen normas sobre el ruido o políticas de descanso?',
      qEn: 'Are there specific quiet hours or community noise rules?',
      qFr: 'Y a-t-il des règles concernant le bruit ou des heures de silence ?',
      qAr: 'هل هناك قواعد محددة لتهدئة الأصوات وساعات الهدوء؟',
      aEs: 'Sí, para salvaguardar el descanso de nuestros huéspedes (familias, atletas y nómadas digitales), las horas de silencio están fijadas de 22:30h a 08:30h. Quedan terminantemente prohibidas las fiestas, altavoces o música elevada durante las 24 horas del día.',
      aEn: 'Yes, to secure a peaceful and refreshing sleep for everyone (families, sports enthusiasts, and digital nomads), quiet hours are from 10:35 PM to 8:30 AM. Parties, speaker systems, and loud music are strictly forbidden in all areas of the hostel 24/7.',
      aFr: 'Oui, afin d\'assurer un sommeil paisible à chacun (familles, sportifs et nomades digitaux), les heures de repos sont fixées de 22h30 à 08h30. Les fêtes et la musique forte sont strictement interdites dans tout l\'établissement 24h/24.',
      aAr: 'نعم، لضمان نوم مريح وهادئ للجميع (العائلات والرياضيين والرحالة الرقميين)، تم تحديد ساعات الهدوء من الساعة 10:30 مساءً حتى 8:30 صباحاً. يُمنع منعاً باتاً إقامة الحفلات أو تشغيل الموسيقى الصاخبة طوال الـ 24 ساعة.'
    },
    {
      id: 'pets-allowed',
      category: 'policies',
      icon: Ban,
      qEs: '¿Se admiten mascotas en las habitaciones?',
      qEn: 'Are pets or assistance animals allowed in the rooms?',
      qFr: 'Les animaux de compagnie sont-ils acceptés dans les chambres ?',
      qAr: 'هل يُسمح باصطحاب الحيوانات الأليفة في الغرف؟',
      aEs: 'Por motivos rigurosos de higiene colectiva y prevención de alergias sanitarias, no se admiten mascotas de compañía de ningún tipo en los dormitorios. Sin embargo, los perros de asistencia o de terapia oficialmente homologados son plenamente bienvenidos previa notificación.',
      aEn: 'For strict reasons of collective allergy prevention and hygiene standards, household pets of any kind are not permitted in the bedrooms. However, certified service or support guide dogs are fully welcomed (please provide official documentation in advance).',
      aFr: 'Pour des raisons d\'hygiène collective et de prévention des allergies, les animaux domestiques ne sont pas admis dans les chambres. Cependant, les chiens d\'assistance ou de thérapie officiellement certifiés sont pleinement acceptés sur notification préalable.',
      aAr: 'لدواعي النظافة الصحية والوقاية من الحساسية، يُمنع تماماً اصطحاب الحيوانات الأليفة داخل غرف النوم. مع ذلك، نرحب ترحيباً كاملاً بكلاب الخدمة والمساعدة المعتمدة (يرجى تقديم الوثائق الرسمية مسبقاً).'
    },
    {
      id: 'parking-private',
      category: 'parking',
      icon: Car,
      qEs: '¿Ofrecen aparcamiento privado gratuito en el hostal?',
      qEn: 'Do you offer free private parking at the hostel?',
      qFr: 'Proposez-vous un parking privé gratuit à l\'établissement ?',
      qAr: 'هل يتوفر لديكم موقف سيارات خاص ومجاني؟',
      aEs: '¡Sí, totalmente gratis! Disponemos de aparcamiento privado gratuito dentro de las instalaciones del hostal. No es necesario realizar una reserva previa para hacer uso de él, lo que te garantiza total tranquilidad al llegar.',
      aEn: 'Yes, completely free of charge! We feature free private parking on site. No advance reservation is needed, ensuring you have a secure spot for your vehicle upon your arrival.',
      aFr: 'Oui, tout à fait gratuit ! Nous disposons d\'un parking privé gratuit au sein de l\'établissement. Aucune réservation n\'est requise, ce qui garantit la tranquillité d\'esprit dès votre arrivée.',
      aAr: 'نعم، ومجاني بالكامل! نوفر موقف سيارات خاص ومجاني داخل مبنى بيت الضيافة سيرامار. لا يلزم حجز مسبق للاستفادة منه، مما يضمن لك مكاناً آمناً لسيارتك فور وصولك.'
    },
    {
      id: 'parking-street',
      category: 'parking',
      icon: Navigation,
      qEs: '¿Es fácil encontrar aparcamiento público gratuito en la calle?',
      qEn: 'Is it easy to find free street parking around the area?',
      qFr: 'Est-il facile de trouver une place de stationnement gratuit dans la rue ?',
      qAr: 'هل يسهل العثور على مواقف مجانية للسيارات في الشارع المحيط؟',
      aEs: '¡Sí, es comodísimo! El Hostal Serramar está ubicado en una zona residencial abierta y tranquila que cuenta con abundantes plazas de estacionamiento público en los alrededores. No hay parquímetros, zonas azules de pago, ni restricciones horarias para aparcar en la calle de forma gratuita.',
      aEn: 'Yes, it is extremely convenient! Hostal Serramar is nestled within a spacious residential zone with lots of free public street parking spaces. There are no city meters, time restrictions, or blue-zone payment boundaries nearby, making it stress-free to park for free.',
      aFr: 'Oui, c\'est très pratique ! L\'Hostal Serramar est situé dans une zone résidentielle ouverte et calme offrant de nombreuses places de stationnement gratuit. Il n\'y a ni zone bleue de paiement, ni horodateur dans les environs immédiats.',
      aAr: 'نعم، الأمر مريح للغاية! يقع بيت الضيافة سيرامار في منطقة سكنية هادئة توفر مساحات شاسعة ومجانية تماماً لركن السيارات في الشوارع القريبة. لا توجد عدادات دفع أو قيود زمنية لركن السيارات مجاناً.'
    },
    {
      id: 'service-wifi',
      category: 'services',
      icon: Wifi,
      qEs: '¿La red Wi-Fi es de alta velocidad y segura para teletrabajar?',
      qEn: 'Is the Wi-Fi connection stable and fast enough for co-working?',
      qFr: 'La connexion Wi-Fi est-elle haut débit et adaptée au télétravail ?',
      qAr: 'هل شبكة الواي فاي سريعة ومستقرة ومناسبة للعمل عن بعد؟',
      aEs: '¡Por supuesto! Hemos desplegado fibra óptica simétrica dedicada de más de 300 Mbps y una red de puntos de acceso Wi-Fi 6 de grado empresarial instalados por toda la estructura para dar cobertura estable e instantánea tanto en habitaciones como terrazas y salón co-living.',
      aEn: 'Absolutely! We feature high-speed symmetrical business fiber optics scaling past 305 Mbps, supported by an array of enterprise-grade Wi-Fi 6 routers to preserve absolute signal stability inside private rooms, outer patio green terraces, and our co-living office.',
      aFr: 'Absolument ! Nous disposons d\'une connexion symétrique par fibre de plus de 300 Mbps soutenue par un réseau de points d\'accès professionnels Wi-Fi 6. La connexion est parfaitement stable dans les chambres privées ainsi que dans le salon de co-living.',
      aAr: 'بالتأكيد! نوفر اتصال ألياف بصرية متماثل فائق السرعة يتجاوز 300 ميجابت وموزع بأجهزة بث متطورة "Wi-Fi 6" لضمان ثبات الإشارة وسرعتها داخل الغرفة، المساحات المشتركة والحدائق.'
    },
    {
      id: 'service-luggage',
      category: 'services',
      icon: Briefcase,
      qEs: '¿Ofrecen servicio de consigna o guardaequipaje gratuito?',
      qEn: 'Do you offer a free, secure luggage storage room?',
      qFr: 'Proposez-vous une consigne gratuite pour les bagages ?',
      qAr: 'هل توفرون خدمة مجانية وآمنة لحفظ الحقائب والأمتعة؟',
      aEs: '¡Sí, totalmente gratis! Ofrecemos servicio de custodia supervisada para tus bolsas y maletas en una sala cerrada bajo llave tanto el día de tu llegada (si decides aprovechar la mañana antes del check-in) como el día de salida (para disfrutar tranquilamente hasta tarde).',
      aEn: 'Yes, completely free of charge! We offer locked, supervised storage for your luggage. You can safely deposit your bags on your check-in day (to enjoy local beaches early) or on your checkout day (to squeeze in one last excursion without carrying weights).',
      aFr: 'Oui, c\'est entièrement gratuit ! Nous proposons une bagagerie sécurisée fermée à clé où vous pouvez laisser vos effets personnels en toute tranquillité le jour de votre arrivée (pour profiter de la plage avant) ou de votre départ.',
      aAr: 'نعم، مجاناً بالكامل! نوفر غرفة مغلقة ومحمية لحفظ حقائبك وأمتعتك في يوم وصولك (لتستمتع بيومك قبل استلام الغرفة) أو في يوم مغادرتك (لتنطلق في جولاتك الأخيرة دون حمل أثقال).'
    },
    {
      id: 'service-kitchen',
      category: 'services',
      icon: Coffee,
      qEs: '¿Hay cocina comunitaria, comedor u office de uso común?',
      qEn: 'Is there a shared kitchen, microwave, or dining hall for guests?',
      qFr: 'Y a-t-il une cuisine commune ou un espace repas à disposition ?',
      qAr: 'هل يتوفر لديكم مطبخ مشترك أو صالة طعام للنزلاء؟',
      aEs: 'Sí, disponemos de una cómoda zona office/cocina office compartida equipada con nevera, horno microondas grande, hervidor eléctrico, cafetera de goteo, tostador y vajilla/cubiertos completos. Es ideal para preparar cenas rápidas, desayunos relajados y conservar bebidas.',
      aEn: 'Yes, we provide an elegant shared kitchenette/dining workspace equipped with a communal refrigerator, large microwaves, electric kettles, drip coffee makers, a toaster, and complete dining utensils. Perfect for preparing warm breakfasts and storing fresh drinks.',
      aFr: 'Oui, nous mettons à disposition un espace cuisine et repas partagé équipé d\'un réfrigérateur commun, d\'un grand micro-ondes, de bouilloires, de cafetières et de toute la vaisselle nécessaire. C\'est idéal pour préparer des collations rapides.',
      aAr: 'نعم، يتوفر لدينا ركن مطبخ وصالة طعام مشتركة مجهزة بثلاجة عامة، ميكرويف كبير، غلايات مياه كهربائية، مكائن لتحضير القهوة، محمصة خبز وأواني كاملة. وهي مثالية لإعداد وجبات خفيفة.'
    },
    {
      id: 'service-ac',
      category: 'services',
      icon: Thermometer,
      qEs: '¿Tienen aire acondicionado y calefacción regulable todas las habitaciones?',
      qEn: 'Are all bedrooms fitted with individual climate cooling and heating?',
      qFr: 'Toutes les chambres sont-elles équipées de climatisation et chauffage d\'appoint ?',
      qAr: 'هل جميع الغرف مجهزة بوحدات تكييف وتدفئة خاصة؟',
      aEs: '¡Por supuesto! El 100% de nuestras habitaciones cuentan con splits individuales silenciosos de última generación para regular la temperatura exacta de tu agrado. Podrás disfrutar tanto de aire acondicionado fresco en los meses de verano como de calefacción acogedora en invierno.',
      aEn: 'Absolutely! 100% of our bedrooms are equipped with top-tier silent, individual split units. Each bedroom features its own remote control, and supports cooling air conditioning for the warm summer days and comforting heating for cozy winter getaways.',
      aFr: 'Absolument ! 100 % de nos chambres sont équipées de systèmes de climatisation réversibles individuels très silencieux de dernière génération, afin de réguler la température à votre convenance en été comme en hiver.',
      aAr: 'بكل تأكيد! جميع غرف النوم مجهزة بوحدات تكييف هواء ممتازة تدعم التبريد والتدفئة بنظام هادئ، ويأتي كل مكيف مع جهاز تحكم عن بعد خاص لتعديل الحرارة حسب رغبتك.'
    }
  ], [lang]);

  // Filter items by category and search term
  const filteredFaqs = useMemo(() => {
    return faqItems.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search Box filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const textToSearch = [
          item.qEs, item.qEn, item.qFr, item.qAr,
          item.aEs, item.aEn, item.aFr, item.aAr
        ].join(' ').toLowerCase();
        return textToSearch.includes(query);
      }
      return true;
    });
  }, [faqItems, activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const isRtl = lang === 'ar';

  return (
    <section id="faq-section" className="max-w-5xl mx-auto px-4 sm:px-8 py-8 scroll-mt-24 space-y-6">
      
      {/* FAQ Header Title Display */}
      <div className="flex flex-col items-center justify-center space-y-5 max-w-2xl mx-auto text-center">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-sky-200"></div>
          <span className="text-xs font-medium text-sky-800 uppercase tracking-[0.3em] font-sans">
            {t('PREGUNTAS FRECUENTES', 'FREQUENTLY ASKED QUESTIONS', 'QUESTIONS FRÉQUENTES', 'الأسئلة الشائعة')}
          </span>
          <div className="h-[1px] w-12 bg-sky-200"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 leading-tight font-serif">
          {t('Todo lo que necesitas saber antes del viaje', 'Everything you need to know before travel', 'Tout ce que vous devez savoir antes del viaje', 'كل ما تحتاج لمعرفته قبل بدء رحلتك')}
        </h2>
        <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed mx-auto">
          {t(
            'Respuestas instantáneas sobre el funcionamiento de las habitaciones, las condiciones de cancelación flexibles, el acceso y garaje privado del Hostal Serramar.',
            'Instant, authentic answers regarding our pristine co-living bedrooms, flexible cancellations, accessibility, and secure garage spaces of Hostal Serramar.',
            'Réponses instantanées sur nos chambres, les conditions d\'annulation flexibles, l\'accès et le garage sécurisé de l\'Hostal Serramar.',
            'إجابات فورية ومفصلة حول الغرف، سياسات الإلغاء المرنة، ومواقف السيارات الخاصة والخدمات المتاحة بموقعنا.'
          )}
        </p>
      </div>

      {/* SEARCH AND CATEGORY FILTER BAR */}
      <div className="bg-white border border-slate-100 rounded-3xl p-4 sm:p-5 shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
          
          {/* Reactive Search Box */}
          <div className="md:col-span-5 relative">
            <span className={`absolute inset-y-0 flex items-center pointer-events-none text-slate-400 ${isRtl ? 'right-0 pr-3.5' : 'left-0 pl-3.5'}`}>
              <Search className="h-4 w-4 stroke-[2.5]" />
            </span>
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Buscar respuestas...', 'Search questions & policies...', 'Rechercher des questions...', 'ابحث عن الإجابة...')}
              className={`w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-150 focus:border-sky-500 rounded-2xl py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-550 transition-all font-sans ${
                isRtl ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10 text-left'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`absolute inset-y-0 flex items-center text-slate-400 hover:text-slate-600 font-bold text-xs ${isRtl ? 'left-0 pl-3.5' : 'right-0 pr-3.5'}`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Categorical filter selection tabs */}
          <div className="md:col-span-7 flex flex-wrap gap-1.5 justify-start md:justify-end">
            <button
              id="faq-cat-all"
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
              }`}
            >
              {t('Todos', 'All FAQ', 'Tout', 'الجميع')}
            </button>
            
            <button
              id="faq-cat-policies"
              type="button"
              onClick={() => setActiveCategory('policies')}
              className={`px-4 py-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'policies'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
              }`}
            >
              <span>{t('Políticas', 'Policies', 'Politiques', 'السياسات')}</span>
            </button>

            <button
              id="faq-cat-parking"
              type="button"
              onClick={() => setActiveCategory('parking')}
              className={`px-4 py-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'parking'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
              }`}
            >
              <span>{t('Parking', 'Parking', 'Parking', 'المواقف')}</span>
            </button>

            <button
              id="faq-cat-services"
              type="button"
              onClick={() => setActiveCategory('services')}
              className={`px-4 py-3 rounded-2xl text-[10.5px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'services'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
              }`}
            >
              <span>{t('Servicios', 'Services', 'Services', 'الخدمات')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ACCORDION CONTAINER GRID */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedId === faq.id;
              const IconComp = faq.icon;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  id={`faq-item-card-${faq.id}`}
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    isExpanded 
                      ? 'border-sky-500 shadow-md ring-1 ring-sky-500/10' 
                      : 'border-slate-150 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-5 py-4 sm:py-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                    id={`faq-button-${faq.id}`}
                  >
                    <div className={`flex items-center gap-3.5 w-full ${isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                      {/* Stylized rounded icon placeholder */}
                      <span className={`p-2.5 rounded-xl shrink-0 transition-colors duration-200 ${
                        isExpanded 
                          ? 'bg-sky-500/10 text-sky-600' 
                          : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100'
                      }`}>
                        <IconComp className="h-4.5 w-4.5 stroke-[2.2]" />
                      </span>
                      <h4 className={`text-sm sm:text-md font-extrabold leading-tight transition-colors duration-200 ${
                        isExpanded ? 'text-sky-900' : 'text-slate-800'
                      }`}>
                        {t(faq.qEs, faq.qEn, faq.qFr, faq.qAr)}
                      </h4>
                    </div>

                    <span className={`p-1.5 rounded-lg text-slate-400 shrink-0 border border-slate-100 transition-all duration-300 ${isExpanded ? 'rotate-180 bg-sky-500/10 border-sky-200 text-sky-600' : 'rotate-0 bg-transparent'}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`px-5 pb-5 sm:pb-5.5 text-xs sm:text-sm text-slate-600 font-light leading-relaxed border-t border-slate-50 pt-3 ${
                          isRtl ? 'pr-14 pl-6 sm:pl-10 text-right' : 'pl-14 pr-6 sm:pr-10 text-left'
                        }`}>
                          <p>{t(faq.aEs, faq.aEn, faq.aFr, faq.aAr)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-slate-50 border border-dashed border-slate-200 p-10 rounded-3xl"
              id="faq-empty-state"
            >
              <div className="max-w-xs mx-auto space-y-3.5">
                <div className="p-3 bg-slate-100 text-slate-400 rounded-full w-fit mx-auto">
                  <Search className="h-6 w-6 stroke-[1.8]" />
                </div>
                <p className="text-slate-700 font-bold text-sm">
                  {t('No se encontraron respuestas', 'No answers found matching request', 'Aucune réponse trouvée', 'لم يتم العثور على أي نتائج')}
                </p>
                <p className="text-xs text-slate-500 font-light leading-normal">
                  {t(
                    'No encontramos preguntas que correspondan a tu término de búsqueda. Prueba a cambiar las palabras o limpia los filtros.',
                    'Check your spelling or look up with simple phrases, or reset the filter tags entirely.',
                    'Veuillez modifier votre terme de recherche ou réinitialiser le filtre.',
                    'يرجى التأكد من الكلمات أو المحاولة بعبارات أكثر بساطة، أو تنظيف التصفية بالكامل.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-xl transition text-[10px] uppercase tracking-wider cursor-pointer shadow-sm active:scale-95"
                >
                  <Tag className="h-3 w-3" />
                  <span>{t('Restablecer todos los filtros', 'Reset All Filters', 'Réinitialiser', 'إعادة ضبط')}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
