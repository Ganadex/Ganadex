create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

create type category_type as enum ('leche', 'carne', 'doble_proposito');
create type sex_type as enum ('macho', 'hembra');
create type animal_status as enum ('disponible', 'vendido', 'reservado');
create type user_role as enum ('user', 'seller', 'admin');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles_select" on profiles for select using (true);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

create table razas (
  id uuid primary key default uuid_generate_v4(),
  nombre text not null unique,
  categoria category_type not null,
  origen text,
  descripcion text,
  imagen_url text,
  created_at timestamptz not null default now()
);

alter table razas enable row level security;

create policy "razas_select" on razas for select using (true);
create policy "razas_admin" on razas for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create table vendedores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  nombre_completo text not null,
  nombre_empresa text,
  telefono text not null,
  whatsapp text not null,
  email text not null,
  ubicacion text not null,
  estado text not null,
  pais text not null default 'Colombia',
  bio text,
  avatar_url text,
  documento_identidad text,
  verificado boolean not null default false,
  calificacion numeric(3,2) not null default 0,
  total_ventas integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table vendedores enable row level security;

create policy "vendedores_select" on vendedores for select using (activo = true);
create policy "vendedores_update" on vendedores for update using (user_id = auth.uid());
create policy "vendedores_insert" on vendedores for insert with check (user_id = auth.uid());

create table ganado (
  id uuid primary key default uuid_generate_v4(),
  vendedor_id uuid not null references vendedores(id) on delete cascade,
  raza_id uuid not null references razas(id),
  nombre text not null,
  numero_registro text,
  categoria category_type not null,
  sexo sex_type not null,
  edad_meses integer not null,
  peso_kg numeric(8,2) not null,
  precio numeric(12,2) not null,
  moneda text not null default 'COP',
  ubicacion text not null,
  estado text not null,
  pais text not null default 'Colombia',
  descripcion text not null,
  informacion_genetica text,
  pedigree text,
  status animal_status not null default 'disponible',
  vistas integer not null default 0,
  destacado boolean not null default false,
  slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table ganado enable row level security;

create policy "ganado_select_public" on ganado for select using (status = 'disponible');
create policy "ganado_select_owner" on ganado for select using (
  vendedor_id in (select id from vendedores where user_id = auth.uid())
);
create policy "ganado_insert" on ganado for insert with check (
  vendedor_id in (select id from vendedores where user_id = auth.uid())
);
create policy "ganado_update" on ganado for update using (
  vendedor_id in (select id from vendedores where user_id = auth.uid())
);
create policy "ganado_delete" on ganado for delete using (
  vendedor_id in (select id from vendedores where user_id = auth.uid())
);

create table imagenes_ganado (
  id uuid primary key default uuid_generate_v4(),
  ganado_id uuid not null references ganado(id) on delete cascade,
  url text not null,
  es_portada boolean not null default false,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

alter table imagenes_ganado enable row level security;

create policy "imagenes_select" on imagenes_ganado for select using (true);
create policy "imagenes_all" on imagenes_ganado for all using (
  exists (
    select 1 from ganado g
    join vendedores v on g.vendedor_id = v.id
    where g.id = ganado_id and v.user_id = auth.uid()
  )
);

create table videos_ganado (
  id uuid primary key default uuid_generate_v4(),
  ganado_id uuid not null references ganado(id) on delete cascade,
  url text not null,
  thumbnail_url text,
  titulo text,
  created_at timestamptz not null default now()
);

alter table videos_ganado enable row level security;

create policy "videos_select" on videos_ganado for select using (true);
create policy "videos_all" on videos_ganado for all using (
  exists (
    select 1 from ganado g
    join vendedores v on g.vendedor_id = v.id
    where g.id = ganado_id and v.user_id = auth.uid()
  )
);

create table mensajes (
  id uuid primary key default uuid_generate_v4(),
  emisor_id uuid not null references profiles(id),
  receptor_id uuid not null references profiles(id),
  ganado_id uuid references ganado(id) on delete set null,
  contenido text not null,
  leido boolean not null default false,
  created_at timestamptz not null default now()
);

alter table mensajes enable row level security;

create policy "mensajes_select" on mensajes for select using (
  auth.uid() = emisor_id or auth.uid() = receptor_id
);
create policy "mensajes_insert" on mensajes for insert with check (auth.uid() = emisor_id);
create policy "mensajes_update" on mensajes for update using (auth.uid() = receptor_id);

create table favoritos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  ganado_id uuid not null references ganado(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, ganado_id)
);

alter table favoritos enable row level security;

create policy "favoritos_select" on favoritos for select using (auth.uid() = user_id);
create policy "favoritos_all" on favoritos for all using (auth.uid() = user_id);

create index idx_ganado_categoria on ganado(categoria);
create index idx_ganado_status on ganado(status);
create index idx_ganado_raza_id on ganado(raza_id);
create index idx_ganado_vendedor_id on ganado(vendedor_id);
create index idx_ganado_precio on ganado(precio);
create index idx_ganado_destacado on ganado(destacado);
create index idx_ganado_pais_estado on ganado(pais, estado);
create index idx_ganado_nombre_trgm on ganado using gin(nombre gin_trgm_ops);
create index idx_imagenes_ganado_id on imagenes_ganado(ganado_id);
create index idx_videos_ganado_id on videos_ganado(ganado_id);

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_ganado_updated_at
  before update on ganado
  for each row execute function update_updated_at();

create trigger trg_vendedores_updated_at
  before update on vendedores
  for each row execute function update_updated_at();

create trigger trg_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles(id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

create or replace function increment_vistas(ganado_id uuid)
returns void language plpgsql security definer as $$
begin
  update ganado set vistas = vistas + 1 where id = ganado_id;
end;
$$;

insert into razas (nombre, categoria, origen) values
  ('Holstein', 'leche', 'Holanda'),
  ('Jersey', 'leche', 'Reino Unido'),
  ('Pardo Suizo', 'leche', 'Suiza'),
  ('Ayrshire', 'leche', 'Escocia'),
  ('Guernsey', 'leche', 'Reino Unido'),
  ('Girolando', 'leche', 'Brasil'),
  ('Gyr Lechero', 'leche', 'India'),
  ('Angus', 'carne', 'Escocia'),
  ('Brahman', 'carne', 'India'),
  ('Hereford', 'carne', 'Reino Unido'),
  ('Charolais', 'carne', 'Francia'),
  ('Senepol', 'carne', 'Santa Cruz'),
  ('Nelore', 'carne', 'India/Brasil'),
  ('Romosinuano', 'carne', 'Colombia'),
  ('Blanco Orejinegro', 'carne', 'Colombia'),
  ('Simmental', 'doble_proposito', 'Suiza'),
  ('Normando', 'doble_proposito', 'Francia'),
  ('Gyr', 'doble_proposito', 'India'),
  ('Simbrah', 'doble_proposito', 'Brasil'),
  ('Costeno con Cuernos', 'doble_proposito', 'Colombia'),
  ('Lucerna', 'doble_proposito', 'Colombia'),
  ('Velasquez', 'doble_proposito', 'Colombia');
