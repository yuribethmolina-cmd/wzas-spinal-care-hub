import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { doctors as allDoctors } from "@/lib/doctors";
import { useLang, useT, type Lang } from "@/lib/lang";
import { PraxisGalerie } from "@/components/PraxisGalerie";
import { Behandlungen } from "@/components/Behandlungen";
import { KonservativZuerst } from "@/components/KonservativZuerst";
import { Vortragsreihe, Anfahrt } from "@/components/HomeExtras";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import ogShare from "@/assets/wzas/og-share.png.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { MobileNavPanel } from "@/components/MobileNavPanel";
import { AppointmentChoice } from "@/components/AppointmentChoice";

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

import {
  HERO_BG,
  HERO_SRCSET,
  HERO_SIZES,
  
  BOOKING_URL,
  INQUIRY_URL,
  EASE as EASE_IMPORTED,
  EASE_SOFT as EASE_SOFT_IMPORTED,
  NOISE,
  STAT_DEFS,
  SPINE_H,
  SPINE_ZONES,
} from "./-home-constants";

// Safe fallbacks: if code-splitting ever drops these bindings, motion still works.
const EASE = EASE_IMPORTED ?? "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_SOFT = EASE_SOFT_IMPORTED ?? "cubic-bezier(0.16, 1, 0.3, 1)";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WZAS · Wirbelsäulenzentrum am Stiglmaierplatz München" },
      {
        name: "description",
        content:
          "Rückhalt für München. 20 Jahre Erfahrung, 13 Spezialisten. Konservative Behandlung zuerst, Operation nur, wenn nötig.",
      },
      { property: "og:title", content: "WZAS · Wirbelsäulenzentrum am Stiglmaierplatz" },
      {
        property: "og:description",
        content: "Spezialisten für Wirbelsäule und Rücken in München. Termine für gesetzlich und privat Versicherte.",
      },
      { property: "og:image", content: `https://wzas-spinal-care-hub.lovable.app${ogShare.url}` },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://wzas-spinal-care-hub.lovable.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `https://wzas-spinal-care-hub.lovable.app${ogShare.url}` },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: HERO_BG,
        imageSrcSet: HERO_SRCSET,
        imageSizes: HERO_SIZES,
        fetchPriority: "high",
      },
    ],
  }),
  component: Home,
});



const WEG_ICONS: React.ReactNode[] = [
  <svg key="search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  <svg key="team" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>,
];

/* ─── Spine locator ─────────────────────────────────────────────── */

function SpineLocator() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);
  const header = lang === "de" ? "Wo tut es weh?" : "Where does it hurt?";
  const hint = lang === "de" ? "Bereich anklicken" : "Click an area";

  return (
    <div className="hidden lg:flex flex-col justify-center items-end h-full">
      <div
        className="rounded-2xl border border-white/25 overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
        style={{ width: 340, background: "rgba(16,22,34,0.68)", backdropFilter: "blur(14px) saturate(1.1)" }}
      >
        <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between gap-3">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#E0C288]">{header}</p>
          <p className="text-xs font-medium text-white/70">{hint}</p>
        </div>
        <div className="flex gap-5 p-5" style={{ height: 340 }}>

          <svg
            viewBox="0 0 44 288"
            className="h-full w-11 shrink-0 overflow-visible"
            aria-hidden
          >
            {SPINE_ZONES.map((z) => {
              const active = activeId === z.id;
              return (
                <g
                  key={z.id}
                  onMouseEnter={() => setActiveId(z.id)}
                  onMouseLeave={() => setActiveId(null)}
                  style={{
                    cursor: "pointer",
                    color: active ? "#D9BC80" : "rgba(255,255,255,0.42)",
                    transition: `color 320ms ${EASE}, opacity 320ms ${EASE}`,
                    opacity: activeId && !active ? 0.55 : 1,
                  }}
                >
                  <rect x="0" y={z.y} width="44" height={z.h} fill="transparent" />
                  {z.vertebrae.map((v, i) => (
                    <g key={i} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
                      <rect x={22 - v.w / 2} y={v.y} width={v.w} height={v.vh} rx={v.vh / 2.6} />
                      <path d={`M${22 - v.w / 2} ${v.y + v.vh / 2} h${-v.w * 0.42}`} />
                      <path d={`M${22 + v.w / 2} ${v.y + v.vh / 2} h${v.w * 0.3}`} opacity="0.6" />
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>

          <div className="flex flex-col gap-1.5 flex-1">
            {SPINE_ZONES.map((z) => {
              const active = activeId === z.id;
              const label = lang === "de" ? z.de : z.en;
              const sub = lang === "de" ? z.subDe : z.subEn;
              return (
                <a
                  key={z.id}
                  href={z.href}
                  className="flex flex-col justify-center"
                  style={{ flex: z.flex, textDecoration: "none" }}
                  onMouseEnter={() => setActiveId(z.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  <p className={`text-base font-bold leading-tight transition-colors duration-200 ${active ? "text-[#E0C288]" : "text-white"}`}>
                    {label}
                  </p>
                  <p className={`text-sm font-medium leading-snug mt-0.5 transition-colors duration-200 ${active ? "text-[#D2B276]" : "text-white/75"}`}>
                    {sub}
                  </p>

                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Stat counter ──────────────────────────────────────────────── */

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const { lang } = useLang();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(value); return; }
    const duration = 1400;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, value]);

  const display = value >= 1000
    ? count.toLocaleString(lang === "de" ? "de-DE" : "en-US")
    : count.toString();

  return (
    <div ref={ref} className="font-display text-2xl md:text-3xl text-[#AC8F52]" style={{ fontWeight: 600 }}>
      {display}{suffix}
    </div>
  );
}

/* ─── Scroll animation hook ─────────────────────────────────────── */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll reveal: soft rise + de-blur, on a slow expo curve. */
function useFadeUp(delay = 0, opts: { y?: number; blur?: number; duration?: number } = {}) {
  const { y = 26, blur = 6, duration = 900 } = opts;
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
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
      { threshold: 0.06, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
      filter: vis ? "blur(0px)" : `blur(${blur}px)`,
      willChange: "opacity, transform",
      transition:
        `opacity ${duration}ms ${EASE_SOFT} ${delay}ms, ` +
        `transform ${duration}ms ${EASE_SOFT} ${delay}ms, ` +
        `filter ${Math.round(duration * 0.8)}ms linear ${delay}ms`,
    } as React.CSSProperties,
  };
}

/** Mounted-on-load sequencing for the hero, so nothing pops in at once. */
function useIntro(delay = 0) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setOn(true);
      return;
    }
    const id = window.setTimeout(() => setOn(true), 60);
    return () => window.clearTimeout(id);
  }, []);
  return {
    opacity: on ? 1 : 0,
    transform: on ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
    transition: `opacity 900ms ${EASE_SOFT} ${delay}ms, transform 1000ms ${EASE_SOFT} ${delay}ms`,
  } as React.CSSProperties;
}

/** A headline line that rises out from behind its own baseline mask. */
function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setOn(true);
      return;
    }
    const id = window.setTimeout(() => setOn(true), 60);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <span className="block overflow-hidden" style={{ paddingBottom: "0.06em" }}>
      <span
        className={`block ${className ?? ""}`}
        style={{
          transform: on ? "translate3d(0,0,0)" : "translate3d(0,105%,0)",
          opacity: on ? 1 : 0,
          transition: `transform 1100ms ${EASE_SOFT} ${delay}ms, opacity 700ms ${EASE_SOFT} ${delay}ms`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
}

/** Slow counter-scroll on a background layer, depth without distraction. */
function useParallax(strength = 0.12, mobileFactor = 0.35) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 1023px)");
    let frame = 0;
    let active = false;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const factor = small.matches ? strength * mobileFactor : strength;
        setOffset(window.scrollY * factor);
      });
    };

    const sync = () => {
      const shouldRun = !reduce.matches;
      if (shouldRun === active) {
        if (active) onScroll();
        return;
      }
      active = shouldRun;
      if (active) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        setOffset(0);
      }
    };

    sync();
    reduce.addEventListener("change", sync);
    small.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength, mobileFactor]);
  return offset;
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
    `px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-full transition-colors min-h-8 ${
      lang === l ? "bg-[#1E2535] text-white" : "text-[#1E2535] hover:text-[#AC8F52]"
    }`;
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setLang(lang === "de" ? "en" : "de");
    }
  };
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-[#E2E4E7] p-1 ${
        compact ? "" : ""
      }`}
      role="group"
      aria-label="Sprache auswählen / Choose language"
      onKeyDown={onKey}
    >
      <button
        type="button"
        onClick={() => setLang("de")}
        className={btn("de")}
        aria-pressed={lang === "de"}
        aria-label="Deutsch"
        lang="de"
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={btn("en")}
        aria-pressed={lang === "en"}
        aria-label="English"
        lang="en"
      >
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
        ["Rückenerkrankungen", "/beschwerden"],
        ["Ärzteteam", "/aerzte"],
        ["Behandlungen", "/behandlungen"],
        ["Aktuelles", "/aktuelles"],
      ] as [string, string][],
      book: "Termin buchen",
      menu: "Menü",
    },
    en: {
      links: [
        ["Spine conditions", "/beschwerden"],
        ["Our doctors", "/aerzte"],
        ["Treatments", "/behandlungen"],
        ["News", "/aktuelles"],
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
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const linkClass =
    "relative text-sm font-medium text-[#1E2535] transition-colors hover:text-[#AC8F52] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#AC8F52] after:transition-[width] hover:after:w-full after:duration-200";
  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" aria-label="WZAS, Startseite">
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Hauptnavigation">
          {t.links.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link
                key={label}
                to={href as "/aerzte" | "/beschwerden" | "/behandlungen" | "/aktuelles"}
                className={linkClass}
                activeProps={{ "aria-current": "page" } as never}
              >
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className={linkClass}>
                {label}
              </a>
            )
          )}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <LangToggle />
          <a
            href={BOOKING_URL}
            className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535] transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#BC9C58] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(172,143,82,0.85)]"
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
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#1E2535] min-h-11 min-w-11"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <MobileNavPanel
        open={open}
        onClose={() => setOpen(false)}
        links={t.links}
        bookLabel={t.book}
        title={t.menu}
      />

    </header>
  );
}


/* ─── Hero ──────────────────────────────────────────────────────── */

function Hero() {
  const t = useT({
    de: {
      kicker: "Wirbelsäulenzentrum am Stiglmaierplatz · München",
      h1a: "Rückhalt",
      h1b: "für München.",
      h1c: "",
      sub: "20 Jahre Erfahrung.\u00a0\n13 Spezialisten.\u00a0\nKonservative Behandlung zuerst\u00a0\nOperation nur, wenn nötig.",
      chipsLabel: "Was führt Sie zu uns?",
      chips: ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Nach OP"],
      book: "Termin buchen",
      more: "Mehr erfahren",
      bookMeta: "Freie Termine online · ca. 2 Min. · Nur eine Frage?",
      askLink: "Anfrage senden",
      alt: "Ärztliches Beratungsgespräch mit Wirbelsäulenmodell im Wirbelsäulenzentrum am Stiglmaierplatz",
    },
    en: {
      kicker: "Spine Center at Stiglmaierplatz · Munich",
      h1a: "Backbone",
      h1b: "for Munich.",
      h1c: "",
      sub: "20 years of experience.\u00a0\n13 specialists.\u00a0\nConservative treatment first, \u00a0\nsurgery only when necessary.",
      chipsLabel: "What brings you to us?",
      chips: ["Acute back pain", "Chronic pain", "Herniated disc", "Sciatica", "Post-surgery"],
      book: "Book appointment",
      more: "Learn more",
      bookMeta: "Live availability · approx. 2 min · Just a question?",
      askLink: "Send inquiry",
      alt: "Doctor consultation with a spine model at the Spine Center at Stiglmaierplatz",
    },
  });
  const { lang } = useLang();
  const parallax = useParallax(0.14);
  const introKicker = useIntro(80);
  const introSub = useIntro(620);
  const introChips = useIntro(760);
  const introCta = useIntro(880);
  const introLangs = useIntro(1000);
  const introPanel = useIntro(560);
  return (
    <section className="relative bg-[#1E2535] text-white overflow-hidden isolate min-h-[78svh] lg:min-h-0">
      <img
        src={HERO_BG}
        srcSet={HERO_SRCSET}
        sizes={HERO_SIZES}
        alt={t.alt}
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-[118%] w-full object-cover object-[36%_28%] sm:object-[42%_30%] lg:object-center -z-10"
        style={{ transform: `translate3d(0, ${-parallax}px, 0) scale(1.02)`, willChange: "transform" }}
      />


      <div className="absolute inset-0 -z-10 bg-[#161C29]/30 lg:bg-[#161C29]/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#141A26]/70 via-[#141A26]/25 to-transparent lg:from-[#141A26]/90 lg:via-[#141A26]/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#141A26] via-[#141A26]/45 to-[#141A26]/10 lg:via-[#141A26]/15 lg:to-[#141A26]/35" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] -z-10"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-14 lg:pt-20 lg:pb-40 lg:min-h-[min(84vh,860px)] grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        <div>
          <p
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AC8F52] flex items-center gap-2"
            style={introKicker}
          >
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            <span className="min-w-0">{t.kicker}</span>
          </p>
          <h1
            className="mt-5 sm:mt-6 leading-[1.12] sm:leading-[1.02] tracking-tight text-white font-display"
            style={{ fontSize: "clamp(2.4rem, 5.4vw, 5rem)", fontWeight: 500 }}
          >
            <MaskLine delay={200}>{t.h1a}</MaskLine>
            <MaskLine delay={320}>
              <span style={{ fontWeight: 600 }}>{t.h1b}</span>
            </MaskLine>
            <MaskLine delay={440}>{t.h1c}</MaskLine>
          </h1>
          <p
            className="mt-4 sm:mt-5 text-base sm:text-lg text-[#E6E9EF] leading-relaxed max-w-xl whitespace-pre-line"
            style={introSub}
          >
            {t.sub}
          </p>
          <div className="mt-6 sm:mt-8" style={introChips}>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#CBD1DA] mb-3">
              {t.chipsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.chips.map((c) => (
                <button
                  key={c}
                  className="rounded-full border border-white/25 bg-white/5 backdrop-blur-sm min-h-11 inline-flex items-center px-4 py-2.5 text-[13px] sm:text-sm text-white/90 hover:border-white/70 hover:bg-white/12 hover:-translate-y-0.5 transition-[color,background-color,border-color,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7" style={introCta}>
            <div className="flex flex-wrap gap-3">
              <a
                href={BOOKING_URL}
                className="inline-flex items-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#BC9C58] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-16px_rgba(172,143,82,0.9)]"
              >
                {t.book}
              </a>
              <a
                href="#beschwerden"
                className="inline-flex items-center rounded-full border border-white/40 bg-white/5 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/15 hover:border-white/70 hover:-translate-y-0.5"
              >
                {t.more}
              </a>
            </div>
            <p className="mt-3 text-[13px] text-[#CBD1DA]">
              {t.bookMeta}{" "}
              <a
                href={INQUIRY_URL}
                className="font-semibold text-[#D8BE85] underline underline-offset-4 hover:brightness-110"
              >
                {t.askLink}
              </a>
            </p>
          </div>

          <div className="mt-7" style={introLangs}>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#CBD1DA] flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-[#AC8F52]" />
              {lang === "de" ? "Beratung in Ihrer Sprache" : "Consultation in your language"}
            </p>
            <p className="mt-2.5 text-[15px] font-medium text-white/90">
              {["Deutsch", "English", "Español"].map((n, i) => (
                <span key={n}>
                  {i > 0 && <span className="mx-2 text-[#AC8F52]" aria-hidden="true">·</span>}
                  {n}
                </span>
              ))}
            </p>
          </div>


        </div>
        <div style={introPanel}>
          <SpineLocator />
        </div>
      </div>


      <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0 bg-[#1E2535]/90 backdrop-blur border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 items-start py-6 lg:py-7">
          {STAT_DEFS.map((s) => (
            <div key={s.labelDe}>
              <StatCounter value={s.value} suffix={s.suffix} />
              <div className="text-xs md:text-sm text-[#DDE1E8] mt-1">
                {lang === "de" ? s.labelDe : s.labelEn}
              </div>
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

// Bespoke anatomical line icons, each drawn around the vertebral motif
// (body + spinous process) so the pictogram actually describes the condition.
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-7 h-7",
} as const;

const ConditionIcons: Record<string, React.ReactNode> = {
  // Acute: three vertebrae, impact radiating from the middle one
  akut: (
    <svg {...iconProps} aria-hidden>
      <rect x="7.5" y="3.5" width="9" height="4.4" rx="1.8" />
      <rect x="7.5" y="9.8" width="9" height="4.4" rx="1.8" />
      <rect x="7.5" y="16.1" width="9" height="4.4" rx="1.8" />
      <path d="M7.5 5.7H4.6M7.5 12h-2.9M7.5 18.3H4.6" />
      <path d="M18.6 10.4l2.4-1.5M19.2 12.6h2.9M18.6 15l2.3 1.4" opacity="0.75" />
    </svg>
  ),
  // Chronic: the same column, wrapped by a slow recurring cycle
  chronisch: (
    <svg {...iconProps} aria-hidden>
      <rect x="8" y="6.6" width="8" height="4.2" rx="1.7" />
      <rect x="8" y="12.8" width="8" height="4.2" rx="1.7" />
      <path d="M8 8.7H5.6M8 14.9H5.6" />
      <path d="M19.4 8.2a8 8 0 0 1-1.2 9.6M5 18.6a8 8 0 0 1 .6-11" opacity="0.8" />
      <path d="M19.9 4.9l-.5 3.4 3.2.2" opacity="0.8" />
    </svg>
  ),
  // Herniated disc: two bodies, the disc between them bulging onto the nerve
  bandscheibe: (
    <svg {...iconProps} aria-hidden>
      <rect x="6.5" y="3.4" width="11" height="4.6" rx="1.9" />
      <rect x="6.5" y="16" width="11" height="4.6" rx="1.9" />
      <path d="M6.5 10.4h9.6c2.6 0 4.6 1.1 4.6 2.2 0 1.1-2 2.2-4.6 2.2H6.5z" />
      <path d="M4.4 10.4v4.4" opacity="0.75" />
    </svg>
  ),
  // Sciatica: lumbar segment with the nerve radiating down through hip and leg
  ischias: (
    <svg {...iconProps} aria-hidden>
      <rect x="5.5" y="3.2" width="7.5" height="4" rx="1.6" />
      <rect x="5.5" y="8.8" width="7.5" height="4" rx="1.6" />
      <path d="M5.5 5.2H3.2M5.5 10.8H3.2" />
      <path d="M11 14.4c2.6.4 4 1.9 4.2 4 .2 2 1.3 3.4 3.3 4.1" />
      <path d="M13.6 16.6l1.5-1.3M16.6 20.4l1.9-.8" opacity="0.7" />
    </svg>
  ),
  // Post-op rehab: healing column supported and rising
  reha: (
    <svg {...iconProps} aria-hidden>
      <rect x="9.5" y="4" width="7.5" height="4.1" rx="1.7" />
      <rect x="9.5" y="10.1" width="7.5" height="4.1" rx="1.7" />
      <rect x="9.5" y="16.2" width="7.5" height="4.1" rx="1.7" />
      <path d="M20.4 18.6c1.2-3.6 1-7.4-.7-10.9" opacity="0.8" />
      <path d="M17.4 9.1l2.3-1.6 1.5 2.3" opacity="0.8" />
      <path d="M6.6 19.4c-1.8-1.5-2.6-4-2.2-6.5.3-1.9 1.2-3.6 2.5-4.9" opacity="0.6" />
    </svg>
  ),
  // Sport: spine in dynamic extension with motion trace
  sport: (
    <svg {...iconProps} aria-hidden>
      <path d="M8.4 3.6c3.4 1.6 5.6 4.3 6.4 7.9.8 3.6 0 6.8-2.5 9.6" />
      <path d="M9.9 5.7l3-1.1M11.6 8.5l3.1-1M12.7 11.7l3.2-.6M13 15.1l3.1.2M12.2 18.4l2.8 1" />
      <path d="M5.2 7.4c-1.2 3-1.2 6.2 0 9.2M2.6 6c-1.5 3.9-1.5 8 0 12" opacity="0.5" />
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
        backgroundColor: hovered ? "#FCFBF8" : "#FFFFFF",
        transform: `${style.transform ?? ""} ${hovered ? "translateY(-3px)" : ""}`.trim(),
        boxShadow: hovered ? "0 18px 40px -28px rgba(30,37,53,0.55)" : "none",
        transition: `${style.transition}, background-color 240ms ${EASE}, box-shadow 320ms ${EASE}`,
      }}
      className="group relative isolate overflow-hidden p-8 lg:p-9 flex flex-col gap-5 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[#AC8F52] origin-top"
        style={{
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transition: `transform 380ms ${EASE}`,
        }}
      />
      <div
        className="w-12 h-12 flex items-center justify-center text-[#8A6E36]"
        style={{
          borderRadius: 2,
          background: hovered ? "#F3EDE1" : "#F6F3EC",
          boxShadow: `inset 0 0 0 1px rgba(172,143,82,${hovered ? 0.45 : 0.22})`,
          transform: hovered ? "translateY(-2px) scale(1.06)" : "none",
          transition: `background 260ms ${EASE}, box-shadow 260ms ${EASE}, transform 320ms ${EASE}`,
        }}
      >
        {ConditionIcons[iconKey]}
      </div>
      <div>
        <h3
          className="font-display leading-snug"
          style={{
            fontSize: "1.3125rem",
            fontWeight: 500,
            letterSpacing: "-0.015em",
            color: hovered ? "#8A6E36" : "#1E2535",
            transition: `color 260ms ${EASE}`,
          }}
        >
          {name}
        </h3>
        <p className="mt-2.5 text-[0.9375rem] text-[#5B6472] leading-relaxed">{sub}</p>
      </div>

      <a
        href="#"
        className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#8A6E36]"
      >
        <span
          style={{
            boxShadow: `inset 0 -1px 0 0 rgba(138,110,54,${hovered ? 1 : 0.28})`,
            transition: `box-shadow 260ms ${EASE}`,
          }}
        >
          {cta}
        </span>
        <span
          aria-hidden
          style={{
            transform: hovered ? "translateX(4px)" : "none",
            transition: `transform 320ms ${EASE}`,
          }}
        >
          →
        </span>
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
      lead: "Finden Sie Ihr Beschwerdebild und erfahren Sie, wie unsere Spezialisten helfen können, ohne unnötige Operationen.",
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
      lead: "Find your condition and see how our specialists can help, without unnecessary surgery.",
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
    <section id="beschwerden" className="bg-[#F8F8F6] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style}>
          <SectionLabel>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2.15rem, 4.4vw, 3.4rem)", fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] text-[#5B6472] leading-[1.7]">{t.lead}</p>
        </div>
        <div className="mt-10 sm:mt-14 grid gap-px bg-[#E2E4E7] sm:grid-cols-2 lg:grid-cols-3">
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
  n, title, desc, delay, icon, isHighlight, bookLabel,
}: {
  n: string; title: string; desc: string; delay: number;
  icon: React.ReactNode; isHighlight: boolean; bookLabel: string;
}) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style} className="flex-1 min-w-0">
      <div className={`rounded-2xl p-7 h-full flex flex-col ${isHighlight ? "bg-[#AC8F52]" : "bg-white"}`}>
        <div className="flex items-start justify-between mb-5">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isHighlight ? "bg-[#1E2535]/15 text-[#1E2535]" : "bg-[#1E2535] text-white"}`}>
            {n}
          </div>
          <div className={`w-6 h-6 shrink-0 ${isHighlight ? "text-[#1E2535]" : "text-[#AC8F52]"}`}>{icon}</div>
        </div>
        <h3 className={`font-display text-[1.3125rem] tracking-[-0.015em] leading-snug ${isHighlight ? "text-[#1E2535] font-semibold" : "text-[#1E2535] font-medium"}`}>{title}</h3>
        <p className={`mt-3 text-[0.9375rem] leading-[1.7] flex-1 ${isHighlight ? "text-[#1E2535]/75" : "text-[#4A5568]"}`}>{desc}</p>
        {isHighlight && (
          <a
            href={BOOKING_URL}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#1E2535] transition-opacity duration-300 hover:opacity-65"
          >
            {bookLabel} →
          </a>
        )}
      </div>
    </div>
  );
}

function Weg() {
  const t = useT({
    de: {
      label: "Ihr Weg zur Besserung",
      h2a: "Vom ersten Klick ",
      h2b: "zum Termin",
      book: "Jetzt buchen",
      steps: [
        {
          n: "1",
          title: "Beschwerdebild wählen",
          desc: "Suchen oder stöbern Sie nach Symptomen, unsere Übersicht hilft Ihnen zu verstehen, welche Behandlungsoptionen für Ihren Fall geeignet sind.",
        },
        {
          n: "2",
          title: "Den richtigen Spezialisten finden",
          desc: "Filtern Sie unser Team aus 13 Spezialisten nach Fachgebiet. Jedes Profil zeigt die behandelten Erkrankungen und den Behandlungsansatz.",
        },
        {
          n: "3",
          title: "In 60 Sekunden buchen",
          desc: "Nutzen Sie unser Online-Buchungssystem und wählen Sie einen passenden Termin. Notfälle behandeln wir sofort. Kein Anruf nötig.",
        },
      ],
    },
    en: {
      label: "Your path to recovery",
      h2a: "From first click ",
      h2b: "to appointment",
      book: "Book now",
      steps: [
        {
          n: "1",
          title: "Pick your condition",
          desc: "Search or browse by symptom, our overview helps you understand which treatment options fit your case.",
        },
        {
          n: "2",
          title: "Find the right specialist",
          desc: "Filter our 12-specialist team by expertise. Each profile shows the conditions treated and the treatment approach.",
        },
        {
          n: "3",
          title: "Book in 60 seconds",
          desc: "Use our online booking system and pick a time that suits you. Emergencies are treated immediately. No phone call needed.",
        },
      ],
    },
  });
  const { ref: headRef, style: headStyle } = useFadeUp(0);
  return (
    <section id="weg" className="relative bg-[#1E2535] py-14 sm:py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel gold={false}>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-white leading-tight"
            style={{ fontSize: "clamp(2.15rem, 4.4vw, 3.4rem)", fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
        </div>
        <div className="mt-14 flex flex-col lg:flex-row gap-5 items-stretch">
          {t.steps.map((step, i, arr) => (
            <React.Fragment key={step.n}>
              <WegStep
                {...step}
                delay={200 + i * 100}
                icon={WEG_ICONS[i]}
                isHighlight={i === 2}
                bookLabel={t.book}
              />
              {i < arr.length - 1 && (
                <div className="hidden lg:flex items-center justify-center text-[#AC8F52]/35 shrink-0 w-6" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
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
      lead: "Wirbelsäulenchirurgie, Radiologie und Orthopädie arbeiten hier Hand in Hand, kürzere Wege, schnellere Diagnosen, lückenlose Behandlung ohne externe Termine.",
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
      lead: "Spine surgery, radiology and orthopaedics work hand in hand, shorter distances, faster diagnostics and seamless care without outside appointments.",
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
    <section className="bg-white border-y border-[#E2E4E7] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style} className="lg:flex lg:items-center lg:gap-14">
          <div className="lg:w-72 shrink-0 mb-10 lg:mb-0">

            <SectionLabel>{t.label}</SectionLabel>
            <h2
              className="mt-4 font-display text-[#1E2535] leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 500 }}
            >
              {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
            </h2>
            <p className="mt-3 text-sm text-[#5B6472] leading-relaxed max-w-xs">{t.lead}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5 flex-1">
            {t.partners.map((p) => (
              <div key={p.name} className="bg-white border border-[#E2E4E7] p-4 sm:p-6 flex flex-col items-center text-center gap-3 sm:gap-4 min-h-[160px] sm:min-h-[180px] transition-colors duration-300 hover:border-[#AC8F52]/50">
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
                  <p className="mt-1 text-[11px] text-[#5B6472] leading-relaxed">{p.short}</p>
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

function HomeLeaderCard({ d, delay, cta }: { d: (typeof allDoctors)[0]; delay: number; cta: string }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style}>
      <Link
        to="/aerzte/$slug"
        params={{ slug: d.slug }}
        className="group bg-white overflow-hidden flex flex-col sm:flex-row border border-[#E2E4E7] hover:border-[#AC8F52]/40 hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Photo */}
        <div className="relative w-full sm:w-[38%] aspect-[4/3] sm:aspect-auto overflow-hidden bg-[#263044] shrink-0">
          {d.photo ? (
            <img
              src={d.photo}
              alt={d.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[#AC8F52] text-5xl font-medium">{d.initials}</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#AC8F52] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
        {/* Info */}
        <div className="p-6 lg:p-7 flex flex-col justify-between flex-1">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#AC8F52]">{d.title}</p>
            <h3
              className="mt-2 font-display text-[#1E2535] leading-tight"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 500, letterSpacing: "-0.015em" }}
            >
              {d.name}
            </h3>
            <p className="mt-1 text-sm text-[#5F6771]">{d.role}</p>
            <ul className="mt-4 space-y-1.5">
              {d.focus.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#4A5568]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC8F52] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 pt-4 border-t border-[#E2E4E7]">
            <span className="text-sm font-semibold text-[#1E2535] group-hover:text-[#AC8F52] transition-colors flex items-center gap-1.5">
              {cta}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function HomeTeamCard({ d, delay, cta }: { d: (typeof allDoctors)[0]; delay: number; cta: string }) {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style} className="bg-white overflow-hidden group cursor-pointer">
      <Link to="/aerzte/$slug" params={{ slug: d.slug }} className="block h-full">
        <div className="aspect-[3/4] bg-[#263044] overflow-hidden">
          {d.photo ? (
            <img
              src={d.photo}
              alt={d.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="font-display text-[#AC8F52] text-4xl font-medium">{d.initials}</span>
            </div>
          )}
        </div>
        <div className="p-5 border-t-2 border-[#E2E4E7] group-hover:border-[#AC8F52] transition-colors duration-300">
          <h3 className="font-display text-[#1E2535] leading-snug" style={{ fontSize: "1.15rem", fontWeight: 500 }}>{d.name}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#AC8F52] font-medium">{d.specialties[0]}</p>
          <p className="mt-2 text-sm text-[#5B6472] line-clamp-2">{d.focus.slice(0, 2).join(" · ")}</p>
          <span className="mt-4 block text-sm font-semibold text-[#8C939B] group-hover:text-[#AC8F52] transition-colors">{cta} →</span>
        </div>
      </Link>
    </div>
  );
}

function Team() {
  const t = useT({
    de: {
      label: "Unser Ärzteteam",
      h2a: "13 Spezialisten, ",
      h2b: "ein Ziel",
      lead: "Jeder Patient wird von Anfang an dem richtigen Spezialisten zugeordnet.",
      leadershipLabel: "ÄRZTLICHE LEITUNG",
      teamLabel: "DAS TEAM",
      viewProfile: "Profil ansehen",
      seeAll: (n: number) => `Alle ${n} Spezialisten ansehen →`,
    },
    en: {
      label: "Our medical team",
      h2a: "13 specialists, ",
      h2b: "one goal",
      lead: "Every patient is matched with the right specialist from the start.",
      leadershipLabel: "MEDICAL LEADERSHIP",
      teamLabel: "THE TEAM",
      viewProfile: "View profile",
      seeAll: (n: number) => `View all ${n} specialists →`,
    },
  });
  const { ref: headRef, style: headStyle } = useFadeUp(0);
  const LEADERSHIP = allDoctors.slice(0, 2);
  const TEAM_PREVIEW = allDoctors.slice(2, 5);

  return (
    <section id="team" className="bg-[#F8F8F6] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2.15rem, 4.4vw, 3.4rem)", fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] text-[#5B6472] leading-[1.7]">{t.lead}</p>
        </div>

        {/* Leadership */}
        <div className="mt-12">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#AC8F52] mb-5">
            {t.leadershipLabel}
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {LEADERSHIP.map((d, i) => (
              <HomeLeaderCard key={d.slug} d={d} delay={100 + i * 80} cta={t.viewProfile} />
            ))}
          </div>
        </div>

        {/* Team preview */}
        <div className="mt-10 sm:mt-12">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#AC8F52] mb-5">
            {t.teamLabel}
          </p>
          <div className="grid gap-px bg-[#E2E4E7] md:grid-cols-2 lg:grid-cols-3">
            {TEAM_PREVIEW.map((d, i) => (
              <HomeTeamCard key={d.slug} d={d} delay={200 + i * 80} cta={t.viewProfile} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/aerzte"
            className="inline-flex items-center min-h-11 text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52] transition-colors"
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
      lead: "Öffnungszeiten: Montag bis Freitag, 8.00 bis 17.00 Uhr. Notfälle behandeln wir selbstverständlich sofort.",
      onlineKicker: "Online buchen",
      onlineTitle: "Termin online vereinbaren",
      onlineSub: "Online-Terminbuchung (Prototyp)",
      book: "Termin buchen",
      otherTitle: "Weitere Kontaktmöglichkeiten",
      phoneSub: "Gesetzlich Versicherte · Montag bis Freitag 08:00 bis 17:00 Uhr",
      privateSub: "Privatpatienten · gesonderte Rufnummer",
      mailSub: "Antwort innerhalb eines Werktags",
      city: "80335 München",
    },
    en: {
      h2a: "We are ",
      h2b: "here for you.",
      lead: "Opening hours: Monday to Friday, 8.00 am, 5.00 pm. Emergencies are treated immediately.",
      onlineKicker: "Book online",
      onlineTitle: "Schedule an appointment online",
      onlineSub: "Online booking (prototype)",
      book: "Book appointment",
      otherTitle: "Other ways to reach us",
      phoneSub: "Statutory insurance · Monday to Friday 8:00 am to 5:00 pm",
      privateSub: "Private patients · dedicated line",
      mailSub: "Reply within one business day",
      city: "80335 Munich",
    },
  });
  const { ref, style } = useFadeUp(0);
  return (
    <section id="termin" className="relative bg-[#1E2535] py-14 sm:py-20 lg:py-28 border-t-4 border-[#AC8F52] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: NOISE, backgroundSize: "256px 256px" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={ref} style={style}>
          <h2
            className="font-display text-white leading-tight"
            style={{ fontSize: "clamp(2.15rem, 4.4vw, 3.4rem)", fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-4 text-[#C8CBD2] leading-relaxed max-w-lg">{t.lead}</p>
          <AppointmentChoice />
        </div>
        <div className="mt-10 rounded-xl bg-[#263044] p-7">

          <h3 className="text-white font-semibold text-lg">{t.otherTitle}</h3>
          <div className="mt-6 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
                primary: "+49 (0)89-54 34 30 3-120",
                secondary: t.privateSub,
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
                  <div className="text-[#A7AEBA]">{secondary}</div>
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
      className="bg-white border-t-2 overflow-hidden grid gap-0 md:grid-cols-[240px_1fr_auto] md:items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden bg-[#F1F2F4]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full object-cover aspect-[16/9]"
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
          <span className="text-xs text-[#5B6472]">{item.date}</span>
        </div>
        <h3
          className="mt-2 font-display text-[#1E2535] leading-snug"
          style={{ fontSize: "1.15rem", fontWeight: 500 }}
        >
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-[#5B6472]">{item.detail}</p>
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
      lead: "Bleiben Sie informiert, unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen und Fachbeiträgen.",
      cta: "Mehr erfahren",
      all: "Alle Veranstaltungen & Inhalte ansehen →",
      items: [
        { type: "VORTRAG", date: "15. September 2026", title: "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?", detail: "Gasteig HP8 · München · 19:00 Uhr" },
        { type: "VIDEO", date: "Online verfügbar", title: "Bandscheibenvorfall verstehen: Ursachen, Therapie und Wege zur Schmerzfreiheit", detail: "45 Min. · Dr. Wing Mann Ho" },
        { type: "ARTIKEL", date: "Juli 2026", title: "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie", detail: "Fachbeitrag · Neurochirurgie aktuell" },
      ],
    },
    en: {
      label: "News",
      h2a: "Talks, events ",
      h2b: "& knowledge",
      lead: "Stay informed, our specialists share their knowledge in public talks and articles.",
      cta: "Learn more",
      all: "View all events & articles →",
      items: [
        { type: "TALK", date: "15 September 2026", title: "A back without surgery: when is an operation really needed?", detail: "Gasteig HP8 · Munich · 7:00 pm" },
        { type: "VIDEO", date: "Available online", title: "Understanding a herniated disc: causes, therapy and paths to pain relief", detail: "45 min · Dr. Wing Mann Ho" },
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
    <section id="aktuelles" className="bg-[#F8F8F6] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={headRef} style={headStyle}>
          <SectionLabel>{t.label}</SectionLabel>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(2.15rem, 4.4vw, 3.4rem)", fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            {t.h2a}<em style={{ fontStyle: "normal", fontWeight: 600 }}>{t.h2b}</em>
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] text-[#5B6472] leading-[1.7]">{t.lead}</p>
        </div>
        <div className="mt-12 flex flex-col gap-px bg-[#E2E4E7]">
          {items.map((item, i) => (
            <AktuellesCard key={item.title} item={item} delay={150 + i * 100} cta={t.cta} />
          ))}
        </div>
        <div className="mt-10">
          <a href="#" className="inline-flex items-center min-h-11 text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52] transition-colors">
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
        { title: "Für Patienten", items: ["Termin buchen", "Häufige Fragen", "Barrierefreiheit", "Datenschutz"] },
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
          <div className="mt-5 space-y-1 text-sm text-[#A7AEBA]">
            <div>Dr. Medele &amp; Kollegen</div>
            <div>Nymphenburger Str. 1</div>
            <div>{t.city}</div>
            <div className="mt-3">Tel.: +49 (0)89-54 34 30 30</div>
            <div>Fax: +49 (0)89-543430-330</div>
            <div>info@wzas.de</div>
          </div>
        </div>
        {t.cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-semibold text-sm tracking-wide">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-[#A7AEBA]">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="inline-flex items-center min-h-11 lg:min-h-0 hover:text-[#AC8F52] transition-colors duration-200">
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
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A7AEBA]">{t.awarded}</span>
          <img src={focusImg.url} alt="Focus Top-Mediziner" loading="lazy" decoding="async" className="h-14 w-auto bg-white/95 rounded p-2" />
          <img src={isoImg.url} alt="ISO 9001 zertifiziert" loading="lazy" decoding="async" className="h-14 w-auto bg-white/95 rounded p-2" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#A7AEBA]">
          <div>{t.copy}</div>
          <div className="flex items-center gap-5">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://www.instagram.com/wirbelsaeulenzentrum_wzas/", label: "Instagram", d: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></> },
                { href: "https://www.facebook.com/wirbelsaeule/", label: "Facebook", d: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                { href: "https://www.youtube.com/channel/UCzwMBjHV_AtZB9Ubu2ISm9w", label: "YouTube", d: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[#A7AEBA] hover:text-[#AC8F52] transition-colors duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
                    {s.d}
                  </svg>
                </a>
              ))}
            </div>
            {/* Legal links */}
            <div className="flex gap-4">
              {t.legal.map((l) => (
                <a key={l} href="#" className="inline-flex items-center min-h-11 lg:min-h-0 hover:text-[#AC8F52] transition-colors">{l}</a>
              ))}
            </div>
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
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <KonservativZuerst />
        <Beschwerden />
        <Behandlungen />
        <Weg />
        <Kompetenzzentrum />
        <PraxisGalerie />
        <Team />
        <Vortragsreihe />
        <Termin />
        <Anfahrt />
        <Aktuelles />
      </main>
      <Footer />
    </div>
  );
}

