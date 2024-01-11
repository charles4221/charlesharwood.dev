import { RTHeading3Node } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

import { Heading } from '../typography/Heading';

export const Heading3: RichTextMapSerializerFunction<
  JSX.Element,
  RTHeading3Node,
  undefined
> = function Heading3({ children }) {
  return (
    <Heading as="h3" size="sm" className="mb-7 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  );
};
