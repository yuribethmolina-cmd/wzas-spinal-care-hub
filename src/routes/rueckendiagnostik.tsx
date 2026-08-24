import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { useT } from "@/lib/lang";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const BASE = "https://www.wzas.de/wp-content/uploads";
const HERO_PHOTO = `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-047.webp`;
const PATH_PHOTO = `${BASE}/2026/05/Wirbelsaeulenzentrum-050.webp`;
const FINDING_PHOTO = `${BASE}/2026/06/Diagnostik.webp`;
const MRT_PHOTO = `${BASE}/2026/06/Medikamentoese-Therapie-2.webp`;

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

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#AC8F52]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type DiagFaqItem = { de: { q: string; a: string }; en: { q: string; a: string } };

const DIAG_FAQ: DiagFaqItem[] = [
  {
    de: {
      q: "Brauche ich eine Überweisung für die Diagnostik?",
      a: "Nein. Sie können sich direkt an unser Wirbelsäulenzentrum am Stiglmaierplatz wenden, ohne vorher einen Hausarzt aufzusuchen. Wir empfehlen lediglich, vorhandene Arztbriefe und Bildaufnahmen mitzubringen.",
    },
    en: {
      q: "Do I need a referral for diagnostics?",
      a: "No. You can contact our spine centre at Stiglmaierplatz directly, without seeing a GP first. We simply recommend bringing any existing medical reports and scans with you.",
    },
  },
  {
    de: {
      q: "Welche Unterlagen sollte ich zum Termin mitbringen?",
      a: "Bringen Sie bitte Ihre Versicherungskarte sowie alle Unterlagen mit, die Ihre Wirbelsäule betreffen: MRT- oder CT-Bilder, Röntgenaufnahmen, Befunde und Arztbriefe. Unsere Spezialisten prüfen vorhandene Bilder persönlich.",
    },
    en: {
      q: "What documents should I bring to my appointment?",
      a: "Please bring your health insurance card and any documents relating to your spine: MRI or CT images, X-rays, medical reports and referral letters. Our specialists review existing scans personally.",
    },
  },
  {
    de: {
      q: "Werden MRT und CT direkt bei Ihnen durchgeführt?",
      a: "Ja. Das Radiologiezentrum RZaS am Stiglmaierplatz verfügt über moderne MRT- und CT-Geräte direkt im Haus. So entfallen lange Wege und Wartezeiten auf externe Termine, und die Ergebnisse werden unmittelbar mit unseren Wirbelsäulenspezialisten besprochen.",
    },
    en: {
      q: "Are MRI and CT performed on site?",
      a: "Yes. The radiology centre RZaS at Stiglmaierplatz has modern MRI and CT scanners directly in the building. This avoids long journeys and waits for external appointments, and the results are discussed directly with our spine specialists.",
    },
  },
  {
    de: {
      q: "Wie lange dauert die MRT-Untersuchung?",
      a: "Eine einzelne MRT-Untersuchung dauert in der Regel zwischen 15 und 30 Minuten. Die Gesamtdauer Ihres Besuchs hängt davon ab, welche Schritte an diesem Tag noch anstehen. Wenn möglich, koordinieren wir Bildgebung und Ambulanztermin, damit sich Ihr Aufenthalt auf ein Mindestmaß beschränkt.",
    },
    en: {
      q: "How long does an MRI scan take?",
      a: "A single MRI scan usually takes between 15 and 30 minutes. How long your visit lasts in total depends on which further steps are planned for that day. Whenever possible, we coordinate imaging with your consultation to keep your stay as short as possible.",
    },
  },
  {
    de: {
      q: "Ist die Untersuchung schmerzhaft?",
      a: "Nein. MRT und CT sind schmerzfreie Untersuchungen, bei denen Sie lediglich liegen und stillhalten. Haben Sie Angst vor engen Räumen, begleiten wir Sie besonders behutsam und können, wenn medizinisch sinnvoll, angstlösende Maßnahmen einsetzen.",
    },
    en: {
      q: "Is the examination painful?",
      a: "No. MRI and CT are painless; you simply lie still for the scan. If you are anxious about enclosed spaces, we support you with particular care and can use anxiety-relieving measures where medically appropriate.",
    },
  },
  {
    de: {
      q: "Wann bekomme ich meine Ergebnisse?",
      a: "Weil Bildgebung und Fachärzte an einem Standort zusammenarbeiten, können wir die Ergebnisse direkt nach der Untersuchung gemeinsam auswerten und mit Ihnen besprechen. Ihr individueller Behandlungsplan entsteht dabei häufig noch am selben Tag.",
    },
    en: {
      q: "When will I receive my results?",
      a: "Because imaging and specialists work in one location, we can evaluate the results together and discuss them with you immediately after the scan. Your individual treatment plan is often drawn up on the same day.",
    },
  },
  {
    de: {
      q: "Was passiert, wenn der Befund keine klare Ursache zeigt?",
      a: "Viele Veränderungen der Wirbelsäule sind altersbedingt und finden sich auch bei Menschen ohne Beschwerden. Unsere Aufgabe ist es, gemeinsam mit Ihnen herauszuarbeiten, welcher Befund tatsächlich zu Ihren Beschwerden passt – und welche Veränderungen nur Zufallsbefunde ohne klinische Relevanz sind.",
    },
    en: {
      q: "What happens if the finding does not show a clear cause?",
      a: "Many changes in the spine are age-related and also occur in people without symptoms. Our task is to work out with you which finding actually matches your symptoms – and which changes are merely incidental findings without clinical relevance.",
    },
  },
];

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
        <span className="font-display text-lg font-semibold text-[#1E2535]">{q}</span>
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

export const Route = createFileRoute("/rueckendiagnostik")({
  head: () => ({
    meta: [
      { title: "Rückendiagnostik · MRT & CT im Haus · WZAS München" },
      {
        name: "description",
        content:
          "Untersuchung, MRT und CT im Haus sowie Befundbesprechung an einem Standort. So läuft Ihre Rückendiagnostik am Wirbelsäulenzentrum am Stiglmaierplatz in München ab.",
      },
      { property: "og:title", content: "Rückendiagnostik · WZAS Wirbelsäulenzentrum München" },
      {
        property: "og:description",
        content:
          "Ursachen erkennen, gezielt behandeln: fachärztliche Untersuchung, MRT und CT im Haus und ein individueller Behandlungsplan in fünf Schritten.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://wzas-spinal-care-hub.lovable.app/rueckendiagnostik" }],
  }),
  component: RueckendiagnostikPage,
});

function RueckendiagnostikPage() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);
  const { ref: pathRef, style: pathStyle } = useFadeUp(0);
  const { ref: findingRef, style: findingStyle } = useFadeUp(0);
  const { ref: mrtRef, style: mrtStyle } = useFadeUp(0);

  const t = useT({
    de: {
      heroEyebrow: "München · Stiglmaierplatz",
      heroH1: "Rücken­diagnostik",
      heroSubtitle: "Ursachen erkennen. Gezielt behandeln.",
      heroScroll: "Ablauf ansehen",
      introHeading: "Untersuchung, Bildgebung und Therapieplanung an einem Standort",
      introParagraph:
        "Rückenschmerzen können viele verschiedene Ursachen haben. Deshalb beginnt eine erfolgreiche Behandlung mit einer sorgfältigen fachärztlichen Untersuchung und einer präzisen Diagnose. Durch MRT und CT direkt im Haus können notwendige Untersuchungen ohne lange Wege durchgeführt werden. Die Ergebnisse besprechen wir unmittelbar mit unseren radiologischen und neuroradiologischen Kolleginnen und Kollegen. So können wir Ihnen gezielt aufzeigen, welche Veränderungen tatsächlich zu Ihren Beschwerden passen.",
      pullQuote: "„Ein Befund allein erklärt noch nicht Ihre Beschwerden.“",
      pullQuoteAttribution: ", WZAS Diagnostik",
      pathHeading: "Von der ersten Untersuchung bis zur passenden Behandlung",
      pathIntro:
        "Bei vielen Patienten liegen zwischen dem ersten Arztbesuch, der Bildgebung, der Befundbesprechung und der Behandlung mehrere Wochen und verschiedene Praxisbesuche. Im Kompetenzzentrum am Stiglmaierplatz werden diese Schritte miteinander verbunden.",
      pathSteps: ["Wirbelsäulenspezialist", "Radiologie", "Gemeinsame Diagnose", "Gezielte Therapie"],
      benefitsLabel: "Ihre Vorteile",
      benefits: [
        "Kurze Wege",
        "Direkte fachärztliche Abstimmung",
        "Vorhandene Bilder werden persönlich geprüft",
        "Keine unnötige Doppeluntersuchung",
        "Verständliche Befundbesprechung",
        "Schneller Übergang zur geeigneten bildgestützten interventionellen Therapie, im Rahmen der gesetzlichen und privaten Regelleistung",
      ],
      findingLabel: "Befund und Beschwerden",
      findingHeading: "Ein Befund allein erklärt noch nicht Ihre Beschwerden",
      findingP1:
        "Zwischen bildgebenden Befunden (MRT, CT oder Röntgen) und den tatsächlich verursachenden Schmerzursachen besteht häufig eine erhebliche Diskrepanz. Viele Veränderungen der Wirbelsäule sind altersbedingt und finden sich auch bei Menschen ohne Beschwerden. Umgekehrt können bereits kleine Veränderungen ausgeprägte Symptome verursachen.",
      findingP2:
        "Unser Anspruch ist es, gemeinsam mit Ihnen herauszuarbeiten, welcher Befund tatsächlich für Ihre Beschwerden verantwortlich ist und welche Veränderungen lediglich Zufallsbefunde ohne klinische Relevanz darstellen.",
      findingP3:
        "Denn nur wenn die Beschwerden eindeutig dem richtigen krankhaften Befund zugeordnet werden, kann die passende Behandlung ausgewählt werden. Eine sorgfältige Diagnosestellung ist daher die Grundlage jeder erfolgreichen konservativen oder operativen Therapie.",
      sameDayLabel: "Wenn medizinisch notwendig, am selben Tag möglich",
      sameDay: ["Periradikuläre Therapie (PRT)", "Facetteninfiltration", "ISG-Infiltration", "Thermodenervation"],
      ablaufHeading: "So läuft Ihre Rückendiagnostik bei uns ab",
      ablaufSub: "In fünf Schritten von der ersten Untersuchung zum individuellen Behandlungsplan.",
      steps: [
        {
          title: "Persönliches ärztliches Gespräch",
          intro: "Am Anfang steht eine ausführliche Anamnese. Dabei interessieren uns unter anderem:",
          points: [
            "Wo und seit wann bestehen die Beschwerden?",
            "Strahlen die Schmerzen in Arme oder Beine aus?",
            "Bestehen Taubheitsgefühle, Kribbeln oder Kraftverluste?",
            "Welche Behandlungen wurden bereits durchgeführt?",
            "Welche Einschränkungen entstehen im Alltag?",
          ],
          note: "Vorhandene Arztberichte und Bildaufnahmen werden von unseren Spezialisten persönlich geprüft.",
        },
        {
          title: "Körperliche und neurologische Untersuchung",
          intro: "Die klinische Untersuchung hilft dabei, die mögliche Ursache der Beschwerden weiter einzugrenzen. Dabei überprüfen wir unter anderem:",
          points: [
            "Beweglichkeit der Wirbelsäule",
            "Muskelkraft",
            "Gefühl und Reflexe",
            "Gangbild und Koordination",
            "Hinweise auf eine Nervenreizung",
            "Mögliche Schmerzquellen an Wirbelgelenken und Iliosakralgelenken",
          ],
          note: "",
        },
        {
          title: "Gezielte Bildgebung",
          intro:
            "Ist eine weiterführende Untersuchung erforderlich, stehen MRT und CT direkt im Kompetenzzentrum am Stiglmaierplatz zur Verfügung. Die Bildgebung erfolgt nicht pauschal, sondern gezielt entsprechend der medizinischen Fragestellung.",
          points: [],
          note: "",
        },
        {
          title: "Gemeinsame Befundauswertung",
          intro:
            "Unsere Wirbelsäulenspezialisten und die radiologischen beziehungsweise neuroradiologischen Fachärzte können die Ergebnisse direkt miteinander besprechen. Dadurch werden klinische Beschwerden und Bildgebung nicht getrennt voneinander betrachtet.",
          points: [],
          note: "",
        },
        {
          title: "Individueller Behandlungsplan",
          intro:
            "Nach Abschluss der Diagnostik besprechen wir die Ergebnisse verständlich mit Ihnen. Gemeinsam entscheiden wir, welcher nächste Schritt sinnvoll ist.",
          points: [],
          note: "",
        },
      ],
      mrtLabel: "Platzangst",
      mrtHeading: "MRT trotz Platzangst, wir begleiten Sie behutsam",
      mrtBody:
        "Patienten mit Platzangst begleiten wir besonders behutsam: Mit viel Zeit, verständlicher Vorbereitung, persönlicher Zuwendung und, wenn medizinisch sinnvoll, angstlösenden Medikamenten unterstützen wir Sie dabei, die MRT-Untersuchung trotz Ihrer Ängste möglichst ruhig und sicher zu bewältigen.",
      mrtCta: "Sprechen Sie uns an",
      faqEyebrow: "Häufige Fragen",
      faqHeading: "Antworten zur Rückendiagnostik",
      faqSub: "Das fragen unsere Patienten am häufigsten rund um Untersuchung, MRT und Befund.",
      bookingHeading: "Bereit für Ihre Diagnose?",
      bookingBody:
        "Vereinbaren Sie einen Termin. Untersuchung, Bildgebung und Befundbesprechung erhalten Sie bei uns an einem Standort.",
      bookingCta: "Online-Termin buchen",
      bookingSecondary: "Behandlungsmöglichkeiten ansehen →",
    },
    en: {
      heroEyebrow: "Munich · Stiglmaierplatz",
      heroH1: "Spine Diagnostics",
      heroSubtitle: "Identify the cause. Treat it precisely.",
      heroScroll: "See the process",
      introHeading: "Examination, imaging and treatment planning in one place",
      introParagraph:
        "Back pain can have many different causes. Successful treatment therefore starts with a careful specialist examination and a precise diagnosis. With MRI and CT on site, the necessary scans can be carried out without long journeys. We discuss the results directly with our radiology and neuroradiology colleagues, so we can show you which changes actually match your symptoms.",
      pullQuote: "“A scan finding alone does not yet explain your symptoms.”",
      pullQuoteAttribution: ", WZAS diagnostics",
      pathHeading: "From the first examination to the right treatment",
      pathIntro:
        "For many patients, several weeks and several practice visits pass between the first appointment, imaging, the discussion of findings and treatment. At the centre at Stiglmaierplatz, these steps are connected.",
      pathSteps: ["Spine specialist", "Radiology", "Joint diagnosis", "Targeted therapy"],
      benefitsLabel: "Your advantages",
      benefits: [
        "Short distances",
        "Direct coordination between specialists",
        "Existing scans are reviewed personally",
        "No unnecessary duplicate examinations",
        "Findings explained in clear language",
        "A fast transition to suitable image-guided interventional therapy, within statutory and private standard cover",
      ],
      findingLabel: "Findings and symptoms",
      findingHeading: "A scan finding alone does not yet explain your symptoms",
      findingP1:
        "There is often a considerable discrepancy between imaging findings (MRI, CT or X-ray) and the actual source of pain. Many changes in the spine are age-related and also occur in people without symptoms. Conversely, even small changes can cause pronounced symptoms.",
      findingP2:
        "Our aim is to work out together with you which finding is actually responsible for your symptoms and which changes are merely incidental findings without clinical relevance.",
      findingP3:
        "Only when symptoms are clearly attributed to the correct pathological finding can the appropriate treatment be selected. A careful diagnosis is therefore the basis of every successful conservative or surgical therapy.",
      sameDayLabel: "Where medically necessary, possible on the same day",
      sameDay: ["Periradicular therapy (PRT)", "Facet joint injection", "SI joint injection", "Thermal denervation"],
      ablaufHeading: "How your spine diagnostics works with us",
      ablaufSub: "Five steps from the first examination to your individual treatment plan.",
      steps: [
        {
          title: "Personal consultation with your doctor",
          intro: "It starts with a detailed medical history. Among other things, we want to know:",
          points: [
            "Where are the symptoms and how long have they been present?",
            "Does the pain radiate into the arms or legs?",
            "Is there numbness, tingling or loss of strength?",
            "Which treatments have already been carried out?",
            "What limitations do you experience in everyday life?",
          ],
          note: "Existing medical reports and scans are reviewed personally by our specialists.",
        },
        {
          title: "Physical and neurological examination",
          intro: "The clinical examination helps to narrow down the possible cause. Among other things, we assess:",
          points: [
            "Mobility of the spine",
            "Muscle strength",
            "Sensation and reflexes",
            "Gait and coordination",
            "Signs of nerve irritation",
            "Possible pain sources at the facet and sacroiliac joints",
          ],
          note: "",
        },
        {
          title: "Targeted imaging",
          intro:
            "If further investigation is required, MRI and CT are available directly at the centre at Stiglmaierplatz. Imaging is not ordered routinely, but specifically according to the medical question.",
          points: [],
          note: "",
        },
        {
          title: "Joint evaluation of findings",
          intro:
            "Our spine specialists and the radiology or neuroradiology consultants can discuss the results directly with each other. Clinical symptoms and imaging are therefore not considered separately.",
          points: [],
          note: "",
        },
        {
          title: "Individual treatment plan",
          intro:
            "Once diagnostics are complete, we explain the results to you in clear language. Together we decide which next step makes sense.",
          points: [],
          note: "",
        },
      ],
      mrtLabel: "Claustrophobia",
      mrtHeading: "MRI despite claustrophobia, we guide you gently",
      mrtBody:
        "We support patients with claustrophobia with particular care: with plenty of time, clear preparation, personal attention and, where medically appropriate, anxiety-relieving medication, so that you can get through the MRI scan as calmly and safely as possible.",
      mrtCta: "Talk to us",
      bookingHeading: "Ready for your diagnosis?",
      bookingBody:
        "Book an appointment. Examination, imaging and the discussion of your findings all happen at one location.",
      bookingCta: "Book an appointment online",
      bookingSecondary: "View treatment options →",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/rueckendiagnostik" />

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
          <div className="absolute bottom-0 left-0 mx-auto w-full max-w-7xl px-5 pb-10 lg:px-12 lg:pb-14">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#AC8F52]">
              {t.heroEyebrow}
            </p>
            <h1 className="font-display text-[2.35rem] font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              {t.heroH1}
            </h1>
            <p className="mt-3 text-lg text-white/75">{t.heroSubtitle}</p>
            <a
              href="#ablauf"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-[#D8BE85]"
            >
              {t.heroScroll}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </section>

        {/* Intro + pull quote */}
        <section className="bg-white py-14 lg:py-20">
          <div
            ref={introRef}
            style={introStyle}
            className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-5 lg:grid-cols-3 lg:gap-16 lg:px-8"
          >
            <div className="lg:col-span-2">
              <h2 className="mb-5 font-display text-2xl font-semibold text-[#1E2535]">{t.introHeading}</h2>
              <p className="text-lg leading-relaxed text-[#4A5568]">{t.introParagraph}</p>
            </div>
            <div className="border-l-4 border-[#AC8F52] pl-6">
              <p className="font-display text-2xl italic leading-snug text-[#1E2535] lg:text-3xl">{t.pullQuote}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-[#5F6771]">{t.pullQuoteAttribution}</p>
            </div>
          </div>
        </section>

        {/* Care path */}
        <section className="bg-[#F8F8F6] py-14 lg:py-20">
          <div ref={pathRef} style={pathStyle} className="mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-[#1E2535] lg:text-4xl">{t.pathHeading}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-[#4A5568]">{t.pathIntro}</p>

            {/* Desktop connected path */}
            <div className="mt-10 hidden items-start lg:flex">
              {t.pathSteps.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex flex-shrink-0 flex-col items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#AC8F52]" />
                    <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1E2535]">
                      {step}
                    </p>
                  </div>
                  {i < t.pathSteps.length - 1 && <div className="mx-3 mt-[5px] h-px flex-1 bg-[#AC8F52]/40" />}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile vertical path */}
            <ol className="mt-8 lg:hidden">
              {t.pathSteps.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-[#AC8F52]" />
                    {i < t.pathSteps.length - 1 && <span className="mt-1 w-px flex-1 bg-[#AC8F52]/40" />}
                  </div>
                  <p className="text-[15px] font-semibold text-[#1E2535]">{step}</p>
                </li>
              ))}
            </ol>

            {/* Benefits + photo */}
            <div className="mt-12 flex flex-col items-start gap-10 lg:flex-row">
              <div className="w-full flex-shrink-0 lg:w-2/5">
                <div
                  className="aspect-[4/3] w-full rounded-sm bg-cover bg-center"
                  style={{ backgroundImage: `url(${PATH_PHOTO})` }}
                  role="img"
                  aria-label={t.pathHeading}
                />
              </div>
              <div className="flex-1">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AC8F52]">
                  {t.benefitsLabel}
                </p>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex gap-3">
                      <CheckIcon />
                      <span className="text-sm leading-relaxed text-[#1E2535]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Finding vs symptoms */}
        <section className="bg-white py-14 lg:py-20">
          <div
            ref={findingRef}
            style={findingStyle}
            className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-5 lg:flex-row lg:gap-16 lg:px-8"
          >
            <div className="flex-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AC8F52]">
                {t.findingLabel}
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-[#1E2535] lg:text-4xl">
                {t.findingHeading}
              </h2>
              <p className="mt-5 leading-relaxed text-[#4A5568]">{t.findingP1}</p>
              <p className="mt-4 border-l-4 border-[#AC8F52] bg-[#F8F8F6] py-4 pl-5 pr-4 leading-relaxed text-[#1E2535]">
                {t.findingP2}
              </p>
              <p className="mt-4 leading-relaxed text-[#4A5568]">{t.findingP3}</p>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AC8F52]">
                {t.sameDayLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.sameDay.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-[#AC8F52] px-4 py-2 text-xs font-medium text-[#7A6029]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full flex-shrink-0 lg:w-2/5">
              <div
                className="aspect-[4/5] w-full rounded-sm bg-cover bg-center"
                style={{ backgroundImage: `url(${FINDING_PHOTO})` }}
                role="img"
                aria-label={t.findingHeading}
              />
            </div>
          </div>
        </section>

        {/* 5-step process */}
        <section id="ablauf" className="scroll-mt-24 bg-[#F8F8F6] py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-[#1E2535] lg:text-5xl">{t.ablaufHeading}</h2>
            <p className="mt-3 text-[#5F6771]">{t.ablaufSub}</p>

            <ol className="mt-10 space-y-4">
              {t.steps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} />
              ))}
            </ol>
          </div>
        </section>

        {/* MRI / claustrophobia */}
        <section className="bg-white py-14 lg:py-20">
          <div
            ref={mrtRef}
            style={mrtStyle}
            className="mx-auto max-w-6xl overflow-hidden rounded-sm bg-[#F3F0E9] px-5 lg:px-0"
          >
            <div className="flex flex-col items-stretch lg:flex-row">
              <div
                className="min-h-[220px] w-full bg-cover bg-center lg:w-2/5"
                style={{ backgroundImage: `url(${MRT_PHOTO})` }}
                role="img"
                aria-label={t.mrtHeading}
              />
              <div className="flex-1 px-0 py-8 lg:px-10 lg:py-12">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AC8F52]">
                  {t.mrtLabel}
                </p>
                <h2 className="font-display text-2xl font-semibold leading-tight text-[#1E2535] lg:text-3xl">
                  {t.mrtHeading}
                </h2>
                <p className="mt-4 leading-relaxed text-[#4A5568]">{t.mrtBody}</p>
                <a
                  href="/#termin"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#7A6029] transition hover:brightness-110"
                >
                  {t.mrtCta}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bridge to conditions */}
        <section className="border-t border-[#E2E4E7] bg-[#F8F8F6] py-12">
          <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/beschwerden"
                className="group inline-flex items-center gap-2 rounded-full border border-[#1E2535] px-5 py-2.5 text-sm font-medium text-[#1E2535] transition-all hover:border-[#AC8F52] hover:bg-[#AC8F52]"
              >
                {t.bookingSecondary === "View treatment options →" ? "Spine conditions" : "Rückenerkrankungen"}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
              <Link
                to="/behandlungen"
                className="group inline-flex items-center gap-2 rounded-full border border-[#1E2535] px-5 py-2.5 text-sm font-medium text-[#1E2535] transition-all hover:border-[#AC8F52] hover:bg-[#AC8F52]"
              >
                {t.bookingSecondary === "View treatment options →" ? "Treatments" : "Behandlungen"}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <BookingCTA
          heading={t.bookingHeading}
          body={t.bookingBody}
          ctaCopy={t.bookingCta}
          secondaryLabel={t.bookingSecondary}
          secondaryHref="/behandlungen"
        />
      </main>

      <PageFooter />
    </div>
  );
}

type Step = { title: string; intro: string; points: string[]; note: string };

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, style } = useFadeUp(index * 70);
  return (
    <li>
      <div
        ref={ref}
        style={style}
        className="flex flex-col gap-4 border-l-2 border-[#E2E4E7] bg-white p-6 transition-colors duration-300 hover:border-[#AC8F52] sm:flex-row sm:gap-7 lg:p-8"
      >
        <span className="font-display text-4xl font-semibold leading-none text-[#AC8F52] sm:w-14 sm:flex-shrink-0 lg:text-5xl">
          {index + 1}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold text-[#1E2535] lg:text-2xl">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-[#4A5568]">{step.intro}</p>
          {step.points.length > 0 && (
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {step.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-[#1E2535]">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#AC8F52]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {step.note && <p className="mt-4 text-sm italic leading-relaxed text-[#5F6771]">{step.note}</p>}
        </div>
      </div>
    </li>
  );
}
