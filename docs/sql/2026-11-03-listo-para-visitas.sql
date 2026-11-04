-- Changements appliqués directement sur la base Supabase le 03/11/2026 (déjà exécutés).
-- Conservés ici pour garder une trace ; ne pas relancer sans vérifier.

-- 1. Numéro WhatsApp propre à chaque annonce + lecture des messages
alter table public.anuncios add column if not exists whatsapp text;

drop policy if exists "mensajes_marcar_leido" on public.mensajes;
create policy "mensajes_marcar_leido" on public.mensajes
  for update to authenticated
  using (auth.uid() = destinatario_id)
  with check (auth.uid() = destinatario_id);
revoke update on public.mensajes from anon, authenticated;
grant update (leido) on public.mensajes to authenticated;
alter table public.mensajes alter column leido set default false;
update public.mensajes set leido = false where leido is null;

-- 2. Fusion des 22 modèles en double (sauvegarde dans _respaldo_modelos_duplicados)
create table if not exists public._respaldo_modelos_duplicados as
with ranked as (
  select m.*,
    row_number() over w as rn,
    first_value(m.id) over w as conservar_id
  from public.modelos m
  window w as (
    partition by m.marca_id, lower(trim(m.nombre))
    order by (m.anio_inicio is null), (m.anio_fin is null), (m.carroceria is null), m.id
  )
)
select id, marca_id, nombre, anio_inicio, anio_fin, carroceria, conservar_id, now() as respaldado_en
from ranked where rn > 1;
alter table public._respaldo_modelos_duplicados enable row level security;
revoke all on public._respaldo_modelos_duplicados from anon, authenticated;
update public.anuncios a set modelo_id = r.conservar_id
from public._respaldo_modelos_duplicados r where a.modelo_id = r.id;
delete from public.modelos m using public._respaldo_modelos_duplicados r where m.id = r.id;
create unique index if not exists modelos_marca_nombre_unico on public.modelos (marca_id, lower(trim(nombre)));

-- Pour restaurer un modèle supprimé :
-- insert into public.modelos (id, marca_id, nombre, anio_inicio, anio_fin, carroceria)
-- select id, marca_id, nombre, anio_inicio, anio_fin, carroceria from public._respaldo_modelos_duplicados where id = '...';

-- 3. Les types de carrosserie étaient illisibles par le site (RLS sans policy)
drop policy if exists "Categorias visibles publiquement" on public.categorias;
create policy "Categorias visibles publiquement" on public.categorias for select using (true);
grant select on public.categorias to anon, authenticated;

-- 4. Événements ajoutés : Expo de autos clásicos en Boedo (29/11/2026 et 27/12/2026)
