import Link from "next/link";
import FavoritoButton from "@/components/FavoritoButton";
import { tituloAnuncio } from "@/lib/sitio";

// Tarjeta de anuncio reutilizable (guías de modelo, listados).
export default function TarjetaAnuncio({ anuncio }: { anuncio: any }) {
  const imgs = [...(anuncio.anuncio_imagenes ?? [])].sort((a: any, b: any) => (a.orden ?? 0) - (b.orden ?? 0));
  const img = imgs.find((i: any) => i.es_principal) || imgs[0];
  const lugar = [anuncio.ciudad, anuncio.provincia].filter(Boolean).join(", ");

  return (
    <div className="relative">
      <Link
        href={`/anuncios/${anuncio.id}`}
        className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4A847] transition-all block"
      >
        <div className="aspect-[4/3] overflow-hidden bg-white/5">
          {img ? (
            <img src={img.url} alt={anuncio.titulo || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/25 text-sm">Sin fotos todavía</div>
          )}
        </div>
        <div className="p-4">
          <p className="text-white/40 text-xs mb-1">
            {(anuncio.marcas as any)?.nombre} · {anuncio.anio}
          </p>
          <h3 className="font-semibold text-white text-sm mb-3 line-clamp-2">{tituloAnuncio(anuncio)}</h3>
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-[#D4A847]">
              {anuncio.moneda} {Number(anuncio.precio).toLocaleString("es-AR")}
            </span>
            {lugar && <span className="text-xs text-white/30 truncate">{lugar}</span>}
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3">
        <FavoritoButton anuncioId={anuncio.id} />
      </div>
    </div>
  );
}
