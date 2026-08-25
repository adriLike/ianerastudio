/* Genera js/datos.js a partir de contenido.json.
   contenido.json es la fuente de verdad y lo escribe el panel;
   datos.js es lo que lee la web. Nunca se editan los dos a mano. */
const fs = require("fs");
const path = require("path");
const RAIZ = path.join(__dirname, "..");
const fichas = require("./fichas");

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

  /* Un archivo de textos por idioma. Solo las claves js.*: las del HTML se
     aplican al generar en/index.html y no hacen falta en el navegador. */
  const T = JSON.parse(fs.readFileSync(path.join(RAIZ,"textos.json"),"utf8"));
  const soloJs = idioma => {
    const o = {};
    for(const k of Object.keys(T)){
      if(k.startsWith("js.")) o[k.slice(3)] = T[k][idioma];
    }
    return o;
  };
  for(const idioma of ["es","en"]){
    fs.writeFileSync(path.join(RAIZ,"js/textos-"+idioma+".js"),
      "/* TEXTOS — GENERADO. No editar: se escribe desde textos.json. */\n" +
      "var LANG = " + j(idioma) + ";\n" +
      "var T = " + JSON.stringify(soloJs(idioma), null, 2) + ";\n");
  }

  /* sube el ?v= del index para que nadie vea la versión cacheada */
  const idx = path.join(RAIZ,"index.html");
  let html = fs.readFileSync(idx,"utf8");
  const m = html.match(/\?v=(\d+)/);
  if(m){
    const nuevo = parseInt(m[1],10) + 1;
    html = html.replace(/\?v=\d+/g, "?v=" + nuevo);
    fs.writeFileSync(idx, html);
    const TX = JSON.parse(fs.readFileSync(path.join(RAIZ,"textos.json"),"utf8"));
    ingles(html, TX, {
      salida: "index.html",
      titulo: "meta.titulo", desc: "meta.desc",
      canonical: "https://ianerastudio.com/en/",
      inicio: "/", idi: "/"
    });
    /* La página de gracias es la que ven los compradores, y la mayoría son
       de habla inglesa: se traduce igual que la portada. */
    let gr = fs.readFileSync(path.join(RAIZ,"gracias.html"),"utf8");
    gr = gr.replace(/\?v=\d+/g, "?v=" + nuevo);
    fs.writeFileSync(path.join(RAIZ,"gracias.html"), gr);
    ingles(gr, TX, { salida: "gracias.html", titulo: "gr.titulo", desc: "gr.desc",
        inicio: "/en/", idi: "/gracias.html" });

    /* Una página real por proyecto y por idioma. Los enlaces con #hash de la
       portada siguen funcionando: estas URLs se suman, no sustituyen. */
    const urls = fichas.generar(c, TX, nuevo);
    sitemap(urls);
    return nuevo;
  }
  return null;
}

/* ---------------------------------------------------------------
   en/index.html sale de index.html, no es un archivo aparte que
   mantener. El castellano es el original; si tocas el HTML, el
   inglés se rehace solo en la siguiente publicación.
   --------------------------------------------------------------- */
function ingles(html, T, op){
  const txt = (k) => (T[k] && T[k].en !== undefined) ? T[k].en : null;
  const faltan = [];

  /* contenido de los elementos con data-t */
  html = html.replace(/<([a-z0-9]+)([^>]*\sdata-t="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (todo, tag, attrs, clave, dentro) => {
      const v = txt(clave);
      if(v === null){ faltan.push(clave); return todo; }
      return "<" + tag + attrs + ">" + v + "</" + tag + ">";
    });

  /* atributos con data-ta="atributo:clave" */
  html = html.replace(/data-ta="([a-z-]+):([^"]+)"/g, (todo, attr, clave) => {
    const v = txt(clave);
    if(v === null){ faltan.push(clave); return todo; }
    return "data-ta=\"" + attr + ":" + clave + "\" data-tv=\"" + attr + "\"";
  });
  /* ...y ahora sí, se escribe el valor en el atributo marcado */
  html = html.replace(/data-ta="([a-z-]+):([^"]+)" data-tv="[a-z-]+"([^>]*?)\1="[^"]*"/g,
    (todo, attr, clave, medio) => 'data-ta="'+attr+':'+clave+'"'+medio+attr+'="'+txt(clave)+'"');

  /* cabecera */
  html = html.replace('<html lang="es">', '<html lang="en">');
  html = html.replace(/<title>[^<]*<\/title>/, "<title>" + txt(op.titulo) + "</title>");
  const meta = (sel, clave) => {
    const re = new RegExp('(<meta ' + sel + ' content=")[^"]*(")');
    html = html.replace(re, "$1" + txt(clave) + "$2");
  };
  meta('name="description"',            op.desc);
  meta('property="og:title"',           "meta.og.titulo");
  meta('property="og:description"',     "meta.og.desc");
  meta('property="og:locale"',          "meta.og.locale");
  meta('property="og:image:alt"',       "meta.og.imgalt");
  if(op.canonical){
    html = html.replace('<link rel="canonical" href="https://ianerastudio.com/">',
                        '<link rel="canonical" href="' + op.canonical + '">');
    html = html.replace('<meta property="og:url" content="https://ianerastudio.com/">',
                        '<meta property="og:url" content="' + op.canonical + '">');
  }

  /* rutas: en/index.html vive un nivel más abajo */
  html = html.replace(/(href|src)="(css|js|img)\//g, '$1="../$2/');
  /* srcset lleva varias rutas separadas por comas y no lo pilla lo de arriba */
  html = html.replace(/srcset="([^"]+)"/g, (todo, v) =>
    'srcset="' + v.replace(/(^|,\s*)(css|js|img)\//g, '$1../$2/') + '"');
  html = html.replace('js/textos-es.js', 'js/textos-en.js');
  /* Todo enlace con data-idi apunta al MISMO documento en el otro idioma.
     Se recorre etiqueta a etiqueta para no depender del orden de atributos. */
  html = html.replace(/<a\b[^>]*>/g, function(tag){
    return tag.indexOf("data-idi") > -1
      ? tag.replace(/href="[^"]*"/, 'href="' + op.idi + '"')
      : tag;
  });
  /* los enlaces a la portada tienen que quedarse dentro del idioma */
  html = html.replace(/href="\/"/g, 'href="' + op.inicio + '"');

  const dir = path.join(RAIZ,"en");
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, op.salida), html);
  if(faltan.length) console.log("  ojo, claves sin traducir:", [...new Set(faltan)].join(", "));
}

/* El sitemap se rehace entero: si se añade un proyecto, entra solo. */
function sitemap(fichas){
  const alt = (es,en) =>
    '    <xhtml:link rel="alternate" hreflang="es" href="'+es+'"/>\n'+
    '    <xhtml:link rel="alternate" hreflang="en" href="'+en+'"/>\n'+
    '    <xhtml:link rel="alternate" hreflang="x-default" href="'+es+'"/>\n';
  let x = '<?xml version="1.0" encoding="UTF-8"?>\n'+
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'+
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  x += '  <url>\n    <loc>https://ianerastudio.com/</loc>\n'+
       alt("https://ianerastudio.com/","https://ianerastudio.com/en/")+
       '    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
  x += '  <url>\n    <loc>https://ianerastudio.com/en/</loc>\n'+
       alt("https://ianerastudio.com/","https://ianerastudio.com/en/")+
       '    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
  for(let i=0;i<fichas.length;i+=2){
    const es=fichas[i], en=fichas[i+1];
    for(const u of [es,en])
      x += '  <url>\n    <loc>'+u+'</loc>\n'+alt(es,en)+
           '    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n';
  }
  x += '  <url>\n    <loc>https://ianerastudio.com/gracias.html</loc>\n'+
       '    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n';
  x += '</urlset>\n';
  fs.writeFileSync(path.join(RAIZ,"sitemap.xml"), x);
}

module.exports = { generar };
if (require.main === module) console.log("datos.js generado · v" + generar());
