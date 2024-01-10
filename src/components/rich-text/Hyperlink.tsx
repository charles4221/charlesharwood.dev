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
      className="underline decoration-1 underline-offset-2 text-teal-500 hover:text-teal-600 dark:hover:text-teal-400">
      {children}
    </PrismicNextLink>
  );
};
