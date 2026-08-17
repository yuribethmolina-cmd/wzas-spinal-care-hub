# Plan: indicación de deslizar en el widget “Wo tut es weh?” (móvil)

## Objetivo
En la versión móvil del hero, el widget “Wo tut es weh?” / “Where does it hurt?” se presenta como una fila horizontal de pills. Algunos usuarios no notan que hay más opciones fuera de pantalla. Se añadirá una señalización explícita y discreta para indicar que se puede deslizar, sin alterar la experiencia en tablet/desktop.

## Alcance
- Solo el componente móvil `SpineLocatorMobile` en `src/routes/index.tsx`.
- Desktop/tablet (`SpineLocator` y la vista `md:` de `SpineLocatorMobile`) quedan intactos.
- Se usan los tokens existentes: fondo `#1E2535`, acento `#E0C288`, tipografías actuales.

## Cambios concretos

### 1. Indicador textual junto al encabezado
- Añadir al lado del hint actual (`Bereich antippen` / `Tap an area`) una micro-llamada:
  - DE: `Wischen →`
  - EN: `Swipe →`
- Texto en `text-[11px] font-medium text-white/55` para no competir visualmente con el título.

### 2. Flecha/fade animada al borde derecho
- Reemplazar el gradiente estático por un indicador más explícito: una flecha hacia la derecha (chevron) sobre el degradado existente.
- La flecha pulsa suavemente (translate-x de 0 a 4 px y vuelta) en bucle, solo cuando no se ha hecho scroll.
- Color `#E0C288` a baja opacidad (`/60`) para mantener el look premium.

### 3. Puntos de paginación opcionales
- Añadir 4 puntos debajo de la fila de pills, uno por región.
- El punto activo se resalta en `#E0C288`; los inactivos en `white/25`.
- Ayuda a entender cuántas opciones hay y cuál está seleccionada.

### 4. Comportamiento
- El scroll horizontal de la fila sigue funcionando igual.
- Al tocar un pill, se expande el panel de diagnósticos como ahora.
- La animación de la flecha se pausa/reduce si el usuario hace scroll manual (detección ligera con `onScroll`).

## Archivos a editar
- `src/routes/index.tsx` — modificar `SpineLocatorMobile` (bloque de pills móvil).

## No incluye
- Cambios en el widget desktop/tablet.
- Cambios de contenido o rediseño estructural del hero.
- Cambios en la foto de fondo, CTAs o barra de estadísticas.

## Verificación
- Revisar en preview a 390 px que la fila de pills tenga el indicador "Wischen → / Swipe →" visible, la flecha pulsante y/o los puntos, y que no se rompa el layout ni vuelva a aparecer scroll horizontal de toda la página.
