import { render, screen } from '@testing-library/react';
import { useFormStatus } from 'react-dom';

import { ContactFormSubmitButton } from '../ContactFormSubmitButton';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(),
}));

describe('ContactFormSubmitButton', () => {
  it('renders default button text when not pending or success', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    render(<ContactFormSubmitButton isSuccess={false} />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('renders pending button text and spinner when pending', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });
    render(<ContactFormSubmitButton isSuccess={false} />);
    expect(screen.getByText('Sending')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('fa-spinner');
  });

  it('renders success button text when success', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    render(<ContactFormSubmitButton isSuccess={true} />);
    expect(screen.getByText('Message Sent!')).toBeInTheDocument();
  });

  it('disables button when pending', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });
    render(<ContactFormSubmitButton isSuccess={false} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when success', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    render(<ContactFormSubmitButton isSuccess={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('enables button when not pending and not success', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
    render(<ContactFormSubmitButton isSuccess={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
