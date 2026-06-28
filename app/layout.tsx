import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Las Clásicas | Autos Clásicos y Youngtimers Argentina",
  description: "El marketplace especializado en autos clásicos y youngtimers en Argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
