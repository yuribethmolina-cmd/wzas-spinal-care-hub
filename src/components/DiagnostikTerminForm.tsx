import React, { useMemo, useState } from "react";
import { z } from "zod";
import { useT } from "@/lib/lang";

const PRAXIS_EMAIL = "info@wzas.de";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  birthdate: z.string().trim().max(20).optional().or(z.literal("")),
  insurance: z.enum(["gesetzlich", "privat", "selbstzahler"]),
  concern: z.string().trim().min(1).max(120),
  availability: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true),
});

type FieldKey = "name" | "email" | "phone" | "birthdate" | "insurance" | "concern" | "availability" | "message" | "consent";

const inputCls =
  "w-full rounded-lg border border-[#E2E4E7] bg-white px-4 py-3 text-[15px] text-[#1E2535] outline-none transition focus:border-[#AC8F52] focus:ring-2 focus:ring-[#AC8F52]/25 placeholder:text-[#98A0AA]";
const labelCls = "block text-sm font-medium text-[#1E2535]";

export function DiagnostikTerminForm() {
  const t = useT({
    de: {
      eyebrow: "Terminvereinbarung",
      heading: "Termin für die Rückendiagnostik anfragen",
      sub: "Senden Sie uns Ihre Anfrage direkt – ohne externe Buchungsportale. Wir melden uns in der Regel innerhalb eines Werktages mit einem Terminvorschlag.",
      name: "Vor- und Nachname",
      namePh: "Maria Musterfrau",
      email: "E-Mail",
      phone: "Telefon (optional)",
      birthdate: "Geburtsdatum (optional)",
      birthdatePh: "TT.MM.JJJJ",
      insurance: "Versicherung",
      insuranceOpts: { gesetzlich: "Gesetzlich versichert", privat: "Privat versichert", selbstzahler: "Selbstzahler" },
      concern: "Anliegen",
      concernOpts: [
        "Erstuntersuchung Wirbelsäule",
        "MRT / CT im Haus",
        "Befundbesprechung vorhandener Bilder",
        "Zweitmeinung",
        "Sonstiges",
      ],
      availability: "Wunschzeiten (optional)",
      availabilityPh: "z. B. Montag oder Donnerstag vormittags",
      message: "Ihre Beschwerden / Nachricht (optional)",
      messagePh: "Kurz beschrieben: seit wann, wo, was verschlimmert die Schmerzen …",
      consent:
        "Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Terminanfrage verwendet werden.",
      submit: "Anfrage per E-Mail senden",
      note: "Ihre Anfrage öffnet sich in Ihrem E-Mail-Programm und wird an info@wzas.de gesendet. Bitte keine Notfälle über dieses Formular – im Notfall wählen Sie 112.",
      sent: "Ihre E-Mail wurde vorbereitet",
      sentBody:
        "Bitte senden Sie die geöffnete E-Mail ab. Falls sich kein E-Mail-Programm geöffnet hat, schreiben Sie uns direkt an info@wzas.de.",
      again: "Neue Anfrage",
      subject: "Terminanfrage Rückendiagnostik",
      errRequired: "Bitte ausfüllen",
      errEmail: "Bitte eine gültige E-Mail-Adresse angeben",
      errConsent: "Bitte bestätigen Sie die Einwilligung",
      labels: {
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        birthdate: "Geburtsdatum",
        insurance: "Versicherung",
        concern: "Anliegen",
        availability: "Wunschzeiten",
        message: "Nachricht",
      },
    },
    en: {
      eyebrow: "Appointment request",
      heading: "Request a spine diagnostics appointment",
      sub: "Send your request directly – no external booking portals. We usually reply within one working day with a proposed appointment.",
      name: "First and last name",
      namePh: "Maria Sample",
      email: "Email",
      phone: "Phone (optional)",
      birthdate: "Date of birth (optional)",
      birthdatePh: "DD.MM.YYYY",
      insurance: "Insurance",
      insuranceOpts: { gesetzlich: "Statutory insurance", privat: "Private insurance", selbstzahler: "Self-payer" },
      concern: "Reason for your visit",
      concernOpts: [
        "First spine consultation",
        "On-site MRI / CT",
        "Review of existing images",
        "Second opinion",
        "Other",
      ],
      availability: "Preferred times (optional)",
      availabilityPh: "e.g. Monday or Thursday mornings",
      message: "Your symptoms / message (optional)",
      messagePh: "Briefly: since when, where, what makes the pain worse …",
      consent: "I agree that my data may be used to process my appointment request.",
      submit: "Send request by email",
      note: "Your request opens in your email client and is sent to info@wzas.de. Please do not use this form for emergencies – in an emergency call 112.",
      sent: "Your email has been prepared",
      sentBody:
        "Please send the email that just opened. If no email client opened, write to us directly at info@wzas.de.",
      again: "New request",
      subject: "Appointment request – spine diagnostics",
      errRequired: "Please fill in this field",
      errEmail: "Please enter a valid email address",
      errConsent: "Please confirm your consent",
      labels: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        birthdate: "Date of birth",
        insurance: "Insurance",
        concern: "Reason",
        availability: "Preferred times",
        message: "Message",
      },
    },
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    insurance: "gesetzlich" as "gesetzlich" | "privat" | "selbstzahler",
    concern: "",
    availability: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [sent, setSent] = useState(false);

  const concernOptions = useMemo(() => t.concernOpts, [t]);

  function set<K extends keyof typeof values>(key: K, v: (typeof values)[K]) {
    setValues((p) => ({ ...p, [key]: v }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
        next[key] =
          key === "consent" ? t.errConsent : key === "email" ? t.errEmail : t.errRequired;
      }
      setErrors(next);
      return;
    }
    const d = parsed.data;
    const lines = [
      `${t.labels.name}: ${d.name}`,
      `${t.labels.email}: ${d.email}`,
      d.phone ? `${t.labels.phone}: ${d.phone}` : "",
      d.birthdate ? `${t.labels.birthdate}: ${d.birthdate}` : "",
      `${t.labels.insurance}: ${t.insuranceOpts[d.insurance]}`,
      `${t.labels.concern}: ${d.concern}`,
      d.availability ? `${t.labels.availability}: ${d.availability}` : "",
      "",
      d.message ? `${t.labels.message}:\n${d.message}` : "",
    ].filter(Boolean);

    const href = `mailto:${PRAXIS_EMAIL}?subject=${encodeURIComponent(
      `${t.subject} – ${d.name}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <section id="termin-diagnostik" className="scroll-mt-24 border-t border-[#E2E4E7] bg-[#F8F8F6] py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AC8F52]">{t.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-[#1E2535] lg:text-4xl">
          {t.heading}
        </h2>
        <p className="mt-3 text-[#5F6771]">{t.sub}</p>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-[#AC8F52]/40 bg-white p-6 lg:p-8">
            <h3 className="font-display text-xl font-semibold text-[#1E2535]">{t.sent}</h3>
            <p className="mt-2 text-[#4A5568]">{t.sentBody}</p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#7A6029] transition hover:brightness-110"
            >
              {t.again}
              <span aria-hidden>→</span>
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="mt-8 rounded-2xl border border-[#E2E4E7] bg-white p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="dtf-name">{t.name}</label>
                <input
                  id="dtf-name"
                  className={`mt-1.5 ${inputCls}`}
                  value={values.name}
                  maxLength={100}
                  placeholder={t.namePh}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-[#B4443B]">{errors.name}</p>}
              </div>

              <div>
                <label className={labelCls} htmlFor="dtf-email">{t.email}</label>
                <input
                  id="dtf-email"
                  type="email"
                  className={`mt-1.5 ${inputCls}`}
                  value={values.email}
                  maxLength={255}
                  placeholder="maria@example.com"
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-xs text-[#B4443B]">{errors.email}</p>}
              </div>

              <div>
                <label className={labelCls} htmlFor="dtf-phone">{t.phone}</label>
                <input
                  id="dtf-phone"
                  type="tel"
                  className={`mt-1.5 ${inputCls}`}
                  value={values.phone}
                  maxLength={40}
                  placeholder="+49 …"
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls} htmlFor="dtf-birth">{t.birthdate}</label>
                <input
                  id="dtf-birth"
                  className={`mt-1.5 ${inputCls}`}
                  value={values.birthdate}
                  maxLength={20}
                  placeholder={t.birthdatePh}
                  onChange={(e) => set("birthdate", e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls} htmlFor="dtf-ins">{t.insurance}</label>
                <select
                  id="dtf-ins"
                  className={`mt-1.5 ${inputCls}`}
                  value={values.insurance}
                  onChange={(e) => set("insurance", e.target.value as typeof values.insurance)}
                >
                  <option value="gesetzlich">{t.insuranceOpts.gesetzlich}</option>
                  <option value="privat">{t.insuranceOpts.privat}</option>
                  <option value="selbstzahler">{t.insuranceOpts.selbstzahler}</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <span className={labelCls}>{t.concern}</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {concernOptions.map((c) => {
                    const active = values.concern === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => set("concern", c)}
                        aria-pressed={active}
                        className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                          active
                            ? "border-[#AC8F52] bg-[#AC8F52] text-[#1E2535]"
                            : "border-[#E2E4E7] bg-white text-[#4A5568] hover:border-[#AC8F52]"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                {errors.concern && <p className="mt-1 text-xs text-[#B4443B]">{errors.concern}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="dtf-avail">{t.availability}</label>
                <input
                  id="dtf-avail"
                  className={`mt-1.5 ${inputCls}`}
                  value={values.availability}
                  maxLength={200}
                  placeholder={t.availabilityPh}
                  onChange={(e) => set("availability", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="dtf-msg">{t.message}</label>
                <textarea
                  id="dtf-msg"
                  rows={4}
                  className={`mt-1.5 ${inputCls} resize-y`}
                  value={values.message}
                  maxLength={1000}
                  placeholder={t.messagePh}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#4A5568]">
              <input
                type="checkbox"
                className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#AC8F52]"
                checked={values.consent}
                onChange={(e) => set("consent", e.target.checked)}
              />
              <span>{t.consent}</span>
            </label>
            {errors.consent && <p className="mt-1 text-xs text-[#B4443B]">{errors.consent}</p>}

            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1E2535] px-7 text-sm font-semibold text-white transition hover:bg-[#263044] sm:w-auto"
            >
              {t.submit}
              <span aria-hidden>→</span>
            </button>

            <p className="mt-4 text-xs leading-relaxed text-[#5F6771]">{t.note}</p>
          </form>
        )}
      </div>
    </section>
  );
}
