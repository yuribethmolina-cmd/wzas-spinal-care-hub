import { createFileRoute, Link } from "@tanstack/react-router";
import { doctors } from "@/lib/doctors";
import { SiteNav } from "@/components/SiteNav";
import { useT } from "@/lib/lang";
const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const TEAM_HERO = "/team-header.webp";

// First 2 = leadership (Medele + Ständer), rest = team
const LEADERSHIP = doctors.slice(0, 2);
const TEAM = doctors.slice(2);

export const Route = createFileRoute("/aerzte/")({
  head: () => ({
    meta: [
      { title: "Ärzteteam · WZAS Wirbelsäulenzentrum München" },
      { name: "description", content: "13 Spezialistinnen und Spezialisten für Wirbelsäule, Neurochirurgie, Orthopädie und Radiologie am Wirbelsäulenzentrum am Stiglmaierplatz München." },
      { property: "og:title", content: "Ärzteteam · WZAS München" },
    ],
  }),
  component: AerztePage,
});

function AerztePage() {
  const t = useT({
    de: {
      heroEyebrow: "ÄRZTETEAM · MÜNCHEN",
      heroH1: "Das Team",
      heroSub: "13 Spezialistinnen und Spezialisten für Wirbelsäulenerkrankungen, Neurochirurgie, Orthopädie und Radiologie.",
      leadershipLabel: "ÄRZTLICHE LEITUNG",
      teamLabel: "DAS TEAM",
      profileLink: "Profil ansehen",
      ctaH2: "Termin buchen",
      ctaBody: "Unser Team begleitet Sie von der Diagnose bis zur Genesung — konservativ, wenn möglich – operativ, wenn nötig.",
      ctaBtn: "Jetzt buchen",
    },
    en: {
      heroEyebrow: "MEDICAL TEAM · MUNICH",
      heroH1: "The Team",
      heroSub: "13 specialists in spinal surgery, neurosurgery, orthopaedics and radiology.",
      leadershipLabel: "MEDICAL LEADERSHIP",
      teamLabel: "OUR SPECIALISTS",
      profileLink: "View profile",
      ctaH2: "Book an appointment",
      ctaBody: "Our team accompanies you from diagnosis to recovery — conservative care when possible, surgery only when necessary.",
      ctaBtn: "Book now",
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <SiteNav />

      {/* ── Hero — team photo full-bleed ── */}
      <section className="relative h-[62vh] min-h-[460px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-[center_40%] scale-[1.02]"
          style={{ backgroundImage: `url(${TEAM_HERO})`, transition: `transform 8s ${EASE}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2535] via-[#1E2535]/40 to-[#1E2535]/5" />

        {/* Decorative gold rule */}
        <div className="absolute top-0 left-0 w-full h-px bg-[#AC8F52]/40" />

        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-7xl px-5 pb-12 lg:px-8 lg:pb-16">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#AC8F52] mb-3">
              {t.heroEyebrow}
            </p>
            <h1
              className="font-display text-white leading-[0.95]"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 500, letterSpacing: "-0.025em" }}
            >
              {t.heroH1}
            </h1>
            <p className="mt-5 text-white/65 text-base lg:text-lg max-w-xl leading-relaxed">
              {t.heroSub}
            </p>

            {/* Specialty chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Neurochirurgie", "Wirbelsäulenchirurgie", "Orthopädie", "Radiologie", "Handchirurgie"].map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/8 backdrop-blur-sm px-3.5 py-1 text-[11px] font-medium text-white/75"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#AC8F52] mb-8">
            {t.leadershipLabel}
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            {LEADERSHIP.map((d) => (
              <LeaderCard key={d.slug} d={d} profileLabel={t.profileLink} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Full team ── */}
      <section className="py-16 lg:py-20 bg-[#F8F8F6] border-t border-[#E2E4E7]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#AC8F52] mb-8">
            {t.teamLabel}
          </p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM.map((d) => (
              <TeamCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1E2535] py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <h2
            className="font-display text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            {t.ctaH2}
          </h2>
          <p className="mt-4 text-[#8C939B] max-w-md mx-auto text-sm leading-relaxed">
            {t.ctaBody}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
          >
            {t.ctaBtn}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

type DoctorType = (typeof doctors)[0];

function LeaderCard({ d, profileLabel }: { d: DoctorType; profileLabel: string }) {
  return (
    <Link
      to="/aerzte/$slug"
      params={{ slug: d.slug }}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E2E4E7] hover:border-[#AC8F52]/40 hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
    >
      {/* Photo */}
      <div className="relative w-full sm:w-[42%] aspect-[4/5] sm:aspect-auto overflow-hidden bg-[#263044] shrink-0">
        {d.photo ? (
          <img
            src={d.photo}
            alt={d.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-[#AC8F52]">
            {d.initials}
          </div>
        )}
        {/* Gold bottom rule */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#AC8F52] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-7 flex-1">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#AC8F52]">
            {d.title}
          </p>
          <h2
            className="mt-2 font-display text-[#1E2535] leading-tight"
            style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)", fontWeight: 500, letterSpacing: "-0.015em" }}
          >
            {d.name}
          </h2>
          <p className="mt-1 text-sm text-[#5F6771]">{d.role}</p>

          {/* Specialty tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {d.specialties.map((s) => (
              <span key={s} className="inline-flex items-center rounded-full border border-[#E2E4E7] bg-[#F8F8F6] px-2.5 py-1 text-[11px] text-[#1E2535] font-medium">
                {s}
              </span>
            ))}
          </div>

          {/* Focus bullets */}
          <ul className="mt-5 space-y-1.5">
            {d.focus.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[#4A5568]">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#AC8F52] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#E2E4E7] pt-5">
          <span className="text-sm font-semibold text-[#1E2535] group-hover:text-[#AC8F52] transition-colors duration-200 flex items-center gap-1.5">
            {profileLabel}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function TeamCard({ d }: { d: DoctorType }) {
  return (
    <Link
      to="/aerzte/$slug"
      params={{ slug: d.slug }}
      className="group bg-white rounded-xl overflow-hidden border border-[#E2E4E7] hover:border-[#AC8F52]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#263044]">
        {d.photo ? (
          <img
            src={d.photo}
            alt={d.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#AC8F52]">
            {d.initials}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2535]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-[#1E2535] leading-snug text-[15px] line-clamp-2">{d.name}</h3>
        <p className="mt-1 text-[11px] font-semibold tracking-wide uppercase text-[#AC8F52]">
          {d.specialties[0]}
        </p>
        <p className="mt-2.5 text-xs text-[#5F6771] leading-relaxed line-clamp-2 flex-1">
          {d.focus.slice(0, 2).join(" · ")}
        </p>
        <div className="mt-4 pt-3 border-t border-[#E2E4E7]">
          <span className="text-xs font-semibold text-[#8C939B] group-hover:text-[#AC8F52] transition-colors duration-200 flex items-center gap-1">
            Profil
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M2 7h10M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
