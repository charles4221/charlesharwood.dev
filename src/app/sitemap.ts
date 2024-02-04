import { MetadataRoute } from 'next';

import { createClient } from '@/prismic-config';
import { BASE_URL, PAGES_WITH_CUSTOM_ROUTE_HANDLERS } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const pages = await client.getAllByType('page');

  const dynamicPagesMap = pages
    .filter((page) => !PAGES_WITH_CUSTOM_ROUTE_HANDLERS.has(page.uid))
    .map(
      (page) =>
        ({
          url: `${BASE_URL}/${page.uid}`,
          lastModified: new Date(page.last_publication_date),
          changeFrequency: 'monthly',
          priority: 0.5,
        }) as const,
    );

  return [
    {
      url: 'https://charlesharwood.dev',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://charlesharwood.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://charlesharwood.dev/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...dynamicPagesMap,
  ];
}
