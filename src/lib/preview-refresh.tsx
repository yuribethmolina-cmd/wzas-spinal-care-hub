import { useEffect } from "react";

/**
 * Evita que el preview se quede en caché:
 * - En dev, cualquier update de Vite que no se pueda aplicar en caliente fuerza recarga completa.
 * - Al volver a la pestaña, comprueba si el build cambió (hash del HTML servido) y recarga.
 */
export function PreviewRefresh() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hot = (import.meta as unknown as { hot?: { on: (e: string, cb: () => void) => void } }).hot;
    if (hot) {
      hot.on("vite:invalidate", () => window.location.reload());
      hot.on("vite:ws:disconnect", () => {
        // el server se reinició: espera a que vuelva y recarga
        const poll = window.setInterval(async () => {
          try {
            const res = await fetch("/", { cache: "no-store" });
            if (res.ok) {
              window.clearInterval(poll);
              window.location.reload();
            }
          } catch {
            /* sigue intentando */
          }
        }, 1000);
      });
      return;
    }

    let current: string | null = null;

    const buildId = async () => {
      try {
        const res = await fetch(window.location.href, { cache: "no-store" });
        const html = await res.text();
        const match = html.match(/\/_build\/assets\/[\w.-]+\.js/g);
        return match ? match.join("|") : null;
      } catch {
        return null;
      }
    };

    const check = async () => {
      const next = await buildId();
      if (!next) return;
      if (current && next !== current) {
        window.location.reload();
        return;
      }
      current = next;
    };

    void check();
    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = window.setInterval(() => void check(), 30000);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
