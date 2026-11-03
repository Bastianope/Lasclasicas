"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

interface Props {
  userEmail: string | null;
  noLeidos?: number;
}

type LinkMenu = { href: string; label: string; contador?: number };

// Visibles para todos: el contenido es público.
const LINKS_PUBLICOS: LinkMenu[] = [
  { href: "/anuncios", label: "Anuncios" },
  { href: "/eventos", label: "Eventos" },
  { href: "/clubes", label: "Clubes" },
];

function Contador({ valor }: { valor?: number }) {
  if (!valor) return null;
  return (
    <span className="ml-1.5 inline-flex min-w-[18px] h-[18px] px-1 items-center justify-center rounded-full bg-accent text-black text-[10px] font-bold align-middle">
      {valor > 9 ? "9+" : valor}
    </span>
  );
}

export default function NavLinks({ userEmail, noLeidos = 0 }: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const conectado = !!userEmail;
  // Solo con sesión iniciada.
  const linksCuenta: LinkMenu[] = [
    { href: "/mensajes", label: "Mensajes", contador: noLeidos },
    { href: "/favoritos", label: "Favoritos" },
    { href: "/perfil", label: "Mi perfil" },
  ];
  const links = conectado ? [...LINKS_PUBLICOS, ...linksCuenta] : LINKS_PUBLICOS;
  const hrefPublicar = conectado ? "/anuncios/nuevo" : "/login";

  // Cierra el menú móvil al cambiar de página.
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  const esActivo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold text-white shrink-0">
          Las <span className="text-accent">Clásicas</span>
        </Link>

        {/* Escritorio */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={esActivo(l.href) ? "text-accent font-semibold" : "text-white/70 hover:text-accent transition-colors"}
            >
              {l.label}
              <Contador valor={l.contador} />
            </Link>
          ))}
          <Link
            href={hrefPublicar}
            className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#C49B35] transition-colors"
          >
            Publicar
          </Link>
          {conectado ? (
            <LogoutButton />
          ) : (
            <Link href="/login" className={esActivo("/login") ? "text-accent font-semibold" : "text-white/70 hover:text-accent transition-colors"}>
              Ingresar
            </Link>
          )}
        </div>

        {/* Móvil */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="lg:hidden relative p-2 -mr-2 text-white/80 hover:text-accent"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          {noLeidos > 0 && !abierto && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
          )}
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {abierto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {abierto && (
        <div className="lg:hidden border-t border-white/10 py-3 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`py-3 text-base ${esActivo(l.href) ? "text-accent font-semibold" : "text-white/80"}`}
            >
              {l.label}
              <Contador valor={l.contador} />
            </Link>
          ))}
          <Link
            href={hrefPublicar}
            className="mt-3 bg-accent text-black font-semibold px-4 py-3 rounded-lg text-center"
          >
            Publicar anuncio
          </Link>
          <div className="pt-4 text-sm">
            {conectado ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className="text-white/70 hover:text-accent">
                Ingresar o crear cuenta
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
