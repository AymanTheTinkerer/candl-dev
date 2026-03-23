# Candl — Prototype Site

High-fidelity clickable prototype for the Candl birthday & event reminder app.
5 screens: Landing → Verify → Onboard → Dashboard → Upgrade.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server (opens http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Google Fonts** — Playfair Display + DM Sans (loaded via `<link>` in index.html)
- **Zero dependencies** beyond React — all icons, components, and styles are inline

## Project Structure

```
candl-site/
├── index.html          # Entry HTML (fonts loaded here)
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
└── src/
    ├── main.jsx        # React root render
    └── App.jsx         # Full prototype (all 5 screens)
```

## Prototype Navigation

Use the dark navigation bar fixed at the bottom of the screen to jump between screens:
- 🏠 **Landing** — Marketing page with hero, how-it-works, features, social proof, pricing
- 📱 **Verify** — Phone entry → Channel selection (SMS/WhatsApp/Telegram) → OTP
- 🎂 **Onboard** — Add events → Import (Facebook/CSV) → Success
- 📋 **Dashboard** — Event list, tabs, inline add, reminder settings
- ⭐ **Upgrade** — Free vs Pro comparison, FAQ

## Brand Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Burnt Orange | `#E8652D` | Primary CTA, accents |
| Warm Cream | `#FFF8F0` | Page background |
| Espresso | `#1A1410` | Text, dark UI |
| Gold | `#D4A853` | Premium/upgrade elements |
| Success Green | `#2D8A5E` | Confirmations |
| Display Font | Playfair Display | Headlines |
| Body Font | DM Sans | Everything else |

## Notes for Engineers

- This is a **prototype**, not production code. All screens live in a single `App.jsx` file.
- For production, split into separate route components and connect to your backend.
- Phone input includes a country code dropdown with 20 countries.
- The channel picker (SMS/WhatsApp/Telegram) is a single-select — user picks one.
- Free tier = 10 events. Events beyond 10 are "paused" (saved, no reminders).
