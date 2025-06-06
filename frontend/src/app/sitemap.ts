import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vpofone.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/features',
    '/pricing',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic pages (if any)
  // const dynamicPages = await fetchDynamicPages()
  
  return [...staticPages]
}