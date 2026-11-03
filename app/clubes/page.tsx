import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { siglasClub } from "@/lib/sitio";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Clubes de autos clásicos",
  description: "Clubes de autos clásicos y youngtimers de Argentina: actividades, eventos y contacto.",
};

export default async function ClubesPage() {
  const supabase = await createClient();

  const { data: clubes } = await supabase
    .from("clubes")
    .select("id, nombre, descripcion, ciudad, provincia, logo_url")
    .order("nombre");

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Clubes</h1>
            <p className="text-white/40 text-sm mt-1">Los clubes de autos clásicos del país. ¿El tuyo no está? Creá su página gratis.</p>
          </div>
          <Link href="/clubes/nuevo"
            className="bg-[#D4A847] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#C49B35] transition-colors">
            Crear club
          </Link>
        </div>

        {(!clubes || clubes.length === 0) && (
          <p className="text-white/40">Todavía no hay clubes registrados.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubes?.map((club: any) => (
            <Link key={club.id} href={`/clubes/${club.id}`}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all block p-5">
              <div className="flex items-center gap-3 mb-3">
                {club.logo_url ? (
                  <img src={club.logo_url} alt={club.nombre} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold text-sm">
                    {siglasClub(club.nombre)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-white text-sm">{club.nombre}</h3>
                  <p className="text-white/40 text-xs">
                    {club.ciudad ? `${club.ciudad}, ` : ''}{club.provincia}
                  </p>
                </div>
              </div>
              {club.descripcion && (
                <p className="text-white/60 text-xs line-clamp-2">{club.descripcion}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}