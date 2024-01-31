import { ReactNode } from 'react';

import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTOListItemNode, RTOListNode } from '@prismicio/types';

export const OrderedList: RichTextMapSerializerFunction<
  JSX.Element,
  RTOListNode,
  undefined
> = function OrderedList({ children }) {
  return <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>;
};

export const OrderedListItem: RichTextMapSerializerFunction<
  JSX.Element,
  RTOListItemNode,
  undefined
> = function OrderedListItem({ children }: { children: ReactNode }) {
  return (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  );
};
