import { useT } from "@/lib/lang";

type Row = { title: string; text: string };

function Column({
  kicker,
  heading,
  intro,
  rows,
  dark,
}: {
  kicker: string;
  heading: string;
  intro: string;
  rows: Row[];
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "bg-[#1E2535] text-white p-8 lg:p-12"
          : "bg-white text-[#1E2535] p-8 lg:p-12 border border-[#E2E4E7]"
      }
    >
      <p
        className={`text-[11px] font-semibold tracking-[0.22em] uppercase ${
          dark ? "text-[#D8BE85]" : "text-[#AC8F52]"
        }`}
      >
        {kicker}
      </p>
      <h3
        className="mt-3 font-display leading-tight"
        style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)", fontWeight: 600 }}
      >
        {heading}
      </h3>
      <p className={`mt-3 text-[16px] leading-relaxed ${dark ? "text-[#CBD1DA]" : "text-[#4A5462]"}`}>
        {intro}
      </p>
      <ul className={`mt-8 divide-y ${dark ? "divide-white/12" : "divide-[#E2E4E7]"}`}>
        {rows.map((r) => (
          <li key={r.title} className="py-4">
            <p className="text-[17px] font-semibold leading-snug">{r.title}</p>
            <p className={`mt-1 text-[15px] leading-relaxed ${dark ? "text-[#A7AEBA]" : "text-[#5B6472]"}`}>
              {r.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Behandlungen() {
  const t = useT({
    de: {
      label: "Behandlungsspektrum",
      h2a: "Erst behandeln, ",
      h2b: "dann operieren",
      lead:
        "Über 90 % unserer Patientinnen und Patienten kommen ohne Operation aus. Erst wenn konservative Wege ausgeschöpft sind, sprechen wir über einen Eingriff — und dann so schonend wie möglich.",
      leftKicker: "Konservativ",
      leftH: "Ohne Operation",
      leftIntro: "Der erste Weg: Schmerz lindern, Funktion zurückholen, Ursachen behandeln.",
      leftRows: [
        { title: "Bildgesteuerte Schmerztherapie", text: "Infiltrationen unter CT- oder Röntgenkontrolle, millimetergenau an der Schmerzquelle." },
        { title: "Multimodale Therapie", text: "Physiotherapie, Rückenschule und medikamentöse Therapie eng abgestimmt." },
        { title: "Manuelle Medizin & Osteopathie", text: "Blockaden lösen, Beweglichkeit und Statik verbessern." },
        { title: "Zweitmeinung", text: "Unabhängige Einschätzung, bevor eine Operation stattfindet." },
      ],
      rightKicker: "Operativ",
      rightH: "Wenn es nötig wird",
      rightIntro: "Mikrochirurgisch, gewebeschonend und mit klarer Indikation — nicht als Standardlösung.",
      rightRows: [
        { title: "Mikrochirurgische Bandscheiben-OP", text: "Kleiner Zugang, kurze Erholung, Entlastung des Nervs." },
        { title: "Dekompression bei Spinalkanalstenose", text: "Mehr Platz für Nerven, damit die Gehstrecke wieder länger wird." },
        { title: "Stabilisierung & Fusion", text: "Bei Instabilität oder Wirbelgleiten, so kurzstreckig wie möglich." },
        { title: "Kyphoplastie bei Wirbelbruch", text: "Aufrichtung und Zementierung gebrochener Wirbelkörper." },
      ],
    },
    en: {
      label: "Treatment spectrum",
      h2a: "Treat first, ",
      h2b: "operate later",
      lead:
        "More than 90% of our patients never need surgery. Only once conservative options are exhausted do we discuss an operation — and then as gently as possible.",
      leftKicker: "Conservative",
      leftH: "Without surgery",
      leftIntro: "The first route: relieve pain, restore function, treat the cause.",
      leftRows: [
        { title: "Image-guided pain therapy", text: "Injections under CT or X-ray control, millimetre-precise at the pain source." },
        { title: "Multimodal therapy", text: "Physiotherapy, back school and medication closely coordinated." },
        { title: "Manual medicine & osteopathy", text: "Release blockages, improve mobility and posture." },
        { title: "Second opinion", text: "An independent assessment before any operation takes place." },
      ],
      rightKicker: "Surgical",
      rightH: "When it becomes necessary",
      rightIntro: "Microsurgical, tissue-sparing and with a clear indication — never the default answer.",
      rightRows: [
        { title: "Microsurgical disc surgery", text: "Small access, short recovery, relief for the nerve." },
        { title: "Decompression for spinal stenosis", text: "More room for the nerves so walking distance improves again." },
        { title: "Stabilisation & fusion", text: "For instability or slipped vertebrae, over as short a segment as possible." },
        { title: "Kyphoplasty for vertebral fracture", text: "Restoring and cementing collapsed vertebral bodies." },
      ],
    },
  });

  return (
    <section className="bg-[#F8F8F6] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#AC8F52] flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            {t.label}
          </p>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.1rem)", fontWeight: 500 }}
          >
            {t.h2a}
            <span style={{ fontWeight: 700 }}>{t.h2b}</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#4A5462] leading-relaxed">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Column kicker={t.leftKicker} heading={t.leftH} intro={t.leftIntro} rows={t.leftRows} />
          <Column kicker={t.rightKicker} heading={t.rightH} intro={t.rightIntro} rows={t.rightRows} dark />
        </div>
      </div>
    </section>
  );
}

export default Behandlungen;
