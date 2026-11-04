import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siglasClub } from "@/lib/sitio";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

// "https://www.instagram.com/club/" -> "Instagram @club" ; otro sitio -> su dominio
function etiquetaEnlace(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "instagram.com") {
      const usuario = u.pathname.split("/").filter(Boolean)[0];
      return usuario ? `Instagram @${usuario}` : "Instagram";
    }
    if (host === "facebook.com") return "Facebook";
    return host;
  } catch {
    return url;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("clubes")
    .select("nombre, descripcion, ciudad, provincia, logo_url")
    .eq("id", params.id)
    .maybeSingle();
  if (!data) return { title: "Club no disponible", robots: { index: false } };
  const lugar = [data.ciudad, data.provincia].filter(Boolean).join(", ");
  const descripcion = data.descripcion?.slice(0, 160) || `Club de autos clásicos${lugar ? ` en ${lugar}` : ""}.`;
  return {
    title: data.nombre,
    description: descripcion,
    openGraph: { title: data.nombre, description: descripcion, images: [data.logo_url || "/og.jpg"] },
  };
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/clubes" className="inline-block mb-6 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
          ← Volver a clubes
        </Link>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-8 flex items-center gap-4">
          {club.logo_url ? (
            <img src={club.logo_url} alt={club.nombre} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 shrink-0 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold text-lg">
              {siglasClub(club.nombre)}
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
                    {etiquetaEnlace(club.sitio_web)} →
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
              ? new Date(evento.fecha_evento).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' })
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