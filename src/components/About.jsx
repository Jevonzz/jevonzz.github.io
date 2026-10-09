import { about, highlights } from '../data/content'
import SectionHeader from './SectionHeader'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <SectionHeader eyebrow="About" title="Engineer with a designer's eye" />
          <div className="reveal mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {highlights.map((h, i) => (
            <div key={h.label} className="card reveal p-4 sm:p-6" style={{ '--delay': `${i * 90}ms` }}>
              <dt className="text-xs text-muted sm:text-sm">{h.label}</dt>
              <dd className="mt-1 font-display text-xl font-bold sm:text-3xl gradient-text">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
