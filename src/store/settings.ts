import { StateCreator } from 'zustand';

import { detectPrefersDarkMode } from '@/theme/detect-prefers-dark-mode';
import { setThemeOnDocument } from '@/theme/set-theme-on-document';
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

export type SettingsStore = SettingsState & SettingsActions;

export const createSettingsStore: StateCreator<
  SettingsStore,
  [['zustand/devtools', never]]
> = (set) => {
  return {
    theme: 'system',
    isDarkMode: detectPrefersDarkMode(),
    systemDarkMode: detectPrefersDarkMode(),
    setTheme: function setTheme(theme: Theme) {
      let isDarkMode = theme === 'dark';

      if (theme === 'system') {
        isDarkMode = detectPrefersDarkMode();
      }

      set({ theme, isDarkMode }, false, {
        type: 'settings/setTheme',
        payload: theme,
      });

      setThemeOnDocument(isDarkMode ? 'dark' : 'light');
    },
  };
};

export const SettingsSelectors = {
  getTheme: (state: SettingsStore) => state.theme,
  getThemeWithSetter: (state: SettingsStore) =>
    [state.theme, state.setTheme] as const,
  getIsDarkMode: (state: SettingsStore) => state.isDarkMode,
  getSystemDarkMode: (state: SettingsStore) => state.systemDarkMode,
};
