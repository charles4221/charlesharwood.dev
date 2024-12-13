import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { components } from '@/components/slices';
import { createClient } from '@/prismic-config';
import {
  METADATA_BASE,
  PAGES_WITH_CUSTOM_ROUTE_HANDLERS,
} from '@/utils/constants';

type Params = { uid: string };
type Props = { params: Promise<Params> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const client = createClient();
  const page = await client.getByUID('page', params.uid).catch(notFound);
  const settings = await client.getSingle('settings');

  const pageTitle = page.data.meta_title || asText(page.data.title);
  const siteTitle = asText(settings.data.siteTitle);
  const title = `${pageTitle} | ${siteTitle}`;

  const metaImage = page.data.meta_image.url;

  return {
    metadataBase: METADATA_BASE,
    title,
    description: page.data.meta_description,
    openGraph: {
      title,
      description: page.data.meta_description ?? '',
      url: new URL(`/${params.uid}`, METADATA_BASE),
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

export default async function Page(props: Props) {
  const params = await props.params;
  const client = createClient();
  const page = await client.getByUID('page', params.uid).catch(notFound);

  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('page');

  return pages
    .filter((page) => !PAGES_WITH_CUSTOM_ROUTE_HANDLERS.has(page.uid))
    .map((page) => {
      return { uid: page.uid };
    });
}
