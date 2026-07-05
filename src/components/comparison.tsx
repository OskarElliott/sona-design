'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Package comparison between the tier cards and the FAQ. The Firma column
// carries a soft continuous highlight; rows reveal in a stagger on scroll.
// true → check, false → quiet dash, string → literal value.
const PACKAGES = ['Start', 'Firma', 'Premium'] as const

const ROWS: { label: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { label: 'Liczba podstron', values: ['do 4', 'do 8', '9+'] },
  { label: 'Projekt dopasowany do firmy', values: [true, true, true] },
  { label: 'Wersja mobilna', values: [true, true, true] },
  { label: 'Formularz kontaktowy', values: [true, true, true] },
  { label: 'SEO lokalne', values: ['podstawowe', 'rozszerzone', 'pełne'] },
  { label: 'Opinie klientów z Google', values: [false, true, true] },
  { label: 'Statystyki odwiedzin', values: [false, true, true] },
  { label: 'Integracje: kalendarz, rezerwacje, płatności', values: [false, false, true] },
  { label: 'Priorytetowa realizacja', values: [false, false, true] },
  { label: 'Czas realizacji', values: ['ok. 7 dni', 'ok. 14 dni', 'ustalany razem'] },
  { label: 'Poprawki po publikacji', values: ['14 dni', '30 dni', '60 dni'] },
]

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="tak"
        role="img"
        className="mx-auto text-accent"
      >
        <path d="M4 12.5 10 18 20 6" />
      </svg>
    )
  }
  if (value === false) {
    return (
      <span aria-label="nie" className="text-line">
        &ndash;
      </span>
    )
  }
  return <span>{value}</span>
}

export function Comparison() {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <div className="mx-auto mt-28 max-w-4xl">
      <motion.h3
        {...reveal()}
        className="text-center font-display text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Porównaj pakiety
      </motion.h3>

      {/* Mobile: stacked per-package cards. The scroll-table pattern fails
          here: with the bar hidden there is no hint that it scrolls. */}
      <div className="mt-10 flex flex-col gap-5 md:hidden">
        {PACKAGES.map((name, col) => (
          <motion.div
            key={name}
            {...reveal(0.05 + col * 0.08)}
            className={`rounded-card-lg border p-5 ${
              name === 'Firma' ? 'border-accent/30 bg-accent-soft/20' : 'border-line'
            }`}
          >
            <p className="font-display text-lg font-medium tracking-tight">{name}</p>
            <ul className="mt-3 flex flex-col">
              {ROWS.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-t border-line py-2.5 text-sm"
                >
                  <span className="text-muted">{row.label}</span>
                  <span className="shrink-0 text-right">
                    <Cell value={row.values[col]} />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="no-scrollbar mt-10 hidden overflow-x-auto md:block">
        <div className="min-w-[40rem]">
          {/* Header */}
          <motion.div
            {...reveal(0.05)}
            className="grid grid-cols-[1.5fr,1fr,1fr,1fr] items-end"
          >
            <span aria-hidden />
            {PACKAGES.map((name) => (
              <p
                key={name}
                className={`pb-4 pt-5 text-center font-display text-lg font-medium tracking-tight ${
                  name === 'Firma' ? 'rounded-t-card bg-accent-soft/40' : ''
                }`}
              >
                {name}
              </p>
            ))}
          </motion.div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              {...reveal(0.05 + i * 0.04)}
              className="grid grid-cols-[1.5fr,1fr,1fr,1fr] items-center border-t border-line"
            >
              <p className="py-4 pr-6 text-sm text-muted">{row.label}</p>
              {row.values.map((value, col) => (
                <div
                  key={col}
                  className={`self-stretch py-4 text-center text-sm content-center ${
                    col === 1 ? 'bg-accent-soft/40' : ''
                  } ${i === ROWS.length - 1 && col === 1 ? 'rounded-b-card' : ''}`}
                >
                  <Cell value={value} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
