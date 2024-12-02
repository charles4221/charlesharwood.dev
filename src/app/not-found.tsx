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

export default function NotFound() {
  return (
    <Container as="main">
      <Heading as="h1" size="xl">
        Error 404
      </Heading>
      <Heading as="h2">Not Found</Heading>
      <p className="text-lg my-10">
        Sorry, this is not the page you&apos;re searching for.
      </p>
      <PlainLink href="/">Move Along (return home)</PlainLink>
    </Container>
  );
}
