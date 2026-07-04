import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

// Display — Overused Grotesk variable (300–900). ALPHA font: Polish
// diacritics must pass the glyph audit before this ships (see brief §1).
const display = localFont({
  src: '../fonts/OverusedGrotesk-VF.woff2',
  variable: '--font-display',
  weight: '300 900',
  display: 'swap',
})

// Body — Geist variable. Guaranteed full Polish coverage; hedges the
// display font's alpha risk. All paragraph + UI text.
const body = localFont({
  src: '../fonts/Geist-Variable.woff2',
  variable: '--font-body',
  weight: '100 900',
  display: 'swap',
})

// Utility — JetBrains Mono, small/tracked/uppercase: prices, eyebrows, labels.
const mono = localFont({
  src: [
    { path: '../fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/JetBrainsMono-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sona — Strony internetowe dla lokalnych firm',
  description:
    'Warm, premium strony internetowe dla lokalnych firm. Więcej telefonów, więcej zleceń.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // suppressHydrationWarning: next-themes mutates the html class before
  // hydration, which React would otherwise flag as a mismatch.
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
