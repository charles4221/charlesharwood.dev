import { RichTextField, isFilled } from '@prismicio/client';
import { PrismicText } from '@prismicio/react';
import clsx from 'clsx';

type TestimonialProps = {
  quote: RichTextField;
  authorName: string;
  authorRole: string;
};

export function Testimonial({
  quote,
  authorName,
  authorRole,
}: TestimonialProps) {
  return isFilled.richText(quote) ? (
    <figure className="grid gap-6">
      <blockquote>
        <p
          className={clsx(
            'text-3xl font-medium leading-tight md:text-4xl md:leading-tight',
            !isFilled.keyText(authorName) && 'text-center',
          )}>
          <span className="-ml-3.5 select-none text-slate-400 md:-ml-5">
            &ldquo;
          </span>
          <PrismicText field={quote} />
          <span className="select-none text-slate-400">&rdquo;</span>
        </p>
      </blockquote>
      {isFilled.keyText(authorName) ? (
        <figcaption className="text-right">
          &mdash; {authorName}
          {isFilled.keyText(authorRole) ? `, ${authorRole}` : null}
        </figcaption>
      ) : null}
    </figure>
  ) : null;
}
