import { featuredProjects, learningProjects, profile } from '../data/content'
import { ArrowUpRight, GitHub } from './Icons'
import SectionHeader from './SectionHeader'

function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <SectionHeader eyebrow="Selected work" title="Things I've built">
        A mix of full-stack apps and front-end experiments. Every project is open source, so feel free to dig into the code.
      </SectionHeader>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            onMouseMove={trackSpotlight}
            className="card spotlight reveal group flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-8"
            style={{ '--delay': `${(i % 2) * 90}ms` }}
          >
            <div className={`relative mb-6 overflow-hidden rounded-xl border border-line bg-gradient-to-br ${p.hue} p-4`} aria-hidden="true">
              <div className="rounded-lg border border-line bg-canvas/80 shadow-xl backdrop-blur transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 truncate font-mono text-[11px] text-muted">github.com/Jevonzz/{p.link.split('/').pop()}</span>
                </div>
                <div className="space-y-2 p-4 font-mono text-xs leading-relaxed">
                  <p><span className="text-accent">const</span> project = <span className="text-accent2">'{p.name}'</span></p>
                  <p><span className="text-accent">const</span> stack = [{p.tags.map((t) => `'${t}'`).join(', ')}]</p>
                  <div className="flex gap-2 pt-1">
                    <span className="h-2 w-1/3 rounded bg-accent/40" />
                    <span className="h-2 w-1/5 rounded bg-accent2/40" />
                    <span className="h-2 w-1/4 rounded bg-line" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{p.kind}</p>
            <h3 className="mt-2 flex items-center justify-between font-display text-xl font-semibold">
              {p.name}
              <ArrowUpRight className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {p.tags.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </a>
        ))}
      </div>

      <div className="reveal mt-14">
        <h3 className="font-display text-lg font-semibold">Learning projects</h3>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {learningProjects.map((p) => (
            <li key={p.name}>
              <a href={p.link} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-4">
                <span className="font-medium transition group-hover:text-accent">{p.name}</span>
                <span className="flex items-center gap-3">
                  <span className="hidden gap-2 sm:flex">
                    {p.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </span>
                  <ArrowUpRight className="text-muted transition group-hover:text-accent" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost mt-6">
          <GitHub /> More on GitHub
        </a>
      </div>
    </section>
  )
}
