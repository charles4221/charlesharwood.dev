import { render, screen } from '@testing-library/react';

import { Card } from '../Card';

describe('Card component', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies centered styles when isCentered is true', () => {
    render(<Card isCentered>Centered Content</Card>);
    expect(screen.getByText('Centered Content')).toHaveClass(
      'flex justify-center items-center',
    );
  });

  it('applies link styles when isLink is true', () => {
    render(<Card isLink>Link Content</Card>);
    expect(screen.getByText('Link Content')).toHaveClass(
      'shadow-lg dark:shadow-md dark:shadow-sky-900 hover:shadow-xl hover:dark:shadow-lg hover:dark:shadow-sky-900 hover:bg-slate-300 hover:dark:bg-slate-700 group-hover:bg-slate-300 group-hover:dark:bg-slate-700 group-hover:shadow-xl transition-all',
    );
  });

  it('applies both centered and link styles when both props are true', () => {
    render(
      <Card isCentered isLink>
        Centered Link Content
      </Card>,
    );
    expect(screen.getByText('Centered Link Content')).toHaveClass(
      'flex justify-center items-center',
      'shadow-lg dark:shadow-md dark:shadow-sky-900 hover:shadow-xl hover:dark:shadow-lg hover:dark:shadow-sky-900 hover:bg-slate-300 hover:dark:bg-slate-700 group-hover:bg-slate-300 group-hover:dark:bg-slate-700 group-hover:shadow-xl transition-all',
    );
  });
});
