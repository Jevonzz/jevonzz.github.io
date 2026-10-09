import { skillGroups } from '../data/content'
import SectionHeader from './SectionHeader'

export default function Skills() {
  const [main, ...rest] = skillGroups
  return (
    <section id="skills" className="section">
      <SectionHeader index="04" eyebrow="Skills" title="My toolkit" />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="card glow-border reveal p-6 sm:p-8 lg:col-span-2 lg:row-span-3">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{main.title}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {main.items.map((s) => (
              <li key={s.name} className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-canvas/60 p-3 text-center text-sm font-medium transition duration-300 hover:-translate-y-1 hover:border-accent/50">
                <img src={s.icon} alt="" className={`h-10 w-10 object-contain ${s.invert ? 'dark:invert' : ''}`} width="40" height="40" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
        {rest.map((g, i) => (
          <div key={g.title} className="card glow-border reveal p-6" style={{ '--delay': `${(i + 1) * 80}ms` }}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s.name} className="flex items-center gap-2 rounded-xl border border-line bg-canvas/60 px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent/50">
                  <img src={s.icon} alt="" className={`h-5 w-5 object-contain ${s.invert ? 'dark:invert' : ''}`} width="20" height="20" />
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
