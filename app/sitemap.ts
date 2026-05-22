import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://pasangunifi.com',
      lastModified: new Date(),
    },
    {
      url: 'https://pasangunifi.com/about',
      lastModified: new Date(),
    },
    // 继续加你的其他页面
  ]
} 
