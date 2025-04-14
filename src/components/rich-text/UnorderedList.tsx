import type { ReactNode } from 'react';

import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import type { RTListItemNode, RTListNode } from '@prismicio/client/types';

export const UnorderedList: RichTextMapSerializerFunction<
  ReactNode,
  RTListNode,
  undefined
> = function UnorderedList({ children }) {
  return <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>;
};

export const UnorderedListItem: RichTextMapSerializerFunction<
  ReactNode,
  RTListItemNode,
  undefined
> = function UnorderedListItem({ children }) {
  return <li className="mb-3 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>;
};
