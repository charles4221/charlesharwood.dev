import { detectPrefersDarkMode } from '../detect-prefers-dark-mode';

describe('detectPrefersDarkMode', () => {
  it('should return true if prefers-color-scheme is dark', () => {
    globalThis.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: undefined,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    expect(detectPrefersDarkMode()).toBe(true);
  });

  it('should return false if prefers-color-scheme is not dark', () => {
    globalThis.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        onchange: undefined,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    expect(detectPrefersDarkMode()).toBe(false);
  });

  it('should return false if matchMedia is not supported', () => {
    globalThis.matchMedia =
      undefined as unknown as typeof globalThis.matchMedia;

    expect(detectPrefersDarkMode()).toBe(false);
  });
});
