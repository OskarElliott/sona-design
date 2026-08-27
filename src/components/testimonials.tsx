'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { reveal as sharedReveal } from '@/lib/motion'

// Social proof. NOTHING HERE MAY BE INVENTED: the array below holds a
// single obvious placeholder so the layout can be reviewed. The section
// does not render at all while the array is empty, and it lays out
// correctly with one, two or three entries.
type Testimonial = {
  quote: string
  name: string
  company: string
  role?: string
  logo?: string
  url?: string
}

// ──────────────────────────────────────────────────────────────────────────
// REPLACE: wstaw prawdziwe opinie klientów albo zostaw pustą tablicę.
// Dopóki tablica jest pusta, sekcja w ogóle się nie renderuje.
// Nie wymyślaj cytatów, nazwisk ani firm.
// ──────────────────────────────────────────────────────────────────────────
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'PLACEHOLDER: miejsce na prawdziwą opinię klienta. Zastąp ten tekst tym, co klient napisał własnymi słowami.',
    name: 'PLACEHOLDER: imię i nazwisko',
    company: 'PLACEHOLDER: nazwa firmy',
    role: 'PLACEHOLDER: stanowisko (opcjonalnie)',
  },
]

function QuoteMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="text-accent/25"
    >
      <path d="M9.5 5C6.5 6.6 5 9.2 5 12.6V19h6.2v-6.4H8.4c0-2.2.8-3.8 2.4-4.8L9.5 5Zm9.3 0c-3 1.6-4.5 4.2-4.5 7.6V19H20v-6.4h-2.8c0-2.2.8-3.8 2.4-4.8L18.8 5Z" />
    </svg>
  )
}

export function Testimonials() {
  const reduced = useReducedMotion()

  // No real proof yet means no section. Better an honest gap than filler.
  if (TESTIMONIALS.length === 0) return null

  // Shared page-wide reveal (see lib/motion.ts).
  const reveal = (delay = 0) => sharedReveal(reduced, { delay })

  const single = TESTIMONIALS.length === 1

  return (
    <section id="opinie" className="mx-auto max-w-content px-6 py-24">
      <motion.h2
        {...reveal()}
        className="text-center font-display text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Co mówią klienci
      </motion.h2>

      <div
        className={`mx-auto mt-12 grid gap-6 ${
          single ? 'max-w-2xl' : 'max-w-5xl md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={`${t.name}-${i}`}
            {...reveal(0.08 + i * 0.08)}
            className="flex flex-col rounded-card-lg border border-line bg-paper p-7 md:p-8"
          >
            <QuoteMark />
            <blockquote
              className={`mt-5 flex-1 leading-relaxed ${single ? 'text-lg md:text-xl' : ''}`}
            >
              {t.quote}
            </blockquote>
            <figcaption className="mt-7 border-t border-line pt-5 text-sm">
              <p className="font-medium">{t.name}</p>
              <p className="mt-1 text-muted">
                {t.role ? `${t.role}, ` : ''}
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line underline-offset-4 hover:text-ink"
                  >
                    {t.company}
                  </a>
                ) : (
                  t.company
                )}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
