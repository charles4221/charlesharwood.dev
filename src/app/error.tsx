'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/links/Button';
import { Heading } from '@/components/typography/Heading';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  console.log(error);
  return (
    <Container as="main">
      <Heading as="h1" size="xl">
        Error!
      </Heading>
      <p className="text-lg my-10">
        An unknown error has occurred. Please try again later.
      </p>
      <Button isCTA onClick={reset}>
        Try Again
      </Button>
    </Container>
  );
}
