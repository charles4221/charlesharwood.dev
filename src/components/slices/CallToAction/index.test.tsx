import { Content, LinkField } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { render, screen } from '@testing-library/react';

import CallToAction from './index';

const mockSlice: SliceComponentProps<Content.CallToActionSlice> = {
  slice: {
    id: 'test-id',
    slice_label: null,
    slice_type: 'call_to_action',
    variation: 'default',
    primary: {
      heading: 'Test Heading',
      subheading: 'Test Subheading',
      buttonText: 'Click Here',
      buttonLink: {
        link_type: 'Web',
        url: 'https://example.com',
      },
    },
    items: [],
    version: 'version',
  },
  slices: [],
  index: 0,
  context: undefined,
};

describe('CallToAction', () => {
  it('renders the heading', () => {
    render(<CallToAction {...mockSlice} />);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders the button with correct text', () => {
    render(<CallToAction {...mockSlice} />);
    expect(screen.getByText('Click Here')).toBeInTheDocument();
  });

  it('does not render the button if buttonLink is not filled', () => {
    const modifiedSlice: SliceComponentProps<Content.CallToActionSlice> = {
      ...mockSlice,
      slice: {
        ...mockSlice.slice,
        primary: {
          ...mockSlice.slice.primary,
          buttonLink: {} as LinkField,
        },
      },
    };
    render(<CallToAction {...modifiedSlice} />);
    expect(screen.queryByText('Click Here')).not.toBeInTheDocument();
  });

  it('renders default button text if buttonText is not provided', () => {
    const modifiedSlice = {
      ...mockSlice,
      slice: {
        ...mockSlice.slice,
        primary: {
          ...mockSlice.slice.primary,
          buttonText: '',
        },
      },
    };
    render(<CallToAction {...modifiedSlice} />);
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });
});
