import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import FavoritoButton from "@/components/FavoritoButton";
import FiltroProvincia from "@/components/FiltroProvincia";
import { filtroUbicacion } from "@/lib/ubicacion";
import { tituloAnuncio } from "@/lib/sitio";
import {
  ANIO_FIN_CLASICOS,
  ANIO_FIN_YOUNGTIMERS,
  CATEGORIAS,
  esCategoriaSport,
  normalizarCategoria,
  type FilaCategoria,
} from "@/lib/categorias";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Autos clásicos en venta",
  description:
    "Ford Falcon, IKA Torino, Fiat 600, Peugeot 504 y más: clásicos y youngtimers en venta en toda Argentina, con contacto directo.",
};

type Filtros = {
  marca?: string;
  orden?: string;
  provincia?: string;
  categoria?: string;
};

export default async function AnunciosPage({
  searchParams,
}: {
  searchParams: Filtros;
}) {
  const supabase = createClient();
  const categoria = normalizarCategoria(searchParams.categoria);
  const provincia = searchParams.provincia?.trim() || undefined;

  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nombre")
    .order("nombre");

  // Sport & GT : anuncios cuya categoría elegida por el vendedor es deportiva.
  let idsSport: string[] = [];
  if (categoria === "sport") {
    const { data: filas } = await supabase.from("categorias").select("*");
    idsSport = ((filas ?? []) as FilaCategoria[]).filter(esCategoriaSport).map((f) => f.id);
  }

  let query = supabase
    .from("anuncios")
    .select(`
      id,
      anio,
      precio,
      moneda,
      descripcion,
      ciudad,
      provincia,
      marca_id,
      titulo,
      kilometraje,
      condicion,
      marcas ( nombre ),
      modelos ( nombre ),
      anuncio_imagenes ( url, es_principal, orden )
    `)
    .eq("estado", "activo");

  if (searchParams.marca) {
    query = query.eq("marca_id", searchParams.marca);
  }

  if (provincia) {
    const filtro = filtroUbicacion(provincia);
    if (filtro) query = query.or(filtro);
  }

  if (categoria === "clasico") {
    query = query.lt("anio", ANIO_FIN_CLASICOS);
  } else if (categoria === "youngtimer") {
    query = query.gte("anio", ANIO_FIN_CLASICOS).lte("anio", ANIO_FIN_YOUNGTIMERS);
  } else if (categoria === "sport" && idsSport.length > 0) {
    query = query.in("categoria_id", idsSport);
  }

  if (searchParams.orden === "precio_asc") {
    query = query.order("precio", { ascending: true });
  } else if (searchParams.orden === "precio_desc") {
    query = query.order("precio", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // Sin categoría deportiva en la base, el filtro Sport & GT no puede devolver nada.
  const sinCategoriaSport = categoria === "sport" && idsSport.length === 0;
  const { data: anuncios, error } = sinCategoriaSport
    ? { data: [] as any[], error: null }
    : await query;

  const actuales: Filtros = {
    marca: searchParams.marca,
    orden: searchParams.orden,
    provincia,
    categoria: categoria ?? undefined,
  };

  const buildHref = (cambios: Partial<Filtros>) => {
    const params = { ...actuales, ...cambios };
    const sp = new URLSearchParams();
    (Object.keys(params) as (keyof Filtros)[]).forEach((k) => {
      const v = params[k];
      if (v) sp.set(k, v);
    });
    const qs = sp.toString();
    return `/anuncios${qs ? `?${qs}` : ""}`;
  };

  const hayFiltros = !!(searchParams.marca || provincia || categoria);
  const chip = (activo: boolean) =>
    `px-4 py-2 rounded-full text-sm border transition ${
      activo
        ? "bg-accent text-background border-accent"
        : "border-gray-700 text-gray-300 hover:border-accent"
    }`;
  const chipChico = (activo: boolean) =>
    `px-3 py-1.5 rounded-full text-xs border transition ${
      activo
        ? "bg-accent text-background border-accent"
        : "border-gray-700 text-gray-300 hover:border-accent"
    }`;

  return (
    <main className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-6">
        Autos en Venta
      </h1>

      {/* Categorías */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Link href={buildHref({ categoria: undefined })} className={chip(!categoria)}>
          Todas las épocas
        </Link>
        {CATEGORIAS.map((c) => (
          <Link
            key={c.slug}
            href={buildHref({ categoria: c.slug })}
            className={chip(categoria === c.slug)}
            title={c.detalle}
          >
            {c.nombre}
          </Link>
        ))}
      </div>

      {/* Filtres par marque */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Link href={buildHref({ marca: undefined })} className={chip(!searchParams.marca)}>
          Todas las marcas
        </Link>
        {marcas?.map((marca) => (
          <Link
            key={marca.id}
            href={buildHref({ marca: marca.id })}
            className={chip(searchParams.marca === marca.id)}
          >
            {marca.nombre}
          </Link>
        ))}
      </div>

      {/* Ubicación + tri par prix */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
        <FiltroProvincia
          valor={provincia}
          otrosParametros={{
            marca: searchParams.marca,
            orden: searchParams.orden,
            categoria: categoria ?? undefined,
          }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-500 text-sm mr-2">Ordenar:</span>
          <Link href={buildHref({ orden: undefined })} className={chipChico(!searchParams.orden)}>
            Más recientes
          </Link>
          <Link
            href={buildHref({ orden: "precio_asc" })}
            className={chipChico(searchParams.orden === "precio_asc")}
          >
            Precio: menor a mayor
          </Link>
          <Link
            href={buildHref({ orden: "precio_desc" })}
            className={chipChico(searchParams.orden === "precio_desc")}
          >
            Precio: mayor a menor
          </Link>
        </div>
      </div>

      {error && (
        <p className="text-red-400">Error al cargar anuncios: {error.message}</p>
      )}

      {!error && anuncios && anuncios.length > 0 && (
        <p className="text-gray-500 text-sm mb-4">
          {anuncios.length} {anuncios.length === 1 ? "auto encontrado" : "autos encontrados"}
        </p>
      )}

      {!error && (!anuncios || anuncios.length === 0) && (
        <div className="text-gray-400">
          <p>No hay anuncios disponibles para este filtro.</p>
          {hayFiltros && (
            <Link href="/anuncios" className="inline-block mt-3 text-accent hover:underline text-sm">
              Ver todos los anuncios →
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios?.map((anuncio: any) => (
          <div key={anuncio.id} className="relative">
            <Link
              href={`/anuncios/${anuncio.id}`}
              className="bg-surface rounded-xl overflow-hidden border border-gray-800 hover:border-accent transition group cursor-pointer block"
            >
              {(anuncio.anuncio_imagenes as any[])?.[0]?.url ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={(anuncio.anuncio_imagenes as any[]).find((i: any) => i.es_principal)?.url || (anuncio.anuncio_imagenes as any[])[0].url}
                    alt={anuncio.titulo || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Sin fotos todavía</span>
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-white">
                    {tituloAnuncio({ ...anuncio, anio: null })}
                  </h2>
                  <span className="text-gray-400 text-sm">{anuncio.anio}</span>
                </div>

                <p className="text-2xl font-bold text-accent mb-3">
                  {anuncio.moneda} {Number(anuncio.precio).toLocaleString("es-AR")}
                </p>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {anuncio.descripcion}
                </p>

                <div className="flex items-center text-gray-500 text-xs">
                  <span>{[anuncio.ciudad, anuncio.provincia].filter(Boolean).join(", ")}</span>
                </div>
              </div>
            </Link>
            <div className="absolute top-3 right-3">
              <FavoritoButton anuncioId={anuncio.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
