// src/lib/conditions.ts

const BASE = "https://www.wzas.de/wp-content/uploads";

export type Condition = {
  id: string;
  name: string;
  subtitle: string;
  photo: string;
  bodyText: string;
  bullets: {
    region: string;
    frequency: string;
    symptoms: string[];
  };
  treatmentIds: string[];
  relatedIds: string[];
  ctaCopy: string;
  doctorSlugs: string[];
};

export const CONDITIONS: Condition[] = [
  {
    id: "rueckenschmerzen",
    name: "Rückenschmerzen",
    subtitle: "",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-028.webp`,
    bodyText:
      "Rückenschmerzen gehören zu den häufigsten Erkrankungen unserer Zeit — nahezu 80 Prozent aller Menschen leiden im Laufe ihres Lebens darunter. Ursachen sind vielfältig: Bewegungsmangel durch sitzende Tätigkeiten, einseitige körperliche Belastung, Übergewicht, Haltungsschäden sowie psychische Faktoren wie Stress und Erschöpfung. Diese Einflüsse führen langfristig zu Veränderungen an den Bandscheiben, Wirbelgelenken und dem umgebenden Muskelgewebe. Akute Rückenschmerzen entstehen oft plötzlich und klingen bei geeigneter Behandlung innerhalb weniger Wochen ab. Chronische Rückenschmerzen — definiert als Beschwerden über mehr als zwölf Wochen — erfordern eine ganzheitliche Diagnostik und ein individuell abgestimmtes Behandlungskonzept. Im WZAS München analysieren wir zunächst die genaue Ursache Ihrer Beschwerden, bevor wir gemeinsam den richtigen Behandlungsweg einschlagen.",
    bullets: {
      region: "Lenden- und Brustwirbelsäule",
      frequency: "Sehr häufig (ca. 80 % der Bevölkerung)",
      symptoms: ["Dumpfer oder stechender Schmerz", "Bewegungseinschränkung", "Muskelverspannungen"],
    },
    treatmentIds: ["infiltration", "medikamentoes", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "iliosakralsyndrom", "bandscheiben-deg"],
    ctaCopy: "Leiden Sie unter anhaltenden Rückenschmerzen?",
    doctorSlugs: [],
  },
  {
    id: "bandscheibenvorfall",
    name: "Bandscheibenvorfall",
    subtitle: "Discusprolaps",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-032.webp`,
    bodyText:
      "Zwischen jedem Wirbelkörper liegt eine Bandscheibe — ein faserknorpeliger Ring mit einem gallertartigen Kern, der als Stoßdämpfer der Wirbelsäule dient. Beim Bandscheibenvorfall (Discusprolaps) tritt der Gallertkern durch einen Riss im Faserring aus und kann auf das Rückenmark oder angrenzende Nervenwurzeln drücken. Betroffen ist am häufigsten die Lendenwirbelsäule (LWS), seltener die Halswirbelsäule (HWS). Die typischen Symptome sind starke, oft in Bein oder Arm ausstrahlende Schmerzen, Taubheitsgefühle sowie — in schweren Fällen — Kraftverlust in den betroffenen Extremitäten. Nicht jeder Bandscheibenvorfall erfordert eine Operation: In vielen Fällen lässt sich durch gezielte konservative Maßnahmen eine vollständige Beschwerdefreiheit erreichen. Das Team des WZAS München beurteilt im Einzelfall, welcher Behandlungsansatz für Sie am geeignetsten ist.",
    bullets: {
      region: "Lendenwirbelsäule (LWS), seltener HWS",
      frequency: "Häufig",
      symptoms: ["Ausstrahlende Schmerzen in Bein oder Arm", "Taubheitsgefühle", "Kraftverlust (in schweren Fällen)"],
    },
    treatmentIds: ["infiltration", "mikrochirurgie", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "wirbelkanalverengung", "wirbelgleiten"],
    ctaCopy: "Leiden Sie an einem Bandscheibenvorfall?",
    doctorSlugs: [],
  },
  {
    id: "bandscheiben-deg",
    name: "Bandscheiben-Degeneration",
    subtitle: "Osteochondrose",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-054.webp`,
    bodyText:
      "Die Bandscheiben-Degeneration, medizinisch als Osteochondrose bezeichnet, ist ein natürlicher Alterungsprozess, der sich durch ungünstige Belastungen beschleunigen kann. Mit der Zeit verlieren die Bandscheiben an Höhe und Elastizität: Ihr Wassergehalt nimmt ab, der Faserring wird brüchig, und die Pufferwirkung zwischen den Wirbelkörpern lässt nach. Als Folge entstehen chronische Schmerzen, Steifheit und ein zunehmendes Instabilitätsgefühl in der Wirbelsäule. Die Osteochondrose betrifft vor allem die Lendenwirbelsäule und tritt häufig in Kombination mit Veränderungen an den Wirbelgelenken auf. Im WZAS München behandeln wir die Bandscheiben-Degeneration mit einem stufenweisen Konzept: Zunächst setzen wir auf konservative Maßnahmen — von der medikamentösen Schmerztherapie bis zur Infiltrationsbehandlung. Operative Schritte werden nur dann erwogen, wenn alle anderen Optionen ausgeschöpft sind.",
    bullets: {
      region: "Lendenwirbelsäule",
      frequency: "Altersbedingt häufig",
      symptoms: ["Chronische Rückenschmerzen", "Morgendliche Steifheit", "Belastungsschmerz"],
    },
    treatmentIds: ["infiltration", "medikamentoes", "stabilisierung"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "wirbelkanalverengung"],
    ctaCopy: "Haben Sie chronische Rückenschmerzen durch Bandscheibendegeneration?",
    doctorSlugs: [],
  },
  {
    id: "wirbelkoerperfraktur",
    name: "Wirbelkörperfraktur",
    subtitle: "",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-047.webp`,
    bodyText:
      "Eine Wirbelkörperfraktur ist ein Knochenbruch an einem oder mehreren Wirbelkörpern der Wirbelsäule. Sie entsteht durch starke direkte Gewalteinwirkung — etwa bei einem Sturz oder Verkehrsunfall — tritt aber auch bei vorgeschädigtem Knochen (Osteoporose) bereits durch alltägliche Belastungen auf. Typisch ist ein plötzlich einsetzender, starker Rückenschmerz, oft verbunden mit einer sichtbaren Verformung der Wirbelsäule oder einer Abnahme der Körpergröße. Abhängig von Typ und Schweregrad der Fraktur reicht das Behandlungsspektrum von konservativer Schmerztherapie mit Schonung über minimalinvasive Verfahren wie die Kyphoplastie — bei der Knochenzement zur Stabilisierung eingebracht wird — bis hin zur offen-chirurgischen Versorgung. Besonders bei osteoporose-bedingten Frakturen ist eine begleitende Therapie der zugrundeliegenden Knochenerkrankung unverzichtbar, um weitere Frakturen zu verhindern.",
    bullets: {
      region: "Brust- und Lendenwirbelsäule",
      frequency: "Häufig bei Osteoporose",
      symptoms: ["Plötzlicher starker Rückenschmerz", "Abnahme der Körpergröße", "Bewegungseinschränkung"],
    },
    treatmentIds: ["minimalinvasiv", "stabilisierung", "medikamentoes"],
    relatedIds: ["osteoporose", "wirbelkanalverengung", "rueckenschmerzen"],
    ctaCopy: "Haben Sie eine Wirbelkörperfraktur erlitten?",
    doctorSlugs: [],
  },
  {
    id: "wirbelkanalverengung",
    name: "Wirbelkanalverengung",
    subtitle: "Spinalkanalstenose",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-029.webp`,
    bodyText:
      "Die Spinalkanalstenose bezeichnet eine Einengung des Wirbelkanals — des knöchernen Kanals, durch den das Rückenmark und die Nervenwurzeln verlaufen. Ursache ist meist ein schleichender Umbau der Wirbelgelenke und Bänder im Laufe der Zeit, oft in Kombination mit Bandscheibenveränderungen. Betroffen sind vor allem ältere Menschen; in der Lendenwirbelsäule ist die Erkrankung am häufigsten. Das Leitsymptom ist die sogenannte Claudicatio spinalis: Beim Gehen entstehen zunehmende Schmerzen, Taubheitsgefühle oder ein Schweregefühl in den Beinen, die sich durch Sitzen oder leichtes Vornüberbeugen rasch bessern. Die Behandlung richtet sich nach dem Ausmaß der Einengung und der Beeinträchtigung des Alltags. Konservative Maßnahmen sowie minimalinvasive Dekompressionsverfahren bieten oft deutliche Linderung — eine offene Operation wird nur bei ausgeprägtem Befund oder nachlassender Gehstrecke eingesetzt.",
    bullets: {
      region: "Lendenwirbelsäule",
      frequency: "Häufig ab dem 60. Lebensjahr",
      symptoms: ["Schmerzen beim Gehen (Claudicatio spinalis)", "Besserung beim Sitzen", "Taubheit in den Beinen"],
    },
    treatmentIds: ["infiltration", "mikrochirurgie", "minimalinvasiv"],
    relatedIds: ["bandscheibenvorfall", "wirbelgleiten", "facettengelenksarthrose"],
    ctaCopy: "Leidet Ihre Gehstrecke unter einer Spinalkanalstenose?",
    doctorSlugs: [],
  },
  {
    id: "wirbelgleiten",
    name: "Wirbelgleiten",
    subtitle: "Spondylolisthesis",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-056.webp`,
    bodyText:
      "Beim Wirbelgleiten (Spondylolisthesis) verschiebt sich ein Wirbelkörper gegenüber dem benachbarten nach vorne. Ursache kann eine angeborene Schwäche des Wirbelbogens, ein degenerativer Abbau der Wirbelgelenke im Alter oder — seltener — eine Verletzung sein. Betroffen ist am häufigsten der Übergang zwischen dem vierten und fünften Lendenwirbel (L4/L5). Je nach Ausmaß des Gleitens können die Symptome von gelegentlichem Rückenschmerz bis hin zu ausgeprägten Nervenschmerzen mit Ausstrahlung in die Beine reichen. Ein leichtes Wirbelgleiten lässt sich in vielen Fällen konservativ behandeln: Physiotherapie zur Stabilisierung der Rumpfmuskulatur und gezielte Infiltrationen können die Beschwerden deutlich lindern. Bei fortgeschrittenem Gleiten oder neurologischen Ausfällen kann eine operative Stabilisierung der betroffenen Wirbelsäulensegmente notwendig werden.",
    bullets: {
      region: "Lendenwirbelsäule (L4/L5)",
      frequency: "Mäßig häufig",
      symptoms: ["Rückenschmerzen", "Ausstrahlende Schmerzen in die Beine", "Instabilitätsgefühl"],
    },
    treatmentIds: ["infiltration", "stabilisierung", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "wirbelkanalverengung", "rueckenschmerzen"],
    ctaCopy: "Spüren Sie Instabilität oder ausstrahlende Schmerzen durch Wirbelgleiten?",
    doctorSlugs: [],
  },
  {
    id: "iliosakralsyndrom",
    name: "Iliosakralsyndrom",
    subtitle: "Kreuzdarmbeingelenk",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-038.webp`,
    bodyText:
      "Das Iliosakralsyndrom entsteht durch eine Funktionsstörung oder Entzündung des Iliosakralgelenks (ISG) — der Verbindung zwischen Kreuzbein und Beckenknochen. Das ISG überträgt die Kräfte zwischen Wirbelsäule und Becken und ist im Alltag erheblichen Belastungen ausgesetzt. Eine Reizung oder Blockierung dieses Gelenks erzeugt tiefsitzende Kreuzschmerzen, die häufig in Gesäß und Oberschenkel ausstrahlen und beim Sitzen oder einseitiger Belastung zunehmen. Das Iliosakralsyndrom wird oft mit einem Bandscheibenvorfall verwechselt, da die Symptome ähnlich sind. Eine präzise klinische Untersuchung und, bei Bedarf, eine diagnostische Infiltration des Gelenks sind entscheidend für die korrekte Diagnose. Die Behandlung umfasst gezielte ISG-Infiltrationen, Physiotherapie und, in therapieresistenten Fällen, eine minimalinvasive Verödung der Schmerznerven.",
    bullets: {
      region: "Iliosakralgelenk (Übergang LWS–Becken)",
      frequency: "Häufig, oft fehldiagnostiziert",
      symptoms: ["Tiefsitzender Kreuzschmerz", "Ausstrahlung in Gesäß und Oberschenkel", "Zunahme beim Sitzen"],
    },
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "bandscheibenvorfall"],
    ctaCopy: "Leiden Sie unter tiefsitzendem Kreuzschmerz?",
    doctorSlugs: [],
  },
  {
    id: "osteoporose",
    name: "Osteoporose",
    subtitle: "Knochenschwund",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-026.webp`,
    bodyText:
      "Osteoporose ist eine Skeletterkrankung, bei der die Knochendichte und -qualität abnimmt, was das Risiko von Frakturen erhöht. An der Wirbelsäule führt Osteoporose besonders häufig zu Wirbelkörpereinbrüchen — teilweise ohne nennenswerten äußeren Auslöser. Die Erkrankung betrifft vor allem Frauen nach der Menopause, ist aber auch bei Männern ab dem 70. Lebensjahr verbreitet. Lange verläuft Osteoporose ohne Beschwerden; erst eine Fraktur macht die Erkrankung sichtbar. Eine Abnahme der Körpergröße, ein sich entwickelnder Rundrücken oder anhaltende belastungsabhängige Rückenschmerzen können erste Hinweise sein. Im WZAS München diagnostizieren wir Osteoporose mittels Knochendichtemessung und behandeln sowohl die Grunderkrankung als auch deren Folgen an der Wirbelsäule — frische Wirbelkörperfrakturen können mit der Kyphoplastie minimalinvasiv stabilisiert werden.",
    bullets: {
      region: "Gesamte Wirbelsäule",
      frequency: "Häufig bei Frauen nach der Menopause",
      symptoms: ["Oft asymptomatisch bis zur ersten Fraktur", "Abnahme der Körpergröße", "Rundrücken"],
    },
    treatmentIds: ["minimalinvasiv", "medikamentoes", "stabilisierung"],
    relatedIds: ["wirbelkoerperfraktur", "rueckenschmerzen", "bandscheiben-deg"],
    ctaCopy: "Wurde bei Ihnen Osteoporose diagnostiziert?",
    doctorSlugs: [],
  },
  {
    id: "facettengelenksarthrose",
    name: "Facettengelenksarthrose",
    subtitle: "Spondylarthrose",
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-019.webp`,
    bodyText:
      "Die Facettengelenksarthrose — auch Spondylarthrose genannt — ist ein Verschleiß der kleinen Wirbelgelenke, die jeweils zwei benachbarte Wirbelkörper miteinander verbinden. Diese Gelenke ermöglichen die geführte Bewegung der Wirbelsäule und nehmen bei jeder Beuge- und Drehbewegung Belastungen auf. Mit zunehmendem Alter und Überlastung nutzt der schützende Knorpel ab; die Gelenkkapseln entzünden sich, und knöcherne Anbauten können den Wirbelkanal einengen. Typisch ist ein belastungsabhängiger, tiefsitzender Rückenschmerz, der morgens besonders ausgeprägt ist und sich durch Bewegung und Wärme bessert. Im WZAS München behandeln wir die Spondylarthrose mit einem mehrstufigen Ansatz: Gezielte Facettengelenks-Infiltrationen lindern akute Schmerzschübe; bei dauerhafter Beschwerdesymptomatik kann eine minimalinvasive Denervierung (Radiofrequenzablation) der Schmerznerven zu langfristiger Erleichterung führen.",
    bullets: {
      region: "Gesamte Wirbelsäule, häufig LWS",
      frequency: "Häufig im Alter",
      symptoms: ["Morgendliche Steifheit", "Belastungsabhängiger Rückenschmerz", "Besserung durch Bewegung und Wärme"],
    },
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["bandscheiben-deg", "iliosakralsyndrom", "wirbelkanalverengung"],
    ctaCopy: "Schränkt Sie Facettengelenksarthrose in Ihrer Beweglichkeit ein?",
    doctorSlugs: [],
  },
];

export function getCondition(slug: string): Condition | undefined {
  return CONDITIONS.find((c) => c.id === slug);
}

export const TREATMENT_LABELS: Record<string, string> = {
  infiltration:   "Infiltrationstherapie",
  medikamentoes:  "Medikamentöse Therapie",
  physiotherapie: "Physiotherapie",
  minimalinvasiv: "Minimalinvasive Verfahren",
  mikrochirurgie: "Mikrochirurgische Verfahren",
  stabilisierung: "Stabilisierende Verfahren",
};
