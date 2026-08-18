# Mantener la web sin ayuda

Tres formas de tocar la web, de menos a más trabajo. **Casi todo se hace con
la primera.**

---

## 1 · Desde GitHub, en el navegador · sin instalar nada

Para cambiar **textos, enlaces, precios, vídeos, reseñas o preguntas**.

1. Abre <https://github.com/adriLike/ianerastudio/blob/main/js/datos.js>
2. Pulsa el **lápiz** (arriba a la derecha)
3. Cambia lo que quieras
4. Abajo, **Commit changes**

**Y ya está publicado.** GitHub compila y despliega solo en un par de minutos.

`datos.js` es el único archivo que necesitas. Todo lo que se lee en la web sale
de ahí: los enlaces de Gumroad, los proyectos, los vídeos, las preguntas, las
reseñas y el contacto.

### Si prefieres un editor de verdad

En el repositorio pulsa la tecla **`.`** (el punto). Se abre Visual Studio Code
dentro del navegador, con todos los archivos. Editas, y en el panel de la
izquierda haces *Commit*.

### Para cambiar una imagen sin tocar el ordenador

En GitHub, entra en la carpeta `img/` → **Add file → Upload files**. Si el
archivo se llama igual que el que había, lo sustituye.

⚠️ Sube la imagen **ya del tamaño bueno** (ver punto 2). Si subes un archivo de
8 MB del móvil, la web se vuelve lentísima.

---

## 2 · Desde tu Mac · para imágenes

Preparar una imagen a mano tiene truco (tamaño, compresión, y la versión
pequeña del `srcset`). Está automatizado:

```bash
cd /Users/adriancastrorodera/Documents/studio/gumroad/ianera/web

# una captura de sesión (genera también la versión de 960 px)
./herramientas/imagen.sh ~/Desktop/captura.png captura ses-blessings

# una foto para una banda a sangre
./herramientas/imagen.sh ~/Desktop/estudio.jpg foto mesa

# la imagen grande de portada
./herramientas/imagen.sh ~/Desktop/retrato.jpg hero hero
```

Y para publicar todo de una vez:

```bash
./herramientas/publicar.sh "cambio la captura de Blessings"
```

Sube los cambios y **espera a confirmarte que está en línea**.

### Al cambiar CSS o JS, sube el `?v=`

En `index.html` hay tres líneas con `?v=32` al final. **Súbelo a 33** cuando
toques el diseño o el comportamiento. Si no, quien ya haya entrado seguirá
viendo la versión vieja.

Los textos de `datos.js` también van por ahí, así que **si cambias contenido,
sube el número igual**.

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
