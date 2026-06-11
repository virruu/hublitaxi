-- Run once in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  text text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists reviews_status_created_idx
  on public.reviews (status, created_at desc);

create index if not exists reviews_ip_hash_created_idx
  on public.reviews (ip_hash, created_at desc);

alter table public.reviews enable row level security;

-- No public policies: all access goes through Next.js API using the service role key.
