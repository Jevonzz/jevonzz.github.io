import { useEffect, useState } from 'react'
import { Close, Menu, Moon, Sun } from './Icons'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ dark, toggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-300 ${
          scrolled || open ? 'border-line bg-canvas/70 shadow-lg shadow-black/5 backdrop-blur-xl' : 'border-transparent'
        }`}
        aria-label="Main"
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          jevon<span className="gradient-text">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition hover:text-ink ${
                  active === l.href ? 'bg-ink/[0.06] text-ink dark:bg-white/10' : 'text-muted'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-ink/[0.06] hover:text-ink dark:hover:bg-white/10"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <a href="#contact" className="btn-primary hidden py-2 sm:inline-flex">
            Let's talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="glass mx-auto mt-2 flex max-w-4xl flex-col gap-1 rounded-3xl p-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-ink/[0.06] dark:hover:bg-white/10">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
