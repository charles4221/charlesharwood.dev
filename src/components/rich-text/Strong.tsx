import { RTStrongNode } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const Strong: RichTextMapSerializerFunction<
  JSX.Element,
  RTStrongNode,
  string
> = function Strong({ children }) {
  return <strong className="font-semibold">{children}</strong>;
};
