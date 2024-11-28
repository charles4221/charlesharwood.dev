import { PropsWithChildren } from 'react';

import { TransitionProvider } from '@/providers/TransitionProvider';

export function Providers({ children }: PropsWithChildren) {
  return <TransitionProvider>{children}</TransitionProvider>;
}
