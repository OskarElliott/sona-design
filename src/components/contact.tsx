'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SITE_EMAIL } from '@/lib/site'

// Kontakt (step 10) — hybrid of the owner's two references. From Shape:
// the warm oversized greeting, the "hate contact forms?" email escape
// hatch, phone kept optional. From adream: the wymagane field hints, the
// RODO consent line, the message-first form. Fields are deliberately few:
// every extra input costs conversions.
//
// INTERIM SUBMIT: opens the visitor's mail app with the message prefilled
// (works with zero backend). Swap for a Resend API route before launch,
// like PlumbingCraft.

const INPUT_CLASSES =
  'w-full rounded-card border border-line bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent motion-reduce:transition-none'

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm">
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  )
}

export function Contact() {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const phone = String(data.get('phone') ?? '')
    const message = String(data.get('message') ?? '')
    const body = encodeURIComponent(
      `${message}\n\n${name}\n${email}${phone ? `\n${phone}` : ''}`
    )
    window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
      `Darmowa wycena: ${name}`
    )}&body=${body}`
  }

  return (
    <section id="kontakt" className="mx-auto max-w-content px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr] lg:gap-16">
        <motion.div {...reveal()} className="flex flex-col justify-center">
          <p className="flex items-center gap-2 text-sm text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
            Kontakt
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Pogadajmy o Twojej stronie
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Opisz krótko swoją firmę i czego potrzebujesz. Odpowiadam zwykle tego samego dnia,
            z konkretną ceną i terminem.
          </p>

          <p className="mt-8 text-sm text-muted">
            Nie lubisz formularzy?{' '}
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="group relative inline-block pb-0.5 font-medium text-ink"
            >
              {SITE_EMAIL}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">Zero spamu. Odpowiadam osobiście.</p>
        </motion.div>

        <motion.form
          {...reveal(0.12)}
          onSubmit={onSubmit}
          className="rounded-card-lg border border-line bg-paper p-7 md:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="k-name" hint="wymagane">
                Imię
              </FieldLabel>
              <input
                id="k-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Jan Kowalski"
                className={INPUT_CLASSES}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="k-email" hint="wymagane">
                E-mail
              </FieldLabel>
              <input
                id="k-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jan@firma.pl"
                className={INPUT_CLASSES}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <FieldLabel htmlFor="k-phone" hint="opcjonalnie">
              Telefon
            </FieldLabel>
            <input
              id="k-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="600 000 000"
              className={INPUT_CLASSES}
            />
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <FieldLabel htmlFor="k-message" hint="wymagane">
              Wiadomość
            </FieldLabel>
            <textarea
              id="k-message"
              name="message"
              required
              rows={5}
              placeholder="Opowiedz krótko o swojej firmie i czego potrzebuje Twoja strona."
              className={`${INPUT_CLASSES} resize-none`}
            />
          </div>

          <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#E5322B]"
            />
            Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na wiadomość.
          </label>

          <button
            type="submit"
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none sm:w-auto"
          >
            Wyślij wiadomość
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </motion.form>
      </div>
    </section>
  )
}
