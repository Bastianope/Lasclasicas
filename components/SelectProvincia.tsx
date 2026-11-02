"use client";

import { ETIQUETA_PROVINCIA, PROVINCIAS, provinciaCanonica } from "@/lib/ubicacion";

interface Props {
  value: string;
  onChange: (valor: string) => void;
  className?: string;
  required?: boolean;
}

// Lista de las 24 jurisdicciones. Si el anuncio tiene un valor antiguo escrito a mano
// que no corresponde a ninguna, se muestra igual para no borrarlo al editar.
export default function SelectProvincia({ value, onChange, className, required }: Props) {
  const valorLibre = value && !provinciaCanonica(value) ? value : null;

  return (
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">Seleccionar</option>
      {valorLibre && <option value={valorLibre}>{valorLibre}</option>}
      {PROVINCIAS.map((p) => (
        <option key={p} value={p}>
          {ETIQUETA_PROVINCIA[p] ?? p}
        </option>
      ))}
    </select>
  );
}
