import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import NavLinks from "@/components/NavLinks";

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
          <NavLinks userEmail={user?.email ?? null} />
        </nav>
        {children}
      </body>
    </html>
  );
}