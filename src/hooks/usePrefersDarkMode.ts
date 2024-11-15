import { useMatchMedia } from './useMatchMedia';

function getServerSnapshotForPrefersDarkMode() {
  return false;
}

/**
 * Subscribe to the user's system preference for dark mode.
 * @param getServerSnapshot The function to be called by the server to determine the initial value of the hook.
 */
export function usePrefersDarkMode(
  getServerSnapshot = getServerSnapshotForPrefersDarkMode,
) {
  return useMatchMedia('(prefers-color-scheme: dark)', getServerSnapshot);
}
