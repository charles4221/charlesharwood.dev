import { PropsWithChildren } from 'react';

import { render, screen } from '@testing-library/react';

import { createClient } from '@/prismic-config';

import { Header } from '../Header';

jest.mock('@/prismic-config', () => ({
  createClient: jest.fn(),
}));

jest.mock('@prismicio/next', () => ({
  PrismicNextLink: ({ children }: PropsWithChildren) => (
    <a href="https://example.com">{children}</a>
  ),
}));

jest.mock('../../links/SocialLinks', () => ({
  SocialLinks: () => <div>Social Links</div>,
}));

jest.mock('../../settings/DarkModeSetting', () => ({
  DarkModeSetting: () => <div>Dark Mode Setting</div>,
}));

describe('Header', () => {
  it('renders the header with navigation links', async () => {
    const mockNavigation = {
      data: {
        links: [
          { label: [{ text: 'Home' }], url: '/' },
          { label: [{ text: 'About' }], url: '/about' },
        ],
      },
    };

    (createClient as jest.Mock).mockReturnValue({
      getSingle: jest.fn().mockResolvedValue(mockNavigation),
    });

    render(await Header());

    expect(screen.getByText('Charles Harwood')).toBeInTheDocument();
    expect(
      screen.getByText('Australian-made mobile apps and websites'),
    ).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Social Links')).toBeInTheDocument();
    expect(screen.getByText('Dark Mode Setting')).toBeInTheDocument();
  });
});
