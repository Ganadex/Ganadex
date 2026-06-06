-- Insertar razas (ignorar si ya existen)
insert into razas (nombre, categoria, origen) values
  -- Leche (5 razas)
  ('Holstein', 'leche', 'Holanda'),
  ('Jersey', 'leche', 'Reino Unido'),
  ('Pardo Suizo', 'leche', 'Suiza'),
  ('Ayrshire', 'leche', 'Escocia'),
  ('Gyr', 'leche', 'India'),
  -- Carne (5 razas)
  ('Nelore', 'carne', 'India/Brasil'),
  ('Brahman', 'carne', 'India'),
  ('Angus', 'carne', 'Escocia'),
  ('Big Máster', 'carne', 'Colombia'),
  ('Simental', 'carne', 'Suiza'),
  -- Doble Propósito
  ('Normando', 'doble_proposito', 'Francia'),
  ('Simbrah', 'doble_proposito', 'Brasil'),
  ('Costeno con Cuernos', 'doble_proposito', 'Colombia'),
  ('Lucerna', 'doble_proposito', 'Colombia'),
  ('Velasquez', 'doble_proposito', 'Colombia'),
  ('Mestizo Doble Propósito', 'doble_proposito', 'Colombia'),
  ('Cruce Normando x Brahman', 'doble_proposito', 'Colombia')
on conflict (nombre) do nothing;
