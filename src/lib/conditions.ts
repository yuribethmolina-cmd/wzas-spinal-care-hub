// src/lib/conditions.ts
import mrtImg from "@/assets/wzas/galerie/mrt.webp.asset.json";
import ctImg from "@/assets/wzas/galerie/ct.webp.asset.json";
import befundImg from "@/assets/wzas/galerie/befund.webp.asset.json";
import befundungImg from "@/assets/wzas/galerie/befundung.webp.asset.json";
import untersuchungImg from "@/assets/wzas/galerie/untersuchung.webp.asset.json";
import beratungImg from "@/assets/wzas/galerie/beratung.webp.asset.json";
import schmerztherapieImg from "@/assets/wzas/galerie/schmerztherapie.webp.asset.json";
import gespraechImg from "@/assets/wzas/hero-gespraech.webp.asset.json";
import clinic2Img from "@/assets/wzas/clinic2.webp.asset.json";


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
  videoEmbed?: { src: string; title: string };
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
    photo: untersuchungImg.url,
    treatmentIds: ["infiltration", "medikamentoes", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "iliosakralsyndrom", "bandscheiben-deg"],
    doctorSlugs: [],
    de: {
      name: "Rückenschmerzen",
      subtitle: "",
      bodyText:
        "Rückenschmerzen sind eine der häufigsten Beschwerden, mit denen Patientinnen und Patienten das Wirbelsäulenzentrum am Stiglmaierplatz in München aufsuchen. Zu den häufigsten Auslösern zählen Bewegungsmangel bei sitzenden Tätigkeiten, einseitige körperliche Belastung, Übergewicht und Haltungsschäden; auch psychische Belastungen und Stress spielen eine zunehmend wichtige Rolle. Diese Faktoren führen langfristig zu Veränderungen an den Wirbelgelenken, den Bandscheiben und dem umliegenden Gewebe. Muskelverspannungen entstehen dabei oft als Schutzmechanismus des Körpers. In rund 90 Prozent der Fälle lassen sich Rückenschmerzen ohne Operation erfolgreich behandeln, etwa mit Krankengymnastik, physikalischer Therapie, gezielter Schmerztherapie und Infiltrationen.",
      bullets: {
        region: "Lenden- und Brustwirbelsäule",
        frequency: "Sehr häufig",
        symptoms: ["Dumpfer oder stechender Schmerz", "Bewegungseinschränkung", "Muskelverspannungen"],
      },
      ctaCopy: "Leiden Sie unter anhaltenden Rückenschmerzen?",
    },
    en: {
      name: "Back pain",
      subtitle: "",
      bodyText:
        "Back pain is one of the most common reasons patients visit the Spine Center at Stiglmaierplatz in Munich. Common causes include too little movement during sedentary work, uneven physical strain, excess weight and poor posture. Psychological stress can also play an important role. Over time, these factors may affect the facet joints, intervertebral discs and surrounding tissue. Muscle tension often develops as a protective response. Around 90 percent of cases can be treated successfully without surgery, for example with physiotherapy, physical treatments, targeted pain management and injections.",
      bullets: {
        region: "Lumbar and thoracic spine",
        frequency: "Very common",
        symptoms: ["Dull or stabbing pain", "Restricted movement", "Muscle tension"],
      },
      ctaCopy: "Are you suffering from persistent back pain?",
    },
  },
  {
    id: "bandscheibenvorfall",
    photo: mrtImg.url,
    treatmentIds: ["infiltration", "mikrochirurgie", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "wirbelkanalverengung", "wirbelgleiten"],
    doctorSlugs: [],
    de: {
      name: "Bandscheibenvorfall",
      subtitle: "Discusprolaps",
      bodyText:
        "Ein Bandscheibenvorfall, medizinisch Discusprolaps genannt, entsteht meist plötzlich und äußert sich in starken Schmerzen im unteren Rücken, die typischerweise in ein Bein oder einen Arm ausstrahlen. Begleitet werden die Schmerzen häufig von Taubheitsgefühlen, Kribbeln oder im schlimmsten Fall von Lähmungserscheinungen. Bei einem Vorfall tritt der weiche Gallertkern der Bandscheibe durch den äußeren Faserring aus und drückt auf benachbarte Nervenwurzeln; häufig betroffen ist die Lendenwirbelsäule, seltener die Halswirbelsäule. Die meisten Bandscheibenvorfälle können ohne Operation erfolgreich behandelt werden, durch Physiotherapie, gezielte Schmerztherapie, Infiltrationen und physikalische Behandlung. Nur bei ausgeprägten neurologischen Ausfällen ist rasches operatives Handeln gefragt.",
      bullets: {
        region: "Lendenwirbelsäule (LWS), seltener HWS",
        frequency: "Häufig",
        symptoms: ["Ausstrahlende Schmerzen in Bein oder Arm", "Taubheitsgefühle", "Kraftverlust (in schweren Fällen)"],
      },
      ctaCopy: "Leiden Sie an einem Bandscheibenvorfall?",
    },
    en: {
      name: "Herniated disc",
      subtitle: "Disc prolapse",
      bodyText:
        "A herniated disc, also known as a disc prolapse, often develops suddenly and can cause severe lower back pain that radiates into a leg or arm. Numbness, tingling and, in severe cases, weakness or paralysis may also occur. A herniation happens when the soft centre of a disc pushes through its outer ring and presses on nearby nerve roots. The lumbar spine is affected most often, followed by the cervical spine. Most herniated discs can be treated without surgery using physiotherapy, targeted pain management, injections and physical treatments. Urgent surgery may be needed if there are significant neurological deficits.",
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
    photo: befundImg.url,
    treatmentIds: ["infiltration", "medikamentoes", "stabilisierung"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "wirbelkanalverengung"],
    doctorSlugs: [],
    de: {
      name: "Bandscheiben-Degeneration",
      subtitle: "Osteochondrose",
      bodyText:
        "Die Bandscheiben-Degeneration, medizinisch als Osteochondrose bezeichnet, ist eine der häufigsten verschleißbedingten Wirbelsäulenerkrankungen. Mit zunehmendem Alter verlieren die Bandscheiben an Flüssigkeit und Elastizität, wodurch ihre Funktion als Stoßdämpfer zwischen den Wirbelkörpern nachlässt; Knorpel und Knochen geraten unter erhöhten Druck. Typisch sind Schmerzen an der Lenden- oder Halswirbelsäule, eingeschränkte Beweglichkeit und Schonhaltung sowie ein tiefsitzender, dumpfer Rückenschmerz, der sich bei Belastung oder längerem Sitzen verschlimmert. In fortgeschrittenen Stadien können gereizte Nerven zu ausstrahlenden Schmerzen in Arme oder Beine führen. Behandelt wird zunächst konservativ mit Injektionen, Physiotherapie und physikalischer Therapie.",
      bullets: {
        region: "Lendenwirbelsäule",
        frequency: "Altersbedingt häufig",
        symptoms: ["Chronische Rückenschmerzen", "Morgendliche Steifheit", "Belastungsschmerz"],
      },
      ctaCopy: "Haben Sie chronische Rückenschmerzen durch Bandscheibendegeneration?",
    },
    en: {
      name: "Degenerative disc disease",
      subtitle: "Osteochondrosis",
      bodyText:
        "Degenerative disc disease, also referred to here as osteochondrosis, is a common age-related spinal condition. Over time, the discs lose fluid and elasticity and become less effective at cushioning the vertebrae, placing greater pressure on the surrounding cartilage and bone. Typical symptoms include pain in the lumbar or cervical spine, restricted movement and a deep, dull ache that worsens with physical strain or prolonged sitting. In more advanced cases, irritated nerves may cause pain that radiates into the arms or legs. Treatment begins conservatively with injections, physiotherapy and physical treatments.",
      bullets: {
        region: "Lumbar spine",
        frequency: "Common, age-related",
        symptoms: ["Chronic back pain", "Morning stiffness", "Pain during physical activity"],
      },
      ctaCopy: "Are chronic back symptoms caused by disc degeneration affecting your daily life?",
    },
  },
  {
    id: "wirbelkoerperfraktur",
    photo: ctImg.url,
    treatmentIds: ["minimalinvasiv", "stabilisierung", "medikamentoes"],
    relatedIds: ["osteoporose", "wirbelkanalverengung", "rueckenschmerzen"],
    doctorSlugs: [],
    de: {
      name: "Wirbelkörperfraktur",
      subtitle: "",
      bodyText:
        "Eine osteoporotische Wirbelkörperfraktur entsteht, wenn die Knochen durch Osteoporose so porös geworden sind, dass bereits alltägliche Belastungen, etwa das Heben einer Tasche oder ein leichter Sturz, zu einem Bruch des Wirbelkörpers führen können. Die Folge sind plötzlich einsetzende, heftige Rückenschmerzen. Am häufigsten betroffen sind die Brust- und Lendenwirbelsäule. Eine Wirbelkörperfraktur lässt sich mittels MRT schnell und präzise diagnostizieren, bei uns direkt im Haus. Je nach Schweregrad wird konservativ mit einem stützenden Mieder und geeigneter Schmerzmedikation behandelt; bei stärkeren oder instabilen Frakturen bietet die Kyphoplastie eine schonende, minimalinvasive Alternative, bei der der Wirbelkörper mit einem Ballon aufgerichtet und mit Knochenzement stabilisiert wird.",
      bullets: {
        region: "Brust- und Lendenwirbelsäule",
        frequency: "Häufig bei Osteoporose",
        symptoms: ["Plötzlicher starker Rückenschmerz", "Abnahme der Körpergröße", "Bewegungseinschränkung"],
      },
      ctaCopy: "Haben Sie eine Wirbelkörperfraktur erlitten?",
    },
    en: {
      name: "Vertebral fracture",
      subtitle: "",
      bodyText:
        "An osteoporotic vertebral fracture can occur when osteoporosis has weakened the bones so much that an everyday strain, such as lifting a bag, or a minor fall is enough to fracture a vertebra. This can cause sudden, severe back pain. The thoracic and lumbar spine are affected most often. MRI, available in our centre, allows us to diagnose the fracture quickly and accurately. Depending on its severity, treatment may involve a supportive brace and appropriate pain medication. For more severe or unstable fractures, kyphoplasty is a minimally invasive option in which the vertebra is elevated with a small balloon and stabilised with bone cement.",
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
    photo: befundungImg.url,
    treatmentIds: ["infiltration", "mikrochirurgie", "minimalinvasiv"],
    relatedIds: ["bandscheibenvorfall", "wirbelgleiten", "facettengelenksarthrose"],
    doctorSlugs: [],
    videoEmbed: {
      src: "https://www.youtube.com/embed/Fg2IMXewbc8",
      title: "Spinalkanalstenose: Verengung des Wirbelkanals erkennen und richtig behandeln",
    },
    de: {
      name: "Wirbelkanalverengung",
      subtitle: "Spinalkanalstenose",
      bodyText:
        "Die Spinalkanalstenose, auch Wirbelkanalverengung genannt, ist eine der häufigsten Wirbelsäulenerkrankungen im höheren Lebensalter. Der Kanal, durch den Rückenmark und Nervenwurzeln verlaufen, verengt sich, meist in der Lendenwirbelsäule. Typisch sind Schmerzen und ein Schwächegefühl in beiden Beinen, besonders beim Gehen oder längeren Stehen: Viele Patienten müssen nach kurzen Gehstrecken stehenbleiben oder sich nach vorne beugen (neurogene Claudicatio). Betroffen sind häufig Patientinnen und Patienten um das 70. Lebensjahr. Konservativ helfen Schmerzmedikation, Physiotherapie, physikalische Therapie und Infiltrationen; reicht das nicht aus, schafft die mikrochirurgische Dekompression den Nervenwurzeln wieder Platz.",
      bullets: {
        region: "Lendenwirbelsäule",
        frequency: "Häufig im höheren Lebensalter, oft um das 70. Lebensjahr",
        symptoms: ["Schmerzen beim Gehen (Claudicatio spinalis)", "Besserung beim Sitzen", "Taubheit in den Beinen"],
      },
      ctaCopy: "Leidet Ihre Gehstrecke unter einer Spinalkanalstenose?",
    },
    en: {
      name: "Spinal Stenosis",
      subtitle: "Spinal canal narrowing",
      bodyText:
        "Spinal stenosis is a narrowing of the spinal canal and is one of the most common spinal conditions in older adults. It usually affects the lumbar spine, reducing the space available for the spinal cord and nerve roots. Typical symptoms include pain and weakness in both legs, especially when walking or standing for longer periods. Many patients need to stop after a short distance or bend forwards for relief (neurogenic claudication). Conservative treatment includes pain medication, physiotherapy, physical treatments and injections. If these are not sufficient, microsurgical decompression can create more space for the affected nerves.",
      bullets: {
        region: "Lumbar spine",
        frequency: "Common in later life, often around the age of 70",
        symptoms: ["Pain when walking (neurogenic claudication)", "Relief on sitting", "Numbness in the legs"],
      },
      ctaCopy: "Is spinal stenosis limiting how far you can walk?",
    },
  },
  {
    id: "wirbelgleiten",
    photo: gespraechImg.url,
    treatmentIds: ["infiltration", "stabilisierung", "physiotherapie"],
    relatedIds: ["bandscheibenvorfall", "wirbelkanalverengung", "rueckenschmerzen"],
    doctorSlugs: [],
    de: {
      name: "Wirbelgleiten",
      subtitle: "Spondylolisthesis",
      bodyText:
        "Das Wirbelgleiten, medizinisch Spondylolisthesis genannt, bezeichnet die Verschiebung eines Wirbelkörpers gegenüber dem darunter liegenden nach vorne oder hinten. Die Erkrankung entwickelt sich in der Regel schleichend über viele Jahre und bleibt oft lange unbemerkt. Sie entsteht häufig durch degenerative Veränderungen, also altersbedingten Verschleiß der Bandscheiben und Wirbelgelenke: Nimmt die muskuläre Stabilität ab, kann der Wirbel zunehmend in eine Fehlstellung geraten. Die Folge sind Schmerzen in Kreuz und Beinen, die sich bei Belastung verschlimmern; in ausgeprägten Fällen kommen Taubheitsgefühle oder Schwäche hinzu. Für die Diagnose sind Röntgen und MRT notwendig. Behandelt wird zunächst konservativ, bei anhaltenden Beschwerden minimalinvasiv stabilisierend.",
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
        "Spondylolisthesis is the forward or backward displacement of one vertebra in relation to the one below it. It usually develops gradually over many years and may initially go unnoticed. It is often caused by age-related changes in the discs and facet joints. As muscular support decreases, the affected vertebra may move further out of position. This can cause lower back and leg pain that worsens with activity; more advanced cases may also cause numbness or weakness. Diagnosis requires X-rays and an MRI scan. Treatment begins conservatively. If symptoms persist, minimally invasive stabilisation may be considered.",
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
    photo: beratungImg.url,
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["rueckenschmerzen", "facettengelenksarthrose", "bandscheibenvorfall"],
    doctorSlugs: [],
    de: {
      name: "Iliosakralsyndrom",
      subtitle: "Kreuzdarmbeingelenk",
      bodyText:
        "Das Iliosakralsyndrom, kurz ISG-Syndrom, ist eine häufig unterschätzte Ursache von Rückenschmerzen. Das Iliosakralgelenk verbindet das Kreuzbein mit dem Darmbein und bildet damit die Verbindung zwischen Wirbelsäule und Becken. Durch Verschleiß, Überlastung oder Blockierungen kann dieses Gelenk erhebliche Schmerzen in der hinteren Beckengegend verursachen, die einem klassischen Hexenschuss täuschend ähnlich sehen. Typisch sind tiefsitzende, einseitige Schmerzen im Bereich von Kreuzbein und Gesäß, die ins Bein ausstrahlen können, etwa beim Aufstehen, Treppensteigen oder bei einseitiger Belastung. Eine diagnostische Infiltration unter Röntgenkontrolle dient gleichzeitig der Diagnose und der ersten Schmerzlinderung.",
      bullets: {
        region: "Iliosakralgelenk (Übergang LWS/Becken)",
        frequency: "Häufig, oft fehldiagnostiziert",
        symptoms: ["Tiefsitzender Kreuzschmerz", "Ausstrahlung in Gesäß und Oberschenkel", "Zunahme beim Sitzen"],
      },
      ctaCopy: "Leiden Sie unter tiefsitzendem Kreuzschmerz?",
    },
    en: {
      name: "Sacroiliac Joint Syndrome",
      subtitle: "SI joint dysfunction",
      bodyText:
        "Sacroiliac joint syndrome (SI joint dysfunction) is an often overlooked cause of back pain. The sacroiliac joint connects the sacrum to the pelvis. Wear, strain or restricted movement in this joint can cause significant pain at the back of the pelvis that may resemble acute lower back pain. Typical symptoms include deep, one-sided pain around the sacrum and buttock, sometimes radiating into the leg. It may be triggered by standing up, climbing stairs or placing weight on one side. An X-ray-guided diagnostic injection can both confirm the source of the pain and provide initial relief.",
      bullets: {
        region: "Sacroiliac joint (junction of the lower spine and pelvis)",
        frequency: "Common, frequently misdiagnosed",
        symptoms: ["Deep sacral pain", "Radiation into buttock and thigh", "Worsened by sitting"],
      },
      ctaCopy: "Are you suffering from deep sacral pain?",
    },
  },
  {
    id: "osteoporose",
    photo: clinic2Img.url,
    treatmentIds: ["minimalinvasiv", "medikamentoes", "stabilisierung"],
    relatedIds: ["wirbelkoerperfraktur", "rueckenschmerzen", "bandscheiben-deg"],
    doctorSlugs: [],
    de: {
      name: "Osteoporose",
      subtitle: "Knochenschwund",
      bodyText:
        "Osteoporose, auch als Knochenschwund bekannt, ist eine weit verbreitete Erkrankung, bei der die Knochendichte abnimmt und die Knochen zunehmend porös und bruchgefährdet werden. An der Wirbelsäule kann Osteoporose zu kleinen Einbrüchen der Wirbelkörper führen, die sich schleichend entwickeln und zunächst oft unbemerkt bleiben. Typische Zeichen sind ein zunehmender Rundrücken, eine spürbare Verringerung der Körpergröße durch das Einsinken der Wirbelkörper sowie chronische Rückenschmerzen, die sich bei Belastung verschlimmern. In akuten Fällen brechen Wirbelkörper bereits bei minimaler Belastung. Mittels MRT lassen sich Wirbelkörpereinbrüche schnell und zuverlässig beurteilen, direkt im Haus.",
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
        "Osteoporosis is a common condition in which bone density decreases, making the bones more fragile and more likely to fracture. In the spine, it can cause gradual compression of the vertebrae that may initially go unnoticed. Signs can include an increasingly rounded upper back, a noticeable loss of height and chronic back pain that worsens with activity. In acute cases, a vertebra may fracture after only minimal strain. MRI, available in our centre, allows us to assess vertebral compression quickly and reliably.",
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
    photo: schmerztherapieImg.url,
    treatmentIds: ["infiltration", "minimalinvasiv", "medikamentoes"],
    relatedIds: ["bandscheiben-deg", "iliosakralsyndrom", "wirbelkanalverengung"],
    doctorSlugs: [],
    de: {
      name: "Facettengelenksarthrose",
      subtitle: "Spondylarthrose",
      bodyText:
        "Die Facettengelenksarthrose, medizinisch Spondylarthrose genannt, ist eine verschleißbedingte Erkrankung der kleinen Wirbelgelenke, die die Wirbelkörper miteinander verbinden. Mit zunehmendem Alter nutzt sich der Knorpel dieser Gelenke ab, was zu Entzündungen, Schmerzen und eingeschränkter Beweglichkeit führt. Patienten beschreiben die Beschwerden häufig als bohrend oder dumpf drückend: Rückenschmerzen im Lendenbereich nach kurzer Belastung oder längerem Sitzen, ausgeprägte Morgensteifigkeit, Schmerzen beim Rückwärtsbeugen sowie Ausstrahlung in Gesäß und Hüfte. Behandelt wird stufenweise, zunächst konservativ, dann mit gezielten Infiltrationen unter Röntgenkontrolle und bei anhaltenden Beschwerden mit einer Radiofrequenzablation (Facettendenervierung).",
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
        "Facet joint arthritis, also called spondyloarthrosis, is an age-related condition affecting the small joints that connect the vertebrae. As the cartilage wears down, inflammation, pain and restricted movement can develop. Patients often describe a deep, dull or aching pain in the lower back after activity or prolonged sitting, with marked morning stiffness, pain when bending backwards and pain that may spread to the buttocks or hip. Treatment follows a step-by-step approach: conservative care first, followed by targeted X-ray-guided injections and, if symptoms persist, radiofrequency ablation (facet denervation).",
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
  infiltration:   { de: "Infiltrationstherapie",       en: "Injection therapy" },
  medikamentoes:  { de: "Medikamentöse Therapie",      en: "Medication" },
  physiotherapie: { de: "Physiotherapie",              en: "Physiotherapy" },
  minimalinvasiv: { de: "Minimalinvasive Verfahren",   en: "Minimally invasive procedures" },
  mikrochirurgie: { de: "Mikrochirurgische Verfahren", en: "Microsurgical procedures" },
  stabilisierung: { de: "Stabilisierende Verfahren",   en: "Stabilisation procedures" },
};
