import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

type Anuncio = {
  id: string;
  anio: number;
  precio: number;
  moneda: string;
  descripcion: string;
  ciudad: string;
  provincia: string;
  marcas: { nombre: string } | null;
  modelos: { nombre: string } | null;
};

export default async function AnunciosPage() {
  const supabase = createClient();

  const { data: anuncios, error } = await supabase
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
      marcas ( nombre ),
      modelos ( nombre )
    `
    )
    .eq("estado", "activo")
    .order("created_at", { ascending: false });

  return (
    <main className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-8">
        Autos en Venta
      </h1>

      {error && (
        <p className="text-red-400">Error al cargar anuncios: {error.message}</p>
      )}

      {!error && (!anuncios || anuncios.length === 0) && (
        <p className="text-gray-400">No hay anuncios disponibles por el momento.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios?.map((anuncio: any) => (
          <div
            key={anuncio.id}
            className="bg-surface rounded-lg p-5 border border-gray-800 hover:border-accent transition"
          >
            <h2 className="text-xl font-semibold text-white mb-1">
              {anuncio.marcas?.nombre} {anuncio.modelos?.nombre}
            </h2>
            <p className="text-gray-400 text-sm mb-3">{anuncio.anio}</p>
            <p className="text-2xl font-bold text-accent mb-3">
              {anuncio.moneda} {Number(anuncio.precio).toLocaleString("es-AR")}
            </p>
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {anuncio.descripcion}
            </p>
            <p className="text-gray-500 text-xs">
              {anuncio.ciudad}, {anuncio.provincia}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
