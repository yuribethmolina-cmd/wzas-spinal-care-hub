export const HERO_BG = "/clinic-exterior.webp";
export const HERO_VIDEO = "/__l5e/assets-v1/949da178-930e-4139-b75b-d822f0d6020d/hero-columna.mp4";


export const BOOKING_URL = "https://onlinerezeption.vercel.app";
export const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
export const EASE_SOFT = "cubic-bezier(0.16, 1, 0.3, 1)";

export const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const STAT_DEFS = [
  { value: 30000, suffix: "+", labelDe: "Patienten pro Jahr", labelEn: "patients per year" },
  { value: 90, suffix: "%", labelDe: "ohne Operation behandelt", labelEn: "treated without surgery" },
  { value: 20, suffix: "+", labelDe: "Jahre Erfahrung", labelEn: "years of experience" },
  { value: 12, suffix: "", labelDe: "Wirbelsäulenspezialisten", labelEn: "spine specialists" },
] as const;

export const SPINE_ZONE_DEFS = [
  { id: "cervical", de: "Halswirbelsäule", en: "Cervical spine", subDe: "Nacken · Arm · Kopf", subEn: "Neck · arm · head", href: "/beschwerden", flex: 1, count: 4, w0: 11, w1: 13 },
  { id: "thoracic", de: "Brustwirbelsäule", en: "Thoracic spine", subDe: "Oberer & mittlerer Rücken", subEn: "Upper & mid back", href: "/beschwerden/facettengelenksarthrose", flex: 2, count: 7, w0: 14, w1: 18 },
  { id: "lumbar", de: "LWS · Bandscheiben", en: "Lumbar · discs", subDe: "Unterer Rücken · L4/L5", subEn: "Lower back · L4/L5", href: "/beschwerden/bandscheibenvorfall", flex: 1.8, count: 5, w0: 19, w1: 22 },
  { id: "sacrum", de: "Sakrum · ISG", en: "Sacrum · SIJ", subDe: "Becken · Hüfte · Bein", subEn: "Pelvis · hip · leg", href: "/beschwerden/iliosakralsyndrom", flex: 1.2, count: 3, w0: 22, w1: 14 },
];

// Lay the vertebrae out once so the drawing and the labels share one rhythm.
export const SPINE_TOTAL_FLEX = SPINE_ZONE_DEFS.reduce((s, z) => s + z.flex, 0);
export const SPINE_H = 288;
export const SPINE_ZONES = (() => {
  let cursor = 0;
  return SPINE_ZONE_DEFS.map((z) => {
    const h = (z.flex / SPINE_TOTAL_FLEX) * SPINE_H;
    const y = cursor;
    cursor += h;
    const slot = h / z.count;
    const vh = Math.min(slot * 0.66, 13);
    const vertebrae = Array.from({ length: z.count }, (_, i) => ({
      y: y + i * slot + (slot - vh) / 2,
      vh,
      w: z.w0 + ((z.w1 - z.w0) * i) / Math.max(z.count - 1, 1),
    }));
    return { ...z, y, h, vertebrae };
  });
})();
