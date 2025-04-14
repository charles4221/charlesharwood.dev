import type { ReactNode } from 'react';

import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import type { RTLinkNode } from '@prismicio/client/types';
import { PrismicNextLink } from '@prismicio/next';

export const Hyperlink: RichTextMapSerializerFunction<
  ReactNode,
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
