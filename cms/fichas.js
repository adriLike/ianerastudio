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
  /* Plegado de entrada. Son 31 filas: desplegadas empujan el precio muy
     abajo, y aquí el resumen de la cabecera ya tranquiliza sin abrirlo.
     Google indexa igual lo que hay dentro de un acordeón. */
  return '<div class="hecho">'+
    '<button class="hecho-p" type="button" aria-expanded="false">'+
      '<span class="hecho-t"><b>'+T["js.hechoTit"][idioma]+'</b>'+
        '<span class="sub">'+T["js.hechoSub"][idioma].replace("{pct}", g.pct)+'</span></span>'+
      '<span class="qa-mas" aria-hidden="true"></span>'+
    '</button>'+
    '<div class="hecho-c"><div class="hecho-in"><div class="hecho-pad">'+
      '<p class="et">'+T["js.hechoSerie"][idioma]+'</p><div class="chips">'+serie+'</div>'+
      '<p class="et">'+T["js.hechoTerceros"][idioma]+'</p><ul class="terc">'+terc+'</ul>'+
      '<p class="hecho-pie">'+T["js.hechoPie"][idioma]+'</p>'+
    '</div></div></div>'+
  '</div>';
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

  ${p.video
    ? '<div class="previa" data-video="'+esc(p.video)+'">'+
        '<button class="previa-cara nitida" type="button" data-play="'+esc(p.video)+'">'+
          '<img src="/'+esc(p.captura || "")+'" alt="'+esc(p.t)+' — '+
            (idioma==="en"?"the Ableton Live session":"la sesión de Ableton Live")+'" loading="lazy">'+
          '<span class="play" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>'+
          '<span class="previa-txt"><b>'+T["js.previaTit"][idioma]+'</b>'+
          '<span class="sub">'+T["js.previaSub"][idioma]+'</span></span>'+
        '</button></div>'
    : (p.captura ? '<figure class="fic-img"><img src="/'+esc(p.captura)+'" alt="'+esc(p.t)+' — '+
        (idioma==="en"?"the Ableton Live session":"la sesión de Ableton Live")+'" width="1920" height="1138" loading="lazy"></figure>' : "")}

  ${p.audio
    ? '<div class="oir" data-oir>'+
        '<button class="oir-b" type="button" aria-label="'+T["js.oirAria"][idioma]+'">'+
          '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
            '<path class="i-play" d="M8 5v14l11-7z"/><path class="i-pausa" d="M6 5h4v14H6zM14 5h4v14h-4z"/>'+
          '</svg></button>'+
        '<div class="oir-barra"><span class="oir-va"></span></div>'+
        '<span class="oir-t et">0:00</span>'+
        '<audio preload="none" src="/'+esc(p.audio)+'"></audio>'+
      '</div><p class="oir-pie et">'+T["js.oirPie"][idioma]+'</p>'
    : ""}

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
    <a href="${idioma==="en" ? "/en/plugins/" : "/plugins/"}">${T["pie.plugins"][idioma]} →</a>
  </nav>
</main>
<script src="https://gumroad.com/js/gumroad.js" defer></script>
<script>
/* La ficha no carga sitio.js: solo necesita estas dos cosas. */
(function(){
  var v = document.querySelector("[data-play]");
  if(v) v.addEventListener("click", function(){
    var caja = v.parentElement;
    caja.classList.add("cargado");
    caja.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.dataset.play +
      '?autoplay=1&rel=0&modestbranding=1" title="v" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  });

  var h = document.querySelector(".hecho-p");
  if(h) h.addEventListener("click", function(){
    var abierto = h.getAttribute("aria-expanded") === "true";
    h.setAttribute("aria-expanded", abierto ? "false" : "true");
    h.parentElement.classList.toggle("on", !abierto);
  });

  var caja = document.querySelector("[data-oir]");
  if(!caja) return;
  var son = caja.querySelector("audio"), bar = caja.querySelector(".oir-barra"),
      va = caja.querySelector(".oir-va"), t = caja.querySelector(".oir-t");
  function reloj(s){ if(!isFinite(s)||s<0) s=0;
    var m=Math.floor(s/60), r=Math.floor(s%60); return m+":"+(r<10?"0":"")+r; }
  caja.querySelector(".oir-b").addEventListener("click", function(){
    if(son.paused) son.play(); else son.pause();
  });
  bar.addEventListener("click", function(e){
    if(!isFinite(son.duration) || !son.duration) return;
    var r = bar.getBoundingClientRect();
    son.currentTime = son.duration * Math.min(1, Math.max(0, (e.clientX-r.left)/r.width));
  });
  ["play","pause","ended","timeupdate","loadedmetadata"].forEach(function(ev){
    son.addEventListener(ev, function(){
      caja.classList.toggle("sonando", !son.paused && !son.ended);
      var d=son.duration, ok=isFinite(d)&&d>0;
      caja.classList.toggle("sinlargo", !ok);
      va.style.width = (ok ? (son.currentTime/d)*100 : 0) + "%";
      t.textContent = reloj(son.currentTime) + (ok ? " / " + reloj(d) : "");
    });
  });
})();
</script>
</body>
</html>`;
}

/* ============================================================
   Página de plugins.

   Es el único contenido de la web que nadie más puede copiar:
   sale de descomprimir los cinco .als y contar. 48 plugins de
   terceros con su alternativa gratuita, y 33 dispositivos de
   Ableton con las veces que aparecen. Responde a búsquedas
   reales («alternativa gratis a Serum») que la portada no toca.
   ============================================================ */
function plugsPagina(c, T, idioma){
  const raiz = idioma === "en" ? "../../" : "../";
  const urlEs = BASE + "/plugins/", urlEn = BASE + "/en/plugins/";
  const mia = idioma === "en" ? urlEn : urlEs;

  const terc = {}, serie = {};
  for(const p of c.proyectos){
    const g = p.plugins || {};
    for(const t of (g.terceros||[])){
      if(!terc[t.n]) terc[t.n] = Object.assign({}, t, {proyectos:[], usos:0});
      terc[t.n].proyectos.push(p.t); terc[t.n].usos += t.c;
    }
    for(const x of (g.serie||[])) serie[x.n] = (serie[x.n]||0) + x.c;
  }
  const lista = Object.values(terc).sort((a,b) => b.usos - a.usos);
  const libres = lista.filter(x => x.e === "gratis").length;
  const conAlt = lista.filter(x => x.e === "alt").length;

  const cab = idioma === "en"
    ? ["Plugin","Maker","Used in","Free alternative"]
    : ["Plugin","Fabricante","En qué proyectos","Alternativa gratuita"];
  const filas = lista.map(x => {
    const alt = tr(x, "a", idioma);
    const nota = x.e === "gratis" ? '<b>'+T["js.esGratuito"][idioma]+'</b>'
               : x.e === "sin"    ? '<span class="dim">'+esc(alt || T["js.sinEquivalente"][idioma])+'</span>'
               : !alt             ? '<span class="dim">'+T["js.sinEquivalente"][idioma]+'</span>'
               : esc(alt);
    return '<tr><td class="n">'+esc(x.n)+'</td><td class="dim">'+esc(x.f)+'</td>'+
           '<td class="dim">'+esc(x.proyectos.join(" · "))+'</td><td>'+nota+'</td></tr>';
  }).join("");

  const chips = Object.entries(serie).sort((a,b)=>b[1]-a[1])
    .map(([n,v]) => '<span class="chip">'+esc(n)+' <span class="dim">×'+v+'</span></span>').join("");

  const titulo = idioma === "en"
    ? "Every plugin I use, and the free alternative to each | Ian Era Studio"
    : "Todos los plugins que uso y su alternativa gratuita | Ian Era Studio";
  const desc = idioma === "en"
    ? "The "+lista.length+" third-party plugins across my five Ableton progressive house projects, with a free alternative for each — plus the "+Object.keys(serie).length+" stock Live devices I use. Read straight out of the .als files."
    : "Los "+lista.length+" plugins de terceros de mis cinco proyectos de progressive house en Ableton, con una alternativa gratuita para cada uno, y los "+Object.keys(serie).length+" dispositivos de serie de Live que uso. Sacado de leer los .als.";
  const h1 = idioma === "en"
    ? "Every plugin I use, and what to replace it with for free"
    : "Todos los plugins que uso, y con qué sustituirlos gratis";
  const intro = idioma === "en"
    ? "This isn't a list I wrote from memory. I unzipped my five Ableton projects and counted every device instance in them. "+lista.length+" third-party plugins: "+libres+" are already free, "+conAlt+" have a free equivalent I'd actually use."
    : "Esta lista no la he escrito de memoria. He descomprimido mis cinco proyectos de Ableton y he contado cada instancia de cada dispositivo. "+lista.length+" plugins de terceros: "+libres+" ya son gratuitos y "+conAlt+" tienen un equivalente gratis que usaría de verdad.";

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
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${mia}">
<link rel="icon" href="${raiz}img/favicon-32.png" sizes="32x32">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@300;400&family=Inter:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${raiz}css/estilo.css?v=${c.__v}">
</head>
<body class="ficha">
<main class="wrap ancho">
  <p class="fic-volver"><a href="${idioma==="en" ? "/en/" : "/"}">← Ian Era Studio</a></p>
  <header class="fic-cab"><h1>${esc(h1)}</h1><p class="fic-p">${esc(intro)}</p></header>

  <h2>${idioma==="en" ? "Third-party plugins" : "Plugins de terceros"}</h2>
  <div class="tabla-caja"><table class="tpl">
    <thead><tr>${cab.map(x=>'<th>'+esc(x)+'</th>').join("")}</tr></thead>
    <tbody>${filas}</tbody>
  </table></div>

  <h2>${idioma==="en" ? "And what Ableton already gives you" : "Y lo que Ableton ya te da"}</h2>
  <p class="fic-p">${idioma==="en"
    ? "These come with Live. Across the five projects they add up to roughly half of all the processing."
    : "Estos vienen con Live. En los cinco proyectos suman en torno a la mitad de todo el procesado."}</p>
  <div class="chips">${chips}</div>

  <nav class="fic-otros">
    <span class="et">${idioma==="en" ? "The projects" : "Los proyectos"}</span>
    ${c.proyectos.map(o => '<a href="'+(idioma==="en" ? "/en/projects/" : "/proyectos/")+SLUG[o.id]+'/">'+esc(o.t)+'</a>').join("")}
  </nav>
</main>
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
  for(const idioma of ["es","en"]){
    const dir = path.join(RAIZ, idioma === "en" ? "en/plugins" : "plugins");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), plugsPagina(c, T, idioma));
  }
  return urls;
}

module.exports = { generar, SLUG };
