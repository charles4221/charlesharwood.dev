import { render, screen } from '@testing-library/react';

import { ConditionalWrap } from '../ConditionalWrap';

describe('ConditionalWrap', () => {
  it('wraps children when condition is true', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="wrapper">{children}</div>
    );
    render(
      <ConditionalWrap condition={true} wrap={Wrapper}>
        <span>Test</span>
      </ConditionalWrap>,
    );
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  it('does not wrap children when condition is false', () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="wrapper">{children}</div>
    );
    render(
      <ConditionalWrap condition={false} wrap={Wrapper}>
        <span>Test</span>
      </ConditionalWrap>,
    );
    expect(screen.queryByTestId('wrapper')).not.toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
