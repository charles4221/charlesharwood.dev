import { create } from 'zustand';
import {
  DevtoolsOptions,
  PersistOptions,
  devtools,
  persist,
} from 'zustand/middleware';

import { IS_DEV, IS_TEST } from '@/utils/constants';

import { SettingsStore, createSettingsStore } from './settings';

export type StoreState = SettingsStore;
export type PersistedStoreState = Pick<StoreState, 'theme'>;

const getPersistedState = (state: StoreState): PersistedStoreState => ({
  theme: state.theme,
});

const devtoolsOptions: DevtoolsOptions = {
  enabled: IS_DEV,
};

const persistOptions: PersistOptions<StoreState, PersistedStoreState> = {
  name: 'persisted-store',
  onRehydrateStorage:
    IS_DEV && !IS_TEST
      ? (stateBeforeHydrate) => {
          console.log(
            'onRehydrateStorage:stateBeforeHydrate',
            stateBeforeHydrate,
          );

          return (stateAfterHydrate, error) => {
            console.log(
              'onRehydrateStorage:stateAfterHydrate',
              stateAfterHydrate,
            );

            if (error) {
              console.error(error);
              globalThis.alert(
                'Error: Failed to rehydrate store. Check console for more info.',
              );
            }
          };
        }
      : undefined,
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
