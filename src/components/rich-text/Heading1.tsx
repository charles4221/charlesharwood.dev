import type { ReactNode } from 'react';

import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import type { RTHeading1Node } from '@prismicio/client/types';

import { Heading } from '../typography/Heading';

export const Heading1: RichTextMapSerializerFunction<
  ReactNode,
  RTHeading1Node,
  undefined
> = function Heading1({ children }) {
  return (
    <Heading as="h1" className="mb-7 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  );
};
