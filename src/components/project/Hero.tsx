import { ImageField, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import { Container } from '../layout/Container';
import { Heading } from '../typography/Heading';

type HeroProps = {
  title: string;
  tagline?: string;
  image: ImageField;
};

export function Hero(props: HeroProps) {
  return (
    <section className="relative bg-slate-900 text-white">
      {isFilled.image(props.image) ? (
        <PrismicNextImage
          field={props.image}
          alt=""
          fill={true}
          className="pointer-events-none select-none object-cover opacity-60"
          priority
        />
      ) : null}
      <Container yPadding="xl" className="relative text-center">
        <Heading as="h1" size="xl" className="mb-4">
          {props.title}
        </Heading>
        <p className="text-4xl">{props.tagline}</p>
      </Container>
    </section>
  );
}
