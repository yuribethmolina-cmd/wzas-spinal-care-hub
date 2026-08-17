import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { TerminButton } from "@/components/wzas/TerminButton";
import { CONDITIONS, getConditionContent } from "@/lib/conditions";
import { useLang, useT } from "@/lib/lang";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const HERO_PHOTO = "https://www.wzas.de/wp-content/uploads/2026/06/Header-WZAS-Rueckenerkrankungen.webp";

const TRUST_ICONS: Record<string, string> = {
  stethoscope: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
  shield: "M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z",
  calendar: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z",
};

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
      { name: "description", content: "Bandscheibenvorfall, Spinalkanalstenose, Spondylolisthesis und mehr, das WZAS München behandelt ein breites Spektrum an Rückenerkrankungen, konservativ wenn möglich, operativ wenn nötig." },
    ],
  }),
  component: BeschwerdenHub,
});

function ConditionCard({ condition, index, large = false, ctaCopy }: {
  condition: typeof CONDITIONS[number];
  index: number;
  large?: boolean;
  ctaCopy: string;
}) {
  const { ref, style } = useFadeUp(index * 40);
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const content = getConditionContent(condition, lang);
  const lines = content.name.split("\n");

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
        {content.subtitle && !lines[1] && (
          <p className="text-white/70 text-sm mt-1">({content.subtitle})</p>
        )}
        <p
          className="mt-3 text-xs font-semibold tracking-widest text-[#AC8F52] uppercase flex items-center gap-1"
          style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: `transform 300ms ${EASE}` }}
        >
          {ctaCopy} →
        </p>
      </div>
    </Link>
  );
}

function BeschwerdenHub() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);
  const { lang } = useLang();

  const t = useT({
    de: {
      eyebrow: "MÜNCHEN · STIGLMAIERPLATZ",
      h1: "Rücken­erkrankungen",
      subtitle: "9 Erkrankungen. Ein Spezialistenteam.",
      introText: "Rückenschmerzen, Bandscheibenvorfälle, Spinalkanalstenose, Wirbelsäulenerkrankungen können das Leben erheblich einschränken. Im Wirbelsäulenzentrum am Stiglmaierplatz diagnostizieren und behandeln wir das gesamte Spektrum der Rückenerkrankungen: konservativ wenn möglich, operativ wenn nötig. Unser Team aus zwölf Spezialisten für Neurochirurgie, Orthopädie und Schmerztherapie begleitet Sie vom ersten Termin bis zur vollständigen Beschwerdefreiheit.",
      pullQuote: "\"Konservativ wenn möglich. Operativ wenn nötig.\"",
      attribution: ", WZAS Grundsatz",
      sectionHeading: "Unsere Schwerpunkte",
      ctaCopy: "Mehr erfahren",
      bookingHeading: "Bereit für Ihren Termin?",
      bookingBody: "Noch keine Diagnose? Wir helfen Ihnen beim ersten Schritt. Notfälle behandeln wir sofort.",
      bookingCta: "Online buchen",
      trustItems: [
        { icon: "stethoscope", label: "Seit 2006 in München" },
        { icon: "shield", label: "Konservativ zuerst" },
        { icon: "calendar", label: "Ersttermin ohne Überweisung" },
      ] as { icon: string; label: string }[],
    },
    en: {
      eyebrow: "MUNICH · STIGLMAIERPLATZ",
      h1: "Spine Conditions",
      subtitle: "9 conditions. One specialist team.",
      introText: "Back pain, herniated discs, spinal stenosis, spinal conditions can severely limit daily life. At the Spine Centre at Stiglmaierplatz, we diagnose and treat the full spectrum of back conditions: conservative care whenever possible, surgery only when necessary. Our team of twelve specialists in neurosurgery, orthopaedics and pain therapy guides you from your first appointment to full recovery.",
      pullQuote: "\"Conservative when possible. Surgical when necessary.\"",
      attribution: ", WZAS principle",
      sectionHeading: "Our focus areas",
      ctaCopy: "Learn more",
      bookingHeading: "Ready for your appointment?",
      bookingBody: "No diagnosis yet? We help you take the first step. Emergencies are treated immediately.",
      bookingCta: "Book online",
      trustItems: [
        { icon: "stethoscope", label: "In Munich since 2006" },
        { icon: "shield", label: "Conservative care first" },
        { icon: "calendar", label: "First appointment without referral" },
      ] as { icon: string; label: string }[],
    },
  });

  const featured = CONDITIONS[0];      // Rückenschmerzen
  const rest = CONDITIONS.slice(1);    // 8 remaining

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/beschwerden" />

      <main>
        {/* Hero, Ken Burns + editorial overlay */}
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
              {t.eyebrow}
            </p>
            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-7xl font-semibold text-white leading-tight">
              {t.h1}
            </h1>
            <p className="mt-3 text-white/75 text-lg">{t.subtitle}</p>
            <TerminButton className="mt-6" />
          </div>
        </section>

        {/* Intro editorial */}
        <section className="py-14 lg:py-20 bg-white">
          <div ref={introRef} style={introStyle} className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <p className="text-lg text-[#4A5568] leading-relaxed">
                {t.introText}
              </p>
            </div>
            <div className="border-l-4 border-[#AC8F52] pl-6">
              <p className="font-display text-2xl lg:text-3xl italic text-[#1E2535] leading-snug">
                {t.pullQuote}
              </p>
              <p className="mt-3 text-xs text-[#5F6771] tracking-widest uppercase">{t.attribution}</p>
            </div>
          </div>
        </section>

        {/* Conditions, magazine grid */}
        <section id="conditions" className="py-12 lg:py-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1E2535] mb-8">
              {t.sectionHeading}
            </h2>
            {/* Row 1: featured */}
            <div className="mb-3">
              <ConditionCard condition={featured} index={0} large ctaCopy={t.ctaCopy} />
            </div>
            {/* Rows 2-4: 3-column portrait */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rest.map((c, i) => (
                <ConditionCard key={c.id} condition={c} index={i + 1} ctaCopy={t.ctaCopy} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="py-12 bg-white border-t border-[#E2E4E7]">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {t.trustItems.map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <svg className="w-7 h-7 text-[#AC8F52]" viewBox="0 0 24 24" fill="currentColor">
                    <path d={TRUST_ICONS[icon]} />
                  </svg>
                  <p className="text-sm font-semibold text-[#1E2535]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          heading={t.bookingHeading}
          body={t.bookingBody}
          ctaCopy={t.bookingCta}
          secondaryLabel="+49 (0)89-54 34 30 30"
          secondaryHref="tel:+498954343030"
        />
      </main>

      <PageFooter />
    </div>
  );
}
