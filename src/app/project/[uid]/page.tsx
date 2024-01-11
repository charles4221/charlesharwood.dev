import { asText, isFilled } from '@prismicio/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/links/Button';
import { PrismicRichText } from '@/components/PrismicRichText';
import { Hero } from '@/components/project/Hero';
import { Testimonial } from '@/components/project/Testimonial';
import { Heading } from '@/components/typography/Heading';
import { createClient } from '@/prismicio';
import { METADATA_BASE } from '@/utils/constants';

type Params = { uid: string };

export default async function ProjectPage({ params }: { params: Params }) {
  const client = createClient();
  const project = await client.getByUID('project', params.uid).catch(notFound);

  console.log(project.data);

  return (
    <main>
      <Hero
        title={project.data.title}
        tagline={project.data.type}
        image={project.data.hero_image}
      />

      <Container as="section" yPadding="sm">
        <Heading as="h2" className="mb-6">
          Project Overview
        </Heading>
        <div className="lg:flex gap-8">
          <div className="mb-8 lg:mb-0 lg:w-2/3">
            <PrismicRichText field={project.data.overview} />
          </div>
          <div className="lg:w-1/3">
            <PrismicRichText field={project.data.technologies} />
            <Button
              field={project.data.website_url}
              isCompact
              isCTA
              target="_blank">
              View Project Website
            </Button>
          </div>
        </div>
      </Container>

      {isFilled.richText(project.data.client_testimonial) ? (
        <Container as="section" yPadding="sm">
          <Heading as="h2" className="mb-6">
            What the client thinks
          </Heading>
          <Testimonial
            quote={project.data.client_testimonial}
            authorName={project.data.client_name}
            authorRole={project.data.client_role}
          />
        </Container>
      ) : null}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const project = await client.getByUID('project', params.uid).catch(notFound);
  const settings = await client.getSingle('settings');

  return {
    metadataBase: METADATA_BASE,
    title: `${project.data.title} | ${asText(settings.data.siteTitle)}`,
    description: project.data.meta_description,
    openGraph: {
      title: project.data.meta_title,
      images: [
        {
          url: project.data.meta_image.url,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const projects = await client.getAllByType('project');

  return projects.map((page) => {
    return { uid: page.uid };
  });
}
