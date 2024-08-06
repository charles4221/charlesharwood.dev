import { asText } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/links/SocialLinks';
import { PrismicRichText } from '@/components/PrismicRichText';
import { Skills } from '@/components/Skills';
import { Heading } from '@/components/typography/Heading';
import { createClient } from '@/prismic-config';
import { METADATA_BASE } from '@/utils/constants';

export default async function AboutPage() {
  const client = createClient();
  const page = await client.getSingle('about');

  return (
    <main>
      <Container as="section" yPadding="sm">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="max-w-md lg:pl-20">
            <PrismicNextImage
              field={page.data.headshot}
              className="aspect-square lg:rotate-3 hover:lg:-rotate-3 transition-all rounded-2xl bg-gray-100 shadow-xl"
              priority
            />
          </div>
          <div className="lg:order-first lg:row-span-2">
            <Heading as="h1" className="mb-10">
              {page.data.title}
            </Heading>
            <PrismicRichText field={page.data.content} />
          </div>
          <div className="lg:pl-20">
            <Skills />
            <SocialLinks isExpanded />
          </div>
        </div>
      </Container>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('about').catch(notFound);
  const settings = await client.getSingle('settings');

  const siteTitle = asText(settings.data.siteTitle);
  const title = `${page.data.title} | ${siteTitle}`;

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
