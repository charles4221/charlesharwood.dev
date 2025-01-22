import { render, screen } from '@testing-library/react';

import { Label } from '../Label';

describe('Label component', () => {
  it('renders without crashing', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies the correct class', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    expect(screen.getByText('Test Label')).toHaveClass('block mb-2');
  });

  it('passes additional props to the label element', () => {
    render(
      <Label htmlFor="test-input" data-example="Example Data">
        Test Label
      </Label>,
    );
    expect(screen.getByText('Test Label')).toHaveAttribute(
      'data-example',
      'Example Data',
    );
  });
});
