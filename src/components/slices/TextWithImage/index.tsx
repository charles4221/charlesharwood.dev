import { isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import { Container } from '@/components/layout/Container';
import { PrismicRichText } from '@/components/PrismicRichText';

import type { TextWithImageSlice } from '../../../../prismicio-types';

type TextWithImageProps = {
  slice: TextWithImageSlice;
};

const TextWithImage = ({ slice }: TextWithImageProps) => {
  const image = slice.primary.image;

  return (
    <Container
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <PrismicRichText field={slice.primary.text} />
        </div>
        <div>
          {isFilled.image(image) ? (
            <div className="bg-gray-100 dark:bg-slate-700">
              <PrismicNextImage
                field={image}
                sizes="100vw"
                className="w-full"
                fallbackAlt=""
              />
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default TextWithImage;
