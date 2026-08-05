import React from "react";

export type Doc = {
  file: string | null;
  size?: string;
  de: { title: string; desc: string };
  en: { title: string; desc: string };
};

export const DOCS: Doc[] = [
  {
    file: null,
    de: {
      title: "Ablauf der Behandlung",
      desc: "Von der ersten Kontaktaufnahme über Diagnostik und Therapie bis zur Nachsorge — Schritt für Schritt erklärt.",
    },
    en: {
      title: "Course of treatment",
      desc: "From first contact through diagnostics and therapy to follow-up care — explained step by step.",
    },
  },
  {
    file: null,
    de: {
      title: "Checkliste Ersttermin",
      desc: "Welche Unterlagen, Bilder und Informationen Sie zu Ihrem ersten Termin mitbringen sollten.",
    },
    en: {
      title: "First appointment checklist",
      desc: "Which documents, images and information to bring to your first appointment.",
    },
  },
  {
    file: null,
    de: {
      title: "Konservative Therapie im Überblick",
      desc: "Behandlungsmöglichkeiten ohne Operation: Infiltrationen, Physiotherapie, Schmerztherapie und multimodale Konzepte.",
    },
    en: {
      title: "Conservative therapy at a glance",
      desc: "Treatment options without surgery: injections, physiotherapy, pain management and multimodal concepts.",
    },
  },
  {
    file: null,
    de: {
      title: "Minimalinvasive Eingriffe",
      desc: "Information und Vorbereitung: Ablauf, Narkose, Aufenthalt und Genesung nach minimalinvasiven Operationen.",
    },
    en: {
      title: "Minimally invasive procedures",
      desc: "Information and preparation: procedure, anaesthesia, stay and recovery after minimally invasive surgery.",
    },
  },
];

export function PdfIcon() {
  return (
    <span
      className="flex-shrink-0 w-11 h-11 rounded-sm bg-[#F3F0E9] text-[#AC8F52] flex items-center justify-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15h6M9 18h4" strokeLinecap="round" />
      </svg>
    </span>
  );
}
