import { RTHeading1Node } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

import { Heading } from '../typography/Heading';

export const Heading1: RichTextMapSerializerFunction<
  JSX.Element,
  RTHeading1Node,
  undefined
> = function Heading1({ children }) {
  return (
    <Heading as="h1" className="mb-7 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  );
};
