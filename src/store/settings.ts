import { StateCreator } from 'zustand';

export type SettingsState = {
  /**
   * Whether the app is in dark mode or not.
   */
  darkMode: boolean | undefined;
  /**
   * Whether the user has explicitly set the dark mode setting or not.
   * If undefined, the user has not set the setting, and we'll rely solely on OS preference.
   */
  darkModeUserOverride: 'dark' | 'light' | undefined;
};

export type SettingsActions = {
  setDarkMode: (darkMode: boolean) => void;
  setDarkModeUserOverride: (darkModeUserOverride: 'dark' | 'light') => void;
};

export const createSettingsStore: StateCreator<
  SettingsState & SettingsActions
> = (set) => {
  return {
    darkMode: true,
    darkModeUserOverride: undefined,
    setDarkMode: (darkMode: boolean) => set({ darkMode }),
    setDarkModeUserOverride: (darkModeUserOverride: 'dark' | 'light') =>
      set({
        darkMode: darkModeUserOverride === 'dark',
        darkModeUserOverride,
      }),
  };
};

export const SettingsSelectors = {
  getDarkModeSetting: (state: SettingsState) => state.darkMode,
  getDarkModeSettingWithSetter: (state: SettingsState & SettingsActions) =>
    [state.darkMode, state.setDarkMode] as const,
  getDarkModeUserOverride: (state: SettingsState) => state.darkModeUserOverride,
  getDarkModeUserOverrideWithSetter: (state: SettingsState & SettingsActions) =>
    [state.darkModeUserOverride, state.setDarkModeUserOverride] as const,
};
