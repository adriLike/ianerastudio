/* ============================================================
   Comportamiento. Los contenidos están en datos.js — este archivo
   normalmente no hace falta tocarlo.
   ============================================================ */
(function(){
"use strict";

/* ?wanted=true abre directamente el formulario de pago en vez de la ficha
   del producto. Un clic menos. Documentado por Gumroad (artículo 144).
   Sin slug todavía → al catálogo entero, donde ese parámetro no aplica. */
function url(id){
  var u = PRODUCTOS[id];
  if(!u) return TIENDA;
  return u + (u.indexOf("?") > -1 ? "&" : "?") + "wanted=true";
}
function $(s){ return document.querySelector(s); }

/* ---------------------------------------------------------------
   Gumroad: un ancla oculta por producto. El overlay se engancha a
   a.gumroad-button. Si gumroad.js no carga, el clic navega al
   producto y punto — sin detección ni condicionales.
   --------------------------------------------------------------- */
var slots = $("#gr-slots");
slots.innerHTML = Object.keys(PRODUCTOS).map(function(id){
  return '<a class="gumroad-button" data-slot="'+id+'" href="'+url(id)+
         '" target="_blank" rel="noopener">'+id+'</a>';
}).join("");

function comprar(id){
  var a = slots.querySelector('[data-slot="'+id+'"]');
  if(a) a.click(); else window.open(TIENDA,"_blank","noopener");
}
document.addEventListener("click",function(e){
  var b = e.target.closest("[data-gum]");
  if(!b) return;
  e.preventDefault();
  comprar(b.getAttribute("data-gum"));
});

/* Mientras el bundle no exista, el CTA fijo no lo promete. */
$("#cta-fijo .btn").innerHTML = PRODUCTOS.bundle
  ? "Los 4 proyectos · " + BUNDLE.precio
  : "Ver la tienda ↗";

/* ---------------------------------------------------------------
   Raíl de redes. Solo se pinta el icono que tiene URL de verdad.
   --------------------------------------------------------------- */
var ICONOS = {
  youtube:'<path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.5 31 31 0 0 0-.5-4.5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/>',
  gumroad:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.6 14.6c-2.6 0-4.3-2-4.3-4.7 0-3 2-5 4.9-5 2.3 0 3.8 1.3 4.1 3.2h-2.2c-.2-.9-.9-1.4-1.9-1.4-1.6 0-2.6 1.3-2.6 3.1 0 1.9 1 3 2.4 3 1.2 0 2-.7 2.3-1.8h-2.1v-1.7h4.4v5.1h-1.7l-.2-1.2c-.6.9-1.6 1.4-3.1 1.4Z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.4" cy="6.6" r="1.1"/>',
  soundcloud:'<path d="M2 14v4h1v-4H2Zm2-2v6h1v-6H4Zm2-2v8h1v-8H6Zm2 1v7h1v-7H8Zm2-3v10h1V8h-1Zm2.5-2A5.5 5.5 0 0 1 18 11h1a4 4 0 0 1 0 8h-6.5V6Z"/>',
  spotify:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.8.8 0 0 1-1.1.3c-3-1.8-6.8-2.2-11.2-1.2a.8.8 0 1 1-.3-1.5c4.8-1.1 9-.6 12.3 1.4a.8.8 0 0 1 .3 1Zm1.2-2.9a1 1 0 0 1-1.3.3c-3.4-2.1-8.6-2.7-12.6-1.5a1 1 0 0 1-.6-1.9c4.6-1.4 10.3-.7 14.2 1.7a1 1 0 0 1 .3 1.4Zm.1-3C14 8.2 7.9 8 4.6 9a1.2 1.2 0 1 1-.7-2.3C7.7 5.5 14.4 5.8 18.7 8.3a1.2 1.2 0 0 1-.9 2.2Z"/>'
};
var NOMBRES = {youtube:"YouTube",gumroad:"Gumroad",instagram:"Instagram",
               soundcloud:"SoundCloud",spotify:"Spotify"};

$("#rail").innerHTML = Object.keys(ICONOS).filter(function(k){ return REDES[k]; })
  .map(function(k){
    return '<a href="'+REDES[k]+'" target="_blank" rel="noopener" aria-label="'+NOMBRES[k]+'">'+
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
      ICONOS[k]+'</svg></a>';
  }).join("");

/* ---------------------------------------------------------------
   Carril de sesiones
   --------------------------------------------------------------- */
var carril = $("#carril");
carril.innerHTML = SESIONES.map(function(s,i){
  var n = String(i+1).padStart(2,"0");
  var mini = s.captura
    ? '<div class="mini"><img src="'+s.captura+'" alt="Arrangement de la sesión de '+s.t+'" loading="lazy"></div>'
    : '<div class="mini vacia" aria-hidden="true"><b>'+n+'</b></div>';
  return '<button class="tarjeta" type="button" data-i="'+i+'">'+ mini +
    '<div class="cuerpo">'+
      '<div class="top et"><span>'+n+'</span><span class="yr">'+s.y+'</span></div>'+
      '<h3>'+s.t+'</h3>'+
      '<p class="art">'+s.a+'</p>'+
      (s.ensena ? '<p class="ens">'+s.ensena+'</p>' : '')+
      '<div class="pie et"><span>'+PRECIO+'</span><span class="ab">Abrir ↗</span></div>'+
    '</div></button>';
}).join("");
$("#ses-n").textContent = String(SESIONES.length).padStart(2,"0");

/* Flechas. Avanzan una tarjeta y se apagan en los extremos. */
var antes = $("#car-antes"), luego = $("#car-luego");
function paso(){
  var t = carril.querySelector(".tarjeta");
  if(!t) return 300;
  return t.getBoundingClientRect().width + 16;
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
   Vídeos
   --------------------------------------------------------------- */
$("#videos-lista").innerHTML = VIDEOS.map(function(v){
  var pub = !!v.url;
  return '<div class="fila'+(pub?"":" prox")+'">'+
    '<span class="fch et">'+v.f+'</span>'+
    '<span class="tit">'+v.t+'</span>'+
    '<a class="acc et" href="'+(v.url||CANAL)+'" target="_blank" rel="noopener">'+
      (pub?"Ver ↗":"Avisarme ↗")+'</a></div>';
}).join("");

/* ---------------------------------------------------------------
   Catálogo: todas las sesiones con su precio y compra directa.
   El bundle y el regalo solo aparecen cuando existen de verdad:
   una fila que no se puede comprar es una promesa rota.
   --------------------------------------------------------------- */
var filas = SESIONES.map(function(s,i){
  return '<div class="fila">'+
    '<span class="fch et">'+String(i+1).padStart(2,"0")+' · '+s.y+'</span>'+
    '<span><span class="tit">'+s.t+'</span><span class="meta">'+s.a+'</span></span>'+
    '<span style="display:flex;align-items:center;gap:18px">'+
      '<span class="pr">'+PRECIO+'</span>'+
      '<button class="acc et" type="button" data-gum="'+s.id+'">Comprar ↗</button>'+
    '</span></div>';
});

if(PRODUCTOS.bundle){
  filas.push('<div class="fila destacada">'+
    '<span class="fch et">Pack</span>'+
    '<span><span class="tit">Los 4 proyectos</span>'+
      '<span class="meta">Las cuatro sesiones completas</span></span>'+
    '<span style="display:flex;align-items:center;gap:18px">'+
      '<span class="pr">'+BUNDLE.precio+'</span>'+
      '<button class="acc et" type="button" data-gum="bundle">Comprar ↗</button>'+
    '</span></div>');
}
if(PRODUCTOS.gratis){
  filas.push('<div class="fila destacada">'+
    '<span class="fch et">Gratis</span>'+
    '<span><span class="tit">MIDI + preset del lead</span>'+
      '<span class="meta">Una pieza suelta de la sesión completa</span></span>'+
    '<span style="display:flex;align-items:center;gap:18px">'+
      '<span class="pr">0 €</span>'+
      '<button class="acc et" type="button" data-gum="gratis">Descargar ↗</button>'+
    '</span></div>');
}
$("#catalogo-lista").innerHTML = filas.join("");

/* ---------------------------------------------------------------
   Panel de sesión
   --------------------------------------------------------------- */
var velo=$("#velo"), panel=$("#panel"), pin=$("#pin"), cerrarBtn=$("#cerrar"), previo=null;

function specs(s){
  var d=[];
  if(s.bpm)    d.push('<div><b>'+s.bpm+'</b><span class="et">BPM</span></div>');
  if(s.tono)   d.push('<div><b>'+s.tono+'</b><span class="et">Tonalidad</span></div>');
  if(s.pistas) d.push('<div><b>'+s.pistas+'</b><span class="et">Pistas</span></div>');
  /* sin datos reales, una rejilla de una sola celda queda hueca */
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
  var s = SESIONES[i];
  pin.innerHTML =
    (s.captura ? '<div class="pmini"><img src="'+s.captura+'" alt="Arrangement de la sesión de '+s.t+'"></div>' : '')+
    '<div class="pcab et"><span>Sesión '+String(i+1).padStart(2,"0")+'</span>'+
      '<span class="yr">'+s.y+'</span></div>'+
    '<h3 id="p-tit">'+s.t+'</h3><p class="part">'+s.a+'</p>'+
    specs(s)+
    '<ul class="dentro">'+
      '<li><i>01</i><div><b>El arreglo completo.</b> De la intro al último compás, con las pistas nombradas y agrupadas tal y como las tengo yo.</div></li>'+
      '<li><i>02</i><div><b>Las cadenas sin congelar.</b> Cada dispositivo editable y en su orden. Desactiva uno y oye qué aportaba.</div></li>'+
      '<li><i>03</i><div><b>La automatización, intacta.</b> Se ve qué se mueve y cuándo — la mitad de por qué el tema respira.</div></li>'+
      '<li><i>04</i><div><b>El MIDI de cada parte.</b> Cambia las notas y ya es tuyo.</div></li>'+
    '</ul>'+
    '<div class="compra"><span class="pr">'+PRECIO+'</span>'+
      '<button class="btn" type="button" data-gum="'+s.id+'">Conseguir la sesión</button>'+
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
  velo.classList.remove("on"); panel.classList.remove("on");
  document.documentElement.style.overflow = "";
  fondoInerte(false);
  pintarScroll();
  setTimeout(function(){ if(!panel.classList.contains("on")) panel.hidden = true; },420);
  if(previo) previo.focus();
}
carril.addEventListener("click",function(e){
  var b=e.target.closest("[data-i]"); if(!b) return;
  previo=b; abrir(+b.dataset.i);
});
cerrarBtn.addEventListener("click",cerrar);
velo.addEventListener("click",cerrar);
addEventListener("keydown",function(e){
  if(e.key==="Escape" && panel.classList.contains("on")) cerrar();
});

/* ---------------------------------------------------------------
   Revelado, barra y CTA fijo
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

/* Navegación activa: marca en qué sección estás. Se dispara cuando la
   sección cruza la franja central de la pantalla, no al entrar por abajo. */
var enlaces = {};
document.querySelectorAll("nav.top a[data-sec]").forEach(function(a){
  enlaces[a.getAttribute("href").slice(1)] = a;
});
var ioNav = new IntersectionObserver(function(es){
  es.forEach(function(e){
    var a = enlaces[e.target.id];
    if(!a) return;
    if(e.isIntersecting){
      Object.keys(enlaces).forEach(function(k){ enlaces[k].removeAttribute("aria-current"); });
      a.setAttribute("aria-current","true");
    }
  });
},{rootMargin:"-45% 0px -50% 0px"});
Object.keys(enlaces).forEach(function(id){
  var s = document.getElementById(id);
  if(s) ioNav.observe(s);
});

var bar=$("#bar"), cta=$("#cta-fijo"), tic=false;
function pintarScroll(){
  bar.classList.toggle("solid", scrollY>40);
  /* El CTA entra pasado el héroe y se aparta con el panel abierto:
     ahí ya hay un botón de compra y dos competirían. */
  cta.classList.toggle("on", scrollY > innerHeight*.85 && !panel.classList.contains("on"));
}
addEventListener("scroll",function(){
  if(tic) return; tic=true;
  requestAnimationFrame(function(){ pintarScroll(); tic=false; });
},{passive:true});
pintarScroll();

})();
