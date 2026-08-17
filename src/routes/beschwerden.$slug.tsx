import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { getCondition, getConditionContent, CONDITIONS, TREATMENT_LABELS, type Condition } from "@/lib/conditions";
import { useLang, useT } from "@/lib/lang";

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

function RelatedCard({ condition, lang }: { condition: Condition; lang: "de" | "en" }) {
  const [hovered, setHovered] = useState(false);
  const content = getConditionContent(condition, lang);
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
        <p className="text-white font-display font-semibold text-lg leading-tight">{content.name}</p>
        {content.subtitle && <p className="text-white/70 text-xs mt-0.5">({content.subtitle})</p>}
      </div>
    </Link>
  );
}

export const Route = createFileRoute("/beschwerden/$slug")({
  head: ({ params }) => {
    const condition = getCondition(params.slug);
    if (!condition) {
      return { meta: [{ title: "Erkrankung nicht gefunden · WZAS München" }, { name: "robots", content: "noindex" }] };
    }
    const c = getConditionContent(condition, "de");
    const title = `${c.name} · WZAS Wirbelsäulenzentrum München`;
    const description = c.bodyText.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BeschwerdenDetail,
});


function BeschwerdenDetail() {
  const { slug } = Route.useParams();
  const condition = getCondition(slug);
  const { lang } = useLang();

  // Hooks must be called unconditionally, before any early return
  const { ref: overviewRef, style: overviewStyle } = useFadeUp(0);
  const { ref: treatRef, style: treatStyle } = useFadeUp(100);
  const { ref: relRef, style: relStyle } = useFadeUp(150);

  const t = useT({
    de: {
      breadcrumb: "Rückenerkrankungen",
      whatIsIt: "Was ist das?",
      atAGlance: "Auf einen Blick",
      region: "Region:",
      frequency: "Häufigkeit:",
      symptoms: "Symptome:",
      howWetreat: "So behandeln wir",
      relatedConditions: "Ähnliche Erkrankungen",
      doctorHeading: "Ihr Spezialist für dieses Krankheitsbild",
      doctorLink: "Zum Arztprofil",
      backLink: "← Zurück zu den Erkrankungen",
      notFound: "Erkrankung nicht gefunden",
      bookingBody: "Vereinbaren Sie jetzt einen Termin. Termine zeitnah nach Verfügbarkeit, ohne Überweisung.",
      bookingCta: "Online buchen",
      videoHeading: "Video",
    },
    en: {
      breadcrumb: "Spine conditions",
      whatIsIt: "What is it?",
      atAGlance: "At a glance",
      region: "Affected area:",
      frequency: "Frequency:",
      symptoms: "Symptoms:",
      howWetreat: "How we treat it",
      relatedConditions: "Related conditions",
      doctorHeading: "Your specialist for this condition",
      doctorLink: "View profile",
      backLink: "← Back to conditions",
      notFound: "Condition not found",
      bookingBody: "Book an appointment now. Emergencies are treated immediately.",
      bookingCta: "Book online",
      videoHeading: "Video",
    },
  });

  if (!condition) {
    return (
      <div className="min-h-screen bg-[#F8F8F6]">
        <PageHeader activeRoute="/beschwerden" />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <p className="font-display text-3xl text-[#1E2535] mb-4">{t.notFound}</p>
            <Link to="/beschwerden" className="text-sm text-[#AC8F52] hover:underline">
              {t.backLink}
            </Link>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }

  const content = getConditionContent(condition, lang);

  const relatedConditions = condition.relatedIds
    .map((id) => CONDITIONS.find((c) => c.id === id))
    .filter(Boolean) as Condition[];

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
              ← {t.breadcrumb}
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <h1 className="font-display text-4xl lg:text-6xl font-semibold text-white leading-tight">
              {content.name}
            </h1>
            {content.subtitle && (
              <p className="mt-2 text-white/70 text-lg italic font-display">({content.subtitle})</p>
            )}
          </div>
        </section>

        {/* Overview split */}
        <section className="py-14 lg:py-20 bg-white">
          <div ref={overviewRef} style={overviewStyle} className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-semibold text-[#1E2535] mb-5">{t.whatIsIt}</h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">{content.bodyText}</p>
            </div>
            <div>
              <div className="border-l-4 border-[#AC8F52] pl-5 py-2">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-4">
                  {t.atAGlance}
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#8C939B] uppercase tracking-wider mb-0.5">{t.region}</p>
                    <p className="text-sm font-medium text-[#1E2535]">{content.bullets.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8C939B] uppercase tracking-wider mb-0.5">{t.frequency}</p>
                    <p className="text-sm font-medium text-[#1E2535]">{content.bullets.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8C939B] uppercase tracking-wider mb-1">{t.symptoms}</p>
                    <ul className="space-y-1">
                      {content.bullets.symptoms.map((s) => (
                        <li key={s} className="text-sm text-[#1E2535] flex gap-2">
                          <span className="text-[#AC8F52] mt-0.5">, </span>
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
                {t.howWetreat}
              </h2>
              <div className="flex flex-wrap gap-3">
                {condition.treatmentIds.map((id) => (
                  <Link
                    key={id}
                    to="/behandlungen"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#AC8F52] px-5 py-2.5 text-sm font-medium text-[#AC8F52] transition-all hover:bg-[#AC8F52] hover:text-[#1E2535]"
                  >
                    {TREATMENT_LABELS[id]?.[lang] ?? id}
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

        {/* Doctor module, only if slugs exist */}
        {condition.doctorSlugs.length > 0 && (
          <section className="py-12 bg-white">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-4">
                {t.doctorHeading}
              </p>
              <div className="flex flex-wrap gap-4">
                {condition.doctorSlugs.map((docSlug) => (
                  <Link
                    key={docSlug}
                    to="/aerzte/$slug"
                    params={{ slug: docSlug }}
                    className="flex items-center gap-4 bg-white border border-[#E2E4E7] rounded-xl p-4 hover:border-[#AC8F52] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#1E2535]">{t.doctorLink} →</p>
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
                {t.relatedConditions}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedConditions.map((rel) => (
                  <RelatedCard key={rel.id} condition={rel} lang={lang} />
                ))}
              </div>
            </div>
          </section>
        )}

        <BookingCTA
          heading={content.ctaCopy}
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
