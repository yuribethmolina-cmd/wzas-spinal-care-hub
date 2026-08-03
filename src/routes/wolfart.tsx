import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
import { BookingCTA } from "@/components/wzas/BookingCTA";
import { useT } from "@/lib/lang";

import partnerRadiologie from "@/assets/wzas/partners/radiologie.png.asset.json";
import partnerOms from "@/assets/wzas/partners/oms.png.asset.json";
import partnerHand from "@/assets/wzas/partners/bl-handchirurgie.png.asset.json";
import partnerOberland from "@/assets/wzas/partners/wz-oberland.png.asset.json";
import partnerWz from "@/assets/wzas/partners/wz-stiglmaier.png.asset.json";

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

export const Route = createFileRoute("/wolfart")({
  head: () => ({
    meta: [
      { title: "Wolfart Klinikum · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Operative Eingriffe führen die Chirurgen des WZAS im Wolfart Klinikum München durch — eine der führenden Privatkliniken für Neurochirurgie und Orthopädie in Bayern." },
    ],
  }),
  component: WolfartPage,
});

function WolfartPage() {
  const { ref: introRef, style: introStyle } = useFadeUp(100);
  const { ref: benefitsRef, style: benefitsStyle } = useFadeUp(0);
  const { ref: networkRef, style: networkStyle } = useFadeUp(0);

  const t = useT({
    de: {
      heroEyebrow: "OPERATIONSSTANDORT · MÜNCHEN",
      heroH1: "Wolfart­klinikum",
      heroSubtitle: "Wo komplexe Eingriffe gelingen.",
      introHeading: "Unser chirurgischer Partner in München",
      introParagraph: "Wenn eine Operation notwendig ist, führen die Spezialisten des WZAS den Eingriff im Wolfart Klinikum München durch — einer der führenden Privatkliniken für Neurochirurgie, Orthopädie und Schmerzmedizin in Bayern. Die enge Abstimmung zwischen Praxis und Klinik gewährleistet, dass jeder Patient von der Diagnostik bis zur Entlassung betreut wird.",
      pullQuote: "„Optimale Ergebnisse durch nahtlose Zusammenarbeit zwischen Praxis und Klinik.“",
      attribution: "— WZAS",
      benefitsHeading: "Was das Wolfart Klinikum bietet",
      benefit1Heading: "Modernste OP-Säle",
      benefit1Text: "Hochauflösende Bildgebung im OP, minimalinvasive Instrumente und computergestütztes Navigationssystem für präzise Eingriffe.",
      benefit2Heading: "Stationäre Betreuung",
      benefit2Text: "Erfahrenes Pflegeteam und direkte Erreichbarkeit der behandelnden Ärzte für eine sichere Genesung nach dem Eingriff.",
      benefit3Heading: "Lückenlose Abstimmung",
      benefit3Text: "Direkte Kommunikation zwischen der WZAS-Praxis und dem Klinikteam — keine Informationsverluste, keine unnötigen Wege.",
      networkHeading: "Das WZAS-Netzwerk",
      bookingHeading: "Chirurgische Behandlung besprechen?",
      bookingBody: "Unsere Spezialisten erklären Ihnen, ob eine Operation sinnvoll ist und was im Wolfart Klinikum auf Sie zukommt.",
      bookingCta: "Termin vereinbaren",
    },
    en: {
      heroEyebrow: "SURGICAL FACILITY · MUNICH",
      heroH1: "Wolfart Clinic",
      heroSubtitle: "Where complex procedures succeed.",
      introHeading: "Our surgical partner in Munich",
      introParagraph: "When surgery is required, WZAS specialists perform the procedure at the Wolfart Klinikum Munich — one of Bavaria's leading private clinics for neurosurgery, orthopaedics and pain medicine. Close coordination between our practice and the clinic ensures continuity of care from diagnosis through discharge.",
      pullQuote: "“Optimal outcomes through seamless collaboration between practice and clinic.”",
      attribution: "— WZAS",
      benefitsHeading: "What the Wolfart Klinikum offers",
      benefit1Heading: "State-of-the-art theatres",
      benefit1Text: "High-resolution intraoperative imaging, minimally invasive instruments and computer-assisted navigation for precise procedures.",
      benefit2Heading: "Inpatient care",
      benefit2Text: "Experienced nursing team and direct access to attending physicians for a safe recovery after the procedure.",
      benefit3Heading: "Seamless coordination",
      benefit3Text: "Direct communication between the WZAS practice and the clinic team — no information gaps, no unnecessary detours.",
      networkHeading: "The WZAS network",
      bookingHeading: "Discuss surgical treatment?",
      bookingBody: "Our specialists will explain whether surgery is appropriate and what to expect at the Wolfart Klinikum.",
      bookingCta: "Book appointment",
    },
  });

  const partners = [
    { src: partnerRadiologie.url, alt: "Radiologie am Stiglmaierplatz" },
    { src: partnerOms.url, alt: "Orthopädie München-Schwabing" },
    { src: partnerHand.url, alt: "BL Handchirurgie Bayern" },
    { src: partnerOberland.url, alt: "Wirbelsäulenzentrum Oberland" },
    { src: partnerWz.url, alt: "Wirbelsäulenzentrum am Stiglmaierplatz" },
  ];

  const benefits = [
    { heading: t.benefit1Heading, text: t.benefit1Text },
    { heading: t.benefit2Heading, text: t.benefit2Text },
    { heading: t.benefit3Heading, text: t.benefit3Text },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader activeRoute="/wolfart" />

      <main>
        {/* Hero — static (no kenBurns) */}
        <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/wolfart-klinik.jpg)" }}
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

        {/* Intro section */}
        <section className="py-14 lg:py-20 bg-white">
          <div
            ref={introRef}
            style={introStyle}
            className="mx-auto max-w-6xl px-5 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start"
          >
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
              <p className="mt-3 text-xs text-[#5F6771] tracking-widest uppercase">{t.attribution}</p>
            </div>
          </div>
        </section>

        {/* Key benefits */}
        <section className="py-14 lg:py-20 bg-white border-t border-[#E2E4E7]">
          <div ref={benefitsRef} style={benefitsStyle} className="mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-10">
              {t.benefitsHeading}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <svg className="w-8 h-8 text-[#AC8F52]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-semibold text-[#1E2535]">{b.heading}</p>
                  <p className="text-sm text-[#4A5568] leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner logos */}
        <section className="py-12 bg-white border-t border-[#E2E4E7]">
          <div ref={networkRef} style={networkStyle} className="mx-auto max-w-6xl px-5 lg:px-8">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-6">
              {t.networkHeading}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partners.map((p) => (
                <img
                  key={p.alt}
                  src={p.src}
                  alt={p.alt}
                  className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </section>

        <BookingCTA
          heading={t.bookingHeading}
          body={t.bookingBody}
          ctaCopy={t.bookingCta}
        />
      </main>

      <PageFooter />
    </div>
  );
}
