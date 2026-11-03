// Datos generales del sitio y utilidades de presentación.

export const NOMBRE_SITIO = "Las Clásicas";

// Vercel define VERCEL_PROJECT_PRODUCTION_URL con el dominio de producción
// (lasclasicas.vercel.app hoy, el dominio propio en cuanto se agregue en Vercel).
export const URL_SITIO =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NODE_ENV === "production"
      ? "https://lasclasicas.vercel.app"
      : "http://localhost:3000");

// Nombre que se puede mostrar en público: nunca un email.
export function nombreVisible(nombre?: string | null): string | null {
  const n = (nombre ?? "").trim();
  if (!n || n.includes("@")) return null;
  return n;
}

// Enlace wa.me a partir de un número cargado a mano (se conservan solo los dígitos).
export function enlaceWhatsApp(telefono: string | null | undefined, texto: string): string | null {
  const digitos = (telefono ?? "").replace(/\D/g, "");
  if (digitos.length < 8) return null;
  return `https://wa.me/${digitos}?text=${encodeURIComponent(texto)}`;
}

type AnuncioBasico = {
  titulo?: string | null;
  anio?: number | null;
  marcas?: { nombre?: string | null } | null;
  modelos?: { nombre?: string | null } | null;
};

// Título del anuncio con el año, sin repetirlo si ya figura.
export function tituloAnuncio(a: AnuncioBasico): string {
  const base =
    a.titulo?.trim() || [a.marcas?.nombre, a.modelos?.nombre].filter(Boolean).join(" ") || "Auto clásico";
  return a.anio && !base.includes(String(a.anio)) ? `${base} ${a.anio}` : base;
}

// "domingo, 29 de noviembre" -> "Domingo, 29 de noviembre" (CSS capitalize pondría "De")
export function primeraMayuscula(texto?: string | null): string {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function precioAnuncio(moneda?: string | null, precio?: number | string | null): string {
  if (precio === null || precio === undefined || precio === "") return "";
  return `${moneda ?? ""} ${Number(precio).toLocaleString("es-AR")}`.trim();
}

// Imagen de una publicación pasada por el optimizador de Vercel: liviana para WhatsApp y redes.
export function imagenParaCompartir(url: string): string {
  return `/_next/image?url=${encodeURIComponent(url)}&w=1200&q=75`;
}
