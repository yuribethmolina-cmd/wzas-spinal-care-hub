# Remix of Spine Care Hub

Pega esto completo en Lovable como primer prompt del proyecto.

---

## PROMPT

Crea el homepage completo de **WZAS — Wirbelsäulenzentrum am Stiglmaierplatz**, una clínica especializada en columna vertebral en Munich. El sitio debe estar **100% en alemán**.

### Stack y configuración
- React + Vite + Tailwind CSS
- Google Fonts: Inter (weights 300, 400, 500, 600, 700)
- Mobile-first, responsive breakpoints: sm (640), md (768), lg (1024), xl (1280)
- NO usar ninguna plataforma de booking externa (ni Doctolib, ni Calendly, ni Jameda)

### Paleta de colores (usar como variables CSS o clases Tailwind custom)
```
dark:    #1E2535   (fondo oscuro, nav, footer)
mid:     #263044   (cards sobre fondo oscuro)
gold:    #AC8F52   (CTAs, acentos, bordes decorativos)
warm:    #F8F8F6   (fondo principal claro)
gray:    #8C939B   (texto secundario)
lgray:   #E2E4E7   (bordes)
```

---

## SECCIONES (en orden, de arriba a abajo)

### 1. NAVEGACIÓN (sticky, fondo white con sombra suave)
- **Logo izquierda:** barra dorada vertical + "WZAS" (bold) + "Wirbelsäulenzentrum" (light, gris)
- **Links centro:** Rückenschmerzen · Arzt finden · Behandlungen · Aktuelles
- **CTA derecha:** botón `Termin vereinbaren` fondo dorado (#AC8F52), texto dark, rounded
- En mobile: hamburger menu, el botón CTA queda en el menú

### 2. HERO (fondo #1E2535, full-width, min-height 85vh)
Dividido en dos columnas (desktop): columna izquierda texto, columna derecha imagen placeholder.

**Columna izquierda:**
- Eyebrow: `WIRBELSÄULENZENTRUM AM STIGLMAIERPLATZ · MÜNCHEN` (letra pequeña, dorada, tracking-widest)
- Headline: `Rückengesundheit für München.` (text-6xl bold, blanco, line-height tight)
- Subtext: `20 Jahre Erfahrung. 12 Spezialisten. Konservative Behandlung zuerst — Operation nur wenn nötig.` (text-lg, gris claro, leading-relaxed)
- Label chips: `Was führt Sie zu uns?` (text-sm, gris)
- Chips (flex-wrap, cada uno con borde blanco/gris, rounded-full, texto blanco):
  - Akuter Rückenschmerz
  - Chronische Schmerzen
  - Bandscheibenvorfall
  - Ischias
  - Nach OP
- Botones: `Termin vereinbaren` (fondo dorado, texto dark) + `Mehr erfahren` (borde blanco, texto blanco)

**Columna derecha:** div placeholder con fondo #263044, aspect-ratio 4/3, rounded-xl. Texto centrado: `[ Foto: Ärzteteam wzas.de ]`

**Stats bar** (pegada al fondo del hero, fondo oscuro 90% opacidad, 4 columnas):
- 30.000+ · Patienten pro Jahr
- 90% · ohne Operation behandelt
- 20+ · Jahre Erfahrung
- 12 · Wirbelsäulenspezialisten

### 3. BESCHWERDEBILDER (fondo #F8F8F6)
- Label: `BEHANDLUNGSGEBIETE` (dorado, tracking-widest, pequeño)
- Título: `Was führt Sie zu uns?` (text-4xl bold, dark)
- Subtexto: `Finden Sie Ihr Beschwerdebild und erfahren Sie, wie unsere Spezialisten helfen können — ohne unnötige Operationen.`
- Grid de 6 tarjetas (3 columnas desktop, 2 tablet, 1 mobile), fondo blanco, sombra suave, borde top dorado:

| Ícono | Título | Sub |
|---|---|---|
| ⚡ | Akuter Rückenschmerz | Plötzlicher Beginn · Verletzung · Muskelkrampf |
| 🔄 | Chronische Rückenschmerzen | 3+ Monate · Wiederkehrend · Degenerativ |
| 💿 | Bandscheibenvorfall | L4/L5 · L5/S1 · Zervikal |
| ⚡ | Ischias / Lumboischialgie | Ausstrahlende Schmerzen · Beinschwäche |
| 🔧 | Reha nach Operation | Rehabilitation · Nachsorge |
| 🏃 | Sport- & Aktivverletzungen | Sportler · Hochbelastende Aktivität |

Cada tarjeta: hover lift suave, link `Behandlungsoptionen ansehen →` en dorado al fondo.

### 4. IHR WEG ZUR BESSERUNG (fondo #1E2535)
- Label: `IHR WEG ZUR BESSERUNG` (dorado)
- Título: `Vom ersten Klick zum Termin` (blanco, text-4xl)
- 3 pasos horizontales (desktop), verticales (mobile), conectados con flecha →:

1. **Beschwerdebild wählen** — Suchen oder stöbern Sie nach Symptomen — unsere Übersicht hilft Ihnen zu verstehen, welche Behandlungsoptionen für Ihren Fall geeignet sind.
2. **Den richtigen Spezialisten finden** — Filtern Sie unser Team aus 12 Spezialisten nach Fachgebiet. Jedes Profil zeigt die behandelten Erkrankungen und den Behandlungsansatz.
3. **In 60 Sekunden buchen** — Nutzen Sie unser Online-Buchungssystem und wählen Sie einen passenden Termin. Ersttermine meist innerhalb von 5 Werktagen. Kein Anruf nötig.

Cada paso: número dorado (01/02/03), título blanco bold, texto gris claro, borde top dorado 4px.

### 5. UNSER ÄRZTETEAM (fondo #F8F8F6)
- Label: `UNSER ÄRZTETEAM` (dorado)
- Título: `12 Spezialisten, ein Ziel` (dark, text-4xl)
- Subtexto: `Jeder Patient wird von Anfang an dem richtigen Spezialisten zugeordnet.`
- Filtros (chips clickeables): `Alle` (activo, fondo dark) · `Wirbelsäulenchirurgie` · `Schmerztherapie` · `Neurochirurgie` · `Orthopädie`
- Grid 3 doctores (preview), cada tarjeta fondo blanco, sombra:
  - Foto placeholder (aspect 3/4, fondo #263044)
  - Nombre: Dr. med. Ralph Miederer | Dr. med. Christian Eröss | Dr. Wing Mann Ho
  - Rol: Wirbelsäulenchirurgie · Ärztlicher Direktor | Neurochirurgie · Leitender Oberarzt | Neurochirurgie · Wirbelsäulenspezialist
  - Schwerpunkte (texto pequeño gris): los 3 puntos de cada doctor
  - Botón `Profil ansehen` (borde dark)
- Link al final: `Alle 12 Spezialisten ansehen →`

### 6. TERMIN VEREINBAREN (fondo #1E2535)
- Línea dorada top (4px)
- Columna izquierda:
  - Título: `Wir sind für Sie da.` (blanco, text-4xl)
  - Subtexto: `Die meisten Ersttermine sind innerhalb von 5 Werktagen verfügbar. Für die meisten Beschwerden ist keine Überweisung erforderlich.`
  - Widget de booking: tarjeta #263044 con borde top dorado. Label `Online buchen`, descripción `Integriert über onlinerezeption.vercel.app`, botón dorado `Termin buchen`. **El botón abre `onlinerezeption.vercel.app` en un modal o nueva pestaña.**
- Columna derecha: tarjeta fondo #263044, "Weitere Kontaktmöglichkeiten":
  - 📞 Telefon: +49 (0)89-54 34 30 30 · Mo–Fr · 08:00–18:00 Uhr
  - ✉️ E-Mail: info@wzas.de · Antwort innerhalb eines Werktags
  - 📍 Adresse: Nymphenburger Str. 1 · 80335 München

### 7. AKTUELLES (fondo #F8F8F6)
- Label: `AKTUELLES` (dorado)
- Título: `Vorträge, Veranstaltungen & Wissen` (dark, text-4xl)
- Subtexto: `Bleiben Sie informiert — unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen und Fachbeiträgen.`
- 3 tarjetas horizontales (fondo blanco, sombra suave, borde top color según tipo):

1. **[VORTRAG]** (borde azul) · 15. September 2026 · "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?" · Gasteig HP8 · München · 19:00 Uhr
2. **[VIDEO]** (borde morado) · Online verfügbar · "Bandscheibenvorfall verstehen: Diagnose & Behandlung" · 45 Min. · Dr. med. Ralph Miederer
3. **[ARTIKEL]** (borde verde) · Juli 2026 · "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie" · Fachbeitrag · Neurochirurgie aktuell

Cada tarjeta: badge de tipo, fecha, título bold, detalle gris, link `Mehr erfahren →` en color del badge.
Link final: `Alle Veranstaltungen & Inhalte ansehen →`

### 8. FOOTER (fondo #1E2535)
- Línea dorada top (2px)
- 5 columnas (desktop), stack (mobile):
  1. Logo WZAS + Nymphenburger Str. 1, 80335 München + +49 (0)89-54 34 30 30 + info@wzas.de
  2. **Beschwerdebilder:** Akuter Rückenschmerz · Chronische Schmerzen · Bandscheibenvorfall · Ischias · Reha nach OP
  3. **Behandlungen:** Konservative Therapie · Minimalinvasiv · Wirbelsäulenop. · Schmerztherapie · Rehabilitation
  4. **Über uns:** Unser Team · Die Praxis · Leitbild & Werte · Aktuelles · Karriere
  5. **Für Patienten:** Termin vereinbaren · Häufige Fragen · Barrierefreiheit · Datenschutz

- Bottom bar: `© 2026 Wirbelsäulenzentrum am Stiglmaierplatz · Alle Rechte vorbehalten` | `Impressum · Datenschutz · Barrierefreiheit`

---

## Animaciones / UX
- Nav: sombra aparece al hacer scroll (no está en el estado inicial)
- Cards: `hover:shadow-lg hover:-translate-y-1 transition-all duration-200`
- Chips síntoma: `hover:bg-white/10 cursor-pointer`
- Filter chips equipo: onClick cambia estado activo (fondo dark o borde dorado)
- Stats numbers: sin animación de conteo (estáticos para MVP)

## Lo que NO incluir
- Chatbot ni widget de terceros
- Doctolib, Calendly, Jameda, ni cualquier plataforma externa de citas
- Imágenes de stock médico genéricas (usar placeholders con bg-[#263044] + texto descriptivo)
- Formulario de contacto funcional (solo visual para MVP) - this is the original website: https://www.wzas.de/

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/39308a67-a4f1-4561-a188-eb9a4dd07ceb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
