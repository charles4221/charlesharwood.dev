import { RTParagraphNode } from '@prismicio/client';
import { RichTextMapSerializerFunction } from '@prismicio/client/richtext';

export const Paragraph: RichTextMapSerializerFunction<
  JSX.Element,
  RTParagraphNode,
  undefined
> = function Paragraph({ children }) {
  return <p className="mb-7 last:mb-0">{children}</p>;
};
