# JYC Website — Implementation Plan

Build the complete JIIT Youth Club (JYC) public website using **Next.js 14 (App Router) + Tailwind CSS**, with static JSON data files for content, the approved light/dark colour system, and all Priority 1 pages fully functional.

## User Review Required

> [!IMPORTANT]
> **Stack**: Next.js 14 with App Router + Tailwind CSS v3. The project will be initialised with `npx create-next-app@latest`.

> [!IMPORTANT]
> **Data approach**: All event, hub, team, and gallery data will live in `/data/*.json` files. This keeps the first release simple and fast. The data schema follows the spec (Section 10), so migrating to Supabase later requires minimal refactoring.

> [!IMPORTANT]
> **Content**: Realistic placeholder content will be used throughout. Every text block, hub name, event, and team member will be clearly marked for easy replacement with official JYC content.

> [!WARNING]
> **Images**: Since no official assets are provided yet, I will generate placeholder hero images, event posters, and hub graphics using the image generation tool. The JYC logo will be an SVG placeholder. All images are drop-in replaceable.

## Open Questions

> [!IMPORTANT]
> **How many hubs does JYC have?** The spec mentions hubs but doesn't list them. I'll create 5–6 placeholder hubs (e.g., Tech, Social Impact, Cultural, Sports, Media, Design). Please provide the real list when available.

> [!IMPORTANT]
> **Team structure**: Should the Team page show a hierarchy (President → VPs → Hub Heads → Core Team), or a flat grid? I'll default to a hierarchy layout that can be simplified.

> [!NOTE]
> **Contact form**: The spec lists this as Priority 2. I'll include the form UI but without a working backend endpoint. When Supabase is added, it can submit to a `messages` table.

---

## Proposed Changes

The project will be built in **6 phases**, each producing a testable milestone.

---

### Phase 1 — Project Scaffolding & Design System

Set up the Next.js project, configure Tailwind with the JYC colour tokens, create the global CSS, and establish the theme toggle infrastructure.

#### [NEW] Project root — `c:\Users\kumar\OneDrive\Desktop\JYC\`

Initialise with `npx create-next-app@latest ./` using:
- App Router ✓
- Tailwind CSS ✓
- TypeScript ✗ (plain JS/JSX for simplicity)
- ESLint ✓
- `src/` directory ✗ (top-level `app/` as shown in spec)

#### [NEW] `tailwind.config.js`
Extend the Tailwind theme with JYC colour tokens:
```js
colors: {
  'jyc-bg-main': 'var(--bg-main)',
  'jyc-bg-card': 'var(--bg-card)',
  'jyc-text-primary': 'var(--text-primary)',
  'jyc-text-muted': 'var(--text-muted)',
  'jyc-accent-red': 'var(--accent-red)',
  'jyc-accent-gold': 'var(--accent-gold)',
  'jyc-border-tech': 'var(--border-tech)',
}
```

#### [NEW] `app/globals.css`
- CSS custom properties for light mode (`:root`) and dark mode (`[data-theme="dark"]`)
- Exact hex values from the spec (Section 1)
- Base typography using Google Font **Inter** (clean, modern, highly readable)
- Smooth transition on theme switch (`transition: background-color 0.3s, color 0.3s`)
- Scrollbar styling, selection colour, and focus ring styles using accent-gold

#### [NEW] `app/layout.jsx`
- Root layout with `<html>` tag receiving `data-theme` attribute
- Google Fonts import (Inter)
- SEO meta: title "JYC — JIIT Youth Club", description, Open Graph tags
- Wraps children with a `ThemeProvider` context

#### [NEW] `lib/ThemeContext.jsx`
- React context + provider for light/dark theme
- Reads saved preference from `localStorage`
- Falls back to system preference (`prefers-color-scheme`)
- Exposes `theme` and `toggleTheme`

---

### Phase 2 — Core Layout Components

Build the shared Navbar, Footer, and reusable UI primitives.

#### [NEW] `components/Navbar.jsx`
- Fixed top navigation bar with glassmorphism effect (semi-transparent background + backdrop blur)
- Left: JYC logo (SVG placeholder)
- Centre/Right: navigation links — Home | About | Hubs | Events | Gallery | Team | Contact
- Right end: `ThemeToggle` button
- Mobile: hamburger icon → slide-in/overlay menu with the same links + close button
- Active link indicator using accent-gold underline
- Smooth scroll-triggered background opacity change

#### [NEW] `components/Footer.jsx`
- 4-column responsive grid:
  1. Logo + short JYC description
  2. Quick Links (same as nav)
  3. Contact info (email, phone placeholder)
  4. Social links (Instagram, LinkedIn, Twitter/X icons)
- Bottom bar: copyright © 2026 JYC. All rights reserved.
- Accent-gold top border line
- Dark mode: slightly lighter card background

#### [NEW] `components/ThemeToggle.jsx`
- Sun/Moon icon toggle button
- Smooth icon rotation animation on click
- Calls `toggleTheme` from ThemeContext

#### [NEW] `components/ui/Button.jsx`
- Reusable button component with variants: `primary` (red), `secondary` (gold outline), `ghost`
- Hover micro-animations (scale, glow)

#### [NEW] `components/ui/SectionHeader.jsx`
- Consistent section title styling across all pages
- Title + optional subtitle + decorative gold accent line

#### [NEW] `components/ui/Card.jsx`
- Base card component with `bg-card` background, border, hover lift shadow
- Used as foundation for EventCard, HubCard, TeamCard

---

### Phase 3 — Data Layer & JSON Content

Create the static data files and utility functions.

#### [NEW] `data/events.json`
```json
[
  {
    "id": "code-innovate-hackathon",
    "title": "Code Innovate Hackathon",
    "description": "A 24-hour hackathon...",
    "date": "2026-10-15",
    "startTime": "09:00",
    "endTime": "09:00",
    "venue": "JIIT Auditorium, Sector 62",
    "hubId": "tech",
    "bannerImage": "/images/events/hackathon.webp",
    "registrationLink": "#",
    "status": "upcoming",
    "highlights": ["200+ participants", "₹50K prize pool"],
    "gallery": ["/images/events/hackathon-1.webp"],
    "fullWriteUp": "..."
  }
]
```
~8–10 sample events (mix of upcoming and past).

#### [NEW] `data/hubs.json`
~5–6 hubs with id, name, description, image, colour accent.

#### [NEW] `data/team.json`
~12–15 team members with id, name, role, hubId, photo, socialLinks.

#### [NEW] `data/gallery.json`
~15–20 gallery items with id, eventId, imageUrl, caption, category.

#### [NEW] `lib/data.js`
Utility functions:
- `getEvents()`, `getEventById(id)`, `getUpcomingEvents()`, `getPastEvents()`
- `getHubs()`, `getHubById(id)`
- `getTeam()`, `getTeamByHub(hubId)`
- `getGallery()`, `getGalleryByEvent(eventId)`

These read from the JSON files. When migrating to Supabase, only this file changes.

---

### Phase 4 — All Pages (Priority 1)

Build every page listed in the spec's Priority 1 section.

#### [NEW] `app/page.jsx` — Homepage

The homepage follows the recommended section order from Section 4:

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | (from layout — always visible) |
| 2 | **Hero** | Full-viewport section with large heading, tagline, subtle tech-circuit SVG background pattern, CTA button ("Get Involved"), and a fade-in entrance animation |
| 3 | **What is JYC?** | Brief intro paragraph with an accent-bordered card |
| 4 | **What We Do / Key Activities** | 3–4 icon cards (Workshops, Social Impact, Industry Connect, etc.) in a responsive grid |
| 5 | **Hubs Preview** | Horizontal scrollable or grid of hub cards — name, icon, one-liner — with "View All Hubs" link |
| 6 | **Featured/Upcoming Events** | 3 event cards in a row (auto-populated from `getUpcomingEvents()`) |
| 7 | **Past Events / Impact** | Stats counter section (events held, participants, hubs) + 2–3 past event highlight cards |
| 8 | **Gallery Preview** | Masonry-style grid of 6–8 photos with "View Full Gallery" button |
| 9 | **Footer** | (from layout) |

Supporting components for the homepage:
- [NEW] `components/home/HeroSection.jsx`
- [NEW] `components/home/WhatIsJYC.jsx`
- [NEW] `components/home/KeyActivities.jsx`
- [NEW] `components/home/HubsPreview.jsx`
- [NEW] `components/home/FeaturedEvents.jsx`
- [NEW] `components/home/PastEventsImpact.jsx`
- [NEW] `components/home/GalleryPreview.jsx`

#### [NEW] `app/about/page.jsx` — About Page
- Hero banner with "About JYC" heading
- Official description section (placeholder text)
- Vision & Mission cards
- What JYC does — expandable or accordion sections
- Timeline of JYC milestones (if data available, otherwise a visual placeholder)

#### [NEW] `app/hubs/page.jsx` — Hubs Listing
- Grid of hub cards, each showing: hub icon/image, name, short description
- Click → navigates to individual hub detail page
- Subtle hover animation (card lift + gold border glow)

#### [NEW] `app/hubs/[id]/page.jsx` — Individual Hub Page
- Hub banner/hero
- Full description
- Hub-specific events (filtered from events data)
- Hub team members (filtered from team data)

#### [NEW] `app/events/page.jsx` — Events Listing
- **Upcoming Events** section (cards grid)
- **Past Events** section (cards grid)
- Search bar (client-side filter by title)
- Hub filter dropdown
- [NEW] `components/EventCard.jsx` — poster image, title, date, hub badge, short description, "View Details" link

#### [NEW] `app/events/[id]/page.jsx` — Event Detail Page
- Full-width banner/poster image
- Event title, date/time, venue, hub badge
- Full write-up (rich text / markdown rendered)
- Event highlights (bullet list or icon cards)
- Event photo gallery (grid of images from that event)
- Registration link button (if applicable and status is upcoming)
- Back to Events link

#### [NEW] `app/gallery/page.jsx` — Gallery Page
- Responsive masonry/grid layout of all photos
- Category/event filter tabs
- Lightbox modal on image click (full-screen view with prev/next navigation)
- [NEW] `components/Lightbox.jsx` — modal overlay with image, caption, navigation arrows, close button

#### [NEW] `app/team/page.jsx` — Team Page
- Grouped by role hierarchy: Leadership → Hub Heads → Core Team
- Team member cards: photo, name, role, hub, optional social links
- [NEW] `components/TeamCard.jsx`

#### [NEW] `app/contact/page.jsx` — Contact Page
- Contact information card (email, phone, address placeholders)
- Social media links with icons
- Contact form (Name, Email, Subject, Message) — UI only, no backend submission yet
- Embedded map placeholder or JIIT location

---

### Phase 5 — Visual Polish & Responsiveness

#### [MODIFY] All page and component files
- **Responsive breakpoints**: mobile-first → `sm:` → `md:` → `lg:` → `xl:`
- **Animations**: Intersection Observer-based fade-in/slide-up on scroll for each section
- **Hover effects**: card lift, button glow, image zoom within containers
- **Loading states**: skeleton loaders for images
- **Empty states**: "No upcoming events" / "No photos yet" messages
- **Error states**: graceful fallbacks for missing images
- **Typography scale**: consistent heading sizes across pages
- **Spacing rhythm**: consistent section padding (py-16 to py-24)

#### [NEW] `components/ScrollAnimation.jsx`
- Wrapper component using Intersection Observer API
- Supports fade-in, slide-up, slide-in-left/right animations
- Configurable threshold and delay

#### [NEW] `public/images/` directory
- Generated placeholder images for: hero background, event posters, hub icons, team photos, gallery images
- All optimised as `.webp` using Next.js `<Image>` component

---

### Phase 6 — SEO, Metadata & Final QA

#### [MODIFY] `app/layout.jsx`
- Complete Open Graph and Twitter Card meta tags
- Favicon and apple-touch-icon
- Structured data (JSON-LD) for organization

#### [NEW] Per-page metadata
Each `page.jsx` exports a `metadata` object:
```js
export const metadata = {
  title: 'Events | JYC — JIIT Youth Club',
  description: 'Explore upcoming and past events...',
}
```

#### Final QA Checklist (from spec Section 21)
- ✅ All 7 public pages exist and are linked
- ✅ Light and dark themes use approved CSS variables
- ✅ No random colours introduced
- ✅ Typography readable at all sizes
- ✅ Works on mobile (320px+) and desktop
- ✅ Navbar and all buttons functional
- ✅ Upcoming/past event separation works
- ✅ Event details display correctly
- ✅ Images load with Next.js optimisation
- ✅ No broken links or console errors
- ✅ No placeholder text marked as "official"

---

## Project Structure Summary

```
c:\Users\kumar\OneDrive\Desktop\JYC\
├── app/
│   ├── layout.jsx              ← Root layout (Navbar + Footer + Theme)
│   ├── page.jsx                ← Homepage
│   ├── globals.css             ← Theme variables + base styles
│   ├── about/page.jsx
│   ├── hubs/page.jsx
│   ├── hubs/[id]/page.jsx
│   ├── events/page.jsx
│   ├── events/[id]/page.jsx
│   ├── gallery/page.jsx
│   ├── team/page.jsx
│   └── contact/page.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   ├── EventCard.jsx
│   ├── TeamCard.jsx
│   ├── Lightbox.jsx
│   ├── ScrollAnimation.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── SectionHeader.jsx
│   │   └── Card.jsx
│   └── home/
│       ├── HeroSection.jsx
│       ├── WhatIsJYC.jsx
│       ├── KeyActivities.jsx
│       ├── HubsPreview.jsx
│       ├── FeaturedEvents.jsx
│       ├── PastEventsImpact.jsx
│       └── GalleryPreview.jsx
├── data/
│   ├── events.json
│   ├── hubs.json
│   ├── team.json
│   └── gallery.json
├── lib/
│   ├── data.js                 ← Data fetching utilities
│   └── ThemeContext.jsx        ← Theme provider
├── public/
│   └── images/
│       ├── hero/
│       ├── events/
│       ├── hubs/
│       ├── team/
│       ├── gallery/
│       └── logos/
├── tailwind.config.js
├── package.json
└── next.config.js
```

---

## Verification Plan

### Automated Tests
```bash
npm run build     # Ensure production build succeeds with no errors
npm run lint      # ESLint passes
```

### Manual Verification
- **Desktop**: Test all 7 pages at 1920px, 1440px, 1280px widths
- **Mobile**: Test at 375px (iPhone), 390px, 428px widths
- **Theme**: Toggle light/dark on every page — verify no broken colours
- **Navigation**: Click every nav link, verify correct routing
- **Events**: Verify upcoming/past separation, event detail pages load correctly
- **Gallery**: Verify lightbox opens/closes, navigation between images works
- **Performance**: Lighthouse audit targeting 90+ scores
- **Browser recording**: Record a walkthrough of the entire site using the browser tool

### Deployment Verification
```bash
npx vercel --prod   # Deploy to Vercel (when ready)
```

---

## Estimated Build Order & Time

| Phase | What | Est. Time |
|-------|------|-----------|
| 1 | Project scaffold + design system | ~15 min |
| 2 | Navbar, Footer, UI primitives | ~30 min |
| 3 | Data files + utility functions | ~15 min |
| 4 | All 7+ pages | ~2–3 hours |
| 5 | Polish, animations, responsiveness | ~45 min |
| 6 | SEO, metadata, QA | ~30 min |
| **Total** | | **~4–5 hours** |
