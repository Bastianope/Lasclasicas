"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Marca = { id: string; nombre: string };
type Modelo = { id: string; nombre: string; marca_id: string };
type Imagen = { id: string; url: string; es_principal: boolean; orden: number };

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

  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [errorFoto, setErrorFoto] = useState<string | null>(null);

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

  const cargarImagenes = async () => {
    const { data } = await supabase
      .from("anuncio_imagenes")
      .select("id, url, es_principal, orden")
      .eq("anuncio_id", anuncio.id)
      .order("orden");
    setImagenes(data || []);
  };

  useEffect(() => {
    cargarImagenes();
  }, []);

  const handleSubirFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorFoto(null);
    setSubiendoFoto(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErrorFoto("Tenés que iniciar sesión.");
      setSubiendoFoto(false);
      return;
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${anuncio.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("anuncios-fotos")
      .upload(filePath, file);

    if (uploadError) {
      setErrorFoto("No se pudo subir la foto.");
      setSubiendoFoto(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("anuncios-fotos")
      .getPublicUrl(filePath);

    await supabase.from("anuncio_imagenes").insert({
      anuncio_id: anuncio.id,
      url: publicUrl,
      es_principal: imagenes.length === 0,
      orden: imagenes.length,
    });

    await cargarImagenes();
    setSubiendoFoto(false);
    e.target.value = "";
  };

  const handleEliminarFoto = async (imgId: string) => {
    await supabase.from("anuncio_imagenes").delete().eq("id", imgId);
    await cargarImagenes();
  };

  const handleHacerPrincipal = async (imgId: string) => {
    await supabase.from("anuncio_imagenes").update({ es_principal: false }).eq("anuncio_id", anuncio.id);
    await supabase.from("anuncio_imagenes").update({ es_principal: true }).eq("id", imgId);
    await cargarImagenes();
  };

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
    <div className="space-y-8">

      <div>
        <label className="block text-white/50 text-xs mb-2">Fotos</label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {imagenes.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden bg-black/40 border border-white/10 group">
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              {img.es_principal && (
                <span className="absolute top-1 left-1 bg-[#D4A847] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                {!img.es_principal && (
                  <button type="button" onClick={() => handleHacerPrincipal(img.id)}
                    className="text-[10px] text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded">
                    Hacer principal
                  </button>
                )}
                <button type="button" onClick={() => handleEliminarFoto(img.id)}
                  className="text-[10px] text-red-400 bg-red-500/20 hover:bg-red-500/30 px-2 py-1 rounded">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <label className="inline-block cursor-pointer text-xs px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors">
          {subiendoFoto ? "Subiendo..." : "+ Agregar foto"}
          <input type="file" accept="image/*" onChange={handleSubirFoto} disabled={subiendoFoto} className="hidden" />
        </label>
        {errorFoto && <p className="text-red-400 text-xs mt-2">{errorFoto}</p>}
      </div>

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
    </div>
  );
}