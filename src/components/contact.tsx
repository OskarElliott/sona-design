'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE_EMAIL } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

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
  'w-full rounded-card border border-line bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent motion-reduce:transition-none'

// Native validation bubbles follow the BROWSER language, not the page's
// lang="pl" — so we set Polish messages ourselves. When the English
// version lands, these strings move into the translation layer.
type FieldEl = HTMLInputElement | HTMLTextAreaElement
function setPolishValidity(el: FieldEl) {
  if (el.validity.valueMissing) {
    el.setCustomValidity(
      el.type === 'checkbox' ? 'Zaznacz zgodę, żebym mógł odpowiedzieć.' : 'Uzupełnij to pole.'
    )
  } else if (el.validity.typeMismatch) {
    el.setCustomValidity('Podaj poprawny adres e-mail.')
  } else {
    el.setCustomValidity('')
  }
}
const validityProps = {
  onInvalid: (e: React.FormEvent<FieldEl>) => setPolishValidity(e.currentTarget),
  onInput: (e: React.FormEvent<FieldEl>) => e.currentTarget.setCustomValidity(''),
}

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
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          message: data.get('message'),
          consent: data.get('consent') === 'on',
          company: data.get('company'), // honeypot
        }),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: '' }))
        setErrorMsg(error || 'Nie udało się wysłać. Spróbuj ponownie.')
        setStatus('error')
        return
      }
      form.reset()
      setStatus('success')
    } catch {
      setErrorMsg('Brak połączenia. Spróbuj ponownie.')
      setStatus('error')
    }
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
                className={INPUT_CLASSES}
                {...validityProps}
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
                className={INPUT_CLASSES}
                {...validityProps}
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
              className={`${INPUT_CLASSES} resize-none`}
              {...validityProps}
            />
          </div>

          <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent))]"
              {...validityProps}
            />
            Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na wiadomość.
          </label>

          {/* Honeypot: hidden from people, catnip for bots. Not required, not
              autofilled; any value means "bot" (handled server-side). */}
          <div aria-hidden className="absolute left-[-9999px] top-[-9999px]" tabIndex={-1}>
            <label>
              Firma
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {status === 'success' ? (
            <p
              role="status"
              className="mt-7 rounded-card border border-accent/30 bg-accent-soft/40 px-5 py-4 text-sm"
            >
              Dziękuję, wiadomość dotarła. Odpowiadam zwykle tego samego dnia.
            </p>
          ) : (
            <>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-70 motion-reduce:transition-none sm:w-auto"
              >
                {status === 'submitting' ? 'Wysyłam…' : 'Wyślij wiadomość'}
                {status !== 'submitting' && (
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
                )}
              </button>
              {status === 'error' && (
                <p role="alert" className="mt-4 text-sm text-accent">
                  {errorMsg} Możesz też napisać na{' '}
                  <a href={`mailto:${SITE_EMAIL}`} className="underline">
                    {SITE_EMAIL}
                  </a>
                  .
                </p>
              )}
            </>
          )}
        </motion.form>
      </div>
    </section>
  )
}
