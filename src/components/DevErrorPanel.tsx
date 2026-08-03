import { useEffect, useState } from "react";

type Entry = {
  id: number;
  kind: "error" | "rejection" | "console" | "network";
  message: string;
  detail?: string;
  time: string;
};

let counter = 0;

/**
 * Panel visible (solo en desarrollo/preview) que muestra errores de navegador,
 * promesas no capturadas, console.error y respuestas 4xx/5xx del servidor.
 */
export function DevErrorPanel() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!import.meta.env.DEV) return;

    const push = (kind: Entry["kind"], message: string, detail?: string) => {
      setEntries((prev) => {
        if (prev.some((e) => e.kind === kind && e.message === message && e.detail === detail)) return prev;
        const next: Entry = {
          id: ++counter,
          kind,
          message,
          detail,
          time: new Date().toLocaleTimeString(),
        };
        setOpen(true);
        return [...prev.slice(-19), next];
      });
    };

    const onError = (e: ErrorEvent) => {
      push("error", e.message || "Error desconocido", e.error?.stack ?? `${e.filename}:${e.lineno}:${e.colno}`);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const r = e.reason;
      push("rejection", r?.message ?? String(r), r?.stack);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      originalConsoleError(...args);
      const first = args[0];
      const msg = first instanceof Error ? first.message : args.map((a) => (typeof a === "string" ? a : safeString(a))).join(" ");
      push("console", msg.slice(0, 300), first instanceof Error ? first.stack : undefined);
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const res = await originalFetch(...args);
      if (!res.ok) {
        const url = typeof args[0] === "string" ? args[0] : (args[0] as Request).url ?? String(args[0]);
        push("network", `${res.status} ${res.statusText} — ${url}`);
      }
      return res;
    };

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      console.error = originalConsoleError;
      window.fetch = originalFetch;
    };
  }, []);

  if (!import.meta.env.DEV || entries.length === 0) return null;

  return (
    <div className="fixed bottom-3 right-3 z-[9999] w-[min(28rem,calc(100vw-1.5rem))] font-mono text-xs">
      <div className="overflow-hidden rounded-lg border border-red-500/60 bg-[#1b1013] text-red-100 shadow-2xl">
        <div className="flex items-center justify-between gap-2 bg-red-600/90 px-3 py-2 text-white">
          <span className="font-semibold">
            {entries.length} {entries.length === 1 ? "error" : "errores"} en el preview
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="rounded px-2 py-0.5 hover:bg-white/20"
              aria-expanded={open}
            >
              {open ? "Ocultar" : "Ver"}
            </button>
            <button
              type="button"
              onClick={() => setEntries([])}
              className="rounded px-2 py-0.5 hover:bg-white/20"
              aria-label="Limpiar errores"
            >
              Limpiar
            </button>
          </div>
        </div>
        {open && (
          <ul className="max-h-72 divide-y divide-red-500/20 overflow-auto">
            {entries.map((e) => (
              <li key={e.id} className="px-3 py-2">
                <div className="flex items-baseline gap-2">
                  <span className="rounded bg-red-500/25 px-1.5 py-0.5 uppercase tracking-wide">{e.kind}</span>
                  <span className="opacity-60">{e.time}</span>
                </div>
                <p className="mt-1 break-words whitespace-pre-wrap">{e.message}</p>
                {e.detail && (
                  <details className="mt-1 opacity-80">
                    <summary className="cursor-pointer">Detalle</summary>
                    <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap break-words">{e.detail}</pre>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function safeString(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
