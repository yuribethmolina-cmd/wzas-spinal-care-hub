# "Wo tut es weh?" — destinos actuales y versión móvil

## A dónde llevan hoy los links

Cada zona de la columna es un enlace (definido en `src/routes/-home-constants.ts`):

| Zona | Destino actual |
| --- | --- |
| Halswirbelsäule | `/beschwerden` (listado general, no una condición) |
| Brustwirbelsäule | `/beschwerden/facettengelenksarthrose` |
| LWS · Bandscheiben | `/beschwerden/bandscheibenvorfall` |
| Sakrum · ISG | `/beschwerden/iliosakralsyndrom` |

Dos observaciones: la zona cervical es la única que no lleva a una condición concreta, y el
resto lleva a una sola condición aunque cada zona abarca varias.

Además, el componente está oculto en móvil (`hidden lg:flex`), así que hoy no existe en la
versión móvil.

## Propuesta para móvil: "Body map" en el hero

Un bloque compacto debajo del hero, táctil en vez de hover:

```text
┌──────────────────────────────────────┐
│ WO TUT ES WEH?        Tippen Sie an  │
│                                      │
│   ┌────┐   Halswirbelsäule           │
│   │ ▓▓ │   Nacken · Arm · Kopf       │
│   │ ▓▓ │  ────────────────────────   │
│   │ ▓▓ │   Brustwirbelsäule          │
│   │ ▓▓ │   Oberer & mittlerer Rücken │
│   │ ▓▓ │  ────────────────────────   │
│   └────┘   LWS · Bandscheiben  ...   │
│                                      │
│  [ Chips de condiciones de la zona ] │
│  → Beschwerden ansehen  ·  Termin    │
└──────────────────────────────────────┘
```

Comportamiento:
- Un toque en una vértebra (o en la fila de texto) **selecciona** la zona: la columna
  ilumina ese tramo en dorado y debajo aparecen, con una transición suave, 2–4 chips con
  las condiciones reales de esa zona (desde `src/lib/conditions.ts`).
- El segundo toque (o el chip) navega a la página de la condición. Así el móvil no pierde
  el "hover" y evita el clic ciego a un destino único.
- Áreas táctiles de 44 px mínimo, feedback de escala al tocar, sin scroll horizontal.
- Un botón dorado "Termin buchen" al pie del bloque para cerrar el flujo.

## Corrección de destinos

Mapear cada zona a sus condiciones reales en lugar de un solo enlace:

- Cervical: Bandscheibenvorfall (HWS), Bandscheiben-Degeneration, Rückenschmerzen
- Torácica: Facettengelenksarthrose, Osteoporose, Wirbelkörperfraktur
- Lumbar: Bandscheibenvorfall, Wirbelkanalverengung, Wirbelgleiten
- Sakro/ISG: Iliosakralsyndrom, Rückenschmerzen

En desktop el hover sigue igual, pero el clic en la etiqueta usa el primer destino de la lista.

## Detalles técnicos

- `src/routes/-home-constants.ts`: sustituir `href` por `conditions: string[]` (slugs) por zona.
- `src/routes/index.tsx`: `SpineLocator` acepta `variant="desktop" | "mobile"`; el móvil se
  renderiza con `lg:hidden` en el hero y usa estado de selección + chips.
- Navegación con `<Link to="/beschwerden/$slug" params={{ slug }}>` (no `<a href>`).
- Sin librerías nuevas; animaciones con transform/opacity para no afectar rendimiento.
