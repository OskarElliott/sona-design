'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

// O mnie v2 (owner redraft): no name, no photo, no invented reviews.
// MadeByShape pattern: a scroll-driven manifesto (each word inks up from
// faint as the visitor scrolls through it, reactbits ScrollReveal style,
// built natively on our scroll system) followed by a stat row. The words
// ARE the section: motion design as the trust signal.

const SEGMENTS: { text: string; accent?: boolean }[] = [
  { text: 'Sona to studio jednej osoby. Projekt, kod i wdrożenie w jednych rękach. Bez pośredników i bez tłumaczenia niczego dwa razy. Robię mniej projektów naraz, więc Twój dostaje ' },
  { text: 'całą uwagę.', accent: true },
]

const STATS = [
  { value: '1', label: 'osoba, z którą rozmawiasz od początku do końca' },
  { value: '100%', label: 'uwagi dla Twojego projektu, nie dla kolejki zadań' },
  { value: '0', label: 'pośredników, podwykonawców i niespodzianek' },
]

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  accent?: boolean
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity }} className={accent ? 'text-accent' : undefined}>
        {children}
      </motion.span>
    </span>
  )
}

export function About() {
  const reduced = useReducedMotion()
  const manifestoRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 0.85', 'end 0.5'],
  })

  const words = SEGMENTS.flatMap((seg) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, accent: seg.accent }))
  )

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="o-mnie" className="mx-auto max-w-content px-6 py-28">
      <motion.p {...reveal()} className="flex items-center gap-2 text-sm text-muted">
        <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
        O mnie
      </motion.p>

      {/* Scroll-driven word reveal; reduced motion gets the plain paragraph */}
      <p
        ref={manifestoRef}
        className="mt-8 max-w-4xl font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl"
      >
        {reduced
          ? SEGMENTS.map((seg, i) => (
              <span key={i} className={seg.accent ? 'text-accent' : undefined}>
                {seg.text}
              </span>
            ))
          : words.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
                accent={w.accent}
              >
                {w.word}
              </Word>
            ))}
      </p>

      <div className="mt-16 grid gap-10 border-t border-line pt-12 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div key={stat.value} {...reveal(0.1 + i * 0.1)}>
            <p className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
