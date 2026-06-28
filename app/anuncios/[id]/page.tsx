import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AnuncioDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: anuncio, error } = await supabase
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
    .eq("id", params.id)
    .single();

  if (error || !anuncio) {
    notFound();
  }

  return (
    <main className="px-4 py-12 max-w-4xl mx-auto">
      <Link
        href="/anuncios"
        className="text-gray-400 hover:text-accent text-sm mb-6 inline-block"
      >
        ← Volver a Anuncios
      </Link>

      <div className="bg-surface rounded-xl overflow-hidden border border-gray-800">
        <div className="h-72 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <span className="text-gray-600">Sin foto disponible</span>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-white">
              {anuncio.marcas?.nombre} {anuncio.modelos?.nombre}
            </h1>
            <span className="text-gray-400 text-lg">{anuncio.anio}</span>
          </div>

          <p className="text-3xl font-bold text-accent mb-6">
            {anuncio.moneda} {Number(anuncio.precio).toLocaleString("es-AR")}
          </p>

          <h2 className="text-lg font-semibold text-white mb-2">Descripción</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {anuncio.descripcion}
          </p>

          <div className="flex items-center text-gray-400 text-sm border-t border-gray-800 pt-4">
            <span>📍 {anuncio.ciudad}, {anuncio.provincia}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
