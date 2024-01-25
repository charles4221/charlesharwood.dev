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
      <Container as="section" yPadding="sm">
        <Heading as="h1" className="mb-10">
          {asText(page.data.title)}
        </Heading>
        <p>
          Please fill out the form below to send me a message about your
          project!
        </p>
      </Container>
      <Container as="section" yPadding="sm">
        <ContactForm />
      </Container>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID('page', 'contact').catch(notFound);
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
