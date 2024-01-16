import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';

import { Card } from '@/components/layout/Card';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/typography/Heading';
import { createClient } from '@/prismic-config';

function ProjectGridItem(project: Content.ProjectDocument<string>) {
  return (
    <li key={project.uid} className="grid gap-8">
      <PrismicNextLink href={project.url} tabIndex={-1}>
        <Card isLink>
          <div className="bg-gray-100 overflow-hidden mb-5">
            <PrismicNextImage
              field={project.data.hero_image}
              sizes="100vw"
              className="w-full transition-transform hover:scale-125"
              fallbackAlt=""
            />
          </div>
          <Heading as="h3" size="xs" isDisplay={false}>
            {project.data.title}
          </Heading>
        </Card>
      </PrismicNextLink>
    </li>
  );
}

function renderProjectGridItem(project: Content.ProjectDocument<string>) {
  return <ProjectGridItem key={project.uid} {...project} />;
}

/**
 * Props for `ProjectGrid`.
 */
export type ProjectGridProps = SliceComponentProps<Content.ProjectGridSlice>;

/**
 * Component for "ProjectGrid" Slices.
 */
const ProjectGrid = async ({
  slice,
}: ProjectGridProps): Promise<JSX.Element> => {
  const client = createClient();
  const projects = await client.getByType('project', {
    pageSize: 3,
    orderings: [
      {
        field: 'project.date',
        direction: 'desc',
      },
    ],
  });

  return (
    <Container
      as="section"
      className="text-center"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Heading as="h2">My work</Heading>
      <div className="grid gap-12">
        <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.results.map(renderProjectGridItem)}
        </ul>
      </div>
    </Container>
  );
};

export default ProjectGrid;
