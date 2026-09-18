-- Roadtrip 云同步表
-- 在 Supabase SQL Editor 执行一次即可。

create table if not exists public.roadtrip_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.roadtrip_state enable row level security;

drop policy if exists "roadtrip_select_own" on public.roadtrip_state;
drop policy if exists "roadtrip_insert_own" on public.roadtrip_state;
drop policy if exists "roadtrip_update_own" on public.roadtrip_state;
drop policy if exists "roadtrip_delete_own" on public.roadtrip_state;

create policy "roadtrip_select_own"
on public.roadtrip_state for select
to authenticated
using (auth.uid() = user_id);

create policy "roadtrip_insert_own"
on public.roadtrip_state for insert
to authenticated
with check (auth.uid() = user_id);

create policy "roadtrip_update_own"
on public.roadtrip_state for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "roadtrip_delete_own"
on public.roadtrip_state for delete
to authenticated
using (auth.uid() = user_id);

grant select, insert, update, delete on public.roadtrip_state to authenticated;
