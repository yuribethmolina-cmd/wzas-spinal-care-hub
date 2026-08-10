import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { useT } from "@/lib/lang";
import { DOCS, PdfIcon, TOPICS, type TopicId } from "@/lib/infomaterial";

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

type FaqItem = { de: { q: string; a: string }; en: { q: string; a: string } };

const FAQ_ITEMS: FaqItem[] = [
  {
    de: { q: "Brauche ich eine Überweisung?", a: "Nein. Sie können sich direkt anmelden — ohne Überweisung vom Hausarzt. Für gesetzlich Versicherte empfehlen wir dennoch eine Überweisung vom Facharzt, da diese die Abrechnung vereinfacht. Privatpatienten kommen jederzeit ohne Überweisung." },
    en: { q: "Do I need a referral?", a: "No. You can register directly — without a referral from your GP. For patients with statutory insurance we recommend a specialist referral as it simplifies billing. Private patients may come at any time without a referral." },
  },
  {
    de: { q: "Wie lange warte ich auf einen Termin?", a: "In der Regel erhalten Sie einen Termin etwa zwei bis drei Wochen nach Vereinbarung. Bei medizinischen Notfällen rufen Sie uns bitte direkt an: +49 (0)89-54 34 30 30." },
    en: { q: "How long is the wait for an appointment?", a: "As a rule you will receive an appointment approximately two to three weeks after scheduling. For medical emergencies please call us directly: +49 (0)89-54 34 30 30." },
  },
  {
    de: { q: "Welche Kassen werden akzeptiert?", a: "Wir behandeln Patienten aller gesetzlichen und privaten Krankenversicherungen sowie Selbstzahler. Die genauen Leistungen variieren je nach Versicherungsvertrag — sprechen Sie uns bei Fragen gerne an." },
    en: { q: "Which insurances do you accept?", a: "We treat patients with all statutory and private health insurances as well as self-paying patients. The exact covered services vary by insurance contract — please contact us if you have questions." },
  },
  {
    de: { q: "Was soll ich zum Ersttermin mitbringen?", a: "Bringen Sie bitte mit: Ihre Krankenversicherungskarte, alle vorhandenen Bilder (MRT, CT, Röntgenaufnahmen) auf CD oder als Ausdruck, Befundberichte und Arztbriefe früherer Behandlungen sowie eine Liste Ihrer aktuellen Medikamente." },
    en: { q: "What should I bring to my first appointment?", a: "Please bring: your health insurance card, all existing imaging (MRI, CT, X-rays) on CD or printout, reports and letters from previous treatments, and a list of your current medications." },
  },
  {
    de: { q: "Bedeutet meine Diagnose automatisch eine Operation?", a: "Nein — keineswegs. Mehr als 90% unserer Patienten werden ohne Operation behandelt. Wir verfolgen konsequent den Grundsatz: konservativ wenn möglich, operativ wenn nötig. In einem ausführlichen Erstgespräch besprechen wir alle Optionen." },
    en: { q: "Does my diagnosis automatically mean surgery?", a: "Not at all. More than 90% of our patients are treated without surgery. We consistently follow the principle: conservative care when possible, surgery only when necessary. We discuss all options in detail at your first appointment." },
  },
  {
    de: { q: "Wie läuft ein Ersttermin ab?", a: "Ein Ersttermin dauert in der Regel 30 bis 45 Minuten. Der Ablauf: ausführliche Anamnese und Beschwerdebeschreibung, körperliche Untersuchung, Besprechung vorhandener Befunde und Bildgebung, Erklärung möglicher Diagnosen und Therapieoptionen, gemeinsames Festlegen des nächsten Schrittes." },
    en: { q: "What happens at a first appointment?", a: "A first appointment typically takes 30 to 45 minutes. The process: detailed medical history and symptom description, physical examination, review of existing findings and imaging, explanation of possible diagnoses and treatment options, and jointly deciding the next step." },
  },
  {
    de: { q: "Wo finden Operationen statt?", a: "Wenn ein operativer Eingriff notwendig ist, wird dieser in der WolfartKlinik München-Gräfelfing durchgeführt — einer der führenden Privatkliniken für Neurochirurgie und Orthopädie in Bayern. Unsere Chirurgen begleiten Sie durch den gesamten Prozess." },
    en: { q: "Where do surgeries take place?", a: "When a surgical procedure is required, it is performed at the WolfartKlinik Munich-Gräfelfing — one of Bavaria's leading private clinics for neurosurgery and orthopaedics. Our surgeons accompany you through the entire process." },
  },
  {
    de: { q: "Wie lange dauert die Genesung nach einer OP?", a: "Das hängt stark von der Art des Eingriffs ab. Minimalinvasive Eingriffe: häufig 2–4 Wochen. Größere Fusionsoperationen: 6–12 Wochen. Im Entlassgespräch erhalten Sie einen individualisierten Genesungsplan mit allen wichtigen Schritten und Kontrolleterminen." },
    en: { q: "How long is recovery after surgery?", a: "This depends strongly on the type of procedure. Minimally invasive procedures: often 2–4 weeks. Larger fusion operations: 6–12 weeks. At discharge you receive an individualised recovery plan with all key milestones and follow-up appointments." },
  },
  {
    de: { q: "Bieten Sie Physiotherapie an?", a: "Physiotherapie ist ein wichtiger Baustein unseres konservativen Behandlungskonzepts. Wir koordinieren die Physiotherapie in enger Zusammenarbeit mit qualifizierten Praxen und geben Ihnen bei Bedarf eine Überweisung zu unseren Partnern." },
    en: { q: "Do you offer physiotherapy?", a: "Physiotherapy is an important component of our conservative treatment approach. We coordinate physiotherapy in close collaboration with qualified practices and issue referrals to our partners as needed." },
  },
  {
    de: { q: "Wie erreiche ich das Zentrum?", a: "Wir befinden uns in der Nymphenburger Straße 1, 80335 München, direkt am Stiglmaierplatz (gegenüber dem Löwenbräukeller). U-Bahn: U1, Haltestelle Stiglmaierplatz. Straßenbahn: Linie 21 ab Hauptbahnhof. Parkhaus: im Gebäude, Zufahrt über die Seidlstraße." },
    en: { q: "How do I get to the centre?", a: "We are at Nymphenburger Straße 1, 80335 Munich, at Stiglmaierplatz (opposite the Löwenbräukeller). U-Bahn: U1, stop Stiglmaierplatz. Tram: line 21 from the main station (Hauptbahnhof). Car park: in the building, entrance via Seidlstraße." },
  },
];

const GALLERY = Array.from({ length: 6 }, (_, i) => `/gallery/praxis-0${i + 1}.webp`);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Häufige Fragen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Antworten auf die häufigsten Fragen von Patienten: Überweisung, Wartezeiten, Kassenleistungen, Ablauf des Ersttermins und Genesungszeit nach Operationen." },
    ],
  }),
  component: FaqPage,
});

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E2E4E7]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#1E2535]">{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#AC8F52] transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 pr-8">
          <p className="text-sm text-[#4A5568] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: faqRef, style: faqStyle } = useFadeUp(0);
  const { ref: galleryRef, style: galleryStyle } = useFadeUp(0);
  const { ref: downloadsRef, style: downloadsStyle } = useFadeUp(0);

  const t = useT({
    de: {
      heroEyebrow: "PATIENTENINFORMATIONEN",
      heroH1: "Häufige Fragen",
      heroSubtitle: "Alles, was Sie vor Ihrem ersten Termin wissen möchten.",
      faqSectionBg: "bg-white",
      galleryLabel: "DIE PRAXIS",
      galleryHeading: "Einblicke in unser Zentrum",
      downloadsLabel: "DOWNLOADS",
      downloadsHeading: "Infomaterial",
      downloadsBody: "Broschüren und Merkblätter zum Herunterladen — in Ruhe nachlesen, wann immer Sie möchten.",
      download: "PDF herunterladen",
      filterLabel: "Nach Thema filtern",
      filterAll: "Alle",
      noResults: "Keine Dokumente zu diesem Thema.",
      pending: "In Vorbereitung",
      pdfLabel: "PDF",
      bookingHeading: "Haben Sie noch Fragen?",
      bookingBody: "Rufen Sie uns an oder vereinbaren Sie direkt einen Termin online. Unser Team hilft Ihnen gerne weiter.",
      bookingCta: "Termin buchen",
      bookingSecondary: "+49 (0)89-54 34 30 30",
    },
    en: {
      heroEyebrow: "PATIENT INFORMATION",
      heroH1: "Frequently asked questions",
      heroSubtitle: "Everything you want to know before your first appointment.",
      faqSectionBg: "bg-white",
      galleryLabel: "THE PRACTICE",
      galleryHeading: "A look inside our centre",
      downloadsLabel: "DOWNLOADS",
      downloadsHeading: "Resources",
      downloadsBody: "Brochures and information sheets to download — read them at your own pace, whenever you like.",
      download: "Download PDF",
      filterLabel: "Filter by topic",
      filterAll: "All",
      noResults: "No documents for this topic.",
      pending: "Coming soon",
      pdfLabel: "PDF",
      bookingHeading: "Still have questions?",
      bookingBody: "Call us or book an appointment online directly. Our team is happy to help.",
      bookingCta: "Book appointment",
      bookingSecondary: "+49 (0)89-54 34 30 30",
    },
  });

  const lang = useT({ de: "de" as const, en: "en" as const });

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const visibleDocs = topic === "all" ? DOCS : DOCS.filter((d) => d.topics.includes(topic));

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/faq" />

      <main>
        {/* Hero — color bg, no photo */}
        <section
          className="relative flex items-end"
          style={{ background: "#1E2535", minHeight: "40vh" }}
        >
          <div className="px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-3">
              {t.heroEyebrow}
            </p>
            <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white leading-tight">
              {t.heroH1}
            </h1>
            <p className="mt-3 text-white/75 text-lg">
              {t.heroSubtitle}
            </p>
          </div>
        </section>

        {/* FAQ accordion */}
        <section className="py-16 bg-white">
          <div ref={faqRef} style={faqStyle} className="mx-auto max-w-3xl px-5 lg:px-8">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                q={item[lang].q}
                a={item[lang].a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </section>

        {/* Gallery strip */}
        <section className="py-12 bg-[#F8F8F6]">
          <div ref={galleryRef} style={galleryStyle} className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-2">
              {t.galleryLabel}
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-6">
              {t.galleryHeading}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-[#AC8F52]" tabIndex={0} role="region" aria-label="Praxis Galerie">
              {GALLERY.map((src, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] w-64 flex-shrink-0 bg-cover bg-center rounded-sm"
                  style={{ backgroundImage: `url(${src})` }}
                  role="img"
                  aria-label={`Praxis Einblick ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section className="py-16 bg-white border-t border-[#E2E4E7]">
          <div ref={downloadsRef} style={downloadsStyle} className="mx-auto max-w-3xl px-5 lg:px-8">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-2">
              {t.downloadsLabel}
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#1E2535]">
              {t.downloadsHeading}
            </h2>
            <p className="mt-3 text-sm text-[#4A5568] leading-relaxed">{t.downloadsBody}</p>

            <div className="mt-6" role="group" aria-label={t.filterLabel}>
              <p className="text-[11px] font-semibold tracking-wide uppercase text-[#8C939B] mb-3">
                {t.filterLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {[{ id: "all" as const, label: t.filterAll }, ...TOPICS.map((tp) => ({ id: tp.id, label: tp[lang] }))].map((tp) => {
                  const active = topic === tp.id;
                  return (
                    <button
                      key={tp.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTopic(tp.id)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                        active
                          ? "border-[#AC8F52] bg-[#AC8F52] text-[#1E2535]"
                          : "border-[#E2E4E7] bg-white text-[#4A5568] hover:border-[#AC8F52]"
                      }`}
                    >
                      {tp.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              {visibleDocs.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border border-[#E2E4E7] rounded-sm p-5 bg-white"
                >
                  <PdfIcon />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#1E2535]">{doc[lang].title}</h3>
                    <p className="mt-1 text-sm text-[#4A5568] leading-relaxed">{doc[lang].desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {doc.topics.map((id) => {
                        const tp = TOPICS.find((x) => x.id === id);
                        if (!tp) return null;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setTopic(id)}
                            className="rounded-full bg-[#F3F0E9] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A7440] hover:bg-[#E8E1D2] transition"
                          >
                            {tp[lang]}
                          </button>
                        );
                      })}
                    </div>
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
            {visibleDocs.length === 0 && (
              <p className="mt-8 text-sm text-[#4A5568]">{t.noResults}</p>
            )}
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
