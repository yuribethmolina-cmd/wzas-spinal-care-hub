import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doctors as allDoctors } from "@/lib/doctors";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import heroAsset from "@/assets/wzas/hero.webp.asset.json";
import drMedele from "@/assets/wzas/dr-medele.webp.asset.json";
import drEroes from "@/assets/wzas/dr-eroes.webp.asset.json";
import drHo from "@/assets/wzas/dr-ho.jpg.asset.json";
import vortraegeImg from "@/assets/wzas/vortraege.webp.asset.json";
import thumbBandscheibe from "@/assets/wzas/thumb-bandscheibe.webp.asset.json";
import aktuellesImg from "@/assets/wzas/aktuelles.jpg.asset.json";
import focusImg from "@/assets/wzas/focus.jpeg.asset.json";
import isoImg from "@/assets/wzas/iso.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WZAS · Wirbelsäulenzentrum am Stiglmaierplatz München" },
      { name: "description", content: "Rückengesundheit für München. 20 Jahre Erfahrung, 12 Spezialisten. Konservative Behandlung zuerst — Operation nur wenn nötig." },
      { property: "og:title", content: "WZAS · Wirbelsäulenzentrum am Stiglmaierplatz" },
      { property: "og:description", content: "Spezialisten für Wirbelsäule und Rücken in München. Termin meist innerhalb von 5 Werktagen." },
    ],
  }),
  component: Home,
});

const BOOKING_URL = "https://onlinerezeption.vercel.app";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoAsset.url}
        alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz"
        className={`h-11 w-auto ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}


function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Rückenschmerzen", "#beschwerden"],
    ["Arzt finden", "#team"],
    ["Behandlungen", "#weg"],
    ["Aktuelles", "#aktuelles"],
  ];
  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-none"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
          >
            Termin vereinbaren
          </a>
        </div>
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-[#1E2535]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#E2E4E7] bg-white px-5 py-4 space-y-3">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="block text-sm font-medium text-[#1E2535]">
              {label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="block text-center rounded-full bg-[#AC8F52] px-5 py-3 text-sm font-semibold text-[#1E2535]"
          >
            Termin vereinbaren
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const chips = ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Nach OP"];
  return (
    <section className="relative bg-[#1E2535] text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-40 lg:pt-24 lg:pb-48 min-h-[85vh] grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AC8F52]">
            Wirbelsäulenzentrum am Stiglmaierplatz · München
          </p>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Rückengesundheit<br />für München.
          </h1>
          <p className="mt-6 text-lg text-[#E2E4E7] leading-relaxed max-w-xl">
            20 Jahre Erfahrung. 12 Spezialisten. Konservative Behandlung zuerst — Operation nur wenn nötig.
          </p>
          <div className="mt-10">
            <p className="text-sm text-[#8C939B] mb-3">Was führt Sie zu uns?</p>
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c}
                  className="rounded-full border border-white/25 px-4 py-2 text-sm text-white hover:bg-white/10 transition cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
            >
              Termin vereinbaren
            </a>
            <a
              href="#beschwerden"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Mehr erfahren
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroAsset.url}
            alt="Wirbelsäulenzentrum am Stiglmaierplatz — Praxisräume"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>

      </div>

      <div className="absolute inset-x-0 bottom-0 bg-[#1E2535]/90 backdrop-blur border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {[
            ["30.000+", "Patienten pro Jahr"],
            ["90%", "ohne Operation behandelt"],
            ["20+", "Jahre Erfahrung"],
            ["12", "Wirbelsäulenspezialisten"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-2xl md:text-3xl font-bold text-[#AC8F52]">{n}</div>
              <div className="text-xs md:text-sm text-[#E2E4E7] mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children, gold = true }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`text-[11px] font-medium tracking-[0.2em] uppercase ${gold ? "text-[#AC8F52]" : "text-[#8C939B]"}`}>
      {children}
    </p>
  );
}

const BeschwerdenIcons: Record<string, React.ReactNode> = {
  akut: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#AC8F52]">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  chronisch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#AC8F52]">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  bandscheibe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#AC8F52]">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4" />
      <path d="M2 12V8c0-2.21 4.48-4 10-4s10 1.79 10 4v4" />
    </svg>
  ),
  ischias: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#AC8F52]">
      <path d="M8.56 2.9A7 7 0 0 1 19 9v4l3 3-3 3v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2l-3-3 3-3V9a7 7 0 0 1 .14-.9" />
      <path d="M9 18h6" />
    </svg>
  ),
  reha: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#AC8F52]">
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z" />
      <path d="M7 21.7A9 9 0 0 1 3 12" />
      <path d="M17 21.7A9 9 0 0 0 21 12" />
      <path d="M12 3a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z" />
    </svg>
  ),
  sport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#AC8F52]">
      <circle cx="13" cy="4" r="2" />
      <path d="M7 21l3-6 2 2 3-8 4 4" />
      <path d="M3 21h18" />
    </svg>
  ),
};

function Beschwerden() {
  const items = [
    ["akut", "Akuter Rückenschmerz", "Plötzlicher Beginn · Verletzung · Muskelkrampf"],
    ["chronisch", "Chronische Rückenschmerzen", "3+ Monate · Wiederkehrend · Degenerativ"],
    ["bandscheibe", "Bandscheibenvorfall", "L4/L5 · L5/S1 · Zervikal"],
    ["ischias", "Ischias / Lumboischialgie", "Ausstrahlende Schmerzen · Beinschwäche"],
    ["reha", "Reha nach Operation", "Rehabilitation · Nachsorge"],
    ["sport", "Sport- & Aktivverletzungen", "Sportler · Hochbelastende Aktivität"],
  ];
  return (
    <section id="beschwerden" className="bg-[#F8F8F6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Behandlungsgebiete</SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1E2535]">Was führt Sie zu uns?</h2>
        <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">
          Finden Sie Ihr Beschwerdebild und erfahren Sie, wie unsere Spezialisten helfen können — ohne unnötige Operationen.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([iconKey, title, sub]) => (
            <div
              key={title}
              className="group bg-white rounded-xl p-7 border-t-4 border-[#AC8F52] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              <div>{BeschwerdenIcons[iconKey]}</div>
              <h3 className="mt-4 text-xl font-semibold text-[#1E2535]">{title}</h3>
              <p className="mt-2 text-sm text-[#8C939B] leading-relaxed flex-1">{sub}</p>
              <a href="#" className="mt-6 text-sm font-semibold text-[#AC8F52] hover:underline">
                Behandlungsoptionen ansehen →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Weg() {
  const steps = [
    ["01", "Beschwerdebild wählen", "Suchen oder stöbern Sie nach Symptomen — unsere Übersicht hilft Ihnen zu verstehen, welche Behandlungsoptionen für Ihren Fall geeignet sind."],
    ["02", "Den richtigen Spezialisten finden", "Filtern Sie unser Team aus 12 Spezialisten nach Fachgebiet. Jedes Profil zeigt die behandelten Erkrankungen und den Behandlungsansatz."],
    ["03", "In 60 Sekunden buchen", "Nutzen Sie unser Online-Buchungssystem und wählen Sie einen passenden Termin. Ersttermine meist innerhalb von 5 Werktagen. Kein Anruf nötig."],
  ];
  return (
    <section id="weg" className="bg-[#1E2535] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Ihr Weg zur Besserung</SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Vom ersten Klick zum Termin</h2>
        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6 relative">
          {steps.map(([n, t, d], i) => (
            <div key={n} className="relative bg-[#263044] rounded-xl p-8 border-t-4 border-[#AC8F52]">
              <div className="text-3xl font-bold text-[#AC8F52]">{n}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{t}</h3>
              <p className="mt-3 text-sm text-[#E2E4E7] leading-relaxed">{d}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 text-[#AC8F52] text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const filters = ["Alle", "Wirbelsäulenchirurgie", "Schmerztherapie", "Neurochirurgie", "Orthopädie"] as const;
  const [active, setActive] = useState<(typeof filters)[number]>("Alle");

  const doctors = allDoctors
    .filter((d) => active === "Alle" || d.specialties.includes(active as never))
    .slice(0, 3);

  return (
    <section id="team" className="bg-[#F8F8F6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Unser Ärzteteam</SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1E2535]">12 Spezialisten, ein Ziel</h2>
        <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">
          Jeder Patient wird von Anfang an dem richtigen Spezialisten zugeordnet.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === f
                  ? "bg-[#1E2535] text-white"
                  : "border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <div key={d.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="aspect-[3/4] bg-[#263044] overflow-hidden">
                {d.photo ? (
                  <img src={d.photo} alt={d.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-[#AC8F52]">
                    {d.initials}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-[#1E2535]">{d.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#AC8F52] font-medium">{d.role}</p>
                <ul className="mt-4 space-y-1 text-sm text-[#8C939B]">
                  {d.focus.slice(0, 3).map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
                <Link
                  to="/aerzte/$slug"
                  params={{ slug: d.slug }}
                  className="mt-6 block text-center rounded-full border border-[#1E2535] py-2.5 text-sm font-semibold text-[#1E2535] hover:bg-[#1E2535] hover:text-white transition"
                >
                  Profil ansehen
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/aerzte" className="text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52]">
            Alle {allDoctors.length} Spezialisten ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
}


function Termin() {
  return (
    <section id="termin" className="bg-[#1E2535] py-24 border-t-4 border-[#AC8F52]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Wir sind für Sie da.</h2>
          <p className="mt-4 text-[#E2E4E7] leading-relaxed max-w-lg">
            Die meisten Ersttermine sind innerhalb von 5 Werktagen verfügbar. Für die meisten Beschwerden ist keine Überweisung erforderlich.
          </p>
          <div className="mt-8 rounded-xl bg-[#263044] p-7 border-t-4 border-[#AC8F52]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">Online buchen</p>
            <p className="mt-3 text-white font-semibold text-lg">Termin online vereinbaren</p>
            <p className="mt-2 text-sm text-[#8C939B]">Integriert über onlinerezeption.vercel.app</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
            >
              Termin buchen
            </a>
          </div>
        </div>
        <div className="rounded-xl bg-[#263044] p-7">
          <h3 className="text-white font-semibold text-lg">Weitere Kontaktmöglichkeiten</h3>
          <div className="mt-6 space-y-6 text-sm">
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.87 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6.15 6.15l1.1-1.1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <div className="text-white">+49 (0)89-54 34 30 30</div>
                <div className="text-[#8C939B]">Mo–Fr · 08:00–18:00 Uhr</div>
              </div>
            </div>
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <div>
                <div className="text-white">info@wzas.de</div>
                <div className="text-[#8C939B]">Antwort innerhalb eines Werktags</div>
              </div>
            </div>
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#AC8F52] shrink-0 mt-0.5">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <div className="text-white">Nymphenburger Str. 1</div>
                <div className="text-[#8C939B]">80335 München</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Aktuelles() {
  const items = [
    {
      type: "VORTRAG",
      color: "border-blue-500",
      badge: "bg-blue-500/10 text-blue-600",
      link: "text-blue-600",
      date: "15. September 2026",
      title: "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?",
      detail: "Gasteig HP8 · München · 19:00 Uhr",
      image: vortraegeImg.url,
    },
    {
      type: "VIDEO",
      color: "border-purple-500",
      badge: "bg-purple-500/10 text-purple-600",
      link: "text-purple-600",
      date: "Online verfügbar",
      title: "Bandscheibenvorfall verstehen: Diagnose & Behandlung",
      detail: "45 Min. · Dr. med. Ralph Medele",
      image: thumbBandscheibe.url,
    },
    {
      type: "ARTIKEL",
      color: "border-green-600",
      badge: "bg-green-600/10 text-green-700",
      link: "text-green-700",
      date: "Juli 2026",
      title: "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie",
      detail: "Fachbeitrag · Neurochirurgie aktuell",
      image: aktuellesImg.url,
    },
  ];

  return (
    <section id="aktuelles" className="bg-[#F8F8F6] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Aktuelles</SectionLabel>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1E2535]">Vorträge, Veranstaltungen & Wissen</h2>
        <p className="mt-4 max-w-2xl text-[#8C939B] leading-relaxed">
          Bleiben Sie informiert — unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen und Fachbeiträgen.
        </p>
        <div className="mt-12 space-y-4">
          {items.map((i) => (
            <div
              key={i.title}
              className={`bg-white rounded-xl overflow-hidden border-t-4 ${i.color} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 grid gap-4 md:grid-cols-[180px_1fr_auto] md:items-center`}
            >
              <img src={i.image} alt={i.title} className="h-full w-full object-cover aspect-[4/3] md:aspect-auto md:h-32" />
              <div className="px-6 md:px-0 py-4 md:py-5">
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold tracking-widest px-2.5 py-1 rounded ${i.badge}`}>
                    {i.type}
                  </span>
                  <span className="text-xs text-[#8C939B]">{i.date}</span>
                </div>
                <h3 className="mt-2 font-semibold text-lg text-[#1E2535]">{i.title}</h3>
                <p className="mt-1 text-sm text-[#8C939B]">{i.detail}</p>
              </div>
              <a href="#" className={`px-6 md:px-7 pb-5 md:pb-0 text-sm font-semibold ${i.link} hover:underline whitespace-nowrap`}>
                Mehr erfahren →
              </a>
            </div>
          ))}

        </div>
        <div className="mt-10">
          <a href="#" className="text-sm font-semibold text-[#1E2535] hover:text-[#AC8F52]">
            Alle Veranstaltungen & Inhalte ansehen →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Beschwerdebilder",
      items: ["Akuter Rückenschmerz", "Chronische Schmerzen", "Bandscheibenvorfall", "Ischias", "Reha nach OP"],
    },
    {
      title: "Behandlungen",
      items: ["Konservative Therapie", "Minimalinvasiv", "Wirbelsäulenop.", "Schmerztherapie", "Rehabilitation"],
    },
    {
      title: "Über uns",
      items: ["Unser Team", "Die Praxis", "Leitbild & Werte", "Aktuelles", "Karriere"],
    },
    {
      title: "Für Patienten",
      items: ["Termin vereinbaren", "Häufige Fragen", "Barrierefreiheit", "Datenschutz"],
    },
  ];
  return (
    <footer className="bg-[#1E2535] border-t-2 border-[#AC8F52] text-[#E2E4E7]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo light />
          <div className="mt-5 space-y-1 text-sm text-[#8C939B]">
            <div>Nymphenburger Str. 1</div>
            <div>80335 München</div>
            <div className="mt-3">+49 (0)89-54 34 30 30</div>
            <div>info@wzas.de</div>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-semibold text-sm">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-[#8C939B]">
              {c.items.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-[#AC8F52] transition">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-8 flex flex-wrap items-center gap-8">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#8C939B]">Ausgezeichnet</span>
          <img src={focusImg.url} alt="Focus Top-Mediziner" className="h-14 w-auto bg-white/95 rounded p-2" />
          <img src={isoImg.url} alt="ISO 9001 zertifiziert" className="h-14 w-auto bg-white/95 rounded p-2" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#8C939B]">
          <div>© 2026 Wirbelsäulenzentrum am Stiglmaierplatz · Alle Rechte vorbehalten</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#AC8F52]">Impressum</a>
            <a href="#" className="hover:text-[#AC8F52]">Datenschutz</a>
            <a href="#" className="hover:text-[#AC8F52]">Barrierefreiheit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <Nav />
      <main>
        <Hero />
        <Beschwerden />
        <Weg />
        <Team />
        <Termin />
        <Aktuelles />
      </main>
      <Footer />
    </div>
  );
}
