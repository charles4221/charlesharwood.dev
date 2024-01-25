import { PrismicRichText as BasePrismicRichText } from '@prismicio/react';
import type { JSXMapSerializer, PrismicRichTextProps } from '@prismicio/react';

import { Heading1 } from './rich-text/Heading1';
import { Heading2 } from './rich-text/Heading2';
import { Heading3 } from './rich-text/Heading3';
import { Heading4 } from './rich-text/Heading4';
import { Heading5 } from './rich-text/Heading5';
import { Hyperlink } from './rich-text/Hyperlink';
import { OrderedList, OrderedListItem } from './rich-text/OrderedList';
import { Paragraph } from './rich-text/Paragraph';
import { Preformatted } from './rich-text/Preformatted';
import { Strong } from './rich-text/Strong';
import { UnorderedList, UnorderedListItem } from './rich-text/UnorderedList';

const defaultComponents: JSXMapSerializer = {
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
  heading5: Heading5,
  paragraph: Paragraph,
  oList: OrderedList,
  oListItem: OrderedListItem,
  list: UnorderedList,
  listItem: UnorderedListItem,
  preformatted: Preformatted,
  strong: Strong,
  hyperlink: Hyperlink,
};

export function PrismicRichText({
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  );
}
