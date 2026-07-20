import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-accent mb-4">
        Las Clásicas
      </h1>
      <p className="text-lg text-gray-300 max-w-xl mb-8">
        El marketplace especializado en autos clásicos y youngtimers en Argentina.
      </p>
      <Link
        href="/anuncios"
        className="bg-accent text-background font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
      >
        Ver Anuncios
      </Link>
    </main>
  );
}
