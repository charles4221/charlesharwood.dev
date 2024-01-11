import { RTHeading2Node } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

import { Heading } from '../typography/Heading';

export const Heading2: RichTextMapSerializerFunction<
  JSX.Element,
  RTHeading2Node,
  undefined
> = function Heading2({ children }) {
  return (
    <Heading as="h2" size="md" className="mb-7 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  );
};
