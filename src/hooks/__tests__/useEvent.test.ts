import { renderHook } from '@testing-library/react';

import { useEvent } from '../useEvent';

describe('useEvent', () => {
  it('should return a stable function identity', () => {
    const handler = jest.fn();
    const { result, rerender } = renderHook(() => useEvent(handler));

    const firstHandler = result.current;
    rerender();
    const secondHandler = result.current;

    expect(firstHandler).toBe(secondHandler);
  });

  it('should call the latest handler', () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();
    const { result, rerender } = renderHook(
      ({ handler }) => useEvent(handler),
      {
        initialProps: { handler: firstHandler },
      },
    );

    result.current();
    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).not.toHaveBeenCalled();

    rerender({ handler: secondHandler });
    result.current();
    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the handler', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useEvent(handler));

    result.current('arg1', 'arg2');
    expect(handler).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
