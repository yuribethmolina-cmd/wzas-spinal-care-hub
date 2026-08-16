import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/wzas/PageHeader";
import { PageFooter } from "@/components/wzas/PageFooter";
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

export const Route = createFileRoute("/karriere")({
  head: () => ({
    meta: [
      { title: "Karriere · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Das WZAS wächst, wir suchen engagierte Fachkräfte für Neurochirurgie, Orthopädie und Praxismanagement am Standort München Stiglmaierplatz." },
    ],
  }),
  component: KarrierePage,
});

function KarrierePage() {
  const { ref: contentRef, style: contentStyle } = useFadeUp(100);
  const { ref: rolesRef, style: rolesStyle } = useFadeUp(80);
  const { ref: contactRef, style: contactStyle } = useFadeUp(60);

  const t = useT({
    de: {
      heroEyebrow: "MÜNCHEN · STIGLMAIERPLATZ",
      heroH1: "Werden Sie Teil unseres Teams",
      heroSubtitle: "Fachkompetenz trifft Menschlichkeit.",
      introParagraph: "Das Wirbelsäulenzentrum am Stiglmaierplatz ist seit über 20 Jahren eine feste Größe in der Münchner Medizinlandschaft. Wir wachsen, und suchen engagierte Menschen, die unser Team aus Neurochirurgen, Orthopäden und medizinischem Fachpersonal verstärken möchten.",
      role1Heading: "Ärztliches Personal",
      role1Text: "Fachärzte für Neurochirurgie, Orthopädie und Schmerztherapie, auch Assistenzärzte in Weiterbildung willkommen.",
      role2Heading: "MFA & Pflege",
      role2Text: "Medizinische Fachangestellte, OP-Pflege und Praxiskoordination für unsere wachsende Praxis am Stiglmaierplatz.",
      role3Heading: "Verwaltung & IT",
      role3Text: "Praxismanagement, Abrechnung, Marketing und digitale Infrastruktur, für einen reibungslosen Praxisbetrieb.",
      contactHeading: "Initiativbewerbung willkommen",
      contactText: "Auch wenn keine Stelle ausgeschrieben ist, wir freuen uns über Ihre Bewerbung. Schicken Sie uns Ihre Unterlagen direkt an:",
      contactSmall: "Wir melden uns in der Regel innerhalb von 5 Werktagen.",
    },
    en: {
      heroEyebrow: "MUNICH · STIGLMAIERPLATZ",
      heroH1: "Join our team",
      heroSubtitle: "Clinical expertise meets human care.",
      introParagraph: "The Spine Centre at Stiglmaierplatz has been a fixture in Munich's medical landscape for over 20 years. We are growing, and looking for committed people who want to join our team of neurosurgeons, orthopaedic specialists and medical staff.",
      role1Heading: "Medical staff",
      role1Text: "Specialists in neurosurgery, orthopaedics and pain therapy, also resident doctors in training welcome.",
      role2Heading: "MFA & care",
      role2Text: "Medical assistants, surgical nursing and practice coordination for our growing clinic at Stiglmaierplatz.",
      role3Heading: "Administration & IT",
      role3Text: "Practice management, billing, marketing and digital infrastructure, for smooth practice operations.",
      contactHeading: "Speculative applications welcome",
      contactText: "Even if no position is advertised, we welcome your application. Send your documents directly to:",
      contactSmall: "We typically respond within 5 working days.",
    },
  });

  const roles = [
    { heading: t.role1Heading, text: t.role1Text },
    { heading: t.role2Heading, text: t.role2Text },
    { heading: t.role3Heading, text: t.role3Text },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader />

      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/gallery/karriere.webp)" }}
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

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div ref={contentRef} style={contentStyle}>
              <p className="text-lg text-[#4A5568] leading-relaxed mb-12">
                {t.introParagraph}
              </p>
            </div>

            {/* Role cards */}
            <div ref={rolesRef} style={rolesStyle} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="bg-[#F8F8F6] border border-[#E2E4E7] p-6 rounded-sm"
                >
                  <p className="font-semibold text-[#1E2535] mb-2">{role.heading}</p>
                  <p className="text-sm text-[#4A5568] leading-relaxed">{role.text}</p>
                </div>
              ))}
            </div>

            {/* Current openings */}
            <div className="mb-12">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AC8F52] mb-5">
                Aktuelle Stellen
              </p>
              <div className="divide-y divide-[#E2E4E7] border border-[#E2E4E7] rounded-sm">
                {[
                  { title: "MFA / Arzthelferin für den Empfang / Patientenaufnahme (w/m/d)", detail: "Vollzeit oder Teilzeit · München Stiglmaierplatz" },
                  { title: "Studentische Hilfskraft als Assistenz bei schmerztherapeutischen Interventionen im Bildwandler (w/m/d)", detail: "Längerfristig · Flexibel · München Stiglmaierplatz" },
                ].map((pos) => (
                  <div key={pos.title} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4">
                    <div>
                      <p className="font-semibold text-[#1E2535] text-sm">{pos.title}</p>
                      <p className="text-xs text-[#5F6771] mt-0.5">{pos.detail}</p>
                    </div>
                    <a
                      href="mailto:info@wzas.de"
                      className="shrink-0 text-xs font-semibold text-[#7A6029] hover:brightness-110 transition mt-1 sm:mt-0"
                    >
                      Jetzt bewerben →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact block */}
            <div ref={contactRef} style={contactStyle} className="text-center mt-12">
              <h2 className="font-display text-2xl font-semibold text-[#1E2535] mb-3">
                {t.contactHeading}
              </h2>
              <p className="text-[#4A5568] mb-3">{t.contactText}</p>
              <a
                href="mailto:info@wzas.de"
                className="inline-flex min-h-11 items-center text-[#7A6029] font-semibold hover:brightness-110 transition"
              >
                info@wzas.de
              </a>
              <p className="mt-4 text-xs text-[#8C939B]">{t.contactSmall}</p>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
