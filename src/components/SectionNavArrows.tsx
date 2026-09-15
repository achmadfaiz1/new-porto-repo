import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "../data/content";

function getActiveIndex(): number {
  const mid = window.scrollY + window.innerHeight * 0.35;
  let active = 0;
  for (let i = 0; i < SECTIONS.length; i++) {
    const el = document.getElementById(SECTIONS[i].id);
    if (!el) continue;
    if (el.offsetTop <= mid) active = i;
  }
  return active;
}

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SectionNavArrows() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setIndex(getActiveIndex());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const canUp = index > 0;
  const canDown = index < SECTIONS.length - 1;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-1.5 sm:right-6">
      <button
        type="button"
        aria-label="Previous section"
        disabled={!canUp}
        onClick={() => canUp && scrollToSection(SECTIONS[index - 1].id)}
        className="flex h-9 w-9 items-center justify-center border border-line bg-paper/90 text-ink backdrop-blur-sm transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-25"
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
      <button
        type="button"
        aria-label="Next section"
        disabled={!canDown}
        onClick={() => canDown && scrollToSection(SECTIONS[index + 1].id)}
        className="flex h-9 w-9 items-center justify-center border border-line bg-paper/90 text-ink backdrop-blur-sm transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-25"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 4V12M8 12L4 8M8 12L12 8"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
