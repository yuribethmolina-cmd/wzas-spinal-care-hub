// src/components/wzas/BookingCTA.tsx
import { useT } from "@/lib/lang";

const BOOKING_URL = "https://onlinerezeption.vercel.app";

interface BookingCTAProps {
  heading: string;
  body: string;
  ctaCopy?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function BookingCTA({
  heading,
  body,
  ctaCopy,
  secondaryLabel,
  secondaryHref,
}: BookingCTAProps) {
  const defaultCta = useT({ de: "Online buchen", en: "Book online" });
  const resolvedCta = ctaCopy ?? defaultCta;
  return (
    <section className="bg-[#1E2535] py-16 lg:py-20 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <h2 className="font-display text-4xl font-semibold text-white">{heading}</h2>
        <p className="mt-4 text-[#8C939B] max-w-lg mx-auto">{body}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#AC8F52] px-7 py-3.5 text-sm font-semibold text-[#1E2535] hover:brightness-105 transition"
          >
            {resolvedCta}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
