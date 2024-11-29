import { memo } from 'react';

import {
  faComputer,
  faMoon,
  faSunBright,
} from '@fortawesome/pro-light-svg-icons';

import { DarkModeSettingItem } from './DarkModeSettingItem';
import { ThemeOption } from './types';
import { Card } from '../layout/Card';
import { Heading } from '../typography/Heading';

const THEME_OPTIONS: ThemeOption[] = [
  {
    label: 'Dark Theme',
    value: 'dark',
    icon: faMoon,
    ariaTitle: 'Change colour theme to dark mode',
  },
  {
    label: 'Light Theme',
    value: 'light',
    icon: faSunBright,
    ariaTitle: 'Change colour theme to light mode',
  },
  {
    label: 'Use System Setting',
    value: 'system',
    icon: faComputer,
    ariaTitle: 'Use your system preference for dark mode',
  },
];

function renderThemeSettingItem(option: ThemeOption) {
  return <DarkModeSettingItem key={option.value} {...option} />;
}

export const DarkModeSettingPopover = memo(function DarkModeSettingPopover() {
  return (
    <div className="absolute top-full right-0 left-auto w-72 text-slate-950 dark:text-white mt-1 rounded-lg shadow-2xl dark:shadow-2xl dark:shadow-sky-900">
      <Card>
        <Heading as="h4" size="xs" isDisplay={false}>
          Theme Settings
        </Heading>
        {THEME_OPTIONS.map(renderThemeSettingItem)}
      </Card>
    </div>
  );
});
