'use client';

import { useActionState } from 'react';

import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormStatus } from 'react-dom';

import { sendMessage } from '@/app/contact/actions';
import { ContactFormState } from '@/app/contact/types';

import { Checkbox } from './Checkbox';
import { ContactFormResponse } from './ContactFormResponse';
import { InputWithLabel } from './InputWithLabel';
import { Card } from '../layout/Card';
import { Button } from '../links/Button';

const initialState: ContactFormState = {};

type ProjectOption = {
  id: string;
  label: string;
};

const PROJECT_OPTIONS: ProjectOption[] = [
  { id: 'mobile', label: 'Mobile App (iPhone, iPad, Android)' },
  { id: 'vision', label: 'VR App (Vision Pro, Xreal)' },
  { id: 'tv', label: 'TV App (Apple TV, Android/Google TV)' },
  { id: 'shop', label: 'e-Commerce / Online Store' },
  { id: 'website', label: 'Website' },
  { id: 'webapp', label: 'Web App' },
  { id: 'hosting', label: 'Web Hosting' },
  { id: 'domain', label: 'Domain Registration' },
];

const ButtonText = {
  DEFAULT: 'Send Message',
  PENDING: 'Sending',
  SUCCESS: 'Message Sent!',
} as const;

function SubmitButton({ isSuccess }: { isSuccess: boolean }) {
  const formStatus = useFormStatus();
  const isPending = formStatus.pending;

  const isDisabled = isPending || isSuccess;

  const defaultButtonText = isPending ? ButtonText.PENDING : ButtonText.DEFAULT;
  const buttonText = isSuccess ? ButtonText.SUCCESS : defaultButtonText;

  return (
    <Button type="submit" disabled={isDisabled} isCTA>
      {buttonText}
      {isPending ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-slate-900 ml-3"
          spin
          size="xs"
        />
      ) : null}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, initialState);

  return (
    <Card>
      <form noValidate action={formAction}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
          <InputWithLabel
            type="text"
            id="firstName"
            label="First Name"
            placeholder="John"
            required
            defaultValue={state.data?.firstName}
            invalidMessage={state.invalidFieldMessages?.firstName}
          />
          <InputWithLabel
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Bacon"
            required
            defaultValue={state.data?.lastName}
            invalidMessage={state.invalidFieldMessages?.lastName}
          />
          <InputWithLabel
            type="email"
            id="email"
            label="Email Address"
            placeholder="bacon@sandwich.com"
            required
            defaultValue={state.data?.email}
            invalidMessage={state.invalidFieldMessages?.email}
          />
          <InputWithLabel
            type="text"
            id="company"
            label="Company (optional)"
            placeholder="Bacon Company Pty Ltd"
            defaultValue={state.data?.company}
            invalidMessage={state.invalidFieldMessages?.company}
          />
          <div className="md:col-span-2">
            <p>What can I help you with?</p>
            {PROJECT_OPTIONS.map(({ id, label }) => (
              <div key={id}>
                <Checkbox
                  id={id}
                  label={label}
                  name="projectType"
                  defaultChecked={state.data?.projectType.includes(id)}
                />
              </div>
            ))}
          </div>
          <InputWithLabel
            type="text"
            id="description"
            label="Your Message"
            placeholder="Hey Charles, just wanted to write to let you know that I love bacon!"
            isTextArea
            rows={4}
            required
            wrapperClassName="md:col-span-2"
            defaultValue={state.data?.description}
            invalidMessage={state.invalidFieldMessages?.description}
          />
          <SubmitButton isSuccess={state.success === true} />
        </div>
        <ContactFormResponse
          isSuccess={state.success}
          message={state.message}
        />
      </form>
    </Card>
  );
}
