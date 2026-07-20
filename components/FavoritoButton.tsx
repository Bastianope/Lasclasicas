"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function FavoritoButton({ anuncioId }: { anuncioId: string }) {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkFavorito = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCargando(false);
        return;
      }

      const { data } = await supabase
        .from("favoritos")
        .select("id")
        .eq("user_id", user.id)
        .eq("anuncio_id", anuncioId)
        .maybeSingle();

      setEsFavorito(!!data);
      setCargando(false);
    };

    checkFavorito();
  }, [anuncioId]);

  const toggleFavorito = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    setProcesando(true);

    if (esFavorito) {
      await supabase
        .from("favoritos")
        .delete()
        .eq("user_id", user.id)
        .eq("anuncio_id", anuncioId);
      setEsFavorito(false);
    } else {
      await supabase
        .from("favoritos")
        .insert({ user_id: user.id, anuncio_id: anuncioId });
      setEsFavorito(true);
    }

    setProcesando(false);
    router.refresh();
  };

  if (cargando) return null;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorito();
      }}
      disabled={procesando}
      aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur bg-black/40 hover:bg-black/60 transition-colors disabled:opacity-50"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill={esFavorito ? "#D4A847" : "none"}
        stroke={esFavorito ? "#D4A847" : "white"}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}