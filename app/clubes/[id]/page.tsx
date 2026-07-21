import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function ClubDetallePage({ params }: Props) {
  const supabase = await createClient();

  const { data: club } = await supabase
    .from("clubes")
    .select("id, nombre, descripcion, ciudad, provincia, contacto, logo_url, sitio_web")
    .eq("id", params.id)
    .single();

  if (!club) notFound();

  const { data: eventos } = await supabase
    .from("eventos")
    .select("id, titulo, fecha_evento, lugar, foto_url")
    .eq("club_id", club.id)
    .order("fecha_evento", { ascending: true });

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <nav className="border-b border-white/10 bg-[#0F1117]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#D4A847]">Las Clásicas</Link>
          <Link href="/clubes" className="text-sm text-white/60 hover:text-white transition-colors">
            ← Volver a clubes
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8 flex items-center gap-4">
          {club.logo_url ? (
            <img src={club.logo_url} alt={club.nombre} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold text-2xl">
              {club.nombre?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-white">{club.nombre}</h1>
            <p className="text-white/40 text-sm">
              {club.ciudad ? `${club.ciudad}, ` : ''}{club.provincia}
            </p>
          </div>
        </div>

        {club.descripcion && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8">
            <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{club.descripcion}</p>
            {(club.contacto || club.sitio_web) && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-1 text-sm">
                {club.contacto && <p className="text-white/50">Contacto: {club.contacto}</p>}
                {club.sitio_web && (
                  <a href={club.sitio_web} target="_blank" rel="noopener noreferrer" className="text-[#D4A847] hover:underline block">
                    {club.sitio_web}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <h2 className="text-xl font-bold text-white mb-4">Eventos ({eventos?.length || 0})</h2>

        {(!eventos || eventos.length === 0) && (
          <p className="text-white/40">Este club no tiene eventos publicados.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eventos?.map((evento: any) => {
            const fecha = evento.fecha_evento
              ? new Date(evento.fecha_evento).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
              : null;
            return (
              <Link key={evento.id} href={`/eventos/${evento.id}`}
                className="bg-white/5 rounded-xl border border-white/10 hover:border-[#D4A847] transition-all p-4 block">
                {fecha && <p className="text-[#D4A847] text-xs font-semibold mb-1">{fecha}</p>}
                <p className="text-white text-sm font-medium">{evento.titulo}</p>
                {evento.lugar && <p className="text-white/40 text-xs mt-1">{evento.lugar}</p>}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}