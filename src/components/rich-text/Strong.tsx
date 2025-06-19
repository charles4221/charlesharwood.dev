import type { ReactNode } from 'react';

import type { RTStrongNode } from '@prismicio/client';
import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const Strong: RichTextMapSerializerFunction<
  ReactNode,
  RTStrongNode,
  string
> = function Strong({ children }) {
  return <strong className="font-semibold">{children}</strong>;
};
