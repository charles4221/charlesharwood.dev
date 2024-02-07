import { renderHook } from '@testing-library/react';

import { useIsActivePage } from '../useIsActivePage';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/path'),
}));

describe('useIsActivePage', () => {
  it('should return true when the link is the current page', () => {
    const { result } = renderHook(() =>
      useIsActivePage({ link_type: 'Document', url: '/path' }),
    );

    expect(result.current).toBe(true);
  });

  it('should return false when the link is not the current page', () => {
    const { result } = renderHook(() =>
      useIsActivePage({ link_type: 'Document', url: '/other-path' }),
    );

    expect(result.current).toBe(false);
  });
});
