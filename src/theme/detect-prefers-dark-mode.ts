/**
 * Detects if the user's operating system or browser environment
 * has been configured to use/prefer dark mode.
 *
 * When a user selects the "Use System Setting" option from our theme options,
 * we will use this function to determine which theme to apply.
 */
export function detectPrefersDarkMode() {
  return (
    globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  );
}
