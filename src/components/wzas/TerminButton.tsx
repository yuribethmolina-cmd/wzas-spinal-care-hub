// src/components/wzas/TerminButton.tsx
import { useT } from "@/lib/lang";

const BOOKING_URL = "/#termin";

type Variant = "solid" | "outlineLight" | "outlineDark";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  solid: "border border-wz-gold bg-wz-gold text-wz-dark hover:brightness-105",
  outlineLight: "border border-white/70 text-wz-white hover:bg-wz-white hover:text-wz-dark",
  outlineDark: "border border-wz-gold text-wz-gold hover:bg-wz-gold hover:text-wz-dark",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
};

interface TerminButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
}

/** Gold "Termin buchen" pill that jumps to the booking flow on the homepage. */
export function TerminButton({
  variant = "solid",
  size = "md",
  className = "",
  label,
}: TerminButtonProps) {
  const defaultLabel = useT({ de: "Termin buchen", en: "Book an appointment" });
  return (
    <a
      href={BOOKING_URL}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] font-semibold transition ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {label ?? defaultLabel}
      <span aria-hidden>→</span>
    </a>
  );
}
