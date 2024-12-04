import * as Sentry from '@sentry/nextjs';
import { renderHook } from '@testing-library/react';

import { useCaptureException } from '../useCaptureException';

jest.mock('@sentry/nextjs');

describe('useCaptureException', () => {
  it('should call captureException with the provided error', () => {
    const error = new Error('Test error');
    renderHook(() => useCaptureException(error));
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it('should not call captureException if error is the same', () => {
    const error = new Error('Test error');
    const { rerender } = renderHook(() => useCaptureException(error));
    rerender();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it('should call captureException again if error changes', () => {
    const error1 = new Error('Test error 1');
    const error2 = new Error('Test error 2');
    const { rerender } = renderHook(({ error }) => useCaptureException(error), {
      initialProps: { error: error1 },
    });
    rerender({ error: error2 });
    expect(Sentry.captureException).toHaveBeenCalledTimes(2);
    expect(Sentry.captureException).toHaveBeenCalledWith(error2);
  });
});
