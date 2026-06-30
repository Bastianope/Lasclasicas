"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Marca = { id: string; nombre: string };
type Modelo = { id: string; nombre: string; marca_id: string };

export default function NuevoAnuncioPage() {
  const router = useRouter();
  const supabase = createClient();

  const [checking, setChecking] = useState(true);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);

  const [marcaId, setMarcaId] = useState("");
  const [modeloId, setModeloId] = useState("");
  const [anio, setAnio] = useState("");
  const [precio, setPrecio] = useState("");
  const [moneda, setMoneda] = useState("ARS");
  const [descripcion, setDescripcion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setChecking(false);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const loadMarcas = async () => {
      const { data } = await supabase.from("marcas").select("id, nombre").order("nombre");
      setMarcas(data || []);
    };
    loadMarcas();
  }, []);

  useEffect(() => {
    if (!marcaId) {
      setModelos([]);
      return;
    }
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
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Tenés que iniciar sesión.");
      setLoading(false);
      return;
    }

    const { data: anuncio, error: insertError } = await supabase
      .from("anuncios")
      .insert({
        vendedor_id: user.id,
        marca_id: marcaId,
        modelo_id: modeloId,
        anio: Number(anio),
        precio: Number(precio),
        moneda,
        descripcion,
        ciudad,
        provincia,
        estado: "activo",
      })
      .select()
      .single();

    if (insertError || !anuncio) {
      setError(insertError?.message || "Error al crear el anuncio.");
      setLoading(false);
      return;
    }

    if (foto) {
      const fileExt = foto.name.split(".").pop();
      const filePath = `${user.id}/${anuncio.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("anuncios-fotos")
        .upload(filePath, foto);

      if (!uploadError) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("anuncios-fotos").getPublicUrl(filePath);

        await supabase.from("anuncio_imagenes").insert({
          anuncio_id: anuncio.id,
          url: publicUrl,
          orden: 0,
        });
      }
    }

    router.push(`/anuncios/${anuncio.id}`);
    router.refresh();
  };

  if (checking) {
    return <main className="px-4 py-20 text-center text-gray-400">Cargando...</main>;
  }

  return (
    <main className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-8">Publicar Anuncio</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Marca</label>
            <select
              required
              value={marcaId}
              onChange={(e) => {
                setMarcaId(e.target.value);
                setModeloId("");
              }}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            >
              <option value="">Seleccionar</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Modelo</label>
            <select
              required
              value={modeloId}
              onChange={(e) => setModeloId(e.target.value)}
              disabled={!marcaId}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none disabled:opacity-50"
            >
              <option value="">Seleccionar</option>
              {modelos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Año</label>
            <input
              type="number"
              required
              min="1900"
              max="2030"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Precio (ARS)</label>
            <input
              type="number"
              required
              min="0"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Descripción</label>
          <textarea
            required
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Ciudad</label>
            <input
              type="text"
              required
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Provincia</label>
            <input
              type="text"
              required
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files?.[0] || null)}
            className="w-full text-gray-300 text-sm"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-background font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Publicando..." : "Publicar Anuncio"}
        </button>
      </form>
    </main>
  );
}
