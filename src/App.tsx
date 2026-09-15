import { JakartaClock } from "./components/JakartaClock";
import { SectionNavArrows } from "./components/SectionNavArrows";
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

function scrollTo(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-tight text-ink"
        >
          AF
        </button>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {SECTIONS.filter((s) => s.id !== "hero").map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className="text-xs font-medium uppercase tracking-wider text-ash transition hover:text-ink"
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <JakartaClock />
          <a
            href={PROFILE.cvPath}
            download
            className="hidden rounded-full border border-ink bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-graphite sm:inline-block"
          >
            CV
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="section-pad min-h-[88vh] flex items-center">
      <div className="container-narrow w-full">
        <p className="eyebrow">Jakarta · People Analytics</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
          {PROFILE.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ash sm:text-xl">
          {PROFILE.title}
        </p>
        <p className="mt-6 max-w-2xl muted">
          Built GoTo&apos;s PM function from scratch. 360 · Calibration · PIP ·
          Critical Talent · SQL / BigQuery / Tableau / Looker / R
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.cvPath}
            download
            className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-graphite"
          >
            Download CV
          </a>
          <button
            type="button"
            onClick={() => scrollTo("experience")}
            className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-ink"
          >
            View experience
          </button>
        </div>
        <p className="mt-10 text-sm text-mist">
          {PROFILE.location} · {PROFILE.email}
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad hairline bg-paper">
      <div className="container-narrow">
        <p className="eyebrow">About</p>
        <h2 className="section-title">Summary</h2>
        <p className="mt-6 muted max-w-2xl">{PROFILE.summary}</p>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad hairline">
      <div className="container-narrow">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Work history</h2>
        <ol className="mt-12 space-y-12">
          {EXPERIENCE.map((role) => (
            <li key={`${role.company}-${role.title}-${role.dates}`} className="grid gap-3 sm:grid-cols-[9rem_1fr]">
              <div className="text-xs font-medium uppercase tracking-wider text-mist sm:pt-1">
                {role.dates}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{role.title}</h3>
                <p className="mt-1 text-sm text-ash">
                  {role.company} · {role.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {role.bullets.map((b) => (
                    <li key={b} className="muted pl-4 relative before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-mist">
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
    <section id="projects" className="section-pad hairline bg-paper">
      <div className="container-narrow">
        <p className="eyebrow">Projects</p>
        <h2 className="section-title">Selected work</h2>
        <div className="mt-12 grid gap-8">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-line bg-white p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <span className="text-xs font-medium uppercase tracking-wider text-mist">
                  {p.year}
                </span>
              </div>
              <p className="mt-1 text-sm text-ash">{p.org}</p>
              <ul className="mt-4 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="muted">
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
    <section id="skills" className="section-pad hairline">
      <div className="container-narrow">
        <p className="eyebrow">Skills</p>
        <h2 className="section-title">Capabilities</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {SKILLS.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
                {group.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ash"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-pad hairline bg-paper">
      <div className="container-narrow">
        <p className="eyebrow">Education</p>
        <h2 className="section-title">Background</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-mist">
              Education
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              {EDUCATION.school}
            </h3>
            <p className="mt-1 text-sm text-ash">{EDUCATION.degree}</p>
            <p className="mt-3 text-sm text-mist">
              {EDUCATION.dates} · GPA {EDUCATION.gpa}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-mist">
              Certification
            </p>
            <h3 className="mt-3 text-lg font-semibold text-ink">
              {CERTIFICATION.name}
            </h3>
            <p className="mt-3 text-sm text-mist">{CERTIFICATION.year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad hairline">
      <div className="container-narrow">
        <p className="eyebrow">Contact</p>
        <h2 className="section-title">Get in touch</h2>
        <p className="mt-4 muted max-w-xl">
          Open to conversations about people analytics, performance systems, and
          HR data infrastructure.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist">Email</dt>
            <dd className="mt-1">
              <a className="text-ink underline-offset-4 hover:underline" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist">LinkedIn</dt>
            <dd className="mt-1">
              <a
                className="text-ink underline-offset-4 hover:underline"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {PROFILE.linkedinLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist">Phone</dt>
            <dd className="mt-1 text-ink">{PROFILE.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-mist">Location</dt>
            <dd className="mt-1 text-ink">{PROFILE.location}</dd>
          </div>
        </dl>
        <div className="mt-10">
          <a
            href={PROFILE.cvPath}
            download
            className="inline-flex items-center rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
          >
            Download CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="hairline px-5 py-8 text-center text-xs text-mist sm:px-8">
      © {new Date().getFullYear()} {PROFILE.name}
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
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
    </div>
  );
}
