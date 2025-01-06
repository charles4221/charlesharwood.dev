'use client';

import { memo, useEffect } from 'react';

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { useBoundStore } from '@/store/bound';
import { SettingsSelectors } from '@/store/settings';

/**
 * Set the theme globally by applying a class to the document (`<html>`) element.
 *
 * This might technically break the "rules" of React, since we're directly manipulating
 * the DOM outside of React's control, but doing it this way means we can switch between
 * light and dark modes without any flicker or delay, and without any re-rendering of components.
 *
 * E.g. if we were to manage this class on the `html` element in React (the "correct" way),
 * we would have to turn the root Layout into a client component,
 * killing server-side rendering / static generation for the whole app.
 *
 * It is also similar to how React are doing it on their own documentation website,
 * so I think it's a fair compromise.
 */
export function setThemeOnDocument(newTheme: 'dark' | 'light') {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (newTheme === 'light') {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Pure Component that wraps a hook that sets the theme on the document when the dark mode setting changes.
 * This enables reacting to the change of `theme` or `systemPrefersDarkMode` without re-rendering any components.
 */
export const SetThemeOnDocument = memo(function SetThemeOnDocument() {
  const theme = useBoundStore(SettingsSelectors.getTheme);
  const systemPrefersDarkMode = usePrefersDarkMode();

  const isDarkMode =
    theme === 'dark' || (theme === 'system' && systemPrefersDarkMode);

  useEffect(() => {
    setThemeOnDocument(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // eslint-disable-next-line unicorn/no-null
  return null;
});
