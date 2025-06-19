import type { ReactNode } from 'react';

import type { RTParagraphNode } from '@prismicio/client';
import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const Paragraph: RichTextMapSerializerFunction<
  ReactNode,
  RTParagraphNode,
  undefined
> = function Paragraph({ children }) {
  return <p className="mb-7 last:mb-0">{children}</p>;
};
