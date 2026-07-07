import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site'
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
    'strony internetowe Kraków',
    'tworzenie stron internetowych Kraków',
    'strona internetowa dla firmy',
    'projektowanie stron Kraków',
    'strona dla hydraulika',
    'strona dla elektryka',
    'strona wizytówka Kraków',
    'strona internetowa cena',
  ],
  alternates: { canonical: '/' },
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'technology',
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
  // Let Google show large image previews and untruncated snippets in
  // results — better rich presentation for a portfolio site.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

// Mobile browser chrome matches the paper, per theme.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFBF9' },
    { media: '(prefers-color-scheme: dark)', color: '#141210' },
  ],
}

// LocalBusiness schema: a Kraków web studio serving the city + nearby
// towns, with visible fixed-from prices. NAP (name/phone) mirrors the
// Google Business Profile; geo is the Kraków anchor (no street address —
// service-area business). Offers mirror pricing.tsx.
const SERVICE_AREAS = [
  'Kraków',
  'Wieliczka',
  'Skawina',
  'Niepołomice',
  'Zabierzów',
  'Krzeszowice',
  'Michałowice',
]

const BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  priceRange: 'od 799 PLN',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kraków',
    addressRegion: 'małopolskie',
    addressCountry: 'PL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 50.0647, longitude: 19.945 },
  areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
  serviceType: 'Projektowanie stron internetowych',
  knowsLanguage: ['pl', 'en'],
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
