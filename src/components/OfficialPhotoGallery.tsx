import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Key, 
  ShowerHead, 
  Coffee, 
  Building,
  Maximize2,
  Camera
} from 'lucide-react';

interface GalleryImage {
  url: string;
  category: 'private' | 'shared' | 'common' | 'exterior';
  titleEs: string;
  titleEn: string;
}


const GALLERY_IMAGES: GalleryImage[] = [
  // Private Bathroom Rooms
  { 
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=', 
    category: 'private', 
    titleEs: 'Habitación Doble de Luxe con Baño Completo Integrado', 
    titleEn: 'DeLuxe Double Room with Integrated Full Bathroom' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-bano-privado-serramar-benalmadena.jpg', 
    category: 'private', 
    titleEs: 'Habitación Doble Clásica con Baño Privado', 
    titleEn: 'Classic Double Room with Private Bathroom' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-1.jpg', 
    category: 'private', 
    titleEs: 'Detalle de Cama Doble con Climatización', 
    titleEn: 'Cozy Double Bed with Air Conditioning' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-2.jpg', 
    category: 'private', 
    titleEs: 'Habitación Doble con Mobiliario de Pino', 
    titleEn: 'Double Bed with Spanish Pine Wood Furniture' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-4.jpg', 
    category: 'private', 
    titleEs: 'Habitación Triple con Camas Individuales', 
    titleEn: 'Triple Room with Single Beds & Pine Frame' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-5.jpg', 
    category: 'private', 
    titleEs: 'Distribución Luminosa en Habitación Triple', 
    titleEn: 'Bright Bedding Layout in Triple Room' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-6.jpg', 
    category: 'private', 
    titleEs: 'Detalle Rústico de Cabeceros de Madera', 
    titleEn: 'Rustic Wood Headboard Craftsmanship' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-7.jpg', 
    category: 'private', 
    titleEs: 'Habitación Familiar Cuádruple Espaciosa', 
    titleEn: 'Spacious Family Quadruple Room' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-17.jpg', 
    category: 'private', 
    titleEs: 'Dormitorio Familiar con Baño Completo', 
    titleEn: 'Family Bedroom with Full Executive Bathroom' 
  },

  // Shared Bathroom Rooms
  { 
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733661797.jpg?k=8ac2f39a4cf8979cefa54ab1d5e19acfe31df654609e2c09619a665c54aaeaf2&o=', 
    category: 'shared', 
    titleEs: 'Habitación de Dos Camas Económica (Vista de Entrada)', 
    titleEn: 'Budget Twin Beds Room (Entrance Angle View)' 
  },
  { 
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733639422.jpg?k=c62df67f362a12b949fec76c379928b91b98d7db0c02819e8e0c8b0efab9ab18&o=', 
    category: 'shared', 
    titleEs: 'Habitación de Dos Camas con Ventilador y Climatización', 
    titleEn: 'Budget Twin Beds Room with Ceiling Fan & AC' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-bano-compartito-serramar-benalmadena.jpg', 
    category: 'shared', 
    titleEs: 'Habitación Doble Económica (Baño Compartido)', 
    titleEn: 'Budget Double Room (Shared Bathroom)' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-economica-bano-compartido-serramar-benalmadena.jpg', 
    category: 'shared', 
    titleEs: 'Habitación Individual Económica y Silenciosa', 
    titleEn: 'Budget Single Room (Shared Bathroom)' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-10.jpg', 
    category: 'shared', 
    titleEs: 'Habitación Doble para Máximo Ahorro con Ventana', 
    titleEn: 'Budget Double Room with Bright Ventilation' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-11.jpg', 
    category: 'shared', 
    titleEs: 'Camas Confortables en Habitación Económica', 
    titleEn: 'Comfortable Twin Bedding in Budget Room' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-13.jpg', 
    category: 'shared', 
    titleEs: 'Sencillez y Confort para Viajeros Solitarios', 
    titleEn: 'Simplicity and Comfort for Solo Travelers' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-15.jpg', 
    category: 'shared', 
    titleEs: 'Escritorio Auxiliar y Toallas Incluidas en Estancia', 
    titleEn: 'Side Table Desk & Fresh Towels Provided' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-16.jpg', 
    category: 'shared', 
    titleEs: 'Decoración Sencilla con Suelos de Baldosa', 
    titleEn: 'Simple Decor with Traditional Cool Tiled Floors' 
  },

  // Common Areas
  { 
    url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145477617.jpg?k=7efe706798a3d27a119c97defeb85d244a514ba000c5084b9c3586a095e90608&o=', 
    category: 'common', 
    titleEs: 'Comedor y Salón de Reuniones para Huéspedes', 
    titleEn: 'Cozy Guest Dining Lounge & Shared Kitchen Hall' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/salon-cucina-serramar-benalmadena-1.jpg', 
    category: 'common', 
    titleEs: 'Salón de Reuniones y Estar de Invitados', 
    titleEn: 'Comfy Guest Lounging and TV Living Room' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/salon-cucina-serramar-benalmadena-2.jpg', 
    category: 'common', 
    titleEs: 'Cocina de Uso Común Totalmente Equipada', 
    titleEn: 'Fully Equipped Shared Kitchen & Appliances' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/salon-cucina-serramar-benalmadena-3.jpg', 
    category: 'common', 
    titleEs: 'Zona de Cocina con Café y Té Gratuito', 
    titleEn: 'Office Area with Free Guest Coffee & Tea Maker' 
  },

  // Exterior & Details
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena.jpg', 
    category: 'exterior', 
    titleEs: 'Fachada y Entrada Principal de Hostal Serramar', 
    titleEn: 'Hostal Serramar Entrance Plaza & Exterior Facade' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-3.jpg', 
    category: 'exterior', 
    titleEs: 'Pasillos Comunes Decorados al Estilo Andaluz', 
    titleEn: 'Guesthouse Corridors Decorated in Andalusian Style' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-8.jpg', 
    category: 'exterior', 
    titleEs: 'Armario de Madera de Pino Mallorquina Rústica', 
    titleEn: 'Traditional Pine Wood Louvered Wardrobes' 
  },
  { 
    url: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-12.jpg', 
    category: 'exterior', 
    titleEs: 'Detalle de Planta de Interior y Luminosidad', 
    titleEn: 'Vibrant Houseplant and Sunlit Window Corner' 
  }
];

interface OfficialPhotoGalleryProps {
  lang: 'es' | 'en';
}

export default function OfficialPhotoGallery({ lang }: OfficialPhotoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'private' | 'shared' | 'common' | 'exterior'>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (imgUrl: string) => {
    // Find index in the filtered subset
    const idx = filteredImages.findIndex(img => img.url === imgUrl);
    if (idx !== -1) {
      setLightboxIdx(idx);
    }
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx(prev => (prev === null || prev === 0 ? filteredImages.length - 1 : prev - 1));
    }
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx(prev => (prev === null || prev === filteredImages.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm border border-slate-100/50" id="galeria-real-serramar">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-sky-600 font-extrabold text-[10px] tracking-widest uppercase font-mono bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100">
            <Camera className="h-3.5 w-3.5" />
            {lang === 'es' ? 'Galería de Fotos Oficial' : 'Official Photo Gallery'}
          </div>
          <h3 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight leading-none pt-1">
            {lang === 'es' ? 'Visita Visual Directa' : 'A Look Inside Our Hostal'}
          </h3>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            {lang === 'es' 
              ? 'Organización real de habitaciones de pino, cocina libre para huéspedes y zonas reformadas a tu disposición.' 
              : 'Authentic photos of our pine-wood bedrooms, common hostal kitchen, laundry amenities, and modern facilities.'}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 shrink-0 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'all' 
                ? 'bg-white text-sky-600 shadow-sm border border-slate-200/50 scale-100' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50 border border-transparent scale-95'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>{lang === 'es' ? 'Todo' : 'All'}</span>
          </button>
          
          <button
            onClick={() => setActiveCategory('private')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'private' 
                ? 'bg-white text-sky-600 shadow-sm border border-slate-200/50 scale-100' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50 border border-transparent scale-95'
            }`}
          >
            <Key className="h-4 w-4" />
            <span>{lang === 'es' ? 'Baño Privado' : 'Private'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('shared')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'shared' 
                ? 'bg-white text-sky-600 shadow-sm border border-slate-200/50 scale-100' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50 border border-transparent scale-95'
            }`}
          >
            <ShowerHead className="h-4 w-4" />
            <span>{lang === 'es' ? 'Compartido' : 'Shared'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('common')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'common' 
                ? 'bg-white text-sky-600 shadow-sm border border-slate-200/50 scale-100' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50 border border-transparent scale-95'
            }`}
          >
            <Coffee className="h-4 w-4" />
            <span>{lang === 'es' ? 'Zonas' : 'Areas'}</span>
          </button>
        </div>
      </div>

      {/* Modern Bento Grid of gallery pictures */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-4 gap-4" 
        id="gallery-container-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, i) => {
            // Create a bento layout feel by making every 5th item large
            const isFeatured = i % 5 === 0;
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                key={img.url}
                onClick={() => openLightbox(img.url)}
                className={`group relative bg-slate-900 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${
                  isFeatured ? 'col-span-2 row-span-2 aspect-[4/3] md:aspect-auto' : 'col-span-1 aspect-square'
                }`}
              >
                <img 
                  src={img.url} 
                  alt={lang === 'es' ? img.titleEs : img.titleEn}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Modern Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="absolute top-4 right-4 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <Maximize2 className="h-4 w-4 text-white" />
                  </div>
                  
                  <motion.div layout className="flex items-center gap-2 mb-2">
                    <span className="bg-white/20 backdrop-blur-sm border border-white/10 text-white font-semibold text-[9px] uppercase tracking-wider px-2 py-1 rounded-md">
                      {img.category === 'private' ? (lang === 'es' ? 'Baño Privado' : 'Private Bath') :
                       img.category === 'shared' ? (lang === 'es' ? 'Baño Compartido' : 'Shared Bath') :
                       img.category === 'common' ? (lang === 'es' ? 'Zona Común' : 'Common Area') : (lang === 'es' ? 'Exterior' : 'Exterior')}
                    </span>
                  </motion.div>
                  
                  <h4 className={`font-semibold tracking-tight leading-snug line-clamp-2 text-white ${
                    isFeatured ? 'text-lg sm:text-xl' : 'text-sm'
                  }`}>
                    {lang === 'es' ? img.titleEs : img.titleEn}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Modern Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 z-[150] cursor-pointer"
            id="gallery-lightbox"
          >
            {/* Lightbox Head */}
            <div className="flex z-10 justify-between items-center w-full max-w-6xl mx-auto py-2">
              <span className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide flex items-center gap-2">
                <Camera className="h-4 w-4 text-sky-400" />
                {lang === 'es' ? 'Galería' : 'Gallery'} <span className="text-slate-500">/</span> {lightboxIdx + 1} de {filteredImages.length}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
                className="text-slate-300 hover:text-white p-3 bg-white/5 hover:bg-white/20 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Lightbox Body / Picture carousel */}
            <div className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-4 sm:my-8" onClick={(e) => e.stopPropagation()}>
              {/* Slider back button */}
              <button
                onClick={handlePrevLightbox}
                className="absolute left-0 sm:-left-4 md:-left-12 z-20 bg-white/5 hover:bg-white/20 backdrop-blur text-white p-4 rounded-full hover:scale-110 active:scale-90 transition-all cursor-pointer border border-white/10"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              {/* Expansive Frame with AnimatePresence for slide effect */}
              <div className="relative w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-transparent">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={lightboxIdx}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    src={filteredImages[lightboxIdx]?.url} 
                    alt={lang === 'es' ? filteredImages[lightboxIdx]?.titleEs : filteredImages[lightboxIdx]?.titleEn}
                    className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain select-none rounded-2xl shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Slider forward button */}
              <button
                onClick={handleNextLightbox}
                className="absolute right-0 sm:-right-4 md:-right-12 z-20 bg-white/5 hover:bg-white/20 backdrop-blur text-white p-4 rounded-full hover:scale-110 active:scale-90 transition-all cursor-pointer border border-white/10"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>

            {/* Lightbox Caption Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={`caption-${lightboxIdx}`}
              className="text-center pb-4 z-10 w-full max-w-3xl mx-auto space-y-3"
            >
              <div className="inline-block bg-sky-500/20 text-sky-300 font-semibold uppercase text-[10px] tracking-widest px-3 py-1.5 rounded-full border border-sky-400/20">
                {filteredImages[lightboxIdx]?.category === 'private' ? (lang === 'es' ? 'Baño Privado' : 'Private En-Suite') :
                 filteredImages[lightboxIdx]?.category === 'shared' ? (lang === 'es' ? 'Baño Compartido' : 'Shared Bathroom') :
                 filteredImages[lightboxIdx]?.category === 'common' ? (lang === 'es' ? 'Zona Común' : 'Guest Lounge') : (lang === 'es' ? 'Exterior' : 'Property Site')}
              </div>
              <h4 className="text-xl sm:text-3xl font-light text-white tracking-tight">
                {lang === 'es' ? filteredImages[lightboxIdx]?.titleEs : filteredImages[lightboxIdx]?.titleEn}
              </h4>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
