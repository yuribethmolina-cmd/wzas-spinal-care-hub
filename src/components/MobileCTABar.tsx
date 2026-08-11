import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";

const COPY = {
  de: { book: "Termin buchen", call: "Anrufen" },
  en: { book: "Book appointment", call: "Call" },
} as const;

/**
 * Fixed bottom CTA bar shown only on small screens.
 * Uses a fixed overlay + body padding (see styles.css) so no extra scroll is created.
 */
export function MobileCTABar() {
  const { lang } = useLang();
  const t = COPY[lang] ?? COPY.de;
  const [hidden, setHidden] = useState(false);

  // Hide while a modal/mobile menu locks body scroll
  useEffect(() => {
    const check = () => {
      if (typeof document === "undefined") return;
      setHidden(document.body.style.overflow === "hidden");
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={hidden}
    >
      <div className="flex items-stretch gap-2 border-t border-black/10 bg-white/95 px-3 py-2.5 backdrop-blur-md shadow-[0_-8px_24px_rgba(15,23,42,0.12)]">
        <a
          href="tel:+498954343030"
          aria-label={`${t.call} +49 89 5434 3030`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#1E2535]/15 text-[#1E2535] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-wz-gold)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => {
            const go = () =>
              window.dispatchEvent(new CustomEvent("wz:start-flow", { detail: "book" }));
            if (document.getElementById("termin")) go();
            else {
              window.location.hash = "#termin";
              setTimeout(go, 300);
            }
          }}
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[var(--color-wz-gold,#B99456)] px-4 text-[15px] font-bold text-[#1E2535] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E2535]"
        >
          {t.book}
        </button>
      </div>
    </div>
  );
}
