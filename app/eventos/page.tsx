import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { primeraMayuscula } from "@/lib/sitio";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Eventos de autos clásicos",
  description: "Exposiciones, encuentros y rallies de autos clásicos y youngtimers en toda Argentina.",
};

const ZONA = "America/Argentina/Buenos_Aires";

function TarjetaEvento({ evento, pasado }: { evento: any; pasado?: boolean }) {
  const f = evento.fecha_evento ? new Date(evento.fecha_evento) : null;
  const fecha = f?.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: ZONA });
  const lugar = [evento.lugar, evento.ciudad, evento.provincia].filter(Boolean).join(" · ");
  return (
    <Link
      href={`/eventos/${evento.id}`}
      className={`group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all block ${pasado ? "opacity-60" : ""}`}
    >
      <div className="aspect-[16/9] overflow-hidden bg-white/5">
        {evento.foto_url ? (
          <img src={evento.foto_url} alt={evento.titulo || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#D4A847]/15 to-transparent">
            {f ? (
              <>
                <span className="text-5xl font-bold text-[#D4A847] leading-none">
                  {f.toLocaleDateString("es-AR", { day: "numeric", timeZone: ZONA })}
                </span>
                <span className="text-white/60 text-sm uppercase tracking-widest mt-2">
                  {f.toLocaleDateString("es-AR", { month: "long", timeZone: ZONA })}
                </span>
              </>
            ) : (
              <span className="text-white/30 text-sm">Fecha a confirmar</span>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        {fecha && <p className="text-[#D4A847] text-xs font-semibold mb-1">{primeraMayuscula(fecha)}</p>}
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{evento.titulo}</h3>
        {lugar && <p className="text-white/40 text-xs">{lugar}</p>}
        {evento.clubes && <p className="text-white/30 text-xs mt-1">Organiza: {(evento.clubes as any).nombre}</p>}
      </div>
    </Link>
  );
}

export default async function EventosPage() {
  const supabase = await createClient();

  const { data: eventos } = await supabase
    .from("eventos")
    .select(`
      id, titulo, descripcion, fecha_evento, lugar, ciudad, provincia, foto_url,
      clubes ( nombre )
    `)
    .order("fecha_evento", { ascending: true });

  // Desde el comienzo del día de hoy: un evento de hoy sigue apareciendo como próximo
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const proximos = (eventos ?? []).filter((e: any) => !e.fecha_evento || new Date(e.fecha_evento) >= hoy);
  const pasados = (eventos ?? []).filter((e: any) => e.fecha_evento && new Date(e.fecha_evento) < hoy).reverse();

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Eventos</h1>
            <p className="text-white/40 text-sm mt-1">Exposiciones, encuentros y rallies de clásicos en todo el país.</p>
          </div>
          <Link
            href="/eventos/nuevo"
            className="bg-[#D4A847] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#C49B35] transition-colors"
          >
            Publicar evento
          </Link>
        </div>

        {proximos.length === 0 && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 text-center mb-10">
            <p className="text-white/60 mb-2">No hay eventos próximos publicados.</p>
            <p className="text-white/40 text-sm">¿Organizás un encuentro? Publicalo gratis y aparecé en la agenda.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {proximos.map((evento: any) => (
            <TarjetaEvento key={evento.id} evento={evento} />
          ))}
        </div>

        {pasados.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-white/70 mt-14 mb-5">Eventos pasados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pasados.map((evento: any) => (
                <TarjetaEvento key={evento.id} evento={evento} pasado />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
