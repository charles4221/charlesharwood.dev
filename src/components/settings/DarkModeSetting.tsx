'use client';

import { memo, MouseEvent, useCallback, useRef, useState } from 'react';

import {
  IconDefinition,
  faComputer,
  faMoon,
  faSunBright,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useShallow } from 'zustand/shallow';

import { useEvent } from '@/hooks/useEvent';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useBoundStore } from '@/store/bound';
import { SetThemeOnDocument } from '@/theme/set-theme-on-document';
import { Theme } from '@/theme/types';

import { DarkModeIcon } from './DarkModeIcon';
import { Card } from '../layout/Card';
import { Button } from '../links/Button';
import { Heading } from '../typography/Heading';

gsap.registerPlugin(useGSAP);

type AnimationConfig = Record<
  'out' | 'in',
  Record<'from' | 'to', gsap.TweenVars>
>;
const exitedState: gsap.TweenVars = {
  opacity: 0,
  y: 32,
};
const enteredState: gsap.TweenVars = {
  opacity: 1,
  y: 16,
};
const ANIMATION_CONFIG: AnimationConfig = {
  out: {
    from: enteredState,
    to: exitedState,
  },
  in: {
    from: exitedState,
    to: enteredState,
  },
};

const DarkModeSettingPopover = memo(function DarkModeSettingPopover() {
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

export function DarkModeSetting() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const togglePopover = useEvent(
    contextSafe((setExplicitValue?: boolean | MouseEvent) => {
      let isOpening = !isOpen;
      if (typeof setExplicitValue === 'boolean') {
        isOpening = setExplicitValue;
      }

      // If the user prefers reduced motion, don't animate the popover,
      // just set the state directly and bail early.
      if (prefersReducedMotion) {
        setIsOpen(isOpening);
        return;
      }

      if (isOpening) {
        setIsOpen(true);
      }

      const direction = isOpening ? 'in' : 'out';

      gsap.fromTo(popoverRef.current, ANIMATION_CONFIG[direction].from, {
        ...ANIMATION_CONFIG[direction].to,
        duration: 0.2,
        onComplete: isOpening
          ? undefined
          : () => {
              setIsOpen(false);
            },
      });
    }),
  );

  useOutsideClick(
    containerRef,
    useCallback(() => {
      togglePopover(false);
    }, [togglePopover]),
  );

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between">
      <Button
        variant="white"
        isCompact
        isRounded
        onClick={togglePopover}
        title="Change colour theme"
        className="text-lg">
        <DarkModeIcon />
      </Button>
      <span ref={popoverRef}>{isOpen ? <DarkModeSettingPopover /> : null}</span>
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

function ThemeSettingItem({ label, value, icon, ariaTitle }: ThemeOption) {
  const systemPrefersDarkMode = usePrefersDarkMode();
  const { isActive, setTheme } = useBoundStore(
    useShallow((state) => ({
      isActive: state.theme === value,
      setTheme: state.setTheme,
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
          {value === 'system'
            ? ` (${systemPrefersDarkMode ? 'dark' : 'light'})`
            : ''}
        </p>
        <FontAwesomeIcon icon={icon} />
      </div>
    </Button>
  );
}

function renderThemeSettingItem(option: ThemeOption) {
  return <ThemeSettingItem key={option.value} {...option} />;
}
