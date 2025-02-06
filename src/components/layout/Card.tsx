import { PropsWithChildren } from 'react';

import clsx from 'clsx';

type CardProps = PropsWithChildren<{
  isCentered?: boolean;
  isLink?: boolean;
}>;

export function Card({ children, isCentered, isLink }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-slate-200 dark:bg-slate-800 rounded-lg px-4 py-5 sm:p-6',
        isCentered && 'flex justify-center items-center',
        isLink &&
          'shadow-lg dark:shadow-md dark:shadow-sky-900 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-sky-900 hover:bg-slate-300 dark:hover:bg-slate-700 group-hover:bg-slate-300 dark:group-hover:bg-slate-700 group-hover:shadow-xl transition-all',
      )}>
      {children}
    </div>
  );
}
