'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ScrollStack, { ScrollStackItem } from '@/components/scroll-stack'
import { EASE, reveal, revealAt } from '@/lib/motion'

// One card design, two behaviours. Every project renders the same card
// (screenshot + Wyzwanie / Efekt framing). With a single project the card
// simply sits still; from two upward the cards become a scroll-stacked
// deck, pinning and covering as the visitor scrolls. Adding an entry to
// PROJECTS is the only change needed to switch modes.
type Project = {
  name: string
  tagline: string
  challenge: string
  result: string
  category: string
  tags: string[]
  image?: string
  imageAlt?: string
  url?: string
}

const PROJECTS: Project[] = [
  {
    name: 'RafPol Elektric',
    tagline: 'Elektryk i odnawialne źródła energii · Kraków',
    challenge:
      'Szeroka oferta, od instalacji elektrycznych po fotowoltaikę, pompy ciepła i magazyny energii, trudna do pokazania w przejrzysty sposób.',
    result:
      'Jedna czytelna strona, która porządkuje wszystkie usługi i prowadzi klienta prosto do telefonu lub formularza.',
    category: 'Strona firmowa',
    tags: ['Strona firmowa', 'Fotowoltaika', 'SEO lokalne'],
    image: '/projekty/rafpol.png',
    imageAlt: 'Strona internetowa dla elektryka: RafPol Elektric',
    url: 'https://www.rafpolelektric.pl/',
  },

  // ──────────────────────────────────────────────────────────────────────
  // TODO: drugie case study. Skopiuj obiekt powyżej i uzupełnij:
  //   name        nazwa firmy klienta
  //   tagline     branża + miasto (jeśli klient chce być z nim kojarzony)
  //   challenge   z czym firma miała problem przed stroną
  //   result      co daje im strona teraz (bez wymyślonych liczb)
  //   category    np. 'Strona firmowa' / 'Landing page'
  //   tags        2-3 tagi
  //   image       zrzut ekranu w public/projekty/nazwa.png (1280px szer.)
  //   imageAlt    opis zrzutu, np. 'Strona internetowa dla hydraulika: X'
  //   url         adres opublikowanej strony
  // Drugi wpis automatycznie włącza filtr i talię przewijanych kart.
  // Nic więcej nie trzeba zmieniać.
  // ──────────────────────────────────────────────────────────────────────
]

const CATEGORY_COUNT = new Set(PROJECTS.map((p) => p.category)).size

const CARD_CLASSES =
  'grid overflow-hidden rounded-card-lg border border-line bg-paper shadow-island lg:grid-cols-[1.05fr,1fr]'

function ProjectLink({ url, className = '' }: { url: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 text-sm font-medium ${className}`}
    >
      Zobacz stronę
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
        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  )
}

function ProjectMedia({
  project,
  index,
  sizes,
  numberClass,
}: {
  project: Project
  index: number
  sizes: string
  numberClass: string
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? `Zrzut ekranu strony ${project.name}`}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    )
  }
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 110% at 25% 0%, rgb(var(--accent) / 0.16), transparent 55%)',
        }}
      />
      <span aria-hidden className={numberClass}>
        {index + 1}
      </span>
    </>
  )
}

// The card. Identical whether it stands alone or sits in the deck.
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-accent-soft/50 lg:aspect-auto lg:min-h-[30rem]">
        <ProjectMedia
          project={project}
          index={index}
          sizes="(min-width: 1024px) 50vw, 100vw"
          numberClass="absolute -bottom-6 right-4 font-display text-[9rem] font-black leading-none text-accent/15"
        />
      </div>

      <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
        <p className="flex items-center gap-2 text-sm text-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
          {project.category}
        </p>

        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-muted">{project.tagline}</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-5">
          <div>
            <p className="text-sm font-medium">Wyzwanie</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.challenge}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-accent">Efekt</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.result}</p>
          </div>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-pill bg-accent-soft px-3.5 py-1.5 text-xs font-medium text-accent"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.url && <ProjectLink url={project.url} />}
      </div>
    </>
  )
}

// ── Kategorie view (available once there are 2+ projects) ───────────────
function CategoriesView({ showPreview }: { showPreview: boolean }) {
  const reduced = useReducedMotion()
  const groups = Array.from(
    PROJECTS.reduce((map, project, index) => {
      const list = map.get(project.category) ?? []
      list.push({ project, index })
      map.set(project.category, list)
      return map
    }, new Map<string, { project: Project; index: number }[]>())
  )

  const [hovered, setHovered] = useState<number | null>(null)
  const hoveredProject = hovered !== null ? PROJECTS[hovered] : null

  return (
    <div
      className={showPreview ? 'lg:grid lg:grid-cols-[1.15fr,0.85fr] lg:items-start lg:gap-12' : ''}
    >
      <div onMouseLeave={() => setHovered(null)}>
        {groups.map(([category, items], gi) => (
          <motion.div key={category} {...revealAt(reduced, gi)} className="mt-14 first:mt-0">
            <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {category}
            </h3>
            <ul className="mt-6 border-t border-line">
              {items.map(({ project, index }) => (
                <li key={project.name} className="border-b border-line">
                  <div
                    className="flex flex-col gap-1 py-5 text-[#999a9a] transition-colors duration-200 hover:text-ink motion-reduce:transition-none md:flex-row md:items-baseline md:justify-between md:gap-8"
                    onMouseEnter={() => setHovered(index)}
                  >
                    <p className="font-display text-xl font-medium tracking-tight md:text-2xl">
                      {project.name}
                    </p>
                    <p className="text-sm md:text-right">{project.tagline}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {showPreview && (
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              {hoveredProject && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-line bg-accent-soft/60 shadow-island">
                    <ProjectMedia
                      project={hoveredProject}
                      index={hovered ?? 0}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      numberClass="absolute -bottom-4 right-2 font-display text-7xl font-black leading-none text-accent/15"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted">
                    {hoveredProject.category} · {hoveredProject.name}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group inline-flex items-start gap-1.5 rounded-pill font-display text-3xl font-semibold tracking-tight transition-colors duration-200 hover:text-ink motion-reduce:transition-none md:text-4xl ${
        active ? 'text-ink' : 'text-[#999a9a]'
      }`}
    >
      <span>{label}</span>
      <span className="mt-1 font-mono text-xs font-normal leading-none md:text-sm">{count}</span>
    </button>
  )
}

export function Projects() {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<'wszystkie' | 'kategorie'>('wszystkie')

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // The deck needs cards to cover each other, so it only switches on from
  // the second project. Below md and under reduced motion it stays a list.
  const multiple = PROJECTS.length > 1
  const deck = multiple && isDesktop && !reduced

  return (
    <section id="projekty" className="mx-auto max-w-content px-6 py-24">
      <h2 className="sr-only">Realizacje</h2>

      {multiple ? (
        <div className="flex items-start justify-center gap-8 md:gap-12">
          <FilterButton
            label="wszystkie"
            count={PROJECTS.length}
            active={filter === 'wszystkie'}
            onClick={() => setFilter('wszystkie')}
          />
          <FilterButton
            label="kategorie"
            count={CATEGORY_COUNT}
            active={filter === 'kategorie'}
            onClick={() => setFilter('kategorie')}
          />
        </div>
      ) : (
        <motion.p
          {...reveal(reduced)}
          className="flex items-center justify-center gap-2 text-sm text-muted"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
          Realizacje
        </motion.p>
      )}

      <div className="mx-auto mt-10 max-w-5xl md:mt-14">
        {multiple && filter === 'kategorie' ? (
          <CategoriesView showPreview={isDesktop && !reduced} />
        ) : deck ? (
          <ScrollStack
            useWindowScroll
            itemDistance={120}
            itemScale={0.03}
            itemStackDistance={24}
            stackPosition="15%"
            scaleEndPosition="8%"
            baseScale={0.92}
          >
            {PROJECTS.map((p, i) => (
              <ScrollStackItem key={p.name} itemClassName={CARD_CLASSES}>
                <ProjectCard project={p} index={i} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          PROJECTS.map((p, i) => (
            <motion.article
              key={p.name}
              {...revealAt(reduced, i)}
              className={`${CARD_CLASSES} mt-8 first:mt-0`}
            >
              <ProjectCard project={p} index={i} />
            </motion.article>
          ))
        )}
      </div>
    </section>
  )
}
