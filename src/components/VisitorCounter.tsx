import { useEffect, useState } from "react";

/**
 * Global visit counter via Abacus (https://abacus.jasoncameron.dev) —
 * free zero-config HTTP counter (countapi.xyz successor).
 * counterapi.dev v2 requires a signed-up workspace, so Abacus is used
 * for credential-free durability across visitors.
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

export function VisitorCounter() {
  const [state, setState] = useState<CounterState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const alreadyCounted =
          typeof sessionStorage !== "undefined" &&
          sessionStorage.getItem(SESSION_GATE_KEY) === "1";

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

        if (!cancelled) setState({ status: "ready", value });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return null;

  const text =
    state.status === "ready"
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
