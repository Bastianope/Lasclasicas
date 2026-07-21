import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function EventoDetallePage({ params }: Props) {
  const supabase = await createClient();

  const { data: evento } = await supabase
    .from("eventos")
    .select(`
      id, titulo, descripcion, fecha_evento, lugar, ciudad, provincia, foto_url, organizador_id,
      clubes ( id, nombre ),
      profiles ( nombre )
    `)
    .eq("id", params.id)
    .single();

  if (!evento) notFound();

  const fecha = evento.fecha_evento
    ? new Date(evento.fecha_evento).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <nav className="border-b border-white/10 bg-[#0F1117]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#D4A847]">Las Clásicas</Link>
          <Link href="/eventos" className="text-sm text-white/60 hover:text-white transition-colors">
            ← Volver a eventos
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="aspect-[16/9] bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-6">
          {evento.foto_url ? (
            <img src={evento.foto_url} alt={evento.titulo || ''} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">📅</div>
          )}
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-white">{evento.titulo}</h1>

          <div className="flex flex-wrap gap-2">
            {fecha && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium capitalize">
                📅 {fecha}
              </span>
            )}
            {evento.lugar && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                📍 {evento.lugar}
              </span>
            )}
            {evento.provincia && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                {evento.ciudad ? `${evento.ciudad}, ` : ''}{evento.provincia}
              </span>
            )}
          </div>

          {evento.descripcion && (
            <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm">
              {evento.descripcion}
            </p>
          )}

          {(evento.clubes as any) && (
            <Link href={`/clubes/${(evento.clubes as any).id}`}
              className="inline-block text-[#D4A847] text-sm hover:underline">
              Organiza: {(evento.clubes as any).nombre} →
            </Link>
          )}

          {(evento.profiles as any) && (
            <p className="text-white/40 text-xs">
              Publicado por {(evento.profiles as any).nombre}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}