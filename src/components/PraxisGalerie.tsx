import { useCallback, useEffect, useRef, useState } from "react";
import { useLang, useT } from "@/lib/lang";

import empfang from "@/assets/wzas/galerie/empfang.webp.asset.json";
import beratung from "@/assets/wzas/galerie/beratung.webp.asset.json";
import befund from "@/assets/wzas/galerie/befund.webp.asset.json";
import untersuchung from "@/assets/wzas/galerie/untersuchung.webp.asset.json";
import schmerztherapie from "@/assets/wzas/galerie/schmerztherapie.webp.asset.json";
import mrt from "@/assets/wzas/galerie/mrt.webp.asset.json";
import ct from "@/assets/wzas/galerie/ct.webp.asset.json";
import befundung from "@/assets/wzas/galerie/befundung.webp.asset.json";

type Shot = { src: string; de: string; en: string; subDe: string; subEn: string };

const SHOTS: Shot[] = [
  { src: beratung.url, de: "Aufklärung am Modell", en: "Explained on the model", subDe: "Jeder Befund wird verständlich erklärt", subEn: "Every finding explained in plain words" },
  { src: empfang.url, de: "Empfang", en: "Reception", subDe: "Ankommen am Stiglmaierplatz", subEn: "Arriving at Stiglmaierplatz" },
  { src: befund.url, de: "Befundbesprechung", en: "Reviewing the scans", subDe: "MRT-Bilder gemeinsam durchgehen", subEn: "Going through the MRI together" },
  { src: untersuchung.url, de: "Klinische Untersuchung", en: "Clinical examination", subDe: "Beweglichkeit, Kraft, Nervenfunktion", subEn: "Mobility, strength, nerve function" },
  { src: mrt.url, de: "MRT-Diagnostik", en: "MRI diagnostics", subDe: "Radiologie im selben Haus", subEn: "Radiology in the same building" },
  { src: schmerztherapie.url, de: "Bildgesteuerte Schmerztherapie", en: "Image-guided pain therapy", subDe: "Millimetergenau an die Schmerzquelle", subEn: "Millimetre-precise at the pain source" },
  { src: ct.url, de: "CT-gestützte Intervention", en: "CT-guided intervention", subDe: "Minimalinvasiv, ambulant", subEn: "Minimally invasive, outpatient" },
  { src: befundung.url, de: "Befundung", en: "Reporting", subDe: "Zweitmeinung im Team", subEn: "Second opinion within the team" },
];

const SPANS = [
  "col-span-2 row-span-2",
  "",
  "",
  "col-span-2",
  "",
  "",
  "",
  "",
];

export function PraxisGalerie() {
  const { lang } = useLang();
  const label = (s: Shot) => (lang === "en" ? s.en : s.de);
  const sub = (s: Shot) => (lang === "en" ? s.subEn : s.subDe);
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const t = useT({
    de: { label: "Einblicke", h2a: "Einblicke in ", h2b: "die Praxis", lead: "Keine Stockfotos: So sieht es bei uns am Stiglmaierplatz wirklich aus, von der Anmeldung bis zum OP-Saal.", close: "Schließen", prev: "Vorheriges Bild", next: "Nächstes Bild", hint: "Bild anklicken" },
    en: { label: "Inside", h2a: "Inside ", h2b: "our practice", lead: "No stock photography: this is what Stiglmaierplatz really looks like, from reception to the operating room.", close: "Close", prev: "Previous image", next: "Next image", hint: "Click an image" },
  });

  const step = useCallback((dir: number) => {
    setOpen((i) => (i === null ? i : (i + dir + SHOTS.length) % SHOTS.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, step]);

  const active = open === null ? null : SHOTS[open]!;

  return (
    <section className="bg-[#1E2535] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#AC8F52] flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-[#AC8F52]" />
            {t.label}
          </p>
          <h2
            className="mt-4 font-display text-white leading-[1.14] sm:leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 4.4vw, 3.1rem)", fontWeight: 500 }}
          >
            {t.h2a}
            <span style={{ fontWeight: 700 }}>{t.h2b}</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#CBD1DA] leading-relaxed">{t.lead}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 auto-rows-[140px] sm:auto-rows-[170px] lg:auto-rows-[200px] gap-3">
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={label(s)}
              className={`group relative overflow-hidden rounded-lg bg-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AC8F52] ${SPANS[i] ?? ""}`}
            >
              <img
                src={s.src}
                alt={label(s)}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#0F131C]/85 via-[#0F131C]/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-left">
                <span className="block text-[13px] sm:text-[15px] font-semibold text-white leading-snug">
                  {label(s)}
                </span>
                <span className="block mt-0.5 text-[11px] sm:text-xs text-[#CBD1DA] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {sub(s)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label(active)}
          className="fixed inset-0 z-[80] bg-[#0B0E15]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={label(active)} className="w-full max-h-[74vh] object-contain rounded-lg" />
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-white">{label(active)}</p>
                <p className="text-sm text-[#CBD1DA]">{sub(active)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={t.prev}
                  onClick={() => step(-1)}
                  className="h-10 w-10 rounded-full border border-white/25 text-white hover:bg-white/10 transition"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label={t.next}
                  onClick={() => step(1)}
                  className="h-10 w-10 rounded-full border border-white/25 text-white hover:bg-white/10 transition"
                >
                  ›
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(null)}
                  className="h-10 px-4 rounded-full bg-[#AC8F52] text-[#12161F] text-sm font-semibold hover:bg-[#c0a161] transition"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PraxisGalerie;
