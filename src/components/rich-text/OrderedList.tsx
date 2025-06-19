import type { ReactNode } from 'react';

import type { RTOListItemNode, RTOListNode } from '@prismicio/client';
import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const OrderedList: RichTextMapSerializerFunction<
  ReactNode,
  RTOListNode,
  undefined
> = function OrderedList({ children }) {
  return <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>;
};

export const OrderedListItem: RichTextMapSerializerFunction<
  ReactNode,
  RTOListItemNode,
  undefined
> = function OrderedListItem({ children }: { children: ReactNode }) {
  return (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  );
};
