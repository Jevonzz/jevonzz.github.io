import { about, highlights, profile } from '../data/content'
import { ArrowUpRight } from './Icons'
import SectionHeader from './SectionHeader'

function Stat({ h, delay }) {
  return (
    <div className="card glow-border reveal flex flex-col justify-between p-6" style={{ '--delay': delay }}>
      <dt className="text-sm text-muted">{h.label}</dt>
      <dd className="mt-6 font-display text-3xl font-bold tracking-tight gradient-text">{h.value}</dd>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeader index="01" eyebrow="About" title="Engineer with a designer's eye" />

      <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card glow-border reveal space-y-4 p-6 text-base leading-relaxed text-muted sm:col-span-2 sm:p-8 sm:text-lg lg:row-span-2">
          <dt className="sr-only">About me</dt>
          {about.map((p) => (
            <dd key={p}>{p}</dd>
          ))}
        </div>

        <Stat h={highlights[0]} delay="60ms" />
        <Stat h={highlights[1]} delay="120ms" />

        <div className="card glow-border reveal relative overflow-hidden p-6 sm:col-span-2" style={{ '--delay': '180ms' }}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Now</dt>
          <dd className="relative mt-3">
            <p className="font-display text-2xl font-semibold tracking-tight">{profile.role}</p>
            <p className="mt-1 text-muted">at {profile.company.name}, mainly Next.js</p>
          </dd>
        </div>

        <a href="#work" className="card glow-border reveal group relative overflow-hidden p-6 sm:col-span-2" style={{ '--delay': '60ms' }}>
          <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-accent2/20 blur-3xl" aria-hidden="true" />
          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Building</dt>
          <dd className="relative mt-3 flex items-end justify-between gap-4">
            <span>
              <span className="block font-display text-2xl font-semibold tracking-tight">Baiki</span>
              <span className="mt-1 block text-muted">My own workshop management app</span>
            </span>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </dd>
        </a>

        <Stat h={highlights[2]} delay="120ms" />

        <div className="card glow-border reveal flex flex-col justify-between p-6" style={{ '--delay': '180ms' }}>
          <dt className="text-sm text-muted">Based in</dt>
          <dd className="mt-6 font-display text-3xl font-bold tracking-tight">{profile.location}</dd>
        </div>
      </dl>
    </section>
  )
}
