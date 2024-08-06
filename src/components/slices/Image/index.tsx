import { isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import { Container } from '@/components/layout/Container';

import type { ImageSlice } from '../../../../prismicio-types';

type ImageProps = {
  slice: ImageSlice;
  index: number;
};

const Image = ({ slice, index }: ImageProps) => {
  const image = slice.primary.image;

  return (
    <Container
      as="section"
      className={index === 0 ? 'pt-0 md:pt-0' : undefined}>
      {isFilled.image(image) ? (
        <div className="bg-gray-100">
          <PrismicNextImage
            field={image}
            sizes="100vw"
            className="w-full"
            fallbackAlt=""
          />
        </div>
      ) : null}
    </Container>
  );
};

export default Image;
