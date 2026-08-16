import { useT } from "@/lib/lang";

export function KonservativZuerst() {
  const t = useT({
    de: {
      label: "Unser Grundsatz",
      h1: "Nicht jeder Rücken ",
      h2: "muss operiert werden.",
      lead:
        "Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig. Die meisten Rückenerkrankungen müssen nicht operiert werden.",
      statBig: "3 Stufen",
      statText: "Verfahren ohne Operation, minimalinvasive Eingriffe und Wirbelsäulenchirurgie — Sie erhalten genau die Stufe, die Ihrem Befund entspricht.",
      points: [
        {
          k: "Zuerst behandeln",
          v: "Gezielte Infiltrationen, medikamentöse Schmerztherapie, Physiotherapie und physikalische Behandlungen,\u00a0 bevor überhaupt über einen Eingriff gesprochen wird.",
        },
        {
          k: "Klare Indikation",
          v: "Operiert wird nur, wenn ein Eingriff medizinisch eindeutig notwendig ist und Ihnen nachweislich hilft.",
        },
        {
          k: "Schritt für Schritt",
          v: "Erst Verfahren ohne Operation, dann minimalinvasive Eingriffe — eine Wirbelsäulenoperation steht am Ende, nicht am Anfang.",
        },
      ],
    },
    en: {
      label: "Our principle",
      h1: "Not every back ",
      h2: "needs surgery.",
      lead:
        "Our principle: conservative treatment where possible, surgery where necessary. Most back conditions never need an operation.",
      statBig: "3 stages",
      statText: "Non-surgical procedures, minimally invasive interventions and spinal surgery — you receive exactly the stage your diagnosis calls for.",
      points: [
        {
          k: "Treat first",
          v: "Targeted injections, medication-based pain therapy, physiotherapy and physical treatments — long before surgery is even discussed.",
        },
        {
          k: "Clear indication",
          v: "We only operate when it is medically unambiguous that the procedure is necessary and will help you.",
        },
        {
          k: "Step by step",
          v: "Non-surgical procedures first, then minimally invasive options — spinal surgery comes at the end, not at the start.",
        },
      ],
    },
  });

  return (
    <section className="bg-[#1E2535] text-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">

          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8BE85] flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-[#D8BE85]" />
              {t.label}
            </p>
            <h2
              className="mt-4 font-display leading-[1.14] sm:leading-[1.05]"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)", fontWeight: 500 }}
            >
              {t.h1}
              <span style={{ fontWeight: 700 }}>{t.h2}</span>
            </h2>
            <p className="mt-4 text-[17px] sm:text-[18px] leading-relaxed text-[#CBD1DA] max-w-xl">{t.lead}</p>

            <div className="mt-8 border-t border-white/12 pt-7 sm:flex sm:items-baseline sm:gap-5">
              <span
                className="block font-display text-[#D8BE85] leading-none shrink-0"
                style={{ fontSize: "clamp(2.4rem, 12vw, 4.2rem)", fontWeight: 700 }}
              >
                {t.statBig}
              </span>
              <span className="mt-2 block text-[16px] sm:text-[17px] leading-snug text-[#E6E9EF] min-w-0 sm:mt-0">
                {t.statText}
              </span>
            </div>

          </div>

          <ul className="grid gap-px bg-white/12 rounded-lg overflow-hidden">
            {t.points.map((p) => (
              <li key={p.k} className="bg-[#232B3D] p-6 lg:p-7">
                <p className="text-[18px] font-bold leading-snug">{p.k}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-[#A7AEBA]">{p.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default KonservativZuerst;
