import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders the footer text', () => {
    render(<Footer />);
    expect(screen.getByText(/handcrafted with/i)).toBeInTheDocument();
    expect(screen.getByText(/gold coast, australia/i)).toBeInTheDocument();
    expect(
      screen.getByText(/charles harwood. all rights reserved./i),
    ).toBeInTheDocument();
  });

  it('renders the heart icon', () => {
    render(<Footer />);

    const icons = screen.getAllByRole('img', { hidden: true });

    const heartIcon = icons.find((icon) => icon.dataset.icon === 'heart');

    expect(heartIcon).toHaveClass('text-red-600');
  });

  it('renders the social links', () => {
    render(<Footer />);
    expect(
      screen.getByRole('link', { name: /view this website’s source code!/i }),
    ).toBeInTheDocument();
  });

  it('renders the correct year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(
          `© ${currentYear} Charles Harwood. All rights reserved.`,
          'i',
        ),
      ),
    ).toBeInTheDocument();
  });
});
