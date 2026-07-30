// src/components/wzas/PageHeader.tsx
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";

export function PageHeader({ activeRoute }: { activeRoute?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm transition-colors ${
        activeRoute === to
          ? "font-semibold text-[#AC8F52]"
          : "font-medium text-[#1E2535] hover:text-[#AC8F52]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz" className="h-10 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {navLink("/beschwerden", "Rückenerkrankungen")}
          {navLink("/behandlungen", "Rückenbehandlungen")}
          {navLink("/aerzte", "Ärzteteam")}
          {navLink("/aktuelles", "Aktuelles")}
        </nav>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535] transition-[filter] hover:brightness-105"
        >
          Termin vereinbaren
        </a>
      </div>
    </header>
  );
}
