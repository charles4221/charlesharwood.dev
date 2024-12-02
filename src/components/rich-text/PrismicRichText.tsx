import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps,
} from '@prismicio/react';

import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Heading4 } from './Heading4';
import { Heading5 } from './Heading5';
import { Hyperlink } from './Hyperlink';
import { OrderedList, OrderedListItem } from './OrderedList';
import { Paragraph } from './Paragraph';
import { Preformatted } from './Preformatted';
import { Strong } from './Strong';
import { UnorderedList, UnorderedListItem } from './UnorderedList';

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
