import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import clinicImg from "@/assets/wzas/clinic2.webp.asset.json";

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

export const Route = createFileRoute("/behandlungen")({
  head: () => ({
    meta: [
      { title: "Behandlungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Konservative Therapie, minimalinvasive Verfahren und Wirbelsäulenchirurgie am WZAS München. 90 % unserer Patienten werden ohne Operation behandelt." },
      { property: "og:title", content: "Behandlungen · WZAS München" },
    ],
  }),
  component: BehandlungenPage,
});

const CATEGORIES = [
  {
    id: "konservativ",
    number: "01",
    name: "Konservative Therapie",
    tagline: "Zuerst — immer",
    description:
      "Bevor wir operieren, schöpfen wir alle nicht-chirurgischen Möglichkeiten aus. Konservative Verfahren sind wirksam, schonend und für 90 % unserer Patienten ausreichend.",
    treatments: [
      { name: "Physiotherapie & Manuelle Therapie", detail: "Gezielte Übungen und manuelle Techniken zur Schmerzreduktion und Wiederherstellung der Beweglichkeit." },
      { name: "Schmerzmedikation", detail: "Individuelle medikamentöse Schmerztherapie — angepasst an Ihren Befund und Ihre Lebensumstände." },
      { name: "Wärme- & Kältetherapie", detail: "Komplementäre physikalische Therapien zur Muskelentspannung und Entzündungsreduktion." },
      { name: "Patientenedukation", detail: "Rückenschule, ergonomische Beratung und individuelle Empfehlungen für Beruf und Alltag." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: "minimalinvasiv",
    number: "02",
    name: "Minimalinvasive Verfahren",
    tagline: "Präzision statt Skalpell",
    description:
      "Bildgebungsgestützte Injektionen und minimalinvasive Eingriffe ermöglichen gezielte Behandlung mit minimaler Gewebetraumatisierung — oft ambulant und ohne Klinikaufenthalt.",
    treatments: [
      { name: "Periradikuläre Therapie (PRT)", detail: "Gezielte Injektion von Kortison und Lokalanästhetikum um den gereizten Nerv — unter CT- oder Durchleuchtungskontrolle." },
      { name: "Facetteninfiltration", detail: "Bildgebungsgestützte Injektion in die Wirbelgelenke bei Facettensyndrom und mechanischer Lumbalgie." },
      { name: "Intrathekale Schmerztherapie", detail: "Pumpen-gestützte Schmerztherapie für Patienten mit therapieresistenten chronischen Schmerzen." },
      { name: "Neuromodulation", detail: "Rückenmarkstimulation (SCS) bei neuropathischen Schmerzen — reversibel und regulierbar." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    id: "operativ",
    number: "03",
    name: "Operative Therapie",
    tagline: "Nur wenn wirklich nötig",
    description:
      "Wenn konservative und minimalinvasive Verfahren nicht ausreichen, stehen wir mit modernster Wirbelsäulenchirurgie bereit. Wir operieren nur, wenn keine bessere Alternative existiert.",
    treatments: [
      { name: "Mikrodiskektomie", detail: "Minimalinvasive Entfernung des Bandscheibenvorfalls unter dem Operationsmikroskop — kurzer Klinikaufenthalt, schnelle Genesung." },
      { name: "Dekompression bei Spinalkanalstenose", detail: "Erweiterung des verengten Wirbelkanals zur Entlastung der Nerven — oft als ambulanter Eingriff möglich." },
      { name: "Wirbelsäulenstabilisierung", detail: "Instrumentierte Fusion bei Instabilität oder Deformität — minimalinvasive Techniken reduzieren das Operationstrauma." },
      { name: "Tumorchirurgie", detail: "Spezialisierte Eingriffe bei Wirbelsäulentumoren in enger Zusammenarbeit mit Onkologie und Strahlentherapie." },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
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
          <Link to="/beschwerden" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Rückenerkrankungen</Link>
          <Link to="/aerzte" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Ärzteteam</Link>
          <Link to="/behandlungen" className="text-sm font-semibold text-[#AC8F52]">Behandlungen</Link>
          <Link to="/aktuelles" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Aktuelles</Link>
        </nav>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
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

function CategorySection({ cat, flip }: { cat: (typeof CATEGORIES)[number]; flip: boolean }) {
  const { ref, style } = useFadeUp(0);
  return (
    <section id={cat.id} className="py-16 lg:py-20 border-b border-[#E2E4E7] last:border-0">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style} className={`lg:flex lg:items-start lg:gap-16 ${flip ? "lg:flex-row-reverse" : ""}`}>
          {/* Text */}
          <div className="lg:w-2/5 mb-10 lg:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#1E2535] flex items-center justify-center text-[#AC8F52]">
                {cat.icon}
              </div>
              <span className="font-display text-5xl font-semibold text-[#E2E4E7]">{cat.number}</span>
            </div>
            <SectionLabel>{cat.tagline}</SectionLabel>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl font-semibold text-[#1E2535] leading-tight">
              {cat.name}
            </h2>
            <p className="mt-5 text-[#4A5568] leading-relaxed">{cat.description}</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#AC8F52] hover:gap-3 transition-all duration-200"
            >
              Termin vereinbaren
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Treatments */}
          <div className="lg:flex-1">
            <div className="grid gap-px bg-[#E2E4E7] sm:grid-cols-2">
              {cat.treatments.map((t) => (
                <div key={t.name} className="bg-white p-6 flex flex-col gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#AC8F52]" />
                  <p className="font-semibold text-[#1E2535]">{t.name}</p>
                  <p className="text-sm text-[#8C939B] leading-relaxed">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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

function BehandlungenPage() {
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
              <SectionLabel>Behandlungen</SectionLabel>
              <h1 className="mt-4 font-display text-5xl lg:text-6xl font-semibold leading-tight text-white">
                Zuerst{" "}
                <em className="font-display italic font-normal text-[#AC8F52]">konservativ.</em>
                <br />Operieren nur wenn nötig.
              </h1>
              <p className="mt-6 text-lg text-[#8C939B] leading-relaxed max-w-xl">
                90 % unserer Patienten werden ohne Operation erfolgreich behandelt. Unser dreistufiger Ansatz beginnt immer mit der schonendsten wirksamen Therapie.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {CATEGORIES.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-white/80 hover:border-[#AC8F52] hover:text-white transition-colors duration-200"
                  >
                    <span className="text-[#AC8F52] text-xs font-semibold">{c.number}</span>
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key stat */}
        <section className="bg-[#263044] border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {[
                ["90 %", "ohne Operation"],
                ["20+", "Jahre Erfahrung"],
                ["3", "Behandlungsstufen"],
                ["12", "Spezialisten"],
              ].map(([n, l]) => (
                <div key={l} className="py-6 px-6 text-center">
                  <p className="font-display text-2xl font-semibold text-[#AC8F52]">{n}</p>
                  <p className="mt-1 text-xs text-[#8C939B]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment categories */}
        <div className="bg-[#F8F8F6]">
          {CATEGORIES.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} flip={i % 2 === 1} />
          ))}
        </div>

        {/* Clinic image + process */}
        <section className="bg-white border-y border-[#E2E4E7] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="lg:flex lg:items-center lg:gap-16">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <SectionLabel>Ihr Weg bei uns</SectionLabel>
                <h2 className="mt-4 font-display text-4xl font-semibold text-[#1E2535] leading-tight">
                  Von der Diagnose<br />
                  <em className="font-display italic font-normal">zur Besserung</em>
                </h2>
                <div className="mt-8 space-y-6">
                  {[
                    { n: "01", t: "Erstgespräch & Diagnostik", d: "Ausführliche Anamnese, klinische Untersuchung und Auswertung vorliegender Befunde. Wir hören zu, bevor wir entscheiden." },
                    { n: "02", t: "Therapieplan", d: "Individueller, mehrstufiger Behandlungsplan — beginnend mit der schonendsten wirksamen Methode." },
                    { n: "03", t: "Behandlung & Begleitung", d: "Kontinuierliche Betreuung durch dasselbe Spezialistenteam vom ersten Tag bis zur vollständigen Genesung." },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-5">
                      <div className="shrink-0 w-10 h-10 rounded-full border-2 border-[#AC8F52] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#AC8F52]">{s.n}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1E2535]">{s.t}</p>
                        <p className="mt-1 text-sm text-[#8C939B] leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={clinicImg.url}
                  alt="WZAS Klinik"
                  className="w-full rounded-2xl object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1E2535] py-16 lg:py-20 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
            <SectionLabel>Nächster Schritt</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white">
              Welche Behandlung ist die richtige für mich?
            </h2>
            <p className="mt-4 text-[#8C939B] max-w-lg mx-auto">
              Vereinbaren Sie einen Termin. Unsere Spezialisten klären gemeinsam mit Ihnen, welche Therapie am besten zu Ihrer Situation passt.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
              >
                Online Termin buchen
              </a>
              <Link
                to="/beschwerden"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Zuerst Beschwerdebild ansehen →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
