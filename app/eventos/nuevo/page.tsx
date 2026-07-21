import Link from "next/link";
import CrearEventoForm from "@/components/CrearEventoForm";

export default function NuevoEventoPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <nav className="border-b border-white/10 bg-[#0F1117]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#D4A847]">Las Clásicas</Link>
          <Link href="/eventos" className="text-sm text-white/60 hover:text-white transition-colors">
            ← Volver a eventos
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Publicar evento</h1>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <CrearEventoForm />
        </div>
      </div>
    </main>
  );
}