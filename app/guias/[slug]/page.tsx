import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Articulo from "@/components/Articulo";
import TarjetaAnuncio from "@/components/TarjetaAnuncio";
import { guiaPorSlug } from "@/lib/contenido";

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const guia = guiaPorSlug(params.slug);
  if (!guia) return { title: "Guía no encontrada", robots: { index: false } };
  return {
    title: guia.modelo ? `${guia.titulo}: historia, versiones y qué revisar` : guia.titulo,
    description: guia.descripcionSeo,
    alternates: { canonical: `/guias/${guia.slug}` },
    openGraph: { title: guia.titulo, description: guia.descripcionSeo, type: "article" },
  };
}

export default async function GuiaPage({ params }: Props) {
  const guia = guiaPorSlug(params.slug);
  if (!guia) notFound();

  // Anuncios en venta del modelo de la guía
  let anuncios: any[] = [];
  let marcaId: string | null = null;
  if (guia.modelo) {
    const supabase = createClient();
    const { data: marca } = await supabase.from("marcas").select("id").ilike("nombre", guia.modelo.marca).maybeSingle();
    marcaId = marca?.id ?? null;
    if (marcaId) {
      const { data: modelos } = await supabase
        .from("modelos")
        .select("id")
        .eq("marca_id", marcaId)
        .in("nombre", guia.modelo.modelos);
      const ids = (modelos ?? []).map((m) => m.id);
      if (ids.length > 0) {
        const { data } = await supabase
          .from("anuncios")
          .select(`
            id, titulo, anio, precio, moneda, ciudad, provincia,
            marcas ( nombre ), modelos ( nombre ),
            anuncio_imagenes ( url, es_principal, orden )
          `)
          .eq("estado", "activo")
          .in("modelo_id", ids)
          .order("created_at", { ascending: false })
          .limit(6);
        anuncios = data ?? [];
      }
    }
  }

  return (
    <Articulo articulo={guia} volver={{ href: "/guias", texto: "Todas las guías" }}>
      {guia.modelo && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-5">{guia.titulo} en venta</h2>
          {anuncios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {anuncios.map((a) => (
                <TarjetaAnuncio key={a.id} anuncio={a} />
              ))}
            </div>
          ) : (
            <p className="text-white/50">Por ahora no hay ningún {guia.titulo} publicado.</p>
          )}
          <div className="flex flex-wrap gap-3 mt-6">
            {marcaId && (
              <Link
                href={`/anuncios?marca=${marcaId}`}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-white/80 text-sm hover:border-[#D4A847] hover:text-[#D4A847] transition-colors"
              >
                Ver todos los {guia.modelo.marca} →
              </Link>
            )}
            <Link
              href="/anuncios/nuevo"
              className="px-5 py-2.5 rounded-xl bg-[#D4A847] text-black text-sm font-bold hover:bg-[#C49B35] transition-colors"
            >
              ¿Tenés un {guia.titulo}? Publicalo gratis
            </Link>
          </div>
        </section>
      )}
    </Articulo>
  );
}
