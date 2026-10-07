import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { doctors, getDoctorBySlug } from "@/lib/doctors";
import { SiteNav } from "@/components/SiteNav";
import { useLang, useT } from "@/lib/lang";
import { localizeDoctor } from "@/lib/doctor-localization";

const BOOKING_URL = "/#termin";

export const Route = createFileRoute("/aerzte/$slug")({
  loader: ({ params }) => {
    const doctor = getDoctorBySlug(params.slug);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Arzt nicht gefunden · WZAS" }, { name: "robots", content: "noindex" }] };
    }
    const d = loaderData.doctor;
    return {
      meta: [
        { title: `${d.name} · WZAS München` },
        { name: "description", content: `${d.role} am Wirbelsäulenzentrum am Stiglmaierplatz. Schwerpunkte: ${d.focus.slice(0, 3).join(", ")}.` },
        { property: "og:title", content: `${d.name} · WZAS München` },
        { property: "og:description", content: `${d.role}. Schwerpunkte: ${d.focus.slice(0, 3).join(", ")}.` },
        ...(d.photo ? [
          { property: "og:image", content: d.photo },
          { name: "twitter:image", content: d.photo },
        ] : []),
      ],
    };
  },
  component: DoctorDetail,
  notFoundComponent: DoctorNotFound,
});

function DoctorNotFound() {
  const t = useT({
    de: {
      heading: "Arzt nicht gefunden",
      body: "Der gesuchte Spezialist ist nicht in unserem Verzeichnis.",
      link: "Zum Ärzteverzeichnis",
    },
    en: {
      heading: "Doctor not found",
      body: "The specialist you are looking for is not in our directory.",
      link: "Doctor directory",
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F8F4] px-5">
      <div className="text-center max-w-md">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">404</p>
        <h1 className="mt-3 text-3xl font-bold text-[#212121]">{t.heading}</h1>
        <p className="mt-3 text-[#747474]">{t.body}</p>
        <Link to="/aerzte" className="mt-6 inline-flex rounded-[10px] bg-[#212121] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2D2D2D] transition">
          {t.link}
        </Link>
      </div>
    </div>
  );
}

/* Shared sub-components */

function FocusPills({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((f) => (
        <span
          key={f}
          className="rounded-full border border-[#212121]/12 bg-[#212121]/[0.05] px-3 py-1 text-[12px] font-medium text-[#3A3A3A]"
        >
          {f}
        </span>
      ))}
    </div>
  );
}

function BioBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-[15px] text-[#595959] leading-[1.75]">
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}

function DoctorDetail() {
  const { lang } = useLang();
  const { doctor } = Route.useLoaderData() as { doctor: import("@/lib/doctors").Doctor };
  const d = localizeDoctor(doctor, lang);
  const related = doctors
    .filter((x) => x.slug !== doctor.slug && x.specialties.some((s) => doctor.specialties.includes(s)))
    .slice(0, 3)
    .map((item) => localizeDoctor(item, lang));

  const t = useT({
    de: {
      backLink: "← Zurück zum Ärzteverzeichnis",
      bookBtn: "Termin buchen",
      focusLabel: "Schwerpunkte",
      aboutHeading: "Zur Person",
      educationLabel: "Werdegang",
      languagesLabel: "Sprachen",
      relatedHeading: "Weitere Spezialisten",
    },
    en: {
      backLink: "← Back to doctor directory",
      bookBtn: "Book an appointment",
      focusLabel: "Areas of focus",
      aboutHeading: "About",
      educationLabel: "Training & career",
      languagesLabel: "Languages",
      relatedHeading: "Other specialists",
    },
  });

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      <SiteNav />

      <div className="mx-auto max-w-[1440px] px-5 lg:px-8 py-6">
        <Link to="/aerzte" className="inline-flex items-center gap-2 text-sm text-[#747474] hover:text-[#212121]">
          {t.backLink}
        </Link>
      </div>

      <section className="mx-auto max-w-[1440px] lg:px-8 pb-16">

        {/* ── Mobile hero ─────────────────────────────────────────── */}
        <div className="lg:hidden">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#212121]">
            {d.photo ? (
              <img src={d.photo} alt={d.name} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-5xl font-bold text-[#AC8F52]">
                {d.initials}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-[#212121]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 pt-20">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">{d.title}</p>
              <h1 className="mt-2 text-3xl font-bold text-white leading-tight">{d.name}</h1>
            </div>
          </div>

          {/* Mobile content */}
          <div className="px-5 mt-6 space-y-8">
            <a
              href={BOOKING_URL}
              className="block text-center rounded-[10px] bg-[#AC8F52] px-6 py-3.5 text-sm font-semibold text-[#212121] hover:brightness-105 transition"
            >
              {t.bookBtn}
            </a>

            {d.focus.length > 0 && (
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52]">{t.focusLabel}</p>
                <FocusPills items={d.focus} />
              </div>
            )}

            <div>
              <h2 className="mb-4 text-xl font-bold text-[#212121]">{t.aboutHeading}</h2>
              <BioBlock paragraphs={d.bio} />
            </div>

            <div className="pt-6 border-t border-[#E6E3DC] grid gap-7 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52]">{t.educationLabel}</p>
                <ul className="space-y-2.5">
                  {d.education.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-[14px] text-[#212121]">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#AC8F52] shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              {d.languages.length > 0 && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52]">{t.languagesLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.languages.map((l) => (
                      <span key={l} className="rounded-[8px] bg-white border border-[#E6E3DC] px-3 py-1 text-xs text-[#212121]">{l}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Desktop layout ──────────────────────────────────────── */}
        <div className="hidden lg:grid gap-12 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr]">

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="aspect-[4/5] w-full rounded-[10px] overflow-hidden bg-[#2D2D2D] shadow-md">
              {d.photo ? (
                <img src={d.photo} alt={d.name} className="h-full w-full object-cover object-top" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-5xl font-bold text-[#AC8F52]">
                  {d.initials}
                </div>
              )}
            </div>
            <a
              href={BOOKING_URL}
              className="block text-center rounded-[10px] bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#212121] hover:brightness-105 transition"
            >
              {t.bookBtn}
            </a>
          </div>

          {/* Main content */}
          <div>
            {/* Identity */}
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">{d.title}</p>
            <h1
              className="mt-3 font-display text-[#212121] leading-tight"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700 }}
            >
              {d.name}
            </h1>

            {/* Focus pills — one clean row, no duplicate section */}
            {d.focus.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52] shrink-0">{t.focusLabel}</span>
                <FocusPills items={d.focus} />
              </div>
            )}

            <div className="mt-1 h-px bg-[#E6E3DC] my-8" />

            {/* Bio */}
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52]">{t.aboutHeading}</h2>
            <BioBlock paragraphs={d.bio} />

            {/* Education + Languages */}
            <div className="mt-10 pt-8 border-t border-[#E6E3DC] grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52]">{t.educationLabel}</p>
                <ul className="space-y-3">
                  {d.education.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-[14px] text-[#212121] leading-snug">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#AC8F52] shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              {d.languages.length > 0 && (
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AC8F52]">{t.languagesLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.languages.map((l) => (
                      <span key={l} className="rounded-[8px] bg-white border border-[#E6E3DC] px-3 py-1.5 text-[13px] text-[#212121]">{l}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related specialists */}
      {related.length > 0 && (
        <section className="bg-white py-16 border-t border-[#E6E3DC]">
          <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AC8F52] mb-6">{t.relatedHeading}</p>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/aerzte/$slug"
                  params={{ slug: r.slug }}
                  className="group flex items-center gap-4 bg-[#F9F8F4] border border-[#E6E3DC] hover:border-[#AC8F52]/40 rounded-[10px] p-4 transition"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#2D2D2D] shrink-0">
                    {r.photo ? (
                      <img src={r.photo} alt={r.name} className="h-full w-full object-cover object-top" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-lg font-bold text-[#AC8F52]">{r.initials}</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-[#AC8F52] font-medium truncate">{r.specialties[0]}</p>
                    <p className="mt-0.5 text-[14px] font-semibold text-[#212121] group-hover:text-[#AC8F52] transition leading-snug">{r.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
