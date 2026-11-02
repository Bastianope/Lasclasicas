"use client";

import { useRouter } from "next/navigation";
import { ETIQUETA_PROVINCIA, PROVINCIAS, provinciaCanonica } from "@/lib/ubicacion";

interface Props {
  // Valor actual del filtro (provincia o ciudad, por ejemplo "Rosario" desde el mapa).
  valor?: string;
  // Los demás filtros activos, que se conservan al cambiar de provincia.
  otrosParametros: Record<string, string | undefined>;
}

export default function FiltroProvincia({ valor, otrosParametros }: Props) {
  const router = useRouter();
  const canonica = valor ? provinciaCanonica(valor) : null;
  const seleccion = canonica ?? valor ?? "";
  const esCiudad = !!valor && !canonica;

  const cambiar = (nuevo: string) => {
    const sp = new URLSearchParams();
    Object.entries(otrosParametros).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    if (nuevo) sp.set("provincia", nuevo);
    const qs = sp.toString();
    router.push(`/anuncios${qs ? `?${qs}` : ""}`);
  };

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">Ubicación:</span>
      <select
        value={seleccion}
        onChange={(e) => cambiar(e.target.value)}
        className="bg-surface border border-gray-700 rounded-full px-4 py-1.5 text-white text-sm focus:border-accent outline-none"
      >
        <option value="">Todo el país</option>
        {esCiudad && <option value={valor}>{valor}</option>}
        {PROVINCIAS.map((p) => (
          <option key={p} value={p}>
            {ETIQUETA_PROVINCIA[p] ?? p}
          </option>
        ))}
      </select>
    </label>
  );
}
