# JYC V15 — Functional Platform Pass

## Goal

This release focuses on making the existing JYC platform features behave like a real student platform, not only look like one.

## Public experience

- Site-data stale cache: the last successful public snapshot can render while Supabase is unavailable.
- Online/offline awareness with a retry action.
- Saved clubs/events synchronize between browser tabs.
- Event pages support Google Calendar plus downloadable `.ics`.
- Event reminders can be stored for signed-in users and locally on the current device.
- Public Notification Center now actually subscribes the browser to Supabase web push when VAPID configuration is present.
- Service worker now handles incoming push notifications and notification clicks.
- Account-linked users can cancel their own native event registrations.
- Signed-in users can re-register a previously cancelled native registration without creating a duplicate row.

## Admin experience

- Native registration workspace now has search and status filtering.
- Registration status updates write `updated_at` and update the UI without a reload.
- Existing role-based admin boundaries remain enforced by the Supabase RPC/RLS layer.
- Existing review/version/activity/backup/restore workflows remain intact.

## Data / security

Run `supabase/V15-FUNCTIONAL-PASS.sql` on an existing Supabase project. It is idempotent and repairs the fields/policies required by the new account/reminder behavior.

The frontend continues to use only the Supabase publishable key. Service-role credentials remain Edge Function/server-side only.

## Open-source patterns used

- shadcn/ui: collapsible workspace/sidebar and dialog patterns.
- React Router: route-driven navigation and mutation/revalidation model.
- TanStack Table: future-ready filtering/sorting/pagination patterns for admin data.
- TanStack Query: optimistic update/rollback pattern for future high-frequency server mutations.
- Supabase RLS + Storage: database and media authorization model.

## Verification

The sandbox could not complete `npm install` because dependency installation timed out, so a production Vite build has not been claimed as verified here. Run `npm install` and `npm run build` in the Windows project before deployment.
