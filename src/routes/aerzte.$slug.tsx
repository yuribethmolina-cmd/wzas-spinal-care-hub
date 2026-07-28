import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { doctors, getDoctorBySlug } from "@/lib/doctors";
import { SiteNav } from "@/components/SiteNav";

const BOOKING_URL = "https://onlinerezeption.vercel.app";


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
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6] px-5">
      <div className="text-center max-w-md">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">404</p>
        <h1 className="mt-3 text-3xl font-bold text-[#1E2535]">Arzt nicht gefunden</h1>
        <p className="mt-3 text-[#8C939B]">Der gesuchte Spezialist ist nicht in unserem Verzeichnis.</p>
        <Link to="/aerzte" className="mt-6 inline-flex rounded-full bg-[#1E2535] px-6 py-3 text-sm font-semibold text-white hover:bg-[#263044] transition">
          Zum Ärzteverzeichnis
        </Link>
      </div>
    </div>
  );
}

function DoctorDetail() {
  const { doctor: d } = Route.useLoaderData() as { doctor: import("@/lib/doctors").Doctor };
  const related = doctors.filter((x) => x.slug !== d.slug && x.specialties.some((s) => d.specialties.includes(s))).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="WZAS" className="h-10 w-auto" />
          </Link>
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

      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6">
        <Link to="/aerzte" className="inline-flex items-center gap-2 text-sm text-[#8C939B] hover:text-[#1E2535]">
          <span>←</span> Zurück zum Ärzteverzeichnis
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr]">
          <div>
            <div className="mx-auto aspect-square w-40 sm:w-52 md:w-60 lg:w-full lg:aspect-[4/5] lg:max-w-[300px] rounded-2xl overflow-hidden bg-[#263044] shadow-lg">
              {d.photo ? (
                <img src={d.photo} alt={d.name} className="h-full w-full object-cover object-top" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-4xl lg:text-5xl font-bold text-[#AC8F52]">
                  {d.initials}
                </div>
              )}
            </div>
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">Nächster Termin</p>
              <p className="mt-2 text-2xl font-bold text-[#1E2535]">{d.nextSlot}</p>
              <p className="mt-1 text-sm text-[#8C939B]">{d.availability}</p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block text-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
              >
                Termin buchen
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">{d.title}</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[#1E2535]">{d.name}</h1>
            <p className="mt-3 text-lg text-[#8C939B]">{d.role}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {d.specialties.map((s) => (
                <span key={s} className="rounded-full bg-white border border-[#E2E4E7] px-3 py-1.5 text-xs font-medium text-[#1E2535]">{s}</span>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-[#1E2535]">Schwerpunkte</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {d.focus.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#1E2535]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#AC8F52] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-[#1E2535]">Zur Person</h2>
              <div className="mt-4 space-y-4 text-[15px] text-[#1E2535] leading-relaxed">
                {d.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm uppercase tracking-wide text-[#AC8F52] font-semibold">Werdegang</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#1E2535]">
                  {d.education.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E2535] shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wide text-[#AC8F52] font-semibold">Sprachen</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.languages.map((l) => (
                    <span key={l} className="rounded-full bg-white border border-[#E2E4E7] px-3 py-1 text-xs text-[#1E2535]">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16 border-t border-[#E2E4E7]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E2535]">Verwandte Spezialisten</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/aerzte/$slug"
                  params={{ slug: r.slug }}
                  className="group bg-[#F8F8F6] rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-square sm:aspect-[4/5] bg-[#263044] overflow-hidden">
                    {r.photo ? (
                      <img src={r.photo} alt={r.name} className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-[#AC8F52]">{r.initials}</div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-[#AC8F52] font-medium">{r.specialties[0]}</p>
                    <p className="mt-2 font-semibold text-[#1E2535] group-hover:text-[#AC8F52] transition">{r.name}</p>
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
