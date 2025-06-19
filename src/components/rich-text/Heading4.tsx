import type { ReactNode } from 'react';

import type { RTHeading4Node } from '@prismicio/client';
import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

import { Heading } from '../typography/Heading';

export const Heading4: RichTextMapSerializerFunction<
  ReactNode,
  RTHeading4Node,
  undefined
> = function Heading4({ children }) {
  return (
    <Heading
      as="h4"
      size="sm"
      className="mb-3 mt-12 first:mt-0 last:mb-0"
      isDisplay={false}>
      {children}
    </Heading>
  );
};
