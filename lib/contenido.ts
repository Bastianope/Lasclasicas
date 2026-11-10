// Contenido editorial del sitio: guías de modelos, guías prácticas y lugares míticos.
// Cada dato sale de las fuentes citadas al pie de cada artículo.

export type Cifra = { valor: string; etiqueta: string };
export type Hito = { anio: string; texto: string };
// Imagen con licencia libre: se muestra siempre con autor, licencia y fuente.
export type Imagen = {
  src: string;
  alt: string;
  pie: string;
  autor: string;
  // Etiqueta del crédito: "Foto" por defecto, "Plano" para los dibujos
  etiqueta?: string;
  licencia: string;
  licenciaUrl: string;
  fuenteUrl: string;
  // Dimensiones del original: reservan el espacio antes de que cargue la imagen
  ancho?: number;
  alto?: number;
};

// Ficha con enlace externo (alojamientos, servicios...)
export type Ficha = { nombre: string; zona: string; texto: string; enlace?: { url: string; texto: string } };

export type Seccion =
  | { tipo: "fichas"; titulo: string; fichas: Ficha[]; nota?: string }
  | { tipo: "texto"; titulo: string; parrafos: string[]; imagen?: Imagen }
  | { tipo: "lista"; titulo: string; items: string[]; imagen?: Imagen }
  | { tipo: "linea"; titulo: string; hitos: Hito[] }
  // fondoClaro: para dibujos con fondo transparente (planos), ilegibles sobre el tema oscuro
  | { tipo: "imagen"; titulo: string; imagen: Imagen; fondoClaro?: boolean };
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
  portada?: Imagen;
  // Guías de modelo: para mostrar los anuncios en venta de ese modelo
  modelo?: { marca: string; modelos: string[] };
  // Lugares: mapa de OpenStreetMap
  mapa?: { lat: number; lon: number; delta: number };
  // Lugares: provincia, para enlazar a los autos en venta de la zona
  provincia?: string;
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
    slug: "peugeot-504",
    titulo: "Peugeot 504",
    kicker: "Guía de modelo · 1969–1999",
    resumen:
      "Treinta años de producción y casi medio millón de unidades vendidas: el 504 fue el auto de las familias, de los taxis y de las rutas largas. Hoy es uno de los clásicos más buscados del país.",
    descripcionSeo:
      "Peugeot 504 argentino (1969–1999): historia, versiones, motores y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1969–1999", etiqueta: "años de producción en el país" },
      { valor: "Casi 500.000", etiqueta: "unidades vendidas en la Argentina" },
      { valor: "Berazategui", etiqueta: "y luego El Palomar (Sevel)" },
      { valor: "30 años", etiqueta: "en el mercado argentino" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en el Salón de París en septiembre de 1968, el 504 se lanzó en la Argentina en agosto de 1969. Lo fabricaba Safrar en la planta de Berazategui; desde 1981, ya con Sevel (la unión de Peugeot y Fiat en el país), la producción pasó a El Palomar.",
          "Se fabricó hasta diciembre de 1999. Las cifras de ventas varían según la fuente, entre 491.959 y 496.693 unidades, pero todas coinciden en que fue un récord para el mercado argentino del siglo XX. Su mejor año fue 1994, con casi 25.000 patentamientos.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones y motores",
        items: [
          "1969–1971: motor 1.6 de 76 CV y faros redondos.",
          "1972: motor 1.8 y los clásicos faros trapezoidales. El sedán de 1974 es el famoso «Yeyo».",
          "1973: serie X (XE, XL, XSE). 1976: serie 2000 (E, L, SE), con motor de 2 litros.",
          "TN (Turismo Nacional): motor de 1971 cm³ y 110 CV, con sus decoraciones celeste y blanca o naranja con franjas negras.",
          "1979: versiones S, con la SED diésel. 1981: llega la pick-up, que se hizo hasta 1999.",
          "1982: GR, con la primera caja de cinco marchas. 1988: SR y SRD. 1990: SRX, tope de gama con la cola rediseñada por Pininfarina.",
          "Motores: nafteros de 1.6, 1.8 y 2.0 litros, y el diésel Indenor 2.3.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido en zócalos, piso, pasarruedas y parte baja de las puertas: es lo primero que hay que mirar.",
          "Historial de GNC y de taxi: muchos 504 trabajaron durante años; un auto particular y original vale más.",
          "Diésel Indenor: escuchar el arranque en frío y controlar humo y pérdidas de aceite.",
          "Tren trasero, caja y diferencial: ruidos al acelerar o desacelerar indican desgaste.",
          "Originalidad: las versiones TN, SR y SRX, y los primeros de faros redondos, son las más buscadas por los coleccionistas.",
          "Repuestos: abundantes y accesibles, gracias a los treinta años de producción.",
        ],
      },
    ],
    fuentes: [
      { titulo: "La Nación — La historia de un ícono: el Peugeot 504 (2018)", url: "https://www.lanacion.com.ar/autos/al-volante/la-historia-icono-peugeot-504-nid2195265" },
      { titulo: "Autoweb — Hace 20 años se despedía el Peugeot 504 argentino (2019)", url: "https://www.autoweb.com.ar/?p=12886" },
    ],
    modelo: { marca: "Peugeot", modelos: ["504"] },
  },
  {
    slug: "bmw-serie-3-e30",
    titulo: "BMW Serie 3 E30",
    kicker: "Guía de modelo · 1982–1994",
    resumen:
      "Tracción trasera, seis en línea, líneas rectas y tamaño compacto: el E30 reúne todo lo que se le pide a un youngtimer alemán. Las versiones de cuatro cilindros siguen siendo accesibles; la M3 ya es un auto de colección.",
    descripcionSeo:
      "BMW Serie 3 E30 (1982–1994): historia, carrocerías, motores, la M3 y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1982–1994", etiqueta: "años de producción" },
      { valor: "2,34 millones", etiqueta: "unidades fabricadas" },
      { valor: "4", etiqueta: "carrocerías: coupé, sedán, cabrio y Touring" },
      { valor: "17.970", etiqueta: "M3 E30 fabricadas" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "El E30 reemplazó al E21 en 1982, primero como coupé de dos puertas. Después llegaron el sedán de cuatro puertas, el cabriolet (1986–1993) y la rural Touring (1987–1994). La 325iX sumó tracción integral, y el restyling de 1988 (paragolpes, ópticas traseras, interior) separa las «fase 1» de las «fase 2».",
          "Presentada en Fráncfort en 1985 y fabricada de 1986 a 1991, la M3 fue un auto de homologación para competir: cuatro cilindros S14 de 2,3 litros y 16 válvulas, entre 195 y 215 CV, y carrocería ensanchada. BMW pensaba hacer 5.000 y fabricó 17.970, de las que 786 fueron cabriolets. La Sport Evolution, de 2,5 litros y 238 CV, se limitó a 600 unidades.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "M10, cuatro cilindros (316, primeros 318i): distribución por cadena, muy robusto.",
          "M40, cuatro cilindros (316i y 318i desde 1987–1988): correa de distribución; vigilar el árbol de levas.",
          "M42, cuatro cilindros 16 válvulas (318iS): el cuatro cilindros más deportivo, con un chasis muy equilibrado.",
          "M20, seis en línea (320i, 323i, 325i): el que le da su carácter al E30. La 325i, de unos 170 CV, es la más buscada.",
          "M21, diésel (324d y 324td): lentos pero durables.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Seis cilindros M20: correa y tensor cada 60.000 km o 5 años como máximo, con la bomba de agua. Sin factura reciente, hay que cambiarla antes de usar el auto: si se corta, daña el motor.",
          "Agua en el aceite en un M20: muchas veces es una tapa de cilindros fisurada debajo del árbol de levas, no solo la junta.",
          "Refrigeración: radiador, termostato y mangueras tienen que estar renovados; un depósito de expansión sucio es mala señal.",
          "Óxido: pasarruedas traseros (levantá la alfombra del baúl), zócalos y puntos de levante, batea de la batería, anclajes del tren trasero y marco del techo corredizo.",
          "Tren trasero: bujes del puente y de los brazos, resortes rotos, cazoletas delanteras que golpean en las curvas.",
          "Ex autos de drift: diferencial soldado, freno de mano hidráulico y piso trasero marcado.",
          "Cabriolet: abrir y cerrar la capota por completo; mecanismo y lona son caros.",
        ],
      },
    ],
    fuentes: [
      { titulo: "BMWBlog — BMW E30 3 Series: history and review (2025)", url: "https://www.bmwblog.com/2025/02/14/bmw-e30-3-series-history-review/" },
      { titulo: "Mecatechnic — Histoire de la BMW E30", url: "https://www.mecatechnic.com/fr-FR/blog/articles/histoire-bmw-e30" },
      { titulo: "Classics World — BMW E30 3 Series buyer's guide", url: "https://classicsworld.co.uk/guides/bmw-e30-3-series-buyers-guide/" },
      { titulo: "Youngtimer Garage — BMW Série 3 E30 (2026)", url: "https://youngtimer-garage.fr/dossiers/bmw-serie-3-e30-histoire-moteurs-achat" },
    ],
    modelo: { marca: "BMW", modelos: ["Serie 3 E30"] },
  },
  {
    slug: "bmw-serie-3-e46",
    titulo: "BMW Serie 3 E46",
    kicker: "Guía de modelo · 1998–2006",
    resumen:
      "La tracción trasera de referencia de principios de los 2000, hasta la M3 CSL. El E46 hace de puente entre usado y youngtimer, y sigue siendo accesible si se sabe qué revisar.",
    descripcionSeo:
      "BMW Serie 3 E46 (1998–2006): carrocerías, motores, M3 y M3 CSL, y los defectos conocidos que hay que revisar antes de comprar.",
    cifras: [
      { valor: "1998–2006", etiqueta: "años de producción" },
      { valor: "3,27 millones", etiqueta: "unidades, todas las carrocerías" },
      { valor: "343 CV", etiqueta: "de la M3 (seis en línea S54)" },
      { valor: "1.383", etiqueta: "M3 CSL fabricadas" },
    ],
    secciones: [
      {
        tipo: "lista",
        titulo: "Carrocerías",
        items: [
          "Sedán (diciembre de 1997 a mayo de 2005): 1.918.984 unidades.",
          "Touring (1999–2005): 428.061 unidades.",
          "Coupé (diciembre de 1998 a mayo de 2006): 443.264 unidades.",
          "Cabriolet (diciembre de 1999 a noviembre de 2006): 277.146 unidades.",
          "Compact (2000–2004): 199.430 unidades.",
          "Restyling en 2001 para el sedán, el Touring y el Compact, y en 2003 para el coupé y el cabrio. La M3 no tuvo restyling.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "320i: seis en línea de 2,0 litros (150 CV) y después de 2,2 litros (170 CV).",
          "325i y 330i: seis en línea M54 de 192 y 231 CV.",
          "320d y 330d: diésel de cuatro y seis cilindros, de 136 a 204 CV.",
          "M3: seis en línea S54 de 3,2 litros y 343 CV (2000–2006).",
          "M3 CSL (2003–2004): 360 CV, caja SMG, techo de carbono y llantas de 19 pulgadas. Solo 1.383 unidades: es la pieza de colección de la familia.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Fisuras en el piso donde se ancla el tren trasero: pasa en todas las carrocerías, sobre todo en M3, 330i y 328i. La reparación puede costar más que el auto: hacelo revisar en elevador antes de comprar.",
          "Refrigeración: depósito de expansión, bomba de agua con turbina plástica, radiador y termostato. Conviene cambiarlos en forma preventiva cada 100.000 a 120.000 km.",
          "VANOS de los seis cilindros: los retenes suelen pedir cambio hacia los 150.000 km.",
          "Seis cilindros M54: consumo de aceite, respiradero del cárter, bobinas y caudalímetro.",
          "320d: turbo, EGR, inyectores, volante bimasa y las mariposas de admisión, que en los de 150 CV pueden soltarse.",
          "Levantavidrios delanteros y módulo de confort (GM5).",
          "M3: cojinetes de biela del S54, tornillos del VANOS, bomba y embrague de la caja SMG.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Wikipedia — BMW 3 Series (E46)", url: "https://en.wikipedia.org/wiki/BMW_3_Series_(E46)" },
      { titulo: "BMWTuning — BMW E46 subframe cracks", url: "https://bmwtuning.co/bmw-e46-subframe-cracks/" },
      { titulo: "Turner Motorsport — E46 Buyer's Guide", url: "https://www.turnermotorsport.com/t-BMW_E46_Buyers_Guide" },
      { titulo: "PistonHeads — BMW M3 E46 used buying guide", url: "https://www.pistonheads.com/features/ph-buying-guides/bmw-m3-e46--ph-used-buying-guide/25931" },
      { titulo: "Youngtimer Garage — Guide d'achat BMW E38 et E46 (2026)", url: "https://youngtimer-garage.fr/dossiers/guide-achat-bmw-e38-e46" },
    ],
    modelo: { marca: "BMW", modelos: ["Serie 3 E46"] },
  },
  {
    slug: "mercedes-benz-w123",
    titulo: "Mercedes-Benz W123",
    kicker: "Guía de modelo · 1976–1986",
    resumen:
      "El Mercedes más exitoso de su época: casi 2,7 millones de unidades, taxis que pasaban el millón de kilómetros y un coupé 280 CE que hoy es uno de los clásicos alemanes más buscados.",
    descripcionSeo:
      "Mercedes-Benz W123 (1976–1986): sedán, coupé y rural, motores nafteros y diésel, y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1976–1986", etiqueta: "años de producción" },
      { valor: "2.696.915", etiqueta: "unidades fabricadas" },
      { valor: "99.884", etiqueta: "coupés C123" },
      { valor: "455.000", etiqueta: "240 D, la versión más vendida" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado a fines de 1975, el W123 superó al W114 como el Mercedes más exitoso hasta entonces. La demanda era tal que en Alemania había esperas de nueve a doce meses y hasta un mercado negro de autos usados casi nuevos.",
          "Además del sedán (2.375.410 unidades), hubo coupé C123 (99.884), rural S123 (199.517) y limusina larga. En 1977, dos 280 E ganaron el primer y el segundo puesto del maratón Londres–Sídney. La serie de 1982 trajo ópticas rectangulares y dirección asistida de serie.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones y motores",
        items: [
          "Nafteros: 200, 230, 230 E, 250, 280 y 280 E, con el coupé 280 CE como tope de gama.",
          "Diésel: 200 D, 220 D, 240 D y 300 D. Son los motores de su leyenda: muchos taxis superaron los 500.000 km.",
          "300 TD Turbodiesel (1979): presentado como el primer turbodiésel de un auto de pasajeros.",
          "Las más fabricadas: 240 D (455.000), 230 E (442.000) y 200 D (378.000).",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: zócalos y pasarruedas, sobre todo la cara interna de los traseros y la unión entre zócalo y pasarrueda; también parantes A y B, largueros y la canaleta del techo. El estado del piso define el valor del auto.",
          "Pintura: con un medidor de espesor se ve si el auto fue repintado.",
          "Tren delantero: rótulas gastadas que golpean al doblar o en los pozos.",
          "Nafteros 200 y 230: carburador con bomba de pique, membranas y chiclers gastados (tirones y arranque en frío difícil).",
          "Diésel 240 D y 300 D: inyectores a limpiar o cambiar cerca de los 100.000 km, y una prueba de compresión antes de comprar.",
          "Distribución por cadena: revisar estiramiento, tensor y patines.",
          "Aire acondicionado y cierre centralizado por vacío: después de 40 años, suelen necesitar atención.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Wikipedia — Mercedes-Benz W123", url: "https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Mercedes-Benz_W123" },
      { titulo: "Kfz-Meisterbetrieb Dietrich — Mercedes W123: häufige Probleme", url: "https://kfz-dietrich.com/blog/oldtimer-mercedes-w123-haeufige-probleme/" },
    ],
    modelo: { marca: "Mercedes-Benz", modelos: ["230 W123", "W123"] },
  },
  {
    slug: "mercedes-benz-w124",
    titulo: "Mercedes-Benz W124",
    kicker: "Guía de modelo · 1984–1997",
    resumen:
      "El último Mercedes «hecho como un tanque» para muchos, y el primero en llamarse Clase E. Sedán, rural, coupé y cabrio, con un 500 E desarrollado junto a Porsche.",
    descripcionSeo:
      "Mercedes-Benz W124 (1984–1997): carrocerías, el 500 E de Porsche, el cambio a Clase E y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1984–1997", etiqueta: "años de producción" },
      { valor: "2,2 millones", etiqueta: "unidades, todas las carrocerías" },
      { valor: "322 CV", etiqueta: "del 500 E, V8 de 5 litros" },
      { valor: "1993", etiqueta: "pasa a llamarse Clase E" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en noviembre de 1984 tras siete años de desarrollo, el W124 tuvo sedán, rural S124, coupé C124 y cabriolet A124, además de limusina y chasis para carrozar. En 1993 recibió un restyling de líneas más redondeadas y pasó a llamarse Clase E, con la letra delante del número.",
          "Para el 500 E, Mercedes primero le pidió el desarrollo a AMG, que no tenía capacidad para fabricar miles de unidades. Lo hizo Porsche: adaptó carrocería y chasis para alojar el V8 M119 de 5 litros, 32 válvulas y 322 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "Nafteros de cuatro y seis cilindros en línea, de los 200 E a los 300 E y 320 E.",
          "V8 en los 400 E y 500 E (E 420 y E 500 desde 1993).",
          "Diésel de cuatro, cinco y seis cilindros, con y sin turbo: los 250 D y 300 D tienen la misma reputación de durabilidad que sus antecesores.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Puntos de levante: levantá las tapas plásticas de los zócalos; si la chapa se desarma, hay que soldar.",
          "Anclajes delanteros del tren trasero: se pican con los años y para repararlos hay que bajar el eje.",
          "Guardabarros delanteros: casi siempre tienen óxido. En la rural, revisar los marcos de las ventanillas traseras.",
          "Los autos hasta 1992 suelen resistir mejor el óxido; la pintura al agua de los últimos años es más delicada.",
          "Seis cilindros: pérdida de agua o agua en el aceite indican junta de tapa de cilindros (mirá la tapa de llenado de aceite).",
          "Motores de cuatro válvulas: el arnés de cables del motor se desarma con el tiempo y provoca fallas de encendido.",
          "Caja automática: cambios bruscos o a los tirones son mala señal.",
          "Probar aire acondicionado, techo corredizo y levantavidrios: varias reparaciones juntas suman mucho.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autocosmos — El Mercedes-Benz W124 cumple 40 años (2024)", url: "https://noticias.autocosmos.com.ar/2024/12/25/leyendas-de-la-industria-el-mercedes-benz-w124-cumple-40-anos" },
      { titulo: "mobile.de — Mercedes E-Klasse W124: Kaufberatung", url: "https://www.mobile.de/magazin/artikel/mercedes-e-klasse-w124-1984-bis-1997-kaufberatung-40958" },
    ],
    modelo: { marca: "Mercedes-Benz", modelos: ["W124"] },
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
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/9/97/Lago_Embalse_Potrero_de_los_Funes.jpg",
          alt: "El embalse de Potrero de los Funes, con las sierras de fondo",
          pie: "El embalse de Potrero de los Funes, que el circuito rodeaba.",
          autor: "ViviPotreroCommon",
          licencia: "CC BY-SA 3.0",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Lago_Embalse_Potrero_de_los_Funes.jpg",
          ancho: 1200,
          alto: 676,
        },
      },
      {
        tipo: "imagen",
        titulo: "El trazado",
        fondoClaro: true,
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Potrero_de_los_Funes_Circuit_(Argentina)_track_map.svg",
          alt: "Plano del circuito de Potrero de los Funes alrededor del lago, con sus 23 curvas numeradas",
          pie: "Datos de 2009: en negro, el recorrido de la reapertura de 2008; en rojo punteado, el original.",
          autor: "Will Pittenger",
          etiqueta: "Plano",
          licencia: "CC BY-SA 3.0",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Potrero_de_los_Funes_Circuit_(Argentina)_track_map.svg",
          ancho: 1424,
          alto: 982,
        },
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
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Vista_sierras_Potrero_de_los_Funes.jpg",
          alt: "Pinos y sierras en Potrero de los Funes",
          pie: "Las sierras de Potrero de los Funes.",
          autor: "ViviPotreroCommon",
          licencia: "CC BY-SA 3.0",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Vista_sierras_Potrero_de_los_Funes.jpg",
          ancho: 1200,
          alto: 389,
        },
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
      {
        tipo: "fichas",
        titulo: "Dónde dormir",
        fichas: [
          {
            nombre: "Hotel Potrero de los Funes",
            zona: "A orillas del lago",
            texto:
              "En la Ruta 18 km 16, Circuito del Lago. Tiene 116 habitaciones, entre ellas suites flotantes sobre el agua, y abrió en enero de 1985, en la época del primer circuito.",
            enlace: { url: "https://hotelpotrero.sanluis.gov.ar", texto: "Sitio oficial" },
          },
          {
            nombre: "Cabañas, hosterías y campings",
            zona: "Alrededor del lago",
            texto: "La guía Welcome Argentina reúne unas 80 opciones en Potrero de los Funes, en su mayoría complejos de cabañas.",
            enlace: { url: "https://www.welcomeargentina.com/potrero-de-los-funes/alojamientos.html", texto: "Ver el listado" },
          },
          {
            nombre: "Hoteles en la ciudad de San Luis",
            zona: "A unos 20 km",
            texto:
              "En el centro, sobre la avenida Presidente Illia, están el Hotel Quintana, el Hotel Aiello, el Gran Hotel San Luis Gold y el Premium Tower Suites, entre otros.",
            enlace: { url: "https://www.welcomeargentina.com/sanluis/alojamientos.html", texto: "Ver el listado" },
          },
        ],
        nota: "Información orientativa: consultá tarifas y disponibilidad directamente con cada alojamiento. En las fechas de los encuentros conviene reservar con anticipación.",
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
      {
        titulo: "Cadena 3 — El Hotel Potrero de los Funes celebra 40 años (2025)",
        url: "https://www.cadena3.com/noticia/viva-la-radio/el-hotel-potrero-de-los-funes-celebra-40-anos-de-excelencia-en-servicios_404142",
      },
      { titulo: "Welcome Argentina — Hotel Potrero de los Funes", url: "https://www.welcomeargentina.com/potrerodelosfunes/hotel-potrero-de-los-funes.html" },
      {
        titulo: "Universidad Nacional de San Luis — Listado de hoteles de la ciudad (2025)",
        url: "https://jadicc2025.unsl.edu.ar/docs/Listado-Hoteles-San%20Luis_JADICC_2025.pdf",
      },
    ],
    mapa: { lat: -33.2303, lon: -66.2325, delta: 0.035 },
    provincia: "San Luis",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Ciudad_de_Potrero_de_los_Funes.jpg",
      alt: "Vista panorámica del pueblo de Potrero de los Funes entre las sierras de San Luis",
      pie: "Potrero de los Funes, entre las sierras de San Luis.",
      autor: "ViviPotreroCommon",
      licencia: "CC BY-SA 3.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Ciudad_de_Potrero_de_los_Funes.jpg",
      ancho: 1200,
      alto: 276,
    },
  },
  {
    slug: "balcarce-fangio",
    titulo: "Balcarce, la tierra de Fangio",
    kicker: "Lugares míticos · Buenos Aires",
    resumen:
      "La ciudad natal de Juan Manuel Fangio reúne el museo de automovilismo más importante del país y un autódromo entre las sierras que, después de quince años, volvió a recibir carreras nacionales.",
    descripcionSeo:
      "Balcarce y Juan Manuel Fangio: el Museo Fangio, el Autódromo Juan Manuel Fangio y su reapertura en 2026, y la casa natal del quíntuple campeón.",
    cifras: [
      { valor: "5", etiqueta: "títulos mundiales de Fórmula 1 de Fangio" },
      { valor: "1986", etiqueta: "inauguración del Museo Fangio" },
      { valor: "4,59 km", etiqueta: "de trazado del autódromo" },
      { valor: "1972", etiqueta: "inauguración del autódromo" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "El Museo Fangio",
        parrafos: [
          "Juan Manuel Fangio nació en Balcarce en 1911 y fue cinco veces campeón del mundo de Fórmula 1 (1951 y de 1954 a 1957). Su museo se inauguró el 22 de noviembre de 1986, en el edificio de 1906 que había sido la municipalidad, en la esquina de Dardo Rocha y Mitre.",
          "El recorrido baja por una rampa a lo largo de tres niveles, con unos 55 vehículos en exhibición: autos de Turismo Carretera, de Fórmula 1 y de sport. La estrella está en el último piso: el Mercedes-Benz W196, la «Flecha de Plata».",
        ],
      },
      {
        tipo: "texto",
        titulo: "El Autódromo Juan Manuel Fangio",
        parrafos: [
          "Inaugurado el 16 de enero de 1972, el autódromo está en la sierra La Barrosa, muy cerca del centro, con vistas panorámicas sobre la ciudad. Su trazado completo mide 4,59 km. Allí corrieron el Turismo Carretera, el TC2000 y el Turismo Nacional.",
          "Después del accidente fatal de Guido Falaschi en 2011, las grandes categorías dejaron de visitarlo. La Provincia de Buenos Aires financió su puesta a punto, y el 26 y 27 de septiembre de 2026 el TC Pick Up marcó la vuelta de las carreras nacionales.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Para visitar",
        items: [
          "Museo Fangio: Dardo Rocha y Mitre, en el centro de Balcarce. Consultá horarios y entradas en su sitio oficial.",
          "Casa natal de Fangio: calle 13 nº 321. Se puede ver la fachada, señalada con una placa; el interior no se visita.",
          "Autódromo: Suipacha y calle 63, a pocos minutos del centro.",
          "Balcarce está a menos de una hora de Mar del Plata: se combina fácil con una escapada a la costa.",
        ],
      },
    ],
    aviso: "Horarios y actividades cambian: consultá siempre las fuentes oficiales antes de viajar.",
    fuentes: [
      { titulo: "Museo Juan Manuel Fangio — sitio oficial", url: "https://www.museofangio.com" },
      { titulo: "La Nación — Qué hay para ver en el Museo Fangio (2024)", url: "https://www.lanacion.com.ar/autos/que-hay-para-ver-en-el-museo-fangio-en-balcarce-una-visita-para-conocer-de-cerca-la-historia-del-nid20072024/" },
      { titulo: "Wikipedia — Autódromo Juan Manuel Fangio", url: "https://en.wikipedia.org/wiki/Aut%C3%B3dromo_Juan_Manuel_Fangio" },
      { titulo: "Welcome Argentina — Autódromo Fangio", url: "https://www.welcomeargentina.com/balcarce/autodromo-fangio.html" },
      { titulo: "Infozona — Las TC Pick Up llegan a Balcarce (2026)", url: "https://www.infozona.com.ar/tc-pick-up-balcarce-2026/" },
    ],
    mapa: { lat: -37.862, lon: -58.262, delta: 0.03 },
    provincia: "Buenos Aires",
  },
  {
    slug: "museos-del-automovil",
    titulo: "Museos del automóvil en la Argentina",
    kicker: "Lugares míticos · Todo el país",
    resumen:
      "De la Flecha de Plata de Fangio en Balcarce al primer auto patentado del país en Palermo, pasando por un museo dedicado al Fitito: seis museos para recorrer la historia del automóvil argentino.",
    descripcionSeo:
      "Museos del automóvil en la Argentina: Museo Fangio, Museo del ACA, Termas de Río Hondo, Museo del Fitito, Maipú y Luján. Qué ver en cada uno y dónde están.",
    secciones: [
      {
        tipo: "fichas",
        titulo: "Seis museos para visitar",
        fichas: [
          {
            nombre: "Museo Juan Manuel Fangio",
            zona: "Balcarce · Buenos Aires",
            texto:
              "Inaugurado en 1986 en la antigua municipalidad, reúne unos 55 vehículos en tres niveles. La estrella: el Mercedes-Benz W196, la «Flecha de Plata».",
            enlace: { url: "https://www.museofangio.com", texto: "Sitio oficial" },
          },
          {
            nombre: "Museo del Automóvil Club Argentino",
            zona: "Palermo · CABA",
            texto:
              "En la sede del ACA, Av. del Libertador 1850. Un Daimler de 1892, la Ferrari 166 de Fangio, el Brabham de Reutemann y la patente nº 1 del país.",
            enlace: {
              url: "https://turismo.buenosaires.gob.ar/es/otros-establecimientos/museo-del-autom%C3%B3vil-club-argentino",
              texto: "Más información",
            },
          },
          {
            nombre: "Museo del Automóvil de Termas de Río Hondo",
            zona: "Termas de Río Hondo · Santiago del Estero",
            texto:
              "Dentro del autódromo internacional, frente al embalse. Abierto en 2012, con seis salas: Fórmula 1, Turismo Carretera, autos históricos, Espacio Fangio, industria nacional y motos clásicas.",
            enlace: { url: "https://www.welcomeargentina.com/termasderiohondo/museo-del-automovil-en-rio-hondo.html", texto: "Más información" },
          },
          {
            nombre: "Museo del Fitito",
            zona: "Tres de Febrero · Buenos Aires",
            texto:
              "El primer museo del mundo dedicado al Fiat 600 abrió en noviembre de 2023, con una caravana de más de 600 Fititos. Versiones, publicidades de época y repuestos donados por los fanáticos.",
            enlace: { url: "https://noticias.autocosmos.com.ar/2023/11/08/con-mas-de-600-fiat-600-se-abrio-al-publico-el-museo-del-fitito", texto: "Más información" },
          },
          {
            nombre: "Museo del Automóvil y del Ayer",
            zona: "Maipú · Mendoza",
            texto:
              "En el Salón Centenario de la ex Bodega Giol, Ozamis 1040. Autos desde un Star de 1909 hasta clásicos argentinos de los 70, con un taller mecánico de época.",
            enlace: { url: "https://www.mendoza.gov.ar/prensa/museo-del-automovil-continua-la-muestra-de-autos-antiguos/", texto: "Más información" },
          },
          {
            nombre: "Museo del Transporte (Complejo Udaondo)",
            zona: "Luján · Buenos Aires",
            texto:
              "Carruajes del siglo XIX, la locomotora La Porteña de 1857 y el hidroavión Plus Ultra: para entender cómo se movían los argentinos antes del auto.",
            enlace: { url: "https://www.gba.gob.ar/cultura/noticias/el_complejo_udaondo_presenta_su_agenda_para_el_verano", texto: "Más información" },
          },
        ],
        nota: "Horarios, entradas y aperturas cambian: consultá siempre a cada museo antes de ir.",
      },
    ],
    fuentes: [
      { titulo: "La Nación — Qué hay para ver en el Museo Fangio (2024)", url: "https://www.lanacion.com.ar/autos/que-hay-para-ver-en-el-museo-fangio-en-balcarce-una-visita-para-conocer-de-cerca-la-historia-del-nid20072024/" },
      { titulo: "Turismo Buenos Aires — Museo del Automóvil Club Argentino", url: "https://turismo.buenosaires.gob.ar/es/otros-establecimientos/museo-del-autom%C3%B3vil-club-argentino" },
      { titulo: "Welcome Argentina — Museo del Automóvil en Río Hondo", url: "https://www.welcomeargentina.com/termasderiohondo/museo-del-automovil-en-rio-hondo.html" },
      { titulo: "Autocosmos — Se abrió al público el Museo del Fitito (2023)", url: "https://noticias.autocosmos.com.ar/2023/11/08/con-mas-de-600-fiat-600-se-abrio-al-publico-el-museo-del-fitito" },
      { titulo: "Gobierno de Mendoza — Museo del Automóvil (2013)", url: "https://www.mendoza.gov.ar/prensa/museo-del-automovil-continua-la-muestra-de-autos-antiguos/" },
      { titulo: "Exhibitist — Museo del Transporte, Complejo Udaondo (2018)", url: "https://exhibitist.net/2018/06/15/lujan-complejo-museografico-provincial-enrique-udaondo-museo-del-transporte-enrique-udaondo-provincial-museum-complex-museum-of-transport/" },
    ],
  },
];

export const guiaPorSlug = (slug: string) => GUIAS.find((g) => g.slug === slug);
export const lugarPorSlug = (slug: string) => LUGARES.find((l) => l.slug === slug);
