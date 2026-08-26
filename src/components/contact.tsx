'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_DISPLAY, SITE_WHATSAPP } from '@/lib/site'

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

          {/* Channels first: this audience messages and calls, it does not
              fill in forms. WhatsApp is the primary action. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={SITE_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
              </svg>
              Napisz na WhatsApp
            </a>
            <a
              href={`tel:${SITE_PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>
              {SITE_PHONE_DISPLAY}
            </a>
          </div>

          <p className="mt-5 text-sm text-muted">
            Wolisz e-mail?{' '}
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
          <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
            W danym miesiącu prowadzę najwyżej trzy projekty. Jeśli akurat mam komplet, po prostu
            ustalimy termin startu.
          </p>
        </motion.div>

        <motion.form
          {...reveal(0.12)}
          onSubmit={onSubmit}
          className="rounded-card-lg border border-line bg-paper p-7 md:p-9"
        >
          <p className="text-sm text-muted">Wolisz formularz? Też działa.</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
            {/* Phone required, e-mail optional: this audience calls. */}
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="k-phone" hint="wymagane">
                Telefon
              </FieldLabel>
              <input
                id="k-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={INPUT_CLASSES}
                {...validityProps}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <FieldLabel htmlFor="k-email" hint="opcjonalnie">
              E-mail
            </FieldLabel>
            <input
              id="k-email"
              name="email"
              type="email"
              autoComplete="email"
              className={INPUT_CLASSES}
              {...validityProps}
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
