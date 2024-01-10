import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { METADATA_BASE } from '@/utils/constants';

type Params = { uid: string };
type Props = { params: Params };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID('page', params.uid).catch(notFound);
  const settings = await client.getSingle('settings');

  return {
    metadataBase: METADATA_BASE,
    title: `${asText(page.data.title)} | ${asText(settings.data.siteTitle)}`,
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

export default async function Page({ params }: Props) {
  const client = createClient();
  const page = await client.getByUID('page', params.uid).catch(notFound);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('page');

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
