import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/lang";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export function KonservativZuerst() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(section);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const t = useT({
    de: {
      label: "Unser Grundsatz",
      h1: "Nicht jeder Rücken ",
      h2: "muss operiert werden.",
      lead: "Wir behandeln zunächst konservativ. Eine Operation kommt nur infrage, wenn sie medizinisch notwendig ist.",
      stagesLabel: "Behandlung in 3 Stufen",
      cta: "Alle Behandlungen ansehen",
      points: [
        {
          k: "Konservativ",
          v: "Physiotherapie, Medikamente und gezielte Infiltrationen stehen am Anfang der Behandlung.",
        },
        {
          k: "Minimalinvasiv",
          v: "Gezielte, gewebeschonende Eingriffe, wenn konservative Maßnahmen nicht ausreichen.",
        },
        {
          k: "Operativ",
          v: "Eine Wirbelsäulenoperation erfolgt nur bei klarer medizinischer Indikation.",
        },
      ],
    },
    en: {
      label: "Our principle",
      h1: "Not every back ",
      h2: "needs surgery.",
      lead: "We begin with conservative care. Surgery is considered only when it is medically necessary.",
      stagesLabel: "Treatment in 3 stages",
      cta: "View all treatments",
      points: [
        {
          k: "Conservative care",
          v: "Physiotherapy, medication and targeted injections are the first line of treatment.",
        },
        {
          k: "Minimally invasive",
          v: "Targeted, tissue-sparing procedures when conservative measures are not sufficient.",
        },
        {
          k: "Surgical",
          v: "Spinal surgery is performed only when there is a clear medical indication.",
        },
      ],
    },
  });

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 520ms ${EASE_OUT} ${delay}ms, transform 520ms ${EASE_OUT} ${delay}ms`,
  });

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#1E2535] py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-4xl" style={reveal(0)}>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8BE85]">
            <span className="inline-block h-px w-6 bg-[#D8BE85]" />
            {t.label}
          </p>
          <h2
            className="mt-5 max-w-3xl font-display leading-[1.12] sm:leading-[1.05]"
            style={{ fontSize: "clamp(2.25rem, 4.8vw, 4rem)", fontWeight: 500 }}
          >
            {t.h1}
            <span className="font-bold">{t.h2}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#C7CDD7] sm:text-[18px]">
            {t.lead}
          </p>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6 lg:mt-20" style={reveal(100)}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8BE85]">
            {t.stagesLabel}
          </p>

          <ol className="mt-7 grid gap-8 md:grid-cols-3 md:gap-0">
            {t.points.map((point, index) => (
              <li
                key={point.k}
                className="group border-t border-white/20 pt-5 md:border-l md:border-t-0 md:px-7 md:pt-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
                style={reveal(180 + index * 70)}
              >
                <span className="font-display text-3xl font-semibold tabular-nums text-[#D8BE85]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[18px] font-semibold leading-snug text-white">
                  {point.k}
                </h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[#AEB6C3]">
                  {point.v}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-8 bg-[#D8BE85]/45 transition-[width,background-color] duration-200 ease-out group-hover:w-14 group-hover:bg-[#D8BE85]"
                />
              </li>
            ))}
          </ol>

          <a
            href="/behandlungen"
            className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-[border-color,color,transform] duration-200 ease-out hover:border-[#D8BE85] hover:text-[#D8BE85] active:scale-[0.97]"
          >
            {t.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default KonservativZuerst;
