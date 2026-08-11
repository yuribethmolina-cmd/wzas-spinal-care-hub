import { useEffect, useState } from "react";
import { useT } from "@/lib/lang";
import { doctors } from "@/lib/doctors";

type Flow = "book" | "ask";

/**
 * Two clearly separated appointment paths (prototype — no backend):
 *  - Primary: book a real slot (long flow, ends with a confirmed date)
 *  - Secondary: send an inquiry (short flow, team replies)
 * Both simulate their steps inline with Weiter / Zurück and a final summary.
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
      next: "Weiter",
      back: "Zurück",
      finish: "Abschließen",
      restart: "Neu starten",
      close: "Schließen",
      step: (a: number, b: number) => `Schritt ${a} von ${b}`,
      chooseHint: "Bitte eine Option wählen",
      summaryTitle: "Zusammenfassung",
      bookDone: "Terminwunsch übermittelt. Sie erhalten eine Bestätigung per E-Mail.",
      askDone: "Anfrage übermittelt. Wir antworten innerhalb eines Werktags.",
      prototype: "Prototyp – es werden keine Daten gesendet.",
      bookOptions: [
        ["Gesetzlich versichert", "Privat versichert", "Selbstzahler"],
        ["Dr. Wing Mann Ho", "Dr. Christian Wolfart", "Erste freie Sprechstunde"],
        ["Mo, 17.08. · 09:30", "Di, 18.08. · 14:00", "Do, 20.08. · 11:15"],
      ],
      askOptions: [
        ["Rückenschmerzen", "Bandscheibenvorfall", "Zweitmeinung nach OP"],
        ["Antwort per E-Mail", "Rückruf gewünscht"],
        ["Ohne Anhang senden", "Befunde nachreichen"],
      ],
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
      next: "Continue",
      back: "Back",
      finish: "Finish",
      restart: "Start over",
      close: "Close",
      step: (a: number, b: number) => `Step ${a} of ${b}`,
      chooseHint: "Please select an option",
      summaryTitle: "Summary",
      bookDone: "Appointment request sent. You will receive a confirmation by email.",
      askDone: "Inquiry sent. We will reply within one business day.",
      prototype: "Prototype – no data is submitted.",
      bookOptions: [
        ["Statutory insurance", "Private insurance", "Self-payer"],
        ["Dr. Wing Mann Ho", "Dr. Christian Wolfart", "First available doctor"],
        ["Mon, Aug 17 · 09:30", "Tue, Aug 18 · 14:00", "Thu, Aug 20 · 11:15"],
      ],
      askOptions: [
        ["Back pain", "Herniated disc", "Second opinion after surgery"],
        ["Reply by email", "Please call me back"],
        ["Send without attachments", "I will send reports later"],
      ],
    },
  });

  const [flow, setFlow] = useState<Flow | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);

  const labels = flow === "ask" ? t.askSteps : t.bookSteps;
  const bookOptions = t.bookOptions.map((o, i) =>
    i === 1
      ? [...doctors.map((d) => d.name), t.bookOptions[1][t.bookOptions[1].length - 1]]
      : o,
  );
  const options = flow === "ask" ? t.askOptions : bookOptions;
  const isDoctorStep = flow === "book" && step === 1;
  const total = labels.length;
  const done = step >= total;

  useEffect(() => {
    const onStart = (e: Event) => {
      const f = (e as CustomEvent<Flow>).detail ?? "book";
      setFlow(f);
      setStep(0);
      setAnswers(Array(3).fill(null));
      document.getElementById("termin")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("wz:start-flow", onStart as EventListener);
    return () => window.removeEventListener("wz:start-flow", onStart as EventListener);
  }, []);

  function start(f: Flow) {
    setFlow(f);
    setStep(0);
    setAnswers(Array(3).fill(null));
  }
  function pick(value: string) {
    setAnswers((prev) => prev.map((a, i) => (i === step ? value : a)));
  }
  function reset() {
    setFlow(null);
    setStep(0);
    setAnswers([]);
  }

  if (flow) {
    return (
      <div className="mt-8 rounded-xl bg-[#263044] p-6 sm:p-7 border-t-2 border-[#AC8F52]">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#AC8F52] font-medium">
            {flow === "ask" ? t.askKicker : t.bookKicker}
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold text-[#A7AEBA] hover:text-white transition-colors"
          >
            {t.close}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-1.5">
          {labels.map((l, i) => (
            <span
              key={l}
              className="h-1 flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i < step || done ? "#AC8F52" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>

        {done ? (
          <div className="mt-5">
            <p className="text-white font-semibold text-lg">{t.summaryTitle}</p>
            <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {labels.map((l, i) => (
                <div key={l} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                  <dt className="text-[#A7AEBA]">{l}</dt>
                  <dd className="text-white font-medium">{answers[i]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-[#D8BE85]">{flow === "ask" ? t.askDone : t.bookDone}</p>
            <p className="mt-1 text-xs text-[#A7AEBA]">{t.prototype}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep(total - 1)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {t.back}
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] hover:brightness-110 transition"
              >
                {t.restart}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <p className="text-xs text-[#A7AEBA]">{t.step(step + 1, total)}</p>
            <p className="mt-1 text-white font-semibold text-lg">{labels[step]}</p>
            <div
              className={
                isDoctorStep
                  ? "mt-4 grid max-h-[320px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2"
                  : "mt-4 flex flex-col gap-2"
              }
            >
              {options[step].map((o) => {
                const active = answers[step] === o;
                const role = isDoctorStep ? doctors.find((d) => d.name === o)?.role : undefined;
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => pick(o)}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: active ? "rgba(172,143,82,0.18)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${active ? "#AC8F52" : "rgba(255,255,255,0.15)"}`,
                      color: active ? "#F1E4C8" : "#C8CBD2",
                    }}
                  >
                    {o}
                    {role && <span className="mt-0.5 block text-xs text-[#A7AEBA]">{role}</span>}
                  </button>
                );
              })}
            </div>
            {!answers[step] && <p className="mt-3 text-xs text-[#A7AEBA]">{t.chooseHint}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => (step === 0 ? reset() : setStep(step - 1))}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {t.back}
              </button>
              <button
                type="button"
                disabled={!answers[step]}
                onClick={() => setStep(step + 1)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === total - 1 ? t.finish : t.next}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

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
        <button
          type="button"
          onClick={() => start("book")}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#AC8F52] px-6 py-3 text-sm font-semibold text-[#1E2535] transition-[filter,transform,box-shadow] duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgba(172,143,82,0.85)]"
        >
          {t.bookCta}
        </button>
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
        <button
          type="button"
          onClick={() => start("ask")}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-[background-color,border-color,transform] duration-300 hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5"
        >
          {t.askCta}
        </button>
      </div>
    </div>
  );
}
