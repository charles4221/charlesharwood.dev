'use client';

import { useEffect } from 'react';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/links/Button';
import { Heading } from '@/components/typography/Heading';
import { UmamiPlugin } from '@/plugins/umami';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (error) {
      UmamiPlugin()?.track('Error', {
        message: error.message,
      });
    }
  }, [error]);

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
