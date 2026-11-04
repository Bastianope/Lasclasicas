import Link from "next/link";
import type { Articulo } from "@/lib/contenido";

// Tarjeta tipográfica para guías y lugares (sin foto).
export default function TarjetaArticulo({
  articulo,
  href,
  destacada = false,
}: {
  articulo: Articulo;
  href: string;
  destacada?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all h-full ${
        destacada
          ? "bg-gradient-to-br from-[#D4A847]/25 via-[#D4A847]/10 to-transparent border-[#D4A847]/40 hover:border-[#D4A847]"
          : "bg-white/5 border-white/10 hover:border-[#D4A847]"
      }`}
    >
      <div>
        <p className="text-[#D4A847] text-[11px] font-bold tracking-widest uppercase mb-3">{articulo.kicker}</p>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4A847] transition-colors">{articulo.titulo}</h3>
        <p className="text-white/55 text-sm leading-relaxed line-clamp-4">{articulo.resumen}</p>
      </div>
      <span className="mt-6 text-sm text-[#D4A847] font-medium">
        {articulo.mapa ? "Conocer el lugar →" : "Leer la guía →"}
      </span>
    </Link>
  );
}
