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
    de: { q: "Was muss ich zu meinem Termin mitbringen?", a: "Jeder Patient sollte die Versicherungskarte und sämtliche ihm zur Verfügung stehenden Unterlagen dabei haben, die seine Wirbelsäule betreffen, also z.\u00a0B. MRT-Bilder, CT-Bilder, Röntgenaufnahmen, Befunde und Arztbriefe." },
    en: { q: "What should I bring to my appointment?", a: "Please bring your health insurance card and any documents relating to your spine, such as MRI or CT images, X-rays, medical reports and referral letters." },
  },
  {
    de: { q: "Kann ich ohne Überweisung einen Termin vereinbaren?", a: "Ja, Sie können sich direkt an unser Wirbelsäulenzentrum am Stiglmaierplatz in München wenden, ohne vorher einen Hausarzt aufzusuchen. Wir empfehlen jedoch, vorhandene Vorbefunde oder Bildgebungen mitzubringen." },
    en: { q: "Can I make an appointment without a referral?", a: "Yes, you can contact our spine centre at Stiglmaierplatz in Munich directly, without seeing a GP first. We do recommend bringing any existing findings or imaging with you." },
  },
  {
    de: { q: "Sie behandeln privat versicherte genauso wie gesetzlich versicherte Patient:innen?", a: "Ja, selbstverständlich behandeln wir sowohl gesetzlich als auch privat versicherte Patienten." },
    en: { q: "Do you treat patients with both public and private health insurance?", a: "Yes. We treat patients with public or private health insurance." },
  },
  {
    de: { q: "Wie lange dauert ein Termin?", a: "Die Dauer des Termins hängt davon ab, welche Unterlagen und Befunde bereits vorliegen oder noch ergänzt werden müssen. Ist eine Aufnahme der Wirbelsäule in unserem MRT oder CT nötig, koordinieren wir diese möglichst mit Ihrem Ambulanztermin, so dass sich Ihr Aufenthalt auf ein Mindestmaß beschränkt. Oftmals besteht die Möglichkeit, sofort mit Therapiemaßnahmen zu beginnen: In diesem Fall dauert Ihr Besuch bei uns natürlich etwas länger." },
    en: { q: "How long does an appointment take?", a: "The length of your appointment depends on which records and test results are already available and whether any further examinations are needed. If you require an MRI or CT scan, we will try to coordinate it with your consultation to keep your visit as short as possible. Treatment can often begin on the same day; if so, your visit may take a little longer." },
  },
  {
    de: { q: "Wie lange muss ich auf einen Termin warten?", a: "In der Regel erhalten Sie Termine etwa zwei bis drei Wochen nach Vereinbarung. In dringlichen medizinischen Notfällen bitten wir um eine telefonische Anmeldung, am besten über den zuweisenden Arzt. Wir bemühen uns dann um einen zeitnahen Termin." },
    en: { q: "How long will I have to wait for an appointment?", a: "Appointments are generally available within two to three weeks. For urgent medical cases, please call us. Ideally, your referring doctor should contact us so that we can arrange an appointment as soon as possible." },
  },
  {
    de: { q: "Ich bin ein Notfall, wohin soll ich mich wenden?", a: "Während der Sprechzeiten melden Sie sich bitte bei unserer Hotline unter der Telefonnummer +49 (0)89 54 34 30 30. Dort erfahren Sie, was zu tun ist." },
    en: { q: "What should I do in an emergency?", a: "During our opening hours, please call us on +49 (0)89 54 34 30 30. Our team will advise you on what to do next." },
  },
  {
    de: { q: "Wann ist bei Rückenschmerzen eine Operation notwendig?", a: "Die meisten Rückenbeschwerden lassen sich ohne Operation erfolgreich behandeln. Im Wirbelsäulenzentrum am Stiglmaierplatz in München kann in rund 90 Prozent der Fälle auf einen Eingriff verzichtet werden. Eine Operation ist in der Regel nur dann notwendig, wenn konservative Therapien nicht anschlagen oder neurologische Ausfälle wie Taubheitsgefühle oder Lähmungen auftreten." },
    en: { q: "When is surgery necessary for back pain?", a: "Most back complaints can be treated successfully without surgery. At the spine centre at Stiglmaierplatz in Munich, around 90 percent of cases can be managed without an operation. Surgery is usually only necessary when conservative therapies do not work or neurological deficits such as numbness or paralysis occur." },
  },
  {
    de: { q: "Welche Therapien werden angeboten?", a: "Wir bieten das gesamte Spektrum der konservativen, interventionellen und operativen Wirbelsäulenbehandlung an. Unser Zentrum verfügt sowohl über ambulante als auch stationäre Einrichtungen." },
    en: { q: "What treatments do you offer?", a: "We offer the full range of conservative, interventional and surgical treatments for spinal conditions, with both outpatient and inpatient care available." },
  },
  {
    de: { q: "Wird das MRT direkt bei Ihnen in München durchgeführt?", a: "Ja. Unser Radiologiezentrum RZaS am Stiglmaierplatz verfügt über moderne MRT- und CT-Geräte direkt im Haus. Für Patienten bedeutet das: keine langen Wartezeiten auf externe Termine und eine schnelle, direkte Abstimmung mit unseren Wirbelsäulenspezialisten in München." },
    en: { q: "Is the MRI performed on site in Munich?", a: "Yes. Our radiology centre RZaS at Stiglmaierplatz has modern MRI and CT scanners directly in the building. For patients that means no long waits for external appointments and fast, direct coordination with our spine specialists in Munich." },
  },
  {
    de: { q: "Was ist der Unterschied zwischen einem Bandscheibenvorfall und einer Spinalkanalstenose?", a: "Beim Bandscheibenvorfall tritt Bandscheibengewebe aus und drückt auf benachbarte Nerven, was häufig zu akuten Schmerzen führt, die in Bein oder Arm ausstrahlen. Die Spinalkanalstenose ist eine Verengung des Wirbelkanals, die meist durch Verschleiß entsteht und typischerweise bei längerem Gehen Schmerzen verursacht. Beide Erkrankungen behandeln wir konservativ und wenn nötig operativ." },
    en: { q: "What is the difference between a herniated disc and spinal stenosis?", a: "With a herniated disc, disc tissue pushes out and presses on nearby nerves, often causing acute pain that radiates into a leg or arm. Spinal stenosis is a narrowing of the spinal canal, usually caused by age-related changes, and typically causes pain when walking longer distances. Both conditions can be treated conservatively or, when necessary, surgically." },
  },
  {
    de: { q: "Werde ich immer vom selben Arzt behandelt?", a: "In der Regel werden Sie immer vom selben Arzt behandelt. Nachdem unsere Spezialisten verschiedene Schwerpunkte haben, entscheidet oftmals Ihr Beschwerdebild, welcher Arzt die Leitung Ihrer Behandlung übernimmt. Dennoch kommt es manchmal, vor allem bei kurzfristigen Terminen, vor, dass ein anderer Arzt Sie betreut." },
    en: { q: "Will I always be treated by the same doctor?", a: "As a rule you will always be treated by the same doctor. As our specialists have different focus areas, your symptoms often determine which doctor leads your treatment. Occasionally, especially with short-notice appointments, another doctor may look after you." },
  },
  {
    de: { q: "Wo wird operiert?", a: "Operationen finden in der Regel in der WolfartKlinik München-Gräfelfing statt. Alle Kliniken sind hervorragend ausgestattet und bieten ein erfahrenes und eingespieltes Team zur Betreuung." },
    en: { q: "Where is surgery performed?", a: "Surgery usually takes place at WolfartKlinik in Munich-Gräfelfing, a well-equipped hospital with an experienced, established clinical team." },
  },
  {
    de: { q: "Ist die Praxis spezialisiert?", a: "Ja, wir sind auf alle Formen von Wirbelsäulenerkrankungen spezialisiert. Da zu unserem Zentrum auch eine bestens ausgestattete Radiologie sowie die Anbindung an mehrere Kliniken gehören, können wir von der Diagnose über die konventionelle Therapie bis zur minimalinvasiven Operation das komplette Spektrum an modernen Untersuchungsmethoden und Behandlungsmöglichkeiten anbieten." },
    en: { q: "Does the centre specialise in spinal conditions?", a: "Yes. We specialise in all types of spinal conditions. With a well-equipped radiology department in the same building and links to several hospitals, we can provide a wide range of modern diagnostic and treatment options, from conservative care to minimally invasive surgery." },
  },
  {
    de: { q: "Wie erreiche ich das Zentrum?", a: "Unsere Praxis befindet sich in der Nymphenburger Str. 1, 80335 München, direkt am Stiglmaierplatz gegenüber dem Löwenbräukeller. Mit öffentlichen Verkehrsmitteln: U-Bahn U1, Haltestelle Stiglmaierplatz, sowie Trambahnlinie 21 vom Hauptbahnhof bzw. Karlsplatz/Stachus. Mit dem Auto: eine gewisse Anzahl an Stellplätzen steht in unserer Tiefgarage zur Verfügung, Zufahrt über die Seidlstraße; es empfiehlt sich, auf die öffentlichen Verkehrsmittel auszuweichen. Öffnungszeiten: Montag bis Freitag 8.00 bis 17.00 Uhr." },
    en: { q: "How do I get to the centre?", a: "Our practice is at Nymphenburger Str. 1, 80335 Munich, directly on Stiglmaierplatz opposite the Löwenbräukeller. By public transport, take underground line U1 to Stiglmaierplatz or tram 21 from Munich Central Station or Karlsplatz/Stachus. A limited number of spaces are available in our underground car park, accessed via Seidlstraße, although we recommend using public transport. Opening hours are Monday to Friday, 8:00 am to 5:00 pm." },
  },
];

const GALLERY = Array.from({ length: 6 }, (_, i) => `/gallery/praxis-0${i + 1}.webp`);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Häufige Fragen · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Antworten auf die häufigsten Fragen: Unterlagen zum Termin, Wartezeiten, Überweisung, MRT im Haus, Ablauf der Behandlung und wo operiert wird." },
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
      downloadsBody: "Broschüren und Merkblätter zum Herunterladen, in Ruhe nachlesen, wann immer Sie möchten.",
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
      downloadsBody: "Download our brochures and patient information sheets to read at your convenience.",
      download: "Download PDF",
      filterLabel: "Filter by topic",
      filterAll: "All",
      noResults: "No documents for this topic.",
      pending: "Coming soon",
      pdfLabel: "PDF",
      bookingHeading: "Still have questions?",
      bookingBody: "Call us or book an appointment online. Our team will be happy to help.",
      bookingCta: "Book an appointment",
      bookingSecondary: "+49 (0)89-54 34 30 30",
    },
  });

  const lang: "de" | "en" = useT({ de: "de" as const, en: "en" as const });

  const [topic, setTopic] = useState<TopicId | "all">("all");
  const visibleDocs = topic === "all" ? DOCS : DOCS.filter((d) => d.topics.includes(topic));

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/faq" />

      <main>
        {/* Hero, color bg, no photo */}
        <section
          className="relative flex items-end"
          style={{ background: "#1E2535", minHeight: "40vh" }}
        >
          <div className="px-5 pb-10 lg:px-12 lg:pb-14 max-w-7xl mx-auto w-full">
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
            <div className="flex gap-3 overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-[#AC8F52]" tabIndex={0} role="region" aria-label={(lang as string) === "en" ? "Practice gallery" : "Praxis Galerie"}>
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
                  className="flex flex-col gap-4 border border-[#E2E4E7] rounded-sm p-5 bg-white sm:flex-row sm:items-start"
                >
                  <div className="flex-shrink-0">
                    <PdfIcon />
                  </div>
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
                  <div className="flex-shrink-0 sm:self-center">
                    {doc.file ? (
                      <a
                        href={doc.file}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full justify-center items-center gap-2 rounded-full bg-[#AC8F52] px-5 py-2.5 text-xs font-semibold text-[#1E2535] hover:brightness-105 transition sm:w-auto"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
                          <path d="M12 3v12M7 12l5 5 5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {t.download}
                      </a>
                    ) : (
                      <span className="inline-flex w-full justify-center items-center rounded-full border border-[#E2E4E7] px-4 py-2 text-xs font-semibold text-[#8C939B] sm:w-auto">
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
