/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
import { FilledImageFieldImage } from '@prismicio/client';
import { render, screen } from '@testing-library/react';

import Image from './index';
import { ImageSlice, Simplify } from '../../../../prismicio-types';

jest.mock('@prismicio/next', () => ({
  PrismicNextImage: jest.fn(
    ({
      field,
    }: {
      field: Simplify<
        FilledImageFieldImage & Record<never, FilledImageFieldImage>
      >;
    }) => <img alt={field.alt || ''} src={field.url} />,
  ),
}));

jest.mock('@/components/layout/Container', () => ({
  Container: jest.fn(({ children, className }) => (
    <div data-testid="container-test-id" className={className}>
      {children}
    </div>
  )),
}));

const mockSlice: ImageSlice = {
  primary: {
    image: {
      dimensions: {
        width: 1920,
        height: 1080,
      },
      alt: 'Mock image',
      url: 'https://example.com/image.jpg',
      id: 'abc123',
      edit: {
        x: 0,
        y: 0,
        background: 'transparent',
        zoom: 1,
      },
      copyright: '',
    },
  },
  slice_type: 'image',
  slice_label: null,
  id: 'abc123',
  variation: 'default',
  version: 'abc123',
  items: [],
};

describe('Image component', () => {
  it('renders PrismicNextImage when image is filled', () => {
    render(<Image slice={mockSlice} index={0} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Mock image');
  });

  it('does not render PrismicNextImage when image is not filled', () => {
    const mockSliceWithoutImage: ImageSlice = {
      ...mockSlice,
      primary: {
        image: {},
      },
    };
    render(<Image slice={mockSliceWithoutImage} index={0} />);
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  it('applies correct class when index is 0', () => {
    render(<Image slice={mockSlice} index={0} />);
    const container = screen.getByTestId('container-test-id');
    expect(container).toHaveClass('pt-0 md:pt-0');
  });

  it('does not apply class when index is not 0', () => {
    render(<Image slice={mockSlice} index={1} />);
    const container = screen.getByTestId('container-test-id');
    expect(container).not.toHaveClass('pt-0 md:pt-0');
  });
});
