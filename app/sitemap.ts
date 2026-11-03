import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { URL_SITIO } from "@/lib/sitio";

// Se regenera como máximo una vez por hora.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Cliente sin cookies: solo lee datos públicos.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [{ data: anuncios }, { data: eventos }, { data: clubes }] = await Promise.all([
    supabase.from("anuncios").select("id, created_at").eq("estado", "activo"),
    supabase.from("eventos").select("id, created_at"),
    supabase.from("clubes").select("id, created_at"),
  ]);

  const paginas: MetadataRoute.Sitemap = [
    { url: URL_SITIO, changeFrequency: "daily", priority: 1 },
    { url: `${URL_SITIO}/anuncios`, changeFrequency: "daily", priority: 0.9 },
    { url: `${URL_SITIO}/eventos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${URL_SITIO}/clubes`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const detalle = (ruta: string, filas: { id: string; created_at: string | null }[] | null, prioridad: number) =>
    (filas ?? []).map((f) => ({
      url: `${URL_SITIO}/${ruta}/${f.id}`,
      lastModified: f.created_at ?? undefined,
      changeFrequency: "weekly" as const,
      priority: prioridad,
    }));

  return [
    ...paginas,
    ...detalle("anuncios", anuncios, 0.8),
    ...detalle("eventos", eventos, 0.5),
    ...detalle("clubes", clubes, 0.5),
  ];
}
