import Link from "next/link";
import CrearClubForm from "@/components/CrearClubForm";

export default function NuevoClubPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/clubes" className="inline-block mb-6 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
          ← Volver a clubes
        </Link>
        <h1 className="text-2xl font-bold text-white mb-6">Crear club</h1>
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <CrearClubForm />
        </div>
      </div>
    </main>
  );
}