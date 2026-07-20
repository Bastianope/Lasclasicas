import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Las Clásicas | Autos Clásicos y Youngtimers Argentina",
  description: "El marketplace especializado en autos clásicos y youngtimers en Argentina",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="es">
      <body className="bg-background text-white min-h-screen">
        <nav className="border-b border-gray-800 px-4 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-accent font-bold text-xl">
              Las Clásicas
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/anuncios" className="text-gray-300 hover:text-accent">
                Anuncios
              </Link>
{user ? (
                <>
<Link href="/favoritos" className="text-gray-300 hover:text-accent">
                      Favoritos
                    </Link>
                    <Link href="/perfil" className="text-gray-300 hover:text-accent">
                      Mi perfil
                    </Link>
                  <Link
                    href="/anuncios/nuevo"
                    className="bg-accent text-background font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Publicar Anuncio
                  </Link>
                  <span className="text-gray-500">{user.email}</span>
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
        </nav>
        {children}
      </body>
    </html>
  );
}