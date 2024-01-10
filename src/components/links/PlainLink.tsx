import { ComponentProps } from 'react';

import NextLink from 'next/link';

export function PlainLink(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className="underline decoration-1 underline-offset-2 text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
      {...props}
    />
  );
}
