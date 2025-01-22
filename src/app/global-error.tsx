'use client';

import NextError from 'next/error';

import { useCaptureException } from '@/hooks/useCaptureException';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useCaptureException(error);

  return (
    <html lang="en">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
