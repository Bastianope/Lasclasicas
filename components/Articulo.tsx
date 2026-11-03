import Link from "next/link";
import type { Articulo as TipoArticulo } from "@/lib/contenido";

// Plantilla de los artículos editoriales (guías y lugares).
export default function Articulo({
  articulo,
  volver,
  children,
}: {
  articulo: TipoArticulo;
  volver: { href: string; texto: string };
  children?: React.ReactNode;
}) {
  const { mapa } = articulo;

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      {/* Encabezado */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#D4A847]/10 to-transparent">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
          <Link href={volver.href} className="inline-block mb-8 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
            ← {volver.texto}
          </Link>
          <p className="text-[#D4A847] text-xs font-bold tracking-widest uppercase mb-3">{articulo.kicker}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">{articulo.titulo}</h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl">{articulo.resumen}</p>

          {articulo.cifras && articulo.cifras.length > 0 && (
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {articulo.cifras.map((c) => (
                <div key={c.etiqueta} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <dt className="sr-only">{c.etiqueta}</dt>
                  <dd className="text-xl md:text-2xl font-bold text-[#D4A847] leading-tight">{c.valor}</dd>
                  <dd className="text-white/50 text-xs mt-1">{c.etiqueta}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {articulo.secciones.map((s) => (
          <section key={s.titulo}>
            <h2 className="text-2xl font-bold text-white mb-5">{s.titulo}</h2>

            {s.tipo === "texto" &&
              s.parrafos.map((p, i) => (
                <p key={i} className="text-white/75 leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}

            {s.tipo === "lista" && (
              <ul className="space-y-3">
                {s.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/75 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#D4A847]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {s.tipo === "linea" && (
              <ol className="relative border-l border-[#D4A847]/30 ml-2 space-y-7">
                {s.hitos.map((h) => (
                  <li key={h.anio} className="pl-6 relative">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#D4A847]" aria-hidden="true" />
                    <p className="text-[#D4A847] font-bold text-sm mb-1">{h.anio}</p>
                    <p className="text-white/75 leading-relaxed">{h.texto}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        {mapa && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-5">Mapa</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-white/5">
              <iframe
                title={`Mapa de ${articulo.titulo}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapa.lon - mapa.delta},${mapa.lat - mapa.delta},${mapa.lon + mapa.delta},${mapa.lat + mapa.delta}&layer=mapnik&marker=${mapa.lat},${mapa.lon}`}
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${mapa.lat}&mlon=${mapa.lon}#map=13/${mapa.lat}/${mapa.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-[#D4A847] hover:underline"
            >
              Ver el mapa completo →
            </a>
          </section>
        )}

        {children}

        {articulo.aviso && (
          <p className="text-white/50 text-sm bg-white/5 border border-white/10 rounded-xl p-4">{articulo.aviso}</p>
        )}

        <section className="border-t border-white/10 pt-6">
          <h2 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Fuentes</h2>
          <ul className="space-y-1.5">
            {articulo.fuentes.map((f) => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#D4A847] transition-colors">
                  {f.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
