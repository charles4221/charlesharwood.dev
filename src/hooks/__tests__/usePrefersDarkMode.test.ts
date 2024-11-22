import { renderHook } from '@testing-library/react';

import { useMatchMedia } from '../useMatchMedia';
import { usePrefersDarkMode } from '../usePrefersDarkMode';

jest.mock('../useMatchMedia');

describe('usePrefersDarkMode', () => {
  it('should return false when prefers-color-scheme is not dark', () => {
    (useMatchMedia as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => usePrefersDarkMode());
    expect(result.current).toBe(false);
  });

  it('should return true when prefers-color-scheme is dark', () => {
    (useMatchMedia as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => usePrefersDarkMode());
    expect(result.current).toBe(true);
  });
});
