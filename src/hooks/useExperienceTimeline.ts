import { useEffect, useState } from "react";

/** Subtle 0-1 progress of how far the experience section has been scrolled through. */
export function useExperienceTimeline(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById("experience");
      if (!el) {
        setProgress(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const start = window.scrollY + rect.top - window.innerHeight * 0.55;
      const end = window.scrollY + rect.bottom - window.innerHeight * 0.35;
      const range = Math.max(1, end - start);
      const p = (window.scrollY - start) / range;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
