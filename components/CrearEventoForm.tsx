"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CrearEventoForm() {
  const router = useRouter();
  const supabase = createClient();

  const [clubes, setClubes] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEvento, setFechaEvento] = useState("");
  const [lugar, setLugar] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [clubId, setClubId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const fetchClubes = async () => {
      const { data } = await supabase.from("clubes").select("id, nombre").order("nombre");
      setClubes(data || []);
    };
    fetchClubes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    setEnviando(true);

    const { data, error } = await supabase.from("eventos").insert({
      titulo,
      descripcion,
      fecha_evento: fechaEvento || null,
      lugar,
      ciudad,
      provincia,
      foto_url: fotoUrl || null,
      club_id: clubId || null,
      organizador_id: user.id,
    }).select("id").single();

    setEnviando(false);

    if (error) {
      setError("No se pudo publicar el evento. Intentá de nuevo.");
      return;
    }

    router.push(`/eventos/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/50 text-xs mb-1">Título</label>
        <input type="text" required value={titulo} onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Descripción</label>
        <textarea rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847] resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/50 text-xs mb-1">Fecha</label>
          <input type="date" value={fechaEvento} onChange={(e) => setFechaEvento(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1">Lugar</label>
          <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
        </div>
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
        <label className="block text-white/50 text-xs mb-1">Foto (URL, opcional)</label>
        <input type="text" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} placeholder="https://..."
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Club organizador (opcional)</label>
        <select value={clubId} onChange={(e) => setClubId(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]">
          <option value="">Ninguno</option>
          {clubes.map((club) => (
            <option key={club.id} value={club.id}>{club.nombre}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button type="submit" disabled={enviando}
        className="w-full bg-[#D4A847] text-black py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors disabled:opacity-50">
        {enviando ? "Publicando..." : "Publicar evento"}
      </button>
    </form>
  );
}