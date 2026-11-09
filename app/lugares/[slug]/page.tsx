import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Articulo from "@/components/Articulo";
import { LUGARES, lugarPorSlug } from "@/lib/contenido";

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LUGARES.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lugar = lugarPorSlug(params.slug);
  if (!lugar) return { title: "Lugar no encontrado", robots: { index: false } };
  return {
    title: lugar.titulo,
    description: lugar.descripcionSeo,
    alternates: { canonical: `/lugares/${lugar.slug}` },
    openGraph: { title: lugar.titulo, description: lugar.descripcionSeo, type: "article" },
  };
}

export default function LugarPage({ params }: Props) {
  const lugar = lugarPorSlug(params.slug);
  if (!lugar) notFound();

  return (
    <Articulo articulo={lugar} volver={{ href: "/lugares", texto: "Lugares míticos" }}>
      {lugar.provincia && (
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white">¿Vas a pasar por {lugar.provincia} con tu clásico?</p>
          <p className="text-white/50 text-sm">Mirá los encuentros de la agenda y los autos en venta en la provincia.</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/eventos" className="px-4 py-2 rounded-xl border border-white/20 text-sm text-white/80 hover:border-[#D4A847] hover:text-[#D4A847] transition-colors">
            Eventos
          </Link>
          <Link href={`/anuncios?provincia=${encodeURIComponent(lugar.provincia!)}`} className="px-4 py-2 rounded-xl bg-[#D4A847] text-black text-sm font-bold hover:bg-[#C49B35] transition-colors">
            Autos en {lugar.provincia}
          </Link>
        </div>
      </section>
      )}
    </Articulo>
  );
}
