import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { marquee, profile } from '../data/content'
import useReducedMotion from '../hooks/useReducedMotion'
import { ArrowDown, Download, GitHub, LinkedIn } from './Icons'

const HeroScene = lazy(() => import('../three/HeroScene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch (e) {
    return false
  }
}

export default function Hero({ dark }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)

  // Load three.js only after the text has painted, so content never waits on it.
  useEffect(() => {
    if (!hasWebGL()) return
    const start = () => setReady(true)
    const id = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 300)
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  // Stop rendering frames once the hero is scrolled away.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pt-20">
      <div className="grid-bg absolute inset-0 -z-20 opacity-70" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -z-20 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-accent2/10 blur-[120px]" aria-hidden="true" />

      <div className="container-page grid min-h-[calc(100svh-9rem)] items-center gap-6 py-10 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative z-10">
          <p className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.role} at {profile.company.name}
          </p>

          <h1 className="mt-7 font-display text-[2.8rem] font-bold leading-[0.98] tracking-[-0.035em] sm:text-7xl xl:text-[5.5rem]">
            <span className="block text-muted/80">Hi, I'm {profile.name}.</span>
            I build <span className="gradient-text">fast, polished</span> web &amp; mobile apps.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Senior frontend developer in {profile.location}, working with Next.js, React, TypeScript and React Native. I turn product ideas into
            interfaces that feel quick and look sharp.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary px-6 py-3">
              See my work <ArrowDown />
            </a>
            <a href="#contact" className="btn-ghost px-6 py-3">
              Get in touch
            </a>
            {profile.resume && (
              <a href={profile.resume} className="btn-ghost px-6 py-3" download>
                <Download /> CV
              </a>
            )}
            <a href={profile.github} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-surface hover:text-ink" aria-label="GitHub">
              <GitHub />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-surface hover:text-ink" aria-label="LinkedIn">
                <LinkedIn />
              </a>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 sm:opacity-60 lg:pointer-events-auto lg:relative lg:z-auto lg:h-[600px] lg:opacity-100">
          {ready && (
            <Suspense fallback={null}>
              <div className="h-full w-full animate-[fadeIn_1.2s_ease_forwards] opacity-0">
                <HeroScene dark={dark} reducedMotion={reducedMotion} paused={!visible} />
              </div>
            </Suspense>
          )}
          <div className="hidden lg:block" aria-hidden="true">
            <span className="glass absolute left-0 top-[22%] animate-[float_6s_ease-in-out_infinite] rounded-2xl px-4 py-2.5 font-mono text-xs text-muted shadow-xl">
              <span className="text-accent">●</span> Next.js · React
            </span>
            <span className="glass absolute bottom-[20%] right-0 animate-[float_7s_ease-in-out_1s_infinite] rounded-2xl px-4 py-2.5 font-mono text-xs text-muted shadow-xl">
              <span className="text-accent2">●</span> React Native
            </span>
          </div>
        </div>
      </div>

      <div className="marquee relative border-y border-line/70 py-5" aria-label="Technologies I work with">
        <ul className="marquee-track flex w-max gap-12 font-display text-lg font-medium text-muted/80 sm:text-xl">
          {[...marquee, ...marquee].map((t, i) => (
            <li key={i} className="flex items-center gap-12" aria-hidden={i >= marquee.length ? 'true' : undefined}>
              {t}
              <span className="text-accent/60">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
