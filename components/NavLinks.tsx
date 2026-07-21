"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

interface Props {
  userEmail: string | null;
}

export default function NavLinks({ userEmail }: Props) {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return isActive
      ? "text-accent font-semibold"
      : "text-gray-300 hover:text-accent";
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <Link href="/" className="text-accent font-bold text-xl">
        Las Clásicas
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/anuncios" className={linkClass("/anuncios")}>
          Anuncios
        </Link>
        {userEmail ? (
          <>
            <Link href="/favoritos" className={linkClass("/favoritos")}>
              Favoritos
            </Link>
            <Link href="/perfil" className={linkClass("/perfil")}>
              Mi perfil
            </Link>
            <Link href="/eventos" className={linkClass("/eventos")}>
              Eventos
            </Link>
            <Link href="/clubes" className={linkClass("/clubes")}>
              Clubes
            </Link>
            <Link
              href="/anuncios/nuevo"
              className="bg-accent text-background font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Publicar Anuncio
            </Link>
            <span className="text-gray-500">{userEmail}</span>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/login"
            className="bg-accent text-background font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
}