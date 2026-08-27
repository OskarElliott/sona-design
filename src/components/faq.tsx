'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE, reveal as sharedReveal } from '@/lib/motion'

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
      'Pakiet Start to zwykle około tygodnia od pierwszej rozmowy. Pakiet Firma potrzebuje około dwóch tygodni, a przy Premium termin ustalamy wspólnie przed startem.',
  },
  {
    question: 'Dlaczego cena jest „od”, a nie sztywna?',
    answer:
      'Bo zakres bywa różny. Po krótkiej rozmowie dostajesz jedną konkretną cenę i ona już się nie zmienia.',
  },
  {
    question: 'Czy strona będzie widoczna w Google?',
    answer:
      'Tak. Każda strona ma SEO lokalne: opisy usług, dane firmy, mapę i szybkie ładowanie. To fundament, dzięki któremu znajdą Cię klienci, którzy szukają takich usług jak Twoje.',
  },
  {
    question: 'Czy pomagasz z domeną i hostingiem?',
    answer:
      'Tak, biorę na siebie całą część techniczną: domenę, hosting i pocztę firmową. Ty zajmujesz się swoją robotą.',
  },
  {
    question: 'Co, jeśli po publikacji będę chciał coś zmienić?',
    answer:
      'W każdym pakiecie masz darmowe poprawki po publikacji: od dwóch tygodni w Starcie do dwóch miesięcy w Premium. Później możesz zlecać zmiany pojedynczo albo wykupić stałą opiekę.',
  },
  {
    question: 'Ile kosztuje strona internetowa dla małej firmy?',
    answer:
      'U mnie od 799 zł za stronę wizytówkę, od 1099 zł za stronę firmową i od 1999 zł za rozbudowany serwis. Ostateczna cena zależy od zakresu: liczby podstron, treści do przygotowania i funkcji, takich jak rezerwacje czy płatności. Przed startem znasz jedną konkretną cenę i ona już się nie zmienia.',
  },
  {
    question: 'Czy robisz strony dla konkretnych branż, na przykład dla hydraulika albo elektryka?',
    answer:
      'Tak, to moja specjalność: strony internetowe dla fachowców i firm usługowych, między innymi dla hydraulików, elektryków i warsztatów samochodowych. Zbudowałem na przykład stronę dla firmy elektroinstalacyjnej RafPol Elektric. Znam ten rynek, więc wiem, czego szukają Twoi klienci.',
  },
  {
    question: 'Strona internetowa czy wizytówka Google? Co jest ważniejsze?',
    answer:
      'Jedno i drugie, bo robią różne rzeczy. Wizytówka pokazuje Twoją firmę w Google i na mapie, a strona zamienia odwiedzających w zapytania i telefony. Dlatego każdą stronę od razu łączę z profilem firmy w Google, żeby oba kanały pracowały razem.',
  },
  {
    question: 'Co, jeśli gotowa strona mi się nie spodoba?',
    answer:
      'Nic nie tracisz. Płacisz dopiero przy publikacji, więc jeśli efekt Ci nie odpowiada, po prostu rezygnujesz. Zanim do tego dojdzie, pokazuję Ci postępy i nanoszę poprawki, więc zwykle dochodzimy do wersji, którą chcesz pokazać światu.',
  },
  {
    // The one place a location may appear: a light organic signal that ties
    // the site to the Google Business Profile. Framed so that location is
    // explicitly not a variable for the client.
    question: 'Jak wygląda współpraca na odległość?',
    answer:
      'Cały proces działa online: rozmowa przez telefon albo WhatsApp, projekt do obejrzenia w przeglądarce, poprawki na bieżąco. Na co dzień pracuję z Krakowa, ale dla współpracy nie ma to żadnego znaczenia.',
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

  // Shared page-wide reveal (see lib/motion.ts).
  const reveal = sharedReveal(reduced)

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
                  transition={reduced ? { duration: 0 } : { duration: 0.3, ease: EASE }}
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
                    : { height: { duration: 0.35, ease: EASE }, opacity: { duration: 0.25 } }
                }
                className="overflow-hidden"
              >
                <motion.p
                  animate={reduced ? undefined : { y: isOpen ? 0 : 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
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
