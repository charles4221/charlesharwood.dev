'use client';

import { MouseEventHandler, useEffect } from 'react';

import { useThemeInitialisation } from '@/hooks/useThemeInitialisation';
import { useBoundStore } from '@/store/bound';
import { setPreferredTheme } from '@/theme/set-theme';

import { DarkModeIcon } from './DarkModeIcon';
import { Button } from '../Button';

export function DarkModeSetting() {
  const {
    darkMode,
    darkModeUserOverride,
    setDarkMode,
    setDarkModeUserOverride,
  } = useBoundStore();

  useThemeInitialisation();

  useEffect(() => {
    setPreferredTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (
      darkModeUserOverride &&
      (darkModeUserOverride === 'dark') !== darkMode
    ) {
      setDarkMode(darkModeUserOverride === 'dark');

      return;
    }
  }, [setDarkMode, darkModeUserOverride, darkMode]);

  const handleUserChange: MouseEventHandler<HTMLButtonElement> = () => {
    setDarkModeUserOverride(darkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="white"
        isCompact
        isRounded
        onClick={handleUserChange}
        title={`Change colour theme to "${darkMode ? 'light' : 'dark'} mode"`}
        className="text-lg">
        <DarkModeIcon isDarkMode={darkMode} />
      </Button>
    </div>
  );
}
