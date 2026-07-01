import React from 'react';
import { 
  Mail, 
  Send, 
  ExternalLink, 
  Printer, 
  Calendar, 
  ShieldCheck, 
  Coffee, 
  Clock, 
  Car, 
  Phone,
  Bookmark,
  Sparkles,
  Info
} from 'lucide-react';
import { Booking } from '../types';

interface BookingEmailTemplateProps {
  lang: 'es' | 'en' | 'fr' | 'ar';
  booking: Booking;
  onClose?: () => void;
}

export default function BookingEmailTemplate({ lang, booking, onClose }: BookingEmailTemplateProps) {
  // Translate function
  const t = (es: string, en: string, fr?: string, ar?: string): string => {
    if (lang === 'ar') return ar || en || es;
    if (lang === 'fr') return fr || en || es;
    if (lang === 'en') return en || es;
    return es;
  };

  // Safe checks for fields in booking object to prevent undefined errors
  const guestName = booking?.guestName || 'Valued Guest';
  const guestEmail = booking?.guestEmail || 'recipient@example.com';
  const guestPhone = booking?.guestPhone || '+34 600 000 000';
  const bookingId = booking?.id || 'BKR-XXXXXX';
  const roomName = booking?.roomName || 'Habitación Doble Premium';
  const checkIn = booking?.checkIn || '2026-06-15';
  const checkOut = booking?.checkOut || '2026-06-20';
  const totalPrice = booking?.totalPrice || 225;
  const breakfastIncluded = (booking as any)?.breakfastOption === true; 
  const guestsCount = booking?.guests || (booking as any)?.guestsCount || 2;

  // Calculate cancellation limit date (48 hours before check-in)
  const getCancelLimitDate = () => {
    try {
      const checkInDate = new Date(checkIn);
      checkInDate.setDate(checkInDate.getDate() - 2);
      return checkInDate.toISOString().split('T')[0];
    } catch (e) {
      return '2026-06-13';
    }
  };

  const cancelLimit = getCancelLimitDate();

  return (
    <div className="bg-slate-900/5 backdrop-blur-xs rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-slate-800" id="booking-email-simulator">
      
      {/* 1. SMTP/WEBMAIL CLIENT MOCKUP HEADER */}
      <div className="bg-slate-950 text-slate-250 px-4 py-3 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-slate-400 font-bold ml-3 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-sky-400" />
            {t('Simulador de Notificaciones de Correo', 'Mail Notification Simulator')}
          </span>
        </div>
        
        {onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className="text-[10px] bg-slate-905 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold font-mono px-2.5 py-1 rounded-lg transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. SENDER / RECIPIENT META DETAILS */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 text-[11px] sm:text-xs space-y-2 text-slate-350 font-sans">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-400 w-16 uppercase font-mono tracking-wider">{t('De:', 'From:')}</span>
          <span className="bg-slate-950 border border-slate-805 text-slate-200 px-2.5 py-1 rounded-md font-mono text-[10.5px]">
            noreply@sunserramar.com <span className="text-emerald-400 text-[9px] font-black font-sans ml-1">✓ {t('REMITENTE VERIFICADO', 'VERIFIED SENDER')}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-400 w-16 uppercase font-mono tracking-wider">{t('Para:', 'To:')}</span>
          <span className="text-sky-300 font-mono font-medium">{guestEmail}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-400 w-16 uppercase font-mono tracking-wider">{t('Asunto:', 'Subject:')}</span>
          <span className="text-slate-100 font-bold text-xs sm:text-sm font-sans flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            📬 {t('Confirmación de Reserva Directa', 'Direct Booking Confirmed')} #{bookingId} - Hostal Serramar
          </span>
        </div>
      </div>

      {/* 3. SIMULATED HTML EMAIL BODY - Styled to represent a real high-end email newsletter/receipt template */}
      <div className="bg-slate-100 p-4 sm:p-8 overflow-y-auto max-h-[550px]">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden font-sans">
          
          {/* Header Branding banner inside email */}
          <div className="bg-slate-950 p-6 text-center text-white border-b-4 border-sky-505 border-sky-400">
            <h1 className="text-lg font-black tracking-widest text-[#0fl] uppercase text-sky-400">
              ★ HOSTAL SERRAMAR
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
              Sant Carles de la Ràpita (Tarragona)
            </p>
          </div>

          {/* Email Content Container */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm">
            
            {/* Direct Web Greeting & Success confirmation badge */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {t('¡Hola', 'Hello')} {guestName},
              </h2>
              <p className="text-slate-600 leading-relaxed text-left text-xs sm:text-sm">
                {t(
                  'Nos complace confirmarte que los detalles para tu estancia en el Hostal Serramar han sido guardados y sincronizados correctamente en nuestro registro directo. ¡Muchas gracias por reservar utilizando nuestra web oficial y evitar comisiones de terceros!',
                  'We are delighted to confirm that your stay reservation details at Hostal Serramar have been successfully received and synchronised within our direct register system. Thank you immensely for choosing our official web platform and avoiding third-party markup commissions!'
                )}
              </p>
            </div>

            {/* Visual Stay Summary Details Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5 text-xs">
              <div className="flex border-b border-slate-200 pb-2 items-center justify-between">
                <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                  {t('DETALLES DE RESERVA', 'RESERVATION SUMMARY')}
                </span>
                <span className="font-mono text-sky-600 font-black text-xs">
                  ID: {bookingId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t('HUÉSPED PRINCIPAL', 'LEAD GUEST')}</p>
                  <p className="font-extrabold text-slate-800 mt-0.5">{guestName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t('TELÉFONO', 'MOBILE PHONE')}</p>
                  <p className="font-mono text-slate-800 mt-0.5">{guestPhone}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t('HABITACIÓN / APAR.', 'DWELLING UNIT')}</p>
                  <p className="font-bold text-slate-800 mt-0.5">{roomName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t('OCUPANTES', 'GUEST CAPACITY')}</p>
                  <p className="font-bold text-slate-805 mt-0.5 text-slate-800">{guestsCount} {guestsCount === 1 ? t('persona', 'guest') : t('personas', 'guests')}</p>
                </div>
              </div>

              {/* In/Out details box inside email */}
              <div className="grid grid-cols-2 gap-1.5 border-t border-slate-200 pt-3.5 mt-2 text-center bg-white p-2 rounded-lg border">
                <div className="border-r border-slate-100 pr-1 text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t('LLEGADA (CHECK-IN)', 'CHECK-IN TIME')}</p>
                  <p className="font-black text-slate-900 text-xs mt-0.5">{checkIn}</p>
                  <p className="text-[8.5px] text-slate-500 font-medium">14:00 - 22:05</p>
                </div>
                <div className="pl-1 text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t('SALIDA (CHECK-OUT)', 'CHECK-OUT TIME')}</p>
                  <p className="font-black text-slate-900 text-xs mt-0.5">{checkOut}</p>
                  <p className="text-[8.5px] text-slate-500 font-medium">08:00 - 11:30</p>
                </div>
              </div>
            </div>

            {/* Pricing receipt breakdown table */}
            <div className="space-y-2 border-t border-b border-dashed border-slate-200 py-4 font-mono text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t('Precio Estándar (Booking.com)', 'Standard Rate (Booking.com)')}:</span>
                <span className="line-through">€{Math.round(totalPrice * 1.15)}</span>
              </div>
              <div className="flex justify-between text-sky-600 font-bold">
                <span>{t('Descuento Web Directa (-15%)', 'Direct Web Saving (-15%)')}:</span>
                <span>-€{Math.round(totalPrice * 0.15)}</span>
              </div>
              
              <div className="flex justify-between text-slate-500">
                <span>{t('Servicio de Desayuno', 'Breakfast Service Buffet')}:</span>
                <span className="text-emerald-600 font-medium">
                  {breakfastIncluded ? t('🍳 INCLUIDO GRATIS', '🍳 INCLUDED FREE') : t('No seleccionado', 'Not selected')}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>{t('Tipo de Pago', 'Payment Method')}:</span>
                <span className="text-slate-800 font-bold uppercase">{t('En el Establecimiento', 'Pay on checkout')}</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-sm">
                <span className="font-extrabold text-slate-800">{t('TOTAL A PAGAR AL LLEGAR:', 'TOTAL TO PAY AT PROPERTY:')}</span>
                <span className="font-black text-slate-900 text-lg">€{totalPrice}</span>
              </div>
            </div>

            {/* Policies reminder box - Designed clearly like formal notification emails */}
            <div className="space-y-3.5 bg-sky-50/50 p-4 rounded-xl border border-sky-100 text-[11px] sm:text-xs">
              <span className="font-bold text-sky-850 flex items-center gap-1.5 uppercase font-mono tracking-wider text-[10px]">
                <ShieldCheck className="h-4 w-4 text-sky-600 shrink-0" />
                {t('POLÍTICAS DE ESTANCIA FLEXIBLES', 'FLEXIBLE STAY POLICIES')}
              </span>
              
              <ul className="space-y-2 text-slate-600 pl-4 list-disc marker:text-sky-500 text-left">
                <li>
                  <span className="font-bold text-slate-800">{t('Cancelación Flexible:', 'Flexible Cancellation:')}</span>{' '}
                  {t(
                    `Puedes anular o modificar tu reserva sin ningún cargo hasta el día ${cancelLimit} (48 horas antes de tu llegada).`,
                    `Feel free to cancel or modify your stay for free up to ${cancelLimit} (48 hours before planned arrival).`
                  )}
                </li>
                <li>
                  <span className="font-bold text-slate-800">{t('Llegada Tardía:', 'Late Arrival Check-in:')}</span>{' '}
                  {t(
                    'Si tienes planeado llegar fuera del horario oficial de recepción, ponte en contacto con nosotros para proveerte un código de puerta autónomo.',
                    'If you expect arriving beyond registration limits, contact our phone desk to receive a contactless automatic self-check-in door pin.'
                  )}
                </li>
                <li>
                  <span className="font-bold text-slate-800">{t('Norma de Descanso:', 'Quiet Night Hours:')}</span>{' '}
                  {t(
                    'Para asegurar el sueño de todos, la hora de descanso oficial rige entre las 22:30h y las 08:30h diaria.',
                    'To defend everyone\'s peace, official quiet and relaxation policies rule every day from 10:30 PM to 8:30 AM.'
                  )}
                </li>
              </ul>
            </div>

            {/* Interactive Call to Action button inside email */}
            <div className="text-center py-2 space-y-2.5">
              <a
                href="#panel-cliente"
                className="inline-flex justify-center items-center gap-2 bg-slate-950 hover:bg-slate-850 text-white font-extrabold uppercase py-3.5 px-6 rounded-xl transition font-mono tracking-wider text-xs shadow-md shrink-0"
              >
                <Bookmark className="h-4.5 w-4.5 text-sky-400 shrink-0" />
                <span>{t('GESTIONAR RESERVA EN LA WEB', 'ACCESS RESIDENT PORTAL DIRECTLY')}</span>
              </a>
              <p className="text-[9.5px] text-slate-400 block max-w-xs mx-auto">
                {t(
                  'Haz clic en el enlace para ingresar de manera autónoma con tu código identificador sin contraseña.',
                  'Click the secure link above to access your customer space automatically with your id key.'
                )}
              </p>
            </div>

            {/* Email signature footer part */}
            <div className="border-t border-slate-150 pt-5 text-center text-[10px] text-slate-400 space-y-1.5 font-light">
              <p className="font-bold text-slate-600">© Hostal Serramar S.L.</p>
              <p>Av. Catalunya 33, Sant Carles de la Ràpita (Tarragona, España)</p>
              <p>Soporte Oficial 24h: <span className="font-bold text-slate-500">+34 951 20 70 72</span> (contact@sunserramar.com)</p>
            </div>

          </div>

        </div>
      </div>

      {/* 4. EMAIL CONTROL BAR BOTTOM */}
      <div className="bg-slate-900 px-5 py-4 text-xs font-mono text-slate-400 flex flex-wrap justify-between items-center gap-4 border-t border-slate-800 relative z-10">
        <span className="flex items-center gap-1.5 text-[10.5px]">
          <Info className="h-4 w-4 text-sky-400" />
          {t(
            'Esta plantilla se envía de manera real y automática al email del huésped.',
            'This secure template auto-sends instantly to verified clients.'
          )}
        </span>
        
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white font-bold py-2 px-3.5 rounded-lg border border-slate-800 cursor-pointer transition active:scale-95 text-[11px]"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>{t('IMPRIMIR COMPROBANTE', 'PRINT RECEIPT')}</span>
        </button>
      </div>

    </div>
  );
}
