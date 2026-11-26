import type { Metadata } from "next";
import Link from "next/link";
import { ETIQUETA_PROVINCIA, PROVINCIAS, slugProvincia } from "@/lib/ubicacion";

export const metadata: Metadata = {
  title: "Autos clásicos por provincia",
  description: "Autos clásicos en venta, encuentros, clubes y lugares para visitar en cada provincia argentina.",
  alternates: { canonical: "/autos-clasicos" },
};

export default function ProvinciasPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-3">Autos clásicos por provincia</h1>
        <p className="text-white/60 mb-8">Elegí tu provincia para ver los autos en venta, los próximos encuentros y los clubes de la zona.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {PROVINCIAS.map((p) => (
            <Link key={p} href={`/autos-clasicos/${slugProvincia(p)}`} className="bg-white/5 rounded-xl border border-white/10 hover:border-[#D4A847] px-4 py-3 text-sm text-white/80 transition-colors">
              {ETIQUETA_PROVINCIA[p] ?? p}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
