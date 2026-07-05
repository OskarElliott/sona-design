import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'
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
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    'strony internetowe',
    'strona internetowa dla firmy',
    'strona dla hydraulika',
    'strona dla elektryka',
    'strona dla warsztatu',
    'tworzenie stron internetowych',
    'strona wizytówka',
    'strona internetowa cena',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

// LocalBusiness schema: tells Google this is a Polish web studio with
// visible fixed-from prices. Offer data mirrors pricing.tsx; update both
// together when real rates land.
const BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  priceRange: 'od 799 PLN',
  founder: { '@type': 'Person', name: 'Oskar' },
  areaServed: { '@type': 'Country', name: 'Polska' },
  knowsLanguage: 'pl',
  makesOffer: [
    { name: 'Start', price: '799', priceCurrency: 'PLN' },
    { name: 'Firma', price: '1099', priceCurrency: 'PLN' },
    { name: 'Premium', price: '1999', priceCurrency: 'PLN' },
  ].map((offer) => ({
    '@type': 'Offer',
    name: `Pakiet ${offer.name}`,
    price: offer.price,
    priceCurrency: offer.priceCurrency,
  })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
        />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
