import { useT } from "@/lib/lang";
import { BOOKING_URL, INQUIRY_URL } from "@/routes/-home-constants";

/**
 * Two clearly separated appointment paths:
 *  - Primary: book a real slot (long flow, ends with a confirmed date)
 *  - Secondary: send an inquiry (short flow, team replies)
 */
export function AppointmentChoice() {
  const t = useT({
    de: {
      bookKicker: "Online buchen",
      bookTitle: "Termin online vereinbaren",
      bookSteps: ["Versicherung wählen", "Arzt & Sprechstunde", "Datum und Uhrzeit"],
      bookMeta: "ca. 2 Minuten · sofortige Bestätigung",
      bookCta: "Termin buchen",
      askKicker: "Anfrage",
      askTitle: "Frage stellen – ohne festen Termin",
      askSteps: ["Anliegen beschreiben", "Kontaktdaten angeben", "Absenden"],
      askMeta: "Antwort innerhalb eines Werktags",
      askCta: "Anfrage senden",
    },
    en: {
      bookKicker: "Book online",
      bookTitle: "Schedule an appointment online",
      bookSteps: ["Choose your insurance", "Doctor & consultation", "Date and time"],
      bookMeta: "approx. 2 minutes · instant confirmation",
      bookCta: "Book appointment",
      askKicker: "Inquiry",
      askTitle: "Ask a question – no fixed date",
      askSteps: ["Describe your concern", "Add your contact details", "Send"],
      askMeta: "Reply within one business day",
      askCta: "Send inquiry",
    },
  });

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {/* Primary — real booking */}
      <div className="flex flex-col rounded-xl bg-[#263044] p-6 sm:p-7 border-t-2 border-[#AC8F52]">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-[#AC8F52]" />
          {t.bookKicker}
        </p>
        <p className="mt-3 text-white font-semibold text-lg leading-snug">{t.bookTitle}</p>
        <ol className="mt-4 space-y-2 text-sm text-[#C8CBD2]">
          {t.bookSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#AC8F52]/20 text-[11px] font-semibold text-[#D8BE85]">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-[#A7AEBA]">{t.bookMeta}</p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] transition-[filter,transform,box-shadow] duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(172,143,82,0.85)]"
        >
          {t.bookCta}
        </a>
      </div>

      {/* Secondary — inquiry */}
      <div className="flex flex-col rounded-xl border border-white/15 bg-white/[0.03] p-6 sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#A7AEBA] font-medium flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-[#A7AEBA]" />
          {t.askKicker}
        </p>
        <p className="mt-3 text-white font-semibold text-lg leading-snug">{t.askTitle}</p>
        <ol className="mt-4 space-y-2 text-sm text-[#C8CBD2]">
          {t.askSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-2.5">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/80">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-[#A7AEBA]">{t.askMeta}</p>
        <a
          href={INQUIRY_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-[background-color,border-color,transform] duration-300 hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5"
        >
          {t.askCta}
        </a>
      </div>
    </div>
  );
}
