import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { components } from '@/components/slices';
import { createClient } from '@/prismic-config';
import { METADATA_BASE } from '@/utils/constants';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID('page', 'home');
  const settings = await client.getSingle('settings');

  const pageTitle = asText(page.data.title);
  const siteTitle = asText(settings.data.siteTitle);
  const title = siteTitle || pageTitle;

  const metaImage = page.data.meta_image.url;

  return {
    metadataBase: METADATA_BASE,
    title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? title,
      ...(metaImage && {
        images: [
          {
            url: metaImage,
          },
        ],
      }),
    },
  };
}

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID('page', 'home').catch(notFound);

  return <SliceZone slices={page.data.slices} components={components} />;
}
