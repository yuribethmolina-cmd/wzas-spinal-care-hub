# Hero video: hacerlo visible en desktop y móvil

## Qué pasa hoy

El video (1280x720, 7s, en loop) está de fondo del hero, pero:

- Encima lleva tres capas oscuras acumuladas: un velo `#161C29` al 72%, un degradado lateral que llega al 88% de opacidad y otro vertical. Entre las tres, el video queda casi negro.
- Está encuadrado con `object-center`: en pantallas anchas el contenido del video se recorta y lo poco que se ve queda desplazado hacia la derecha, detrás del panel de la columna.
- En móvil el hero es mucho más alto que ancho, así que `object-cover` amplía el video enormemente y solo se ve una franja central plana; con el velo encima parece que no hay video.

## Cambios propuestos

1. **Aligerar el velo**: bajar el velo plano a ~35-40% y suavizar el degradado lateral (opaco solo en el borde izquierdo, detrás del texto, y casi transparente en el resto). Se mantiene el degradado inferior para que la barra de estadísticas siga legible. Objetivo: el video se ve claramente pero los titulares conservan contraste suficiente (AA).
2. **Reencuadre por breakpoint**: `object-position` a la izquierda/centro-izquierda en desktop para que la acción del video quede detrás del texto y no oculta bajo el panel; centrado y ligeramente ampliado en móvil.
3. **Móvil visible**: dar al hero una altura mínima razonable en móvil (aprox. 78svh) para que el video tenga superficie real, y reducir el velo en móvil para que se note el movimiento.
4. **Fallbacks**: mantener el póster (imagen actual) mientras carga, y desactivar la reproducción cuando el usuario tiene `prefers-reduced-motion`, mostrando el póster fijo.

## Detalles técnicos

- Todo en `src/routes/index.tsx`, componente `Hero` (líneas ~560-582): clases del `<video>` y de los tres `div` de overlay.
- Sin cambios en datos, rutas ni constantes; `HERO_VIDEO` sigue en `src/routes/-home-constants.ts`.
- Verificación con capturas Playwright a 393px y 1280px de ancho antes de cerrar.
