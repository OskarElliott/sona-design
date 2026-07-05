'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ScrollStack, { ScrollStackItem } from '@/components/scroll-stack'

// Built for n cards (brief §3.6): add a project here and everything
// (stack, numbering, filter counts) adapts. PlumbingCraft becomes #3 soon.
// Names/descriptions/screenshots below are placeholders awaiting real data.
type Project = {
  name: string
  tagline: string
  description: string
  category: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    name: 'Pierwsza realizacja',
    tagline: 'Strona dla lokalnej firmy usługowej',
    description:
      'Krótki opis projektu: jaki był problem, co powstało i co się poprawiło. Ta karta czeka na prawdziwe dane.',
    category: 'Strona wizytówka',
    tags: ['Strona wizytówka', 'Darmowa wycena', 'SEO lokalne'],
  },
  {
    name: 'Druga realizacja',
    tagline: 'Strona dla warsztatu / punktu usługowego',
    description:
      'Drugi projekt na start. Tu też wejdzie prawdziwa nazwa, opis efektu i zrzut ekranu z wdrożenia.',
    category: 'Landing page',
    tags: ['Landing page', 'Rezerwacje', 'Google Maps'],
  },
]

const CATEGORY_COUNT = new Set(PROJECTS.map((p) => p.category)).size

const CARD_CLASSES =
  'grid overflow-hidden rounded-card-lg border border-line bg-paper shadow-island md:grid-cols-2'

// Body face for all small labels (owner: no mono in this section); the
// numbering row is gone, the ghost number in the media panel carries it.
function CardInner({ project, index }: { project: Project; index: number }) {
  return (
    <>
      {/* Media placeholder until real screenshots land */}
      <div className="relative aspect-[16/10] overflow-hidden bg-accent-soft/50 md:aspect-auto md:min-h-[24rem]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(110% 110% at 25% 0%, rgb(var(--accent) / 0.16), transparent 55%)',
          }}
        />
        <p className="absolute left-6 top-6 text-xs text-muted">Zrzut ekranu wkrótce</p>
        <span
          aria-hidden
          className="absolute -bottom-6 right-4 font-display text-[9rem] font-black leading-none text-accent/15"
        >
          {index + 1}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
        <p className="flex items-center gap-2 text-sm text-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
          {project.category}
        </p>
        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {project.name}
        </h3>
        <p className="text-muted">{project.tagline}</p>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-pill bg-accent-soft px-3.5 py-1.5 text-xs font-medium text-accent"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted">Case study wkrótce</p>
      </div>
    </>
  )
}

// "kategorie" view (owner picked the adream-list direction): category name
// top-left, hairline rows of projects (name left, tagline right), rows rest
// in the same #999a9a as the inactive filter and ink up on hover. The
// hover preview sits STATIC in a sticky right column (owner request: it
// must never cover the row text) and crossfades between rows. Touch and
// reduced-motion get the plain list. Rows become case-study links once
// case studies exist.
function CategoriesView({ showPreview }: { showPreview: boolean }) {
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
    <div className={showPreview ? 'lg:grid lg:grid-cols-[1.15fr,0.85fr] lg:items-start lg:gap-12' : ''}>
      <div onMouseLeave={() => setHovered(null)}>
        {groups.map(([category, items]) => (
          <div key={category} className="mt-14 first:mt-0">
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
          </div>
        ))}
      </div>

      {showPreview && (
        <div className="hidden lg:block">
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              {hoveredProject && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-line bg-accent-soft/60 shadow-island">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(110% 110% at 25% 0%, rgb(var(--accent) / 0.16), transparent 55%)',
                      }}
                    />
                    <p className="absolute left-4 top-4 text-xs text-muted">
                      Zrzut ekranu wkrótce
                    </p>
                    <span
                      aria-hidden
                      className="absolute -bottom-4 right-2 font-display text-7xl font-black leading-none text-accent/15"
                    >
                      {hovered! + 1}
                    </span>
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

// "wszystkie / kategorie" header: active is ink, inactive is a fixed light
// grey (#999a9a per owner spec, readable in both themes; #f7f7f7 would
// vanish on light paper). Hover previews the active colour. Count sits
// superscript top-right. "wszystkie" shows the deck, "kategorie" the
// grouped list view.
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

  // Stack only on md+ viewports; phones get the plain list (no
  // scroll-jacking on phones, brief §4 — reactbits ships no fallback, so
  // this gate wraps it). Starts false so SSR and first paint agree.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const stack = isDesktop && !reduced

  return (
    <section id="projekty" className="mx-auto max-w-content px-6 py-24">
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

      <div className="mx-auto mt-10 max-w-4xl md:mt-16">
        {filter === 'kategorie' ? (
          <CategoriesView showPreview={stack} />
        ) : stack ? (
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
                <CardInner project={p} index={i} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          PROJECTS.map((p, i) => (
            <article key={p.name} className={`${CARD_CLASSES} mt-8 first:mt-0`}>
              <CardInner project={p} index={i} />
            </article>
          ))
        )}
      </div>
    </section>
  )
}
