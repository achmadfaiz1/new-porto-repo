import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const update = () => {
      const exp = document.getElementById("experience");
      if (!exp) {
        setVisible(false);
        return;
      }
      // Appear after the experience section has been scrolled past its start
      const threshold = exp.offsetTop + Math.min(120, exp.offsetHeight * 0.15);
      setVisible(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      className={`fixed bottom-6 left-4 z-40 flex h-9 w-9 items-center justify-center border border-line bg-paper/90 text-ink backdrop-blur-sm transition hover:border-ink print:hidden sm:left-6 ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      } ${reduced ? "" : "duration-300"}`}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 12V4M8 4L4 8M8 4L12 8"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
