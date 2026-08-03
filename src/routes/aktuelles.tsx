import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState } from "react";
import aktuellesImg from "@/assets/wzas/aktuelles.jpg.asset.json";
import vortraegeImg from "@/assets/wzas/vortraege.webp.asset.json";
import thumbBandscheibe from "@/assets/wzas/thumb-bandscheibe.webp.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { PageFooter } from "@/components/wzas/PageFooter";
import { useLang, useT } from "@/lib/lang";

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
      { name: "description", content: "Vorträge, Veröffentlichungen und Neuigkeiten von den Spezialisten des Wirbelsäulenzentrum am Stiglmaierplatz. Bleiben Sie informiert über neue Behandlungsmethoden und Veranstaltungen." },
      { property: "og:title", content: "Aktuelles · WZAS München" },
    ],
  }),
  component: AktuellesPage,
});

type ItemType = "Vortrag" | "Veröffentlichung" | "Pressemitteilung";

type Item = {
  type: ItemType;
  featured?: boolean;
  img?: string;
  de: { date: string; title: string; detail: string };
  en: { date: string; title: string; detail: string };
};

const ITEMS: Item[] = [
  {
    type: "Vortrag",
    img: vortraegeImg.url,
    featured: true,
    de: {
      date: "15. September 2026",
      title: "Rücken ohne OP: Wann ist Chirurgie wirklich nötig?",
      detail: "Gasteig HP8 · Großer Saal · München · 19:00 Uhr · Eintritt frei",
    },
    en: {
      date: "15 September 2026",
      title: "Back without surgery: when is an operation really necessary?",
      detail: "Gasteig HP8 · Grand Hall · Munich · 7:00 pm · Free admission",
    },
  },
  {
    type: "Veröffentlichung",
    img: thumbBandscheibe.url,
    featured: true,
    de: {
      date: "Online verfügbar",
      title: "Bandscheibenvorfall verstehen: Diagnose & Behandlung",
      detail: "Aufgezeichnete Vortragsreihe · Neurochirurgie aktuell · Dr. med. Ralph Medele",
    },
    en: {
      date: "Available online",
      title: "Understanding a herniated disc: diagnosis & treatment",
      detail: "Recorded lecture series · Neurochirurgie aktuell · Dr. med. Ralph Medele",
    },
  },
  {
    type: "Veröffentlichung",
    img: aktuellesImg.url,
    featured: true,
    de: {
      date: "Juli 2026",
      title: "Neue minimalinvasive Techniken in der Wirbelsäulenchirurgie",
      detail: "Fachbeitrag · Neurochirurgie aktuell · Peer-reviewed",
    },
    en: {
      date: "July 2026",
      title: "New minimally invasive techniques in spinal surgery",
      detail: "Journal article · Neurochirurgie aktuell · Peer-reviewed",
    },
  },
  {
    type: "Vortrag",
    featured: false,
    de: {
      date: "22. Oktober 2026",
      title: "Chronische Rückenschmerzen: Ursachen und moderne Therapieoptionen",
      detail: "VHS München · Nymphenburger Str. · 18:30 Uhr · Eintritt frei",
    },
    en: {
      date: "22 October 2026",
      title: "Chronic back pain: causes and modern treatment options",
      detail: "VHS Munich · Nymphenburger Str. · 6:30 pm · Free admission",
    },
  },
  {
    type: "Veröffentlichung",
    featured: false,
    de: {
      date: "Mai 2026",
      title: "Spinalkanalstenose im Alter — wenn der Rücken eng wird",
      detail: "Patienteninformation · Wirbelsäulenmedizin aktuell",
    },
    en: {
      date: "May 2026",
      title: "Spinal stenosis in old age — when the back tightens",
      detail: "Patient information · Wirbelsäulenmedizin aktuell",
    },
  },
  {
    type: "Pressemitteilung",
    featured: false,
    de: {
      date: "Juni 2026",
      title: "WZAS erneut TÜV-zertifiziert",
      detail: "Qualitätssicherung · TÜV Rheinland · Wiederholungs-Zertifizierung 2026",
    },
    en: {
      date: "June 2026",
      title: "WZAS TÜV-certified again",
      detail: "Quality assurance · TÜV Rheinland · Repeat certification 2026",
    },
  },
  {
    type: "Veröffentlichung",
    featured: false,
    de: {
      date: "März 2026",
      title: "Ischias: Wann hilft eine Injektion, wann braucht es mehr?",
      detail: "Ratgeber · Wirbelsäulenmedizin aktuell",
    },
    en: {
      date: "March 2026",
      title: "Sciatica: when does an injection help, when is more needed?",
      detail: "Guide · Wirbelsäulenmedizin aktuell",
    },
  },
  {
    type: "Vortrag",
    featured: false,
    de: {
      date: "5. November 2026",
      title: "Sportverletzungen der Wirbelsäule: Prävention und Therapie",
      detail: "TU München · Sportmedizin · 17:00 Uhr",
    },
    en: {
      date: "5 November 2026",
      title: "Spinal sports injuries: prevention and therapy",
      detail: "TU Munich · Sports Medicine · 5:00 pm",
    },
  },
];

const TYPE_COLORS: Record<ItemType, { bg: string; text: string; border: string }> = {
  Vortrag: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Veröffentlichung: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Pressemitteilung: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

const TYPE_EN: Record<ItemType, string> = {
  Vortrag: "Talk",
  Veröffentlichung: "Publication",
  Pressemitteilung: "Press release",
};

const FILTERS: (ItemType | "Alle")[] = ["Alle", "Vortrag", "Veröffentlichung", "Pressemitteilung"];

function TypeBadge({ type }: { type: ItemType }) {
  const { lang } = useLang();
  const c = TYPE_COLORS[type];
  const label = lang === "en" ? TYPE_EN[type] : type;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${c.bg} ${c.text} ${c.border}`}>
      {label.toUpperCase()}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#AC8F52]">{children}</p>;
}

function FeaturedCard({ item, index }: { item: Item; index: number }) {
  const { lang } = useLang();
  const t = useT({ de: { learnMore: "Mehr erfahren" }, en: { learnMore: "Learn more" } });
  const { ref, style } = useFadeUp(index * 80);
  const c = lang === "en" ? item.en : item.de;
  return (
    <div ref={ref} style={style} className="bg-white rounded-2xl border border-[#E2E4E7] overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      {item.img && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={item.img}
            alt={c.title}
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
          <span className="text-xs text-[#8C939B]">{c.date}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-[#1E2535] leading-snug">{c.title}</h3>
        <p className="text-sm text-[#8C939B]">{c.detail}</p>
        <div className="mt-auto pt-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#AC8F52] hover:gap-2.5 transition-all duration-200"
          >
            {t.learnMore}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ListCard({ item }: { item: Item }) {
  const { lang } = useLang();
  const c = lang === "en" ? item.en : item.de;
  return (
    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 py-5 border-b border-[#E2E4E7] last:border-0 group">
      <div className="flex w-full sm:w-auto items-center justify-between gap-3 sm:block shrink-0 sm:mt-0.5">
        <TypeBadge type={item.type} />
        <span className="text-xs text-[#8C939B] sm:hidden">{c.date}</span>
      </div>
      <div className="flex-1 min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
          <h4 className="font-semibold text-[#1E2535] leading-snug group-hover:text-[#AC8F52] transition-colors duration-200 break-words">{c.title}</h4>
          <span className="hidden sm:inline text-xs text-[#8C939B] shrink-0">{c.date}</span>
        </div>
        <p className="text-sm text-[#8C939B] break-words">{c.detail}</p>
      </div>
      <div className="hidden sm:block shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg viewBox="0 0 16 16" fill="none" stroke="#AC8F52" strokeWidth="2" className="w-4 h-4">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

  );
}

function AktuellesPage() {
  const { lang } = useLang();
  const t = useT({
    de: {
      eyebrow: "Aktuelles",
      h1Main: "Vorträge, Wissen",
      h1Italic: "& Forschung",
      heroPara: "Unsere Spezialisten teilen ihr Wissen in öffentlichen Vorträgen, Fachartikeln und Lehrvideos. Bleiben Sie über neue Behandlungsmethoden informiert.",
      filterAll: "Alle",
      filterTypes: { Vortrag: "Vortrag", Veröffentlichung: "Veröffentlichung", Pressemitteilung: "Pressemitteilung" } as Record<ItemType, string>,
      featured: "Hervorgehoben",
      morePosts: "Weitere Beiträge",
      empty: "Keine Beiträge in dieser Kategorie.",
      showAll: "Alle anzeigen →",
      newsletterLabel: "Veranstaltungshinweise",
      newsletterH2: "Kein Vortrag verpassen",
      newsletterBody: "Unsere öffentlichen Vorträge sind kostenlos und richten sich an Patienten und Angehörige.",
      newsletterEmail: "Hinweise per E-Mail",
      ctaH2: "Wir sind für Sie da.",
      ctaBody: "Termin vereinbaren — Notfälle behandeln wir sofort.",
      ctaBtn: "Termin online buchen",
    },
    en: {
      eyebrow: "Latest news",
      h1Main: "Talks, Knowledge",
      h1Italic: "& Research",
      heroPara: "Our specialists share their knowledge through public talks, journal articles and educational videos. Stay informed about new treatment methods.",
      filterAll: "All",
      filterTypes: { Vortrag: "Talk", Veröffentlichung: "Publication", Pressemitteilung: "Press release" } as Record<ItemType, string>,
      featured: "Featured",
      morePosts: "More articles",
      empty: "No content in this category.",
      showAll: "Show all →",
      newsletterLabel: "Event announcements",
      newsletterH2: "Never miss a talk",
      newsletterBody: "Our public talks are free of charge and open to patients and their families.",
      newsletterEmail: "Get notified by email",
      ctaH2: "We are here for you.",
      ctaBody: "Book an appointment — emergencies treated immediately.",
      ctaBtn: "Book appointment online",
    },
  });

  const [activeFilter, setActiveFilter] = useState<ItemType | "Alle">("Alle");
  const { ref: heroRef, style: heroStyle } = useFadeUp(0);

  const featured = ITEMS.filter((i) => i.featured);
  const rest = ITEMS.filter((i) => !i.featured);

  const filteredFeatured = activeFilter === "Alle" ? featured : featured.filter((i) => i.type === activeFilter);
  const filteredRest = activeFilter === "Alle" ? rest : rest.filter((i) => i.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <SiteNav />

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
              <SectionLabel>{t.eyebrow}</SectionLabel>
              <h1 className="mt-4 font-display text-5xl lg:text-6xl font-semibold leading-tight text-white">
                {t.h1Main}{" "}
                <em className="font-display italic font-normal text-[#AC8F52]">{t.h1Italic}</em>
              </h1>
              <p className="mt-6 text-lg text-[#8C939B] leading-relaxed max-w-xl">
                {t.heroPara}
              </p>
            </div>
          </div>
        </section>

        {/* Filter + content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
              {FILTERS.map((f) => {
                const label = f === "Alle" ? t.filterAll : t.filterTypes[f as ItemType];
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      activeFilter === f
                        ? "bg-[#1E2535] text-white"
                        : "bg-white border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52] hover:text-[#AC8F52]"
                    }`}
                  >
                    {label}
                    {f !== "Alle" && (
                      <span className="ml-1.5 text-xs opacity-60">
                        ({ITEMS.filter((i) => i.type === f).length})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Featured grid */}
            {filteredFeatured.length > 0 && (
              <div className="mb-12">
                <SectionLabel>{t.featured}</SectionLabel>
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFeatured.map((item, i) => (
                    <FeaturedCard key={item.de.title} item={item} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Remaining list */}
            {filteredRest.length > 0 && (
              <div>
                <SectionLabel>{t.morePosts}</SectionLabel>
                <div className="mt-5 bg-white rounded-2xl border border-[#E2E4E7] px-4 sm:px-6 divide-y divide-[#E2E4E7]">
                  {filteredRest.map((item) => (
                    <ListCard key={item.de.title} item={item} />
                  ))}
                </div>
              </div>
            )}

            {filteredFeatured.length === 0 && filteredRest.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#8C939B]">{t.empty}</p>
                <button
                  onClick={() => setActiveFilter("Alle")}
                  className="mt-4 text-sm font-semibold text-[#AC8F52]"
                >
                  {t.showAll}
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
                <SectionLabel>{t.newsletterLabel}</SectionLabel>
                <h2 className="mt-3 font-display text-3xl font-semibold text-[#1E2535]">
                  {t.newsletterH2}
                </h2>
                <p className="mt-2 text-sm text-[#8C939B]">
                  {t.newsletterBody}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:info@wzas.de?subject=${lang === "en" ? "Event+announcements" : "Veranstaltungshinweise"}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2535] px-6 py-3 text-sm font-semibold text-white hover:bg-[#263044] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t.newsletterEmail}
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
            <h2 className="font-display text-4xl font-semibold text-white">{t.ctaH2}</h2>
            <p className="mt-4 text-[#8C939B] max-w-md mx-auto">
              {t.ctaBody}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
            >
              {t.ctaBtn}
            </a>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
