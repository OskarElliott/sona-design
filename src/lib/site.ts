// Single source of truth for the public origin. Domain is sonadesign.pl;
// NEXT_PUBLIC_SITE_URL (set in Vercel) overrides this fallback, and every
// canonical, OG url, sitemap and robots entry follows.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonadesign.pl'

// Business/entity name for metadata, schema and NAP (matches the Google
// Business Profile). The visual "Sona." wordmark in the UI is separate.
export const SITE_NAME = 'Sona Design'
export const SITE_EMAIL = 'kontakt@sonadesign.pl'

// Phone must match the Google Business Profile exactly (NAP signal).
export const SITE_PHONE = '+48662416361'
export const SITE_PHONE_DISPLAY = '662 416 361'

// Kraków-primary positioning (owner decision): lead SEO with the city,
// keep brand copy broadly appealing.
export const SITE_CITY = 'Kraków'
export const SITE_TITLE = 'Sona Design · Strony internetowe Kraków i okolice'
export const SITE_DESCRIPTION =
  'Projektuję strony internetowe dla firm z Krakowa i okolic, przez które dzwoni telefon. Jedna konkretna cena przed startem, od 799 zł, a płatność dopiero przy publikacji.'
