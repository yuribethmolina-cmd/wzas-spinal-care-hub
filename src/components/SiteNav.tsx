import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import { useLang, useT, type Lang } from "@/lib/lang";
import { MobileNavPanel } from "@/components/MobileNavPanel";


const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function LangToggle() {
  const { lang, setLang } = useLang();
  const btn = (l: Lang) =>
    `inline-flex items-center justify-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full transition-colors min-h-11 min-w-11 lg:min-h-9 lg:min-w-9 ${
      lang === l ? "bg-[#1E2535] text-white" : "text-[#1E2535] hover:text-[#AC8F52]"
    }`;
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setLang(lang === "de" ? "en" : "de");
    }
  };
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[#E2E4E7] p-1"
      role="group"
      aria-label="Sprache auswählen / Choose language"
      onKeyDown={onKey}
    >
      <button type="button" onClick={() => setLang("de")} className={btn("de")} aria-pressed={lang === "de"} aria-label="Deutsch" lang="de">DE</button>
      <button type="button" onClick={() => setLang("en")} className={btn("en")} aria-pressed={lang === "en"} aria-label="English" lang="en">EN</button>
    </div>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useT({
    de: {
      links: [
        ["Home", "/"],
        ["Rückenerkrankungen", "/beschwerden"],
        ["Ärzteteam", "/aerzte"],
        ["Behandlungen", "/behandlungen"],
        ["FAQ", "/faq"],
        ["Aktuelles", "/aktuelles"],
      ] as [string, string][],
      book: "Termin vereinbaren",
      menu: "Menü",
    },
    en: {
      links: [
        ["Home", "/"],
        ["Spine conditions", "/beschwerden"],
        ["Our doctors", "/aerzte"],
        ["Treatments", "/behandlungen"],
        ["FAQ", "/faq"],
        ["News", "/aktuelles"],
      ] as [string, string][],
      book: "Book appointment",
      menu: "Menu",
    },
  });
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const linkClass =
    "relative text-sm font-medium text-[#1E2535] transition-colors hover:text-[#AC8F52] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#AC8F52] after:transition-[width] hover:after:w-full after:duration-200";
  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" aria-label="WZAS — Startseite" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz" className="h-11 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Hauptnavigation">
          {t.links.map(([label, href]) => (
            <Link
              key={label}
              to={href as "/" | "/aerzte" | "/beschwerden" | "/behandlungen" | "/faq" | "/aktuelles"}
              className={linkClass}
              activeOptions={{ exact: href === "/" }}
              activeProps={{ "aria-current": "page" } as never}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <LangToggle />
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`${t.book} (öffnet in neuem Tab)`}
            className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535]"
            style={{ transition: `filter 150ms ${EASE}` }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
          >
            {t.book}
          </a>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <LangToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#1E2535] min-h-11 min-w-11"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <MobileNavPanel
        open={open}
        onClose={() => setOpen(false)}
        links={t.links}
        bookLabel={t.book}
        title={t.menu}
      />

    </header>
  );
}
