// Contenido editorial del sitio: guías de modelos, guías prácticas y lugares míticos.
// Cada dato sale de las fuentes citadas al pie de cada artículo.

export type Cifra = { valor: string; etiqueta: string };
export type Hito = { anio: string; texto: string };
export type Seccion =
  | { tipo: "texto"; titulo: string; parrafos: string[] }
  | { tipo: "lista"; titulo: string; items: string[] }
  | { tipo: "linea"; titulo: string; hitos: Hito[] };
export type Fuente = { titulo: string; url: string };

export type Articulo = {
  slug: string;
  titulo: string;
  kicker: string;
  resumen: string;
  descripcionSeo: string;
  cifras?: Cifra[];
  secciones: Seccion[];
  fuentes: Fuente[];
  aviso?: string;
  // Guías de modelo: para mostrar los anuncios en venta de ese modelo
  modelo?: { marca: string; modelos: string[] };
  // Lugares: mapa de OpenStreetMap
  mapa?: { lat: number; lon: number; delta: number };
};

export const GUIAS: Articulo[] = [
  {
    slug: "ford-falcon",
    titulo: "Ford Falcon",
    kicker: "Guía de modelo · 1962–1991",
    resumen:
      "Fabricado durante casi treinta años en General Pacheco, el Falcon fue auto de familia, taxi, rural, pick-up y leyenda del Turismo Carretera.",
    descripcionSeo:
      "Ford Falcon argentino (1962–1991): historia, versiones Futura, Sprint, Rural y Ghia, motores y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1962–1991", etiqueta: "años de producción" },
      { valor: "494.209", etiqueta: "unidades fabricadas" },
      { valor: "General Pacheco", etiqueta: "planta de Ford Argentina" },
      { valor: "6 cilindros", etiqueta: "en línea, de 2,8 a 3,6 litros" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "El Falcon llegó a la Argentina en 1962, derivado del Ford Falcon norteamericano de 1960. Mientras en Estados Unidos el modelo se renovaba, Ford Argentina lo siguió fabricando y actualizando: seis restyling entre 1963 y los años ochenta, hasta que la producción terminó en 1991.",
          "Su mecánica simple y robusta lo convirtió en el auto de trabajo y de familia por excelencia, y también en un protagonista del Turismo Carretera, donde todavía corre.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones",
        items: [
          "Standard y De Luxe (1962): las primeras, solo sedán.",
          "Futura (1965): techo vinílico y butacas individuales. Con el último restyling pasó a llamarse Ghia.",
          "Rural (1967): la versión familiar.",
          "Sprint (1973): la deportiva, con el motor 221 SP.",
          "Ranchero (1973): la pick-up.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "170 (2,8 l, 6 cilindros): el motor original de 1962.",
          "187 (3,1 l): llegó con el Futura en 1965.",
          "188 (3,1 l) y 221 (3,6 l): desde 1970, los más difundidos.",
          "2,3 l de 4 cilindros (desde 1983) y diésel de 2,4 l (desde 1988), en los últimos años.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido en zócalos, piso, fondo del baúl y bajos de los guardabarros: es lo más caro de reparar.",
          "Tren delantero y dirección: bujes, rótulas y juego en la caja de dirección.",
          "Originalidad de las versiones buscadas (Sprint, Futura, Ghia): hay muchas réplicas. Compará los números de chasis y motor con los papeles.",
          "Documentación: título y cédula a nombre del vendedor, con números que coincidan con el auto.",
          "La mecánica de 6 cilindros es noble y los repuestos abundan: un motor cansado se resuelve más fácil que una carrocería podrida.",
        ],
      },
    ],
    fuentes: [{ titulo: "Wikipedia — Ford Falcon (Argentina)", url: "https://en.wikipedia.org/wiki/Ford_Falcon_(Argentina)" }],
    modelo: { marca: "Ford", modelos: ["Falcon", "Falcon Rural", "Falcon Sprint"] },
  },
  {
    slug: "ika-torino",
    titulo: "IKA Torino",
    kicker: "Guía de modelo · 1966–1982",
    resumen:
      "Nacido en Córdoba sobre la base del Rambler American y retocado por Pininfarina, el Torino es el gran deportivo nacional: el auto de la «Misión Argentina» de Fangio en Nürburgring.",
    descripcionSeo:
      "IKA Torino (1966–1982): historia, la hazaña de las 84 Horas de Nürburgring, versiones 380W, TS, ZX y GS, motores y qué revisar antes de comprar.",
    cifras: [
      { valor: "1966–1982", etiqueta: "años de producción" },
      { valor: "99.792", etiqueta: "unidades fabricadas" },
      { valor: "Santa Isabel", etiqueta: "planta en Córdoba" },
      { valor: "334", etiqueta: "vueltas en las 84 Horas de Nürburgring (1969)" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Industrias Kaiser Argentina (IKA) presentó el Torino el 30 de noviembre de 1966 en el Autódromo de Buenos Aires. Partía de dos Rambler American de 1965 enviados a Pininfarina, que rediseñó sus líneas. Se fabricó en Santa Isabel, Córdoba, primero por IKA y después por Renault Argentina, hasta comienzos de los años ochenta.",
          "Su leyenda nació en 1969 en el Marathon de la Route, las 84 Horas de Nürburgring. La «Misión Argentina», encabezada por Juan Manuel Fangio y con Oreste Berta en lo técnico, llevó tres Torino 380W preparados. El número 3, de Eduardo Copello, Alberto Rodríguez Larreta y Oscar Mauricio Franco, fue el que más vueltas completó (334), pero las penalizaciones le quitaron la victoria: un Torino terminó cuarto en la clasificación final.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones",
        items: [
          "300 y 380 (desde 1966): coupé y sedán; la «S» designa la de cuatro puertas.",
          "380W: la deportiva, con 176 CV, base de los autos de Nürburgring.",
          "TS, SE, GR, TSX y ZX: las versiones de los años setenta, con el motor Torino 233 de 7 bancadas.",
          "GS200: el primer auto argentino en superar los 200 km/h (203 km/h).",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "Tornado de 6 cilindros en línea: 3,0 l (300) y 3,8 l (380), con 4 bancadas, de 120 a 185 CV.",
          "Torino 233 (3,8 l, 7 bancadas): de 170 a 215 CV según la versión.",
          "Caja ZF de 4 marchas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido en zócalos, piso, fondo del baúl y contornos de parabrisas y luneta.",
          "Originalidad: las versiones más cotizadas (380W, TS, ZX, GS) se copian mucho. Verificá números de chasis y motor, y pedí el historial.",
          "Motor: revisá temperatura, pérdidas de aceite y humo; el 7 bancadas tiene fama de ser el más robusto.",
          "Caja ZF: probá que entren todas las marchas sin ruidos.",
          "Antes de comprar una versión especial, averiguá qué piezas específicas le faltan: suelen ser las más difíciles de conseguir.",
        ],
      },
    ],
    fuentes: [{ titulo: "Wikipedia — IKA-Renault Torino", url: "https://en.wikipedia.org/wiki/IKA-Renault_Torino" }],
    modelo: { marca: "IKA", modelos: ["Torino", "Torino GS", "Torino TS", "Torino ZX"] },
  },
  {
    slug: "fiat-600",
    titulo: "Fiat 600",
    kicker: "Guía de modelo · 1960–1982",
    resumen:
      "El «Fitito» motorizó a la Argentina: chico, barato y gasolero, fue el primer auto de miles de familias. Se fabricó en Caseros durante 22 años.",
    descripcionSeo:
      "Fiat 600 argentino, el Fitito (1960–1982): historia, versiones y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1960–1982", etiqueta: "años de producción" },
      { valor: "+294.000", etiqueta: "unidades fabricadas en el país" },
      { valor: "Caseros", etiqueta: "planta de Fiat" },
      { valor: "Motor trasero", etiqueta: "de 4 cilindros" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en el Salón de Ginebra de 1955, el Fiat 600 empezó a fabricarse en la Argentina en 1960, en la planta de Caseros, al amparo del régimen de promoción de la industria automotriz de esos años. La primera unidad nacional salió de la línea ese mismo año, pintada de gris claro.",
          "Hasta 1982 se fabricaron poco más de 294.000 unidades, y durante décadas fue el Fiat más vendido del país. Le dicen «Fitito», y también «Bolita» por sus formas redondeadas. Desde 2023 tiene su propio museo: el Museo del Fitito, en Tres de Febrero.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones",
        items: ["600, 600 D, 600 E, 600 R y 600 S: veintidós años de evolución en motor y terminaciones."],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido en piso, zócalos y frente: con tantos años, la carrocería es lo primero que hay que mirar.",
          "Refrigeración: el motor y el radiador van atrás. Revisá que no recaliente en el tránsito.",
          "Tren delantero: la ballesta transversal y los bujes se gastan con los años.",
          "Originalidad: muchos fueron preparados o modificados; un 600 original y completo vale más.",
          "Los repuestos son abundantes y baratos: es uno de los clásicos más fáciles de mantener.",
        ],
      },
    ],
    fuentes: [
      {
        titulo: "El Cronista — El origen del Fitito (2024)",
        url: "https://www.cronista.com/apertura/empresas/el-origen-del-fitito-el-auto-de-culto-que-marco-un-record-y-enamoro-a-los-argentinos",
      },
    ],
    modelo: { marca: "Fiat", modelos: ["600"] },
  },
  {
    slug: "seguros-para-clasicos",
    titulo: "Cómo asegurar un auto clásico",
    kicker: "Guía práctica",
    resumen:
      "Varias aseguradoras argentinas tienen planes pensados para clásicos y autos de colección, con coberturas adaptadas a un uso ocasional.",
    descripcionSeo:
      "Seguros para autos clásicos y de colección en Argentina: cómo funcionan, qué compañías tienen planes específicos y qué preguntar antes de contratar.",
    secciones: [
      {
        tipo: "lista",
        titulo: "Cómo funcionan",
        items: [
          "Están pensados para un uso limitado: cubren el auto en salidas, exposiciones, encuentros y competencias, más que en el uso diario.",
          "La cobertura va asociada al vehículo, no a un conductor.",
          "Algunos planes incluyen una inspección del auto por especialistas antes de emitir la póliza.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Planes para clásicos en el mercado",
        items: [
          "El Comercio Seguros — Plan Autos Clásicos: para autos de más de 25 años. Responsabilidad civil, robo, incendio y destrucción total, con asistencia en el Mercosur y Chile.",
          "Seguro Clásico: especialista en clásicos, antiguos y de colección, con coberturas desde responsabilidad civil hasta todo riesgo.",
          "Swiss Medical Seguros — Plan Auto Clásico: responsabilidad civil, terceros y cobertura de incendio o robo en el garage, con inspección por especialistas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Antes de contratar",
        items: [
          "Preguntá cómo se fija el valor del auto en caso de siniestro y si aceptan una tasación.",
          "Revisá qué usos quedan cubiertos (traslados, encuentros, rallies de regularidad) y si hay límites.",
          "Tené a mano título, cédula y fotos actuales del auto.",
        ],
      },
    ],
    aviso:
      "Información orientativa recopilada de fuentes públicas. Las condiciones cambian: consultá siempre las coberturas directamente con cada aseguradora.",
    fuentes: [
      {
        titulo: "ComparaEnCasa — Compañías que aseguran autos de colección (actualizado en septiembre de 2026)",
        url: "https://www.comparaencasa.com/seguros-de-auto/companias-aseguran-autos-de-coleccion/",
      },
    ],
  },
];

export const LUGARES: Articulo[] = [
  {
    slug: "potrero-de-los-funes",
    titulo: "Circuito de Potrero de los Funes",
    kicker: "Lugares míticos · San Luis",
    resumen:
      "Un circuito que daba la vuelta completa a un lago entre las sierras de San Luis. Recibió al mundial de GT y a las grandes categorías argentinas y, aunque hoy está desarmado, los clásicos siguen largando desde sus boxes.",
    descripcionSeo:
      "Historia del circuito de Potrero de los Funes (San Luis): FIA GT, TC2000, Turismo Carretera, su desarme en 2024 y el Rally de la Montaña para autos clásicos.",
    cifras: [
      { valor: "6,27 km", etiqueta: "de trazado (2008–2018)" },
      { valor: "3", etiqueta: "visitas del campeonato FIA GT" },
      { valor: "2:14.173", etiqueta: "récord de vuelta (Corvette C6.R, 2011)" },
      { valor: "940 m", etiqueta: "de altura" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Una pista alrededor del lago",
        parrafos: [
          "El circuito rodeaba por completo el embalse de Potrero de los Funes, a unos 20 km de la ciudad de San Luis. La costanera se convertía en pista: curvas encadenadas, subidas, bajadas y las sierras como tribuna natural. Por su diseño y su paisaje llegó a ser considerado uno de los circuitos más lindos del país.",
        ],
      },
      {
        tipo: "linea",
        titulo: "Historia",
        hitos: [
          { anio: "1978", texto: "Se inaugura el primer trazado, de 6,2 km, con fechas de Turismo Carretera y Turismo Nacional." },
          { anio: "1987", texto: "En agosto, después de una fecha de Turismo Carretera marcada por accidentes graves, el circuito queda abandonado." },
          {
            anio: "2008",
            texto:
              "Reabre en noviembre, renovado y llevado a 6,27 km. Recibe al Campeonato FIA GT: los belgas Bert Longin y Anthony Kumpen ganan las 2 Horas de San Luis con un Saleen S7R. En TC2000 gana José María López.",
          },
          { anio: "2009", texto: "Llegan el Turismo Carretera y el Gran Premio Coronación del TC2000." },
          {
            anio: "2010–2011",
            texto:
              "Vuelve el mundial FIA GT1. En 2011, Yelmer Buurman marca el récord del trazado: 2:14.173 con un Chevrolet Corvette C6.R.",
          },
          { anio: "2013–2018", texto: "Top Race V6, Súper TC2000 y Turismo Nacional. La última carrera se corre en 2018." },
          { anio: "2024", texto: "En febrero, después de años sin uso, empieza el desarme del circuito." },
        ],
      },
      {
        tipo: "texto",
        titulo: "Los clásicos siguen pasando",
        parrafos: [
          "Aunque ya no hay carreras, Potrero de los Funes sigue en el mapa de los autos clásicos. El Rally de la Montaña, una prueba de regularidad para clásicos organizada por el Club de Autos Clásicos 5C y Claramunt Garage, larga desde los boxes del viejo circuito. Su 14ª edición, en septiembre de 2024, reunió a 47 tripulaciones en un recorrido por rutas de San Luis y Córdoba.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Encuentros de clásicos en San Luis",
        items: [
          "Rally de la Montaña (septiembre): regularidad para clásicos con largada en los boxes del circuito, organizado por el Club de Autos Clásicos 5C y Claramunt Garage.",
          "Encuentro de Clásicos de La Punta (octubre): su 5ª edición, el 17 de octubre de 2026, convocó a unos 200 autos y motos clásicos de San Luis, Córdoba, Mendoza y Buenos Aires, con entrada libre, patio gastronómico y feria de emprendedores.",
          "Caravana de clásicos desde Juana Koslay (septiembre): su 2ª edición, en 2024, convocó a unos 220 vehículos en un recorrido de 90 km por el dique San Roque, Potrero de los Funes y El Trapiche.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Cómo llegar",
        items: [
          "Potrero de los Funes está a unos 20 km de la ciudad de San Luis; se llega por la Avenida del Circuito.",
          "El pueblo está a unos 940 m de altura, junto al embalse que el circuito rodeaba.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Wikipedia — Potrero de los Funes Circuit", url: "https://en.wikipedia.org/wiki/Potrero_de_los_Funes_Circuit" },
      { titulo: "Motor Sport Magazine — San Luis", url: "https://www.motorsportmagazine.com/database/circuits/san-luis/" },
      {
        titulo: "Billiken — Potrero de los Funes, el pueblo que convivió con un circuito",
        url: "https://billiken.lat/mi-pais/potrero-de-los-funes-el-pueblo-de-argentina-que-convivio-con-un-circuito-de-carreras/",
      },
      {
        titulo: "Vía País — 14° Rally de la Montaña",
        url: "https://viapais.com.ar/san-luis/1250846-este-jueves-empieza-el-14o-rally-de-la-montana-en-potrero-de-los-funes/",
      },
      { titulo: "Argentina.travel — Circuito callejero de Potrero de los Funes", url: "https://www.argentina.travel/actividades/circuito-callejero-de-potrero-de-los-funes" },
      {
        titulo: "Agencia de Noticias San Luis — 5ª edición del encuentro de autos y motos clásicos de La Punta (2026)",
        url: "https://agenciasanluis.com/2026/10/16/1221236-la-punta-invita-a-vivir-la-quinta-edicion-del-gran-encuentro-de-autos-y-motos-clasicos/",
      },
      {
        titulo: "Radio Popular San Luis — Vuelven los autos clásicos a San Luis (2024)",
        url: "https://www.radiopopularsanluis.com.ar/provincia/vuelven-los-autos-clasicos-a-san-luis.htm",
      },
    ],
    mapa: { lat: -33.2303, lon: -66.2325, delta: 0.035 },
  },
];

export const guiaPorSlug = (slug: string) => GUIAS.find((g) => g.slug === slug);
export const lugarPorSlug = (slug: string) => LUGARES.find((l) => l.slug === slug);
