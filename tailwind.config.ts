import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // light is the default (no class); .dark toggles
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      // Colours resolve from CSS custom properties (see globals.css).
      // Channels are stored as "R G B" so Tailwind's <alpha-value> works,
      // e.g. bg-paper, text-ink, bg-accent/10, border-line.
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        glow: 'rgb(var(--glow) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
        },
      },
      fontFamily: {
        // Wired here; real faces are self-hosted in step 2 (next/font/local).
        // Inline var fallbacks keep text rendering until the vars are set.
        display: ['var(--font-display, system-ui)', 'sans-serif'],
        sans: ['var(--font-body, system-ui)', 'sans-serif'],
        mono: ['var(--font-mono, ui-monospace)', 'monospace'],
      },
      borderRadius: {
        // Conversational geometry: pills fully round, cards/media ~20–24px.
        pill: '9999px',
        card: '1.375rem', // 22px — default card / media frame
        'card-sm': '1.25rem', // 20px
        'card-lg': '1.5rem', // 24px
      },
      boxShadow: {
        // Floating island navbar / cards pick these up in later steps.
        island: '0 1px 2px rgb(var(--ink) / 0.04), 0 12px 32px rgb(var(--ink) / 0.10)',
        card: '0 1px 2px rgb(var(--ink) / 0.04), 0 10px 30px rgb(var(--ink) / 0.06)',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}

export default config
