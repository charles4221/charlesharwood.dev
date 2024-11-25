'use client';

import { isFilled } from '@prismicio/client';

import { Container } from '@/components/layout/Container';
import { Quote } from '@/components/typography/Quote';

import type {
  TestimonialsSlice,
  TestimonialsSliceDefaultPrimaryTestimonialsItem,
} from '../../../../prismicio-types';

const keyExtractor = (
  item: TestimonialsSliceDefaultPrimaryTestimonialsItem,
  index: number,
) => (isFilled.keyText(item.source) ? item.source : index);

const renderTestimonialItem = (
  item: TestimonialsSliceDefaultPrimaryTestimonialsItem,
  index: number,
) => {
  return (
    <Quote
      key={keyExtractor(item, index)}
      quote={item.quote}
      source={item.source}
    />
  );
};

type TestimonialsProps = {
  slice: TestimonialsSlice;
};

const Testimonials = ({ slice }: TestimonialsProps) => {
  if (slice.primary.testimonials.length === 0) {
    return null;
  }

  return (
    <Container
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      yPadding="xs">
      {slice.primary.testimonials.map(renderTestimonialItem)}
    </Container>
  );
};

export default Testimonials;
