import type { Doctor } from "@/lib/doctors";

type EnglishDoctorCopy = Pick<Doctor, "title" | "role" | "focus" | "bio" | "education"> & {
  specialties: string[];
  languages: string[];
};

const ENGLISH_DOCTORS: Record<string, EnglishDoctorCopy> = {
  "ralph-medele": {
    title: "Medical Director",
    role: "Neurosurgeon · Founder and Medical Director",
    specialties: ["Neurosurgery", "Spinal surgery"],
    languages: ["German", "English", "Spanish"],
    focus: ["Minimally invasive surgical techniques", "Spinal neurosurgery", "Vascular neurosurgery", "Non-surgical treatments"],
    bio: [
      "Dr Ralph Medele is an experienced university-trained neurosurgeon and the founder and Medical Director of the Spine Center at Stiglmaierplatz.",
      "He studied medicine at LMU Munich and spent time at the National Autonomous University of Mexico in Mexico City. He completed his specialist training in neurosurgery under Professor Reulen at Munich University Hospital Grosshadern, where his clinical research focused primarily on vascular and spinal neurosurgery.",
      "He later became a senior consultant in the Department of Neurosurgery at Barmherzige Brüder Hospital in Regensburg. Further training in Germany and abroad expanded his expertise in minimally invasive surgical techniques and non-surgical treatment methods. Dr Medele has worked as a spine specialist in Munich since 2004 and founded the centre with Dr Ständer in 2006.",
    ],
    education: ["Medical degree, LMU Munich", "Specialist training at University Hospital Grosshadern", "Senior neurosurgical consultant, Barmherzige Brüder Hospital Regensburg"],
  },
  "marko-staender": {
    title: "Deputy Medical Director",
    role: "Neurosurgeon · Spinal surgeon",
    specialties: ["Neurosurgery", "Spinal surgery"],
    languages: ["German", "English"],
    focus: ["Interventional cryotherapy of the spinal facet joints", "Innovative treatments for back pain (clinical and scientific)", "Mountain and expedition medicine"],
    bio: [
      "Dr Marko Ständer co-founded the Spine Center at Stiglmaierplatz with Dr Medele in 2006.",
      "His clinical and scientific work focuses on innovative treatments for back pain. Together with Professor Steude, he refined a method of interventional cryotherapy for the spinal facet joints.",
      "He completed his neurosurgical training at LMU Munich University Hospital Grosshadern. His medical studies included LMU Munich, the University of Tübingen and the Medical Academy of Magdeburg, as well as study at Tulane University in New Orleans and clinical placements in Peru and Ecuador.",
    ],
    education: ["Medical studies at LMU Munich, the University of Tübingen and the Medical Academy of Magdeburg", "Specialist training in neurosurgery, LMU University Hospital Grosshadern", "Study abroad at Tulane University, New Orleans"],
  },
  "christian-eroes": {
    title: "Consultant Neurosurgeon",
    role: "Neurosurgeon",
    specialties: ["Neurosurgery", "Spinal surgery"],
    languages: ["German", "English"],
    focus: ["Neurosurgery", "Trauma surgery", "Medical IT"],
    bio: [
      "Dr Christian Erös was born in Munich and studied medicine at LMU Munich. His studies included several months in trauma surgery and neurosurgery at the Medical College of Georgia in Augusta, USA.",
      "He completed his specialist neurosurgical training at LMU University Hospital Grosshadern and qualified as a consultant neurosurgeon in 2011. He joined the Spine Center at Stiglmaierplatz in January 2013.",
      "Alongside his clinical work, Dr Erös has a strong interest in technology and helps develop the centre’s medical IT systems for the benefit of patients.",
    ],
    education: ["Specialist training in neurosurgery", "Fellowship in complex spinal surgery"],
  },
  "markus-donat": {
    title: "Consultant Neurosurgeon",
    role: "Neurosurgeon",
    specialties: ["Neurosurgery", "Spinal surgery"],
    languages: ["German", "English"],
    focus: ["Endoscopic spinal surgery", "Minimally invasive and microsurgical procedures", "Non-surgical spine treatments", "3D reconstruction and navigation"],
    bio: [
      "Dr Markus Donat is an Austrian neurosurgeon who studied medicine at the Medical University of Vienna. During his studies, he played a significant role in research into three-dimensional reconstruction and navigation methods.",
      "He trained in neurosurgery at Vienna University Hospital and completed his specialist training at the Academic State Hospital Feldkirch, where he later served as a senior consultant.",
      "As Deputy Director of a specialist disc surgery clinic in Tyrol, he focused on endoscopic spinal procedures. Extensive further training in Germany and abroad has given him experience in minimally invasive, microsurgical and non-surgical spine treatments. He has worked in Munich since 2013.",
    ],
    education: ["Specialist training in neurosurgery"],
  },
  "wing-mann-ho": {
    title: "Consultant Neurosurgeon",
    role: "Neurosurgeon",
    specialties: ["Neurosurgery", "Spinal surgery", "Pain medicine"],
    languages: ["German", "English"],
    focus: ["Spinal surgery (DWG certified)", "Neurosurgical intensive care", "Pain medicine", "Emergency medicine"],
    bio: [
      "Dr Wing Mann Ho, PhD, is an experienced neurosurgeon with extensive clinical and academic training. Her research record includes a PhD, presentations at international medical conferences, journal publications and contributions to specialist textbooks.",
      "Her training included a research placement in the United States and comprehensive neurosurgical training at Innsbruck University Hospital, an internationally recognised maximum-care hospital and spine centre led by Professor Claudius Thomé.",
      "As a senior consultant in neurosurgical intensive care, she gained extensive experience treating critically ill patients. She has also completed additional qualifications in pain and emergency medicine and is certified in spinal surgery by the German Spine Society (DWG).",
    ],
    education: ["Specialist training in neurosurgery"],
  },
  "florian-scherg": {
    title: "Consultant Neurosurgeon",
    role: "Neurosurgeon",
    specialties: ["Neurosurgery", "Spinal surgery"],
    languages: ["German", "English"],
    focus: ["Microsurgical decompression", "Stabilisation of the cervical, thoracic and lumbar spine", "Kyphoplasty and vertebroplasty", "Interventional pain treatment"],
    bio: [
      "Dr Florian Scherg is a consultant neurosurgeon with broad medical training and a particular focus on spinal surgery. He trained at Bogenhausen Hospital in Munich and Leopoldina Hospital in Schweinfurt, gaining extensive experience in spinal and other neurosurgical conditions.",
      "His surgical focus includes microsurgical decompression, stabilisation of the cervical, thoracic and lumbar spine, and kyphoplasty and vertebroplasty. He also has substantial experience in interventional pain treatment for spinal conditions.",
      "Before studying medicine, Dr Scherg studied pharmacy at the University of Würzburg and qualified as a pharmacist. His approach combines precise diagnosis, clear explanations and treatment plans tailored to each patient.",
    ],
    education: ["Specialist training in neurosurgery"],
  },
  "luis-alberto-rodriguez": {
    title: "Consultant Neurosurgeon",
    role: "Neurosurgeon",
    specialties: ["Neurosurgery", "Spinal surgery"],
    languages: ["German", "Spanish", "English"],
    focus: ["Spinal surgery", "Neurotraumatology", "Neuro-oncology", "Neurosurgical intensive care"],
    bio: [
      "Luis Alberto Rodriguez Guerrero is a consultant neurosurgeon with more than ten years of inpatient and outpatient experience. His career in Venezuela and Germany has focused on spinal surgery, neurotraumatology, neuro-oncology and intensive care.",
      "He studied medicine at the University of Zulia in Maracaibo, Venezuela, from 2005 to 2011. After working in general medicine and postgraduate specialist training in Maracaibo, he moved to Germany in 2016 and undertook clinical observerships at Halle University Hospital.",
      "From 2016 to 2024, he completed specialist training in neurosurgery in Lower Saxony. Since August 2024, he has worked as a consultant neurosurgeon at Nordwest Hospital Sanderbusch. He is currently completing a medical doctorate at the University of Lübeck and regularly attends specialist training and conferences.",
    ],
    education: ["Medical degree, University of Zulia, Maracaibo (2005–2011)", "German medical licence, Lower Saxony Medical Association (2019)", "Consultant recognition in neurosurgery, Lower Saxony Medical Association (2024)", "Medical doctorate, University of Lübeck (in progress)"],
  },
  "maike-petersen": {
    title: "Consultant in Orthopaedics and Trauma Surgery",
    role: "Orthopaedic and trauma surgeon",
    specialties: ["Orthopaedics", "Pain medicine"],
    languages: ["German", "English"],
    focus: ["Conservative and surgical orthopaedics", "Trauma surgery", "Manual medicine", "Preventive medicine"],
    bio: [
      "Dr Maike Petersen completed her specialist training in orthopaedics and trauma surgery at established hospitals in Munich and Frankfurt, including Schön Klinik München Harlaching, Klinikum Dritter Orden, BG Unfallklinik Frankfurt and the Friedrichsheim University Orthopaedic Hospital.",
      "She studied medicine in Giessen, including a semester in Prague, and completed her doctorate on shoulder replacement surgery at Heidelberg University Orthopaedic Hospital.",
      "Her additional qualifications include manual medicine, and her work in occupational medicine at BMW gave her valuable experience in preventive care. She places particular importance on looking at each patient as a whole, analysing symptoms carefully and agreeing an individual treatment plan together.",
    ],
    education: ["Medical degree, Giessen; semester abroad in Prague", "Doctorate at Heidelberg University Orthopaedic Hospital (shoulder replacement surgery)", "Specialist training in Munich and Frankfurt"],
  },
  "walter-demmel": {
    title: "Consultant Neurosurgeon",
    role: "Neurosurgeon",
    specialties: ["Neurosurgery", "Pain medicine"],
    languages: ["German", "English"],
    focus: ["Neurosurgical pain treatment", "Peripheral nerve surgery", "Deep brain stimulation", "Neuromodulation"],
    bio: [
      "Dr Walter Demmel is a consultant neurosurgeon with many years of experience in the surgical and conservative treatment of neurological conditions.",
      "After studying medicine at G. d’Annunzio University and completing his doctorate at the University of Ferrara in Italy, he gained surgical experience in Sterzing and worked as a research fellow in neurosurgery at Charité Berlin. He later served for several years as a senior consultant at Augsburg Hospital.",
      "His main areas of expertise include neurosurgical pain treatment, peripheral nerve surgery, deep brain stimulation and neuromodulation. He has led neuromodulation departments at several hospitals and has long been involved in specialist education and training.",
    ],
    education: ["Medical degree, G. d’Annunzio University", "Doctorate, University of Ferrara, Italy", "Research fellow in neurosurgery, Charité Berlin"],
  },
  "hans-h-trouillier": {
    title: "Consultant Orthopaedic Surgeon",
    role: "Orthopaedic surgeon",
    specialties: ["Orthopaedics", "Spinal surgery"],
    languages: ["German", "English"],
    focus: ["Orthopaedics", "Trauma surgery", "Spinal surgery", "Traumatology"],
    bio: [
      "PD Dr Hans-H. Trouillier joined the centre in January 2022, bringing many years of senior clinical experience from Germany and Switzerland.",
      "He studied medicine at LMU Munich and spent time at the University of Cape Town. His specialist training took place in Augsburg, Donauwörth and the LMU Department of Orthopaedics in Munich, followed by further training in orthopaedics and traumatology at University Hospital Basel.",
      "In 2003, he became Head of Orthopaedics, Trauma Surgery and Spinal Surgery at Franziskus Hospital Bielefeld. From 2014 to 2021, he worked as a senior physician in orthopaedics, trauma and spinal surgery at Kantonsspital Baselland. He completed his postdoctoral qualification in orthopaedics at LMU Munich in 2006 and regularly teaches and publishes in his field.",
    ],
    education: ["Medical degree, LMU Munich; study abroad at the University of Cape Town", "Specialist training in Augsburg, Donauwörth and at LMU Munich", "Postdoctoral qualification in orthopaedics, LMU Munich (2006)"],
  },
  "stefanie-mueller-schunk": {
    title: "Radiologist and Neuroradiologist",
    role: "Radiologist · Neuroradiologist",
    specialties: ["Radiology"],
    languages: ["German", "English"],
    focus: ["Diagnostic radiology", "Neuroradiology", "Functional MRI", "Interventional treatment of cerebral vascular disease"],
    bio: [
      "Dr Stefanie Müller-Schunk studied medicine at LMU Munich. She began her clinical career in radiology at Klinikum rechts der Isar and later worked in surgery before moving to University Hospital Grosshadern in 1999.",
      "During ten years in neuroradiology at Grosshadern, she completed her specialist training in diagnostic radiology and a doctorate on functional MRI. Further clinical work in neurosurgery and at the European CyberKnife Center broadened her neuroscientific expertise.",
      "She became a senior neuroradiology consultant in 2006, with responsibility for diagnosing and treating cerebral vascular disease. She joined Radiologie am Stiglmaierplatz after leaving university hospital practice in 2008.",
    ],
    education: ["Medical degree, LMU Munich", "Specialist training in diagnostic radiology, University Hospital Grosshadern", "Senior consultant in neuroradiology from 2006"],
  },
  "christina-grosse": {
    title: "Consultant Radiologist",
    role: "Radiologist",
    specialties: ["Radiology"],
    languages: ["German", "English"],
    focus: ["Diagnostic imaging of the spine"],
    bio: ["Dr Christina Grosse is a radiologist at the specialist centre at Stiglmaierplatz and is responsible for diagnostic imaging of the spine."],
    education: ["Specialist training in radiology"],
  },
  "bernhard-lukas": {
    title: "Hand Surgeon",
    role: "Hand surgeon",
    specialties: ["Hand surgery"],
    languages: ["German", "English"],
    focus: ["Surgery of the hand, wrist and forearm", "Microsurgery", "Plastic surgery", "Sports medicine"],
    bio: [
      "Dr Bernhard Lukas has provided specialist consultations for conditions and injuries of the hand, wrist and forearm at the centre since January 2021.",
      "He previously spent many years as Head of the Center for Hand and Elbow Surgery, Microsurgery and Plastic Surgery at Schön Klinik München Harlaching. He studied medicine at LMU Munich and gained early clinical experience as a military medical officer and surgical resident.",
      "He qualified as a surgeon in 1989 and added qualifications in plastic surgery in 1992, hand surgery in 1994 and sports medicine in 2008. His career has included senior and departmental leadership roles in hand, elbow, microsurgery and plastic surgery.",
    ],
    education: ["Medical degree, LMU Munich", "Consultant qualification in surgery (1989)", "Additional qualifications in plastic surgery, hand surgery and sports medicine"],
  },
};

export function localizeDoctor(doctor: Doctor, lang: "de" | "en") {
  if (lang === "de") return doctor;
  const copy = ENGLISH_DOCTORS[doctor.slug];
  return copy ? { ...doctor, ...copy } : doctor;
}
