import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/resume-locked/'],
    },
    sitemap: 'https://mulkymalikuldhaher.com/sitemap.xml',
  };
}