import { isFilled } from '@prismicio/client';
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';

import { Card } from '@/components/layout/Card';
import { ConditionalWrap } from '@/components/layout/ConditionalWrap';
import { Container } from '@/components/layout/Container';
import { PrismicRichText } from '@/components/rich-text/PrismicRichText';
import { Heading } from '@/components/typography/Heading';

import type {
  ImageCardsSlice,
  ImageCardsSliceDefaultItem,
  Simplify,
} from '../../../../prismicio-types';

type ImageCardProps = Simplify<ImageCardsSliceDefaultItem>;

const ImageCard = ({ buttonLink, buttonText, image, text }: ImageCardProps) => {
  return (
    <li className="grid gap-8 h-full">
      <Card>
        {isFilled.image(image) ? (
          <ConditionalWrap
            condition={isFilled.link(buttonLink)}
            wrap={({ children }) => (
              <PrismicNextLink field={buttonLink} tabIndex={-1}>
                {children}
              </PrismicNextLink>
            )}>
            <div className="bg-gray-100 h-40 mb-5 p-8 rounded-lg flex items-center justify-center">
              <PrismicNextImage
                field={image}
                sizes="100vw"
                className="w-auto max-w-full max-h-full"
                fallbackAlt=""
              />
            </div>
          </ConditionalWrap>
        ) : null}
        <div className="leading-relaxed text-lg">
          <PrismicRichText field={text} />
        </div>
        {isFilled.link(buttonLink) ? (
          <div className="mt-2">
            <PrismicNextLink field={buttonLink} className="link font-semibold">
              {buttonText || 'More Info'}
            </PrismicNextLink>
          </div>
        ) : null}
      </Card>
    </li>
  );
};

function renderImageCardItem(item: Simplify<ImageCardsSliceDefaultItem>) {
  return <ImageCard key={item.image.url} {...item} />;
}

type ImageCardsProps = {
  slice: ImageCardsSlice;
};

const ImageCards = ({ slice }: ImageCardsProps) => {
  return (
    <Container
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <div className="grid gap-12 text-center">
        {isFilled.richText(slice.primary.heading) ? (
          <Heading as="h2">
            <PrismicText field={slice.primary.heading} />
          </Heading>
        ) : null}
        <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {slice.items.map(renderImageCardItem)}
        </ul>
      </div>
    </Container>
  );
};

export default ImageCards;
