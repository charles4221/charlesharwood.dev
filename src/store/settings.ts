import { StateCreator } from 'zustand';

import { Theme } from '@/theme/types';

export type SettingsState = {
  /**
   * Which theme the user has selected.
   */
  theme: Theme;
  /**
   * Whether dark mode should be enabled.
   */
  isDarkMode: boolean;
  /**
   * Whether the system dark mode setting is enabled.
   */
  systemDarkMode: boolean;
};

export type SettingsActions = {
  setTheme: (theme: Theme) => void;
};

export const createSettingsStore: StateCreator<
  SettingsState & SettingsActions
> = (set) => {
  return {
    theme: 'system',
    isDarkMode:
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    systemDarkMode:
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    setTheme: (theme: Theme) => {
      let isDarkMode = theme === 'dark';

      if (theme === 'system') {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      set({ theme, isDarkMode });
    },
  };
};

export const SettingsSelectors = {
  getThemeSetting: (state: SettingsState) => state.theme,
  getThemeSettingWithSetter: (state: SettingsState & SettingsActions) =>
    [state.theme, state.setTheme] as const,
};
