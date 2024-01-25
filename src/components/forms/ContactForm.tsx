'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { sendMessage } from '@/app/actions';

import { InputWithLabel } from './Input';
import { Card } from '../layout/Card';
import { Button } from '../links/Button';

export type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  description: string;
};

export type ContactFormState = {
  message?: string;
  success?: boolean;
};

const initialState: ContactFormState = {};

function SubmitButton({ isSuccess }: { isSuccess: boolean }) {
  const formStatus = useFormStatus();

  const isDisabled = formStatus.pending || isSuccess;

  const defaultButtonText = formStatus.pending ? 'Sending...' : 'Send Message';
  const buttonText = isSuccess ? 'Message Sent!' : defaultButtonText;

  return (
    <Button type="submit" disabled={isDisabled} isCTA>
      {buttonText}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(sendMessage, initialState);

  return (
    <Card>
      <form action={formAction}>
        <div className="grid grid-cols-2 gap-3">
          <InputWithLabel
            type="text"
            id="firstName"
            label="First Name"
            placeholder="John"
            required
          />
          <InputWithLabel
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Bacon"
            required
          />
          <InputWithLabel
            type="email"
            id="email"
            label="Email Address"
            placeholder="bacon@sandwich.com"
            required
          />
          <InputWithLabel
            type="text"
            id="company"
            label="Company"
            placeholder="Bacon Company Pty Ltd"
          />
          <div className="col-span-2">
            <InputWithLabel
              type="string"
              id="website"
              label="Website"
              placeholder="https://en.wikipedia.org/wiki/Bacon"
            />
            <InputWithLabel
              isTextArea
              id="description"
              label="Your Message"
              rows={4}
              placeholder="Hey Charles, just wanted to write to let you know that I love bacon!"
              required
            />
            <SubmitButton isSuccess={state.success === true} />
          </div>
        </div>
        {state.success ? (
          <p className="text-green-700 dark:text-green-400 font-semibold mt-10">
            {state.message || 'Message sent successfully!'}
          </p>
        ) : null}
        {state.success === false ? (
          <p className="text-red-600 font-semibold mt-10">
            {state.message || 'Message failed to send.'}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
