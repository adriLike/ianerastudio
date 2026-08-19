/* ============================================================
   DATOS DE LA WEB — GENERADO AUTOMÁTICAMENTE. NO EDITAR A MANO.

   Este archivo lo escribe el panel a partir de contenido.json.
   Si lo editas aquí, el próximo cambio desde el panel lo sobrescribe.

   Para cambiar algo:  ./herramientas/cms.sh
   ============================================================ */

/* GUMROAD se usa en los botones de COMPRA: su overlay (el pago encima de la
   web, sin salir) solo reconoce URLs de *.gumroad.com. TIENDA se usa donde el
   visitante sí se va. */
var GUMROAD = "https://ianerastudio.gumroad.com";
var TIENDA  = "https://tienda.ianerastudio.com";
var CANAL   = "https://www.youtube.com/@IanEraStudio";

/* Un null no pinta el icono. */
var REDES = {"youtube":"https://www.youtube.com/@IanEraStudio","instagram":"https://instagram.com/ianerastudio","soundcloud":null,"spotify":null};

/* Un null manda al catálogo entero en vez de a una ficha que no existe. */
var PRODUCTOS = {"blessings":"https://ianerastudio.gumroad.com/l/calvin-harris-blessings","takemethere":"https://ianerastudio.gumroad.com/l/take-me-there-project","harmony":"https://ianerastudio.gumroad.com/l/harmony","caramelle":"https://ianerastudio.gumroad.com/l/caramelle","bundle":null,"gratis":"https://ianerastudio.gumroad.com/l/welcome-sample-pack"};

var PRECIO = "8,99 €";
var BUNDLE = {"precio":"24 €","antes":"35,96 €"};

/* captura: si existe, sustituye a la miniatura de YouTube en la tarjeta y en
   la carátula del vídeo. bpm/tono/pistas a null no se pintan. */
var PROYECTOS = [
  {
    "id": "blessings",
    "t": "Blessings",
    "a": "Calvin Harris",
    "y": "2026",
    "video": "Bw8bwS2JOoo",
    "captura": "img/ses-blessings.jpg",
    "bpm": "130",
    "tono": "B min",
    "pistas": null
  },
  {
    "id": "takemethere",
    "t": "Take Me There",
    "a": "Sick Individuals &middot; Matisse &amp; Sadko &middot; Third Party",
    "y": "2025",
    "video": "_4fbpisfeiM",
    "captura": "img/ses-takemethere.jpg",
    "bpm": "130",
    "tono": "C maj",
    "pistas": null
  },
  {
    "id": "harmony",
    "t": "Harmony",
    "a": "Matisse &amp; Sadko",
    "y": "2025",
    "video": "oZLm6RlccBc",
    "captura": "img/ses-harmony.jpg",
    "bpm": "130",
    "tono": "C maj",
    "pistas": null
  },
  {
    "id": "caramelle",
    "t": "Caramelle",
    "a": "Mesto",
    "y": "2026",
    "video": "qOChu1JnFwk",
    "captura": "img/ses-caramelle.jpg",
    "bpm": "128",
    "tono": "C maj",
    "pistas": null
  }
];

var VIDEOS = [
  {
    "f": "02 mar 2026",
    "t": "Cómo hizo Calvin Harris «Blessings»",
    "id": "Bw8bwS2JOoo"
  },
  {
    "f": "14 ene 2026",
    "t": "Cómo hizo Mesto «Caramelle»",
    "id": "qOChu1JnFwk"
  },
  {
    "f": "16 dic 2025",
    "t": "Cómo hicieron Matisse &amp; Sadko «Harmony»",
    "id": "oZLm6RlccBc"
  },
  {
    "f": "06 nov 2025",
    "t": "Cómo hicieron «Take Me There»",
    "id": "_4fbpisfeiM"
  }
];

var CONTACTO = {"instagram":"https://instagram.com/ianerastudio","correo":null};

/* Una pregunta con r:null NO se pinta. */
var FAQ = [
  {
    "p": "¿Qué versión de Ableton Live necesito?",
    "r": null
  },
  {
    "p": "¿Necesito plugins de pago?",
    "r": null
  },
  {
    "p": "¿Cómo lo recibo?",
    "r": "Descarga inmediata en cuanto se confirma el pago. Sin esperas y sin envíos: el pago y la entrega los gestiona Gumroad."
  },
  {
    "p": "¿Puedo publicar lo que haga con el proyecto?",
    "r": "Sí, sin pedirme permiso. Lo único que no puedes es revender ni redistribuir el archivo del proyecto tal cual."
  },
  {
    "p": "¿Y si me atasco o algo no me abre?",
    "r": "Lo normal es que no pase nada: son archivos que abro yo a diario y salen del mismo Ableton con el que trabajo. Si aun así algo no te carga o no lo encuentras, escríbeme por Instagram y lo miramos — sé dónde pueden dar guerra y suele resolverse en un par de mensajes."
  }
];

/* Vacío = la sección de reseñas no se pinta. Solo reseñas reales. */
var RESENAS = [];
