import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import thumbBandscheibe from "@/assets/wzas/thumb-bandscheibe.webp.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";
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

export const Route = createFileRoute("/beschwerden")({
  head: () => ({
    meta: [
      { title: "Rückenerkrankungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Finden Sie Ihr Beschwerdebild: Akuter Rückenschmerz, Bandscheibenvorfall, Ischias und chronische Schmerzen. Spezialisten am WZAS München helfen — ohne unnötige Operationen." },
      { property: "og:title", content: "Rückenerkrankungen · WZAS München" },
    ],
  }),
  component: BeschwerdenPage,
});

const CONDITIONS = [
  {
    id: "akut",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    name: "Akuter Rückenschmerz",
    label: "Plötzlicher Beginn · Verletzung · Muskelkrampf",
    description:
      "Akuter Rückenschmerz entsteht plötzlich — durch Fehlbelastung, Sturz oder Muskelverspannungen. Die meisten Fälle bessern sich innerhalb weniger Wochen durch gezielte konservative Therapie.",
    symptoms: ["Plötzlich einsetzender Schmerz", "Schmerzen bei Bewegung", "Muskelverhärtung", "Eingeschränkte Beweglichkeit", "Schmerzverstärkung beim Bücken"],
    treatment: "Kurzfristige Schmerztherapie, gezielte Physiotherapie und Wärmebehandlung. In den meisten Fällen keine Operation notwendig.",
    urgent: false,
  },
  {
    id: "chronisch",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    name: "Chronische Rückenschmerzen",
    label: "3+ Monate · Wiederkehrend · Degenerativ",
    description:
      "Chronischer Rückenschmerz dauert länger als drei Monate und ist oft komplex. Degenerative Veränderungen, Fehlhaltungen oder psychosomatische Faktoren spielen eine Rolle. Ein multimodaler Behandlungsansatz ist entscheidend.",
    symptoms: ["Anhaltender Schmerz über 12 Wochen", "Morgensteifigkeit", "Schlafstörungen durch Schmerzen", "Einschränkung im Alltag", "Wiederkehrende Schmerzepisoden"],
    treatment: "Multimodales Schmerzmanagement: Kombination aus interventioneller Schmerztherapie, Physiotherapie und psychologischer Unterstützung.",
    urgent: false,
  },
  {
    id: "bandscheibe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-1.875a1.125 1.125 0 011.125-1.125m17.25 3H21m0 0h-1.5c-.621 0-1.125-.504-1.125-1.125M21 19.5v-1.875A1.125 1.125 0 0019.875 16.5M3.75 16.5h16.5M3.75 12h16.5m-16.5 0A1.125 1.125 0 012.625 10.875M3.75 12H2.625m18.75 0h-1.125M3.75 7.5h16.5M3.75 7.5a1.125 1.125 0 01-1.125-1.125M3.75 7.5H2.625m18.75 0h-1.125m1.125 0A1.125 1.125 0 0021.375 6.375m0 0V4.5m0 1.875h-1.125" />
      </svg>
    ),
    name: "Bandscheibenvorfall",
    label: "L4/L5 · L5/S1 · Zervikal",
    description:
      "Der Bandscheibenvorfall (Diskusprolaps) entsteht, wenn der gallertartige Kern der Bandscheibe durch den Faserring nach außen tritt und Nerven komprimiert. In 90 % der Fälle heilt er ohne Operation ab.",
    symptoms: ["Starke Rückenschmerzen", "Ausstrahlende Schmerzen in Bein oder Arm", "Taubheitsgefühl oder Kribbeln", "Muskelschwäche", "Schmerzverstärkung beim Husten/Niesen"],
    treatment: "Konservative Therapie als erste Wahl. Bildgebungsgestützte Injektionen bei anhaltenden Schmerzen. Operation nur bei neurologischen Ausfällen.",
    urgent: true,
  },
  {
    id: "ischias",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    name: "Ischias / Lumboischialgie",
    label: "Ausstrahlende Schmerzen · Beinschwäche · Nervenschmerz",
    description:
      "Ischiasschmerz entsteht durch Reizung oder Kompression des Ischiasnervs — des größten Nervs im menschlichen Körper. Charakteristisch ist der Schmerz, der vom unteren Rücken über Gesäß und Bein bis in den Fuß ausstrahlt.",
    symptoms: ["Brennender oder stechender Schmerz im Bein", "Taubheit oder Kribbeln im Bein/Fuß", "Schmerz zieht von Gesäß bis zum Fuß", "Schwäche beim Gehen oder Stehen", "Verschlechterung beim Sitzen"],
    treatment: "Gezielte Nervenblockaden, Physiotherapie und entzündungshemmende Medikamente. Sehr gutes Ansprechen auf konservative Therapie.",
    urgent: true,
  },
  {
    id: "reha",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    name: "Reha nach Operation",
    label: "Rehabilitation · Nachsorge · Rückkehr zur Aktivität",
    description:
      "Die postoperative Rehabilitation ist entscheidend für ein optimales Ergebnis nach Wirbelsäulenoperationen. Wir begleiten unsere Patienten von der Entlassung bis zur vollständigen Rückkehr zum normalen Alltag.",
    symptoms: ["Schmerzen nach Wirbelsäulen-OP", "Eingeschränkte Beweglichkeit", "Unsicherheit beim Gehen", "Narbenbeschwerden", "Fragen zum weiteren Vorgehen"],
    treatment: "Strukturiertes Rehabilitationsprogramm: Physiotherapie, Schmerzmanagement, Patientenedukation und regelmäßige Kontrollen beim Operateur.",
    urgent: false,
  },
  {
    id: "sport",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    name: "Sport- & Aktivverletzungen",
    label: "Sportler · Hochbelastende Aktivität · Prävention",
    description:
      "Sportler und körperlich aktive Menschen fordern ihre Wirbelsäule außerordentlich. Sportverletzungen der Wirbelsäule erfordern eine präzise Diagnostik und individuelle Therapie, die eine schnelle Rückkehr zum Sport ermöglicht.",
    symptoms: ["Schmerzen nach sportlicher Belastung", "Akute Verletzung durch Sturz oder Stoß", "Überlastungssyndrome", "Rückenschmerzen bei bestimmten Bewegungen", "Schmerzen beim Training oder Wettkampf"],
    treatment: "Schnelle bildgebende Diagnostik, individuelle Therapie und sportspezifisches Rehabilitationsprogramm für eine möglichst kurze Ausfallzeit.",
    urgent: false,
  },
];

function PageHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz" className="h-10 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          <Link to="/beschwerden" className="text-sm font-semibold text-[#AC8F52]">Rückenerkrankungen</Link>
          <Link to="/aerzte" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Ärzteteam</Link>
          <Link to="/behandlungen" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Behandlungen</Link>
          <Link to="/aktuelles" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Aktuelles</Link>
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52]">{children}</p>;
}

function ConditionCard({ c, index }: { c: (typeof CONDITIONS)[number]; index: number }) {
  const { ref, style } = useFadeUp(index * 60);
  return (
    <div ref={ref} style={style} className="bg-white border border-[#E2E4E7] rounded-2xl p-7 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-[#AC8F52]/10 flex items-center justify-center text-[#AC8F52]">
          {c.icon}
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-[#1E2535] leading-snug">{c.name}</h3>
          <p className="mt-0.5 text-xs text-[#8C939B] tracking-wide">{c.label}</p>
        </div>
      </div>

      <p className="text-sm text-[#4A5568] leading-relaxed">{c.description}</p>

      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8C939B] mb-2">Typische Symptome</p>
        <ul className="space-y-1">
          {c.symptoms.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-[#1E2535]">
              <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#AC8F52]" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 border-t border-[#E2E4E7]">
        <p className="text-xs text-[#8C939B] leading-relaxed">{c.treatment}</p>
      </div>

      {c.urgent && (
        <div className="px-3 py-2 rounded-lg bg-[#1E2535]/5 border border-[#1E2535]/10">
          <p className="text-xs font-medium text-[#1E2535]">Neurologische Symptome? Bitte zeitnah Termin vereinbaren.</p>
        </div>
      )}

      <Link
        to="/aerzte"
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#AC8F52] hover:gap-2.5 transition-all duration-200"
      >
        Spezialisten ansehen
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

function PageFooter() {
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

function BeschwerdenPage() {
  const { ref: heroRef, style: heroStyle } = useFadeUp(0);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader />

      <main>
        {/* Hero */}
        <section className="bg-[#1E2535] py-20 lg:py-28 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div ref={heroRef} style={heroStyle} className="max-w-3xl">
              <SectionLabel>Rückenerkrankungen</SectionLabel>
              <h1 className="mt-4 font-display text-5xl lg:text-6xl font-semibold leading-tight text-white">
                Was führt Sie{" "}
                <em className="font-display italic font-normal text-[#AC8F52]">zu uns?</em>
              </h1>
              <p className="mt-6 text-lg text-[#8C939B] leading-relaxed max-w-xl">
                Finden Sie Ihr Beschwerdebild und erfahren Sie, wie unsere Spezialisten helfen können — ohne unnötige Operationen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {CONDITIONS.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="px-4 py-2 rounded-full border border-white/20 text-sm text-white/80 hover:border-[#AC8F52] hover:text-white transition-colors duration-200"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stat strip */}
        <section className="bg-[#263044] border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {[
                ["90 %", "ohne Operation behandelt"],
                ["6", "häufige Beschwerdebilder"],
                ["12", "Spezialisten im Team"],
                ["5 Werktage", "bis zum Ersttermin"],
              ].map(([n, l]) => (
                <div key={l} className="py-6 px-6 text-center">
                  <p className="font-display text-2xl font-semibold text-[#AC8F52]">{n}</p>
                  <p className="mt-1 text-xs text-[#8C939B]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-12">
              <SectionLabel>Behandlungsgebiete</SectionLabel>
              <h2 className="mt-3 font-display text-4xl font-semibold text-[#1E2535]">
                Sechs Beschwerdebilder,<br />ein Ziel: Ihr Wohlbefinden
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CONDITIONS.map((c, i) => (
                <div key={c.id} id={c.id}>
                  <ConditionCard c={c} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiator */}
        <section className="bg-white border-y border-[#E2E4E7] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="lg:flex lg:items-center lg:gap-16">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <img
                  src={thumbBandscheibe.url}
                  alt="Diagnostik am WZAS"
                  className="w-full rounded-2xl object-cover aspect-[4/3]"
                />
              </div>
              <div className="lg:w-1/2">
                <SectionLabel>Unser Ansatz</SectionLabel>
                <h2 className="mt-4 font-display text-4xl font-semibold text-[#1E2535] leading-tight">
                  Konservative Behandlung{" "}
                  <em className="font-display italic font-normal">zuerst</em>
                </h2>
                <p className="mt-5 text-[#4A5568] leading-relaxed">
                  Am Wirbelsäulenzentrum am Stiglmaierplatz prüfen wir zuerst alle nicht-operativen Möglichkeiten. 90 % unserer Patienten werden erfolgreich ohne Operation behandelt.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Ganzheitliche Diagnose vor jeder Therapieentscheidung",
                    "Bildgebungsgestützte Injektionsverfahren (MRT/CT/Ultraschall)",
                    "Operation nur wenn medizinisch wirklich notwendig",
                    "Nachsorge und Rehabilitation durch dasselbe Spezialistenteam",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1E2535]">
                      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#AC8F52]/15 flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="none" stroke="#AC8F52" strokeWidth="2" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
                >
                  Termin vereinbaren
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-[#1E2535] py-16 lg:py-20 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
            <SectionLabel>Nächster Schritt</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white">Bereit für Ihren Termin?</h2>
            <p className="mt-4 text-[#8C939B] max-w-lg mx-auto">
              Ersttermine meist innerhalb von 5 Werktagen. Keine Überweisung für die meisten Beschwerden erforderlich.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
              >
                Online buchen
              </a>
              <a
                href="tel:+498954343030"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +49 (0)89-54 34 30 30
              </a>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
