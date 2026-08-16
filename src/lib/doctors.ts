import drMedele from "@/assets/wzas/dr-medele.webp.asset.json";
import drStaender from "@/assets/wzas/dr-staender.webp.asset.json";
import drEroes from "@/assets/wzas/dr-eroes.webp.asset.json";
import drDonat from "@/assets/wzas/dr-donat.webp.asset.json";
import drHo from "@/assets/wzas/dr-ho.jpg.asset.json";
import drScherg from "@/assets/wzas/dr-scherg.webp.asset.json";
import rodriguez from "@/assets/wzas/rodriguez.webp.asset.json";
import drPetersen from "@/assets/wzas/dr-petersen.webp.asset.json";
import drDemmel from "@/assets/wzas/dr-demmel.webp.asset.json";
import drGrosse from "@/assets/wzas/dr-grosse.webp.asset.json";
import drLukas from "@/assets/wzas/dr-lukas.jpg.asset.json";

export type Specialty =
  | "Neurochirurgie"
  | "Wirbelsäulenchirurgie"
  | "Orthopädie"
  | "Radiologie"
  | "Handchirurgie"
  | "Schmerztherapie";

export type Availability = "Diese Woche" | "Nächste Woche" | "In 2+ Wochen";

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  role: string;
  specialties: Specialty[];
  availability: Availability;
  nextSlot: string;
  languages: string[];
  photo: string | null;
  initials: string;
  focus: string[];
  bio: string[];
  education: string[];
  memberships?: string[];
}

export const doctors: Doctor[] = [
  {
    slug: "ralph-medele",
    name: "Dr. med. Ralph Medele",
    title: "Ärztlicher Leiter",
    role: "Neurochirurg · Gründer & Leiter",
    specialties: ["Neurochirurgie", "Wirbelsäulenchirurgie"],
    availability: "Nächste Woche",
    nextSlot: "Di, 10:30",
    languages: ["Deutsch", "Englisch", "Spanisch"],
    photo: drMedele.url,
    initials: "RM",
    focus: ["Minimalinvasive Wirbelsäulenchirurgie", "Bandscheibenvorfälle", "Wirbelkanalstenose", "Vaskuläre & spinale Neurochirurgie"],
    bio: [
      "Dr. med. Ralph Medele ist als langjährig universitär ausgebildeter und erfahrener Neurochirurg Gründer und Leiter unseres Zentrums.",
      "Nach seinem Medizinstudium an der Ludwig-Maximilians-Universität München und einem Auslandsaufenthalt an der Universidad Nacional Autónoma de México in Mexico City durchlief er eine umfassende neurochirurgische Facharztausbildung bei Prof. Dr. med. Reulen am Münchner Universitätsklinikum Großhadern.",
      "Während der Zeit als wissenschaftlicher Mitarbeiter der Universität beschäftigte sich Dr. Medele neben seiner klinischen Tätigkeit in der Forschung überwiegend mit Fragestellungen aus dem Bereich der vaskulären und spinalen Neurochirurgie.",
      "Von Großhadern wurde er zum leitenden Oberarzt der Neurochirurgischen Abteilung am Krankenhaus der Barmherzigen Brüder in Regensburg berufen.",
      "Durch zahlreiche Fortbildungen im In- und Ausland erweiterte er seine Expertise kontinuierlich und arbeitete an der Entwicklung neuer, minimal-invasiver Operationstechniken. In enger Zusammenarbeit mit orthopädischen Fachärzten eignete sich Dr. med. Ralph Medele auch ein breites Spektrum an nicht-operativen Behandlungsverfahren an. Sein Motto lautet: „Wer neue Heilmittel scheut, muss alte Übel dulden“ (Francis Bacon, englischer Philosoph, 1561 – 1626).",
      "Seit 2004 arbeitet Dr. Medele als Wirbelsäulenspezialist wieder in München. 2006 gründete er mit Dr. Ständer das Wirbelsäulenzentrum am Stiglmaierplatz.",
      "Der geborene Oberbayer wuchs am Staffelsee auf und verbringt privat als stolzer Vater eines Sohnes seine Freizeit natürlich am liebsten mit der Familie. Außerdem geht er immer noch gerne seiner seit Jugendtagen geliebten Leidenschaft, dem Motorradfahren nach – auf der Straße und im Gelände.",
    ],
    education: [
      "Medizinstudium LMU München",
      "Facharztausbildung Klinikum Großhadern",
      "Chefarzt Hospital Barmherzige Brüder Regensburg",
    ],
  },
  {
    slug: "marko-staender",
    name: "Dr. med. Marko Ständer",
    title: "Stellvertretender Ärztlicher Leiter",
    role: "Neurochirurg · Wirbelsäulenchirurgie",
    specialties: ["Neurochirurgie", "Wirbelsäulenchirurgie"],
    availability: "Diese Woche",
    nextSlot: "Do, 14:15",
    languages: ["Deutsch", "Englisch"],
    photo: drStaender.url,
    initials: "MS",
    focus: ["Interventionelle Kryotherapie der Facettengelenke", "Wirbelsäulenchirurgie", "Bandscheibenerkrankungen", "Rückenschmerz"],
    bio: [
      "Dr. Marko Ständer gründete 2006 zusammen mit Dr. Medele das Wirbelsäulenzentrum am Stiglmaierplatz.",
      "Seit Jahren beschäftigt er sich klinisch und wissenschaftlich mit innovativen Behandlungsverfahren rund um das „Volksleiden Rückenschmerz“ und perfektionierte zusammen mit Prof. Dr. Steude ein Verfahren zur interventionellen Kryotherapie der Facettengelenke der Wirbelsäule.",
      "Auch er wurde in der hervorragenden neurochirurgischen Schule der Ludwig-Maximilians-Universität München am Standort Großhadern zum Facharzt für Neurochirurgie ausgebildet. Schon während seines Studiums an den renommierten Medizinischen Fakultäten der Ludwig-Maximilians-Universität München, der Eberhard-Karls-Universität Tübingen und der Medizinischen Akademie Magdeburg erweiterte er seine Ausbildung durch ein zusätzliches Auslandsstudium an der Tulane University in New Orleans, USA und zwei Praxissemester in Peru und Ecuador.",
      "Er promovierte im Neuroonkologischen Labor der Neurologischen Universitätsklinik Tübingen zum Thema „Dekorin Gentransfer: Ein neuer Ansatz der Immuntherapie maligner Gliome“.",
      "Geboren wurde Dr. Ständer im brandenburgischen Perleberg. Er wuchs in der Magdeburger Börde auf. Seine Freizeit verbringt er als ausgebildeter Berg- und Expeditionsmediziner am liebsten auf den Gipfeln dieser Welt.",
    ],
    education: [
      "Studium LMU München, Universität Tübingen, Medizinische Akademie Magdeburg",
      "Facharztausbildung Neurochirurgie, LMU Klinikum Großhadern",
      "Auslandsstudium Tulane University, New Orleans (USA)",
    ],
  },
  {
    slug: "christian-eroes",
    name: "Dr. med. Christian Erös",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie", "Wirbelsäulenchirurgie"],
    availability: "Diese Woche",
    nextSlot: "Fr, 09:00",
    languages: ["Deutsch", "Englisch"],
    photo: drEroes.url,
    initials: "CE",
    focus: ["Zervikale Wirbelsäule", "Mikrochirurgische Eingriffe", "Schmerztherapie", "Bandscheibenprothesen"],
    bio: [
      "Dr. Erös wurde 1976 in München geboren und wuchs auch dort auf.",
      "An der Ludwig-Maximilians-Universität in München absolvierte er sein Studium, das er mit einem mehrmonatigen Aufenthalt in der Unfallchirurgie und Neurochirurgie am MCG in Augusta, Georgia, USA ergänzte.",
      "Seine Ausbildung zum Neurochirurg erhielt er an der renommierten Neurochirurgischen Klinik der Ludwig-Maximilians-Universität am Klinikum Großhadern. Im Jahr 2011 schloss er diese mit dem Facharzt für Neurochirurgie ab.",
      "Zum Januar 2013 wechselte er in das Wirbelsäulenzentrum am Stiglmaierplatz, um unser Ärzteteam weiter zu verstärken.",
      "Neben seiner medizinischen Kompetenz ist er technisch sehr versiert und interessiert. Dieses Wissen bringt er ein, um unsere moderne IT zum Wohle unserer Patienten noch weiter zu verbessern.",
      "Soweit es sein berufliches Engagement zulässt, betätigt sich Dr. Erös gerne sportlich.",
    ],
    education: [
      "Facharztausbildung Neurochirurgie",
      "Fellowship komplexe Wirbelsäulenchirurgie",
    ],
  },
  {
    slug: "markus-donat",
    name: "Dr. med. Markus Donat",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie"],
    availability: "Nächste Woche",
    nextSlot: "Mo, 11:00",
    languages: ["Deutsch", "Englisch"],
    photo: drDonat.url,
    initials: "MD",
    focus: ["Lumbale Wirbelsäule", "Periphere Nervenchirurgie", "Schmerztherapie"],
    bio: [
      "Markus Donat ist Neurochirurg aus Österreich. Das Studium absolvierte er an der Medizinischen Universität Wien. Bereits hier war er intensiv wissenschaftlich tätig und an der Entwicklung dreidimensionaler Rekonstruktions- und Navigationsmethoden maßgeblich beteiligt.",
      "Zum Facharzt ausgebildet wurde er an der Neurochirurgischen Universitätsklinik Wien.",
      "Am Akademischen Landeskrankenhaus Feldkirch schloss er die Ausbildung ab und war dort zuletzt als leitender Oberarzt tätig.",
      "Anschließend wandte er sich als stellvertretender Leiter einer Tiroler Spezialklinik für Bandscheibenchirurgie vor allem endoskopische Operationsmethoden an der Wirbelsäule an.",
      "Durch zahlreiche Weiterbildungen und Aufenthalte im In- und Ausland umfasst sein Spektrum zahlreiche minimal invasive und mikrochirurgische als auch nicht-operative Verfahren an der Wirbelsäule.",
      "Seit 2013 ist er in München tätig.",
      "Dr. Donat ist Vater von 2 Kindern und begeisterter Wassersportler. Auch bei stärkstem Wind ist er mit Segelboot oder windsurfend unterwegs. Im Winter verbringt er seine Freizeit gerne auf Skiern in den Skigebieten der alten Heimat oder in Südtirol.",
    ],
    education: ["Facharztausbildung Neurochirurgie"],
  },
  {
    slug: "wing-mann-ho",
    name: "Dr. med. Wing Mann Ho",
    title: "Fachärztin für Neurochirurgie",
    role: "Neurochirurgin",
    specialties: ["Neurochirurgie"],
    availability: "Diese Woche",
    nextSlot: "Mi, 15:45",
    languages: ["Deutsch", "Englisch"],
    photo: drHo.url,
    initials: "WH",
    focus: ["Lumbale Erkrankungen", "Nervenwurzelkompression", "Konservative Therapie"],
    bio: [
      "Dr. med. univ. Wing Mann Ho, Ph.D. ist langjährig ausgebildete und erfahrene Neurochirurgin.",
      "Umfangreiche wissenschaftlichen Leistungen mit einem PhD Abschluss sowie Vorträge auf internationalen Fachkongressen sowie Fachzeitschriftenpublikationen und Buchkapitelbeiträgen zeigen ihr breites Fachwissen.",
      "Ihre Ausbildung umfasste einen Forschungsaufenthalt in den USA sowie eine umfassende neurochirurgische Ausbildung am international bekannten Zentrum, der Universitätsklinik Innsbruck, einem Maximalversorger und Wirbelsäulenzentrum unter der Leitung von Prof. Claudius Thomé.",
      "Als leitende Oberärztin der neurochirurgischen Intensivstation konnte sie auf umfangreiche Erfahrungen in der Betreuung und Behandlung von schwerkranken Patienten mit neurochirurgischen Erkrankungen sammeln. Zusätzlich hat Frau Dr. Ho vertiefende Ausbildungen mit diversen Diplomen und Zertifikaten absolviert (unter anderem für Schmerztherapie und Notfallmedizin).",
      "Frau Dr. Ho ist eine sehr erfahrene Wirbelsäulenchirurgin und von der Deutschen Wirbelsäulengesellschaft zertifiziert.",
      "Abseits der ärztlichen Tätigkeit liegt Frau Dr. Ho vor allem ihre Familie und der Wintersport am Herzen.",
    ],
    education: ["Facharztausbildung Neurochirurgie"],
  },
  {
    slug: "florian-scherg",
    name: "Dr. med. Florian Scherg",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie", "Wirbelsäulenchirurgie"],
    availability: "In 2+ Wochen",
    nextSlot: "Mo, 08:30",
    languages: ["Deutsch", "Englisch"],
    photo: drScherg.url,
    initials: "FS",
    focus: ["Minimalinvasive Techniken", "Wirbelsäulenchirurgie", "Postoperative Nachsorge"],
    bio: [
      "Dr. med. Florian Scherg ist Facharzt für Neurochirurgie und verfügt über eine breit angelegte medizinische Ausbildung mit besonderem Schwerpunkt auf der Wirbelsäulenchirurgie.",
      "Seine neurochirurgische Ausbildung absolvierte er am Klinikum Bogenhausen in München sowie am Leopoldina Krankenhaus Schweinfurt. Im Rahmen seiner klinischen Tätigkeit konnte er umfassende Erfahrung in der Behandlung neurochirurgischer Erkrankungen sammeln, insbesondere bei Erkrankungen der Wirbelsäule.",
      "Zu seinen operativen Schwerpunkten zählen mikrochirurgische Dekompressionsoperationen, stabilisierende Eingriffe an der Hals-, Brust- und Lendenwirbelsäule sowie Kypho- und Vertebroplastien. Ergänzend verfügt Dr. Scherg über große Erfahrung in der interventionellen Schmerztherapie an der Wirbelsäule.",
      "Vor seinem Medizinstudium absolvierte Dr. Scherg bereits ein Studium der Pharmazie an der Julius-Maximilians-Universität Würzburg und erhielt die Approbation als Apotheker. Seine wissenschaftliche Arbeit führte ihn in die experimentelle Forschung. Auch Publikationen in internationalen Fachzeitschriften unterstreichen seine wissenschaftliche Expertise.",
      "Als verantwortlicher Stationsarzt, Intensivarzt und Operateur sammelte Dr. Scherg umfangreiche Erfahrung in der Betreuung komplexer neurochirurgischer Krankheitsbilder. Darüber hinaus war er Mitglied im Kriseninterventionsteam der Münchner Kliniken.",
      "Sein ärztliches Selbstverständnis ist geprägt von einer präzisen Diagnostik, einer klaren und verständlichen Beratung sowie dem Anspruch, für jede Patientin und jeden Patienten ein individuell passendes Behandlungskonzept zu entwickeln.",
    ],
    education: ["Facharztausbildung Neurochirurgie"],
  },
  {
    slug: "luis-alberto-rodriguez",
    name: "Luis Alberto Rodriguez",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie"],
    availability: "Nächste Woche",
    nextSlot: "Di, 16:00",
    languages: ["Deutsch", "Englisch"],
    photo: rodriguez.url,
    initials: "LR",
    focus: ["Wirbelsäulenchirurgie", "Notfallneurochirurgie"],
    bio: [
      "Luis Alberto Rodriguez ergänzt das neurochirurgische Team mit internationaler Erfahrung und einem Schwerpunkt auf komplexen Wirbelsäuleneingriffen.",
    ],
    education: ["Facharztausbildung Neurochirurgie"],
  },
  {
    slug: "maike-petersen",
    name: "Dr. med. Maike Petersen",
    title: "Fachärztin für Orthopädie & Unfallchirurgie",
    role: "Orthopädin · Unfallchirurgin",
    specialties: ["Orthopädie", "Schmerztherapie"],
    availability: "Diese Woche",
    nextSlot: "Do, 10:00",
    languages: ["Deutsch", "Englisch"],
    photo: drPetersen.url,
    initials: "MP",
    focus: ["Konservative Orthopädie", "Injektionstherapie", "Sportverletzungen", "Rehabilitation"],
    bio: [
      "Dr. Petersen ist Fachärztin für Orthopädie und Unfallchirurgie mit Schwerpunkt auf konservativen Behandlungsstrategien und interventioneller Schmerztherapie.",
    ],
    education: ["Facharztausbildung Orthopädie & Unfallchirurgie"],
  },
  {
    slug: "walter-demmel",
    name: "Dr. med. Walter Demmel",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie", "Schmerztherapie"],
    availability: "Nächste Woche",
    nextSlot: "Fr, 13:30",
    languages: ["Deutsch", "Englisch"],
    photo: drDemmel.url,
    initials: "WD",
    focus: ["Schmerztherapie", "Neuromodulation", "Postoperative Betreuung"],
    bio: [
      "Dr. Demmel ist erfahrener Neurochirurg mit Schwerpunkt auf Schmerztherapie und Neuromodulation.",
    ],
    education: ["Facharztausbildung Neurochirurgie"],
  },
  {
    slug: "hans-h-trouillier",
    name: "PD Dr. med. Hans-H. Trouillier",
    title: "Facharzt für Orthopädie",
    role: "Orthopäde",
    specialties: ["Orthopädie"],
    availability: "In 2+ Wochen",
    nextSlot: "Mi, 09:15",
    languages: ["Deutsch", "Englisch"],
    photo: "/dr-trouillier.jpg",
    initials: "HT",
    focus: ["Konservative Orthopädie", "Wirbelsäulenerkrankungen", "Osteoporose-Management"],
    bio: [
      "PD Dr. Trouillier ist habilitierter Orthopäde mit umfassender universitärer Erfahrung und einem Fokus auf konservative Wirbelsäulentherapie.",
    ],
    education: ["Habilitation Orthopädie", "Universitäre Lehrtätigkeit"],
  },
  {
    slug: "stefanie-mueller-schunk",
    name: "Dr. med. Stefanie Müller-Schunk",
    title: "Fachärztin für Radiologie & Neuroradiologie",
    role: "Radiologin · Neuroradiologin",
    specialties: ["Radiologie"],
    availability: "Diese Woche",
    nextSlot: "Mo, 09:45",
    languages: ["Deutsch", "Englisch"],
    photo: "/dr-mueller-schunk.webp",
    initials: "SM",
    focus: ["MRT der Wirbelsäule", "Neuroradiologische Diagnostik", "Bildgesteuerte Interventionen"],
    bio: [
      "Dr. Müller-Schunk verantwortet die neuroradiologische Diagnostik im Zentrum — präzise Bildgebung ist die Grundlage jeder Therapieentscheidung.",
    ],
    education: ["Facharztausbildung Radiologie", "Schwerpunkt Neuroradiologie"],
  },
  {
    slug: "christina-grosse",
    name: "Dr. med. Christina Grosse",
    title: "Fachärztin für Radiologie",
    role: "Radiologin",
    specialties: ["Radiologie"],
    availability: "Nächste Woche",
    nextSlot: "Do, 08:00",
    languages: ["Deutsch", "Englisch"],
    photo: drGrosse.url,
    initials: "CG",
    focus: ["Bildgebende Diagnostik", "MRT & CT der Wirbelsäule"],
    bio: [
      "Dr. Grosse ist Radiologin im Kompetenzzentrum am Stiglmaierplatz und verantwortet die bildgebende Diagnostik der Wirbelsäule.",
    ],
    education: ["Facharztausbildung Radiologie"],
  },
  {
    slug: "bernhard-lukas",
    name: "Dr. med. Bernhard Lukas",
    title: "Facharzt für Handchirurgie",
    role: "Handchirurg",
    specialties: ["Handchirurgie"],
    availability: "In 2+ Wochen",
    nextSlot: "Fr, 11:30",
    languages: ["Deutsch", "Englisch"],
    photo: drLukas.url,
    initials: "BL",
    focus: ["Handchirurgie", "Karpaltunnel-Syndrom", "Nervenkompressionssyndrome"],
    bio: [
      "Dr. Lukas ist spezialisiert auf Handchirurgie und periphere Nervenkompressionssyndrome — häufig im Zusammenhang mit Wirbelsäulenerkrankungen.",
    ],
    education: ["Facharztausbildung Handchirurgie"],
  },
];

export const allSpecialties: Specialty[] = [
  "Neurochirurgie",
  "Wirbelsäulenchirurgie",
  "Orthopädie",
  "Schmerztherapie",
  "Radiologie",
  "Handchirurgie",
];

export const allAvailabilities: Availability[] = ["Diese Woche", "Nächste Woche", "In 2+ Wochen"];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}
