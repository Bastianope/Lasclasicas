"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function EnviarMensajeForm({
  anuncioId,
  destinatarioId,
}: {
  anuncioId: string;
  destinatarioId: string;
}) {
  const [contenido, setContenido] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    if (!contenido.trim()) return;

    setEnviando(true);

    const { error } = await supabase.from("mensajes").insert({
      anuncio_id: anuncioId,
      remitente_id: user.id,
      destinatario_id: destinatarioId,
      contenido: contenido.trim(),
    });

    setEnviando(false);

    if (error) {
      setError("No se pudo enviar el mensaje. Intentá de nuevo.");
      return;
    }

    setContenido("");
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribí tu mensaje al vendedor..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847] resize-none"
        required
      />
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      {enviado && <p className="text-green-400 text-xs mt-2">Mensaje enviado correctamente.</p>}
      <button
        type="submit"
        disabled={enviando}
        className="mt-3 w-full bg-[#D4A847] text-black py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors disabled:opacity-50"
      >
        {enviando ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}