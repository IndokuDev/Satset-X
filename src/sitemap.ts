import { MetadataRoute } from 'satset-react';

const BASE_URL = process.env.SATSET_PUBLIC_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/auth/login',
    '/auth/register',
    '/shop/jacket',
    '/shop/shoes',
    '/peta/indonesia',
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return routes;
}
