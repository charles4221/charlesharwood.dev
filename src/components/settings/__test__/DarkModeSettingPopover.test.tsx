import { render, screen } from '@testing-library/react';

import { DarkModeSettingPopover } from '../DarkModeSettingPopover';

jest.mock('@/hooks/usePrefersDarkMode');

describe('DarkModeSettingPopover', () => {
  it('renders the heading', () => {
    render(<DarkModeSettingPopover />);
    expect(
      screen.getByRole('heading', { name: /Theme Settings/i }),
    ).toBeInTheDocument();
  });

  it('renders all theme options', () => {
    render(<DarkModeSettingPopover />);
    expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    expect(screen.getByText('Light Theme')).toBeInTheDocument();
    expect(screen.getByText(/Use System Setting/i)).toBeInTheDocument();
  });

  it('renders the correct icons for each theme option', () => {
    render(<DarkModeSettingPopover />);
    expect(
      screen.getByTitle('Change colour theme to dark mode'),
    ).toBeInTheDocument();
    expect(
      screen.getByTitle('Change colour theme to light mode'),
    ).toBeInTheDocument();
    expect(
      screen.getByTitle('Use your system preference for dark mode'),
    ).toBeInTheDocument();
  });
});
