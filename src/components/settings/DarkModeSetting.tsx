'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
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
  const isOpenRef = useRef(() => isOpen);
  const { theme, setTheme, isDarkMode, systemDarkMode } = useBoundStore();

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    wrapperRef,
    useCallback(() => {
      if (isOpenRef.current()) {
        setIsOpen(false);
      }
    }, []),
  );

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function handleThemeSelect(theme: Theme) {
    return () => {
      setTheme(theme);
      setIsOpen(false);
    };
  }

  useEffect(() => {
    setThemeOnDocument(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div
      ref={wrapperRef}
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
        <div
          className="absolute top-full right-0 left-auto w-72 text-slate-950 dark:text-white"
          onBlur={() => {
            if (isOpen) {
              setIsOpen(false);
            }
          }}>
          <Card>
            <Heading as="h4" size="xs" isDisplay={false}>
              Dark Mode Settings
            </Heading>
            <Button
              className="w-full mt-1"
              isRounded
              onClick={handleThemeSelect('dark')}
              disabled={theme === 'dark'}
              title="Change colour theme to dark mode">
              <div className="flex justify-between items-center text-left">
                <p className="text-lg">Dark Theme</p>
                <FontAwesomeIcon icon={faMoon} />
              </div>
            </Button>
            <Button
              className="w-full mt-1"
              isRounded
              onClick={handleThemeSelect('light')}
              disabled={theme === 'light'}
              title="Change colour theme to light mode">
              <div className="flex justify-between items-center text-left">
                <p className="text-lg">Light Theme</p>
                <FontAwesomeIcon icon={faSunBright} />
              </div>
            </Button>
            <Button
              className="w-full mt-1"
              isRounded
              onClick={handleThemeSelect('system')}
              disabled={theme === 'system'}
              title="Use system preference for dark mode">
              <div className="flex justify-between items-center text-left">
                <p className="text-lg">
                  Use System Setting ({systemDarkMode ? 'dark' : 'light'})
                </p>
                <FontAwesomeIcon icon={faComputer} />
              </div>
            </Button>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
