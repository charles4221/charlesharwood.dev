import { ComponentProps } from 'react';

import NextLink from 'next/link';

export function PlainLink(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className="border-sky-400 border-b-2 hover:border-b-4 transition-all font-semibold"
      {...props}
    />
  );
}
