'use server';

import {
  ContactFormFields,
  ContactFormState,
} from '@/components/forms/ContactForm';

const apiUrl = process.env.EMAIL_API_URL;
const apiKey = process.env.EMAIL_API_KEY;

type SenderOrRecipient = {
  name: string;
  email: string;
};

type Attachment = ({ url: string } | { content: string }) & {
  name: string;
};

type MessageBody = {
  sender: SenderOrRecipient;
  to: SenderOrRecipient[];
  bcc?: SenderOrRecipient[];
  cc?: SenderOrRecipient[];
  replyTo?: SenderOrRecipient;
  subject: string;
  htmlContent: string;
  textContent: string;
  attachment?: Attachment[];
  templateId?: number;
  params?: { [key: string]: string };
  tags?: string[];
  scheduledAt?: string;
  batchId?: string;
};

type MessageResponseSuccess = {
  messageId: string;
};
type MessageResponseScheduled = {
  messageId: string;
  batchId: string;
};
type MessageResponseErrorCode =
  | 'invalid_parameter'
  | 'missing_parameter'
  | 'out_of_range'
  | 'campaign_processing'
  | 'campaign_sent'
  | 'document_not_found'
  | 'reseller_permission_denied'
  | 'not_enough_credits'
  | 'permission_denied'
  | 'duplicate_parameter'
  | 'duplicate_request'
  | 'method_not_allowed'
  | 'unauthorized'
  | 'account_under_validation'
  | 'not_acceptable'
  | 'bad_request';
type MessageResponseError = {
  message: string;
  code: MessageResponseErrorCode;
};
type MessageResponse =
  | MessageResponseSuccess
  | MessageResponseScheduled
  | MessageResponseError;

export async function sendMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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
      'api-key': apiKey,
    },
    body: JSON.stringify(messageBody),
  };

  try {
    const response = await fetch(apiUrl, fetchOptions);
    const data: MessageResponse = await response.json();

    if ('code' in data) {
      throw new Error(data.message, {
        cause: data.code,
      });
    }

    return {
      message:
        'Message sent successfully! I will be in touch as soon as I can.',
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      message: error instanceof Error ? error.message : 'Failed to send email',
      success: false,
    };
  }
}
