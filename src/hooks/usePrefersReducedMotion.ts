import { useMatchMedia } from './useMatchMedia';

function getServerSnapshotForPrefersReducedMotion() {
  return false;
}

/**
 * Subscribe to the user's preference for reduced motion / animations.
 * @param getServerSnapshot The function to be called by the server to determine the initial value of the hook.
 */
export function usePrefersReducedMotion(
  getServerSnapshot = getServerSnapshotForPrefersReducedMotion,
) {
  return useMatchMedia('(prefers-reduced-motion: reduce)', getServerSnapshot);
}
