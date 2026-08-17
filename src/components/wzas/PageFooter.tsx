// src/components/wzas/PageFooter.tsx
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import { useT } from "@/lib/lang";

const BOOKING_URL = "/#termin";
const INQUIRY_URL = "/#termin";

const SOCIALS = [
  {
    href: "https://www.instagram.com/wirbelsaeulenzentrum_wzas/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/wirbelsaeule/",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCzwMBjHV_AtZB9Ubu2ISm9w",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export function PageFooter() {
  const t = useT({
    de: {
      cta: "Termin buchen →",
      ask: "Anfrage senden",
      links: {
        beschwerden: "Rückenerkrankungen",
        aerzte: "Ärzteteam",
        behandlungen: "Behandlungen",
        faq: "Häufige Fragen",
        wolfart: "WolfartKlinik",
        karriere: "Karriere",
      },
    },
    en: {
      cta: "Book appointment →",
      ask: "Send inquiry",
      links: {
        beschwerden: "Spine conditions",
        aerzte: "Our doctors",
        behandlungen: "Treatments",
        faq: "FAQ",
        wolfart: "WolfartKlinik",
        karriere: "Careers",
      },
    },
  });

  return (
    <footer className="bg-[#1E2535] text-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Top row: logo + links */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
          <Link to="/" aria-label="WZAS Startseite" className="inline-flex items-center min-h-11">
            <img src={logoAsset.url} alt="WZAS" className="h-8 w-auto brightness-0 invert opacity-80" />
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/beschwerden" className="inline-flex items-center min-h-11 lg:min-h-0 text-sm text-white/70 hover:text-white transition">{t.links.beschwerden}</Link>
            <Link to="/aerzte" className="inline-flex items-center min-h-11 lg:min-h-0 text-sm text-white/70 hover:text-white transition">{t.links.aerzte}</Link>
            <Link to="/behandlungen" className="inline-flex items-center min-h-11 lg:min-h-0 text-sm text-white/70 hover:text-white transition">{t.links.behandlungen}</Link>
            <Link to="/faq" className="inline-flex items-center min-h-11 lg:min-h-0 text-sm text-white/70 hover:text-white transition">{t.links.faq}</Link>
            <a href="/wolfart" className="inline-flex items-center min-h-11 lg:min-h-0 text-sm text-white/70 hover:text-white transition">{t.links.wolfart}</a>
            <a href="/karriere" className="inline-flex items-center min-h-11 lg:min-h-0 text-sm text-white/70 hover:text-white transition">{t.links.karriere}</a>
          </nav>
        </div>
        {/* Bottom row: address + social + CTA */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/70 text-center sm:text-left">
            Nymphenburger Str. 1 · 80335 München · +49 (0)89-54 34 30 30
          </p>
          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-5">
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-[#D8BE85] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={BOOKING_URL}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#AC8F52] px-6 py-2.5 text-xs font-semibold tracking-wide text-[#1E2535] transition hover:brightness-105"
              >
                {t.cta}
              </a>
              <a
                href={INQUIRY_URL}
                className="inline-flex items-center min-h-11 lg:min-h-0 text-xs font-medium text-white/60 underline underline-offset-4 hover:text-white transition"
              >
                {t.ask}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
