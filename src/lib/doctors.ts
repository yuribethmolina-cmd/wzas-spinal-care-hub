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
      "Dr. med. Ralph Medele ist langjährig universitär ausgebildeter und erfahrener Neurochirurg, Gründer und Leiter des Zentrums.",
      "Nach seinem Medizinstudium an der Ludwig-Maximilians-Universität München und einem Auslandsaufenthalt in Mexico City absolvierte er seine neurochirurgische Facharztausbildung bei Prof. Reulen am Klinikum Großhadern.",
      "2006 gründete er gemeinsam mit Dr. Ständer das Wirbelsäulenzentrum am Stiglmaierplatz.",
    ],
    education: [
      "Medizinstudium LMU München",
      "Facharztausbildung Klinikum Großhadern",
      "Leitender Oberarzt Barmherzige Brüder Regensburg",
    ],
  },
  {
    slug: "marko-staender",
    name: "Dr. med. Marko Ständer",
    title: "Stellvertretender Ärztlicher Leiter",
    role: "Orthopäde · Wirbelsäulenchirurgie",
    specialties: ["Orthopädie", "Wirbelsäulenchirurgie"],
    availability: "Diese Woche",
    nextSlot: "Do, 14:15",
    languages: ["Deutsch", "Englisch"],
    photo: drStaender.url,
    initials: "MS",
    focus: ["Konservative Orthopädie", "Wirbelsäulenchirurgie", "Bandscheibenerkrankungen", "Osteoporose"],
    bio: [
      "Dr. Ständer ist Mitbegründer des Wirbelsäulenzentrums und verantwortet den orthopädisch-konservativen Schwerpunkt.",
      "Sein Fokus liegt auf der individuellen Kombination aus konservativer Therapie und — nur wenn nötig — chirurgischer Intervention.",
    ],
    education: [
      "Medizinstudium & Facharzt für Orthopädie",
      "Zusatzausbildung Wirbelsäulenchirurgie",
    ],
  },
  {
    slug: "christian-eroess",
    name: "Dr. med. Christian Eröss",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie", "Wirbelsäulenchirurgie"],
    availability: "Diese Woche",
    nextSlot: "Fr, 09:00",
    languages: ["Deutsch", "Englisch", "Ungarisch"],
    photo: drEroes.url,
    initials: "CE",
    focus: ["Zervikale Wirbelsäule", "Mikrochirurgische Eingriffe", "Schmerztherapie", "Bandscheibenprothesen"],
    bio: [
      "Dr. Eröss ist erfahrener Neurochirurg mit Schwerpunkt auf mikrochirurgischen Eingriffen an der Halswirbelsäule.",
      "Er verbindet moderne Operationstechniken mit einer patientenzentrierten Beratung — konservativ zuerst, chirurgisch nur wenn medizinisch notwendig.",
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
      "Dr. Donat ist Neurochirurg mit langjähriger klinischer Erfahrung im gesamten Spektrum der Wirbelsäulen- und peripheren Nervenchirurgie.",
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
    languages: ["Deutsch", "Englisch", "Kantonesisch"],
    photo: drHo.url,
    initials: "WH",
    focus: ["Lumbale Erkrankungen", "Nervenwurzelkompression", "Konservative Therapie"],
    bio: [
      "Dr. Ho ist Fachärztin für Neurochirurgie und begleitet Patienten schwerpunktmäßig bei lumbalen Beschwerden und konservativen Therapieoptionen.",
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
      "Dr. Scherg ist Neurochirurg mit Schwerpunkt auf minimalinvasiver Wirbelsäulenchirurgie und einer engen Verzahnung zwischen OP und Nachsorge.",
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
    languages: ["Deutsch", "Englisch", "Spanisch"],
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
      "Dr. Demmel ist erfahrener Neurochirurg mit langjährigem Schwerpunkt auf spezialisierter Schmerztherapie und Neuromodulation.",
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
    languages: ["Deutsch", "Englisch", "Französisch"],
    photo: null,
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
    photo: null,
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
    title: "Fachärztin",
    role: "Fachärztin · Konservative Therapie",
    specialties: ["Orthopädie", "Schmerztherapie"],
    availability: "Nächste Woche",
    nextSlot: "Do, 08:00",
    languages: ["Deutsch", "Englisch"],
    photo: drGrosse.url,
    initials: "CG",
    focus: ["Konservative Therapie", "Multimodale Schmerztherapie"],
    bio: [
      "Dr. Grosse ergänzt das Team mit einem Fokus auf konservative und multimodale Behandlungspfade.",
    ],
    education: ["Facharztausbildung"],
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
