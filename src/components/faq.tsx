// FAQ at the bottom of Ceny. SEO notes: answers use native <details>, so
// the full text is always in the served HTML (no JS needed to index it),
// and the FAQPage JSON-LD mirrors the visible content 1:1. Google shows
// FAQ rich results mostly for gov/health sites since 2023, so the win
// here is long-tail query coverage, not guaranteed snippet stars.
// The `name` attribute makes <details> an exclusive accordion in newer
// Chromium; elsewhere it degrades to independent toggles.

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Czy muszę płacić z góry?',
    answer:
      'Nie. Projekt powstaje najpierw, a płatność następuje dopiero przy publikacji strony. Zero zaliczek.',
  },
  {
    question: 'Ile trwa zrobienie strony?',
    answer:
      'Wizytówka to zwykle około 7 dni od pierwszej rozmowy. Większe strony potrzebują dwóch do trzech tygodni. Dokładny termin znasz przed startem.',
  },
  {
    question: 'Skąd cena od, a nie jedna sztywna?',
    answer:
      'Bo zakres bywa różny. Po krótkiej rozmowie dostajesz jedną konkretną cenę i ona już się nie zmienia.',
  },
  {
    question: 'Czy strona będzie widoczna w Google?',
    answer:
      'Tak. Każda strona ma podstawowe SEO lokalne: opisy usług, dane firmy, mapę i szybkie ładowanie. To fundament, dzięki któremu znajdą Cię klienci z okolicy.',
  },
  {
    question: 'Czy pomagasz z domeną i hostingiem?',
    answer:
      'Tak, biorę na siebie całą techniczną stronę: domenę, hosting i pocztę firmową. Ty zajmujesz się swoją robotą.',
  },
  {
    question: 'Co jeśli po publikacji będę chciał coś zmienić?',
    answer:
      'Drobne poprawki w pierwszym miesiącu są w cenie. Później możesz zlecać zmiany pojedynczo albo wykupić stałą opiekę nad stroną.',
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
  return (
    <div id="faq" className="mx-auto mt-24 max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <h3 className="text-center font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Częste pytania
      </h3>

      <div className="mt-8 border-t border-line">
        {FAQS.map((faq) => (
          <details key={faq.question} name="faq" className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-medium tracking-tight transition-colors hover:text-accent motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
              {faq.question}
              {/* Plus rotates into an x when open */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
                className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="pb-6 pr-10 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
