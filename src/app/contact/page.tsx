import { asText } from '@prismicio/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactForm } from '@/components/forms/ContactForm';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/typography/Heading';
import { createClient } from '@/prismic-config';
import { METADATA_BASE } from '@/utils/constants';

export default async function ContactPage() {
  const client = createClient();
  const page = await client.getByUID('page', 'contact');

  return (
    <main>
      <Container as="section" yPadding="lg">
        <Heading as="h1" className="mb-10">
          {asText(page.data.title)}
        </Heading>
        <p className="mb-10">
          Please fill out the form below to send me a message about your
          project!
        </p>
        <ContactForm />
      </Container>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID('page', 'contact').catch(notFound);
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
