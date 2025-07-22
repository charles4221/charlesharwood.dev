import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { UmamiPlugin } from '@/plugins/umami';
import { StoreActions, StoreSelectors, useBoundStore } from '@/store/bound';
import { SettingsState } from '@/store/settings';
import { Theme } from '@/theme/types';

import { ThemeOption } from './types';
import { Button } from '../links/Button';

function makeIsThemeSettingActive(theme: Theme) {
  return (state: SettingsState) =>
    StoreSelectors.isThemeSettingActive(state, theme);
}

export function DarkModeSettingItem({
  label,
  value,
  icon,
  ariaTitle,
}: ThemeOption) {
  const systemPrefersDarkMode = usePrefersDarkMode();
  const isActive = useBoundStore(makeIsThemeSettingActive(value));

  function handleChangeTheme() {
    StoreActions.setTheme(value);

    UmamiPlugin()?.track('Changed Theme', {
      theme: value,
      systemPrefersDarkMode,
    });
  }

  return (
    <Button
      className="w-full mt-1"
      variant={isActive ? 'teal' : 'sky'}
      isRounded
      onClick={handleChangeTheme}
      title={ariaTitle}>
      <div className="flex justify-between items-center text-left">
        <p className="text-lg">
          {label}
          {value === 'system'
            ? ` (${systemPrefersDarkMode ? 'dark' : 'light'})`
            : ''}
        </p>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Button>
  );
}
