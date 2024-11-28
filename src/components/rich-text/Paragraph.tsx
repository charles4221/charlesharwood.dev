import type { JSX } from 'react';

import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTParagraphNode } from '@prismicio/types';

export const Paragraph: RichTextMapSerializerFunction<
  JSX.Element,
  RTParagraphNode,
  undefined
> = function Paragraph({ children }) {
  return <p className="mb-7 last:mb-0">{children}</p>;
};
