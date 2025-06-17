import { render, screen } from '@testing-library/react';

import { Input } from '../Input';

describe('Input component', () => {
  it('renders an input element by default', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe('INPUT');
  });

  it('renders a textarea element when isTextArea is true', () => {
    render(<Input isTextArea placeholder="Enter text" />);
    const textAreaElement = screen.getByPlaceholderText('Enter text');
    expect(textAreaElement).toBeInTheDocument();
    expect(textAreaElement.tagName).toBe('TEXTAREA');
  });

  it('applies the correct className to input element', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveClass(
      'block w-full rounded-sm p-3 mb-2 bg-slate-100 text-slate-950',
    );
  });

  it('applies custom className if provided', () => {
    render(<Input placeholder="Enter text" className="custom-class" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('applies the correct className to textarea element', () => {
    render(<Input isTextArea placeholder="Enter text" />);
    const textAreaElement = screen.getByPlaceholderText('Enter text');
    expect(textAreaElement).toHaveClass(
      'block w-full rounded-sm p-3 mb-2 bg-slate-100 text-slate-950',
    );
  });

  it('passes additional props to input element', () => {
    render(
      <Input placeholder="Enter text" id="test-input" aria-required="true" />,
    );
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveAttribute('id', 'test-input');
    expect(inputElement).toHaveAttribute('aria-required', 'true');
  });
});
