# Rebranding completo del proyecto remixed

## Objetivo

Sustituir toda la identidad de WZAS (Wirbelsäulenzentrum am Stiglmaierplatz München) por una marca propia genérica de clínica de columna, dejando el sitio listo para que el usuario rellene sus datos reales.

## Identidad propuesta (placeholder editable)

| Elemento | Valor por defecto | Dónde editar |
|---|---|---|
| Nombre corto | `SpineCare` | Constantes centralizadas |
| Nombre completo DE | `SpineCare · Zentrum für Wirbelsäulengesundheit` | Constantes centralizadas |
| Nombre completo EN | `SpineCare · Spine Health Centre` | Constantes centralizadas |
| Ciudad | `Ihre Stadt` (placeholder) | Constantes centralizadas |
| Teléfono | `+49 000 00000000` (placeholder) | Constantes centralizadas |
| URL reservas | `https://terminbeispiel.vercel.app` (placeholder) | Constantes centralizadas |
| Logo | Nuevo logo generado, dorado/azul marino | `src/assets/brand/logo.png` |
| Favicon | Derivado del nuevo logo | `public/favicon.png` |
| Colores | Se mantienen los actuales (#1E2535, #AC8F52, #F8F8F6) | `src/styles.css` |

## Cambios propuestos

### 1. Centralizar datos de marca

Crear `src/lib/brand.ts` con todas las constantes de marca (nombre, dirección, teléfono, booking URL, email, año de fundación, número de especialistas, etc.). Todos los componentes y rutas importarán desde aquí en lugar de repetir literales.

### 2. Logo y favicon

- Generar un logo simple, cuadrado, sobre fondo transparente: marca tipográfica minimalista "SpineCare" con un icono de columna vertebral estilizada en dorado y azul marino.
- Convertirlo a `public/favicon.png` (64x64) y a un asset PNG/WebP para la cabecera.
- Actualizar `src/routes/__root.tsx` para que apunte al nuevo favicon.
- Reemplazar `src/assets/wzas/logo.png.asset.json` por el nuevo asset.

### 3. Metadatos y títulos de página

Actualizar en todas las rutas:

- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/aerzte.index.tsx`
- `src/routes/aerzte.$slug.tsx`
- `src/routes/beschwerden.index.tsx`
- `src/routes/beschwerden.$slug.tsx`
- `src/routes/behandlungen.tsx`
- `src/routes/aktuelles.tsx`
- `src/routes/faq.tsx`
- `src/routes/karriere.tsx`
- `src/routes/wolfart.tsx`

Sustituir "WZAS", "Wirbelsäulenzentrum am Stiglmaierplatz", "München" y "Stiglmaierplatz" por los valores de `src/lib/brand.ts`.

### 4. Navegación y componentes compartidos

- `src/components/SiteNav.tsx`: alt del logo, aria-label, texto del enlace a inicio.
- `src/components/MobileNavPanel.tsx`: título del menú y CTA si aplica.
- `src/components/MobileCTABar.tsx`: teléfono y etiquetas.
- `src/components/wzas/PageHeader.tsx` y `PageFooter.tsx`: títulos, direcciones, copyright.
- `src/components/wzas/BookingCTA.tsx`: URL de reservas y textos.

### 5. Contenido de la home (`src/routes/index.tsx`)

- Kicker, títulos, alt de imágenes, texto de estadísticas, copyright del footer.
- Reemplazar referencias a "onlinerezeption.vercel.app" por la URL de marca.
- Reemplazar nombres de socios/partners por placeholders genéricos o eliminarlos si no aplican.

### 6. Páginas de condiciones y tratamientos

- `src/routes/beschwerden.index.tsx`: hero, intro, atribución del pull quote.
- `src/routes/beschwerden.$slug.tsx`: metadatos dinámicos y cualquier referencia a WZAS.
- `src/routes/behandlungen.tsx`: títulos, intro, CTA.
- `src/lib/conditions.ts`: revisar que no haya nombres propios de WZAS.

### 7. Página de doctores

- `src/lib/doctors.ts`: reemplazar los 11 perfiles actuales por 3 perfiles placeholder genéricos (Dr. Beispiel / Dr. Example) con fotos de avatar genéricas o iniciales, dejando la estructura intacta para que el usuario añada los suyos.
- `src/routes/aerzte.index.tsx` y `aerzte.$slug.tsx`: ajustar metadatos y textos.

### 8. Otras páginas

- `src/routes/faq.tsx`: dirección, teléfono, transporte público.
- `src/routes/aktuelles.tsx`: títulos de noticias placeholder.
- `src/routes/karriere.tsx`: textos de empleo y ubicación.
- `src/routes/wolfart.tsx`: como esta página habla de una colaboración específica con el Wolfart Klinikum, se propone **eliminar la ruta y el enlace de navegación** o convertirla en una página genérica de "Klinikpartner" con placeholders.

### 9. Imágenes de hero y clínica

- Mantener las fotos actuales de consulta y médicos como placeholders visuales.
- Añadir un comentario en `src/lib/brand.ts` indicando dónde reemplazarlas por fotos propias.

### 10. Verificación

- `bun run build` debe pasar sin errores.
- Revisar que no quede ninguna cadena "WZAS", "Stiglmaierplatz", "onlinerezeption.vercel.app" ni "+49 89 5434 3030" en `src/`.
- Capturas de la home, navegación móvil y página de doctores para confirmar que el nuevo logo y textos se ven correctamente.

## Notas

- Los textos en alemán e inglés se actualizarán en paralelo usando `useT`.
- Se mantienen los colores y la tipografía actuales para no romper el diseño.
- Todos los valores placeholder se agrupan en `src/lib/brand.ts` para que el usuario solo tenga que editar un archivo.
