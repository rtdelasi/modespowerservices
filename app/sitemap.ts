import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://modespowerservices.com';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/gallery',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/sitemap',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/services' || route === '/projects' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/projects' || route === '/contact' ? 0.8 : 0.6,
  }));
}
