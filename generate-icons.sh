#!/bin/bash
# Script para gerar favicon.ico e apple-touch-icon.png a partir dos SVGs
# Requer: ImageMagick (magick) ou Inkscape

echo "Gerando favicons..."

# favicon.ico (múltiplos tamanhos: 16x16, 32x32, 48x48)
if command -v magick &> /dev/null; then
    magick favicon.svg -define icon:auto-resize=16,32,48,64 favicon.ico
    echo "✓ favicon.ico gerado"
elif command -v convert &> /dev/null; then
    convert favicon.svg -define icon:auto-resize=16,32,48,64 favicon.ico
    echo "✓ favicon.ico gerado"
else
    echo "⚠ ImageMagick não encontrado. Instale para gerar favicon.ico"
fi

# apple-touch-icon.png (180x180)
if command -v magick &> /dev/null; then
    magick apple-touch-icon.svg -resize 180x180 apple-touch-icon.png
    echo "✓ apple-touch-icon.png gerado"
elif command -v convert &> /dev/null; then
    convert apple-touch-icon.svg -resize 180x180 apple-touch-icon.png
    echo "✓ apple-touch-icon.png gerado"
else
    echo "⚠ ImageMagick não encontrado. Instale para gerar apple-touch-icon.png"
fi

echo "Concluído!"
