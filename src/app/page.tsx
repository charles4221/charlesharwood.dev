import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismic-config';
import { components } from '@/slices';
import { METADATA_BASE } from '@/utils/constants';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID('page', 'home');
  const settings = await client.getSingle('settings');

  return {
    metadataBase: METADATA_BASE,
    title: asText(settings.data.siteTitle) || asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID('page', 'home').catch(notFound);

  return <SliceZone slices={page.data.slices} components={components} />;
}
