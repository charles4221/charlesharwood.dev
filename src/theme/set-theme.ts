export function setPreferredTheme(theme: 'dark' | 'light') {
  if (typeof window.__setPreferredTheme === 'function') {
    window.__setPreferredTheme(theme);
  }
}
