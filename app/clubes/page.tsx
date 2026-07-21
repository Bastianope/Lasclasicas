import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function ClubesPage() {
  const supabase = await createClient();

  const { data: clubes } = await supabase
    .from("clubes")
    .select("id, nombre, descripcion, ciudad, provincia, logo_url")
    .order("nombre");

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
          <h1 className="text-2xl font-bold text-white">Clubes</h1>
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
                  <div className="w-12 h-12 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold">
                    {club.nombre?.[0]?.toUpperCase()}
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