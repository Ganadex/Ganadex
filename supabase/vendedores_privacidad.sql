-- Privacidad de la tabla vendedores.
-- Ejecutar una vez en Supabase > SQL Editor.
--
-- PROBLEMA: la politica "vendedores_select" permitia leer TODAS las columnas a cualquiera,
-- incluidos documento_identidad, telefono, whatsapp y email. Ademas cualquier vendedor podia
-- ponerse verificado = true o calificacion = 5 a si mismo (nada limitaba las columnas).
--
-- SOLUCION: permisos por columna.
--   * Publico (anon/authenticated): solo columnas seguras.
--   * Dueño: lee su fila completa con la funcion get_my_seller().
--   * Insertar/editar: solo los campos del formulario (no verificado, calificacion, etc.).

-- 1) LECTURA: solo columnas publicas
revoke select on public.vendedores from anon, authenticated;
grant select (
  id, user_id, nombre_completo, nombre_empresa, ubicacion, estado, pais,
  bio, avatar_url, verificado, calificacion, total_ventas, activo,
  created_at, updated_at
) on public.vendedores to anon, authenticated;

-- El dueño tambien puede ver su fila aunque este inactiva
drop policy if exists "vendedores_select_owner" on public.vendedores;
create policy "vendedores_select_owner" on public.vendedores
  for select to authenticated using (user_id = auth.uid());

-- 2) ESCRITURA: solo los campos que el vendedor puede editar
revoke insert, update on public.vendedores from anon, authenticated;
grant insert (
  user_id, nombre_completo, nombre_empresa, telefono, whatsapp, email,
  ubicacion, estado, pais, bio, avatar_url, documento_identidad
) on public.vendedores to authenticated;
grant update (
  nombre_completo, nombre_empresa, telefono, whatsapp, email,
  ubicacion, estado, pais, bio, avatar_url, documento_identidad, updated_at
) on public.vendedores to authenticated;

-- 3) El dueño lee su fila COMPLETA (con datos privados) por esta funcion
create or replace function public.get_my_seller()
returns setof public.vendedores
language sql
security definer
stable
set search_path = public
as $$
  select * from public.vendedores where user_id = auth.uid();
$$;

revoke all on function public.get_my_seller() from public, anon;
grant execute on function public.get_my_seller() to authenticated;

notify pgrst, 'reload schema';
