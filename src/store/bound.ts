import { create } from 'zustand';
import {
  DevtoolsOptions,
  PersistOptions,
  devtools,
  persist,
} from 'zustand/middleware';

import { setThemeOnDocument } from '@/theme/set-theme-on-document';
import { IS_DEV } from '@/utils/constants';

import { SettingsStore, createSettingsStore } from './settings';

export type StoreState = SettingsStore;
export type PersistedStoreState = Pick<StoreState, 'theme' | 'isDarkMode'>;

const getPersistedState = (state: StoreState): PersistedStoreState => ({
  theme: state.theme,
  isDarkMode: state.isDarkMode,
});

const devtoolsOptions: DevtoolsOptions = {
  enabled: IS_DEV,
};

const persistOptions: PersistOptions<StoreState, PersistedStoreState> = {
  name: 'persisted-store',
  onRehydrateStorage: (stateBeforeHydrate) => {
    if (IS_DEV) {
      console.log({ stateBeforeHydrate });
    }

    return (stateAfterHydrate, error) => {
      setThemeOnDocument(stateAfterHydrate?.isDarkMode ? 'dark' : 'light');

      if (!IS_DEV) return;

      console.log({ stateAfterHydrate });

      if (error) {
        console.error(error);
        window.alert(
          'Error: Failed to rehydrate store. Check console for more info.',
        );
      }
    };
  },
  partialize: getPersistedState,
};

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createSettingsStore(...a),
      }),
      persistOptions,
    ),
    devtoolsOptions,
  ),
);
