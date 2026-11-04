import Link from "next/link";

const LINKS = [
  { href: "/anuncios", label: "Anuncios" },
  { href: "/guias", label: "Guías" },
  { href: "/lugares", label: "Lugares míticos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/clubes", label: "Clubes" },
  { href: "/guias/seguros-para-clasicos", label: "Seguros" },
  { href: "/anuncios/nuevo", label: "Publicar gratis" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-start justify-between gap-6 text-sm">
        <div>
          <p className="text-white font-bold text-lg mb-1">
            Las <span className="text-accent">Clásicas</span>
          </p>
          <p className="text-white/40">El marketplace de clásicos y youngtimers en Argentina.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/50 hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/5">
        <p className="max-w-7xl mx-auto px-4 py-4 text-white/25 text-xs">
          © {new Date().getFullYear()} Las Clásicas · Contacto directo entre particulares, sin comisiones.
        </p>
      </div>
    </footer>
  );
}
