import { fireEvent, renderHook, screen } from '@testing-library/react';

import { useOutsideClick } from '../useOutsideClick';

describe('useOutsideClick', () => {
  it('should call the callback when a click occurs outside of the provided element', () => {
    const ref = { current: document.createElement('div') };
    const callback = jest.fn();
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useOutsideClick(ref, callback), {
      wrapper: ({ children }) => <div data-testid="outer">{children}</div>,
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );

    fireEvent.mouseDown(screen.getByTestId('outer'));

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
  });

  it('should not call the callback when a click occurs inside of the provided element', () => {
    const ref = { current: document.createElement('div') };
    const callback = jest.fn();
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useOutsideClick(ref, callback), {
      wrapper: ({ children }) => <div data-testid="outer">{children}</div>,
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );

    fireEvent.mouseDown(ref.current);

    expect(callback).not.toHaveBeenCalled();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
  });
});
