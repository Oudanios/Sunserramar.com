import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  DollarSign, 
  Calendar, 
  Users, 
  Trash2, 
  Edit, 
  Plus, 
  Check, 
  Lock, 
  Eye, 
  FileText, 
  MapPin, 
  Phone, 
  Globe, 
  Sliders, 
  MessageSquare,
  Sparkles,
  Settings,
  ShieldCheck,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  Mail
} from 'lucide-react';
import { Room, Booking, Review, AnnouncementConfig, CustomPage } from '../types';

interface AdminPanelProps {
  lang: 'es' | 'en' | 'fr' | 'ar';
  rooms: Room[];
  bookings: Booking[];
  reviews: Review[];
  announcement: AnnouncementConfig;
  customPages: CustomPage[];
  onUpdateRooms: (updated: Room[]) => void;
  onUpdateBookings: (updated: Booking[]) => void;
  onUpdateReviews: (updated: Review[]) => void;
  onUpdateAnnouncement: (updated: AnnouncementConfig) => void;
  onUpdatePages: (updated: CustomPage[]) => void;
  onClose: () => void;
  heroSlides: any[];
  onUpdateHeroSlides: (updated: any[]) => void;
  welcomeImage: string;
  onUpdateWelcomeImage: (url: string) => void;
  upgradeImages: string[];
  onUpdateUpgradeImages: (updated: string[]) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function AdminPanel({ 
  lang, 
  rooms, 
  bookings, 
  reviews, 
  announcement,
  customPages,
  onUpdateRooms,
  onUpdateBookings,
  onUpdateReviews,
  onUpdateAnnouncement,
  onUpdatePages,
  onClose,
  heroSlides,
  onUpdateHeroSlides,
  welcomeImage,
  onUpdateWelcomeImage,
  upgradeImages,
  onUpdateUpgradeImages,
  showToast
}: AdminPanelProps) {
  // Navigation
  const [adminTab, setAdminTab] = useState<'dashboard' | 'reservas' | 'habitaciones' | 'opiniones' | 'settings' | 'media' | 'integrations'>('dashboard');
  
  // Integrations state
  const [integrationStatus, setIntegrationStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [testSmtpEmail, setTestSmtpEmail] = useState('contact@sunserramar.com');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testMailFeedback, setTestMailFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Editing forms state
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [roomForm, setRoomForm] = useState<Partial<Room>>({
    id: '',
    name: '',
    nameEn: '',
    type: 'doble',
    bathroom: 'private',
    price: 50,
    description: '',
    descriptionEn: '',
    image: '',
    images: [],
    amenities: [],
    amenitiesEn: [],
    maxGuests: 2,
    featured: false
  });

  // Booking details editing state
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  // Search and filter states
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  // Multi-image URLs string representation
  const [imagesInput, setImagesInput] = useState('');
  // Amenities list input represented as comma-separated values
  const [amenitiesInputEs, setAmenitiesInputEs] = useState('');
  const [amenitiesInputEn, setAmenitiesInputEn] = useState('');

  // Announcement banner management local form state
  const [activeAnnouncement, setActiveAnnouncement] = useState<AnnouncementConfig>(announcement || {
    enabled: false,
    textEs: '',
    textEn: '',
    style: 'alert-yellow'
  });

  // Keep active announcement in sync with props
  useEffect(() => {
    if (announcement) {
      setActiveAnnouncement(announcement);
    }
  }, [announcement]);

  // Fetch server integrations status
  const fetchIntegrationStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const response = await fetch('/api/integrations/status');
      if (response.ok) {
        const data = await response.json();
        setIntegrationStatus(data);
      } else {
        console.error("Status route failed");
      }
    } catch (err) {
      console.error("Error reading integrations status:", err);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (adminTab === 'integrations') {
      fetchIntegrationStatus();
      setTestMailFeedback(null);
    }
  }, [adminTab]);

  const handleSendTestSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingTest(true);
    setTestMailFeedback(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Hostal Serramar Server Mail-Check',
          email: testSmtpEmail,
          phone: '+34 951 20 70 72',
          subject: '⚡ SMTP Forwarding Credentials Verification',
          message: 'This is an official verification dispatch routed via sunserramar.com to evaluate SMTP routing rules to contact@sunserramar.com. Confirm receipt successfully.'
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setTestMailFeedback({
          success: true,
          msg: lang === 'es' ? `¡Mensaje enviado de forma interactiva! Verificado y enviado al buzón redireccionado (${data.recipient || 'contact@sunserramar.com'}). DB: ${data.database || 'offline'}` : `Message sent interactively! Verified and dispatched to forwarded mailbox (${data.recipient || 'contact@sunserramar.com'}). DB: ${data.database || 'offline'}`
        });
        fetchIntegrationStatus();
      } else {
        setTestMailFeedback({
          success: false,
          msg: data.error || 'Server rejected the test SMTP configuration'
        });
      }
    } catch (err: any) {
      setTestMailFeedback({
        success: false,
        msg: err.message || 'SMTP timeout connect error'
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  // Custom pages form states
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [pageForm, setPageForm] = useState<Partial<CustomPage>>({
    id: '',
    titleEs: '',
    titleEn: '',
    contentEs: '',
    contentEn: '',
    icon: 'Info',
    isActive: true,
    showInNav: true
  });

  const handleStartAddPage = () => {
    setEditingPage(null);
    setIsAddingPage(true);
    setPageForm({
      id: 'page-' + Math.floor(1000 + Math.random() * 9000),
      titleEs: '',
      titleEn: '',
      contentEs: '',
      contentEn: '',
      icon: 'Info',
      isActive: true,
      showInNav: true
    });
  };

  const handleStartEditPage = (page: CustomPage) => {
    setEditingPage(page);
    setIsAddingPage(false);
    setPageForm(page);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageForm.id || !pageForm.titleEs || !pageForm.titleEn) {
      showToast(lang === 'es' ? 'Por favor complete todos los campos obligatorios' : 'Please complete all required fields', 'error');
      return;
    }
    
    // Auto-formatting slug/ID to safe lowercase letters and hyphens
    const formattedId = pageForm.id.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const pageToSave: CustomPage = {
      id: formattedId,
      titleEs: pageForm.titleEs || '',
      titleEn: pageForm.titleEn || '',
      contentEs: pageForm.contentEs || '',
      contentEn: pageForm.contentEn || '',
      icon: pageForm.icon || 'Info',
      isActive: pageForm.isActive ?? true,
      showInNav: pageForm.showInNav ?? true
    };

    let updatedPages = [...customPages];
    if (editingPage) {
      updatedPages = updatedPages.map(p => p.id === editingPage.id ? pageToSave : p);
    } else {
      // Ensure unique slug
      if (updatedPages.some(p => p.id === pageToSave.id)) {
        showToast(lang === 'es' ? 'Este identificador de página ya existe' : 'This page ID already exists', 'error');
        return;
      }
      updatedPages.push(pageToSave);
    }

    onUpdatePages(updatedPages);
    setEditingPage(null);
    setIsAddingPage(false);
  };

  const handleDeletePage = (pageId: string) => {
    if (confirm(lang === 'es' ? '¿Está seguro de querer eliminar esta página?' : 'Are you sure you want to delete this page?')) {
      const updatedPages = customPages.filter(p => p.id !== pageId);
      onUpdatePages(updatedPages);
    }
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement(activeAnnouncement);
    showToast(lang === 'es' ? '¡Anuncio guardado correctamente!' : 'Announcement saved successfully!', 'success');
  };

  // Handle Auth with default simple password "admin"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || password === 'admin123' || password === '1234') {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError(lang === 'es' ? 'Contraseña incorrecta. Utilice "admin" o "1234" para probar.' : 'Incorrect password. Try "admin" or "1234" for testing.');
    }
  };

  // Metrics calculators
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  // Edit or Save Room Action
  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedImages = imagesInput.split(',')
      .map(url => url.trim())
      .filter(url => url !== '');
    
    const parsedAmenitiesEs = amenitiesInputEs.split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const parsedAmenitiesEn = amenitiesInputEn.split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const finalRoomForm: Room = {
      id: roomForm.id || 'room-' + Math.floor(1000 + Math.random() * 9000),
      name: roomForm.name || 'Nueva Habitación',
      nameEn: roomForm.nameEn || 'New Room',
      type: roomForm.type || 'doble',
      bathroom: roomForm.bathroom || 'private',
      price: Number(roomForm.price) || 45,
      description: roomForm.description || '',
      descriptionEn: roomForm.descriptionEn || '',
      image: roomForm.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      images: parsedImages.length > 0 ? parsedImages : [roomForm.image || ''],
      amenities: parsedImages.length > 0 ? parsedAmenitiesEs : ['Baño Privado', 'Wi-Fi Gratis'],
      amenitiesEn: parsedAmenitiesEn.length > 0 ? parsedAmenitiesEn : ['Private Bathroom', 'Free Wi-Fi'],
      maxGuests: Number(roomForm.maxGuests) || 2,
      featured: !!roomForm.featured
    };

    let updatedRoomsList: Room[] = [];
    if (editingRoom) {
      updatedRoomsList = rooms.map(r => r.id === editingRoom.id ? finalRoomForm : r);
    } else {
      updatedRoomsList = [...rooms, finalRoomForm];
    }

    onUpdateRooms(updatedRoomsList);
    setEditingRoom(null);
    setIsAddingRoom(false);
    // Reset form fields
    setImagesInput('');
    setAmenitiesInputEs('');
    setAmenitiesInputEn('');
  };

  const handleStartEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomForm(room);
    setImagesInput(room.images?.join(', ') || room.image);
    setAmenitiesInputEs(room.amenities.join(', '));
    setAmenitiesInputEn(room.amenitiesEn.join(', '));
  };

  const handleStartAddRoom = () => {
    setEditingRoom(null);
    setIsAddingRoom(true);
    setRoomForm({
      id: 'room-' + Math.floor(1000 + Math.random() * 9000),
      name: '',
      nameEn: '',
      type: 'doble',
      bathroom: 'private',
      price: 55,
      description: '',
      descriptionEn: '',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      images: [],
      amenities: [],
      amenitiesEn: [],
      maxGuests: 2,
      featured: false
    });
    setImagesInput('');
    setAmenitiesInputEs('');
    setAmenitiesInputEn('');
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm(lang === 'es' ? '¿Estás seguro de eliminar esta habitación?' : 'Are you sure you want to delete this room?')) {
      const filtered = rooms.filter(r => r.id !== roomId);
      onUpdateRooms(filtered);
    }
  };

  // Manage Bookings
  const handleUpdateBookingStatus = (bookingId: string, status: 'confirmed' | 'pending' | 'cancelled') => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    onUpdateBookings(updated);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm(lang === 'es' ? '¿Seguro que deseas eliminar el registro de esta reserva?' : 'Are you sure you want to delete the record of this booking?')) {
      const filtered = bookings.filter(b => b.id !== bookingId);
      onUpdateBookings(filtered);
    }
  };

  const handleSaveBookingEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    const updated = bookings.map(b => b.id === editingBooking.id ? editingBooking : b);
    onUpdateBookings(updated);
    setEditingBooking(null);
  };

  // Manage Reviews
  const handleDeleteReview = (reviewId: string) => {
    if (confirm(lang === 'es' ? '¿Seguro que deseas eliminar esta opinión?' : 'Are you sure you want to delete this review?')) {
      const updated = reviews.filter(rev => rev.id !== reviewId);
      onUpdateReviews(updated);
    }
  };

  // Render Login state first
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-slate-100 p-3.5 rounded-full text-slate-800 border border-slate-200/60 shadow-inner">
            <Lock className="h-6 w-6 text-sky-600" />
          </div>
          <h2 className="text-3xl font-light tracking-tight text-slate-950 font-serif">
            {lang === 'es' ? 'Panel de Control del Administrador' : 'Administrator Control Panel'}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {lang === 'es' 
              ? 'Área reservada para el personal de Hostal Serramar. Ingrese su contraseña de acceso.' 
              : 'Authorized personnel access only. Please enter your protection passphrase.'}
          </p>
        </div>

        {authError && (
          <div className="bg-red-50 text-red-700 border border-red-100 p-3 rounded-xl text-xs font-semibold text-center select-none animate-shake">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
              {lang === 'es' ? 'Clave de Administrador' : 'Admin Passphrase'}
            </label>
            <input 
              type="password"
              placeholder={lang === 'es' ? 'Pruebe "admin" o "1234"' : 'Try "admin" or "1234"'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/90 focus:bg-white border hover:border-slate-300 border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 font-mono tracking-widest text-center"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-xl text-xs tracking-widest uppercase font-mono shadow-md hover:shadow-lg transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{lang === 'es' ? 'INICIAR SESIÓN' : 'LOG IN SECURELY'}</span>
          </button>
        </form>

        <div className="text-center">
          <button 
            type="button" 
            onClick={onClose}
            className="text-xs font-semibold text-slate-505 hover:text-slate-900 cursor-pointer transition hover:underline"
          >
            {lang === 'es' ? 'Volver a Web Pública' : 'Return to Public Guesthouse'}
          </button>
        </div>
      </div>
    );
  }

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const searchString = `${b.guestName} ${b.id} ${b.guestEmail} ${b.roomName}`.toLowerCase();
    const matchSearch = searchString.includes(bookingSearch.toLowerCase());
    const matchStatus = bookingFilterStatus === 'all' || b.status === bookingFilterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-slate-50 text-slate-800 rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Admin Panel Header Banner with live clocks */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-sky-500/15 text-sky-300 border border-sky-500/20 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono">
            <Sliders className="h-3.5 w-3.5 text-sky-400 rotate-90" />
            {lang === 'es' ? 'Panel de Control Serramar • Direct Office' : 'Serramar Direct Master Panel'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight font-serif text-white">
            {lang === 'es' ? 'Administración General' : 'Guesthouse Admin'}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {lang === 'es' ? 'Edita habitaciones, gestiona reservas completas y audita los comentarios del sitio.' : 'Change live room configurations, manage client reservations, and edit public feedback.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
            }}
            className="bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide border border-slate-705 cursor-pointer active:scale-95 transition"
          >
            {lang === 'es' ? 'Cerrar Sesión' : 'Log Out'}
          </button>
          
          <button
            onClick={onClose}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide cursor-pointer active:scale-95 transition shadow-md"
          >
            {lang === 'es' ? 'Volver a la Web' : 'Back to Website'}
          </button>
        </div>
      </div>

      {/* Internal Navigation Menu bar */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 pb-2.5 scrollbar-none scroll-smooth">
        <button
          onClick={() => { setAdminTab('dashboard'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'dashboard' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '📈 Cuadro de Mandos' : '📈 Dashboard Metrics'}
        </button>
        <button
          onClick={() => { setAdminTab('reservas'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'reservas' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '📅 Tracking de Reservas' : '📅 Bookings Tracker'}
        </button>
        <button
          onClick={() => { setAdminTab('habitaciones'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'habitaciones' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '🔑 Gestión de Habitaciones' : '🔑 Room Management'}
        </button>
        <button
          onClick={() => { setAdminTab('opiniones'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'opiniones' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '💬 Gestión de Opiniones' : '💬 Review Management'}
        </button>
        <button
          onClick={() => { setAdminTab('settings'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'settings' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '⚙️ Anuncios y Páginas' : '⚙️ Announcements & Pages'}
        </button>
        <button
          onClick={() => { setAdminTab('media'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'media' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '🖼️ Gestión de Imágenes' : '🖼️ Images & Media'}
        </button>
        <button
          onClick={() => { setAdminTab('integrations'); }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer shrink-0 ${
            adminTab === 'integrations' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          {lang === 'es' ? '🔌 Servidor y Métodos de Pago' : '🔌 Server & Payments'}
        </button>
      </div>

      {/* 2. TAB CONTROLLER LAYOUT */}

      {/* A. DASHBOARD VIEW */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Quick Stats Bento cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl border border-slate-150 p-5 space-y-3 shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                {lang === 'es' ? 'INGRESO TOTAL RESERVAS' : 'TOTAL REVENUE METRIC'}
              </span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                €{totalRevenue}
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">
                {lang === 'es' ? 'Solo reservas con status "Confirmadas"' : 'Aggregated from active verified bookings'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-150 p-5 space-y-3 shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-sky-500" />
                {lang === 'es' ? 'RESERVAS REALIZADAS' : 'VOLUME BOOKINGS'}
              </span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {bookings.length}
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium font-mono">
                {confirmedBookingsCount} {lang === 'es' ? 'Confirmadas' : 'Confirmed'} • {pendingBookingsCount} {lang === 'es' ? 'Pendientes' : 'Pending'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-150 p-5 space-y-3 shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Building className="h-4 w-4 text-amber-500" />
                {lang === 'es' ? 'HABITACIONES EN HOSTAL' : 'ROOM CONFIGURED'}
              </span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {rooms.length}
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">
                {lang === 'es' ? 'Habitaciones cargadas dinámicamente' : 'Configured in website database'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-150 p-5 space-y-3 shadow-sm">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                {lang === 'es' ? 'OPINIONES DE HUÉSPEDES' : 'TESTIMONIAL ARCHIVE'}
              </span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {reviews.length}
              </div>
              <p className="text-[10.5px] text-slate-500 font-medium">
                {lang === 'es' ? 'Puntuación promedio' : 'Average rate average'}: <strong className="text-amber-500 font-mono">{(reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)).toFixed(1)} / 5 ★</strong>
              </p>
            </div>

          </div>

          {/* Table summary of recent bookings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Calendar className="h-4.5 w-4.5 text-sky-650" />
                {lang === 'es' ? 'Últimas Reservas Sincronizadas' : 'Recent Synced Bookings'}
              </h3>
              <button 
                onClick={() => setAdminTab('reservas')}
                className="text-xs text-sky-650 font-bold hover:underline"
              >
                {lang === 'es' ? 'Ver todo el listado' : 'View full logs'} →
              </button>
            </div>

            {bookings.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">{lang === 'es' ? 'No se han registrado reservas aún en la plataforma.' : 'No customer reservations synchronized yet.'}</p>
            ) : (
              <div className="overflow-x-auto text-xs w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">{lang === 'es' ? 'Código ID' : 'Receipt ID'}</th>
                      <th className="py-2.5">{lang === 'es' ? 'Cliente' : 'Customer Name'}</th>
                      <th className="py-2.5">{lang === 'es' ? 'Habitación' : 'Selected Room'}</th>
                      <th className="py-2.5">{lang === 'es' ? 'Fechas Entrada/Salida' : 'Stay Dates'}</th>
                      <th className="py-2.5">{lang === 'es' ? 'Precio' : 'Fares'}</th>
                      <th className="py-2.5">{lang === 'es' ? 'Estado' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-3 font-mono font-bold text-sky-650">{b.id}</td>
                        <td className="py-3">
                          <p className="font-extrabold text-slate-900">{b.guestName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{b.guestEmail}</p>
                        </td>
                        <td className="py-3 font-medium text-slate-700">{b.roomName}</td>
                        <td className="py-3 font-medium font-mono text-[10.5px]">
                          {b.checkIn} {lang === 'es' ? 'al' : 'to'} {b.checkOut}
                        </td>
                        <td className="py-3 font-black text-slate-900 font-mono">€{b.totalPrice}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase inline-block ${
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                            b.status === 'pending' ? 'bg-amber-50 text-amber-850 border border-amber-100' :
                            'bg-red-50 text-red-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* B. RESERVATIONS LIST VIEW */}
      {adminTab === 'reservas' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="w-full md:max-w-md relative">
              <input
                type="text"
                placeholder={lang === 'es' ? 'Buscar por huésped, código o habitación...' : 'Search by client, reservation ID, or room...'}
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            {/* Status filtering dropdown */}
            <div className="flex bg-slate-100 border border-slate-250 p-1.5 rounded-xl gap-1 shrink-0">
              {(['all', 'confirmed', 'pending'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setBookingFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-[10.5px] font-bold uppercase transition cursor-pointer font-mono tracking-wider ${
                    bookingFilterStatus === status 
                      ? 'bg-sky-600 text-white shadow' 
                      : 'text-slate-600 hover:text-slate-900 bg-transparent'
                  }`}
                >
                  {status === 'all' ? (lang === 'es' ? 'Todas' : 'All') : status}
                </button>
              ))}
            </div>

          </div>

          {/* Master List of tracking bookings */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center bg-white p-12 border border-slate-150 rounded-2xl max-w-sm mx-auto">
                <p className="text-slate-450 font-extrabold text-xs mb-1">{lang === 'es' ? 'Sin resultados' : 'No entries match'}</p>
                <p className="text-[11px] text-slate-400">{lang === 'es' ? 'Intente cambiar las directivas de filtrado de búsqueda.' : 'Try adjusting the search query parameters.'}</p>
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-150 shadow-md p-5 flex flex-col lg:flex-row gap-5 items-stretch transition hover:shadow-lg relative"
                >
                  <div className="absolute top-5 right-5 flex gap-1.5">
                    <button 
                      onClick={() => setEditingBooking(b)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition"
                      title={lang === 'es' ? 'Editar Reserva' : 'Edit Booking'}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteBooking(b.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition"
                      title={lang === 'es' ? 'Eliminar Registro' : 'Delete Booking'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Booking ID and Price */}
                  <div className="lg:w-1/4 border-b lg:border-b-0 lg:border-r border-slate-150 pb-4 lg:pb-0 lg:pr-5 flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {lang === 'es' ? 'CÓDIGO DE RESERVACIÓN' : 'TRACKING ID CODE'}
                      </p>
                      <p className="text-xl font-mono font-black text-slate-900 tracking-wider">
                        {b.id}
                      </p>
                    </div>

                    <div className="pt-4 lg:pt-0">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        {lang === 'es' ? 'FAREZ IMPORTE TOTAL' : 'NET FARES SUM'}
                      </p>
                      <p className="text-2xl font-black text-sky-650 font-mono leading-none">
                        €{b.totalPrice}
                      </p>
                    </div>
                  </div>

                  {/* Booking details content */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    
                    <div className="space-y-1.5">
                      <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider block font-mono">{lang === 'es' ? 'TIPO DE ALOJAMIENTO' : 'CONFIRMED UNIT'}</span>
                      <p className="font-extrabold text-slate-905">{b.roomName}</p>
                      
                      <div className="pt-2 text-[11px] leading-relaxed text-slate-500 font-sans">
                        <p>👤 {b.guestName}</p>
                        <p>📧 {b.guestEmail}</p>
                        <p>📱 {b.guestPhone}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider block font-mono">{lang === 'es' ? 'ESTANCIA DE HUÉSPED' : 'STAY SCHEDULE'}</span>
                      <p className="font-bold text-slate-800">
                        🛫 {b.checkIn} al {b.checkOut}
                      </p>
                      <p className="text-[11px] text-slate-550 pt-0.5">
                        👥 {b.guests} {lang === 'es' ? 'Huéspedes' : 'Guests'}
                      </p>
                      {b.specialRequests && (
                        <div className="mt-2 bg-slate-50 border p-2 rounded-lg text-[10px] text-slate-600 border-slate-100 font-sans italic">
                          "{b.specialRequests}"
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Status update selector column */}
                  <div className="lg:w-1/5 border-t lg:border-t-0 lg:border-l border-slate-150 pt-4 lg:pt-0 lg:pl-5 flex flex-col justify-center items-end gap-2.5">
                    <span className="text-[9px] font-bold text-slate-400 font-mono tracking-wider text-right w-full block uppercase">{lang === 'es' ? 'ESTADO CONTEXTUAL' : 'LIFECYCLE STATE'}</span>
                    
                    <select
                      value={b.status}
                      onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                      className={`w-full text-center py-2 px-3 rounded-xl border font-bold font-mono text-[10px] tracking-wider uppercase cursor-pointer ${
                        b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-250' :
                        b.status === 'pending' ? 'bg-amber-50 text-amber-850 border-amber-250' :
                        'bg-red-50 text-red-800 border-red-200'
                      }`}
                    >
                      <option value="confirmed">confirmed</option>
                      <option value="pending">pending</option>
                      <option value="cancelled">cancelled</option>
                    </select>

                    <div className="text-[9.5px] text-slate-400 font-bold uppercase font-mono tracking-wider text-right">
                      {lang === 'es' ? 'Modificable por Cliente' : 'Guest editable'}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Form Modal/Section to Edit booking metadata directly */}
          {editingBooking && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={() => setEditingBooking(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-100 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </button>

                <h3 className="text-2xl font-light tracking-tight text-slate-950 font-serif">
                  {lang === 'es' ? 'Editar Parámetros de Reserva' : 'Edit Booking Metadata'}
                </h3>

                <form onSubmit={handleSaveBookingEdit} className="space-y-4 text-xs text-slate-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-bold font-mono uppercase tracking-wider text-[10px] text-slate-500">{lang === 'es' ? 'Nombre Huésped' : 'Guest Name'}</label>
                      <input 
                        type="text"
                        value={editingBooking.guestName}
                        onChange={(e) => setEditingBooking({ ...editingBooking, guestName: e.target.value })}
                        className="w-full bg-slate-50 border rounded p-2 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold font-mono uppercase tracking-wider text-[10px] text-slate-500">{lang === 'es' ? 'Email' : 'Guest Email'}</label>
                      <input 
                        type="email"
                        value={editingBooking.guestEmail}
                        onChange={(e) => setEditingBooking({ ...editingBooking, guestEmail: e.target.value })}
                        className="w-full bg-slate-50 border rounded p-2 text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-bold font-mono uppercase tracking-wider text-[10px] text-slate-500">{lang === 'es' ? 'Fecha Entrada' : 'Check-InDate'}</label>
                      <input 
                        type="date"
                        value={editingBooking.checkIn}
                        onChange={(e) => setEditingBooking({ ...editingBooking, checkIn: e.target.value })}
                        className="w-full bg-slate-50 border rounded p-2 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold font-mono uppercase tracking-wider text-[10px] text-slate-500">{lang === 'es' ? 'Fecha Salida' : 'Check-OutDate'}</label>
                      <input 
                        type="date"
                        value={editingBooking.checkOut}
                        onChange={(e) => setEditingBooking({ ...editingBooking, checkOut: e.target.value })}
                        className="w-full bg-slate-50 border rounded p-2 text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold font-mono uppercase tracking-wider text-[10px] text-slate-500">{lang === 'es' ? 'Precio Total (€)' : 'Total Cost'}</label>
                    <input 
                      type="number"
                      value={editingBooking.totalPrice}
                      onChange={(e) => setEditingBooking({ ...editingBooking, totalPrice: Number(e.target.value) })}
                      className="w-full bg-slate-50 border rounded p-2 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-bold font-mono uppercase tracking-wider text-[10px] text-slate-500">{lang === 'es' ? 'Peticiones Especiales' : 'Special requests'}</label>
                    <textarea 
                      value={editingBooking.specialRequests || ''}
                      onChange={(e) => setEditingBooking({ ...editingBooking, specialRequests: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-50 border rounded p-2 text-xs"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-sky-600 text-white font-bold py-2.5 rounded text-xs tracking-wider uppercase font-mono"
                    >
                      {lang === 'es' ? 'GUARDAR CAMBIOS' : 'SAVE CHANGES'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingBooking(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-705 px-4 font-bold rounded text-xs"
                    >
                      {lang === 'es' ? 'CANCELAR' : 'CANCEL'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* C. ROOMS LIST / MANAGEMENT VIEW */}
      {adminTab === 'habitaciones' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-sm">
            <h3 className="font-extrabold text-xs uppercase tracking-widest text-slate-450 font-mono">
              {lang === 'es' ? 'CATÁLOGO DE HABITACIONES CONFIGURADAS' : 'LIVE CONFIGURED ROOM CATALOG'}
            </h3>
            <button
              onClick={handleStartAddRoom}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg text-xs tracking-wider uppercase font-mono flex items-center gap-1.5 shadow"
            >
              <Plus className="h-4 w-4" />
              <span>{lang === 'es' ? 'Nueva Habitación' : 'Add New Room'}</span>
            </button>
          </div>

          {/* Edit / New Room Form representation integrated */}
          {(editingRoom || isAddingRoom) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-200/50 shadow-xl space-y-6"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="text-xl font-light text-slate-900 font-serif">
                  {editingRoom 
                    ? (lang === 'es' ? 'Editar Habitación' : 'Edit Room Properties') 
                    : (lang === 'es' ? 'Añadir Nueva Habitación' : 'Add New Custom Room')}
                </h4>
                <button 
                  onClick={() => { setEditingRoom(null); setIsAddingRoom(false); }}
                  className="text-slate-400 hover:text-slate-800 p-2 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveRoom} className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs text-slate-700">
                <div className="md:col-span-4 space-y-4">
                  <div>
                    <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Identificador Único (ID)' : 'Entity Unique Link ID'}</label>
                    <input
                      type="text"
                      value={roomForm.id}
                      onChange={(e) => setRoomForm({ ...roomForm, id: e.target.value })}
                      placeholder="ej. doble-terraza"
                      className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-505 focus:outline-none"
                      disabled={!!editingRoom}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Precio por Noche (€) *' : 'Fare Per Night (€) *'}</label>
                    <input
                      type="number"
                      value={roomForm.price}
                      onChange={(e) => setRoomForm({ ...roomForm, price: Number(e.target.value) })}
                      className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-505 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Huéspedes Máximos *' : 'Guest Limit *'}</label>
                    <input
                      type="number"
                      value={roomForm.maxGuests}
                      onChange={(e) => setRoomForm({ ...roomForm, maxGuests: Number(e.target.value) })}
                      min={1}
                      max={6}
                      className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-505 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold text-slate-505 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Baño Interno *' : 'Bathroom setup *'}</label>
                    <select
                      value={roomForm.bathroom}
                      onChange={(e) => setRoomForm({ ...roomForm, bathroom: e.target.value as any })}
                      className="w-full bg-slate-50 border rounded-xl p-2.5 font-bold tracking-wider cursor-pointer text-xs"
                    >
                      <option value="private">{lang === 'es' ? 'Baño Privado' : 'Private bathroom'}</option>
                      <option value="shared">{lang === 'es' ? 'Baño Compartido o Común' : 'Shared bathroom'}</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <input 
                      type="checkbox"
                      checked={!!roomForm.featured}
                      onChange={(e) => setRoomForm({ ...roomForm, featured: e.target.checked })}
                      className="h-4 w-4 bg-slate-900 text-amber-500 border-slate-700 rounded accent-amber-500 cursor-pointer"
                    />
                    <span className="font-bold">{lang === 'es' ? 'Inclusión Destacada (Home)' : 'Feature on Home Screen carousel'}</span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Nombre de la Habitación (ES) *' : 'Spanish Room Label *'}</label>
                      <input
                        type="text"
                        value={roomForm.name}
                        onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                        placeholder="ej. Doble Superior con Vistas"
                        className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-505 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Nombre en Inglés (EN) *' : 'English Room Label *'}</label>
                      <input
                        type="text"
                        value={roomForm.nameEn}
                        onChange={(e) => setRoomForm({ ...roomForm, nameEn: e.target.value })}
                        placeholder="ej. Deluxe Double Room"
                        className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-505 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Descripción (ES)' : 'Spanish Description'}</label>
                      <textarea
                        value={roomForm.description}
                        onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Descripción en Inglés (EN)' : 'English Description'}</label>
                      <textarea
                        value={roomForm.descriptionEn}
                        onChange={(e) => setRoomForm({ ...roomForm, descriptionEn: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'URL de Imagen Principal *' : 'Primary Image URL *'}</label>
                    <input
                      type="text"
                      value={roomForm.image}
                      onChange={(e) => setRoomForm({ ...roomForm, image: e.target.value })}
                      placeholder="ej. https://images.unsplash.com/..."
                      className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-sky-505 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Carrusel de Urls de Imagen (separados por coma)' : 'Image Slider URLs (comma separated)'}</label>
                    <input
                      type="text"
                      value={imagesInput}
                      onChange={(e) => setImagesInput(e.target.value)}
                      placeholder="URL1, URL2, URL3"
                      className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Comodidades ES (Separados por coma)' : 'Spanish Amenities (comma separated)'}</label>
                      <input
                        type="text"
                        value={amenitiesInputEs}
                        onChange={(e) => setAmenitiesInputEs(e.target.value)}
                        placeholder="Aire Acondicionado, Wi-Fi, Smart TV"
                        className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-bold text-slate-500 font-mono tracking-wider text-[9.5px] uppercase">{lang === 'es' ? 'Comodidades EN (Separados por coma)' : 'English Amenities (comma separated)'}</label>
                      <input
                        type="text"
                        value={amenitiesInputEn}
                        onChange={(e) => setAmenitiesInputEn(e.target.value)}
                        placeholder="Air conditioning, Wi-Fi"
                        className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs focus:ring-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-12 border-t pt-4 flex gap-3 justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase py-3 px-6 rounded-xl text-xs tracking-wider font-mono cursor-pointer transition shadow hover:shadow-lg"
                  >
                    {lang === 'es' ? '✓ GUARDAR HABITACIÓN' : '✓ SAVE ROOM'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingRoom(null); setIsAddingRoom(false); }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl text-xs uppercase"
                  >
                    {lang === 'es' ? 'CANCELAR' : 'CANCEL'}
                  </button>
                </div>
              </form>

            </motion.div>
          )}

          {/* Rooms List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <div 
                key={room.id}
                className="bg-white rounded-2xl border border-slate-150 p-4 flex flex-col justify-between hover:shadow-lg transition gap-4 text-xs font-sans relative"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-18 bg-slate-105 rounded-xl overflow-hidden shrink-0 border">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{lang === 'es' ? room.name : room.nameEn}</h4>
                    <p className="text-[10px] text-slate-400 font-mono font-bold pt-0.5">{room.id} • {room.bathroom} shower • max: {room.maxGuests} pax</p>
                    <p className="text-slate-505 mt-1 line-clamp-1">{lang === 'es' ? room.description : room.descriptionEn}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-2.5 rounded-xl">
                  <div className="font-mono text-sm">
                    <span className="text-[9px] text-slate-450 block font-bold font-sans tracking-wide">FARE</span>
                    <strong className="text-slate-900 text-base">€{room.price}</strong> <span className="text-slate-400">/n</span>
                  </div>

                  <div className="flex gap-1.5 shrink-0 z-10">
                    <button
                      onClick={() => handleStartEditRoom(room)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>{lang === 'es' ? 'Editar' : 'Edit'}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition"
                      title={lang === 'es' ? 'Eliminar Habitación' : 'Delete Room'}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* D. REVIEWS MANAGEMENT VIEW */}
      {adminTab === 'opiniones' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-xs">
          
          <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm">
            <h3 className="font-bold text-slate-75 * uppercase tracking-wider font-mono text-[10.5px]">
              {lang === 'es' ? 'MODERACIÓN DE COMENTARIOS Y TESTIMONIOS' : 'CUSTOMER FEEDBACK AUDIT BOARD'}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-950 text-sm">{rev.author}</span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-50 px-2 rounded border">{rev.date}</span>
                    {rev.roomType && (
                      <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 uppercase tracking-wide font-bold">{rev.roomType}</span>
                    )}
                  </div>
                  <div className="flex text-amber-450 gap-0.5 font-mono select-none">
                    {Array.from({ length: rev.rating }).map((_, i) => '★')}
                  </div>
                  <p className="text-slate-650 italic leading-relaxed text-xs">
                    "{lang === 'es' ? rev.comment : (rev.commentEn || rev.comment)}"
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteReview(rev.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-650 p-2.5 rounded-xl border border-red-100 hover:border-red-200 transition shrink-0 cursor-pointer self-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* E. SETTINGS & ANNOUNCEMENTS / PAGES VIEW */}
      {adminTab === 'settings' && (
        <div className="space-y-8 animate-in fade-in duration-200 text-xs">
          
          <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm">
            <h3 className="font-bold text-slate-750 uppercase tracking-wider font-mono text-[10.5px]">
              {lang === 'es' ? '⚙️ CONFIGURACIÓN DE ANUNCIOS Y PÁGINAS' : '⚙️ ANNOUNCEMENT & CUSTOM PAGES'}
            </h3>
            <p className="text-slate-400 mt-1">
              {lang === 'es' 
                ? 'Administra la barra de notificaciones superior ("anoncas") y crea páginas de contenido estático personalizadas para tus huéspedes.' 
                : 'Manage the top banner notifications and compile dynamic custom pages easily.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Announcement notification setup */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-900 border-b pb-2 flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-sky-600" />
                {lang === 'es' ? 'Barra de Alerta / Promo ("anonca")' : 'Active Promo Banner Settings'}
              </h4>

              <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="banner-enabled"
                    checked={activeAnnouncement.enabled}
                    onChange={(e) => setActiveAnnouncement({ ...activeAnnouncement, enabled: e.target.checked })}
                    className="h-4.5 w-4.5 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
                  />
                  <label htmlFor="banner-enabled" className="text-slate-700 font-bold cursor-pointer">
                    {lang === 'es' ? 'Mostrar barra de anuncio superior' : 'Enable top system banner announcement'}
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {lang === 'es' ? 'Estilo de Visualización' : 'Banner Visual Theme'}
                  </label>
                  <select
                    value={activeAnnouncement.style}
                    onChange={(e) => setActiveAnnouncement({ ...activeAnnouncement, style: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold focus:ring-2"
                  >
                    <option value="alert-yellow">⚡ {lang === 'es' ? 'Amarillo Energético' : 'Vibrant Amber'}</option>
                    <option value="alert-blue">💎 {lang === 'es' ? 'Azul Serramar' : 'Sky Blue'}</option>
                    <option value="alert-green">🍀 {lang === 'es' ? 'Verde Éxito / Directo' : 'Direct Green'}</option>
                    <option value="alert-red">🔥 {lang === 'es' ? 'Rojo Urgente' : 'Alert Red'}</option>
                    <option value="dark">🌙 {lang === 'es' ? 'Fondo Oscuro Elegante' : 'Elegant Dark'}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'es' ? 'Texto del Anuncio (ES)' : 'Announcement Text (ES)'}
                    </label>
                    <textarea
                      rows={2}
                      value={activeAnnouncement.textEs}
                      onChange={(e) => setActiveAnnouncement({ ...activeAnnouncement, textEs: e.target.value })}
                      placeholder="¡Ahorra un 10% inmediato reservando directamente en nuestra web oficial!"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'es' ? 'Texto del Anuncio (EN)' : 'Announcement Text (EN)'}
                    </label>
                    <textarea
                      rows={2}
                      value={activeAnnouncement.textEn}
                      onChange={(e) => setActiveAnnouncement({ ...activeAnnouncement, textEn: e.target.value })}
                      placeholder="Save an immediate 10% by finalizing your reservation direct on our web!"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold uppercase py-2.5 px-6 rounded-xl text-xs tracking-wider font-mono cursor-pointer transition shadow"
                  >
                    💾 {lang === 'es' ? 'Guardar Barra de Avisos' : 'Update Banner Announcement'}
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Custom static pages list and builder */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-900 border-b pb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-sky-600" />
                  <span>{lang === 'es' ? 'Páginas Personalizadas' : 'Add & Manage Custom Pages'}</span>
                </div>
                {!isAddingPage && !editingPage && (
                  <button
                    type="button"
                    onClick={handleStartAddPage}
                    className="bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase cursor-pointer transition flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    <span>{lang === 'es' ? 'Añadir' : 'Create'}</span>
                  </button>
                )}
              </h4>

              {/* Add/Edit page form */}
              {(isAddingPage || editingPage) && (
                <form onSubmit={handleSavePage} className="border p-4 rounded-xl bg-slate-50/50 space-y-3">
                  <h5 className="font-bold text-sky-700 uppercase tracking-wider text-[10px]">
                    {editingPage ? (lang === 'es' ? '🛠️ EDITANDO PÁGINA' : '🛠️ EDITING PAGE') : (lang === 'es' ? '➕ NUEVA PÁGINA' : '➕ NEW CUSTOM PAGE')}
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {lang === 'es' ? 'Identificador Slug (ej: ofertas-especiales)' : 'Page Slug ID (lowercase)'}
                      </label>
                      <input
                        type="text"
                        value={pageForm.id}
                        onChange={(e) => setPageForm({ ...pageForm, id: e.target.value })}
                        disabled={!!editingPage}
                        placeholder="ofertas"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Icon (React Lucide Name)
                      </label>
                      <select
                        value={pageForm.icon}
                        onChange={(e) => setPageForm({ ...pageForm, icon: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1"
                      >
                        <option value="Info">ℹ️ Info</option>
                        <option value="Sparkles">✨ Sparkles</option>
                        <option value="Building">🏢 Building</option>
                        <option value="Coffee">☕ Coffee</option>
                        <option value="MapPin">📍 Location</option>
                        <option value="Phone">📞 Phone</option>
                        <option value="FileText">📝 FileText</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {lang === 'es' ? 'Título en Español' : 'Title in Spanish'}
                      </label>
                      <input
                        type="text"
                        value={pageForm.titleEs}
                        onChange={(e) => setPageForm({ ...pageForm, titleEs: e.target.value })}
                        placeholder="Ofertas Especiales"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {lang === 'es' ? 'Título en Inglés' : 'Title in English'}
                      </label>
                      <input
                        type="text"
                        value={pageForm.titleEn}
                        onChange={(e) => setPageForm({ ...pageForm, titleEn: e.target.value })}
                        placeholder="Special Offers"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'es' ? 'Contenido de la Página (Español, soporta saltos de línea)' : 'Page Content (Spanish - simple text)'}
                    </label>
                    <textarea
                      rows={4}
                      value={pageForm.contentEs}
                      onChange={(e) => setPageForm({ ...pageForm, contentEs: e.target.value })}
                      placeholder="Contenido en español..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-sans focus:ring-1"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {lang === 'es' ? 'Contenido de la Página (Inglés, soporta saltos de línea)' : 'Page Content (English - simple text)'}
                    </label>
                    <textarea
                      rows={4}
                      value={pageForm.contentEn}
                      onChange={(e) => setPageForm({ ...pageForm, contentEn: e.target.value })}
                      placeholder="Content in English..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-sans focus:ring-1"
                    />
                  </div>

                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pageForm.isActive}
                        onChange={(e) => setPageForm({ ...pageForm, isActive: e.target.checked })}
                        className="h-4 w-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                      />
                      <span className="font-semibold text-slate-700">{lang === 'es' ? 'Página Activa' : 'Active status'}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pageForm.showInNav}
                        onChange={(e) => setPageForm({ ...pageForm, showInNav: e.target.checked })}
                        className="h-4 w-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                      />
                      <span className="font-semibold text-slate-700">{lang === 'es' ? 'Mostrar en Cabecera' : 'Show in navbar'}</span>
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg text-[10.5px] uppercase cursor-pointer"
                    >
                      {lang === 'es' ? '💾 Guardar' : '💾 Save Page'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditingPage(null); setIsAddingPage(false); }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg text-[10.5px] uppercase"
                    >
                      {lang === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                  </div>
                </form>
              )}

              {/* List of custom pages */}
              <div className="space-y-3">
                {customPages.length === 0 ? (
                  <p className="text-slate-400 italic py-4 text-center border border-dashed rounded-xl">
                    {lang === 'es' ? 'No hay páginas cargadas aún.' : 'No custom pages created yet.'}
                  </p>
                ) : (
                  customPages.map((p) => (
                    <div key={p.id} className="flex justify-between items-center border p-3 rounded-xl hover:bg-slate-50 transition">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-xs">
                            {lang === 'es' ? p.titleEs : p.titleEn}
                          </span>
                          {!p.isActive && (
                            <span className="text-[8px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              {lang === 'es' ? 'Oculto' : 'Hidden'}
                            </span>
                          )}
                          {p.showInNav && p.isActive && (
                            <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              NAVBAR
                            </span>
                          )}
                        </div>
                        <p className="text-[9.5px] font-mono text-slate-400 font-bold mt-0.5">slug: /{p.id} • icon: {p.icon}</p>
                      </div>

                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEditPage(p)}
                          className="p-1 px-2 text-[10px] bg-slate-100 hover:bg-slate-250 hover:text-slate-950 rounded border transition"
                        >
                          {lang === 'es' ? 'Editar' : 'Edit'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePage(p.id)}
                          className="p-1 text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-105"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* F. MEDIA & PICTURES VIEW */}
      {adminTab === 'media' && (
        <div className="space-y-8 animate-in fade-in duration-200 text-xs">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider font-mono text-[11px] flex items-center gap-2">
              🖼️ {lang === 'es' ? 'GESTIÓN DE IMÁGENES Y MULTIMEDIA' : 'GALLERY & IMAGE MANAGER'}
            </h3>
            <p className="text-slate-500 text-xs">
              {lang === 'es' 
                ? 'Personaliza y actualiza cada fotografía del sitio web. Sube tus propias fotos directamente desde tu dispositivo o ingresa un enlace de internet (URL).' 
                : 'Customize and update every visual asset of the website. Upload your own pictures directly from your device or reference high-quality internet URLs.'}
            </p>
          </div>

          <div className="space-y-8">
            
            {/* SECTION 1: HERO CAROUSEL PICTURES */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-6 text-left">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Building className="h-4 w-4 text-sky-600" />
                    {lang === 'es' ? '1. Carrusel de Portada (Diapositivas)' : '1. Home Page Slideshow'}
                  </h4>
                  <p className="text-slate-400 text-[10px] mt-0.5 mt-1 text-left">
                    {lang === 'es' ? 'Controla las imágenes y textos del carrusel principal en la página de inicio.' : 'Manage cover slide photos, tagline titles, and captions.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSlide = {
                      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
                      taglineEs: 'Nueva experiencia de Hostal',
                      taglineEn: 'New Hostal Experience',
                      titleEs: 'Descubre el confort familiar',
                      titleEn: 'Discover family comfort',
                      descEs: 'Nuestras mejores habitaciones reformadas con cuidado y ubicadas en Arroyo de la Miel.',
                      descEn: 'Our best high-quality rooms carefully arranged in Arroyo de la Miel.'
                    };
                    onUpdateHeroSlides([...heroSlides, newSlide]);
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 transition text-[10.5px] uppercase cursor-pointer shrink-0"
                >
                  <Plus className="h-3.5 w-3.5 font-bold" />
                  <span>{lang === 'es' ? 'Añadir Diapositiva' : 'Add Slide'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroSlides.map((slide, idx) => (
                  <div key={idx} className="border border-slate-150 rounded-2xl p-5 bg-slate-50/50 space-y-4 relative text-left">
                    <div className="absolute top-4 right-4 bg-slate-900 text-white text-[9.5px] font-bold px-2 py-0.5 rounded font-mono">
                      #{idx + 1}
                    </div>

                    <div className="flex gap-4">
                      {/* Image preview of the slide */}
                      <div className="w-24 h-24 rounded-lg bg-slate-200 overflow-hidden border border-slate-200 shadow-sm shrink-0">
                        <img src={slide.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono text-left">
                          {lang === 'es' ? 'Imagen de Fondo' : 'Background Image'}
                        </label>
                        {/* URL input */}
                        <input
                          type="text"
                          value={slide.image}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, image: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                          placeholder="https://..."
                        />
                        {/* Upload button wrapper */}
                        <div className="flex items-center gap-2">
                          <label className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1 px-3 rounded text-[9.5px] cursor-pointer transition uppercase text-center flex items-center justify-center gap-1 w-full">
                            <span>{lang === 'es' ? '📁 Subir Archivo' : '📁 Upload Photo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      const updated = [...heroSlides];
                                      updated[idx] = { ...slide, image: event.target.result as string };
                                      onUpdateHeroSlides(updated);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>

                          {heroSlides.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = heroSlides.filter((_, sIdx) => sIdx !== idx);
                                onUpdateHeroSlides(updated);
                              }}
                              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-1.5 rounded-lg transition shrink-0"
                              title={lang === 'es' ? 'Eliminar Diapositiva' : 'Remove Slide'}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Staggered text content editable fields for Slide */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] text-left">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-450 uppercase">{lang === 'es' ? 'Etiqueta (ES)' : 'Tagline (ES)'}</label>
                        <input
                          type="text"
                          value={slide.taglineEs}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, taglineEs: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border rounded p-1.5 text-[11px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-450 uppercase">{lang === 'es' ? 'Etiqueta (EN)' : 'Tagline (EN)'}</label>
                        <input
                          type="text"
                          value={slide.taglineEn}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, taglineEn: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border rounded p-1.5 text-[11px]"
                        />
                      </div>

                      <div className="space-y-1 col-span-2">
                        <label className="font-bold text-slate-450 uppercase">{lang === 'es' ? 'Título Directo (ES)' : 'Headline (ES)'}</label>
                        <input
                          type="text"
                          value={slide.titleEs}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, titleEs: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border rounded p-1.5 text-[11px] font-bold"
                        />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="font-bold text-slate-450 uppercase">{lang === 'es' ? 'Título Directo (EN)' : 'Headline (EN)'}</label>
                        <input
                          type="text"
                          value={slide.titleEn}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, titleEn: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border rounded p-1.5 text-[11px] font-bold"
                        />
                      </div>

                      <div className="space-y-1 col-span-2">
                        <label className="font-bold text-slate-450 uppercase">{lang === 'es' ? 'Descripción (ES)' : 'Description (ES)'}</label>
                        <textarea
                          rows={2}
                          value={slide.descEs}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, descEs: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border rounded p-1.5 text-[11px] leading-snug"
                        />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="font-bold text-slate-450 uppercase">{lang === 'es' ? 'Descripción (EN)' : 'Description (EN)'}</label>
                        <textarea
                          rows={2}
                          value={slide.descEn}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx] = { ...slide, descEn: e.target.value };
                            onUpdateHeroSlides(updated);
                          }}
                          className="w-full bg-white border rounded p-1.5 text-[11px] leading-snug"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: APARTMENT SUN KISSED SUITE IMAGES */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-6 text-left">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  {lang === 'es' ? '2. Galería de Fotos - Gran Carrusel de Habitaciones' : '2. Photo Gallery - Great Rooms Carousel'}
                </h4>
                <p className="text-slate-400 text-[10px] mt-0.5">
                  {lang === 'es' ? 'Edita las 4 imágenes destacadas del carrusel de nuestra pensión de confianza.' : 'Update the 4 iconic photos of the welcome carousel of our guest house.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {upgradeImages.map((imgUrl, idx) => (
                  <div key={idx} className="border border-slate-150 rounded-xl p-3 bg-slate-50 space-y-3 text-left">
                    <p className="font-mono font-bold text-[10px] text-slate-400">IMAGEN #{idx + 1}</p>
                    
                    <div className="aspect-[16/10] rounded-lg bg-slate-200 overflow-hidden border">
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...upgradeImages];
                          updated[idx] = e.target.value;
                          onUpdateUpgradeImages(updated);
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-[10.5px]"
                        placeholder="Link URL"
                      />

                      <label className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1 px-2.5 rounded text-[9.5px] cursor-pointer transition uppercase text-center block w-full">
                        <span>{lang === 'es' ? '📁 Subir Archivo' : '📁 Upload Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  const updated = [...upgradeImages];
                                  updated[idx] = event.target.result as string;
                                  onUpdateUpgradeImages(updated);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: HOME CONFORTS & CLEANLINESS LANDING POSTER */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4 text-left">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-sky-600" />
                  {lang === 'es' ? '3. Banner de Limpieza y Presentación (Portada)' : '3. Comfort / Cleanliness Banner Image'}
                </h4>
                <p className="text-slate-400 text-[10px] mt-0.5">
                  {lang === 'es' ? 'La foto destacada con la nota "9.4" de excelente limpieza en la portada.' : 'The main double bedroom presentation photo next to the 9.4 rating tag.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden border shadow-sm">
                  <img src={welcomeImage} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </div>

                <div className="md:col-span-3 space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono text-left">
                      {lang === 'es' ? 'Enlace Directo de la Imagen' : 'Image Location URL'}
                    </label>
                    <input
                      type="text"
                      value={welcomeImage}
                      onChange={(e) => onUpdateWelcomeImage(e.target.value)}
                      className="w-full bg-white border border-slate-250 rounded-xl p-2.5 font-mono text-[10.5px]"
                    />
                  </div>

                  <label className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition uppercase inline-flex items-center gap-1.5 shadow-sm active:scale-95">
                    <span>{lang === 'es' ? '📁 Subir Nueva Foto de Portada' : '📁 Upload New Cover Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              onUpdateWelcomeImage(event.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 4: EDIT IMAGES BY ROOM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-6 text-left">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-sky-600" />
                  {lang === 'es' ? '4. Fotografías por Habitación' : '4. Images per Specific Room Accommodation'}
                </h4>
                <p className="text-slate-400 text-[10px] mt-0.5">
                  {lang === 'es' ? 'Actualiza rápidamente la foto principal o las fotos secundarias de cada alojamiento.' : 'Update major cover or sub-gallery images across any room.'}
                </p>
              </div>

              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="border border-slate-150 rounded-xl p-4 bg-slate-50/30 flex flex-col md:flex-row gap-4 items-start text-left">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border shrink-0 bg-slate-150">
                      <img src={room.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>

                    <div className="flex-1 space-y-3 w-full text-left">
                      <div className="flex justify-between items-center border-b pb-1.5">
                        <span className="font-extrabold text-slate-800 text-xs">
                          {lang === 'es' ? room.name : room.nameEn}
                        </span>
                        <span className="text-[9px] font-mono bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                          {room.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block text-left">{lang === 'es' ? 'Imagen Principal de la Habitación' : 'Primary Room Cover'}</label>
                          <input
                            type="text"
                            value={room.image}
                            onChange={(e) => {
                              const updated = rooms.map(r => r.id === room.id ? { ...r, image: e.target.value } : r);
                              onUpdateRooms(updated);
                            }}
                            className="w-full bg-white border rounded p-1.5 text-[10.5px] font-mono"
                          />
                          <label className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-center font-bold px-2 py-1 rounded text-[9px] uppercase cursor-pointer block mt-1">
                            <span>{lang === 'es' ? '📁 Cambiar Foto Principal' : '📁 Upload Photo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      const updated = rooms.map(r => r.id === room.id ? { ...r, image: event.target.result as string } : r);
                                      onUpdateRooms(updated);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block text-left">{lang === 'es' ? 'Imágenes de la Galería (Separadas por saltos o comas)' : 'Gallery Images'}</label>
                          <textarea
                            rows={3}
                            value={(room.images || []).join(', ')}
                            onChange={(e) => {
                              const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              const updated = rooms.map(r => r.id === room.id ? { ...r, images: arr } : r);
                              onUpdateRooms(updated);
                            }}
                            className="w-full bg-white border rounded p-1.5 text-[10px] font-mono leading-snug"
                            placeholder="url1, url2, url3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* D. INTEGRATIONS & PAYMENTS CONFIGURATION PANEL */}
      {adminTab === 'integrations' && (
        <div className="space-y-6 text-left animate-in fade-in duration-200">
          
          {/* Welcome Integration Hero Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-805 p-6 rounded-3xl text-white border border-slate-800 space-y-3 relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 bg-sky-950/65 px-2.5 py-1 rounded-md border border-sky-900/40 uppercase">
                {lang === 'es' ? 'COCKPIT DE PRODUCCIÓN • EN LÍNEA' : 'PRODUCTION COCKPIT • ACTIVE'}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-light font-serif tracking-tight text-white">
              {lang === 'es' ? 'Sincronizar sunserramar.com' : 'Sinking sunserramar.com'}
            </h3>
            <p className="text-xs text-slate-350 max-w-2xl leading-relaxed">
              {lang === 'es' 
                ? 'Conecte y administre la base de datos MongoDB Atlas para reservas permanentes y el reenvío de correo directo. Las reservas y pagos se gestionan via Cloudbeds.' 
                : 'Connect and manage MongoDB Atlas for persistent bookings and direct SMTP email notifications. Bookings and payments are handled via Cloudbeds.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN: LIVE CREDENTIAL STATUS */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* STATUS INDICATORS CARD */}
              <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6 text-left">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="h-4.5 w-4.5 text-sky-600" />
                      {lang === 'es' ? 'Estado Físico de Servidores y Enlaces' : 'Live Gateway Connectivity Audit'}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {lang === 'es' ? 'Consultando variables .env activas en sunserramar.com de forma segura.' : 'Querying real-time production parameters on sunserramar.com backend securely.'}
                    </p>
                  </div>
                  <button 
                    onClick={fetchIntegrationStatus}
                    disabled={isLoadingStatus}
                    className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition shrink-0 border ml-2"
                    title="Reload Status"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoadingStatus ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Database status widget */}
                  <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-slate-50/20 text-left">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-450 block">1. DATABASE (MongoDB)</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-sky-50 p-2 rounded-xl text-sky-600 border shrink-0">
                        <Database className="h-5 w-5" />
                      </div>
                      <div className="text-left leading-normal">
                        <p className="text-xs font-black text-slate-800">MongoDB Atlas</p>
                        <p className="text-[9px] text-slate-400 font-mono">sunserramar</p>
                      </div>
                    </div>
                    {integrationStatus?.mongo?.configured ? (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border border-emerald-150">
                          ● {lang === 'es' ? 'CONECTADO' : 'ACTIVE'}
                        </span>
                        <p className="text-[8px] font-mono text-slate-500 overflow-ellipsis truncate">{integrationStatus.mongo.urlMasked}</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border border-amber-150">
                          ● {lang === 'es' ? 'MEMORIA LOCAL (MOCK)' : 'SANDBOX EMULATION'}
                        </span>
                        <p className="text-[8px] text-slate-450 leading-snug">
                          {lang === 'es' ? 'Usando base en memoria integrada. Agrega MONGODB_URI.' : 'Active local memory persistence. Add MONGODB_URI secret.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mail routing widget */}
                  <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-slate-50/20 text-left">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-450 block">2. MAIL ROUTING (SMTP)</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600 border shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="text-left leading-normal">
                        <p className="text-xs font-black text-slate-800">Gmail Forwarding</p>
                        <p className="text-[9px] text-slate-400 font-mono truncate max-w-[130px]">{integrationStatus?.recipientEmail || 'contact@sunserramar.com'}</p>
                      </div>
                    </div>
                    {integrationStatus?.smtp?.configured ? (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border border-emerald-150">
                          ● {lang === 'es' ? 'SMTP LISTO' : 'SMTP ACTIVE'}
                        </span>
                        <p className="text-[8px] font-mono text-slate-500 truncate">{integrationStatus.smtp.host} ({integrationStatus.smtp.user})</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-850 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border border-amber-150">
                          ● LOGS DIRECTOS
                        </span>
                        <p className="text-[8px] text-slate-450 leading-snug">
                          {lang === 'es' ? 'Logs de consola activos. Emails dirigidos a contact@sunserramar.com.' : 'Logging in terminal active. Default target is contact@sunserramar.com.'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Cloudbeds booking widget */}
                  <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-slate-50/20 text-left">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-450 block">3. ONLINE BOOKINGS</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-sky-50 p-2 rounded-xl text-sky-600 border shrink-0">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div className="text-left leading-normal">
                        <p className="text-xs font-black text-slate-800">Cloudbeds PMS</p>
                        <p className="text-[9px] text-slate-400 font-mono">PROPERTY eh45iO</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border border-emerald-150">
                        ● ACTIVE
                      </span>
                      <p className="text-[8px] text-slate-400 font-medium">
                        {lang === 'es' ? 'Reservas gestionadas en Cloudbeds. Todos los botones redirigen al motor oficial.' : 'Bookings managed in Cloudbeds. All buttons redirect to the official booking engine.'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* DB & PERSISTENCE DIAGNOSTICS */}
                <div className="border-t border-slate-150 pt-4 text-xs">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-widest text-[10px] mb-2 font-mono flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-slate-500" />
                    {lang === 'es' ? 'Análisis de Tablas Activas del Dominio' : 'sunserramar.com Live Schemas'}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border space-y-1 leading-normal text-left">
                      <span className="text-[8.5px] font-bold text-slate-450 font-mono tracking-wider block uppercase">COLL: bookings</span>
                      <p className="text-slate-700 text-[11px] font-medium">
                        {lang === 'es' ? `Colección MongoDB que registra todas las estancias por código localizador. Sincronizadas: ${bookings.length}` : `All guests stays records mapped by receipt localizer. Active instances: ${bookings.length}`}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border space-y-1 leading-normal text-left">
                      <span className="text-[8.5px] font-bold text-slate-450 font-mono tracking-wider block uppercase">COLL: contacts</span>
                      <p className="text-slate-700 text-[11px] font-medium">
                        {lang === 'es' ? 'Fichero de mensajes, consultas e inquietudes de clientes entregados por formulario oficial.' : 'Inquiries file recording guest demands, requests and text blocks delivered from public form.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE COMPONENT: SMTP MAIL ENGINE TEST */}
              <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6 text-left">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="h-4.5 w-4.5 text-indigo-600" />
                    {lang === 'es' ? 'Prueba de Reenvío Directo de Correo' : 'Instant SMTP Relay Validator'}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {lang === 'es' ? 'Envía una consulta simulada desde sunserramar.com para corroborar que tu SMTP distribuye las alertas en contact@sunserramar.com.' : 'Fire a dynamic simulation card to test email delivery from sunserramar.com straight to contact@sunserramar.com.'}
                  </p>
                </div>

                <form onSubmit={handleSendTestSmtp} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 font-mono block uppercase">{lang === 'es' ? 'Correo Electrónico de Envío' : 'Recipient Forward Sandbox'}</label>
                      <input 
                        type="email"
                        value={testSmtpEmail}
                        onChange={(e) => setTestSmtpEmail(e.target.value)}
                        className="w-full bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-sky-501 focus:bg-white text-slate-800 text-[11px] font-mono"
                        placeholder="contact@sunserramar.com"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 flex flex-col justify-end">
                      <button
                        type="submit"
                        disabled={isSendingTest}
                        className="w-full bg-sky-900 text-white font-extrabold font-mono tracking-wide px-4 py-3.5 rounded-xl uppercase hover:bg-slate-950 active:scale-95 transition text-[11px] text-center cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSendingTest ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            <span>{lang === 'es' ? 'ENVIANDO...' : 'FORWARDING...'}</span>
                          </>
                        ) : (
                          <>
                            <Sliders className="h-3.5 w-3.5" />
                            <span>{lang === 'es' ? 'DISPARAR TEST SMTP' : 'FIRE SMTP TEST'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {testMailFeedback && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed font-semibold font-mono ${
                      testMailFeedback.success 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                      {testMailFeedback.success ? '✓' : '⚠️'} {testMailFeedback.msg}
                    </div>
                  )}
                </form>
              </div>

              {/* BOOKING & EMAIL SETUP MANUAL */}
              <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6 text-left">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="h-4.5 w-4.5 text-sky-600" />
                    {lang === 'es' ? 'Configuracion de Reservas y Email' : 'Bookings & Email Setup'}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {lang === 'es' ? 'Gestion de reservas via Cloudbeds y notificaciones por email SMTP.' : 'Booking management via Cloudbeds and SMTP email notifications.'}
                  </p>
                </div>

                  {/* Cloudbeds setup instructions */}
                  <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <span className="md:col-span-1 bg-sky-50 text-sky-800 border border-sky-200 w-8 h-8 rounded-full flex items-center justify-center font-bold tracking-tight text-center shrink-0">1</span>
                      <div className="md:col-span-11 leading-normal">
                        <strong className="text-slate-900 block font-bold mb-0.5">{lang === 'es' ? 'Reservas via Cloudbeds' : 'Bookings via Cloudbeds'}</strong>
                        <p>{lang === 'es' ? 'Todos los botones de reserva redirigen directamente a https://us2.cloudbeds.com/en/reservation/eh45iO. No se procesan pagos en esta web.' : 'All booking buttons redirect directly to https://us2.cloudbeds.com/en/reservation/eh45iO. No payments are processed on this website.'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <span className="md:col-span-1 bg-sky-50 text-sky-800 border border-sky-200 w-8 h-8 rounded-full flex items-center justify-center font-bold tracking-tight text-center shrink-0">2</span>
                      <div className="md:col-span-11 leading-normal">
                        <strong className="text-slate-900 block font-bold mb-0.5">{lang === 'es' ? 'Notificaciones por email' : 'Email notifications'}</strong>
                        <p>{lang === 'es' ? 'Configure SMTP_HOST, SMTP_USER y SMTP_PASSWORD en las variables de entorno de Render para recibir copias de reservas en contact@sunserramar.com.' : 'Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD in Render environment variables to receive booking copies at contact@sunserramar.com.'}</p>
                      </div>
                    </div>
                  </div>
              </div>

            </div>

            {/* RIGHT COLUMN: SECRETS CONTROLS & CHECKLIST */}
            <div className="lg:col-span-4 space-y-6">

              {/* ENV ARCHITECTURE CARD SUMMARY */}
              <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 space-y-4">
                <div className="border-b border-slate-800 pb-3 flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold tracking-wider uppercase text-[10px] text-slate-400 font-mono">
                    {lang === 'es' ? 'Listado Completo de Secretos .env' : '.env secrets matching list'}
                  </span>
                </div>

                <p className="text-[10px] leading-relaxed text-slate-400">
                  {lang === 'es' 
                    ? 'Estas claves deben estar alojadas en su servidor físico para que sunserramar.com se enlace directamente con sus cuentas de Stripe, MongoDB y Gmail.' 
                    : 'Configure these exact keys under your production server panel to fully unlock automated persistence and credit card gateways.'}
                </p>

                <div className="space-y-3 font-mono text-[10px]">
                  
                  {/* Item 1 */}
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center gap-2">
                    <div className="truncate">
                      <p className="font-extrabold text-slate-350">MONGODB_URI</p>
                      <p className="text-[8px] text-slate-500 font-sans truncate">mongodb+srv://cl...</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${integrationStatus?.mongo?.configured ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {integrationStatus?.mongo?.configured ? 'SET' : 'MISSING'}
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center gap-2">
                    <div className="truncate">
                      <p className="font-extrabold text-slate-350">SMTP_USER</p>
                      <p className="text-[8px] text-slate-500 font-sans truncate">sender@sunserramar...</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${integrationStatus?.smtp?.configured ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {integrationStatus?.smtp?.configured ? 'SET' : 'MISSING'}
                    </span>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center gap-2">
                    <div className="truncate">
                      <p className="font-extrabold text-slate-350">NOTIFICATION_EMAIL</p>
                      <p className="text-[8px] text-slate-500 font-sans truncate">contact@sunserramar.c...</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400">
                      SET
                    </span>
                  </div>

                </div>
              </div>

              {/* TECHNICAL INTEGRATION METRICS NOTES */}
              <div className="bg-white p-5 rounded-3xl border border-slate-150 space-y-4">
                <div className="border-b pb-2.5 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-sky-600" />
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                    sunserramar.com DNS
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-505">
                  {lang === 'es'
                    ? 'Para habilitar los correos SMTP salientes oficiales con Hostal Serramar y evitar re-envíos a spam, configure los registros SPF y DKIM de TXT provistos por su proveedor SMTP en su zona DNS correspondiente.'
                    : 'To make sure system receipts are delivered cleanly to contact@sunserramar.com and your customers, verify your DNS SPF / DKIM TXT keys on sunserramar.com domain panel.'}
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
