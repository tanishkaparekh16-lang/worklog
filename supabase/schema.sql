-- Run this once in the Supabase dashboard: SQL Editor -> New query -> Run.

create table if not exists clients (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  client_id     uuid references clients(id) on delete set null,

  name          text not null,
  amount        numeric(10,2) not null default 0,
  completed_on  date not null,
  minutes       integer,
  notes         text,

  status        text not null default 'completed'
                check (status in ('completed','pending')),
  paid          boolean not null default false,
  paid_on       date,

  project_type  text,
  rate_type     text not null default 'flat'
                check (rate_type in ('flat','hourly')),

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists settings (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  currency      text not null default 'USD',
  default_rate  numeric(10,2) not null default 45,
  monthly_goal  numeric(10,2) not null default 0,
  week_start    smallint not null default 1,
  updated_at    timestamptz not null default now()
);

create index if not exists projects_user_date_idx
  on projects (user_id, completed_on desc);
create index if not exists projects_unpaid_idx
  on projects (user_id, paid) where paid = false;

alter table clients  enable row level security;
alter table projects enable row level security;
alter table settings enable row level security;

drop policy if exists "own clients"  on clients;
drop policy if exists "own projects" on projects;
drop policy if exists "own settings" on settings;

create policy "own clients"  on clients
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own projects" on projects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own settings" on settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
