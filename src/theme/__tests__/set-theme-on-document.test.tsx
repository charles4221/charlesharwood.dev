import { render } from '@testing-library/react';

import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode';
import { useBoundStore } from '@/store/bound';

import {
  setThemeOnDocument,
  SetThemeOnDocument,
} from '../set-theme-on-document';

jest.mock('@/hooks/usePrefersDarkMode');
jest.mock('@/store/bound');

describe('setThemeOnDocument', () => {
  it('should add dark class when newTheme is dark', () => {
    document.documentElement.classList.remove('dark');
    setThemeOnDocument('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should remove dark class when newTheme is light', () => {
    document.documentElement.classList.add('dark');
    setThemeOnDocument('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('SetThemeOnDocument', () => {
  const mockUsePrefersDarkMode = usePrefersDarkMode as jest.Mock;
  const mockUseBoundStore = useBoundStore as unknown as jest.Mock;

  beforeEach(() => {
    mockUsePrefersDarkMode.mockReturnValue(false);
    mockUseBoundStore.mockReturnValue({ getTheme: jest.fn() });
  });

  it('should set dark theme when theme is dark', () => {
    mockUseBoundStore.mockReturnValue('dark');
    render(<SetThemeOnDocument />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should set light theme when theme is light', () => {
    mockUseBoundStore.mockReturnValue('light');
    render(<SetThemeOnDocument />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should set dark theme when theme is system and system prefers dark mode', () => {
    mockUseBoundStore.mockReturnValue('system');
    mockUsePrefersDarkMode.mockReturnValue(true);
    render(<SetThemeOnDocument />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should set light theme when theme is system and system does not prefer dark mode', () => {
    mockUseBoundStore.mockReturnValue('system');
    mockUsePrefersDarkMode.mockReturnValue(false);
    render(<SetThemeOnDocument />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
