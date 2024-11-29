import type { JSX } from 'react';

import { PrismicNextLink } from '@prismicio/next';
import { RichTextMapSerializerFunction } from '@prismicio/richtext';
import { RTLinkNode } from '@prismicio/types';

export const Hyperlink: RichTextMapSerializerFunction<
  JSX.Element,
  RTLinkNode,
  string
> = function Hyperlink({ children, node }) {
  const eventProperties =
    node.data.link_type === 'Web'
      ? {
          'data-umami-event': 'External link',
          'data-umami-event-title': node.data.url,
        }
      : undefined;

  return (
    <PrismicNextLink field={node.data} className="link" {...eventProperties}>
      {children}
    </PrismicNextLink>
  );
};
