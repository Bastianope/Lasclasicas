import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import EditarAnuncioForm from "@/components/EditarAnuncioForm";

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function EditarAnuncioPage({ params }: Props) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: anuncio } = await supabase
    .from("anuncios")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!anuncio) notFound();
  if (anuncio.vendedor_id !== user.id) redirect("/perfil");

  const { data: marcas } = await supabase.from("marcas").select("id, nombre").order("nombre");
  const { data: modelos } = await supabase
    .from("modelos")
    .select("id, nombre, marca_id")
    .eq("marca_id", anuncio.marca_id)
    .order("nombre");

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/perfil" className="inline-block mb-6 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
          ← Volver a mi perfil
        </Link>
        <h1 className="text-2xl font-bold text-white mb-6">Editar anuncio</h1>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <EditarAnuncioForm anuncio={anuncio} marcasIniciales={marcas || []} modelosIniciales={modelos || []} />
        </div>
      </div>
    </main>
  );
}