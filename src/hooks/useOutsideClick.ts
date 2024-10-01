import { RefObject, useEffect } from 'react';

/**
 * Hook that triggers a callback when a click occurs outside of the provided element.
 */
export function useOutsideClick(
  /**
   * The HTML Element to watch for clicks outside of.
   */
  ref: RefObject<HTMLElement>,
  /**
   * The callback function to run when the click occurs.
   * Ensure the callback is memoised to prevent triggering the effect on every render.
   */
  callback: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
