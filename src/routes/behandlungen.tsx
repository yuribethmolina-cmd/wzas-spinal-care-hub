import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { useT } from "@/lib/lang";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const HERO_PHOTO = "https://www.wzas.de/wp-content/uploads/2026/06/Header-Rueckenbehandlung.webp";
const BASE = "https://www.wzas.de/wp-content/uploads";

const BASE_CATEGORIES = [
  { id: "ohne-operation", photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-021.webp` },
  { id: "minimalinvasiv", photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-053.webp` },
  { id: "chirurgie", photo: `${BASE}/2026/05/db640b7718e314a38996cce985205bc2.jpg` },
];

type Method = { name: string; desc: string };
type Category = { id: string; name: string; description: string; photo: string; methods: Method[] };

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

function SpectrumCard({ cat, index }: { cat: Category; index: number }) {
  const { ref, style } = useFadeUp(index * 80);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={style}
      className="relative overflow-hidden aspect-[16/9] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cat.photo})`,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: `transform 700ms ${EASE}`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      <div className="absolute bottom-0 left-0 p-5 lg:p-6">
        <p className="text-white font-display font-semibold text-xl leading-tight">{cat.name}</p>
        <p className="mt-2 text-white/70 text-sm leading-snug">{cat.description}</p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/behandlungen")({
  head: () => ({
    meta: [
      { title: "Rückenbehandlungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Konservative Therapie, minimalinvasive Verfahren und Wirbelsäulenchirurgie am WZAS München. Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig." },
    ],
  }),
  component: BehandlungenPage,
});

function BehandlungenPage() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);
  const { ref: methodsRef, style: methodsStyle } = useFadeUp(0);
  const { ref: bridgeRef, style: bridgeStyle } = useFadeUp(0);

  const catTranslations = useT({
    de: [
      {
        name: "Verfahren ohne Operation",
        description: "Schmerztherapie, Infiltrationen und Rehabilitation — mit dem Ziel, natürliche Beweglichkeit zu erhalten.",
        methods: [
          { name: "Infiltrationstherapie", desc: "Gezielte Injektionen mit entzündungshemmenden Wirkstoffen direkt an die Schmerzquelle." },
          { name: "Medikamentöse Therapie", desc: "Individuell angepasste Schmerztherapie und Muskelrelaxantien für akute und chronische Beschwerden." },
          { name: "Physiotherapie", desc: "Gezielte Kräftigung der Rumpfmuskulatur zur Stabilisierung und Entlastung der Wirbelsäule." },
        ],
      },
      {
        name: "Minimalinvasive Verfahren",
        description: "Kleine Eingriffe mit großer Wirkung — wenn konservative Mittel ausgeschöpft sind.",
        methods: [
          { name: "Facettengelenk-Infiltration", desc: "Präzise Injektion zur Behandlung von Spondylarthrose und Facettengelenksschmerzen." },
          { name: "Radiofrequenzablation", desc: "Minimalinvasive Denervierung zur langfristigen Linderung von Facetten- und ISG-Schmerzen." },
          { name: "Kyphoplastie", desc: "Stabilisierung osteoporotischer Wirbelkörperfrakturen durch Einbringen von Knochenzement." },
        ],
      },
      {
        name: "Wirbelsäulenchirurgie",
        description: "Operative Versorgung — wenn konservative und minimalinvasive Maßnahmen keine ausreichende Linderung bringen.",
        methods: [
          { name: "Mikrochirurgische Verfahren", desc: "Dekompression eingeklemmter Nervenwurzeln unter dem Mikroskop — schonend und präzise." },
          { name: "Stabilisierende Verfahren", desc: "Spondylodese und Fusionsoperationen zur dauerhaften Stabilisierung instabiler Wirbelsäulensegmente." },
        ],
      },
    ],
    en: [
      {
        name: "Non-surgical Treatments",
        description: "Pain therapy, injections and rehabilitation — aimed at preserving natural mobility.",
        methods: [
          { name: "Injection Therapy", desc: "Targeted injections with anti-inflammatory agents directly at the source of pain." },
          { name: "Medication Therapy", desc: "Individually tailored pain management and muscle relaxants for acute and chronic symptoms." },
          { name: "Physiotherapy", desc: "Targeted strengthening of the core muscles to stabilise and relieve the spine." },
        ],
      },
      {
        name: "Minimally Invasive Procedures",
        description: "Small interventions with major effect — when conservative measures have been exhausted.",
        methods: [
          { name: "Facet Joint Injection", desc: "Precise injection for the treatment of spondylarthrosis and facet joint pain." },
          { name: "Radiofrequency Ablation", desc: "Minimally invasive denervation for long-term relief of facet and SI joint pain." },
          { name: "Kyphoplasty", desc: "Stabilisation of osteoporotic vertebral fractures by injection of bone cement." },
        ],
      },
      {
        name: "Spinal Surgery",
        description: "Surgical treatment — when conservative and minimally invasive measures provide insufficient relief.",
        methods: [
          { name: "Microsurgical Procedures", desc: "Decompression of trapped nerve roots under the microscope — gentle and precise." },
          { name: "Stabilisation Procedures", desc: "Spondylodesis and fusion surgery for permanent stabilisation of unstable spinal segments." },
        ],
      },
    ],
  });

  const categories: Category[] = BASE_CATEGORIES.map((base, i) => ({
    ...base,
    ...catTranslations[i],
  }));

  const bridgeConditions = useT({
    de: [
      { id: "bandscheibenvorfall", name: "Bandscheibenvorfall" },
      { id: "rueckenschmerzen", name: "Rückenschmerzen" },
      { id: "wirbelkanalverengung", name: "Spinalkanalstenose" },
    ],
    en: [
      { id: "bandscheibenvorfall", name: "Herniated Disc" },
      { id: "rueckenschmerzen", name: "Back Pain" },
      { id: "wirbelkanalverengung", name: "Spinal Stenosis" },
    ],
  });

  const t = useT({
    de: {
      heroEyebrow: "München · Stiglmaierplatz",
      heroH1: "Rücken­behandlungen",
      heroSubtitle: "Von der Infiltration bis zur Mikrochirurgie — individuell abgestimmt.",
      introHeading: "Behandlungsmöglichkeiten im Überblick",
      introParagraph: "Rückenschmerzen haben viele Ursachen — die Behandlung muss deshalb individuell sein. Im Wirbelsäulenzentrum am Stiglmaierplatz in München begleiten wir unsere Patienten vom ersten Gespräch bis zur Beschwerdefreiheit: mit einem ganzheitlichen Blick auf Körper und Befund, nicht nur auf das Symptom. Wir denken in drei Stufen: Verfahren ohne Operation, minimalinvasive Eingriffe und Wirbelsäulenchirurgie.",
      pullQuote: "„Jeder Patient bekommt genau das, was sein Befund erfordert.“",
      pullQuoteAttribution: "— WZAS Grundsatz",
      spectrumHeading: "Das Behandlungsspektrum",
      bridgeParagraph: "Noch keine Diagnose? Zuerst Ihr Krankheitsbild verstehen.",
      bookingHeading: "Welche Behandlung ist die richtige für mich?",
      bookingBody: "Vereinbaren Sie einen Termin. Unsere Spezialisten klären gemeinsam mit Ihnen, welche Therapie am besten zu Ihrer Situation passt.",
      bookingCta: "Online Termin buchen",
      bookingSecondary: "Zuerst Beschwerdebild ansehen →",
    },
    en: {
      heroEyebrow: "Munich · Stiglmaierplatz",
      heroH1: "Spine Treatments",
      heroSubtitle: "From injection therapy to microsurgery — individually tailored.",
      introHeading: "Treatment options at a glance",
      introParagraph: "Back pain has many causes — treatment must therefore be individual. At the Spine Centre at Stiglmaierplatz in Munich, we accompany our patients from the first consultation through to full recovery: with a holistic view of the body and findings, not just the symptom. We work in three stages: non-surgical treatments, minimally invasive procedures and spinal surgery.",
      pullQuote: "“Every patient receives exactly what their diagnosis requires.”",
      pullQuoteAttribution: "— WZAS principle",
      spectrumHeading: "The treatment spectrum",
      bridgeParagraph: "No diagnosis yet? First understand your condition.",
      bookingHeading: "Which treatment is right for me?",
      bookingBody: "Book an appointment. Our specialists will work with you to determine which therapy best fits your situation.",
      bookingCta: "Book appointment online",
      bookingSecondary: "View conditions first →",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/behandlungen" />

      <main>
        {/* Hero */}
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

        {/* Intro + philosophy */}
        <section className="py-14 lg:py-20 bg-white">
          <div ref={introRef} style={introStyle} className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-5">
                {t.introHeading}
              </h2>
              <p className="text-lg text-[#4A5568] leading-relaxed">
                {t.introParagraph}
              </p>
            </div>
            <div className="border-l-4 border-[#AC8F52] pl-6">
              <p className="font-display text-2xl lg:text-3xl italic text-[#1E2535] leading-snug">
                {t.pullQuote}
              </p>
              <p className="mt-3 text-xs text-[#8C939B] tracking-widest uppercase">{t.pullQuoteAttribution}</p>
            </div>
          </div>
        </section>

        {/* Treatment spectrum */}
        <section className="py-12 lg:py-16 bg-[#F8F8F6]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1E2535] mb-3">
              {t.spectrumHeading}
            </h2>
            {/* Gold connector line with dots — desktop only */}
            <div className="hidden lg:flex items-center mb-6 mt-6">
              {categories.map((cat, i) => (
                <React.Fragment key={cat.id}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#AC8F52]" />
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[#AC8F52] whitespace-nowrap">
                      {cat.name}
                    </p>
                  </div>
                  {i < categories.length - 1 && (
                    <div className="flex-1 h-px bg-[#AC8F52]/40 mx-3" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {categories.map((cat, i) => (
                <SpectrumCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Methods expansion */}
        <section className="py-12 lg:py-16 bg-white">
          <div ref={methodsRef} style={methodsStyle} className="mx-auto max-w-6xl px-5 lg:px-8 space-y-14">
            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52] mb-1">
                  {cat.name}
                </p>
                <div className="h-px bg-[#E2E4E7] mb-6" />
                <div className="space-y-5">
                  {cat.methods.map((method) => (
                    <div key={method.name} className="flex gap-4 items-start">
                      <svg className="w-5 h-5 text-[#AC8F52] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="font-semibold text-[#1E2535]">{method.name}</p>
                        <p className="text-sm text-[#4A5568] leading-relaxed mt-0.5">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bridge to beschwerden */}
        <section className="py-12 bg-[#F8F8F6] border-t border-[#E2E4E7]">
          <div ref={bridgeRef} style={bridgeStyle} className="mx-auto max-w-6xl px-5 lg:px-8 text-center">
            <p className="text-[#8C939B] mb-5">
              {t.bridgeParagraph}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {bridgeConditions.map((c) => (
                <Link
                  key={c.id}
                  to="/beschwerden/$slug"
                  params={{ slug: c.id }}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#1E2535] px-5 py-2.5 text-sm font-medium text-[#1E2535] transition-all hover:bg-[#AC8F52] hover:border-[#AC8F52] hover:text-[#1E2535]"
                >
                  {c.name}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          heading={t.bookingHeading}
          body={t.bookingBody}
          ctaCopy={t.bookingCta}
          secondaryLabel={t.bookingSecondary}
          secondaryHref="/beschwerden"
        />
      </main>

      <PageFooter />
    </div>
  );
}
