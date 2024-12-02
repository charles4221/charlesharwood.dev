import React from 'react';

import { render, screen } from '@testing-library/react';

import { DarkModeIcon } from '../DarkModeIcon';

describe('DarkModeIcon', () => {
  it('renders without crashing', () => {
    render(<DarkModeIcon />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('has the correct icon', () => {
    render(<DarkModeIcon />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('fa-eclipse');
  });

  it('has the correct size', () => {
    render(<DarkModeIcon />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('fa-lg');
  });

  it('has the correct class names', () => {
    render(<DarkModeIcon />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('text-slate-950');
    expect(icon).toHaveClass('dark:text-white');
  });
});
