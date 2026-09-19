-- JYC CONTACT FORM
-- Run this in the connected JYC Supabase project's SQL Editor.
-- Creates the table used by the /contact page form.
-- Safe to run repeatedly.

create table if not exists public.jyc_contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.jyc_contact_submissions enable row level security;

drop policy if exists "public submit contact" on public.jyc_contact_submissions;
create policy "public submit contact" on public.jyc_contact_submissions for insert to anon,authenticated with check (true);

drop policy if exists "admins read contact messages" on public.jyc_contact_submissions;
create policy "admins read contact messages" on public.jyc_contact_submissions for select to authenticated using (public.jyc_v2_role() in ('super_admin','jyc_super_admin','jyc_admin','events_admin','club_admin'));

select 'JYC contact form table ready.' as result;