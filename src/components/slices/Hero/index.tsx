import { ComponentProps } from 'react';

import { isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/links/Button';
import { PrismicRichText } from '@/components/rich-text/PrismicRichText';
import { Heading } from '@/components/typography/Heading';

import type { HeroSlice } from '../../../../prismicio-types';

const components: ComponentProps<typeof PrismicRichText>['components'] = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" className="mb-4 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),
};

type HeroProps = {
  slice: HeroSlice;
};

const Hero = ({ slice }: HeroProps) => {
  const backgroundImage = slice.primary.backgroundImage;

  return (
    <section
      className="relative bg-slate-900 text-white"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      {isFilled.image(backgroundImage) ? (
        <PrismicNextImage
          field={backgroundImage}
          alt=""
          fill={true}
          className="pointer-events-none select-none object-cover opacity-40"
          priority
        />
      ) : null}
      <Container yPadding="xl" className="relative">
        <div className="grid justify-items-center gap-8">
          <div className="max-w-6xl text-center">
            <PrismicRichText
              field={slice.primary.text}
              components={components}
            />
          </div>
          {isFilled.link(slice.primary.buttonLink) ? (
            <Button role="button" field={slice.primary.buttonLink} isCTA>
              {slice.primary.buttonText || 'Learn More'}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
