import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { doctors as allDoctors } from "@/lib/doctors";
import logoAsset from "@/assets/wzas/logo.png.asset.json";

import heroBgAsset from "@/assets/wzas/hero-consultation.webp.asset.json";
import drMedele from "@/assets/wzas/dr-medele.webp.asset.json";
import drEroes from "@/assets/wzas/dr-eroes.webp.asset.json";
import drHo from "@/assets/wzas/dr-ho.jpg.asset.json";
import vortraegeImg from "@/assets/wzas/vortraege.webp.asset.json";
import thumbBandscheibe from "@/assets/wzas/thumb-bandscheibe.webp.asset.json";
import aktuellesImg from "@/assets/wzas/aktuelles.jpg.asset.json";
import focusImg from "@/assets/wzas/focus.jpeg.asset.json";
import isoImg from "@/assets/wzas/iso.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WZAS · Wirbelsäulenzentrum am Stiglmaierplatz München" },
      {
        name: "description",
        content:
          "Rückengesundheit für München. 20 Jahre Erfahrung, 12 Spezialisten. Konservative Behandlung zuerst — Operation nur wenn nötig.",
      },
      { property: "og:title", content: "WZAS · Wirbelsäulenzentrum am Stiglmaierplatz" },
      {
        property: "og:description",
        content: "Spezialisten für Wirbelsäule und Rücken in München. Termin meist innerhalb von 5 Werktagen.",
      },
    ],
  }),
  component: Home,
});

const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─── Scroll animation hook ─────────────────────────────────────── */

function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVis(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
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

/* ─── Logo ──────────────────────────────────────────────────────── */

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoAsset.url}
        alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz"
        className={`h-11 w-auto ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links: [string, string][] = [
    ["Rückenerkrankungen", "#beschwerden"],
    ["Ärzteteam", "/aerzte"],
    ["Behandlungen", "#weg"],
    ["Aktuelles", "#aktuelles"],
  ];
  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link
                key={label}
                to={href as "/aerzte"}
                className="relative text-sm font-medium text-[#1E2535] transition-colors hover:text-[#AC8F52] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#AC8F52] after:transition-[width] hover:after:w-full after:duration-200"
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="relative text-sm font-medium text-[#1E2535] transition-colors hover:text-[#AC8F52] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#AC8F52] after:transition-[width] hover:after:w-full after:duration-200"
              >
                {label}
              </a>
            )
          )}
        </nav>
        <div className="hidden lg:block">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535]"
            style={{ transition: `filter 150ms ${EASE}, transform 160ms ${EASE}` }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
          >
            Termin vereinbaren
          </a>
        </div>
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[#1E2535]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#E2E4E7] bg-white px-5 py-4 space-y-3">
          {links.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link key={label} to={href as "/aerzte"} className="block text-sm font-medium text-[#1E2535]">
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className="block text-sm font-medium text-[#1E2535]">
                {label}
              </a>
            )
          )}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="block text-center rounded-full bg-[#AC8F52] px-5 py-3 text-sm font-semibold text-[#1E2535]"
          >
            Termin vereinbaren
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */

function Hero() {
  const chips = ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Nach OP"];
  return (
    <section className="relative bg-[#1E2535] text-white overflow-hidden isolate">
      {/* Background image */}
      <img
        src={heroBgAsset.url}
        alt="Ärztliches Beratungsgespräch mit Wirbelsäulenmodell im Wirbelsäulenzentrum am Stiglmaierplatz"
        className="absolute inset-0 h-full w-full object-cover object-center -z-10"
        loading="eager"
        fetchPriority="high"
      />
      {/* Overlays: dark base + left gradient for text legibility */}
      <div className="absolute inset-0 -z-10 bg-[#1E2535]/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1E2535]/95 via-[#1E2535]/70 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] -z-10"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-14 lg:pt-24 lg:pb-48 lg:min-h-[85vh] grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AC8F52] flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            <span className="min-w-0">Wirbelsäulenzentrum am Stiglmaierplatz · München</span>
          </p>
          <h1
            className="mt-6 leading-[1.02] tracking-tight text-white font-display"
            style={{ fontSize: "clamp(2.6rem, 7.5vw, 5.8rem)", fontWeight: 500 }}
          >
            Rücken-
            <br />
            <em className="italic" style={{ fontWeight: 400 }}>
              gesundheit
            </em>
            <br />
            für München.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#D8DBE2] leading-relaxed max-w-xl whitespace-pre-line">
            20 Jahre Erfahrung.{"\u00a0"}{"\n"}
            12 Spezialisten.{"\u00a0"}{"\n"}
            Konservative Behandlung zuerst{"\u00a0"}{"\n"}
            Operation nur wenn nötig.
          </p>
          <div className="mt-10">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#B8BEC6] mb-3">
              Was führt Sie zu uns?
            </p>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c}
                  className="rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-white/90 hover:border-white/60 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535]"
              style={{ transition: `filter 150ms ${EASE}, transform 160ms ${EASE}` }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
            >
              Termin vereinbaren
            </a>
            <a
              href="#beschwerden"
              className="inline-flex items-center rounded-full border border-white/40 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors duration-200"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
        <div aria-hidden className="hidden lg:block" />
      </div>


      {/* Stats bar */}
      <div className="absolute inset-x-0 bottom-0 bg-[#1E2535]/90 backdrop-blur border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {(
            [
              ["30.000+", "Patienten pro Jahr"],
              ["90%", "ohne Operation behandelt"],
              ["20+", "Jahre Erfahrung"],
              ["12", "Wirbelsäulenspezialisten"],
            ] as [string, string][]
          ).map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-2xl md:text-3xl text-[#AC8F52]" style={{ fontWeight: 600 }}>
                {n}
              </div>
              <div className="text-xs md:text-sm text-[#C8CBD2] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section label ─────────────────────────────────────────────── */

function SectionLabel({ children, gold = true }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p
      className={`text-[11px] font-medium tracking-[0.2em] uppercase flex items-center gap-2 ${
        gold ? "text-[#AC8F52]" : "text-[#8C939B]"
      }`}
    >
      {gold && <span className="inline-block w-5 h-px bg-[#AC8F52]" />}
      {children}
    </p>
  );
}

/* ─── Beschwerden ───────────────────────────────────────────────── */

const ConditionIcons: Record<string, React.ReactNode> = {
  akut: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  chronisch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  bandscheibe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4" />
      <path d="M2 12V8c0-2.21 4.48-4 10-4s10 1.79 10 4v4" />
    </svg>
  ),
  ischias: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8.56 2.9A7 7 0 0 1 19 9v4l3 3-3 3v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2l-3-3 3-3V9a7 7 0 0 1 .14-.9" />
      <path d="M9 18h6" />
    </svg>
  ),
  reha: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z" />
      <path d="M7 21.7A9 9 0 0 1 3 12" />
      <path d="M17 21.7A9 9 0 0 0 21 12" />
      <path d="M12 3a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z" />
    </svg>
  ),
  sport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="13" cy="4" r="2" />
      <path d="M7 21l3-6 2 2 3-8 4 4" />
      <path d="M3 21h18" />
    </svg>
  ),
};

function BeschwerdenCard({
  iconKey,
  name,
  sub,
  delay,
}: {
  iconKey: string;
  name: string;
  sub: string;
  delay: number;
}) {
  const { ref, style } = useFadeUp(delay);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        ...style,
        backgroundColor: hovered ? "#FAFAF8" : "#FFFFFF",
        transition: `${style.transition}, background-color 200ms ${EASE}`,
      }}
      className="p-8 flex flex-col gap-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-10 h-10 rounded-lg bg-[#AC8F52]/10 flex items-center justify-center text-[#AC8F52]">
        {ConditionIcons[iconKey]}
      </div>
      <div>
        <h3
          className="font-display italic text-[#1E2535] leading-snug"
          style={{ fontSize: "1.25rem", fontWeight: 500 }}
        >
          {name}
        </h3>
        <p className="mt-2 text-sm text-[#8C939B] leading-relaxed">{sub}</p>
      </div>
      <a href="#" className="mt-auto text-sm font-semibold text-[#AC8F52] hover:underline underline-offset-2">
        Behandlungsoptionen ansehen →
      </a>
    </div>
  );
}

function Beschwerden() {
  const items = [
    { iconKey: "akut", name: "Akuter Rückenschmerz", sub: "Plötzlicher Beginn · Verletzung · Muskelkrampf" },
    { iconKey: "chronisch", name: "Chronische Rückenschmerzen", sub: "3+ Monate · Wiederkehrend · Degenerativ" },
    { iconKey: "bandscheibe", name: "Bandscheibenvorfall", sub: "L4/L5 · L5/S1 · Zervikal" },
    { iconKey: "ischias", name: "Ischias / Lumboischialgie", sub: "Ausstrahlende Schmerzen · Beinschwäche" },
    { iconKey: "reha", name: "Reha nach Operation", sub: "Rehabilitation · Nachsorge" },
    { iconKey: "sport", name: "Sport- & Aktivverletzungen", sub: "Sportler · Hochbelastende Aktivität" },
  ];
  const { ref, style } = useFadeUp(0);
  return (
    <section id="beschwerden" className="bg-[#F8F8F6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style}>
          <SectionLabel>Behandlungsgebiete</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            Was führt <em className="italic" style={{ fontWeight: 400 }}>Sie zu uns?</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">
            Finden Sie Ihr Beschwerdebild und erfahren Sie, wie unsere Spezialisten helfen können — ohne unnötige Operationen.
          </p>
        </div>
        {/* Editorial separator grid — gap-px creates hairline dividers */}
        <div className="mt-12 grid gap-px bg-[#E2E4E7] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <BeschwerdenCard key={item.iconKey} {...item} delay={150 + i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Weg ───────────────────────────────────────────────────────── */

function WegStep({
  n,
  title,
  desc,
  delay,
  isLast,
}: {
  n: string;
  title: string;
  desc: string;
  delay: number;
  isLast: boolean;
}) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style} className="relative bg-[#263044] rounded-xl p-8 border-t-2 border-[#AC8F52]">
      <div
        className="font-display italic text-[#AC8F52] leading-none mb-6"
        style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 400, opacity: 0.65 }}
      >
        {n}
      </div>
      <h3 className="text-lg font-semibold text-white leading-snug">{title}</h3>
      <p className="mt-3 text-sm text-[#C8CBD2] leading-relaxed">{desc}</p>
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-4 z-10 text-[#AC8F52]/40 text-xl">→</div>
      )}
    </div>
  );
}

function Weg() {
  const steps = [
    {
      n: "01",
      title: "Beschwerdebild wählen",
      desc: "Suchen oder stöbern Sie nach Symptomen — unsere Übersicht hilft Ihnen zu verstehen, welche Behandlungsoptionen für Ihren Fall geeignet sind.",
    },
    {
      n: "02",
      title: "Den richtigen Spezialisten finden",
      desc: "Filtern Sie unser Team aus 12 Spezialisten nach Fachgebiet. Jedes Profil zeigt die behandelten Erkrankungen und den Behandlungsansatz.",
    },
    {
      n: "03",
      title: "In 60 Sekunden buchen",
      desc: "Nutzen Sie unser Online-Buchungssystem und wählen Sie einen passenden Termin. Ersttermine meist innerhalb von 5 Werktagen. Kein Anruf nötig.",
    },
  ];
  const { ref: headRef, style: headStyle } = useFadeUp(0);
  return (
    <section id="weg" className="relative bg-[#1E2535] py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel gold={false}>Ihr Weg zur Besserung</SectionLabel>
          <h2
            className="mt-4 font-display text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            Vom ersten Klick <em className="italic" style={{ fontWeight: 400 }}>zum Termin</em>
          </h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6 relative">
          {steps.map((step, i) => (
            <WegStep key={step.n} {...step} delay={200 + i * 100} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Kompetenzzentrum ──────────────────────────────────────────── */

function Kompetenzzentrum() {
  const { ref, style } = useFadeUp(0);
  const partners = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52]">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
      ),
      name: "Radiologiezentrum am Stiglmaierplatz",
      short: "MRT · CT · Neuroradiologie direkt vor Ort",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52]">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      name: "Orthopädie München-Schwabing",
      short: "Arthrose · Knie · Hüfte · Schulter",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52]">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
      ),
      name: "Handchirurgie am Stiglmaierplatz",
      short: "Hand · Handgelenk · Unterarm",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52]">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      name: "Wirbelsäulenzentrum im Oberland",
      short: "Schwester­praxis Penzberg · Bayern",
    },
  ];
  return (
    <section className="bg-white border-y border-[#E2E4E7] py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style} className="lg:flex lg:items-start lg:gap-16">
          {/* Left: benefit message */}
          <div className="lg:w-80 shrink-0 mb-10 lg:mb-0">
            <SectionLabel>Kompetenzzentrum</SectionLabel>
            <h2
              className="mt-4 font-display text-[#1E2535] leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 500 }}
            >
              Alles unter{" "}
              <em className="italic" style={{ fontWeight: 400 }}>
                einem Dach
              </em>
            </h2>
            <p className="mt-3 text-sm text-[#8C939B] leading-relaxed max-w-xs">
              Wirbelsäulenchirurgie, Radiologie und Orthopädie arbeiten hier Hand in Hand — kürzere Wege, schnellere Diagnosen, lückenlose Behandlung ohne externe Termine.
            </p>
          </div>
          {/* Right: partner grid */}
          <div className="grid gap-px bg-[#E2E4E7] sm:grid-cols-2 lg:grid-cols-4 flex-1">
            {partners.map((p) => (
              <div key={p.name} className="bg-white p-6 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#AC8F52]/10 flex items-center justify-center">
                  {p.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E2535] leading-snug">{p.name}</p>
                  <p className="mt-1 text-xs text-[#8C939B] leading-relaxed">{p.short}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Team ──────────────────────────────────────────────────────── */

const doctorPhotoMap: Record<string, string> = {
  "dr-medele": drMedele.url,
  "dr-eroes": drEroes.url,
  "dr-ho": drHo.url,
};

function DoctorCard({ d, delay }: { d: (typeof allDoctors)[0]; delay: number }) {
  const { ref, style } = useFadeUp(delay);
  const photo = d.photo || doctorPhotoMap[d.slug] || null;
  return (
    <div ref={ref} style={style} className="bg-white overflow-hidden group">
      <div className="aspect-[3/4] bg-[#263044] overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={d.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span
              className="font-display italic text-[#AC8F52]"
              style={{ fontSize: "3rem", fontWeight: 400 }}
            >
              {d.initials}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 border-t-2 border-[#E2E4E7] group-hover:border-[#AC8F52] transition-colors duration-300">
        <h3
          className="font-display italic text-[#1E2535] leading-snug"
          style={{ fontSize: "1.3rem", fontWeight: 500 }}
        >
          {d.name}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#AC8F52] font-medium">{d.role}</p>
        <ul className="mt-4 space-y-1 text-sm text-[#8C939B]">
          {d.focus.slice(0, 3).map((p) => (
            <li key={p}>· {p}</li>
          ))}
        </ul>
        <Link
          to="/aerzte/$slug"
          params={{ slug: d.slug }}
          className="mt-6 block text-center border border-[#1E2535] py-2.5 text-sm font-semibold text-[#1E2535] hover:bg-[#1E2535] hover:text-white transition-colors duration-200"
        >
          Profil ansehen
        </Link>
      </div>
    </div>
  );
}

function Team() {
  const filters = ["Alle", "Wirbelsäulenchirurgie", "Schmerztherapie", "Neurochirurgie", "Orthopädie"] as const;
  const [active, setActive] = useState<(typeof filters)[number]>("Alle");
  const { ref: headRef, style: headStyle } = useFadeUp(0);

  const doctors = allDoctors
    .filter((d) => active === "Alle" || d.specialties.includes(active as never))
    .slice(0, 3);

  return (
    <section id="team" className="bg-[#F8F8F6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel>Unser Ärzteteam</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            12 Spezialisten, <em className="italic" style={{ fontWeight: 400 }}>ein Ziel</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">
            Jeder Patient wird von Anfang an dem richtigen Spezialisten zugeordnet.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active === f
                  ? "bg-[#1E2535] text-white"
                  : "border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52] hover:text-[#AC8F52]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {/* Editorial separator grid */}
        <div className="mt-12 grid gap-px bg-[#E2E4E7] md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <DoctorCard key={d.slug} d={d} delay={150 + i * 100} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/aerzte"
            className="text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52] transition-colors"
          >
            Alle {allDoctors.length} Spezialisten ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Termin ────────────────────────────────────────────────────── */

function Termin() {
  const { ref, style } = useFadeUp(0);
  return (
    <section id="termin" className="relative bg-[#1E2535] py-24 border-t-4 border-[#AC8F52] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid gap-10 lg:grid-cols-2">
        <div ref={ref} style={style}>
          <h2
            className="font-display text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            Wir sind <em className="italic" style={{ fontWeight: 400 }}>für Sie da.</em>
          </h2>
          <p className="mt-4 text-[#C8CBD2] leading-relaxed max-w-lg">
            Die meisten Ersttermine sind innerhalb von 5 Werktagen verfügbar. Für die meisten Beschwerden ist keine Überweisung erforderlich.
          </p>
          <div className="mt-8 rounded-xl bg-[#263044] p-7 border-t-2 border-[#AC8F52]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-[#AC8F52]" />
              Online buchen
            </p>
            <p className="mt-3 text-white font-semibold text-lg">Termin online vereinbaren</p>
            <p className="mt-2 text-sm text-[#8C939B]">Integriert über onlinerezeption.vercel.app</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535]"
              style={{ transition: `filter 150ms ${EASE}, transform 160ms ${EASE}` }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
            >
              Termin buchen
            </a>
          </div>
        </div>
        <div className="rounded-xl bg-[#263044] p-7">
          <h3 className="text-white font-semibold text-lg">Weitere Kontaktmöglichkeiten</h3>
          <div className="mt-6 space-y-6 text-sm">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.87 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6.15 6.15l1.1-1.1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
                primary: "+49 (0)89-54 34 30 30",
                secondary: "Mo–Fr · 08:00–18:00 Uhr",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
                primary: "info@wzas.de",
                secondary: "Antwort innerhalb eines Werktags",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                primary: "Nymphenburger Str. 1",
                secondary: "80335 München",
              },
            ].map(({ icon, primary, secondary }) => (
              <div key={primary} className="flex gap-3">
                {icon}
                <div>
                  <div className="text-white">{primary}</div>
                  <div className="text-[#8C939B]">{secondary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Aktuelles ─────────────────────────────────────────────────── */

type AktuellesItem = {
  type: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  date: string;
  title: string;
  detail: string;
  image: string;
};

function AktuellesCard({ item, delay }: { item: AktuellesItem; delay: number }) {
  const { ref, style } = useFadeUp(delay);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        ...style,
        borderTopColor: hovered ? item.accentColor : "#E2E4E7",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
        transition: `${style.transition}, border-top-color 250ms ${EASE}, box-shadow 250ms ${EASE}`,
      }}
      className="bg-white border-t-2 overflow-hidden grid gap-0 md:grid-cols-[180px_1fr_auto] md:items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover aspect-[4/3] md:aspect-auto md:h-36"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: `transform 500ms ${EASE}`,
          }}
        />
      </div>
      <div className="px-6 py-5">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded"
            style={{ backgroundColor: item.badgeBg, color: item.badgeText }}
          >
            {item.type}
          </span>
          <span className="text-xs text-[#8C939B]">{item.date}</span>
        </div>
        <h3
          className="mt-2 font-display italic text-[#1E2535] leading-snug"
          style={{ fontSize: "1.15rem", fontWeight: 500 }}
        >
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-[#8C939B]">{item.detail}</p>
      </div>
      <a
        href="#"
        className="px-6 md:px-7 pb-5 md:pb-0 text-sm font-semibold whitespace-nowrap hover:underline underline-offset-2"
        style={{ color: item.accentColor }}
      >
        Mehr erfahren →
      </a>
    </div>
  );
}

function Aktuelles() {
  const { ref: headRef, style: headStyle } = useFadeUp(0);
  const items: AktuellesItem[] = [
    {
      type: "VORTRAG",
      accentColor: "#2563EB",
      badgeBg: "rgba(37,99,235,0.1)",
      badgeText: "#1d4ed8",
      date: "15. September 2026",
      title: "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?",
      detail: "Gasteig HP8 · München · 19:00 Uhr",
      image: vortraegeImg.url,
    },
    {
      type: "VIDEO",
      accentColor: "#7C3AED",
      badgeBg: "rgba(124,58,237,0.1)",
      badgeText: "#6d28d9",
      date: "Online verfügbar",
      title: "Bandscheibenvorfall verstehen: Diagnose & Behandlung",
      detail: "45 Min. · Dr. med. Ralph Medele",
      image: thumbBandscheibe.url,
    },
    {
      type: "ARTIKEL",
      accentColor: "#059669",
      badgeBg: "rgba(5,150,105,0.1)",
      badgeText: "#047857",
      date: "Juli 2026",
      title: "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie",
      detail: "Fachbeitrag · Neurochirurgie aktuell",
      image: aktuellesImg.url,
    },
  ];
  return (
    <section id="aktuelles" className="bg-[#F8F8F6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel>Aktuelles</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            Vorträge, Veranstaltungen{" "}
            <em className="italic" style={{ fontWeight: 400 }}>
              & Wissen
            </em>
          </h2>
          <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">
            Bleiben Sie informiert — unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen und Fachbeiträgen.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-px bg-[#E2E4E7]">
          {items.map((item, i) => (
            <AktuellesCard key={item.title} item={item} delay={150 + i * 100} />
          ))}
        </div>
        <div className="mt-10">
          <a href="#" className="text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52] transition-colors">
            Alle Veranstaltungen & Inhalte ansehen →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */

function Footer() {
  const cols = [
    {
      title: "Beschwerdebilder",
      items: ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Reha nach OP"],
    },
    {
      title: "Behandlungen",
      items: ["Konservative Therapie", "Minimalinvasiv", "Wirbelsäulenop.", "Schmerztherapie", "Rehabilitation"],
    },
    {
      title: "Über uns",
      items: ["Unser Team", "Die Praxis", "Leitbild & Werte", "Aktuelles", "Karriere"],
    },
    {
      title: "Für Patienten",
      items: ["Termin vereinbaren", "Häufige Fragen", "Barrierefreiheit", "Datenschutz"],
    },
  ];
  return (
    <footer className="bg-[#1E2535] border-t-2 border-[#AC8F52] text-[#C8CBD2]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo light />
          <div className="mt-5 space-y-1 text-sm text-[#8C939B]">
            <div>Nymphenburger Str. 1</div>
            <div>80335 München</div>
            <div className="mt-3">+49 (0)89-54 34 30 30</div>
            <div>info@wzas.de</div>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-semibold text-sm tracking-wide">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-[#8C939B]">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-[#AC8F52] transition-colors duration-200">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 flex flex-wrap items-center gap-8">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#8C939B]">Ausgezeichnet</span>
          <img src={focusImg.url} alt="Focus Top-Mediziner" className="h-14 w-auto bg-white/95 rounded p-2" />
          <img src={isoImg.url} alt="ISO 9001 zertifiziert" className="h-14 w-auto bg-white/95 rounded p-2" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#8C939B]">
          <div>© 2026 Wirbelsäulenzentrum am Stiglmaierplatz · Alle Rechte vorbehalten</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#AC8F52] transition-colors">Impressum</a>
            <a href="#" className="hover:text-[#AC8F52] transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-[#AC8F52] transition-colors">Barrierefreiheit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ──────────────────────────────────────────────────────── */

function Home() {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <main>
        <Hero />
        <Beschwerden />
        <Weg />
        <Kompetenzzentrum />
        <Team />
        <Termin />
        <Aktuelles />
      </main>
      <Footer />
    </div>
  );
}
