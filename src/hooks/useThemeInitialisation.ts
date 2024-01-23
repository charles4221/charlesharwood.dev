import { useEffect } from 'react';

import { PersistedStoreState } from '@/store/bound';
import { parseJson } from '@/utils/parse-json';

function setTheme(newTheme: 'dark' | 'light') {
  window.__theme = newTheme;

  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (newTheme === 'light') {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * In terms of the rules of React, this is pretty naughty lol, but it works.
 * The main reason for this is so that it doesn't cause dramas with server-side rendering.
 * If I implement stateful/reactive values into the main layout where the `html` element is rendered,
 * then the entire app would be rendered client-side and SSR would be disabled.
 */
export function useThemeInitialisation() {
  // onload effect.
  useEffect(() => {
    window.__setPreferredTheme = setTheme;

    let preferredTheme: 'dark' | 'light' | undefined;

    try {
      preferredTheme = parseJson<PersistedStoreState>(
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
