// Single source of truth for the public origin. The site is served from
// sonadesign.pl; NEXT_PUBLIC_SITE_URL (set in Vercel) overrides this
// fallback, and every canonical, OG url, sitemap and robots entry follows.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonadesign.pl'

// Business/entity name for metadata, schema and NAP (matches the Google
// Business Profile). The visual "Sona." wordmark in the UI is separate.
export const SITE_NAME = 'Sona Design'
export const SITE_EMAIL = 'kontakt@sonadesign.pl'

// Phone must match the Google Business Profile exactly (NAP signal).
export const SITE_PHONE = '+48784535733'
export const SITE_PHONE_DISPLAY = '784 535 733'
export const SITE_WHATSAPP = 'https://wa.me/message/AIT6BXVHK6C4C1'

// NATIONAL positioning (owner decision): work is fully remote, so location
// is not a variable. No city appears in visible copy, titles or
// descriptions. A light local signal survives only in the keywords meta,
// one FAQ answer, and the invisible schema address/geo, which tie the site
// to the Google Business Profile entity.
export const SITE_TITLE = 'Sona Design · Strony internetowe, przez które dzwoni telefon'
export const SITE_DESCRIPTION =
  'Projektuję i buduję strony internetowe dla firm usługowych. Jedna konkretna cena przed startem, od 799 zł, a płatność dopiero przy publikacji.'

// Capacity is a plain statement of how the work is run, not urgency theatre.
export const MONTHLY_CAPACITY = 3
