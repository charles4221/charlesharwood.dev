import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useShallow } from 'zustand/shallow';

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { UmamiPlugin } from '@/plugins/umami';
import { useBoundStore } from '@/store/bound';

import { ThemeOption } from './types';
import { Button } from '../links/Button';

export function DarkModeSettingItem({
  label,
  value,
  icon,
  ariaTitle,
}: ThemeOption) {
  const systemPrefersDarkMode = usePrefersDarkMode();
  const { isActive, setTheme } = useBoundStore(
    useShallow((state) => ({
      isActive: state.theme === value,
      setTheme: state.setTheme,
    })),
  );

  function handleChangeTheme() {
    setTheme(value);

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
