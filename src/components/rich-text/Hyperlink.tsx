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
    // TODO: remove this ts-expect-error once the types are updated correctly in `@prismicio/client`
    // @ts-expect-error - after updating `@primicio/client` to v7.14.0 and above, there's a mismatch in the types here
    <PrismicNextLink field={node.data} className="link" {...eventProperties}>
      {children}
    </PrismicNextLink>
  );
};
