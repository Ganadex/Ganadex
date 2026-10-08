-- Acceso de equipo: secciones del dashboard que un miembro puede ver.
-- Ejecutar en el SQL Editor de Supabase.

alter table public.profiles
  add column if not exists permisos text[] not null default '{}';

-- Evita que un usuario se auto-asigne rol o permisos (la policy profiles_update
-- permite editar la propia fila). Solo un admin, o el service role (auth.uid() null,
-- usado por el servidor de Ganadex), puede cambiar estas columnas.
create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    new.role := old.role;
    new.permisos := old.permisos;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_protect_privileges on public.profiles;
create trigger trg_profiles_protect_privileges
  before update on public.profiles
  for each row execute function public.protect_profile_privileges();

-- Tu usuario debe ser admin para ver /dashboard/equipo:
-- update public.profiles set role = 'admin' where lower(email) = 'TU_CORREO';
