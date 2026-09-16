import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Global visit counter via Abacus (https://abacus.jasoncameron.dev) —
 * free zero-config HTTP counter (countapi.xyz successor).
 * Module-level promise prevents StrictMode double-mount from double-hitting.
 */
const COUNTER_NAMESPACE = "achmadfaiz";
const COUNTER_KEY = "achmadfaiz-new-porto-repo-visits";
const SESSION_GATE_KEY = "af-porto-visit-counted";

const HIT_URL = `https://abacus.jasoncameron.dev/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;
const GET_URL = `https://abacus.jasoncameron.dev/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

type CounterState =
  | { status: "loading" }
  | { status: "ready"; value: number }
  | { status: "error" };

/** Shared across mounts so React StrictMode does not double-increment. */
let visitFetchPromise: Promise<number> | null = null;

async function fetchVisitCount(): Promise<number> {
  if (visitFetchPromise) return visitFetchPromise;

  visitFetchPromise = (async () => {
    let alreadyCounted = false;
    try {
      alreadyCounted =
        typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem(SESSION_GATE_KEY) === "1";
    } catch {
      alreadyCounted = false;
    }

    const res = await fetch(alreadyCounted ? GET_URL : HIT_URL);
    if (!res.ok) throw new Error(`counter HTTP ${res.status}`);

    const data = (await res.json()) as { value?: unknown };
    const value =
      typeof data.value === "number" && Number.isFinite(data.value)
        ? data.value
        : null;
    if (value === null) throw new Error("invalid counter payload");

    if (!alreadyCounted) {
      try {
        sessionStorage.setItem(SESSION_GATE_KEY, "1");
      } catch {
        /* private mode / blocked storage — still show global count */
      }
    }

    return value;
  })();

  try {
    return await visitFetchPromise;
  } catch (err) {
    visitFetchPromise = null;
    throw err;
  }
}

function useCountUp(target: number | null, durationMs = 400): number | null {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    if (started.current) {
      setDisplay(target);
      return;
    }
    started.current = true;

    if (reduced || durationMs <= 0) {
      setDisplay(target);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // ease-out soft
      const eased = 1 - (1 - t) * (1 - t);
      setDisplay(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduced]);

  return display;
}

export function VisitorCounter() {
  const [state, setState] = useState<CounterState>({ status: "loading" });
  const count = useCountUp(state.status === "ready" ? state.value : null, 400);

  useEffect(() => {
    let cancelled = false;

    void fetchVisitCount()
      .then((value) => {
        if (!cancelled) setState({ status: "ready", value });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return null;

  const text =
    state.status === "ready" && count !== null
      ? `${count.toLocaleString("en-US")} visits`
      : state.status === "ready"
        ? `${state.value.toLocaleString("en-US")} visits`
        : "—";

  return (
    <span
      className="font-mono text-[10px] tracking-[0.12em] text-mist tabular-nums"
      title="Global page visits"
      aria-label={
        state.status === "ready" ? `${state.value} visits` : "Visit count unavailable"
      }
    >
      {text}
    </span>
  );
}
