'use client'

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

// Hero (step 5, owner-directed): typographic statement, no composition
// filler. Five elements: eyebrow with the wave, two-tone headline whose
// accent asterisk resolves to the pricing footnote, red pill + underlined
// text link, and the velocity marquee at the fold. Background is one glow,
// a micro-grain veil, and the ghost wordmark. Nothing else gets added
// here: the emptiness is the confidence (see hero design notes, PR #3).

const EASE = [0.22, 1, 0.36, 1] as const

// ── Velocity marquee ─────────────────────────────────────────────────────────
// Drifts on its own; scroll velocity (sprung) multiplies the speed and adds
// shear, then it eases back. Content is two identical halves so x can wrap
// at -50% seamlessly.
const PHRASES = ['więcej telefonów', 'więcej zleceń', 'więcej telefonów', 'więcej zleceń']
const ACCENT_INDEX = 2
const BASE_SPEED = 2.4

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function MarqueeHalf() {
  return (
    <div className="flex shrink-0 items-baseline">
      {PHRASES.map((phrase, i) => (
        <span
          key={i}
          className={`whitespace-nowrap pr-4 font-display text-4xl font-medium tracking-tight md:text-5xl ${
            i === ACCENT_INDEX ? 'text-accent' : 'text-ink/10'
          }`}
        >
          {phrase}
          <span className={`pl-4 ${i === ACCENT_INDEX ? 'text-accent/40' : ''}`}>·</span>
        </span>
      ))}
    </div>
  )
}

function VelocityMarquee({ reduced }: { reduced: boolean }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocitySpring(scrollY)
  const velocityFactor = useTransform(scrollVelocity, [0, 1200], [0, 4], { clamp: false })
  const directionRef = useRef(-1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let moveBy = directionRef.current * BASE_SPEED * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) directionRef.current = -1
    else if (vf > 0) directionRef.current = 1
    moveBy += directionRef.current * moveBy * Math.abs(vf)
    baseX.set(baseX.get() + moveBy)
  })

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const skewX = useTransform(velocityFactor, (v) => Math.max(-5, Math.min(5, v * 1.4)))

  return (
    <div aria-hidden className="select-none overflow-hidden">
      <motion.div className="flex w-max" style={reduced ? undefined : { x, skewX }}>
        <MarqueeHalf />
        <MarqueeHalf />
      </motion.div>
    </div>
  )
}

function useVelocitySpring(scrollY: ReturnType<typeof useScroll>['scrollY']) {
  const velocity = useMotionValue(0)
  const prev = useRef({ y: 0, t: 0 })
  useAnimationFrame((t) => {
    const y = scrollY.get()
    const dt = t - prev.current.t
    if (dt > 0) velocity.set(((y - prev.current.y) / dt) * 1000)
    prev.current = { y, t }
  })
  return useSpring(velocity, { damping: 50, stiffness: 400 })
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const reduced = useReducedMotion()

  // Content drifts up and fades as the visitor scrolls out toward Projekty.
  const { scrollY } = useScroll()
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0])
  const contentY = useTransform(scrollY, [0, 560], [0, -64])

  const container = reduced
    ? {}
    : {
        initial: 'hidden',
        animate: 'visible',
        variants: {
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        },
      }

  const item = reduced
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 26 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
        },
      }

  return (
    <section id="hero" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* One light source */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[8%] left-[6%] h-[34rem] w-[42rem]"
        style={{
          background:
            'radial-gradient(closest-side, rgb(var(--glow) / var(--glow-opacity)), transparent)',
        }}
      />
      {/* Micro-grain veil: dithers the glow, gives the paper tooth */}
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.035]" />
      {/* Ghost wordmark bleeding off bottom-right */}
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.16em] -right-[0.04em] select-none font-display text-[24vw] font-semibold leading-none tracking-tight text-ink/[0.04]"
      >
        Sona<span className="text-accent/10">.</span>
      </p>

      <motion.div
        {...container}
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 pt-28"
      >
        {/* The one shape in the hero: a speech bubble (brief §1, the page
            should feel like a friendly person talking). Ink text per owner. */}
        <motion.p
          {...item}
          className="eyebrow-group inline-flex w-fit items-center gap-2.5 rounded-2xl rounded-bl-md border border-accent/20 bg-accent-soft/50 px-4 py-2 text-base text-ink"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent" />
          Cześć, tu Sona{' '}
          <span role="img" aria-label="pozdrowienie" className="wave-hand">
            👋
          </span>
        </motion.p>

        <motion.h1
          {...item}
          className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="text-muted">
            Sona projektuje strony<span className="text-accent">*</span>,
          </span>
          <br />
          przez które dzwoni telefon.
        </motion.h1>

        <motion.p {...item} className="mt-6 text-sm text-muted">
          <span className="text-accent">*</span> od 799 PLN, płatność dopiero przy publikacji
        </motion.p>

        <motion.div {...item} className="mt-9 flex items-center gap-7">
          <a
            href="#kontakt"
            className="rounded-pill bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 motion-reduce:transition-none"
          >
            Darmowa wycena
          </a>
          {/* Underline appears on hover only (owner), drawn left to right. */}
          <a href="#projekty" className="group relative pb-1 text-sm font-medium">
            Zobacz projekty
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </a>
        </motion.div>
      </motion.div>

      <div className="relative pb-8 pt-10">
        <p className="sr-only">Więcej telefonów, więcej zleceń.</p>
        <VelocityMarquee reduced={!!reduced} />
      </div>
    </section>
  )
}
