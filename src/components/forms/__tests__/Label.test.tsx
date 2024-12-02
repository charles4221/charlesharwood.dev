import { render, screen } from '@testing-library/react';

import { Label } from '../Label';

describe('Label component', () => {
  it('renders without crashing', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies the correct class', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toHaveClass('block mb-2');
  });

  it('passes additional props to the label element', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    expect(screen.getByText('Test Label')).toHaveAttribute('for', 'test-input');
  });
});
