# Sun Serramar Boutique Hostal — Official Website

**Live domain:** [www.sunserramar.com](https://www.sunserramar.com)

Full-featured booking website for **Sun Serramar Boutique Hostal** in Benalmadena, Costa del Sol.
Includes room listings, real guest reviews, live dynamic pricing, AI Concierge (Serra), Stripe payments, MongoDB booking persistence, and multilingual support (ES / EN / FR / AR).

---

## Tech Stack

- **Frontend:** React 19, Vite 6, TailwindCSS 4, Framer Motion
- **Backend:** Node.js + Express (TypeScript)
- **Database:** MongoDB Atlas
- **AI Concierge:** Google Gemini 2.0 Flash (server-side only, key never exposed to browser)
- **Payments:** Stripe Checkout
- **Email:** Nodemailer / SMTP
- **Deployment:** Render.com

---

## Local Development

**Prerequisites:** Node.js >= 18

`ash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill in your real values
cp .env.example .env

# 3. Start the dev server (Express + Vite HMR)
npm run dev
`

Open http://localhost:3000 in your browser.

---

## Environment Variables

Copy .env.example to .env and fill in all values. See .env.example for full reference.

---

## Production Build

`ash
npm run build
npm start
`

Deploy via Render — see render.yaml.

---

## Project Structure

`
server.ts           Express API (Gemini AI, Stripe, MongoDB, SMTP)
src/
  App.tsx           Main React app
  data.ts           Room and review data
  types.ts          TypeScript types
  components/       React UI components
.env.example        Environment variable template
render.yaml         Render deployment config
`

---

Sun Serramar Boutique Hostal - C. las Flores, 5 - 29631 Benalmadena, Malaga
