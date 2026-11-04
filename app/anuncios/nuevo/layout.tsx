import type { Metadata } from "next";

export const metadata: Metadata = { title: "Publicar anuncio", robots: { index: false } };

export default function NuevoAnuncioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
