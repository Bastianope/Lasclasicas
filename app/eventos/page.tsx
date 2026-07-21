import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function EventosPage() {
  const supabase = await createClient();

  const { data: eventos } = await supabase
    .from("eventos")
    .select(`
      id, titulo, descripcion, fecha_evento, lugar, ciudad, provincia, foto_url,
      clubes ( nombre )
    `)
    .order("fecha_evento", { ascending: true });

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Eventos</h1>
          <Link href="/eventos/nuevo"
            className="bg-[#D4A847] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#C49B35] transition-colors">
            Publicar evento
          </Link>
        </div>

        {(!eventos || eventos.length === 0) && (
          <p className="text-white/40">Todavía no hay eventos publicados.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eventos?.map((evento: any) => {
            const fecha = evento.fecha_evento
              ? new Date(evento.fecha_evento).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
              : null;
            return (
              <Link key={evento.id} href={`/eventos/${evento.id}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all block">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  {evento.foto_url ? (
                    <img src={evento.foto_url} alt={evento.titulo || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl">📅</div>
                  )}
                </div>
                <div className="p-4">
                  {fecha && <p className="text-[#D4A847] text-xs font-semibold mb-1">{fecha}</p>}
                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{evento.titulo}</h3>
                  <p className="text-white/40 text-xs">
                    {evento.ciudad ? `${evento.ciudad}, ` : ''}{evento.provincia}
                  </p>
                  {evento.clubes && (
                    <p className="text-white/30 text-xs mt-1">Organiza: {(evento.clubes as any).nombre}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}