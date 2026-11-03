import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EnviarMensajeForm from "@/components/EnviarMensajeForm";
import MarcarLeidos from "@/components/MarcarLeidos";
import { enlaceWhatsApp, nombreVisible, tituloAnuncio } from "@/lib/sitio";

export const metadata: Metadata = { title: "Mensajes", robots: { index: false } };
export const revalidate = 0;

type Persona = { id: string; nombre: string | null; telefono: string | null } | null;

type Mensaje = {
  id: string;
  contenido: string;
  leido: boolean | null;
  created_at: string | null;
  sent_at: string | null;
  remitente_id: string;
  destinatario_id: string;
  anuncio_id: string | null;
  anuncios: {
    id: string;
    titulo: string | null;
    anio: number | null;
    marcas: { nombre: string | null } | null;
    modelos: { nombre: string | null } | null;
  } | null;
  remitente: Persona;
  destinatario: Persona;
};

type Conversacion = {
  clave: string;
  anuncio: Mensaje["anuncios"];
  otroId: string;
  otro: Persona;
  mensajes: Mensaje[];
  ultima: string;
  sinLeer: number;
};

function fecha(m: Mensaje): string {
  const valor = m.created_at ?? m.sent_at;
  if (!valor) return "";
  return new Date(valor).toLocaleString("es-AR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

export default async function MensajesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("mensajes")
    .select(`
      id, contenido, leido, created_at, sent_at, remitente_id, destinatario_id, anuncio_id,
      anuncios ( id, titulo, anio, marcas ( nombre ), modelos ( nombre ) ),
      remitente:profiles!remitente_id ( id, nombre, telefono ),
      destinatario:profiles!destinatario_id ( id, nombre, telefono )
    `)
    .or(`remitente_id.eq.${user.id},destinatario_id.eq.${user.id}`)
    .order("created_at", { ascending: true });

  const mensajes = (data ?? []) as unknown as Mensaje[];

  // Una conversación = un anuncio + la otra persona
  const porClave = new Map<string, Conversacion>();
  for (const m of mensajes) {
    const soyRemitente = m.remitente_id === user.id;
    const otroId = soyRemitente ? m.destinatario_id : m.remitente_id;
    const clave = `${m.anuncio_id ?? "general"}:${otroId}`;
    const conv =
      porClave.get(clave) ??
      ({
        clave,
        anuncio: m.anuncios,
        otroId,
        otro: soyRemitente ? m.destinatario : m.remitente,
        mensajes: [],
        ultima: "",
        sinLeer: 0,
      } as Conversacion);
    conv.mensajes.push(m);
    conv.ultima = m.created_at ?? m.sent_at ?? conv.ultima;
    if (!soyRemitente && !m.leido) conv.sinLeer++;
    porClave.set(clave, conv);
  }
  const conversaciones = Array.from(porClave.values()).sort((a, b) =>
    b.sinLeer - a.sinLeer || (b.ultima > a.ultima ? 1 : -1)
  );
  const idsSinLeer = mensajes.filter((m) => m.destinatario_id === user.id && !m.leido).map((m) => m.id);

  return (
    <main className="min-h-screen bg-[#0F1117] text-white">
      <MarcarLeidos ids={idsSinLeer} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-2">Mensajes</h1>
        <p className="text-white/40 text-sm mb-8">
          Las consultas que recibís por tus anuncios y las que enviaste a otros vendedores.
        </p>

        {conversaciones.length === 0 && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
            <p className="text-white/60 mb-4">Todavía no tenés mensajes.</p>
            <Link href="/anuncios" className="text-[#D4A847] text-sm hover:underline">
              Ver anuncios →
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {conversaciones.map((conv) => {
            const nombreOtro = nombreVisible(conv.otro?.nombre) ?? "Usuario de Las Clásicas";
            const titulo = conv.anuncio ? tituloAnuncio(conv.anuncio) : "Consulta general";
            const whatsapp = enlaceWhatsApp(
              conv.otro?.telefono,
              `Hola, te escribo por tu mensaje en Las Clásicas${conv.anuncio ? ` sobre "${titulo}"` : ""}.`
            );
            return (
              <section key={conv.clave} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <header className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    {conv.anuncio ? (
                      <Link href={`/anuncios/${conv.anuncio.id}`} className="font-semibold text-white hover:text-[#D4A847] transition-colors">
                        {titulo}
                      </Link>
                    ) : (
                      <p className="font-semibold text-white">{titulo}</p>
                    )}
                    <p className="text-white/40 text-xs">con {nombreOtro}</p>
                  </div>
                  {conv.sinLeer > 0 && (
                    <span className="text-xs font-bold bg-[#D4A847] text-black px-2 py-1 rounded-full">
                      {conv.sinLeer === 1 ? "1 nuevo" : `${conv.sinLeer} nuevos`}
                    </span>
                  )}
                </header>

                <div className="px-5 py-4 space-y-3">
                  {conv.mensajes.map((m) => {
                    const mio = m.remitente_id === user.id;
                    const nuevo = !mio && !m.leido;
                    return (
                      <div key={m.id} className={`flex ${mio ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                            mio ? "bg-[#D4A847]/15 border border-[#D4A847]/30" : "bg-black/40 border border-white/10"
                          } ${nuevo ? "ring-1 ring-[#D4A847]" : ""}`}
                        >
                          <p className="text-white/85 whitespace-pre-line">{m.contenido}</p>
                          <p className="text-white/30 text-[11px] mt-1">
                            {mio ? "Vos" : nombreOtro} · {fecha(m)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-5 pb-5">
                  <EnviarMensajeForm
                    anuncioId={conv.anuncio?.id ?? null}
                    destinatarioId={conv.otroId}
                    placeholder="Escribí tu respuesta..."
                    textoBoton="Responder"
                  />
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-center text-sm text-[#25D366] hover:underline"
                    >
                      Responder por WhatsApp
                    </a>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
