#!/bin/bash
# Publica los cambios. Un solo comando: guarda, sube y espera a que esté en línea.
#
#   ./herramientas/publicar.sh "cambio la foto del estudio"

set -e
cd "$(dirname "$0")/.."
MENSAJE="${1:-Actualiza la web}"

if [ -z "$(git status --porcelain)" ]; then echo "No hay nada que publicar."; exit 0; fi

echo "== Se van a publicar =="; git status --short; echo

git add -A && git commit -q -m "$MENSAJE" && git push -q origin main
echo "Subido. Esperando a que GitHub lo publique (suele tardar 1-2 min)…"

for i in $(seq 1 20); do
  sleep 15
  if [ "$(gh api repos/adriLike/ianerastudio/pages/builds --jq '.[0].status' 2>/dev/null)" = "built" ]; then
    echo "✓ En línea: https://ianerastudio.com"; exit 0
  fi
  printf "."
done
echo; echo "Sigue compilando. Míralo en unos minutos en https://ianerastudio.com"
