import { create } from 'zustand';
import {
  DevtoolsOptions,
  PersistOptions,
  devtools,
  persist,
} from 'zustand/middleware';

import { IS_DEV } from '@/utils/constants';

import { SettingsStore, createSettingsStore } from './settings';

export type StoreState = SettingsStore;
export type PersistedStoreState = Pick<StoreState, 'theme' | 'isDarkMode'>;

const devtoolsOptions: DevtoolsOptions = {
  enabled: IS_DEV,
};

const persistOptions: PersistOptions<StoreState, PersistedStoreState> = {
  name: 'persisted-store',
  onRehydrateStorage: IS_DEV
    ? (stateBeforeHydrate) => {
        console.log({ stateBeforeHydrate });

        return (stateAfterHydrate, error) => {
          console.log({ stateAfterHydrate });

          if (error) {
            console.error(error);
            window.alert(
              'Error: Failed to rehydrate store. Check console for more info.',
            );
          }
        };
      }
    : undefined,
  partialize: (state) => ({
    theme: state.theme,
    isDarkMode: state.isDarkMode,
  }),
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
