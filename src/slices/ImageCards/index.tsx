import { isFilled } from '@prismicio/client';
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';

import { ConditionalWrap } from '@/components/ConditionalWrap';
import { Heading } from '@/components/Heading';
import { Container } from '@/components/layout/Container';
import { PrismicRichText } from '@/components/PrismicRichText';

import type {
  ImageCardsSlice,
  ImageCardsSliceDefaultItem,
  Simplify,
} from '../../../prismicio-types';

type ImageCardProps = {
  item: Simplify<ImageCardsSliceDefaultItem>;
};

const ImageCard = ({ item }: ImageCardProps) => {
  const image = item.image;

  return (
    <li className="grid gap-8">
      {isFilled.image(image) ? (
        <div className="bg-gray-100">
          <ConditionalWrap
            condition={isFilled.link(item.buttonLink)}
            wrap={({ children }) => (
              <PrismicNextLink field={item.buttonLink} tabIndex={-1}>
                {children}
              </PrismicNextLink>
            )}>
            <PrismicNextImage
              field={image}
              sizes="100vw"
              className="w-full"
              fallbackAlt=""
            />
          </ConditionalWrap>
        </div>
      ) : null}
      <div className="leading-relaxed">
        <PrismicRichText field={item.text} />
      </div>
      {isFilled.link(item.buttonLink) ? (
        <div>
          <PrismicNextLink field={item.buttonLink} className="font-semibold">
            {item.buttonText || 'More Info'}
          </PrismicNextLink>
        </div>
      ) : null}
    </li>
  );
};

type ImageCardsProps = {
  slice: ImageCardsSlice;
};

const ImageCards = ({ slice }: ImageCardsProps) => {
  return (
    <Container as="section">
      <div className="grid gap-12">
        {isFilled.richText(slice.primary.heading) ? (
          <Heading className="text-center">
            <PrismicText field={slice.primary.heading} />
          </Heading>
        ) : null}
        <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {slice.items.map((item) => (
            <ImageCard key={item.image.url} item={item} />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ImageCards;
