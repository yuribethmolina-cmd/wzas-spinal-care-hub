// src/components/MobileNavPanel.tsx
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const BOOKING_URL = "/#termin";
const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const SOCIALS = [
  {
    href: "https://www.instagram.com/wirbelsaeulenzentrum_wzas/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/wirbelsaeule/",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/channel/UCzwMBjHV_AtZB9Ubu2ISm9w",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

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

        <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-3" aria-label={title}>
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

        <div className="border-t border-[#E2E4E7] px-5 py-5" style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}>
          <a
            href={BOOKING_URL}
            onClick={onClose}
            className="block rounded-full bg-[#AC8F52] px-5 py-4 text-center text-[15px] font-semibold text-[#1E2535] transition-colors duration-300 hover:bg-[#BC9C58]"
          >
            {bookLabel}
          </a>
          <div className="flex items-center justify-center gap-4 mt-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F5F6] text-[#1E2535] hover:bg-[#AC8F52] hover:text-white transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
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
