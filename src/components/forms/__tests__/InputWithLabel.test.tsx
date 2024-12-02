import { render, screen } from '@testing-library/react';

import { InputWithLabel } from '../InputWithLabel';

describe('InputWithLabel', () => {
  it('renders the label and input', () => {
    render(<InputWithLabel label="Test Label" id="test-input" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders the required asterisk when required', () => {
    render(<InputWithLabel label="Test Label" id="test-input" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not render the required asterisk when not required', () => {
    render(<InputWithLabel label="Test Label" id="test-input" />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders the invalid message when provided', () => {
    render(
      <InputWithLabel
        label="Test Label"
        id="test-input"
        invalidMessage="Invalid input"
      />,
    );
    expect(screen.getByText('Invalid input')).toBeInTheDocument();
  });

  it('does not render the invalid message when not provided', () => {
    render(<InputWithLabel label="Test Label" id="test-input" />);
    expect(screen.queryByText('Invalid input')).not.toBeInTheDocument();
  });

  it('applies the wrapper class name', () => {
    render(
      <InputWithLabel
        label="Test Label"
        id="test-input"
        wrapperClassName="test-input-with-label-wrapper-class"
      />,
    );
    expect(screen.getByTestId('input-with-label-wrapper-test-id')).toHaveClass(
      'test-input-with-label-wrapper-class',
    );
  });
});
