import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "de" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "de", setLang: () => {} });

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
