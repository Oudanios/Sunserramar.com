import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, ShieldCheck, VolumeX, Ban, Car, Navigation, Wifi, 
  Briefcase, Coffee, Thermometer, Search, Users, ChevronDown, ChevronRight
} from 'lucide-react';

interface FaqSectionProps { lang: 'es' | 'en' | 'fr' | 'ar'; }
interface FAQItem {
  id: string; category: 'policies' | 'parking' | 'services'; icon: any;
  qEs: string; qEn: string; qFr: string; qAr: string;
  aEs: string; aEn: string; aFr: string; aAr: string;
}

const INITIAL_VISIBLE = 5;

export default function FaqSection({ lang }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'policies' | 'parking' | 'services'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const t = (es: string, en: string, fr?: string, ar?: string): string => {
    if (lang === 'ar') return ar || en || es;
    if (lang === 'fr') return fr || en || es;
    if (lang === 'en') return en || es;
    return es;
  };

  const faqItems = useMemo<FAQItem[]>(() => [
    { id: 'checkin', category: 'policies', icon: Clock,
      qEs: '¿Cuáles son las horas de Check-In y Check-Out oficiales?',
      qEn: 'What are the official Check-In and Check-Out hours?',
      qFr: "Quels sont les horaires d'arrivée et de départ officiels ?",
      qAr: 'ما هي مواعيد تسجيل الوصول والمغادرة الرسمية؟',
      aEs: 'Check-In: de 13:00 a 22:30h. Para llegadas tardías, te facilitamos un código de acceso seguro. Check-Out: antes de las 11:30h.',
      aEn: 'Check-in: 1:00 PM – 10:30 PM. Late arrivals get a secure digital access code. Check-out before 11:30 AM.',
      aFr: "Check-in de 13h à 22h30. Arrivée tardive : code d'accès sécurisé. Check-out avant 11h30.",
      aAr: 'تسجيل الوصول: 1:00 ظهراً – 10:30 مساءً. للوصول المتأخر: رمز دخول آمن. المغادرة قبل 11:30 صباحاً.' },
    { id: 'smoking', category: 'policies', icon: Ban,
      qEs: '¿Está permitido fumar en habitaciones o zonas comunes?',
      qEn: 'Is smoking allowed in rooms or common areas?',
      qFr: 'Est-il permis de fumer dans les chambres ou espaces communs ?',
      qAr: 'هل يُسمح بالتدخين داخل الغرف أو المساحات المشتركة؟',
      aEs: 'No. El hostal es 100% libre de humo. Prohibido fumar en habitaciones y zonas interiores.',
      aEn: 'No. Hostal Serramar is 100% smoke-free. Smoking is prohibited in all indoor areas.',
      aFr: "Non. L'hostal est 100% non-fumeur. Interdit dans toutes les chambres et espaces intérieurs.",
      aAr: 'لا. بيت الضيافة خالٍ تماماً من التدخين بنسبة 100%.' },
    { id: 'children', category: 'policies', icon: Users,
      qEs: '¿Admiten niños? ¿Hay cunas o camas supletorias?',
      qEn: 'Are children welcome? Are extra beds or cots available?',
      qFr: 'Les enfants sont-ils acceptés ? Y a-t-il des lits bébés ?',
      qAr: 'هل ترحبون بالأطفال؟ هل تتوفر أسرة إضافية؟',
      aEs: 'Sí, se admiten niños de todas las edades. No disponemos de cunas ni camas supletorias.',
      aEn: 'Yes, all ages welcome. However, no baby cots or extra beds are available.',
      aFr: 'Oui, tous âges. Aucun lit bébé ni lit d\'appoint disponible.',
      aAr: 'نعم، جميع الأعمار مرحب بها. لا تتوفر أسرة إضافية.' },
    { id: 'cancellation', category: 'policies', icon: ShieldCheck,
      qEs: '¿Cuál es la política de cancelación de reservas directas?',
      qEn: 'What is the cancellation policy for direct bookings?',
      qFr: 'Quelle est la politique d\'annulation pour les réservations directes ?',
      qAr: 'ما سياسة إلغاء الحجوزات المباشرة؟',
      aEs: 'Cancelación gratuita hasta 48h antes de la llegada. Cancelaciones tardías o no-show: cargo de la 1ª noche.',
      aEn: 'Free cancellation up to 48h before arrival. Late cancellations or no-shows: 1 night charge.',
      aFr: 'Annulation gratuite jusqu\'à 48h avant. Annulation tardive ou no-show: 1 nuit facturée.',
      aAr: 'إلغاء مجاني حتى 48 ساعة قبل الوصول. الإلغاء المتأخر: رسوم ليلة واحدة.' },
    { id: 'quiet', category: 'policies', icon: VolumeX,
      qEs: '¿Hay normas sobre el ruido y horario de silencio?',
      qEn: 'Are there noise rules or quiet hours?',
      qFr: 'Y a-t-il des heures de silence ou règles sur le bruit ?',
      qAr: 'هل هناك قواعد محددة لساعات الهدوء؟',
      aEs: 'Sí. Silencio de 22:30h a 08:30h. Prohibidas fiestas y música alta las 24h.',
      aEn: 'Yes. Quiet hours: 10:30 PM – 8:30 AM. No parties or loud music allowed 24/7.',
      aFr: 'Oui. Heures de silence: 22h30 – 8h30. Fêtes et musique forte interdites.',
      aAr: 'نعم. ساعات الهدوء: 10:30 مساءً – 8:30 صباحاً. لا حفلات أو موسيقى صاخبة.' },
    { id: 'pets', category: 'policies', icon: Ban,
      qEs: '¿Se admiten mascotas?',
      qEn: 'Are pets allowed?',
      qFr: 'Les animaux de compagnie sont-ils acceptés ?',
      qAr: 'هل يُسمح باصطحاب الحيوانات الأليفة؟',
      aEs: 'No se admiten mascotas por higiene. Perros de asistencia certificados son bienvenidos previo aviso.',
      aEn: 'No pets for hygiene reasons. Certified service dogs are fully welcome with advance notice.',
      aFr: 'Pas d\'animaux pour raisons d\'hygiène. Chiens d\'assistance certifiés acceptés sur notification.',
      aAr: 'لا حيوانات أليفة للحفاظ على النظافة. كلاب الخدمة المعتمدة مرحب بها مسبقاً.' },
    { id: 'parking-private', category: 'parking', icon: Car,
      qEs: '¿Ofrecen aparcamiento privado gratuito?',
      qEn: 'Do you offer free private parking on site?',
      qFr: 'Proposez-vous un parking privé gratuit ?',
      qAr: 'هل يتوفر موقف سيارات خاص ومجاني؟',
      aEs: 'Sí, 100% gratuito en las instalaciones. Sin reserva previa necesaria.',
      aEn: 'Yes, completely free on-site parking. No reservation required.',
      aFr: 'Oui, parking privé gratuit sur place. Aucune réservation requise.',
      aAr: 'نعم، موقف مجاني بالكامل. لا حاجة لحجز مسبق.' },
    { id: 'parking-street', category: 'parking', icon: Navigation,
      qEs: '¿Hay aparcamiento público gratuito en la calle?',
      qEn: 'Is free street parking available nearby?',
      qFr: 'Y a-t-il du stationnement gratuit dans la rue ?',
      qAr: 'هل يوجد مواقف مجانية في الشارع المحيط؟',
      aEs: 'Sí. La zona residencial circundante ofrece abundantes plazas gratuitas sin parquímetros ni restricciones.',
      aEn: 'Yes. Spacious residential zone with plenty of free street parking, no meters or time limits.',
      aFr: 'Oui. Zone résidentielle avec beaucoup de places gratuites. Aucun horodateur ni zone bleue.',
      aAr: 'نعم. منطقة سكنية بمساحات ركن مجانية وافرة، بدون قيود.' },
    { id: 'wifi', category: 'services', icon: Wifi,
      qEs: '¿La Wi-Fi es de alta velocidad y apta para teletrabajar?',
      qEn: 'Is the Wi-Fi fast and reliable for remote work?',
      qFr: 'La Wi-Fi est-elle haut débit et adaptée au télétravail ?',
      qAr: 'هل شبكة الواي فاي سريعة ومستقرة للعمل عن بعد؟',
      aEs: 'Sí. Fibra óptica +300 Mbps con puntos de acceso Wi-Fi 6 en todas las zonas.',
      aEn: 'Yes. 300+ Mbps fiber optics with Wi-Fi 6 access points throughout the property.',
      aFr: 'Oui. Fibre +300 Mbps avec points Wi-Fi 6 dans tout l\'établissement.',
      aAr: 'نعم. ألياف بصرية +300 ميجابت مع نقاط Wi-Fi 6 في كل مكان.' },
    { id: 'luggage', category: 'services', icon: Briefcase,
      qEs: '¿Ofrecen consigna de equipaje gratuita?',
      qEn: 'Is there free luggage storage available?',
      qFr: 'Proposez-vous une consigne bagages gratuite ?',
      qAr: 'هل تتوفر خدمة مجانية لحفظ الأمتعة؟',
      aEs: 'Sí, totalmente gratis. Custodia supervisada en sala cerrada antes del check-in o después del check-out.',
      aEn: 'Yes, completely free. Secure locked storage before check-in or after check-out.',
      aFr: 'Oui, gratuit. Consigne sécurisée avant l\'arrivée ou après le départ.',
      aAr: 'نعم، مجاناً. غرفة مغلقة وآمنة للأمتعة قبل الوصول أو بعد المغادرة.' },
    { id: 'kitchen', category: 'services', icon: Coffee,
      qEs: '¿Hay cocina comunitaria disponible?',
      qEn: 'Is there a shared kitchen for guests?',
      qFr: 'Y a-t-il une cuisine commune pour les voyageurs ?',
      qAr: 'هل يتوفر مطبخ مشترك للنزلاء؟',
      aEs: 'Sí. Zona office con nevera, microondas, hervidor, cafetera, tostador y vajilla completa.',
      aEn: 'Yes. Shared kitchen with fridge, microwave, kettle, coffee maker, toaster, and full utensils.',
      aFr: 'Oui. Espace cuisine avec réfrigérateur, micro-ondes, bouilloire, cafetière et vaisselle.',
      aAr: 'نعم. مطبخ مجهز بثلاجة وميكرويف وغلاية ومكائن قهوة ومحمصة وأواني كاملة.' },
    { id: 'ac', category: 'services', icon: Thermometer,
      qEs: '¿Todas las habitaciones tienen A/C y calefacción?',
      qEn: 'Do all rooms have air conditioning and heating?',
      qFr: 'Toutes les chambres ont-elles la climatisation et le chauffage ?',
      qAr: 'هل جميع الغرف مجهزة بمكيف هواء وتدفئة؟',
      aEs: 'Sí. 100% de las habitaciones con splits individuales silenciosos para frío y calor.',
      aEn: 'Yes. 100% of rooms have individual silent split A/C units for both cooling and heating.',
      aFr: 'Oui. 100% des chambres avec climatisation individuelle réversible silencieuse.',
      aAr: 'نعم. 100% من الغرف مجهزة بمكيفات هواء فردية هادئة للتبريد والتدفئة.' },
  ], [lang]);

  const filteredFaqs = useMemo(() => faqItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return [item.qEs,item.qEn,item.aEs,item.aEn].join(' ').toLowerCase().includes(q);
    }
    return true;
  }), [faqItems, activeCategory, searchQuery]);

  const visibleFaqs = (showAll || searchQuery.trim()) ? filteredFaqs : filteredFaqs.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filteredFaqs.length - INITIAL_VISIBLE;

  const toggleExpand = (id: string) => setExpandedId(prev => prev === id ? null : id);

  return (
    <section id="faq-section" className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-4">
      
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
            {t('PREGUNTAS FRECUENTES', 'FAQ', 'FAQ', 'الأسئلة الشائعة')}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {t('Todo lo que necesitas saber', 'Everything you need to know', 'Tout ce que vous devez savoir', 'كل ما تحتاج لمعرفته')}
          </h2>
        </div>
        {/* Compact search */}
        <div className="relative shrink-0 w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowAll(true); }}
            placeholder={t('Buscar...', 'Search...', 'Rechercher...', 'بحث...')}
            className="w-full bg-slate-50 border border-slate-200 focus:border-sky-400 rounded-xl pl-9 pr-8 py-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold">✕</button>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 flex-wrap">
        {(['all','policies','parking','services'] as const).map(cat => (
          <button key={cat} onClick={() => { setActiveCategory(cat); setShowAll(false); setExpandedId(null); }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
              activeCategory === cat ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}>
            {cat === 'all' ? t('Todos','All','Tous','الجميع') :
             cat === 'policies' ? t('Políticas','Policies','Politiques','السياسات') :
             cat === 'parking' ? t('Parking','Parking','Parking','المواقف') :
             t('Servicios','Services','Services','الخدمات')}
          </button>
        ))}
      </div>

      {/* Two-column accordion grid */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          {t('No se encontraron resultados.', 'No results found.', 'Aucun résultat.', 'لا توجد نتائج.')}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <AnimatePresence mode="popLayout">
              {visibleFaqs.map((faq, idx) => {
                const isExpanded = expandedId === faq.id;
                const Icon = faq.icon;
                return (
                  <motion.div key={faq.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15, delay: idx * 0.02 }}
                    className={`bg-white rounded-xl border transition-all ${isExpanded ? 'border-sky-400 shadow-sm ring-1 ring-sky-400/15 md:col-span-2' : 'border-slate-150 hover:border-slate-300'}`}>
                    <button type="button" onClick={() => toggleExpand(faq.id)}
                      className="w-full px-4 py-3.5 flex items-center justify-between gap-3 cursor-pointer focus:outline-none text-left"
                      aria-expanded={isExpanded}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`p-2 rounded-lg shrink-0 ${isExpanded ? 'bg-sky-50 text-sky-600' : 'bg-slate-50 text-slate-500'}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className={`text-xs font-bold leading-snug truncate ${isExpanded ? 'text-sky-800 whitespace-normal' : 'text-slate-800'}`}>
                          {t(faq.qEs, faq.qEn, faq.qFr, faq.qAr)}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-sky-500' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                          <p className="px-4 pb-4 pl-12 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2.5">
                            {t(faq.aEs, faq.aEn, faq.aFr, faq.aAr)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show more / less */}
          {!searchQuery.trim() && hiddenCount > 0 && (
            <div className="flex justify-center pt-1">
              <button onClick={() => { setShowAll(v => !v); setExpandedId(null); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer">
                {showAll ? (
                  <>{t(`Mostrar menos`, 'Show less', 'Moins', 'عرض أقل')}<ChevronDown className="h-3.5 w-3.5 rotate-180" /></>
                ) : (
                  <><ChevronRight className="h-3.5 w-3.5" />{t(`Ver ${hiddenCount} preguntas más`, `Show ${hiddenCount} more`, `Voir ${hiddenCount} de plus`, `عرض ${hiddenCount} المزيد`)}</>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
