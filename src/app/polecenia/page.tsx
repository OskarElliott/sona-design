import Link from 'next/link'
import { Footer } from '@/components/footer'
import { SITE_PHONE, SITE_PHONE_DISPLAY, SITE_WHATSAPP } from '@/lib/site'

// Referral page. Deliberately UNLINKED from the site navigation and
// noindexed: it is a link to hand to a client after delivery, not a public
// offer. Also excluded from sitemap.ts and disallowed in robots.ts.
export const metadata = {
  title: 'Polecenia',
  robots: { index: false, follow: false },
}

// ──────────────────────────────────────────────────────────────────────────
// TODO: wpisz kwotę nagrody za polecenie, np. '200 zł'.
// Dopóki tu jest null, strona mówi o nagrodzie bez podawania kwoty.
// ──────────────────────────────────────────────────────────────────────────
const REFERRAL_REWARD: string | null = null

export default function Polecenia() {
  return (
    <main>
      <section className="mx-auto max-w-content px-6 pb-24 pt-40">
        <div className="mx-auto max-w-2xl">
          <p className="flex items-center gap-2 text-sm text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
            Dla klientów
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Polecisz mnie dalej?
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted">
            Jeśli znasz firmę, której przydałaby się porządna strona, przekaż jej mój numer albo
            tę stronę. Kiedy z Twojego polecenia dojdzie do współpracy i strona zostanie
            opublikowana, dostajesz ode mnie{' '}
            <span className="font-medium text-ink">
              {REFERRAL_REWARD ?? 'nagrodę, którą ustalimy wcześniej'}
            </span>
            . Bez haczyków i bez limitu poleceń.
          </p>

          <div className="mt-10 rounded-card-lg border border-line bg-paper p-7 md:p-8">
            <p className="text-sm font-medium">Jak to działa</p>
            <ol className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-muted">
              <li className="flex gap-3">
                <span className="font-medium text-accent">1.</span>
                Dajesz znajomemu mój numer albo adres tej strony.
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-accent">2.</span>
                Powiedz mu, żeby wspomniał, że to od Ciebie. Albo napisz mi sam, kogo polecasz.
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-accent">3.</span>
                Kiedy jego strona zostanie opublikowana, przekazuję Ci nagrodę.
              </li>
            </ol>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={SITE_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none"
            >
              Napisz na WhatsApp
            </a>
            <a
              href={`tel:${SITE_PHONE}`}
              className="inline-flex items-center justify-center rounded-pill border border-line px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none"
            >
              {SITE_PHONE_DISPLAY}
            </a>
          </div>

          <p className="mt-10 text-sm text-muted">
            <Link href="/" className="underline decoration-line underline-offset-4 hover:text-ink">
              Wróć na stronę główną
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
