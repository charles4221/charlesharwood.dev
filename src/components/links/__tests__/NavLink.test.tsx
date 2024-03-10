import {
  FilledContentRelationshipField,
  TitleField,
  asText,
} from '@prismicio/client';
import { render, screen } from '@testing-library/react';

import { NavLink } from '../NavLink';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/path'),
}));

const label: TitleField = [{ type: 'heading3', text: 'Contact', spans: [] }];
const link: FilledContentRelationshipField = {
  id: 'some-id',
  type: 'page',
  tags: [],
  lang: 'en-au',
  slug: '-',
  uid: 'contact',
  url: '/contact',
  link_type: 'Document',
  isBroken: false,
};

const activeLink: FilledContentRelationshipField = {
  id: 'some-other-id',
  type: 'page',
  tags: [],
  lang: 'en-au',
  slug: '-',
  uid: 'path',
  url: '/path',
  link_type: 'Document',
  isBroken: false,
};

describe('NavLink', () => {
  it('renders the label and link correctly', () => {
    render(<NavLink label={label} link={link} />);

    expect(screen.getByText(asText(label))).toBeInTheDocument();
    expect(screen.getByText(asText(label)).getAttribute('href')).toBe(link.url);
    expect(screen.getByRole('listitem')).not.toHaveClass('text-teal-400');
  });

  it('renders the active class when the link is active', () => {
    render(<NavLink label={label} link={activeLink} />);
    expect(screen.getByRole('listitem')).toHaveClass('text-teal-400');
  });
});
