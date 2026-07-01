import React from 'react';

interface LegalProps { lang: 'es' | 'en' | 'fr' | 'ar'; }

const YEAR = new Date().getFullYear();
const HOSTAL = 'Sun Serramar Boutique Hostal';
const DIRECCION = 'C. las Flores, 5, 29631 Benalmádena (Málaga), España';
const EMAIL = 'contact@sunserramar.com';
const TEL = '+34 952 44 26 04';
const WEB = 'www.sunserramar.com';
const CIF = 'B21902432';

// ─── AVISO LEGAL ──────────────────────────────────────────────────────────────
export function LegalAvisoContent({ lang }: LegalProps) {
  if (lang !== 'es') {
    return (
      <div className="space-y-4 text-sm">
        <p className="text-slate-500 italic">This legal notice is primarily provided in Spanish as required by Spanish law (LSSI-CE). An English summary is provided below.</p>
        <h3 className="font-bold text-slate-900">Legal Notice – Sun Serramar Boutique Hostal</h3>
        <p>In compliance with Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the following information is provided:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Name:</strong> {HOSTAL}</li>
          <li><strong>CIF/NIF:</strong> {CIF}</li>
          <li><strong>Address:</strong> {DIRECCION}</li>
          <li><strong>Email:</strong> {EMAIL}</li>
          <li><strong>Phone:</strong> {TEL}</li>
          <li><strong>Website:</strong> {WEB}</li>
        </ul>
        <p>All content on this website is protected by intellectual property rights. Reproduction without prior written consent is prohibited. The operator reserves the right to modify the content of this website at any time.</p>
        <p>© {YEAR} {HOSTAL}. All rights reserved.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 text-sm">
      <h3 className="font-bold text-slate-900 text-base">AVISO LEGAL</h3>
      <p>En cumplimiento con lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilita la siguiente información:</p>

      <h4 className="font-semibold text-slate-800 mt-4">1. DATOS IDENTIFICATIVOS DEL TITULAR</h4>
      <ul className="list-disc pl-5 space-y-1 text-slate-700">
        <li><strong>Denominación:</strong> {HOSTAL}</li>
        <li><strong>CIF/NIF:</strong> {CIF}</li>
        <li><strong>Domicilio:</strong> {DIRECCION}</li>
        <li><strong>Correo electrónico:</strong> {EMAIL}</li>
        <li><strong>Teléfono:</strong> {TEL}</li>
        <li><strong>Sitio web:</strong> {WEB}</li>
        <li><strong>Actividad:</strong> Alojamiento turístico (Hostal / Pensión), inscrito en el Registro de Turismo de Andalucía conforme al Decreto 143/2014 de la Junta de Andalucía.</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">2. OBJETO Y ÁMBITO DE APLICACIÓN</h4>
      <p>El presente Aviso Legal regula el acceso y el uso del sitio web <strong>{WEB}</strong>, titularidad de {HOSTAL}, con el fin de informar a los usuarios sobre las condiciones de uso del sitio.</p>

      <h4 className="font-semibold text-slate-800 mt-4">3. PROPIEDAD INTELECTUAL E INDUSTRIAL</h4>
      <p>Todos los contenidos del sitio web —textos, fotografías, gráficos, imágenes, diseño, logotipos, marcas, nombres comerciales y demás elementos— son titularidad de {HOSTAL} o de sus licenciantes, y están protegidos por las leyes de Propiedad Intelectual e Industrial. Queda prohibida su reproducción total o parcial sin autorización escrita previa del titular.</p>

      <h4 className="font-semibold text-slate-800 mt-4">4. CONDICIONES DE USO</h4>
      <p>El usuario se compromete a hacer uso del sitio web de conformidad con la legislación vigente, el presente Aviso Legal y la buena fe. Queda expresamente prohibido el uso del sitio web con fines ilícitos o contrarios a la moral y el orden público.</p>

      <h4 className="font-semibold text-slate-800 mt-4">5. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</h4>
      <p>{HOSTAL} no garantiza la disponibilidad continua e ininterrumpida del sitio web. No se responsabiliza de los daños o perjuicios derivados del uso indebido del mismo, ni de errores en los contenidos. Los precios y disponibilidad publicados son orientativos y están sujetos a confirmación.</p>

      <h4 className="font-semibold text-slate-800 mt-4">6. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h4>
      <p>Las relaciones entre {HOSTAL} y el usuario se rigen por la normativa española vigente. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Málaga (España), renunciando expresamente a cualquier otro fuero.</p>

      <p className="text-slate-500 mt-6 text-xs">© {YEAR} {HOSTAL}. Todos los derechos reservados. Última actualización: julio {YEAR}.</p>
    </div>
  );
}

// ─── POLÍTICA DE PRIVACIDAD ───────────────────────────────────────────────────
export function LegalPrivacidadContent({ lang }: LegalProps) {
  if (lang !== 'es') {
    return (
      <div className="space-y-4 text-sm">
        <h3 className="font-bold text-slate-900">Privacy Policy – Sun Serramar Boutique Hostal</h3>
        <p>In accordance with EU Regulation 2016/679 (GDPR) and Spain's Organic Law 3/2018 (LOPDGDD), we inform you of the following:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Data Controller:</strong> {HOSTAL}, {DIRECCION}</li>
          <li><strong>CIF/NIF:</strong> {CIF}</li>
          <li><strong>Contact:</strong> {EMAIL}</li>
          <li><strong>Purpose:</strong> Managing enquiries, reservations and customer communications</li>
          <li><strong>Legal basis:</strong> Contractual performance and legitimate interest</li>
          <li><strong>Data retention:</strong> For the duration of the business relationship plus legally required periods</li>
          <li><strong>Rights:</strong> You may exercise your rights of access, rectification, erasure, portability and objection by emailing {EMAIL}</li>
          <li><strong>Supervisory authority:</strong> Agencia Española de Protección de Datos – www.aepd.es</li>
        </ul>
        <p>We never sell your personal data. Data is only shared with processors strictly necessary for the provision of services (e.g. payment processors, email delivery).</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 text-sm">
      <h3 className="font-bold text-slate-900 text-base">POLÍTICA DE PRIVACIDAD</h3>
      <p>En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos:</p>

      <h4 className="font-semibold text-slate-800 mt-4">1. RESPONSABLE DEL TRATAMIENTO</h4>
      <ul className="list-disc pl-5 space-y-1 text-slate-700">
        <li><strong>Responsable:</strong> {HOSTAL}</li>
        <li><strong>CIF/NIF:</strong> {CIF}</li>
        <li><strong>Domicilio:</strong> {DIRECCION}</li>
        <li><strong>Contacto DPD:</strong> {EMAIL}</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">2. FINALIDAD DEL TRATAMIENTO</h4>
      <p>Los datos personales recabados se tratan con las siguientes finalidades:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Gestión y confirmación de reservas de alojamiento.</li>
        <li>Atención a consultas y solicitudes de información.</li>
        <li>Envío de comunicaciones relacionadas con la estancia.</li>
        <li>Cumplimiento de obligaciones legales (registro de viajeros según normativa policial).</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">3. BASE JURÍDICA</h4>
      <p>El tratamiento se basa en: (a) la ejecución del contrato de reserva o prestación del servicio de alojamiento; (b) el cumplimiento de obligaciones legales; y (c) el interés legítimo del responsable.</p>

      <h4 className="font-semibold text-slate-800 mt-4">4. CONSERVACIÓN DE LOS DATOS</h4>
      <p>Los datos se conservarán durante el tiempo necesario para la relación contractual y, una vez finalizada, durante los plazos de prescripción legalmente exigibles (generalmente 5 años para obligaciones fiscales).</p>

      <h4 className="font-semibold text-slate-800 mt-4">5. DERECHOS DE LOS INTERESADOS</h4>
      <p>El interesado tiene derecho a: acceder, rectificar, suprimir, oponerse, limitar el tratamiento y a la portabilidad de sus datos. Para ejercer estos derechos puede dirigirse a <strong>{EMAIL}</strong>, indicando su nombre completo y el derecho que desea ejercer.</p>
      <p>Si considera que sus derechos no han sido atendidos correctamente, puede presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" className="text-sky-600 hover:underline" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.</p>

      <h4 className="font-semibold text-slate-800 mt-4">6. CESIÓN DE DATOS</h4>
      <p>No se cederán datos a terceros salvo obligación legal o a encargados de tratamiento estrictamente necesarios (por ejemplo, plataformas de gestión de reservas, servicios de correo electrónico). En ningún caso se venderán datos personales.</p>

      <h4 className="font-semibold text-slate-800 mt-4">7. MEDIDAS DE SEGURIDAD</h4>
      <p>Se aplican las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos, conforme al artículo 32 del RGPD.</p>

      <p className="text-slate-500 mt-6 text-xs">© {YEAR} {HOSTAL}. Última actualización: julio {YEAR}.</p>
    </div>
  );
}

// ─── POLÍTICA DE COOKIES ──────────────────────────────────────────────────────
export function LegalCookiesContent({ lang }: LegalProps) {
  if (lang !== 'es') {
    return (
      <div className="space-y-4 text-sm">
        <h3 className="font-bold text-slate-900">Cookie Policy – Sun Serramar Boutique Hostal</h3>
        <p>This website uses only technically necessary cookies required for its correct operation. No advertising or tracking cookies are used. No personal data is processed through cookies.</p>
        <table className="w-full text-xs border-collapse">
          <thead><tr className="bg-slate-100"><th className="border border-slate-200 p-2 text-left">Cookie</th><th className="border border-slate-200 p-2 text-left">Type</th><th className="border border-slate-200 p-2 text-left">Purpose</th><th className="border border-slate-200 p-2 text-left">Duration</th></tr></thead>
          <tbody>
            <tr><td className="border border-slate-200 p-2">session</td><td className="border border-slate-200 p-2">Technical</td><td className="border border-slate-200 p-2">User session management</td><td className="border border-slate-200 p-2">Session</td></tr>
            <tr><td className="border border-slate-200 p-2">lang_pref</td><td className="border border-slate-200 p-2">Functional</td><td className="border border-slate-200 p-2">Language preference</td><td className="border border-slate-200 p-2">1 year</td></tr>
          </tbody>
        </table>
        <p>You can configure your browser to refuse cookies. Note that disabling cookies may affect the functionality of this website.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 text-sm">
      <h3 className="font-bold text-slate-900 text-base">POLÍTICA DE COOKIES</h3>
      <p>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE) y la normativa de la Unión Europea sobre el uso de cookies, le informamos sobre el uso de cookies en <strong>{WEB}</strong>.</p>

      <h4 className="font-semibold text-slate-800 mt-4">1. ¿QUÉ SON LAS COOKIES?</h4>
      <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo.</p>

      <h4 className="font-semibold text-slate-800 mt-4">2. COOKIES QUE UTILIZAMOS</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse mt-2">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 p-2 text-left">Cookie</th>
              <th className="border border-slate-200 p-2 text-left">Tipo</th>
              <th className="border border-slate-200 p-2 text-left">Finalidad</th>
              <th className="border border-slate-200 p-2 text-left">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-2 font-mono">session</td><td className="border border-slate-200 p-2">Técnica necesaria</td><td className="border border-slate-200 p-2">Gestión de la sesión de usuario autenticado</td><td className="border border-slate-200 p-2">Sesión</td></tr>
            <tr><td className="border border-slate-200 p-2 font-mono">lang_pref</td><td className="border border-slate-200 p-2">Funcional</td><td className="border border-slate-200 p-2">Guardar preferencia de idioma del usuario</td><td className="border border-slate-200 p-2">1 año</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-slate-500 text-xs">Este sitio web NO utiliza cookies publicitarias, de seguimiento o de terceros con fines de publicidad. No se procesan datos personales a través de cookies de terceros.</p>

      <h4 className="font-semibold text-slate-800 mt-4">3. CÓMO GESTIONAR LAS COOKIES</h4>
      <p>Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envíe una cookie. Tenga en cuenta que si deshabilita las cookies, es posible que algunas funciones del sitio web no funcionen correctamente.</p>
      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
        <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad</li>
        <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">4. ACTUALIZACIONES</h4>
      <p>Esta Política de Cookies puede ser actualizada en cualquier momento para adaptarse a cambios normativos o técnicos. Se recomienda revisarla periódicamente.</p>

      <p className="text-slate-500 mt-6 text-xs">© {YEAR} {HOSTAL}. Última actualización: julio {YEAR}.</p>
    </div>
  );
}

// ─── CONDICIONES DE RESERVA ───────────────────────────────────────────────────
export function LegalReservasContent({ lang }: LegalProps) {
  if (lang !== 'es') {
    return (
      <div className="space-y-4 text-sm">
        <h3 className="font-bold text-slate-900">Booking Terms & Conditions</h3>
        <h4 className="font-semibold">Check-in / Check-out</h4>
        <p>Check-in: from 14:00 to 22:00. Check-out: before 11:30. Late check-in must be arranged in advance.</p>
        <h4 className="font-semibold">Cancellation Policy</h4>
        <p>All reservations are non-refundable and cannot be cancelled free of charge once confirmed. Inventory is synchronized in real time with external sales channels (Booking, Expedia, Airbnb, and other OTAs), so confirmed rooms are immediately blocked and cannot be removed without penalty.</p>
        <h4 className="font-semibold">Payment</h4>
        <p>Payment is accepted at the property in cash or card. Online booking is processed through Cloudbeds secure platform.</p>
        <h4 className="font-semibold">Rules</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Guests must present valid ID upon check-in (required by Spanish law).</li>
          <li>Smoking is not permitted inside the hostal.</li>
          <li>Pets may be allowed upon prior request.</li>
          <li>Quiet hours: 23:00 – 08:00.</li>
        </ul>
        <h4 className="font-semibold">Applicable Law</h4>
        <p>These conditions are governed by Spanish law (Decreto 143/2014 of Junta de Andalucía and applicable consumer protection legislation).</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 text-sm">
      <h3 className="font-bold text-slate-900 text-base">CONDICIONES GENERALES DE RESERVA Y ESTANCIA</h3>

      <h4 className="font-semibold text-slate-800 mt-4">1. ENTRADA Y SALIDA</h4>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Check-in:</strong> De 14:00 a 22:00 horas. Para llegadas fuera de este horario, es imprescindible comunicarlo previamente.</li>
        <li><strong>Check-out:</strong> Antes de las 11:30 horas.</li>
        <li>El equipaje puede dejarse en consigna gratuita antes del check-in o después del check-out.</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">2. POLÍTICA DE CANCELACIÓN</h4>
      <ul className="list-disc pl-5 space-y-1">
        <li>Todas las reservas son <strong>NO REEMBOLSABLES</strong> una vez confirmadas.</li>
        <li>No se permite cancelación gratuita ni anulación sin cargos tras la confirmación.</li>
        <li>Las habitaciones se sincronizan en tiempo real con canales externos (Booking, Expedia, Airbnb y otras OTA), por lo que al confirmarse una reserva el inventario queda bloqueado y no puede retirarse sin penalización.</li>
        <li>En caso de no presentación (no-show), se cobrará igualmente el importe total de la reserva.</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">3. PAGO</h4>
      <p>El pago puede realizarse en el establecimiento en efectivo o mediante tarjeta de crédito/débito. Las reservas online se procesan de forma segura a través de la plataforma <strong>Cloudbeds</strong>. Los precios publicados incluyen IVA y están en euros (EUR).</p>

      <h4 className="font-semibold text-slate-800 mt-4">4. NORMATIVA DEL ESTABLECIMIENTO</h4>
      <ul className="list-disc pl-5 space-y-1">
        <li>Es obligatorio presentar <strong>DNI/Pasaporte en vigor</strong> al realizar el check-in (exigido por la normativa española de registro de viajeros, Orden INT/1922/2003).</li>
        <li>Está <strong>prohibido fumar</strong> en todas las instalaciones interiores del hostal (Ley 42/2010).</li>
        <li>Se admiten <strong>mascotas</strong> previa solicitud y confirmación. Consulte disponibilidad y condiciones.</li>
        <li><strong>Horario de silencio:</strong> de 23:00 a 08:00 horas.</li>
        <li>Se ruega el respeto a las instalaciones comunes y a los demás huéspedes.</li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">5. RESPONSABILIDAD</h4>
      <p>{HOSTAL} no se hace responsable de la pérdida de objetos personales en las instalaciones. Disponemos de consigna de equipaje, pero no custodia objetos de valor. Se recomienda el uso de la caja fuerte si está disponible.</p>

      <h4 className="font-semibold text-slate-800 mt-4">6. NORMATIVA APLICABLE</h4>
      <p>La prestación del servicio de alojamiento turístico se rige por el <strong>Decreto 143/2014, de 21 de octubre, de la Junta de Andalucía</strong>, por el que se aprueba el Reglamento de los Establecimientos Hoteleros de la Comunidad Autónoma de Andalucía, y demás normativa de protección al consumidor aplicable.</p>

      <h4 className="font-semibold text-slate-800 mt-4">7. HOJAS DE RECLAMACIONES</h4>
      <p>El establecimiento dispone de Hojas Oficiales de Quejas y Reclamaciones de la Junta de Andalucía, a disposición del cliente que las solicite. También puede presentar reclamaciones a través del Sistema Arbitral de Consumo.</p>

      <p className="text-slate-500 mt-6 text-xs">© {YEAR} {HOSTAL} · CIF/NIF: {CIF} · {DIRECCION} · {EMAIL} · {TEL}. Última actualización: julio {YEAR}.</p>
    </div>
  );
}
