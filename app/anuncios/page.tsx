import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function AnunciosPage({
  searchParams,
}: {
  searchParams: { marca?: string };
}) {
  const supabase = createClient();

  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nombre")
    .order("nombre");

  let query = supabase
    .from("anuncios")
    .select(
      `
      id,
      anio,
      precio,
      moneda,
      descripcion,
      ciudad,
      provincia,
      marca_id,
      marcas ( nombre ),
      modelos ( nombre )
    `
    )
    .eq("estado", "activo")
    .order("created_at", { ascending: false });

  if (searchParams.marca) {
    query = query.eq("marca_id", searchParams.marca);
  }

  const { data: anuncios, error } = await query;

  return (
    <main className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-6">
        Autos en Venta
      </h1>

      {/* Filtres par marque */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/anuncios"
          className={`px-4 py-2 rounded-full text-sm border transition ${
            !searchParams.marca
              ? "bg-accent text-background border-accent"
              : "border-gray-700 text-gray-300 hover:border-accent"
          }`}
        >
          Todas
        </Link>
        {marcas?.map((marca) => (
          <Link
            key={marca.id}
            href={`/anuncios?marca=${marca.id}`}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              searchParams.marca === marca.id
                ? "bg-accent text-background border-accent"
                : "border-gray-700 text-gray-300 hover:border-accent"
            }`}
          >
            {marca.nombre}
          </Link>
        ))}
      </div>

      {error && (
        <p className="text-red-400">Error al cargar anuncios: {error.message}</p>
      )}

      {!error && (!anuncios || anuncios.length === 0) && (
        <p className="text-gray-400">No hay anuncios disponibles para este filtro.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios?.map((anuncio: any) => (
          <div
            key={anuncio.id}
            className="bg-surface rounded-xl overflow-hidden border border-gray-800 hover:border-accent transition group cursor-pointer"
          >
            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Sin foto disponible</span>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-white">
                  {anuncio.marcas?.nombre} {anuncio.modelos?.nombre}
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
                <span>{anuncio.ciudad}, {anuncio.provincia}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
