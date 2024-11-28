import { StateCreator } from 'zustand';

import { Theme } from '@/theme/types';

export type SettingsState = {
  /**
   * Which theme the user has selected.
   */
  theme: Theme;
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
    setTheme: function setTheme(theme: Theme) {
      set({ theme }, false, {
        type: 'settings/setTheme',
        payload: theme,
      });
    },
  };
};

export const SettingsSelectors = {
  getTheme: (state: SettingsStore) => state.theme,
  getThemeWithSetter: (state: SettingsStore) =>
    [state.theme, state.setTheme] as const,
};
