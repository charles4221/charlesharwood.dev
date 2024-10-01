'use client';

import { HTMLInputTypeAttribute } from 'react';

import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormState, useFormStatus } from 'react-dom';

import { sendMessage } from '@/app/contact/actions';
import { ContactFormFields, ContactFormState } from '@/app/contact/types';

import { ContactFormResponse } from './ContactFormResponse';
import { InputWithLabel } from './InputWithLabel';
import { Card } from '../layout/Card';
import { Button } from '../links/Button';

const initialState: ContactFormState = {};

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

type ContactFormFieldConfig = {
  type: HTMLInputTypeAttribute;
  id: keyof ContactFormFields;
  label: string;
  placeholder: string;
  isTextArea?: boolean;
  rows?: number;
  required?: boolean;
  colSpan?: 1 | 2;
};

const CONTACT_FORM_FIELDS: ContactFormFieldConfig[] = [
  {
    type: 'text',
    id: 'firstName',
    label: 'First Name',
    placeholder: 'John',
    required: true,
  },
  {
    type: 'text',
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Bacon',
    required: true,
  },
  {
    type: 'email',
    id: 'email',
    label: 'Email Address',
    placeholder: 'bacon@sandwich.com.au',
    required: true,
  },
  {
    type: 'text',
    id: 'company',
    label: 'Company',
    placeholder: 'Bacon Company Pty Ltd',
  },
  {
    type: 'url',
    id: 'website',
    label: 'Website',
    placeholder: 'https://en.wikipedia.org/wiki/Bacon',
    colSpan: 2,
  },
  {
    type: 'text',
    id: 'description',
    label: 'Your Message',
    placeholder:
      'Hey Charles, just wanted to write to let you know that I love bacon!',
    isTextArea: true,
    rows: 4,
    required: true,
    colSpan: 2,
  },
];

export function ContactForm() {
  const [state, formAction] = useFormState(sendMessage, initialState);

  return (
    <Card>
      <form action={formAction}>
        <div className="grid grid-cols-2 gap-3">
          {CONTACT_FORM_FIELDS.map((field) => (
            <InputWithLabel
              key={field.id}
              wrapperClassName={
                field.colSpan === 2 ? 'col-span-2' : 'col-span-1'
              }
              isValid={state.validFields?.[field.id]}
              {...field}
            />
          ))}
          <SubmitButton isSuccess={state.success === true} />
        </div>
        <ContactFormResponse success={state.success} message={state.message} />
      </form>
    </Card>
  );
}
