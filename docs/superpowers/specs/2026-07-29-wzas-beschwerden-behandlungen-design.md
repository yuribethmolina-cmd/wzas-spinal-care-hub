# WZAS — /beschwerden & /behandlungen Redesign Spec
Date: 2026-07-29  
Project: spine-care-hub (Lovable + TanStack Router + Tailwind CSS v4)

---

## 1. Goal

Redesign `/beschwerden` and `/behandlungen` to improve UX based on research findings: patients need to recognize their condition, understand treatment options at a glance, and book an appointment — without bouncing to an external search. Business goal: capture high-intent searches ("Bandscheibenvorfall München") with condition-specific pages.

---

## 2. Architecture

**Chosen approach: C**

| Route | Purpose |
|---|---|
| `/beschwerden` | Hub — 9 conditions grid, editorial intro |
| `/beschwerden/$slug` | Detail — per-condition content, SEO-targeted |
| `/behandlungen` | Hub — enriched, no sub-pages |

**File structure (TanStack Router file-based):**
```
src/routes/
  beschwerden.tsx          ← layout wrapper with <Outlet />
  beschwerden.index.tsx    ← hub page
  beschwerden.$slug.tsx    ← detail template
  behandlungen.tsx         ← hub page (single file, no sub-routes)

src/lib/
  conditions.ts            ← typed data for all 9 conditions
```

**Shared components (extracted, not duplicated per page):**
```
src/components/wzas/
  PageHeader.tsx
  PageFooter.tsx
  BookingCTA.tsx
```

---

## 3. Global Decisions

### Booking URL
All booking links open `https://onlinerezeption.vercel.app`. Never Doctolib, Calendly, or any other platform.

### Font — Cormorant Display
Add Cormorant Display (Google Font) as the display font for headings. Replace current `--font-display: "Plus Jakarta Sans"` in `styles.css`. Body text remains Plus Jakarta Sans.

```css
/* styles.css addition */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');

--font-display: "Cormorant Display", ui-serif, Georgia, serif;
```

Also add `<link rel="preconnect">` tags in `index.html`.

### Palette (locked)
```
#1E2535  navy (primary bg, text)
#AC8F52  gold (accents, chips, CTAs)
#F8F8F6  warm white (page bg)
#8C939B  gray (secondary text)
```

### Animation system
- Reuse existing `useFadeUp()` hook (staggered `index * 40ms` delays)
- Ken Burns: CSS `@keyframes` slow zoom on hero images (100% → 108%, 25s loop)
- Card hover: `scale(1.06)` on inner photo div, `600ms cubic-bezier(0.23, 1, 0.32, 1)`
- Arrow indicator on chips: `translateX(4px)` on hover

---

## 4. /beschwerden — Hub Page

### 4.1 Hero
- Full-bleed photo: `Header-WZAS-Rueckenerkrankungen.webp` (existing)
- Ken Burns zoom: CSS keyframes, 25s, 100% → 108%, `animation-iteration-count: infinite; animation-direction: alternate`
- Overlay: `bg-gradient-to-t from-black/70 via-black/20 to-transparent`
- Bottom-left layout:
  - Eyebrow chip: `MÜNCHEN · STIGLMAIERPLATZ` (tiny caps, gold)
  - H1: `Rückenerkrankungen` (Cormorant Display, 5xl–6xl)
  - Subtitle: `9 Erkrankungen. Ein Spezialistenteam.` (body, white/80)
  - Scroll arrow: animated bounce ↓, anchors to `#conditions`

### 4.2 Editorial Intro
White background. Split 2-col on desktop, stacked on mobile.

- **Left (2/3):** Existing paragraph text (expanded slightly)
- **Right (1/3):** Pull quote in Cormorant Display italic:
  > *"Konservativ wenn möglich. Operativ wenn nötig."*
  
  Gold left-border (4px), smaller attribution: `— WZAS Grundsatz`

### 4.3 Conditions Grid — Magazine Layout (Variante A)
Section id: `conditions`. Background: `#F8F8F6`.

Section heading: `Unsere Schwerpunkte` (Cormorant Display, 4xl–5xl, navy)

**Row 1 — Featured card (Rückenschmerzen):**
- Full-width, `aspect-[16/9]`
- Photo, gradient overlay, Ken Burns on hover
- Larger name typography (2xl), subtitle line, `Mehr erfahren →` arrow

**Rows 2–4 — Standard cards (8 conditions):**
- 3-column grid, `aspect-[3/4]` portrait
- Each: photo + gradient + condition name + 1-line anchor copy + `→`
- Name text: Cormorant Display 600, 1.25rem
- Anchor copy: small gray text visible at rest (not just hover)

**All cards:** `<Link to="/beschwerden/{id}">`. Hover: scale(1.06) on photo div, arrow shifts 4px right.

### 4.4 Trust Strip
Warm white background, 3 pillars, icon + label:

| Icon | Label |
|---|---|
| Stethoscope SVG | Seit 2006 in München |
| Shield SVG | Konservativ zuerst |
| Calendar SVG | Ersttermin ohne Überweisung |

No box, no card — inline with subtle dividers.

### 4.5 CTA — Bottom
Dark navy (`#1E2535`) existing pattern. Updated copy:

- H2: `Bereit für Ihren Termin?`
- Body: `Noch keine Diagnose? Wir helfen Ihnen beim ersten Schritt. Ersttermine meist innerhalb von 5 Werktagen.`
- Primary CTA: `Online buchen` → onlinerezeption.vercel.app
- Secondary: phone number

---

## 5. /beschwerden/$slug — Condition Detail Template

### 5.1 Routing
TanStack Router dynamic segment: `/beschwerden/$slug`

The `Route` component reads `params.slug`, looks up the condition in `conditions.ts`, and renders the template. 404 if slug not found (throw `notFound()`).

### 5.2 Hero
- Full-bleed photo from `condition.photo`
- Same Ken Burns treatment
- Breadcrumb overlay (top, small): `Rückenerkrankungen / {condition.name}`
- H1: `condition.name` (Cormorant Display, 4xl–5xl)
- H2 subtitle: `condition.subtitle` (Discusprolaps, etc.) in body italic

### 5.3 Overview — "Was ist das?"
2-column split on desktop:

**Left (2/3):** `condition.bodyText` — verified medical paragraph, 200–250 words.

**Right (1/3):** `Auf einen Blick` card — gold border-left:
- Region: `condition.bullets.region` (e.g. Lendenwirbelsäule)
- Häufigkeit: `condition.bullets.frequency`
- Symptome: `condition.bullets.symptoms[]` (3 bullets max)

### 5.4 Treatment Chips — "So behandeln wir"
Heading: `So behandeln wir` (Cormorant Display, 2xl)

`condition.treatmentIds[]` maps to treatment chip components:
- Style: `border border-[#AC8F52] text-[#AC8F52] rounded-full px-4 py-2`
- Hover: fill gold, text navy
- Arrow shifts 4px right on hover
- Each chip is a `<Link to="/behandlungen">` (for now, until sub-pages exist)

### 5.5 Doctor Module — Conditional
**Only renders if `condition.doctorSlugs.length > 0`.**

When populated:
```
Ihr Spezialist für dieses Krankheitsbild
[photo] Dr. Name · Fachrichtung
        Short bio excerpt
        Zum Arztprofil →
```

Card style: white bg, subtle shadow, doctor photo left-aligned. `<Link to="/aerzte/{slug}">`.

doctorSlugs initialized as `[]` for all 9 conditions. Fill in after meeting with Dr. Luis.

### 5.6 Related Conditions
`condition.relatedIds[]` — 3 slugs, rendered as horizontal mini-cards.

Same card style as hub but `aspect-[4/3]` and smaller. Heading: `Ähnliche Erkrankungen`.

### 5.7 CTA
Parametrized with `condition.ctaCopy` (one sentence, e.g. "Leiden Sie an einem Bandscheibenvorfall?").
Dark navy, same pattern as hub.

---

## 6. Data Model — `src/lib/conditions.ts`

```typescript
export type Condition = {
  id: string;
  name: string;          // "Bandscheibenvorfall"
  subtitle: string;      // "Discusprolaps"
  photo: string;         // URL to condition photo
  bodyText: string;      // verified medical paragraph
  bullets: {
    region: string;      // "Lendenwirbelsäule (LWS)"
    frequency: string;   // "Sehr häufig"
    symptoms: string[];  // max 3 items
  };
  treatmentIds: string[]; // e.g. ["infiltration", "mikrochirurgie"]
  relatedIds: string[];   // 3 condition slugs
  ctaCopy: string;        // CTA first sentence
  doctorSlugs: string[];  // [] until Luis meeting
};
```

**Medical content strategy:** Use only verified content from wzas.de. Exclude IDD/Schmerzpumpen until confirmed with Dr. Luis — label is ambiguous (IDD = Intervertebral Differential Dynamics, not a pain pump). Mark any unverified content as `// TBD: verify with Luis`.

---

## 7. /behandlungen — Hub Page

### 7.1 Hero
- Photo: `Header-Rueckenbehandlung.webp` (existing)
- Ken Burns identical treatment
- H1: `Rückenbehandlungen`
- Subtitle: *"Von der Infiltration bis zur Mikrochirurgie — individuell abgestimmt."*

### 7.2 Intro + Philosophy Pull Quote
Same split layout as beschwerden.

- **Left:** Existing intro text (expanded)
- **Right:** Pull quote: *"Jeder Patient bekommt genau das, was sein Befund erfordert."*

### 7.3 Treatment Spectrum
3 large cards (`aspect-[16/9]`) in a row, connected by a thin gold horizontal line (CSS pseudo-element on the container).

Each card: photo + category name + 1-line description + `Ver métodos ↓` anchor.

```
[Ohne Operation] ——gold line—— [Minimalinvasiv] ——gold line—— [Chirurgie]
```

On mobile: stacked vertically, gold line becomes vertical.

### 7.4 Methods Expansion — Per Category
Below the 3 spectrum cards, each category gets its own subsection:

**Verfahren ohne Operation**
- ⊕ Infiltrationstherapie — 1-line description
- ⊕ Medikamentöse Therapie — 1-line description
- ⊕ [TBD: verify with Luis]

**Minimalinvasive Verfahren**
- ⊕ [Content from wzas.de — verify]

**Wirbelsäulenchirurgie**
- ⊕ Mikrochirurgische Verfahren — 1-line description
- ⊕ Stabilisierende Verfahren — 1-line description

`⊕` rendered as a thin gold plus icon (SVG inline). No accordion — flat list with descriptions.

### 7.5 Bridge to Beschwerden
Franja editorial (warm white, centered):

> *"Noch keine Diagnose? Zuerst Ihr Krankheitsbild verstehen."*

3 condition chips linking to `/beschwerden/{id}`:
- Bandscheibenvorfall →
- Rückenschmerzen →
- Spinalkanalstenose →

Same chip style as detail page but navy border/text → gold fill on hover.

### 7.6 CTA
Dark navy. H2: `Welche Behandlung ist die richtige für mich?`
Body: existing text.
Secondary link: `Zuerst Beschwerdebild ansehen →` (links to /beschwerden).

---

## 8. Open Items (post-Luis meeting)

| Item | Blocker |
|---|---|
| `doctorSlugs[]` for each condition | Requires knowing which doctors treat which condition |
| IDD / Schmerzpumpen clarification | Ambiguous — exclude until confirmed |
| Treatment methods list (complete) | Verify with Dr. Luis which methods WZAS actually offers |
| Physiotherapie / Rehabilitation | Unclear if in-house or referred out |

---

## 9. Out of Scope (this spec)

- Mobile hamburger menu redesign
- /aerzte page changes
- /aktuelles page
- Blog/SEO content writing (bodyText populated separately)
- Analytics tracking

---

## 10. Implementation Order

1. Add Cormorant Display font to `index.html` + `styles.css`
2. Extract shared `PageHeader`, `PageFooter`, `BookingCTA` components
3. Create `src/lib/conditions.ts` with 9 entries (bodyText TBD as placeholders)
4. Refactor `beschwerden.tsx` → layout wrapper
5. Build `beschwerden.index.tsx` (hub, magazine grid)
6. Build `beschwerden.$slug.tsx` (detail template)
7. Rebuild `behandlungen.tsx` (spectrum + methods expansion)
8. Register new routes in router
9. Test all 9 condition slugs, verify 404 on unknown slug
10. Git push → Lovable auto-deploy
