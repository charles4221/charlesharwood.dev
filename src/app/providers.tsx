'use client';

import { PropsWithChildren } from 'react';

import { TransitionRouter } from 'next-transition-router';

import {
  transitionAnimationEnter,
  transitionAnimationLeave,
} from '@/utils/transition-animations';

export function Providers({ children }: PropsWithChildren) {
  return (
    <TransitionRouter
      auto
      leave={transitionAnimationLeave}
      enter={transitionAnimationEnter}>
      {children}
    </TransitionRouter>
  );
}
