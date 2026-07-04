import { Faq } from '@/components/faq'

// Ceny (brief §3.9) — "this is the whole edge. Never contact-for-quote."
// Three transparent tiers, middle one anchored as the default choice.
// PRICES ARE PLACEHOLDERS pending owner's real rates; the floor (od 1499 zł)
// comes from the brief's hero chip.
type Tier = {
  name: string
  price: string
  audience: string
  features: string[]
  timeline: string
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Wizytówka',
    price: 'od 1499 zł',
    audience: 'Prosta strona, która robi dobre pierwsze wrażenie i zbiera telefony.',
    features: [
      'Strona typu one page',
      'Wersja mobilna',
      'Formularz kontaktowy',
      'Mapa dojazdu i dane firmy',
      'Podstawowe SEO lokalne',
    ],
    timeline: 'ok. 7 dni',
  },
  {
    name: 'Strona z ofertą',
    price: 'od 2499 zł',
    audience: 'Dla firm, które chcą pokazać pełną ofertę i wyprzedzić konkurencję.',
    features: [
      'Do 5 podstron',
      'Prezentacja usług i realizacji',
      'Opinie klientów z Google',
      'Rozszerzone SEO lokalne',
      'Statystyki odwiedzin',
    ],
    timeline: 'ok. 14 dni',
    featured: true,
  },
  {
    name: 'Na miarę',
    price: 'od 3900 zł',
    audience: 'Rezerwacje, wycena online, coś nietypowego. Zakres ustalamy razem.',
    features: [
      'Wszystko ze Strony z ofertą',
      'Funkcje na zamówienie',
      'Integracje: kalendarz, płatności',
      'Priorytetowy kontakt',
      'Jedna konkretna cena przed startem',
    ],
    timeline: 'termin przed startem',
  },
]

const TRUST_POINTS = ['0 zł zaliczki', 'Płatność przy publikacji', 'Cena znana przed startem']

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-1 shrink-0 text-accent"
    >
      <path d="M4 12.5 10 18 20 6" />
    </svg>
  )
}

export function Pricing() {
  return (
    <section id="ceny" className="mx-auto max-w-content px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Cennik</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Jasne ceny, zero niespodzianek
        </h2>
        <p className="mt-4 text-muted">
          Dokładnie wiesz, za co płacisz i kiedy. Projekt powstaje najpierw, płatność następuje
          przy publikacji.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3 md:items-stretch">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className={`relative flex flex-col rounded-card-lg border bg-paper p-7 ${
              tier.featured
                ? 'border-accent shadow-island md:-translate-y-3'
                : 'border-line'
            }`}
          >
            {tier.featured && (
              <p className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-accent px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white">
                najczęściej wybierana
              </p>
            )}

            <h3 className="font-display text-2xl font-semibold tracking-tight">{tier.name}</h3>
            <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-muted">
              {tier.audience}
            </p>

            <p className="mt-5 font-mono text-3xl tracking-tight">
              {tier.price.split(' ')[0]}{' '}
              <span className="font-medium">{tier.price.split(' ').slice(1).join(' ')}</span>
            </p>
            <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-muted">
              {tier.timeline}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#kontakt"
              className={`mt-8 block rounded-pill px-5 py-3 text-center text-sm font-medium transition-colors motion-reduce:transition-none ${
                tier.featured
                  ? 'bg-accent text-white hover:opacity-90'
                  : 'border border-line hover:border-accent hover:text-accent'
              }`}
            >
              Darmowa wycena
            </a>
          </article>
        ))}
      </div>

      <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {TRUST_POINTS.map((point) => (
          <li
            key={point}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
            {point}
          </li>
        ))}
      </ul>

      <Faq />
    </section>
  )
}
