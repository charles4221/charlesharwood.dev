'use client';

import { useCallback, useRef, useState } from 'react';

import {
  IconDefinition,
  faComputer,
  faMoon,
  faSunBright,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useShallow } from 'zustand/shallow';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useBoundStore } from '@/store/bound';
import { SetThemeOnDocument } from '@/theme/set-theme-on-document';
import { Theme } from '@/theme/types';

import { DarkModeIcon } from './DarkModeIcon';
import { Card } from '../layout/Card';
import { Button } from '../links/Button';
import { Heading } from '../typography/Heading';

export function DarkModeSetting() {
  const [isOpen, setIsOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    popoverRef,
    useCallback(() => {
      setIsOpen(false);
    }, []),
  );

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div
      ref={popoverRef}
      className="relative flex items-center justify-between">
      <Button
        variant="white"
        isCompact
        isRounded
        onClick={toggleOpen}
        title="Change colour theme"
        className="text-lg">
        <DarkModeIcon />
      </Button>
      {isOpen ? (
        <div className="absolute top-full right-0 left-auto w-72 text-slate-950 dark:text-white mt-1 rounded-lg shadow-2xl dark:shadow-2xl dark:shadow-sky-900">
          <Card>
            <Heading as="h4" size="xs" isDisplay={false}>
              Theme Settings
            </Heading>
            {THEME_OPTIONS.map(renderThemeSettingItem)}
          </Card>
        </div>
      ) : null}
      <SetThemeOnDocument />
    </div>
  );
}

type ThemeOption = {
  label: string;
  value: Theme;
  icon: IconDefinition;
  ariaTitle: string;
};

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

const ThemeSettingItem = function ThemeSettingItem({
  label,
  value,
  icon,
  ariaTitle,
}: ThemeOption) {
  const { isActive, setTheme, systemDarkMode } = useBoundStore(
    useShallow((state) => ({
      isActive: state.theme === value,
      setTheme: state.setTheme,
      systemDarkMode: state.systemDarkMode,
    })),
  );

  return (
    <Button
      className="w-full mt-1"
      variant={isActive ? 'teal' : 'sky'}
      isRounded
      onClick={() => setTheme(value)}
      title={ariaTitle}>
      <div className="flex justify-between items-center text-left">
        <p className="text-lg">
          {label}
          {value === 'system' ? ` (${systemDarkMode ? 'dark' : 'light'})` : ''}
        </p>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Button>
  );
};

function renderThemeSettingItem(option: ThemeOption) {
  return <ThemeSettingItem key={option.value} {...option} />;
}
