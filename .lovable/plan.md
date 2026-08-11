# Diferenciar los dos flujos de cita

Hoy todos los botones (nav, hero, barra móvil, footer, sección "Wir sind für Sie da") apuntan al mismo destino: `onlinerezeption.vercel.app`. El paciente hace clic sin saber si va a reservar una fecha real o solo enviar una consulta, y el widget le pide elegir en un menú intermedio.

Son dos servicios distintos y deben leerse como tales:

- **Termin buchen** (7 pasos): elige seguro, médico, fecha y hora. Resultado: cita confirmada.
- **Anfrage senden** (3 pasos): mensaje sin fecha. Resultado: el equipo responde por email/teléfono.

## Recomendación UX

Regla: **un CTA primario por pantalla**. Reservar es la acción principal; consultar es la salida secundaria para quien no sabe qué necesita.

### Jerarquía por superficie

| Superficie | Primario | Secundario |
|---|---|---|
| Nav (desktop) | Botón dorado "Termin buchen" | — |
| Hero | Botón dorado "Termin buchen" + microcopy "Freie Termine online · ca. 2 Min." | Enlace texto "Nur eine Frage? Anfrage senden" |
| Barra móvil | Botón dorado "Termin buchen" + botón de llamada | — (la consulta vive en la sección de contacto) |
| Sección contacto (#termin) | Tarjeta "Online buchen" con pasos y duración | Tarjeta "Anfrage senden" en estilo contorno |
| Footer | "Termin buchen" | "Anfrage senden" |

### Microcopy de expectativa (DE/EN)

- Buchen: "Freie Termine sehen und direkt bestätigen · ca. 2 Minuten · Versicherung und Wunscharzt wählbar."
- Anfrage: "Ohne feste Uhrzeit. Beschreiben Sie Ihr Anliegen — wir melden uns innerhalb eines Werktags."

### Sección de contacto rediseñada

Dos tarjetas lado a lado (apiladas en móvil), misma altura, distinta jerarquía visual:

```text
┌──────────────────────────────┐  ┌──────────────────────────────┐
│ ONLINE BUCHEN                │  │ ANFRAGE                      │
│ Termin online vereinbaren    │  │ Frage stellen                │
│ ① Versicherung ② Arzt        │  │ Kurzes Formular, 3 Schritte  │
│ ③ Datum & Uhrzeit            │  │ Antwort in 1 Werktag         │
│ ca. 2 Min · sofort bestätigt │  │                              │
│ [ Termin buchen ]  (dorado)  │  │ [ Anfrage senden ] (contorno)│
└──────────────────────────────┘  └──────────────────────────────┘
```

## Detalles técnicos

- `src/routes/-home-constants.ts`: junto a `BOOKING_URL`, añadir `INQUIRY_URL`. Como aún no hay deep links confirmados del widget, ambas constantes apuntan de momento a la misma URL; cuando se confirmen los parámetros del prototipo basta cambiar una línea.
- Componente nuevo `src/components/AppointmentChoice.tsx` con las dos tarjetas y las traducciones DE/EN; se usa en la sección `Termin` de `src/routes/index.tsx`.
- Actualizar etiquetas: `Termin vereinbaren` → `Termin buchen` en `PageHeader.tsx`, `MobileNavPanel.tsx`, `MobileCTABar.tsx`, `PageFooter.tsx`, hero y CTAs de `index.tsx`, `aerzte.*`, `aktuelles.tsx`, `behandlungen.tsx`.
- Añadir enlace secundario "Anfrage senden" solo en hero, footer y sección de contacto (no en nav ni barra móvil, para no competir con el primario).
- Sin cambios de backend ni de datos; todo es frontend y copy.
- Aparte: corregir el error de hidratación causado por el host del widget (`#qr_cp_host`) renderizándose en SSR — se montará solo en cliente.
