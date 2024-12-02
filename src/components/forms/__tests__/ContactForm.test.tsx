import { render, screen, fireEvent } from '@testing-library/react';

import { sendMessage } from '@/app/contact/actions';

import { ContactForm, PROJECT_OPTIONS } from '../ContactForm';

jest.mock('@/app/contact/actions', () => ({
  sendMessage: jest.fn(),
}));

describe('ContactForm', () => {
  it('renders the form with all fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company \(optional\)/i)).toBeInTheDocument();
    expect(screen.getByText(/What can I help you with\?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(
      await screen.findByText(/First Name is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Last Name is required/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Message is required/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    (sendMessage as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Thanks for your message!',
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Your Message/i), {
      target: { value: 'Hello, this is a test message.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

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
      /Mobile App \(iPhone, iPad, Android\)/i,
    );
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
