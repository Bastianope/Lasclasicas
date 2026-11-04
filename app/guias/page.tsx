import type { Metadata } from "next";
import TarjetaArticulo from "@/components/TarjetaArticulo";
import { GUIAS, LUGARES } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Guías de autos clásicos argentinos",
  description:
    "Historia, versiones y qué revisar antes de comprar un Ford Falcon, un IKA Torino o un Fiat 600. Y cómo asegurar un auto clásico en Argentina.",
};

export default function GuiasPage() {
  const modelos = GUIAS.filter((g) => g.modelo);
  const practicas = GUIAS.filter((g) => !g.modelo);

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-[#D4A847] text-xs font-bold tracking-widest uppercase mb-3">Historia sobre ruedas</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Guías</h1>
        <p className="text-white/50 max-w-2xl mb-10">
          La historia de los clásicos argentinos, sus versiones y qué mirar antes de comprar uno.
        </p>

        <h2 className="text-lg font-semibold text-white/80 mb-4">Modelos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {modelos.map((g) => (
            <TarjetaArticulo key={g.slug} articulo={g} href={`/guias/${g.slug}`} />
          ))}
        </div>

        <h2 className="text-lg font-semibold text-white/80 mb-4">Para tener en cuenta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {practicas.map((g) => (
            <TarjetaArticulo key={g.slug} articulo={g} href={`/guias/${g.slug}`} />
          ))}
          {LUGARES.map((l) => (
            <TarjetaArticulo key={l.slug} articulo={l} href={`/lugares/${l.slug}`} destacada />
          ))}
        </div>
      </div>
    </main>
  );
}
