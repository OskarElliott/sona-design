'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

// Built for n cards (brief §3.6): add a project here and everything
// (stack math, offsets, numbering) adapts. PlumbingCraft becomes #3 soon.
// Names/descriptions/screenshots below are placeholders awaiting real data.
type Project = {
  name: string
  tagline: string
  description: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    name: 'Pierwsza realizacja',
    tagline: 'Strona dla lokalnej firmy usługowej',
    description:
      'Krótki opis projektu: jaki był problem, co powstało i co się poprawiło. Ta karta czeka na prawdziwe dane.',
    tags: ['Strona wizytówka', 'Darmowa wycena', 'SEO lokalne'],
  },
  {
    name: 'Druga realizacja',
    tagline: 'Strona dla warsztatu / punktu usługowego',
    description:
      'Drugi projekt na start. Tu też wejdzie prawdziwa nazwa, opis efektu i zrzut ekranu z wdrożenia.',
    tags: ['Landing page', 'Rezerwacje', 'Google Maps'],
  },
]

function ProjectCard({
  project,
  index,
  total,
  progress,
  stack,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  stack: boolean
}) {
  // Cards deeper in the deck shrink slightly as they are covered.
  const targetScale = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  const card = (
    <motion.article
      style={stack ? { scale } : undefined}
      className="grid w-full overflow-hidden rounded-card-lg border border-line bg-paper shadow-island md:grid-cols-2"
    >
      {/* Media placeholder until real screenshots land */}
      <div className="relative aspect-[16/10] overflow-hidden bg-accent-soft/50 md:aspect-auto md:min-h-[24rem]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(110% 110% at 25% 0%, rgb(var(--accent) / 0.16), transparent 55%)',
          }}
        />
        <p className="absolute left-6 top-6 font-mono text-xs uppercase tracking-widest text-muted">
          zrzut ekranu wkrótce
        </p>
        <span
          aria-hidden
          className="absolute -bottom-6 right-4 font-display text-[9rem] font-black leading-none text-accent/15"
        >
          {index + 1}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
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
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
          case study wkrótce
        </p>
      </div>
    </motion.article>
  )

  if (!stack) {
    // Fallback (brief §4): plain vertical list on mobile and reduced motion.
    return <div className="mt-8 first:mt-0">{card}</div>
  }

  return (
    <div
      className="sticky flex h-screen items-center justify-center"
      style={{ top: index * 24 }}
    >
      {card}
    </div>
  )
}

export function Projects() {
  const container = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Stack only on md+ pointers-and-viewports; phones get the plain list
  // (no scroll-jacking on phones, brief §4). Starts false so SSR and the
  // first client paint agree, then upgrades after mount.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const stack = isDesktop && !reduced

  // ONE scroll source: Framer reads native scroll. No Lenis (brief §4).
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="projekty" className="mx-auto max-w-content px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Realizacje</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Ostatnie projekty
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Dwa wdrożenia na start, trzecie w drodze. Każde z myślą o jednym: żeby dzwonił telefon.
        </p>
      </div>

      <div ref={container} className="mx-auto mt-4 max-w-4xl md:mt-10">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.name}
            project={p}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
            stack={stack}
          />
        ))}
      </div>
    </section>
  )
}
