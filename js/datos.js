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
var REDES = {"youtube":"https://www.youtube.com/@IanEraStudio","instagram":"https://instagram.com/ianerastudio","soundcloud":null,"spotify":null,"tiktok":"https://www.tiktok.com/@ian_era_studio"};

/* Un null manda al catálogo entero en vez de a una ficha que no existe. */
var PRODUCTOS = {"riseagain":"https://ianerastudio.gumroad.com/l/raiseagain","takemethere":"https://ianerastudio.gumroad.com/l/take-me-there-project","blessings":"https://ianerastudio.gumroad.com/l/calvin-harris-blessings","harmony":"https://ianerastudio.gumroad.com/l/harmony","caramelle":"https://ianerastudio.gumroad.com/l/caramelle","bundle":null,"gratis":"https://ianerastudio.gumroad.com/l/welcome-sample-pack"};

var PRECIO = "8,99 €";
var BUNDLE = {"precio":"24 €","antes":"35,96 €"};

/* portada: la imagen de la TARJETA. Es la miniatura del vídeo, que está
   pensada para leerse pequeña y distingue un proyecto de otro de un vistazo.
   captura: la imagen del PANEL y de la carátula del vídeo, donde hay sitio
   para leerla. bpm/tono/pistas a null no se pintan. */
var PROYECTOS = [
  {
    "id": "riseagain",
    "t": "Rise Again",
    "a": "DubVision",
    "y": "2026",
    "video": null,
    "captura": "img/ses-riseagain.jpg",
    "bpm": "128",
    "tono": "E maj",
    "pistas": "164",
    "portada": "img/card-riseagain.jpg",
    "audio": "audio/riseagain.mp3",
    "insignia": "Nuevo",
    "grupos": "8"
  },
  {
    "id": "takemethere",
    "t": "Take Me There",
    "a": "Sick Individuals &middot; Matisse &amp; Sadko &middot; Third Party",
    "y": "2025",
    "video": "_4fbpisfeiM",
    "captura": "img/ses-takemethere.jpg",
    "bpm": "130",
    "tono": "B♭ maj",
    "pistas": null,
    "portada": "img/card-takemethere.jpg",
    "audio": "audio/takemethere.mp3",
    "insignia": "+20.000 en YouTube",
    "grupos": null
  },
  {
    "id": "blessings",
    "t": "Blessings",
    "a": "Calvin Harris",
    "y": "2026",
    "video": "Bw8bwS2JOoo",
    "captura": "img/ses-blessings.jpg",
    "bpm": "130",
    "tono": "B min",
    "pistas": null,
    "portada": "img/card-blessings.jpg",
    "audio": "audio/blessings.mp3",
    "insignia": null,
    "grupos": null
  },
  {
    "id": "harmony",
    "t": "Harmony",
    "a": "Matisse &amp; Sadko",
    "y": "2025",
    "video": "oZLm6RlccBc",
    "captura": "img/ses-harmony.jpg",
    "bpm": "130",
    "tono": "F min",
    "pistas": null,
    "portada": "img/card-harmony.jpg",
    "audio": "audio/harmony.mp3",
    "insignia": null,
    "grupos": null
  },
  {
    "id": "caramelle",
    "t": "Caramelle",
    "a": "Mesto",
    "y": "2026",
    "video": "qOChu1JnFwk",
    "captura": "img/ses-caramelle.jpg",
    "bpm": "128",
    "tono": "E♭ maj",
    "pistas": null,
    "portada": "img/card-caramelle.jpg",
    "audio": "audio/caramelle.mp3",
    "insignia": null,
    "grupos": null
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
    "r": "Live 12. Los proyectos están guardados con la 12.4.3."
  },
  {
    "p": "¿Necesito plugins de pago?",
    "r": "Los proyectos están hechos en Ableton Live 12.4.3, y todo lo que es de Ableton va dentro: el arreglo, el MIDI, las automatizaciones y las cadenas de efectos completas. Buena parte del procesado son dispositivos de serie de Live. En los sintetizadores uso Serum, Sylenth1 y Nexus, y para procesar FabFilter y ShaperBox — algunos de los que uso, como OTT o Tape Stop, son gratuitos. Si te falta alguno, el proyecto se abre igual y solo se marca ese dispositivo: el arreglo entero sigue en su sitio."
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
