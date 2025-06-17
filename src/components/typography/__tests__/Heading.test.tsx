import { render, screen } from '@testing-library/react';

import { Heading } from '../Heading';

describe('Heading component', () => {
  it('renders with default props', () => {
    render(<Heading>Test Heading</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(
      'heading heading--display text-4xl md:text-6xl',
    );
  });

  it('renders with custom size', () => {
    render(<Heading size="xl">Test Heading</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('text-6xl md:text-8xl');
  });

  it('renders with custom className', () => {
    render(<Heading className="custom-class">Test Heading</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('custom-class');
  });

  it('renders with hover shadow-sm transition', () => {
    render(<Heading hasHoverShadowTransition>Test Heading</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(
      'heading--shadow-transition',
    );
  });

  it('renders with isDisplay set to false', () => {
    render(<Heading isDisplay={false}>Test Heading</Heading>);
    expect(screen.getByRole('heading')).not.toHaveClass('heading--display');
  });

  it('renders with a different HTML element', () => {
    render(<Heading as="h2">Test Heading</Heading>);
    expect(screen.getByRole('heading').tagName).toBe('H2');
  });
});
