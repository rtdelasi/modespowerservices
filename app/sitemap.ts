import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getPublishedProjects } from '@/lib/supabase/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.siteUrl;
  const currentDate = new Date().toISOString();

  const staticRoutes = [
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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency:
      route === '' || route === '/services' || route === '/projects'
        ? 'weekly'
        : 'monthly',
    priority:
      route === ''
        ? 1.0
        : route === '/services' || route === '/projects' || route === '/contact'
        ? 0.8
        : 0.6,
  }));

  try {
    const projects = await getPublishedProjects();
    const projectEntries: MetadataRoute.Sitemap = projects
      .filter((p) => p.slug && p.slug.trim().length > 0)
      .map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.updated_at || currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      }));

    return [...staticEntries, ...projectEntries];
  } catch {
    return staticEntries;
  }
}
