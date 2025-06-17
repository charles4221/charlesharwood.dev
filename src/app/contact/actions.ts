'use server';

import { captureException } from '@sentry/nextjs';
import { LibraryResponse, SendEmailV3_1 } from 'node-mailjet';

import {
  INVALID_EMAIL_ERROR_CODE,
  INVALID_ERROR_CODES,
  mailjetClient,
} from '@/plugins/mailjet';
import { isEmailValid } from '@/utils/is-email-valid';

import {
  ContactFormFields,
  ContactFormResponseMessage,
  ContactFormState,
  ContactFormValidationMessage,
} from './types';

export async function sendMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const {
    firstName,
    lastName,
    email,
    company,
    projectType,
    description,
    honeypot,
  }: ContactFormFields & { honeypot?: string } = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    projectType: (formData.getAll('projectType') as string[]).join(', '),
    description: formData.get('description') as string,
    honeypot: formData.get('address') as string,
  };

  // Honeypot field is filled in, so this is likely a bot.
  if (honeypot) {
    return {
      message: ContactFormResponseMessage.FAILED,
      success: false,
    };
  }

  const emailIsValid = isEmailValid(email);

  if (!firstName || !lastName || !email || !description || !emailIsValid) {
    const emailValidationMessage = emailIsValid
      ? ''
      : ContactFormValidationMessage.INVALID_EMAIL;

    return {
      data: {
        firstName,
        lastName,
        email,
        company,
        projectType,
        description,
      },
      message: ContactFormResponseMessage.INVALID,
      success: false,
      invalidFieldMessages: {
        firstName: firstName
          ? ''
          : ContactFormValidationMessage.FIRST_NAME_REQUIRED,
        lastName: lastName
          ? ''
          : ContactFormValidationMessage.LAST_NAME_REQUIRED,
        email: email
          ? emailValidationMessage
          : ContactFormValidationMessage.EMAIL_REQUIRED,
        description: description
          ? ''
          : ContactFormValidationMessage.DESCRIPTION_REQUIRED,
      },
    };
  }

  const messageBody: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: 'no-reply@charlesharwood.dev',
          Name: 'charlesharwood.dev',
        },
        To: [
          {
            Email: process.env.EMAIL_TO_ADDRESS as string,
            Name: 'Charles Harwood',
          },
        ],
        ReplyTo: {
          Email: email,
          Name: `${firstName} ${lastName}`,
        },
        Subject: 'New enquiry from charlesharwood.dev',
        HTMLPart: `<h1>You've received a new enquiry from https://charlesharwood.dev:</h1><p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Project Type: ${projectType}</p><p>Message: ${description}</p>`,
        TextPart: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nCompany: ${company}\nProject Type: ${projectType}\nMessage: ${description}`,
      },
    ],
  };

  try {
    const response: LibraryResponse<SendEmailV3_1.Response> =
      await mailjetClient
        .post('send', { version: 'v3.1' })
        .request(messageBody);

    const data = response.body.Messages[0];

    // Unfortunately mailjet does not properly export the `ResponseStatus` enum so we have to use a string comparison.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (data.Status === 'success') {
      return {
        message: ContactFormResponseMessage.SUCCESS,
        success: true,
      };
    }

    if (data.Errors.length > 0) {
      if (
        data.Errors.some(
          (error) => error.ErrorCode === INVALID_EMAIL_ERROR_CODE,
        )
      ) {
        return {
          message: ContactFormResponseMessage.INVALID_EMAIL,
          success: false,
        };
      }

      if (
        data.Errors.some((error) => INVALID_ERROR_CODES.has(error.ErrorCode))
      ) {
        return {
          message: ContactFormResponseMessage.INVALID,
          success: false,
        };
      }
    }

    // Capture data response errors that haven't been handled above and send to Sentry.
    captureException(JSON.stringify(data.Errors));

    // Throw any other error codes out to the catch block for generic failure messaging.
    throw new Error(ContactFormResponseMessage.FAILED);
  } catch (error) {
    // Capture unhandled exceptions and send to Sentry.
    if (
      error instanceof Error &&
      error.message !== ContactFormResponseMessage.FAILED.toString()
    ) {
      captureException(error);
    }

    return {
      message:
        error instanceof Error
          ? error.message
          : ContactFormResponseMessage.FAILED,
      success: false,
    };
  }
}
