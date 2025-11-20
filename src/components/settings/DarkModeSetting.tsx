'use client';

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { useEvent } from '@/hooks/useEvent';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { UmamiPlugin } from '@/plugins/umami';

import { DarkModeIcon } from './DarkModeIcon';
import { DarkModeSettingPopover } from './DarkModeSettingPopover';
import { Button } from '../links/Button';

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

export function DarkModeSetting() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const togglePopover = useEvent(
    // TODO: remove the eslint-disable comment when the bugs with eslint-plugin-react-hooks are fixed by the React team
    // eslint-disable-next-line react-hooks/refs
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

  useEffect(() => {
    if (isOpen) {
      UmamiPlugin()?.track('Opened Theme Settings');
    }
  }, [isOpen]);

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
    </div>
  );
}
