-- Panel de mensajes de /contacto: solo administradores pueden leerlos.
-- Ejecutar una vez en Supabase > SQL Editor (despues de contactos.sql).

-- 1) SEGURIDAD: hasta ahora cualquier usuario con sesion podia ponerse role='admin'
--    a si mismo desde el navegador (profiles_update no limitaba columnas).
--    Este trigger bloquea cambios de rol hechos por usuarios de la web.
--    Desde el SQL Editor o con la service key (auth.uid() es null) sigue permitido.
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null then
    raise exception 'No se permite cambiar el rol desde la aplicacion';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_change on public.profiles;
create trigger trg_prevent_role_change
  before update on public.profiles
  for each row execute function public.prevent_role_change();

-- Al crear un perfil desde la web, siempre debe ser el propio y con rol 'user'.
-- (El alta normal la hace el trigger handle_new_user, que no pasa por esta regla.)
drop policy if exists "profiles_insert" on public.profiles;
create policy "profiles_insert" on public.profiles
  for insert with check (auth.uid() = id and role = 'user');

-- 2) Funcion auxiliar: es el usuario actual administrador?
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 3) Solo administradores leen y marcan como leidos los mensajes de contacto.
drop policy if exists "contactos_select_admin" on public.contactos;
create policy "contactos_select_admin" on public.contactos
  for select to authenticated using (public.is_admin());

drop policy if exists "contactos_update_admin" on public.contactos;
create policy "contactos_update_admin" on public.contactos
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 4) Convertirte en administrador: edita el correo y ejecuta ESTA linea aparte.
-- update public.profiles set role = 'admin' where email = 'TU_CORREO@gmail.com';
