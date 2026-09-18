# JYC — JIIT Youth Club Website

Public website for the JIIT Youth Club, built with **Next.js 14 (App Router) + Tailwind CSS v3**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start the dev server            |
| `npm run build`  | Production build                |
| `npm run start`  | Serve the production build      |
| `npm run lint`   | ESLint check                    |

## Project Structure

```
app/            Pages & layout (App Router)
components/     Shared + page-specific components
data/           Static content (events, hubs, team, gallery)
lib/            Data utilities & ThemeContext
public/images/  Placeholder images & logo (drop-in replaceable)
```

## Content

All content lives in `data/*.json` and matches the planned schema, so migrating
to Supabase later only requires changes in `lib/data.js`.

## Placeholders

- Names, texts, hubs, events, and stats are realistic placeholders — replace
  them with official JYC content before launch.
- Images (hero, events, hubs, team, gallery) are SVG placeholders.
  `next.config.js` sets `images.unoptimized: true` for them; remove it once
  real `.webp`/`.jpg` assets are in place.
- Colour tokens (light & dark) are defined in `app/globals.css` per the spec:
  beige/cream light surfaces, near-black dark surfaces, red accent, gold
  secondary. The club logo lives at `public/images/logos/jyc-logo.jpg`.