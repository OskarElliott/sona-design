'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { reveal as sharedReveal } from '@/lib/motion'

// O mnie: no name, no photo, no invented reviews. A scroll-driven
// manifesto where each word inks up as the visitor scrolls through it.
// The words ARE the section: motion design as the trust signal.
//
// The old 1 / 100% / 0 row was rhetoric formatted to look like data, so it
// was cut rather than dressed up. A stat row returns only when there are
// real countable facts to put in it (projects shipped, years, response
// time). The one hard number available today, capacity, lives in the
// sentence below instead.

// Copy deliberately echoes the H1 ("projektuję strony internetowe",
// "dzwoni telefon") so the heading's terms exist in body text (SEO audit).
const SEGMENTS: { text: string; accent?: boolean }[] = [
  { text: 'Sona to studio jednej osoby. Projektuję strony internetowe, przez które dzwoni telefon: projekt, kod i wdrożenie w jednych rękach, bez pośredników i bez tłumaczenia tego samego dwa razy. Robię najwyżej trzy projekty w miesiącu, więc Twój dostaje ' },
  { text: 'całą uwagę.', accent: true },
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
  // Plain inline spans with REAL trailing spaces: spacing via margin left
  // the textContent space-less, which SEO parsers read as one giant word.
  return (
    <motion.span style={{ opacity }} className={accent ? 'text-accent' : undefined}>
      {children}{' '}
    </motion.span>
  )
}

export function About() {
  const reduced = useReducedMotion()
  // Progress tracks the SECTION top so the reveal is guaranteed complete
  // by the time an anchor jump lands (scroll-margin puts the section top
  // at 88px, i.e. under ~14% of any viewport 630px or taller).
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.14'],
  })

  const words = SEGMENTS.flatMap((seg) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, accent: seg.accent }))
  )

  // Shared page-wide reveal (see lib/motion.ts).
  const reveal = (delay = 0) => sharedReveal(reduced, { delay })

  return (
    <section ref={sectionRef} id="o-mnie" className="mx-auto max-w-content px-6 py-28">
      <motion.p {...reveal()} className="flex items-center gap-2 text-sm text-muted">
        <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
        O mnie
      </motion.p>

      {/* Scroll-driven word reveal; reduced motion gets the plain paragraph */}
      <p className="mt-8 max-w-4xl font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
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

    </section>
  )
}
