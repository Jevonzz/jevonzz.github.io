import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, Tailwind and three.js.</p>
        <a href="#top" className="hover:text-ink">Back to top ↑</a>
      </div>
    </footer>
  )
}
