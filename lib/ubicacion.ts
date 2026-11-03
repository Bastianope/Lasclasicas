// Provincias argentinas y filtro por ubicación (provincia o ciudad).
// "CABA" es el valor guardado para la Ciudad Autónoma de Buenos Aires.

export const PROVINCIAS = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
] as const;

export const ETIQUETA_PROVINCIA: Record<string, string> = {
  CABA: "CABA (Ciudad de Buenos Aires)",
};

// Formas en que la gente escribe la Ciudad de Buenos Aires.
const ALIAS_CABA = [
  "CABA",
  "Capital Federal",
  "Ciudad de Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
];

export function quitarAcentos(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function clave(texto: string): string {
  return quitarAcentos(texto).trim().toLowerCase();
}

// Devuelve el nombre oficial de la provincia si el texto corresponde a una
// (sin importar mayúsculas ni acentos), o null si no es una provincia.
export function provinciaCanonica(texto: string): string | null {
  const k = clave(texto);
  if (!k) return null;
  if (ALIAS_CABA.some((a) => clave(a) === k)) return "CABA";
  return PROVINCIAS.find((p) => clave(p) === k) ?? null;
}

// Términos a buscar en las columnas provincia y ciudad.
function terminosUbicacion(texto: string): string[] {
  const canonica = provinciaCanonica(texto);
  let base: string[];
  if (canonica === "CABA") {
    base = ALIAS_CABA;
  } else if (canonica === "Buenos Aires") {
    // Quien busca "Buenos Aires" espera ver también la capital.
    base = ["Buenos Aires", "CABA", "Capital Federal"];
  } else {
    base = [canonica ?? texto.trim()];
  }
  const conVariantes = base.flatMap((t) => [t, quitarAcentos(t)]);
  return Array.from(new Set(conVariantes.map(limpiarTermino).filter(Boolean)));
}

// Quita los caracteres que tienen significado en los filtros de PostgREST.
function limpiarTermino(texto: string): string {
  return texto.replace(/[,()"'\\:%*]/g, "").trim();
}

// Filtro para .or(): coincide si provincia o ciudad contienen alguno de los términos.
// Las palabras se buscan en orden con cualquier texto entre ellas, para tolerar
// pequeñas faltas ("Capitale Federal" coincide con "Capital Federal").
export function filtroUbicacion(texto: string): string | null {
  const terminos = terminosUbicacion(texto);
  if (terminos.length === 0) return null;
  return terminos
    .map((t) => `%${t.split(/\s+/).join("%")}%`)
    .flatMap((patron) => [`provincia.ilike.${patron}`, `ciudad.ilike.${patron}`])
    .join(",");
}
