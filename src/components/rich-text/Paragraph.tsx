import type { ReactNode } from 'react';

import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import type { RTParagraphNode } from '@prismicio/client/types';

export const Paragraph: RichTextMapSerializerFunction<
  ReactNode,
  RTParagraphNode,
  undefined
> = function Paragraph({ children }) {
  return <p className="mb-7 last:mb-0">{children}</p>;
};
