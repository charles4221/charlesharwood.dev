'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  IconDefinition,
  faComputer,
  faMoon,
  faSunBright,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useBoundStore } from '@/store/bound';
import { Theme } from '@/theme/types';

import { DarkModeIcon } from './DarkModeIcon';
import { Card } from '../layout/Card';
import { Button } from '../links/Button';
import { Heading } from '../typography/Heading';

function setThemeOnDocument(newTheme: 'dark' | 'light') {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (newTheme === 'light') {
    document.documentElement.classList.remove('dark');
  }
}

export function DarkModeSetting() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, isDarkMode, systemDarkMode } = useBoundStore();

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

  function makeHandleThemeSelect(theme: Theme) {
    return function handleThemeSelect() {
      setTheme(theme);
      setIsOpen(false);
    };
  }

  useEffect(() => {
    setThemeOnDocument(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
              Dark Mode Settings
            </Heading>
            {THEME_OPTIONS.map((option) => {
              const isCurrentOption = theme === option.value;

              return (
                <Button
                  key={option.value}
                  className="w-full mt-1"
                  variant={isCurrentOption ? 'teal' : 'sky'}
                  isRounded
                  onClick={makeHandleThemeSelect(option.value)}
                  title={option.ariaTitle}>
                  <div className="flex justify-between items-center text-left">
                    <p className="text-lg">
                      {option.label}
                      {option.value === 'system'
                        ? ` (${systemDarkMode ? 'dark' : 'light'})`
                        : ''}
                    </p>
                    <FontAwesomeIcon icon={option.icon} />
                  </div>
                </Button>
              );
            })}
          </Card>
        </div>
      ) : null}
    </div>
  );
}

const THEME_OPTIONS: {
  label: string;
  value: Theme;
  icon: IconDefinition;
  ariaTitle: string;
}[] = [
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
    ariaTitle: 'Use system preference for dark mode',
  },
];
