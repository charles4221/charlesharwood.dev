import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { components } from '@/components/slices';
import { createClient } from '@/prismic-config';
import { METADATA_BASE } from '@/utils/constants';

type Params = { uid: string };
type Props = { params: Params };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID('page', params.uid).catch(notFound);
  const settings = await client.getSingle('settings');

  const pageTitle = asText(page.data.title);
  const siteTitle = asText(settings.data.siteTitle);
  const title = `${pageTitle} | ${siteTitle}`;

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

export default async function Page({ params }: Props) {
  const client = createClient();
  const page = await client.getByUID('page', params.uid).catch(notFound);

  return <SliceZone slices={page.data.slices} components={components} />;
}

const pagesHandledInOtherRoutes = new Set(['home', 'contact']);

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('page');

  return pages
    .filter((page) => !pagesHandledInOtherRoutes.has(page.uid))
    .map((page) => {
      return { uid: page.uid };
    });
}
