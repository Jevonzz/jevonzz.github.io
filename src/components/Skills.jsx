import { skillGroups } from '../data/content'
import SectionHeader from './SectionHeader'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader eyebrow="Skills" title="My toolkit" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((g, i) => (
          <div key={g.title} className="card reveal p-6" style={{ '--delay': `${(i % 2) * 90}ms` }}>
            <h3 className="font-display font-semibold">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s.name} className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent/50">
                  <img src={s.icon} alt="" className={`h-5 w-5 object-contain ${s.invert ? "dark:invert" : ""}`} loading="lazy" width="20" height="20" />
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
