'use client';

import { PropsWithChildren } from 'react';

import { TransitionRouter } from 'next-transition-router';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  transitionAnimationEnter,
  transitionAnimationLeave,
} from '@/utils/transition-animations';

export function TransitionProvider({ children }: PropsWithChildren) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Don't animate route transitions if user prefers reduced motion
  if (prefersReducedMotion) {
    return children;
  }

  return (
    <TransitionRouter
      auto
      leave={transitionAnimationLeave}
      enter={transitionAnimationEnter}>
      {children}
    </TransitionRouter>
  );
}
