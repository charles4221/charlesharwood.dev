import { Heading } from '@/components/Heading';
import { PlainLink } from '@/components/PlainLink';

import { Container } from '@/components/Container';

export default function NotFound() {
  return (
    <Container as="main">
      <Heading as="h2" size="xl">
        Error 404
      </Heading>
      <Heading as="h3">Not Found</Heading>
      <p className="text-lg">Sorry, this page does not seem to exist.</p>
      <PlainLink href="/">Return Home</PlainLink>
    </Container>
  );
}
