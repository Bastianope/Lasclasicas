import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();

  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nombre")
    .order("nombre");

  const { data: anuncios } = await supabase
    .from("anuncios")
    .select(`
      id, titulo, anio, precio, moneda, provincia,
      marcas ( nombre ),
      modelos ( nombre ),
      anuncio_imagenes ( url, es_principal, orden )
    `)
    .eq("estado", "activo")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">

      <nav className="border-b border-white/10 bg-[#0F1117]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#D4A847]">Las Clásicas</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="/anuncios" className="hover:text-white transition-colors">Anuncios</Link>
            <Link href="/anuncios/nuevo" className="bg-[#D4A847] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#C49B35] transition-colors">
              Publicar anuncio
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden h-[85vh] min-h-[600px]">
        <div className="absolute inset-0">
          <img src="/hero.jpg" alt="Las Clásicas" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <p className="text-[#D4A847] text-xs font-bold tracking-widest uppercase mb-4">
              El marketplace de clásicos y youngtimers
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-2xl">
              Encontrá tu<br /><span className="text-[#D4A847]">clásico ideal</span>
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-lg">
              Ford Falcon, IKA Torino, Peugeot 504, BMW E30 — los mejores autos con historia de Argentina.
            </p>
            <form action="/anuncios" method="GET" className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <select name="marca" className="flex-1 px-4 py-3 rounded-xl bg-black/40 backdrop-blur border border-white/20 text-white text-sm outline-none">
                <option value="">Todas las marcas</option>
                {marcas?.map(m => (<option key={m.id} value={m.id}>{m.nombre}</option>))}
              </select>
              <button type="submit" className="bg-[#D4A847] text-black px-8 py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors whitespace-nowrap">
                Buscar
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mt-5">
              {['Ford Falcon','IKA Torino','Peugeot 504','BMW E30','Fiat 600'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/20 text-white/50 text-xs">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap gap-8 justify-center">
          {[
            { label: 'Anuncios activos', value: `+${anuncios?.length || 0}` },
            { label: 'Marcas disponibles', value: `${marcas?.length || 0}` },
            { label: 'Provincias', value: '24' },
            { label: 'Contacto directo WhatsApp', value: '100%' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#D4A847]">{stat.value}</p>
              <p className="text-white/40 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Últimos anuncios</h2>
          <Link href="/anuncios" className="text-sm text-[#D4A847] hover:underline font-medium">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {anuncios?.map((anuncio: any) => {
            const imgs = anuncio.anuncio_imagenes || []
            const img = imgs.find((i: any) => i.es_principal) || imgs[0]
            return (
              <Link key={anuncio.id} href={`/anuncios/${anuncio.id}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  {img ? (
                    <img src={img.url} alt={anuncio.titulo || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl">🚗</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-white/40 text-xs mb-1">{(anuncio.marcas as any)?.nombre} · {anuncio.anio}</p>
                  <h3 className="font-semibold text-white text-sm mb-3 line-clamp-2">
                    {anuncio.titulo || `${(anuncio.marcas as any)?.nombre} ${(anuncio.modelos as any)?.nombre}`}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#D4A847]">{anuncio.moneda} {Number(anuncio.precio).toLocaleString('es-AR')}</span>
                    <span className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">{anuncio.provincia}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-[#D4A847]/20 to-transparent border border-[#D4A847]/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">¿Querés vender tu clásico?</h2>
            <p className="text-white/50">Publicá gratis y conectá directo con compradores por WhatsApp.</p>
          </div>
          <Link href="/anuncios/nuevo" className="shrink-0 bg-[#D4A847] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#C49B35] transition-colors">
            Publicar gratis
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 py-10 flex justify-between text-white/30 text-sm">
          <div>
            <p className="text-white font-bold text-lg mb-1">Las <span className="text-[#D4A847]">Clásicas</span></p>
            <p>El marketplace de youngtimers en Argentina.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/anuncios" className="hover:text-white transition-colors">Anuncios</Link>
            <Link href="/anuncios/nuevo" className="hover:text-white transition-colors">Publicar</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}