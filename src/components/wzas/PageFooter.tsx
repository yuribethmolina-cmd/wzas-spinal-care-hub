// src/components/wzas/PageFooter.tsx
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import { useT } from "@/lib/lang";

const BOOKING_URL = "https://onlinerezeption.vercel.app";

export function PageFooter() {
  const t = useT({
    de: {
      cta: "Termin vereinbaren →",
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
        {/* Bottom row: address + CTA */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/70 text-center sm:text-left">
            Dachauer Straße 33 · 80335 München · +49 (0)89-54 34 30 30
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center min-h-11 lg:min-h-0 text-xs font-semibold text-[#D8BE85] hover:brightness-110 transition"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </footer>
  );
}
