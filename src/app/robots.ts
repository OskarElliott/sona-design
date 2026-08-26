import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // /polecenia is a private link handed to clients after delivery.
    rules: { userAgent: '*', allow: '/', disallow: ['/tokens', '/polecenia'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
