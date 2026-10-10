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
      <SectionHeader index="03" eyebrow="Selected work" title="Things I've built">
        A mix of full-stack apps and front-end experiments. Starting with products I build and run myself, followed by open-source projects you can dig into on GitHub.
      </SectionHeader>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <article
            key={p.name}
            onMouseMove={trackSpotlight}
            className="card glow-border spotlight reveal group flex flex-col p-5 transition duration-500 hover:-translate-y-1 sm:p-6"
            style={{ '--delay': `${(i % 2) * 90}ms` }}
          >
            {p.image ? (
              <div className="mb-6 overflow-hidden rounded-2xl border border-line">
                <img src={p.image} alt={`${p.name} screenshot`} className="aspect-[1200/630] w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading="lazy" />
              </div>
            ) : (
              <div className={`mb-6 grid aspect-[1200/630] place-items-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br ${p.hue} p-4`} aria-hidden="true">
                <div className="w-full max-w-sm rounded-lg border border-line bg-canvas/80 shadow-xl backdrop-blur transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                  <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="space-y-2 p-4 font-mono text-xs leading-relaxed">
                    <p><span className="text-accent">const</span> project = <span className="text-accent2">'{p.name}'</span></p>
                    <p><span className="text-accent">const</span> stack = [{p.tags.map((t) => `'${t}'`).join(', ')}]</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-4 px-1">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">{p.kind}</span>
            </div>
            <p className="mt-3 flex-1 px-1 text-sm leading-relaxed text-muted">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2 px-1" aria-label="Technologies">
              {p.tags.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
            {p.demo && (
              <p className="mt-4 rounded-lg border border-dashed border-line px-3 py-2 text-xs text-muted">
                Demo login: <span className="font-mono text-ink">{p.demo.email}</span> · <span className="font-mono text-ink">{p.demo.password}</span>
              </p>
            )}
            {p.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 px-1">
                {p.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn-ghost py-2" aria-label={`${p.name}: ${l.label}`}>
                    {l.label} <ArrowUpRight />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="reveal mt-14">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Learning projects</h3>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {learningProjects.map((p) => (
            <li key={p.name}>
              <a href={p.link} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-4">
                <span className="font-display text-lg font-medium transition group-hover:translate-x-1 group-hover:text-accent sm:text-xl">{p.name}</span>
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
