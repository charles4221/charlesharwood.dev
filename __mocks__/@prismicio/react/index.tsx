import { Fragment } from 'react';
import { asText, isFilled, type RichTextField } from '@prismicio/client';

export const PrismicText = ({ field }: { field: RichTextField }) => {
  if (!isFilled.richText(field)) return null;

  return <Fragment>{asText(field)}</Fragment>;
};

export const PrismicRichText = PrismicText;
