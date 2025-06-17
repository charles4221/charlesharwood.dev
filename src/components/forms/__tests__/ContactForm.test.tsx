import { render, screen, fireEvent } from '@testing-library/react';

import { sendMessage } from '@/app/contact/actions';

import { ContactForm, PROJECT_OPTIONS } from '../ContactForm';

jest.mock('@/app/contact/actions', () => ({
  sendMessage: jest.fn(),
}));

describe('ContactForm', () => {
  it('renders the form with all fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByText(/what can i help you with\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
  });

  it('displays validation messages when required fields are empty', async () => {
    (sendMessage as jest.Mock).mockResolvedValue({
      success: false,
      invalidFieldMessages: {
        firstName: 'First Name is required',
        lastName: 'Last Name is required',
        email: 'Email is required',
        description: 'Message is required',
      },
    });

    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText(/first name is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/last name is required/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    (sendMessage as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Thanks for your message!',
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/your message/i), {
      target: { value: 'Hello, this is a test message.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Thanks for your message!'),
    ).toBeInTheDocument();
  });

  it('renders project options checkboxes', () => {
    render(<ContactForm />);

    for (const { label } of PROJECT_OPTIONS) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it('handles checkbox selection', () => {
    render(<ContactForm />);

    const checkbox = screen.getByLabelText(
      /mobile app \(iphone, ipad, android\)/i,
    );
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
