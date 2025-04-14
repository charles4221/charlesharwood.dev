import { isFilled } from '@prismicio/client';
import { PrismicText } from '@prismicio/react';
import clsx from 'clsx';

import type { TestimonialsSliceDefaultPrimaryTestimonialsItem } from '../../../prismicio-types';

type QuoteProps = TestimonialsSliceDefaultPrimaryTestimonialsItem;

export function Quote({ quote, source }: QuoteProps) {
  return isFilled.richText(quote) ? (
    <figure className="grid gap-6 mb-16">
      <blockquote>
        <p
          className={clsx(
            'text-xl font-medium leading-tight md:text-2xl md:leading-tight',
            !isFilled.keyText(source) && 'text-center',
          )}>
          <span className="select-none text-slate-400">&ldquo;</span>
          <PrismicText field={quote} />
          <span className="select-none text-slate-400">&rdquo;</span>
        </p>
      </blockquote>
      {isFilled.keyText(source) ? (
        <figcaption className="text-right">&mdash; {source}</figcaption>
      ) : null}
    </figure>
  ) : null;
}
