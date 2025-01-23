import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Hero from './index';
import { HeroSlice } from '../../../../prismicio-types';

const mockSlice: HeroSlice = {
  slice_type: 'hero',
  slice_label: null,
  id: 'hero-test-id',
  variation: 'default',
  version: 'skj1el3j4l3j4',
  items: [],
  primary: {
    backgroundImage: {
      id: 'test-id',
      url: 'https://via.placeholder.com/150',
      alt: 'Background Image',
      dimensions: {
        width: 150,
        height: 150,
      },
      edit: {
        x: 0,
        y: 0,
        zoom: 1,
        background: 'rgba(0, 0, 0, 0)',
      },
      copyright: '',
    },
    text: [
      {
        type: 'heading1',
        text: 'Welcome to the Hero Section',
        spans: [],
      },
    ],
    buttonLink: {
      link_type: 'Web',
      url: 'https://example.com',
    },
    buttonText: 'Click Here',
  },
};

describe('Hero component', () => {
  it('renders without crashing', () => {
    render(<Hero slice={mockSlice} />);
    expect(screen.getByText('Welcome to the Hero Section')).toBeInTheDocument();
  });

  it('renders background image if provided', () => {
    render(<Hero slice={mockSlice} />);
    const backgroundImage = screen.getByAltText('');
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveClass('object-cover opacity-40');
  });

  it('renders button with correct text and link', () => {
    render(<Hero slice={mockSlice} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://example.com');
    expect(button).toHaveTextContent('Click Here');
  });

  it('renders button with fallback text if link is provided but no button text is provided', () => {
    const sliceWithoutButtonText: HeroSlice = {
      ...mockSlice,
      primary: {
        ...mockSlice.primary,
        buttonText: null,
      },
    };
    render(<Hero slice={sliceWithoutButtonText} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://example.com');
    expect(button).toHaveTextContent('Learn More');
  });

  it('does not render background image if not provided', () => {
    const sliceWithoutImage: HeroSlice = {
      ...mockSlice,
      primary: {
        ...mockSlice.primary,
        backgroundImage: {
          id: null,
          url: null,
          alt: null,
          dimensions: null,
          edit: null,
        },
      },
    };
    render(<Hero slice={sliceWithoutImage} />);
    const backgroundImage = screen.queryByAltText('');
    expect(backgroundImage).not.toBeInTheDocument();
  });

  it('does not render button if link is not provided', () => {
    const sliceWithoutButtonLink: HeroSlice = {
      ...mockSlice,
      primary: {
        ...mockSlice.primary,
        buttonLink: {
          link_type: 'Any',
        },
      },
    };
    render(<Hero slice={sliceWithoutButtonLink} />);
    const button = screen.queryByRole('button', { name: /click here/i });
    expect(button).not.toBeInTheDocument();
  });
});
