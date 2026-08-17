import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "de" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "de", setLang: () => {} });

const ENGLISH_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "WZAS · Spine Center at Stiglmaierplatz, Munich",
    description: "Munich’s trusted spine specialists. 20 years of experience, 13 specialists, and conservative treatment first. Surgery only when necessary.",
  },
  "/beschwerden": {
    title: "Spine Conditions · WZAS Munich",
    description: "Specialist diagnosis and treatment for back pain, herniated discs, spinal stenosis and other spinal conditions in Munich.",
  },
  "/behandlungen": {
    title: "Spine Treatments · WZAS Munich",
    description: "Conservative treatment, minimally invasive procedures and spinal surgery at WZAS Munich. Surgery only when medically necessary.",
  },
  "/aerzte": {
    title: "Medical Team · WZAS Munich",
    description: "Meet our 13 specialists in spinal surgery, neurosurgery, orthopaedics, pain medicine and radiology in Munich.",
  },
  "/faq": {
    title: "Patient Information and FAQs · WZAS Munich",
    description: "Answers to common questions about appointments, referrals, insurance, examinations and treatment at WZAS Munich.",
  },
  "/aktuelles": {
    title: "News, Talks and Medical Insights · WZAS Munich",
    description: "News, patient talks and medical articles from the specialist team at WZAS Munich.",
  },
  "/karriere": {
    title: "Careers · WZAS Munich",
    description: "Current vacancies and career opportunities at the Spine Center at Stiglmaierplatz in Munich.",
  },
  "/wolfart": {
    title: "WolfartKlinik · WZAS Munich",
    description: "Information about inpatient spinal surgery by WZAS specialists at WolfartKlinik in Munich-Gräfelfing.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("wzas-lang") as Lang | null;
      if (stored === "de" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("wzas-lang", l);
      document.documentElement.lang = l;
    } catch {}
  };

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      const basePath = path.startsWith("/beschwerden/")
        ? "/beschwerden"
        : path.startsWith("/aerzte/")
          ? "/aerzte"
          : path;
      const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!document.documentElement.dataset.wzasGermanTitle) {
        document.documentElement.dataset.wzasGermanTitle = document.title;
      }
      if (description && !description.dataset.wzasGermanContent) {
        description.dataset.wzasGermanContent = description.content;
      }
      if (lang === "en") {
        const meta = ENGLISH_META[basePath] ?? ENGLISH_META["/"];
        const pageHeading = path !== basePath ? document.querySelector("h1")?.textContent?.trim() : "";
        document.title = pageHeading ? `${pageHeading} · WZAS Munich` : meta.title;
        if (description) description.content = meta.description;
      } else {
        document.title = document.documentElement.dataset.wzasGermanTitle || document.title;
        if (description?.dataset.wzasGermanContent) description.content = description.dataset.wzasGermanContent;
      }
    } catch {}
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT<T extends Record<Lang, unknown>>(dict: T): T["de"] {
  const { lang } = useLang();
  return dict[lang] as T["de"];
}
