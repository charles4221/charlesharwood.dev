import { ComponentProps } from 'react';

import NextLink from 'next/link';

export function PlainLink(props: ComponentProps<typeof NextLink>) {
  return <NextLink className="link" {...props} />;
}
