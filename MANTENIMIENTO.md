# Mantener la web sin ayuda

## El panel

```bash
cd /Users/adriancastrorodera/Documents/studio/gumroad/ianera/web
./herramientas/cms.sh
```

Se abre solo en el navegador. Ahí cambias **proyectos, vídeos, enlaces de la
tienda, precios, preguntas, reseñas, redes y contacto**, subes imágenes, y con
un botón guarda y publica.

`Ctrl+C` en el terminal para cerrarlo.

### Cómo está montado

| Archivo | Qué es |
|---|---|
| `contenido.json` | **La fuente de verdad.** Todo el contenido de la web |
| `js/datos.js` | Lo que lee la web. **Generado — no editar a mano** |
| `cms/` | El panel: servidor y interfaz |

El panel escribe `contenido.json`, regenera `datos.js` y **sube solo el `?v=`**
del `index.html`, que es lo que se olvidaba siempre.

### Las imágenes

En la pestaña **Imágenes**: nombre, tipo y archivo. Se recorta, se comprime y,
si es una captura, se genera también la versión de 960 px del `srcset`.

Después hay que **poner la ruta en el proyecto** (campo *Captura*), en la
pestaña Proyectos.

### Lo que el panel NO hace

Secciones nuevas, cambios de diseño o comportamiento nuevo. Eso es diseño, no
contenido, y no hay panel que lo haga con seguridad.

---

## 3 · Cuando hace falta pedirlo

Estas no son de mantenimiento, son de diseño. Aquí sí merece la pena pedirlo:

- Una sección nueva
- Cambiar cómo se ve algo
- Comportamiento nuevo (un reproductor de audio, un filtro…)
- Algo que se ha roto

---

## Por qué no hay un panel de administración

Se puede montar, pero sería la única pieza frágil de un sitio que ahora mismo
no tiene ninguna: necesitaría autenticación, permisos de escritura sobre el
repositorio y un servicio ejecutándose en algún sitio. Un trasto más que
mantener, y que se rompe el día que tengas prisa.

El editor de GitHub hace lo mismo, no hay que instalarlo, no se cae, guarda el
historial de todos los cambios y **permite deshacer cualquier cosa**. Si un día
rompes algo, en el repositorio → *History* → el commit anterior → *Revert*.

Si algún día la web crece hasta necesitar un panel visual de verdad, lo natural
sería **Sveltia CMS** o **Decap CMS**: se integran con GitHub y darían un
`/admin` en tu propio dominio. Requieren convertir `datos.js` a JSON y montar
una aplicación OAuth. Merece la pena cuando editas a diario, no cuando editas
al publicar un vídeo cada dos semanas.
