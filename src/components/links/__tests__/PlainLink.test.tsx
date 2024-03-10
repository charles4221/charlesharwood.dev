import { render, screen } from '@testing-library/react';

import { PlainLink } from '../PlainLink';

describe('PlainLink', () => {
  it('renders the link with the correct text and href', () => {
    const href = '/example';
    render(<PlainLink href={href}>Link Text</PlainLink>);
    const linkElement = screen.getByText('Link Text');
    expect(linkElement).toHaveAttribute('href', href);
  });

  it('passes additional props through to the link element', () => {
    render(
      <PlainLink href="/example" data-something="something">
        Link Text
      </PlainLink>,
    );
    const linkElement = screen.getByText('Link Text');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveProperty('dataset.something', 'something');
  });
});
