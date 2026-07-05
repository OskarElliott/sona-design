'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Comparison } from '@/components/comparison'
import { Faq } from '@/components/faq'

// Ceny, v2 (owner feedback): minimal and motion-first. Prices set in the
// display face, no large mono blocks. Firma is the anchored default.
// PRICES still placeholders until owner confirms final rates.
type Tier = {
  name: string
  price: number
  blurb: string
  features: string[]
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Start',
    price: 799,
    blurb: 'Solidna strona na dobry początek. Wszystko, czego potrzebuje lokalna firma, żeby być znajdowaną.',
    features: [
      'Do 4 podstron',
      'Projekt dopasowany do firmy',
      'Wersja mobilna',
      'Formularz kontaktowy',
      'Podstawowe SEO lokalne',
    ],
  },
  {
    name: 'Firma',
    price: 1099,
    blurb: 'Pełna prezentacja oferty dla firmy, która chce być wybierana, nie tylko znajdowana.',
    features: [
      'Do 8 podstron',
      'Prezentacja usług i realizacji',
      'Opinie klientów z Google',
      'Rozszerzone SEO lokalne',
      'Statystyki odwiedzin',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: 1999,
    blurb: 'Rozbudowana strona z funkcjami na miarę i pierwszeństwem w kolejce.',
    features: [
      '9 i więcej podstron',
      'Priorytetowa realizacja',
      'Integracje: kalendarz, rezerwacje, płatności',
      'Pełne SEO lokalne',
      'Opieka po publikacji',
    ],
  },
]

function CheckIcon({ className = 'text-accent' }: { className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`mt-1.5 shrink-0 ${className}`}
    >
      <path d="M4 12.5 10 18 20 6" />
    </svg>
  )
}

export function Pricing() {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="ceny" className="mx-auto max-w-content px-6 py-24">
      <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Pakiety stron
        </h2>
        <p className="mt-4 text-muted">
          Wybierz zakres, resztą zajmę się ja. Płatność dopiero przy publikacji.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3 md:items-stretch">
        {TIERS.map((tier, i) => (
          <motion.article
            key={tier.name}
            {...reveal(i * 0.1)}
            whileHover={reduced ? undefined : { y: -6 }}
            className={`relative flex flex-col rounded-card-lg p-8 ${
              tier.featured
                ? 'bg-ink text-paper shadow-island'
                : 'border border-line bg-paper'
            }`}
          >
            {tier.featured && (
              <p className="absolute -top-3 left-8 rounded-pill bg-accent px-3.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
                najczęściej wybierany
              </p>
            )}

            <h3 className="font-display text-lg font-medium tracking-tight">{tier.name}</h3>

            <p className="mt-4 font-display text-5xl font-semibold tracking-tight">
              <span className={`mr-1.5 align-middle text-base font-normal ${tier.featured ? 'text-paper/50' : 'text-muted'}`}>
                od
              </span>
              {tier.price}
              <span className={`ml-1.5 text-lg font-medium ${tier.featured ? 'text-paper/50' : 'text-muted'}`}>
                PLN
              </span>
            </p>

            <p className={`mt-4 text-sm leading-relaxed ${tier.featured ? 'text-paper/60' : 'text-muted'}`}>
              {tier.blurb}
            </p>

            <ul className={`mt-7 flex flex-col gap-2.5 border-t pt-7 text-sm ${tier.featured ? 'border-paper/15' : 'border-line'}`}>
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#kontakt"
              className={`mt-9 block rounded-pill px-5 py-3 text-center text-sm font-medium transition-colors motion-reduce:transition-none ${
                tier.featured
                  ? 'bg-accent text-white hover:opacity-90'
                  : 'border border-line hover:border-accent hover:text-accent'
              }`}
            >
              Darmowa wycena
            </a>
          </motion.article>
        ))}
      </div>

      <Comparison />
      <Faq />
    </section>
  )
}
