import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const BASE = "https://www.wzas.de/wp-content/uploads";

const CONDITIONS = [
  { id: "rueckenschmerzen",       name: "Rückenschmerzen",                              photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-028.webp` },
  { id: "bandscheibenvorfall",    name: "Bandscheibenvorfall\n(Discusprolaps)",          photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-032.webp` },
  { id: "bandscheiben-deg",       name: "Bandscheiben-Degeneration\n(Osteochondrose)",  photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-054.webp` },
  { id: "wirbelkoerperfraktur",   name: "Wirbelkörperfraktur",                          photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-047.webp` },
  { id: "wirbelkanalverengung",   name: "Wirbelkanalverengung\n(Spinalkanalstenose)",   photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-029.webp` },
  { id: "wirbelgleiten",          name: "Wirbelgleiten\n(Spondylolisthesis)",            photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-056.webp` },
  { id: "iliosakralsyndrom",      name: "Iliosakralsyndrom\n(Kreuzdarmbeingelenk)",     photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-038.webp` },
  { id: "osteoporose",            name: "Osteoporose\n(Knochenschwund)",                photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-026.webp` },
  { id: "facettengelenksarthrose",name: "Facettengelenksarthrose\n(Spondylarthrose)",   photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-019.webp` },
];

const HERO_PHOTO = `${BASE}/2026/06/Header-WZAS-Rueckenerkrankungen.webp`;

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
      { name: "description", content: "Bandscheibenvorfall, Spinalkanalstenose, Spondylolisthesis und mehr — das WZAS München behandelt ein breites Spektrum an Rückenerkrankungen, konservativ wenn möglich, operativ wenn nötig." },
      { property: "og:title", content: "Rückenerkrankungen · WZAS München" },
    ],
  }),
  component: BeschwerdenPage,
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
          <Link to="/beschwerden" className="text-sm font-semibold text-[#AC8F52]">Rückenerkrankungen</Link>
          <Link to="/behandlungen" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Rückenbehandlungen</Link>
          <Link to="/aerzte" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Ärzteteam</Link>
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

function PhotoCard({ c, index }: { c: (typeof CONDITIONS)[number]; index: number }) {
  const { ref, style } = useFadeUp(index * 40);
  const [hovered, setHovered] = useState(false);
  const lines = c.name.split("\n");
  return (
    <div
      ref={ref}
      style={style}
      className="relative overflow-hidden aspect-[4/3] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${c.photo})`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: `transform 600ms ${EASE}`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Name */}
      <div className="absolute bottom-0 left-0 p-5">
        {lines.map((line, i) => (
          <p key={i} className={`text-white font-semibold leading-snug ${i === 0 ? "text-xl" : "text-base font-normal opacity-90"}`}>
            {line}
          </p>
        ))}
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

function BeschwerdenPage() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader />

      <main>
        {/* Hero — full-bleed photo like WZAS */}
        <section
          className="relative h-[55vh] min-h-[380px] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_PHOTO})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white leading-tight">
              Rückenerkrankungen
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 lg:py-16 bg-white">
          <div ref={introRef} style={introStyle} className="mx-auto max-w-4xl px-5 lg:px-8">
            <p className="text-lg text-[#4A5568] leading-relaxed">
              Rückenschmerzen gehören zu den häufigsten Beschwerden, mit denen Patienten das Wirbelsäulenzentrum am Stiglmaierplatz in München aufsuchen. Die Ursachen sind vielfältig: Bewegungsmangel bei sitzenden Tätigkeiten, einseitige körperliche Belastung, Übergewicht, Haltungsschäden und psychische Belastungen wie Stress. Diese Faktoren führen langfristig zu Veränderungen an den Wirbelsäulengelenken, den Bandscheiben und dem umliegenden Gewebe, was Schmerzen, Blockaden und Funktionsstörungen verursachen kann. Unser erfahrenes Team in München behandelt ein breites Spektrum an Rückenerkrankungen, konservativ wenn möglich, operativ wenn nötig.
            </p>
          </div>
        </section>

        {/* Photo card grid */}
        <section className="py-12 lg:py-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1E2535] mb-10">
              Unsere Schwerpunkte
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CONDITIONS.map((c, i) => (
                <PhotoCard key={c.id} c={c} index={i} />
              ))}
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
            <h2 className="font-display text-4xl font-semibold text-white">Bereit für Ihren Termin?</h2>
            <p className="mt-4 text-[#8C939B] max-w-lg mx-auto">
              Ersttermine meist innerhalb von 5 Werktagen. Konservative Behandlung wenn möglich, Operation wenn nötig.
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
