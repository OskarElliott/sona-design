import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

// PWA manifest: enables "add to home screen" and gives mobile a branded
// install identity. Icons reuse the app icon convention.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · Strony internetowe dla lokalnych firm`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFBF9',
    theme_color: '#FCFBF9',
    lang: 'pl',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
