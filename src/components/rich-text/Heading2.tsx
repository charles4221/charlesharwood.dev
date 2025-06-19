import type { ReactNode } from 'react';

import type { RTHeading2Node } from '@prismicio/client';
import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

import { Heading } from '../typography/Heading';

export const Heading2: RichTextMapSerializerFunction<
  ReactNode,
  RTHeading2Node,
  undefined
> = function Heading2({ children }) {
  return (
    <Heading
      as="h2"
      size="md"
      className="mb-7 mt-12 first:mt-0 last:mb-0"
      isDisplay={false}>
      {children}
    </Heading>
  );
};
