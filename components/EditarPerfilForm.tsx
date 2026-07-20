"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  perfil: {
    id: string;
    nombre: string | null;
    telefono: string | null;
    ciudad: string | null;
    provincia: string | null;
  };
}

export default function EditarPerfilForm({ perfil }: Props) {
  const [nombre, setNombre] = useState(perfil.nombre || "");
  const [telefono, setTelefono] = useState(perfil.telefono || "");
  const [ciudad, setCiudad] = useState(perfil.ciudad || "");
  const [provincia, setProvincia] = useState(perfil.provincia || "");
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGuardado(false);
    setGuardando(true);

    const { error } = await supabase
      .from("profiles")
      .update({ nombre, telefono, ciudad, provincia })
      .eq("id", perfil.id);

    setGuardando(false);

    if (error) {
      setError("No se pudo guardar. Intentá de nuevo.");
      return;
    }

    setGuardado(true);
    router.refresh();
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/50 text-xs mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]"
        />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Teléfono (WhatsApp)</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="5491112345678"
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/50 text-xs mb-1">Ciudad</label>
          <input
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]"
          />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1">Provincia</label>
          <input
            type="text"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
      {guardado && <p className="text-green-400 text-xs">Perfil actualizado correctamente.</p>}

      <button
        type="submit"
        disabled={guardando}
        className="w-full bg-[#D4A847] text-black py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors disabled:opacity-50"
      >
        {guardando ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}