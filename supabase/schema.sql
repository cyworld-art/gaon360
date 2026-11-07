-- GAONVYRA 360 / Supabase Free / Run ONCE in Supabase SQL Editor.
-- Uses Supabase-managed auth.users; never store passwords in public tables.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 70),
  role text not null default 'member' check (role in ('member','admin')),
  status text not null default 'active' check (status in ('active','disabled')),
  created_at timestamptz not null default now()
);

-- Keep RLS on; never allow client to grant itself an admin role.
alter table public.profiles enable row level security;
-- Supabase grants ALL on new public tables to anon/authenticated by default.
-- Revoke everything first, then grant back only what members need.
-- (Without this, a member could UPDATE their own role to 'admin'.)
revoke all on public.profiles from anon, authenticated, public;
grant select (id, display_name, role, status, created_at), update (display_name) on public.profiles to authenticated;

drop policy if exists "self read" on public.profiles;
create policy "self read" on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
drop policy if exists "self update name" on public.profiles;
create policy "self update name" on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Automatically create a profile after Supabase Auth sign-up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = ''
as $$
begin
  insert into public.profiles(id,display_name)
  values (new.id,left(coalesce(new.raw_user_meta_data->>'display_name',''),70))
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Backfill existing users, if needed. All new profiles default to MEMBER.
insert into public.profiles (id, display_name)
select id,left(coalesce(raw_user_meta_data->>'display_name',''),70) from auth.users
on conflict (id) do nothing;

-- Private SECURITY DEFINER RPC: never expose raw auth.users to browser.
-- Authorization is checked inside the database (not based on client-side UI).
create or replace function public.admin_list_members(
  p_search text default '', p_limit integer default 20, p_offset integer default 0
) returns table (
  id uuid, email text, display_name text, role text, status text,
  created_at timestamptz, last_sign_in_at timestamptz, total_count bigint
)
language plpgsql security definer set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin' and p.status = 'active'
  ) then
    raise exception 'Not authorized' using errcode = '42501';
  end if;
  return query
  with matched as (
    select u.id, u.email::text, p.display_name, p.role,p.status,
      p.created_at, u.last_sign_in_at
    from auth.users u
    inner join public.profiles p on p.id=u.id
    where coalesce(p_search,'') = '' or u.email ilike '%'||left(p_search,100)||'%' or p.display_name ilike '%'||left(p_search,100)||'%'
  )
  select m.id, m.email, m.display_name, m.role, m.status,
  m.created_at, m.last_sign_in_at,(select count(*) from matched)
  from matched m order by m.created_at desc
  limit greatest(1,least(coalesce(p_limit,20),50))
  offset greatest(0,coalesce(p_offset,0));
end;
$$;
revoke all on function public.admin_list_members(text,integer,integer) from public, anon;
grant execute on function public.admin_list_members(text,integer,integer) to authenticated;

-- Bootstrap the first admin ONLY AFTER this email signs up and verifies.
-- Replace the placeholder and run manually in SQL Editor (NEVER from browser):
-- update public.profiles set role='admin'
-- where id=(select id from auth.users where email='YOUR_REAL_ADMIN_EMAIL' limit 1);
-- Check the affected row count and verify you upgraded exactly one intended account.
