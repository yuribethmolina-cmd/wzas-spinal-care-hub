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
          dark ? "text-[#D8BE85]" : "text-[#7A6029]"
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
        "Wir denken in drei Stufen: Verfahren ohne Operation, minimalinvasive Eingriffe und Wirbelsäulenchirurgie. Unser Grundsatz: konservative Behandlung wenn möglich, Operation wenn nötig.",
      leftKicker: "Ohne Operation",
      leftH: "Konservative Verfahren",
      leftIntro: "Die meisten Rückenerkrankungen müssen nicht operiert werden, sie sind der erste und oft einzige Schritt.",
      leftRows: [
        { title: "Infiltrationstherapie", text: "Schmerzlindernde und entzündungshemmende Medikamente unter Röntgenkontrolle gezielt an den Schmerzort." },
        { title: "Medikamentöse Therapie", text: "Tabletten oder Infusionen, um die Spirale aus Schmerz, Schonhaltung und Verspannung zu durchbrechen." },
        { title: "Physiotherapie & physikalische Behandlungen", text: "Ergänzend zur Schmerztherapie, individuell auf Ihre Diagnose abgestimmt." },
      ],
      midKicker: "Minimalinvasiv",
      midH: "Zwischen Therapie und OP",
      midIntro: "Schonender als eine klassische Operation, gezielter als Tabletten oder Physiotherapie allein.",
      midRows: [
        { title: "Hitzesonden-Behandlung", text: "Wärme schaltet die feinen Nerven an den Wirbelgelenken unter Bildkontrolle gezielt aus." },
        { title: "Schmerzpumpen (IDD)", text: "Kleines Implantat, das Schmerzmittel kontinuierlich direkt im Bereich des Rückenmarks abgibt." },
        { title: "Schmerz-Schrittmacher (SCS)", text: "Schwache elektrische Impulse unterbrechen die Weiterleitung der Schmerzsignale ans Gehirn." },
        { title: "Injektionen in die Bandscheibe", text: "Medikamente direkt ins Bandscheibengewebe, um Druck von gereizten Nervenwurzeln zu nehmen." },
      ],
      rightKicker: "Operativ",
      rightH: "Wenn es nötig wird",
      rightIntro: "Mikrochirurgisch, gewebeschonend und mit klarer Indikation, nicht als Standardlösung.",
      rightRows: [
        { title: "Mikrochirurgische Verfahren", text: "Operation unter dem hochauflösenden Mikroskop über kleinste Schnitte, präzise und sicher." },
        { title: "Bewegungserhaltende Verfahren", text: "Dynamische Rekonstruktion und Stabilisierung, wo eine Versteifung vermeidbar ist." },
        { title: "Stabilisierende Verfahren", text: "Implantate, Verschraubungen oder Spondylodese bei ausgeprägter Instabilität." },
      ],
    },
    en: {
      label: "Treatment spectrum",
      h2a: "Treat first, ",
      h2b: "operate later",
      lead:
        "We work in three stages: non-surgical procedures, minimally invasive interventions and spinal surgery. Our principle: conservative treatment where possible, surgery where necessary.",
      leftKicker: "Without surgery",
      leftH: "Conservative procedures",
      leftIntro: "Most back conditions never need an operation, this is the first and often the only step.",
      leftRows: [
        { title: "Injection therapy", text: "Pain-relieving, anti-inflammatory medication placed at the source of pain under X-ray guidance." },
        { title: "Medication therapy", text: "Tablets or infusions to break the cycle of pain, protective posture and muscle tension." },
        { title: "Physiotherapy & physical treatments", text: "Complementing pain therapy, tailored individually to your diagnosis." },
      ],
      midKicker: "Minimally invasive",
      midH: "Between therapy and surgery",
      midIntro: "Gentler than classic surgery, more targeted than tablets or physiotherapy alone.",
      midRows: [
        { title: "Heat probe treatment", text: "Heat switches off the fine nerves at the affected facet joints under image guidance." },
        { title: "Pain pumps (IDD)", text: "A small implant delivering pain medication continuously near the spinal cord." },
        { title: "Pain pacemaker (SCS)", text: "Gentle electrical impulses interrupt pain signals on their way to the brain." },
        { title: "Intradiscal injections", text: "Medication placed directly into the disc to relieve pressure on irritated nerve roots." },
      ],
      rightKicker: "Surgical",
      rightH: "When it becomes necessary",
      rightIntro: "Microsurgical, tissue-sparing and with a clear indication, never the default answer.",
      rightRows: [
        { title: "Microsurgical procedures", text: "Surgery through the smallest incisions using a high-resolution microscope, precise and safe." },
        { title: "Motion-preserving procedures", text: "Dynamic reconstruction and stabilisation wherever fusion can be avoided." },
        { title: "Stabilising procedures", text: "Implants, screw fixation or spondylodesis in cases of pronounced instability." },
      ],
    },
  });

  return (
    <section className="bg-[#F8F8F6] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#7A6029] flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            {t.label}
          </p>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-[1.14] sm:leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.1rem)", fontWeight: 500 }}
          >
            {t.h2a}
            <span style={{ fontWeight: 700 }}>{t.h2b}</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#4A5462] leading-relaxed">{t.lead}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Column kicker={t.leftKicker} heading={t.leftH} intro={t.leftIntro} rows={t.leftRows} />
          <Column kicker={t.midKicker} heading={t.midH} intro={t.midIntro} rows={t.midRows} />
          <Column kicker={t.rightKicker} heading={t.rightH} intro={t.rightIntro} rows={t.rightRows} dark />
        </div>
      </div>
    </section>
  );
}

export default Behandlungen;
