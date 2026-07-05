'use client'

import { motion, useReducedMotion } from 'framer-motion'

// O mnie (step 7), no-photo version: the trust signal is the conversation
// itself. The site's speech-bubble geometry (brief §1) plays at full scale:
// a chat thread that assembles as you scroll, the Google review arrives as
// a client reply, and a typing indicator leaves the thread open for the
// visitor. REVIEW TEXT IS A PLACEHOLDER awaiting the real Google opinion;
// no Review JSON-LD until it is real (fake structured reviews get sites
// penalized).

const FACTS = [
  'Jedna osoba, zero pośredników',
  'Projekt, kod i wdrożenie w jednych rękach',
  'Kontakt zawsze bezpośredni',
]

const SONA_BUBBLE =
  'max-w-[85%] rounded-2xl rounded-bl-md border border-accent/20 bg-accent-soft/50 px-5 py-3.5 text-sm leading-relaxed'
const CLIENT_BUBBLE =
  'ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink px-5 py-3.5 text-sm leading-relaxed text-paper'

export function About() {
  const reduced = useReducedMotion()

  const pop = (delay = 0, fromRight = false) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18, scale: 0.94, originX: fromRight ? 1 : 0, originY: 1 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="o-mnie" className="mx-auto max-w-content px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr,1.2fr] lg:gap-20">
        <motion.div {...pop()} className="lg:sticky lg:top-32 lg:self-start">
          <p className="flex items-center gap-2 text-sm text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
            O mnie
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Sona to ja.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Oskar. Projektuję, koduję i wdrażam strony internetowe dla lokalnych firm.
            Osobiście, od pierwszej rozmowy do publikacji.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {FACTS.map((fact) => (
              <li key={fact} className="flex items-center gap-2.5 text-sm">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-pill bg-accent" />
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">★ 5.0 w Google</p>
        </motion.div>

        <div className="flex flex-col gap-4" role="list" aria-label="Rozmowa z Sona">
          <motion.div {...pop(0.1)} role="listitem" className={SONA_BUBBLE}>
            Cześć, jestem Oskar 👋 Buduję strony sam, od pierwszej kreski po publikację. Żadnych
            agencyjnych kolejek, żadnych podwykonawców.
          </motion.div>

          <motion.div {...pop(0.25)} role="listitem" className={SONA_BUBBLE}>
            Rozmawiasz zawsze z osobą, która naprawdę robi Twoją stronę. Dlatego wszystko idzie
            szybciej i niczego nie trzeba tłumaczyć dwa razy.
          </motion.div>

          <motion.div {...pop(0.45, true)} role="listitem" className={CLIENT_BUBBLE}>
            <p aria-hidden className="mb-1.5 text-xs text-paper/60">
              ★★★★★ · opinia z Google
            </p>
            Pełen profesjonalizm. Strona wygląda świetnie, a klienci sami mówią, że łatwo było
            nas znaleźć.
          </motion.div>

          <motion.div {...pop(0.65)} role="listitem" className={SONA_BUBBLE}>
            Twoja strona może być następna.{' '}
            <a
              href="#kontakt"
              className="group relative inline-block pb-0.5 font-medium text-ink"
            >
              Napisz do mnie
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          </motion.div>

          {/* The thread stays open for the visitor */}
          <motion.div
            {...pop(0.85)}
            aria-hidden
            className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-paper px-4 py-3.5"
          >
            <span className="typing-dot h-1.5 w-1.5 rounded-pill bg-muted" />
            <span className="typing-dot h-1.5 w-1.5 rounded-pill bg-muted" />
            <span className="typing-dot h-1.5 w-1.5 rounded-pill bg-muted" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
