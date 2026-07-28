import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const BASE = "https://www.wzas.de/wp-content/uploads";

// 3 main categories with large photo cards
const CATEGORIES = [
  {
    id: "ohne-operation",
    name: "Verfahren ohne Operation",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-021.webp`,
  },
  {
    id: "minimalinvasiv",
    name: "Minimalinvasive Verfahren",
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-053.webp`,
  },
  {
    id: "chirurgie",
    name: "Wirbelsäulenchirurgie",
    photo: `${BASE}/2026/05/db640b7718e314a38996cce985205bc2.jpg`,
  },
];

// Individual treatment cards
const TREATMENTS = [
  {
    id: "infiltration",
    name: "Infiltrationstherapie",
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-052.webp`,
  },
  {
    id: "medikamentoes",
    name: "Medikamentöse Therapie",
    photo: `${BASE}/2026/06/Medikamentoese-Therapie-2.webp`,
  },
  {
    id: "mikrochirurgie",
    name: "Mikrochirurgische Verfahren",
    // reuse a relevant clinical photo as placeholder
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-053.webp`,
  },
  {
    id: "stabilisierung",
    name: "Stabilisierende Verfahren",
    photo: `${BASE}/2026/05/db640b7718e314a38996cce985205bc2.jpg`,
  },
];

const HERO_PHOTO = `${BASE}/2026/06/Header-Rueckenbehandlung.webp`;

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
      { title: "Rückenbehandlungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Konservative Therapie, minimalinvasive Verfahren und Wirbelsäulenchirurgie am WZAS München. Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig." },
      { property: "og:title", content: "Rückenbehandlungen · WZAS München" },
    ],
  }),
  component: BehandlungenPage,
});

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
          <Link to="/behandlungen" className="text-sm font-semibold text-[#AC8F52]">Rückenbehandlungen</Link>
          <Link to="/aerzte" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Ärzteteam</Link>
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

function PhotoCard({
  name,
  photo,
  index,
  large = false,
}: {
  name: string;
  photo: string;
  index: number;
  large?: boolean;
}) {
  const { ref, style } = useFadeUp(index * 40);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={style}
      className={`relative overflow-hidden cursor-pointer ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${photo})`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: `transform 600ms ${EASE}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 lg:p-6">
        <p className="text-white font-semibold text-xl leading-snug">{name}</p>
        <p className="mt-2 text-xs text-white/70 font-medium tracking-wide">Mehr lesen →</p>
      </div>
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

function BehandlungenPage() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader />

      <main>
        {/* Hero — full-bleed photo */}
        <section
          className="relative h-[55vh] min-h-[380px] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_PHOTO})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white leading-tight">
              Rückenbehandlungen
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 lg:py-16 bg-white">
          <div ref={introRef} style={introStyle} className="mx-auto max-w-4xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-5">
              Behandlungsmöglichkeiten im Überblick
            </h2>
            <p className="text-lg text-[#4A5568] leading-relaxed">
              Rückenschmerzen haben viele Ursachen und die Behandlung muss deshalb individuell sein. Im Wirbelsäulenzentrum am Stiglmaierplatz in München begleiten wir unsere Patienten vom ersten Gespräch bis zur Beschwerdefreiheit: mit einem ganzheitlichen Blick auf Körper und Befund, nicht nur auf das Symptom. Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig.
            </p>
            <p className="mt-5 text-lg text-[#4A5568] leading-relaxed">
              Wir denken in drei Stufen: Verfahren ohne Operation, minimalinvasive Eingriffe und Wirbelsäulenchirurgie. So stellen wir sicher, dass jeder Patient in München genau die Behandlung erhält, die seinem Befund entspricht.
            </p>
          </div>
        </section>

        {/* 3 category cards */}
        <section className="py-12 lg:py-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {CATEGORIES.map((cat, i) => (
                <PhotoCard key={cat.id} name={cat.name} photo={cat.photo} index={i} large />
              ))}
            </div>
          </div>
        </section>

        {/* Verfahren ohne Operation — sub-section */}
        <section className="pb-12 lg:pb-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-6 max-w-3xl">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-2">Verfahren ohne Operation</p>
              <p className="text-[#4A5568] leading-relaxed">
                Ziel unserer Behandlung ist es, die natürliche Beweglichkeit zu erhalten. Ob Infiltrationstherapie, medikamentöse Schmerztherapie oder minimalinvasiver Eingriff — wir finden den Weg, der Ihrer Situation am besten entspricht. Chirurgische Verfahren werden nur dann eingesetzt, wenn alle anderen Optionen ausgeschöpft sind.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TREATMENTS.map((t, i) => (
                <PhotoCard key={t.id} name={t.name} photo={t.photo} index={i} />
              ))}
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
            <h2 className="font-display text-4xl font-semibold text-white">
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
