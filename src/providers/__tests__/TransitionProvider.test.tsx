import { render, screen } from '@testing-library/react';
import { TransitionRouter } from 'next-transition-router';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import { TransitionProvider } from '../TransitionProvider';

jest.mock('@/hooks/usePrefersReducedMotion');
jest.mock('next-transition-router', () => ({
  TransitionRouter: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('TransitionProvider', () => {
  it('renders children without TransitionRouter if prefersReducedMotion is true', () => {
    (usePrefersReducedMotion as jest.Mock).mockReturnValue(true);

    render(
      <TransitionProvider>
        <div>Test Child</div>
      </TransitionProvider>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(TransitionRouter).not.toHaveBeenCalled();
  });

  it('renders children with TransitionRouter if prefersReducedMotion is false', () => {
    (usePrefersReducedMotion as jest.Mock).mockReturnValue(false);

    render(
      <TransitionProvider>
        <div>Test Child</div>
      </TransitionProvider>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(TransitionRouter).toHaveBeenCalledWith(
      expect.objectContaining({
        auto: true,
        leave: expect.any(Function),
        enter: expect.any(Function),
      }),
      undefined,
    );
  });
});
