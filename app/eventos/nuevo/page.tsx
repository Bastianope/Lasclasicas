import Link from "next/link";
import CrearEventoForm from "@/components/CrearEventoForm";

export default function NuevoEventoPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/eventos" className="inline-block mb-6 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
          ← Volver a eventos
        </Link>
        <h1 className="text-2xl font-bold text-white mb-6">Publicar evento</h1>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <CrearEventoForm />
        </div>
      </div>
    </main>
  );
}