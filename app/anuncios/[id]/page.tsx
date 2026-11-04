import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EnviarMensajeForm from '@/components/EnviarMensajeForm'
import FavoritoButton from '@/components/FavoritoButton'
import GaleriaFotos from '@/components/GaleriaFotos'
import { etiquetaCategoria, type FilaCategoria } from '@/lib/categorias'
import {
  URL_SITIO,
  enlaceWhatsApp,
  imagenParaCompartir,
  nombreVisible,
  precioAnuncio,
  primeraMayuscula,
  tituloAnuncio,
} from '@/lib/sitio'

export const revalidate = 0

interface Props {
  params: { id: string }
}

// Compartida entre la página y sus metadatos: una sola consulta por visita.
const obtenerAnuncio = cache(async (id: string) => {
  const supabase = createClient()
  const { data } = await supabase
    .from('anuncios')
    .select(`
      *,
      marcas(nombre, logo_url),
      modelos(nombre, carroceria),
      anuncio_imagenes(id, url, es_principal, orden),
      profiles(nombre, telefono, provincia, created_at)
    `)
    .eq('id', id)
    .maybeSingle()
  return data
})

// Foto principal primero, después el orden elegido por el vendedor.
function ordenarImagenes(anuncio: any): { id: string; url: string }[] {
  const imgs = [...(anuncio.anuncio_imagenes ?? [])].sort((a: any, b: any) => (a.orden ?? 0) - (b.orden ?? 0))
  const i = imgs.findIndex((x: any) => x.es_principal)
  if (i > 0) imgs.unshift(imgs.splice(i, 1)[0])
  return imgs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const anuncio = await obtenerAnuncio(params.id)
  if (!anuncio) return { title: 'Anuncio no disponible', robots: { index: false } }

  const titulo = tituloAnuncio(anuncio as any)
  const precio = precioAnuncio(anuncio.moneda, anuncio.precio)
  const lugar = [anuncio.ciudad, anuncio.provincia].filter(Boolean).join(', ')
  const km = anuncio.kilometraje ? `${Number(anuncio.kilometraje).toLocaleString('es-AR')} km. ` : ''
  const descripcion = `${titulo} en venta${lugar ? ` en ${lugar}` : ''}. ${km}Contacto directo con el vendedor en Las Clásicas.`
  const foto = ordenarImagenes(anuncio)[0]?.url
  const imagen = foto ? imagenParaCompartir(foto) : '/og.jpg'
  const tituloCompleto = precio ? `${titulo} · ${precio}` : titulo

  return {
    title: tituloCompleto,
    description: descripcion,
    alternates: { canonical: `/anuncios/${anuncio.id}` },
    openGraph: {
      title: tituloCompleto,
      description: descripcion,
      url: `/anuncios/${anuncio.id}`,
      images: [{ url: imagen, width: 1200, alt: titulo }],
    },
    twitter: { card: 'summary_large_image', title: tituloCompleto, description: descripcion, images: [imagen] },
  }
}

const etiqueta = 'px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium'
const tarjeta = 'bg-white/5 rounded-2xl border border-white/10 p-6'
const botonWhatsApp =
  'w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1DB954] transition-colors'

function IconoWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.847L0 24l6.337-1.507A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.384l-.36-.214-3.732.888.924-3.634-.235-.373A9.818 9.818 0 1112 21.818z" />
    </svg>
  )
}

export default async function AnuncioDetallePage({ params }: Props) {
  const anuncio = await obtenerAnuncio(params.id)
  if (!anuncio) notFound()

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Carrocería elegida por el vendedor (tabla categorias) o la del modelo
  let carroceria: string | null = (anuncio.modelos as any)?.carroceria ?? null
  if (anuncio.categoria_id) {
    const { data: cat } = await supabase.from('categorias').select('*').eq('id', anuncio.categoria_id).maybeSingle()
    if (cat) carroceria = etiquetaCategoria(cat as FilaCategoria) || carroceria
  }

  const imagenes = ordenarImagenes(anuncio)
  const titulo = tituloAnuncio(anuncio as any)
  const vendedor = anuncio.profiles as any
  const nombreVendedor = nombreVisible(vendedor?.nombre)
  const esPropio = !!user && user.id === anuncio.vendedor_id
  const whatsappUrl = enlaceWhatsApp(
    anuncio.whatsapp || vendedor?.telefono,
    `Hola, vi tu anuncio "${titulo}" en Las Clásicas (${URL_SITIO}/anuncios/${anuncio.id}). ¿Sigue disponible?`
  )
  const lugar = [anuncio.ciudad, anuncio.provincia].filter(Boolean).join(', ')
  const km = anuncio.kilometraje ? `${Number(anuncio.kilometraje).toLocaleString('es-AR')} km` : null

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/anuncios" className="inline-block mb-6 text-sm text-white/50 hover:text-[#D4A847] transition-colors">
          ← Volver a anuncios
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* COLONNE GAUCHE — Photos + Infos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <GaleriaFotos imagenes={imagenes} alt={titulo} />
              <div className="absolute top-3 right-3">
                <FavoritoButton anuncioId={anuncio.id} />
              </div>
            </div>

            {/* TITRE + PRIX */}
            <div className={tarjeta}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-white/50 text-sm mb-1">
                    {[(anuncio.marcas as any)?.nombre, (anuncio.modelos as any)?.nombre, anuncio.anio].filter(Boolean).join(' · ')}
                  </p>
                  <h1 className="text-2xl font-bold text-white leading-tight">{titulo}</h1>
                </div>
                <div className="sm:text-right shrink-0">
                  <p className="text-xs text-white/40 mb-1">{anuncio.moneda}</p>
                  <p className="text-3xl font-bold text-[#D4A847]">
                    {Number(anuncio.precio).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {anuncio.anio && <span className={etiqueta}>📅 {anuncio.anio}</span>}
                {km && <span className={etiqueta}>🛣️ {km}</span>}
                {anuncio.condicion && <span className={`${etiqueta} capitalize`}>✨ {anuncio.condicion}</span>}
                {lugar && <span className={etiqueta}>📍 {lugar}</span>}
                {carroceria && <span className={`${etiqueta} capitalize`}>🚘 {carroceria}</span>}
              </div>

              {/* En el celular el contacto queda arriba, sin tener que bajar */}
              {whatsappUrl && !esPropio && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${botonWhatsApp} lg:hidden mt-5`}>
                  <IconoWhatsApp />
                  Contactar por WhatsApp
                </a>
              )}
            </div>

            {anuncio.descripcion && (
              <div className={tarjeta}>
                <h2 className="font-semibold text-white mb-4">Descripción</h2>
                <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm">{anuncio.descripcion}</p>
              </div>
            )}
          </div>

          {/* COLONNE DROITE — Vendeur + Contact */}
          <div className="space-y-4">
            <div className={tarjeta}>
              {esPropio ? (
                <>
                  <h2 className="font-semibold text-white mb-2">Es tu anuncio</h2>
                  <p className="text-white/50 text-sm mb-5">
                    {whatsappUrl
                      ? 'Los interesados te contactan por WhatsApp o por mensaje en Las Clásicas.'
                      : 'Agregá un número de WhatsApp para que los interesados te contacten más rápido.'}
                  </p>
                  <Link
                    href={`/anuncios/${anuncio.id}/editar`}
                    className="w-full block text-center bg-[#D4A847] text-black py-3 rounded-xl font-bold hover:bg-[#C49B35] transition-colors mb-3"
                  >
                    Editar anuncio
                  </Link>
                  <Link href="/mensajes" className="block text-center text-sm text-white/60 hover:text-[#D4A847] transition-colors">
                    Ver mis mensajes →
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="font-semibold text-white mb-4">Vendedor</h2>
                  {anuncio.vendedor_id && (
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-full bg-[#D4A847]/20 flex items-center justify-center text-[#D4A847] font-bold text-lg">
                        {nombreVendedor?.[0]?.toUpperCase() || '?'}
                      </div>
                      <Link href={`/vendedor/${anuncio.vendedor_id}`} className="hover:opacity-80 transition-opacity">
                        <p className="font-semibold text-white hover:text-[#D4A847] transition-colors">
                          {nombreVendedor || 'Vendedor particular'}
                        </p>
                        <p className="text-xs text-white/40">{vendedor?.provincia || 'Ver sus anuncios'}</p>
                      </Link>
                    </div>
                  )}

                  {whatsappUrl && (
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={botonWhatsApp}>
                      <IconoWhatsApp />
                      Contactar por WhatsApp
                    </a>
                  )}

                  {anuncio.vendedor_id ? (
                    <div className={whatsappUrl ? 'mt-5 pt-5 border-t border-white/10' : ''}>
                      <p className="text-white/50 text-xs mb-1">
                        {whatsappUrl ? 'O dejale un mensaje en Las Clásicas' : 'Escribile al vendedor'}
                      </p>
                      <EnviarMensajeForm anuncioId={anuncio.id} destinatarioId={anuncio.vendedor_id} />
                    </div>
                  ) : (
                    !whatsappUrl && <p className="text-white/40 text-sm">El contacto de este anuncio no está disponible.</p>
                  )}
                </>
              )}
            </div>

            <div className={`${tarjeta} space-y-3`}>
              <h2 className="font-semibold text-white mb-4">Detalles</h2>
              {[
                { label: 'Marca', value: (anuncio.marcas as any)?.nombre },
                { label: 'Modelo', value: (anuncio.modelos as any)?.nombre },
                { label: 'Año', value: anuncio.anio },
                { label: 'Kilómetros', value: km },
                { label: 'Estado', value: primeraMayuscula(anuncio.condicion) },
                { label: 'Carrocería', value: primeraMayuscula(carroceria) },
                { label: 'Ubicación', value: lugar },
              ]
                .filter((r) => r.value)
                .map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 text-sm">
                    <span className="text-white/40">{row.label}</span>
                    <span className="text-white font-medium text-right">{row.value}</span>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
