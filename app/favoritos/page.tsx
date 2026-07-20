import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FavoritoButton from "@/components/FavoritoButton";

export const revalidate = 0;

export default async function FavoritosPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: favoritos } = await supabase
    .from("favoritos")
    .select(`
      id,
      anuncio_id,
      anuncios (
        id, titulo, anio, precio, moneda, provincia,
        marcas ( nombre ),
        modelos ( nombre ),
        anuncio_imagenes ( url, es_principal )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

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
        <h1 className="text-2xl font-bold text-white mb-8">Mis favoritos</h1>

        {(!favoritos || favoritos.length === 0) && (
          <p className="text-white/40">Todavía no agregaste ningún anuncio a favoritos.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoritos?.map((fav: any) => {
            const anuncio = fav.anuncios;
            if (!anuncio) return null;
            const imgs = anuncio.anuncio_imagenes || [];
            const img = imgs.find((i: any) => i.es_principal) || imgs[0];
            return (
              <div key={fav.id} className="relative">
                <Link href={`/anuncios/${anuncio.id}`}
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
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#D4A847]">{anuncio.moneda} {Number(anuncio.precio).toLocaleString('es-AR')}</span>
                      <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">{anuncio.provincia}</span>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-3 right-3">
                  <FavoritoButton anuncioId={anuncio.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}