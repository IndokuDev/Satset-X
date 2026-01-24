import { MetadataRoute } from 'satset-react';

const BASE_URL = process.env.SATSET_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
