import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  doctors,
  allSpecialties,
  allAvailabilities,
  type Specialty,
  type Availability,
} from "@/lib/doctors";
import { SiteNav } from "@/components/SiteNav";
import { useLang, useT } from "@/lib/lang";

export const Route = createFileRoute("/aerzte/")({
  head: () => ({
    meta: [
      { title: "Ärzteverzeichnis · WZAS München" },
      { name: "description", content: "Unser Ärzteverzeichnis: 13 Spezialisten für Wirbelsäule, Neurochirurgie und Orthopädie. Filtern Sie nach Fachgebiet und Verfügbarkeit." },
      { property: "og:title", content: "Ärzteverzeichnis · WZAS München" },
      { property: "og:description", content: "Finden Sie den richtigen Spezialisten am Wirbelsäulenzentrum am Stiglmaierplatz." },
    ],
  }),
  component: Directory,
});

const AVAIL_EN: Record<Availability, string> = {
  "Diese Woche": "This week",
  "Nächste Woche": "Next week",
  "In 2+ Wochen": "In 2+ weeks",
};

function Directory() {
  const { lang } = useLang();
  const t = useT({
    de: {
      eyebrow: "Ärzteverzeichnis",
      h1: "Finden Sie Ihren Spezialisten",
      heroPara: (count: number) =>
        `${count} Ärztinnen und Ärzte am Wirbelsäulenzentrum am Stiglmaierplatz. Filtern Sie nach Fachgebiet und Verfügbarkeit.`,
      searchPlaceholder: "Nach Name, Fachgebiet oder Beschwerde suchen…",
      labelSpecialty: "Fachgebiet",
      labelAvailability: "Verfügbarkeit",
      filterAll: "Alle",
      resultsSingular: (n: number) => `${n} Ergebnis`,
      resultsPlural: (n: number) => `${n} Ergebnisse`,
      emptyHeading: "Keine Ärzte gefunden",
      emptyBody: "Passen Sie Ihre Filter an oder setzen Sie sie zurück.",
      resetBtn: "Filter zurücksetzen",
      nextAppt: "Nächster Termin",
      profile: "Profil",
    },
    en: {
      eyebrow: "Doctor directory",
      h1: "Find your specialist",
      heroPara: (count: number) =>
        `${count} doctors at the Spine Centre at Stiglmaierplatz. Filter by specialty and availability.`,
      searchPlaceholder: "Search by name, specialty or condition…",
      labelSpecialty: "Specialty",
      labelAvailability: "Availability",
      filterAll: "All",
      resultsSingular: (n: number) => `${n} result`,
      resultsPlural: (n: number) => `${n} results`,
      emptyHeading: "No doctors found",
      emptyBody: "Adjust your filters or reset them.",
      resetBtn: "Reset filters",
      nextAppt: "Next appointment",
      profile: "Profile",
    },
  });

  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<Specialty | "Alle">("Alle");
  const [availability, setAvailability] = useState<Availability | "Alle">("Alle");

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      if (specialty !== "Alle" && !d.specialties.includes(specialty)) return false;
      if (availability !== "Alle" && d.availability !== availability) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = [d.name, d.role, ...d.focus, ...d.specialties].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, specialty, availability]);

  const resultCount =
    filtered.length === 1
      ? t.resultsSingular(filtered.length)
      : t.resultsPlural(filtered.length);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <SiteNav />

      <section className="bg-[#1E2535] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AC8F52]">{t.eyebrow}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t.h1}</h1>
          <p className="mt-4 max-w-2xl text-[#E2E4E7] leading-relaxed">
            {t.heroPara(doctors.length)}
          </p>
        </div>
      </section>

      <section className="border-b border-[#E2E4E7] bg-white py-6 sticky top-[72px] z-30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-4">
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C939B]">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full border border-[#E2E4E7] bg-white pl-12 pr-4 py-3 text-sm text-[#1E2535] placeholder:text-[#8C939B] focus:border-[#AC8F52] focus:outline-none"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#5F6771] font-medium mb-2">{t.labelSpecialty}</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={specialty === "Alle"} onClick={() => setSpecialty("Alle")}>{t.filterAll}</FilterChip>
                {allSpecialties.map((s) => (
                  <FilterChip key={s} active={specialty === s} onClick={() => setSpecialty(s)}>{s}</FilterChip>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#5F6771] font-medium mb-2">{t.labelAvailability}</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={availability === "Alle"} onClick={() => setAvailability("Alle")}>{t.filterAll}</FilterChip>
                {allAvailabilities.map((a) => (
                  <FilterChip key={a} active={availability === a} onClick={() => setAvailability(a)}>
                    {lang === "en" ? AVAIL_EN[a] : a}
                  </FilterChip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm text-[#5F6771] mb-6">{resultCount}</p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E2E4E7] bg-white p-12 text-center">
              <p className="text-[#1E2535] font-semibold">{t.emptyHeading}</p>
              <p className="mt-2 text-sm text-[#8C939B]">{t.emptyBody}</p>
              <button
                onClick={() => { setQuery(""); setSpecialty("Alle"); setAvailability("Alle"); }}
                className="mt-4 rounded-full border border-[#1E2535] px-5 py-2 text-sm font-semibold text-[#1E2535] hover:bg-[#1E2535] hover:text-white transition"
              >
                {t.resetBtn}
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filtered.map((d) => (
                <Link
                  key={d.slug}
                  to="/aerzte/$slug"
                  params={{ slug: d.slug }}
                  className="group h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >
                  <div className="relative aspect-[4/5] w-full bg-[#263044] overflow-hidden shrink-0">
                    {d.photo ? (
                      <img src={d.photo} alt={d.name} className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#AC8F52]">
                        {d.initials}
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <AvailabilityBadge availability={d.availability} />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg text-[#1E2535] line-clamp-1">{d.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-[#7A6029] font-medium line-clamp-1">{d.role}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 min-h-[28px]">
                      {d.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-[#F8F8F6] px-2.5 py-1 text-[11px] text-[#1E2535]">{s}</span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-[#5F6771] leading-relaxed line-clamp-2 min-h-[2.75rem] flex-1">
                      {d.focus.slice(0, 2).join(" · ")}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[#E2E4E7] flex items-center justify-between">
                      <div className="text-xs text-[#5F6771]">
                        {t.nextAppt}<br />
                        <span className="text-[#1E2535] font-semibold">{d.nextSlot}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#1E2535] group-hover:text-[#AC8F52] transition">
                        {t.profile} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-11 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? "bg-[#1E2535] text-white" : "border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52]"
      }`}
    >
      {children}
    </button>
  );
}

function AvailabilityBadge({ availability }: { availability: Availability }) {
  const { lang } = useLang();
  const map: Record<Availability, string> = {
    "Diese Woche": "bg-emerald-700 text-white",
    "Nächste Woche": "bg-[#AC8F52] text-[#1E2535]",
    "In 2+ Wochen": "bg-white/90 text-[#1E2535]",
  };
  const label = lang === "en" ? AVAIL_EN[availability] : availability;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[availability]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}
