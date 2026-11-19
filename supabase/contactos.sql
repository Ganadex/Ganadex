-- Mensajes del formulario público de /contacto (sin necesidad de cuenta).
-- Ejecutar una vez en Supabase > SQL Editor.

create table if not exists contactos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200),
  asunto text not null check (char_length(asunto) between 1 and 200),
  mensaje text not null check (char_length(mensaje) between 1 and 5000),
  leido boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contactos enable row level security;

-- Cualquiera puede ENVIAR un mensaje...
drop policy if exists "contactos_insert_public" on contactos;
create policy "contactos_insert_public" on contactos
  for insert to anon, authenticated
  with check (leido = false);

-- ...pero nadie puede LEER desde la web (no hay policy de select).
-- Los mensajes se leen en Supabase > Table Editor > contactos.

create index if not exists idx_contactos_created_at on contactos(created_at desc);
