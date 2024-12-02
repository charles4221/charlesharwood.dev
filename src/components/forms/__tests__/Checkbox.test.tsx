import { render, screen, fireEvent } from '@testing-library/react';

import { Checkbox } from '../Checkbox';

describe('Checkbox component', () => {
  it('renders the checkbox with the correct label', () => {
    render(<Checkbox id="test-checkbox" name="test" label="Test Checkbox" />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  it('checkbox is unchecked by default', () => {
    render(<Checkbox id="test-checkbox" name="test" label="Test Checkbox" />);
    expect(screen.getByLabelText('Test Checkbox')).not.toBeChecked();
  });

  it('checkbox can be checked by default', () => {
    render(
      <Checkbox
        id="test-checkbox"
        name="test"
        label="Test Checkbox"
        defaultChecked
      />,
    );
    expect(screen.getByLabelText('Test Checkbox')).toBeChecked();
  });

  it('checkbox can be checked', () => {
    render(<Checkbox id="test-checkbox" name="test" label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('checkbox can be unchecked', () => {
    render(
      <Checkbox
        id="test-checkbox"
        name="test"
        label="Test Checkbox"
        defaultChecked
      />,
    );
    const checkbox = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('checkbox has the correct name and value', () => {
    render(<Checkbox id="test-checkbox" name="test" label="Test Checkbox" />);
    const checkbox = screen.getByLabelText('Test Checkbox');
    expect(checkbox).toHaveAttribute('name', 'test');
    expect(checkbox).toHaveAttribute('value', 'test-checkbox');
  });
});
