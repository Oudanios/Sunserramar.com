import React, { useState } from 'react';
import { 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit, 
  Trash2, 
  HelpCircle, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  Coffee,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Booking } from '../types';
import BookingEmailTemplate from './BookingEmailTemplate';

interface ClientDashboardProps {
  lang: 'es' | 'en';
  bookings: Booking[];
  onUpdateBooking: (updatedBooking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onClose: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function ClientDashboard({ 
  lang, 
  bookings, 
  onUpdateBooking, 
  onCancelBooking,
  onClose,
  showToast
}: ClientDashboardProps) {
  // Login State
  const [reservationCode, setReservationCode] = useState('');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Booking>>({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [dashboardViewMode, setDashboardViewMode] = useState<'voucher' | 'email'>('voucher');

  // Authenticate client by reservation code (match case-insensitive)
  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedCode = reservationCode.trim().toUpperCase();
    
    try {
      const res = await fetch(`/api/bookings/${cleanedCode}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.booking) {
          onUpdateBooking(data.booking);
          setActiveBooking(data.booking);
          setEditForm(data.booking);
          setLoginError(null);
          setUpdateSuccess(false);
          return;
        }
      }
    } catch (err) {
      console.error('Failed to fetch booking from server:', err);
    }

    // Fallback: Find booking locally
    const found = bookings.find(b => b.id.toUpperCase() === cleanedCode);
    if (found) {
      setActiveBooking(found);
      setEditForm(found);
      setLoginError(null);
      setUpdateSuccess(false);
    } else {
      setLoginError(
        lang === 'es' 
          ? 'Código de reserva no encontrado. Verifique el formato (ej. BKR-XXXXXX) o consulte el email de confirmación.' 
          : 'Booking ID code not found. Please review the identifier (e.g., BKR-XXXXXX) or look into your voucher mail.'
      );
    }
  };

  // Submit profile edit changes
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !editForm) return;

    const merged: Booking = {
      ...activeBooking,
      guestName: editForm.guestName || activeBooking.guestName,
      guestEmail: editForm.guestEmail || activeBooking.guestEmail,
      guestPhone: editForm.guestPhone || activeBooking.guestPhone,
      specialRequests: editForm.specialRequests || activeBooking.specialRequests,
    };

    onUpdateBooking(merged);
    setActiveBooking(merged);
    setIsEditing(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 4000);
  };

  const handleCancelStayClick = () => {
    showToast(
      lang === 'es'
        ? 'Reserva no reembolsable: para incidencias, contacte recepción o WhatsApp.'
        : 'Non-refundable booking: for exceptions, contact reception or WhatsApp.',
      'error'
    );
  };

  return (
    <div className="bg-slate-50 text-slate-800 rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Client Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 relative overflow-hidden shadow-lg">
        <div className="absolute inset-x-0 bottom-0 top-[60%] bg-gradient-to-t from-sky-500/5 to-transparent pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            {lang === 'es' ? 'Servicios de Huésped • Autologin Directo' : 'Guest Portal Services'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight font-serif text-white">
            {lang === 'es' ? 'Zona del Cliente' : 'Client Hub Office'}
          </h2>
          <p className="text-xs text-slate-450 font-medium">
            {lang === 'es' ? 'Consulta pormenores, modifica tu perfil y solicita servicios para tu estancia.' : 'Review arrival schedules, update personal details, or request extra comfort.'}
          </p>
        </div>

        {activeBooking && (
          <button
            onClick={() => setActiveBooking(null)}
            className="relative z-10 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono border border-slate-705 cursor-pointer active:scale-95 transition shrink-0"
          >
            {lang === 'es' ? 'Cambiar Reserva' : 'Switch Booking Key'}
          </button>
        )}
      </div>

      {/* 1. GUEST ACCESS COMPONENT (If not logged in) */}
      {!activeBooking ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex bg-slate-50 border p-3 rounded-full text-sky-600">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-light tracking-tight text-slate-900 font-serif">
              {lang === 'es' ? 'Recuperar Factura y Estancia' : 'Locate Booking & Stay'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'es' 
                ? 'Introduce el código exclusivo que se te asignó tras finalizar tu proceso de reserva.' 
                : 'Enter your unique booking reference number emailed to you once confirmed.'}
            </p>
          </div>

          {loginError && (
            <div className="bg-amber-50 text-amber-800 border border-amber-100 p-3 rounded-xl text-xs font-semibold text-center leading-relaxed">
              {loginError}
            </div>
          )}

          <form onSubmit={handleClientLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                {lang === 'es' ? 'Código ID de Reserva' : 'Reservation Code Key'}
              </label>
              <input 
                type="text"
                placeholder="ej. BKR-123456"
                value={reservationCode}
                onChange={(e) => setReservationCode(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/95 focus:bg-white border hover:border-slate-300 border-slate-200 rounded-xl p-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-505 transition text-slate-805 text-center font-mono placeholder:font-sans uppercase tracking-[0.05em]"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-xl text-xs tracking-widest uppercase font-mono shadow-md hover:shadow-lg transition cursor-pointer active:scale-95"
            >
              {lang === 'es' ? 'BUSCAR MI RESERVA' : 'RETRIEVE SYSTEM LOG'}
            </button>
          </form>

          <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 text-center text-[10.5px] text-slate-500 space-y-1.5">
            <p className="font-bold text-slate-705">💡 {lang === 'es' ? '¿No la encuentras?' : 'Lost your voucher?'}</p>
            <p className="leading-snug">
              {lang === 'es'
                ? 'Ponte en contacto con administración llamando al +34 951 20 70 72 indicando tu DNI o nombre.'
                : 'Contact official reception helpdesk at +34 951 20 70 72 stating your ID card.'}
            </p>
          </div>
        </div>
      ) : (
        
        // 2. ACTIVE DASHBOARD INTERACTIVE AREA
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            {updateSuccess && (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-xl text-xs font-bold text-center animate-bounce">
                ✓ {lang === 'es' ? 'Sus datos de reserva se han actualizado y sincronizado correctamente.' : 'Your guest details has been successfully updated.'}
              </div>
            )}

            {/* Tab Switcher */}
            <div className="flex bg-slate-200 p-1.5 rounded-2xl max-w-sm mb-6 border border-slate-300">
              <button
                type="button"
                onClick={() => setDashboardViewMode('voucher')}
                className={`flex-1 py-2.5 rounded-xl font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  dashboardViewMode === 'voucher'
                    ? 'bg-slate-900 text-white shadow-md font-black'
                    : 'text-slate-650 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                🎟️ {lang === 'es' ? 'Bono Móvil' : 'Mobile Pass'}
              </button>
              <button
                type="button"
                onClick={() => setDashboardViewMode('email')}
                className={`flex-1 py-2.5 rounded-xl font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  dashboardViewMode === 'email'
                    ? 'bg-slate-900 text-white shadow-md font-black'
                    : 'text-slate-650 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                📧 {lang === 'es' ? 'Copia Email' : 'Email Receipt'}
              </button>
            </div>

            {dashboardViewMode === 'voucher' ? (
              /* Visual Boarding pass Voucher coupon representation */
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative group animate-in fade-in duration-300">
                
                {/* Notches */}
                <div className="absolute left-0 right-0 top-[28%] h-0 border-t-2 border-dashed border-slate-200 z-10 pointer-events-none">
                  <span className="absolute -left-3.5 -top-3.5 w-7 h-7 bg-slate-50 rounded-full border border-slate-200" />
                  <span className="absolute -right-3.5 -top-3.5 w-7 h-7 bg-slate-50 rounded-full border border-slate-200" />
                </div>

                {/* Pass Header segment */}
                <div className="bg-slate-950 text-white p-6 sm:p-8 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                      {lang === 'es' ? '✓ Reserva Confirmada' : '✓ Stay Confirmed'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono font-bold">HOSTAL SERRAMAR</span>
                  </div>

                  <div className="flex justify-between items-end gap-3 pt-1">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">{lang === 'es' ? 'CÓDIGO DE LOCALIZACIÓN' : 'LOCATOR CODE'}</span>
                      <p className="text-xl sm:text-2xl font-black text-amber-450 font-mono tracking-widest">{activeBooking.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">{lang === 'es' ? 'PRECIO TOTAL NETO' : 'TOTAL RATE'}</span>
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">€{activeBooking.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Pass details segment */}
                <div className="p-6 sm:p-8 pt-10 space-y-6 bg-gradient-to-b from-slate-50 to-white text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono mb-0.5">{lang === 'es' ? 'TITULAR DE LA RESERVA' : 'RECIPIENT GUEST'}</span>
                      <p className="font-extrabold text-slate-900 text-sm">{activeBooking.guestName}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono mb-0.5">{lang === 'es' ? 'HABITACIÓN SELECCIONADA' : 'BOOKED UNIT'}</span>
                      <p className="font-extrabold text-slate-900 text-sm">{activeBooking.roomName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-150 pt-4 font-mono">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono mb-1">{lang === 'es' ? 'Llegada / Check-In' : 'Arrival Date'}</span>
                      <p className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-sky-600 shrink-0" />
                        {activeBooking.checkIn}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono mb-1">{lang === 'es' ? 'Salida / Check-Out' : 'Departure Date'}</span>
                      <p className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-sky-601 shrink-0" />
                        {activeBooking.checkOut}
                      </p>
                    </div>
                  </div>

                  {activeBooking.specialRequests && (
                    <div className="bg-sky-50/50 p-4 border border-sky-100 rounded-2xl space-y-1">
                      <span className="text-[9px] font-bold text-sky-750 tracking-wider font-mono block uppercase">{lang === 'es' ? 'Peticiones Adicionales' : 'Special Comments'}:</span>
                      <p className="text-slate-655 italic leading-relaxed">{activeBooking.specialRequests}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9.5px] text-slate-450 leading-relaxed">
                    <div className="text-center sm:text-left space-y-0.5 font-medium">
                      <p>⭐ {lang === 'es' ? 'Muestra este bono en recepción (móvil o impreso) para tu ingreso.' : 'Hand over this ticket vouchers at reception desks.'}</p>
                      <p>{lang === 'es' ? 'Soporte Directo: +34 951 20 70 72' : 'Helpdesk hotlines: +34 951 20 70 72'}</p>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/90 text-slate-800 font-bold font-mono tracking-wide py-2.5 px-4 rounded-xl text-xs transition active:scale-95 cursor-pointer shrink-0 border"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>{lang === 'es' ? 'Editar Perfil' : 'Change Profile'}</span>
                    </button>
                  </div>

                  {/* Simulated Barcode */}
                  <div className="text-center pt-2 select-none opacity-80 pointer-events-none">
                    <p className="text-slate-900 font-mono text-xl tracking-[0.3em] leading-none">
                      |||| || | |||| || ||| | ||| |||| | |||| |||
                    </p>
                  </div>

                </div>

              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <BookingEmailTemplate 
                  lang={lang === 'es' ? 'es' : 'en'} 
                  booking={activeBooking} 
                />
                
                {/* Resend Confirmation via Email Button */}
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={async () => {
                      showToast(lang === 'es' ? 'Enviando...' : 'Sending...', 'success');
                      try {
                        const res = await fetch('/api/bookings/save', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ booking: activeBooking })
                        });
                        if (res.ok) {
                          showToast(lang === 'es' ? '¡Confirmación enviada con éxito!' : 'Confirmation successfully sent!', 'success');
                        } else {
                          showToast(lang === 'es' ? 'Error al enviar.' : 'Error sending.', 'error');
                        }
                      } catch (err) {
                        showToast(lang === 'es' ? 'Error al enviar.' : 'Error sending.', 'error');
                      }
                    }}
                    className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-xl font-bold font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {lang === 'es' ? 'Reenviar Confirmación' : 'Resend Confirmation'}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right sidebar actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Guesthouse guidelines card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-150 shadow-md space-y-4">
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 font-mono">
                {lang === 'es' ? 'Información para Huéspedes' : 'Key Guidelines'}
              </h4>

              <div className="space-y-4 text-xs leading-relaxed text-slate-600">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">🕒 {lang === 'es' ? 'Horario Check-in' : 'Check-In Hour'}</p>
                  <p className="text-slate-500">{lang === 'es' ? 'A partir de las 13:00h (Llámenos para llegadas tardías).' : 'From 1:00 PM (Let us know for late check-in request).'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">🕒 {lang === 'es' ? 'Horario Check-out' : 'Check-Out Hour'}</p>
                  <p className="text-slate-500">{lang === 'es' ? 'Antes de las 11:30h en recepción.' : 'Prior to 11:30 AM.'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">☕ {lang === 'es' ? 'Café en Recepción' : 'Free Morning Coffee'}</p>
                  <p className="text-slate-500">{lang === 'es' ? 'Café de cortesía gratuito todas las mañanas de 8am a 10:30am.' : 'Complimentary morning brew between 8am and 10:30am.'}</p>
                </div>
              </div>
            </div>

            {/* Cancel policy panel */}
            <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 space-y-3">
              <p className="text-[10px] shrink-0 font-bold text-red-700 tracking-wider font-mono uppercase">{lang === 'es' ? 'Política de Cancelación' : 'Cancellation Policy'}</p>
              <p className="text-xs text-slate-505 leading-relaxed text-justify">
                {lang === 'es'
                  ? 'Las reservas confirmadas son no reembolsables y no admiten cancelación gratuita. La disponibilidad se sincroniza en tiempo real con Booking, Expedia, Airbnb y otros canales.'
                  : 'Confirmed bookings are non-refundable and do not allow free cancellation. Availability is synchronized in real time with Booking, Expedia, Airbnb, and other channels.'}
              </p>
              <button
                onClick={handleCancelStayClick}
                className="w-full inline-flex justify-center items-center gap-1.5 bg-white hover:bg-red-50 border border-red-250 hover:border-red-300 text-red-650 font-bold py-2.5 rounded-xl text-xs transition duration-200 cursor-pointer text-center font-mono tracking-wide"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{lang === 'es' ? 'CONTACTAR RECEPCIÓN' : 'CONTACT RECEPTION'}</span>
              </button>
            </div>

          </div>

          {/* Form Modal to Edit Profile details */}
          {isEditing && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl border border-slate-200/85 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-6 relative animate-in zoom-in-95 duration-200">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 p-2 hover:bg-slate-100 rounded-xl"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="space-y-1">
                  <h4 className="text-xl font-light text-slate-900 font-serif">
                    {lang === 'es' ? 'Actualizar Ficha de Conexión' : 'Update Connection Card'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {lang === 'es' ? 'Manténgase localizable y asigne observaciones.' : 'Keep contact info updated for coordination channels.'}
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs text-slate-705">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-500 font-mono text-[9px] uppercase">{lang === 'es' ? 'Nombre Titular' : 'First Name / Surname'}</label>
                    <input 
                      type="text"
                      value={editForm.guestName || ''}
                      onChange={(e) => setEditForm({ ...editForm, guestName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-sky-505 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-500 font-mono text-[9px] uppercase">{lang === 'es' ? 'Email' : 'Email Address'}</label>
                      <input 
                        type="email"
                        value={editForm.guestEmail || ''}
                        onChange={(e) => setEditForm({ ...editForm, guestEmail: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-500 font-mono text-[9px] uppercase">{lang === 'es' ? 'Teléfono' : 'Mobile Phone'}</label>
                      <input 
                        type="tel"
                        value={editForm.guestPhone || ''}
                        onChange={(e) => setEditForm({ ...editForm, guestPhone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-500 font-mono text-[9px] uppercase">{lang === 'es' ? 'Peticiones Especiales / Comentarios' : 'Special requests / Extra notes'}</label>
                    <textarea 
                      value={editForm.specialRequests || ''}
                      onChange={(e) => setEditForm({ ...editForm, specialRequests: e.target.value })}
                      rows={3}
                      placeholder={lang === 'es' ? 'ej. Viajo con mascota, cama doble, llegada tarde...' : 'e.g. Late arriving, near window requests...'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-sans focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-extrabold uppercase py-3 rounded-xl tracking-wider text-xs font-mono transition"
                    >
                      {lang === 'es' ? '✓ CONFIRMAR' : '✓ SAVE DETAILS'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-5 rounded-xl uppercase"
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

    </div>
  );
}
