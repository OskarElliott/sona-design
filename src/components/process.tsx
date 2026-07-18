'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Jak to działa (step 8), MadeByShape-pattern per owner reference: sticky
// left rail (heading + intro + link), numbered hairline rows right with
// the red corner arrow. The heading's asterisk resolves to the payment
// promise, same symbol language as the hero. Dot grid lives ONLY here
// (brief §1). SEO: real <ol> semantics, h2 -> h3 hierarchy, HowTo JSON-LD.

const STEPS = [
  {
    name: 'Rozmowa',
    text: 'Krótka rozmowa o Twojej firmie i tym, czego potrzebujesz. Ustalamy zakres, jedną konkretną cenę i termin. Zero zobowiązań.',
  },
  {
    name: 'Projekt',
    text: 'Projektuję i buduję Twoją stronę internetową. Widzisz postępy na bieżąco i zgłaszasz uwagi, zanim cokolwiek trafi do sieci.',
  },
  {
    name: 'Publikacja',
    text: 'Strona idzie w świat: domena, hosting i widoczność w Google. Płacisz dopiero teraz, kiedy wszystko działa.',
  },
]

const HOWTO_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Jak powstaje strona internetowa w Sona',
  description:
    'Trzy kroki od pierwszej rozmowy do opublikowanej strony internetowej, z płatnością dopiero przy publikacji.',
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
}

export function Process() {
  const reduced = useReducedMotion()

  const reveal = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="jak-to-dziala" className="dot-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_JSON_LD) }}
      />
      <div className="mx-auto grid max-w-content gap-12 px-6 py-24 lg:grid-cols-[1fr,1.4fr] lg:gap-20">
        <motion.div {...reveal()} className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Jak to działa<span className="text-accent">*</span>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Tworzenie strony internetowej w trzech prostych krokach: od pierwszej rozmowy do
            strony, która pracuje na Ciebie. Bez zaliczek i bez niespodzianek.
          </p>
          <p className="mt-4 text-sm text-muted">
            <span className="text-accent">*</span> Płatność dopiero przy publikacji.
          </p>
          <a
            href="#kontakt"
            className="group relative mt-8 inline-flex items-center gap-1.5 pb-1 text-sm font-medium"
          >
            Darmowa wycena
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
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </a>
        </motion.div>

        <ol className="border-t border-line">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.name}
              {...reveal(0.08 + i * 0.1)}
              className="group relative border-b border-line py-9"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="absolute right-1 top-9 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
              <div className="flex items-start gap-6 pr-10">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft/60 text-xs font-medium text-accent"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent motion-reduce:transition-none md:text-3xl">
                    {step.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
