import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { TerminButton } from "@/components/wzas/TerminButton";
import {
  getTreatment,
  getTreatmentContent,
  TREATMENTS,
  CATEGORY_LABELS,
  type Treatment,
} from "@/lib/treatments";
import { useLang, useT } from "@/lib/lang";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

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

function RelatedCard({
  treatment,
  lang,
}: {
  treatment: Treatment;
  lang: "de" | "en";
}) {
  const [hovered, setHovered] = useState(false);
  const content = getTreatmentContent(treatment, lang);
  return (
    <Link
      to="/behandlungen/$slug"
      params={{ slug: treatment.id }}
      className="relative overflow-hidden aspect-[4/3] block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${treatment.photo})`,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: `transform 600ms ${EASE}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-white font-display font-semibold text-lg leading-tight">
          {content.name}
        </p>
        <p className="text-white/70 text-xs mt-0.5">{content.tagline}</p>
      </div>
    </Link>
  );
}

export const Route = createFileRoute("/behandlungen/$slug")({
  head: ({ params }) => {
    const treatment = getTreatment(params.slug);
    if (!treatment) {
      return {
        meta: [
          { title: "Behandlung nicht gefunden · WZAS München" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const c = treatment.de;
    const title = `${c.name} · WZAS Wirbelsäulenzentrum München`;
    const description = c.intro.slice(0, 155);
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
  component: BehandlungDetail,
});

function BehandlungDetail() {
  const { slug } = Route.useParams();
  const treatment = getTreatment(slug);
  const { lang } = useLang();

  const { ref: overviewRef, style: overviewStyle } = useFadeUp(0);
  const { ref: sectionsRef, style: sectionsStyle } = useFadeUp(100);
  const { ref: relRef, style: relStyle } = useFadeUp(150);

  const t = useT({
    de: {
      breadcrumb: "Behandlungen",
      atAGlance: "Auf einen Blick",
      technique: "Technik",
      effort: "Aufwand",
      anaesthesia: "Anästhesie",
      relatedHeading: "Weitere Verfahren",
      backLink: "← Zurück zu den Behandlungen",
      notFound: "Behandlung nicht gefunden",
      notFoundBack: "← Zurück zu den Behandlungen",
      bookingBody:
        "Vereinbaren Sie jetzt einen Termin. Termine zeitnah nach Verfügbarkeit, ohne Überweisung.",
      bookingCta: "Online buchen",
    },
    en: {
      breadcrumb: "Treatments",
      atAGlance: "At a glance",
      technique: "Technique",
      effort: "Effort",
      anaesthesia: "Anaesthesia",
      relatedHeading: "Other procedures",
      backLink: "← Back to treatments",
      notFound: "Treatment not found",
      notFoundBack: "← Back to treatments",
      bookingBody:
        "Appointments are available promptly, subject to availability, and no referral is required.",
      bookingCta: "Book online",
    },
  });

  if (!treatment) {
    return (
      <div className="min-h-screen bg-[#F9F8F4]">
        <PageHeader activeRoute="/behandlungen" />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <p className="font-display text-3xl text-[#212121] mb-4">
              {t.notFound}
            </p>
            <Link
              to="/behandlungen"
              className="text-sm text-[#AC8F52] hover:underline"
            >
              {t.notFoundBack}
            </Link>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }

  const content = getTreatmentContent(treatment, lang);
  const categoryLabel = CATEGORY_LABELS[treatment.categoryId]?.[lang] ?? "";

  const relatedTreatments = treatment.relatedIds
    .map((id) => TREATMENTS.find((tr) => tr.id === id))
    .filter(Boolean) as Treatment[];

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      <PageHeader activeRoute="/behandlungen" />

      <main>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${treatment.photo})`,
              animation: "kenBurns 25s ease-in-out infinite alternate",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-6 left-0 px-5 lg:px-12">
            <Link
              to="/behandlungen"
              className="text-xs text-white/60 hover:text-white transition-colors tracking-wide"
            >
              ← {t.breadcrumb}
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-[1440px] mx-auto w-full">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-2">
              {categoryLabel}
            </p>
            <h1
              className="font-display text-[1.75rem] sm:text-4xl lg:text-6xl font-semibold text-white leading-tight [hyphens:auto]"
              lang={lang}
            >
              {content.name}
            </h1>
            <p className="mt-2 text-white/70 text-lg not-italic font-display">
              {content.tagline}
            </p>
            <TerminButton className="mt-6" />
          </div>
        </section>

        {/* Overview: intro + at-a-glance sidebar */}
        <section className="py-14 lg:py-20 bg-white">
          <div
            ref={overviewRef}
            style={overviewStyle}
            className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16"
          >
            <div className="lg:col-span-2">
              <p className="text-lg text-[#595959] leading-relaxed">
                {content.intro}
              </p>
            </div>
            <div>
              <div className="border-l-4 border-[#AC8F52] pl-5 py-2">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-4">
                  {t.atAGlance}
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#747474] uppercase tracking-wider mb-0.5">
                      {t.technique}
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      {content.bullets.technique}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#747474] uppercase tracking-wider mb-0.5">
                      {t.effort}
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      {content.bullets.effort}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#747474] uppercase tracking-wider mb-0.5">
                      {t.anaesthesia}
                    </p>
                    <p className="text-sm font-medium text-[#212121]">
                      {content.bullets.anaesthesia}
                    </p>
                  </div>
                </div>
              </div>
              <TerminButton variant="outlineDark" size="sm" className="mt-6 w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* Content sections */}
        {content.sections.length > 0 && (
          <section className="py-12 lg:py-16 bg-[#F9F8F4]">
            <div
              ref={sectionsRef}
              style={sectionsStyle}
              className="mx-auto max-w-6xl px-5 lg:px-8 space-y-10"
            >
              {content.sections.map((section, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-12 items-start"
                >
                  <h2 className="font-display text-xl font-semibold text-[#212121] leading-snug">
                    {section.heading}
                  </h2>
                  <p className="text-[#595959] leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related treatments */}
        {relatedTreatments.length > 0 && (
          <section className="py-12 lg:py-16 bg-white">
            <div ref={relRef} style={relStyle} className="mx-auto max-w-6xl px-5 lg:px-8">
              <h2 className="font-display text-2xl font-semibold text-[#212121] mb-6">
                {t.relatedHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedTreatments.map((rel) => (
                  <RelatedCard key={rel.id} treatment={rel} lang={lang} />
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
