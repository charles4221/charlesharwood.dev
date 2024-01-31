import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTHeading3Node } from '@prismicio/types';

import { Heading } from '../typography/Heading';

export const Heading3: RichTextMapSerializerFunction<
  JSX.Element,
  RTHeading3Node,
  undefined
> = function Heading3({ children }) {
  return (
    <Heading
      as="h3"
      size="sm"
      className="mb-7 mt-12 first:mt-0 last:mb-0"
      isDisplay={false}>
      {children}
    </Heading>
  );
};
