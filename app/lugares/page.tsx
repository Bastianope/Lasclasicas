import type { Metadata } from "next";
import Link from "next/link";
import TarjetaArticulo from "@/components/TarjetaArticulo";
import { LUGARES } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Lugares míticos del automovilismo argentino",
  description: "Circuitos, rutas y lugares con historia para los amantes de los autos clásicos en Argentina.",
};

export default function LugaresPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-[#D4A847] text-xs font-bold tracking-widest uppercase mb-3">Rutas y circuitos</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Lugares míticos</h1>
        <p className="text-white/50 max-w-2xl mb-10">
          Circuitos, rutas y rincones de la Argentina donde se escribió la historia de los autos que hoy son clásicos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LUGARES.map((l) => (
            <TarjetaArticulo key={l.slug} articulo={l} href={`/lugares/${l.slug}`} destacada />
          ))}
        </div>
        <p className="text-white/40 text-sm mt-10">
          Más lugares en camino. Mientras tanto, mirá la <Link href="/eventos" className="text-[#D4A847] hover:underline">agenda de eventos</Link>.
        </p>
      </div>
    </main>
  );
}
