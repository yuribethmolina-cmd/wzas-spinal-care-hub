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
        wolfart: "Wolfart Klinikum",
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
        wolfart: "Wolfart Clinic",
        karriere: "Careers",
      },
    },
  });

  return (
    <footer className="bg-[#1E2535] text-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Top row: logo + links */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
          <Link to="/">
            <img src={logoAsset.url} alt="WZAS" className="h-8 w-auto brightness-0 invert opacity-80" />
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <Link to="/beschwerden" className="text-sm text-white/60 hover:text-white transition">{t.links.beschwerden}</Link>
            <Link to="/aerzte" className="text-sm text-white/60 hover:text-white transition">{t.links.aerzte}</Link>
            <Link to="/behandlungen" className="text-sm text-white/60 hover:text-white transition">{t.links.behandlungen}</Link>
            <Link to="/faq" className="text-sm text-white/60 hover:text-white transition">{t.links.faq}</Link>
            <a href="/wolfart" className="text-sm text-white/60 hover:text-white transition">{t.links.wolfart}</a>
            <a href="/karriere" className="text-sm text-white/60 hover:text-white transition">{t.links.karriere}</a>
          </nav>
        </div>
        {/* Bottom row: address + CTA */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8C939B] text-center sm:text-left">
            Nymphenburger Str. 1 · 80335 München · +49 (0)89-54 34 30 30
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#AC8F52] hover:brightness-110 transition"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </footer>
  );
}
