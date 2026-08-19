/* Genera js/datos.js a partir de contenido.json.
   contenido.json es la fuente de verdad y lo escribe el panel;
   datos.js es lo que lee la web. Nunca se editan los dos a mano. */
const fs = require("fs");
const path = require("path");
const RAIZ = path.join(__dirname, "..");

function j(v){ return JSON.stringify(v); }

function generar(){
  const c = JSON.parse(fs.readFileSync(path.join(RAIZ,"contenido.json"),"utf8"));

  const salida = `/* ============================================================
   DATOS DE LA WEB — GENERADO AUTOMÁTICAMENTE. NO EDITAR A MANO.

   Este archivo lo escribe el panel a partir de contenido.json.
   Si lo editas aquí, el próximo cambio desde el panel lo sobrescribe.

   Para cambiar algo:  ./herramientas/cms.sh
   ============================================================ */

/* GUMROAD se usa en los botones de COMPRA: su overlay (el pago encima de la
   web, sin salir) solo reconoce URLs de *.gumroad.com. TIENDA se usa donde el
   visitante sí se va. */
var GUMROAD = ${j(c.gumroad)};
var TIENDA  = ${j(c.tienda)};
var CANAL   = ${j(c.canal)};

/* Un null no pinta el icono. */
var REDES = ${j(c.redes)};

/* Un null manda al catálogo entero en vez de a una ficha que no existe. */
var PRODUCTOS = ${j(c.productos)};

var PRECIO = ${j(c.precio)};
var BUNDLE = ${j(c.bundle)};

/* portada: la imagen de la TARJETA. Es la miniatura del vídeo, que está
   pensada para leerse pequeña y distingue un proyecto de otro de un vistazo.
   captura: la imagen del PANEL y de la carátula del vídeo, donde hay sitio
   para leerla. bpm/tono/pistas a null no se pintan. */
var PROYECTOS = ${JSON.stringify(c.proyectos,null,2)};

var VIDEOS = ${JSON.stringify(c.videos,null,2)};

var CONTACTO = ${j(c.contacto)};

/* Una pregunta con r:null NO se pinta. */
var FAQ = ${JSON.stringify(c.faq,null,2)};

/* Vacío = la sección de reseñas no se pinta. Solo reseñas reales. */
var RESENAS = ${JSON.stringify(c.resenas,null,2)};
`;

  fs.writeFileSync(path.join(RAIZ,"js/datos.js"), salida);

  /* sube el ?v= del index para que nadie vea la versión cacheada */
  const idx = path.join(RAIZ,"index.html");
  let html = fs.readFileSync(idx,"utf8");
  const m = html.match(/\?v=(\d+)/);
  if(m){
    const nuevo = parseInt(m[1],10) + 1;
    html = html.replace(/\?v=\d+/g, "?v=" + nuevo);
    fs.writeFileSync(idx, html);
    return nuevo;
  }
  return null;
}

module.exports = { generar };
if (require.main === module) console.log("datos.js generado · v" + generar());
