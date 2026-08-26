'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { reveal, revealAt } from '@/lib/motion'

// The payment promise, promoted from a hero footnote to its own block.
// It is the strongest differentiator on offer, so it gets stated plainly:
// no marketing adjectives, second person singular, no em dashes.
const PROMISES = [
  'Projektuję i buduję Twoją stronę.',
  'Oglądasz gotowy efekt, zanim zapłacisz cokolwiek.',
  'Jeśli nie chcesz strony, po prostu rezygnujesz. Nie kosztuje Cię to nic.',
  'Zero zaliczek.',
]

export function Guarantee() {
  const reduced = useReducedMotion()

  return (
    <section id="gwarancja" className="mx-auto max-w-content px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-card-lg border border-line bg-paper p-8 md:p-12">
        <motion.h2
          {...reveal(reduced)}
          className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
        >
          Najpierw strona.<br />
          <span className="text-accent">Płacisz na końcu.</span>
        </motion.h2>

        <ul className="mt-10 flex flex-col gap-5">
          {PROMISES.map((promise, i) => (
            <motion.li
              key={promise}
              {...revealAt(reduced, i, { delay: 0.08 })}
              className="flex items-start gap-4 text-lg leading-relaxed md:text-xl"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="mt-2 shrink-0 text-accent"
              >
                <path d="M4 12.5 10 18 20 6" />
              </svg>
              <span>{promise}</span>
            </motion.li>
          ))}
        </ul>

        <motion.p {...reveal(reduced, { delay: 0.4 })} className="mt-10 border-t border-line pt-6 text-muted">
          Tak pracuję z każdym klientem.
        </motion.p>
      </div>
    </section>
  )
}
