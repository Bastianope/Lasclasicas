"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CrearClubForm() {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [contacto, setContacto] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [sitioWeb, setSitioWeb] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    setEnviando(true);

    const { data, error } = await supabase.from("clubes").insert({
      nombre,
      descripcion,
      ciudad,
      provincia,
      contacto,
      logo_url: logoUrl || null,
      sitio_web: sitioWeb || null,
      creador_id: user.id,
    }).select("id").single();

    setEnviando(false);

    if (error) {
      setError("No se pudo crear el club. Intentá de nuevo.");
      return;
    }

    router.push(`/clubes/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/50 text-xs mb-1">Nombre del club</label>
        <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Descripción</label>
        <textarea rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847] resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/50 text-xs mb-1">Ciudad</label>
          <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1">Provincia</label>
          <input type="text" value={provincia} onChange={(e) => setProvincia(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
        </div>
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Contacto (teléfono/email/redes)</label>
        <input type="text" value={contacto} onChange={(e) => setContacto(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Logo (URL, opcional)</label>
        <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..."
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Sitio web (opcional)</label>
        <input type="text" value={sitioWeb} onChange={(e) => setSitioWeb(e.target.value)} placeholder="https://..."
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button type="submit" disabled={enviando}
        className="w-full bg-[#D4A847] text-black py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors disabled:opacity-50">
        {enviando ? "Creando..." : "Crear club"}
      </button>
    </form>
  );
}