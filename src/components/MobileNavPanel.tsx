// src/components/MobileNavPanel.tsx
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const BOOKING_URL = "https://onlinerezeption.vercel.app";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

type RouteHref = "/" | "/aerzte" | "/beschwerden" | "/behandlungen" | "/faq" | "/aktuelles";

interface MobileNavPanelProps {
  open: boolean;
  onClose: () => void;
  links: [string, string][];
  bookLabel: string;
  title?: string;
  activeRoute?: string;
  id?: string;
}

export function MobileNavPanel({
  open,
  onClose,
  links,
  bookLabel,
  title = "Navigation",
  activeRoute,
  id = "mobile-nav",
}: MobileNavPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#0F131C]/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Sliding panel */}
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={title}
        className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[86%] max-w-sm flex-col bg-white shadow-[-20px_0_60px_-30px_rgba(15,19,28,0.6)]"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: `transform 380ms ${EASE}`,
          visibility: open ? "visible" : "hidden",
          transitionProperty: "transform, visibility",
        }}
      >
        <div className="flex items-center justify-between border-b border-[#E2E4E7] px-5 py-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C939B]">
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-[#1E2535] hover:text-[#AC8F52]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-3" aria-label={title}>
          {links.map(([label, href], i) => {
            const isActive = activeRoute === href;
            const cls = `flex items-center justify-between border-b border-[#EEF0F2] py-4 text-[17px] font-semibold transition-colors ${
              isActive ? "text-[#AC8F52]" : "text-[#1E2535] hover:text-[#AC8F52]"
            }`;
            const inner = (
              <>
                <span>{label}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="text-[#C7CCD3]">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </>
            );
            const style = {
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(14px)",
              transition: `opacity 320ms ${EASE} ${80 + i * 45}ms, transform 320ms ${EASE} ${80 + i * 45}ms`,
            };
            return href.startsWith("/") ? (
              <Link
                key={label}
                to={href as RouteHref}
                onClick={onClose}
                className={cls}
                style={style}
                activeProps={{ "aria-current": "page" } as never}
                activeOptions={{ exact: href === "/" }}
              >
                {inner}
              </Link>
            ) : (
              <a key={label} href={href} onClick={onClose} className={cls} style={style}>
                {inner}
              </a>
            );
          })}
        </nav>

        <div className="border-t border-[#E2E4E7] px-5 py-5">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            aria-label={`${bookLabel} (öffnet in neuem Tab)`}
            className="block rounded-full bg-[#AC8F52] px-5 py-4 text-center text-[15px] font-semibold text-[#1E2535] transition-colors duration-300 hover:bg-[#BC9C58]"
          >
            {bookLabel}
          </a>
          <p className="mt-4 text-center text-xs leading-relaxed text-[#5F6771]">
            Nymphenburger Str. 1 · 80335 München
            <br />
            <a href="tel:+498954343030" className="inline-flex items-center min-h-11 font-semibold text-[#1E2535]">
              +49 (0)89-54 34 30 30
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
