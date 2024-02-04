import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IS_DEV } from '@/utils/constants';

import {
  SettingsActions,
  SettingsState,
  createSettingsStore,
} from './settings';

export type StoreState = SettingsState & SettingsActions;
export type PersistedStoreState = {
  state: Pick<StoreState, 'darkModeUserOverride'>;
};

export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createSettingsStore(...a),
      }),
      {
        name: 'persisted-store',
        onRehydrateStorage: IS_DEV
          ? (state) => {
              console.log({ stateBeforeHydrate: state });

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
          darkModeUserOverride: state.darkModeUserOverride,
        }),
      },
    ),
  ),
);
