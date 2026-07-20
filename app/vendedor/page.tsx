import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function VendedorPage({ params }: Props) {
  const supabase = await createClient();

  const { data: vendedor } = await supabase
    .from("profiles")
    .select("id, nombre, ciudad, provincia, created_at")
    .eq("id", params.id)
    .single();

  if (!vendedor) notFound();

  const { data: anuncios } = await supabase
    .from("anuncios")
    .select(`
      id, titulo, anio, precio, moneda, provincia,
      marcas ( nombre ),
      modelos ( nombre ),
      anuncio_imagenes ( url, es_principal )
    `)
    .eq("vendedor_id", vendedor.id)
    .eq("estado", "activo")
    .order("created_at", { ascending: false });

  const miembroDesde = vendedor.created_at
    ? new Date(vendedor.created_at).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' })
    : null;

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <nav className="border-b border-white/10 bg-[#0F1117]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#D4A847]">Las Clásicas</Link>
          <Link href="/anuncios" className="text-sm text-white/60 hover:text-white transition-colors">
            ← Volver a anuncios
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold text-2xl">
            {vendedor.nombre?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{vendedor.nombre || 'Vendedor'}</h1>
            <p className="text-white/40 text-sm">
              {vendedor.ciudad ? `${vendedor.ciudad}, ` : ''}{vendedor.provincia}
            </p>
            {miembroDesde && (
              <p className="text-white/30 text-xs mt-1">Miembro desde {miembroDesde}</p>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">
          Anuncios de {vendedor.nombre || 'este vendedor'} ({anuncios?.length || 0})
        </h2>

        {(!anuncios || anuncios.length === 0) && (
          <p className="text-white/40">Este vendedor no tiene anuncios activos.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {anuncios?.map((anuncio: any) => {
            const imgs = anuncio.anuncio_imagenes || [];
            const img = imgs.find((i: any) => i.es_principal) || imgs[0];
            return (
              <Link key={anuncio.id} href={`/anuncios/${anuncio.id}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all block">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  {img ? (
                    <img src={img.url} alt={anuncio.titulo || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl">🚗</div>
                  )}
                </div>
<div className="p-4">
  <p className="text-white/40 text-xs mb-1">{anuncio.marcas?.nombre} · {anuncio.anio}</p>
  <h3 className="font-semibold text-white text-sm mb-3 line-clamp-2">
    {anuncio.titulo || `${anuncio.marcas?.nombre} ${anuncio.modelos?.nombre}`}
  </h3>
  <span className="font-bold text-[#D4A847]">{anuncio.moneda} {Number(anuncio.precio).toLocaleString('es-AR')}</span>
</div>
        </Link>
        );
      })}
        </div>
      </div>
    </main>
  );
}