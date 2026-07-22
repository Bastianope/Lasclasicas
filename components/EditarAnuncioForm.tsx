"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Marca = { id: string; nombre: string };
type Modelo = { id: string; nombre: string; marca_id: string };

export default function EditarAnuncioForm({
  anuncio,
  marcasIniciales,
  modelosIniciales,
}: {
  anuncio: any;
  marcasIniciales: Marca[];
  modelosIniciales: Modelo[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [marcas] = useState<Marca[]>(marcasIniciales);
  const [modelos, setModelos] = useState<Modelo[]>(modelosIniciales);

  const [titulo, setTitulo] = useState(anuncio.titulo || "");
  const [marcaId, setMarcaId] = useState(anuncio.marca_id || "");
  const [modeloId, setModeloId] = useState(anuncio.modelo_id || "");
  const [anio, setAnio] = useState(String(anuncio.anio || ""));
  const [precio, setPrecio] = useState(String(anuncio.precio || ""));
  const [moneda, setMoneda] = useState(anuncio.moneda || "USD");
  const [kilometraje, setKilometraje] = useState(String(anuncio.kilometraje || ""));
  const [condicion, setCondicion] = useState(anuncio.condicion || "bueno");
  const [descripcion, setDescripcion] = useState(anuncio.descripcion || "");
  const [ciudad, setCiudad] = useState(anuncio.ciudad || "");
  const [provincia, setProvincia] = useState(anuncio.provincia || "");
  const [estado, setEstado] = useState(anuncio.estado || "activo");

  const [error, setError] = useState<string | null>(null);
  const [guardado, setGuardado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!marcaId) { setModelos([]); return; }
    const loadModelos = async () => {
      const { data } = await supabase
        .from("modelos")
        .select("id, nombre, marca_id")
        .eq("marca_id", marcaId)
        .order("nombre");
      setModelos(data || []);
    };
    loadModelos();
  }, [marcaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGuardado(false);
    setLoading(true);

    const { error } = await supabase
      .from("anuncios")
      .update({
        titulo,
        marca_id: marcaId,
        modelo_id: modeloId,
        anio: Number(anio),
        precio: Number(precio),
        moneda,
        kilometraje: Number(kilometraje) || null,
        condicion,
        descripcion,
        ciudad,
        provincia,
        estado,
      })
      .eq("id", anuncio.id);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setGuardado(true);
    router.refresh();
    setTimeout(() => router.push(`/anuncios/${anuncio.id}`), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/50 text-xs mb-1">Título</label>
        <input type="text" required value={titulo} onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/50 text-xs mb-1">Marca</label>
          <select required value={marcaId} onChange={(e) => { setMarcaId(e.target.value); setModeloId(""); }}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]">
            {marcas.map((m) => (<option key={m.id} value={m.id}>{m.nombre}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1">Modelo</label>
          <select required value={modeloId} onChange={(e) => setModeloId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]">
            {modelos.map((m) => (<option key={m.id} value={m.id}>{m.nombre}</option>))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1">Año</label>
        <input type="number" required min="1900" max="2030" value={anio} onChange={(e) => setAnio(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-white/50 text-xs mb-1">Moneda</label>
          <select value={moneda} onChange={(e) => setMoneda(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]">
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-white/50 text-xs mb-1">Precio</label>
          <input type="number" required min="0" value={precio} onChange={(e) => setPrecio(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/50 text-xs mb-1">Kilómetros</label>
          <input type="number" min="0" value={kilometraje} onChange={(e) => setKilometraje(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]" />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1">Estado</label>
          <select value={condicion} onChange={(e) => setCondicion(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]">
            <option value="excelente">Excelente</option>
            <option value="bueno">Bueno</option>
            <option value="regular">Regular</option>
          </select>
        </div>
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
        <label className="block text-white/50 text-xs mb-1">Estado del anuncio</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm outline-none focus:border-[#D4A847]">
          <option value="activo">Activo (visible)</option>
          <option value="pausado">Pausado (oculto)</option>
        </select>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
      {guardado && <p className="text-green-400 text-xs">Cambios guardados. Redirigiendo...</p>}

      <button type="submit" disabled={loading}
        className="w-full bg-[#D4A847] text-black py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors disabled:opacity-50">
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}