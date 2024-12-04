import { useEffect } from 'react';

import { captureException } from '@sentry/nextjs';

export function useCaptureException(error: Error & { digest?: string }) {
  useEffect(() => {
    captureException(error);
  }, [error]);
}
