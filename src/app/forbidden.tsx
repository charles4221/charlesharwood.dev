import { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { PlainLink } from '@/components/links/PlainLink';
import { Heading } from '@/components/typography/Heading';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForbiddenPage() {
  return (
    <Container as="main">
      <Heading as="h1" size="xl">
        Error 403
      </Heading>
      <Heading as="h2">Forbidden</Heading>
      <p className="text-lg my-10">
        Sorry, you are not allowed to access this resource.
      </p>
      <PlainLink href="/">Move Along (return home)</PlainLink>
    </Container>
  );
}
