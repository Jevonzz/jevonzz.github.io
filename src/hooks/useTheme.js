import { useCallback, useEffect, useState } from 'react'

export default function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#09090f' : '#fafafc')
  }, [dark])

  const toggle = useCallback(() => {
    setDark((d) => {
      try {
        localStorage.setItem('theme', d ? 'light' : 'dark')
      } catch (e) {
        // Storage can be blocked; the theme still switches for this visit.
      }
      return !d
    })
  }, [])

  return { dark, toggle }
}
