import { PropsWithChildren } from 'react';

import clsx from 'clsx';

type CardProps = PropsWithChildren<{
  isLink?: boolean;
}>;

export function Card({ children, isLink }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-slate-200 dark:bg-slate-800 sm:rounded-lg px-4 py-5 sm:p-6',
        isLink &&
          'shadow-lg hover:shadow-xl hover:bg-slate-300 hover:dark:bg-slate-700 transition-all',
      )}>
      {children}
    </div>
  );
}
