# Imágenes responsive para el hero del homepage

## Objetivo
Reducir el peso descargado en móvil manteniendo la nitidez y el encuadre actual del hero.

## Cambios
1. Generar variantes AVIF optimizadas de la foto actual para móvil, tablet y escritorio, sin cambiar la imagen ni su composición.
2. Mantener las variantes WebP existentes como fallback para navegadores sin soporte AVIF.
3. Sustituir la imagen simple por un `<picture>` responsive con `srcset`, `sizes`, dimensiones reservadas y prioridad alta de carga.
4. Actualizar la precarga del homepage para que el navegador solicite desde el inicio el tamaño y formato correctos.
5. Verificar visualmente en móvil y escritorio que el encuadre, texto y calidad se conserven, y confirmar que el recurso elegido corresponde al viewport.

## Detalles técnicos
- Se reutiliza la foto actual; no se altera el diseño del hero.
- AVIF será el formato preferido y WebP seguirá como respaldo.
- La selección se basará en el ancho real del viewport y la densidad de pantalla.
