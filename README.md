# JYC Website — V14.2 Platform Pass

V14.2 builds on the senior interaction pass with an interactive phoenix stage, JYC ecosystem navigation, metadata-driven Discover, editorial Moments, magnetic mobile navigation, pill-first controls, dynamic viewport counters, responsive 3D tilt, and a footer-only admin entry.

The project remains data-first: empty states do not invent clubs, events, people, or photographs.

## New platform surfaces
- `/discover` — interest-based discovery from published club metadata.
- Interactive hero phoenix depth/tilt and orbit system.
- JYC Ecosystem on the homepage.
- JYC Moments editorial archive preview.
- Real-data hero counters with one-time count-up.

## Verification
Run `npm install` and `npm run build` locally before deployment. The packaging environment used for this release could not complete npm dependency installation because the registry request timed out, so a production build is not claimed as verified here.
# JIIT Youth Club — Sector 128

Official JYC website for JIIT Sector 128, Noida.

A responsive React + Vite experience with a Supabase content layer, role-based Control Center, club pages, events, gallery, recruitment/auditions, notifications, Fest Mode and a GitHub/Vercel-ready deployment structure.

> **Ready to Soar**

## Highlights

- Premium JYC light/dark interface using the approved beige, black, red and gold palette.
- Public pages: Home, About, Clubs, Club Detail, Events, Event Detail, Gallery, Team, Contact.
- Flexible Club pages with optional sections, leadership, projects, achievements, recruitment, auditions, events and gallery.
- Events with upcoming/live/past states, search, filters, calendar, reminders, sharing, QR and registration.
- Dedicated full-site **Fest Mode**: when activated by JYC, the public experience switches to the fest visual shell and live programme.
- Recruitment and Auditions stay on individual club pages and dedicated hubs — they are not shown on the homepage.
- Homepage CMS with editable copy, visibility controls and drag-style section ordering.
- Supabase Auth, Storage, RLS, content reviews, versions, activity logs and scoped admin permissions.
- Installable PWA shell, browser notification architecture, analytics and error reporting.
- Route/vendor code splitting so the admin CMS is not part of the initial public download.
- GitHub Actions build check and Vercel security headers.

## Roles

- **Super Admin** — full Control Center access.
- **JYC Editor** — operational editorial access to clubs, events and gallery.
- **Club Admin** — manages only the assigned club, its events and its gallery.
- **Specialist admins** — scoped to their assigned content area.

## Local development

### 1. Install Node.js

Use Node.js 20.19+.

### 2. Configure environment

Copy `.env.example` to `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
VITE_VAPID_PUBLIC_KEY=YOUR_VAPID_PUBLIC_KEY
```

Never put a Supabase secret/service-role key or VAPID private key in frontend environment variables.

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally

```bash
npm run dev
```

### 5. Production build

```bash
npm run build
npm run preview
```

## Supabase setup

Run the SQL files in this order in the Supabase SQL Editor:

1. `supabase/00-core-migration.sql`
2. `supabase/relational-v2.sql`
3. `supabase/platform-v3.sql`
4. `supabase/platform-v4-fix.sql`
5. `supabase/final-role-hardening.sql`

If an older development database contains the accidental starter **Abhivyakti** record, also run:

```text
supabase/maintenance/00-remove-legacy-demo-data.sql
```

The application itself does not seed Abhivyakti or other demo clubs.

### Edge Functions

Deploy privileged functions from `supabase/functions/` with the Supabase CLI:

```bash
npx supabase functions deploy admin-management
npx supabase functions deploy send-notification
npx supabase functions deploy backup-site-data
```

Configure server-side secrets in Supabase. Never expose the service-role/secret key in the Vite application.

## GitHub

This package is intentionally cleaned for a repository:

```text
.github/                 CI workflow
public/                  logo, manifest, service worker, robots
src/                     React application
supabase/                migrations, RLS and Edge Functions
.env.example             environment template
.gitignore               local/build exclusions
index.html
package.json
package-lock.json
vite.config.js
vercel.json
README.md
PRODUCTION-SETUP.md
SECURITY.md
ADMIN-ROLE-MATRIX.md
SUPABASE-FUNCTIONS.md
```

Not included:

- `node_modules/`
- `dist/`
- `.env.local`
- temporary QA reports
- duplicate legacy migration files

## Deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
4. Add `VITE_VAPID_PUBLIC_KEY` only after Web Push is configured.
5. Run the production build.
6. Test desktop and mobile routes.
7. Connect the official JYC domain when available.

## Content policy for the project

The public content store intentionally starts empty. Add only approved JYC clubs, categories, team members, events, announcements and gallery media through the Control Center.

The creator credit is fixed to the approved website creator profile and is not editable from the JYC Control Center.

## Website creator

**Kaustubh Dua — Website Creator**

The creator profile is intentionally protected in the application.


V6.2 POLISH
- Fixed search modal layering via document portal
- Escape key, click-outside, close button, Ctrl/Cmd+K and / shortcuts
- Search body scroll lock, clear control, result counts and improved empty state
- Improved light mode surfaces and contrast using approved JYC palette
- Added focus-visible accessibility treatment

## V13.4 reference UI

The public UI now uses the red phoenix reference mark, a compact desktop header, a five-item mobile bottom navigation, improved search, and a responsive dark/light visual system.

### Public download / self-host

Open `/download` on the deployed site. It explains:

- public browser access without a Vercel account;
- phone/PWA installation;
- GitHub source;
- the downloadable source ZIP at `/downloads/jyc-website-source.zip`;
- Vercel Drop/self-hosting.

The production domain itself must be public in Vercel Deployment Protection settings. Code cannot override an account/project-level Vercel access gate.


## V13.5 Reference UI Overhaul

The latest UI pass aligns the public website more closely with the supplied JIIT Youth Club reference: compact desktop chrome, circular phoenix brand treatment, warm cream/dark themes, a tighter hero/orbit composition, compact “What’s Next” event strip, five-item mobile navigation, a right-side mobile More drawer, and a closer admin dashboard treatment.

The implementation keeps the existing Supabase/CMS data model and does not add the excluded “This Week at JYC” section.

## V13.8 Animated Reference Polish

The latest UI pass adds visibly moving orbital rings and light nodes to the phoenix hero, subtle star/network motion, desktop pointer-depth parallax, a live next-event countdown strip, and native share/clipboard actions on club and event detail pages. The implementation keeps the existing Supabase/PWA/admin architecture and adapts open-source UI interaction patterns without adding a runtime UI dependency.

## V13.9 product polish

V13.9 adds a theme-aware custom cursor for fine pointers, an improved first-visit guide, and Fest Mode 2.0. Fest Mode now includes a live board, countdown, programme search and category filters, archive/schedule views, announcement and result panels, share/calendar actions, and a five-item mobile dock. Fest programme records can carry dates, times, descriptions and optional detail links. Reduced-motion and touch-device fallbacks remain enabled.
