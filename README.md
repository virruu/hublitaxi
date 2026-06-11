# HubliTaxi

Marketing & lead-generation website for **Hubli Taxi** — a local, airport, railway and outstation cab service for Hubli–Dharwad. Built for speed, SEO and high conversion.

Live domain: [hublitaxi.com](https://hublitaxi.com) (deployed on Netlify).

## Tech stack

- **Next.js 15** (App Router, Server Components, static generation)
- **TypeScript**
- **Tailwind CSS 3**
- JSON content layer + moderated customer reviews (Netlify Blobs — no database)
- SEO: dynamic `sitemap.xml`, `robots.txt`, Open Graph + JSON-LD (`TaxiService`, `FAQPage`, `Service`)
- Deployed on **Netlify** via `@netlify/plugin-nextjs`

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run lint     # run ESLint
npm run build    # production build (prerenders all pages)
npm run start    # serve the production build
```

Requires Node.js 20+ (see `.nvmrc`).

## Project structure

```
src/
├── app/                 # App Router pages
│   ├── page.tsx         # home page (assembles all sections)
│   ├── routes/[slug]/   # programmatic per-route landing pages (SEO)
│   ├── services/[slug]/ # per-service landing pages
│   ├── routes/, about/, contact/, privacy/, terms/
│   ├── sitemap.ts       # dynamic sitemap
│   └── robots.ts        # robots.txt
├── components/          # Header, Footer, Hero, BookingForm, sections, Icons
├── data/                # content layer
│   ├── site.ts          # business config (phone, WhatsApp, address) — EDIT THIS
│   ├── routes.json      # outstation routes (drives route pages + sitemap)
│   ├── services.json    # services
│   ├── fleet.json       # cars
│   ├── testimonials.json
│   └── faq.json
└── lib/format.ts
```

## Configuration

Update real business details in **`src/data/site.ts`** — especially `phone`, `phoneHref`
(the `tel:` link) and `whatsapp` (E.164, no `+` or spaces). These power the
click-to-call buttons, the WhatsApp booking deep links and the structured data.

Add or edit outstation routes in `src/data/routes.json`; each entry automatically
generates an SEO-optimized landing page at `/routes/<slug>` and is added to the sitemap.
Set **`fromPrice`** per route in `routes.json` (sedan round-trip). Other
vehicle fares on route pages scale from that using `perKm` in `fleet.json`
(`src/lib/pricing.ts`).

## Images

Fleet photos go in **`public/images/fleet/`**. Name files after the vehicle
`slug` in `src/data/fleet.json` (e.g. `sedan.jpg`) and set the matching
`image` path in that JSON file. See `public/images/fleet/README.md`.

Social share preview: replace **`public/images/og.jpg`** (1200×630) or update
`ogImage` in `src/data/site.ts`. See `public/images/og-README.md`.

## Customer reviews (no database)

**No Supabase or external database.** Reviews are stored in **Netlify Blobs**
(included with your free Netlify plan).

| Layer | What it does |
| ----- | ------------ |
| **Storage** | Netlify Blobs on production (`.data/reviews.json` locally in dev) |
| **Moderation** | Submissions stay `pending` until you approve at `/admin/reviews` |
| **Turnstile** | Cloudflare CAPTCHA blocks bots (required in production) |
| **Honeypot** | Hidden field catches automated spam |
| **Rate limit** | Max 3 submissions per hashed IP per 24 hours |
| **Sanitization** | Plain text only — HTML/links stripped |

### Setup (Netlify env vars)

In **Netlify → Site settings → Environment variables**, add:

| Variable | Purpose |
| -------- | ------- |
| `ADMIN_REVIEW_PASSWORD` | Password you choose for the moderation panel |
| `ADMIN_SESSION_SECRET` | Random string (`openssl rand -hex 32`) |
| `IP_HASH_SALT` | Random string for rate-limiting |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | From [Cloudflare Turnstile](https://dash.cloudflare.com/turnstile) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |

### Admin login

1. Go to **`https://hublitaxi.com/admin/reviews`**
2. Enter the password you set as `ADMIN_REVIEW_PASSWORD`
3. Approve or reject pending reviews — approved ones appear on the home page

There is no separate username; only the password you set in Netlify. The session
lasts 8 hours (secure httpOnly cookie).

Seeded reviews in `testimonials.json` always show on the home page. Approved
customer reviews are added on top and included in the rating count.

## Deployment (Netlify)

The repo includes `netlify.toml`. On Netlify, connect this GitHub repository and deploy —
the build command is `next build` and the Next.js runtime plugin handles the rest.
Add review env vars in the Netlify dashboard before enabling the review form in production.
