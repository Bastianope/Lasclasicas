import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EnviarMensajeForm from '@/components/EnviarMensajeForm'

interface Props {
  params: { id: string }
}

export default async function AnuncioDetallePage({ params }: Props) {
  const supabase = await createClient()

  const { data: anuncio } = await supabase
    .from('anuncios')
    .select(`
      *,
      marcas(nombre, logo_url),
      modelos(nombre, carroceria),
      anuncio_imagenes(id, url, es_principal, orden),
      profiles(nombre, telefono, provincia, created_at)
    `)
    .eq('id', params.id)
    .single()

  if (!anuncio) notFound()

  const imagenes = anuncio.anuncio_imagenes
    ?.sort((a: any, b: any) => a.orden - b.orden) ?? []
  const imgPrincipal = imagenes.find((i: any) => i.es_principal) || imagenes[0]
const vendedor = anuncio.profiles as any
const whatsappUrl = vendedor?.telefono
  ? `https://wa.me/${vendedor.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(
      `Hola, vi tu anuncio de ${(anuncio.marcas as any)?.nombre} ${anuncio.anio} en Las Clásicas. ¿Sigue disponible?`
    )}`
  : null
  return (
    <main className="min-h-screen bg-[#0F1117] text-white">

      {/* NAV */}
      <nav className="border-b border-white/10 bg-[#0F1117]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#D4A847]">
            Las Clásicas
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/anuncios" className="text-sm text-white/60 hover:text-white transition-colors">
              ← Volver a anuncios
            </Link>
            <Link href="/anuncios/nuevo"
              className="bg-[#D4A847] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#C49B35] transition-colors">
              Publicar anuncio
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* COLONNE GAUCHE — Photos + Infos */}
          <div className="lg:col-span-2 space-y-6">

            {/* PHOTO PRINCIPALE */}
            <div className="aspect-[16/9] bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              {imgPrincipal ? (
                <img
                  src={imgPrincipal.url}
                  alt={anuncio.titulo || ''}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">
                  🚗
                </div>
              )}
            </div>

            {/* GALERIE MINIATURES */}
            {imagenes.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {imagenes.map((img: any) => (
                  <div key={img.id}
                    className="w-24 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-[#D4A847] transition-colors">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* TITRE + PRIX */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-white/50 text-sm mb-1">
                    {(anuncio.marcas as any)?.nombre} · {(anuncio.modelos as any)?.nombre} · {anuncio.anio}
                  </p>
                  <h1 className="text-2xl font-bold text-white leading-tight">
                    {anuncio.titulo || `${(anuncio.marcas as any)?.nombre} ${(anuncio.modelos as any)?.nombre} ${anuncio.anio}`}
                  </h1>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-white/40 mb-1">{anuncio.moneda}</p>
                  <p className="text-3xl font-bold text-[#D4A847]">
                    {Number(anuncio.precio).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2">
                {anuncio.anio && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                    📅 {anuncio.anio}
                  </span>
                )}
                {anuncio.kilometraje && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                    🛣️ {Number(anuncio.kilometraje).toLocaleString('es-AR')} km
                  </span>
                )}
                {anuncio.condicion && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium capitalize">
                    ✨ {anuncio.condicion}
                  </span>
                )}
                {anuncio.provincia && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                    📍 {anuncio.ciudad ? `${anuncio.ciudad}, ` : ''}{anuncio.provincia}
                  </span>
                )}
                {(anuncio.modelos as any)?.carroceria && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium capitalize">
                    🚘 {(anuncio.modelos as any).carroceria}
                  </span>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            {anuncio.descripcion && (
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h2 className="font-semibold text-white mb-4">Descripción</h2>
                <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm">
                  {anuncio.descripcion}
                </p>
              </div>
            )}
          </div>

          {/* COLONNE DROITE — Vendeur + Contact */}
          <div className="space-y-4">

            {/* CARTE VENDEUR */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h2 className="font-semibold text-white mb-4">Vendedor</h2>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold text-lg">
                  {(anuncio.profiles as any)?.nombre?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {(anuncio.profiles as any)?.nombre || 'Vendedor'}
                  </p>
                  <p className="text-xs text-white/40">
                    {(anuncio.profiles as any)?.provincia || ''}
                  </p>
                </div>
              </div>

              {/* BOUTON WHATSAPP */}

{whatsappUrl && (
  <a href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1DB954] transition-colors mb-3">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.847L0 24l6.337-1.507A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.384l-.36-.214-3.732.888.924-3.634-.235-.373A9.818 9.818 0 1112 21.818z"/>
    </svg>
    Contactar por WhatsApp
  </a>
)}

              <EnviarMensajeForm anuncioId={anuncio.id} destinatarioId={anuncio.vendedor_id} />
            </div>

            {/* INFOS RAPIDES */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-3">
              <h2 className="font-semibold text-white mb-4">Detalles</h2>
              {[
                { label: 'Marca', value: (anuncio.marcas as any)?.nombre },
                { label: 'Modelo', value: (anuncio.modelos as any)?.nombre },
                { label: 'Año', value: anuncio.anio },
                { label: 'Kilómetros', value: anuncio.kilometraje ? `${Number(anuncio.kilometraje).toLocaleString('es-AR')} km` : null },
                { label: 'Estado', value: anuncio.condicion },
                { label: 'Ubicación', value: anuncio.ciudad ? `${anuncio.ciudad}, ${anuncio.provincia}` : anuncio.provincia },
              ].filter(r => r.value).map(row => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-white/40">{row.label}</span>
                  <span className="text-white font-medium capitalize">{row.value}</span>
                </div>
              ))}
            </div>

            {/* SIGNALER */}
            <p className="text-center text-xs text-white/20 hover:text-white/40 cursor-pointer transition-colors">
              Reportar anuncio
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}