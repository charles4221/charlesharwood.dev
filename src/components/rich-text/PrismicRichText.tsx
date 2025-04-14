import {
  PrismicRichText as BasePrismicRichText,
  PrismicRichTextProps,
} from '@prismicio/react';

import { componentSerializer } from './component-serializer';

export function PrismicRichText({
  components,
  ...props
}: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
      components={{ ...componentSerializer, ...components }}
      {...props}
    />
  );
}
