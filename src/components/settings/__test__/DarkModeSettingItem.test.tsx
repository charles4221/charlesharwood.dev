import React from 'react';

import { faComputer, faMoon } from '@fortawesome/pro-light-svg-icons';
import { render, fireEvent, screen } from '@testing-library/react';

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { UmamiPlugin } from '@/plugins/umami';
import { StoreActions, useBoundStore } from '@/store/bound';

import { DarkModeSettingItem } from '../DarkModeSettingItem';

jest.mock('@/hooks/usePrefersDarkMode');
jest.mock('@/store/bound');
jest.mock('@/plugins/umami');

const mockUsePrefersDarkMode = usePrefersDarkMode as jest.Mock;
const mockUseBoundStore = useBoundStore as unknown as jest.Mock;
const mockUmamiPlugin = UmamiPlugin as jest.Mock;

describe('DarkModeSettingItem', () => {
  beforeEach(() => {
    mockUsePrefersDarkMode.mockReturnValue(false);
    mockUseBoundStore.mockReturnValue(false);
    mockUmamiPlugin.mockReturnValue({
      track: jest.fn(),
    });
  });

  it('renders correctly', () => {
    render(
      <DarkModeSettingItem
        label="Dark Mode"
        value="dark"
        icon={faMoon}
        ariaTitle="Activate Dark Mode"
      />,
    );

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('calls setTheme and tracks event on button click', () => {
    render(
      <DarkModeSettingItem
        label="Dark Mode"
        value="dark"
        icon={faMoon}
        ariaTitle="Activate Dark Mode"
      />,
    );

    const button = screen.getByTitle('Activate Dark Mode');
    fireEvent.click(button);

    expect(StoreActions.setTheme).toHaveBeenCalledWith('dark');
    expect(mockUmamiPlugin().track).toHaveBeenCalledWith('Changed Theme', {
      theme: 'dark',
      systemPrefersDarkMode: false,
    });
  });

  it('displays system preference when value is "system"', () => {
    mockUsePrefersDarkMode.mockReturnValue(true);

    render(
      <DarkModeSettingItem
        label="System Theme"
        value="system"
        icon={faComputer}
        ariaTitle="Activate System Theme"
      />,
    );

    expect(screen.getByText('System Theme (dark)')).toBeInTheDocument();
  });

  it('applies correct variant based on isActive state', () => {
    mockUseBoundStore.mockReturnValue(true);

    render(
      <DarkModeSettingItem
        label="Dark Mode"
        value="dark"
        icon={faMoon}
        ariaTitle="Activate Dark Mode"
      />,
    );

    const button = screen.getByTitle('Activate Dark Mode');
    expect(button).toHaveClass('bg-teal-400');
  });
});
