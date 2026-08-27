// One motion vocabulary for the whole page. Every section reveals on the
// same curve, at the same distance, with the same trigger point, so the
// scroll reads as one continuous document instead of a stack of separately
// animated blocks.
//
// Timings are deliberately few:
//   FAST   micro-interactions (icon nudges, underlines) live in CSS
//   BASE   the standard reveal
//   SLOW   headline-scale moments (hero lines)

export const EASE = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  base: 0.55,
  slow: 0.8,
} as const

// Distance a revealing element travels. One value, everywhere.
export const RISE = 24

// Trigger a little before the element reaches the fold, so content is
// settled by the time the reader's eye arrives.
export const VIEWPORT = { once: true, margin: '-70px' } as const

// Stagger between siblings in a group (cards, list items, rows).
export const STAGGER = 0.08

type RevealOptions = {
  delay?: number
  duration?: number
  rise?: number
}

/**
 * Scroll-triggered reveal. Returns motion props, or an empty object when
 * the visitor prefers reduced motion (so callers can spread unconditionally).
 */
export function reveal(reduced: boolean | null, options: RevealOptions = {}) {
  if (reduced) return {}
  const { delay = 0, duration = DURATION.base, rise = RISE } = options
  return {
    initial: { opacity: 0, y: rise },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration, delay, ease: EASE },
  }
}

/** Reveal for the nth sibling in a staggered group. */
export function revealAt(reduced: boolean | null, index: number, options: RevealOptions = {}) {
  return reveal(reduced, { ...options, delay: (options.delay ?? 0) + index * STAGGER })
}
