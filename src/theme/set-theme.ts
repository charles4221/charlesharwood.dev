export function setPreferredTheme(theme: 'dark' | 'light') {
  if (typeof window.__setPreferredTheme === 'function') {
    window.__setPreferredTheme(theme);
  }
}

export const SET_PREFERRED_THEME_SCRIPT = `(function () {
  function setTheme(newTheme) {
    window.__theme = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
  };

  let preferredTheme;

  try {
    preferredTheme = JSON.parse(localStorage.getItem('persisted-store')).state
      .darkModeUserOverride;
  } catch {}

  let initialTheme = preferredTheme;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (!initialTheme) {
    initialTheme = darkQuery.matches ? 'dark' : 'light';
  }

  setTheme(initialTheme);

  darkQuery.addEventListener('change', function (e) {
    if (!preferredTheme) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();`;
