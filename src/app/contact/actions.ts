'use server';

import type { LibraryResponse, SendEmailV3_1 } from 'node-mailjet';

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
  }: ContactFormFields = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    projectType: formData.getAll('projectType').join(', '),
    description: formData.get('description') as string,
  };

  if (!firstName || !lastName || !email || !description) {
    const emailIsValid = isEmailValid(email);
    const emailValidationMessage = emailIsValid
      ? ''
      : 'Please check that you have entered a valid email address.';

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
        firstName: firstName ? '' : 'First Name is required.',
        lastName: lastName ? '' : 'Last Name is required.',
        email: email ? emailValidationMessage : 'Email is required.',
        description: description ? '' : 'Message is required.',
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
    console.log(data);

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

    // Throw any other error codes out to the catch block for generic failure messaging.
    throw new Error(ContactFormResponseMessage.FAILED);
  } catch (error) {
    console.error(error);

    return {
      message:
        error instanceof Error
          ? error.message
          : ContactFormResponseMessage.FAILED,
      success: false,
    };
  }
}
