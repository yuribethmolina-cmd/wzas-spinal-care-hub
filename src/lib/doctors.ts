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
    name: "Luis Alberto Rodriguez Guerrero",
    title: "Facharzt für Neurochirurgie",
    role: "Neurochirurg",
    specialties: ["Neurochirurgie", "Wirbelsäulenchirurgie"],
    availability: "Nächste Woche",
    nextSlot: "Di, 16:00",
    languages: ["Deutsch", "Spanisch", "Englisch"],
    photo: rodriguez.url,
    initials: "LR",
    focus: ["Wirbelsäulenchirurgie", "Neurotraumatologie", "Neuroonkologie", "Intensivmedizin"],
    bio: [
      "Facharzt für Neurochirurgie mit mehr als zehn Jahren Berufserfahrung in der stationären und ambulanten Patientenversorgung. Er bringt eine breite klinische Expertise, interkulturelle Kompetenz sowie eine fundierte operative Ausbildung mit.",
      "Seine berufliche Laufbahn erstreckt sich über Venezuela und Deutschland, mit besonderem Fokus auf Wirbelsäulenchirurgie, Neurotraumatologie, Neuroonkologie und Intensivmedizin. Sein Anspruch: exzellente medizinische Versorgung mit Menschlichkeit, Präzision und strategischem Denken zu verbinden — sowohl im OP als auch in der interdisziplinären Zusammenarbeit.",
      "Sein Medizinstudium absolvierte er an der Universidad del Zulia in Maracaibo, Venezuela (2005–2011). Anschließend arbeitete er als Landarzt in der Allgemeinmedizin und danach in der postgradualen Facharztausbildung am General Krankenhaus des Südens in Maracaibo, mit komplexen Notfällen, Schädel-Hirn-Traumata und Tumorpatienten.",
      "2016 kam er nach Deutschland, hospitierte an den Kliniken für Neurochirurgie und Neurologie des Universitätsklinikums Halle (Saale) und absolvierte von 2016 bis 2024 seine Weiterbildung in der Klinik für Neurochirurgie in Niedersachsen — mit Schwerpunkten in spinaler Chirurgie, Neurotraumatologie und Neuroonkologie sowie langjähriger Erfahrung in der neurochirurgischen Intensivmedizin.",
      "Seit August 2024 ist er Facharzt für Neurochirurgie am Nordwest Krankenhaus Sanderbusch, wo er neuroonkologische Patienten mitbetreut, für die intensivmedizinische Versorgung postoperativer Fälle verantwortlich ist, Assistenzärzte supervidiert und an interdisziplinären Tumorboards teilnimmt.",
      "Aktuell promoviert er an der Universität zu Lübeck zum Thema „Ultrafrühe Kranioplastik — Eine retrospektive Analyse im Zeitraum 2010–2020 am Nordwest Krankenhaus Sanderbusch“.",
      "Er bildet sich kontinuierlich fort, unter anderem im Workshop für biportale endoskopische Wirbelsäulenchirurgie (Palma de Mallorca, 2025) und durch regelmäßige Teilnahme an Kongressen der DGNC, DWG und EANS.",
    ],
    education: [
      "Medizinstudium Universidad del Zulia, Maracaibo (2005–2011)",
      "Approbation als Arzt in Deutschland, Ärztekammer Niedersachsen (2019)",
      "Facharztanerkennung Neurochirurgie, Ärztekammer Niedersachsen (2024)",
      "Promotion in der Humanmedizin, Universität zu Lübeck (laufend)",
    ],
    memberships: ["Basis-Zertifikat der Deutschen Wirbelsäulengesellschaft (DWG, beantragt)"],
  },

  {
    slug: "maike-petersen",
    name: "Dr. med. Maike Petersen",
    title: "Fachärztin für Orthopädie und Unfallchirurgie",
    role: "Orthopädin · Unfallchirurgin",
    specialties: ["Orthopädie", "Schmerztherapie"],
    availability: "Diese Woche",
    nextSlot: "Do, 10:00",
    languages: ["Deutsch", "Englisch"],
    photo: drPetersen.url,
    initials: "MP",
    focus: ["Konservative Orthopädie", "Manuelle Medizin", "Unfallchirurgie", "Präventivmedizin"],
    bio: [
      "Ich freue mich, Sie als Fachärztin für Orthopädie und Unfallchirurgie betreuen zu dürfen. Meine fachärztliche Weiterbildung absolvierte ich in renommierten Kliniken in München und Frankfurt, darunter die Schön Klinik München Harlaching, das Klinikum Dritter Orden sowie die BG Unfallklinik Frankfurt und die Orthopädische Universitätsklinik Friedrichsheim. Hier konnte ich meine Kenntnisse in der konservativen und operativen Orthopädie und Unfallchirurgie vertiefen.",
      "Mein Medizinstudium absolvierte ich in Gießen mit einem Auslandssemester in Prag. Promoviert habe ich an der Orthopädischen Universitätsklinik Heidelberg im Bereich der Schulterprothetik.",
      "Neben der klassischen orthopädisch-unfallchirurgischen Tätigkeit erweitere ich mein Behandlungsspektrum kontinuierlich durch Zusatzqualifikationen, wie beispielsweise der manuellen Medizin. Zuletzt konnte ich durch die Tätigkeit in der Betriebsmedizin bei BMW wertvolle Erfahrungen im präventivmedizinischen Umfeld sammeln.",
      "Mir ist es wichtig, meine Patientinnen und Patienten ganzheitlich zu betrachten, Beschwerden präzise zu analysieren und gemeinsam ein individuell abgestimmtes Therapiekonzept zu entwickeln.",
    ],
    education: [
      "Medizinstudium Gießen, Auslandssemester Prag",
      "Promotion Orthopädische Universitätsklinik Heidelberg (Schulterprothetik)",
      "Facharztweiterbildung München und Frankfurt",
    ],
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
    focus: ["Neurochirurgische Schmerztherapie", "Neuromodulation", "Chirurgie peripherer Nerven", "Tiefe Hirnstimulation"],
    bio: [
      "Dr. Demmel ist Facharzt für Neurochirurgie mit langjähriger Erfahrung in der operativen und konservativen Behandlung neurochirurgischer Erkrankungen.",
      "Nach seinem Medizinstudium an der Universität G. D'Annunzio und seiner Promotion an der Universität Ferrara in Italien sammelte er zunächst chirurgische Erfahrung am Krankenhaus Sterzing und war anschließend als wissenschaftlicher Mitarbeiter an der Neurochirurgischen Klinik der Charité in Berlin tätig.",
      "Nach seiner Facharztanerkennung arbeitete er mehrere Jahre als Oberarzt am Klinikum Augsburg. In dieser Zeit vertiefte er insbesondere seine Schwerpunkte in der neurochirurgischen Schmerztherapie, der Chirurgie peripherer Nerven sowie der tiefen Hirnstimulation, etwa bei Morbus Parkinson.",
      "Als Chefarzt leitete Dr. Demmel insgesamt viele Jahre Abteilungen für Neuromodulation, unter anderem an der Schön Klinik Vogtareuth, im Diakoniewerk München-Maxvorstadt und aktuell an der Sana Klinik München.",
      "Darüber hinaus betreute er Schmerzpatienten auch ambulant, unter anderem am Klinikum Fürstenfeldbruck und im Schmerzzentrum Algesiologikum.",
      "Neben seiner klinischen Tätigkeit engagiert sich Dr. Demmel seit vielen Jahren in der Aus- und Weiterbildung, unter anderem an der Akademie für Gesundheitsberufe der Universität Augsburg sowie bei neurochirurgischen Fachkursen der Universitäten Ulm und Heidelberg.",
      "Seit der Gründung des NervClub e.V. bringt er sich zudem in verschiedenen Funktionen ein, aktuell unter anderem als Mitglied des interdisziplinären Expertenrates.",
    ],
    education: [
      "Medizinstudium Universität G. D'Annunzio",
      "Promotion Universität Ferrara (Italien)",
      "Wissenschaftlicher Mitarbeiter Neurochirurgische Klinik der Charité Berlin",
    ],
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
    focus: ["Orthopädie", "Unfallchirurgie", "Wirbelsäulenchirurgie", "Traumatologie"],
    bio: [
      "Seit Januar 2022 ergänzt und erweitert PD Dr. Trouillier das Spektrum unseres Wirbelsäulenzentrums mit seiner medizinischen Kompetenz und seinem reichen Erfahrungsschatz aus langjährigen leitenden Positionen in Deutschland und in der Schweiz.",
      "Mit medizinischen Wurzeln in München als Student an der Ludwig-Maximilians Universität und einem Auslandsaufenthalt an der Universität Kapstadt setzte er seine fachärztliche Ausbildung in Augsburg, Donauwörth und weiter an der Orthopädischen Klinik der LMU in München bei Prof. Dr. Hans Jürgen Refior fort.",
      "Nach Fort- und Weiterbildung in der Orthopädie und Traumatologie am Kantonsspital der Universität Basel, wurde er 2003 als Chefarzt der Klinik für Orthopädie, Unfallchirurgie und Wirbelsäulenchirurgie an das Franziskus Hospital in Bielefeld berufen, das als akademisches Lehrkrankenhaus der Medizinischen Hochschule Hannover fungiert.",
      "2014 kehrte er dann in die Schweiz zurück an das Kantonsspital Baselland und war hier bis 2021 als Leitender Arzt der Orthopädie, Unfallchirurgie und Wirbelsäulenchirurgie tätig.",
      "2006 habilitierte er sich an der LMU München auf dem Fachgebiet der Orthopädie.",
      "Er publizierte multiple wissenschaftliche Beiträge in angesehenen Fachjournals, schrieb Buchkapitel und gibt seinen Wissensschatz als geladener Referent und Ausbilder auf Kongressen, Kursen und Seminaren weiter. U.a. ist er Vorstandsmitglied der Dt. Gesellschaft für Wirbelsäulentherapie.",
    ],
    education: [
      "Medizinstudium LMU München, Auslandsaufenthalt Universität Kapstadt",
      "Facharztausbildung Augsburg, Donauwörth und Orthopädische Klinik der LMU München",
      "Habilitation Orthopädie, LMU München (2006)",
    ],
    memberships: ["Vorstandsmitglied der Dt. Gesellschaft für Wirbelsäulentherapie"],
  },
  {
    slug: "stefanie-mueller-schunk",
    name: "Dr. med. Stefanie Müller-Schunk",
    title: "Radiologin, Neuroradiologin",
    role: "Radiologin · Neuroradiologin",
    specialties: ["Radiologie"],
    availability: "Diese Woche",
    nextSlot: "Mo, 09:45",
    languages: ["Deutsch", "Englisch"],
    photo: "/dr-mueller-schunk.webp",
    initials: "SM",
    focus: ["Diagnostische Radiologie", "Neuroradiologie", "Funktionelle Kernspintomografie", "Interventionelle Therapie"],
    bio: [
      "Dr. Stefanie Müller-Schunk absolvierte ihr Medizinstudium an der Ludwig-Maximilians-Universität. Ihre klinische Karriere startete sie am Klinikum Rechts der Isar der TU München zunächst in der Radiologie bei Prof. Gerhardt und setzte sie später in der Chirurgischen Klinik unter Prof. Siewert fort.",
      "1999 wechselte sie ans Uniklinikum Großhadern und arbeitete dort zehn Jahre in der Abteilung für Neuroradiologie bei Prof. Brückmann. In dieser Zeit vervollständigte sie ihre Facharztausbildung für diagnostische Radiologie unter der Leitung von Prof. Reiser. Ihre wissenschaftliche Arbeit drehte sich um das Thema funktionelle Kernspintomografie. Auf diesem Gebiet verfasste sie auch ihre Promotion.",
      "Ihre neurowissenschaftliche Expertise rundete sie mit einer einjährigen klinischen Tätigkeit an der Neurochirurgischen Universitätsklinik Großhadern und am Europäischen Cyberknife Zentrum ab.",
      "2006 wurde Dr. Müller-Schunk zur Oberärztin in der Abteilung für Neuroradiologie berufen. Hier war sie für die Diagnostik und interventionelle Therapie von Hirngefäßerkrankungen verantwortlich. In dieser Zeit gründete sie die Forschungsgruppe „periinterventionelles Gerinnungsmanagement bei Neurointerventionen“ und erhielt für ihre Arbeit im Jahr 2007 den Innovationspreis der Deutschen Gesellschaft für Neuroradiologie.",
      "2008 wurde Dr. Müller-Schunk Mutter einer Tochter. Um auch ihrer Familie gerecht werden zu können, verließ sie die Universitätsklinik und engagiert sich seither in der Radiologie am Stiglmaierplatz.",
      "Das gebürtige Münchner Kindl ist ausgesprochen sportbegeistert mit einer Vergangenheit im Skirennsport. Sie errang mehrfach deutsche Jugendmeister-, internationale Studentenmeister- und Ärzteweltmeistertitel.",
    ],
    education: [
      "Medizinstudium Ludwig-Maximilians-Universität München",
      "Facharztausbildung diagnostische Radiologie, Uniklinikum Großhadern",
      "Oberärztin Neuroradiologie (ab 2006)",
    ],
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
    title: "Handchirurg",
    role: "Handchirurg",
    specialties: ["Handchirurgie"],
    availability: "In 2+ Wochen",
    nextSlot: "Fr, 11:30",
    languages: ["Deutsch", "Englisch"],
    photo: drLukas.url,
    initials: "BL",
    focus: ["Hand, Handgelenk und Unterarm", "Mikrochirurgie", "Plastische Chirurgie", "Sportmedizin"],
    bio: [
      "Seit Januar 2021 ist Dr. med. Bernhard Lukas für alle Fragen, Probleme und Verletzungen rund um Hand, Handgelenk und Unterarm im Wirbelsäulenzentrum am Stiglmaierplatz für Sie da.",
      "Der sehr renommierte Handchirurg Dr. Bernhard Lukas, langjähriger Chefarzt am Zentrum für Hand- und Ellenbogen Chirurgie, Mikrochirurgie und Plastische Chirurgie der Schön Klinik München Harlaching bietet in unserem MVZ eine handchirurgische Privatsprechstunde an.",
      "Dr. Bernhard Lukas studierte Medizin an der LMU München. Im Anschluss sammelte er erste praktische Erfahrungen als Stabsarzt beim Gebirgsjägerbataillon Mittenwald und als Assistenzarzt in der Chirurgischen Uniklinik München Nußbaumstraße.",
      "Nach Erlangen des Facharztes für Chirurgie 1989 absolvierte er 1992 die Zusatzbezeichnung Plastischer Chirurg, 1994 die Zusatzbezeichnung Handchirurgie und 2008 die Zusatzbezeichnung Sportmedizin.",
      "Von 1995 – 1998 war Dr. Bernhard Lukas als Oberarzt für Hand- und Plastische Chirurgie tätig, zunächst in der Chirurgischen Uniklinik München Nußbaumstraße, danach im Behandlungszentrum Vogtareuth, wo er ab 1998 als Leitender Arzt fungierte.",
      "2000 wechselte er als Chefarzt an das Zentrum für Hand- und Ellenbogenchirurgie, Mikrochirurgie und Plastische Chirurgie, Schön Klinik München Harlaching.",
      "Sein Lebensmotto lautet: In der Ruhe liegt die Kraft.",
    ],
    education: [
      "Medizinstudium LMU München",
      "Facharzt für Chirurgie (1989)",
      "Zusatzbezeichnungen: Plastischer Chirurg (1992), Handchirurgie (1994), Sportmedizin (2008)",
    ],
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
