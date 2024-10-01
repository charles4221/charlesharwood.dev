'use client';

import { isFilled } from '@prismicio/client';

import { Container } from '@/components/layout/Container';
import { Slider, SliderProps } from '@/components/layout/Slider';
import { Quote } from '@/components/typography/Quote';

import type {
  TestimonialsSlice,
  TestimonialsSliceDefaultPrimaryTestimonialsItem,
} from '../../../../prismicio-types';

const keyExtractor: SliderProps<TestimonialsSliceDefaultPrimaryTestimonialsItem>['keyExtractor'] =
  (item, index) => (isFilled.keyText(item.source) ? item.source : index);
const renderTestimonialItem: SliderProps<TestimonialsSliceDefaultPrimaryTestimonialsItem>['renderItem'] =
  (item) => {
    return <Quote quote={item.quote} source={item.source} />;
  };

type TestimonialsProps = {
  slice: TestimonialsSlice;
};

const Testimonials = ({ slice }: TestimonialsProps) => {
  return (
    <Container
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Slider
        data={slice.primary.testimonials}
        renderItem={renderTestimonialItem}
        keyExtractor={keyExtractor}
        slidesPerView={1}
        loop
      />
    </Container>
  );
};

export default Testimonials;
