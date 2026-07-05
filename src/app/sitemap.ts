import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Single-page site: one canonical URL. /tokens is scaffold and excluded
// (also disallowed in robots.ts and noindexed on the page itself).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
