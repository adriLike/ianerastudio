/* ============================================================
   Comportamiento. Los contenidos están en datos.js — este archivo
   normalmente no hace falta tocarlo.
   ============================================================ */
(function(){
"use strict";

function $(s){ return document.querySelector(s); }
function url(id){ return PRODUCTOS[id] || TIENDA; }
function yt(id){ return "https://www.youtube.com/watch?v=" + id; }
/* Cada imagen en el sitio donde se lee mejor:
   TARJETA  → `portada` (la miniatura del vídeo). Cuatro capturas de Ableton a
              340 px son cuatro rectángulos grises indistinguibles; la portada
              del tema hace que se reconozca cada proyecto sin leer el título.
   PANEL y CARÁTULA → `captura`, que ahí se ve a 960 px y se puede leer. */
function miniatura(id){
  /* maxresdefault es la miniatura tal cual la subes: 1280x720 y 16:9 exacto.
     hqdefault son 480x360 en 4:3, así que recorta o mete bandas negras.
     Si un vídeo no tiene maxres (vídeos viejos), se cae a hqdefault sola. */
  return "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg";
}
function miniaturaFallback(id){ return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; }

/* ---------------------------------------------------------------
   COMPRA — enlaces reales, no botones falsos.

   El overlay de Gumroad se engancha a <a class="gumroad-button"> y abre el
   pago encima de esta página. Si su script no carga, el mismo enlace navega
   a la ficha: funciona igual, solo que saliendo. Sin trucos ni clics
   sintéticos, que es justo lo que antes hacía que no pasara nada.
   --------------------------------------------------------------- */
function botonCompra(id, texto, clase){
  var u = url(id);
  var esProducto = u.indexOf("/l/") > -1;
  return '<a class="' + clase + (esProducto ? ' gumroad-button' : '') + '" href="' + u + '"' +
         (esProducto ? '' : ' target="_blank" rel="noopener"') + '>' + texto + '</a>';
}

/* ---------------------------------------------------------------
   Raíl de redes. Solo se pinta el icono que tiene URL de verdad.
   --------------------------------------------------------------- */
var ICONOS = {
  youtube:'<path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.5 31 31 0 0 0-.5-4.5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.4" cy="6.6" r="1.1"/>',
  soundcloud:'<path d="M2 14v4h1v-4H2Zm2-2v6h1v-6H4Zm2-2v8h1v-8H6Zm2 1v7h1v-7H8Zm2-3v10h1V8h-1Zm2.5-2A5.5 5.5 0 0 1 18 11h1a4 4 0 0 1 0 8h-6.5V6Z"/>',
  spotify:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.8.8 0 0 1-1.1.3c-3-1.8-6.8-2.2-11.2-1.2a.8.8 0 1 1-.3-1.5c4.8-1.1 9-.6 12.3 1.4a.8.8 0 0 1 .3 1Zm1.2-2.9a1 1 0 0 1-1.3.3c-3.4-2.1-8.6-2.7-12.6-1.5a1 1 0 0 1-.6-1.9c4.6-1.4 10.3-.7 14.2 1.7a1 1 0 0 1 .3 1.4Zm.1-3C14 8.2 7.9 8 4.6 9a1.2 1.2 0 1 1-.7-2.3C7.7 5.5 14.4 5.8 18.7 8.3a1.2 1.2 0 0 1-.9 2.2Z"/>'
,
  tiktok:'<path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>'
};
var NOMBRES = {youtube:"YouTube",instagram:"Instagram",soundcloud:"SoundCloud",spotify:"Spotify",tiktok:"TikTok"};

$("#rail").innerHTML = Object.keys(ICONOS).filter(function(k){ return REDES[k]; })
  .map(function(k){
    return '<a href="'+REDES[k]+'" target="_blank" rel="noopener" aria-label="'+NOMBRES[k]+'">'+
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
      ICONOS[k]+'</svg></a>';
  }).join("");

/* ---------------------------------------------------------------
   Carril de proyectos
   --------------------------------------------------------------- */
var carril = $("#carril");
carril.innerHTML = PROYECTOS.map(function(p,i){
  var n = String(i+1).padStart(2,"0");
  var img = p.portada || p.captura || (p.video ? miniatura(p.video) : null);
  var mini = img
    ? '<div class="mini"><img src="'+img+'" alt="" loading="lazy"'+
      (p.captura ? '' : ' onerror="this.onerror=null;this.src=\''+miniaturaFallback(p.video)+'\'"')+'>'+
      '<span class="lupa" aria-hidden="true">'+
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'+
      '</span></div>'
    : '<div class="mini vacia" aria-hidden="true"><b>'+n+'</b></div>';
  /* Una sola insignia por tarjeta, y solo si dice algo comprobable: qué es
     lo último o cuánta gente lo ha visto. Nada de reclamos que no se puedan
     verificar en un clic. */
  var marca = p.insignia ? '<span class="marca et">'+p.insignia+'</span>' : '';
  return '<button class="tarjeta" type="button" data-i="'+i+'">'+ mini + marca +
    '<div class="cuerpo">'+
      '<div class="top et"><span>'+n+'</span><span class="yr">'+p.y+'</span></div>'+
      '<h3>'+p.t+'</h3>'+
      '<p class="art">'+p.a+'</p>'+
      '<div class="pie et"><span class="ab">Ver ↗</span></div>'+
    '</div></button>';
}).join("");
$("#proy-n").textContent = String(PROYECTOS.length).padStart(2,"0");

/* Flechas. Avanzan una tarjeta y se apagan en los extremos. */
var antes = $("#car-antes"), luego = $("#car-luego");
function paso(){
  var t = carril.querySelector(".tarjeta");
  return t ? t.getBoundingClientRect().width + 16 : 300;
}
function estadoFlechas(){
  var max = carril.scrollWidth - carril.clientWidth;
  antes.disabled = carril.scrollLeft <= 2;
  luego.disabled = carril.scrollLeft >= max - 2;
}
antes.addEventListener("click",function(){ carril.scrollBy({left:-paso()}); });
luego.addEventListener("click",function(){ carril.scrollBy({left: paso()}); });
carril.addEventListener("scroll",estadoFlechas,{passive:true});
addEventListener("resize",estadoFlechas);
estadoFlechas();

/* ---------------------------------------------------------------
   Vídeos publicados
   --------------------------------------------------------------- */
var vn=document.getElementById("vid-n"); if(vn) vn.textContent=String(VIDEOS.length).padStart(2,"0");
$("#videos-lista").innerHTML = VIDEOS.map(function(v){
  return '<a class="fila fila-video" href="'+yt(v.id)+'" target="_blank" rel="noopener">'+
    '<span class="fch et">'+v.f+'</span>'+
    '<span class="tit">'+v.t+'</span>'+
    '<span class="acc et">Ver en YouTube ↗</span></a>';
}).join("");

/* ---------------------------------------------------------------
   Catálogo. «Ver» abre el panel, no Gumroad: primero informas y
   dentro ya está el vídeo y el botón de compra.
   --------------------------------------------------------------- */
var filas = PROYECTOS.map(function(p,i){
  return '<div class="fila">'+
    '<span class="fch et">'+String(i+1).padStart(2,"0")+' · '+p.y+'</span>'+
    '<span><span class="tit">'+p.t+
      (p.insignia ? '<span class="marca fila-marca et">'+p.insignia+'</span>' : '')+
    '</span><span class="meta">'+p.a+'</span></span>'+
    /* Sin precio: ya está en el detalle, y repetirlo cuatro veces con el
       mismo número no informa. La fila invita a abrir, no a decidir. */
    '<span class="der">'+
      '<button class="acc et" type="button" data-i="'+i+'">Ver ↗</button>'+
    '</span></div>';
});

if(PRODUCTOS.bundle){
  filas.push('<div class="fila destacada">'+
    '<span class="fch et">Pack</span>'+
    '<span><span class="tit">Los 4 proyectos</span>'+
      '<span class="meta">Los cuatro completos, en vez de '+BUNDLE.antes+'</span></span>'+
    '<span class="der"><span class="pr">'+BUNDLE.precio+'</span>'+
      botonCompra("bundle","Comprar ↗","acc et")+'</span></div>');
}
if(PRODUCTOS.gratis){
  filas.push('<div class="fila destacada">'+
    '<span class="fch et">Gratis</span>'+
    '<span><span class="tit">Welcome Sample Pack</span>'+
      '<span class="meta">Sonidos de progressive house para empezar</span></span>'+
    '<span class="der"><span class="pr">0 €</span>'+
      botonCompra("gratis","Descargar ↗","acc et")+'</span></div>');
}
$("#catalogo-lista").innerHTML = filas.join("");

/* ---------------------------------------------------------------
   Capturas: el índice de abajo y el carrusel se siguen el uno al otro.
   Pulsar un pie lleva a su captura; desplazar el carrusel marca el pie.
   --------------------------------------------------------------- */
var caps = $("#caps"), capsNav = $("#caps-nav");
if(caps && capsNav){
  var botones = [].slice.call(capsNav.querySelectorAll("button"));

  capsNav.addEventListener("click", function(e){
    var b = e.target.closest("button"); if(!b) return;
    var f = caps.children[+b.dataset.i];
    if(f) caps.scrollTo({ left: f.offsetLeft - caps.offsetLeft, behavior:"smooth" });
  });

  function marcarCaptura(){
    /* la que más cerca esté del borde izquierdo del carril */
    var mejor = 0, min = Infinity;
    for(var i=0;i<caps.children.length;i++){
      var d = Math.abs(caps.children[i].offsetLeft - caps.offsetLeft - caps.scrollLeft);
      if(d < min){ min = d; mejor = i; }
    }
    botones.forEach(function(b,i){
      if(i===mejor) b.setAttribute("aria-current","true");
      else b.removeAttribute("aria-current");
    });
  }
  var tic2 = false;
  caps.addEventListener("scroll", function(){
    if(tic2) return; tic2 = true;
    requestAnimationFrame(function(){ marcarCaptura(); tic2 = false; });
  }, {passive:true});
  marcarCaptura();
}

/* ---------------------------------------------------------------
   Dudas y contacto. Solo se pinta lo que tiene respuesta de verdad.
   --------------------------------------------------------------- */
var faqCaja = $("#faq-lista");
if(faqCaja){
  var conRespuesta = FAQ.filter(function(f){ return f.r; });
  faqCaja.innerHTML = conRespuesta.map(function(f,i){
    var n = String(i+1).padStart(2,"0");
    return '<div class="qa">'+
      '<button class="qa-p" type="button" aria-expanded="false" aria-controls="qa-'+i+'">'+
        '<span class="qa-n et">'+n+'</span>'+
        '<span class="qa-t">'+f.p+'</span>'+
        '<span class="qa-mas" aria-hidden="true"></span>'+
      '</button>'+
      '<div class="qa-c" id="qa-'+i+'" role="region"><div class="qa-i"><p>'+f.r+'</p></div></div>'+
    '</div>';
  }).join("");

  /* Acordeón de uno en uno: abrir una cierra la anterior. Con más de tres
     respuestas abiertas a la vez la sección deja de leerse. */
  faqCaja.addEventListener("click",function(e){
    var b = e.target.closest(".qa-p");
    if(!b) return;
    var abierta = b.getAttribute("aria-expanded") === "true";
    faqCaja.querySelectorAll(".qa-p").forEach(function(o){
      o.setAttribute("aria-expanded","false");
      o.parentElement.classList.remove("on");
    });
    if(!abierta){
      b.setAttribute("aria-expanded","true");
      b.parentElement.classList.add("on");
    }
  });
  /* la primera, abierta de entrada */
  var primera = faqCaja.querySelector(".qa-p");
  if(primera){ primera.setAttribute("aria-expanded","true"); primera.parentElement.classList.add("on"); }
}

/* Reseñas. Si no hay, la sección entera desaparece. */
var resCaja = $("#resenas-lista"), resSec = $("#resenas");
if(resSec){
  if(RESENAS.length){
    /* Con una o dos, cita grande a toda anchura: dos opiniones reales bien
       puestas transmiten más que ocho tarjetas pequeñas medio vacías.
       De tres en adelante, rejilla. */
    resCaja.className = "resenas rv on" + (RESENAS.length <= 2 ? " pocas" : "");
    resCaja.innerHTML = RESENAS.map(function(r){
      return '<figure class="res">'+
        '<blockquote>'+r.t+'</blockquote>'+
        '<figcaption class="et"><b>'+r.n+'</b>'+(r.d?'<span>'+r.d+'</span>':'')+'</figcaption>'+
      '</figure>';
    }).join("");
  } else {
    resSec.remove();
  }
}

var cCaja = $("#contacto");
if(cCaja){
  var vias = [];
  if(CONTACTO.instagram) vias.push('<a href="'+CONTACTO.instagram+'" target="_blank" rel="noopener">Instagram ↗</a>');
  if(CONTACTO.correo)    vias.push('<a href="mailto:'+CONTACTO.correo+'">'+CONTACTO.correo+'</a>');
  cCaja.innerHTML = vias.length
    ? '<p class="et">¿Alguna duda antes de comprar?</p><p class="vias">'+vias.join('<span class="sep">·</span>')+'</p>'+
      '<p class="cont-nota">Pregunta lo que quieras. Contesto yo, no un formulario.</p>'
    : '';
}

/* ---------------------------------------------------------------
   Datos estructurados. Sin esto, para un buscador la web es texto:
   no sabe que hay cuatro productos con precio y descarga. Se genera
   desde PROYECTOS para no duplicar la lista a mano.
   Nada de valoraciones: no las hay, e inventarlas se penaliza.
   --------------------------------------------------------------- */
(function(){
  var base = "https://ianerastudio.com/";
  var precioNum = PRECIO.replace(/[^0-9,]/g,"").replace(",",".");
  var datos = {
    "@context":"https://schema.org",
    "@graph":[
      { "@type":"WebSite", "@id":base+"#web", "url":base,
        "name":"Ian Era Studio", "inLanguage":"es-ES" },
      { "@type":"Person", "@id":base+"#ian", "name":"Ian Era",
        "url":base, "jobTitle":"Productor musical",
        "sameAs":[CANAL, REDES.instagram, REDES.tiktok, TIENDA].filter(Boolean) }
    ].concat(PROYECTOS.map(function(p){
      var limpio = p.a.replace(/&middot;/g,"·").replace(/&amp;/g,"&");
      return {
        "@type":"Product",
        "@id": base+"#"+p.id,
        "name": p.t+" — Proyecto completo de Ableton Live",
        "description":"Mi recreación de «"+p.t+"» de "+limpio+" como sesión de "+
                      "Ableton Live: el arreglo completo, los racks y la automatización.",
        "brand":{ "@type":"Brand", "name":"Ian Era Studio" },
        "url": base+"#"+p.id,
        "offers":{
          "@type":"Offer", "price":precioNum, "priceCurrency":"EUR",
          "availability":"https://schema.org/InStock",
          "url": PRODUCTOS[p.id] || TIENDA,
          "seller":{ "@id":base+"#ian" }
        }
      };
    }))
  };
  var e = document.createElement("script");
  e.type = "application/ld+json";
  e.textContent = JSON.stringify(datos);
  document.head.appendChild(e);
})();

/* ---------------------------------------------------------------
   Panel de proyecto
   --------------------------------------------------------------- */
var velo=$("#velo"), panel=$("#panel"), pin=$("#pin"), cerrarBtn=$("#cerrar"), previo=null;

function specs(p){
  var d=[];
  if(p.bpm)    d.push('<div><b>'+p.bpm+'</b><span class="et">BPM</span></div>');
  if(p.tono)   d.push('<div><b>'+p.tono+'</b><span class="et">Tonalidad</span></div>');
  /* El número solo asusta; con los grupos al lado dice «grande y ordenado». */
  if(p.pistas) d.push('<div><b>'+p.pistas+'</b><span class="et">Pistas'+
    (p.grupos ? ' en '+p.grupos+' grupos' : '')+'</span></div>');
  if(!d.length) return '<p class="formato et">Archivo .als · Proyecto de Ableton Live</p>';
  d.push('<div><b>.als</b><span class="et">Proyecto de Live</span></div>');
  return '<div class="specs">'+d.join("")+'</div>';
}

/* deja fuera del foco todo lo que hay detrás del panel */
var fondo = Array.prototype.filter.call(document.body.children,function(el){
  return el.id!=="panel" && el.id!=="velo" && el.tagName!=="SCRIPT" && el.tagName!=="SVG";
});
function fondoInerte(v){ fondo.forEach(function(el){ el.inert = v; }); }

function abrir(i, desdeUrl){
  var p = PROYECTOS[i];
  pin.innerHTML =
    /* Sin cabecera de imagen: la misma captura ya sale justo debajo como
       fondo de la carátula del vídeo. Repetirla no aportaba nada y alejaba
       el precio y el botón de compra. */
    '<div class="pcab et"><span>Proyecto '+String(i+1).padStart(2,"0")+'</span>'+
      '<span class="yr">'+p.y+'</span></div>'+
    '<h3 id="p-tit">'+p.t+'</h3><p class="part">'+p.a+'</p>'+

    /* La prueba antes que el precio. El vídeo se ve AQUÍ: pulsas y se
       carga el reproductor de YouTube dentro del panel. No se incrusta de
       entrada porque cargarlo son ~800 KB por proyecto aunque nadie le dé.
       Las reproducciones incrustadas SÍ cuentan como visitas del canal. */
    (p.video
      ? '<div class="previa" data-video="'+p.video+'">'+
          '<button class="previa-cara'+(p.captura ? ' nitida' : '')+'" type="button" data-play="'+p.video+'">'+
            '<img src="'+(p.captura || miniatura(p.video))+'" alt="" loading="lazy">'+
            '<span class="play" aria-hidden="true">'+
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'+
            '</span>'+
            '<span class="previa-txt"><b>Míralo por dentro antes de descargar</b>'+
            '<span class="sub">Abro esta sesión y te enseño cómo está montada</span></span>'+
          '</button></div>'
      : '')+

    /* Un fragmento del tema, para quien prefiere oír antes que mirar — y la
       única prueba que hay mientras un proyecto todavía no tiene vídeo.
       preload="none" es lo que importa: el MP3 no se descarga hasta que se
       pulsa, así que no cuesta nada a quien solo pasa por aquí. */
    (p.audio
      ? '<div class="oir" data-oir>'+
          '<button class="oir-b" type="button" aria-label="Escuchar el fragmento">'+
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
              '<path class="i-play" d="M8 5v14l11-7z"/>'+
              '<path class="i-pausa" d="M6 5h4v14H6zM14 5h4v14h-4z"/>'+
            '</svg>'+
          '</button>'+
          '<div class="oir-barra" role="presentation"><span class="oir-va"></span></div>'+
          '<span class="oir-t et">0:00</span>'+
          '<audio preload="none" src="'+p.audio+'"></audio>'+
        '</div>'+
        '<p class="oir-pie et">Fragmento del tema · así suena la sesión terminada</p>'
      : '')+

    specs(p)+
    '<ul class="dentro">'+
      '<li><i>01</i><div><b>El arreglo completo.</b> De la intro al último compás, con las pistas nombradas y agrupadas tal y como las tengo yo.</div></li>'+
      '<li><i>02</i><div><b>Todos los racks y cadenas de efectos.</b> Cada dispositivo en su orden y con sus ajustes. Desactiva uno y oye qué aportaba.</div></li>'+
      '<li><i>03</i><div><b>Todas las automatizaciones.</b> Filtros, envíos y volúmenes, en su sitio — la mitad de por qué el tema respira.</div></li>'+
      '<li><i>04</i><div><b>El MIDI de cada parte.</b> Cambia las notas y ya es tuyo.</div></li>'+
    '</ul>'+
    '<div class="compra"><span class="pr">'+PRECIO+'</span>'+
      botonCompra(p.id,"Conseguir el proyecto","btn")+
      '<span class="nota">Descarga inmediata. Pago seguro gestionado por Gumroad.</span></div>'+
    '<p class="legal">Es mi propia recreación, hecha de oído. No contiene audio, samples ni '+
      'material del lanzamiento original. Puedes publicar lo que hagas con ella; no puedes '+
      'revender ni redistribuir el archivo del proyecto.</p>';

  if(!desdeUrl && location.hash !== "#"+p.id) history.pushState({p:p.id}, "", "#"+p.id);

  panel.hidden = false;
  requestAnimationFrame(function(){ velo.classList.add("on"); panel.classList.add("on"); });
  document.documentElement.style.overflow = "hidden";
  fondoInerte(true);
  pintarScroll();
  cerrarBtn.focus();
}
function cerrar(desdeUrl){
  /* Corta el vídeo AL INSTANTE. Si solo se oculta el panel, el iframe sigue
     vivo en el DOM y se sigue oyendo con la web ya cerrada. */
  var marco = pin.querySelector("iframe");
  if(marco) marco.remove();
  var son = pin.querySelector("audio");
  if(son){ son.pause(); son.remove(); }

  velo.classList.remove("on"); panel.classList.remove("on");
  if(!desdeUrl && location.hash) history.pushState(null, "", location.pathname);
  document.documentElement.style.overflow = "";
  fondoInerte(false);
  pintarScroll();
  setTimeout(function(){
    if(!panel.classList.contains("on")){ panel.hidden = true; pin.innerHTML = ""; }
  },420);
  if(previo) previo.focus();
}
/* el carril y el catálogo abren el mismo panel */
document.addEventListener("click",function(e){
  var b = e.target.closest(".tarjeta[data-i], #catalogo-lista [data-i]");
  if(!b) return;
  previo = b; abrir(+b.dataset.i);
});
/* Cambia la carátula por el reproductor real de YouTube, ya reproduciendo. */
pin.addEventListener("click",function(e){
  var b = e.target.closest("[data-play]");
  if(!b) return;
  var id = b.getAttribute("data-play");
  var son = pin.querySelector("audio");
  if(son) son.pause();          /* que no suenen el fragmento y el vídeo a la vez */
  var caja = b.parentElement;
  caja.classList.add("cargado");
  /* modestbranding quita el logotipo grande; rel=0 limita los sugeridos al
     propio canal. La calidad no se puede pedir: la elige YouTube. */
  caja.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/'+id+
    '?autoplay=1&rel=0&modestbranding=1" title="Vídeo del proyecto" '+
    'allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" '+
    'allowfullscreen></iframe>';
});

/* ---------------------------------------------------------------
   Reproductor del fragmento. Nativo por dentro (<audio> de verdad),
   con los controles pintados a mano para que no desentone con el
   resto: el player del navegador es gris y azul, y aquí no hay más
   color que el de las fotos.
   --------------------------------------------------------------- */
function reloj(s){
  if(!isFinite(s) || s < 0) s = 0;
  var m = Math.floor(s/60), r = Math.floor(s%60);
  return m + ":" + (r<10 ? "0" : "") + r;
}
pin.addEventListener("click",function(e){
  var caja = e.target.closest("[data-oir]");
  if(!caja) return;
  var son = caja.querySelector("audio");
  if(!son) return;

  if(e.target.closest(".oir-b")){
    if(son.paused) son.play(); else son.pause();
    return;
  }
  var barra = e.target.closest(".oir-barra");
  if(barra && isFinite(son.duration) && son.duration > 0){
    var r = barra.getBoundingClientRect();
    son.currentTime = son.duration * Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  }
});
/* Los eventos de <audio> no burbujean, así que se escuchan en captura. */
["play","pause","ended","timeupdate","loadedmetadata"].forEach(function(ev){
  pin.addEventListener(ev, function(e){
    var son = e.target;
    if(!son || son.tagName !== "AUDIO") return;
    var caja = son.closest("[data-oir]");
    if(!caja) return;
    caja.classList.toggle("sonando", !son.paused && !son.ended);
    /* duration es Infinity hasta que el navegador sabe cuánto dura. Mientras
       tanto no hay barra que pintar ni sitio al que saltar. */
    var t = son.currentTime, d = son.duration, largo = isFinite(d) && d > 0;
    caja.classList.toggle("sinlargo", !largo);
    caja.querySelector(".oir-va").style.width = (largo ? (t/d)*100 : 0) + "%";
    caja.querySelector(".oir-t").textContent = reloj(t) + (largo ? " / " + reloj(d) : "");
  }, true);
});

/* ---------------------------------------------------------------
   Enlace directo a cada proyecto: ianerastudio.com/#blessings abre
   su ficha al cargar. Es lo que permite que la descripción de un
   vídeo apunte al proyecto exacto y no a la portada.
   Además el botón Atrás del navegador cierra la ficha, que es lo
   que cualquiera espera al llegar desde fuera.
   --------------------------------------------------------------- */
function porId(id){
  for(var i=0;i<PROYECTOS.length;i++) if(PROYECTOS[i].id===id) return i;
  return -1;
}
function abrirDesdeHash(){
  var h = decodeURIComponent(location.hash.replace(/^#/,""));
  var i = h ? porId(h) : -1;
  if(i > -1 && !panel.classList.contains("on")) abrir(i, true);
  else if(i === -1 && panel.classList.contains("on")) cerrar(true);
}
addEventListener("hashchange", abrirDesdeHash);

cerrarBtn.addEventListener("click",function(){ cerrar(); });
velo.addEventListener("click",function(){ cerrar(); });
addEventListener("keydown",function(e){
  if(e.key==="Escape" && panel.classList.contains("on")) cerrar();
});

/* ---------------------------------------------------------------
   Revelado, navegación activa, barra y CTA fijo
   --------------------------------------------------------------- */
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting) return;
    var p=e.target.parentElement;
    var k=p?Array.prototype.indexOf.call(p.children,e.target):0;
    e.target.style.transitionDelay = Math.min(k,4)*80+"ms";
    e.target.classList.add("on");
    io.unobserve(e.target);
  });
},{threshold:.12,rootMargin:"0px 0px -5% 0px"});
document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

var enlaces = {};
document.querySelectorAll("nav.top a[data-sec]").forEach(function(a){
  enlaces[a.getAttribute("href").slice(1)] = a;
});
var ioNav = new IntersectionObserver(function(es){
  es.forEach(function(e){
    var a = enlaces[e.target.id];
    if(!a || !e.isIntersecting) return;
    Object.keys(enlaces).forEach(function(k){ enlaces[k].removeAttribute("aria-current"); });
    a.setAttribute("aria-current","true");
  });
},{rootMargin:"-45% 0px -50% 0px"});
Object.keys(enlaces).forEach(function(id){
  var s = document.getElementById(id);
  if(s) ioNav.observe(s);
});

var bar=$("#bar"), cta=$("#cta-fijo"), tic=false;
function pintarScroll(){
  if(!bar || !cta) return;   // puede llamarse antes de que existan
  bar.classList.toggle("solid", scrollY>40);
  cta.classList.toggle("on", scrollY > innerHeight*.85 && !panel.classList.contains("on"));
}
addEventListener("scroll",function(){
  if(tic) return; tic=true;
  requestAnimationFrame(function(){ pintarScroll(); tic=false; });
},{passive:true});
pintarScroll();

/* El CTA fijo NO manda fuera. Tu catálogo es mejor que el escaparate de
   Gumroad: está en tu marca y desde él se compra sin salir. Solo enlaza a
   Gumroad cuando hay algo concreto que comprar (el bundle). */
var ctaBtn = $("#cta-fijo .btn");
if(PRODUCTOS.bundle){
  ctaBtn.outerHTML = botonCompra("bundle","Los 4 proyectos · "+BUNDLE.precio,"btn");
}else{
  ctaBtn.outerHTML = '<a class="btn" href="#catalogo">Ver el catálogo</a>';
}

/* Pie: lo mismo. Y el regalo solo se anuncia si existe de verdad. */
var pieBundle = $("#pie-bundle"), pieGratis = $("#pie-gratis");
if(pieBundle){
  pieBundle.outerHTML = PRODUCTOS.bundle
    ? botonCompra("bundle","Los cuatro proyectos","")
    : '<a href="#catalogo">Los cuatro proyectos</a>';
}
if(pieGratis){
  if(PRODUCTOS.gratis) pieGratis.outerHTML = botonCompra("gratis","Sample pack gratis","");
  else pieGratis.remove();
}

/* AL FINAL DEL TODO: si se llega con #blessings, abrir esa ficha.
   Antes esto se ejecutaba a media carga, `abrir()` reventaba porque aún no
   existían las variables de la barra, y el error cancelaba el resto del
   script — con lo que la X se quedaba sin listener y no se podía cerrar. */
abrirDesdeHash();

})();
