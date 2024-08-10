import { Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/links/Button';
import { Heading } from '@/components/typography/Heading';

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <section
      className="relative bg-slate-900 text-white"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Container yPadding="xl" className="relative">
        <div className="grid justify-items-center gap-8">
          <div className="max-w-2xl text-center">
            <Heading as="h2" size="lg">
              {slice.primary.heading}
            </Heading>
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

export default CallToAction;
