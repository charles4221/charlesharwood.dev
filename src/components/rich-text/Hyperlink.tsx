import { RTLinkNode } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import { PrismicNextLink } from '@prismicio/next';

export const Hyperlink: RichTextMapSerializerFunction<
  JSX.Element,
  RTLinkNode,
  string
> = function Hyperlink({ children, node }) {
  return (
    <PrismicNextLink
      field={node.data}
      className="bg-sky-300 hover:bg-teal-300 transition-colors dark:text-slate-950">
      {children}
    </PrismicNextLink>
  );
};
