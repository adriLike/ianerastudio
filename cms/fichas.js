/* ============================================================
   Páginas propias por proyecto.

   La portada tiene UNA sola URL para los cinco productos: las
   fichas viven detrás de un #hash, y un fragmento no lo indexa
   Google como página aparte. Además el contenido del panel no
   existe en el DOM hasta que alguien pulsa, así que para un
   buscador la web eran 690 palabras genéricas.

   Esto genera una página real por proyecto y por idioma, con el
   contenido visible. Los enlaces con #hash siguen funcionando:
   estas URLs se suman, no sustituyen a nada.
   ============================================================ */
const fs = require("fs");
const path = require("path");

const SLUG = { riseagain:"rise-again", takemethere:"take-me-there",
               blessings:"blessings", harmony:"harmony", caramelle:"caramelle" };
const BASE = "https://ianerastudio.com";

const esc = s => String(s == null ? "" : s);
const tr  = (o, campo, idioma) =>
  (idioma === "en" && o[campo + "_en"]) ? o[campo + "_en"] : o[campo];

function specs(p, T, idioma){
  const d = [];
  if(p.bpm)  d.push([p.bpm, "BPM"]);
  if(p.tono) d.push([p.tono, T["js.tono"][idioma]]);
  if(p.pistas) d.push([p.pistas,
    T["js.pistas"][idioma] + (p.grupos ? T["js.enGrupos"][idioma].replace("{n}", p.grupos) : "")]);
  d.push([".als", T["js.formato"][idioma]]);
  return '<div class="specs">' + d.map(([a,b]) =>
    '<div><b>'+esc(a)+'</b><span class="et">'+esc(b)+'</span></div>').join("") + '</div>';
}

function plugins(p, T, idioma){
  const g = p.plugins;
  if(!g || !g.terceros || !g.terceros.length) return "";
  const serie = (g.serie||[]).map(x => '<span class="chip">'+esc(x.n)+'</span>').join("");
  const terc = g.terceros.map(x => {
    const alt = tr(x, "a", idioma);
    const nota = x.e === "gratis" ? '<span class="lib">'+T["js.esGratuito"][idioma]+'</span>'
               : x.e === "sin"    ? '<span class="nada">'+esc(alt || T["js.sinEquivalente"][idioma])+'</span>'
               : !alt             ? '<span class="nada">'+T["js.sinEquivalente"][idioma]+'</span>'
               : x.e === "pago"   ? '<span class="sust">'+esc(alt)+'</span>'
               :                    '<span class="alt">'+esc(alt)+'</span>';
    return '<li><span class="tn">'+esc(x.n)+'</span><span class="tf">'+esc(x.f)+'</span>'+nota+'</li>';
  }).join("");
  return '<h2>'+T["js.hechoTit"][idioma]+'</h2>'+
    '<p class="fic-p">'+T["js.hechoSub"][idioma].replace("{pct}", g.pct)+'</p>'+
    '<p class="et">'+T["js.hechoSerie"][idioma]+'</p><div class="chips">'+serie+'</div>'+
    '<p class="et">'+T["js.hechoTerceros"][idioma]+'</p><ul class="terc">'+terc+'</ul>'+
    '<p class="fic-p">'+T["js.hechoPie"][idioma]+'</p>';
}

function pagina(p, c, T, idioma){
  const slug = SLUG[p.id];
  const arte = (p.a||"").replace(/&middot;/g,"·").replace(/&amp;/g,"&");
  const raiz = idioma === "en" ? "../../../" : "../../";
  const urlEs = BASE + "/proyectos/" + slug + "/";
  const urlEn = BASE + "/en/projects/" + slug + "/";
  const mia   = idioma === "en" ? urlEn : urlEs;
  const url   = c.productos[p.id] || c.tienda;
  const overlay = url.indexOf("/l/") > -1 && url.indexOf("gumroad.com") > -1;

  const titulo = idioma === "en"
    ? p.t + " — " + arte + " | Full Ableton Live project"
    : p.t + " — " + arte + " | Proyecto completo de Ableton Live";
  const desc = idioma === "en"
    ? "My recreation of “"+p.t+"” by "+arte+" in Ableton Live: "+p.pistas+" tracks in "+p.grupos+
      " groups at "+p.bpm+" BPM, every rack and effect chain, all the automation and the MIDI for every part."+
      (p.midi ? " Free MIDI from this track." : "")
    : "Mi recreación de «"+p.t+"» de "+arte+" en Ableton Live: "+p.pistas+" pistas en "+p.grupos+
      " grupos a "+p.bpm+" BPM, cada rack y cada cadena de efectos, todas las automatizaciones y el MIDI de cada parte."+
      (p.midi ? " Con el MIDI del tema gratis." : "");
  const intro = idioma === "en"
    ? "Built from scratch by ear. Not stems and not a loop pack — the session file I work in."
    : "Hecha desde cero y de oído. No son stems ni un pack de loops: es el archivo con el que trabajo.";

  const dentro = [1,2,3,4].map(i =>
    '<li><i>0'+i+'</i><div><b>'+T["js.d"+i+"t"][idioma]+'</b> '+T["js.d"+i][idioma]+'</div></li>').join("");

  return `<!doctype html>
<html lang="${idioma}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${mia}">
<link rel="alternate" hreflang="es" href="${urlEs}">
<link rel="alternate" hreflang="en" href="${urlEn}">
<link rel="alternate" hreflang="x-default" href="${urlEs}">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${mia}">
<meta property="og:image" content="${BASE}/${esc(p.portada || p.captura)}">
<link rel="icon" href="${raiz}img/favicon-32.png" sizes="32x32">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@300;400&family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${raiz}css/estilo.css?v=${c.__v}">
<script type="application/ld+json">${JSON.stringify({
  "@context":"https://schema.org","@type":"Product",
  "name": p.t + " — " + (idioma==="en"?"Ableton Live project":"proyecto de Ableton Live"),
  "description": desc,
  "image": BASE + "/" + (p.portada || p.captura),
  "brand": {"@type":"Brand","name":"Ian Era Studio"},
  "offers": {"@type":"Offer","price": c.precio.replace(/[^0-9,]/g,"").replace(",","."),
             "priceCurrency":"EUR","availability":"https://schema.org/InStock","url": mia}
})}</script>
</head>
<body class="ficha">
<main class="wrap">
  <p class="fic-volver"><a href="${idioma==="en" ? "/en/" : "/"}">← Ian Era Studio</a></p>

  <header class="fic-cab">
    <span class="et">${esc(p.y)}</span>
    <h1>${esc(p.t)}</h1>
    <p class="fic-art">${esc(arte)}</p>
    <p class="fic-p">${esc(intro)}</p>
  </header>

  ${p.captura ? '<figure class="fic-img"><img src="'+raiz+esc(p.captura)+'" alt="'+esc(p.t)+' — '+
    (idioma==="en"?"the Ableton Live session":"la sesión de Ableton Live")+'" width="1920" height="1138" loading="lazy"></figure>' : ""}

  ${specs(p, T, idioma)}

  <h2>${idioma==="en" ? "What's inside" : "Lo que hay dentro"}</h2>
  <ul class="dentro">${dentro}</ul>

  ${plugins(p, T, idioma)}

  <div class="compra">
    <span class="pr">${esc(c.precio)}</span>
    <a class="btn${overlay ? " gumroad-button" : ""}" href="${esc(url)}"${overlay ? "" : ' target="_blank" rel="noopener"'}>${T["js.conseguir"][idioma]}</a>
    <span class="nota">${T["js.compraNota"][idioma]}</span>
  </div>

  ${p.midi ? '<div class="midi"><div class="midi-t"><b>'+T["js.midiTit"][idioma]+'</b>'+
    (tr(p,"midiQue",idioma) ? '<span class="sub">'+T["js.midiSub"][idioma].replace("{que}", esc(tr(p,"midiQue",idioma)))+'</span>' : "")+
    '</div><a class="btn gh midi-b gumroad-button" href="'+esc(p.midi)+'">'+T["js.midiBoton"][idioma]+'</a></div>' : ""}

  ${p.video ? '<p class="fic-p"><a href="https://www.youtube.com/watch?v='+esc(p.video)+'" target="_blank" rel="noopener">'+
    (idioma==="en" ? "Watch the full breakdown on YouTube ↗" : "Ver el despiece completo en YouTube ↗")+'</a></p>' : ""}

  <p class="legal">${T["js.legal"][idioma]}</p>

  <nav class="fic-otros">
    <span class="et">${idioma==="en" ? "Other projects" : "Otros proyectos"}</span>
    ${c.proyectos.filter(o => o.id !== p.id).map(o =>
      '<a href="'+(idioma==="en" ? "/en/projects/" : "/proyectos/")+SLUG[o.id]+'/">'+esc(o.t)+'</a>').join("")}
  </nav>
</main>
<script src="https://gumroad.com/js/gumroad.js" defer></script>
</body>
</html>`;
}

function generar(c, T, v){
  c.__v = v;
  const RAIZ = path.join(__dirname, "..");
  const urls = [];
  for(const p of c.proyectos){
    for(const idioma of ["es","en"]){
      const dir = path.join(RAIZ, idioma === "en" ? "en/projects" : "proyectos", SLUG[p.id]);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), pagina(p, c, T, idioma));
      urls.push(BASE + (idioma === "en" ? "/en/projects/" : "/proyectos/") + SLUG[p.id] + "/");
    }
  }
  return urls;
}

module.exports = { generar, SLUG };
