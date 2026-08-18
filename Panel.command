#!/bin/bash
# Doble clic aquí para abrir el panel de la web.
cd "$(dirname "$0")"
clear
echo "  Abriendo el panel de Ian Era Studio…"
echo "  Cierra esta ventana o pulsa Ctrl+C para pararlo."
echo
node cms/servidor.js
