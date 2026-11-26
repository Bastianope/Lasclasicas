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
  // Título para Google (si no, se usa el título)
  tituloSeo?: string;
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/62/Falcon_1970.jpg",
      alt: "Ford Falcon argentino de 1970",
      pie: "Ford Falcon argentino, restyling de 1970.",
      autor: "Pan32",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Falcon_1970.jpg",
      ancho: 640,
      alto: 480,
    },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/IKA_Torino_380_coupé.jpg/1280px-IKA_Torino_380_coupé.jpg",
      alt: "IKA Torino 380 coupé",
      pie: "IKA Torino 380 coupé (1966–1970).",
      autor: "Sergio Miller (recorte: Mr.choppers)",
      licencia: "CC BY-SA 3.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:IKA_Torino_380_coup%C3%A9.jpg",
      ancho: 1280,
      alto: 766,
    },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Fiat_600_at_Schaffen-Diest.jpg/1280px-Fiat_600_at_Schaffen-Diest.jpg",
      alt: "Fiat 600 en un encuentro de clásicos",
      pie: "Fiat 600.",
      autor: "Charles01",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Fiat_600_at_Schaffen-Diest.jpg",
      ancho: 1280,
      alto: 915,
    },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/1978_Peugeot_504_Ti_Automatic_2.0_Front.jpg/1280px-1978_Peugeot_504_Ti_Automatic_2.0_Front.jpg",
      alt: "Peugeot 504 de 1978, vista frontal",
      pie: "Peugeot 504 Ti de 1978.",
      autor: "Vauxford",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1978_Peugeot_504_Ti_Automatic_2.0_Front.jpg",
      ancho: 1280,
      alto: 687,
    },
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
    modelo: { marca: "Peugeot", modelos: ["504", "504 Pick Up", "504 Cabrio"] },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BMW_E30_in_silver_(facelift),_front_left_2024-08-18.jpg/1280px-BMW_E30_in_silver_(facelift),_front_left_2024-08-18.jpg",
      alt: "BMW Serie 3 E30 plateado",
      pie: "BMW Serie 3 E30, segunda fase.",
      autor: "Johannes Maximilian (obra derivada: Mr.choppers)",
      licencia: "GFDL 1.2",
      licenciaUrl: "https://www.gnu.org/licenses/old-licenses/fdl-1.2.html",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:BMW_E30_in_silver_%28facelift%29%2C_front_left_2024-08-18.jpg",
      ancho: 1280,
      alto: 818,
    },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/BMW_E46_front_20080328.jpg/1280px-BMW_E46_front_20080328.jpg",
      alt: "BMW Serie 3 E46 sedán",
      pie: "BMW Serie 3 E46.",
      autor: "Rudolf Stricker",
      licencia: "CC BY-SA 3.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:BMW_E46_front_20080328.jpg",
      ancho: 1280,
      alto: 797,
    },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/1984_Mercedes-Benz_280E_Sedan_(cropped).jpg/1280px-1984_Mercedes-Benz_280E_Sedan_(cropped).jpg",
      alt: "Mercedes-Benz 280 E W123 de 1984",
      pie: "Mercedes-Benz 280 E (W123) de 1984.",
      autor: "Verdict09",
      licencia: "CC0 (dominio público)",
      licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1984_Mercedes-Benz_280E_Sedan_%28cropped%29.jpg",
      ancho: 1280,
      alto: 788,
    },
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
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/1988_Mercedes-Benz_300d_Diesel_Automatic_3.0_Front.jpg/1280px-1988_Mercedes-Benz_300d_Diesel_Automatic_3.0_Front.jpg",
      alt: "Mercedes-Benz 300 D W124 de 1988",
      pie: "Mercedes-Benz 300 D (W124) de 1988.",
      autor: "Vauxford",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1988_Mercedes-Benz_300d_Diesel_Automatic_3.0_Front.jpg",
      ancho: 1280,
      alto: 556,
    },
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
    slug: "peugeot-404",
    titulo: "Peugeot 404",
    kicker: "Guía de modelo · 1962–1980",
    resumen:
      "El sedán de diseño Pininfarina que consolidó a Peugeot en la Argentina. Robusto, sobrio y con un 404 S que fue la primera versión deportiva de un auto hecho en el país.",
    descripcionSeo:
      "Peugeot 404 argentino (1962–1980): historia, versiones (Grand Prix, 404 S, 404 D, pick-up) y motores.",
    cifras: [
      { valor: "1962–1980", etiqueta: "años de producción en el país" },
      { valor: "162.500", etiqueta: "unidades estimadas" },
      { valor: "Berazategui", etiqueta: "planta de IAFA y luego Safrar" },
      { valor: "185 km/h", etiqueta: "del 404 S, el deportivo" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/1969_Peugeot_404_sedan_(28295240103).jpg/1280px-1969_Peugeot_404_sedan_(28295240103).jpg",
      alt: "Peugeot 404 sedán de 1969",
      pie: "Peugeot 404 sedán de 1969.",
      autor: "Jeremy from Sydney, Australia",
      licencia: "CC BY 2.0",
      licenciaUrl: "https://creativecommons.org/licenses/by/2.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1969_Peugeot_404_sedan_%2828295240103%29.jpg",
      ancho: 1280,
      alto: 853,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en Francia en 1960 con diseño de Pininfarina, el 404 se empezó a fabricar en la Argentina en 1962, en la planta de IAFA en Berazategui. Cuando la comercializadora DAPASA cerró en 1964, Safrar retomó la producción en 1965.",
          "El 404 argentino era casi idéntico al francés. Se fabricó hasta 1980, cuando Safrar pasó a formar parte de Sevel. Se estiman unas 162.500 unidades entre todas las variantes. El coupé y el cabriolet nunca se hicieron en el país.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones y motores",
        items: [
          "Sedán con motor 1.6 naftero: primero de 65 CV (tres bancadas) y después de 73 CV (cinco bancadas).",
          "404 S: 1.6 con doble Weber y 115 CV, con 185 km/h de velocidad máxima.",
          "Rural: desde 1963, con una vida corta en el país.",
          "404 D (1972): diésel 1.9 de 68 CV, con versiones pick-up y furgón.",
          "Grand Prix (años 70): palanca al piso, consola central, faros auxiliares en la parrilla y llantas nuevas.",
          "Caja de cambios con palanca al volante, salvo en algunas versiones.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: zócalos, piso, pasarruedas y parte baja de las puertas. Es lo primero a revisar en un auto de esta edad.",
          "Originalidad: confirmá la versión (404 S, Grand Prix, D) con los números de chasis y de motor, porque las más buscadas valen bastante más.",
          "Motor: diferenciá el de tres bancadas del de cinco, y escuchalo en frío.",
          "Diésel 404 D: humo, arranque en frío y pérdidas de aceite.",
          "Pick-up y furgón: muchos trabajaron toda su vida; revisá el chasis y la caja de carga.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autocosmos — Autos clásicos de Argentina: Peugeot 404 (2025)", url: "https://noticias.autocosmos.com.ar/2025/02/20/autos-clasicos-de-argentina-peugeot-404" },
      { titulo: "Autoweb — Todos los Peugeot que se hicieron en la Argentina", url: "https://www.autoweb.com.ar/?p=12776" },
    ],
    modelo: { marca: "Peugeot", modelos: ["404"] },
  },
  {
    slug: "peugeot-505",
    titulo: "Peugeot 505",
    kicker: "Guía de modelo · 1981–1995",
    resumen:
      "El sucesor de lujo del 504: tracción trasera, rural de siete plazas y, al final de su vida, un SRi con suspensión trasera independiente y frenos a disco en las cuatro ruedas.",
    descripcionSeo:
      "Peugeot 505 argentino (1981–1995): historia, restylings, motores nafteros y turbodiésel, y qué revisar antes de comprar.",
    cifras: [
      { valor: "1981–1995", etiqueta: "años de producción en el país" },
      { valor: "91.500", etiqueta: "unidades argentinas" },
      { valor: "El Palomar", etiqueta: "planta de Sevel" },
      { valor: "130 CV", etiqueta: "del 2.2 de inyección multipunto" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Peugeot_505_SR_Automatique_(1979),_Dutch_licence_registration_71-ZL-PS_pic2.JPG/1280px-Peugeot_505_SR_Automatique_(1979),_Dutch_licence_registration_71-ZL-PS_pic2.JPG",
      alt: "Peugeot 505 SR de 1979",
      pie: "Peugeot 505 SR de 1979.",
      autor: "AlfvanBeem",
      licencia: "CC0 (dominio público)",
      licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Peugeot_505_SR_Automatique_%281979%29%2C_Dutch_licence_registration_71-ZL-PS_pic2.JPG",
      ancho: 1280,
      alto: 959,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Lanzado en Europa en 1979, el 505 se fabricó en la Argentina desde 1981, en la planta de Sevel en El Palomar, y hasta 1995: catorce años y 91.500 unidades. En el mundo superó el 1,3 millón de unidades.",
          "El restyling de 1986 cambió paragolpes, ópticas e interior, y trajo la rural Break de hasta siete plazas. Hubo un segundo restyling a comienzos de los 90, y el SRi de 1992 sumó suspensión trasera independiente y frenos a disco en las cuatro ruedas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "Nafteros 2.0 de 96 y 100 CV.",
          "SR Injection: 2.0 de inyección y 113 CV.",
          "2.2 de inyección multipunto y 130 CV, el más potente.",
          "Turbodiésel 2.3 de 80 CV y 2.5 de 95 CV.",
          "Cajas manuales de cuatro o cinco marchas, o automática. Algunas rurales tuvieron tracción 4x4 hecha por Dangel.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: zócalos, piso, pasarruedas y la parte baja del portón de la rural.",
          "Tren trasero, caja y diferencial: ruidos al acelerar o al soltar el acelerador indican desgaste.",
          "Turbodiésel: humo, temperatura y estado del turbo.",
          "Interior y equipamiento: las versiones tope de gama tenían mucha electricidad; probá levantavidrios, cierre centralizado y aire acondicionado.",
          "Historial de GNC y de remís: un auto particular y original vale más.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autocosmos — Autos clásicos de Argentina: Peugeot 505 (2024)", url: "https://noticias.autocosmos.com.ar/2024/10/17/autos-clasicos-de-argentina-peugeot-505" },
      { titulo: "Autoweb — A 40 años de la aparición del Peugeot 505 argentino", url: "https://www.autoweb.com.ar/?p=23775" },
    ],
    modelo: { marca: "Peugeot", modelos: ["505"] },
  },
  {
    slug: "renault-12",
    titulo: "Renault 12",
    kicker: "Guía de modelo · 1971–1994",
    resumen:
      "Más de 440.000 unidades y 23 años de producción en Córdoba: el Renault 12 fue el auto de miles de familias argentinas, y la Break, la rural de las vacaciones.",
    descripcionSeo:
      "Renault 12 argentino (1971–1994): historia, versiones (TL, TS, GTS, Break, Alpine), motores y qué revisar antes de comprar.",
    cifras: [
      { valor: "1971–1994", etiqueta: "años de producción en el país" },
      { valor: "+440.000", etiqueta: "unidades fabricadas" },
      { valor: "Santa Isabel", etiqueta: "planta de IKA-Renault en Córdoba" },
      { valor: "493", etiqueta: "R12 Alpine fabricados" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/R12TL.JPG/1280px-R12TL.JPG",
      alt: "Renault 12 TL",
      pie: "Renault 12 TL.",
      autor: "Snoopy1974",
      licencia: "Dominio público",
      licenciaUrl: "https://commons.wikimedia.org/wiki/File:R12TL.JPG",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:R12TL.JPG",
      ancho: 1280,
      alto: 853,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en Francia en 1969, el Renault 12 se lanzó en la Argentina en 1971, fabricado por IKA-Renault en Santa Isabel, Córdoba. La rural Break llegó en 1974.",
          "Se fabricó hasta 1994, con más de 440.000 unidades. En 1978 apareció el R12 Alpine, el primer Alpine hecho fuera de Francia: solo 493 unidades, hoy las más buscadas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones y motores",
        items: [
          "Primeros: motor 1.3 de 54 CV.",
          "TL (1976): 1.4 de 60 CV. TS (1976): 1.4 de 74 CV, con aire acondicionado opcional.",
          "GTS (1984): 1.4 de 77 CV.",
          "GTL (1990): primera caja de cinco marchas.",
          "Últimos años: motor 1.6 de 63 o 77 CV.",
          "Tracción delantera y caja manual de cuatro marchas hasta la llegada del GTL.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: zócalos, piso, torretas de suspensión, pasarruedas y el borde del baúl o del portón de la Break.",
          "Historial de GNC y de taxi: muy comunes en el R12. Uno particular y original vale más.",
          "Caja y homocinéticas: ruidos al doblar con el volante a fondo indican desgaste.",
          "Alpine: verificá los números y la originalidad con el club de la marca, porque hay muchas réplicas.",
          "Repuestos: abundantes y baratos, gracias a los 23 años de producción.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autocosmos — Autos clásicos de Argentina: Renault 12 (2025)", url: "https://noticias.autocosmos.com.ar/2025/02/27/autos-clasicos-de-argentina-renault-12" },
      { titulo: "Autoweb — El Renault 12 argentino cumple 50 años (2021)", url: "https://www.autoweb.com.ar/?p=21835" },
    ],
    modelo: { marca: "Renault", modelos: ["12"] },
  },
  {
    slug: "renault-fuego",
    titulo: "Renault Fuego",
    kicker: "Guía de modelo · 1982–1992",
    resumen:
      "La coupé de los 80: rival del Taunus GT y del Sierra XR4, campeona de TC2000 con Traverso y Oreste Berta, y con una GTA Max final de 123 CV que hoy es una de las youngtimers argentinas más buscadas.",
    descripcionSeo:
      "Renault Fuego argentina (1982–1992): historia, versiones GTX, GTA y GTA Max, TC2000 y qué revisar antes de comprar una.",
    cifras: [
      { valor: "1982–1992", etiqueta: "años de producción en el país" },
      { valor: "19.952", etiqueta: "unidades fabricadas" },
      { valor: "Santa Isabel", etiqueta: "planta de Renault en Córdoba" },
      { valor: "123 CV", etiqueta: "de la GTA Max, la última versión" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Renault_Fuego_front_20080123.jpg/1280px-Renault_Fuego_front_20080123.jpg",
      alt: "Renault Fuego, vista frontal",
      pie: "Renault Fuego.",
      autor: "Rudolf Stricker",
      licencia: "CC BY-SA 3.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Renault_Fuego_front_20080123.jpg",
      ancho: 1280,
      alto: 675,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentada en Europa en 1980, la Fuego llegó a la Argentina importada en 1981 y empezó a fabricarse al año siguiente en Santa Isabel. La última salió de la planta en septiembre de 1992, con 19.952 unidades.",
          "Debutó en el TC2000 en 1985 y ganó su primera carrera con Ernesto Bessone. Con Juan María Traverso y la preparación de Oreste Berta se convirtió en la coupé a vencer, y también fue campeona con Silvio Oltra y Miguel Ángel Guerra.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones y motores",
        items: [
          "GTX: motor 2.0 del Renault 18, llevado a 103 CV, con caja de cinco marchas; después se sumó una automática de tres.",
          "1987: motor 2.2 de 116 CV, para pelear con el Sierra XR4.",
          "GTA (fines de 1988): restyling estilo Alpine GTA, con paragolpes y molduras del color de la carrocería, llantas nuevas y apéndices aerodinámicos.",
          "GTA Max: la última evolución, con el 2.2 llevado a 123 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: zócalos, piso, pasarruedas y el marco de la gran luneta trasera, donde se junta agua.",
          "Interior: los plásticos y tapizados de época son difíciles de conseguir; un interior completo y sano suma mucho valor.",
          "Originalidad de la GTA Max: verificá números y detalles, porque es la versión que más se «copia».",
          "Motor 2.2: temperatura, pérdidas de aceite y estado de la distribución.",
          "Ex autos de competencia o muy modificados: revisá jaulas, soldaduras y el estado del tren delantero.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autoweb — La Renault Fuego festeja 40 años en la Argentina", url: "https://www.autoweb.com.ar/?p=30235" },
      { titulo: "Autotest — La increíble historia de la Renault Fuego GTA Max", url: "https://autotest.com.ar/noticias/increible-historia-renault-fuego-gta-max/" },
    ],
    modelo: { marca: "Renault", modelos: ["Fuego"] },
  },
  {
    slug: "citroen-3cv",
    titulo: "Citroën 2CV y 3CV",
    kicker: "Guía de modelo · 1960–1990",
    resumen:
      "El «Citroneta» y su versión argentina, el 3CV: un bicilíndrico refrigerado por aire, simple y querible, que se fabricó en el país durante tres décadas, primero por Citroën y después por IES.",
    descripcionSeo:
      "Citroën 2CV y 3CV argentinos (1960–1990): historia, versiones, motores de 425 y 602 cc, IES 3CV y qué revisar antes de comprar.",
    cifras: [
      { valor: "1960–1990", etiqueta: "años de producción en el país" },
      { valor: "170.590", etiqueta: "2CV y 3CV hechos por Citroën" },
      { valor: "602 cc", etiqueta: "motor del 3CV, de 28 a 32 CV" },
      { valor: "300", etiqueta: "pick-ups 2CV, exclusivas del país" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Citroen_2CV_1X7A7979.jpg/1280px-Citroen_2CV_1X7A7979.jpg",
      alt: "Citroën 2CV",
      pie: "Citroën 2CV.",
      autor: "Alexander Migl",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Citroen_2CV_1X7A7979.jpg",
      ancho: 1280,
      alto: 905,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Citroën empezó a fabricar el 2CV en la Argentina en 1960. En 1967 abrió su planta de Barracas, donde también se hicieron el Ami 8 y el Mehari. En 1969 llegó el 3CV, un nombre exclusivo del mercado argentino, con el motor más grande de 602 cc.",
          "Citroën fabricó 170.590 unidades de 2CV y 3CV hasta 1980, cuando cerró la fábrica. En 1983, IES retomó la producción con el IES 3CV y sus versiones América y Súper América, hasta 1990. No hay cifras oficiales de las unidades hechas por IES.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones y motores",
        items: [
          "2CV: bicilíndrico opuesto de 425 cc refrigerado por aire, de 12 CV y después 14 y 18 CV. Desde 1966, con embrague centrífugo.",
          "3CV (1969): 602 cc, de 28 a 32 CV. En 1974 llegó el 3CV Prestige.",
          "Pick-up 2CV: exclusiva de la Argentina, con solo 300 unidades.",
          "IES 3CV, América y Súper América (1983–1990): mismo motor de 602 cc y 32 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Chasis: es la pieza clave. Revisá óxido en los largueros y el piso, y que no haya soldaduras improvisadas.",
          "Carrocería: zócalos, parte baja de las puertas y anclajes del techo de lona.",
          "Motor: muy simple, pero escuchá ruidos de bancada y revisá pérdidas de aceite.",
          "Frenos y suspensión: la suspensión interconectada tiene que trabajar pareja; los bujes gastados se notan en el andar.",
          "Pick-up y versiones IES: confirmá la originalidad, porque hay muchas transformaciones.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autocosmos — Autos clásicos de Argentina: Citroën 2CV/3CV (2025)", url: "https://noticias.autocosmos.com.ar/2025/02/06/autos-clasicos-de-argentina-citroen-2cv3cv" },
      { titulo: "Wikipedia — Citroën Argentina", url: "https://en.wikipedia.org/wiki/Citro%C3%ABn_Argentina" },
    ],
    modelo: { marca: "Citroën", modelos: ["2CV", "3CV"] },
  },
  {
    slug: "mercedes-benz-sl-r107",
    titulo: "Mercedes-Benz SL R107",
    kicker: "Guía de modelo · 1971–1989",
    resumen:
      "Dieciocho años de producción y casi 240.000 unidades: el SL R107 es el roadster Mercedes por excelencia, con capota de lona, hardtop y motores de seis cilindros y V8.",
    descripcionSeo:
      "Mercedes-Benz SL R107 (1971–1989): versiones 280 a 560 SL, el coupé SLC, motores y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1971–1989", etiqueta: "años de producción" },
      { valor: "237.287", etiqueta: "SL R107 fabricados" },
      { valor: "62.888", etiqueta: "coupés SLC C107" },
      { valor: "66.298", etiqueta: "450 SL, el más vendido" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/1988_Mercedes_SL_280.jpg/1280px-1988_Mercedes_SL_280.jpg",
      alt: "Mercedes-Benz 280 SL R107 de 1988",
      pie: "Mercedes-Benz 280 SL (R107) de 1988.",
      autor: "Calreyn88",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1988_Mercedes_SL_280.jpg",
      ancho: 1280,
      alto: 756,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Lanzado en abril de 1971 como 350 SL, con diseño de Friedrich Geiger, el R107 se fabricó hasta 1989. A su lado se hizo el SLC C107, un coupé de techo fijo y distancia entre ejes más larga, que se dejó de producir en 1981.",
          "Con los años sumó ABS opcional (1980), hardtop de serie (1980), airbag de conductor opcional (1982) y, en 1985, un restyling con catalizador. El 560 SL de 1985 a 1989 fue pensado para los Estados Unidos.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones",
        items: [
          "280 SL (1974–1985): seis en línea de 185 CV, 25.436 unidades.",
          "300 SL (1985–1989): seis en línea, 13.742 unidades.",
          "350 SL (1971–1980): V8 de 200 CV, 15.304 unidades.",
          "450 SL: V8 de 4,5 litros, el más fabricado, con 66.298 unidades.",
          "380 SL (1980–1985): 53.200 unidades. 420 SL (1985–1989): 2.148 unidades.",
          "500 SL (1980–1989): V8 de 240 CV, 11.812 unidades. 560 SL (1985–1989): 49.347 unidades.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: sobre los faros, travesaño del radiador, torpedo y caja de calefacción, zócalos, puntos de levante, detrás de los paragolpes, alrededor de las ópticas traseras y el hueco de la capota.",
          "Luces entre paneles y pintura: delatan choques o soldaduras mal hechas.",
          "V8: botadores ruidosos y juego en la cadena de distribución. Los anteriores a 1976, con inyección D-Jetronic, son más propensos a fallas.",
          "Radiador sin protección delantera: buscá golpes de piedras y señales de recalentamiento.",
          "Caja de dirección, amortiguador de dirección y bujes de suspensión gastados.",
          "Cierre centralizado por vacío con pérdidas, y toda la electricidad.",
          "Capota: luneta opaca, costuras y humedad en el habitáculo.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Hagerty UK — Buying guide: Mercedes-Benz SL R107", url: "https://hagerty.co.uk/articles/buying-guide-mercedes-benz-sl-r107-1971-1989" },
      { titulo: "mb107.com — Series 107 production", url: "https://mb107.com/specs/production.htm" },
      { titulo: "Classic Trader — Mercedes-Benz R107 buying guide", url: "https://www.classic-trader.com/en/magazine/mercedes-benz-r-107-buying-guide" },
    ],
    modelo: { marca: "Mercedes-Benz", modelos: ["SL R107"] },
  },
  {
    slug: "mercedes-benz-sl-r129",
    titulo: "Mercedes-Benz SL R129",
    kicker: "Guía de modelo · 1989–2001",
    resumen:
      "El SL de los 90: arco antivuelco que se despliega en 0,3 segundos, hardtop de serie y motores de seis cilindros, V8 y hasta un V12. Un clásico moderno que ya es youngtimer.",
    descripcionSeo:
      "Mercedes-Benz SL R129 (1989–2001): versiones 300 SL a 600 SL, seguridad, motores y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1989–2001", etiqueta: "años de producción" },
      { valor: "204.940", etiqueta: "unidades fabricadas" },
      { valor: "0,3 s", etiqueta: "para desplegar el arco antivuelco" },
      { valor: "394 CV", etiqueta: "del 600 SL V12" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mercedes-Benz_SL_R129_.jpg/1280px-Mercedes-Benz_SL_R129_.jpg",
      alt: "Mercedes-Benz SL R129",
      pie: "Mercedes-Benz SL (R129).",
      autor: "IFCAR",
      licencia: "Dominio público",
      licenciaUrl: "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_SL_R129_.jpg",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_SL_R129_.jpg",
      ancho: 1280,
      alto: 679,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en el Salón de Ginebra de 1989 sobre una plataforma acortada del W124, el R129 llevó la seguridad del roadster a otro nivel: un arco antivuelco que se despliega en 0,3 segundos cuando un sensor detecta un vuelco inminente.",
          "Tuvo hardtop de serie, ESP desde 1995 y airbags laterales desde 1996. En 1993 cambió la nomenclatura: los 300 SL y 500 SL pasaron a llamarse SL 320 y SL 500.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "300 SL: seis en línea M103 de 190 CV. 300 SL-24: M104 de 231 CV.",
          "SL 280 (193 CV) y SL 320 (231 CV) desde 1993, seis en línea M104. Desde 1998, V6 de 204 y 224 CV.",
          "500 SL / SL 500: V8 M119 de 320 a 326 CV, 79.827 unidades. Desde 1998, V8 M113 de 306 CV.",
          "600 SL: V12 M120 de 394 CV, 11.089 unidades.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: borde inferior de los guardabarros delanteros, pasarruedas, bordes de las puertas y de los guardabarros traseros. La corrosión puede romper los resortes delanteros.",
          "Capota: el módulo de control bajo el asiento trasero, los hidráulicos y la luneta.",
          "Arnés de cables biodegradable en los de 1993 a 1995: si no se cambió, hay que presupuestarlo.",
          "Seis cilindros M104: junta de tapa de cilindros y fallas de encendido. V12: pérdida de aceite por la tapa delantera.",
          "Caja automática de cinco marchas: agua que entra al módulo de control por el conector. Reparar es caro.",
          "Suspensión adaptativa ADS: esferas y válvulas gastadas, también caras.",
          "Rótulas, cazoletas, displays del tablero y falsos AMG.",
        ],
      },
    ],
    fuentes: [
      { titulo: "PistonHeads — Mercedes-Benz SL (R129) used buying guide", url: "https://www.pistonheads.com/news/ph-buying-guides/mercedes-benz-sl--r129----ph-used-buying-guide/41379" },
      { titulo: "Classic Trim Parts — Mercedes-Benz R129 facts and figures", url: "https://classictrimparts.com/blogs/mercedes-articles/mercedes-benz-r129-facts-and-figures" },
      { titulo: "MBCA — A future classic: the R129 SL model range", url: "https://mbca.org/buyers-guide/future-classic-r129-sl-model-range-1989-2002" },
    ],
    modelo: { marca: "Mercedes-Benz", modelos: ["SL R129"] },
  },
  {
    slug: "mercedes-benz-slk-r170",
    titulo: "Mercedes-Benz SLK R170",
    kicker: "Guía de modelo · 1996–2004",
    resumen:
      "El roadster que popularizó el techo rígido plegable: en unos 25 segundos pasa de coupé a descapotable. Más de 300.000 unidades, del SLK 200 al SLK 32 AMG.",
    descripcionSeo:
      "Mercedes-Benz SLK R170 (1996–2004): el techo Vario-roof, motores Kompressor, V6 y AMG, y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1996–2004", etiqueta: "años de producción" },
      { valor: "+300.000", etiqueta: "unidades fabricadas" },
      { valor: "~25 s", etiqueta: "para abrir o cerrar el techo" },
      { valor: "354 CV", etiqueta: "del SLK 32 AMG" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/SLK200K.jpg/1280px-SLK200K.jpg",
      alt: "Mercedes-Benz SLK 200 Kompressor R170",
      pie: "Mercedes-Benz SLK 200 Kompressor (R170).",
      autor: "Cars4u",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:SLK200K.jpg",
      ancho: 1280,
      alto: 960,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado como concepto en París en 1994 y como auto de serie en Turín en 1996, el SLK usó una plataforma acortada del Clase C W202. Su gran novedad fue el Vario-roof, un techo rígido de metal que se pliega dentro del baúl.",
          "El restyling de 2000 trajo el SLK 320 V6, y en 2001 llegó el SLK 32 AMG, con V6 sobrealimentado. Lo reemplazó el R171 en 2004.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "SLK 200: 136 CV.",
          "SLK 200 Kompressor: 192 CV al principio, en los mercados con impuestos altos, y 163 CV desde 2000.",
          "SLK 230 Kompressor: 193 CV.",
          "SLK 320 (desde 2000): V6 de 218 CV, con 33.416 unidades.",
          "SLK 32 AMG (desde 2001): V6 sobrealimentado de 354 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Techo: tiene que abrir y cerrar en unos 25 segundos; más de 30 indica una falla hidráulica. Revisá microinterruptores, cilindros, el color del líquido, el módulo de control y los burletes.",
          "Óxido: guardabarros delanteros, pasarruedas, zócalos, parantes del parabrisas, piso, subchasis trasero y anclajes de los resortes delanteros.",
          "Cuatro cilindros Kompressor: desgaste de la cadena de distribución y embrague del compresor. Pérdidas de aceite y bomba de agua.",
          "Caja automática: una falla de la placa de sensores la deja en modo de emergencia.",
          "Agua en el baúl: arruina la bomba de vacío del cierre centralizado y los relés.",
          "Amortiguador de dirección, bujes del subchasis y rótulas.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Classics World — Mercedes SLK R170 buyer's guide", url: "https://classicsworld.co.uk/guides/mercedes-slk-r170-buyers-guide/" },
      { titulo: "MercedesBlog — Buying advice Mercedes SLK R170", url: "https://mercedesblog.com/buying-advice-mercedes-slk-r170/" },
    ],
    modelo: { marca: "Mercedes-Benz", modelos: ["SLK R170"] },
  },
  {
    slug: "mercedes-benz-clk-w208",
    titulo: "Mercedes-Benz CLK W208",
    kicker: "Guía de modelo · 1997–2003",
    resumen:
      "El coupé y el cabrio de la familia Clase C, con la trompa de cuatro faros del Clase E. Del CLK 200 al CLK 55 AMG, hoy es uno de los youngtimers Mercedes más accesibles.",
    descripcionSeo:
      "Mercedes-Benz CLK W208 (1997–2003): coupé y cabriolet, motores Kompressor, V6, V8 y AMG, y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1997–2003", etiqueta: "años de producción" },
      { valor: "2", etiqueta: "carrocerías: coupé y cabriolet" },
      { valor: "Karmann", etiqueta: "armó los cabriolets en Osnabrück" },
      { valor: "347 CV", etiqueta: "del CLK 55 AMG" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Red_MB_C208_CLK_430_(US_spec_AMG_package)_fl,_Washington,_D.C._(20120715-DSC03683.dng).jpg/1280px-Red_MB_C208_CLK_430_(US_spec_AMG_package)_fl,_Washington,_D.C._(20120715-DSC03683.dng).jpg",
      alt: "Mercedes-Benz CLK 430 coupé rojo",
      pie: "Mercedes-Benz CLK 430 coupé (C208).",
      autor: "Matti Blume (MB-one)",
      licencia: "CC BY-SA 3.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Red_MB_C208_CLK_430_%28US_spec_AMG_package%29_fl%2C_Washington%2C_D.C._%2820120715-DSC03683.dng%29.jpg",
      ancho: 1280,
      alto: 705,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "El coupé C208 se fabricó de marzo de 1997 a 2002, sobre la base del Clase C W202. El cabriolet A208 llegó en junio de 1998 y se hizo hasta marzo de 2003, armado por Karmann en Osnabrück.",
          "No tuvo versiones diésel: todos sus motores son nafteros, de cuatro, seis y ocho cilindros.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "CLK 200: 136 CV. CLK 200 Kompressor: 163 CV desde 2000, y 192 CV en algunos mercados.",
          "CLK 230 Kompressor: 193 CV, y 197 CV desde 2000.",
          "CLK 320: V6 de 218 CV.",
          "CLK 430: V8 de 279 CV.",
          "CLK 55 AMG: V8 de 347 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: pasarruedas delanteros detrás de los guardabarros plásticos, parte baja de las puertas, zócalos en los puntos de levante y, en el cabrio, el hueco de la capota y el piso del baúl.",
          "Anclajes de los resortes delanteros: pueden picarse y romperse.",
          "Kompressor de cuatro cilindros: múltiple de escape fisurado, desgaste del compresor, junta de tapa y tensor de cadena (ruido al arrancar en frío).",
          "V6 y V8: mariposas de admisión que se rompen, pérdidas de aceite y caño de agua entre bancadas.",
          "Cabriolet: bomba y cilindros hidráulicos de la capota, burletes y lona fisurada en los pliegues.",
          "Electricidad: conectores del airbag, display del tablero, levantavidrios del conductor y xenón.",
          "Caja automática: confirmá que se cambió el aceite.",
        ],
      },
    ],
    fuentes: [
      { titulo: "StillRunningStrong — Mercedes-Benz CLK-Class (W208)", url: "https://stillrunningstrong.com/?p=1495" },
      { titulo: "AutoScout24 — Gebrauchtwagen-Kaufberater Mercedes-Benz CLK", url: "https://www.autoscout24.de/informieren/testberichte/mercedes-benz/model/gebrauchtwagen-kaufberater-mercedes-benz-clk/" },
    ],
    modelo: { marca: "Mercedes-Benz", modelos: ["CLK"] },
  },
  {
    slug: "bmw-serie-5-e34",
    titulo: "BMW Serie 5 E34",
    kicker: "Guía de modelo · 1988–1996",
    resumen:
      "Cerca de 1,3 millones de unidades, el primer V8 de un Serie 5 y una M5 de seis en línea hecha a mano: el E34 es la berlina de tracción trasera que muchos consideran la mejor de BMW.",
    descripcionSeo:
      "BMW Serie 5 E34 (1988–1996): sedán y Touring, motores de 518i a 540i, la M5 y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1988–1996", etiqueta: "años de producción" },
      { valor: "~1,3 millones", etiqueta: "unidades fabricadas" },
      { valor: "12.254", etiqueta: "M5 E34 fabricadas" },
      { valor: "340 CV", etiqueta: "de la M5 3.8" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/1989_BMW_525i_(E34)_sedan_(2015-11-13)_01.jpg/1280px-1989_BMW_525i_(E34)_sedan_(2015-11-13)_01.jpg",
      alt: "BMW 525i E34 de 1989",
      pie: "BMW 525i (E34) de 1989.",
      autor: "OSX",
      licencia: "Dominio público",
      licenciaUrl: "https://commons.wikimedia.org/wiki/File:1989_BMW_525i_%28E34%29_sedan_%282015-11-13%29_01.jpg",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1989_BMW_525i_%28E34%29_sedan_%282015-11-13%29_01.jpg",
      ancho: 1280,
      alto: 856,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado a fines de 1987, el E34 se vendió primero como sedán; la rural Touring llegó en 1991. Lo reemplazó el E39 en 1996.",
          "La M5 E34 se fabricó de 1988 a 1995, con 12.254 unidades. Usó un seis en línea S38 de 3,5 litros y 315 CV, y desde fines de 1991, de 3,8 litros y 340 CV. Desde 1994 tuvo caja de seis marchas de serie.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "518i: cuatro cilindros M40.",
          "520i y 525i: seis en línea M20, luego M50.",
          "530i y 535i: seis en línea, el 535i de 211 CV.",
          "540i: V8 de 286 CV, el primer V8 de un Serie 5.",
          "525tds: turbodiésel de seis cilindros. 525iX: tracción integral, muy escaso.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: zócalos (desagües del techo corredizo tapados), guardabarros delanteros, pasarruedas traseros, parte baja de las puertas, puntos de levante y la zona de la boca de carga.",
          "Refrigeración: radiador, bomba de agua y embrague del ventilador. Un recalentamiento daña la junta o fisura la tapa de cilindros.",
          "Distribución: correa cada 4 años en los M20 y M40. Un ruido al arrancar en frío indica tensor de cadena gastado. En el V8, el trabajo de cadena es caro.",
          "Suspensión: bujes de los brazos delanteros (vibración cerca de 80 km/h), bujes del eje trasero y nivelación automática con pérdidas.",
          "Caja de dirección: revisá que no tenga juego.",
          "M5: calibración de válvulas cada 25.000 km y bobinas en la 3.8. Muchos repuestos exclusivos son escasos.",
          "Interior: radiador de calefacción con pérdidas (alfombras mojadas), tablero y guías de los asientos.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Classics World — BMW 5 Series E34 buyer's guide", url: "https://classicsworld.co.uk/guides/bmw-5-series-e34-buyers-guide/" },
      { titulo: "PistonHeads — BMW M5 (E34) used buying guide", url: "https://www.pistonheads.com/news/ph-buying-guides/bmw-m5-e34--ph-used-buying-guide/38136" },
      { titulo: "Hagerty — BMW M5 E34", url: "https://www.hagerty.com/media/?p=5798" },
    ],
    modelo: { marca: "BMW", modelos: ["Serie 5 E34"] },
  },
  {
    slug: "bmw-serie-5-e39",
    titulo: "BMW Serie 5 E39",
    kicker: "Guía de modelo · 1995–2003",
    resumen:
      "Cerca de 1,5 millones de unidades y una M5 V8 de 400 CV: el E39 combina confort, buen manejo y motores diésel muy logrados. Es el Serie 5 que muchos todavía usan a diario.",
    descripcionSeo:
      "BMW Serie 5 E39 (1995–2003): sedán y Touring, motores nafteros y diésel, la M5 V8 y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1995–2003", etiqueta: "años de producción" },
      { valor: "~1,5 millones", etiqueta: "unidades fabricadas" },
      { valor: "20.482", etiqueta: "M5 E39 fabricadas" },
      { valor: "400 CV", etiqueta: "de la M5, V8 S62 de 5 litros" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/2000-2003_BMW_525i_(E39)_Executive_sedan_(2010-10-02)_01.jpg/1280px-2000-2003_BMW_525i_(E39)_Executive_sedan_(2010-10-02)_01.jpg",
      alt: "BMW 525i E39",
      pie: "BMW 525i (E39), después del restyling de 2000.",
      autor: "OSX",
      licencia: "Dominio público",
      licenciaUrl: "https://commons.wikimedia.org/wiki/File:2000-2003_BMW_525i_%28E39%29_Executive_sedan_%282010-10-02%29_01.jpg",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:2000-2003_BMW_525i_%28E39%29_Executive_sedan_%282010-10-02%29_01.jpg",
      ancho: 1280,
      alto: 585,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en el Salón de Fráncfort de 1995, el E39 se fabricó hasta 2003, como sedán y, desde 1996, como Touring. El restyling de junio de 2000 renovó ópticas e interior.",
          "La M5 E39 se fabricó en Dingolfing de octubre de 1998 a junio de 2003, con 20.482 unidades. Su V8 S62 de 5 litros y 400 CV la convirtió en una de las berlinas más rápidas de su época.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "Seis en línea M52 y M54: los 523i y 528i pasaron a llamarse 525i y 530i en 2000. El 530i M54 tiene 231 CV.",
          "540i: V8 de 4,4 litros y 286 CV.",
          "Diésel: 520d (M47), 525d (M51) y 530d (M57, desde 1998).",
          "M5: V8 S62 de 5 litros y 400 CV, con caja manual de seis marchas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido: bordes de los pasarruedas, zócalos traseros detrás de las tapas plásticas, boca de carga y puntos de levante.",
          "Refrigeración y junta de tapa de cilindros en los M52 y M54. Ruido de VANOS.",
          "Bujes del subchasis trasero, hacia los 160.000 km: saltos de la rueda trasera y un andar trasero flojo.",
          "Diésel: mariposas de admisión (desde 2001, conviene quitarlas), inyectores y turbo.",
          "Caja automática: pérdidas y funcionamiento del Steptronic. Una reparación completa es cara.",
          "Electricidad: píxeles del tablero, sensor del asiento del acompañante, cableado del baúl y regulación del xenón.",
          "Válvula de ralentí que se traba (ralentí irregular): casi siempre alcanza con limpiarla.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Classics World — BMW 5 Series E39 buyer's guide", url: "https://classicsworld.co.uk/guides/bmw-5-series-e39-buyers-guide/" },
      { titulo: "BMW Group Classic — BMW M5 (E39)", url: "https://www.bmwgroup-classic.com/en/models/bmw-classics/product-description-page.ad-1569-1.bmw-m5-e39.html" },
    ],
    modelo: { marca: "BMW", modelos: ["Serie 5 E39"] },
  },
  {
    slug: "bmw-serie-8-e31",
    titulo: "BMW Serie 8 E31",
    kicker: "Guía de modelo · 1990–1999",
    resumen:
      "El gran coupé de BMW: el primer V12 de producción de la marca, el primero ofrecido con caja manual de seis marchas y un coeficiente aerodinámico de 0,29. Solo 30.621 unidades.",
    descripcionSeo:
      "BMW Serie 8 E31 (1990–1999): 850i, 850Ci, 850CSi y 840Ci, V12 y V8, y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1990–1999", etiqueta: "años de producción" },
      { valor: "30.621", etiqueta: "unidades fabricadas" },
      { valor: "1.510", etiqueta: "850CSi, el más escaso" },
      { valor: "0,29", etiqueta: "coeficiente aerodinámico" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/BMW_840_Ci_(7724204324)_(cropped).jpg/1280px-BMW_840_Ci_(7724204324)_(cropped).jpg",
      alt: "BMW 840Ci E31",
      pie: "BMW 840Ci (E31).",
      autor: "nakhon100",
      licencia: "CC BY 2.0",
      licenciaUrl: "https://creativecommons.org/licenses/by/2.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:BMW_840_Ci_%287724204324%29_%28cropped%29.jpg",
      ancho: 1280,
      alto: 790,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en el Salón de Fráncfort de 1989, el E31 se fabricó de 1990 a 1999. Fue el primer BMW de producción con motor V12 y el primer V12 de serie ofrecido con caja manual de seis marchas, con acelerador electrónico y una línea muy aerodinámica.",
          "El 850CSi (1993–1996), con V12 de 5,6 litros, caja manual y dirección en las ruedas traseras, es hoy el más buscado. El 830i y la M8 de 629 CV quedaron en prototipos.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Versiones",
        items: [
          "850i: V12 de 5 litros y 300 CV, con 20.072 unidades.",
          "850Ci: V12 de 5,4 litros y 326 CV, con 1.218 unidades.",
          "850CSi: V12 de 5,6 litros y 380 CV, solo con caja manual, con 1.510 unidades.",
          "840Ci: V8 de 4 litros desde 1993 y de 4,4 litros desde 1996, ambos de 286 CV, con 7.803 unidades.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Refrigeración: bomba de agua, depósito de expansión plástico, radiador y ventilador. Un recalentamiento sale carísimo.",
          "Primeros V8 M60: cilindros con Nikasil, humo al arrancar y tensor de la cadena.",
          "Electricidad: display de matriz de puntos con píxeles muertos, faros escamoteables, levantavidrios y asientos.",
          "Bujes del eje trasero y de los brazos delanteros, todos caros.",
          "Óxido y filtraciones: borde del capó, techo corredizo, parte baja de las puertas, zócalos, puntos de levante y agua en el hueco de la rueda de auxilio.",
          "El paragolpes delantero plástico y las piezas del interior son escasos y caros.",
          "Cajas: sincronizados de la manual de seis marchas y cambios bruscos en las automáticas. El historial de service es indispensable.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Hagerty UK — BMW 8 Series buyer's guide", url: "https://www.hagerty.co.uk/articles/buyers-guide-bmw-8-series/" },
      { titulo: "Classic Trader — BMW E31 8 Series buying guide", url: "https://www.classic-trader.com/en/magazine/bmw-e31-8-series-buying-guide" },
    ],
    modelo: { marca: "BMW", modelos: ["Serie 8 E31"] },
  },
  {
    slug: "bmw-z3",
    titulo: "BMW Z3",
    kicker: "Guía de modelo · 1995–2002",
    resumen:
      "El roadster de James Bond en GoldenEye y el primer BMW fabricado fuera de Alemania. Casi 300.000 unidades, del 1.8 a las M Roadster y M Coupé.",
    descripcionSeo:
      "BMW Z3 (1995–2002): roadster y coupé, motores de cuatro y seis cilindros, M Roadster y M Coupé, y qué revisar antes de comprar uno.",
    cifras: [
      { valor: "1995–2002", etiqueta: "años de producción" },
      { valor: "297.087", etiqueta: "unidades fabricadas" },
      { valor: "Spartanburg", etiqueta: "Carolina del Sur, Estados Unidos" },
      { valor: "~18.000", etiqueta: "coupés, todos de seis cilindros" },
    ],
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/1999_BMW_Z3_2.3_roadster,_front_right,_08-24-2024.jpg/1280px-1999_BMW_Z3_2.3_roadster,_front_right,_08-24-2024.jpg",
      alt: "BMW Z3 roadster de 1999",
      pie: "BMW Z3 roadster de 1999.",
      autor: "MercurySable99",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1999_BMW_Z3_2.3_roadster%2C_front_right%2C_08-24-2024.jpg",
      ancho: 1280,
      alto: 946,
    },
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "El Z3 se fabricó de septiembre de 1995 al 28 de junio de 2002 en Spartanburg, Carolina del Sur: el primer BMW hecho por completo fuera de Alemania. Ese mismo año apareció en GoldenEye, el primer auto no británico en una película oficial de 007.",
          "Al roadster se sumó en 1998 un coupé de techo fijo y portón trasero, del que se hicieron poco menos de 18.000 unidades, todas de seis cilindros.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "Cuatro cilindros: 1.8 (115 CV) y 1.9 (140 CV, luego 118 CV).",
          "Seis en línea: 2.0 (150 CV), 2.2 (170 CV), 2.8 (193 CV) y 3.0 (231 CV).",
          "M Roadster y M Coupé: 321 CV en Europa y 240 CV en los Estados Unidos. En 2001–2002, el S54 de 325 CV; solo 168 M Coupé lo tuvieron.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Fisuras en el piso del baúl alrededor de los anclajes del diferencial: levantá la alfombra y escuchá si hay un crujido que empeora.",
          "Óxido: guardabarros abulonados, zócalos, parte delantera del piso, brazos traseros y parrillas.",
          "Refrigeración: junta de tapa de cilindros en los M44, M52 y M54, y codos plásticos frágiles en el M43.",
          "Los 2.8 anteriores a marzo de 1998 tienen block con Nikasil. Retenes del VANOS en los M52TU.",
          "Capota: burletes, cierres y la luneta plástica.",
          "Asientos que se mueven por guías gastadas (arreglo barato) y golpes en las cazoletas traseras.",
          "Pérdidas de aceite por la tapa de válvulas y el soporte del filtro. El 2.2 tiende a consumir aceite.",
        ],
      },
    ],
    fuentes: [
      { titulo: "BMWBlog — BMW Z3 30th anniversary retrospective (2025)", url: "https://www.bmwblog.com/2025/07/26/bmw-z3-30th-anniversary-retrospective/" },
      { titulo: "Classics World — BMW Z3 buyer's guide", url: "https://classicsworld.co.uk/guides/bmw-z3-buyers-guide" },
    ],
    modelo: { marca: "BMW", modelos: ["Z3"] },
  },
  {
    slug: "audi-tt-8n",
    titulo: "Audi TT 8N",
    kicker: "Guía de modelo · 1998–2006",
    resumen:
      "Un diseño Bauhaus que sigue sorprendiendo: el primer TT, coupé o roadster, con el 1.8 turbo y tracción quattro, y al final un VR6 con la primera caja DSG del mercado.",
    descripcionSeo:
      "Audi TT 8N (1998–2006): coupé y roadster, motores 1.8T y 3.2 VR6, quattro y DSG, y qué revisar antes de comprar uno.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2000_Audi_TT_Quattro_1.8_Front.jpg/1280px-2000_Audi_TT_Quattro_1.8_Front.jpg",
      alt: "Audi TT quattro 1.8 de 2000",
      pie: "Audi TT quattro 1.8 de 2000.",
      autor: "Vauxford",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:2000_Audi_TT_Quattro_1.8_Front.jpg",
      ancho: 1280,
      alto: 637,
    },
    cifras: [
      { valor: "1998–2006", etiqueta: "años de producción" },
      { valor: "Győr", etiqueta: "armado en Hungría" },
      { valor: "250 CV", etiqueta: "del 3.2 VR6" },
      { valor: "1.165", etiqueta: "TT quattro Sport fabricados" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "El coupé llegó en 1998 y el roadster en 1999. Se armaba en Győr, Hungría, con las carrocerías hechas y pintadas en Ingolstadt. La producción europea terminó en 2005, con un último año modelo 2006.",
          "Los primeros autos, hasta comienzos de 2000, fueron llamados a revisión por inestabilidad a alta velocidad: se les sumaron resortes traseros más firmes, un ESP actualizado y el pequeño alerón trasero. Al comprar uno de esos años, conviene confirmar que se hizo.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "1.8 turbo de 150, 163, 180, 190 y 225 CV. El 150 CV (desde 2003) es solo de tracción delantera; el 225 CV lleva quattro de serie.",
          "3.2 VR6 de 250 CV, con quattro de serie y la caja DSG de seis marchas, que al principio solo se ofreció con este motor.",
          "TT quattro Sport (2005): 240 CV, solo coupé, 1.165 unidades.",
          "La tracción quattro del TT usa un acople Haldex.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "1.8 turbo: correa de distribución, tensor y bomba de agua (la original, de turbina plástica, es débil). Es un motor de interferencia: si se corta la correa, el daño es grande.",
          "Bobinas, termostato, caudalímetro y pérdidas de presión del turbo.",
          "Tablero: píxeles muertos y agujas que fallan, muy común en los anteriores a 2005.",
          "DSG: unidad mecatrónica. Haldex: bomba y módulo de control.",
          "Soporte de motor trasero («dog bone»). En el 3.2, desgaste del tensor de la cadena de distribución.",
          "Óxido en zócalos y pasarruedas, hidráulica de la capota en el roadster, y la revisión de estabilidad hecha en los primeros autos.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Garage Dreams — Ultimate Audi TT Mk1 8N buyer's guide", url: "https://garagedreams.net/buyers-guide/ultimate-audi-tt-mk1-8n-buyers-guide-history" },
      { titulo: "Audi — Der Audi TT: Ikone der Markengeschichte", url: "https://www.audi.com/de/medieninformationen/der-audi-tt-ikone-der-markengeschichte-16375" },
    ],
    modelo: { marca: "Audi", modelos: ["TT"] },
  },
  {
    slug: "audi-quattro",
    titulo: "Audi quattro",
    kicker: "Guía de modelo · 1980–1991",
    resumen:
      "El auto que llevó la tracción integral a los rallies y a la calle. El «Ur-quattro» ganó títulos mundiales con Mikkola y Mouton, y solo se fabricaron 11.452 unidades.",
    descripcionSeo:
      "Audi quattro «Ur-quattro» (1980–1991): motores de cinco cilindros turbo, historia en rally, Sport quattro y qué revisar antes de comprar uno.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/1985_Audi_Quattro.jpg/1280px-1985_Audi_Quattro.jpg",
      alt: "Audi quattro de 1985",
      pie: "Audi quattro de 1985.",
      autor: "Calreyn88",
      licencia: "CC0 (dominio público)",
      licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1985_Audi_Quattro.jpg",
      ancho: 1280,
      alto: 757,
    },
    cifras: [
      { valor: "1980–1991", etiqueta: "años de producción" },
      { valor: "11.452", etiqueta: "unidades fabricadas" },
      { valor: "5 cilindros", etiqueta: "turbo, de 2,1 y 2,2 litros" },
      { valor: "224", etiqueta: "Sport quattro de calle" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Presentado en 1980, el quattro llevó la tracción integral permanente a un coupé deportivo de calle. Se fabricó hasta la primavera de 1991, con 11.452 unidades.",
          "En los rallies cambió todo: debutó en Austria en 1980, Michèle Mouton ganó el Rally de San Remo de 1981 —la primera mujer en ganar una fecha del mundial— y Audi fue campeón de marcas en 1982 y 1984, con Hannu Mikkola campeón de pilotos en 1983. El Sport quattro de distancia entre ejes corta (1984) se hizo para homologar el auto de competición: 224 unidades de calle.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "WR (1980–1987): cinco cilindros turbo de 2.144 cm³ y 10 válvulas, unos 200 CV.",
          "MB (1987–1989): 2.226 cm³, 10 válvulas.",
          "RR (1989–1991): 2.226 cm³ y 20 válvulas, unos 220 CV. Es el más buscado.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Óxido en zócalos, parte baja de las puertas y pasarruedas, sobre todo en los anteriores a 1985. El galvanizado desde 1985 no lo descarta. Buscá choques mal reparados y largueros torcidos.",
          "Turbo con humo (el MB es el más propenso), múltiple de escape fisurado y caños del radiador de aceite corroídos.",
          "Correa de distribución cada 5 años o 70.000 km.",
          "Acumulador de frenos y cálipers trabados. Los sensores del ABS ya no se fabrican.",
          "Sincronizados débiles, bloqueo del diferencial y subchasis trasero fisurado.",
          "Repuestos: guardabarros, molduras y motores de levantavidrios son escasos. Pérdidas por la costura del tanque de nafta.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Classics World — Audi quattro buyer's guide", url: "https://classicsworld.co.uk/guides/audi-quattro-buyers-guide/" },
      { titulo: "Hagerty — The Audi Ur-Quattro is a rare and revolutionary '80s classic", url: "https://hagerty.com/media/?p=310742" },
    ],
    modelo: { marca: "Audi", modelos: ["Quattro"] },
  },
  {
    slug: "audi-80-b3-b4",
    titulo: "Audi 80 B3 y B4",
    kicker: "Guía de modelo · 1986–1996",
    resumen:
      "La berlina que construyó la reputación de calidad de Audi: carrocería galvanizada, cinco cilindros y V6, y versiones coupé y cabriolet que hoy son youngtimers muy buscados.",
    descripcionSeo:
      "Audi 80 B3 y B4 (1986–1996), Audi Coupé y Cabriolet: motores, S2 y RS2, y qué revisar antes de comprar uno.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Audi80-1992.JPG/1280px-Audi80-1992.JPG",
      alt: "Audi 80 de 1992",
      pie: "Audi 80 de 1992.",
      autor: "Mikael Wall",
      licencia: "Dominio público",
      licenciaUrl: "https://commons.wikimedia.org/wiki/File:Audi80-1992.JPG",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Audi80-1992.JPG",
      ancho: 1280,
      alto: 806,
    },
    cifras: [
      { valor: "1986–1996", etiqueta: "años del Audi 80 B3 y B4" },
      { valor: "~71.350", etiqueta: "Audi Cabriolet fabricados" },
      { valor: "315 CV", etiqueta: "del RS2 Avant, hecho con Porsche" },
      { valor: "1991–2000", etiqueta: "años del Cabriolet" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "El Audi 80 B3 llegó a fines del verano europeo de 1986 y fue el primer 80 con carrocería galvanizada. El B4 (tipo 8C) lo siguió en septiembre de 1991, y el A4 lo reemplazó a mediados de los 90.",
          "Sobre la base del B3 se hicieron el Audi Coupé (1988–1996), con el S2 de cinco cilindros turbo de 1991, y el Audi Cabriolet (1991–2000), con unas 71.350 unidades. En 1994 y 1995, Porsche armó en Zuffenhausen el RS2 Avant: cinco cilindros turbo de 2,2 litros y 315 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "2.0 de cuatro cilindros, de 113 a 140 CV, con versión 16 válvulas desde 1992.",
          "2.3 de cinco cilindros y 10 válvulas, de 133 a 136 CV.",
          "V6 de 2,6 litros (150 CV) y 2,8 litros (174 CV).",
          "1.9 TDI de 90 CV. En el Cabriolet de 1995 fue presentado como el primer descapotable diésel de serie.",
          "S2 Coupé: cinco cilindros turbo de 20 válvulas, el mismo motor del quattro.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Reparaciones de choque hechas con chapas no galvanizadas: revisá pasarruedas, pisos y subchasis delantero.",
          "Cinco cilindros 2.3: el chavetero de la polea del cigüeñal puede romperse y dañar válvulas y pistones.",
          "TDI: cambio de líquido refrigerante cada 2 años (riesgo de junta) e inyectores.",
          "V6: desgaste del tren delantero y amortiguadores, bujes y soportes vencidos.",
          "B3: caja automática, electricidad del tablero y cerradura del portón.",
          "Cabriolet: estado de la capota y de su mecanismo. RS2: correa específica, bobinas, sincronizados y repuestos escasos.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Secret Classics — 30 years of Audi Cabriolet", url: "https://www.secret-classics.com/en/30-years-of-audi-cabriolet/" },
      { titulo: "PistonHeads — Audi RS2 used buying guide", url: "https://www.pistonheads.com/news/ph-buying-guides/audi-rs2-ph-used-buying-guide/45512" },
      { titulo: "Exchange and Mart — Audi Coupé review", url: "https://www.exchangeandmart.co.uk/reviews/audi/coupe/1989/207531" },
    ],
    modelo: { marca: "Audi", modelos: ["80", "80 Cabriolet", "90"] },
  },
  {
    slug: "audi-a4-b5",
    titulo: "Audi A4 B5",
    kicker: "Guía de modelo · 1994–2001",
    resumen:
      "El primer A4: berlina y Avant, motores de cuatro cilindros, V6 y TDI, el S4 biturbo y un RS4 Avant desarrollado con Cosworth. Uno de los youngtimers alemanes más accesibles.",
    descripcionSeo:
      "Audi A4 B5 (1994–2001): sedán y Avant, motores 1.8T, V6 y TDI, S4 y RS4, y qué revisar antes de comprar uno.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/1996_Audi_A4_SE_2.6_Front.jpg/1280px-1996_Audi_A4_SE_2.6_Front.jpg",
      alt: "Audi A4 2.6 de 1996",
      pie: "Audi A4 2.6 de 1996.",
      autor: "Vauxford",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1996_Audi_A4_SE_2.6_Front.jpg",
      ancho: 1280,
      alto: 832,
    },
    cifras: [
      { valor: "1994–2001", etiqueta: "años de producción" },
      { valor: "2", etiqueta: "carrocerías: sedán y Avant" },
      { valor: "6.030", etiqueta: "RS4 Avant fabricados" },
      { valor: "~375 CV", etiqueta: "del RS4, V6 biturbo" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Lanzado en noviembre de 1994 como sucesor del Audi 80, el A4 B5 tuvo sedán y, desde 1995–1996, la rural Avant. Recibió un restyling y se fabricó hasta 2001.",
          "El S4 biturbo llegó en 1997 con un V6 de 2,7 litros y unos 265 CV. El RS4, solo Avant, se hizo de mayo de 2000 a septiembre de 2001: 6.030 unidades, con culatas e internos de Cosworth, turbos más grandes y unos 375 CV.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Motores",
        items: [
          "Nafteros: 1.6 (101 CV), 1.8 de 20 válvulas (125 CV) y 1.8 turbo (150 CV).",
          "V6: 2.4 (165 CV), 2.6 (150 CV) y 2.8 de 30 válvulas (193 CV).",
          "Diésel: 1.9 TDI de 90 y 110 CV, 1.9 TDI de 115 CV desde fines de 1999, y 2.5 V6 TDI de 150 CV.",
          "S4 y RS4: V6 biturbo de 2,7 litros, con tracción quattro.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Brazos y bujes del tren delantero, y rótulas inferiores: un crujido adelante es la señal.",
          "1.8 y 1.8T: correa de distribución con tensor y la primera bomba de agua plástica.",
          "V6: consumo de aceite, y catalizadores que golpetean en el 2.6.",
          "TDI: inyectores y aceite con la norma correcta.",
          "Desagües tapados debajo del parabrisas que mojan las alfombras, y uniones de los caños de freno traseros.",
          "S4 y RS4: correa y bomba de agua más seguido, turbos, mangueras del intercooler y desgaste de árboles de levas.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Honest John Classics — Audi A4", url: "https://classics.honestjohn.co.uk/reviews/audi/audi-a4/" },
      { titulo: "Supercar Nostalgia — Audi B5 RS4", url: "https://supercarnostalgia.com/blog/audi-b5-rs4" },
      { titulo: "Classic Trader — Audi RS4 buying guide", url: "https://www.classic-trader.com/en/magazine/audi-rs4-buying-guide" },
    ],
    modelo: { marca: "Audi", modelos: ["A4"] },
  },
  {
    slug: "importar-auto-clasico",
    titulo: "Cómo importar un auto clásico a la Argentina",
    kicker: "Guía práctica",
    tituloSeo: "Importar un auto clásico a la Argentina: requisitos y trámite",
    resumen:
      "Importar un auto usado está prohibido en la Argentina, salvo una excepción: los autos de colección de más de 30 años y al menos USD 12.000. En 2025 el trámite se simplificó y se digitalizó. Así funciona hoy.",
    descripcionSeo:
      "Requisitos para importar un auto clásico a la Argentina (más de 30 años, FOB de USD 12.000), pasos del trámite por TAD y VUCEA, prohibición de venta por 2 años y errores a evitar.",
    cifras: [
      { valor: "30 años", etiqueta: "de antigüedad mínima" },
      { valor: "USD 12.000", etiqueta: "de valor FOB mínimo" },
      { valor: "2 años", etiqueta: "sin poder venderlo" },
      { valor: "1 año", etiqueta: "de validez de la autorización" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "La excepción para los autos de colección",
        parrafos: [
          "El Decreto 110/99 prohíbe importar autos usados, con algunas excepciones. Una de ellas son los «modelos de colección» o de interés histórico, considerados parte del patrimonio cultural: tienen que tener al menos 30 años de antigüedad y un valor FOB (el precio en el puerto de origen) de al menos USD 12.000.",
          "Durante años el trámite fue lento y exigía una tasación oficial. La Resolución 24/2025 lo simplificó, la Resolución 300/2025 lo reorganizó y, desde diciembre de 2025, la autorización viaja a la Aduana en forma digital por la Ventanilla Única de Comercio Exterior (VUCEA).",
        ],
      },
      {
        tipo: "lista",
        titulo: "Los pasos",
        items: [
          "1. Confirmá que el auto cumple: 30 años o más y un valor FOB de al menos USD 12.000, con la factura o el contrato de compra.",
          "2. Pedí la autorización de importación por la plataforma TAD, con el formulario de declaración jurada. La revisa la Dirección de Evaluación y Promoción Industrial, que tiene 10 días corridos para responder.",
          "3. Si falta algo, tenés 10 días hábiles para completarlo; si no, el trámite se da por desistido.",
          "4. La autorización se envía a la Aduana por VUCEA y vale 1 año desde que te la notifican: el auto tiene que llegar y despacharse en ese plazo.",
          "5. Un despachante de aduana hace la declaración y cita la autorización. El sistema controla que el número de chasis (VIN), la marca y el modelo coincidan: un dato distinto bloquea el despacho.",
          "6. Pagá los tributos de importación y, una vez liberado el auto, hacé la inscripción en el registro automotor.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Lo que hay que saber",
        items: [
          "Prohibido vender: durante 2 años desde que el auto sale de la Aduana no se puede vender ni regalar.",
          "Ya no se exige la tasación oficial que pedía el régimen anterior.",
          "Impuestos: se pagan derechos de importación, tasa estadística, IVA y, según el valor, impuestos internos. Las alícuotas dependen de la clasificación del auto y del origen (dentro o fuera del Mercosur): pedile a tu despachante una estimación antes de comprar.",
          "Una sola autorización por ítem de la declaración de importación.",
          "Flete, seguro, despachante y gastos de puerto pesan mucho en un solo auto: sumalos al precio antes de decidir.",
          "Registro: desde agosto de 2026, la DNRPA exige una verificación física en todos los casos para inscribir un auto en el registro de clásicos.",
        ],
      },
    ],
    aviso:
      "Esta guía resume la normativa vigente a noviembre de 2026 y no reemplaza el asesoramiento de un despachante de aduana. Las normas cambian: confirmá siempre los requisitos antes de comprar un auto en el exterior.",
    fuentes: [
      { titulo: "Boletín Oficial — Resolución 24/2025 (Secretaría de Industria y Comercio)", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/321822/20250225" },
      { titulo: "Boletín Oficial — Resolución 300/2025", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/329033/20250730" },
      { titulo: "Boletín Oficial — Resolución General ARCA 5796/2025", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/335540/20251204" },
      { titulo: "Boletín Oficial — Disposición DNRPA 161/2026", url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/345438/20260805" },
      { titulo: "iProfesional — ARCA cambia los pasos para importar autos clásicos (2025)", url: "https://www.iprofesional.com/autos/443354-arca-cambia-los-pasos-para-importar-autos-clasicos-al-pais-que-exige-el-nuevo-sistema" },
      { titulo: "El Economista — El Gobierno simplificó la importación de autos clásicos (2025)", url: "https://eleconomista.com.ar/autos/el-gobierno-simplifico-importacion-autos-clasicos-n82428" },
    ],
  },
  {
    slug: "bioetanol-autos-clasicos",
    titulo: "Nafta con bioetanol y autos clásicos",
    kicker: "Guía práctica",
    tituloSeo: "Nafta con 12-15% de bioetanol en autos clásicos: qué cuidar",
    resumen:
      "Desde marzo de 2026, la nafta argentina puede llevar hasta 15% de bioetanol. Para un auto moderno casi no cambia nada, pero en un clásico a carburador conviene revisar mangueras, juntas y filtros, y guardarlo bien.",
    descripcionSeo:
      "Cómo afecta la nafta con 12 a 15% de bioetanol a los autos clásicos y a carburador: mangueras, juntas, corrosión, humedad y guardado. Qué revisar y cómo protegerlo.",
    cifras: [
      { valor: "12%", etiqueta: "de bioetanol en la práctica hasta 2026" },
      { valor: "Hasta 15%", etiqueta: "permitido desde marzo de 2026" },
      { valor: "~2,6%", etiqueta: "más pobre la mezcla con 10% de etanol" },
      { valor: "Antes de 2001", etiqueta: "los autos más expuestos" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Qué cambió",
        parrafos: [
          "La nafta argentina se mezcla con bioetanol por la Ley 27.640, y en la práctica el corte fue del 12%. La Resolución 79/2026 de la Secretaría de Energía, de marzo de 2026, subió el límite de oxígeno permitido para que las petroleras puedan llegar al 15% si lo deciden: no es obligatorio. Un proyecto de ley que lo haría obligatorio y habilitaría los autos «flex fuel» fue aprobado por el Senado y espera el tratamiento en Diputados.",
          "Según el INTA, para un motor moderno el cambio casi no se nota, salvo un consumo un poco mayor. Los autos con carburador, los más viejos y los que pasan mucho tiempo guardados son los que pueden tener problemas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Cómo afecta a un clásico",
        items: [
          "Mangueras, juntas y membranas de la bomba de nafta: el etanol las hincha y las ablanda, y después se secan y se agrietan.",
          "Corrosión: sobre todo entre metales distintos (zinc, bronce, acero) en el carburador y el tanque. Al evaporarse, la nafta puede dejar una mezcla de agua y etanol corrosiva.",
          "Humedad: el etanol absorbe agua. Con el tiempo, la mezcla puede separarse en el fondo del tanque.",
          "Mezcla más pobre: con 10% de etanol, la mezcla se empobrece cerca de un 2,6%. En un auto a carburador puede haber tironeos, huecos al acelerar o que se pare; a veces hay que enriquecer los chiclers. La inyección con sonda lambda lo corrige sola.",
          "Efecto limpiador: el etanol despega la suciedad vieja del tanque, que puede tapar filtros, chiclers y el carburador.",
          "Flotantes plásticos del carburador y tanques de fibra de vidrio: pueden dañarse. Conviene cambiarlos por piezas compatibles.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Cómo protegerlo",
        items: [
          "Cambiá las mangueras de nafta por mangueras aptas para etanol, de norma SAE J30 (la J30R14T1 es la de baja permeabilidad).",
          "Revisá el filtro de nafta más seguido, sobre todo en los primeros tanques con la mezcla nueva.",
          "Si el auto queda guardado mucho tiempo: no dejes el circuito a medio vaciar, vaciá las cubas del carburador y, si lo guardás con nafta, usá un estabilizador.",
          "Los aditivos anticorrosión ayudan, pero ninguno está probado para proteger todo el sistema: no reemplazan el cambio de mangueras y juntas.",
          "Arrancalo cada dos semanas o, mejor, salí a dar una vuelta.",
          "Si notás tironeos, pérdidas u olor a nafta, consultá a un mecánico que conozca autos a carburador.",
        ],
      },
    ],
    aviso: "Información general: el estado de cada auto es distinto. Ante cualquier duda, consultá a un mecánico especializado en clásicos.",
    fuentes: [
      { titulo: "Chequeado — El Gobierno autorizó un mayor uso de bioetanol: qué impacto tiene en los autos (2026)", url: "https://chequeado.com/el-explicador/ante-el-aumento-de-la-nafta-el-gobierno-autorizo-un-mayor-uso-de-bioetanol-que-impacto-tiene-la-medida-en-los-precios-y-en-los-autos/" },
      { titulo: "Parabrisas — Los cambios que autorizó el Gobierno en los combustibles (2026)", url: "https://parabrisas.perfil.com/noticias/novedades/a31-los-cambios-autorizo-gobierno-contener-subas-en-los-combustibles-nafta-autos.phtml" },
      { titulo: "Industrial Info — El Senado aprueba el proyecto de biocombustibles (2026)", url: "https://www.industrialinfo.com/news/article/el-senado-argentino-aprueba-un-proyecto-de-ley-para-aumentar-el-contenido-de-biocombustibles-en-la-g--362944" },
      { titulo: "FBHVC — Essential guide to fuels (2023)", url: "https://fbhvc.co.uk/storage/downloads/page/34/Essential%20Guide%20to%20Fuels%20v3%202023.pdf" },
      { titulo: "Hagerty UK — Don't suffer fuels (2025)", url: "https://www.hagerty.co.uk/articles/dont-suffer-fuels/" },
    ],
  },
  {
    slug: "maserati-biturbo",
    titulo: "Maserati Biturbo",
    kicker: "Guía de modelo · 1981–1994",
    resumen:
      "La Maserati del argentino Alejandro de Tomaso: un coupé compacto con V6 biturbo que abrió la marca a un público nuevo y dio origen a una familia de más de 37.000 autos, del Spyder Zagato al Karif.",
    descripcionSeo:
      "Maserati Biturbo (1981–1994): la historia de De Tomaso, el V6 biturbo, las variantes 222, 228, 430, Spyder y Karif, y qué revisar antes de comprar una.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/1985_Maserati_Biturbo_E,_front_left_(US).jpg/1280px-1985_Maserati_Biturbo_E,_front_left_(US).jpg",
      alt: "Maserati Biturbo E de 1985, vista delantera izquierda",
      pie: "Maserati Biturbo E de 1985.",
      autor: "Mr.choppers",
      licencia: "CC BY-SA 3.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1985_Maserati_Biturbo_E,_front_left_(US).jpg",
      ancho: 1280,
      alto: 695,
    },
    cifras: [
      { valor: "1981–1994", etiqueta: "años de la familia Biturbo" },
      { valor: "+37.000", etiqueta: "autos fabricados" },
      { valor: "180 CV", etiqueta: "del primer V6 2.0 biturbo" },
      { valor: "3.076", etiqueta: "Spyder Zagato" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Una Maserati con acento argentino",
        parrafos: [
          "Alejandro de Tomaso nació en Buenos Aires en 1928. Se instaló en Italia a mediados de los años cincuenta, corrió dos Grandes Premios de Fórmula 1 y en 1959 fundó en Módena su propia marca, De Tomaso. En 1975 tomó el control de Maserati, que acababa de ser rescatada de la quiebra con ayuda del Estado italiano, y la dirigió hasta su venta a Fiat en 1993.",
          "La relación de Maserati con la Argentina venía de antes: Juan Manuel Fangio ganó su quinto título mundial en 1957 con una Maserati 250F. Ese año ganó en Buenos Aires y, sobre todo, en el Nürburgring, donde remontó 48 segundos después de una mala parada en boxes. Fue su última victoria en la Fórmula 1.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Maserati_250_F,_Bj._1957_(1977-08-14)_S%C3%BCdkehre.jpg",
          alt: "Maserati 250F de 1957 en la curva sur del Nürburgring",
          pie: "Una Maserati 250F de 1957 en el Nürburgring, en una exhibición de 1977.",
          autor: "Lothar Spurzem",
          licencia: "CC BY-SA 2.0 DE",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/2.0/de/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Maserati_250_F,_Bj._1957_(1977-08-14)_S%C3%BCdkehre.jpg",
          ancho: 958,
          alto: 638,
        },
      },
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "La Biturbo se presentó el 14 de diciembre de 1981. La idea de De Tomaso era una Maserati más compacta y accesible, para competir con los coupés alemanes. El diseño es de Pierangelo Andreani; Marcello Gandini hizo los retoques de 1988 y 1991.",
          "El motor es un V6 a 90° de 2 litros con tres válvulas por cilindro y dos turbos IHI: 180 CV en la primera versión, con carburador. Llegaron después un 2.5 para la exportación (1983), la inyección electrónica Weber-Marelli (1986 en Italia), los 2.8 y, desde fines de 1988, las culatas de 24 válvulas.",
          "El coupé original se hizo hasta 1985, pero la familia siguió creciendo: berlinas 425 y 420, el coupé más grande 228, la berlina 430, los coupés 222 y 2.24v, el Racing y el Karif. Las sucesoras directas fueron la Ghibli II (1992) y el Shamal V8 (1990).",
        ],
      },
      {
        tipo: "lista",
        titulo: "La familia Biturbo",
        items: [
          "Biturbo coupé (1981–1985): unas 9.200 unidades.",
          "425 y 420 (1983–1989): berlinas de cuatro puertas, 2.5 y 2.0.",
          "Spyder (1984–1994): carrozado por Zagato sobre una distancia entre ejes acortada, 3.076 unidades.",
          "228 (1986–1992): coupé más grande y lujoso, V6 2.8, 469 unidades.",
          "430 (1987–1994): berlina 2.8, con 24 válvulas desde 1991.",
          "222 y 2.24v (1988–1994): coupés con los motores evolucionados.",
          "Karif (1988–1991): biplaza con el chasis corto del Spyder y el 2.8 biturbo, 221 unidades.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Maserati_Biturbo_Spyder_Zagato_at_the_100_Years_Maserati_show_at_Autoworld_Brussels.jpg/1280px-Maserati_Biturbo_Spyder_Zagato_at_the_100_Years_Maserati_show_at_Autoworld_Brussels.jpg",
          alt: "Maserati Biturbo Spyder Zagato en una exposición",
          pie: "Biturbo Spyder Zagato en la muestra de los 100 años de Maserati, en Autoworld Bruselas.",
          autor: "NearEMPTiness",
          licencia: "CC BY-SA 4.0",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Maserati_Biturbo_Spyder_Zagato_at_the_100_Years_Maserati_show_at_Autoworld_Brussels.jpg",
          ancho: 1280,
          alto: 718,
        },
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Historial de mantenimiento: aceite cada 10.000 km como mucho y correa de distribución con fecha. Una Biturbo descuidada es la que hizo la mala fama del modelo.",
          "Presión de aceite en caliente (alrededor de 4 kg/cm²), humo azul en ralentí caliente y silbidos en los múltiples de escape, que se fisuran.",
          "Turbos: juego y pérdidas de aceite. Son caros de reparar.",
          "Óxido: zócalos, parantes de puertas, marcos de ventanillas, borde del capó y bandeja de la batería. La chapa no está galvanizada.",
          "Mezcla de aceite y agua, ventilador que arranca en ralentí prolongado y temperatura estable.",
          "Diferencial: pérdidas y ruido. Si el puente trasero hace ruido, mejor seguir buscando.",
          "Electricidad: conectores oxidados y caja de fusibles quemada cuando fallan los levantavidrios.",
          "Cárter bajo, que golpea con facilidad, y cilindro receptor de embrague.",
        ],
      },
      {
        tipo: "texto",
        titulo: "¿Cuál elegir?",
        parrafos: [
          "Los autos con inyección (desde 1986–1987) son más fáciles de mantener que los de carburador. El Spyder Zagato y el Karif son los más buscados; las berlinas 425 y 430 suelen ser la puerta de entrada más económica. Antes de comprar, conviene que la revise un taller que conozca la mecánica Maserati y confirmar la disponibilidad de repuestos en el país.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Maserati_Karif.jpg/1280px-Maserati_Karif.jpg",
          alt: "Maserati Karif",
          pie: "Maserati Karif, el biplaza de la familia.",
          autor: "Brian Snelson",
          licencia: "CC BY 2.0",
          licenciaUrl: "https://creativecommons.org/licenses/by/2.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Maserati_Karif.jpg",
          ancho: 1280,
          alto: 815,
        },
      },
    ],
    fuentes: [
      { titulo: "Maserati — Biturbo (clásicos de la marca)", url: "https://www.maserati.com/gh/en/brand/maserati-classic-cars/biturbo-and-derivates/biturbo" },
      { titulo: "Autocar — Maserati Biturbo buying guide", url: "https://www.autocar.co.uk/node/113731" },
      { titulo: "Motor1 — Guide d'achat Maserati Biturbo", url: "https://fr.motor1.com/features/267185/guide-achat-maserati-biturbo/" },
      { titulo: "Wikipedia — Alejandro de Tomaso", url: "https://en.wikipedia.org/wiki/Alejandro_de_Tomaso" },
      { titulo: "Wikipedia — Gran Premio de Alemania 1957", url: "https://en.wikipedia.org/wiki/1957_German_Grand_Prix" },
    ],
    modelo: { marca: "Maserati", modelos: ["Biturbo", "425", "Biturbo Spyder", "228", "430", "222", "Karif"] },
  },
  {
    slug: "maserati-3200-gt-4200",
    titulo: "Maserati 3200 GT y Coupé/Spyder 4200",
    tituloSeo: "Maserati 3200 GT y 4200 (1998–2007): historia y guía de compra",
    kicker: "Guía de modelo · 1998–2007",
    resumen:
      "El coupé que relanzó Maserati con sus faros traseros en forma de bumerán, y sus sucesores 4200 con V8 atmosférico de 390 CV: grand tourisme italiano a un precio de usado muy razonable.",
    descripcionSeo:
      "Maserati 3200 GT (1998–2002) y Coupé, Spyder y GranSport 4200 (2001–2007): motores V8, caja Cambiocorsa, puntos débiles y qué revisar antes de comprar.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Maserati_3200_GT_registered_April_2002_3217cc.jpg/1280px-Maserati_3200_GT_registered_April_2002_3217cc.jpg",
      alt: "Maserati 3200 GT de 2002",
      pie: "Maserati 3200 GT de 2002.",
      autor: "Charles01",
      licencia: "CC BY-SA 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Maserati_3200_GT_registered_April_2002_3217cc.jpg",
      ancho: 1280,
      alto: 694,
    },
    cifras: [
      { valor: "370 CV", etiqueta: "V8 3.2 biturbo del 3200 GT" },
      { valor: "4.795", etiqueta: "3200 GT fabricados" },
      { valor: "390 CV", etiqueta: "V8 4.2 atmosférico" },
      { valor: "13.423", etiqueta: "Coupé, Spyder y GranSport" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Tras la compra por Fiat en 1993, Maserati pasó a trabajar junto a Ferrari. El primer fruto fue el 3200 GT, presentado en el Salón de París de octubre de 1998: un coupé 2+2 diseñado por Giorgetto Giugiaro (Italdesign), con interior de Enrico Fumia. Sus faros traseros en bumerán, de LED, se volvieron su firma.",
          "El motor es un V8 de 3,2 litros con dos turbos y 370 CV, heredero del Shamal. Se fabricaron 4.795 unidades hasta 2002, con caja manual de seis marchas o automática de cuatro (GTA).",
          "Lo reemplazaron el Spyder (2001) y el Coupé (2002), conocidos como 4200: misma silueta, faros traseros convencionales y un V8 de 4,2 litros atmosférico de 390 CV, el F136 desarrollado con Ferrari. La caja podía ser manual o Cambiocorsa, una robotizada con levas en el volante. El GranSport (2004) subió a 400 CV con suspensión Skyhook de serie. La producción terminó en 2007.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Maserati_Coup%C3%A9_1X7A2558_(cropped).jpg/1280px-Maserati_Coup%C3%A9_1X7A2558_(cropped).jpg",
          alt: "Maserati Coupé 4200",
          pie: "Maserati Coupé 4200.",
          autor: "Alexander-93",
          licencia: "CC BY-SA 4.0",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Maserati_Coup%C3%A9_1X7A2558_(cropped).jpg",
          ancho: 1280,
          alto: 755,
        },
      },
      {
        tipo: "lista",
        titulo: "Qué revisar en un 3200 GT",
        items: [
          "Juego axial del cigüeñal: si aparece, puede significar rehacer el motor.",
          "Cuerpo de mariposa electrónico, consumo de aceite y pérdidas de aceite y agua.",
          "Correa de distribución cada 3 años o 50.000 km, con fecha en el historial.",
          "Parrillas inferiores delanteras fisuradas y la campaña de revisión del subchasis de la dirección.",
          "Faros traseros de LED con sectores apagados: el repuesto es caro.",
          "Amortiguadores: los originales ya no se fabrican, hay que buscar alternativas.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar en un Coupé o Spyder 4200",
        items: [
          "Cambiocorsa: desgaste del embrague, que se gasta rápido en uso urbano. Pedir el porcentaje de desgaste leído con diagnóstico.",
          "Distribución por cadena, más robusta que la del 3200 GT, pero con pérdidas frecuentes en las tapas de válvulas.",
          "Subchasis delantero, que puede oxidarse por dentro, y la campaña de revisión de los bulones de la cremallera.",
          "Amortiguadores Skyhook: no se consiguen nuevos.",
          "Llave maestra roja: es necesaria para programar llaves nuevas.",
          "Spyder: filtraciones y funcionamiento de la capota. En los primeros años (2002–2004), electrónica caprichosa.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Maserati_3200_GT_(2002)_interior.jpg/1280px-Maserati_3200_GT_(2002)_interior.jpg",
          alt: "Interior de un Maserati 3200 GT",
          pie: "Interior de un Maserati 3200 GT de 2002.",
          autor: "Magnus Bäck",
          licencia: "Dominio público",
          licenciaUrl: "https://creativecommons.org/publicdomain/mark/1.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Maserati_3200_GT_(2002)_interior.jpg",
          ancho: 1280,
          alto: 853,
        },
      },
      {
        tipo: "texto",
        titulo: "¿Cuál elegir?",
        parrafos: [
          "El 3200 GT tiene el diseño más puro y la rareza a su favor, pero su mecánica biturbo pide más cuidado. Los 4200 son más fáciles de vivir, sobre todo con caja manual, mucho más escasa que la Cambiocorsa. El GranSport es el más buscado. En todos los casos, un historial completo en un especialista vale más que unos kilómetros menos.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Wikipedia — Maserati 3200 GT", url: "https://en.wikipedia.org/wiki/Maserati_3200_GT" },
      { titulo: "Wikipedia — Maserati Coupé", url: "https://en.wikipedia.org/wiki/Maserati_Coup%C3%A9" },
      { titulo: "Classics World — Maserati 3200GT and 4200GT buyer's guide", url: "https://classicsworld.co.uk/guides/maserati-3200gt-4200gt-buyers-guide/" },
      { titulo: "Hagerty UK — The Maserati 4200, 25 years on", url: "https://www.hagerty.co.uk/articles/the-maserati-4200-25-years-on/" },
    ],
    modelo: { marca: "Maserati", modelos: ["3200 GT", "Coupé 4200", "Spyder 4200", "GranSport"] },
  },
  {
    slug: "peugeot-306",
    titulo: "Peugeot 306",
    tituloSeo: "Peugeot 306 y 306 S16 (1993–2002): historia y guía de compra",
    kicker: "Guía de modelo · 1993–2002",
    resumen:
      "El compacto que Peugeot fabricó en El Palomar y que dejó, entre sus versiones importadas, una de las mejores deportivas de los noventa: la 306 S16.",
    descripcionSeo:
      "Peugeot 306 (1993–2002): la producción argentina en El Palomar, motores y versiones, la deportiva 306 S16 de 150 a 167 CV y qué revisar antes de comprar.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Peugeot_306_S16_(9756087373).jpg/1280px-Peugeot_306_S16_(9756087373).jpg",
      alt: "Peugeot 306 S16 azul, vista delantera",
      pie: "Peugeot 306 S16.",
      autor: "FotoSleuth",
      licencia: "CC BY 2.0",
      licenciaUrl: "https://creativecommons.org/licenses/by/2.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:Peugeot_306_S16_(9756087373).jpg",
      ancho: 1280,
      alto: 772,
    },
    cifras: [
      { valor: "1996", etiqueta: "inicio de la producción en El Palomar" },
      { valor: "+50.000", etiqueta: "306 fabricados en Argentina" },
      { valor: "167 CV", etiqueta: "de la S16 con caja de seis marchas" },
      { valor: "≈26.000", etiqueta: "306 S16 fabricados en Francia" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Peugeot presentó el 306 en febrero de 1993 para reemplazar al 309. Hubo hatchback de tres y cinco puertas, sedán, rural (Break) y un cabriolet diseñado y fabricado por Pininfarina. Tuvo un primer restyling en 1997 y otro en 1999, y el 307 lo reemplazó a partir de 2001; el cabriolet y la rural siguieron hasta 2002.",
          "En la Argentina, las primeras unidades llegaron importadas a fines de 1995. Desde 1996 se fabricó en la planta de El Palomar, en tiempos de SEVEL y después de Peugeot-Citroën Argentina, que produjo más de 50.000 unidades hasta 2001 (algunas fuentes dicen 2002). El 306 también corrió en el TC2000.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Los 306 argentinos",
        items: [
          "Fabricados en El Palomar: el hatchback de cinco puertas y el sedán, con un baúl de 443 litros. Versiones como ST y XR Boreal.",
          "Motores nacionales: 1.8 nafta de 103 CV, 1.8 16 válvulas de 112 CV (desde el restyling), 1.9 diésel de 70 CV, 1.9 turbodiésel de 90 CV y 2.0 HDi de 90 CV, siempre con caja manual de cinco marchas.",
          "Importados: el tres puertas (XSi 2.0 de 123 CV, la más vendida de las deportivas, y unas pocas S16), la rural Break (1.8 16V o 1.9 diésel) y el cabriolet (1.6 o 2.0).",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Peugeot_306_Sedan_(47366930902).jpg/1280px-Peugeot_306_Sedan_(47366930902).jpg",
          alt: "Peugeot 306 sedán gris",
          pie: "Peugeot 306 sedán, la carrocería que se fabricó en El Palomar junto al cinco puertas.",
          autor: "Guillaume Vachey",
          licencia: "CC0 (dominio público)",
          licenciaUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Peugeot_306_Sedan_(47366930902).jpg",
          ancho: 1280,
          alto: 869,
        },
      },
      {
        tipo: "texto",
        titulo: "La 306 S16, la joya de la gama",
        parrafos: [
          "La S16 apareció en octubre de 1993 en tres y cinco puertas, como sucesora del 309 GTI 16. Su motor XU10J4 es un 2.0 de 16 válvulas con admisión variable, de 155 CV al lanzamiento y 150 CV desde julio de 1994, con caja de cinco marchas. La prensa elogió sobre todo su chasis: el eje trasero autodireccional la hace muy ágil.",
          "En octubre de 1996 llegó el gran cambio: el motor XU10J4RS de 167 CV y la primera caja de seis marchas de serie de Peugeot, con llantas Cyclone de 15 pulgadas y solo en tres puertas. En Francia siguió llamándose S16; en el Reino Unido se vendió como GTI-6, con 220 km/h de velocidad máxima y 1.214 kg. La producción terminó en junio de 2001 en Poissy, con unas 26.000 S16 en total.",
          "En la Argentina llegaron muy pocas, todas importadas. Hoy una S16 original es una rareza buscada por los fanáticos de la marca.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Peugeot_306_GTI6_(cropped).jpg/1280px-Peugeot_306_GTI6_(cropped).jpg",
          alt: "Peugeot 306 GTI-6 naranja",
          pie: "La versión de 167 CV y seis marchas, vendida como GTI-6 en el Reino Unido.",
          autor: "Andrew Eaton",
          licencia: "CC BY-SA 2.0",
          licenciaUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:Peugeot_306_GTI6_(cropped).jpg",
          ancho: 1280,
          alto: 660,
        },
      },
      {
        tipo: "lista",
        titulo: "Las deportivas del 306",
        items: [
          "XSi: 2.0 de 8 válvulas y 123 CV. La más común en la Argentina.",
          "S16 fase 1 (1993–1996): 2.0 16V de 150 a 155 CV según el año, caja de cinco marchas, tres y cinco puertas. Serie «Le Mans» de 400 unidades rojas en 1993.",
          "S16 de seis marchas (1996–2001): 167 CV, solo tres puertas. Desde fines de 1997 en Francia, versiones Premium (con aire acondicionado) y Confort.",
          "Rallye (1998): unas 500 unidades aligeradas (1.163 kg), solo en el Reino Unido y con volante a la derecha.",
          "306 Maxi: la versión de rally de Peugeot Sport, con la que Gilles Panizzi fue campeón de Francia en 1996 y 1997.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/2014_Rally_Bohemia_Legend_-_Peugeot_306_S16_Maxi.jpg/1280px-2014_Rally_Bohemia_Legend_-_Peugeot_306_S16_Maxi.jpg",
          alt: "Peugeot 306 Maxi en un rally",
          pie: "Un Peugeot 306 Maxi en el Rally Bohemia Legend de 2014.",
          autor: "Miloslav Rejha",
          licencia: "CC BY 4.0",
          licenciaUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:2014_Rally_Bohemia_Legend_-_Peugeot_306_S16_Maxi.jpg",
          ancho: 1280,
          alto: 853,
        },
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Correa de distribución: cada 3 años o unos 50.000 km, con la bomba de agua. Un tic-tac que sube con las vueltas es señal de alarma.",
          "Eje trasero: bujes gastados, golpes atrás y desgaste desparejo de los neumáticos traseros o comba negativa visible, que delatan rodamientos de los brazos gastados. En un auto bajado, revisarlo con más cuidado.",
          "S16 fase 1: membranas de la admisión variable perforadas, marcha irregular en frío (válvula de ralentí) y soporte superior del motor fisurado.",
          "Óxido: detrás de los zócalos, pasarruedas delanteros, el trasero izquierdo, los anclajes de los cinturones traseros y la boca de carga de combustible.",
          "Electricidad: mazos de cables de las puertas (levantavidrios y cierre centralizado) y testigo del airbag por un cable cortado bajo los asientos.",
          "En una S16, verificar la autenticidad: número de chasis, motor 16 válvulas, caja de seis marchas y llantas en las de 167 CV. Una XSi disfrazada vale mucho menos.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autocosmos — Autos Clásicos de Argentina: Peugeot 306", url: "https://noticias.autocosmos.com.ar/2024/07/04/autos-clasicos-de-argentina-peugeot-306" },
      { titulo: "Autocosmos — Historia: Peugeot 306 festeja 30 años", url: "https://noticias.autocosmos.com.ar/2023/02/22/historia-peugeot-306-festeja-30-anos" },
      { titulo: "L'argus — Peugeot 306 S16, de la déception à la rédemption", url: "https://www.largus.fr/actualite-automobile/peugeot-306-s16-de-la-deception-a-la-redemption-10477390.html" },
      { titulo: "PistonHeads — Peugeot 306 GTI-6 buying guide", url: "https://www.pistonheads.com/news/ph-buying-guides/peugeot-306-gti-6--ph-used-buying-guide/34887" },
      { titulo: "Peugeot Sport — 306 Maxi", url: "https://www.peugeot-sport.com/en/old_car/306maxi" },
    ],
    modelo: { marca: "Peugeot", modelos: ["306", "306 S16"] },
  },
  {
    slug: "renault-clio-williams",
    titulo: "Renault Clio Williams",
    tituloSeo: "Renault Clio Williams (1993–1996): historia, Argentina y guía de compra",
    kicker: "Guía de modelo · 1993–1996",
    resumen:
      "Azul, llantas doradas y 150 CV: la Clio nacida para homologar el rally. En la Argentina llegaron unas 200, corrieron en los rallies nacionales y una fue Safety Car del Gran Premio de Fórmula 1 de 1996.",
    descripcionSeo:
      "Renault Clio Williams (1993–1996): historia, las unidades importadas a la Argentina, el Safety Car de la F1 de 1996, cómo reconocer una auténtica y qué revisar.",
    portada: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/1994_Renault_Clio_16V_Williams_(14345194184).jpg/1280px-1994_Renault_Clio_16V_Williams_(14345194184).jpg",
      alt: "Renault Clio Williams azul con llantas doradas",
      pie: "Renault Clio Williams de 1994.",
      autor: "Kieran White",
      licencia: "CC BY 2.0",
      licenciaUrl: "https://creativecommons.org/licenses/by/2.0/deed.es",
      fuenteUrl: "https://commons.wikimedia.org/wiki/File:1994_Renault_Clio_16V_Williams_(14345194184).jpg",
      ancho: 1280,
      alto: 720,
    },
    cifras: [
      { valor: "150 CV", etiqueta: "motor 2.0 16V F7R" },
      { valor: "≈12.000", etiqueta: "fabricadas en tres series" },
      { valor: "≈200", etiqueta: "importadas a la Argentina" },
      { valor: "1996", etiqueta: "Safety Car de la F1 en Buenos Aires" },
    ],
    secciones: [
      {
        tipo: "texto",
        titulo: "Historia",
        parrafos: [
          "Para correr en rally en la clase de 2 litros, Renault necesitaba vender al menos 2.500 unidades de calle. Así nació la Clio Williams, presentada en 1993 y bautizada en honor al equipo Williams, campeón de Fórmula 1 con motor Renault; el primer auto fue para Frank Williams.",
          "Usa el motor F7R de 1.998 cm³ y 16 válvulas, con 150 CV a 6.100 rpm, en una carrocería de 990 kg con trochas ensanchadas, pintura azul y llantas Speedline doradas de 15 pulgadas: 215 km/h y 0 a 100 km/h en 7,8 segundos. Las primeras 3.800 llevaban una placa numerada. La demanda superó todo lo previsto y se fabricaron unas 12.000 en tres series hasta 1996, incluidas 500 «Swiss Champion» para Suiza.",
        ],
      },
      {
        tipo: "texto",
        titulo: "La Clio Williams en la Argentina",
        parrafos: [
          "CIADEA, entonces a cargo de Renault en el país, la lanzó en noviembre de 1994 a unos 30.000 pesos, casi el precio de una Laguna. Renault anunció 200 unidades, de la segunda serie; el club de propietarios habla de unas 250 patentadas entre 1994 y 1998, entre particulares y autos de competición.",
          "Muchas corrieron en los rallies nacionales, donde fue una ganadora. Y una Clio Williams cumplió el papel de Safety Car en el Gran Premio de la Argentina de Fórmula 1 de 1996, en el Autódromo de Buenos Aires.",
        ],
        imagen: {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/1994_Renault_Clio_Williams_16V_(9066809986).jpg/1280px-1994_Renault_Clio_Williams_16V_(9066809986).jpg",
          alt: "Renault Clio Williams estacionada",
          pie: "Clio Williams de 1994: azul, llantas doradas y nada más.",
          autor: "Niels de Wit",
          licencia: "CC BY 2.0",
          licenciaUrl: "https://creativecommons.org/licenses/by/2.0/deed.es",
          fuenteUrl: "https://commons.wikimedia.org/wiki/File:1994_Renault_Clio_Williams_16V_(9066809986).jpg",
          ancho: 1280,
          alto: 926,
        },
      },
      {
        tipo: "lista",
        titulo: "Cómo reconocer una auténtica",
        items: [
          "El motor tiene que ser el F7R 2.0, no el F7P 1.8 de la Clio 16V, que se parece mucho por fuera.",
          "Número de chasis y documentación de importación: con tan pocas unidades en el país, la historia de cada auto suele ser rastreable a través del club.",
          "Trochas anchas, guardabarros específicos, llantas Speedline doradas y la «W» en los asientos.",
          "Desconfiar de una Clio pintada de azul con llantas doradas a precio de ganga: es la réplica clásica.",
        ],
      },
      {
        tipo: "lista",
        titulo: "Qué revisar antes de comprar",
        items: [
          "Historial de competición: muchas corrieron rally. Revisar la carrocería en busca de reparaciones, soldaduras y torres de suspensión deformadas.",
          "Motor: distribución al día, consumo de aceite y juntas. El F7R es robusto si se cuidó.",
          "Caja y embrague, muy exigidos en un auto de uso deportivo.",
          "Piezas específicas (llantas, paragolpes, tapizados) caras y difíciles de conseguir: un auto completo y original vale mucho más.",
        ],
      },
    ],
    fuentes: [
      { titulo: "Autotest — Historia del Renault Clio Williams", url: "https://autotest.com.ar/noticias/particular-historia-primer-renault-clio-williams/" },
      { titulo: "Parabrisas — Autos clásicos: Renault Clio Williams", url: "https://parabrisas.perfil.com/noticias/clasicos/autos-clasicos-renault-clio-williams-historia.phtml" },
      { titulo: "Monkey Motor — Autos raros: Renault Clio Williams", url: "https://www.monkeymotor.net/2018/07/autos-raros-renault-clio-williams.html" },
      { titulo: "ClioWilliamsClub Argentina", url: "http://www.cliowilliams.com.ar/" },
      { titulo: "Renault The Originals — Clio Williams", url: "https://theoriginals.renault.com/en/clio-williams" },
    ],
    modelo: { marca: "Renault", modelos: ["Clio Williams", "Clio I"] },
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
    tituloSeo: "Circuito de Potrero de los Funes: historia, km y trazado",
    descripcionSeo:
      "El circuito de Potrero de los Funes (San Luis) medía 6,27 km alrededor del lago. Su historia: FIA GT, TC2000, Turismo Carretera, el desarme de 2024 y el Rally de la Montaña.",
    cifras: [
      { valor: "6,27 km", etiqueta: "de trazado (2008–2018)" },
      { valor: "3", etiqueta: "visitas del campeonato FIA GT" },
      { valor: "2:14.173", etiqueta: "récord de vuelta (Corvette C6.R, 2011)" },
      { valor: "940 m", etiqueta: "de altura" },
    ],
    secciones: [
      {
        tipo: "lista",
        titulo: "Datos clave",
        items: [
          "Longitud: 6,27 km en el trazado de 2008–2018. El primer circuito, de 1978, medía 6,2 km.",
          "Ubicación: rodea el embalse de Potrero de los Funes, a unos 20 km de la ciudad de San Luis y a 940 m de altura.",
          "Récord de vuelta: 2:14.173, de un Corvette C6.R en el FIA GT de 2011.",
          "Estado actual: la última carrera fue en 2018 y el desarme empezó en febrero de 2024.",
        ],
      },
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
    tituloSeo: "Balcarce: Museo Fangio y Autódromo Juan Manuel Fangio",
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
    tituloSeo: "Museos del automóvil en Argentina: 6 para visitar",
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
