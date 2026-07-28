import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { doctors as allDoctors } from "@/lib/doctors";
import { useLang, useT, type Lang } from "@/lib/lang";
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

import partnerRadiologie from "@/assets/wzas/partners/radiologie.png.asset.json";
import partnerOms from "@/assets/wzas/partners/oms.png.asset.json";
import partnerHand from "@/assets/wzas/partners/bl-handchirurgie.png.asset.json";
import partnerOberland from "@/assets/wzas/partners/wz-oberland.png.asset.json";
import partnerWz from "@/assets/wzas/partners/wz-stiglmaier.png.asset.json";

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

/* ─── Language toggle ───────────────────────────────────────────── */

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const btn = (l: Lang) =>
    `px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-full transition-colors ${
      lang === l ? "bg-[#1E2535] text-white" : "text-[#1E2535] hover:text-[#AC8F52]"
    }`;
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-[#E2E4E7] p-1 ${
        compact ? "" : ""
      }`}
      role="group"
      aria-label="Sprache auswählen / Choose language"
    >
      <button onClick={() => setLang("de")} className={btn("de")} aria-pressed={lang === "de"}>
        DE
      </button>
      <button onClick={() => setLang("en")} className={btn("en")} aria-pressed={lang === "en"}>
        EN
      </button>
    </div>
  );
}

/* ─── Nav ───────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useT({
    de: {
      links: [
        ["Rückenerkrankungen", "#beschwerden"],
        ["Ärzteteam", "/aerzte"],
        ["Behandlungen", "#weg"],
        ["Aktuelles", "#aktuelles"],
      ] as [string, string][],
      book: "Termin vereinbaren",
      menu: "Menü",
    },
    en: {
      links: [
        ["Spine conditions", "#beschwerden"],
        ["Our doctors", "/aerzte"],
        ["Treatments", "#weg"],
        ["News", "#aktuelles"],
      ] as [string, string][],
      book: "Book appointment",
      menu: "Menu",
    },
  });
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {t.links.map(([label, href]) =>
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
        <div className="hidden lg:flex items-center gap-4">
          <LangToggle />
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535]"
            style={{ transition: `filter 150ms ${EASE}, transform 160ms ${EASE}` }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
          >
            {t.book}
          </a>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <LangToggle />
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-[#1E2535]"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.menu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#E2E4E7] bg-white px-5 py-4 space-y-3">
          {t.links.map(([label, href]) =>
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
            {t.book}
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */

function Hero() {
  const t = useT({
    de: {
      kicker: "Wirbelsäulenzentrum am Stiglmaierplatz · München",
      h1a: "Rücken-",
      h1b: "gesundheit",
      h1c: "für München.",
      sub: "20 Jahre Erfahrung.\u00a0\n12 Spezialisten.\u00a0\nKonservative Behandlung zuerst\u00a0\nOperation nur wenn nötig.",
      chipsLabel: "Was führt Sie zu uns?",
      chips: ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Nach OP"],
      book: "Termin vereinbaren",
      more: "Mehr erfahren",
      alt: "Ärztliches Beratungsgespräch mit Wirbelsäulenmodell im Wirbelsäulenzentrum am Stiglmaierplatz",
      stats: [
        ["30.000+", "Patienten pro Jahr"],
        ["90%", "ohne Operation behandelt"],
        ["20+", "Jahre Erfahrung"],
        ["12", "Wirbelsäulenspezialisten"],
      ] as [string, string][],
    },
    en: {
      kicker: "Spine Center at Stiglmaierplatz · Munich",
      h1a: "Back-",
      h1b: "health",
      h1c: "for Munich.",
      sub: "20 years of experience.\u00a0\n12 specialists.\u00a0\nConservative treatment first —\u00a0\nsurgery only when necessary.",
      chipsLabel: "What brings you to us?",
      chips: ["Acute back pain", "Chronic pain", "Herniated disc", "Sciatica", "Post-surgery"],
      book: "Book appointment",
      more: "Learn more",
      alt: "Doctor consultation with a spine model at the Spine Center at Stiglmaierplatz",
      stats: [
        ["30,000+", "patients per year"],
        ["90%", "treated without surgery"],
        ["20+", "years of experience"],
        ["12", "spine specialists"],
      ] as [string, string][],
    },
  });
  return (
    <section className="relative bg-[#1E2535] text-white overflow-hidden isolate">
      <img
        src={heroBgAsset.url}
        alt={t.alt}
        className="absolute inset-0 h-full w-full object-cover object-center -z-10"
        loading="eager"
        fetchPriority="high"
      />
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
            <span className="min-w-0">{t.kicker}</span>
          </p>
          <h1
            className="mt-6 leading-[1.02] tracking-tight text-white font-display"
            style={{ fontSize: "clamp(2.6rem, 7.5vw, 5.8rem)", fontWeight: 500 }}
          >
            {t.h1a}
            <br />
            <em style={{ fontStyle: "normal", fontWeight: 600 }}>
              {t.h1b}
            </em>
            <br />
            {t.h1c}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#D8DBE2] leading-relaxed max-w-xl whitespace-pre-line">
            {t.sub}
          </p>
          <div className="mt-10">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#B8BEC6] mb-3">
              {t.chipsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.chips.map((c) => (
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
              {t.book}
            </a>
            <a
              href="#beschwerden"
              className="inline-flex items-center rounded-full border border-white/40 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors duration-200"
            >
              {t.more}
            </a>
          </div>
          <p className="mt-6 text-xs text-[#8C939B] flex items-center gap-2 flex-wrap">
            <span className="inline-block w-4 h-px bg-[#8C939B]" />
            Se habla español
            <span className="text-white/20">·</span>
            English spoken
            <span className="text-white/20">·</span>
            Magyar
            <span className="text-white/20">·</span>
            廣東話
          </p>
        </div>
        <div aria-hidden className="hidden lg:block" />
      </div>

      <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0 bg-[#1E2535]/90 backdrop-blur border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {t.stats.map(([n, l]) => (
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
  cta,
  delay,
}: {
  iconKey: string;
  name: string;
  sub: string;
  cta: string;
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
          className="font-display text-[#1E2535] leading-snug"
          style={{ fontSize: "1.25rem", fontWeight: 500 }}
        >
          {name}
        </h3>
        <p className="mt-2 text-sm text-[#8C939B] leading-relaxed">{sub}</p>
      </div>
      <a href="#" className="mt-auto text-sm font-semibold text-[#AC8F52] hover:underline underline-offset-2">
        {cta} →
      </a>
    </div>
  );
}

function Beschwerden() {
  const t = useT({
    de: {
      label: "Behandlungsgebiete",
      h2a: "Was führt ",
      h2b: "Sie zu uns?",
      lead: "Finden Sie Ihr Beschwerdebild und erfahren Sie, wie unsere Spezialisten helfen können — ohne unnötige Operationen.",
      cta: "Behandlungsoptionen ansehen",
      items: [
        { iconKey: "akut", name: "Akuter Rückenschmerz", sub: "Plötzlicher Beginn · Verletzung · Muskelkrampf" },
        { iconKey: "chronisch", name: "Chronische Rückenschmerzen", sub: "3+ Monate · Wiederkehrend · Degenerativ" },
        { iconKey: "bandscheibe", name: "Bandscheibenvorfall", sub: "L4/L5 · L5/S1 · Zervikal" },
        { iconKey: "ischias", name: "Ischias / Lumboischialgie", sub: "Ausstrahlende Schmerzen · Beinschwäche" },
        { iconKey: "reha", name: "Reha nach Operation", sub: "Rehabilitation · Nachsorge" },
        { iconKey: "sport", name: "Sport- & Aktivverletzungen", sub: "Sportler · Hochbelastende Aktivität" },
      ],
    },
    en: {
      label: "Areas of treatment",
      h2a: "What brings ",
      h2b: "you to us?",
      lead: "Find your condition and see how our specialists can help — without unnecessary surgery.",
      cta: "View treatment options",
      items: [
        { iconKey: "akut", name: "Acute back pain", sub: "Sudden onset · injury · muscle spasm" },
        { iconKey: "chronisch", name: "Chronic back pain", sub: "3+ months · recurring · degenerative" },
        { iconKey: "bandscheibe", name: "Herniated disc", sub: "L4/L5 · L5/S1 · Cervical" },
        { iconKey: "ischias", name: "Sciatica / lumboischialgia", sub: "Radiating pain · leg weakness" },
        { iconKey: "reha", name: "Post-surgery rehab", sub: "Rehabilitation · aftercare" },
        { iconKey: "sport", name: "Sports & activity injuries", sub: "Athletes · high-load activity" },
      ],
    },
  });
  const { ref, style } = useFadeUp(0);
  return (
    <section id="beschwerden" className="bg-[#F8F8F6] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style}>
          <SectionLabel>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">{t.lead}</p>
        </div>
        <div className="mt-12 grid gap-px bg-[#E2E4E7] sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <BeschwerdenCard key={item.iconKey} {...item} cta={t.cta} delay={150 + i * 80} />
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
        className="font-display text-[#AC8F52] leading-none mb-6"
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
  const t = useT({
    de: {
      label: "Ihr Weg zur Besserung",
      h2a: "Vom ersten Klick ",
      h2b: "zum Termin",
      steps: [
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
      ],
    },
    en: {
      label: "Your path to recovery",
      h2a: "From first click ",
      h2b: "to appointment",
      steps: [
        {
          n: "01",
          title: "Pick your condition",
          desc: "Search or browse by symptom — our overview helps you understand which treatment options fit your case.",
        },
        {
          n: "02",
          title: "Find the right specialist",
          desc: "Filter our 12-specialist team by expertise. Each profile shows the conditions treated and the treatment approach.",
        },
        {
          n: "03",
          title: "Book in 60 seconds",
          desc: "Use our online booking system and pick a time that suits you. Most first appointments within 5 working days. No phone call needed.",
        },
      ],
    },
  });
  const { ref: headRef, style: headStyle } = useFadeUp(0);
  return (
    <section id="weg" className="relative bg-[#1E2535] py-16 lg:py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel gold={false}>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6 relative">
          {t.steps.map((step, i) => (
            <WegStep key={step.n} {...step} delay={200 + i * 100} isLast={i === t.steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Kompetenzzentrum ──────────────────────────────────────────── */

function Kompetenzzentrum() {
  const { ref, style } = useFadeUp(0);
  const t = useT({
    de: {
      label: "Kompetenzzentrum",
      h2a: "Alles unter ",
      h2b: "einem Dach",
      lead: "Wirbelsäulenchirurgie, Radiologie und Orthopädie arbeiten hier Hand in Hand — kürzere Wege, schnellere Diagnosen, lückenlose Behandlung ohne externe Termine.",
      partners: [
        { logo: partnerWz.url, alt: "Wirbelsäulenzentrum am Stiglmaierplatz", name: "Wirbelsäulenzentrum am Stiglmaierplatz", short: "Wirbelsäulenchirurgie · Schmerztherapie" },
        { logo: partnerRadiologie.url, alt: "Radiologie am Stiglmaierplatz", name: "Radiologie am Stiglmaierplatz", short: "MRT · CT · Neuroradiologie vor Ort" },
        { logo: partnerOms.url, alt: "Orthopädie München-Schwabing", name: "Orthopädie München-Schwabing", short: "Arthrose · Knie · Hüfte · Schulter" },
        { logo: partnerHand.url, alt: "BL Handchirurgie Bayern", name: "BL Handchirurgie Bayern", short: "Hand · Handgelenk · Unterarm" },
        { logo: partnerOberland.url, alt: "Wirbelsäulenzentrum Oberland", name: "Wirbelsäulenzentrum Oberland", short: "Schwesterpraxis · Bayern" },
      ],
    },
    en: {
      label: "Competence network",
      h2a: "Everything under ",
      h2b: "one roof",
      lead: "Spine surgery, radiology and orthopaedics work hand in hand — shorter distances, faster diagnostics and seamless care without outside appointments.",
      partners: [
        { logo: partnerWz.url, alt: "Spine Center at Stiglmaierplatz", name: "Spine Center at Stiglmaierplatz", short: "Spine surgery · pain therapy" },
        { logo: partnerRadiologie.url, alt: "Radiology at Stiglmaierplatz", name: "Radiology at Stiglmaierplatz", short: "MRI · CT · neuroradiology on site" },
        { logo: partnerOms.url, alt: "Orthopaedics Munich-Schwabing", name: "Orthopaedics Munich-Schwabing", short: "Arthritis · knee · hip · shoulder" },
        { logo: partnerHand.url, alt: "BL Hand Surgery Bavaria", name: "BL Hand Surgery Bavaria", short: "Hand · wrist · forearm" },
        { logo: partnerOberland.url, alt: "Spine Center Oberland", name: "Spine Center Oberland", short: "Sister practice · Bavaria" },
      ],
    },
  });
  return (
    <section className="bg-white border-y border-[#E2E4E7] py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style} className="lg:flex lg:items-start lg:gap-16">
          <div className="lg:w-80 shrink-0 mb-10 lg:mb-0">
            <SectionLabel>{t.label}</SectionLabel>
            <h2
              className="mt-4 font-display text-[#1E2535] leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 500 }}
            >
              {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
            </h2>
            <p className="mt-3 text-sm text-[#8C939B] leading-relaxed max-w-xs">{t.lead}</p>
          </div>
          <div className="grid gap-px bg-[#E2E4E7] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 flex-1">
            {t.partners.map((p) => (
              <div key={p.name} className="bg-white p-6 flex flex-col items-center text-center gap-4 min-h-[180px]">
                <div className="h-14 w-full flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={p.alt}
                    className="max-h-14 max-w-[160px] w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-auto">
                  <p className="text-xs font-semibold text-[#1E2535] leading-snug">{p.name}</p>
                  <p className="mt-1 text-[11px] text-[#8C939B] leading-relaxed">{p.short}</p>
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

function DoctorCard({ d, delay, cta }: { d: (typeof allDoctors)[0]; delay: number; cta: string }) {
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
              className="font-display text-[#AC8F52]"
              style={{ fontSize: "3rem", fontWeight: 400 }}
            >
              {d.initials}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 border-t-2 border-[#E2E4E7] group-hover:border-[#AC8F52] transition-colors duration-300">
        <h3
          className="font-display text-[#1E2535] leading-snug"
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
        {d.languages && d.languages.filter((l) => l !== "Deutsch").length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {d.languages
              .filter((l) => l !== "Deutsch")
              .map((l) => (
                <span
                  key={l}
                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#AC8F52]/10 text-[#AC8F52] tracking-wide"
                >
                  {l}
                </span>
              ))}
          </div>
        )}
        <Link
          to="/aerzte/$slug"
          params={{ slug: d.slug }}
          className="mt-6 block text-center border border-[#1E2535] py-2.5 text-sm font-semibold text-[#1E2535] hover:bg-[#1E2535] hover:text-white transition-colors duration-200"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}

function Team() {
  const t = useT({
    de: {
      label: "Unser Ärzteteam",
      h2a: "12 Spezialisten, ",
      h2b: "ein Ziel",
      lead: "Jeder Patient wird von Anfang an dem richtigen Spezialisten zugeordnet.",
      filters: ["Alle", "Wirbelsäulenchirurgie", "Schmerztherapie", "Neurochirurgie", "Orthopädie"] as const,
      viewProfile: "Profil ansehen",
      seeAll: (n: number) => `Alle ${n} Spezialisten ansehen →`,
    },
    en: {
      label: "Our medical team",
      h2a: "12 specialists, ",
      h2b: "one goal",
      lead: "Every patient is matched with the right specialist from the start.",
      filters: ["Alle", "Wirbelsäulenchirurgie", "Schmerztherapie", "Neurochirurgie", "Orthopädie"] as const,
      viewProfile: "View profile",
      seeAll: (n: number) => `View all ${n} specialists →`,
    },
  });
  const filterLabels: Record<string, string> = useLang().lang === "en"
    ? { Alle: "All", Wirbelsäulenchirurgie: "Spine surgery", Schmerztherapie: "Pain therapy", Neurochirurgie: "Neurosurgery", Orthopädie: "Orthopaedics" }
    : { Alle: "Alle", Wirbelsäulenchirurgie: "Wirbelsäulenchirurgie", Schmerztherapie: "Schmerztherapie", Neurochirurgie: "Neurochirurgie", Orthopädie: "Orthopädie" };

  const [active, setActive] = useState<(typeof t.filters)[number]>("Alle");
  const { ref: headRef, style: headStyle } = useFadeUp(0);

  const doctors = allDoctors
    .filter((d) => active === "Alle" || d.specialties.includes(active as never))
    .slice(0, 3);

  return (
    <section id="team" className="bg-[#F8F8F6] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">{t.lead}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {t.filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active === f
                  ? "bg-[#1E2535] text-white"
                  : "border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52] hover:text-[#AC8F52]"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-px bg-[#E2E4E7] md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <DoctorCard key={d.slug} d={d} delay={150 + i * 100} cta={t.viewProfile} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/aerzte"
            className="text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52] transition-colors"
          >
            {t.seeAll(allDoctors.length)}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Termin ────────────────────────────────────────────────────── */

function Termin() {
  const t = useT({
    de: {
      h2a: "Wir sind ",
      h2b: "für Sie da.",
      lead: "Die meisten Ersttermine sind innerhalb von 5 Werktagen verfügbar. Für die meisten Beschwerden ist keine Überweisung erforderlich.",
      onlineKicker: "Online buchen",
      onlineTitle: "Termin online vereinbaren",
      onlineSub: "Integriert über onlinerezeption.vercel.app",
      book: "Termin buchen",
      otherTitle: "Weitere Kontaktmöglichkeiten",
      phoneSub: "Mo–Fr · 08:00–18:00 Uhr",
      mailSub: "Antwort innerhalb eines Werktags",
      city: "80335 München",
    },
    en: {
      h2a: "We are ",
      h2b: "here for you.",
      lead: "Most first appointments are available within 5 working days. No referral is needed for most conditions.",
      onlineKicker: "Book online",
      onlineTitle: "Schedule an appointment online",
      onlineSub: "Powered by onlinerezeption.vercel.app",
      book: "Book appointment",
      otherTitle: "Other ways to reach us",
      phoneSub: "Mon–Fri · 8:00 am – 6:00 pm",
      mailSub: "Reply within one business day",
      city: "80335 Munich",
    },
  });
  const { ref, style } = useFadeUp(0);
  return (
    <section id="termin" className="relative bg-[#1E2535] py-16 lg:py-24 border-t-4 border-[#AC8F52] overflow-hidden">
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
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-4 text-[#C8CBD2] leading-relaxed max-w-lg">{t.lead}</p>
          <div className="mt-8 rounded-xl bg-[#263044] p-7 border-t-2 border-[#AC8F52]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-[#AC8F52]" />
              {t.onlineKicker}
            </p>
            <p className="mt-3 text-white font-semibold text-lg">{t.onlineTitle}</p>
            <p className="mt-2 text-sm text-[#8C939B]">{t.onlineSub}</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535]"
              style={{ transition: `filter 150ms ${EASE}, transform 160ms ${EASE}` }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
            >
              {t.book}
            </a>
          </div>
        </div>
        <div className="rounded-xl bg-[#263044] p-7">
          <h3 className="text-white font-semibold text-lg">{t.otherTitle}</h3>
          <div className="mt-6 space-y-6 text-sm">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.87 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6.15 6.15l1.1-1.1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
                primary: "+49 (0)89-54 34 30 30",
                secondary: t.phoneSub,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                ),
                primary: "info@wzas.de",
                secondary: t.mailSub,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                primary: "Nymphenburger Str. 1",
                secondary: t.city,
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

function AktuellesCard({ item, delay, cta }: { item: AktuellesItem; delay: number; cta: string }) {
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
          className="mt-2 font-display text-[#1E2535] leading-snug"
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
        {cta} →
      </a>
    </div>
  );
}

function Aktuelles() {
  const t = useT({
    de: {
      label: "Aktuelles",
      h2a: "Vorträge, Veranstaltungen ",
      h2b: "& Wissen",
      lead: "Bleiben Sie informiert — unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen und Fachbeiträgen.",
      cta: "Mehr erfahren",
      all: "Alle Veranstaltungen & Inhalte ansehen →",
      items: [
        { type: "VORTRAG", date: "15. September 2026", title: "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?", detail: "Gasteig HP8 · München · 19:00 Uhr" },
        { type: "VIDEO", date: "Online verfügbar", title: "Bandscheibenvorfall verstehen: Diagnose & Behandlung", detail: "45 Min. · Dr. med. Ralph Medele" },
        { type: "ARTIKEL", date: "Juli 2026", title: "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie", detail: "Fachbeitrag · Neurochirurgie aktuell" },
      ],
    },
    en: {
      label: "News",
      h2a: "Talks, events ",
      h2b: "& knowledge",
      lead: "Stay informed — our specialists share their knowledge in public talks and articles.",
      cta: "Learn more",
      all: "View all events & articles →",
      items: [
        { type: "TALK", date: "15 September 2026", title: "A back without surgery: when is an operation really needed?", detail: "Gasteig HP8 · Munich · 7:00 pm" },
        { type: "VIDEO", date: "Available online", title: "Understanding a herniated disc: diagnosis & treatment", detail: "45 min · Dr. Ralph Medele" },
        { type: "ARTICLE", date: "July 2026", title: "New minimally invasive techniques in spine surgery", detail: "Article · Neurochirurgie aktuell" },
      ],
    },
  });
  const meta = [
    { accentColor: "#2563EB", badgeBg: "rgba(37,99,235,0.1)", badgeText: "#1d4ed8", image: vortraegeImg.url },
    { accentColor: "#7C3AED", badgeBg: "rgba(124,58,237,0.1)", badgeText: "#6d28d9", image: thumbBandscheibe.url },
    { accentColor: "#059669", badgeBg: "rgba(5,150,105,0.1)", badgeText: "#047857", image: aktuellesImg.url },
  ];
  const items: AktuellesItem[] = t.items.map((it, i) => ({ ...it, ...meta[i] }));
  const { ref: headRef, style: headStyle } = useFadeUp(0);
  return (
    <section id="aktuelles" className="bg-[#F8F8F6] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500 }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">{t.lead}</p>
        </div>
        <div className="mt-12 flex flex-col gap-px bg-[#E2E4E7]">
          {items.map((item, i) => (
            <AktuellesCard key={item.title} item={item} delay={150 + i * 100} cta={t.cta} />
          ))}
        </div>
        <div className="mt-10">
          <a href="#" className="text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52] transition-colors">
            {t.all}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */

function Footer() {
  const t = useT({
    de: {
      cols: [
        { title: "Beschwerdebilder", items: ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Reha nach OP"] },
        { title: "Behandlungen", items: ["Konservative Therapie", "Minimalinvasiv", "Wirbelsäulenop.", "Schmerztherapie", "Rehabilitation"] },
        { title: "Über uns", items: ["Unser Team", "Die Praxis", "Leitbild & Werte", "Aktuelles", "Karriere"] },
        { title: "Für Patienten", items: ["Termin vereinbaren", "Häufige Fragen", "Barrierefreiheit", "Datenschutz"] },
      ],
      awarded: "Ausgezeichnet",
      copy: "© 2026 Wirbelsäulenzentrum am Stiglmaierplatz · Alle Rechte vorbehalten",
      legal: ["Impressum", "Datenschutz", "Barrierefreiheit"],
      city: "80335 München",
    },
    en: {
      cols: [
        { title: "Conditions", items: ["Acute back pain", "Chronic pain", "Herniated disc", "Sciatica", "Post-surgery rehab"] },
        { title: "Treatments", items: ["Conservative therapy", "Minimally invasive", "Spine surgery", "Pain therapy", "Rehabilitation"] },
        { title: "About us", items: ["Our team", "The practice", "Mission & values", "News", "Careers"] },
        { title: "For patients", items: ["Book appointment", "FAQ", "Accessibility", "Privacy"] },
      ],
      awarded: "Awarded",
      copy: "© 2026 Spine Center at Stiglmaierplatz · All rights reserved",
      legal: ["Imprint", "Privacy", "Accessibility"],
      city: "80335 Munich",
    },
  });
  return (
    <footer className="bg-[#1E2535] border-t-2 border-[#AC8F52] text-[#C8CBD2]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo light />
          <div className="mt-5 space-y-1 text-sm text-[#8C939B]">
            <div>Nymphenburger Str. 1</div>
            <div>{t.city}</div>
            <div className="mt-3">+49 (0)89-54 34 30 30</div>
            <div>info@wzas.de</div>
          </div>
        </div>
        {t.cols.map((c) => (
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

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 flex flex-wrap items-center gap-8">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#8C939B]">{t.awarded}</span>
          <img src={focusImg.url} alt="Focus Top-Mediziner" className="h-14 w-auto bg-white/95 rounded p-2" />
          <img src={isoImg.url} alt="ISO 9001 zertifiziert" className="h-14 w-auto bg-white/95 rounded p-2" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#8C939B]">
          <div>{t.copy}</div>
          <div className="flex gap-4">
            {t.legal.map((l) => (
              <a key={l} href="#" className="hover:text-[#AC8F52] transition-colors">{l}</a>
            ))}
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
      <a href="#main-content" className="skip-link">
        Zum Inhalt springen
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
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

