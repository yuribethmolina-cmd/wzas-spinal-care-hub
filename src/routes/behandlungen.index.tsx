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
  { id: "interventionell", photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-053.webp` },
  { id: "chirurgie", photo: `${BASE}/2026/05/db640b7718e314a38996cce985205bc2.jpg` },
];

const CATEGORY_PHOTOS: Record<string, string> = {
  "ohne-operation": "/gallery/praxis-01.webp",
  "interventionell": "/treatment-minimalinvasiv.webp",
  "chirurgie": "/wolfart-klinik.jpg",
};

type Method = { name: string; desc: string; slug?: string };
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

function WolfartCallout() {
  const t = useT({
    de: {
      label: "Operationsstandort",
      heading: "WolfartKlinik München-Gräfelfing",
      body: "Operative Eingriffe führen unsere Chirurgen in der WolfartKlinik München-Gräfelfing durch, einer der führenden Privatkliniken für Neurochirurgie und Orthopädie in Bayern. Modernste OP-Säle, erfahrenes OP-Personal und eine lückenlose Abstimmung zwischen Praxis und Klinik sichern optimale Ergebnisse.",
      link: "Mehr über unseren Klinikpartner →",
    },
    en: {
      label: "Surgical facility",
      heading: "WolfartKlinik Munich-Gräfelfing",
      body: "Our surgeons perform all operative procedures at the WolfartKlinik Munich-Gräfelfing, one of Bavaria's leading private clinics for neurosurgery and orthopaedics. State-of-the-art theatres, experienced surgical staff and seamless coordination between practice and clinic ensure optimal outcomes.",
      link: "Learn more about our clinic partner →",
    },
  });
  return (
    <div className="mt-6 border-l-4 border-[#AC8F52] bg-[#F9F8F4] pl-5 py-4 pr-4">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#AC8F52] mb-1">{t.label}</p>
      <p className="font-display text-lg font-semibold text-[#212121] mb-2">{t.heading}</p>
      <p className="text-sm text-[#595959] leading-relaxed">{t.body}</p>
      <a href="/wolfart" className="inline-flex min-h-11 items-center mt-3 text-xs font-semibold text-[#97745B] hover:brightness-110 transition">
        {t.link}
      </a>
    </div>
  );
}

export const Route = createFileRoute("/behandlungen/")({
  head: () => ({
    meta: [
      { title: "Rückenbehandlungen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Konservative Therapie, minimalinvasive Verfahren und Wirbelsäulenchirurgie am WZAS München. Unser Grundsatz: konservative Behandlung, wenn möglich, Operation, wenn nötig." },
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
        name: "Medikamentöse Therapie",
        description: "Schmerz- und entzündungshemmende Medikamente durchbrechen den Teufelskreis aus Schmerz, Schonhaltung und Verspannung — immer individuell auf den Befund abgestimmt.",
        methods: [
          { name: "Medikamentöse Therapie", desc: "Schmerz- und entzündungshemmende Medikamente, individuell auf Ihren Befund abgestimmt." },
          { name: "Tabletten", desc: "Die einfachste Form der Schmerztherapie, stets unter ärztlicher Aufsicht für optimale Dosierung und geringe Nebenwirkungen." },
          { name: "Infusionstherapie", desc: "Reichen Tabletten nicht aus, wird das Schmerzmittel direkt in eine Vene geleitet und wirkt rasch im gesamten Körper." },
        ],
      },
      {
        name: "Interventionelle Verfahren",
        description: "Gezielter als Tabletten allein, schonender als eine OP — bildgestützte Eingriffe direkt an der Schmerzquelle oder am Nervensystem.",
        methods: [
          { name: "Infiltrationstherapie", desc: "Gezielte Injektionen mit entzündungshemmenden Wirkstoffen unter Röntgen- oder CT-Kontrolle direkt an die Schmerzquelle.", slug: "infiltrationstherapie" },
          { name: "Hitzesonden-Behandlung", desc: "Eine Sonde erhitzt die feinen Nerven am Wirbelgelenk unter Bildkontrolle und unterbricht so dauerhaft die Schmerzleitung.", slug: "hitzesonden-behandlung" },
          { name: "Schmerzpumpen (IDD)", desc: "Ein kleines Implantat gibt Schmerzmittel kontinuierlich direkt im Bereich des Rückenmarks ab.", slug: "schmerzpumpen-idd" },
          { name: "Schmerz-Schrittmacher (SCS)", desc: "Schwache elektrische Impulse ans Rückenmark unterbrechen die Weiterleitung der Schmerzsignale — Studien belegen bis zu 80 % Reduktion.", slug: "schmerz-schrittmacher-scs" },
        ],
      },
      {
        name: "Wirbelsäulenchirurgie",
        description: "Modernste mikrochirurgische Techniken: präzise, schonend und mit dem klaren Ziel, Ihre natürliche Beweglichkeit zu erhalten.",
        methods: [
          { name: "Mikrochirurgische Verfahren", desc: "Operation unter dem hochauflösenden Operationsmikroskop über kleinste Schnitte, präzise und gewebeschonend.", slug: "mikrochirurgische-verfahren" },
          { name: "Bewegungserhaltende Verfahren", desc: "Dynamische Rekonstruktion und Stabilisierung erkrankter Segmente als Alternative zur Versteifung.", slug: "bewegungserhaltende-verfahren" },
          { name: "Stabilisierende Verfahren", desc: "Implantate, Verschraubungen oder Spondylodese, wenn eine Instabilität die Beschwerden verursacht.", slug: "stabilisierende-verfahren" },
        ],
      },
    ],
    en: [
      {
        name: "Medical / Non-surgical Therapy",
        description: "Pain-relieving and anti-inflammatory medication breaks the cycle of pain, guarded movement and muscle tension — always tailored to the individual diagnosis.",
        methods: [
          { name: "Medication", desc: "Pain-relieving and anti-inflammatory medication tailored to your diagnosis." },
          { name: "Oral medication", desc: "A straightforward form of pain management, prescribed and monitored for the right dose, good tolerability and minimal side effects." },
          { name: "Infusion Therapy", desc: "If tablets are not enough, the painkiller goes straight into a vein and takes effect quickly throughout the body." },
        ],
      },
      {
        name: "Interventional Procedures",
        description: "More targeted than medication alone, less invasive than surgery — image-guided procedures at the source of pain or directly on the nervous system.",
        methods: [
          { name: "Injection Therapy", desc: "Targeted injections with anti-inflammatory agents under X-ray or CT guidance, directly at the source of pain.", slug: "infiltrationstherapie" },
          { name: "Heat Probe Treatment", desc: "A probe heats the fine nerves at the facet joint under image guidance, permanently interrupting pain conduction.", slug: "hitzesonden-behandlung" },
          { name: "Pain Pumps (IDD)", desc: "A small implant delivers pain medication continuously right at the spinal cord.", slug: "schmerzpumpen-idd" },
          { name: "Spinal Cord Stimulation (SCS)", desc: "Mild electrical impulses to the spinal cord modify pain signals — studies show up to 80 % reduction.", slug: "schmerz-schrittmacher-scs" },
        ],
      },
      {
        name: "Spinal Surgery",
        description: "Modern microsurgical techniques are designed to be precise and tissue-sparing, with the aim of preserving natural mobility wherever possible.",
        methods: [
          { name: "Microsurgical Procedures", desc: "Surgery through the smallest incisions using a high-resolution operating microscope, precise and tissue-sparing.", slug: "mikrochirurgische-verfahren" },
          { name: "Motion-Preserving Procedures", desc: "Dynamic reconstruction and stabilisation of affected segments as an alternative to fusion.", slug: "bewegungserhaltende-verfahren" },
          { name: "Stabilisation Procedures", desc: "Implants, screw fixation or spondylodesis when instability is causing the symptoms.", slug: "stabilisierende-verfahren" },
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
      readMore: "Mehr lesen →",
      heroEyebrow: "München · Stiglmaierplatz",
      heroH1: "Rücken­behandlungen",
      heroSubtitle: "Von der Infiltration bis zur Mikrochirurgie, individuell abgestimmt.",
      introHeading: "Behandlungsmöglichkeiten im Überblick",
      introParagraph: "Rückenschmerzen haben viele Ursachen, die Behandlung muss deshalb individuell sein. Im Wirbelsäulenzentrum am Stiglmaierplatz in München begleiten wir unsere Patienten vom ersten Gespräch bis zur Beschwerdefreiheit: mit einem ganzheitlichen Blick auf Körper und Befund, nicht nur auf das Symptom. Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig. Wir denken in drei Stufen: Verfahren ohne Operation, minimalinvasive Eingriffe und Wirbelsäulenchirurgie.",
      pullQuote: "„Konservative Behandlung wenn möglich, Operation wenn nötig.“",
      pullQuoteAttribution: ", WZAS Grundsatz",
      spectrumHeading: "Das Behandlungsspektrum",
      bridgeParagraph: "Noch keine Diagnose? Zuerst Ihr Krankheitsbild verstehen.",
      bookingHeading: "Welche Behandlung ist die richtige für mich?",
      bookingBody: "Vereinbaren Sie einen Termin. Unsere Spezialisten klären gemeinsam mit Ihnen, welche Therapie am besten zu Ihrer Situation passt.",
      bookingCta: "Online-Termin buchen",
      bookingSecondary: "Zuerst Beschwerdebild ansehen →",
    },
    en: {
      readMore: "Learn more →",
      heroEyebrow: "Munich · Stiglmaierplatz",
      heroH1: "Spine Treatments",
      heroSubtitle: "From injection therapy to microsurgery, individually tailored.",
      introHeading: "Treatment options at a glance",
      introParagraph: "Back pain has many causes, so treatment needs to be tailored to the individual. At the Spine Center at Stiglmaierplatz in Munich, we support patients from their first consultation through recovery. We consider both the clinical findings and the person, not just the symptoms. Our principle is simple: conservative treatment first, surgery only when necessary. We offer three levels of care: non-surgical treatment, minimally invasive procedures and spinal surgery.",
      pullQuote: "“Conservative treatment where possible, surgery where necessary.”",
      pullQuoteAttribution: ", WZAS principle",
      spectrumHeading: "The treatment spectrum",
      bridgeParagraph: "No diagnosis yet? Start by exploring your symptoms.",
      bookingHeading: "Which treatment is right for me?",
      bookingBody: "Book an appointment and our specialists will discuss which treatment is most appropriate for you.",
      bookingCta: "Book an appointment online",
      bookingSecondary: "View conditions first →",
    },
  });

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
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
          <div className="absolute bottom-0 left-0 px-5 pb-10 lg:px-12 lg:pb-14 max-w-[1440px] mx-auto w-full">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-3">
              {t.heroEyebrow}
            </p>
            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-7xl font-semibold text-white leading-tight">
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
              <h2 className="font-display text-2xl font-semibold text-[#212121] mb-5">
                {t.introHeading}
              </h2>
              <p className="text-lg text-[#595959] leading-relaxed">
                {t.introParagraph}
              </p>
            </div>
            <div className="border-l-4 border-[#AC8F52] pl-6">
              <p className="font-display text-2xl lg:text-3xl font-bold text-[#212121] leading-snug">
                {t.pullQuote}
              </p>
              <p className="mt-3 text-xs text-[#666666] tracking-widest uppercase">{t.pullQuoteAttribution}</p>
            </div>
          </div>
        </section>

        {/* Treatment spectrum */}
        <section className="py-12 lg:py-16 bg-[#F9F8F4]">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#212121] mb-3">
              {t.spectrumHeading}
            </h2>
            {/* Gold connector line with dots, desktop only */}
            <div className="hidden lg:flex items-center mb-6 mt-6">
              {categories.map((cat, i) => (
                <React.Fragment key={cat.id}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-[10px] bg-[#AC8F52]" />
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
                <div className="h-px bg-[#E6E3DC] mb-6" />
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Photo */}
                  <div className="w-full lg:w-2/5 flex-shrink-0">
                    <div
                      className="w-full aspect-[4/3] bg-cover bg-center rounded-sm"
                      style={{ backgroundImage: `url(${CATEGORY_PHOTOS[cat.id]})` }}
                    />
                  </div>
                  {/* Methods list */}
                  <div className="flex-1 space-y-5">
                    {cat.methods.map((method) => (
                      <div key={method.name} className="flex gap-4 items-start">
                        <svg className="w-5 h-5 text-[#AC8F52] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                        <div>
                          <p className="font-semibold text-[#212121]">{method.name}</p>
                          <p className="text-sm text-[#595959] leading-relaxed mt-0.5">{method.desc}</p>
                          {method.slug && (
                            <Link
                              to="/behandlungen/$slug"
                              params={{ slug: method.slug }}
                              className="inline-flex items-center mt-1.5 text-xs font-semibold text-[#AC8F52] hover:brightness-110 transition"
                            >
                              {t.readMore}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                    {/* Wolfart callout, only for chirurgie category */}
                    {cat.id === "chirurgie" && <WolfartCallout />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bridge to beschwerden */}
        <section className="py-12 bg-[#F9F8F4] border-t border-[#E6E3DC]">
          <div ref={bridgeRef} style={bridgeStyle} className="mx-auto max-w-6xl px-5 lg:px-8 text-center">
            <p className="text-[#747474] mb-5">
              {t.bridgeParagraph}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/rueckendiagnostik"
                className="group inline-flex items-center gap-2 rounded-[10px] border border-[#AC8F52] bg-[#AC8F52]/10 px-5 py-2.5 text-sm font-semibold text-[#97745B] transition-all hover:bg-[#AC8F52] hover:text-[#212121]"
              >
                {t.bridgeParagraph.startsWith("No diagnosis") ? "Spine diagnostics" : "Rückendiagnostik"}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
              {bridgeConditions.map((c) => (
                <Link
                  key={c.id}
                  to="/beschwerden/$slug"
                  params={{ slug: c.id }}
                  className="group inline-flex items-center gap-2 rounded-[10px] border border-[#212121] px-5 py-2.5 text-sm font-medium text-[#212121] transition-all hover:bg-[#AC8F52] hover:border-[#AC8F52] hover:text-[#212121]"
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
