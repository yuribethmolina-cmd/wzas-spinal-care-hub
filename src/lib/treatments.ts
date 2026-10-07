export type TreatmentBullets = {
  technique: string;
  effort: string;
  anaesthesia: string;
};

export type TreatmentSection = {
  heading: string;
  body: string;
};

export type TreatmentContent = {
  name: string;
  tagline: string;
  intro: string;
  sections: TreatmentSection[];
  bullets: TreatmentBullets;
  ctaCopy: string;
};

export type Treatment = {
  id: string;
  categoryId: "ohne-operation" | "interventionell" | "chirurgie";
  photo: string;
  relatedIds: string[];
  de: TreatmentContent;
  en: TreatmentContent;
};

export const TREATMENTS: Treatment[] = [
  {
    id: "infiltrationstherapie",
    categoryId: "interventionell",
    photo: "/treatment-ct-injection.webp",
    relatedIds: ["hitzesonden-behandlung", "schmerzpumpen-idd"],
    de: {
      name: "Infiltrationstherapie",
      tagline: "Bildgestützte Schmerztherapie ohne Operation",
      intro:
        "Bei der Infiltrationstherapie werden entzündungshemmende Wirkstoffe — meist Kortison in Kombination mit einem Lokalanästhetikum — unter Röntgen- oder CT-Kontrolle gezielt an die Schmerzquelle gespritzt. Diese bildgestützte Präzision unterscheidet uns von einer einfachen Spritze: Das Medikament gelangt genau dorthin, wo der Schmerz entsteht.",
      sections: [
        {
          heading: "Wann ist eine Infiltration sinnvoll?",
          body: "Infiltrationen helfen vor allem bei Ischiasbeschwerden, Bandscheibenvorfällen und Wirbelgelenksreizungen. Kribbeln und Taubheitsgefühle im Arm oder Bein, Nacken- und Rückenschmerzen, die in die Extremitäten ausstrahlen — das sind die klassischen Indikationen für eine periradikuläre Therapie (PRT).",
        },
        {
          heading: "Wie läuft die Behandlung ab?",
          body: "Der Eingriff ist ambulant und dauert nur wenige Minuten. Unter Röntgen- oder CT-Kontrolle führt der Spezialist eine feine Nadel präzise an die gereizte Nervenwurzel oder den entzündeten Bereich. Das Medikament wird injiziert, danach ruhen Sie kurz im Wartezimmer. Die meisten Patienten tolerieren den Eingriff gut; eine leichte Druckempfindlichkeit in den nächsten Tagen ist normal.",
        },
      ],
      bullets: {
        technique: "Röntgen- oder CT-gesteuert",
        effort: "Ambulant, ca. 15–30 Minuten",
        anaesthesia: "Lokalbetäubung",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Injection Therapy",
      tagline: "Image-guided pain treatment without surgery",
      intro:
        "Injection therapy (infiltration) delivers anti-inflammatory agents — usually corticosteroid combined with local anaesthetic — directly to the source of pain under X-ray or CT guidance. This image-guided precision sets it apart from a simple injection: the medication reaches exactly where the pain originates.",
      sections: [
        {
          heading: "When is injection therapy indicated?",
          body: "Injections are most effective for sciatica, herniated discs, and facet joint irritation. Tingling and numbness in the arm or leg, and neck or back pain radiating into the extremities are classic indications for periradicular therapy (PRT).",
        },
        {
          heading: "How does the procedure work?",
          body: "The procedure is outpatient and takes only a few minutes. Under X-ray or CT guidance, the specialist advances a fine needle precisely to the irritated nerve root or inflamed area. The medication is injected, and you rest briefly in the waiting room. Most patients tolerate the procedure well; mild tenderness over the following days is normal.",
        },
      ],
      bullets: {
        technique: "X-ray or CT guided",
        effort: "Outpatient, approx. 15–30 min",
        anaesthesia: "Local anaesthetic",
      },
      ctaCopy: "Book an appointment",
    },
  },
  {
    id: "hitzesonden-behandlung",
    categoryId: "interventionell",
    photo: "/treatment-minimalinvasiv.webp",
    relatedIds: ["infiltrationstherapie", "schmerz-schrittmacher-scs"],
    de: {
      name: "Hitzesonden-Behandlung",
      tagline: "Thermodenervation der Wirbelgelenke",
      intro:
        "Bei der Hitzesonden-Behandlung (Thermodenervation oder Radiofrequenz-Denervation) wird eine dünne Sonde unter Bildkontrolle an die kleinen Nerven der Wirbelgelenke geführt und erhitzt diese gezielt auf etwa 70 °C. Die Wärme unterbricht die Schmerzleitung dauerhaft — ohne die Stütz- oder Bewegungsfunktion zu beeinträchtigen.",
      sections: [
        {
          heading: "Wer profitiert von diesem Verfahren?",
          body: "Das Verfahren ist besonders wirksam bei Facettengelenksarthrose — einem der häufigsten Gründe für chronische Rückenschmerzen im mittleren und höheren Lebensalter. Voraussetzung ist ein positiver Infiltrationstest: Erst wenn eine Probeinjektion den Schmerz deutlich reduziert, ist die Thermodenervation indiziert.",
        },
        {
          heading: "Wie läuft die Behandlung ab?",
          body: "Der Eingriff ist ambulant und findet unter Lokalanästhesie statt. Unter Röntgenkontrolle positioniert der Spezialist die feine Sonde präzise an den Nerven des betroffenen Wirbelgelenks. Die Denervation dauert nur wenige Minuten pro Segment; nach einer kurzen Ruhephase können Sie nach Hause. Eine deutliche Linderung tritt oft erst nach einigen Tagen bis Wochen ein, wenn der behandelte Bereich abgeheilt ist.",
        },
      ],
      bullets: {
        technique: "Röntgengesteuert",
        effort: "Ambulant, ca. 30–60 Minuten",
        anaesthesia: "Lokalbetäubung",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Heat Probe Treatment",
      tagline: "Facet joint thermodenervation",
      intro:
        "Heat probe treatment (thermodenervation or radiofrequency denervation) guides a thin probe to the small nerves of the facet joints under image control and heats them to approximately 70 °C. The heat permanently interrupts pain conduction — without affecting the joint's supporting or movement function.",
      sections: [
        {
          heading: "Who benefits from this procedure?",
          body: "This procedure is particularly effective for facet joint arthritis — one of the most common causes of chronic back pain in middle and later life. A successful test injection is required first: only when a trial infiltration significantly reduces pain is thermodenervation indicated.",
        },
        {
          heading: "How does the procedure work?",
          body: "The procedure is outpatient and performed under local anaesthesia. Under X-ray guidance, the specialist positions the fine probe precisely at the nerve of the affected facet joint. Denervation takes only a few minutes per segment; after a short rest period you can go home. Significant relief often emerges only after a few days to weeks, once the treated area has healed.",
        },
      ],
      bullets: {
        technique: "X-ray guided",
        effort: "Outpatient, approx. 30–60 min",
        anaesthesia: "Local anaesthetic",
      },
      ctaCopy: "Book an appointment",
    },
  },
  {
    id: "schmerzpumpen-idd",
    categoryId: "interventionell",
    photo: "/treatment-minimalinvasiv.webp",
    relatedIds: ["schmerz-schrittmacher-scs", "infiltrationstherapie"],
    de: {
      name: "Schmerzpumpen (IDD)",
      tagline: "Kontinuierliche Schmerztherapie direkt am Rückenmark",
      intro:
        "Die Intrathecale Drug Delivery (IDD) ist ein kleines Implantat, das kontinuierlich Schmerzmittel direkt in den Liquorraum rund um das Rückenmark abgibt. Durch diesen direkten Zugang reichen sehr geringe Medikamentendosen aus — das minimiert systemische Nebenwirkungen und erhöht die Wirksamkeit erheblich.",
      sections: [
        {
          heading: "Für wen ist eine Schmerzpumpe geeignet?",
          body: "IDD-Systeme kommen zum Einsatz, wenn konservative Therapien und minimalinvasive Verfahren die Schmerzen nicht ausreichend kontrollieren — etwa bei schweren chronischen Rückenschmerzen, Krebsschmerzen oder therapieresistenten Spastiken. Ein Testversuch mit einem externen Katheter geht der Implantation immer voraus.",
        },
        {
          heading: "Wie läuft die Implantation ab?",
          body: "Der Eingriff dauert etwa eine Stunde und wird in Vollnarkose durchgeführt. Das Reservoir (Pumpenkörper) wird seitlich am Unterbauch unter der Haut implantiert, ein dünner Katheter führt zum Rückenmarkraum. Die Pumpe kann von außen per Tablet neu programmiert werden; regelmäßige Nachfülltermine alle 1–6 Monate sind erforderlich.",
        },
      ],
      bullets: {
        technique: "Intrathekale Abgabe (direkt im Liquorraum)",
        effort: "Stationär, ca. 1 Stunde",
        anaesthesia: "Vollnarkose",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Pain Pumps (IDD)",
      tagline: "Continuous pain relief delivered directly to the spinal cord",
      intro:
        "Intrathecal Drug Delivery (IDD) is a small implant that continuously delivers pain medication directly into the fluid space surrounding the spinal cord. Because medication reaches its target directly, very small doses suffice — minimising systemic side effects and significantly improving efficacy.",
      sections: [
        {
          heading: "Who is a candidate for a pain pump?",
          body: "IDD systems are considered when conservative therapies and minimally invasive procedures cannot adequately control pain — for example in severe chronic back pain, cancer pain, or treatment-resistant spasticity. A trial with an external catheter always precedes implantation.",
        },
        {
          heading: "How does implantation work?",
          body: "The procedure takes approximately one hour and is performed under general anaesthesia. The reservoir (pump body) is implanted subcutaneously at the side of the lower abdomen; a thin catheter leads to the spinal space. The pump can be reprogrammed externally via tablet; regular refill appointments every 1–6 months are required.",
        },
      ],
      bullets: {
        technique: "Intrathecal (directly in CSF space)",
        effort: "Inpatient, approx. 1 hour",
        anaesthesia: "General anaesthetic",
      },
      ctaCopy: "Book an appointment",
    },
  },
  {
    id: "schmerz-schrittmacher-scs",
    categoryId: "interventionell",
    photo: "/treatment-minimalinvasiv.webp",
    relatedIds: ["schmerzpumpen-idd", "hitzesonden-behandlung"],
    de: {
      name: "Schmerz-Schrittmacher (SCS)",
      tagline: "Elektrische Impulse statt Schmerzsignale",
      intro:
        "Beim Schmerz-Schrittmacher (Spinal Cord Stimulation, SCS) werden schwache elektrische Impulse ans Rückenmark abgegeben, die die Weiterleitung der Schmerzreize zum Gehirn modulieren. Klinische Studien belegen Schmerzreduktionen von bis zu 80 % — ein deutlicher Fortschritt für Patienten, bei denen andere Verfahren nicht angeschlagen haben.",
      sections: [
        {
          heading: "Wann ist SCS sinnvoll?",
          body: "SCS hat sich vor allem bei chronischen Nervenschmerzen bewährt: Failed Back Surgery Syndrome (FBSS), CRPS, diabetische Neuropathie, chronische Ischias. Entscheidend ist eine sorgfältige Patientenauswahl — psychologische und medizinische Evaluation sowie eine 4–6-wöchige Testphase mit externem Stimulator gehen der permanenten Implantation voraus.",
        },
        {
          heading: "Wie läuft die Implantation ab?",
          body: "Zunächst werden dünne Elektroden perkutan (durch die Haut) im Epiduralraum der Wirbelsäule platziert und mit einem externen Gerät verbunden. Zeigt die Testphase eine zufriedenstellende Schmerzlinderung, wird der Generator dauerhaft unter der Haut am Rücken oder im Gesäßbereich implantiert. Der Eingriff ist in Lokalanästhesie oder leichter Sedierung möglich.",
        },
      ],
      bullets: {
        technique: "Perkutane Elektrodenplatzierung",
        effort: "Testphase 4–6 Wochen; Implantation ambulant/stationär",
        anaesthesia: "Lokal oder Sedierung",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Spinal Cord Stimulation (SCS)",
      tagline: "Electrical impulses instead of pain signals",
      intro:
        "Spinal Cord Stimulation (SCS) delivers mild electrical impulses to the spinal cord that modulate pain signal transmission to the brain. Clinical studies document pain reductions of up to 80 % — a significant advance for patients in whom other treatments have failed.",
      sections: [
        {
          heading: "When is SCS indicated?",
          body: "SCS is most effective for chronic nerve pain: Failed Back Surgery Syndrome (FBSS), CRPS, diabetic neuropathy, chronic sciatica. Careful patient selection is essential — psychological and medical evaluation, plus a 4–6 week trial with an external stimulator, precede permanent implantation.",
        },
        {
          heading: "How does implantation work?",
          body: "First, thin electrodes are placed percutaneously in the epidural space of the spine and connected to an external device. If the trial phase achieves satisfactory pain relief, the generator is permanently implanted subcutaneously at the back or buttock area. The procedure can be performed under local anaesthesia or light sedation.",
        },
      ],
      bullets: {
        technique: "Percutaneous electrode placement",
        effort: "Trial 4–6 weeks; implantation outpatient / short stay",
        anaesthesia: "Local or sedation",
      },
      ctaCopy: "Book an appointment",
    },
  },
  {
    id: "mikrochirurgische-verfahren",
    categoryId: "chirurgie",
    photo: "/wolfart-klinik.jpg",
    relatedIds: ["bewegungserhaltende-verfahren", "stabilisierende-verfahren"],
    de: {
      name: "Mikrochirurgische Verfahren",
      tagline: "Präzision unter dem Operationsmikroskop",
      intro:
        "Mikrochirurgische Operationen an der Wirbelsäule nutzen ein hochauflösendes Operationsmikroskop und feinste Instrumente. Die vergrößerte Darstellung erlaubt kleinste Schnitte, schonende Gewebepräparation und eine exakte Sicht auf Nervenwurzeln und Bandscheibengewebe — der Standard in der modernen Wirbelsäulenchirurgie.",
      sections: [
        {
          heading: "Typische Eingriffe",
          body: "Zu den häufigsten mikrochirurgischen Eingriffen gehören die Bandscheibenoperation (Mikrodiskektomie) bei Bandscheibenvorfällen sowie die Dekompression bei Spinalkanalstenosen. Der Eingriff dauert meist 1–2 Stunden; viele Patienten sind wenige Stunden nach der OP gehfähig und können die Klinik nach 1–2 Tagen verlassen.",
        },
        {
          heading: "Rehabilitation",
          body: "Die Rehabilitation beginnt in der Regel bereits am Tag nach dem Eingriff. Leichte körperliche Aktivitäten sind nach wenigen Tagen möglich. Sport und schwere körperliche Arbeit sind nach einigen Wochen wieder erlaubt; begleitende Physiotherapie stärkt die Rückenmuskulatur für die Zukunft.",
        },
      ],
      bullets: {
        technique: "Operationsmikroskop + Mikroinstrumente",
        effort: "Stationär 1–3 Tage",
        anaesthesia: "Vollnarkose",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Microsurgical Procedures",
      tagline: "Precision under the operating microscope",
      intro:
        "Microsurgical spinal surgery uses a high-resolution operating microscope and finest instruments. The magnified view allows the smallest incisions, gentle tissue dissection, and a precise view of nerve roots and disc tissue — the standard in modern spinal surgery.",
      sections: [
        {
          heading: "Typical procedures",
          body: "The most common microsurgical procedures include disc surgery (microdiscectomy) for herniated discs and decompression for spinal canal stenosis. Most operations take 1–2 hours; many patients are able to walk a few hours after surgery and can leave the clinic after 1–2 days.",
        },
        {
          heading: "Rehabilitation",
          body: "Rehabilitation typically begins the day after surgery. Light physical activities are possible within a few days. Sport and heavy physical work are permitted after several weeks; accompanying physiotherapy strengthens the back muscles for the long term.",
        },
      ],
      bullets: {
        technique: "Operating microscope + micro-instruments",
        effort: "Inpatient 1–3 days",
        anaesthesia: "General anaesthetic",
      },
      ctaCopy: "Book an appointment",
    },
  },
  {
    id: "bewegungserhaltende-verfahren",
    categoryId: "chirurgie",
    photo: "/wolfart-klinik.jpg",
    relatedIds: ["mikrochirurgische-verfahren", "stabilisierende-verfahren"],
    de: {
      name: "Bewegungserhaltende Verfahren",
      tagline: "Alternative zur Versteifung",
      intro:
        "Bewegungserhaltende Verfahren sind chirurgische Alternativen zur Spondylodese (Wirbelsäulenversteifung). Statt erkrankte Segmente dauerhaft zu fixieren, ersetzen oder stabilisieren Bandscheibenprothesen und dynamische Systeme das geschädigte Gewebe und erlauben Bewegung im operierten Bereich.",
      sections: [
        {
          heading: "Bandscheibenprothesen",
          body: "Bandscheibenprothesen ersetzen eine stark verschlissene Bandscheibe durch ein künstliches Implantat aus Metall und hochvernetztem Polyethylen. Im Gegensatz zur Versteifung bleibt die natürliche Beweglichkeit der Wirbelsäule erhalten, Anschlusssegmente werden geschont. Voraussetzung sind ein erhaltener knöcherner Wirbelkörper und keine schwere Osteoporose.",
        },
        {
          heading: "Dynamische Stabilisierungssysteme",
          body: "Dynamische Systeme ersetzen die starren Schrauben-Stab-Systeme einer Spondylodese durch flexible Implantate, die eine begrenzte, kontrollierte Bewegung erlauben. Sie eignen sich besonders bei degenerativen Veränderungen ohne ausgeprägte Instabilität und sind in ausgewählten Fällen als Übergangslösung geeignet.",
        },
      ],
      bullets: {
        technique: "Prothesenimplantation oder dynamische Stabilisierung",
        effort: "Stationär 2–5 Tage",
        anaesthesia: "Vollnarkose",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Motion-Preserving Procedures",
      tagline: "Alternative to spinal fusion",
      intro:
        "Motion-preserving procedures are surgical alternatives to spondylodesis (spinal fusion). Instead of permanently fixing affected segments, disc prostheses and dynamic systems replace or stabilise the damaged tissue while allowing movement in the operated area.",
      sections: [
        {
          heading: "Disc Prostheses",
          body: "Disc prostheses replace a severely worn disc with an artificial implant made of metal and highly cross-linked polyethylene. Unlike fusion, the spine's natural mobility is maintained and adjacent segments are spared. Prerequisites include an intact vertebral body and the absence of severe osteoporosis.",
        },
        {
          heading: "Dynamic Stabilisation Systems",
          body: "Dynamic systems replace the rigid screw-rod constructs of fusion with flexible implants that allow limited, controlled movement. They are particularly suited to degenerative changes without pronounced instability and can serve as a transitional solution in selected cases.",
        },
      ],
      bullets: {
        technique: "Prosthesis implantation or dynamic stabilisation",
        effort: "Inpatient 2–5 days",
        anaesthesia: "General anaesthetic",
      },
      ctaCopy: "Book an appointment",
    },
  },
  {
    id: "stabilisierende-verfahren",
    categoryId: "chirurgie",
    photo: "/wolfart-klinik.jpg",
    relatedIds: ["bewegungserhaltende-verfahren", "mikrochirurgische-verfahren"],
    de: {
      name: "Stabilisierende Verfahren",
      tagline: "Wenn Instabilität die Ursache ist",
      intro:
        "Stabilisierende Verfahren fixieren erkrankte Wirbelsäulensegmente dauerhaft und beseitigen damit die Instabilität als Schmerzursache. Dazu gehören Spondylodese und Cage-Fusion, Kyphoplastie und Vertebroplastie bei Wirbelkörperfrakturen sowie die ISG-Fusion bei chronischem Iliosakralsyndrom.",
      sections: [
        {
          heading: "Spondylodese und Cage-Fusion",
          body: "Bei der Spondylodese werden zwei oder mehr Wirbelkörper durch Schrauben, Stäbe und Cages dauerhaft verbunden. Das Knochengewebe wächst zusammen; die Stabilisierung ist dauerhaft. Typische Indikationen sind Wirbelgleiten (Spondylolisthesis), schwere Instabilitäten und ausgeprägte degenerative Veränderungen mit neurologischen Ausfällen.",
        },
        {
          heading: "Kyphoplastie und Vertebroplastie",
          body: "Bei Wirbelkörperfrakturen — meist durch Osteoporose — können Kyphoplastie und Vertebroplastie den Wirbelkörper stabilisieren. Bei der Kyphoplastie richtet ein Ballon die Fraktur auf; der entstandene Hohlraum wird mit Knochenzement gefüllt. Diese minimalinvasiven Verfahren ermöglichen rasche Schmerzlinderung und frühe Mobilisierung.",
        },
        {
          heading: "ISG-Fusion",
          body: "Das Iliosakralgelenk verbindet das Kreuzbein mit dem Beckenknochen und kann bei Arthrose oder Hypermobilität starke Schmerzen verursachen. Eine minimalinvasive ISG-Fusion mit kleinen Titanimplantaten stabilisiert das Gelenk dauerhaft — mit kurzem stationärem Aufenthalt und rascher Wiederherstellung der Mobilität.",
        },
      ],
      bullets: {
        technique: "Verschraubung / Knochenzement / Titanimplantate",
        effort: "Stationär 2–5 Tage",
        anaesthesia: "Vollnarkose (teils Lokal bei Kyph./Vertebro.)",
      },
      ctaCopy: "Termin vereinbaren",
    },
    en: {
      name: "Stabilisation Procedures",
      tagline: "When instability is the root cause",
      intro:
        "Stabilisation procedures permanently fix affected spinal segments, eliminating instability as the source of pain. This includes spondylodesis and cage fusion, kyphoplasty and vertebroplasty for vertebral fractures, and SI joint fusion for chronic sacroiliac syndrome.",
      sections: [
        {
          heading: "Spondylodesis and Cage Fusion",
          body: "Spondylodesis permanently connects two or more vertebral bodies using screws, rods, and cages. Bone tissue fuses; the stabilisation is permanent. Typical indications include spondylolisthesis, severe instability, and pronounced degenerative changes with neurological deficits.",
        },
        {
          heading: "Kyphoplasty and Vertebroplasty",
          body: "For vertebral fractures — usually caused by osteoporosis — kyphoplasty and vertebroplasty can stabilise the vertebral body. In kyphoplasty, a balloon restores the fracture's height; the cavity is then filled with bone cement. These minimally invasive procedures enable rapid pain relief and early mobilisation.",
        },
        {
          heading: "SI Joint Fusion",
          body: "The sacroiliac (SI) joint connects the sacrum to the pelvic bone and can cause severe pain in arthritis or hypermobility. A minimally invasive SI joint fusion with small titanium implants permanently stabilises the joint — with a short inpatient stay and rapid restoration of mobility.",
        },
      ],
      bullets: {
        technique: "Screw fixation / bone cement / titanium implants",
        effort: "Inpatient 2–5 days",
        anaesthesia: "General (local/sedation for kyphoplasty/vertebroplasty)",
      },
      ctaCopy: "Book an appointment",
    },
  },
];

export function getTreatment(id: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.id === id);
}

export function getTreatmentContent(
  treatment: Treatment,
  lang: "de" | "en"
): TreatmentContent {
  return lang === "en" ? treatment.en : treatment.de;
}

export const CATEGORY_LABELS: Record<
  string,
  { de: string; en: string }
> = {
  "ohne-operation": { de: "Medikamentöse Therapie", en: "Medical / Non-surgical Therapy" },
  "interventionell": { de: "Interventionelle Verfahren", en: "Interventional Procedures" },
  "chirurgie": { de: "Wirbelsäulenchirurgie", en: "Spinal Surgery" },
};
