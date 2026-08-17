/* ============================================================
   Comportamiento. Los contenidos están en datos.js — este archivo
   normalmente no hace falta tocarlo.
   ============================================================ */
(function(){
"use strict";

function $(s){ return document.querySelector(s); }
function url(id){ return PRODUCTOS[id] || TIENDA; }
function yt(id){ return "https://www.youtube.com/watch?v=" + id; }
/* Miniatura de la tarjeta: primero tu captura, y si no la hay, la del vídeo
   de YouTube.
   AVISO: hoy esas miniaturas son la PORTADA DEL DISCO ORIGINAL con el logo de
   Ableton encima — arte de otros artistas y fuera de paleta. En cuanto pongas
   `captura` en un proyecto, la suya se sustituye sola. */
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
};
var NOMBRES = {youtube:"YouTube",instagram:"Instagram",soundcloud:"SoundCloud",spotify:"Spotify"};

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
  var img = p.captura || (p.video ? miniatura(p.video) : null);
  var mini = img
    ? '<div class="mini"><img src="'+img+'" alt="" loading="lazy"'+
      (p.captura ? '' : ' onerror="this.onerror=null;this.src=\''+miniaturaFallback(p.video)+'\'"')+'>'+
      '<span class="lupa" aria-hidden="true">'+
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'+
      '</span></div>'
    : '<div class="mini vacia" aria-hidden="true"><b>'+n+'</b></div>';
  return '<button class="tarjeta" type="button" data-i="'+i+'">'+ mini +
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
    '<span><span class="tit">'+p.t+'</span><span class="meta">'+p.a+'</span></span>'+
    '<span class="der">'+
      '<span class="pr">'+PRECIO+'</span>'+
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
    '<span><span class="tit">MIDI + preset del lead</span>'+
      '<span class="meta">Una pieza suelta del proyecto completo</span></span>'+
    '<span class="der"><span class="pr">0 €</span>'+
      botonCompra("gratis","Descargar ↗","acc et")+'</span></div>');
}
$("#catalogo-lista").innerHTML = filas.join("");

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
   Panel de proyecto
   --------------------------------------------------------------- */
var velo=$("#velo"), panel=$("#panel"), pin=$("#pin"), cerrarBtn=$("#cerrar"), previo=null;

function specs(p){
  var d=[];
  if(p.bpm)    d.push('<div><b>'+p.bpm+'</b><span class="et">BPM</span></div>');
  if(p.tono)   d.push('<div><b>'+p.tono+'</b><span class="et">Tonalidad</span></div>');
  if(p.pistas) d.push('<div><b>'+p.pistas+'</b><span class="et">Pistas</span></div>');
  if(!d.length) return '<p class="formato et">Archivo .als · Proyecto de Ableton Live</p>';
  d.push('<div><b>.als</b><span class="et">Proyecto de Live</span></div>');
  return '<div class="specs">'+d.join("")+'</div>';
}

/* deja fuera del foco todo lo que hay detrás del panel */
var fondo = Array.prototype.filter.call(document.body.children,function(el){
  return el.id!=="panel" && el.id!=="velo" && el.tagName!=="SCRIPT" && el.tagName!=="SVG";
});
function fondoInerte(v){ fondo.forEach(function(el){ el.inert = v; }); }

function abrir(i){
  var p = PROYECTOS[i];
  pin.innerHTML =
    (p.captura ? '<div class="pmini"><img src="'+p.captura+'" alt="Arrangement de '+p.t+'"></div>' : '')+
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

  panel.hidden = false;
  requestAnimationFrame(function(){ velo.classList.add("on"); panel.classList.add("on"); });
  document.documentElement.style.overflow = "hidden";
  fondoInerte(true);
  pintarScroll();
  cerrarBtn.focus();
}
function cerrar(){
  /* Corta el vídeo AL INSTANTE. Si solo se oculta el panel, el iframe sigue
     vivo en el DOM y se sigue oyendo con la web ya cerrada. */
  var marco = pin.querySelector("iframe");
  if(marco) marco.remove();

  velo.classList.remove("on"); panel.classList.remove("on");
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
  var caja = b.parentElement;
  caja.classList.add("cargado");
  /* modestbranding quita el logotipo grande; rel=0 limita los sugeridos al
     propio canal. La calidad no se puede pedir: la elige YouTube. */
  caja.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/'+id+
    '?autoplay=1&rel=0&modestbranding=1" title="Vídeo del proyecto" '+
    'allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" '+
    'allowfullscreen></iframe>';
});

cerrarBtn.addEventListener("click",cerrar);
velo.addEventListener("click",cerrar);
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
  if(PRODUCTOS.gratis) pieGratis.outerHTML = botonCompra("gratis","MIDI + preset gratis","");
  else pieGratis.remove();
}

})();
