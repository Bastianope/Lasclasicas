import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditarPerfilForm from "@/components/EditarPerfilForm";

export const revalidate = 0;

export default async function PerfilPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: perfil } = await supabase
    .from("profiles")
    .select("id, nombre, telefono, ciudad, provincia")
    .eq("id", user.id)
    .single();

  const { data: misAnuncios } = await supabase
    .from("anuncios")
    .select(`
      id, titulo, anio, precio, moneda, provincia, estado,
      marcas ( nombre ),
      modelos ( nombre ),
      anuncio_imagenes ( url, es_principal )
    `)
    .eq("vendedor_id", user.id)
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 h-fit">
            <h1 className="text-xl font-bold text-white mb-6">Mi perfil</h1>
            {perfil && <EditarPerfilForm perfil={perfil} />}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6">Mis anuncios</h2>

            {(!misAnuncios || misAnuncios.length === 0) && (
              <p className="text-white/40">Todavía no publicaste ningún anuncio.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {misAnuncios?.map((anuncio: any) => {
                const imgs = anuncio.anuncio_imagenes || [];
                const img = imgs.find((i: any) => i.es_principal) || imgs[0];
                return (
                  <Link key={anuncio.id} href={`/anuncios/${anuncio.id}`}
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all block">
                    <div className="aspect-[4/3] overflow-hidden bg-white/5 relative">
                      {img ? (
                        <img src={img.url} alt={anuncio.titulo || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl">🚗</div>
                      )}
                      <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${
                        anuncio.estado === "activo" ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/50"
                      }`}>
                        {anuncio.estado === "activo" ? "Activo" : anuncio.estado}
                      </span>
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

        </div>
      </div>
    </main>
  );
}