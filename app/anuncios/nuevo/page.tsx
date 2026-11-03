"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import SelectProvincia from "@/components/SelectProvincia";
import { useCategoriasManuales } from "@/lib/useCategoriasManuales";

type Marca = { id: string; nombre: string };
type Modelo = { id: string; nombre: string; marca_id: string };

const MAX_FOTOS = 10;

export default function NuevoAnuncioPage() {
  const router = useRouter();
  const supabase = createClient();

  const [checking, setChecking] = useState(true);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);

  const [titulo, setTitulo] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [modeloId, setModeloId] = useState("");
  const [anio, setAnio] = useState("");
  const [precio, setPrecio] = useState("");
  const [moneda, setMoneda] = useState("USD");
  const [kilometraje, setKilometraje] = useState("");
  const [condicion, setCondicion] = useState("bueno");
  const [descripcion, setDescripcion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoPerfil, setTelefonoPerfil] = useState("");
  const [fotos, setFotos] = useState<File[]>([]);
  const [categoriaId, setCategoriaId] = useState("");
  const { opciones: categorias } = useCategoriasManuales();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progreso, setProgreso] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // El WhatsApp del perfil se propone por defecto; se puede cambiar por anuncio.
      const { data: perfil } = await supabase
        .from("profiles")
        .select("telefono")
        .eq("id", user.id)
        .maybeSingle();
      if (perfil?.telefono) {
        setTelefono(perfil.telefono);
        setTelefonoPerfil(perfil.telefono);
      }
      setChecking(false);
    };
    checkUser();
  }, []);

  const elegirFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elegidas = Array.from(e.target.files ?? []).slice(0, MAX_FOTOS);
    setFotos(elegidas);
  };

  useEffect(() => {
    const loadMarcas = async () => {
      const { data } = await supabase.from("marcas").select("id, nombre").order("nombre");
      setMarcas(data || []);
    };
    loadMarcas();
  }, []);

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
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
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
        titulo,
        kilometraje: Number(kilometraje) || null,
        condicion,
        whatsapp: telefono.trim() || null,
        ...(categoriaId ? { categoria_id: categoriaId } : {}),
      })
      .select()
      .single();

    if (insertError || !anuncio) {
      setError(insertError?.message || "Error al crear el anuncio.");
      setLoading(false);
      return;
    }

    // Primer número cargado: se guarda también en el perfil para los próximos anuncios
    if (telefono.trim() && !telefonoPerfil) {
      await supabase
        .from("profiles")
        .update({ telefono: telefono.trim() })
        .eq("id", user.id);
    }

    // Fotos: la primera queda como principal
    let subidas = 0;
    for (let i = 0; i < fotos.length; i++) {
      setProgreso(`Subiendo fotos (${i + 1}/${fotos.length})...`);
      const foto = fotos[i];
      const fileExt = foto.name.split(".").pop();
      const filePath = `${user.id}/${anuncio.id}-${i}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("anuncios-fotos")
        .upload(filePath, foto);
      if (uploadError) continue;

      const { data: { publicUrl } } = supabase.storage
        .from("anuncios-fotos")
        .getPublicUrl(filePath);
      await supabase.from("anuncio_imagenes").insert({
        anuncio_id: anuncio.id,
        url: publicUrl,
        es_principal: subidas === 0,
        orden: subidas,
      });
      subidas++;
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

        {/* TITULO */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Título del anuncio</label>
          <input
            type="text"
            required
            placeholder="Ej: Ford Falcon Sprint 1978 impecable"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
        </div>

        {/* MARCA / MODELO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Marca</label>
            <select
              required
              value={marcaId}
              onChange={(e) => { setMarcaId(e.target.value); setModeloId(""); }}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            >
              <option value="">Seleccionar</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
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
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* AÑO */}
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
          <p className="text-gray-500 text-xs mt-1">
            Antes de 1980 aparece en Clásicos, de 1980 a 2000 en Youngtimers.
          </p>
        </div>

        {/* CARROCERIA (tabla categorias) */}
        {categorias.length > 0 && (
          <div>
            <label className="block text-gray-300 text-sm mb-1">Carrocería (opcional)</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            >
              <option value="">Sin especificar</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.etiqueta}</option>
              ))}
            </select>
            <p className="text-gray-500 text-xs mt-1">Coupés y cabrios aparecen también en Sport &amp; GT.</p>
          </div>
        )}

        {/* MONEDA / PRECIO */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Moneda</label>
            <select
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            >
              <option value="USD">USD (Dólares)</option>
              <option value="ARS">ARS (Pesos)</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-300 text-sm mb-1">Precio</label>
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

        {/* KILOMETRAJE / ESTADO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Kilómetros</label>
            <input
              type="number"
              min="0"
              placeholder="Ej: 85000"
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Estado</label>
            <select
              value={condicion}
              onChange={(e) => setCondicion(e.target.value)}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            >
              <option value="excelente">Excelente</option>
              <option value="bueno">Bueno</option>
              <option value="regular">Regular</option>
            </select>
          </div>
        </div>

        {/* DESCRIPCION */}
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

        {/* CIUDAD / PROVINCIA */}
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
            <SelectProvincia
              required
              value={provincia}
              onChange={setProvincia}
              className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
            />
          </div>
        </div>

        {/* TELEFONO */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">WhatsApp de contacto para este anuncio</label>
          <input
            type="tel"
            placeholder="Ej: 5491112345678"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
          />
          <p className="text-gray-500 text-xs mt-1">
            Formato internacional sin + (ej: 5491112345678). Los interesados te escriben directo a este número.
          </p>
        </div>

        {/* FOTOS */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Fotos (hasta {MAX_FOTOS})</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={elegirFotos}
            className="w-full text-gray-300 text-sm"
          />
          <p className="text-gray-500 text-xs mt-1">
            {fotos.length > 0
              ? `${fotos.length} ${fotos.length === 1 ? "foto elegida" : "fotos elegidas"}. La primera será la principal.`
              : "Los anuncios con varias fotos reciben muchas más consultas."}
          </p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-background font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? progreso ?? "Publicando..." : "Publicar Anuncio"}
        </button>

      </form>
    </main>
  );
}