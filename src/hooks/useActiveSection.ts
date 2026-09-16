import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "../data/content";

function resolveActiveId(): SectionId {
  const mid = window.scrollY + window.innerHeight * 0.35;
  let active: SectionId = SECTIONS[0].id;
  for (const section of SECTIONS) {
    const el = document.getElementById(section.id);
    if (!el) continue;
    if (el.offsetTop <= mid) active = section.id;
  }
  return active;
}

export function useActiveSection(): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(SECTIONS[0].id);

  useEffect(() => {
    const update = () => setActiveId(resolveActiveId());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return activeId;
}

export function getSectionIndex(id: SectionId): number {
  return SECTIONS.findIndex((s) => s.id === id);
}
