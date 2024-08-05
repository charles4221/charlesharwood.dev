'use server';

import {
  ContactFormFields,
  ContactFormResponseMessage,
  ContactFormState,
  MessageBody,
  MessageResponse,
} from './types';

const API_URL = process.env.EMAIL_API_URL;
const API_KEY = process.env.EMAIL_API_KEY;

export async function sendMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (!API_URL || !API_KEY) {
    throw new Error(
      'Missing environment variables for email API. Check .env file.',
    );
  }

  const {
    firstName,
    lastName,
    email,
    company,
    website,
    description,
  }: ContactFormFields = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    website: formData.get('website') as string,
    description: formData.get('description') as string,
  };

  if (!firstName || !lastName || !email || !description) {
    return {
      message: ContactFormResponseMessage.INVALID,
      success: false,
    };
  }

  const messageBody: MessageBody = {
    sender: {
      name: 'charlesharwood.dev',
      email: 'no-reply@charlesharwood.dev',
    },
    to: [
      {
        email: 'info@charlesharwood.dev',
        name: 'Charles Harwood',
      },
    ],
    replyTo: {
      email,
      name: `${firstName} ${lastName}`,
    },
    subject: 'New enquiry from charlesharwood.dev',
    htmlContent: `<!DOCTYPE html><html><head></head><body><h1>You've received a new enquiry from https://charlesharwood.dev:</h1><p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Website: ${website}</p><p>Message: ${description}</p></body></html>`,
    textContent: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nCompany: ${company}\nWebsite: ${website}\nMessage: ${description}`,
  };

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify(messageBody),
  };

  try {
    const response = await fetch(API_URL, fetchOptions);
    const data: MessageResponse = await response.json();

    if ('code' in data) {
      // Handle specific error codes with custom messaging.
      if (data.code === 'invalid_parameter' && data.message.includes('email')) {
        return {
          message: ContactFormResponseMessage.INVALID_EMAIL,
          success: false,
        };
      }

      // Throw any other error codes out to the catch block for generic failure messaging.
      throw new Error(data.message, {
        cause: data.code,
      });
    }

    // Success!
    return {
      message: ContactFormResponseMessage.SUCCESS,
      success: true,
    };
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
