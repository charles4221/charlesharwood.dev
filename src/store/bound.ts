import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  SettingsActions,
  SettingsState,
  createSettingsStore,
} from './settings';

export type StoreState = SettingsState & SettingsActions;
export type PersistedStoreState = Pick<StoreState, 'darkModeUserOverride'>;

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createSettingsStore(...a),
      }),
      {
        name: 'persisted-store',
        onRehydrateStorage: (state) => {
          console.log({ stateBeforeHydrate: state });

          return (stateAfterHydrate, error) => {
            if (error) {
              console.error(error);
              window.alert('Error: Failed to rehydrate store');
              return;
            }

            console.log({ stateAfterHydrate });
          };
        },
        partialize: (state) => ({
          darkModeUserOverride: state.darkModeUserOverride,
        }),
      },
    ),
  ),
);
