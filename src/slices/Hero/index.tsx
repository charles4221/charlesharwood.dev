import { isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import type { PrismicRichTextProps } from '@prismicio/react';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/links/Button';
import { PrismicRichText } from '@/components/PrismicRichText';
import { Heading } from '@/components/typography/Heading';

import type { HeroSlice } from '../../../prismicio-types';

const components: PrismicRichTextProps['components'] = {
  heading1: ({ children }) => (
    <Heading as="h2" size="xl" className="mb-4 mt-12 first:mt-0 last:mb-0">
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
    <section className="relative bg-slate-900 text-white">
      {isFilled.image(backgroundImage) ? (
        <PrismicNextImage
          field={backgroundImage}
          alt=""
          fill={true}
          className="pointer-events-none select-none object-cover opacity-40"
          priority
        />
      ) : null}
      <Container yPadding="lg" className="relative">
        <div className="grid justify-items-center gap-8">
          <div className="max-w-2xl text-center">
            <PrismicRichText
              field={slice.primary.text}
              components={components}
            />
          </div>
          {isFilled.link(slice.primary.buttonLink) ? (
            <Button field={slice.primary.buttonLink} isCTA>
              {slice.primary.buttonText || 'Learn More'}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
