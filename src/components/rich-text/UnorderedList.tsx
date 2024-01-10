import { RTListItemNode, RTListNode } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const UnorderedList: RichTextMapSerializerFunction<
  JSX.Element,
  RTListNode,
  undefined
> = function UnorderedList({ children }) {
  return <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>;
};

export const UnorderedListItem: RichTextMapSerializerFunction<
  JSX.Element,
  RTListItemNode,
  undefined
> = function UnorderedListItem({ children }) {
  return <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>;
};
