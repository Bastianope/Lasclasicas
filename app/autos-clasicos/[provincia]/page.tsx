import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TarjetaAnuncio from "@/components/TarjetaAnuncio";
import { GUIAS, LUGARES } from "@/lib/contenido";
import { primeraMayuscula } from "@/lib/sitio";
import { PROVINCIAS, filtroUbicacion, nombreProvincia, provinciaPorSlug, slugProvincia } from "@/lib/ubicacion";

export const revalidate = 3600;

const ZONA = "America/Argentina/Buenos_Aires";

// Guías de los modelos nacionales más buscados, para todas las provincias.
const GUIAS_DESTACADAS = ["ford-falcon", "ika-torino", "fiat-600", "peugeot-504", "renault-12", "peugeot-306"];

export function generateStaticParams() {
  return PROVINCIAS.map((p) => ({ provincia: slugProvincia(p) }));
}

async function cargarDatos(provincia: string) {
  const supabase = createClient();
  const filtro = filtroUbicacion(provincia)!;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const [{ data: anuncios }, { data: eventos }, { data: clubes }] = await Promise.all([
    supabase
      .from("anuncios")
      .select(`id, anio, precio, moneda, ciudad, provincia, titulo, marcas ( nombre ), modelos ( nombre ), anuncio_imagenes ( url, es_principal, orden )`)
      .eq("estado", "activo")
      .or(filtro)
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("eventos")
      .select("id, titulo, fecha_evento, lugar, ciudad, provincia, tipo")
      .or(filtro)
      .gte("fecha_evento", hoy.toISOString())
      .order("fecha_evento", { ascending: true }),
    supabase.from("clubes").select("id, nombre, ciudad, provincia").or(filtro).order("nombre"),
  ]);
  const lugares = LUGARES.filter((l) => l.provincia && filtroCoincide(l.provincia, provincia));
  return { anuncios: anuncios ?? [], eventos: eventos ?? [], clubes: clubes ?? [], lugares };
}

// "Buenos Aires" incluye la capital, como en el filtro de anuncios.
function filtroCoincide(valor: string, provincia: string) {
  if (provincia === "Buenos Aires") return valor === "Buenos Aires" || valor === "CABA";
  return valor === provincia;
}

export async function generateMetadata({ params }: { params: { provincia: string } }): Promise<Metadata> {
  const provincia = provinciaPorSlug(params.provincia);
  if (!provincia) return { title: "Provincia no encontrada", robots: { index: false } };
  const nombre = nombreProvincia(provincia);
  const { anuncios, eventos, clubes, lugares } = await cargarDatos(provincia);
  // Sin ningún contenido propio la página sería un duplicado: no se indexa.
  const vacia = anuncios.length + eventos.length + clubes.length + lugares.length === 0;
  return {
    title: `Autos clásicos en ${nombre}: en venta, encuentros y clubes`,
    description: `Autos clásicos y youngtimers en venta en ${nombre}, próximos encuentros y exposiciones, clubes y lugares para visitar con tu clásico.`,
    alternates: { canonical: `/autos-clasicos/${params.provincia}` },
    ...(vacia ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProvinciaPage({ params }: { params: { provincia: string } }) {
  const provincia = provinciaPorSlug(params.provincia);
  if (!provincia) notFound();
  const nombre = nombreProvincia(provincia);
  const { anuncios, eventos, clubes, lugares } = await cargarDatos(provincia);
  const guias = GUIAS_DESTACADAS.map((s) => GUIAS.find((g) => g.slug === s)).filter(Boolean) as typeof GUIAS;

  const titulo = (texto: string, id: string) => (
    <h2 id={id} className="text-xl font-bold text-white mt-12 mb-5 scroll-mt-24">{texto}</h2>
  );

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-white/40 mb-6">
          <Link href="/autos-clasicos" className="hover:text-[#D4A847]">Provincias</Link> › <span className="text-white/60">{provincia}</span>
        </nav>
        <h1 className="text-3xl font-bold text-white mb-3">Autos clásicos en {nombre}</h1>
        <p className="text-white/60 max-w-3xl">
          Todo lo de Las Clásicas en {nombre}
          {provincia === "Buenos Aires" ? ", incluida la Ciudad de Buenos Aires" : ""}: clásicos y youngtimers en venta con
          contacto directo con el vendedor, los próximos encuentros y exposiciones, los clubes de la zona y lugares para
          visitar con tu auto.
        </p>

        {titulo(`Autos en venta en ${nombre}`, "anuncios")}
        {anuncios.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {anuncios.map((a: any) => <TarjetaAnuncio key={a.id} anuncio={a} />)}
            </div>
            <Link href={`/anuncios?provincia=${encodeURIComponent(provincia)}`} className="inline-block mt-5 text-[#D4A847] text-sm hover:underline">
              Ver todos los autos en venta en {nombre} →
            </Link>
          </>
        ) : (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <p className="text-white/70">Todavía no hay autos publicados en {nombre}.</p>
            <p className="text-white/40 text-sm mt-1">¿Tenés un clásico para vender? Publicarlo es gratis y lo ven compradores de todo el país.</p>
            <Link href="/anuncios/nuevo" className="inline-block mt-4 bg-[#D4A847] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#C49B35]">
              Publicar mi auto
            </Link>
          </div>
        )}

        {titulo(`Próximos encuentros en ${nombre}`, "eventos")}
        {eventos.length > 0 ? (
          <ul className="space-y-3">
            {eventos.map((e: any) => {
              const fecha = new Date(e.fecha_evento).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: ZONA });
              return (
                <li key={e.id}>
                  <Link href={`/eventos/${e.id}`} className="block bg-white/5 rounded-xl border border-white/10 hover:border-[#D4A847] p-4 transition-colors">
                    <p className="text-[#D4A847] text-xs font-semibold">{primeraMayuscula(fecha)}</p>
                    <p className="font-semibold text-white">
                      {e.tipo === "subasta" && <span className="mr-2 px-1.5 py-0.5 rounded bg-[#D4A847] text-black text-[10px] font-bold uppercase align-middle">Subasta</span>}
                      {e.titulo}
                    </p>
                    <p className="text-white/40 text-xs">{[e.lugar, e.ciudad].filter(Boolean).join(" · ")}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-white/50 text-sm">
            No hay encuentros publicados por ahora en {nombre}. Mirá la <Link href="/eventos" className="text-[#D4A847] hover:underline">agenda de todo el país</Link> o{" "}
            <Link href="/eventos/nuevo" className="text-[#D4A847] hover:underline">publicá el tuyo</Link>.
          </p>
        )}

        {clubes.length > 0 && (
          <>
            {titulo(`Clubes en ${nombre}`, "clubes")}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubes.map((c: any) => (
                <Link key={c.id} href={`/clubes/${c.id}`} className="bg-white/5 rounded-xl border border-white/10 hover:border-[#D4A847] p-4 transition-colors">
                  <p className="font-semibold text-white">{c.nombre}</p>
                  {c.ciudad && <p className="text-white/40 text-xs">{c.ciudad}</p>}
                </Link>
              ))}
            </div>
          </>
        )}

        {lugares.length > 0 && (
          <>
            {titulo(`Para visitar en ${nombre}`, "lugares")}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lugares.map((l) => (
                <Link key={l.slug} href={`/lugares/${l.slug}`} className="bg-white/5 rounded-xl border border-white/10 hover:border-[#D4A847] p-4 transition-colors">
                  <p className="font-semibold text-white">{l.titulo}</p>
                  <p className="text-white/50 text-sm line-clamp-2">{l.resumen}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        {titulo("Guías de compra", "guias")}
        <div className="flex flex-wrap gap-2">
          {guias.map((g) => (
            <Link key={g.slug} href={`/guias/${g.slug}`} className="px-4 py-2 rounded-full border border-white/15 text-white/70 text-sm hover:border-[#D4A847]">
              {g.titulo}
            </Link>
          ))}
          <Link href="/guias" className="px-4 py-2 rounded-full text-[#D4A847] text-sm hover:underline">Todas las guías →</Link>
        </div>
      </div>
    </main>
  );
}
