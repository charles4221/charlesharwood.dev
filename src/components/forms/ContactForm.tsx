'use client';

import { useActionState, useState } from 'react';

import { sendMessage } from '@/app/contact/actions';
import {
  ContactFormRequiredFields,
  ContactFormState,
  ContactFormValidationMessage,
} from '@/app/contact/types';
import { isEmailValid } from '@/utils/is-email-valid';

import { Checkbox } from './Checkbox';
import { ContactFormResponse } from './ContactFormResponse';
import { ContactFormSubmitButton } from './ContactFormSubmitButton';
import { InputWithLabel } from './InputWithLabel';
import { Card } from '../layout/Card';

const initialState: ContactFormState = {};

type ProjectOption = {
  id: string;
  label: string;
};

export const PROJECT_OPTIONS: ProjectOption[] = [
  { id: 'mobile', label: 'Mobile App (iPhone, iPad, Android)' },
  { id: 'vision', label: 'VR App (Vision Pro, Xreal)' },
  { id: 'tv', label: 'TV App (Apple TV, Android/Google TV)' },
  { id: 'shop', label: 'e-Commerce / Online Store' },
  { id: 'website', label: 'Website' },
  { id: 'webapp', label: 'Web App' },
  { id: 'hosting', label: 'Web Hosting' },
  { id: 'domain', label: 'Domain Registration' },
];

export function ContactForm() {
  const [state, formAction] = useActionState(sendMessage, initialState);
  const [clientValidationErrors, setClientValidationErrors] =
    useState<Record<ContactFormRequiredFields, string>>();

  const validateBeforeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form is valid before submitting
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const description = formData.get('description') as string;

    const emailIsValid = isEmailValid(email);
    const emailValidationMessage = emailIsValid
      ? ''
      : ContactFormValidationMessage.INVALID_EMAIL;

    const errors: Record<ContactFormRequiredFields, string> = {
      firstName: firstName
        ? ''
        : ContactFormValidationMessage.FIRST_NAME_REQUIRED,
      lastName: lastName ? '' : ContactFormValidationMessage.LAST_NAME_REQUIRED,
      email: email
        ? emailValidationMessage
        : ContactFormValidationMessage.EMAIL_REQUIRED,
      description: description
        ? ''
        : ContactFormValidationMessage.DESCRIPTION_REQUIRED,
    };

    if (!firstName || !lastName || !email || !description || !emailIsValid) {
      setClientValidationErrors(errors);
      return;
    }

    // Clear any previous validation errors
    setClientValidationErrors(undefined);
    // Submit the form if all validations pass
    // This will trigger the action defined in useActionState
    form.submit();
  };

  return (
    <Card>
      <form noValidate action={formAction} onSubmit={validateBeforeSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
          <InputWithLabel
            type="text"
            id="firstName"
            label="First Name"
            placeholder="John"
            required
            defaultValue={state.data?.firstName}
            invalidMessage={
              clientValidationErrors?.firstName ||
              state.invalidFieldMessages?.firstName
            }
          />
          <InputWithLabel
            type="text"
            id="lastName"
            label="Last Name"
            placeholder="Bacon"
            required
            defaultValue={state.data?.lastName}
            invalidMessage={
              clientValidationErrors?.lastName ||
              state.invalidFieldMessages?.lastName
            }
          />
          <InputWithLabel
            type="email"
            id="email"
            label="Email Address"
            placeholder="bacon@sandwich.com"
            required
            defaultValue={state.data?.email}
            invalidMessage={
              clientValidationErrors?.email || state.invalidFieldMessages?.email
            }
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
            invalidMessage={
              clientValidationErrors?.description ||
              state.invalidFieldMessages?.description
            }
          />
          <InputWithLabel
            type="text"
            id="address"
            label="Address"
            placeholder="123 Bacon St, Baconville, Baconland"
            wrapperClassName="hidden"
          />
          <ContactFormSubmitButton isSuccess={state.success === true} />
        </div>
        <ContactFormResponse
          isSuccess={state.success}
          message={state.message}
        />
      </form>
    </Card>
  );
}
