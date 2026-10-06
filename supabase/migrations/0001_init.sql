-- Perfiles de usuario
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  nombre text not null,
  rol text check (rol in ('visitante','brigadista','coordinador')) default 'visitante',
  creado_en timestamptz default now()
);

-- Miembros de la brigada
create table miembros (
  id bigserial primary key,
  nombre text not null,
  rol text check (rol in ('emergencia','rescatista','incendios')) not null,
  iniciales text,
  estado text check (estado in ('dentro','alrededores')) default 'alrededores',
  activo boolean default true,
  x numeric default 500,
  y numeric default 350,
  actualizado_en timestamptz default now()
);

-- Incidentes
create table incidentes (
  id bigserial primary key,
  categoria text check (categoria in ('incendio','rescate','derrame','accidente')) not null,
  ubicacion text,
  descripcion text,
  x numeric,
  y numeric,
  simulacro boolean default false,
  inicio timestamptz default now(),
  fin timestamptz,
  duracion_seg int,
  declarado_por uuid references profiles(id),
  cerrado_por uuid references profiles(id)
);

-- Progreso del tour
create table tour_progreso (
  user_id uuid references profiles(id) on delete cascade,
  paso_id text not null,
  completado_en timestamptz default now(),
  primary key (user_id, paso_id)
);

-- RLS
alter table miembros enable row level security;
alter table incidentes enable row level security;
alter table tour_progreso enable row level security;

create policy "Lectura publica miembros" on miembros for select using (true);
create policy "Escritura autenticada miembros" on miembros for all using (auth.role() = 'authenticated');

create policy "Lectura autenticada incidentes" on incidentes for select using (auth.role() = 'authenticated');
create policy "Insert autenticado incidentes" on incidentes for insert with check (auth.role() = 'authenticated');

create policy "Tour propio" on tour_progreso for all using (auth.uid() = user_id);