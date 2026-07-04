'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { useTheme } from 'next-themes'

const LINKS = [
  { href: '#projekty', label: 'Projekty' },
  { href: '#o-mnie', label: 'O mnie' },
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#ceny', label: 'Ceny' },
  { href: '#kontakt', label: 'Kontakt' },
]

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Theme is unknowable server-side; swap the icon in only after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Włącz tryb jasny' : 'Włącz tryb ciemny'}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:bg-accent-soft motion-reduce:transition-none"
    >
      {mounted ? (dark ? <SunIcon /> : <MoonIcon />) : <span className="h-4 w-4" aria-hidden />}
    </button>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  // ONE scroll source (brief §4): Framer Motion reads native scroll. No Lenis.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Esc closes the sheet; body scroll locks while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const geometry = reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 260, damping: 30 }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4">
      {/* Full-width and transparent at rest → detached shadowed pill on scroll.
          Framer animates the geometry; paint (bg/shadow/border) transitions in CSS. */}
      <motion.nav
        aria-label="Główna nawigacja"
        initial={false}
        animate={{
          maxWidth: scrolled ? '56rem' : '80rem',
          marginTop: scrolled ? '0.75rem' : '0rem',
          borderRadius: scrolled ? 9999 : 0,
          paddingLeft: scrolled ? '1.25rem' : '0.75rem',
          paddingRight: scrolled ? '1.25rem' : '0.75rem',
        }}
        transition={geometry}
        className={`flex w-full items-center justify-between gap-3 border py-2.5 transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none ${
          scrolled
            ? 'border-line bg-paper/85 shadow-island backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#" className="rounded-pill font-display text-2xl font-semibold tracking-tight">
          Sona<span className="text-accent">.</span>
        </a>

        {/* Desktop links. Hover rolls the label upward while its duplicate
            rises from below (reduced motion: plain colour change only). */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group rounded-pill px-3.5 py-2 text-sm text-muted transition-colors hover:bg-accent-soft/60 hover:text-ink motion-reduce:transition-none"
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  {l.label}
                </span>
                <span
                  aria-hidden
                  className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:hidden"
                >
                  {l.label}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#kontakt"
            className="hidden rounded-pill bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none sm:inline-block"
          >
            Darmowa wycena
          </a>
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Otwórz menu"
            className="flex h-9 w-9 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:bg-accent-soft motion-reduce:transition-none md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-ink/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ opacity: 0, y: reduced ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -12 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-3 rounded-card-lg border border-line bg-paper p-5 shadow-island md:hidden"
            >
              <div className="flex items-center justify-between">
                <a href="#" onClick={() => setOpen(false)} className="rounded-pill font-display text-2xl font-semibold tracking-tight">
                  Sona<span className="text-accent">.</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Zamknij menu"
                  className="flex h-9 w-9 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:bg-accent-soft motion-reduce:transition-none"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <nav aria-label="Menu mobilne" className="mt-4 flex flex-col">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-card-sm border-b border-line px-2 py-3.5 font-display text-xl last:border-0 hover:text-accent"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-4 block rounded-pill bg-accent px-5 py-3 text-center font-medium text-white"
              >
                Darmowa wycena
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
