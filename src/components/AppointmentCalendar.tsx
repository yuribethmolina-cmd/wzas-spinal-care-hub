import { useMemo, useState } from "react";
import { useLang } from "@/lib/lang";

const SLOTS = ["08:30", "09:15", "10:00", "11:15", "13:30", "14:15", "15:00", "16:30"];

type Props = {
  /** Current value, e.g. "Mo, 17.08.2026 · 09:15" */
  value: string | null;
  onChange: (value: string) => void;
};

/**
 * Prototype month calendar + time slots for the booking flow.
 * Weekends and past days are disabled; slots are static demo availability.
 */
export function AppointmentCalendar({ value, onChange }: Props) {
  const { lang } = useLang();
  const locale = lang === "en" ? "en-GB" : "de-DE";
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const copy =
    lang === "en"
      ? { prev: "Previous month", next: "Next month", pickDay: "Select a day", pickTime: "Available times" }
      : { prev: "Voriger Monat", next: "Nächster Monat", pickDay: "Tag wählen", pickTime: "Freie Uhrzeiten" };

  const weekdays =
    lang === "en" ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] : ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const monthLabel = cursor.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const offset = (firstDay.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];

  const canGoBack = cursor > new Date(today.getFullYear(), today.getMonth(), 1);

  function isDisabled(d: Date) {
    const wd = d.getDay();
    return d < today || wd === 0 || wd === 6;
  }

  function label(d: Date, time: string) {
    return `${d.toLocaleDateString(locale, { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" })} · ${time}`;
  }

  function chooseDay(d: Date) {
    setSelected(d);
    setSlot(null);
  }
  function chooseSlot(time: string) {
    if (!selected) return;
    setSlot(time);
    onChange(label(selected, time));
  }

  return (
    <div className="mt-4">
      <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label={copy.prev}
            disabled={!canGoBack}
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 disabled:opacity-30"
          >
            ‹
          </button>
          <p className="text-sm font-semibold capitalize text-white">{monthLabel}</p>
          <button
            type="button"
            aria-label={copy.next}
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            ›
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-[#A7AEBA]">
          {weekdays.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`e${i}`} />;
            const disabled = isDisabled(d);
            const active = selected?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                type="button"
                disabled={disabled}
                onClick={() => chooseDay(d)}
                className="aspect-square rounded-lg text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: active ? "#AC8F52" : disabled ? "transparent" : "rgba(255,255,255,0.06)",
                  color: active ? "#1E2535" : disabled ? "rgba(167,174,186,0.35)" : "#E6E8EC",
                  border: active ? "1px solid #AC8F52" : "1px solid transparent",
                }}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-[#A7AEBA]">
        {selected ? copy.pickTime : copy.pickDay}
      </p>
      {selected && (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SLOTS.map((s) => {
            const active = slot === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => chooseSlot(s)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150"
                style={{
                  backgroundColor: active ? "rgba(172,143,82,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? "#AC8F52" : "rgba(255,255,255,0.15)"}`,
                  color: active ? "#F1E4C8" : "#C8CBD2",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      )}
      {value && <p className="mt-3 text-sm text-[#D8BE85]">{value}</p>}
    </div>
  );
}
