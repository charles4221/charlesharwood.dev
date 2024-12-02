import { render, fireEvent, screen } from '@testing-library/react';

import { IUmamiPlugin, UmamiPlugin } from '@/plugins/umami';

import { DarkModeSetting } from '../DarkModeSetting';

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn().mockReturnValue({ contextSafe: jest.fn((fn) => fn) }),
}));

jest.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: jest.fn().mockReturnValue(true),
}));

jest.mock('@/plugins/umami', () => ({
  UmamiPlugin: jest.fn().mockReturnValue({
    track: jest.fn(),
  }),
}));

jest.mock('../DarkModeSettingPopover', () => ({
  DarkModeSettingPopover: () => <div>DarkModeSettingPopover</div>,
}));

jest.mock('@/theme/set-theme-on-document', () => ({
  SetThemeOnDocument: jest.fn(),
}));

describe('DarkModeSetting', () => {
  it('renders without crashing', () => {
    render(<DarkModeSetting />);
    expect(screen.getByTitle('Change colour theme')).toBeInTheDocument();
  });

  it('toggles popover on button click', () => {
    render(<DarkModeSetting />);
    const button = screen.getByTitle('Change colour theme');

    fireEvent.click(button);
    expect(screen.getByText('DarkModeSettingPopover')).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.queryByText('DarkModeSettingPopover'),
    ).not.toBeInTheDocument();
  });

  it('tracks opening of theme settings', () => {
    render(<DarkModeSetting />);
    const button = screen.getByTitle('Change colour theme');

    fireEvent.click(button);
    expect((UmamiPlugin() as IUmamiPlugin).track).toHaveBeenCalledWith(
      'Opened Theme Settings',
    );
  });

  it('closes popover on outside click', () => {
    render(<DarkModeSetting />);
    const button = screen.getByTitle('Change colour theme');

    fireEvent.click(button);
    expect(screen.getByText('DarkModeSettingPopover')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(
      screen.queryByText('DarkModeSettingPopover'),
    ).not.toBeInTheDocument();
  });
});
