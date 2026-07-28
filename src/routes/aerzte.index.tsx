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

function Directory() {
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

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <SiteNav />


      <section className="bg-[#1E2535] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#AC8F52]">Ärzteverzeichnis</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Finden Sie Ihren Spezialisten</h1>
          <p className="mt-4 max-w-2xl text-[#E2E4E7] leading-relaxed">
            {doctors.length} Ärztinnen und Ärzte am Wirbelsäulenzentrum am Stiglmaierplatz. Filtern Sie nach Fachgebiet und Verfügbarkeit.
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
              placeholder="Nach Name, Fachgebiet oder Beschwerde suchen…"
              className="w-full rounded-full border border-[#E2E4E7] bg-white pl-12 pr-4 py-3 text-sm text-[#1E2535] placeholder:text-[#8C939B] focus:border-[#AC8F52] focus:outline-none"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#8C939B] font-medium mb-2">Fachgebiet</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={specialty === "Alle"} onClick={() => setSpecialty("Alle")}>Alle</FilterChip>
                {allSpecialties.map((s) => (
                  <FilterChip key={s} active={specialty === s} onClick={() => setSpecialty(s)}>{s}</FilterChip>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[#8C939B] font-medium mb-2">Verfügbarkeit</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip active={availability === "Alle"} onClick={() => setAvailability("Alle")}>Alle</FilterChip>
                {allAvailabilities.map((a) => (
                  <FilterChip key={a} active={availability === a} onClick={() => setAvailability(a)}>{a}</FilterChip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm text-[#8C939B] mb-6">
            {filtered.length} {filtered.length === 1 ? "Ergebnis" : "Ergebnisse"}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E2E4E7] bg-white p-12 text-center">
              <p className="text-[#1E2535] font-semibold">Keine Ärzte gefunden</p>
              <p className="mt-2 text-sm text-[#8C939B]">Passen Sie Ihre Filter an oder setzen Sie sie zurück.</p>
              <button
                onClick={() => { setQuery(""); setSpecialty("Alle"); setAvailability("Alle"); }}
                className="mt-4 rounded-full border border-[#1E2535] px-5 py-2 text-sm font-semibold text-[#1E2535] hover:bg-[#1E2535] hover:text-white transition"
              >
                Filter zurücksetzen
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
                    <p className="mt-1 text-xs uppercase tracking-wide text-[#AC8F52] font-medium line-clamp-1">{d.role}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 min-h-[28px]">
                      {d.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-[#F8F8F6] px-2.5 py-1 text-[11px] text-[#1E2535]">{s}</span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-[#8C939B] leading-relaxed line-clamp-2 min-h-[2.75rem] flex-1">
                      {d.focus.slice(0, 2).join(" · ")}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[#E2E4E7] flex items-center justify-between">
                      <div className="text-xs text-[#8C939B]">
                        Nächster Termin<br />
                        <span className="text-[#1E2535] font-semibold">{d.nextSlot}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#1E2535] group-hover:text-[#AC8F52] transition">
                        Profil →
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
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? "bg-[#1E2535] text-white" : "border border-[#E2E4E7] text-[#1E2535] hover:border-[#AC8F52]"
      }`}
    >
      {children}
    </button>
  );
}

function AvailabilityBadge({ availability }: { availability: Availability }) {
  const map: Record<Availability, string> = {
    "Diese Woche": "bg-emerald-500 text-white",
    "Nächste Woche": "bg-[#AC8F52] text-[#1E2535]",
    "In 2+ Wochen": "bg-white/90 text-[#1E2535]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[availability]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {availability}
    </span>
  );
}
