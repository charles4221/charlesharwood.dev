import clsx from 'clsx';

import { Container } from '@/components/layout/Container';
import { PrismicRichText } from '@/components/PrismicRichText';

import type { TextSlice } from '../../../prismicio-types';

type TextProps = {
  slice: TextSlice;
};

const Text = ({ slice }: TextProps) => {
  return (
    <Container as="section" className="leading-relaxed">
      <div
        className={clsx(
          slice.variation === 'twoColumns' && 'md:columns-2 md:gap-6',
        )}>
        <PrismicRichText field={slice.primary.text} />
      </div>
    </Container>
  );
};

export default Text;
