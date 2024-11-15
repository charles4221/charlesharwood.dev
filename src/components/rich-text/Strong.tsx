import type { JSX } from 'react';

import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTStrongNode } from '@prismicio/types';

export const Strong: RichTextMapSerializerFunction<
  JSX.Element,
  RTStrongNode,
  string
> = function Strong({ children }) {
  return <strong className="font-semibold">{children}</strong>;
};
