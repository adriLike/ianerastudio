/* ============================================================
   DATOS — el único archivo que hay que tocar.
   Nada de aquí es código: son los contenidos de la web.
   Lo que falta está en PENDIENTE.md
   ============================================================ */

/* IMPORTANTE — por qué hay dos dominios de Gumroad:

   GUMROAD  se usa en los botones de COMPRA. El overlay de Gumroad (el que
            abre el pago ENCIMA de la web, sin que el visitante se vaya) solo
            reconoce URLs de *.gumroad.com. Con el dominio propio el script
            ni las mira y el enlace se limita a navegar. Comprobado.

   TIENDA   se usa donde el visitante SÍ se va (ver el catálogo entero, el pie).
            Ahí el dominio propio no estorba y queda mejor.

   Si algún día Gumroad soporta el overlay con dominio propio, esto se unifica. */
var GUMROAD = "https://ianerastudio.gumroad.com";
var TIENDA  = "https://tienda.ianerastudio.com";
var CANAL   = "https://www.youtube.com/@IanEraStudio";

/* Raíl de redes de la izquierda. Un null NO pinta el icono. */
var REDES = {
  youtube   : CANAL,
  instagram : "https://instagram.com/ianerastudio",
  soundcloud: null,   // PENDIENTE
  spotify   : null    // PENDIENTE
};

/* Enlaces de producto. Un null manda al catálogo entero. */
var PRODUCTOS = {
  blessings  : GUMROAD + "/l/calvin-harris-blessings",
  takemethere: GUMROAD + "/l/take-me-there-project",
  harmony    : null,   // PENDIENTE: slug real
  caramelle  : null,   // PENDIENTE: slug real
  bundle     : null,   // PENDIENTE: crear el producto (C4 del plan)
  gratis     : null    // PENDIENTE: crear el producto de 0 € (C7 del plan)
};

var PRECIO = "8,99 €";
var BUNDLE = { precio:"24 €", antes:"35,96 €" };

/* Los proyectos.

   video   : ID del vídeo de YouTube donde lo desmontas. De él salen la
             miniatura de la tarjeta Y el enlace de «ver el vídeo» del panel.
             Es la mejor vista previa que tienes: gratis y ya grabada.

   captura : ruta a una captura del Arrangement, 16:9. Si la pones, sustituye
             a la miniatura de YouTube. Aún mejor, porque enseña el producto.

   bpm / tono / pistas : a null a propósito. Un número inventado lo comprueba
             el comprador al abrir el .als. Rellénalos y aparecen solos. */
var PROYECTOS = [
  {
    id:"blessings", t:"Blessings", a:"Calvin Harris", y:"2026",
    video:"Bw8bwS2JOoo", captura:null,
    bpm:null, tono:null, pistas:null
  },
  {
    id:"takemethere", t:"Take Me There",
    a:"Sick Individuals &middot; Matisse &amp; Sadko &middot; Third Party", y:"2025",
    video:"_4fbpisfeiM", captura:null,
    bpm:null, tono:null, pistas:null
  },
  {
    id:"harmony", t:"Harmony", a:"Matisse &amp; Sadko", y:"2025",
    video:"oZLm6RlccBc", captura:null,
    bpm:null, tono:null, pistas:null
  },
  {
    id:"caramelle", t:"Caramelle", a:"Mesto", y:"2026",
    video:"qOChu1JnFwk", captura:null,
    bpm:null, tono:null, pistas:null
  }
];

/* Vídeos publicados, del más nuevo al más antiguo. Son los reales del canal.
   Para añadir uno: copia el ID de la URL de YouTube (lo que va tras v=). */
var VIDEOS = [
  { f:"02 mar 2026", t:"Cómo hizo Calvin Harris «Blessings»", id:"Bw8bwS2JOoo" },
  { f:"14 ene 2026", t:"Cómo hizo Mesto «Caramelle»",         id:"qOChu1JnFwk" },
  { f:"16 dic 2025", t:"Cómo hicieron Matisse &amp; Sadko «Harmony»", id:"oZLm6RlccBc" },
  { f:"06 nov 2025", t:"Cómo hicieron «Take Me There»",       id:"_4fbpisfeiM" }
];

/* Contacto. Un null no pinta la línea. */
var CONTACTO = {
  instagram: REDES.instagram,
  correo   : null   // PENDIENTE: hola@ianerastudio.com — el reenvío es gratis en Porkbun
};

/* Preguntas frecuentes.
   Una pregunta con `r:null` NO se pinta. Prefiero cuatro respuestas ciertas
   que seis con una inventada: estas son exactamente las dudas que frenan una
   compra de 8,99 €, y equivocarse aquí genera devoluciones y malas reseñas.

   Las dos primeras las tienes que contestar tú, y son LAS MÁS IMPORTANTES.
   En tu captura de «Rise Again» se ven Serum 2, Nexus, Kontakt 7, Sylenth1,
   Analog Lab V, Valhalla y FabFilter Pro-Q. Si tus proyectos necesitan
   plugins de pago, hay que decirlo ANTES de cobrar, no después. */
var FAQ = [
  {
    p:"¿Qué versión de Ableton Live necesito?",
    r:null   // PENDIENTE: p.ej. "Live 11 o superior, edición Standard o Suite."
  },
  {
    p:"¿Necesito plugins de pago?",
    r:null   // PENDIENTE: la lista real, o "ninguno, solo dispositivos de Ableton"
  },
  {
    p:"¿Cómo lo recibo?",
    r:"Descarga inmediata en cuanto se confirma el pago. Sin esperas y sin envíos: el pago y la entrega los gestiona Gumroad."
  },
  {
    p:"¿Puedo publicar lo que haga con el proyecto?",
    r:"Sí, sin pedirme permiso. Lo único que no puedes es revender ni redistribuir el archivo del proyecto tal cual."
  },
  {
    p:"¿Es el archivo original del artista?",
    r:"No, y no lo dice en ninguna parte. Es mi propia recreación, hecha de oído: no contiene audio, samples ni material del lanzamiento original."
  },
  {
    p:"¿Y si me atasco o algo no me abre?",
    r:"Escríbeme y lo miramos. Son archivos que uso yo a diario, así que sé dónde suelen dar guerra."
  }
];
