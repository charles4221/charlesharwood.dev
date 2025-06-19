import type { ReactNode } from 'react';

import type { RTHeading5Node } from '@prismicio/client';
import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

import { Heading } from '../typography/Heading';

export const Heading5: RichTextMapSerializerFunction<
  ReactNode,
  RTHeading5Node,
  undefined
> = function Heading5({ children }) {
  return (
    <Heading
      as="h5"
      size="xs"
      className="mb-3 mt-3 first:mt-0 last:mb-0"
      isDisplay={false}>
      {children}
    </Heading>
  );
};
