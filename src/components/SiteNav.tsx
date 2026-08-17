import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import { useLang, useT, type Lang } from "@/lib/lang";
import { MobileNavPanel } from "@/components/MobileNavPanel";


const BOOKING_URL = "/#termin";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const SOCIALS = [
  {
    href: "https://www.instagram.com/wirbelsaeulenzentrum_wzas/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/wirbelsaeule/",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCzwMBjHV_AtZB9Ubu2ISm9w",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

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
      book: "Termin buchen",
      menu: "Menü",
      close: "Menü schließen",
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
      book: "Book an appointment",
      menu: "Menu",
      close: "Close menu",
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
      {/* ── Top bar, solo desktop ── */}
      <div className="hidden lg:block bg-[#263044] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-5 text-[11px] text-white/55">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#AC8F52] shrink-0" aria-hidden>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Nymphenburger Str. 1 · 80335 München
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#AC8F52] shrink-0" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.87 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6.15 6.15l1.1-1.1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +49 (0)89-54 34 30 30
            </span>
          </div>
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center w-7 h-7 rounded text-white/45 hover:text-[#AC8F52] transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" aria-label={t.links[0]?.[0] === "Home" ? "WZAS, home" : "WZAS, Startseite"} className="flex items-center gap-3">
          <img src={logoAsset.url} alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz" className="h-11 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label={t.menu === "Menu" ? "Main navigation" : "Hauptnavigation"}>
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
        closeLabel={t.close}
      />

    </header>
  );
}
