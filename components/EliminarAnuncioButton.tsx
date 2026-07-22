"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function EliminarAnuncioButton({ anuncioId }: { anuncioId: string }) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleEliminar = async () => {
    setEliminando(true);
    const { error } = await supabase.from("anuncios").delete().eq("id", anuncioId);
    setEliminando(false);

    if (!error) {
      router.refresh();
    }
    setConfirmando(false);
  };

  if (confirmando) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEliminar(); }}
          disabled={eliminando}
          className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          {eliminando ? "..." : "Confirmar"}
        </button>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmando(false); }}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setConfirmando(true); }}
      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400 transition-colors"
    >
      Eliminar
    </button>
  );
}