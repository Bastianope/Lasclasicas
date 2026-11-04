import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md">
        <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">Error 404</p>
        <h1 className="text-3xl font-bold text-white mb-3">Esta página no existe</h1>
        <p className="text-white/50 mb-8">
          Puede que el anuncio ya se haya vendido o que el enlace esté mal escrito.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/anuncios"
            className="bg-accent text-black px-6 py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors"
          >
            Ver anuncios
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:border-accent hover:text-accent transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
