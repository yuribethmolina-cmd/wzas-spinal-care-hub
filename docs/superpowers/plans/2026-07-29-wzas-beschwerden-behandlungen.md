# WZAS /beschwerden & /behandlungen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign /beschwerden (hub + 9 detail pages) and /behandlungen (enriched hub) for WZAS Wirbelsäulenzentrum München with cinematic UX, Cormorant Display typography, and SEO-optimized condition pages.

**Architecture:** TanStack Router file-based routing — `beschwerden.tsx` becomes layout wrapper with `<Outlet />`, hub moves to `beschwerden.index.tsx`, condition details to `beschwerden.$slug.tsx`. Behandlungen stays a single file, fully rewritten. Shared components extracted to `src/components/wzas/`.

**Tech Stack:** React + Vite + TanStack Router + Tailwind CSS v4 (no config file, `@theme inline` in styles.css). Google Fonts (Cormorant Display). No external animation libraries — CSS keyframes + IntersectionObserver.

## Global Constraints

- Booking URL: `https://onlinerezeption.vercel.app` — never Doctolib, Calendly, or any other platform
- Palette: `#1E2535` navy · `#AC8F52` gold · `#F8F8F6` warm white · `#8C939B` gray
- Fonts: Cormorant Display (display headings) · Plus Jakarta Sans (body)
- `git pull --rebase origin main` before every push
- Do NOT force-push, amend, or squash already-pushed commits (Lovable syncs from git history)
- All card images from wzas.de CDN: `https://www.wzas.de/wp-content/uploads/...`
- No IDD/Schmerzpumpen content — excluded until verified with Dr. Luis
- `doctorSlugs: []` for all conditions — filled post-Luis meeting

---

### Task 1: Cormorant Display Font + Ken Burns CSS

**Files:**
- Modify: `index.html` — add preconnect + font link tags
- Modify: `src/styles.css` — update `--font-display`, add `@keyframes kenBurns`

**Interfaces:**
- Produces: `font-display` CSS variable resolves to Cormorant Display · `kenBurns` keyframe available globally

- [ ] **Step 1: Add font links to index.html**

Open `index.html`. In `<head>`, add before the closing `</head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Update --font-display in styles.css**

In `src/styles.css`, inside `@theme inline { }`, change:
```css
/* FROM: */
--font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;

/* TO: */
--font-display: "Cormorant Display", ui-serif, Georgia, serif;
```

- [ ] **Step 3: Add kenBurns keyframe to styles.css**

After the `@layer base { }` block, add:
```css
@keyframes kenBurns {
  from { transform: scale(1);    }
  to   { transform: scale(1.08); }
}
```

- [ ] **Step 4: Verify in dev server**

Run: `npm run dev`
Navigate to `/` — the home page H1 "Ihr Rücken in guten Händen" should now render in Cormorant Display serif. If it still shows sans-serif, hard-reload (Cmd+Shift+R).

- [ ] **Step 5: Commit**

```bash
git add index.html src/styles.css
git commit -m "feat: add Cormorant Display font + kenBurns keyframe"
```

---

### Task 2: Extract Shared Components

**Files:**
- Create: `src/components/wzas/PageHeader.tsx`
- Create: `src/components/wzas/PageFooter.tsx`
- Create: `src/components/wzas/BookingCTA.tsx`

**Interfaces:**
- Produces: `<PageHeader activeRoute="/beschwerden"|"/behandlungen"|undefined />` · `<PageFooter />` · `<BookingCTA heading={string} body={string} ctaCopy={string} />`
- Consumes: `BOOKING_URL` constant (defined inside each component)

- [ ] **Step 1: Create PageHeader.tsx**

```tsx
// src/components/wzas/PageHeader.tsx
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";

export function PageHeader({ activeRoute }: { activeRoute?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm transition-colors ${
        activeRoute === to
          ? "font-semibold text-[#AC8F52]"
          : "font-medium text-[#1E2535] hover:text-[#AC8F52]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz" className="h-10 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {navLink("/beschwerden", "Rückenerkrankungen")}
          {navLink("/behandlungen", "Rückenbehandlungen")}
          {navLink("/aerzte", "Ärzteteam")}
          {navLink("/aktuelles", "Aktuelles")}
        </nav>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535] transition-[filter] hover:brightness-105"
        >
          Termin vereinbaren
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create PageFooter.tsx**

```tsx
// src/components/wzas/PageFooter.tsx
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/wzas/logo.png.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";

export function PageFooter() {
  return (
    <footer className="bg-[#1E2535] text-white py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/">
          <img src={logoAsset.url} alt="WZAS" className="h-8 w-auto brightness-0 invert opacity-80" />
        </Link>
        <p className="text-xs text-[#8C939B] text-center">
          Nymphenburger Str. 1 · 80335 München · +49 (0)89-54 34 30 30
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-[#AC8F52] hover:brightness-110 transition"
        >
          Termin vereinbaren →
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create BookingCTA.tsx**

```tsx
// src/components/wzas/BookingCTA.tsx
const BOOKING_URL = "https://onlinerezeption.vercel.app";

interface BookingCTAProps {
  heading: string;
  body: string;
  ctaCopy?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function BookingCTA({
  heading,
  body,
  ctaCopy = "Online buchen",
  secondaryLabel,
  secondaryHref,
}: BookingCTAProps) {
  return (
    <section className="bg-[#1E2535] py-16 lg:py-20 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <h2 className="font-display text-4xl font-semibold text-white">{heading}</h2>
        <p className="mt-4 text-[#8C939B] max-w-lg mx-auto">{body}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
          >
            {ctaCopy}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors. Fix any import path issues if they appear.

- [ ] **Step 5: Commit**

```bash
git add src/components/wzas/
git commit -m "feat: extract shared PageHeader, PageFooter, BookingCTA components"
```

---

### Task 3: conditions.ts Data Model

**Files:**
- Create: `src/lib/conditions.ts`

**Interfaces:**
- Produces: `Condition` type · `CONDITIONS` array (9 items) · `getCondition(slug: string): Condition | undefined`

- [ ] **Step 1: Create src/lib/conditions.ts**

```typescript
// src/lib/conditions.ts

const BASE = "https://www.wzas.de/wp-content/uploads";

export type Condition = {
  id: string;
  name: string;
  subtitle: string;
  photo: string;
  bodyText: string;
  bullets: {
    region: string;
    frequency: string;
    symptoms: string[];
  };
  treatmentIds: string[];
  relatedIds: string[];
  ctaCopy: string;
  doctorSlugs: string[];
};

export const CONDITIONS: Condition[] = [
  {
    id: "rueckenschmerzen",
    name: "Rückenschmerzen",
    subtitle: "",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-028.webp`,
    bodyText:
      "Rückenschmerzen gehören zu den häufigsten Erkrankungen unserer Zeit — nahezu 80 Prozent aller Menschen leiden im Laufe ihres Lebens darunter. Ursachen sind vielfältig: Bewegungsmangel durch sitzende Tätigkeiten, einseitige körperliche Belastung, Übergewicht, Haltungsschäden sowie psychische Faktoren wie Stress und Erschöpfung. Diese Einflüsse führen langfristig zu Veränderungen an den Bandscheiben, Wirbelgelenken und dem umgebenden Muskelgewebe. Akute Rückenschmerzen entstehen oft plötzlich und klingen bei geeigneter Behandlung innerhalb weniger Wochen ab. Chronische Rückenschmerzen — definiert als Beschwerden über mehr als zwölf Wochen — erfordern eine ganzheitliche Diagnostik und ein individuell abgestimmtes Behandlungskonzept. Im WZAS München analysieren wir zunächst die genaue Ursache Ihrer Beschwerden, bevor wir gemeinsam den richtigen Behandlungsweg einschlagen.",
    bullets: {
      region: "Lenden- und Brustwirbelsäule",
      frequency: "Sehr häufig (ca. 80 % der Bevölkerung)",
      symptoms: ["Dumpfer oder stechender Schmerz", "Bewegungseinschränkung", "Muskelverspannungen"],
    },
    treatmentIds: ["infiltration", "medikamentoes", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "iliosakralsyndrom", "bandscheiben-deg"],
    ctaCopy: "Leiden Sie unter anhaltenden Rückenschmerzen?",
    doctorSlugs: [],
  },
  {
    id: "bandscheibenvorfall",
    name: "Bandscheibenvorfall",
    subtitle: "Discusprolaps",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-032.webp`,
    bodyText:
      "Zwischen jedem Wirbelkörper liegt eine Bandscheibe — ein faserknorpeliger Ring mit einem gallertartigen Kern, der als Stoßdämpfer der Wirbelsäule dient. Beim Bandscheibenvorfall (Discusprolaps) tritt der Gallertkern durch einen Riss im Faserring aus und kann auf das Rückenmark oder angrenzende Nervenwurzeln drücken. Betroffen ist am häufigsten die Lendenwirbelsäule (LWS), seltener die Halswirbelsäule (HWS). Die typischen Symptome sind starke, oft in Bein oder Arm ausstrahlende Schmerzen, Taubheitsgefühle sowie — in schweren Fällen — Kraftverlust in den betroffenen Extremitäten. Nicht jeder Bandscheibenvorfall erfordert eine Operation: In vielen Fällen lässt sich durch gezielte konservative Maßnahmen eine vollständige Beschwerdefreiheit erreichen. Das Team des WZAS München beurteilt im Einzelfall, welcher Behandlungsansatz für Sie am geeignetsten ist.",
    bullets: {
      region: "Lendenwirbelsäule (LWS), seltener HWS",
      frequency: "Häufig",
      symptoms: ["Ausstrahlende Schmerzen in Bein oder Arm", "Taubheitsgefühle", "Kraftverlust (in schweren Fällen)"],
    },
    treatmentIds: ["infiltration", "mikrochirurgie", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "wirbelkanalverengung", "wirbelgleiten"],
    ctaCopy: "Leiden Sie an einem Bandscheibenvorfall?",
    doctorSlugs: [],
  },
  {
    id: "bandscheiben-deg",
    name: "Bandscheiben-Degeneration",
    subtitle: "Osteochondrose",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-054.webp`,
    bodyText:
      "Die Bandscheiben-Degeneration, medizinisch als Osteochondrose bezeichnet, ist ein natürlicher Alterungsprozess, der sich durch ungünstige Belastungen beschleunigen kann. Mit der Zeit verlieren die Bandscheiben an Höhe und Elastizität: Ihr Wassergehalt nimmt ab, der Faserring wird brüchig, und die Pufferwirkung zwischen den Wirbelkörpern lässt nach. Als Folge entstehen chronische Schmerzen, Steifheit und ein zunehmendes Instabilitätsgefühl in der Wirbelsäule. Die Osteochondrose betrifft vor allem die Lendenwirbelsäule und tritt häufig in Kombination mit Veränderungen an den Wirbelgelenken auf. Im WZAS München behandeln wir die Bandscheiben-Degeneration mit einem stufenweisen Konzept: Zunächst setzen wir auf konservative Maßnahmen — von der medikamentösen Schmerztherapie bis zur Infiltrationsbehandlung. Operative Schritte werden nur dann erwogen, wenn alle anderen Optionen ausgeschöpft sind.",
    bullets: {
      region: "Lendenwirbelsäule",
      frequency: "Altersbedingt häufig",
      symptoms: ["Chronische Rückenschmerzen", "Morgendliche Steifheit", "Belastungsschmerz"],
    },
    treatmentIds: ["infiltration", "medikamentoes", "stabilisierung"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "wirbelkanalverengung"],
    ctaCopy: "Haben Sie chronische Rückenschmerzen durch Bandscheibendegeneration?",
    doctorSlugs: [],
  },
  {
    id: "wirbelkoerperfraktur",
    name: "Wirbelkörperfraktur",
    subtitle: "",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-047.webp`,
    bodyText:
      "Eine Wirbelkörperfraktur ist ein Knochenbruch an einem oder mehreren Wirbelkörpern der Wirbelsäule. Sie entsteht durch starke direkte Gewalteinwirkung — etwa bei einem Sturz oder Verkehrsunfall — tritt aber auch bei vorgeschädigtem Knochen (Osteoporose) bereits durch alltägliche Belastungen auf. Typisch ist ein plötzlich einsetzender, starker Rückenschmerz, oft verbunden mit einer sichtbaren Verformung der Wirbelsäule oder einer Abnahme der Körpergröße. Abhängig von Typ und Schweregrad der Fraktur reicht das Behandlungsspektrum von konservativer Schmerztherapie mit Schonung über minimalinvasive Verfahren wie die Kyphoplastie — bei der Knochenzement zur Stabilisierung eingebracht wird — bis hin zur offen-chirurgischen Versorgung. Besonders bei osteoporose-bedingten Frakturen ist eine begleitende Therapie der zugrundeliegenden Knochenerkrankung unverzichtbar, um weitere Frakturen zu verhindern.",
    bullets: {
      region: "Brust- und Lendenwirbelsäule",
      frequency: "Häufig bei Osteoporose",
      symptoms: ["Plötzlicher starker Rückenschmerz", "Abnahme der Körpergröße", "Bewegungseinschränkung"],
    },
    treatmentIds: ["minimalinvasiv", "stabilisierung", "medikamentoes"],
    relatedIds: ["osteoporose", "wirbelkanalverengung", "rueckenschmerzen"],
    ctaCopy: "Haben Sie eine Wirbelkörperfraktur erlitten?",
    doctorSlugs: [],
  },
  {
    id: "wirbelkanalverengung",
    name: "Wirbelkanalverengung",
    subtitle: "Spinalkanalstenose",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-029.webp`,
    bodyText:
      "Die Spinalkanalstenose bezeichnet eine Einengung des Wirbelkanals — des knöchernen Kanals, durch den das Rückenmark und die Nervenwurzeln verlaufen. Ursache ist meist ein schleichender Umbau der Wirbelgelenke und Bänder im Laufe der Zeit, oft in Kombination mit Bandscheibenveränderungen. Betroffen sind vor allem ältere Menschen; in der Lendenwirbelsäule ist die Erkrankung am häufigsten. Das Leitsymptom ist die sogenannte Claudicatio spinalis: Beim Gehen entstehen zunehmende Schmerzen, Taubheitsgefühle oder ein Schweregefühl in den Beinen, die sich durch Sitzen oder leichtes Vornüberbeugen rasch bessern. Die Behandlung richtet sich nach dem Ausmaß der Einengung und der Beeinträchtigung des Alltags. Konservative Maßnahmen sowie minimalinvasive Dekompressionsverfahren bieten oft deutliche Linderung — eine offene Operation wird nur bei ausgeprägtem Befund oder nachlassender Gehstrecke eingesetzt.",
    bullets: {
      region: "Lendenwirbelsäule",
      frequency: "Häufig ab dem 60. Lebensjahr",
      symptoms: ["Schmerzen beim Gehen (Claudicatio spinalis)", "Besserung beim Sitzen", "Taubheit in den Beinen"],
    },
    treatmentIds: ["infiltration", "mikrochirurgie", "minimalinvasiv"],
    relatedIds: ["bandscheibenvorfall", "wirbelgleiten", "facettengelenksarthrose"],
    ctaCopy: "Leidet Ihre Gehstrecke unter einer Spinalkanalstenose?",
    doctorSlugs: [],
  },
  {
    id: "wirbelgleiten",
    name: "Wirbelgleiten",
    subtitle: "Spondylolisthesis",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-056.webp`,
    bodyText:
      "Beim Wirbelgleiten (Spondylolisthesis) verschiebt sich ein Wirbelkörper gegenüber dem benachbarten nach vorne. Ursache kann eine angeborene Schwäche des Wirbelbogens, ein degenerativer Abbau der Wirbelgelenke im Alter oder — seltener — eine Verletzung sein. Betroffen ist am häufigsten der Übergang zwischen dem vierten und fünften Lendenwirbel (L4/L5). Je nach Ausmaß des Gleitens können die Symptome von gelegentlichem Rückenschmerz bis hin zu ausgeprägten Nervenschmerzen mit Ausstrahlung in die Beine reichen. Ein leichtes Wirbelgleiten lässt sich in vielen Fällen konservativ behandeln: Physiotherapie zur Stabilisierung der Rumpfmuskulatur und gezielte Infiltrationen können die Beschwerden deutlich lindern. Bei fortgeschrittenem Gleiten oder neurologischen Ausfällen kann eine operative Stabilisierung der betroffenen Wirbelsäulensegmente notwendig werden.",
    bullets: {
      region: "Lendenwirbelsäule (L4/L5)",
      frequency: "Mäßig häufig",
      symptoms: ["Rückenschmerzen", "Ausstrahlende Schmerzen in die Beine", "Instabilitätsgefühl"],
    },
    treatmentIds: ["infiltration", "stabilisierung", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "wirbelkanalverengung", "rueckenschmerzen"],
    ctaCopy: "Spüren Sie Instabilität oder ausstrahlende Schmerzen durch Wirbelgleiten?",
    doctorSlugs: [],
  },
  {
    id: "iliosakralsyndrom",
    name: "Iliosakralsyndrom",
    subtitle: "Kreuzdarmbeingelenk",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-038.webp`,
    bodyText:
      "Das Iliosakralsyndrom entsteht durch eine Funktionsstörung oder Entzündung des Iliosakralgelenks (ISG) — der Verbindung zwischen Kreuzbein und Beckenknochen. Das ISG überträgt die Kräfte zwischen Wirbelsäule und Becken und ist im Alltag erheblichen Belastungen ausgesetzt. Eine Reizung oder Blockierung dieses Gelenks erzeugt tiefsitzende Kreuzschmerzen, die häufig in Gesäß und Oberschenkel ausstrahlen und beim Sitzen oder einseitiger Belastung zunehmen. Das Iliosakralsyndrom wird oft mit einem Bandscheibenvorfall verwechselt, da die Symptome ähnlich sind. Eine präzise klinische Untersuchung und, bei Bedarf, eine diagnostische Infiltration des Gelenks sind entscheidend für die korrekte Diagnose. Die Behandlung umfasst gezielte ISG-Infiltrationen, Physiotherapie und, in therapieresistenten Fällen, eine minimalinvasive Verödung der Schmerznerven.",
    bullets: {
      region: "Iliosakralgelenk (Übergang LWS–Becken)",
      frequency: "Häufig, oft fehldiagnostiziert",
      symptoms: ["Tiefsitzender Kreuzschmerz", "Ausstrahlung in Gesäß und Oberschenkel", "Zunahme beim Sitzen"],
    },
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "bandscheibenvorfall"],
    ctaCopy: "Leiden Sie unter tiefsitzendem Kreuzschmerz?",
    doctorSlugs: [],
  },
  {
    id: "osteoporose",
    name: "Osteoporose",
    subtitle: "Knochenschwund",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-026.webp`,
    bodyText:
      "Osteoporose ist eine Skeletterkrankung, bei der die Knochendichte und -qualität abnimmt, was das Risiko von Frakturen erhöht. An der Wirbelsäule führt Osteoporose besonders häufig zu Wirbelkörpereinbrüchen — teilweise ohne nennenswerten äußeren Auslöser. Die Erkrankung betrifft vor allem Frauen nach der Menopause, ist aber auch bei Männern ab dem 70. Lebensjahr verbreitet. Lange verläuft Osteoporose ohne Beschwerden; erst eine Fraktur macht die Erkrankung sichtbar. Eine Abnahme der Körpergröße, ein sich entwickelnder Rundrücken oder anhaltende belastungsabhängige Rückenschmerzen können erste Hinweise sein. Im WZAS München diagnostizieren wir Osteoporose mittels Knochendichtemessung und behandeln sowohl die Grunderkrankung als auch deren Folgen an der Wirbelsäule — frische Wirbelkörperfrakturen können mit der Kyphoplastie minimalinvasiv stabilisiert werden.",
    bullets: {
      region: "Gesamte Wirbelsäule",
      frequency: "Häufig bei Frauen nach der Menopause",
      symptoms: ["Oft asymptomatisch bis zur ersten Fraktur", "Abnahme der Körpergröße", "Rundrücken"],
    },
    treatmentIds: ["minimalinvasiv", "medikamentoes", "stabilisierung"],
    relatedIds: ["wirbelkoerperfraktur", "rueckenschmerzen", "bandscheiben-deg"],
    ctaCopy: "Wurde bei Ihnen Osteoporose diagnostiziert?",
    doctorSlugs: [],
  },
  {
    id: "facettengelenksarthrose",
    name: "Facettengelenksarthrose",
    subtitle: "Spondylarthrose",
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-019.webp`,
    bodyText:
      "Die Facettengelenksarthrose — auch Spondylarthrose genannt — ist ein Verschleiß der kleinen Wirbelgelenke, die jeweils zwei benachbarte Wirbelkörper miteinander verbinden. Diese Gelenke ermöglichen die geführte Bewegung der Wirbelsäule und nehmen bei jeder Beuge- und Drehbewegung Belastungen auf. Mit zunehmendem Alter und Überlastung nutzt der schützende Knorpel ab; die Gelenkkapseln entzünden sich, und knöcherne Anbauten können den Wirbelkanal einengen. Typisch ist ein belastungsabhängiger, tiefsitzender Rückenschmerz, der morgens besonders ausgeprägt ist und sich durch Bewegung und Wärme bessert. Im WZAS München behandeln wir die Spondylarthrose mit einem mehrstufigen Ansatz: Gezielte Facettengelenks-Infiltrationen lindern akute Schmerzschübe; bei dauerhafter Beschwerdesymptomatik kann eine minimalinvasive Denervierung (Radiofrequenzablation) der Schmerznerven zu langfristiger Erleichterung führen.",
    bullets: {
      region: "Gesamte Wirbelsäule, häufig LWS",
      frequency: "Häufig im Alter",
      symptoms: ["Morgendliche Steifheit", "Belastungsabhängiger Rückenschmerz", "Besserung durch Bewegung und Wärme"],
    },
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["bandscheiben-deg", "iliosakralsyndrom", "wirbelkanalverengung"],
    ctaCopy: "Schränkt Sie Facettengelenksarthrose in Ihrer Beweglichkeit ein?",
    doctorSlugs: [],
  },
];

export function getCondition(slug: string): Condition | undefined {
  return CONDITIONS.find((c) => c.id === slug);
}

export const TREATMENT_LABELS: Record<string, string> = {
  infiltration:   "Infiltrationstherapie",
  medikamentoes:  "Medikamentöse Therapie",
  physiotherapie: "Physiotherapie",
  minimalinvasiv: "Minimalinvasive Verfahren",
  mikrochirurgie: "Mikrochirurgische Verfahren",
  stabilisierung: "Stabilisierende Verfahren",
};
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/conditions.ts
git commit -m "feat: add conditions.ts data model with 9 verified conditions"
```

---

### Task 4: beschwerden.tsx Layout Wrapper + beschwerden.index.tsx Hub

**Files:**
- Modify: `src/routes/beschwerden.tsx` — replace with layout wrapper only
- Create: `src/routes/beschwerden.index.tsx` — full hub page

**Interfaces:**
- Consumes: `PageHeader`, `PageFooter`, `BookingCTA` from `@/components/wzas/` · `CONDITIONS` from `@/lib/conditions`
- Produces: `/beschwerden` renders hub · `/beschwerden/any-slug` renders child route via Outlet

- [ ] **Step 1: Replace beschwerden.tsx with layout wrapper**

Completely replace `src/routes/beschwerden.tsx` with:

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/beschwerden")({
  component: () => <Outlet />,
});
```

- [ ] **Step 2: Create beschwerden.index.tsx**

Create `src/routes/beschwerden.index.tsx`:

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { CONDITIONS } from "@/lib/conditions";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const HERO_PHOTO = "https://www.wzas.de/wp-content/uploads/2026/06/Header-WZAS-Rueckenerkrankungen.webp";

function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`,
    } as React.CSSProperties,
  };
}

export const Route = createFileRoute("/beschwerden/")({
  head: () => ({
    meta: [
      { title: "Rückenerkrankungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Bandscheibenvorfall, Spinalkanalstenose, Spondylolisthesis und mehr — das WZAS München behandelt ein breites Spektrum an Rückenerkrankungen, konservativ wenn möglich, operativ wenn nötig." },
    ],
  }),
  component: BeschwerdenHub,
});

function ConditionCard({ condition, index, large = false }: {
  condition: typeof CONDITIONS[number];
  index: number;
  large?: boolean;
}) {
  const { ref, style } = useFadeUp(index * 40);
  const [hovered, setHovered] = useState(false);
  const lines = condition.name.split("\n");

  return (
    <Link
      to="/beschwerden/$slug"
      params={{ slug: condition.id }}
      ref={ref as React.Ref<HTMLAnchorElement>}
      style={style}
      className={`relative overflow-hidden block group ${large ? "aspect-[16/9]" : "aspect-[3/4]"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${condition.photo})`,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: `transform 600ms ${EASE}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 lg:p-6">
        <p className={`text-white font-display font-semibold leading-tight ${large ? "text-3xl lg:text-4xl" : "text-xl"}`}>
          {lines[0]}
        </p>
        {lines[1] && (
          <p className="text-white/80 text-sm mt-1">{lines[1]}</p>
        )}
        {condition.subtitle && !lines[1] && (
          <p className="text-white/70 text-sm mt-1">({condition.subtitle})</p>
        )}
        <p
          className="mt-3 text-xs font-semibold tracking-widest text-[#AC8F52] uppercase flex items-center gap-1"
          style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: `transform 300ms ${EASE}` }}
        >
          Mehr erfahren →
        </p>
      </div>
    </Link>
  );
}

function BeschwerdenHub() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);

  const featured = CONDITIONS[0];      // Rückenschmerzen
  const rest = CONDITIONS.slice(1);    // 8 remaining

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/beschwerden" />

      <main>
        {/* Hero — Ken Burns + editorial overlay */}
        <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_PHOTO})`,
              animation: "kenBurns 25s ease-in-out infinite alternate",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-3">
              München · Stiglmaierplatz
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white leading-tight">
              Rücken&shy;erkrankungen
            </h1>
            <p className="mt-3 text-white/75 text-lg">9 Erkrankungen. Ein Spezialistenteam.</p>
          </div>
        </section>

        {/* Intro editorial */}
        <section className="py-14 lg:py-20 bg-white">
          <div ref={introRef} style={introStyle} className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <p className="text-lg text-[#4A5568] leading-relaxed">
                Rückenschmerzen gehören zu den häufigsten Beschwerden, mit denen Patienten das Wirbelsäulenzentrum am Stiglmaierplatz in München aufsuchen. Die Ursachen sind vielfältig: Bewegungsmangel bei sitzenden Tätigkeiten, einseitige körperliche Belastung, Übergewicht, Haltungsschäden und psychische Belastungen wie Stress. Diese Faktoren führen langfristig zu Veränderungen an den Wirbelsäulengelenken, den Bandscheiben und dem umliegenden Gewebe. Unser erfahrenes Team behandelt ein breites Spektrum an Rückenerkrankungen — konservativ wenn möglich, operativ wenn nötig.
              </p>
            </div>
            <div className="border-l-4 border-[#AC8F52] pl-6">
              <p className="font-display text-2xl lg:text-3xl italic text-[#1E2535] leading-snug">
                "Konservativ wenn möglich. Operativ wenn nötig."
              </p>
              <p className="mt-3 text-xs text-[#8C939B] tracking-widest uppercase">— WZAS Grundsatz</p>
            </div>
          </div>
        </section>

        {/* Conditions — magazine grid */}
        <section id="conditions" className="py-12 lg:py-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1E2535] mb-8">
              Unsere Schwerpunkte
            </h2>
            {/* Row 1: featured */}
            <div className="mb-3">
              <ConditionCard condition={featured} index={0} large />
            </div>
            {/* Rows 2-4: 3-column portrait */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rest.map((c, i) => (
                <ConditionCard key={c.id} condition={c} index={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="py-12 bg-white border-t border-[#E2E4E7]">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z", label: "Seit 2006 in München" },
                { icon: "M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z", label: "Konservativ zuerst" },
                { icon: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z", label: "Ersttermin ohne Überweisung" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <svg className="w-7 h-7 text-[#AC8F52]" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon} />
                  </svg>
                  <p className="text-sm font-semibold text-[#1E2535]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          heading="Bereit für Ihren Termin?"
          body="Noch keine Diagnose? Wir helfen Ihnen beim ersten Schritt. Ersttermine meist innerhalb von 5 Werktagen."
          ctaCopy="Online buchen"
          secondaryLabel="+49 (0)89-54 34 30 30"
          secondaryHref="tel:+498954343030"
        />
      </main>

      <PageFooter />
    </div>
  );
}
```

- [ ] **Step 3: Verify in dev server**

```bash
npm run dev
```

Navigate to `http://localhost:5173/beschwerden`. Check:
- Hero shows Ken Burns zoom animation
- Cormorant Display renders on headings
- Featured Rückenschmerzen card is full-width 16:9
- 8 remaining cards are portrait 3:4 in 3-column grid
- All 9 cards are clickable links (they 404 until Task 5)
- Pull quote shows with gold left border

- [ ] **Step 4: Commit**

```bash
git add src/routes/beschwerden.tsx src/routes/beschwerden.index.tsx
git commit -m "feat: beschwerden hub — magazine grid + Ken Burns + editorial intro"
```

---

### Task 5: beschwerden.$slug.tsx — Condition Detail Template

**Files:**
- Create: `src/routes/beschwerden.$slug.tsx`

**Interfaces:**
- Consumes: `getCondition(slug)` · `CONDITIONS` (for related cards) · `TREATMENT_LABELS` · all from `@/lib/conditions` · shared components from `@/components/wzas/`
- Produces: `/beschwerden/rueckenschmerzen`, `/beschwerden/bandscheibenvorfall`, … (9 routes)

- [ ] **Step 1: Create beschwerden.$slug.tsx**

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { getCondition, CONDITIONS, TREATMENT_LABELS } from "@/lib/conditions";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`,
    } as React.CSSProperties,
  };
}

export const Route = createFileRoute("/beschwerden/$slug")({
  component: BeschwerdenDetail,
});

function BeschwerdenDetail() {
  const { slug } = Route.useParams();
  const condition = getCondition(slug);

  if (!condition) {
    return (
      <div className="min-h-screen bg-[#F8F8F6]">
        <PageHeader activeRoute="/beschwerden" />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <p className="font-display text-3xl text-[#1E2535] mb-4">Seite nicht gefunden</p>
            <Link to="/beschwerden" className="text-sm text-[#AC8F52] hover:underline">
              ← Zurück zu Rückenerkrankungen
            </Link>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }

  const relatedConditions = condition.relatedIds
    .map((id) => CONDITIONS.find((c) => c.id === id))
    .filter(Boolean) as typeof CONDITIONS;

  const { ref: overviewRef, style: overviewStyle } = useFadeUp(0);
  const { ref: treatRef, style: treatStyle } = useFadeUp(100);
  const { ref: relRef, style: relStyle } = useFadeUp(150);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/beschwerden" />

      <main>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${condition.photo})`,
              animation: "kenBurns 25s ease-in-out infinite alternate",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          {/* Breadcrumb */}
          <div className="absolute top-6 left-0 px-5 lg:px-12">
            <Link
              to="/beschwerden"
              className="text-xs text-white/60 hover:text-white transition-colors tracking-wide"
            >
              ← Rückenerkrankungen
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <h1 className="font-display text-4xl lg:text-6xl font-semibold text-white leading-tight">
              {condition.name}
            </h1>
            {condition.subtitle && (
              <p className="mt-2 text-white/70 text-lg italic font-display">({condition.subtitle})</p>
            )}
          </div>
        </section>

        {/* Overview split */}
        <section className="py-14 lg:py-20 bg-white">
          <div ref={overviewRef} style={overviewStyle} className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-semibold text-[#1E2535] mb-5">Was ist das?</h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">{condition.bodyText}</p>
            </div>
            <div>
              <div className="border-l-4 border-[#AC8F52] pl-5 py-2">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-4">
                  Auf einen Blick
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#8C939B] uppercase tracking-wider mb-0.5">Region</p>
                    <p className="text-sm font-medium text-[#1E2535]">{condition.bullets.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8C939B] uppercase tracking-wider mb-0.5">Häufigkeit</p>
                    <p className="text-sm font-medium text-[#1E2535]">{condition.bullets.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8C939B] uppercase tracking-wider mb-1">Symptome</p>
                    <ul className="space-y-1">
                      {condition.bullets.symptoms.map((s) => (
                        <li key={s} className="text-sm text-[#1E2535] flex gap-2">
                          <span className="text-[#AC8F52] mt-0.5">–</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment chips */}
        {condition.treatmentIds.length > 0 && (
          <section className="py-12 lg:py-16 bg-[#F8F8F6]">
            <div ref={treatRef} style={treatStyle} className="mx-auto max-w-6xl px-5 lg:px-8">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-[#1E2535] mb-6">
                So behandeln wir
              </h2>
              <div className="flex flex-wrap gap-3">
                {condition.treatmentIds.map((id) => (
                  <Link
                    key={id}
                    to="/behandlungen"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#AC8F52] px-5 py-2.5 text-sm font-medium text-[#AC8F52] transition-all hover:bg-[#AC8F52] hover:text-[#1E2535]"
                  >
                    {TREATMENT_LABELS[id] ?? id}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    >→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Doctor module — only if slugs exist */}
        {condition.doctorSlugs.length > 0 && (
          <section className="py-12 bg-white">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-4">
                Ihr Spezialist für dieses Krankheitsbild
              </p>
              <div className="flex flex-wrap gap-4">
                {condition.doctorSlugs.map((slug) => (
                  <Link
                    key={slug}
                    to="/aerzte/$slug"
                    params={{ slug }}
                    className="flex items-center gap-4 bg-white border border-[#E2E4E7] rounded-xl p-4 hover:border-[#AC8F52] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#1E2535]">Zum Arztprofil →</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related conditions */}
        {relatedConditions.length > 0 && (
          <section className="py-12 lg:py-16 bg-[#F8F8F6]">
            <div ref={relRef} style={relStyle} className="mx-auto max-w-6xl px-5 lg:px-8">
              <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-6">
                Ähnliche Erkrankungen
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedConditions.map((rel, i) => {
                  const [hovered, setHovered] = useState(false);
                  return (
                    <Link
                      key={rel.id}
                      to="/beschwerden/$slug"
                      params={{ slug: rel.id }}
                      className="relative overflow-hidden aspect-[4/3] block"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${rel.photo})`,
                          transform: hovered ? "scale(1.06)" : "scale(1)",
                          transition: `transform 600ms ${EASE}`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <p className="text-white font-display font-semibold text-lg leading-tight">{rel.name}</p>
                        {rel.subtitle && <p className="text-white/70 text-xs mt-0.5">({rel.subtitle})</p>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <BookingCTA
          heading={condition.ctaCopy}
          body="Ersttermine meist innerhalb von 5 Werktagen. Konservative Behandlung wenn möglich, Operation wenn nötig."
          ctaCopy="Jetzt Termin vereinbaren"
          secondaryLabel="+49 (0)89-54 34 30 30"
          secondaryHref="tel:+498954343030"
        />
      </main>

      <PageFooter />
    </div>
  );
}
```

- [ ] **Step 2: Verify all 9 slugs in dev server**

```bash
npm run dev
```

Navigate to each URL and confirm it renders without error:
- `http://localhost:5173/beschwerden/rueckenschmerzen`
- `http://localhost:5173/beschwerden/bandscheibenvorfall`
- `http://localhost:5173/beschwerden/bandscheiben-deg`
- `http://localhost:5173/beschwerden/wirbelkoerperfraktur`
- `http://localhost:5173/beschwerden/wirbelkanalverengung`
- `http://localhost:5173/beschwerden/wirbelgleiten`
- `http://localhost:5173/beschwerden/iliosakralsyndrom`
- `http://localhost:5173/beschwerden/osteoporose`
- `http://localhost:5173/beschwerden/facettengelenksarthrose`

Also verify: `http://localhost:5173/beschwerden/nonexistent` shows the 404 message and a back link, not a crash.

Check on each page:
- Hero Ken Burns animates
- "Auf einen Blick" card shows bullets
- Treatment chips render and link to /behandlungen
- Doctor module is NOT visible (doctorSlugs is empty)
- Related conditions show 3 portrait cards with correct photos

- [ ] **Step 3: Fix useState inside .map() warning**

The `useState(false)` call inside the `relatedConditions.map()` is a React rules violation (hooks cannot be in loops). Replace the related conditions block with a dedicated component:

```tsx
function RelatedCard({ condition }: { condition: typeof CONDITIONS[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to="/beschwerden/$slug"
      params={{ slug: condition.id }}
      className="relative overflow-hidden aspect-[4/3] block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${condition.photo})`,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: `transform 600ms ${EASE}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-white font-display font-semibold text-lg leading-tight">{condition.name}</p>
        {condition.subtitle && <p className="text-white/70 text-xs mt-0.5">({condition.subtitle})</p>}
      </div>
    </Link>
  );
}
```

Then use `<RelatedCard key={rel.id} condition={rel} />` inside the map, removing the inline useState. This component should be defined above `BeschwerdenDetail` in the file.

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/beschwerden.\$slug.tsx
git commit -m "feat: beschwerden detail template — 9 condition pages + treatment chips"
```

---

### Task 6: behandlungen.tsx — Full Rebuild

**Files:**
- Modify: `src/routes/behandlungen.tsx` — complete rewrite

**Interfaces:**
- Consumes: `PageHeader`, `PageFooter`, `BookingCTA` · `CONDITIONS` (for bridge chips)
- Produces: `/behandlungen` with spectrum + methods expansion + bridge to beschwerden

- [ ] **Step 1: Replace behandlungen.tsx**

Completely replace `src/routes/behandlungen.tsx` with:

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const HERO_PHOTO = "https://www.wzas.de/wp-content/uploads/2026/06/Header-Rueckenbehandlung.webp";
const BASE = "https://www.wzas.de/wp-content/uploads";

const CATEGORIES = [
  {
    id: "ohne-operation",
    name: "Verfahren ohne Operation",
    description: "Schmerztherapie, Infiltrationen und Rehabilitation — mit dem Ziel, natürliche Beweglichkeit zu erhalten.",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-021.webp`,
    methods: [
      { name: "Infiltrationstherapie", desc: "Gezielte Injektionen mit entzündungshemmenden Wirkstoffen direkt an die Schmerzquelle." },
      { name: "Medikamentöse Therapie", desc: "Individuell angepasste Schmerztherapie und Muskelrelaxantien für akute und chronische Beschwerden." },
      { name: "Physiotherapie", desc: "Gezielte Kräftigung der Rumpfmuskulatur zur Stabilisierung und Entlastung der Wirbelsäule." },
    ],
  },
  {
    id: "minimalinvasiv",
    name: "Minimalinvasive Verfahren",
    description: "Kleine Eingriffe mit großer Wirkung — wenn konservative Mittel ausgeschöpft sind.",
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-053.webp`,
    methods: [
      { name: "Facettengelenk-Infiltration", desc: "Präzise Injektion zur Behandlung von Spondylarthrose und Facettengelenksschmerzen." },
      { name: "Radiofrequenzablation", desc: "Minimalinvasive Denervierung zur langfristigen Linderung von Facetten- und ISG-Schmerzen." },
      { name: "Kyphoplastie", desc: "Stabilisierung osteoporotischer Wirbelkörperfrakturen durch Einbringen von Knochenzement." },
    ],
  },
  {
    id: "chirurgie",
    name: "Wirbelsäulenchirurgie",
    description: "Operative Versorgung — wenn konservative und minimalinvasive Maßnahmen keine ausreichende Linderung bringen.",
    photo: `${BASE}/2026/05/db640b7718e314a38996cce985205bc2.jpg`,
    methods: [
      { name: "Mikrochirurgische Verfahren", desc: "Dekompression eingeklemmter Nervenwurzeln unter dem Mikroskop — schonend und präzise." },
      { name: "Stabilisierende Verfahren", desc: "Spondylodese und Fusionsoperationen zur dauerhaften Stabilisierung instabiler Wirbelsäulensegmente." },
    ],
  },
];

const BRIDGE_CONDITIONS = [
  { id: "bandscheibenvorfall", name: "Bandscheibenvorfall" },
  { id: "rueckenschmerzen", name: "Rückenschmerzen" },
  { id: "wirbelkanalverengung", name: "Spinalkanalstenose" },
];

function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`,
    } as React.CSSProperties,
  };
}

function SpectrumCard({ cat, index }: { cat: typeof CATEGORIES[number]; index: number }) {
  const { ref, style } = useFadeUp(index * 80);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={style}
      className="relative overflow-hidden aspect-[16/9] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cat.photo})`,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: `transform 700ms ${EASE}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      <div className="absolute bottom-0 left-0 p-5 lg:p-6">
        <p className="text-white font-display font-semibold text-xl leading-tight">{cat.name}</p>
        <p className="mt-2 text-white/70 text-sm leading-snug">{cat.description}</p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/behandlungen")({
  head: () => ({
    meta: [
      { title: "Rückenbehandlungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Konservative Therapie, minimalinvasive Verfahren und Wirbelsäulenchirurgie am WZAS München. Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig." },
    ],
  }),
  component: BehandlungenPage,
});

function BehandlungenPage() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);
  const { ref: methodsRef, style: methodsStyle } = useFadeUp(0);
  const { ref: bridgeRef, style: bridgeStyle } = useFadeUp(0);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/behandlungen" />

      <main>
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_PHOTO})`,
              animation: "kenBurns 25s ease-in-out infinite alternate",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-3">
              München · Stiglmaierplatz
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white leading-tight">
              Rücken&shy;behandlungen
            </h1>
            <p className="mt-3 text-white/75 text-lg">
              Von der Infiltration bis zur Mikrochirurgie — individuell abgestimmt.
            </p>
          </div>
        </section>

        {/* Intro + philosophy */}
        <section className="py-14 lg:py-20 bg-white">
          <div ref={introRef} style={introStyle} className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-5">
                Behandlungsmöglichkeiten im Überblick
              </h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                Rückenschmerzen haben viele Ursachen — die Behandlung muss deshalb individuell sein. Im Wirbelsäulenzentrum am Stiglmaierplatz in München begleiten wir unsere Patienten vom ersten Gespräch bis zur Beschwerdefreiheit: mit einem ganzheitlichen Blick auf Körper und Befund, nicht nur auf das Symptom. Wir denken in drei Stufen: Verfahren ohne Operation, minimalinvasive Eingriffe und Wirbelsäulenchirurgie.
              </p>
            </div>
            <div className="border-l-4 border-[#AC8F52] pl-6">
              <p className="font-display text-2xl lg:text-3xl italic text-[#1E2535] leading-snug">
                "Jeder Patient bekommt genau das, was sein Befund erfordert."
              </p>
              <p className="mt-3 text-xs text-[#8C939B] tracking-widest uppercase">— WZAS Grundsatz</p>
            </div>
          </div>
        </section>

        {/* Treatment spectrum */}
        <section className="py-12 lg:py-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1E2535] mb-3">
              Das Behandlungsspektrum
            </h2>
            {/* Gold connector line with dots — desktop only */}
            <div className="hidden lg:flex items-center mb-6 mt-6">
              {CATEGORIES.map((cat, i) => (
                <React.Fragment key={cat.id}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#AC8F52]" />
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[#AC8F52] whitespace-nowrap">
                      {cat.name}
                    </p>
                  </div>
                  {i < CATEGORIES.length - 1 && (
                    <div className="flex-1 h-px bg-[#AC8F52]/40 mx-3" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {CATEGORIES.map((cat, i) => (
                <SpectrumCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Methods expansion */}
        <section className="py-12 lg:py-16 bg-white">
          <div ref={methodsRef} style={methodsStyle} className="mx-auto max-w-6xl px-5 lg:px-8 space-y-14">
            {CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-1">
                  {cat.name}
                </p>
                <div className="h-px bg-[#E2E4E7] mb-6" />
                <div className="space-y-5">
                  {cat.methods.map((method) => (
                    <div key={method.name} className="flex gap-4 items-start">
                      <svg className="w-5 h-5 text-[#AC8F52] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="font-semibold text-[#1E2535]">{method.name}</p>
                        <p className="text-sm text-[#4A5568] leading-relaxed mt-0.5">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bridge to beschwerden */}
        <section className="py-12 bg-[#F8F8F6] border-t border-[#E2E4E7]">
          <div ref={bridgeRef} style={bridgeStyle} className="mx-auto max-w-6xl px-5 lg:px-8 text-center">
            <p className="text-[#8C939B] mb-5">
              Noch keine Diagnose? Zuerst Ihr Krankheitsbild verstehen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {BRIDGE_CONDITIONS.map((c) => (
                <Link
                  key={c.id}
                  to="/beschwerden/$slug"
                  params={{ slug: c.id }}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#1E2535] px-5 py-2.5 text-sm font-medium text-[#1E2535] transition-all hover:bg-[#AC8F52] hover:border-[#AC8F52] hover:text-[#1E2535]"
                >
                  {c.name}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          heading="Welche Behandlung ist die richtige für mich?"
          body="Vereinbaren Sie einen Termin. Unsere Spezialisten klären gemeinsam mit Ihnen, welche Therapie am besten zu Ihrer Situation passt."
          ctaCopy="Online Termin buchen"
          secondaryLabel="Zuerst Beschwerdebild ansehen →"
          secondaryHref="/beschwerden"
        />
      </main>

      <PageFooter />
    </div>
  );
}
```

- [ ] **Step 2: Verify in dev server**

```bash
npm run dev
```

Navigate to `http://localhost:5173/behandlungen`. Check:
- Hero Ken Burns animates, Cormorant Display on H1
- Philosophy pull quote shows with gold left border
- 3 spectrum cards render with gold connector line (desktop) and dots above them
- Methods expand below with gold plus icons
- Bridge chips at bottom link to condition detail pages
- BookingCTA shows with secondary link to /beschwerden

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/routes/behandlungen.tsx
git commit -m "feat: behandlungen — treatment spectrum + methods expansion + beschwerden bridge"
```

---

### Task 7: Final Verification + Push

**Files:** None new — verification and push only.

- [ ] **Step 1: Full build check**

```bash
npm run build
```
Expected: no TypeScript errors, no missing imports, build succeeds. Fix any errors before continuing.

- [ ] **Step 2: Smoke test all routes**

```bash
npm run dev
```

Test each route and check for console errors (open DevTools → Console):
- `/` — home page still intact, no regressions
- `/beschwerden` — hub loads, magazine grid visible
- `/beschwerden/bandscheibenvorfall` — detail page loads, all 6 sections visible
- `/beschwerden/nonexistent` — 404 message with back link
- `/behandlungen` — spectrum + methods visible
- `/aerzte` — still works (not touched)

- [ ] **Step 3: Check font rendering**

On any page: open DevTools → Elements → select any `<h1>` with `font-display` class. In Computed styles, confirm `font-family` resolves to Cormorant Display. If it shows Plus Jakarta Sans, verify the `@theme inline` change in styles.css was saved correctly.

- [ ] **Step 4: Pull + push**

```bash
git pull --rebase origin main
git push origin main
```

- [ ] **Step 5: Verify Lovable deploy**

Open Lovable dashboard. Confirm a new deploy triggered. Once green, visit the Lovable preview URL and test `/beschwerden` and `/behandlungen` to confirm the live site reflects the changes.
