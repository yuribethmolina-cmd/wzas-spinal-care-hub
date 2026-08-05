# Nueva sección "Infomaterial" (recursos descargables)

Página pública bilingüe (DE/EN) donde los pacientes pueden ver y descargar PDFs informativos, siguiendo el diseño y las animaciones del resto del sitio (igual que `/faq`).

## Qué se construye

- Nueva ruta `/infomaterial` con `PageHeader`, `PageFooter` y `BookingCTA`, mismo estilo visual y efecto fade-up.
- Lista de documentos en tarjetas: título, descripción breve, tamaño/formato y botón "PDF herunterladen / Download PDF" que abre en pestaña nueva.
- Enlace "Infomaterial" añadido a la navegación de escritorio y al menú móvil (versión DE y EN).
- Textos DE/EN completos, con `head()` propio (título, descripción, og:title, og:description).

## Documentos iniciales propuestos

Se crean las entradas con estos títulos; los PDFs reales los subes tú después:

1. Ablauf der Behandlung — qué esperar del primer contacto hasta el seguimiento.
2. Checkliste Ersttermin — qué traer a la primera cita.
3. Konservative Therapie im Überblick — opciones sin cirugía.
4. Minimalinvasive Eingriffe — información y preparación.

Si un PDF aún no está disponible, la tarjeta se muestra con la etiqueta "In Vorbereitung" y sin botón activo, así la página nunca enlaza a un archivo inexistente.

## Cómo se cargan los PDFs

Sin backend: los archivos viven en `public/infomaterial/*.pdf` y se sirven por URL directa. Para añadir o reemplazar un documento, me pasas el PDF en el chat y yo lo coloco y actualizo la lista. Si más adelante quieres subirlos tú desde la web, hará falta activar Lovable Cloud (almacenamiento + login de administrador).

## Detalles técnicos

- `src/routes/infomaterial.tsx`: `createFileRoute("/infomaterial")`, array de documentos tipado `{ file, size, de: {title, desc}, en: {title, desc} }`, `useT()` para el idioma.
- `src/components/SiteNav.tsx`: añadir `["Infomaterial", "/infomaterial"]` (DE) y `["Resources", "/infomaterial"]` (EN) al array `links`, y ampliar el tipo de `to` en el `<Link>`.
- Descarga con `<a href download target="_blank" rel="noopener">`.
