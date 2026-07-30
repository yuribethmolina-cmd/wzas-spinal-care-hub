// src/lib/conditions.ts

const BASE = "https://www.wzas.de/wp-content/uploads";

export type ConditionContent = {
  name: string;
  subtitle: string;
  bodyText: string;
  bullets: {
    region: string;
    frequency: string;
    symptoms: string[];
  };
  ctaCopy: string;
};

export type Condition = {
  id: string;
  photo: string;
  treatmentIds: string[];
  relatedIds: string[];
  doctorSlugs: string[];
  de: ConditionContent;
  en: ConditionContent;
};

export function getConditionContent(
  condition: Condition,
  lang: "de" | "en"
): ConditionContent {
  return condition[lang];
}

export const CONDITIONS: Condition[] = [
  {
    id: "rueckenschmerzen",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-028.webp`,
    treatmentIds: ["infiltration", "medikamentoes", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "iliosakralsyndrom", "bandscheiben-deg"],
    doctorSlugs: [],
    de: {
      name: "Rückenschmerzen",
      subtitle: "",
      bodyText:
        "Rückenschmerzen gehören zu den häufigsten Erkrankungen unserer Zeit — nahezu 80 Prozent aller Menschen leiden im Laufe ihres Lebens darunter. Ursachen sind vielfältig: Bewegungsmangel durch sitzende Tätigkeiten, einseitige körperliche Belastung, Übergewicht, Haltungsschäden sowie psychische Faktoren wie Stress und Erschöpfung. Diese Einflüsse führen langfristig zu Veränderungen an den Bandscheiben, Wirbelgelenken und dem umgebenden Muskelgewebe. Akute Rückenschmerzen entstehen oft plötzlich und klingen bei geeigneter Behandlung innerhalb weniger Wochen ab. Chronische Rückenschmerzen — definiert als Beschwerden über mehr als zwölf Wochen — erfordern eine ganzheitliche Diagnostik und ein individuell abgestimmtes Behandlungskonzept. Im WZAS München analysieren wir zunächst die genaue Ursache Ihrer Beschwerden, bevor wir gemeinsam den richtigen Behandlungsweg einschlagen.",
      bullets: {
        region: "Lenden- und Brustwirbelsäule",
        frequency: "Sehr häufig (ca. 80 % der Bevölkerung)",
        symptoms: ["Dumpfer oder stechender Schmerz", "Bewegungseinschränkung", "Muskelverspannungen"],
      },
      ctaCopy: "Leiden Sie unter anhaltenden Rückenschmerzen?",
    },
    en: {
      name: "Back Pain",
      subtitle: "",
      bodyText:
        "Back pain is one of the most common conditions of our time — nearly 80 percent of all people experience it at some point in their lives. The causes are varied: lack of movement from sedentary work, repetitive physical strain, excess weight, postural problems and psychological factors such as stress and exhaustion. Over time, these influences lead to changes in the intervertebral discs, facet joints and surrounding muscle tissue. Acute back pain often comes on suddenly and, with appropriate treatment, resolves within a few weeks. Chronic back pain — defined as symptoms lasting more than twelve weeks — requires comprehensive diagnostic assessment and an individually tailored treatment plan. At WZAS Munich, we first analyse the precise cause of your symptoms before we decide together on the right course of treatment.",
      bullets: {
        region: "Lumbar and thoracic spine",
        frequency: "Very common (approx. 80% of the population)",
        symptoms: ["Dull or stabbing pain", "Restricted movement", "Muscle tension"],
      },
      ctaCopy: "Are you suffering from persistent back pain?",
    },
  },
  {
    id: "bandscheibenvorfall",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-032.webp`,
    treatmentIds: ["infiltration", "mikrochirurgie", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "wirbelkanalverengung", "wirbelgleiten"],
    doctorSlugs: [],
    de: {
      name: "Bandscheibenvorfall",
      subtitle: "Discusprolaps",
      bodyText:
        "Zwischen jedem Wirbelkörper liegt eine Bandscheibe — ein faserknorpeliger Ring mit einem gallertartigen Kern, der als Stoßdämpfer der Wirbelsäule dient. Beim Bandscheibenvorfall (Discusprolaps) tritt der Gallertkern durch einen Riss im Faserring aus und kann auf das Rückenmark oder angrenzende Nervenwurzeln drücken. Betroffen ist am häufigsten die Lendenwirbelsäule (LWS), seltener die Halswirbelsäule (HWS). Die typischen Symptome sind starke, oft in Bein oder Arm ausstrahlende Schmerzen, Taubheitsgefühle sowie — in schweren Fällen — Kraftverlust in den betroffenen Extremitäten. Nicht jeder Bandscheibenvorfall erfordert eine Operation: In vielen Fällen lässt sich durch gezielte konservative Maßnahmen eine vollständige Beschwerdefreiheit erreichen. Das Team des WZAS München beurteilt im Einzelfall, welcher Behandlungsansatz für Sie am geeignetsten ist.",
      bullets: {
        region: "Lendenwirbelsäule (LWS), seltener HWS",
        frequency: "Häufig",
        symptoms: ["Ausstrahlende Schmerzen in Bein oder Arm", "Taubheitsgefühle", "Kraftverlust (in schweren Fällen)"],
      },
      ctaCopy: "Leiden Sie an einem Bandscheibenvorfall?",
    },
    en: {
      name: "Herniated Disc",
      subtitle: "Disc prolapse",
      bodyText:
        "Between each vertebra lies an intervertebral disc — a fibrocartilaginous ring with a gel-like core that acts as the spine's shock absorber. In a herniated disc (disc prolapse), the gel-like nucleus pushes through a tear in the fibrous ring and can press on the spinal cord or adjacent nerve roots. The lumbar spine (L-spine) is most commonly affected; the cervical spine (C-spine) less so. Typical symptoms include severe pain often radiating into the leg or arm, numbness and — in serious cases — loss of strength in the affected limbs. Not every herniated disc requires surgery: in many cases, targeted conservative measures can achieve complete relief. The WZAS Munich team assesses each individual case to determine the most appropriate treatment approach.",
      bullets: {
        region: "Lumbar spine (L-spine), occasionally C-spine",
        frequency: "Common",
        symptoms: ["Radiating pain into the leg or arm", "Numbness", "Loss of strength (in severe cases)"],
      },
      ctaCopy: "Have you been diagnosed with a herniated disc?",
    },
  },
  {
    id: "bandscheiben-deg",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-054.webp`,
    treatmentIds: ["infiltration", "medikamentoes", "stabilisierung"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "wirbelkanalverengung"],
    doctorSlugs: [],
    de: {
      name: "Bandscheiben-Degeneration",
      subtitle: "Osteochondrose",
      bodyText:
        "Die Bandscheiben-Degeneration, medizinisch als Osteochondrose bezeichnet, ist ein natürlicher Alterungsprozess, der sich durch ungünstige Belastungen beschleunigen kann. Mit der Zeit verlieren die Bandscheiben an Höhe und Elastizität: Ihr Wassergehalt nimmt ab, der Faserring wird brüchig, und die Pufferwirkung zwischen den Wirbelkörpern lässt nach. Als Folge entstehen chronische Schmerzen, Steifheit und ein zunehmendes Instabilitätsgefühl in der Wirbelsäule. Die Osteochondrose betrifft vor allem die Lendenwirbelsäule und tritt häufig in Kombination mit Veränderungen an den Wirbelgelenken auf. Im WZAS München behandeln wir die Bandscheiben-Degeneration mit einem stufenweisen Konzept: Zunächst setzen wir auf konservative Maßnahmen — von der medikamentösen Schmerztherapie bis zur Infiltrationsbehandlung. Operative Schritte werden nur dann erwogen, wenn alle anderen Optionen ausgeschöpft sind.",
      bullets: {
        region: "Lendenwirbelsäule",
        frequency: "Altersbedingt häufig",
        symptoms: ["Chronische Rückenschmerzen", "Morgendliche Steifheit", "Belastungsschmerz"],
      },
      ctaCopy: "Haben Sie chronische Rückenschmerzen durch Bandscheibendegeneration?",
    },
    en: {
      name: "Disc Degeneration",
      subtitle: "Osteochondrosis",
      bodyText:
        "Disc degeneration, medically known as osteochondrosis, is a natural ageing process that can be accelerated by unfavourable loading. Over time, intervertebral discs lose height and elasticity: their water content decreases, the fibrous ring becomes brittle and the cushioning effect between the vertebral bodies diminishes. This results in chronic pain, stiffness and a growing sense of instability in the spine. Osteochondrosis mainly affects the lumbar spine and frequently occurs alongside changes in the facet joints. At WZAS Munich, we treat disc degeneration using a stepwise approach: we begin with conservative measures — from pain medication to injection therapy. Surgical options are only considered once all other alternatives have been exhausted.",
      bullets: {
        region: "Lumbar spine",
        frequency: "Common, age-related",
        symptoms: ["Chronic back pain", "Morning stiffness", "Pain under load"],
      },
      ctaCopy: "Are chronic back symptoms caused by disc degeneration affecting your daily life?",
    },
  },
  {
    id: "wirbelkoerperfraktur",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-047.webp`,
    treatmentIds: ["minimalinvasiv", "stabilisierung", "medikamentoes"],
    relatedIds: ["osteoporose", "wirbelkanalverengung", "rueckenschmerzen"],
    doctorSlugs: [],
    de: {
      name: "Wirbelkörperfraktur",
      subtitle: "",
      bodyText:
        "Eine Wirbelkörperfraktur ist ein Knochenbruch an einem oder mehreren Wirbelkörpern der Wirbelsäule. Sie entsteht durch starke direkte Gewalteinwirkung — etwa bei einem Sturz oder Verkehrsunfall — tritt aber auch bei vorgeschädigtem Knochen (Osteoporose) bereits durch alltägliche Belastungen auf. Typisch ist ein plötzlich einsetzender, starker Rückenschmerz, oft verbunden mit einer sichtbaren Verformung der Wirbelsäule oder einer Abnahme der Körpergröße. Abhängig von Typ und Schweregrad der Fraktur reicht das Behandlungsspektrum von konservativer Schmerztherapie mit Schonung über minimalinvasive Verfahren wie die Kyphoplastie — bei der Knochenzement zur Stabilisierung eingebracht wird — bis hin zur offen-chirurgischen Versorgung. Besonders bei osteoporose-bedingten Frakturen ist eine begleitende Therapie der zugrundeliegenden Knochenerkrankung unverzichtbar, um weitere Frakturen zu verhindern.",
      bullets: {
        region: "Brust- und Lendenwirbelsäule",
        frequency: "Häufig bei Osteoporose",
        symptoms: ["Plötzlicher starker Rückenschmerz", "Abnahme der Körpergröße", "Bewegungseinschränkung"],
      },
      ctaCopy: "Haben Sie eine Wirbelkörperfraktur erlitten?",
    },
    en: {
      name: "Vertebral Fracture",
      subtitle: "",
      bodyText:
        "A vertebral fracture is a break in one or more vertebral bodies of the spine. It typically results from a high-energy impact — such as a fall or road accident — but can also occur in people with weakened bone (osteoporosis) under the load of everyday activities. The hallmark symptom is a sudden, severe onset of back pain, often accompanied by visible deformity of the spine or a reduction in body height. Depending on the type and severity of the fracture, treatment ranges from conservative pain management and rest, through minimally invasive procedures such as kyphoplasty — in which bone cement is injected to stabilise the vertebral body — to open surgical repair. In osteoporosis-related fractures, treatment of the underlying bone disease is essential to prevent further fractures.",
      bullets: {
        region: "Thoracic and lumbar spine",
        frequency: "Common in osteoporosis",
        symptoms: ["Sudden severe back pain", "Reduction in body height", "Restricted movement"],
      },
      ctaCopy: "Have you suffered a vertebral fracture?",
    },
  },
  {
    id: "wirbelkanalverengung",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-029.webp`,
    treatmentIds: ["infiltration", "mikrochirurgie", "minimalinvasiv"],
    relatedIds: ["bandscheibenvorfall", "wirbelgleiten", "facettengelenksarthrose"],
    doctorSlugs: [],
    de: {
      name: "Wirbelkanalverengung",
      subtitle: "Spinalkanalstenose",
      bodyText:
        "Die Spinalkanalstenose bezeichnet eine Einengung des Wirbelkanals — des knöchernen Kanals, durch den das Rückenmark und die Nervenwurzeln verlaufen. Ursache ist meist ein schleichender Umbau der Wirbelgelenke und Bänder im Laufe der Zeit, oft in Kombination mit Bandscheibenveränderungen. Betroffen sind vor allem ältere Menschen; in der Lendenwirbelsäule ist die Erkrankung am häufigsten. Das Leitsymptom ist die sogenannte Claudicatio spinalis: Beim Gehen entstehen zunehmende Schmerzen, Taubheitsgefühle oder ein Schweregefühl in den Beinen, die sich durch Sitzen oder leichtes Vornüberbeugen rasch bessern. Die Behandlung richtet sich nach dem Ausmaß der Einengung und der Beeinträchtigung des Alltags. Konservative Maßnahmen sowie minimalinvasive Dekompressionsverfahren bieten oft deutliche Linderung — eine offene Operation wird nur bei ausgeprägtem Befund oder nachlassender Gehstrecke eingesetzt.",
      bullets: {
        region: "Lendenwirbelsäule",
        frequency: "Häufig ab dem 60. Lebensjahr",
        symptoms: ["Schmerzen beim Gehen (Claudicatio spinalis)", "Besserung beim Sitzen", "Taubheit in den Beinen"],
      },
      ctaCopy: "Leidet Ihre Gehstrecke unter einer Spinalkanalstenose?",
    },
    en: {
      name: "Spinal Stenosis",
      subtitle: "Spinal canal narrowing",
      bodyText:
        "Spinal stenosis is a narrowing of the spinal canal — the bony channel through which the spinal cord and nerve roots pass. It is most often caused by a gradual remodelling of the facet joints and ligaments over time, frequently combined with disc degeneration. Older adults are most commonly affected; the lumbar spine is the most frequent site. The hallmark symptom is neurogenic claudication: increasing pain, numbness or a feeling of heaviness in the legs during walking, which rapidly improves on sitting or bending slightly forward. Treatment is guided by the degree of narrowing and its impact on daily life. Conservative measures and minimally invasive decompression procedures often provide substantial relief — open surgery is reserved for advanced cases or a progressively shrinking walking distance.",
      bullets: {
        region: "Lumbar spine",
        frequency: "Common from age 60 onwards",
        symptoms: ["Pain when walking (neurogenic claudication)", "Relief on sitting", "Numbness in the legs"],
      },
      ctaCopy: "Is spinal stenosis limiting how far you can walk?",
    },
  },
  {
    id: "wirbelgleiten",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-056.webp`,
    treatmentIds: ["infiltration", "stabilisierung", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "wirbelkanalverengung", "rueckenschmerzen"],
    doctorSlugs: [],
    de: {
      name: "Wirbelgleiten",
      subtitle: "Spondylolisthesis",
      bodyText:
        "Beim Wirbelgleiten (Spondylolisthesis) verschiebt sich ein Wirbelkörper gegenüber dem benachbarten nach vorne. Ursache kann eine angeborene Schwäche des Wirbelbogens, ein degenerativer Abbau der Wirbelgelenke im Alter oder — seltener — eine Verletzung sein. Betroffen ist am häufigsten der Übergang zwischen dem vierten und fünften Lendenwirbel (L4/L5). Je nach Ausmaß des Gleitens können die Symptome von gelegentlichem Rückenschmerz bis hin zu ausgeprägten Nervenschmerzen mit Ausstrahlung in die Beine reichen. Ein leichtes Wirbelgleiten lässt sich in vielen Fällen konservativ behandeln: Physiotherapie zur Stabilisierung der Rumpfmuskulatur und gezielte Infiltrationen können die Beschwerden deutlich lindern. Bei fortgeschrittenem Gleiten oder neurologischen Ausfällen kann eine operative Stabilisierung der betroffenen Wirbelsäulensegmente notwendig werden.",
      bullets: {
        region: "Lendenwirbelsäule (L4/L5)",
        frequency: "Mäßig häufig",
        symptoms: ["Rückenschmerzen", "Ausstrahlende Schmerzen in die Beine", "Instabilitätsgefühl"],
      },
      ctaCopy: "Spüren Sie Instabilität oder ausstrahlende Schmerzen durch Wirbelgleiten?",
    },
    en: {
      name: "Spondylolisthesis",
      subtitle: "Vertebral slippage",
      bodyText:
        "In spondylolisthesis, one vertebral body slips forward over the one below it. The cause may be a congenital weakness in the vertebral arch, degenerative wear of the facet joints with age or — less commonly — an injury. The transition between the fourth and fifth lumbar vertebrae (L4/L5) is most frequently affected. Depending on the degree of slippage, symptoms can range from occasional back pain to pronounced nerve pain radiating into the legs. Mild spondylolisthesis can often be managed conservatively: physiotherapy to strengthen the core muscles and targeted injections can significantly reduce symptoms. In advanced slippage or neurological deficits, surgical stabilisation of the affected spinal segments may become necessary.",
      bullets: {
        region: "Lumbar spine (L4/L5)",
        frequency: "Moderately common",
        symptoms: ["Back pain", "Radiating pain into the legs", "Feeling of instability"],
      },
      ctaCopy: "Are you experiencing instability or radiating pain from spondylolisthesis?",
    },
  },
  {
    id: "iliosakralsyndrom",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-038.webp`,
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "bandscheibenvorfall"],
    doctorSlugs: [],
    de: {
      name: "Iliosakralsyndrom",
      subtitle: "Kreuzdarmbeingelenk",
      bodyText:
        "Das Iliosakralsyndrom entsteht durch eine Funktionsstörung oder Entzündung des Iliosakralgelenks (ISG) — der Verbindung zwischen Kreuzbein und Beckenknochen. Das ISG überträgt die Kräfte zwischen Wirbelsäule und Becken und ist im Alltag erheblichen Belastungen ausgesetzt. Eine Reizung oder Blockierung dieses Gelenks erzeugt tiefsitzende Kreuzschmerzen, die häufig in Gesäß und Oberschenkel ausstrahlen und beim Sitzen oder einseitiger Belastung zunehmen. Das Iliosakralsyndrom wird oft mit einem Bandscheibenvorfall verwechselt, da die Symptome ähnlich sind. Eine präzise klinische Untersuchung und, bei Bedarf, eine diagnostische Infiltration des Gelenks sind entscheidend für die korrekte Diagnose. Die Behandlung umfasst gezielte ISG-Infiltrationen, Physiotherapie und, in therapieresistenten Fällen, eine minimalinvasive Verödung der Schmerznerven.",
      bullets: {
        region: "Iliosakralgelenk (Übergang LWS–Becken)",
        frequency: "Häufig, oft fehldiagnostiziert",
        symptoms: ["Tiefsitzender Kreuzschmerz", "Ausstrahlung in Gesäß und Oberschenkel", "Zunahme beim Sitzen"],
      },
      ctaCopy: "Leiden Sie unter tiefsitzendem Kreuzschmerz?",
    },
    en: {
      name: "Sacroiliac Joint Syndrome",
      subtitle: "SI joint dysfunction",
      bodyText:
        "Sacroiliac (SI) joint syndrome arises from a functional disturbance or inflammation of the sacroiliac joint — the connection between the sacrum and the pelvic bone. The SI joint transfers forces between the spine and the pelvis and is subject to considerable stress in everyday life. Irritation or blockage of this joint produces deep-seated sacral pain that frequently radiates into the buttock and thigh, worsening on prolonged sitting or with one-sided loading. SI joint syndrome is often confused with a herniated disc, as the symptoms are similar. A precise clinical examination and, where necessary, a diagnostic injection into the joint are essential for an accurate diagnosis. Treatment includes targeted SI joint injections, physiotherapy and, in treatment-resistant cases, minimally invasive denervation of the pain-conducting nerves.",
      bullets: {
        region: "Sacroiliac joint (L-spine / pelvis junction)",
        frequency: "Common, frequently misdiagnosed",
        symptoms: ["Deep sacral pain", "Radiation into buttock and thigh", "Worsened by sitting"],
      },
      ctaCopy: "Are you suffering from deep sacral pain?",
    },
  },
  {
    id: "osteoporose",
    photo: `${BASE}/2026/05/Wirbelsaeulenzentrum-026.webp`,
    treatmentIds: ["minimalinvasiv", "medikamentoes", "stabilisierung"],
    relatedIds: ["wirbelkoerperfraktur", "rueckenschmerzen", "bandscheiben-deg"],
    doctorSlugs: [],
    de: {
      name: "Osteoporose",
      subtitle: "Knochenschwund",
      bodyText:
        "Osteoporose ist eine Skeletterkrankung, bei der die Knochendichte und -qualität abnimmt, was das Risiko von Frakturen erhöht. An der Wirbelsäule führt Osteoporose besonders häufig zu Wirbelkörpereinbrüchen — teilweise ohne nennenswerten äußeren Auslöser. Die Erkrankung betrifft vor allem Frauen nach der Menopause, ist aber auch bei Männern ab dem 70. Lebensjahr verbreitet. Lange verläuft Osteoporose ohne Beschwerden; erst eine Fraktur macht die Erkrankung sichtbar. Eine Abnahme der Körpergröße, ein sich entwickelnder Rundrücken oder anhaltende belastungsabhängige Rückenschmerzen können erste Hinweise sein. Im WZAS München diagnostizieren wir Osteoporose mittels Knochendichtemessung und behandeln sowohl die Grunderkrankung als auch deren Folgen an der Wirbelsäule — frische Wirbelkörperfrakturen können mit der Kyphoplastie minimalinvasiv stabilisiert werden.",
      bullets: {
        region: "Gesamte Wirbelsäule",
        frequency: "Häufig bei Frauen nach der Menopause",
        symptoms: ["Oft asymptomatisch bis zur ersten Fraktur", "Abnahme der Körpergröße", "Rundrücken"],
      },
      ctaCopy: "Wurde bei Ihnen Osteoporose diagnostiziert?",
    },
    en: {
      name: "Osteoporosis",
      subtitle: "Bone loss",
      bodyText:
        "Osteoporosis is a skeletal disease in which bone density and quality decrease, significantly raising the risk of fractures. In the spine, osteoporosis most commonly leads to vertebral body collapse — sometimes without any significant external trigger. The condition primarily affects postmenopausal women, but is also prevalent in men from the age of 70. For a long time osteoporosis causes no symptoms; a fracture is often the first sign of the disease. A reduction in body height, a gradually developing stoop or persistent load-related back pain can all be early indicators. At WZAS Munich, we diagnose osteoporosis by bone density measurement and treat both the underlying disease and its spinal consequences — fresh vertebral fractures can be stabilised minimally invasively using kyphoplasty.",
      bullets: {
        region: "Entire spine",
        frequency: "Common in postmenopausal women",
        symptoms: ["Often asymptomatic until first fracture", "Reduction in body height", "Stooped posture"],
      },
      ctaCopy: "Have you been diagnosed with osteoporosis?",
    },
  },
  {
    id: "facettengelenksarthrose",
    photo: `${BASE}/2026/05/Galerie-Wirbelsaeulenzentrum-019.webp`,
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["bandscheiben-deg", "iliosakralsyndrom", "wirbelkanalverengung"],
    doctorSlugs: [],
    de: {
      name: "Facettengelenksarthrose",
      subtitle: "Spondylarthrose",
      bodyText:
        "Die Facettengelenksarthrose — auch Spondylarthrose genannt — ist ein Verschleiß der kleinen Wirbelgelenke, die jeweils zwei benachbarte Wirbelkörper miteinander verbinden. Diese Gelenke ermöglichen die geführte Bewegung der Wirbelsäule und nehmen bei jeder Beuge- und Drehbewegung Belastungen auf. Mit zunehmendem Alter und Überlastung nutzt der schützende Knorpel ab; die Gelenkkapseln entzünden sich, und knöcherne Anbauten können den Wirbelkanal einengen. Typisch ist ein belastungsabhängiger, tiefsitzender Rückenschmerz, der morgens besonders ausgeprägt ist und sich durch Bewegung und Wärme bessert. Im WZAS München behandeln wir die Spondylarthrose mit einem mehrstufigen Ansatz: Gezielte Facettengelenks-Infiltrationen lindern akute Schmerzschübe; bei dauerhafter Beschwerdesymptomatik kann eine minimalinvasive Denervierung (Radiofrequenzablation) der Schmerznerven zu langfristiger Erleichterung führen.",
      bullets: {
        region: "Gesamte Wirbelsäule, häufig LWS",
        frequency: "Häufig im Alter",
        symptoms: ["Morgendliche Steifheit", "Belastungsabhängiger Rückenschmerz", "Besserung durch Bewegung und Wärme"],
      },
      ctaCopy: "Schränkt Sie Facettengelenksarthrose in Ihrer Beweglichkeit ein?",
    },
    en: {
      name: "Facet Joint Arthritis",
      subtitle: "Spondylarthrosis",
      bodyText:
        "Facet joint arthritis — also known as spondylarthrosis — is wear and tear of the small joints connecting adjacent vertebral bodies. These joints guide spinal movement and absorb load with every bending and twisting motion. With advancing age and overuse, the protective cartilage wears away; the joint capsules become inflamed and bony outgrowths can narrow the spinal canal. The typical presentation is a load-related, deep-seated back pain that is most pronounced in the morning and eases with movement and warmth. At WZAS Munich, we treat spondylarthrosis with a graduated approach: targeted facet joint injections relieve acute pain flares; for persistent symptoms, minimally invasive denervation (radiofrequency ablation) of the pain-conducting nerves can provide long-term relief.",
      bullets: {
        region: "Entire spine, frequently lumbar",
        frequency: "Common with ageing",
        symptoms: ["Morning stiffness", "Load-related back pain", "Eased by movement and warmth"],
      },
      ctaCopy: "Is facet joint arthritis limiting your range of movement?",
    },
  },
];

export function getCondition(slug: string): Condition | undefined {
  return CONDITIONS.find((c) => c.id === slug);
}

export const TREATMENT_LABELS: Record<string, { de: string; en: string }> = {
  infiltration:   { de: "Infiltrationstherapie",       en: "Injection Therapy" },
  medikamentoes:  { de: "Medikamentöse Therapie",      en: "Medication Therapy" },
  physiotherapie: { de: "Physiotherapie",              en: "Physiotherapy" },
  minimalinvasiv: { de: "Minimalinvasive Verfahren",   en: "Minimally Invasive Procedures" },
  mikrochirurgie: { de: "Mikrochirurgische Verfahren", en: "Microsurgical Procedures" },
  stabilisierung: { de: "Stabilisierende Verfahren",   en: "Stabilisation Procedures" },
};
