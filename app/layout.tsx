import type { Metadata, Viewport } from "next";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import NavLinks from "@/components/NavLinks";
import Footer from "@/components/Footer";
import { NOMBRE_SITIO, URL_SITIO } from "@/lib/sitio";

const TITULO = "Las Clásicas | Autos Clásicos y Youngtimers en Argentina";
const DESCRIPCION =
  "El marketplace especializado en autos clásicos y youngtimers en Argentina. Publicá gratis y contactá directo con el vendedor por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: { default: TITULO, template: "%s | Las Clásicas" },
  description: DESCRIPCION,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: NOMBRE_SITIO,
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Las Clásicas" }],
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRIPCION, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0F1117",
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

  // Mensajes sin leer, para el contador del menú
  let noLeidos = 0;
  if (user) {
    const { count } = await supabase
      .from("mensajes")
      .select("id", { count: "exact", head: true })
      .eq("destinatario_id", user.id)
      .eq("leido", false);
    noLeidos = count ?? 0;
  }

  return (
    <html lang="es">
      <body className="bg-background text-white min-h-screen">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0F1117]/90 backdrop-blur px-4">
          <NavLinks userEmail={user?.email ?? null} noLeidos={noLeidos} />
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
