import { PrismicNextLink } from '@prismicio/next';
import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTLinkNode } from '@prismicio/types';

export const Hyperlink: RichTextMapSerializerFunction<
  JSX.Element,
  RTLinkNode,
  string
> = function Hyperlink({ children, node }) {
  return (
    <PrismicNextLink field={node.data} className="link">
      {children}
    </PrismicNextLink>
  );
};
