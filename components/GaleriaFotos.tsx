"use client";

import { useState } from "react";

type Imagen = { id: string; url: string };

export default function GaleriaFotos({ imagenes, alt }: { imagenes: Imagen[]; alt: string }) {
  const [actual, setActual] = useState(0);
  const total = imagenes.length;

  if (total === 0) {
    return (
      <div className="aspect-[16/9] bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 text-white/30 text-sm">
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path d="M3 7h3l2-3h8l2 3h3v13H3z" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        Sin fotos todavía
      </div>
    );
  }

  const ir = (i: number) => setActual((i + total) % total);
  const flecha =
    "absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white text-2xl leading-none flex items-center justify-center hover:bg-black/80 transition-colors";

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/10">
        <img src={imagenes[actual].url} alt={alt} className="w-full h-full object-contain" />
        {total > 1 && (
          <>
            <button type="button" onClick={() => ir(actual - 1)} aria-label="Foto anterior" className={`${flecha} left-3`}>
              ‹
            </button>
            <button type="button" onClick={() => ir(actual + 1)} aria-label="Foto siguiente" className={`${flecha} right-3`}>
              ›
            </button>
            <span className="absolute bottom-3 right-3 text-xs bg-black/60 text-white/80 px-2 py-1 rounded-full">
              {actual + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imagenes.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActual(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`w-24 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                i === actual ? "border-accent" : "border-white/10 hover:border-white/40"
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
