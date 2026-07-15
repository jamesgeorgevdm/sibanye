# Sibanye Centre For Special Needs — Website

Next.js 16 website for Sibanye Centre For Special Needs, a school for children and young adults mainly on the Autism Spectrum and other learning disabilities, based in Gqeberha, South Africa.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Neon** (serverless Postgres) — review storage
- **Nodemailer** — contact form emails via Gmail
- **Vercel AI SDK** + **Google Gemini 2.5 Flash** — chatbot

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `EMAIL_USER` | Gmail address for contact form |
| `EMAIL_PASS` | Gmail app password (not your account password) |
| `ADMIN_SECRET` | Secret header value to generate review tokens |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key for the chatbot |
| `NEXT_PUBLIC_SITE_URL` | Full site URL (used in review token links) |

## Database setup

Run `schema.sql` once in the Neon SQL editor. It creates the `reviews` and `review_tokens` tables.

## Review system

Reviews are token-gated — visitors can't just leave a review by navigating to `/leave-review`. You generate a one-time link via the admin endpoint:

```bash
curl -X POST https://yoursite.com/api/admin/generate-token \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"event_label": "End of Year 2025", "days_valid": 30}'
```

The response includes a `url` you can send to families.

## Adding gallery content

**Images** — drop photos into `public/images/gallery/life/` or `public/images/gallery/events/` then add entries in `app/data/gallery.ts`.

**Videos** — add `.mp4` files to `public/images/gallery/videos/` and uncomment / add entries in the `videoShowcase.videos` array in `app/data/gallery.ts`.

## Project structure

```
app/
  page.tsx              Home (Hero + Reviews)
  about/                About sections (mission, activities, schedule, values)
  gallery/              Photo albums + video showcase
  contact/              Contact form → sends email via Gmail
  leave-review/         Token-gated review submission form
  components/           Shared UI components
  api/
    chat/               Gemini chatbot endpoint
    contact/            Nodemailer email sender
    reviews/            GET all reviews / POST a new review
    validate-token/     Checks whether a review token is still valid
    admin/generate-token/ Creates a new one-time review link
  lib/
    db.ts               Neon SQL client
    types.ts            Shared TypeScript types
  data/
    gallery.ts          All gallery image/video content lives here
  constants/
    intro.ts            Keys shared between IntroSplash and SiteShell
public/
  images/               All static images (hero, logo, gallery)
schema.sql              Neon database setup script
```
