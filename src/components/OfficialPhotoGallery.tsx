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

export interface GalleryImage {
  url: string;
  category: 'private' | 'shared' | 'common' | 'exterior';
  titleEs: string;
  titleEn: string;
}


export const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  // Private Bathroom Rooms
  {
    url: '/images/rooms/doble-privado-1.jpg',
    category: 'private',
    titleEs: 'Habitación Doble con Baño Privado',
    titleEn: 'Double Room with Private Bathroom'
  },
  {
    url: '/images/rooms/doble-privado-5.jpg',
    category: 'private',
    titleEs: 'Detalle Habitación Doble con Cama de Matrimonio',
    titleEn: 'Double Room Detail with Full Bed'
  },
  {
    url: '/images/rooms/triple-privado-1.jpg',
    category: 'private',
    titleEs: 'Habitación Triple con Baño Privado',
    titleEn: 'Triple Room with Private Bathroom'
  },
  {
    url: '/images/rooms/triple-privado-4.jpg',
    category: 'private',
    titleEs: 'Distribución de Camas en Habitación Triple',
    titleEn: 'Bed Layout in Triple Room'
  },
  {
    url: '/images/rooms/cuadruple-privado-1.jpg',
    category: 'private',
    titleEs: 'Habitación Familiar Cuádruple',
    titleEn: 'Family Quadruple Room'
  },
  {
    url: '/images/rooms/cuadruple-privado-4.jpg',
    category: 'private',
    titleEs: 'Dormitorio Familiar Amplio con Baño',
    titleEn: 'Spacious Family Bedroom with Bathroom'
  },
  {
    url: '/images/rooms/twin-privado-2.jpg',
    category: 'private',
    titleEs: 'Habitación Doble con Camas Separadas',
    titleEn: 'Twin Bed Private Room'
  },

  // Shared Bathroom Rooms
  {
    url: '/images/rooms/doble-compartido-1.png',
    category: 'shared',
    titleEs: 'Habitación Doble Económica',
    titleEn: 'Budget Double Room'
  },
  {
    url: '/images/rooms/doble-compartido-3.jpg',
    category: 'shared',
    titleEs: 'Habitación Doble con Baño Compartido',
    titleEn: 'Double Room with Shared Bathroom'
  },
  {
    url: '/images/rooms/individual-compartido-1.png',
    category: 'shared',
    titleEs: 'Habitación Individual Económica',
    titleEn: 'Budget Single Room'
  },
  {
    url: '/images/rooms/individual-compartido-3.png',
    category: 'shared',
    titleEs: 'Habitación Individual con Zona de Trabajo',
    titleEn: 'Single Room with Work Area'
  },

  // Common Areas
  {
    url: '/images/rooms/hostal-common-1.jpg',
    category: 'common',
    titleEs: 'Zona Común y Comedor para Huéspedes',
    titleEn: 'Common Lounge and Dining Area'
  },
  {
    url: '/images/rooms/hostal-common-3.jpg',
    category: 'common',
    titleEs: 'Cocina Compartida Totalmente Equipada',
    titleEn: 'Fully Equipped Shared Kitchen'
  },
  {
    url: '/images/rooms/hostal-common-5.jpg',
    category: 'common',
    titleEs: 'Acceso y Pasillos Interiores',
    titleEn: 'Interior Access and Corridors'
  },
  {
    url: '/images/rooms/hostal-common-8.jpg',
    category: 'common',
    titleEs: 'Detalle de Espacios Comunes',
    titleEn: 'Common Space Details'
  },

  // Exterior & Details
  {
    url: '/images/rooms/hostal-common-2.jpg',
    category: 'exterior',
    titleEs: 'Entrada Principal y Recepción',
    titleEn: 'Main Entrance and Reception'
  },
  {
    url: '/images/rooms/hostal-common-4.jpg',
    category: 'exterior',
    titleEs: 'Escaleras y Conexión entre Plantas',
    titleEn: 'Stairs and Floor Access'
  },
  {
    url: '/images/rooms/hostal-common-6.jpg',
    category: 'exterior',
    titleEs: 'Zona de Paso y Fachada Interior',
    titleEn: 'Walkway and Interior Facade'
  },
  {
    url: '/images/rooms/hostal-common-7.jpg',
    category: 'exterior',
    titleEs: 'Detalle Arquitectónico del Hostal',
    titleEn: 'Hostal Architectural Detail'
  }
];

interface OfficialPhotoGalleryProps {
  lang: 'es' | 'en';
  customImages?: GalleryImage[];
}

export default function OfficialPhotoGallery({ lang, customImages }: OfficialPhotoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'private' | 'shared' | 'common' | 'exterior'>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const galleryImages = customImages && customImages.length > 0 ? customImages : DEFAULT_GALLERY_IMAGES;

  // Filter images based on active category
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
    <div className="rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 overflow-hidden" id="galeria-real-serramar">
      <div className="relative p-6 sm:p-10 lg:p-12 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.12),_transparent_45%)]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-1.5 text-sky-700 font-extrabold text-[10px] tracking-widest uppercase font-mono bg-sky-100/80 px-3 py-1.5 rounded-full border border-sky-200">
            <Camera className="h-3.5 w-3.5" />
            {lang === 'es' ? 'Galería Curada' : 'Curated Gallery'}
          </div>

          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 border-b border-slate-200/70 pb-6">
            <div className="space-y-3 max-w-3xl">
              <h3 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-[1.05]">
                {lang === 'es' ? 'Recorrido Visual Moderno' : 'A Fresh Visual Journey'}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'es'
                  ? 'Vista previa de habitaciones, baños, zonas comunes y exterior en un diseño limpio y moderno, optimizado para todos los dispositivos.'
                  : 'Preview rooms, bathrooms, common spaces, and exterior details in a clean modern layout optimized for every device.'}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2">
                <p className="text-[10px] uppercase tracking-widest font-mono text-slate-500">{lang === 'es' ? 'Fotos' : 'Shots'}</p>
                <p className="text-xl font-black text-slate-900">{galleryImages.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2">
                <p className="text-[10px] uppercase tracking-widest font-mono text-slate-500">{lang === 'es' ? 'Categorías' : 'Categories'}</p>
                <p className="text-xl font-black text-slate-900">4</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-2">
                <p className="text-[10px] uppercase tracking-widest font-mono text-slate-500">{lang === 'es' ? 'Vista' : 'View'}</p>
                <p className="text-xl font-black text-slate-900">HD</p>
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 shrink-0 bg-white/90 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'all' 
                ? 'bg-slate-900 text-white shadow-sm border border-slate-900 scale-100' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent scale-95'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>{lang === 'es' ? 'Todo' : 'All'}</span>
          </button>
          
          <button
            onClick={() => setActiveCategory('private')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'private' 
                ? 'bg-slate-900 text-white shadow-sm border border-slate-900 scale-100' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent scale-95'
            }`}
          >
            <Key className="h-4 w-4" />
            <span>{lang === 'es' ? 'Baño Privado' : 'Private'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('shared')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'shared' 
                ? 'bg-slate-900 text-white shadow-sm border border-slate-900 scale-100' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent scale-95'
            }`}
          >
            <ShowerHead className="h-4 w-4" />
            <span>{lang === 'es' ? 'Compartido' : 'Shared'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('common')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'common' 
                ? 'bg-slate-900 text-white shadow-sm border border-slate-900 scale-100' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent scale-95'
            }`}
          >
            <Coffee className="h-4 w-4" />
            <span>{lang === 'es' ? 'Zonas' : 'Areas'}</span>
          </button>

          <button
            onClick={() => setActiveCategory('exterior')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'exterior'
                ? 'bg-slate-900 text-white shadow-sm border border-slate-900 scale-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent scale-95'
            }`}
          >
            <Building className="h-4 w-4" />
            <span>{lang === 'es' ? 'Exterior' : 'Exterior'}</span>
          </button>
        </div>
      </div>
      </div>

      {/* Modern Bento Grid of gallery pictures */}
      <motion.div 
        layout
        className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5" 
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
                className={`group relative bg-slate-900 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-slate-400/40 transition-all duration-500 border border-slate-200 ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-3 lg:row-span-2 min-h-[260px] lg:min-h-[360px]' : 'col-span-1 min-h-[220px]'
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
                
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
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
