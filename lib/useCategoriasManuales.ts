"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  esCategoriaDeEpoca,
  etiquetaCategoria,
  type FilaCategoria,
} from "@/lib/categorias";

export type OpcionCategoria = { id: string; etiqueta: string };

// Categorías que el vendedor elige a mano (por ejemplo Sport & GT).
// Las de época (clásico, youngtimer) se deducen del año y no se ofrecen,
// salvo la que el anuncio ya tenga, para no perderla al editar.
export function useCategoriasManuales(valorActual?: string | null) {
  const [opciones, setOpciones] = useState<OpcionCategoria[]>([]);
  const [cargadas, setCargadas] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("categorias")
      .select("*")
      .then(({ data, error }) => {
        if (!error && data) {
          const filas = data as FilaCategoria[];
          setOpciones(
            filas
              .filter((f) => !esCategoriaDeEpoca(f) || f.id === valorActual)
              .map((f) => ({ id: f.id, etiqueta: etiquetaCategoria(f) }))
              .filter((o) => o.etiqueta)
              .sort((a, b) => a.etiqueta.localeCompare(b.etiqueta, "es"))
          );
        }
        setCargadas(true);
      });
  }, [valorActual]);

  return { opciones, cargadas };
}
