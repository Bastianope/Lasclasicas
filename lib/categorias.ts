import { quitarAcentos } from "@/lib/ubicacion";

// Categorías de la portada. Clásicos y youngtimers se clasifican solos por año;
// Sport & GT agrupa las carrocerías deportivas (coupé, cabrio) elegidas por el
// vendedor en la tabla categorias, que contiene tipos de carrocería.
export const CATEGORIAS = [
  { slug: "clasico", nombre: "Clásicos", detalle: "Antes de 1980" },
  { slug: "youngtimer", nombre: "Youngtimers", detalle: "1980–2000" },
  { slug: "sport", nombre: "Sport & GT", detalle: "Coupés y cabrios" },
] as const;

export type SlugCategoria = (typeof CATEGORIAS)[number]["slug"];

export const ANIO_FIN_CLASICOS = 1980; // clásico: año < 1980
export const ANIO_FIN_YOUNGTIMERS = 2000; // youngtimer: 1980 a 2000 inclusive

export function normalizarCategoria(valor?: string): SlugCategoria | null {
  const v = (valor ?? "").trim().toLowerCase();
  return CATEGORIAS.find((c) => c.slug === v)?.slug ?? null;
}

// La tabla categorias puede tener distintas columnas de texto: se leen todas con select("*").
export type FilaCategoria = Record<string, unknown> & { id: string };

export function etiquetaCategoria(fila: FilaCategoria): string {
  for (const campo of ["nombre", "name", "titulo", "label", "slug"]) {
    const valor = fila[campo];
    if (typeof valor === "string" && valor.trim()) return valor.trim();
  }
  return "";
}

function textoCategoria(fila: FilaCategoria): string {
  return quitarAcentos(`${etiquetaCategoria(fila)} ${String(fila.slug ?? "")}`).toLowerCase();
}

// Categorías de época: no se eligen a mano porque dependen del año.
export function esCategoriaDeEpoca(fila: FilaCategoria): boolean {
  return /clasic|young/.test(textoCategoria(fila));
}

export function esCategoriaSport(fila: FilaCategoria): boolean {
  return /sport|deportiv|\bgt\b|coupe|cabrio|convertible|descapotable|roadster|spider/.test(
    textoCategoria(fila)
  );
}
