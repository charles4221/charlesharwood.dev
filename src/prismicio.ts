import { createClient as createPrismicClient } from '@prismicio/client';
import type { ClientConfig } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

import config from '../slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: ClientConfig['routes'] = [
  {
    type: 'page',
    path: '/:uid',
  },
  {
    type: 'page',
    uid: 'home',
    path: '/',
  },
  {
    type: 'settings',
    path: '/',
  },
  {
    type: 'navigation',
    path: '/',
  },
  {
    type: 'project',
    path: '/project/:uid',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 */
export const createClient = (config?: ClientConfig) => {
  const client = createPrismicClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
