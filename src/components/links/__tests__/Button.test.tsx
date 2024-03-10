import { render, screen } from '@testing-library/react';

import { Button } from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Hello');
    expect(buttonElement).toHaveClass(
      'bg-sky-300',
      'text-slate-900',
      'px-5',
      'py-3',
    );
    expect(buttonElement).not.toHaveClass(
      'button--cta',
      'px-2',
      'py-1',
      'rounded',
    );
  });

  it('renders with theme variant', () => {
    render(<Button variant="teal">Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-teal-600', 'text-white');
    expect(buttonElement).not.toHaveClass('bg-sky-300', 'text-slate-900');
  });

  it('renders as CTA button', () => {
    render(<Button isCTA>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('button--cta');
  });

  it('renders as compact button', () => {
    render(<Button isCompact>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('px-2', 'py-1');
  });

  it('renders as rounded button', () => {
    render(<Button isRounded>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('rounded');
  });

  it('renders with custom class', () => {
    render(<Button className="custom-class">Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('renders as disabled', () => {
    render(<Button disabled>Hello</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('renders as anchor link when href provided', () => {
    render(<Button href="/about">Hello</Button>);
    const buttonElement = screen.queryByRole('button');
    const anchorElement = screen.getByRole('link');
    expect(buttonElement).not.toBeInTheDocument();
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveTextContent('Hello');
    expect(anchorElement).toHaveAttribute('href', '/about');
  });

  it('renders as Prismic link when field provided', () => {
    const field = {
      link_type: 'Web',
      url: 'https://example.com',
    };
    render(<Button field={field}>Hello</Button>);
    const buttonElement = screen.queryByRole('button');
    const prismicLinkElement = screen.getByRole('link');
    expect(buttonElement).not.toBeInTheDocument();
    expect(prismicLinkElement).toBeInTheDocument();
    expect(prismicLinkElement).toHaveTextContent('Hello');
    expect(prismicLinkElement).toHaveAttribute('href', 'https://example.com');
  });
});
