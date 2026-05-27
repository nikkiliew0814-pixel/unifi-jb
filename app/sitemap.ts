import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pasangunifi.com',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/check-speed',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/faq',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/news',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/privacy',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/refund',
      lastModified: new Date(),
    },
  ]
}
