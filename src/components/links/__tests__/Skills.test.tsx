import { render, screen } from '@testing-library/react';

import { SKILLS, Skills } from '../Skills';

describe('Skills component', () => {
  it('renders the heading', () => {
    render(<Skills />);
    const heading = screen.getByRole('heading', { name: /skills/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all skill items', () => {
    render(<Skills />);
    const skillItems = screen.getAllByRole('listitem');
    expect(skillItems).toHaveLength(SKILLS.length);
  });

  it('renders skill item links correctly', () => {
    render(<Skills />);
    const skillLinks = screen.getAllByRole('link');
    for (const [index, link] of skillLinks.entries()) {
      expect(link).toHaveAttribute('href', SKILLS[index].href);
      expect(link).toHaveTextContent(SKILLS[index].name);
    }
  });
});
