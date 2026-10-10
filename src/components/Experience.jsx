import { experiences } from '../data/content'
import SectionHeader from './SectionHeader'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader index="02" eyebrow="Experience" title="Where I've worked" />
      <ol className="relative mt-12 space-y-6 before:absolute before:bottom-2 before:left-[1.4rem] before:top-2 before:w-px before:bg-gradient-to-b before:from-accent before:via-line before:to-transparent sm:before:left-[1.65rem]">
        {experiences.map((job, i) => (
          <li key={job.company} className="reveal relative flex gap-4 sm:gap-6" style={{ '--delay': `${i * 60}ms` }}>
            <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white sm:h-14 sm:w-14">
              {job.logo ? (
                <img src={job.logo} alt="" className="h-3/4 w-3/4 object-contain" loading="lazy" />
              ) : (
                <span className="font-display text-sm font-bold text-zinc-800" aria-hidden="true">
                  {job.company.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join('').slice(0, 3)}
                </span>
              )}
            </div>
            <article className="card glow-border flex-1 p-5 sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold">
                  {job.title} <span className="text-muted">· {job.company}</span>
                </h3>
                <p className="text-sm text-muted">{job.date}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {job.tags.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
