import type { ReactNode } from 'react';

import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import type { RTStrongNode } from '@prismicio/client/types';

export const Strong: RichTextMapSerializerFunction<
  ReactNode,
  RTStrongNode,
  string
> = function Strong({ children }) {
  return <strong className="font-semibold">{children}</strong>;
};
