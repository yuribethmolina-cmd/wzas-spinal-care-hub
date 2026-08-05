import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { useT } from "@/lib/lang";

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

type Doc = {
  file: string | null;
  size?: string;
  de: { title: string; desc: string };
  en: { title: string; desc: string };
};

const DOCS: Doc[] = [
  {
    file: null,
    de: {
      title: "Ablauf der Behandlung",
      desc: "Von der ersten Kontaktaufnahme über Diagnostik und Therapie bis zur Nachsorge — Schritt für Schritt erklärt.",
    },
    en: {
      title: "Course of treatment",
      desc: "From first contact through diagnostics and therapy to follow-up care — explained step by step.",
    },
  },
  {
    file: null,
    de: {
      title: "Checkliste Ersttermin",
      desc: "Welche Unterlagen, Bilder und Informationen Sie zu Ihrem ersten Termin mitbringen sollten.",
    },
    en: {
      title: "First appointment checklist",
      desc: "Which documents, images and information to bring to your first appointment.",
    },
  },
  {
    file: null,
    de: {
      title: "Konservative Therapie im Überblick",
      desc: "Behandlungsmöglichkeiten ohne Operation: Infiltrationen, Physiotherapie, Schmerztherapie und multimodale Konzepte.",
    },
    en: {
      title: "Conservative therapy at a glance",
      desc: "Treatment options without surgery: injections, physiotherapy, pain management and multimodal concepts.",
    },
  },
  {
    file: null,
    de: {
      title: "Minimalinvasive Eingriffe",
      desc: "Information und Vorbereitung: Ablauf, Narkose, Aufenthalt und Genesung nach minimalinvasiven Operationen.",
    },
    en: {
      title: "Minimally invasive procedures",
      desc: "Information and preparation: procedure, anaesthesia, stay and recovery after minimally invasive surgery.",
    },
  },
];

export const Route = createFileRoute("/infomaterial")({
  head: () => ({
    meta: [
      { title: "Infomaterial für Patienten · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Informationsbroschüren zum Download: Ablauf der Behandlung, Checkliste für den Ersttermin, konservative Therapie und minimalinvasive Eingriffe." },
      { property: "og:title", content: "Infomaterial für Patienten · WZAS Wirbelsäulenzentrum München" },
      { property: "og:description", content: "PDF-Broschüren des WZAS zum Herunterladen — Behandlungsablauf, Ersttermin, konservative und minimalinvasive Therapie." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://wzas-spinal-care-hub.lovable.app/infomaterial" },
    ],
    links: [{ rel: "canonical", href: "https://wzas-spinal-care-hub.lovable.app/infomaterial" }],
  }),
  component: InfomaterialPage,
});

function PdfIcon() {
  return (
    <span
      className="flex-shrink-0 w-11 h-11 rounded-sm bg-[#F3F0E9] text-[#AC8F52] flex items-center justify-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15h6M9 18h4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function InfomaterialPage() {
  const { ref: listRef, style: listStyle } = useFadeUp(0);
  const lang = useT({ de: "de" as const, en: "en" as const });

  const t = useT({
    de: {
      heroEyebrow: "PATIENTENINFORMATIONEN",
      heroH1: "Infomaterial",
      heroSubtitle: "Broschüren und Merkblätter zum Herunterladen — in Ruhe nachlesen, wann immer Sie möchten.",
      sectionLabel: "DOWNLOADS",
      sectionHeading: "Unterlagen für Patienten",
      sectionBody: "Alle Dokumente sind kostenfrei als PDF verfügbar. Sie ersetzen kein ärztliches Gespräch, sollen Ihnen aber die Vorbereitung erleichtern.",
      download: "PDF herunterladen",
      pending: "In Vorbereitung",
      pdfLabel: "PDF",
      bookingHeading: "Fragen zu den Unterlagen?",
      bookingBody: "Rufen Sie uns an oder vereinbaren Sie direkt einen Termin online. Unser Team hilft Ihnen gerne weiter.",
      bookingCta: "Termin buchen",
      bookingSecondary: "+49 (0)89-54 34 30 30",
    },
    en: {
      heroEyebrow: "PATIENT INFORMATION",
      heroH1: "Resources",
      heroSubtitle: "Brochures and information sheets to download — read them at your own pace, whenever you like.",
      sectionLabel: "DOWNLOADS",
      sectionHeading: "Documents for patients",
      sectionBody: "All documents are available free of charge as PDFs. They do not replace a consultation, but should make your preparation easier.",
      download: "Download PDF",
      pending: "Coming soon",
      pdfLabel: "PDF",
      bookingHeading: "Questions about these documents?",
      bookingBody: "Call us or book an appointment online directly. Our team is happy to help.",
      bookingCta: "Book appointment",
      bookingSecondary: "+49 (0)89-54 34 30 30",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/infomaterial" />

      <main>
        {/* Hero */}
        <section className="relative flex items-end" style={{ background: "#1E2535", minHeight: "40vh" }}>
          <div className="px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-3">
              {t.heroEyebrow}
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white leading-tight">
              {t.heroH1}
            </h1>
            <p className="mt-3 text-white/75 text-lg max-w-2xl">{t.heroSubtitle}</p>
          </div>
        </section>

        {/* Downloads */}
        <section className="py-16 bg-white">
          <div ref={listRef} style={listStyle} className="mx-auto max-w-3xl px-5 lg:px-8">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-2">
              {t.sectionLabel}
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#1E2535]">
              {t.sectionHeading}
            </h2>
            <p className="mt-3 text-sm text-[#4A5568] leading-relaxed">{t.sectionBody}</p>

            <ul className="mt-8 space-y-4">
              {DOCS.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border border-[#E2E4E7] rounded-sm p-5 bg-white"
                >
                  <PdfIcon />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#1E2535]">{doc[lang].title}</h3>
                    <p className="mt-1 text-sm text-[#4A5568] leading-relaxed">{doc[lang].desc}</p>
                    <p className="mt-2 text-[11px] font-semibold tracking-wide uppercase text-[#8C939B]">
                      {t.pdfLabel}
                      {doc.file && doc.size ? ` · ${doc.size}` : ""}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    {doc.file ? (
                      <a
                        href={doc.file}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-5 py-2.5 text-xs font-semibold text-[#1E2535] hover:brightness-105 transition"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
                          <path d="M12 3v12M7 12l5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {t.download}
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-[#E2E4E7] px-4 py-2 text-xs font-semibold text-[#8C939B]">
                        {t.pending}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <BookingCTA
          heading={t.bookingHeading}
          body={t.bookingBody}
          ctaCopy={t.bookingCta}
          secondaryLabel={t.bookingSecondary}
          secondaryHref="tel:+498954343030"
        />
      </main>

      <PageFooter />
    </div>
  );
}
