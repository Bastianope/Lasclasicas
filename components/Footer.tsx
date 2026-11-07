import Link from "next/link";
import { EMAIL_CONTACTO, FACEBOOK_URL } from "@/lib/sitio";

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
          <a href={`mailto:${EMAIL_CONTACTO}`} className="inline-block mt-3 text-white/60 hover:text-accent transition-colors">
            {EMAIL_CONTACTO}
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-2 text-white/60 hover:text-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
            </svg>
            Facebook
          </a>
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
