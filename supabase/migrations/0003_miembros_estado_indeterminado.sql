alter table miembros
  add column if not exists gps_activo boolean not null default false,
  add column if not exists gps_ultima_actualizacion timestamptz,
  add column if not exists gps_precision double precision,
  add column if not exists gps_latitud double precision,
  add column if not exists gps_longitud double precision;

alter table miembros
  drop constraint if exists miembros_estado_check;

alter table miembros
  add constraint miembros_estado_check
  check (estado in ('dentro', 'alrededores', 'indeterminado'));
