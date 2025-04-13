import type { MetadataRoute } from 'next';

import { createClient } from '@/prismic-config';
import { BASE_URL, PAGES_WITH_CUSTOM_ROUTE_HANDLERS } from '@/utils/constants';

import type { PageDocument } from '../../prismicio-types';

const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
];

function filterDynamicPages(page: PageDocument<string>) {
  return !PAGES_WITH_CUSTOM_ROUTE_HANDLERS.has(page.uid);
}

function mapDynamicPageToSitemap(
  page: PageDocument<string>,
): MetadataRoute.Sitemap[0] {
  return {
    url: `${BASE_URL}/${page.uid}`,
    lastModified: new Date(page.last_publication_date),
    changeFrequency: 'monthly',
    priority: 0.5,
  } as const;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const pages = await client.getAllByType('page');

  const dynamicPagesMap = pages
    .filter(filterDynamicPages)
    .map(mapDynamicPageToSitemap);

  return [...STATIC_PAGES, ...dynamicPagesMap];
}
