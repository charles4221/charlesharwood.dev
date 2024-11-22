import { asText, isFilled, RichTextField } from '@prismicio/client';
import { render, screen } from '@testing-library/react';

import { Quote } from '../Quote';

jest.mock('@prismicio/client', () => ({
  ...jest.requireActual('@prismicio/client'),
  isFilled: {
    richText: jest.fn(),
    keyText: jest.fn(),
  },
}));

jest.mock('@prismicio/react', () => ({
  PrismicText: ({ field }: { field: RichTextField }) => (
    <span>{asText(field)}</span>
  ),
}));

describe('Quote component', () => {
  const quote = [
    { type: 'paragraph', text: 'This is a quote', spans: [] },
  ] as RichTextField;
  const source = 'Author Name';

  it('renders correctly when quote and source are provided', () => {
    (isFilled.richText as unknown as jest.Mock).mockReturnValue(true);
    (isFilled.keyText as unknown as jest.Mock).mockReturnValue(true);

    render(<Quote quote={quote} source={source} />);

    expect(screen.getByText('This is a quote')).toBeInTheDocument();
    expect(screen.getByText('— Author Name')).toBeInTheDocument();
  });

  it('renders correctly when only quote is provided', () => {
    (isFilled.richText as unknown as jest.Mock).mockReturnValue(true);
    (isFilled.keyText as unknown as jest.Mock).mockReturnValue(false);

    render(<Quote quote={quote} source="" />);

    expect(screen.getByText('This is a quote')).toBeInTheDocument();
    expect(screen.getByText('“')).toBeInTheDocument();
    expect(screen.getByText('”')).toBeInTheDocument();
  });

  it('renders nothing when quote is not provided', () => {
    (isFilled.richText as unknown as jest.Mock).mockReturnValue(false);

    render(<Quote quote={[]} source={source} />);

    expect(screen.queryByRole('figure')).toBeNull();
  });

  it('renders correctly when quote is provided but source is null', () => {
    (isFilled.richText as unknown as jest.Mock).mockReturnValue(true);
    (isFilled.keyText as unknown as jest.Mock).mockReturnValue(false);

    render(<Quote quote={quote} source={null} />);

    expect(screen.getByText('This is a quote')).toBeInTheDocument();
    expect(screen.getByText('“')).toBeInTheDocument();
    expect(screen.getByText('”')).toBeInTheDocument();
  });
});
