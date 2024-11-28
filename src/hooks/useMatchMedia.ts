import { useDebugValue, useMemo, useSyncExternalStore } from 'react';

/**
 * Subscribe to a media query and return the current match state.
 */
export function useMatchMedia(
  query: `(${string})`,
  getServerSnapshot?: () => boolean,
): boolean {
  const { subscribe, getSnapshot } = useMemo(() => {
    let MEDIA_QUERY_CACHE: MediaQueryList | undefined;

    const getMatchMedia = (): MediaQueryList => {
      if (!MEDIA_QUERY_CACHE) {
        MEDIA_QUERY_CACHE = globalThis.matchMedia(query);
      }

      return MEDIA_QUERY_CACHE;
    };

    return {
      subscribe: (onQueryChange: () => void) => {
        const matchMedia = getMatchMedia();
        matchMedia.addEventListener('change', onQueryChange);

        return () => {
          matchMedia.removeEventListener('change', onQueryChange);
        };
      },
      getSnapshot: () => getMatchMedia().matches,
    };
  }, [query]);

  useDebugValue(query);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
