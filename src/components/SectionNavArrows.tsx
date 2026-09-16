import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

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

function scrollToSection(id: SectionId, reduced: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function computeVisible(): boolean {
  const hero = document.getElementById("hero");
  const contact = document.getElementById("contact");
  if (!hero) return false;

  // Fade in after first scroll past hero
  const pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight * 0.55;

  // Fade out near Contact / end
  let nearEnd = false;
  if (contact) {
    const contactTop = contact.getBoundingClientRect().top;
    nearEnd = contactTop < window.innerHeight * 0.55;
  }

  return pastHero && !nearEnd;
}

export function SectionNavArrows() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setIndex(getActiveIndex());
      setVisible(computeVisible());
    };
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
    <div
      className={`fixed bottom-6 right-4 z-40 flex flex-col gap-1.5 print:hidden sm:right-6 ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      } ${reduced ? "" : "duration-300 transition-opacity"}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        aria-label="Previous section"
        disabled={!canUp || !visible}
        tabIndex={visible ? 0 : -1}
        onClick={() => canUp && scrollToSection(SECTIONS[index - 1].id, reduced)}
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
        disabled={!canDown || !visible}
        tabIndex={visible ? 0 : -1}
        onClick={() => canDown && scrollToSection(SECTIONS[index + 1].id, reduced)}
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
