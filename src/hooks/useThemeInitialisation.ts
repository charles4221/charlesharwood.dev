import { useEffect } from 'react';

import { PersistedStoreState } from '@/store/bound';
import { parseJson } from '@/utils/parse-json';

export function useThemeInitialisation() {
  // onload effect.
  useEffect(() => {
    function setTheme(newTheme: 'dark' | 'light') {
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

    let preferredTheme: 'dark' | 'light' | undefined;

    try {
      preferredTheme = parseJson<{ state: PersistedStoreState }>(
        localStorage.getItem('persisted-store'),
      ).state.darkModeUserOverride;
    } catch (error) {
      console.error('could not parse persisted store for theme init', error);
    }

    let initialTheme = preferredTheme;
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (!initialTheme) {
      initialTheme = darkQuery.matches ? 'dark' : 'light';
    }

    setTheme(initialTheme);

    function handleQueryEvent(e: MediaQueryListEvent) {
      if (!preferredTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    }

    darkQuery.addEventListener('change', handleQueryEvent);

    return function () {
      darkQuery.removeEventListener('change', handleQueryEvent);
    };
  }, []);
}
