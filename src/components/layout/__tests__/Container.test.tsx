import { render, screen } from '@testing-library/react';

import { Container } from '../Container';

describe('Container', () => {
  it('renders with default props', () => {
    render(<Container>Content</Container>);
    const container = screen.getByTestId('container-test-id');
    expect(container).toHaveClass('px-10 py-20 md:py-28');
    expect(container).toHaveAttribute('data-collapsible', 'true');
  });

  it('renders with custom yPadding', () => {
    render(<Container yPadding="sm">Content</Container>);
    const container = screen.getByTestId('container-test-id');
    expect(container).toHaveClass('px-10 py-8 md:py-10');
  });

  it('renders with custom className', () => {
    render(<Container className="custom-class">Content</Container>);
    const container = screen.getByTestId('container-test-id');
    expect(container).toHaveClass('px-10 py-20 md:py-28 custom-class');
  });

  it('renders with collapsible set to false', () => {
    render(<Container collapsible={false}>Content</Container>);
    const container = screen.getByTestId('container-test-id');
    expect(container).toHaveAttribute('data-collapsible', 'false');
  });

  it('renders with a different component', () => {
    render(<Container as="section">Content</Container>);
    const container = screen.getByTestId('container-test-id');
    expect(container.tagName).toBe('SECTION');
  });

  it('renders children correctly', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
