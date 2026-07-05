'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// FAQ at the bottom of Ceny. Answers stay mounted (height-animated, never
// unmounted) so the full text ships in the served HTML for crawlers, and
// the FAQPage JSON-LD mirrors the visible content 1:1. Google shows FAQ
// rich results mostly for gov/health sites since 2023, so the win here is
// long-tail query coverage, not guaranteed snippet stars.

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Czy muszę płacić z góry?',
    answer:
      'Nie. Projekt powstaje najpierw, a płatność następuje dopiero przy publikacji strony. Zero zaliczek.',
  },
  {
    question: 'Ile trwa zrobienie strony?',
    answer:
      'Pakiet Start to zwykle około tygodnia od pierwszej rozmowy. Firma potrzebuje około dwóch tygodni, a przy Premium termin ustalamy wspólnie przed startem.',
  },
  {
    question: 'Skąd cena od, a nie jedna sztywna?',
    answer:
      'Bo zakres bywa różny. Po krótkiej rozmowie dostajesz jedną konkretną cenę i ona już się nie zmienia.',
  },
  {
    question: 'Czy strona będzie widoczna w Google?',
    answer:
      'Tak. Każda strona ma SEO lokalne: opisy usług, dane firmy, mapę i szybkie ładowanie. To fundament, dzięki któremu znajdą Cię klienci z okolicy.',
  },
  {
    question: 'Czy pomagasz z domeną i hostingiem?',
    answer:
      'Tak, biorę na siebie całą techniczną stronę: domenę, hosting i pocztę firmową. Ty zajmujesz się swoją robotą.',
  },
  {
    question: 'Co jeśli po publikacji będę chciał coś zmienić?',
    answer:
      'Każdy pakiet ma okres darmowych poprawek po publikacji: od dwóch tygodni w Starcie do dwóch miesięcy w Premium. Później możesz zlecać zmiany pojedynczo albo wykupić stałą opiekę.',
  },
]

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export function Faq() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div id="faq" className="mx-auto mt-28 max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <motion.h3
        {...reveal}
        className="text-center font-display text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Częste pytania
      </motion.h3>

      <motion.div {...reveal} className="mt-10 border-t border-line">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.question} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium tracking-tight transition-colors hover:text-accent motion-reduce:transition-none"
              >
                {faq.question}
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                  className="shrink-0 text-muted"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <path d="M12 5v14M5 12h14" />
                </motion.svg>
              </button>

              <motion.div
                id={`faq-answer-${i}`}
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }
                }
                className="overflow-hidden"
              >
                <motion.p
                  animate={reduced ? undefined : { y: isOpen ? 0 : 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="pb-6 pr-10 text-sm leading-relaxed text-muted"
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
