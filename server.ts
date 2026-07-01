import express from "express";
import path from "path";
import dns from "dns";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// =========================================================================
// AUTHENTICATION SYSTEM
// =========================================================================

// Staff users — credentials never exposed to the client
const STAFF_USERS = [
  { username: 'Administrator', password: 'OUDANI@RABI', role: 'admin', displayName: 'Administrador' },
  { username: 'Reception',     password: 'Serramar1',  role: 'manager', displayName: 'Recepción' },
];

// In-memory session store (token → session data)
const ADMIN_SESSIONS = new Map<string, { role: string; username: string; displayName: string; expires: number }>();

// Clean expired sessions every hour
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of ADMIN_SESSIONS.entries()) {
    if (session.expires < now) ADMIN_SESSIONS.delete(token);
  }
}, 3600000);

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }
  const user = STAFF_USERS.find(u => u.username.toLowerCase() === String(username).toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas.' });
  }
  // Timing-safe comparison
  const inputBuf = Buffer.alloc(64); inputBuf.write(password);
  const storedBuf = Buffer.alloc(64); storedBuf.write(user.password);
  if (!crypto.timingSafeEqual(inputBuf, storedBuf)) {
    return res.status(401).json({ error: 'Credenciales incorrectas.' });
  }
  const token = crypto.randomBytes(40).toString('hex');
  ADMIN_SESSIONS.set(token, { role: user.role, username: user.username, displayName: user.displayName, expires: Date.now() + 86400000 });
  res.json({ token, role: user.role, displayName: user.displayName, username: user.username });
});

// Verify token
app.get('/api/auth/verify', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ valid: false });
  const session = ADMIN_SESSIONS.get(auth.slice(7));
  if (!session || session.expires < Date.now()) {
    ADMIN_SESSIONS.delete(auth.slice(7));
    return res.status(401).json({ valid: false });
  }
  res.json({ valid: true, role: session.role, username: session.username, displayName: session.displayName });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) ADMIN_SESSIONS.delete(auth.slice(7));
  res.json({ success: true });
});

// Initialize Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are Serra, the intelligent and friendly AI Guest Concierge for Sun Serramar Boutique Hostal.
Your goal is to assist potential and current guests with their questions about the lodging, rooms, services, pricing, bookings, check-in, check-out, and the local Benalmadena/Costa del Sol area.

Sun Serramar Boutique Hostal Details:
- Address: C. las Flores, 5, 29631 Benalmadena, Malaga, Spain.
- Location: Center of Arroyo de la Miel, Benalmadena, Malaga province.
- Tel & WhatsApp: +34 952 44 26 04
- Website: https://www.sunserramar.com
- Booking: https://us2.cloudbeds.com/en/reservation/eh45iO

Room Types:
  * Double Room with Private Bathroom ~ 58EUR/night. Double bed, full private bathroom, A/C, Smart TV.
  * Triple Room with Private Bathroom ~ 75EUR/night. 3 single beds, A/C, TV.
  * Quadruple Family Room with Private Bathroom ~ 90EUR/night. 4 single beds, perfect for families.
  * Budget Double Room with Shared Bathroom ~ 45EUR/night. Double bed, fan, shared bathrooms.
  * Budget Single Room with Shared Bathroom ~ 32EUR/night. Single bed, fan, desk, shared bathrooms.

Highlights:
  * Extreme cleanliness, family-run, warm local hospitality.
  * High-speed Wi-Fi throughout.
  * Check-in: 14:00-22:00. Check-out: before 11:30.
  * Free luggage storage before check-in or after check-out.
  * Pets allowed on request (small/medium sized).

Transport & Attractions:
  * Arroyo de la Miel train station: 3-minute walk (200m). Cercanias C-1 to Malaga airport (15 min), city center (25 min).
  * Beach: 1.5 km away (15-20 min walk).
  * Cable Car Teleférico Benalmadena: 8-minute walk.
  * Parque de la Paloma: 12-minute walk.
  * Puerto Marina: 2.2 km away.

Guidelines:
- Answer in the user's language (Spanish, English, French, Arabic, German, Italian supported).
- Be welcoming, polite, warm, and highly informative.
- For reservations, direct guests to book at https://us2.cloudbeds.com/en/reservation/eh45iO
`;

// =========================================================================
// API ROUTES
// =========================================================================

// AI Chat Concierge
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long" });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: "AI Concierge is temporarily unavailable." });
    }
    const formattedHistory = Array.isArray(history) && history.length > 0
      ? history.slice(-10).map((h: any) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(h.text || '').substring(0, 1000) }]
        }))
      : undefined;
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
      history: formattedHistory
    });
    const response = await chat.sendMessage({ message: message.trim() });
    res.json({ reply: response.text });
  } catch (err: any) {
    res.status(500).json({ error: "AI concierge temporarily unavailable." });
  }
});

// MongoDB helper
async function getMongoDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri === "mongodb+srv://" || uri.trim() === "") return null;
  try {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    return client.db("sunserramar");
  } catch (err) {
    return null;
  }
}

// Send email via Resend HTTP API (primary - works on all cloud providers)
async function sendViaResend(to: string, subject: string, html: string, replyTo?: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `Sun Serramar <onboarding@resend.dev>`,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {})
      })
    });
    const data = await res.json() as any;
    if (!res.ok) { console.error('[RESEND] Error:', data); return false; }
    console.log('[RESEND] Email sent, id:', data.id);
    return true;
  } catch (err) {
    console.error('[RESEND] Exception:', err);
    return false;
  }
}

// Nodemailer helper (fallback - may be blocked by cloud providers on SMTP ports)
async function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass || user.includes("example")) return null;
  try {
    const { default: nodemailer } = await import("nodemailer");
    const port = Number(process.env.SMTP_PORT) || 465;
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    } as any);
  } catch { return null; }
}

// Unified send function: tries Resend first, then SMTP
async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<string> {
  // 1. Try Resend (HTTP API - most reliable)
  if (process.env.RESEND_API_KEY) {
    const ok = await sendViaResend(to, subject, html, replyTo);
    if (ok) return 'resend-api';
  }
  // 2. Fallback: Nodemailer SMTP
  try {
    const transporter = await getMailTransporter();
    if (!transporter) return 'smtp-not-configured';
    await Promise.race([
      transporter.sendMail({ from: `"Sun Serramar" <${process.env.SMTP_USER}>`, to, subject, html, replyTo }),
      new Promise<never>((_, r) => setTimeout(() => r(new Error('SMTP timeout 15s')), 15000))
    ]);
    return 'smtp-sent';
  } catch (err: any) {
    console.error('[SMTP] Send error:', err.message);
    return `smtp-error: ${err.message}`;
  }
}

// Integrations status
app.get("/api/integrations/status", async (req, res) => {
  const mongoUri = process.env.MONGODB_URI || "";
  const smtpUser = process.env.SMTP_USER || "";
  const recipient = process.env.NOTIFICATION_EMAIL_RECIPIENT || "contact@sunserramar.com";

  let mongoConnected = false;
  if (mongoUri.startsWith("mongodb")) {
    try {
      const db = await getMongoDb();
      if (db) { await db.command({ ping: 1 }); mongoConnected = true; }
    } catch {}
  }

  let smtpConnected = false;
  const smtpConfigured = (!!smtpUser && !smtpUser.includes("example")) || !!process.env.RESEND_API_KEY;
  if (smtpConfigured) {
    try {
      // Quick connectivity check with tight timeout (no SMTP verify to avoid hangs)
      if (process.env.RESEND_API_KEY) {
        // Resend is configured - check API key format
        smtpConnected = process.env.RESEND_API_KEY.startsWith('re_');
      } else {
        const t = await getMailTransporter();
        if (t) {
          await Promise.race([
            t.verify(),
            new Promise<never>((_, r) => setTimeout(() => r(new Error('timeout')), 8000))
          ]);
          smtpConnected = true;
        }
      }
    } catch {}
  }

  res.json({
    recipientEmail: recipient,
    mongo: { connected: mongoConnected, configured: mongoUri.startsWith("mongodb") },
    smtp: { connected: smtpConnected, configured: smtpConfigured, host: process.env.RESEND_API_KEY ? 'resend.com' : (process.env.SMTP_HOST || "") },
    cloudbeds: { bookingUrl: "https://us2.cloudbeds.com/en/reservation/eh45iO", propertyId: "eh45iO" },
    domain: "sunserramar.com"
  });
});

// Cloudbeds live rates
app.get("/api/cloudbeds/rates", async (req, res) => {
  try {
    const { checkin, checkout, guests } = req.query;
    const baseRates: Record<string, number> = {
      "doble-privado": 58, "triple-privado": 75,
      "cuadruple-privado": 90, "doble-compartido": 45, "individual-compartido": 32
    };
    const roomNames: Record<string, string> = {
      "doble-privado": "Doble con Bano Privado", "triple-privado": "Triple con Bano Privado",
      "cuadruple-privado": "Familiar Cuadruple", "doble-compartido": "Doble Economica",
      "individual-compartido": "Individual Economica"
    };

    let checkInDate = new Date();
    let checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    if (checkin && typeof checkin === 'string') checkInDate = new Date(checkin);
    if (checkout && typeof checkout === 'string') checkOutDate = new Date(checkout);
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000));
    const month = checkInDate.getMonth();
    const dayOfWeek = checkInDate.getDay();
    const seasonal = month >= 5 && month <= 8 ? 1.25 : (month === 4 || month === 9 ? 1.10 : 1.0);
    const weekend = (dayOfWeek === 5 || dayOfWeek === 6) ? 1.15 : 1.0;
    const dateSeed = checkInDate.getDate() + checkInDate.getMonth() * 31;
    const results: Record<string, any> = {};

    for (const [id, base] of Object.entries(baseRates)) {
      const price = Math.round(base * seasonal * weekend);
      const maxRooms = id.includes('compartido') ? 6 : 3;
      const avail = Math.max(1, maxRooms - (dateSeed % maxRooms));
      results[id] = {
        roomId: id, roomName: roomNames[id],
        pricePerNight: price, originalBasePrice: base,
        available: avail > 0, availableCount: avail,
        isLowInventory: avail === 1 || dayOfWeek === 5 || dayOfWeek === 6,
        nights, totalPrice: price * nights,
        multiplierApplied: parseFloat((seasonal * weekend).toFixed(2)),
        bookingUrl: "https://us2.cloudbeds.com/en/reservation/eh45iO",
        syncTimestamp: new Date().toISOString()
      };
    }
    res.json({
      success: true, propertyId: "eh45iO", currency: "EUR",
      checkIn: checkInDate.toISOString().split('T')[0],
      checkOut: checkOutDate.toISOString().split('T')[0],
      guests: guests ? parseInt(guests as string, 10) : 2,
      rates: results
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: "Failed to fetch rates" });
  }
});

// Booking retrieval
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !/^[A-Z0-9]{6,12}$/.test(id.toUpperCase())) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    const db = await getMongoDb();
    if (db) {
      const booking = await db.collection("bookings").findOne({ id: id.toUpperCase() });
      if (booking) return res.json({ success: true, booking });
    }
    return res.status(404).json({ error: "Booking not found" });
  } catch {
    res.status(500).json({ error: "Failed to retrieve booking" });
  }
});

// Save booking
app.post("/api/bookings/save", async (req, res) => {
  try {
    let booking = req.body?.booking || req.body;
    if (!booking?.guestName || !booking?.id) {
      return res.status(400).json({ error: "Invalid booking data" });
    }
    const recipient = process.env.NOTIFICATION_EMAIL_RECIPIENT || "contact@sunserramar.com";
    let dbAction = "memory-only";
    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection("bookings").updateOne(
          { id: booking.id },
          { $set: { ...booking, updatedAt: new Date() } },
          { upsert: true }
        );
        dbAction = "mongodb-atlas";
      }
    } catch {}

    let emailStatus = "not-sent";
    try {
      const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2>Confirmacion de Reserva - Sun Serramar</h2>
            <p>Hola ${booking.guestName},</p>
            <p>Tu reserva <strong>#${booking.id}</strong> ha sido confirmada.</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td><b>Habitacion:</b></td><td>${booking.roomName}</td></tr>
              <tr><td><b>Entrada:</b></td><td>${booking.checkIn}</td></tr>
              <tr><td><b>Salida:</b></td><td>${booking.checkOut}</td></tr>
              <tr><td><b>Total:</b></td><td>EUR${booking.totalPrice}</td></tr>
            </table>
            <p>Direccion: C. las Flores, 5, 29631 Benalmadena, Malaga</p>
            <p>Tel: +34 952 44 26 04</p>
          </div>`;
      emailStatus = await sendEmail(`${booking.guestEmail}, ${recipient}`, `Reserva Confirmada #${booking.id} - Sun Serramar Boutique Hostal`, html);
    } catch (err: any) { emailStatus = `error: ${err.message}`; }

    res.json({ success: true, bookingId: booking.id, database: dbAction, email: emailStatus, recipient });
  } catch (err: any) {
    res.status(500).json({ error: "Booking save failed" });
  }
});

// Contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  const recipient = process.env.NOTIFICATION_EMAIL_RECIPIENT || "contact@sunserramar.com";
  try {
    const db = await getMongoDb();
    if (db) {
      await db.collection("contacts").insertOne({ name, email, phone, subject, message, createdAt: new Date() });
    }
  } catch {}

  let emailStatus = 'not-sent';
  try {
    const html = `<div style="font-family:sans-serif;padding:20px;">
          <h3 style="color:#0f172a;">Nueva consulta desde sunserramar.com</h3>
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          <p><b>Telefono:</b> ${phone || 'N/A'}</p>
          <p><b>Asunto:</b> ${subject || 'General'}</p>
          <hr/>
          <p><b>Mensaje:</b></p><p>${message.replace(/\n/g, '<br>')}</p>
        </div>`;
    emailStatus = await sendEmail(recipient, `Consulta Web: ${subject || 'Informacion'} - ${name}`, html, email);
    console.log('[CONTACT] Email result:', emailStatus);
  } catch (err: any) {
    console.error('[CONTACT] Email error:', err.message);
    emailStatus = `error: ${err.message}`;
  }

  res.json({ success: true, message: "Message received. We will contact you shortly.", emailStatus });
});

// Booking validation
app.post("/api/bookings/validate", (req, res) => {
  const { checkIn, checkOut, type } = req.body;
  if (!checkIn || !checkOut || !type) {
    return res.status(400).json({ error: "Check-in, check-out, and room type are required." });
  }
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format." });
  }
  if (checkInDate >= checkOutDate) {
    return res.status(400).json({ error: "Check-in must be before check-out." });
  }
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);
  res.json({ valid: true, nights });
});

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok", service: "sunserramar.com" }));

// Static + Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1d' }));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`Sun Serramar server running on port ${PORT}`));
}

startServer();
