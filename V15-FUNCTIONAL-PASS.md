# JYC V15 Functional Pass

## What changed

- Stale-while-revalidate site-data cache so public content can still render when Supabase is temporarily unavailable.
- Retryable offline/cached-data status instead of forcing a full page reload.
- Saved clubs/events now synchronize across browser tabs.
- Event pages now provide Google Calendar and a one-hour reminder flow.
- Signed-in users can cancel their own native event registrations.
- Local reminder state is persisted on the device and restored after reload while the site is open.
- Service-worker cache namespace bumped for the new runtime.

## Supabase

For an existing project, run `supabase/V15-FUNCTIONAL-PASS.sql` in the Supabase SQL editor.
The migration is idempotent and adds the account-linked registration/reminder permissions used by the current frontend.

## Open-source implementation references

- shadcn/ui: composable sidebar and dialog patterns.
- React Router: route actions/revalidation patterns for future server-backed forms.
- TanStack Table: filtering, sorting, pagination and selection patterns for future admin data grids.
- TanStack Query: optimistic update/rollback patterns for future high-frequency mutations.
- Supabase RLS/Storage: database and media authorization model.
