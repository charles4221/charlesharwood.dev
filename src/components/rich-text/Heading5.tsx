import type { JSX } from 'react';

import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTHeading5Node } from '@prismicio/types';

import { Heading } from '../typography/Heading';

export const Heading5: RichTextMapSerializerFunction<
  JSX.Element,
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
