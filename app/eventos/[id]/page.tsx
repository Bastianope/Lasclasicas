import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { nombreVisible, primeraMayuscula } from "@/lib/sitio";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("eventos")
    .select("titulo, descripcion, fecha_evento, ciudad, provincia, foto_url")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) return { title: "Evento no disponible", robots: { index: false } };
  const fecha = data.fecha_evento
    ? new Date(data.fecha_evento).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Argentina/Buenos_Aires" })
    : null;
  const lugar = [data.ciudad, data.provincia].filter(Boolean).join(", ");
  const descripcion = [fecha, lugar].filter(Boolean).join(" · ") + (data.descripcion ? ` — ${data.descripcion.slice(0, 140)}` : "");
  return {
    title: data.titulo,
    description: descripcion,
    openGraph: { title: data.titulo, description: descripcion, images: [data.foto_url || "/og.jpg"] },
  };
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
    .maybeSingle();

  if (!evento) notFound();

  const fecha = evento.fecha_evento
    ? new Date(evento.fecha_evento).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' })
    : null;
  const publicadoPor = nombreVisible((evento.profiles as any)?.nombre);

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/eventos" className="inline-block mb-6 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
          ← Volver a eventos
        </Link>
        {evento.foto_url && (
          <div className="aspect-[16/9] bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-6">
            <img src={evento.foto_url} alt={evento.titulo || ''} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-white">{evento.titulo}</h1>

          <div className="flex flex-wrap gap-2">
            {fecha && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                📅 {primeraMayuscula(fecha)}
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

          {publicadoPor && (
            <p className="text-white/40 text-xs">
              Publicado por {publicadoPor}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}