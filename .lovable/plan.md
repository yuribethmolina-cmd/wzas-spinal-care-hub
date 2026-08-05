# Integrar Infomaterial dentro de /faq

Mover la sección de descargas de pacientes desde la ruta independiente `/infomaterial` al final de la página `/faq`, ya que ambas son información para pacientes.

## Qué se construye

- Sección "Downloads / Infomaterial" al final de `src/routes/faq.tsx`, justo antes del `BookingCTA`.
- Reutilizar el array de documentos, icono PDF, tarjetas y estados "In Vorbereitung / Coming soon" de `src/routes/infomaterial.tsx`.
- Textos DE/EN para el nuevo bloque (eyebrow, título, descripción, botones).

## Qué se elimina

- Archivo `src/routes/infomaterial.tsx`.
- Enlace "Infomaterial / Resources" del menú de escritorio, móvil y pie en `SiteNav.tsx`, `PageHeader.tsx` y `PageFooter.tsx`.
- Cast de tipos del router que incluía `/infomaterial`.

## Detalles técnicos

- Extraer el array `DOCS`, el tipo `Doc` y el componente `PdfIcon` a un módulo compartido (por ejemplo `src/lib/infomaterial.ts`) para poder importarlos tanto en FAQ como, en el futuro, en cualquier otra página.
- En `faq.tsx` importar `DOCS` y `PdfIcon` y renderizar la lista con el mismo estilo visual y animación `useFadeUp` del resto de la página.
- El botón de descarga sigue siendo `<a href download target="_blank" rel="noopener noreferrer">`.
- Si un PDF aún no está disponible (`file: null`), mostrar la etiqueta "In Vorbereitung / Coming soon" sin enlace activo.

## Opcional

- Si `/infomaterial` ya fue publicado o indexado, añadir una redirección permanente `/infomaterial` -> `/faq` para no romper enlaces. Si no, basta con eliminar la ruta.
