import { useRef, useState } from "react";
import { PROFILE } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type Variant = "solid" | "ghost";

type Props = {
  variant?: Variant;
  label?: string;
};

export function DownloadCvButton({
  variant = "solid",
  label = "Download CV",
}: Props) {
  const [pressed, setPressed] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const onClick = () => {
    setPressed(true);
    window.setTimeout(() => setPressed(false), reduced ? 0 : 120);

    // Trigger download via temporary anchor (keeps download attribute working)
    const a = document.createElement("a");
    a.href = PROFILE.cvPath;
    a.download = "";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setDone(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1600);
  };

  const base = variant === "solid" ? "btn-solid" : "btn-ghost";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${pressed ? "cv-press" : ""}`}
      aria-live="polite"
    >
      {done ? "Downloaded" : label}
    </button>
  );
}
