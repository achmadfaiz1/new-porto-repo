import { BackToTop } from "./components/BackToTop";
import { DownloadCvButton } from "./components/DownloadCvButton";
import { JakartaClock } from "./components/JakartaClock";
import { SectionNavArrows } from "./components/SectionNavArrows";
import { ThemeToggle } from "./components/ThemeToggle";
import { VisitorCounter } from "./components/VisitorCounter";
import {
  CERTIFICATION,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SECTIONS,
  SKILLS,
  type SectionId,
} from "./data/content";
import { useActiveSection } from "./hooks/useActiveSection";
import { useExperienceTimeline } from "./hooks/useExperienceTimeline";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useRevealOnce } from "./hooks/useRevealOnce";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useSectionKeyboard } from "./hooks/useSectionKeyboard";
import { useTheme } from "./hooks/useTheme";

function scrollTo(id: SectionId, reduced: boolean) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function Nav() {
  const activeId = useActiveSection();
  const progress = useScrollProgress();
  const reduced = usePrefersReducedMotion();
  const { theme, toggle } = useTheme();

  return (
    <header className="relative sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5 sm:px-10">
        <button
          type="button"
          onClick={() => scrollTo("hero", reduced)}
          className="text-[13px] font-medium tracking-[0.14em] text-ink"
        >
          AF
        </button>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {SECTIONS.filter((s) => s.id !== "hero").map((s) => {
            const active = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id, reduced)}
                aria-current={active ? "true" : undefined}
                className={`nav-label relative pb-1 text-[11px] font-normal uppercase tracking-[0.16em] transition ${
                  active ? "nav-label-active text-ink" : "text-mist hover:text-ink"
                } ${reduced ? "" : "duration-300"}`}
              >
                {s.label}
                <span
                  className={`absolute inset-x-0 -bottom-px h-px bg-ink transition ${
                    active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  } ${reduced ? "" : "duration-300"}`}
                  aria-hidden
                />
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <VisitorCounter />
          <JakartaClock />
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>
      </div>
      {/* Progress hairline under sticky nav */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden"
        aria-hidden
      >
        <div
          className="h-full origin-left bg-ink/70"
          style={{
            width: "100%",
            transform: `scaleX(${progress})`,
            transition: reduced ? "none" : "transform 80ms linear",
          }}
        />
      </div>
    </header>
  );
}

function Hero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="hero" className="section-pad flex min-h-[90vh] items-center" data-reveal>
      <div className="container-narrow w-full">
        <p className="eyebrow mb-6">Portfolio</p>
        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
          {PROFILE.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ash sm:text-xl">
          {PROFILE.title}
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <DownloadCvButton variant="solid" label="Download CV" />
          <button
            type="button"
            onClick={() => scrollTo("experience", reduced)}
            className="btn-ghost"
          >
            View experience
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-ghost print:hidden"
          >
            Save as PDF
          </button>
        </div>
        <p className="mt-14 font-mono text-[11px] tracking-wide text-mist">
          {PROFILE.location}
          <span className="mx-2 text-line">/</span>
          {PROFILE.email}
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad hairline" data-reveal>
      <div className="container-narrow">
        <p className="eyebrow">About</p>
        <h2 className="section-title">Summary</h2>
        <p className="mt-8 muted max-w-2xl">{PROFILE.summary}</p>
      </div>
    </section>
  );
}

function Experience() {
  const timeline = useExperienceTimeline();
  const reduced = usePrefersReducedMotion();

  return (
    <section id="experience" className="section-pad hairline" data-reveal>
      <div className="container-narrow relative">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Work history</h2>

        {/* Growing timeline hairline (subtle) */}
        <div
          className="pointer-events-none absolute left-0 top-24 bottom-8 hidden w-px sm:block"
          aria-hidden
        >
          <div className="absolute inset-0 bg-line/80" />
          <div
            className="absolute inset-x-0 top-0 origin-top bg-ink/55"
            style={{
              height: "100%",
              transform: `scaleY(${timeline})`,
              transition: reduced ? "none" : "transform 80ms linear",
            }}
          />
        </div>

        <ol className="mt-14 sm:pl-8">
          {EXPERIENCE.map((role, i) => (
            <li
              key={`${role.company}-${role.title}-${role.dates}`}
              className={`grid gap-2 py-10 sm:grid-cols-[8.5rem_1fr] sm:gap-10 ${
                i === 0 ? "pt-0" : "border-t border-line"
              }`}
            >
              <div className="font-mono text-[11px] tracking-wide text-mist sm:pt-1.5">
                {role.dates}
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-tight text-ink sm:text-xl">
                  {role.title}
                </h3>
                <p className="mt-1.5 text-sm text-ash">
                  {role.company}
                  <span className="mx-2 text-line">·</span>
                  {role.location}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {role.bullets.map((b) => (
                    <li
                      key={b}
                      className="muted relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-mist"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-pad hairline" data-reveal>
      <div className="container-narrow">
        <p className="eyebrow">Projects</p>
        <h2 className="section-title">Selected work</h2>
        <div className="mt-14">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className={`py-10 ${i === 0 ? "pt-0" : "border-t border-line"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium tracking-tight text-ink sm:text-xl">
                  {p.title}
                </h3>
                <span className="font-mono text-[11px] tracking-wide text-mist">
                  {p.year}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ash">{p.org}</p>
              <ul className="mt-5 space-y-2.5">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="muted relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-mist"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad hairline" data-reveal>
      <div className="container-narrow">
        <p className="eyebrow">Skills</p>
        <h2 className="section-title">Capabilities</h2>
        <dl className="mt-14 divide-y divide-line">
          {SKILLS.map((group) => (
            <div
              key={group.group}
              className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <dt className="text-[11px] font-normal uppercase tracking-editorial text-mist sm:pt-1">
                {group.group}
              </dt>
              <dd className="text-sm leading-relaxed text-ink sm:text-[15px] sm:leading-7">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-pad hairline" data-reveal>
      <div className="container-narrow">
        <p className="eyebrow">Education</p>
        <h2 className="section-title">Background</h2>
        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-16">
          <div>
            <p className="text-[11px] font-normal uppercase tracking-editorial text-mist">
              Education
            </p>
            <h3 className="mt-4 text-lg font-medium tracking-tight text-ink">
              {EDUCATION.school}
            </h3>
            <p className="mt-2 text-sm text-ash">{EDUCATION.degree}</p>
            <p className="mt-4 font-mono text-[11px] tracking-wide text-mist">
              {EDUCATION.dates}
              <span className="mx-2 text-line">·</span>
              GPA {EDUCATION.gpa}
            </p>
          </div>
          <div className="border-t border-line pt-12 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-16">
            <p className="text-[11px] font-normal uppercase tracking-editorial text-mist">
              Certification
            </p>
            <h3 className="mt-4 text-lg font-medium tracking-tight text-ink">
              {CERTIFICATION.name}
            </h3>
            <p className="mt-4 font-mono text-[11px] tracking-wide text-mist">
              {CERTIFICATION.year}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad hairline" data-reveal>
      <div className="container-narrow">
        <p className="eyebrow">Contact</p>
        <h2 className="section-title">Get in touch</h2>
        <p className="mt-6 muted max-w-xl">
          Open to conversations about people analytics, performance systems, and
          HR data infrastructure.
        </p>
        <dl className="mt-12 space-y-6 text-sm">
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-[11px] uppercase tracking-editorial text-mist">Email</dt>
            <dd>
              <a
                className="text-ink underline-offset-4 transition hover:underline"
                href={`mailto:${PROFILE.email}`}
              >
                {PROFILE.email}
              </a>
            </dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-[11px] uppercase tracking-editorial text-mist">LinkedIn</dt>
            <dd>
              <a
                className="text-ink underline-offset-4 transition hover:underline"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {PROFILE.linkedinLabel}
              </a>
            </dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-[11px] uppercase tracking-editorial text-mist">Phone</dt>
            <dd className="text-ink">{PROFILE.phone}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-[11px] uppercase tracking-editorial text-mist">Location</dt>
            <dd className="text-ink">{PROFILE.location}</dd>
          </div>
        </dl>
        <div className="mt-12 flex flex-wrap gap-3">
          <DownloadCvButton variant="ghost" label="Download CV (PDF)" />
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-ghost print:hidden"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="hairline px-6 py-10 text-center font-mono text-[11px] tracking-wide text-mist sm:px-10">
      © {new Date().getFullYear()} {PROFILE.name}
    </footer>
  );
}

export default function App() {
  useRevealOnce();
  useSectionKeyboard();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <SectionNavArrows />
      <BackToTop />
    </div>
  );
}
