import clsx from 'clsx';

import { Container } from '@/components/layout/Container';
import { PrismicRichText } from '@/components/rich-text/PrismicRichText';

import type { TextSlice } from '../../../../prismicio-types';

// Tailwind can't generate these classes if we just use `text-${alignment}` so we need to map them manually.
const ALIGNMENT_CLASSES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

type TextProps = {
  slice: TextSlice;
};

const Text = ({ slice }: TextProps) => {
  return (
    <Container
      as="section"
      className="leading-relaxed"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <div
        className={clsx(
          ALIGNMENT_CLASSES[slice.primary.alignment],
          slice.variation === 'twoColumns' && 'md:columns-2 md:gap-6',
        )}>
        <PrismicRichText field={slice.primary.text} />
      </div>
    </Container>
  );
};

export default Text;
