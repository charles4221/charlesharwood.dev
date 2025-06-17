import type { ReactNode } from 'react';

import type { RichTextMapSerializerFunction } from '@prismicio/client/richtext';
import type { RTPreformattedNode } from '@prismicio/client/types';

export const Preformatted: RichTextMapSerializerFunction<
  ReactNode,
  RTPreformattedNode,
  undefined
> = function Preformatted({ children }) {
  return (
    <pre className="mb-7 rounded-sm bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  );
};
