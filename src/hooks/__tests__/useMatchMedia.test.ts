import { renderHook } from '@testing-library/react';

import { useMatchMedia } from '../useMatchMedia';

describe('useMatchMedia', () => {
  beforeEach(() => {
    globalThis.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 600px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it('should return true for matching media query', () => {
    const { result } = renderHook(() => useMatchMedia('(min-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('should return false for non-matching media query', () => {
    const { result } = renderHook(() => useMatchMedia('(max-width: 599px)'));
    expect(result.current).toBe(false);
  });

  it('should update when media query changes', () => {
    const matchMediaListeners: Record<string, () => void> = {};
    globalThis.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 600px)',
      addEventListener: jest.fn((event: string, listener: () => void) => {
        matchMediaListeners[event] = listener;
      }),
      removeEventListener: jest.fn((event) => {
        delete matchMediaListeners[event];
      }),
    }));

    const { result, rerender } = renderHook(
      ({ query }: { query: `(${string})` }) => useMatchMedia(query),
      {
        initialProps: { query: '(min-width: 600px)' },
      },
    );

    expect(result.current).toBe(true);

    // Change the media query
    rerender({ query: '(max-width: 599px)' });
    matchMediaListeners.change();
    expect(result.current).toBe(false);
  });
});
