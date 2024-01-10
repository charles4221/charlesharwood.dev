import { RTPreformattedNode } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const Preformatted: RichTextMapSerializerFunction<
  JSX.Element,
  RTPreformattedNode,
  undefined
> = function Preformatted({ children }) {
  return (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  );
};
