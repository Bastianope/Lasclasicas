"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Marca como leídos los mensajes recibidos que se están mostrando.
// El contador del menú se actualiza unos segundos después, para dejar ver qué era nuevo.
export default function MarcarLeidos({ ids }: { ids: string[] }) {
  const router = useRouter();
  const clave = ids.join(",");

  useEffect(() => {
    if (!clave) return;
    const supabase = createClient();
    let temporizador: ReturnType<typeof setTimeout> | undefined;
    supabase
      .from("mensajes")
      .update({ leido: true })
      .in("id", clave.split(","))
      .then(({ error }) => {
        if (!error) temporizador = setTimeout(() => router.refresh(), 3000);
      });
    return () => clearTimeout(temporizador);
  }, [clave, router]);

  return null;
}
