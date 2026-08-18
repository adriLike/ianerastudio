#!/bin/bash
# Prepara una imagen para la web: la ajusta de tamaño, la comprime y, si es una
# captura de sesión, genera además la versión pequeña que usa el srcset.
#
#   ./herramientas/imagen.sh ~/Desktop/captura.png captura ses-blessings
#   ./herramientas/imagen.sh ~/Desktop/foto.jpg    foto   estudio
#
# Tipos:  captura → 1920 px + versión de 960 (para la sección «Por dentro»)
#         foto    → 1920 px             (para las bandas a sangre)
#         hero    → 1600 px             (la imagen grande de portada)

set -e
ORIGEN="$1"; TIPO="$2"; NOMBRE="$3"
WEB="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$ORIGEN" ] || [ -z "$TIPO" ] || [ -z "$NOMBRE" ]; then
  echo "Uso: $0 <archivo> <captura|foto|hero> <nombre-sin-extension>"; exit 1
fi
[ -f "$ORIGEN" ] || { echo "No existe: $ORIGEN"; exit 1; }

case "$TIPO" in
  captura) ANCHO=1920; CALIDAD=82; DOBLE=si ;;
  foto)    ANCHO=1920; CALIDAD=80; DOBLE=no ;;
  hero)    ANCHO=1600; CALIDAD=82; DOBLE=no ;;
  *) echo "Tipo no válido: $TIPO"; exit 1 ;;
esac

DESTINO="$WEB/img/$NOMBRE.jpg"
sips -Z $ANCHO -s format jpeg -s formatOptions $CALIDAD "$ORIGEN" --out "$DESTINO" >/dev/null
echo "✓ img/$NOMBRE.jpg  ($(( $(stat -f%z "$DESTINO")/1024 ))K)"

if [ "$DOBLE" = "si" ]; then
  sips -Z 960 -s format jpeg -s formatOptions 80 "$DESTINO" --out "$WEB/img/$NOMBRE-960.jpg" >/dev/null
  echo "✓ img/$NOMBRE-960.jpg  ($(( $(stat -f%z "$WEB/img/$NOMBRE-960.jpg")/1024 ))K)"
fi

echo
echo "Ahora:"
echo "  1. Si es una captura de proyecto, pon en js/datos.js:"
echo "       captura:\"img/$NOMBRE.jpg\""
echo "  2. Sube el ?v= de las tres líneas del index.html"
echo "  3. ./herramientas/publicar.sh \"lo que has cambiado\""
