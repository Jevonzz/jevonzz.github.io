import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-2 pt-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, Tailwind and three.js.</p>
        <a href="#top" className="hover:text-ink">Back to top ↑</a>
      </div>
      <p
        className="pointer-events-none select-none bg-gradient-to-b from-ink/15 to-transparent bg-clip-text text-center font-display text-[24vw] font-bold leading-[0.8] tracking-[-0.06em] text-transparent"
        aria-hidden="true"
      >
        jevon.
      </p>
    </footer>
  )
}
