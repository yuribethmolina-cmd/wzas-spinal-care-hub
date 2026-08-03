import { useT } from "@/lib/lang";

export function KonservativZuerst() {
  const t = useT({
    de: {
      label: "Unser Grundsatz",
      h1: "Nicht jeder Rücken ",
      h2: "muss operiert werden.",
      lead:
        "Bei uns steht die konservative Therapie an erster Stelle. Eine Operation ist nie der erste Gedanke — sie ist der letzte Schritt, wenn alle anderen Wege ausgeschöpft sind.",
      statBig: "über 90 %",
      statText: "unserer Patientinnen und Patienten werden ohne Operation wieder beschwerdefrei.",
      points: [
        {
          k: "Zuerst behandeln",
          v: "Schmerztherapie, Physiotherapie, manuelle Medizin und Infiltrationen — bevor überhaupt über einen Eingriff gesprochen wird.",
        },
        {
          k: "Klare Indikation",
          v: "Operiert wird nur, wenn ein Eingriff medizinisch eindeutig notwendig ist und Ihnen nachweislich hilft.",
        },
        {
          k: "Ehrliche Zweitmeinung",
          v: "Wurde Ihnen bereits eine Operation empfohlen? Wir prüfen unabhängig, ob es einen schonenderen Weg gibt.",
        },
      ],
    },
    en: {
      label: "Our principle",
      h1: "Not every back ",
      h2: "needs surgery.",
      lead:
        "Conservative treatment always comes first here. Surgery is never our first thought — it is the last step, once every other option has been exhausted.",
      statBig: "over 90%",
      statText: "of our patients recover without any operation.",
      points: [
        {
          k: "Treat first",
          v: "Pain therapy, physiotherapy, manual medicine and injections — long before surgery is even discussed.",
        },
        {
          k: "Clear indication",
          v: "We only operate when it is medically unambiguous that the procedure is necessary and will help you.",
        },
        {
          k: "Honest second opinion",
          v: "Already been advised to have surgery? We independently check whether a gentler route exists.",
        },
      ],
    },
  });

  return (
    <section className="bg-[#1E2535] text-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8BE85] flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-[#D8BE85]" />
              {t.label}
            </p>
            <h2
              className="mt-4 font-display leading-[1.05]"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)", fontWeight: 500 }}
            >
              {t.h1}
              <span style={{ fontWeight: 700 }}>{t.h2}</span>
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-[#CBD1DA] max-w-xl">{t.lead}</p>

            <div className="mt-9 flex items-baseline gap-5 border-t border-white/12 pt-8">
              <span
                className="font-display text-[#D8BE85] leading-none shrink-0"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 700 }}
              >
                {t.statBig}
              </span>
              <span className="text-[17px] leading-snug text-[#E6E9EF] min-w-0">{t.statText}</span>
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
