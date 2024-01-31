import { PrismicNextLink } from '@prismicio/next';
import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTLinkNode } from '@prismicio/types';

export const Hyperlink: RichTextMapSerializerFunction<
  JSX.Element,
  RTLinkNode,
  string
> = function Hyperlink({ children, node }) {
  return (
    <PrismicNextLink
      field={node.data}
      className="border-sky-400 border-b-2 hover:border-b-4 transition-all font-semibold">
      {children}
    </PrismicNextLink>
  );
};
