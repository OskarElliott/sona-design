// Single source of truth for the public origin. Domain is sonadesign.pl;
// NEXT_PUBLIC_SITE_URL (set in Vercel) overrides this fallback, and every
// canonical, OG url, sitemap and robots entry follows.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonadesign.pl'

export const SITE_NAME = 'Sona'
export const SITE_EMAIL = 'kontakt@sonadesign.pl'
export const SITE_TITLE = 'Sona · Strony internetowe dla lokalnych firm'
export const SITE_DESCRIPTION =
  'Projektuję strony internetowe, przez które dzwoni telefon. Dla lokalnych firm: od 799 PLN, jedna konkretna cena przed startem i płatność dopiero przy publikacji.'
