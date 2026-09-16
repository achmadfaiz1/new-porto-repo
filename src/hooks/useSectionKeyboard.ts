import { useEffect } from "react";
import { SECTIONS, type SectionId } from "../data/content";

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return Boolean(el.closest("[contenteditable='true']"));
}

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function activeIndex(): number {
  const mid = window.scrollY + window.innerHeight * 0.35;
  let active = 0;
  for (let i = 0; i < SECTIONS.length; i++) {
    const el = document.getElementById(SECTIONS[i].id);
    if (!el) continue;
    if (el.offsetTop <= mid) active = i;
  }
  return active;
}

/** ArrowLeft/Right and j/k for prev/next section (same order as floating arrows). */
export function useSectionKeyboard() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const prevKeys = e.key === "ArrowLeft" || e.key === "k" || e.key === "K";
      const nextKeys = e.key === "ArrowRight" || e.key === "j" || e.key === "J";
      if (!prevKeys && !nextKeys) return;

      const idx = activeIndex();
      if (prevKeys && idx > 0) {
        e.preventDefault();
        scrollToSection(SECTIONS[idx - 1].id);
      } else if (nextKeys && idx < SECTIONS.length - 1) {
        e.preventDefault();
        scrollToSection(SECTIONS[idx + 1].id);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
