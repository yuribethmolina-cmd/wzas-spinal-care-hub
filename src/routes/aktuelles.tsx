import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/wzas/logo.png.asset.json";
import aktuellesImg from "@/assets/wzas/aktuelles.jpg.asset.json";
import vortraegeImg from "@/assets/wzas/vortraege.webp.asset.json";
import thumbBandscheibe from "@/assets/wzas/thumb-bandscheibe.webp.asset.json";

const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`,
    } as React.CSSProperties,
  };
}

export const Route = createFileRoute("/aktuelles")({
  head: () => ({
    meta: [
      { title: "Aktuelles · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "Vorträge, Videos und Fachbeiträge von den Spezialisten des Wirbelsäulenzentrum am Stiglmaierplatz. Bleiben Sie informiert über neue Behandlungsmethoden und Veranstaltungen." },
      { property: "og:title", content: "Aktuelles · WZAS München" },
    ],
  }),
  component: AktuellesPage,
});

type ItemType = "Vortrag" | "Video" | "Artikel";

const ITEMS: {
  type: ItemType;
  date: string;
  title: string;
  detail: string;
  img?: string;
  featured?: boolean;
}[] = [
  {
    type: "Vortrag",
    date: "15. September 2026",
    title: "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?",
    detail: "Gasteig HP8 · Großer Saal · München · 19:00 Uhr · Eintritt frei",
    img: vortraegeImg.url,
    featured: true,
  },
  {
    type: "Video",
    date: "Online verfügbar",
    title: "Bandscheibenvorfall verstehen: Diagnose & Behandlung",
    detail: "45 Min. · Dr. med. Ralph Medele · Aufgezeichneter Vortrag",
    img: thumbBandscheibe.url,
    featured: true,
  },
  {
    type: "Artikel",
    date: "Juli 2026",
    title: "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie",
    detail: "Fachbeitrag · Neurochirurgie aktuell · Peer-reviewed",
    img: aktuellesImg.url,
    featured: true,
  },
  {
    type: "Vortrag",
    date: "22. Oktober 2026",
    title: "Chronische Rückenschmerzen: Ursachen und moderne Therapieoptionen",
    detail: "VHS München · Nymphenburger Str. · 18:30 Uhr · Eintritt frei",
    featured: false,
  },
  {
    type: "Artikel",
    date: "Mai 2026",
    title: "Spinalkanalstenose im Alter — wenn der Rücken eng wird",
    detail: "Patienteninformation · Wirbelsäulenmedizin aktuell",
    featured: false,
  },
  {
    type: "Video",
    date: "Online verfügbar",
    title: "Was ist eine periradikuläre Therapie (PRT)?",
    detail: "12 Min. · Erklärfilm für Patienten · Dr. med. Christian Eröss",
    featured: false,
  },
  {
    type: "Artikel",
    date: "März 2026",
    title: "Ischias: Wann hilft eine Injektion, wann braucht es mehr?",
    detail: "Ratgeber · Schmerzzentrum München",
    featured: false,
  },
  {
    type: "Vortrag",
    date: "5. November 2026",
    title: "Sportverletzungen der Wirbelsäule: Prävention und Therapie",
    detail: "TU München · Sportmedizin · 17:00 Uhr",
    featured: false,
  },
];

const TYPE_COLORS: Record<ItemType, { bg: string; text: string; border: string }> = {
  Vortrag: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Video: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  Artikel: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

const FILTERS: (ItemType | "Alle")[] = ["Alle", "Vortrag", "Video", "Artikel"];

function TypeBadge({ type }: { type: ItemType }) {
  const c = TYPE_COLORS[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${c.bg} ${c.text} ${c.border}`}>
      {type.toUpperCase()}
    </span>
  );
}

function PageHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="WZAS Wirbelsäulenzentrum am Stiglmaierplatz" className="h-10 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          <Link to="/beschwerden" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Rückenerkrankungen</Link>
          <Link to="/aerzte" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Ärzteteam</Link>
          <Link to="/behandlungen" className="text-sm font-medium text-[#1E2535] hover:text-[#AC8F52] transition-colors">Behandlungen</Link>
          <Link to="/aktuelles" className="text-sm font-semibold text-[#AC8F52]">Aktuelles</Link>
        </nav>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
        >
          Termin vereinbaren
        </a>
      </div>
    </header>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52]">{children}</p>;
}

function FeaturedCard({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  const { ref, style } = useFadeUp(index * 80);
  return (
    <div ref={ref} style={style} className="bg-white rounded-2xl border border-[#E2E4E7] overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      {item.img && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
            style={{ transition: `transform 600ms ${EASE}` }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <TypeBadge type={item.type} />
          <span className="text-xs text-[#8C939B]">{item.date}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-[#1E2535] leading-snug">{item.title}</h3>
        <p className="text-sm text-[#8C939B]">{item.detail}</p>
        <div className="mt-auto pt-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#AC8F52] hover:gap-2.5 transition-all duration-200"
          >
            Mehr erfahren
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ListCard({ item }: { item: (typeof ITEMS)[number] }) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-[#E2E4E7] last:border-0 group">
      <div className="shrink-0 mt-0.5">
        <TypeBadge type={item.type} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
          <h4 className="font-semibold text-[#1E2535] leading-snug group-hover:text-[#AC8F52] transition-colors duration-200">{item.title}</h4>
          <span className="text-xs text-[#8C939B] shrink-0">{item.date}</span>
        </div>
        <p className="text-sm text-[#8C939B]">{item.detail}</p>
      </div>
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg viewBox="0 0 16 16" fill="none" stroke="#AC8F52" strokeWidth="2" className="w-4 h-4">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="bg-[#1E2535] text-white py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/">
          <img src={logoAsset.url} alt="WZAS" className="h-8 w-auto brightness-0 invert opacity-80" />
        </Link>
        <p className="text-xs text-[#8C939B] text-center">
          Nymphenburger Str. 1 · 80335 München · +49 (0)89-54 34 30 30
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-[#AC8F52] hover:brightness-110 transition"
        >
          Termin vereinbaren →
        </a>
      </div>
    </footer>
  );
}

function AktuellesPage() {
  const [activeFilter, setActiveFilter] = useState<ItemType | "Alle">("Alle");
  const { ref: heroRef, style: heroStyle } = useFadeUp(0);

  const featured = ITEMS.filter((i) => i.featured);
  const rest = ITEMS.filter((i) => !i.featured);

  const filteredFeatured = activeFilter === "Alle" ? featured : featured.filter((i) => i.type === activeFilter);
  const filteredRest = activeFilter === "Alle" ? rest : rest.filter((i) => i.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <PageHeader />

      <main>
        {/* Hero */}
        <section className="bg-[#1E2535] py-20 lg:py-28 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div ref={heroRef} style={heroStyle} className="max-w-3xl">
              <SectionLabel>Aktuelles</SectionLabel>
              <h1 className="mt-4 font-display text-5xl lg:text-6xl font-semibold leading-tight text-white">
                Vorträge, Wissen{" "}
                <em className="font-display italic font-normal text-[#AC8F52]">&amp; Forschung</em>
              </h1>
              <p className="mt-6 text-lg text-[#8C939B] leading-relaxed max-w-xl">
                Unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen, Fachartikeln und Lehrvideos. Bleiben Sie über neue Behandlungsmethoden informiert.
              </p>
            </div>
          </div>
        </section>

        {/* Filter + content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    activeFilter === f
                      ? "bg-[#1E2535] text-white"
                      : "bg-white border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52] hover:text-[#AC8F52]"
                  }`}
                >
                  {f}
                  {f !== "Alle" && (
                    <span className="ml-1.5 text-xs opacity-60">
                      ({ITEMS.filter((i) => i.type === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Featured grid */}
            {filteredFeatured.length > 0 && (
              <div className="mb-12">
                <SectionLabel>Hervorgehoben</SectionLabel>
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFeatured.map((item, i) => (
                    <FeaturedCard key={item.title} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Remaining list */}
            {filteredRest.length > 0 && (
              <div>
                <SectionLabel>Weitere Beiträge</SectionLabel>
                <div className="mt-5 bg-white rounded-2xl border border-[#E2E4E7] px-6 divide-y divide-[#E2E4E7]">
                  {filteredRest.map((item) => (
                    <ListCard key={item.title} item={item} />
                  ))}
                </div>
              </div>
            )}

            {filteredFeatured.length === 0 && filteredRest.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#8C939B]">Keine Beiträge in dieser Kategorie.</p>
                <button
                  onClick={() => setActiveFilter("Alle")}
                  className="mt-4 text-sm font-semibold text-[#AC8F52]"
                >
                  Alle anzeigen →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter / alert signup stub */}
        <section className="bg-white border-y border-[#E2E4E7] py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between gap-10">
              <div className="mb-6 lg:mb-0">
                <SectionLabel>Veranstaltungshinweise</SectionLabel>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[#1E2535]">
                  Kein Vortrag verpassen
                </h2>
                <p className="mt-2 text-sm text-[#8C939B]">
                  Unsere öffentlichen Vorträge sind kostenlos und richten sich an Patienten und Angehörige.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:info@wzas.de?subject=Veranstaltungshinweise"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2535] px-6 py-3 text-sm font-semibold text-white hover:bg-[#263044] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Hinweise per E-Mail
                </a>
                <a
                  href="tel:+498954343030"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E2E4E7] px-6 py-3 text-sm font-semibold text-[#1E2535] hover:border-[#AC8F52] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +49 (0)89-54 34 30 30
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-[#1E2535] py-16 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
            <h2 className="font-display text-4xl font-semibold text-white">Wir sind für Sie da.</h2>
            <p className="mt-4 text-[#8C939B] max-w-md mx-auto">
              Termin vereinbaren — Ersttermine meist innerhalb von 5 Werktagen.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
            >
              Termin online buchen
            </a>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
