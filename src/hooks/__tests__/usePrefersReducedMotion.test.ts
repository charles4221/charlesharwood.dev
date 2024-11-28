import { renderHook } from '@testing-library/react';

import { useMatchMedia } from '../useMatchMedia';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

jest.mock('../useMatchMedia');

describe('usePrefersReducedMotion', () => {
  it('should return false when prefers-reduced-motion is not set', () => {
    (useMatchMedia as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when prefers-reduced-motion is set', () => {
    (useMatchMedia as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should call useMatchMedia with the correct media query', () => {
    renderHook(() => usePrefersReducedMotion());
    expect(useMatchMedia).toHaveBeenCalledWith(
      '(prefers-reduced-motion: reduce)',
      expect.any(Function),
    );
  });
});
