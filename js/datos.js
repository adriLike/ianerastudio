/* ============================================================
   DATOS — el único archivo que hay que tocar para publicar.
   Nada de aquí es código: son los contenidos de la web.
   Lo que falta está en PENDIENTE.md
   ============================================================ */

/* Dominio propio conectado en Gumroad (Settings → Advanced → Custom domain).
   Así el comprador nunca ve una URL que no sea la tuya, ni al pagar. */
var TIENDA = "https://tienda.ianerastudio.com";
var CANAL  = "https://www.youtube.com/@IanEraStudio";

/* Raíl de redes de la izquierda. Un null NO pinta el icono: más vale tres
   enlaces que funcionan que seis, de los cuales tres a un perfil vacío. */
var REDES = {
  youtube   : CANAL,
  instagram : null,   // PENDIENTE: https://instagram.com/...
  soundcloud: null,   // PENDIENTE
  spotify   : null    // PENDIENTE
};

/* Enlaces de Gumroad.
   Un null NO rompe nada: ese botón manda al catálogo entero en vez de a la
   ficha. Pero manda a elegir en vez de a comprar. */
var PRODUCTOS = {
  blessings  : TIENDA + "/l/calvin-harris-blessings",
  takemethere: TIENDA + "/l/take-me-there-project",
  harmony    : null,   // PENDIENTE: slug real
  caramelle  : null,   // PENDIENTE: slug real
  bundle     : null,   // PENDIENTE: crear el producto (C4 del plan)
  gratis     : null    // PENDIENTE: crear el producto de 0 € (C7 del plan)
};

var PRECIO = "8,99 €";
var BUNDLE = { precio:"24 €", antes:"35,96 €" };

/* Las sesiones.

   captura : ruta a la captura del Arrangement, 16:9 (ej. "img/ses-blessings.jpg").
             En cuanto exista, pasa a ser la miniatura de la tarjeta y la
             cabecera del panel. Ponlas en las cuatro o en ninguna.

   ensena  : UNA frase concreta de qué se aprende. Sale de las tres líneas de
             WHAT YOU'LL ACTUALLY LEARN de la ficha de Gumroad (sección D2).
             Nada genérico.

   bpm / tono / pistas : a null a propósito. Un número inventado lo comprueba
             el comprador en diez segundos al abrir el .als. Rellénalos desde
             la sesión y la rejilla de datos aparece sola. */
var SESIONES = [
  {
    id:"blessings", t:"Blessings", a:"Calvin Harris", y:"2026",
    bpm:null, tono:null, pistas:null, captura:null, ensena:null
  },
  {
    id:"takemethere", t:"Take Me There",
    a:"Sick Individuals &middot; Matisse &amp; Sadko &middot; Third Party", y:"2025",
    bpm:null, tono:null, pistas:null, captura:null, ensena:null
  },
  {
    id:"harmony", t:"Harmony", a:"Matisse &amp; Sadko", y:"2025",
    bpm:null, tono:null, pistas:null, captura:null, ensena:null
  },
  {
    id:"caramelle", t:"Caramelle", a:"Mesto", y:"2026",
    bpm:null, tono:null, pistas:null, captura:null, ensena:null
  }
];

/* Vídeos. url:null → la fila dice «Avisarme» y lleva al canal.
   En cuanto publiques uno, pon su URL y pasa solo a «Ver». */
var VIDEOS = [
  { f:"03 sep 2026", t:"«Blessings» de Calvin Harris, por dentro", url:null },
  { f:"17 sep 2026", t:"«Take Me There», el tema que más me han pedido", url:null },
  { f:"01 oct 2026", t:"Recreé 4 hits de progressive house. Esto es lo único que tienen en común", url:null },
  { f:"15 oct 2026", t:"Por anunciar", url:null }
];
