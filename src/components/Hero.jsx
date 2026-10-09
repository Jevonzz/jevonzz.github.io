import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
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
    <section id="top" ref={ref} className="relative isolate overflow-hidden pt-16">
      <div className="grid-bg absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/3 -z-20 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px] lg:left-[70%]"
        aria-hidden="true"
      />

      <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-6 py-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.role} at {profile.company.name}
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            Hi, I'm {profile.name}.
            <br />
            I build <span className="gradient-text">fast, polished</span> web &amp; mobile apps.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Frontend engineer in {profile.location}, working with React, TypeScript and Flutter. I turn product ideas into
            interfaces that feel quick and look sharp.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              See my work <ArrowDown />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
            {profile.resume && (
              <a href={profile.resume} className="btn-ghost" download>
                <Download /> CV
              </a>
            )}
          </div>

          <div className="mt-8 flex items-center gap-2 text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-surface hover:text-ink" aria-label="GitHub">
              <GitHub />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-surface hover:text-ink" aria-label="LinkedIn">
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
        </div>
      </div>
    </section>
  )
}
