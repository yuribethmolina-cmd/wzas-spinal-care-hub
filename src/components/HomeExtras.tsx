import { useT } from "@/lib/lang";
import vortraegeImg from "@/assets/wzas/vortraege.webp.asset.json";

const BOOKING = "#termin";

/* ── Vortragsreihe banner ─────────────────────────────────────── */

export function Vortragsreihe() {
  const t = useT({
    de: {
      label: "Vortragsreihe",
      title: "Rücken verstehen — Vorträge für Patientinnen und Patienten",
      text:
        "Unsere Ärztinnen und Ärzte erklären regelmäßig, was hinter Bandscheibenvorfall, Spinalkanalstenose und chronischem Rückenschmerz steckt — verständlich, ohne Fachlatein, mit Zeit für Ihre Fragen.",
      cta: "Termine erfragen",
      note: "Eintritt frei · Anmeldung telefonisch",
    },
    en: {
      label: "Lecture series",
      title: "Understanding your back — talks for patients",
      text:
        "Our doctors regularly explain what lies behind a slipped disc, spinal stenosis and chronic back pain — in plain language, with time for your questions.",
      cta: "Ask for dates",
      note: "Free admission · registration by phone",
    },
  });

  return (
    <section className="bg-white border-y border-[#E2E4E7]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 sm:py-14 lg:py-20 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#7A6029] flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            {t.label}
          </p>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", fontWeight: 600 }}
          >
            {t.title}
          </h2>
          <p className="mt-4 text-[17px] text-[#4A5462] leading-relaxed max-w-xl">{t.text}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="tel:+4989543430300"
              className="inline-flex items-center rounded-full bg-[#1E2535] px-6 py-3 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.cta}
            </a>
            <span className="text-sm text-[#5B6472]">{t.note}</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={vortraegeImg.url}
            alt={t.label}
            loading="lazy"
            decoding="async"
            className="w-full h-[260px] sm:h-[320px] object-cover"
          />
          <span className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
        </div>
      </div>
    </section>
  );
}

/* ── Anfahrt / access ─────────────────────────────────────────── */

export function Anfahrt() {
  const t = useT({
    de: {
      label: "Anfahrt",
      h2a: "Mitten in München, ",
      h2b: "leicht erreichbar",
      lead: "Direkt am Stiglmaierplatz — mit U-Bahn, Tram und Bus in wenigen Minuten erreichbar.",
      items: [
        { k: "Adresse", v: "Nymphenburger Str. 1\n80335 München" },
        { k: "U-Bahn & Tram", v: "U1 / U7 Stiglmaierplatz\nTram 20, 21, 22 — Haltestelle direkt vor der Tür" },
        { k: "Mit dem Auto", v: "Parkhaus in unmittelbarer Nähe\nBarrierefreier Zugang zur Praxis" },
        { k: "Sprechzeiten", v: "Montag bis Freitag\n8.00 – 17.00 Uhr" },
      ],
      map: "In Google Maps öffnen",
      book: "Termin buchen",
    },
    en: {
      label: "Getting here",
      h2a: "Central Munich, ",
      h2b: "easy to reach",
      lead: "Right at Stiglmaierplatz — a few minutes away by underground, tram or bus.",
      items: [
        { k: "Address", v: "Nymphenburger Str. 1\n80335 Munich" },
        { k: "Underground & tram", v: "U1 / U7 Stiglmaierplatz\nTram 20, 21, 22 — stop right outside" },
        { k: "By car", v: "Car park close by\nStep-free access to the practice" },
        { k: "Opening hours", v: "Monday to Friday\n8.00 am – 5.00 pm" },
      ],
      map: "Open in Google Maps",
      book: "Book an appointment",
    },
  });

  return (
    <section id="anfahrt" className="bg-[#F1F1EE] py-14 sm:py-20 lg:py-28 border-t border-[#E2E4E7]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#7A6029] flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            {t.label}
          </p>
          <h2
            className="mt-4 font-display text-[#1E2535] leading-[1.14] sm:leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4vw, 2.9rem)", fontWeight: 500 }}
          >
            {t.h2a}
            <span style={{ fontWeight: 700 }}>{t.h2b}</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#4A5462] leading-relaxed max-w-md">{t.lead}</p>

          <dl className="mt-8 grid gap-px bg-[#E2E4E7] sm:grid-cols-2 rounded-lg overflow-hidden">
            {t.items.map((i) => (
              <div key={i.k} className="bg-white p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A6029]">{i.k}</dt>
                <dd className="mt-2 text-[16px] font-medium text-[#1E2535] leading-relaxed whitespace-pre-line">
                  {i.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nymphenburger+Str.+1+80335+M%C3%BCnchen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[#1E2535]/25 px-5 py-2.5 text-[15px] font-semibold text-[#1E2535] hover:bg-white transition-colors"
            >
              {t.map}
            </a>
            <a
              href={BOOKING}
              className="inline-flex items-center rounded-full bg-[#AC8F52] px-5 py-2.5 text-[15px] font-semibold text-[#1E2535] hover:bg-[#BC9C58] transition-colors"
            >
              {t.book}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#E2E4E7] bg-white min-h-[380px]">
          <iframe
            title="Karte — Nymphenburger Str. 1, München"
            src="https://www.openstreetmap.org/export/embed.html?bbox=11.5520%2C48.1425%2C11.5670%2C48.1505&layer=mapnik&marker=48.1466%2C11.5595"
            loading="lazy"
            className="w-full h-[380px] lg:h-[520px] border-0"
          />
        </div>
      </div>
    </section>
  );
}
