/* Panel local. Sin dependencias: solo Node.
   - sirve la web en /            (para verla mientras editas)
   - sirve el panel en /panel
   - API: leer y guardar contenido.json, subir imágenes, publicar a GitHub */
const http = require("http");
const fs   = require("fs");
const path = require("path");
const { execFile, execFileSync } = require("child_process");
const { generar } = require("./generar");

const RAIZ = path.join(__dirname, "..");
const PUERTO = 4321;

const TIPOS = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8", ".json":"application/json; charset=utf-8",
  ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".png":"image/png", ".svg":"image/svg+xml",
  ".xml":"application/xml", ".txt":"text/plain; charset=utf-8" };

function json(res, code, obj){
  res.writeHead(code, {"Content-Type":"application/json; charset=utf-8"});
  res.end(JSON.stringify(obj));
}
function cuerpo(req){
  return new Promise(function(ok, mal){
    let d = "";
    req.on("data", c => { d += c; if(d.length > 60e6) req.destroy(); });
    req.on("end", () => { try { ok(JSON.parse(d||"{}")); } catch(e){ mal(e); } });
  });
}
function git(args){
  return execFileSync("git", args, { cwd: RAIZ, encoding: "utf8" }).trim();
}

const rutas = {
  /* ---- contenido ---- */
  "GET /api/contenido": (req,res) => {
    json(res, 200, JSON.parse(fs.readFileSync(path.join(RAIZ,"contenido.json"),"utf8")));
  },
  "POST /api/contenido": async (req,res) => {
    const datos = await cuerpo(req);
    fs.writeFileSync(path.join(RAIZ,"contenido.json"), JSON.stringify(datos,null,2));
    const v = generar();
    json(res, 200, { ok:true, version:v });
  },

  /* ---- imágenes ---- */
  "GET /api/imagenes": (req,res) => {
    const dir = path.join(RAIZ,"img");
    const l = fs.readdirSync(dir).filter(f=>/\.(jpg|jpeg|png|svg)$/i.test(f)).sort()
      .map(f => ({ nombre:f, kb: Math.round(fs.statSync(path.join(dir,f)).size/1024) }));
    json(res, 200, l);
  },
  "POST /api/imagen": async (req,res) => {
    const { nombre, tipo, datos } = await cuerpo(req);
    if(!/^[a-z0-9-]+$/.test(nombre||"")) return json(res,400,{error:"Nombre no válido. Solo minúsculas, números y guiones."});
    const tmp = path.join(RAIZ,"img","_tmp_subida");
    fs.writeFileSync(tmp, Buffer.from(datos.split(",")[1], "base64"));

    const conf = { captura:[1920,82,true], foto:[1920,80,false], hero:[1600,82,false] }[tipo] || [1920,82,false];
    const [ancho, calidad, doble] = conf;
    const destino = path.join(RAIZ,"img",nombre+".jpg");
    try{
      execFileSync("sips", ["-Z",String(ancho),"-s","format","jpeg","-s","formatOptions",String(calidad),tmp,"--out",destino],{stdio:"ignore"});
      if(doble) execFileSync("sips",["-Z","960","-s","format","jpeg","-s","formatOptions","80",destino,"--out",path.join(RAIZ,"img",nombre+"-960.jpg")],{stdio:"ignore"});
    } catch(e){ fs.unlinkSync(tmp); return json(res,500,{error:"No se pudo procesar la imagen."}); }
    fs.unlinkSync(tmp);
    json(res, 200, { ok:true, ruta:"img/"+nombre+".jpg",
      kb: Math.round(fs.statSync(destino).size/1024) });
  },

  /* ---- publicar ---- */
  "GET /api/estado": (req,res) => {
    let cambios = [];
    try { cambios = git(["status","--porcelain"]).split("\n").filter(Boolean); } catch(e){}
    json(res, 200, { cambios });
  },
  "POST /api/publicar": async (req,res) => {
    const { mensaje } = await cuerpo(req);
    try{
      if(!git(["status","--porcelain"])) return json(res,200,{ok:true, nada:true});
      git(["add","-A"]);
      git(["commit","-m", mensaje || "Actualiza la web desde el panel"]);
      git(["push","origin","main"]);
      json(res, 200, { ok:true });
    } catch(e){ json(res, 500, { error: String(e.stderr || e.message) }); }
  }
};

http.createServer(async (req,res) => {
  const url = new URL(req.url, "http://x");
  const clave = req.method + " " + url.pathname;

  if(rutas[clave]){
    try { return await rutas[clave](req,res); }
    catch(e){ return json(res,500,{error:String(e.message)}); }
  }

  let p = url.pathname === "/" ? "/index.html"
        : url.pathname === "/panel" ? "/cms/panel.html"
        : url.pathname;
  const archivo = path.join(RAIZ, p);
  if(!archivo.startsWith(RAIZ) || !fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()){
    res.writeHead(404); return res.end("no encontrado");
  }
  res.writeHead(200, {"Content-Type": TIPOS[path.extname(archivo)] || "application/octet-stream",
                      "Cache-Control":"no-store"});
  fs.createReadStream(archivo).pipe(res);
}).listen(PUERTO, () => {
  console.log("\n  Panel   → http://localhost:"+PUERTO+"/panel");
  console.log("  Web     → http://localhost:"+PUERTO+"\n");
  console.log("  Ctrl+C para parar\n");
  execFile("open", ["http://localhost:"+PUERTO+"/panel"]);
});
