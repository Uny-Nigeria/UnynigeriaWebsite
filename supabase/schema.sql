create table if not exists public.interest_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  campus text not null,
  platform text not null,
  interest text not null,
  created_at timestamptz not null default now()
);

alter table public.interest_signups enable row level security;

drop policy if exists "Anyone can submit interest" on public.interest_signups;
create policy "Anyone can submit interest"
  on public.interest_signups
  for insert
  to anon, authenticated
  with check (
    length(trim(email)) > 3
    and position('@' in email) > 1
  );
