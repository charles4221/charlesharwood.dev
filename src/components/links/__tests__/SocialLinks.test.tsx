import { render, screen } from '@testing-library/react';

import { SocialLinks } from '../SocialLinks';

describe('SocialLinks component', () => {
  it('renders all social links', () => {
    render(<SocialLinks />);
    expect(screen.getByTitle('Find me on GitHub')).toBeInTheDocument();
    expect(screen.getByTitle('Find me on LinkedIn')).toBeInTheDocument();
    expect(screen.getByTitle('Find me on Spotify')).toBeInTheDocument();
  });

  it('renders social links with expanded titles when isExpanded is true', () => {
    render(<SocialLinks isExpanded />);
    expect(screen.getByText('Find me on GitHub')).toBeInTheDocument();
    expect(screen.getByText('Find me on LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Find me on Spotify')).toBeInTheDocument();
  });

  it('does not render expanded titles when isExpanded is false', () => {
    render(<SocialLinks />);
    expect(screen.queryByText('Find me on GitHub')).not.toBeInTheDocument();
    expect(screen.queryByText('Find me on LinkedIn')).not.toBeInTheDocument();
    expect(screen.queryByText('Find me on Spotify')).not.toBeInTheDocument();
  });

  it('renders the email button when isExpanded is true', () => {
    render(<SocialLinks isExpanded />);
    expect(screen.getByText('Send me an email')).toBeInTheDocument();
  });

  it('does not render the email button when isExpanded is false', () => {
    render(<SocialLinks />);
    expect(screen.queryByText('Send me an email')).not.toBeInTheDocument();
  });
});
