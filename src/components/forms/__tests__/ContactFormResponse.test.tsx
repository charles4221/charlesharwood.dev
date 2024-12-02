import { render, screen } from '@testing-library/react';

import { ContactFormResponse } from '../ContactFormResponse';

describe('ContactFormResponse', () => {
  it('renders success message when isSuccess is true', () => {
    render(<ContactFormResponse isSuccess={true} message="Success!" />);

    const message = screen.getByText('Success!');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass(
      'font-semibold mt-10 text-green-700 dark:text-green-400',
    );
  });

  it('renders failure message when isSuccess is false', () => {
    render(<ContactFormResponse isSuccess={false} message="Failed!" />);

    const message = screen.getByText('Failed!');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('font-semibold mt-10 text-red-600');
  });

  it('renders default success message when message is undefined and isSuccess is true', () => {
    render(<ContactFormResponse isSuccess={true} message={undefined} />);
    expect(
      screen.getByText(
        'Message sent successfully! I will be in touch as soon as I can.',
      ),
    ).toBeInTheDocument();
  });

  it('renders default failure message when message is undefined and isSuccess is false', () => {
    render(<ContactFormResponse isSuccess={false} message={undefined} />);
    expect(
      screen.getByText('Message failed to send. Please try again later.'),
    ).toBeInTheDocument();
  });

  it('does not render anything when isSuccess is undefined', () => {
    render(<ContactFormResponse isSuccess={undefined} message="Message" />);
    expect(screen.queryByText('Message')).toBeNull();
  });
});
