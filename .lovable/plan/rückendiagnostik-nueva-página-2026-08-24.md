# Rückendiagnostik — nueva página

Añadir el contenido de wzas.de/rueckendiagnostik como una página propia `/rueckendiagnostik`, bilingüe (DE/EN), con el mismo lenguaje visual que `/behandlungen` y `/beschwerden` (hero full-bleed, fade-up al hacer scroll, paleta navy/gold, CTA final).

## Por qué página propia y no una sección

El contenido tiene cinco bloques largos y una búsqueda propia ("MRT München", "Rückendiagnostik"). Encaja como paso previo entre "Beschwerden" (qué tengo) y "Behandlungen" (qué me hacen), y encajarlo dentro de otra página rompería el ritmo de lectura.

## Estructura de la página

1. **Hero** — foto de la galería WZAS, H1 "Rückendiagnostik", subtítulo "Ursachen erkennen. Gezielt behandeln.", CTA "Termin buchen" + ancla "Ablauf ansehen ↓".
2. **Intro editorial** (split 2/3 + 1/3, igual que behandlungen) — texto de diagnóstico bajo un mismo techo, y como pull quote en gold: *"Ein Befund allein erklärt noch nicht Ihre Beschwerden."*
3. **Ruta de atención** — banda visual horizontal con 4 pasos conectados por línea gold: Wirbelsäulenspezialist → Radiologie → gemeinsame Diagnose → gezielte Therapie. En móvil se apila con la línea vertical. Debajo, los 6 "Ihre Vorteile" como lista con check gold en 2 columnas (el punto duplicado de la web original se corrige).
4. **"Ein Befund allein…"** — bloque de texto sobre imagen/foto con el matiz clínico (hallazgos incidentales vs. causa real) y la mención a terapias CT/röntgengestützte el mismo día (PRT, infiltraciones facetarias e ISG, termodenervación) como chips gold.
5. **Ablauf en 5 pasos** — timeline numerada; cada paso es una tarjeta con número en Cormorant, título y su lista de puntos. Desktop: dos columnas con línea vertical gold; móvil: apilada, sin acordeones (contenido corto y escaneable).
6. **MRT trotz Platzangst** — bloque destacado en fondo cálido, tono empático, con enlace "Sprechen Sie uns an" hacia el flujo de consulta existente (no reserva directa).
7. **BookingCTA** — componente existente, con copy propio de diagnóstico y enlace secundario a `/behandlungen`.

## Navegación e integración

- Añadir "Rückendiagnostik" / "Diagnostics" al nav en `PageHeader` (y por tanto al panel móvil) entre "Rückenerkrankungen" y "Behandlungen".
- Enlace desde `/beschwerden` (hub) y desde `/behandlungen` hacia la nueva página como paso previo.
- Enlace en el footer si allí existe una lista de páginas.

## Detalles técnicos

- Nuevo archivo `src/routes/rueckendiagnostik.tsx` con `createFileRoute("/rueckendiagnostik")`.
- Reutiliza `PageHeader`, `PageFooter`, `BookingCTA`, `useT` y el patrón `useFadeUp` (se copia como en behandlungen.tsx; sin nuevas dependencias).
- Contenido DE/EN definido en un objeto pasado a `useT`; el DE es literal de wzas.de, el EN es traducción fiel (sin inventar afirmaciones médicas).
- Fotos: las mismas URLs de wzas.de ya usadas en otras páginas del proyecto.
- `head()` propio con title, description, og:title, og:description y canonical de la ruta; se mantiene el `noindex` global mientras siga siendo prototipo.
- Sin cambios de backend ni de datos.
